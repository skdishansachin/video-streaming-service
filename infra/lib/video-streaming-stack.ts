import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class VideoStreamingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const reactWebApplicationBucket = new s3.Bucket(this, 'ReactWebApplicationBucket', {
      bucketName: `react-web-application-bucket-${this.stackName}`,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html', // TODO: Create error.html
      autoDeleteObjects: true, // Change on production
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}
