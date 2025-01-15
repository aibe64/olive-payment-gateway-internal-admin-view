import { State } from "../../models/application/state";
import { Request } from "../../models/client/apiRequest";
import apiConfig from "../apiConfig";
import { POST } from "../apiService";

export class CommerceStateBusiness {
  static SetModal(state: State.PaymentPage) {
    state.showModal = !state.showModal;
    return state;
  }
  static UpdateField(state: State.PaymentPage): State.PaymentPage {
    if (Array.isArray(state.fields)) {
      let fields: State.PageFields[] = new Array<State.PageFields>();
      state.fields.forEach((x) => {
        if (x.name && x.name?.length > 0) {
          fields.push(x);
        }
      });
      if (fields.length > 0) {
        state.request = {
          ...state.request,
          additionalFields: JSON.stringify(fields),
        };
      }
    }
    return state;
  }
  static UpdatePaymentPageRequest(state: State.PaymentPage): State.PaymentPage {
    state.request = new Request.PaymentPage();
    state.request.amount = state.pageDetails?.amount;
    state.request.pageName = state.pageDetails?.pageName;
    state.request.description = state.pageDetails?.description;
    state.request.paymentPageLinkReference =
      state.pageDetails?.paymentPageLinkReference;
    state.request.paymentPageLink = state.pageDetails?.paymentPageLink;
    state.request.pageType = state.pageDetails?.pageType;
    state.request.id = state.pageDetails?.id;
    state.request.successMessage = state.pageDetails?.successMessage;
    state.request.notificationEmail = state.pageDetails?.notificationEmail;
    state.request.isFixedAmount = state.pageDetails?.isFixedAmount;
    state.request.isPhoneNumberRequired =
      state.pageDetails?.isPhoneNumberRequired;
    state.request.isActive = state.pageDetails?.isActive;
    state.request.callBackUrl = state.pageDetails?.callBackUrl;
    state.request.merchantId = parseInt(sessionStorage.getItem("****") as string);
    if (state.pageDetails?.amount && state.pageDetails?.amount > 0) {
      state.request.price = formatAmount(state.pageDetails?.amount as number);
    } else {
      state.request.price = "0.00";
    }
    return state;
  }
  static UpdateProductPageRequest(state: State.ProductPage): State.ProductPage {
    if (state.isView && Object.keys(state.productDetails as any).length > 0) {
      let delivery = new Array<State.Delivery>();
      let deliveryOptions: string | undefined = undefined;
      state = { ...state, productInventory: {} };
      if (
        state.productDetails?.deliveryLocation &&
        state.productDetails?.deliveryLocation.length > 0 &&
        state.productDetails.options === null
      ) {
        delivery.push({
          id: Math.floor(Math.random() * 101),
          location: state.productDetails.deliveryLocation,
          fee: state.productDetails?.deliveryFee,
          price: state.productDetails.deliveryPrice,
        });
        state = {
          ...state,
          delivery,
          productDelivery: {
            ...state.productDelivery,
            showDelivery: true,
          },
        };
        deliveryOptions = JSON.stringify(delivery);
      } else if (state.productDetails?.options !== null) {
        try {
          delivery = JSON.parse(state.productDetails?.options as string);
          deliveryOptions = state.productDetails?.options;
          state = {
            ...state,
            delivery,
            productDelivery: {
              ...state.productDelivery,
              showDelivery: true,
            },
          };
        } catch (error) {}
      }
      state.request = {
        ...state.request,
        unitPrice: state.productDetails?.unitPrice,
        price: Number(state.productDetails?.unitPrice).toLocaleString(),
        minimumOrder: state.productDetails?.minimumOrder,
        maximumOrder: state.productDetails?.maximumOrder,
        stockLimitAlert: state.productDetails?.stockLimitAlert,
        inStock: state.productDetails?.inStock,
        productName: state.productDetails?.productName,
        description: state.productDetails?.description,
        productUrl: state.productDetails?.productUrl,
        productReference: state.productDetails?.productReference,
        currency: "NGN",
        isUnlimited: state.productDetails?.isUnlimited,
        isActive: state.productDetails?.isActive,
        id: state.productDetails?.id,
        deliveryFee:
          state.productDetails?.deliveryFee === null
            ? 0
            : state.productDetails?.deliveryFee,
        deliveryLocation: state.productDetails?.deliveryLocation,
        deliveryPrice: Number(
          state.productDetails?.deliveryFee
        ).toLocaleString(),
        isPayOnDelivery:
          state.productDetails?.isPayOnDelivery === null
            ? false
            : state.productDetails?.isPayOnDelivery,
        isDeliveryAddressRequired:
          state.productDetails?.isDeliveryAddressRequired === null
            ? false
            : state.productDetails?.isDeliveryAddressRequired,
        deliveryNoteOption: state.productDetails?.deliveryNoteOption,
        callBackUrl: state.productDetails?.callBackUrl,
        successMessage: state.productDetails?.successMessage,
        notificationEmail: state.productDetails?.notificationEmail,
        options: deliveryOptions,
      };
      let productImages = new Array<Request.ProductImage>();
      let fileList = new Array<State.ProductFileList>();
      if (Array.isArray(state.productDetails?.productImages?.$values)) {
        state.productDetails?.productImages?.$values.forEach((x) => {
          productImages.push({ id: x.id, filename: x.fileName, url: x.url });
          fileList.push({
            uid: x.fileName,
            name: x.fileName,
            url: x.fileName,
            thumbUrl: x.fileName,
            status: "done",
          });
        });
        state.request = { ...state.request, productImages };
      }
      if (
        state.productDetails?.deliveryLocation &&
        state.productDetails?.deliveryLocation.length > 0 &&
        state.productDetails.options === null
      ) {
        POST(apiConfig.Product.Update, state.request);
      }
      //   let variants: State.ProductOptions[][] = new Array<
      //     Array<State.ProductOptions>
      //   >();
      //   try {
      //     if (state.productDetails?.options === null) {
      //       state.productInventory = {
      //         ...state.productInventory,
      //         showOptions: false,
      //       };
      //     } else {
      //       variants = JSON.parse(state.productDetails?.options as string);
      //       state.productInventory = {
      //         ...state.productInventory,
      //         variants,
      //         showOptions: true,
      //       };
      //     }
      //   } catch (error) {
      //     variants = new Array<Array<State.ProductOptions>>();
      //     state.productInventory = {
      //       ...state.productInventory,
      //       showOptions: false,
      //     };
      //   }
      //   state.productCustomization = { ...state.productCustomization, fileList };
    }

    return state;
  }
  static RetainProductPageRequest(state: State.ProductPage): State.ProductPage {
    state.request = {
      ...state.request,
      unitPrice: state.productDetails?.unitPrice,
      price: Number(state.productDetails?.unitPrice).toLocaleString(),
      minimumOrder: state.productDetails?.minimumOrder,
      maximumOrder: state.productDetails?.maximumOrder,
      stockLimitAlert: state.productDetails?.stockLimitAlert,
      inStock: state.productDetails?.inStock,
      productName: state.productDetails?.productName,
      description: state.productDetails?.description,
      productUrl: state.productDetails?.productUrl,
      productReference: state.productDetails?.productReference,
      currency: "NGN",
      isUnlimited: state.productDetails?.isUnlimited,
      isActive: state.productDetails?.isActive,
      id: state.productDetails?.id,
      deliveryFee:
        state.productDetails?.deliveryFee === null
          ? 0
          : state.productDetails?.deliveryFee,
      deliveryLocation: state.productDetails?.deliveryLocation,
      deliveryPrice: Number(state.productDetails?.deliveryFee).toLocaleString(),
      isPayOnDelivery:
        state.productDetails?.isPayOnDelivery === null
          ? false
          : state.productDetails?.isPayOnDelivery,
      isDeliveryAddressRequired:
        state.productDetails?.isDeliveryAddressRequired === null
          ? false
          : state.productDetails?.isDeliveryAddressRequired,
      deliveryNoteOption: state.productDetails?.deliveryNoteOption,
      callBackUrl: state.productDetails?.callBackUrl,
      successMessage: state.productDetails?.successMessage,
      notificationEmail: state.productDetails?.notificationEmail,
      options: state.productDetails?.options,
    };
    return state;
  }
  static UpdateProductPageDetails(state: State.ProductPage): State.ProductPage {
    state.productDetails = {
      ...state.productDetails,
      unitPrice: state.request?.unitPrice,
      price: Number(state.request?.unitPrice).toLocaleString(),
      minimumOrder: state.request?.minimumOrder,
      maximumOrder: state.request?.maximumOrder,
      stockLimitAlert: state.request?.stockLimitAlert,
      inStock: state.request?.inStock,
      productName: state.request?.productName,
      description: state.request?.description,
      productUrl: state.request?.productUrl,
      productReference: state.request?.productReference,
      currency: "NGN",
      isUnlimited: state.request?.isUnlimited,
      isActive: state.request?.isActive,
      id: state.request?.id,
      deliveryFee:
        state.request?.deliveryFee === null ? 0 : state.request?.deliveryFee,
      deliveryLocation: state.request?.deliveryLocation,
      deliveryPrice: Number(state.request?.deliveryFee).toLocaleString(),
      isPayOnDelivery:
        state.request?.isPayOnDelivery === null
          ? false
          : state.request?.isPayOnDelivery,
      isDeliveryAddressRequired:
        state.request?.isDeliveryAddressRequired === null
          ? false
          : state.request?.isDeliveryAddressRequired,
      deliveryNoteOption: state.request?.deliveryNoteOption,
      callBackUrl: state.request?.callBackUrl,
      successMessage: state.request?.successMessage,
      notificationEmail: state.request?.notificationEmail,
      options: state.request?.options,
    };
    return state;
  }

