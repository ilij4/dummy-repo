import SpheronComputeClient, {
  Cluster,
  ClusterFundsUsage,
  ClusterInstanceOrder,
  ClusterInstancesInfo,
  MarketplaceApp,
  ComputeMachine,
  CreateClusterInstanceFromMarketplaceRequest,
  ClusterInstanceStateEnum,
  ExtendedClusterInstance,
  CreateClusterInstanceRequest,
  ClusterProtocolEnum,
  ProviderEnum,
  ClusterInstanceResponse,
  ClusterInstance,
  Domain,
  InstanceLogType,
  UpdateClusterInstaceRequest,
  ClusterInstanceFromMarketplaceResponse,
  DomainTypeEnum,
} from "@spheron/compute";
import Logger from "./config/logger";

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

  // const categories: string[] =
  //   await computeClient.clusterTemplate.getClusterCategories();

  // const { clusterTemplates }: { clusterTemplates: ClusterTemplate[] } =
  //   await computeClient.clusterTemplate.getClusterTemplates();

  // const clusterTemplate: ClusterTemplate =
  //   await computeClient.clusterTemplate.getClusterTemplate(
  //     clusterTemplates[0]._id
  //   );

  // computeClient.cluster;

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

  // const cluster: Cluster = await computeClient.cluster.getCluster(
  //   clusters[0]._id
  // );

  // const clusterInstances: ExtendedClusterInstance[] =
  //   await computeClient.cluster.getInstances(clusters[0]._id, {
  //     skip: 0,
  //     limit: 10,
  //   });

  // const clusterFunds: ClusterFundsUsage =
  //   await computeClient.cluster.getClusterFundsUsage(clusters[0]._id);

  // const clusterInstancesInfo: ClusterInstancesInfo =
  //   await computeClient.cluster.getClusterInstancesDetails(clusters[0]._id);

  // await computeClient.cluster.deleteCluster(clusters[0]._id);

  // const computeMachines: ComputeMachine[] =
  //   await computeClient.clusterMachine.getComputeMachines({
  //     skip: 0,
  //     limit: 5,
  //   });

  // const regions: string[] =
  //   await computeClient.clusterMachine.getComputeMachineRegions();

  // const mongoTemplate: ClusterTemplate = clusterTemplates[0];

  // const clusterInstanceFromTemplate: CreateClusterInstanceFromTemplateRequest =
  //   {
  //     templateId: mongoTemplate._id,
  //     environmentVariables: mongoTemplate.serviceData.variables.map(
  //       (templateVar) => {
  //         return {
  //           label: templateVar.label,
  //           value: templateVar.defaultValue,
  //           isSecret: false,
  //         };
  //       }
  //     ),
  //     organizationId: "63612a842e50ee3ffbebcf06",
  //     akashImageId: computeMachines[2]._id,
  //     region: "any",
  //   };

  // const instanceFromTemplate: ClusterInstanceFromTemplateResponse =
  //   await computeClient.clusterInstance.createClusterInstanceFromTemplate(
  //     clusterInstanceFromTemplate
  //   );

  // const updateInstance: UpdateClusterInstaceRequest = {
  //   env: [{ value: "t2=t2", isSecret: false }],
  //   command: [],
  //   args: [],
  //   uniqueTopicId: "89fcf863-a3ab-44f2-9276-9ea75631498c",
  //   tag: "latest",
  // };

  // const updateResponse: ClusterInstanceResponse =
  //   await computeClient.clusterInstance.updateClusterInstance(
  //     "6448013960d4d90012b77a2a",
  //     "63612a842e50ee3ffbebcf06",
  //     updateInstance
  //   );

  // const createClusterInstance: CreateClusterInstanceRequest = {
  //   organizationId: "63612a842e50ee3ffbebcf06",
  //   configuration: {
  //     folderName: "",
  //     protocol: ClusterProtocolEnum.AKASH,
  //     image: "crccheck/hello-world",
  //     tag: "latest",
  //     instanceCount: 1,
  //     buildImage: false,
  //     ports: [{ containerPort: 8000, exposedPort: 8000 }],
  //     env: [{ value: "t=t", isSecret: false }],
  //     command: [],
  //     args: [],
  //     region: "any",
  //     akashMachineImageName: "Ventus Medium",
  //   },
  //   uniqueTopicId: topicId,
  //   clusterUrl: "crccheck/hello-world",
  //   clusterProvider: ProviderEnum.DOCKERHUB,
  //   clusterName: "wallet test",
  //   healthCheckUrl: "/",
  //   healthCheckPort: 8000,
  // };

  // const instanceFromTemplate: ClusterInstanceResponse =
  //   await computeClient.clusterInstance.create(createClusterInstance);

  // const numberOfInstances = 1;

  // const promises: any[] = [];
  // for (let i = 0; i < numberOfInstances; i++) {
  //   promises.push(computeClient.clusterInstance.create(createClusterInstance));
  // }

  // clusterInstances.forEach((instance) => {
  //   if (instance.state === ClusterInstanceStateEnum.ACTIVE)
  //     promises.push(computeClient.clusterInstance.close(instance._id));
  // });

  // await Promise.all(promises);

  // const clusterInstance: ClusterInstance =
  //   await computeClient.clusterInstance.get(clusterInstances[0]._id);

  // const domains: Domain[] = await computeClient.clusterInstance.getDomains(
  //   clusterInstance._id
  // );

  // const domainUpdate: Domain = await computeClient.clusterInstance.updateDomain(
  //   clusterInstance._id,
  //   domains[0]._id,
  //   {~
  //     name: "test2.com",
  //     link: "provider.palmito.duckdns.org:31494",
  //     type: DomainTypeEnum.DOMAIN,
  //   }
  // );

  // await computeClient.clusterInstance.deleteDomain(
  //   clusterInstance._id,
  //   domains[0]._id
  // );

  // const domains: Domain[] =
  // await computeClient.clusterInstance.getClusterInstanceDomains(
  //   clusterInstance._id
  // );

  // const response: { order: ClusterInstanceOrder; liveLogs: string[] } =
  //   await computeClient.clusterInstance.getClusterInstanceOrder(
  //     clusterInstance.activeOrder
  //   );

  // const logs = await computeClient.clusterInstance.getClusterInstanceOrderLogs(
  //   response.order._id,
  //   { from: 0, to: 1000, logType: InstanceLogType.INSTANCE_LOGS }
  // );

  // await computeClient.clusterInstance.updateClusterInstance(updateInstance)

  // await Promise.all(
  //   clusterInstances.map((instance) => {
  //     if (instance.state === ClusterInstanceStateEnum.ACTIVE)
  //       computeClient.clusterInstance.closeClusterInstance(instance._id);
  //   })
  // );

  Logger.info("asdasd");
})();
