const { AwsCdkConstructLibrary, DependenciesUpgradeMechanism } = require('projen');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new AwsCdkConstructLibrary({
  author: 'Pahud Hsieh',
  description: 'AWS CDK construct library for Amazon EKS Distro',
  authorAddress: 'pahudnet@gmail.com',
  cdkVersion: '1.85.0',
  name: 'cdk-eksdistro',
  repositoryUrl: 'https://github.com/pahud/cdk-eksdistro.git',
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-autoscaling',
  ],
  deps: [
    'cdk-ec2spot',
  ],
  peerDeps: [
    'cdk-ec2spot',
  ],
  depsUpgrade: DependenciesUpgradeMechanism.githubWorkflow({
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      secret: AUTOMATION_TOKEN,
    },
  }),
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['pahud'],
  },
  defaultReleaseBranch: 'main',
  publishToPypi: {
    distName: 'cdk-eksdistro',
    module: 'cdk_eksdistro',
  },
  catalog: {
    announce: false,
    twitter: 'pahudnet',
  },
  keywords: [
    'cdk',
    'eks',
    'distro',
    'eks-d',
    'eks-distro',
    'kubernetes',
    'k8s',
  ],
});

project.package.addField('resolutions', {
  'trim-newlines': '3.0.1',
});


const common_exclude = ['cdk.out', 'cdk.context.json', 'yarn-error.log'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