  static AddOptions(state: State.ProductPage): State.ProductPage {
    let productOption = new State.ProductOptions();
    if (
      Array.isArray(state.productInventory?.variants) &&
      (state.productInventory?.variants.length as number) > 0
    ) {
      productOption = {
        key: state.productInventory?.key,
        static: false,
        value: null,
        id: Math.floor(Math.random() * 100) + 100,
      };
      state.productInventory?.variants.forEach((x) => {
        x.unshift(productOption);
      });
    } else {
      const productOptions = new Array<State.ProductOptions>();
      productOption = {
        key: state.productInventory?.key,
        static: false,
        value: null,
        id: 8,
      };
      productOptions.push(productOption);
      productOptions.push({
        key: "Price",
        static: true,
        value: state.request?.unitPrice,
        id: 1,
      });
      productOptions.push({
        key: "Quantity",
        static: true,
        value: state.request?.inStock,
        id: 2,
      });
      productOptions.push({
        key: "Low Stock",
        static: true,
        value: state.request?.stockLimitAlert,
        id: 3,
      });
      productOptions.push({
        key: "Min Order",
        static: true,
        value: state.request?.minimumOrder,
        id: 4,
      });
      productOptions.push({
        key: "Max. Order",
        static: true,
        value: state.request?.maximumOrder,
        id: 5,
      });
      productOptions.push({ key: "Images", static: true, value: null, id: 6 });
      productOptions.push({ key: "Status", static: true, value: false, id: 7 });
      state.productInventory = {
        ...state.productInventory,
        variants: [[...productOptions]],
      };
    }
    return state;
  }
  static UpdateOptions(state: State.ProductPage): State.ProductPage {
    if (
      Array.isArray(state.productInventory?.variants) &&
      (state.productInventory?.variants.length as number) > 0
    ) {
      state.productInventory?.variants.forEach((x) => {
        const index = x.findIndex((y) => y.id === state.productInventory?.id);
        x[index].key = state.productInventory?.key;
      });
    }
    return state;
  }
  static AddVariants(state: State.ProductPage): State.ProductPage {
    const productOptions = new Array<State.ProductOptions>();
    productOptions.push({
      key: "Price",
      static: true,
      value: state.request?.unitPrice,
      id: 1,
    });
    productOptions.push({
      key: "Quantity",
      static: true,
      value: state.request?.inStock,
      id: 2,
    });
    productOptions.push({
      key: "Low Stock",
      static: true,
      value: state.request?.stockLimitAlert,
      id: 3,
    });
    productOptions.push({
      key: "Min Order",
      static: true,
      value: state.request?.minimumOrder,
      id: 4,
    });
    productOptions.push({
      key: "Max. Order",
      static: true,
      value: state.request?.maximumOrder,
      id: 5,
    });
    productOptions.push({ key: "Images", static: true, value: null, id: 6 });
    productOptions.push({ key: "Status", static: true, value: false, id: 7 });
    if (
      Array.isArray(state.productInventory?.variants) &&
      (state.productInventory?.variants.length as number) > 0
    ) {
      const dynamicKeys = state.productInventory?.variants[0];
      dynamicKeys
        ?.slice()
        .reverse()
        .forEach((x) => {
          if (x.static === false) {
            productOptions.unshift({
              key: x.key,
              static: false,
              value: null,
              id: Math.floor(Math.random() * 100) + 100,
            });
          }
        });
      state.productInventory?.variants.push(productOptions);
      state.request = {
        ...state.request,
        options: JSON.stringify(state.productInventory?.variants),
      };
    } else {
      if (Array.isArray(state.productInventory?.variants)) {
        state.productInventory?.variants.push(productOptions);
        state.request = {
          ...state.request,
          options: JSON.stringify(state.productInventory?.variants),
        };
      }
    }
    return state;
  }

