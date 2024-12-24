#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { VideoStreamingStack } from '../lib/video-streaming-stack';

const app = new cdk.App();
new VideoStreamingStack(app, 'VideoStreamingStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  // env: { account: '123456789012', region: 'us-east-1' },
});