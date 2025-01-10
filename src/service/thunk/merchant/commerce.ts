import { GET, POST } from "../../apiService";
import { Response } from "../../../models/client/apiResponse";
import apiConfig from "../../apiConfig";
import { ActionTypes } from "../../actions/types";
import { State } from "../../../models/application/state";
import DateTime from "../../../shared/functions/DateTime";
import { UserStatus,OrderStatus } from "../../../view/merchants/users/userStatus";
import store from "../../store";
import { linkTag, stokTag, tag } from "../../../shared/functions/tag";
import { Notification } from "../../../shared/components/notification";
import placeholder from "../../../images/placeholder.jpg";
import { CommerceStateBusiness } from "../../state/commerce";
import { DataTableUtil } from "../../../shared/functions/dataTableUtil";
import { Request } from "../../../models/client/apiRequest";
const initialState = new State.PageUtility();
export class CommerceThunkService {
    static LoadDataTable = (loading: boolean) => {
        setTimeout(() => {
            store.dispatch({
                type: ActionTypes.PageUtility.Page_Loading,
                payload: { ...initialState, loading }
            })
        }, 1);
    }
    static GetPaymentPages = async (dispatch: any, state: State.PaymentPage) => {
        CommerceThunkService.LoadDataTable(true);
        const response = await GET(apiConfig.PaymentPage.GetMerchantPages
            + localStorage.getItem('****'));
        CommerceThunkService.LoadDataTable(false);
        if (response.success) {
            // store.dispatch({
            //     type: ActionTypes.PageUtility.Page_Loading,
            //     payload: {...initialState, loading: false }
            // })
            let data: Array<Response.PaymentPage> = response.data?.$values;
            const dataSize = data?.length;
            await data.forEach((element: Response.PaymentPage, index: number) => {
                element.key = (dataSize - (index + 1)) + 1;
                element.name = element.pageName;
                element.status = UserStatus(element.isActive);
                element.type = tag(false);
                element.dateCreated = new DateTime().ConvertAPItoPaymentPageDate(
                    element.dateCreated as string
                );
                element.link = linkTag(element.paymentPageLink)
            });
            data = data.reverse()
            state.row = data;
            state.originalRows = data;
            if (state.reload) {

                store.dispatch({
                    type: ActionTypes.PaymentPage.Set_Payment_Page_State,
                    payload: { ...state, isView: false, loading: false, showModal: false },
                });
            } else {
                store.dispatch({
                    type: ActionTypes.PaymentPage.Set_Payment_Page_State,
                    payload: { ...state, loading: false, showModal: false },
                });
            }

        }
    }
    static AddPaymentPage = async (dispatch: any, state: State.PaymentPage) => {
        let url = apiConfig.PaymentPage.AddPage;
        if (state.isEdit) {
            url = apiConfig.PaymentPage.Update;
        }
        dispatch({
            type: ActionTypes.PaymentPage.Set_Payment_Page_State,
            payload: { ...state, loading: true }
        })
        const response = await POST(url, state.request)
        if (response.success) {
            const message = state.isEdit ? 'Page updated successfully' : 'Page added successfully'
            Notification(message, true);
            await CommerceThunkService.GetPaymentPages(() => { }, state);
        } else {
            Notification(response.responseMessage as string, false)
            store.dispatch({
                type: ActionTypes.PaymentPage.Set_Payment_Page_State,
                payload: { ...state, loading: false }
            })
        }
    }
    static GetTransactions = async (dispatch: any, state: State.PaymentPage) => {
        dispatch({
            type: ActionTypes.PaymentPage.Set_Payment_Page_State,
            payload: { ...state, validating: true }
        })
        const response = await GET(apiConfig.PaymentPage.GetTransactions
            + localStorage.getItem('****') + '/' + state.request?.id)
        const transactions: Array<Response.PaymentPageTransactions> = response.data?.$values
        if (response.success) {
            store.dispatch({
                type: ActionTypes.PaymentPage.Set_Payment_Page_State,
                payload: { ...state, transactions, loadingTransactions: false }
            })
        } else {
            store.dispatch({
                type: ActionTypes.PaymentPage.Set_Payment_Page_State,
                payload: {
                    ...state,
                    transactions: new Array<Response.PaymentPageTransactions>(),
                    loadingTransactions: false
                }
            })
        }
    }
    static ValidateLink = async (dispatch: any, state: State.PaymentPage) => {
        dispatch({
            type: ActionTypes.PaymentPage.Set_Payment_Page_State,
            payload: { ...state, validating: true }
        })
        const response = await GET(apiConfig.PaymentPage.ValidateLink + state.request?.paymentPageLinkReference)
        if (response.success) {

            store.dispatch({
                type: ActionTypes.PaymentPage.Set_Payment_Page_State,
                payload: {
                    ...state, validating: false,
                    linkValidility: response.data.isValid ? 'invalid' : 'valid'
                }
            })
        } else {
            store.dispatch({
                type: ActionTypes.PaymentPage.Set_Payment_Page_State,
                payload: { ...state, validating: false, linkValidility: 'invalid' }
            })
        }
    }
    static ValidateProductLink = async (dispatch: any, state: State.ProductPage) => {
        dispatch({
            type: ActionTypes.ProductPage.Set_Product_Page_State,
            payload: { ...state, validating: true }
        })
        const response = await GET(apiConfig.Product.ValidateProductLink + state.request?.productReference)
        if (!response.data) {
            store.dispatch({
                type: ActionTypes.ProductPage.Set_Product_Page_State,
                payload: { ...state, validating: false, linkValidility: 'valid' }
            })
        } else {
            store.dispatch({
                type: ActionTypes.ProductPage.Set_Product_Page_State,
                payload: { ...state, validating: false, linkValidility: 'invalid' }
            })
        }
    }
    static AddProductPage = async (dispatch: any, state: State.ProductPage) => {
        let url = apiConfig.Product.Create;
        state.request = { ...state.request, currency: 'NGN' }
        const response = await POST(url, state.request)
        if (response.success) {
            state.request = {
                ...state.request,
                id: response.data.id
            }
            Notification('Product added successfully', true);
            store.dispatch({
                type: ActionTypes.ProductPage.Set_Product_Page_State,
                payload: {
                    ...state, loading: false,
                    isView: false,
                    showModal: true,
                    isImageUploadSection: true,
                }
            })
            await CommerceThunkService.GetProductPage(() => { }, { ...state, isImageUploadSection: true });
        } else {
            Notification(response.responseMessage as string, false)
            store.dispatch({
                type: ActionTypes.ProductPage.Set_Product_Page_State,
                payload: { ...state, loading: false }
            })
        }
    }
    static UpdateProductPage = async (dispatch: any, state: State.ProductPage) => {
        state.request = {
            ...state.request, currency: 'NGN',
            stockLimitAlert: state.request?.stockLimitAlert ? state.request.stockLimitAlert : 0
        }
        const response = await POST(apiConfig.Product.Update, state.request)
        if (response.success) {

            state.productInventory = { ...state.productInventory, isEdit: false }
            state = {
                ...state,
                productCustomization: {
                    ...state.productCustomization,
                    isEditDescription: state.productCustomization?.isEditDescription ? false : false,
                    isEditLink: state.productCustomization?.isEditLink ? false : false,
                    showUploadModal: false
                }
            }
            state.request = {
                ...state.request,
                id: response.data.id
            }
            Notification('Product updated successfully', true);
            if (state.isImageUploadSection) {
                await CommerceThunkService.GetProductPage(() => { }, {
                    ...state,
                    isView: false,
                    showModal: false,
                    isImageUploadSection: false,
                    request: {}
                });
            } else {
                state = CommerceStateBusiness.UpdateProductPageDetails(state)
                await CommerceThunkService.GetProductPage(() => { }, {
                    ...state,
                    isView: true
                });
            }

        } else {
            Notification(response.responseMessage as string, false)
            store.dispatch({
                type: ActionTypes.ProductPage.Set_Product_Page_State,
                payload: { ...state, loading: false }
            })
        }
    }
    static UpdateProductOnStorePage = async (dispatch: any, state: State.StorePage) => {
        state.productRequest = { ...state.productRequest, currency: 'NGN' }
        const response = await POST(apiConfig.Product.Update, state.productRequest)
        if (response.success) {
            let storeProducts = new Array<Request.StoreProduct>()
            storeProducts.push({ productID: state.productRequest?.id, operation: 'Insert', isActive: true })
            //  Notification('Product updated successfully', true);
            // store.dispatch({
            //     type: ActionTypes.StorePage.Set_Store_Page_State,
            //     payload: {
            //         ...state, loading: false, showProductModal: false
            //     }
            // })
            await CommerceThunkService.UpdateStoreProductPage(() => { }, {
                ...state,
                loading: false, showProductModal: false, request: { ...state.request, storeProducts }
            })

        } else {
            Notification(response.responseMessage as string, false)
            store.dispatch({
                type: ActionTypes.ProductPage.Set_Product_Page_State,
                payload: { ...state, loading: false }
            })
        }
    }

