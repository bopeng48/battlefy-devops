"use strict"

const AWS = require('aws-sdk');
const Redis = require("ioredis");
const crypto = require('crypto');


const client = new Redis({
    port: 6379,
    host: "clustercfg.test.dubowl.memorydb.us-west-2.amazonaws.com",
    tls: {},
});;


exports.handler = async function(event) {
    try {
        if (event.httpMethod === 'GET') {
            // Handle GET request
            const shortUrl = event.queryStringParameters.url;
            if (!shortUrl) {
                return {
                    statusCode: 400,
                    body: 'Missing required parameter: url'
                };
            }
            let longUrl = await client.get(shortUrl);
            return {
                statusCode: 302,
                body: longUrl
            };
        } else if (event.httpMethod === 'POST') {
            // Handle POST request
            const requestBody = JSON.parse(event.body);
            if (!requestBody.longUrl) {
                return {
                    statusCode: 400,
                    body: 'Missing required parameter: url'
                };
            }

            const id = crypto.randomBytes(4).toString('hex');
            await client.set(id, requestBody.longUrl);
            return {
                statusCode: 200,
                body: 'This is a POST request'
            };
        } else {
            return {
                statusCode: 400,
                body: 'action not supported'
            };
        }
    } catch (error) {
        throw Error(`Error in backend: ${error}`)
    }

}