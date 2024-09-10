export const transactionSchema = {
  type: "object",
  properties: {
    amount: { type: "number", example: 1000 },
    currency: { type: "string", example: "USD" },
    lang: { type: "string", example: "en" },
    hookUrl: { type: "string", example: "http://localhost:3000/hook" },
    callback: { type: "string", example: "http://localhost:3000/callback" },
    callbackFail: {
      type: "string",
      example: "http://localhost:3000/callbackFail",
    },
    billing: {
      type: "object",
      properties: {
        firstName: { type: "string", example: "John" },
        lastName: { type: "string", example: "Doe" },
        address1: { type: "string", example: "123 Street" },
        city: { type: "string", example: "Cityville" },
        state: { type: "string", example: "State" },
        country: { type: "string", example: "US" },
        postalCode: { type: "string", example: "12345" },
        phone: { type: "string", example: "1234567890" },
        email: { type: "string", example: "john.doe@example.com" },
        externalUserId: { type: "string", example: "user123" },
        dateOfBirth: { type: "string", format: "date", example: "1980-01-01" },
      },
      required: [
        "firstName",
        "lastName",
        "address1",
        "city",
        "state",
        "country",
        "postalCode",
        "phone",
        "email",
      ],
    },
    orderId: { type: "string", example: "order123" },
    cardToken: { type: "string", example: "token123" },
    payment3dsType: {
      type: "string",
      enum: ["Redirection"],
      example: "Redirection",
    },
    kycVerified: { type: "boolean", example: true },
    previousPaymentCount: { type: "number", example: 5 },
    cardData: {
      type: "object",
      properties: {
        cardNumber: { type: "string", example: "4111111111111111" },
        cardHolderName: { type: "string", example: "John Doe" },
        cardExpiryDate: { type: "string", example: "12" },
        cardExpiryDate2: { type: "string", example: "2024" },
        cardCvv: { type: "string", example: "123" },
        browser: {
          type: "object",
          properties: {
            colorDepth: { type: "number", example: 24 },
            userAgent: { type: "string", example: "Mozilla/5.0" },
            language: { type: "string", example: "en-US" },
            timeZone: { type: "string", example: "-300" },
            screenWidth: { type: "number", example: 1920 },
            javaEnabled: { type: "boolean", example: true },
            customerIp: { type: "string", example: "192.168.1.1" },
            screenHeight: { type: "number", example: 1080 },
            windowHeight: { type: "number", example: 800 },
            timeZoneOffset: { type: "number", example: -300 },
            windowWidth: { type: "number", example: 1200 },
          },
          required: [
            "colorDepth",
            "userAgent",
            "language",
            "timeZone",
            "screenWidth",
            "javaEnabled",
            "customerIp",
            "screenHeight",
            "windowHeight",
            "timeZoneOffset",
            "windowWidth",
          ],
        },
      },
      required: [
        "cardNumber",
        "cardHolderName",
        "cardExpiryDate",
        "cardExpiryDate2",
        "cardCvv",
        "browser",
      ],
    },
    saveCard: { type: "boolean", example: true },
    merchantInformation: {
      type: "object",
      properties: {
        name: { type: "string", example: "Merchant Name" },
        merchantName: { type: "string", example: "Merchant Corp" },
        country: { type: "string", pattern: "^[A-Z]{2}$", example: "US" },
        address1: { type: "string", example: "456 Commerce St" },
        administrativeArea: { type: "string", example: "Region" },
        locality: { type: "string", example: "Town" },
        postalCode: { type: "string", example: "67890" },
        url: {
          type: "string",
          format: "uri",
          example: "http://merchantwebsite.com",
        },
        customerServicePhoneNumber: { type: "string", example: "0987654321" },
        categoryCode: { type: "string", example: "1234" },
        noteToBuyer: {
          type: "string",
          example: "Thank you for your purchase!",
        },
      },
      required: ["name"],
    },
  },
  required: [
    "amount",
    "currency",
    "lang",
    "hookUrl",
    "callback",
    "callbackFail",
    "billing",
    "orderId",
    "cardToken",
    "payment3dsType",
    "kycVerified",
    "previousPaymentCount",
    "cardData",
    "saveCard",
  ],
};

export const missingIDschema = {
  type: "object",
  properties: {
    error: { type: "string", example: "MissingPaymentID" },
    message: { type: "string", example: "Payment ID is missing." },
  },
};

export const createTransactionResponseSchema = {
  type: "object",
  properties: {
    paymentId: { type: "string", example: "869EA7AE9B204276B8F3ECA625FA5E2F" },
  },
};

export const errorResponseSchema400 = {
  type: "object",
  properties: {
    error: { type: "string", example: "Bad Request" },
    message: {
      "statusCode": 400,
      type: "string",
      example: "body should have required property 'amount'",
    },
  },
};

export const errorResponseSchema500wbhook = {
  type: "object",
  properties: {
    error: { type: "string", example: "Bad Request" },
    message: {
      type: "string",
      example: "Failed to process webhook",
    },
  },
};

export const errorResponseSchema500create = {
  type: "object",
  properties: {
    error: { type: "string", example: "Bad Request" },
    message: {
      type: "string",
      example: "Failed to create transaction",
    },
  },
};

export const webhookResponseSchema = {
  type: "object",
  properties: {
    "3dsRedirectUrl": {
      type: "string",
      example: "https://example.com/redirect",
    },
  },
};
