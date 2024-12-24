import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { S3StaticWebsiteOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { Construct } from 'constructs';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';

export class VideoStreamingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const stackName = this.stackName.toLowerCase();

    const reactWebApplicationBucket = new s3.Bucket(this, 'ReactWebApplicationBucket', {
      bucketName: `react-web-application-bucket-${stackName}`,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html', // TODO: Create error.html
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      autoDeleteObjects: true, // Change on production
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Change on production
    });

    const reactWebApplicationDistribution = new cloudfront.Distribution(this, 'ReactWebApplicationDistribution', {
      defaultRootObject: 'index.html',
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      defaultBehavior: {
        origin: new S3StaticWebsiteOrigin(reactWebApplicationBucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
      ]
    });

    new BucketDeployment(this, 'ReactWebApplicationDeployment', {
      sources: [Source.asset('../frontend/dist')],
      destinationBucket: reactWebApplicationBucket,
      distribution: reactWebApplicationDistribution,
      distributionPaths: ['/*'],
    });

    new cdk.CfnOutput(this, 'ReactWebApplicationBucketOutputURL', {
      value: reactWebApplicationDistribution.distributionDomainName,
      description: 'React Web Application Bucket Output URL',
      exportName: `${stackName}-ReactWebApplicationBucketOutputURL`,
    });

    new cdk.CfnOutput(this, 'ReactWebApplicationBucketName', {
      value: reactWebApplicationBucket.bucketName,
      description: 'React Web Application Bucket Name',
      exportName: `${stackName}-ReactWebApplicationBucketName`,
    });
  }
}
