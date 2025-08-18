import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const firebaseApi = createApi({
  reducerPath: "firebaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://getapikey-e75vq7t52q-uc.a.run.app/",
  }),
  endpoints: (builder) => ({
    // Example endpoint
    getGoogleMapsApiKey: builder.query<any, void>({
      query: () => ({
        headers: {
          "Content-Type": "application/json",
        },
        url: `?secretName=${encodeURIComponent(
          "projects/275862522041/secrets/GOOGLE_MAPS_API_KEY/versions/latest"
        )}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetGoogleMapsApiKeyQuery } = firebaseApi;
