import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const firebaseApi = createApi({
  reducerPath: "firebaseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    // Example endpoint
    getData: builder.query<any, void>({
      query: () => "data",
    }),
  }),
});

export const { useGetDataQuery } = firebaseApi;
