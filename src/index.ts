import * as autoscaling from '@aws-cdk/aws-autoscaling';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as cdk from '@aws-cdk/core';
import * as ec2spot from 'cdk-ec2spot';

/**
 * Construct properties for the EKS-D cluster
 */
export interface ClusterProps {
  /**
   * VPC for the cluster
   *
   * @default - get or create a VPC
   */
  readonly vpc?: ec2.IVpc;
  /**
   * The default EC2 instance type
   *
   * @default t3.large
   */
  readonly defaultInstanceType?: ec2.InstanceType;
  /**
   * number of instances
   *
   * @default 1
   */
  readonly capacitySize?: number;
  /**
   * AMI for the EKS-D instance node
   *
   * @default - The latest AMI from ubuntu-focal-20.04-amd64-server
   */
  readonly machineImage?: ec2.IMachineImage;

  /**
   * Print AMI ID in the output
   *
   * @default - true
   */
  readonly outputAmiId?: boolean;

  /**
   * Create EC2 spot instnce for the cluster node
   *
   * @default - false
   */
  readonly spot?: boolean;
}

export enum SpotInstanceType {
  ONE_TIME = 'one-time',
  PERSISTENT = 'persistent',
}

/**
 * Represents the EKS-D cluster
 */
export class Cluster extends cdk.Construct {
  private readonly defaultInstanceType: ec2.InstanceType = new ec2.InstanceType('t3.large');
  constructor(scope: cdk.Construct, id: string, props: ClusterProps = {}) {
    super(scope, id);

    const vpc = props.vpc ?? getOrCreateVpc(this);
    const userData = ec2.UserData.forLinux();
    userData.addCommands(
      'set -o xtrace',
      'snap install eks --classic --edge',
    );

    // create auto scaling group with launch template
    this._createAutoScalingGroup('ASG', {
      vpc,
      defaultCapacitySize: props.capacitySize,
      instanceType: props.defaultInstanceType ?? this.defaultInstanceType,
      machineImage: props.machineImage ?? new UbumtuAmiProvider(this, userData).amiId,
      userData,
      spotOptions: props.spot ? {
        spotInstanceType: SpotInstanceType.ONE_TIME,
      } : undefined,
    });

    if (props.outputAmiId !== false) {
      new cdk.CfnOutput(this, 'AmiId', { value: new UbumtuAmiProvider(this, userData).amiId.getImage(this).imageId });
    }
  }
  private _createAutoScalingGroup(id: string, options: ec2spot.AutoScalingGroupOptions): autoscaling.AutoScalingGroup {
    const provider = new ec2spot.Provider(this, 'ASGProvider');
    const asg = provider.createAutoScalingGroup(id, options);
    return asg;
  }
}

function getOrCreateVpc(scope: cdk.Construct): ec2.IVpc {
  // use an existing vpc or create a new one
  return scope.node.tryGetContext('use_default_vpc') === '1' ?
    ec2.Vpc.fromLookup(scope, 'Vpc', { isDefault: true }) :
    scope.node.tryGetContext('use_vpc_id') ?
      ec2.Vpc.fromLookup(scope, 'Vpc', { vpcId: scope.node.tryGetContext('use_vpc_id') }) :
      new ec2.Vpc(scope, 'Vpc', { maxAzs: 3, natGateways: 1 });
}

/**
 * The AMI provider to get the latest Ubuntu Linux AMI
 */
export class UbumtuAmiProvider {
  constructor(readonly scope: cdk.Construct, readonly userData: ec2.UserData) {}
  public get amiId() {
    const stack = cdk.Stack.of(this.scope);
    const filterName = isChina(stack) ? 'ubuntu/images/hvm-ssd/ubuntu-bionic-18.04-amd64-server-????????'
      : 'ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-????????';
    const owners = isChina(stack) ? '837727238323' : '099720109477';
    return ec2.MachineImage.lookup({
      name: 'Ubuntu',
      filters: {
        name: [filterName],
        state: ['available'],
      },
      owners: [owners],
      userData: this.userData,
    });
  }
}

function isChina(stack: cdk.Stack) {
  return !cdk.Token.isUnresolved(stack.region) && stack.region.startsWith('cn-');
}


