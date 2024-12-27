import { Stack, StackProps } from 'aws-cdk-lib';
import { CodeBuildStep, CodePipeline, CodePipelineSource } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { VideoStreamingStage } from './pipeline-stage';

export class PipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const pipeline = new CodePipeline(this, 'ReactAppPipeline', {
            pipelineName: 'ReactAppPipeline',
            synth: new CodeBuildStep('Synth', {
                input: CodePipelineSource.gitHub('skdishansachin/video-streaming-service', 'main'),
                commands: [
                    'cd infra',
                    'npm install',
                    'npx cdk synth'
                ],
                primaryOutputDirectory: 'infra/cdk.out',
            })
        });

        pipeline.addStage(new VideoStreamingStage(this, 'VideoStreamingStage'));
    }
}