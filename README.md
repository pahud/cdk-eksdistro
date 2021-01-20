[![NPM version](https://badge.fury.io/js/cdk-eksdistro.svg)](https://badge.fury.io/js/cdk-eksdistro)
[![PyPI version](https://badge.fury.io/py/cdk-eksdistro.svg)](https://badge.fury.io/py/cdk-eksdistro)
![Release](https://github.com/pahud/cdk-eksdistro/workflows/Release/badge.svg)

# `cdk-eksdistro`

CDK construct library that allows you to create [Amazon EKS Distro](https://distro.eks.amazonaws.com/) on Amaozn EC2 instance(s).

# How it works

Under the hood, `cdk-eksdistro` creates an Amazon Auto Scaling Group with single Amazon EC2 instance running Ubuntu Linux LTS `20.04` and installs the [eks snap](https://snapcraft.io/eks) from the `UserData`.

# Sample

```ts
imoprt { Cluster } from 'cdk-eksdistro';

const app = new cdk.App();

const env = {
  region: process.env.CDK_DEFAULT_REGION,
  account: process.env.CDK_DEFAULT_ACCOUNT,
};

const stack = new cdk.Stack(app, 'eksdistro-stack', { env });

new Cluster(stack, 'Cluster');
```

## Spot Instance

To create Amazon EC2 Spot instance instead of on-demand, use the `spot` property:

```ts
new Cluster(stack, 'Cluster', { spot: true });
```

# Validate the cluster

By default, the `Cluster` construct creates a single-node EKS-D cluster on AWS EC2 with the latest Ubuntu Linux LTS AMI. To validate the cluster, open the EC2 console, select the instance and click the **Connect** button and select **session manager**.

Run the following commands to execute `kubectl` in the cluster.


![](https://pbs.twimg.com/media/EsEgnhoVoAIHnkr?format=jpg&name=4096x4096)


# Reference


- https://aws.amazon.com/blogs/opensource/introducing-amazon-eks-distro/
- https://ubuntu.com/blog/install-amazon-eks-distro-anywhere
- https://microk8s.io/
- https://snapcraft.io/microk8s


