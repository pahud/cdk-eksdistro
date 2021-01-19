# API Reference

**Classes**

Name|Description
----|-----------
[Cluster](#cdk-eksdistro-cluster)|*No description*
[UbumtuAmiProvider](#cdk-eksdistro-ubumtuamiprovider)|The AMI provider to get the latest Ubuntu Linux AMI.


**Structs**

Name|Description
----|-----------
[ClusterProps](#cdk-eksdistro-clusterprops)|*No description*



## class Cluster  <a id="cdk-eksdistro-cluster"></a>



__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new Cluster(scope: Construct, id: string, props?: ClusterProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[ClusterProps](#cdk-eksdistro-clusterprops)</code>)  *No description*
  * **capacitySize** (<code>number</code>)  *No description* __*Optional*__
  * **defaultInstanceType** (<code>[InstanceType](#aws-cdk-aws-ec2-instancetype)</code>)  *No description* __*Optional*__
  * **machineImage** (<code>[IMachineImage](#aws-cdk-aws-ec2-imachineimage)</code>)  AMI for the EKS-D instance node. __*Default*__: The latest AMI from ubuntu-focal-20.04-amd64-server
  * **vpc** (<code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code>)  *No description* __*Optional*__




## class UbumtuAmiProvider  <a id="cdk-eksdistro-ubumtuamiprovider"></a>

The AMI provider to get the latest Ubuntu Linux AMI.


### Initializer




```ts
new UbumtuAmiProvider(userData: UserData)
```

* **userData** (<code>[UserData](#aws-cdk-aws-ec2-userdata)</code>)  *No description*



### Properties


Name | Type | Description 
-----|------|-------------
**amiId** | <code>[IMachineImage](#aws-cdk-aws-ec2-imachineimage)</code> | <span></span>
**userData** | <code>[UserData](#aws-cdk-aws-ec2-userdata)</code> | <span></span>



## struct ClusterProps  <a id="cdk-eksdistro-clusterprops"></a>






Name | Type | Description 
-----|------|-------------
**capacitySize**? | <code>number</code> | __*Optional*__
**defaultInstanceType**? | <code>[InstanceType](#aws-cdk-aws-ec2-instancetype)</code> | __*Optional*__
**machineImage**? | <code>[IMachineImage](#aws-cdk-aws-ec2-imachineimage)</code> | AMI for the EKS-D instance node.<br/>__*Default*__: The latest AMI from ubuntu-focal-20.04-amd64-server
**vpc**? | <code>[IVpc](#aws-cdk-aws-ec2-ivpc)</code> | __*Optional*__



