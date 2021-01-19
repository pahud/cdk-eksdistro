import * as cdk from '@aws-cdk/core';
import * as eksdistro from './index';


export class IntegTesting {
  readonly stack: cdk.Stack[];

  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
      account: process.env.CDK_DEFAULT_ACCOUNT || '123456789012',
    };

    const stack = new cdk.Stack(app, 'eksdistro-stack', { env });

    new eksdistro.Cluster(stack, 'Cluster');

    this.stack = [stack];
  }
}

new IntegTesting();
