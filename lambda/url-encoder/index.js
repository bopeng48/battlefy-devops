"use strict"

const AWS = require('aws-sdk');

const bucket = process.env.S3_BUCKET
if (!bucket) {
    throw Error(`S3 bucket not set`)
}

exports.handler = async function(event) {
    try {
        // this is how you get parameter
        const longUrl = event.body['long_url'];
        
        // this is how error handling works
        if (!longUrl) {
            throw Error('url missing')
        }

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/plain' },
            body: `Success! long url is ${longUrl}`
        }
    } catch (error) {
        throw Error(`Error in backend: ${error}`)
    }

}