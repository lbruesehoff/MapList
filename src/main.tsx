import React from "react";
import App from "./App";
import store from "./store/store";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useGetGoogleMapsApiKeyQuery } from "./api/firebase-api";

function AppWithApiKey() {
  const { data, error, isLoading } = useGetGoogleMapsApiKeyQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error </div>;

  const apiKey = data?.apiKey;
  if (!apiKey) return <div>API key not found</div>;

  return (
    <APIProvider apiKey={apiKey}>
      <App />
    </APIProvider>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <AppWithApiKey />
        </Provider>
      </BrowserRouter>
    </StrictMode>
  );
} else {
  throw new Error("Root element not found");
}
