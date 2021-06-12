import React from 'react';
import { ApolloProvider } from "@apollo/client";
// import apolloClient from '../apolloClient';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../styles/theme';
import Layout from '../components/Layout/Layout';
import { SnackbarProvider } from 'notistack';
import {useApollo} from '../apolloClient';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const apolloClient = useApollo(pageProps.initialApolloState);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>CRUD Dashboard</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={apolloClient}>
        <SnackbarProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </SnackbarProvider>
        </ApolloProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};