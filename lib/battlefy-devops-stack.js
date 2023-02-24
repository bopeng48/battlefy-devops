const cdk = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const iam = require('aws-cdk-lib/aws-iam');
const ec2 = require('aws-cdk-lib/aws-ec2');

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
    const lambdaRole = new iam.Role(this, 'lambda-execution-role', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    
    lambdaRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole"));
    lambdaRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaVPCAccessExecutionRole"));
    lambdaRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonElastiCacheFullAccess")
    );

    lambdaRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSLambdaENIManagementAccess"
      )
    );

    const defaultgVPC = ec2.Vpc.fromLookup(this, 'vpc-9babdae3', {
      region: 'us-west-2',
      account: 601924095250,
      vpcId: 'vpc-9babdae3',
    });
    const urlShortenerLambda = new lambda.Function(this, "url-shortener", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("lambda/url-shortener"),
      role: lambdaRole,
      vpc: defaultgVPC,
      allowPublicSubnet: true,
    });
  }
}

module.exports = { BattlefyDevopsStack }
