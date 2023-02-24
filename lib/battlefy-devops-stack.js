const cdk = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const iam = require('@aws-cdk/aws-iam');
const redisPolicy = require('./redis-policy');

class BattlefyDevopsStack extends cdk.Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // TODO: figure out the redis policy to put here
    // var lambdaRedisPolicyStatement = new iam.PolicyStatement();
    // lambdaRedisPolicyStatement.addActions("s3:PutObject", "s3:GetObject");
    // lambdaRedisPolicyStatement.addResources('fake' + "/*");
    const s3AuthLambda = new lambda.Function(this, "Lambda", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("lambda/url-encoder"),
      environment: {
        S3_BUCKET: 'fake_bucket_name',
      },
    });
  }
}

module.exports = { BattlefyDevopsStack }
