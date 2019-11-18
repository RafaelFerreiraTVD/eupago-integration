const request = require('request');
const decimal = require('decimal.js');
const dateFormat = require('dateformat');

const api_info = {
    key: process.env.EUPAGO_API_KEY,
    base_url: process.env.EUPAGO_REST_API_URL || 'https://clientes.eupago.pt/clientes/rest_api',
    required_fields: ['valor', 'id'],
    mb: {
        endpoint: '/multibanco/create',
        fields: ['data_inicio', 'data_fim', 'valor_minimo', 'valor_maximo', 'per_dup'],
    },
    mbway: {
        endpoint: '/mbway/create',
        fields: [ 'alias', 'descricao'],
    },
    payshop: {
        endpoint: '/payshop/create',
        fields: [],
    },
    paysafecard: {
        endpoint: '/paysafecard/create',
        fields: ['url_retorno']
    }
}

const eupago = () => {
    return {
        createPaymentReference,
        getInfo: () => {
            return "Not implemented";
        }
    }
};

/**
 * Create post request for EuPago REST API to generate the payment reference 
 * (Multibanco, MbWAY, Payshop, PaySafeCard)
 * 
 * @param {Object} payment_data 
 */
const createRequest = (payment_data) => {
    let url = api_info.base_url;
    const { method } = payment_data;
    const { fields, endpoint } = api_info[method];

    let eupago_data = {
        chave: api_info.key,
    };

    api_info.required_fields.forEach(f => {
        if (!payment_data[f]) {
            throw Error(`Missing required parameter ${f}`);
        }
    });

    api_info.required_fields.map(field => eupago_data[field] = payment_data[field]);
    fields.map(field => payment_data[field] && (eupago_data[field] = payment_data[field]));
    
    url += endpoint;

    if (eupago_data.data_fim) {
        eupago_data.data_fim = dateFormat(eupago_data.data_fim, "yyyy-mm-dd");
    }
    if (eupago_data.data_inicio) {
        eupago_data.data_inicio = dateFormat(eupago_data.data_inicio, "yyyy-mm-dd");
    }
    
    return new Promise((resolve, reject) => {
        request.post({ url, form: eupago_data }, (error, { body }) => {
            if (error) reject(error);
    
            const response = JSON.parse(body);
            resolve(response);
        });
    });
}

/**
 * 
 * @param {number} value     The total amount of the payment
 * @param {string} id        Your reference
 * @param {string} method    Payment method (Multibanco, MBWAY, PayShop, PaySafeCard)
 * @param {string} alias     Phone number in case of MBWAY method
 */
const createPaymentReference = (value, id, method, alias) => {
    let val = new decimal(value).toPrecision(2);
    
    const data = {
        method,
        valor: val,
        id,
        per_dup: 0,
        alias,
        descricao: process.env.EUPAGO_DESCRIPTION_MBWAY
    };
    
    return createRequest(data);
};

module.exports = eupago;