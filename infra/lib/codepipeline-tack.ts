import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as codebuild from 'aws-cdk-lib/aws-codebuild'
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipelineactions from 'aws-cdk-lib/aws-codepipeline-actions';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class CodePipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const artifactBucket = new s3.Bucket(this, 'ArtifactBucketCodePipeline');
        const sourceOutput = new codepipeline.Artifact();

        const pipeline = new codepipeline.Pipeline(this, 'ReactAppCodePipeline', {
            pipelineName: 'ReactAppCodePipeline',
            artifactBucket: artifactBucket,
        });

        const sourceAction = new codepipelineactions.GitHubSourceAction({
            actionName: 'GitHubSource',
            owner: 'skdishansachin',
            repo: 'video-streaming-service',
            oauthToken: cdk.SecretValue.secretsManager('github-token'),
            output: sourceOutput,
        });

        pipeline.addStage({
            stageName: 'Source',
            actions: [sourceAction],
        });

        const buildPipelineProject = new codebuild.PipelineProject(this, 'BuildPipelineProject', {
            environment: {
                buildImage: codebuild.LinuxBuildImage.STANDARD_7_0,
            },
            buildSpec: codebuild.BuildSpec.fromSourceFilename('frontend/buildspec.yml'),
        });

        const buildAction = new codepipelineactions.CodeBuildAction({
            actionName: 'Build',
            project: buildPipelineProject,
            input: sourceOutput,
            outputs: [new codepipeline.Artifact()],
        });

        const approvalAction = new codepipelineactions.ManualApprovalAction({
            actionName: 'Approve',
        });

        pipeline.addStage({
            stageName: 'Build',
            actions: [buildAction],
        });
    }
}