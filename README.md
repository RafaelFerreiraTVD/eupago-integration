# EuPago Integration

*Create payment references using the API of EuPago.*

You should have an active account on EuPago service. https://eupago.pt

You can also find the documentation of eupago api here: https://suporte.eupago.pt/pt/article/261-rest-api

# Install

`npm install --save @sancheztvd/eupago-integration`

# Usage
This package needs to run with 3 environment variables:
* `EUPAGO_API_KEY=xxxx-xxxx-xxxx-xxxx-xxxx`
* `EUPAGO_REST_API_URL=https://clientes.eupago.pt/clientes/rest_api`
* `EUPAGO_DESCRIPTION_MBWAY="Your purchase at Store"`

```js
const eupago = require('eupago-integration')();
eupago.createPaymentReference(totalAmount, yourReference, method, mobilePhoneNumber).then((response) => {
    console.log(response)
});
```

# License
MIT