import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://ubiquitous-space-halibut-v74wq74wpgw2xx77-4000.app.github.dev/",
    cache: new InMemoryCache(),
    fetchOptions: {
      mode: "cors"
    },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