    static UpdateProductOptions = async (dispatch: any, state: State.ProductPage) => {
        const response = await POST(apiConfig.Product.Update, state.request)
        if (response.success) {
            let message = '';
            message = 'Product updated successfully';
            state.productInventory = {
                ...state.productInventory, isEdit: false,
                showOptions: true, showModal: false
            }
            Notification(message, true);
            store.dispatch({
                type: ActionTypes.ProductPage.Set_Product_Page_State,
                payload: {
                    ...state, loading: false,
                }
            })
            await CommerceThunkService.GetProductPage(() => { }, state);
        } else {
            Notification(response.responseMessage as string, false)
            store.dispatch({
                type: ActionTypes.ProductPage.Set_Product_Page_State,
                payload: { ...state, loading: false }
            })
        }
    }
    static DeleteProduct = async (dispatch: any, state: State.ProductPage) => {
        const response = await POST(apiConfig.Product.Delete + state.request?.id, {})
        if (response.success) {
            let message = '';
            message = 'Product deleted successfully';
            Notification(message, true);
            store.dispatch({
                type: ActionTypes.ProductPage.Set_Product_Page_State,
                payload: {
                    ...state, loading: false, isView: false
                }
            })
            await CommerceThunkService.GetProductPage(() => { }, state);
        } else {
            Notification(response.responseMessage as string, false)
            store.dispatch({
                type: ActionTypes.ProductPage.Set_Product_Page_State,
                payload: { ...state, loading: false }
            })
        }
    }
    static DuplicateProduct = async (dispatch: any, state: State.ProductPage) => {
        const response = await POST(apiConfig.Product.Duplicate + state.request?.id, {})
        if (response.success) {
            let message = '';
            message = 'Product duplicated successfully';
            Notification(message, true);
            store.dispatch({
                type: ActionTypes.ProductPage.Set_Product_Page_State,
                payload: {
                    ...state, loading: false, isView: false
                }
            })
            await CommerceThunkService.GetProductPage(() => { }, state);
        } else {
            Notification(response.responseMessage as string, false)
            store.dispatch({
                type: ActionTypes.ProductPage.Set_Product_Page_State,
                payload: { ...state, loading: false }
            })
        }
    }

