import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { AllReducers } from "../service/reducers";
import { ThunkService } from "./thunkService";
import { GeneralThunkService } from "./thunk/merchant/generalService";
import { AccountThunkService } from './thunk/merchant/accountService';

const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
)

const store = createStore(AllReducers, composedEnhancer)
store.dispatch(ThunkService.AccountService.GetConfig as any);
store.dispatch(GeneralThunkService.MerchantDetailsService.GetMerchantDetails as any);
store.dispatch(GeneralThunkService.MerchantDetailsService.FetchBanks as any);
store.dispatch(GeneralThunkService.MerchantDetailsService.FetchIndustries as any);
store.dispatch(GeneralThunkService.MerchantDetailsService.FetchMerchantCategories as any);
store.dispatch(AccountThunkService.GetRoles as any);
store.dispatch(AccountThunkService.GetUsers as any);
store.dispatch(GeneralThunkService.PageService.UnLoad as any)
export default store   
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>