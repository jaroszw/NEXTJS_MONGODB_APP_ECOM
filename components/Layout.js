import React from "react";
import Head from "next/head";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@material-ui/core";
import useStyles from "../utils/styles";
import NextLink from "next/link";

export default function Layout({ title, children, description }) {
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
    },
    palette: {
      // type: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#208080",
      },
    },
  });

  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>{title ? `${title}- Next E-Com` : `Next E-Com`}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
      </ThemeProvider>
    </div>
  );
}
