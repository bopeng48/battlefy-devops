const { PolicyStatement, Effect } = require('@aws-cdk/aws-iam');
let region = 'us-west-2'
let accountId = '601924095250'
let clusterName = 'test'
const redisPolicy = new PolicyStatement({
  effect: Effect.ALLOW,
  actions: [
    'elasticache:Describe*',
    'elasticache:AuthorizeCacheSecurityGroupIngress',
    'elasticache:CreateCacheParameterGroup',
    'elasticache:CreateCacheSecurityGroup',
    'elasticache:CreateCacheSubnetGroup',
    'elasticache:DeleteCacheParameterGroup',
    'elasticache:DeleteCacheSecurityGroup',
    'elasticache:DeleteCacheSubnetGroup',
    'elasticache:ModifyCacheParameterGroup',
    'elasticache:ModifyCacheSubnetGroup',
    'elasticache:RebootCacheCluster',
    'elasticache:ResetCacheParameterGroup',
    'elasticache:DescribeCacheParameters',
    'elasticache:DescribeCacheClusters',
    'elasticache:DescribeCacheSecurityGroups',
    'elasticache:DescribeCacheSubnetGroups',
    'elasticache:AuthorizeCacheSecurityGroupIngress',
    'elasticache:AuthorizeCacheSecurityGroupEgress',
    'elasticache:RevokeCacheSecurityGroupIngress',
    'elasticache:RevokeCacheSecurityGroupEgress',
    'elasticache:TestFailover'
  ],
  resources: [
    `arn:aws:elasticache:${region}:${accountId}:cluster:${clusterName}`
  ]
});

module.exports = redisPolicy;
