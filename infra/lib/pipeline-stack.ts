import { Stack, StackProps } from 'aws-cdk-lib';
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { VideoStreamingStage } from './pipeline-stage';

export class PipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const pipeline = new CodePipeline(this, 'ReactAppPipeline', {
            pipelineName: 'ReactAppPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.gitHub('skdishansachin/video-streaming-service', 'main'),
                installCommands: ['npm install -g aws-cdk'],
                commands: [
                    'cd infra',
                    'npm ci',
                    'cdk deploy',
                ],
                primaryOutputDirectory: 'infra/cdk.out',
            }),
        });

        pipeline.addStage(new VideoStreamingStage(this, 'Development'));
    }
}