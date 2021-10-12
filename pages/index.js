import { useContext } from 'react';
import Layout from '../components/Layout';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@material-ui/core';
import NextLink from 'next/link';
import db from '../utils/db';
import Product from '../models/product';
import { Store } from '../utils/store';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';

export default function Home({ products }) {
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);

  const router = useRouter();

  const addToCartHandler = async (product) => {
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

  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>{product.price}</Typography>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => addToCartHandler(product)}
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();

  const data = await Product.find({}).lean();
  await db.disconnect();

  const products = JSON.parse(JSON.stringify(data));

  return {
    props: { products },
  };
}
