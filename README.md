# fastify-test-app


After cloning the repository, follow these steps to get the application up and running:

Install Dependencies:
bash
npm install
This command installs the required Node.js modules.


Build the Project:
bash
npm run build
This command compiles TypeScript to JavaScript.


Start the Application:
bash
npm start
This command starts the Fastify server.


Test the Application
Once the application is running, you can test the endpoints as follows:

Swagger Documentation:
URL: http://localhost:3000/docs
Open this URL in your browser to view the API documentation and interact with the endpoints.


Create Transaction Endpoint:
URL: http://localhost:3000/create-transaction
Testing Instructions:
Open Postman and create a new request.
Set the request method to POST and paste the endpoint URL.
In the Headers tab, set Content-Type to application/json.
In the Body tab, select raw and paste the following JSON data:
json
{
  "amount": 1000,
  "currency": "USD",
  "lang": "en",
  "hookUrl": "http://localhost:3000/hook",
  "callback": "http://localhost:3000/callback",
  "callbackFail": "http://localhost:3000/callbackFail",
  "billing": {
    "firstName": "John",
    "lastName": "Doe",
    "address1": "123 Street",
    "city": "Cityville",
    "state": "State",
    "country": "US",
    "postalCode": "12345",
    "phone": "1234567890",
    "email": "john.doe@example.com",
    "externalUserId": "user123",
    "dateOfBirth": "1980-01-01"
  },
  "orderId": "order123",
  "cardToken": "token123",
  "payment3dsType": "Redirection",
  "kycVerified": true,
  "previousPaymentCount": 5,
  "cardData": {
    "cardNumber": "4111111111111111",
    "cardHolderName": "John Doe",
    "cardExpiryDate": "12",
    "cardExpiryDate2": "2024",
    "cardCvv": "123",
    "browser": {
      "colorDepth": 24,
      "userAgent": "Mozilla/5.0",
      "language": "en-US",
      "timeZone": "-300",
      "screenWidth": 1920,
      "javaEnabled": true,
      "customerIp": "192.168.1.1",
      "screenHeight": 1080,
      "windowHeight": 800,
      "timeZoneOffset": -300,
      "windowWidth": 1200
    }
  },
  "saveCard": true
}
Send the request. You will receive a paymentId in the response.


Webhook Endpoint:
URL: http://localhost:3000/webhook
Testing Instructions:
In Postman, create a new POST request to this URL.
Remove the request body and remove Content-Type in the Headers application/json.
Send the request. The response will contain a URL to which the client can be redirected.