import { Stack, StackProps, RemovalPolicy, Duration, CfnOutput } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { S3StaticWebsiteOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { Construct } from 'constructs';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';

export class VideoStreamingStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const stackName = this.stackName.toLowerCase();

    const reactWebApplicationBucket = new s3.Bucket(this, 'ReactWebApplicationBucket', {
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      autoDeleteObjects: true, // Change on production
      removalPolicy: RemovalPolicy.DESTROY, // Change on production
    });

    const reactWebApplicationDistribution = new cloudfront.Distribution(this, 'ReactWebApplicationDistribution', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new S3StaticWebsiteOrigin(reactWebApplicationBucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });

    new BucketDeployment(this, 'ReactWebApplicationDeployment', {
      sources: [Source.asset('../frontend/dist')],
      destinationBucket: reactWebApplicationBucket,
      distribution: reactWebApplicationDistribution,
      distributionPaths: ['/*'],
    });

    new CfnOutput(this, 'ReactWebApplicationBucketOutputURL', {
      value: reactWebApplicationDistribution.distributionDomainName,
      description: 'React Web Application Bucket Output URL',
      exportName: `${stackName}-ReactWebApplicationBucketOutputURL`,
    });

    new CfnOutput(this, 'ReactWebApplicationBucketName', {
      value: reactWebApplicationBucket.bucketName,
      description: 'React Web Application Bucket Name',
      exportName: `${stackName}-ReactWebApplicationBucketName`,
    });
  }
}
