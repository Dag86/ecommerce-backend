// ecommerce-tests/utils/testData.ts
// This file contains test data used in the Playwright test suite for the ecommerce application.
// It includes user information, valid card details, and address data. This data is used in various tests to simulate user interactions and validate functionality.

export const testUser = {
  email: 'test@example.com',
  name: 'Amir QA',
};

export const address = {
  country: 'United States',
  zip: '90210',
};
// Test card data for various scenarios
export const testCards = {
  visa: {
    number: '4242 4242 4242 4242',
    exp: '12 / 34',
    cvc: '123',
  },
  visaDebit: {
    number: '4000 0566 5566 5556',
    exp: '12 / 34',
    cvc: '123',
  },
  mastercard: {
    number: '5555 5555 5555 4444',
    exp: '12 / 34',
    cvc: '123',
  },
  mastercard2Series: {
    number: '2223 0031 2200 3222',
    exp: '12 / 34',
    cvc: '123',
  },
  mastercardDebit: {
    number: '5200 8282 8282 8210',
    exp: '12 / 34',
    cvc: '123',
  },
  mastercardPrepaid: {
    number: '5105 1051 0510 5100',
    exp: '12 / 34',
    cvc: '123',
  },
  amex: {
    number: '3782 822463 10005',
    exp: '12 / 34',
    cvc: '1234',
  },
  amex2: {
    number: '3714 496353 98431',
    exp: '12 / 34',
    cvc: '1234',
  },
  discover: {
    number: '6011 1111 1111 1117',
    exp: '12 / 34',
    cvc: '123',
  },
  discover2: {
    number: '6011 0009 9013 9424',
    exp: '12 / 34',
    cvc: '123',
  },
  dinersClub: {
    number: '3056 9300 0902 0004',
    exp: '12 / 34',
    cvc: '123',
  },
  jcb: {
    number: '3566 0020 2036 0505',
    exp: '12 / 34',
    cvc: '123',
  },
  unionPay: {
    number: '6200 0000 0000 0005',
    exp: '12 / 34',
    cvc: '123',
  },
  
};
