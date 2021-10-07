import React from "react";
import Head from "next/head";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
} from "@material-ui/core";
import useStyles from "../utils/styles";
import NextLink from "next/link";

export default function Layout({ title, children, description }) {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>{title ? `${title}- Next E-Com` : `Next E-Com`}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <NextLink href="/" passHref>
            <Link>
              <Typography className={classes.brand}>Next E-com</Typography>
            </Link>
          </NextLink>

          <div className={classes.grow}></div>
          <div>
            <NextLink href="/cart">
              <Link>Cart</Link>
            </NextLink>
            <NextLink href="/login">
              <Link>Login</Link>
            </NextLink>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>All right reserved @PanW</Typography>
      </footer>
    </div>
  );
}
