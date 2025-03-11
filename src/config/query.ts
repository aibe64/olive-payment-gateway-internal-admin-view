import { DocumentNode, gql } from "@apollo/client";

export const GET_TRANSACTIONS: DocumentNode = gql`
  query GetTransactions(
    $page: Int!
    $limit: Int!
    $filter: TransactionFilterInput!
  ) {
    transactions(page: $page, limit: $limit, filter: $filter) {
      items {
        id
        transactionReference
        firstname
        lastname
        amount
        paymentType
        publicKey
        clientRedirectUrl
        expiryMonth
        expiryYear
        email
        currency
        transactionId
        xpressReference
        providerReference
        phoneNumber
        narration
        cardBin
        brand
        cardType
        processor
        merchantId
        paymentResponseCode
        paymentResponseMessage
        dateCreated
        dateModified
        billerCode
        mandateCode
        transType
        cardPan
        metaData
        productDescription
        productId
        merchantName
        transactionNumber
        transactionDate
        oldMerchantId
        oldGatewayMerchantId
        userActivities {
          id
          accessCode
          createdAt
          message
          reference
          transactionId
          type
        }
      }
      totalCount
      pageNumber
      pageSize
    }
  }
`;

export const GET_STORE_TRANSACTIONS = gql`
  query StoreTransactions(
    $page: Int!
    $limit: Int!
    $filter: TransactionFilterInput!
  ) {
    storeTransactions(page: $page, limit: $limit, filter: $filter) {
      items {
        id
        firstName
        lastName
        email
        phoneNumber
        customerAddress
        city
        country
        deliveryNotes
        isBeneficiary
        totalAmount
        dateCreated
        storeName
        dateUpdated
        isDelivered
        isSuccessful
        transactionId
        status
        paymentResponseMessage
        productDescription
        paymentDate
        paymentReference
        metaData
        merchantId
        discount {
          code
          discountAmount
        }
        deliveryDetails {
          customerAddress
          deliveryFee
          region
        }
        productPurchased {
          id
          productName
          quantity
          amount
          isLiked
          rating
          rating
          comment
        }
      }
      totalCount
      pageNumber
      pageSize
    }
  }
`;

export const STORE_TRANSACTION_SUMMARY = gql`
  query StoreTransactionSummary($filter: TransactionFilterInput!) {
    storeTransactionSummarry(filter: $filter) {
      item {
        totalOrders
        totalNonDiscountedOrders
        totalDiscountedOrders
        totalGrossSales
        totalNetSales
        totalNonDiscountedAmount
        totalDiscountedAmount
        totalCompletedProductAmount
        totalAbandonedProductAmount
        averageItemsPerOrder
        averageOrderValue
        totalCartProduct
        totalCompletedProduct
        totalAbandonedProduct
        totalSuccessful
        totalSuccessfulAmount
        totalFailed
        totalFailedAmount
        topProducts {
          totalQuantity
          productName
        }
        topCustomers {
          totalQuantityOrder
          name
          email
        }
      }
    }
  }
`;

export const TRANSACTION_SUMMARY = gql`
  query TransactionSummary($filter: TransactionFilterInput!) {
    transactionSummarry(filter: $filter) {
      item {
        transactionVolume
        totalTransactionAmount
        nextSettlementAmount
        totalCardTransactionAmount
        totalUSSDTransactionAmount
        totalTransferTransactionAmount
        totalAccountTransactionAmount
        totalQRAmount
        totalENairaTransactionAmount
        totalWalletAmount
      }
    }
  }
`;

export const YEARLY_TRANSACTIONS = gql`
  query YearlyTransactions($filter: TransactionFilterInput!) {
    yearlyTransactions(filter: $filter) {
      items {
        transactionMonth
        totalTransactions
        totalTransactionAmount
        totalSuccessfulAmount
        totalSuccessful
        totalFailedAmount
        totalFailed
        totalPending
        totalPendingAmount
      }
    }
  }
`;
