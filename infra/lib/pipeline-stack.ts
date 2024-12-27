import { Stack, StackProps } from 'aws-cdk-lib';
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { VideoStreamingStage } from './pipeline-stage';
import { LinuxBuildImage } from 'aws-cdk-lib/aws-codebuild';

export class PipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const pipeline = new CodePipeline(this, 'ReactAppPipeline', {
            pipelineName: 'ReactAppPipeline',
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.gitHub('skdishansachin/video-streaming-service', 'main'),
                installCommands: [
                    'npm install -g aws-cdk',
                    'npm install -g pnpm',
                ],
                commands: [
                    'npm install -g pnpm',
                    'cd infra',
                    'pnpm install',
                    'npx cdk deploy',
                ],
                primaryOutputDirectory: 'infra/cdk.out',
            })
        });

        pipeline.addStage(new VideoStreamingStage(this, 'VideoStreamingStage'));
    }
}