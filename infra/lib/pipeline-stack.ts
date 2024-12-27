import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { VideoStreamingStack } from './video-streaming-stack';

class VideoStreamingStackStage extends cdk.Stage {
    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
        super(scope, id, props);

        new VideoStreamingStack(this, 'VideoStreamingStack');
    }
}

export class PipelineStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const source = CodePipelineSource.gitHub('skdishansachin/video-streaming-service', 'main');

        const pipeline = new CodePipeline(this, 'ReactAppPipeline', {
            pipelineName: 'ReactAppPipeline',
            synth: new ShellStep('Synth', {
                input: source,
                commands: [
                    'pnpm install',
                    'pnpm run build',
                    'npx cdk synth'
                ]
            })
        });

        pipeline.addStage(new VideoStreamingStackStage(this, 'test', {
            stageName: 'Test'
        }));
    }

}