    static GetProductPage = async (dispatch: any, state: State.ProductPage) => {
        CommerceThunkService.LoadDataTable(true);
        const response = await POST(apiConfig.Product.GetProduct
            + localStorage.getItem('****'), {});
        CommerceThunkService.LoadDataTable(false);
        if (response.success) {
            let data: Array<Response.Product> = response.data?.$values;
            const dataSize = data?.length;
            await data.forEach((element: Response.Product, index: number) => {
                element.key = (dataSize - (index + 1)) + 1;
                element.name = element.productName;
                element.price = 'NGN ' + Number(element.unitPrice).toLocaleString();
                element.stock = stokTag(element.isUnlimited as boolean, element.inStock as number);
                element.dateCreated = new DateTime().ConvertAPIDate(element.dateCreated as string);
            });
            data = data.reverse()
            store.dispatch({
                type: ActionTypes.ProductPage.Set_Product_Page_State,
                payload: {
                    ...state,
                    enableStep:false,
                    row: data, originalRows: data, unFilteredResponse: data,
                    loading: false, response: data,
                },
            });
        }
    }
    static GetProductPageById = async (dispatch: any, state: State.ProductPage) => {
        CommerceThunkService.LoadDataTable(true);
        const response = await POST(apiConfig.Product.GetProduct
            + localStorage.getItem('****'), {});
        CommerceThunkService.LoadDataTable(false);
        if (response.success) {
            let data: Array<Response.Product> = response.data?.$values;
            await data.forEach((element: Response.Product, index: number) => {
                element.key = index + 1;
                element.name = element.productName;
                element.price = 'NGN ' + Number(element.unitPrice).toLocaleString();
                element.stock = stokTag(element.isUnlimited as boolean, element.inStock as number);
                element.dateCreated = new DateTime().ConvertAPIDate(element.dateCreated as string);
            });
            const productDetails = data.filter(x => {
                return x.id === parseInt(state.productId as string)
            })[0]
            state.productDetails = productDetails;
            state.isView = true
            state = CommerceStateBusiness.UpdateProductPageRequest(state)
            store.dispatch({
                type: ActionTypes.ProductPage.Set_Product_Page_State,
                payload: {
                    ...state,
                    row: data, originalRows: data, unFilteredResponse: data,
                    loading: false, response: data,
                    productInventory: {},
                },
            });
        }
    }
    static GetProductTransactions = async (dispatch: any, state: State.ProductPage) => {
        const response = await POST(apiConfig.Product.GetProductTransation
            + state.productDetails?.id, {});
        if (response.success) {
            const productTransactions: Array<Response.ProductTransactions> = response.data.$values;
            const totalRevenue = productTransactions.reduce(function (a: number, b: Response.ProductTransactions) {
                return a + b.amount;
            }, 0);
            const unitSold = productTransactions.reduce(function (a: number, b: Response.ProductTransactions) {
                return a + b.quantity;
            }, 0);
            const excelColumn = DataTableUtil.SetExcelColumn([
                "firstName",
                "lastName",
                "email",
                "amount",
                "quantity",
                "dateCreated",
                "paymentType",
                "cardPan",
                "expiryMonth",
                "expiryYear",
                "accountNumber",
                "accountName",
                "currency",
                "transactionReference",
                "country",
                "phoneNumber",
                "brand",
                "processor",
                "paymentResponseCode",
                "paymentResponseMessage",
                "deliveryFee",
                "Shipping Region",
                "Delivery Street",
                "Delivery State",
                "Delivery Country",
                "Delivery Note",
            ])
            let excelRow = [] as any;
            productTransactions?.forEach((x) => {
                excelRow.push({
                    firstName: getExtraInfo(x.deliveryDetails)?.FirstName,
                    lastName: getExtraInfo(x.deliveryDetails)?.LastName,
                    email: x.email,
                    amount: x.amount,
                    quantity: x.quantity,
                    dateCreated: x.dateCreated,
                    paymentType: x.paymentType,
                    cardPan: x.cardPan,
                    expiryMonth: x.expiryMonth,
                    expiryYear: x.expiryYear,
                    accountNumber: x.accountName,
                    accountName: x.accountName,
                    currency: x.currency,
                    transactionReference: x.transactionReference,
                    country: x.country,
                    phoneNumber: x.phoneNumber,
                    brand: x.brand,
                    processor: x.processor,
                    paymentResponseCode: x.paymentResponseCode,
                    paymentResponseMessage: x.paymentResponseMessage,
                    deliveryFee: getExtraInfo(x.deliveryDetails)?.DeliveryFee,
                    shippingRegion: getExtraInfo(x.deliveryDetails)?.ShippingRegion,
                    street: getExtraInfo(x.deliveryDetails)?.DeliveryStreetAddress,
                    state: getExtraInfo(x.deliveryDetails)?.deliveryStateAddress,
                    deliveryCountry: getExtraInfo(x.deliveryDetails)?.deliveryCountryAddress,
                    deliveryNote: getExtraInfo(x.deliveryDetails)?.DeliveryNote,
                });
            });
            store.dispatch({
                type: ActionTypes.ProductPage.Set_Product_Page_State,
                payload: {
                    ...state,
                    productTransactions,
                    originalProductTransactions: productTransactions,
                    loadingTransactions: false,
                    totalRevenue,
                    unitSold,
                    excelRow,
                    excelColumn,
                },
            });
        } else {
            store.dispatch({
                type: ActionTypes.ProductPage.Set_Product_Page_State,
                payload: {
                    ...state,
                    loadingTransactions: false
                },
            });
        }
    }
    static GetStorePage = async (dispatch: any, state: State.StorePage) => {
        CommerceThunkService.LoadDataTable(true);
        const response = await GET(apiConfig.Store.GetStore
            + localStorage.getItem('****'));
        CommerceThunkService.LoadDataTable(false);
        if (response.success) {
            let data: Array<Response.StorePage> = response.data.$values;
            const dataSize = data?.length;
            await data.forEach((element: Response.StorePage, index: number) => {
                element.key = (dataSize - (index + 1)) + 1;
                element.link = linkTag(element.storeLink);
                element.status = OrderStatus(element.isActive);
                element.orders = element.orderCount;
                element.dateCreated = new DateTime().ConvertAPIDate(element.dateCreated as string);
                element.numberOfProducts = element.storeProduct?.$values ? element.storeProduct?.$values?.length : 0
            });
            data = data.reverse()
            state.row = data;
            state.response = data
            state.unFilteredResponse = data;
            state.originalRows = data
            state.loading = false;
            let storeDetails: Response.StorePage = new Response.StorePage();
            if (state.request && state.request.id) {
                storeDetails = data.filter(x => {
                    return x.id === state.request?.id
                })[0];
            }
            store.dispatch({
                type: ActionTypes.StorePage.Set_Store_Page_State,
                payload: { ...state, productDetails: storeDetails },
            });
        }
    }
    static GetStorePageById = async (dispatch: any, state: State.StorePage) => {
        CommerceThunkService.LoadDataTable(true);
        const response = await GET(apiConfig.Store.GetStore
            + localStorage.getItem('****'));
        CommerceThunkService.LoadDataTable(false);
        if (response.success) {
            let data: Array<Response.StorePage> = response.data.$values;
            await data.forEach((element: Response.StorePage, index: number) => {
                element.key = index + 1;
                element.link = linkTag(element.storeLink);
                element.status = OrderStatus(element.isActive);
                element.orders = element.orderCount;
                element.dateCreated = new DateTime().ConvertAPItoFieldDate(element.dateCreated as string);
                element.numberOfProducts = element.storeProduct?.$values ? element.storeProduct?.$values?.length : 0
            });
            state.row = data;
            state.response = data
            state.unFilteredResponse = data;
            state.originalRows = data
            state.loading = false;
            state.isView = true;
            state.tabKey = '2'
            let storeDetails: Response.StorePage = new Response.StorePage();
            if (state.storeId) {
                storeDetails = data.filter(x => {
                    return x.id === parseInt(state.storeId as string)
                })[0];
            }
            CommerceThunkService.GetStoreByID(() => { }, { ...state, productDetails: storeDetails })
        }
    }
    static GetStoreProduct = async (dispatch: any, state: State.StorePage) => {
        const response = await POST(apiConfig.Product.GetProduct
            + localStorage.getItem('****'), {});
        if (response.success) {
            let data: Array<Response.Product> = response.data?.$values;
            let storeProducts: Array<State.ProductData> = new Array<State.ProductData>();
            data.forEach((x) => {
                storeProducts.push({
                    id: x.id,
                    productName: x.productName,
                    isUnlimited: x.isUnlimited,
                    inStock: x.inStock,
                    checked: false,
                    url: getImage(x) === "error" ? placeholder : getImage(x),
                });
            });
            store.dispatch({
                type: ActionTypes.StorePage.Set_Store_Page_State,
                payload: {
                    ...state,
                    storeProducts: {
                        ...state.storeProducts,
                        response: storeProducts,
                        originalResponse: storeProducts
                    }
                },
            });
        }
    }
    static GetProductNotInStore = async (dispatch: any, state: State.StorePage) => {
        const response = await GET(apiConfig.Store.GetProductNotInStore
            + `${localStorage.getItem('****')}&storeId=${state.request?.id}`);
        if (response.success) {
            let data: Array<Response.Product> = response.data?.$values;
            let storeProducts: Array<State.ProductData> = new Array<State.ProductData>();
            data.forEach((x) => {
                storeProducts.push({
                    id: x.id,
                    productName: x.productName,
                    isUnlimited: x.isUnlimited,
                    inStock: x.inStock,
                    checked: false,
                    url: getImage(x) === "error" ? placeholder : getImage(x),
                });
            });
            store.dispatch({
                type: ActionTypes.StorePage.Set_Store_Page_State,
                payload: {
                    ...state,
                    storeProducts: {
                        ...state.storeProducts,
                        response: storeProducts,
                        originalResponse: storeProducts
                    }
                },
            });
        }
    }
    static GetStoreByID = async (dispatch: any, state: State.StorePage) => {
        CommerceThunkService.LoadDataTable(true);
        state = CommerceStateBusiness.UpdateStoreRequest(state);
        const response = await GET(apiConfig.Store.GetStoreByID
            + state.productDetails?.id);
        CommerceThunkService.LoadDataTable(false);
        if (response.success) {
            let storeProductsResponse: Array<Response.StoreProducts> = response.data?.storeProduct?.$values;
            let productData: Array<State.ProductData> = new Array<State.ProductData>();
            storeProductsResponse.forEach((x) => {
                productData.push({
                    id: x.id,
                    productId: x.productID,
                    productName: x.product?.productName ? x.product?.productName : "",
                    isUnlimited: x.product?.isUnlimited,
                    inStock: x.product?.inStock,
                    price: "NGN " + !isNaN(x.product?.unitPrice as number) ? Number(x.product?.unitPrice).toLocaleString() : '0.00',
                    sold: 0,
                    isActive: x.isActive,
                    url:
                        getImage(x.product as any) === "error"
                            ? placeholder
                            : getImage(x.product as any),
                });
            });
            store.dispatch({
                type: ActionTypes.StorePage.Set_Store_Page_State,
                payload: {
                    ...state,
                    productData,
                    unfilteredProductData: productData,
                    loadingTransactions: false
                },
            });
        }
    }
    static CreateStorePage = async (dispatch: any, state: State.StorePage) => {
        const response = await POST(apiConfig.Store.AddStore, state.request);
        if (response.success) {
            Notification('Store Created sucessfully', true)
            await CommerceThunkService.GetStorePage(() => { }, {
                ...state, loading: false,
                showStoreProductsModal: true,
                showModal: false, isEditStoreProduct: false,
                request: { ...state.request, id: response.data?.id }
            })
        } else {
            store.dispatch({
                type: ActionTypes.StorePage.Set_Store_Page_State,
                payload: {
                    ...state, loading: false
                },
            });
            Notification(response.responseMessage as string, false)
        }
    }
    static UpdateStorePage = async (dispatch: any, state: State.StorePage) => {
        const response = await POST(apiConfig.Store.UpdateStore, state.request);
        if (response.success) {
            Notification('Store updated sucessfully', true)

            await CommerceThunkService.GetStorePage(() => { }, {
                ...state, loading: false,
                showStoreProductsModal: false, showModal: false,
                storeCustomization: {
                    ...state.storeCustomization,
                    editType: 'none'
                }
            })
        } else {
            state = CommerceStateBusiness.UpdateStoreRequest(state);
            store.dispatch({
                type: ActionTypes.StorePage.Set_Store_Page_State,
                payload: {
                    ...state, loading: false
                },
            });
            Notification(response.responseMessage as string, false)
        }
    }
    static UpdateStoreProductPage = async (dispatch: any, state: State.StorePage) => {
        const response = await POST(apiConfig.Store.UpdateStore, state.request);
        if (response.success) {
            Notification('Store product(s) updated sucessfully', true)
            await CommerceThunkService.GetStoreByID(() => { }, {
                ...state, loading: false,
                isEdit: true,
                isView: true,
                showStoreProductsModal: false, showModal: false,
                tabKey: '2',
                storeCustomization: {
                    ...state.storeCustomization,
                    editType: 'none',
                }
            })
        } else {
            state = CommerceStateBusiness.UpdateStoreRequest(state);
            store.dispatch({
                type: ActionTypes.StorePage.Set_Store_Page_State,
                payload: {
                    ...state, loading: false
                },
            });
            Notification(response.responseMessage as string, false)
        }
    }
    static DeleteStorePage = async (dispatch: any, state: State.StorePage) => {
        const response = await POST(apiConfig.Store.DeleteStore + state.request?.id, {});
        if (response.success) {
            Notification('Store deleted sucessfully', true)
            await CommerceThunkService.GetStorePage(() => { }, {
                ...state, loading: false,
                showStoreProductsModal: false, showModal: false,
                request: {}
            })
        } else {
            store.dispatch({
                type: ActionTypes.StorePage.Set_Store_Page_State,
                payload: {
                    ...state, loading: false
                },
            });
            Notification(response.responseMessage as string, false)
        }
    }
    static ValidateStoreLink = async (dispatch: any, state: State.StorePage) => {
        const response = await GET(apiConfig.Store.ValidateLink + state.request?.storeReference)
        if (!response.data) {
            store.dispatch({
                type: ActionTypes.StorePage.Set_Store_Page_State,
                payload: { ...state, validating: false, linkValidility: 'valid' }
            })
        } else {
            store.dispatch({
                type: ActionTypes.StorePage.Set_Store_Page_State,
                payload: { ...state, validating: false, linkValidility: 'invalid' }
            })
        }
    }
    static GetStoreTransactions = async (dispatch: any, state: State.StorePage) => {
        const response = await GET(apiConfig.Store.GetStoreTransaction
            + state.productDetails?.id);
        if (response.success) {
            const storeTransactions: Array<Response.StoreTransactions> = response.data.$values;
            const totalRevenue = storeTransactions.reduce(function (a: number, b: Response.StoreTransactions) {
                return a + (b.amount as number);
            }, 0);
            let unitSold = 0;
            const excelColumn = DataTableUtil.SetExcelColumn([
                "firstName",
                "lastName",
                "email",
                "amount",
                "quantity",
                "dateCreated",
                "paymentType",
                "cardPan",
                "expiryMonth",
                "expiryYear",
                "accountNumber",
                "accountName",
                "currency",
                "transactionReference",
                "country",
                "phoneNumber",
                "brand",
                "processor",
                "paymentResponseCode",
                "paymentResponseMessage",
                "deliveryFee",
                "Shipping Region",
                "Delivery Street",
                "Delivery State",
                "Delivery Country",
                "Delivery Note",
            ])
            let excelRow = [] as any;
            storeTransactions?.forEach((x) => {
                x.cart?.$values?.forEach(element => {
                    unitSold = unitSold + (element.quantity as number)
                });
                excelRow.push({
                    firstName: getExtraInfo(x.deliveryDetails as string)?.FirstName,
                    lastName: getExtraInfo(x.deliveryDetails as string)?.LastName,
                    email: x.email,
                    amount: x.amount,
                    quantity: x.cart?.$values?.reduce(function (a: number, b: Response.CartValue) {
                        return a + (b.quantity as number);
                    }, 0),
                    dateCreated: x.dateCreated,
                    paymentType: x.paymentType,
                    cardPan: x.cardPan,
                    expiryMonth: x.expiryMonth,
                    expiryYear: x.expiryYear,
                    accountNumber: x.accountName,
                    accountName: x.accountName,
                    currency: x.currency,
                    transactionReference: x.transactionReference,
                    country: x.country,
                    phoneNumber: x.phoneNumber,
                    brand: x.brand,
                    processor: x.processor,
                    paymentResponseCode: x.paymentResponseCode,
                    paymentResponseMessage: x.paymentResponseMessage,
                    deliveryFee: getExtraInfo(x.deliveryDetails as string)?.DeliveryFee,
                    shippingRegion: getExtraInfo(x.deliveryDetails as string)?.ShippingRegion,
                    street: getExtraInfo(x.deliveryDetails as string)?.DeliveryStreetAddress,
                    state: getExtraInfo(x.deliveryDetails as string)?.deliveryStateAddress,
                    deliveryCountry: getExtraInfo(x.deliveryDetails as string)?.deliveryCountryAddress,
                    deliveryNote: getExtraInfo(x.deliveryDetails as string)?.DeliveryNote,
                });
            });
            store.dispatch({
                type: ActionTypes.StorePage.Set_Store_Page_State,
                payload: {
                    ...state,
                    storeTransactions,
                    originalStoreTransactions: storeTransactions,
                    loadingTransactions: false,
                    totalRevenue,
                    unitSold,
                    excelRow,
                    excelColumn,
                },
            });
        } else {
            store.dispatch({
                type: ActionTypes.StorePage.Set_Store_Page_State,
                payload: {
                    ...state,
                    loadingTransactions: false
                },
            });
        }
    }
}
const getExtraInfo = (
    deliveryDetails: string
): Response.ProductTransactionExtraFields => {
    try {
        let extraInfo: Response.ProductTransactionExtraFields =
            new Response.ProductTransactionExtraFields();
        extraInfo = JSON.parse(deliveryDetails);
        return extraInfo;
    } catch (error) {
        return {
            FirstName: "",
            LastName: "",
            DeliveryFee: 0,
            IsPayOnDelivery: false,
            deliveryStateAddress: "",
            deliveryCountryAddress: "",
            DeliveryNote: "",
            DeliveryStreetAddress: "",
        };;
    }
};
const getImage = (product: Response.Product): string => {
    if (
        product.productImages &&
        product.productImages.$values &&
        Array.isArray(product.productImages.$values) &&
        product.productImages.$values.length > 0
    ) {
        if (product.productImages.$values[0].url?.includes('http')) {
            return product.productImages.$values[0].url;
        } else {
            return 'error'
        }

    } else {
        return "error";
    }
};
