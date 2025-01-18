import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { globalApi } from "./api";
import { ApolloClient, InMemoryCache, from } from "@apollo/client";
import { graphQlAuthLink, graphQlHttpLink } from "./config";

export const store = configureStore({
  reducer: {
    [globalApi.reducerPath]: globalApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(globalApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useGetDataQuery,
  usePostDataMutation,
  useGetSelectedValueQuery,
  useGetDataOnClickMutation,
  useLazyGetDataQuery,
} from "./api";

export { endpoints } from "./endpoints";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const apolloClient = new ApolloClient({
  link: from([graphQlAuthLink, graphQlHttpLink]),
  cache: new InMemoryCache(),
});