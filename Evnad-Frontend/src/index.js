import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/fonts.css";
import App from "./App";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider } from "@emotion/react";
import theme from "./mui/theme";

const link = createHttpLink({
  uri: process.env.REACT_APP_GRAPHCMS_URI,
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>
);
