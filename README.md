# EuPago Integration [![npm version](https://badge.fury.io/js/eupago-integration.svg)](https://badge.fury.io/js/eupago-integration) [![npm package](https://img.shields.io/npm/dm/eupago-integration.svg)](https://www.npmjs.org/package/reupago-integration)

*Create payment references using the API of EuPago.*

You should have an active account on EuPago service. https://eupago.pt

You can also find the documentation of eupago api here: https://suporte.eupago.pt/pt/article/261-rest-api

# Install

`npm install --save eupago-integration`

# Required configuration

* `EUPAGO_API_KEY=xxxx-xxxx-xxxx-xxxx-xxxx` (required)

# Optional configuration

* `EUPAGO_REST_API_URL=https://clientes.eupago.pt/clientes/rest_api` (default = https://clientes.eupago.pt/clientes/rest_api)
* `EUPAGO_DESCRIPTION_MBWAY="Your purchase at Store"` (default = 'My Sample Store')
* `EUPAGO_ALLOW_DUPLICATED_PAYMENTS=0` (default = 0)

```js
const eupago = require('eupago-integration')();
eupago.createPaymentReference(totalAmount, yourReference, method, mobilePhoneNumber).then((response) => {
    console.log(response)
});
```

# License
MIT