  static DeleteOptions(state: State.ProductPage): State.ProductPage {
    state.productInventory?.variants?.forEach((x, index: number) => {
      x = x.filter((y) => {
        return y.id !== state.productInventory?.id;
      });
      if (
        state.productInventory?.variants &&
        state.productInventory?.variants.length > 0
      ) {
        let variants = state.productInventory?.variants;
        variants[index] = x;
        state.productInventory = { ...state.productInventory, variants };
      }
    });
    state.request = {
      ...state.request,
      options: JSON.stringify(state.productInventory?.variants),
    };
    return state;
  }

  static DeleteVariants(state: State.ProductPage): State.ProductPage {
    const productVariants = state.productInventory?.variants;
    productVariants?.splice(state.productInventory?.index as number, 1);
    state.request = {
      ...state.request,
      options: JSON.stringify(productVariants),
    };
    state.productInventory = {
      ...state.productInventory,
      variants: productVariants,
    };
    return state;
  }
  static UpdateVariants(state: State.ProductPage): State.ProductPage {
    const productVariants = state.productInventory?.variants;
    if (Array.isArray(productVariants)) {
      let variant: State.ProductOptions[] =
        productVariants[state.productInventory?.index as number];
      if (Array.isArray(variant)) {
        const index = variant.findIndex(
          (y) => y.id === state.productInventory?.id
        );
        variant[index].value = state.productInventory?.values;
        productVariants[state.productInventory?.index as number] = variant;
        state.productInventory = {
          ...state.productInventory,
          variants: productVariants,
        };
        state.request = {
          ...state.request,
          options: JSON.stringify(state.productInventory?.variants),
        };
      }
    }
    return state;
  }
  static UpdateStoreProduct(state: State.StorePage): State.StorePage {
    if (state.storeProducts?.checkAll) {
      if (Array.isArray(state.storeProducts.response)) {
        let storeProducts = new Array<Request.StoreProduct>();
        state.storeProducts.response.forEach((x) => {
          x.checked = state.storeProducts?.checked;
          if (state.storeProducts?.checked) {
            storeProducts.push({
              productID: x.id,
              operation: "Insert",
              isActive: true,
            });
          }
        });
        if (!state.storeProducts?.checked) {
          state = {
            ...state,
            request: {
              ...state.request,
              storeProducts: new Array<Request.StoreProduct>(),
            },
          };
        } else {
          state = {
            ...state,
            request: {
              ...state.request,
              storeProducts,
            },
          };
        }
      }
    } else {
      if (Array.isArray(state.storeProducts?.response)) {
        let storeProducts: State.ProductData[] = state.storeProducts
          ?.response as State.ProductData[];
        const index: number | undefined = storeProducts.findIndex(
          (x) => x.id === state.storeProducts?.id
        );
        storeProducts[index as number].checked = state.storeProducts?.checked;
        if (state.storeProducts?.checked) {
          const storeProduct = storeProducts[index as number];
          let storeProductRequest: Request.StoreProduct[] =
            new Array<Request.StoreProduct>();
          if (Array.isArray(state.request?.storeProducts)) {
            storeProductRequest = state.request
              ?.storeProducts as Request.StoreProduct[];
          }
          storeProductRequest.push({
            productID: storeProduct.id,
            operation: "Insert",
            isActive: true,
          });
          state = {
            ...state,
            request: {
              ...state.request,
              storeProducts: storeProductRequest,
            },
          };
        } else {
          if (Array.isArray(state.request?.storeProducts)) {
            const storeProductRequest: Request.StoreProduct[] | undefined =
              state.request?.storeProducts.filter((x) => {
                return x.productID !== state.storeProducts?.id;
              });
            state = {
              ...state,
              request: {
                ...state.request,
                storeProducts: storeProductRequest,
              },
            };
          }
        }
      }
    }
    return state;
  }
  static UpdateStoreProductRequest(state: State.StorePage): State.StorePage {
    if (Array.isArray(state.productData) && state.productData.length > 1) {
      const storeProductRequest = new Array<Request.StoreProduct>();
      storeProductRequest.push({
        productID: state.storeProductPayload?.productId,
        operation: state.storeProductPayload?.isRemove ? "Delete" : "Update",
        isActive: state.storeProductPayload?.isActive,
      });
      state = {
        ...state,
        request: {
          ...state.request,
          storeProducts: storeProductRequest,
        },
      };
    }
    return state;
  }
  static UpdateStoreDelivery(state: State.StorePage): State.StorePage {
    if (state.updateDelivery === true) {
      let delivery = new Array<State.Delivery>();
      let deliveryLocation = undefined;
      if (
        state.productDetails?.deliveryLocation &&
        state.productDetails?.deliveryLocation.length > 0 &&
        !state.productDetails?.deliveryLocation?.includes("[")
      ) {
        delivery.push({
          id: Math.floor(Math.random() * 101),
          location: state.productDetails.deliveryLocation,
          fee: parseFloat(state.productDetails?.deliveryFee as string),
          price: state.productDetails?.deliveryFee,
        });
        deliveryLocation = JSON.stringify(delivery);
        state = this.UpdateStoreRequest(state)
        state = {
          ...state,
          delivery,
          request: {
            ...state.request,
            deliveryLocation,
          },
        };
        POST(apiConfig.Store.UpdateStore, state.request);
      } else if (state.productDetails?.deliveryLocation?.includes("[")) {
        try {
          delivery = JSON.parse(
            state.productDetails?.deliveryLocation as string
          );
          deliveryLocation = state.productDetails?.deliveryLocation;
          state = this.UpdateStoreRequest(state)
          state = {
            ...state,
            delivery,
            request: {
              ...state.request,
              deliveryLocation,
            },
          };
          
        } catch (error) {}
      }
    }
    state = {...state, updateDelivery:false}
    return state;
  }
  static UpdateStoreRequest(state: State.StorePage): State.StorePage {
    state = {
      ...state,
      request: {
        id: state.productDetails?.id,
        storeName: state.productDetails?.storeName,
        storeLink: state.productDetails?.storeLink,
        isDeleted: state.productDetails?.isDeleted,
        isActive: state.productDetails?.isActive,
        currency: state.productDetails?.currency,
        storeReference: state.productDetails?.storeReference,
        themeColor: state.productDetails?.themeColor,
        welcomeMessage: state.productDetails?.welcomeMessage,
        description: state.productDetails?.description,
        phoneNumber: state.productDetails?.phoneNumber,
        whatappNumber: state.productDetails?.whatappNumber,
        email: state.productDetails?.email,
        instagram: state.productDetails?.instagram,
        facebook: state.productDetails?.facebook,
        twitter: state.productDetails?.twitter,
        isDeliveryAddressRequired:
          state.productDetails?.isDeliveryAddressRequired,
        deliveryNoteOption: state.productDetails?.deliveryNoteOption,
        deliveryFee: state.productDetails?.deliveryFee,
        deliveryPrice: Number(
          state.productDetails?.deliveryFee
        ).toLocaleString(),
        deliveryLocation: state.productDetails?.deliveryLocation,
        callBackUrl: state.productDetails?.callBackUrl,
        successMessage: state.productDetails?.successMessage,
        notificationEmail: state.productDetails?.notificationEmail,
      },
      storeDelivery: {
        ...state.storeDelivery,
        showDelivery:
          state.productDetails?.deliveryLocation &&
          state.productDetails?.deliveryLocation.length > 1
            ? true
            : false,
      },
    };
    return state;
  }
}
const formatAmount = (amount: number): string => {
  return Number(amount).toLocaleString();
};
