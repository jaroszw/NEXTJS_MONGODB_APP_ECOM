import React from "react";
import Head from "next/head";
import { AppBar, Toolbar, Typography, Container } from "@material-ui/core";
import useStyles from "../utils/styles";

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>Next E-Com</title>
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <Typography>Next E-com</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>All right reserved @PanW</Typography>
      </footer>
    </div>
  );
}
