import SpheronComputeClient, { Cluster, ClusterFundsUsage, ClusterInstance, ClusterInstanceExtendedInfo, ClusterInstanceOrder, ClusterInstanceStateEnum, ClusterInstancesInfo, ClusterProtocolEnum, ComputeMachine, CreateInstanceFromMarketplaceRequest, CreateInstanceRequest, Domain, DomainTypeEnum, InstanceLogType, InstanceResponse, MarketplaceApp, MarketplaceInstanceResponse, ProviderEnum, UpdateInstaceRequest } from "@spheron/compute";
import Logger from "./config/logger";
import { link } from "fs";
import { type } from "os";

(async () => {
  const computeClient: SpheronComputeClient = new SpheronComputeClient({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiJhNzNiNTlhZjE3ZjA2ZDFlMWZlNGVmN2Y2ZGFhYmJkZTIyYTg0OWEwNjc2NzMzMTQxMmE1MGM2MmU3NWI1ZTgxNjk3MTBhOWU4ZWFkMzAzOTE5YmEzMmQ0ZTk5ZmUzYjk2ZGY3ZTBhZDRmMzY0ZTEwNTZhMzkzNjNmMzNjYTgzYSIsImlhdCI6MTY4MjM0NTA5NSwiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.x1tuhqkJtNwpVpT6Pg1e8X_TmuI1ft0JKHWo3WA8m_Y",
  });

  // let topicId = "";
  // computeClient.clusterInstance.subscribeToEventStream((event) => {
  //   Logger.info(`EVENT: ${JSON.stringify(event)}`);

  //   let created = false;
  //   if (!created && event.session) {
  //     topicId = event.session;

  //     const createClusterInstance: CreateClusterInstanceRequest = {
  //       organizationId: "63612a842e50ee3ffbebcf06",
  //       configuration: {
  //         folderName: "",
  //         protocol: ClusterProtocolEnum.AKASH,
  //         image: "crccheck/hello-world",
  //         tag: "latest",
  //         instanceCount: 1,
  //         buildImage: false,
  //         ports: [{ containerPort: 8000, exposedPort: 8000 }],
  //         env: [{ value: "t=t", isSecret: false }],
  //         command: [],
  //         args: [],
  //         region: "any",
  //         akashMachineImageName: "Ventus Medium",
  //       },
  //       uniqueTopicId: topicId,
  //       clusterUrl: "crccheck/hello-world",
  //       clusterProvider: ProviderEnum.DOCKERHUB,
  //       clusterName: "wallet test sdk",
  //       healthCheckUrl: "/",
  //       healthCheckPort: 8000,
  //     };

  //     computeClient.clusterInstance.create(createClusterInstance);

  //     created = true;

      // computeClient.clusterInstance.triggerHealthCheck(
      //   "64528d088facc70012cbe9a0",
      //   topicId
      // );
  //   }
  // });

  // setInterval(() => {
  //   Logger.info("asd");
  // }, 10000);

  const categories: string[] =
    await computeClient.computeMarketplace.getCategories();

  const marketplaceApps: MarketplaceApp[] =
    await computeClient.computeMarketplace.getAll();

  const marketplaceApp: MarketplaceApp =
    await computeClient.computeMarketplace.get(
      marketplaceApps[0].id
    );


  const clusters: Cluster[] = await computeClient.organization.getClusters("63612a842e50ee3ffbebcf06", {skip:0, limit:10});

  const clusterInstancesExtended: ClusterInstanceExtendedInfo[] =
    await computeClient.cluster.getInstances(clusters[0].id, {
      skip: 0,
      limit: 10,
    });

  const clusterFunds: ClusterFundsUsage =
    await computeClient.cluster.getUsage(clusters[0].id);

  const clusterInstancesInfo: ClusterInstancesInfo =
    await computeClient.cluster.getInstancesInfo(clusters[0].id);

  await computeClient.cluster.delete(clusters[0].id);

  const computeMachines: ComputeMachine[] =
    await computeClient.clusterMachine.get({
      skip: 0,
      limit: 5,
    });

  const regions: string[] =
    await computeClient.clusterMachine.getRegions();

  const mongoTemplate: MarketplaceApp = marketplaceApps[0];

  const clusterInstanceFromTemplate: CreateInstanceFromMarketplaceRequest =
    {
      templateId: mongoTemplate.id,
      environmentVariables: mongoTemplate.serviceData.variables.map(
        (templateVar) => {
          return {
            label: templateVar.label,
            value: templateVar.defaultValue,
            isSecret: false,
          };
        }
      ),
      organizationId: "63612a842e50ee3ffbebcf06",
      akashImageId: computeMachines[2].id,
      region: "any",
    };

  const marketplaceInstance: MarketplaceInstanceResponse =
    await computeClient.instance.createFromMartketplace(
      clusterInstanceFromTemplate
    );

  const updateInstance: UpdateInstaceRequest = {
    env: [{ value: "t2=t2", isSecret: false }],
    command: [],
    args: [],
    uniqueTopicId: "89fcf863-a3ab-44f2-9276-9ea75631498c",
    tag: "latest",
  };

  const updateResponse: InstanceResponse =
    await computeClient.instance.update(
      "6448013960d4d90012b77a2a",
      "63612a842e50ee3ffbebcf06",
      updateInstance
    );

  const createClusterInstance: CreateInstanceRequest = {
    organizationId: "63612a842e50ee3ffbebcf06",
    configuration: {
      folderName: "",
      protocol: ClusterProtocolEnum.AKASH,
      image: "crccheck/hello-world",
      tag: "latest",
      instanceCount: 1,
      buildImage: false,
      ports: [{ containerPort: 8000, exposedPort: 8000 }],
      env: [{ value: "t=t", isSecret: false }],
      command: [],
      args: [],
      region: "any",
      akashMachineImageName: "Ventus Medium",
    },
    // uniqueTopicId: topicId,
    clusterUrl: "crccheck/hello-world",
    clusterProvider: ProviderEnum.DOCKERHUB,
    clusterName: "wallet test",
    healthCheckUrl: "/",
    healthCheckPort: 8000,
  };

  const instanceFromTemplate: InstanceResponse =
    await computeClient.instance.create(createClusterInstance);

  // const numberOfInstances = 1;

  // const promises: any[] = [];
  // for (let i = 0; i < numberOfInstances; i++) {
  //   promises.push(computeClient.instance.create(createClusterInstance));
  // }

  // clusterInstancesExtended.forEach((instance) => {
  //   if (instance.state === ClusterInstanceStateEnum.ACTIVE)
  //     promises.push(computeClient.instance.close(instance.id));
  // });

  // await Promise.all(promises);

  const clusterInstance: ClusterInstance =
    await computeClient.instance.get(clusterInstancesExtended[0].id);

  const instanceDomains: Domain[] = await computeClient.instance.getDomains(
    clusterInstance.id
  );

  const domainUpdate: Domain = await computeClient.instance.updateDomain(
    clusterInstance.id,
    instanceDomains[0].id,
    {
      name: "test2.com",
      link: "provider.palmito.duckdns.org:31494",
      type: DomainTypeEnum.DOMAIN,
    }
  );

  await computeClient.instance.deleteDomain(
    clusterInstance.id,
    instanceDomains[0].id
  );

  const domains: Domain[] =
  await computeClient.instance.getDomains(
    clusterInstance.id
  );

  const response: { order: ClusterInstanceOrder; liveLogs: string[] } =
    await computeClient.instance.getClusterInstanceOrder(
      clusterInstance.activeOrder
    );

  const logs = await computeClient.instance.getClusterInstanceOrderLogs(
    response.order.id,
    { from: 0, to: 1000, logType: InstanceLogType.INSTANCE_LOGS }
  );

  await computeClient.instance.update("63612a842e50ee3ffbebcf06", clusterInstance.id, updateInstance)

  // await Promise.all(
  //   clusterInstancesExtended.map((instance) => {
  //     if (instance.state === ClusterInstanceStateEnum.ACTIVE)
  //       computeClient.instance.close(instance.id);
  //   })
  // );

  // const promises: any[] = [];
  // const clusterInstances: ExtendedClusterInstance[] =
  //   await computeClient.cluster.getInstances(clusters[0]._id, {
  //     skip: 0,
  //     limit: 10,
  //   });
  // clusterInstances.forEach((instance) => {
  //   if (instance.state === ClusterInstanceStateEnum.ACTIVE)
  //     promises.push(computeClient.clusterInstance.close(instance._id));
  // });

  // await Promise.all(promises);

  Logger.info("asdasd");
})();
