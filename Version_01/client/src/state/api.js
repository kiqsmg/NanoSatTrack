import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({ //Create the API
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }), //configures the base function the consult utilizes
    reducerPath: "adminApi", //defines the way that the reducers will be stored
    tagTypes: [ //defines the kind of tags disposible for use
        "User",
        "Products",
        "Customers",
        "Transactions",
    ],
    endpoints: (build) => ({ //where we will define each endpoint
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        getProducts: build.query({
            query: () => "client/products",
            providesTags: ["Products"],
        }),
        getCustomers: build.query({
            query: () => "client/customers",
            providesTags: ["Customers"],
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            prodidesTags: ["Transactions"],
        }),
        getGeography: build.query({
            query: () => "client/geography",
            providesTags: ["Geography"],
        }),
    }),
});


export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
} = api;