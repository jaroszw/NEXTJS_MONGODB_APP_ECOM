import React, { useContext } from 'react';
import { Store } from '../../utils/store';
import db from '../../utils/db';
import Products from '../../models/product';
import Layout from '../../components/Layout';

import NextLink from 'next/link';
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
} from '@material-ui/core';
import useStyles from '../../utils/styles';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';

export default function ProductScreen({ product }) {
  const classes = useStyles();
  const {
    dispatch,
    state: {
      cart: { cartItems },
    },
  } = useContext(Store);
  const router = useRouter();

  const addToCartHandler = async () => {
    const existItem = cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert('sorry product is out of stock');
      return;
    }

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    router.push('/cart');
  };

  if (!product) {
    return <div>Product not Found</div>;
  } else {
    return (
      <Layout title={product.name} description={product.description}>
        <div className={classes.section}>
          <NextLink href="/" passHref>
            <Link>
              <Typography>back to products</Typography>
            </Link>
          </NextLink>
        </div>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              layout="responsive"
            ></Image>
          </Grid>
          <Grid item md={3} xs={12}>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  {product.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>Category: {product.category}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Brand: {product.brand}</Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  Rating: {product.brating} stars ({product.numReviews} reviews)
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>Description: {product.description}</Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Price</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>${product.price}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Status</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        {product.countInStock > 0 ? 'In Stock' : 'Unavalible'}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export async function getServerSideProps({ params: { slug } }) {
  await db.connect();
  const product = await Products.findOne({ slug }).lean();
  await db.disconnect();

  return {
    props: { product: db.convertDocToObj(product) },
  };
}
