import SpheronComputeClient, {
  Cluster,
  ClusterFundsUsage,
  ClusterProtocolEnum,
  ComputeMachine,
  Domain,
  DomainTypeEnum,
  Instance,
  InstanceCreationConfig,
  InstanceDeployment,
  InstanceDetailed,
  InstanceLogType,
  InstanceResponse,
  InstanceStateEnum,
  InstancesInfo,
  MarketplaceApp,
  MarketplaceInstanceCreationConfig,
  MarketplaceInstanceResponse,
  Organization,
  ProviderEnum,
  UpdateInstaceRequest,
  UsageWithLimits,
} from "@spheron/compute";
import Logger from "./config/logger";
import { link } from "fs";
import { type } from "os";

async function safePromise<T>(
  asyncFunction: Promise<T>,
  errorInfo?: string
): Promise<void> {
  try {
    await asyncFunction;
  } catch (error) {
    Logger.error(
      `Error safePromise -${errorInfo ? " errorInfo - " : " "} ${error.message}`
    );
  }
}

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

  // const org: Organization = await computeClient.organization.get();

  // const orgUsage: UsageWithLimits = await computeClient.organization.getUsage();

  // const categories: string[] =
  //   await computeClient.computeMarketplace.getCategories();

  // const marketplaceApps: MarketplaceApp[] =
  //   await computeClient.computeMarketplace.getAll();

  // const marketplaceApp: MarketplaceApp =
  //   await computeClient.computeMarketplace.get(marketplaceApps[0].id);

  const clusters: Cluster[] = await computeClient.organization.getClusters({
    skip: 0,
    limit: 10,
  });

  // clusters.forEach(async (cluster) => {
  //   const promises: any[] = [];
  //   const clusterInstances: InstanceDetailed[] =
  //     await computeClient.cluster.getInstances(cluster.id, {
  //       skip: 0,
  //       limit: 10,
  //     });
  //   clusterInstances.forEach((instance) => {
  //     if (instance.state === InstanceStateEnum.ACTIVE)
  //       promises.push(computeClient.instance.close(instance.id));
  //   });

  //   await Promise.all(promises);
  // });

  // const clusterInstancesExtended: InstanceDetailed[] =
  //   await computeClient.cluster.getInstances(clusters[0].id, {
  //     skip: 0,
  //     limit: 10,
  //   });

  // const clusterFunds: ClusterFundsUsage = await computeClient.cluster.getUsage(
  //   clusters[0].id
  // );

  // const clusterInstancesInfo: InstancesInfo =
  //   await computeClient.cluster.getInstancesInfo(clusters[0].id);

  // await computeClient.cluster.delete(clusters[0].id);

  // const computeMachines: ComputeMachine[] =
  //   await computeClient.computeMachine.get({
  //     skip: 0,
  //     limit: 5,
  //   });

  // const regions: string[] = await computeClient.computeMachine.getRegions();

  // const mongoTemplate: MarketplaceApp = marketplaceApps[0];

  // const clusterInstanceFromTemplate: MarketplaceInstanceCreationConfig = {
  //   templateId: mongoTemplate.id,
  //   environmentVariables: mongoTemplate.serviceData.variables.map(
  //     (templateVar) => {
  //       return {
  //         label: templateVar.label,
  //         value: templateVar.defaultValue,
  //         isSecret: false,
  //       };
  //     }
  //   ),
  //   machineImageId: computeMachines[2].id,
  //   region: "any",
  // };

  // const marketplaceInstance: MarketplaceInstanceResponse =
  //   await computeClient.instance.createFromMartketplace(
  //     clusterInstanceFromTemplate
  //   );

  // const updateInstance: UpdateInstaceRequest = {
  //   env: [{ value: "t2=t2", isSecret: false }],
  //   command: [],
  //   args: [],
  //   uniqueTopicId: "89fcf863-a3ab-44f2-9276-9ea75631498c",
  //   tag: "latest",
  // };

  // const updateResponse: InstanceResponse = await computeClient.instance.update(
  //   "63612a842e50ee3ffbebcf06",
  //   updateInstance
  // );

  const createClusterInstance: InstanceCreationConfig = {
    configuration: {
      folderName: "",
      protocol: ClusterProtocolEnum.AKASH,
      image: "crccheck/hello-world",
      tag: "latest",
      instanceCount: 1,
      buildImage: false,
      ports: [{ containerPort: 8000, exposedPort: 8000 }],
      env: [{ key: "t", value: "t", isSecret: false }],
      command: [],
      args: [],
      region: "any",
      machineImageName: "Ventus Small",
    },
    // uniqueTopicId: topicId,
    clusterUrl: "crccheck/hello-world",
    clusterProvider: ProviderEnum.DOCKERHUB,
    clusterName: "wallet test sdk",
    healthCheckUrl: "/",
    healthCheckPort: 8000,
  };

  // const clusterInstancesExtended: InstanceDetailed[] =
  //   await computeClient.cluster.getInstances(clusters[0].id, {
  //     skip: 0,
  //     limit: 10,
  //   });

  // clusterInstancesExtended.forEach((instance) => {
  //   if (instance.state === InstanceStateEnum.ACTIVE)
  //     promises.push(computeClient.instance.close(instance.id));
  // });

  // const clusterInstance: Instance = await computeClient.instance.get(
  //   clusterInstancesExtended[0].id
  // );

  // const instanceDomains: Domain[] = await computeClient.instance.getDomains(
  //   clusterInstance.id
  // );

  // const domainUpdate: Domain = await computeClient.instance.updateDomain(
  //   clusterInstance.id,
  //   instanceDomains[0].id,
  //   {
  //     name: "test2.com",
  //     link: "provider.palmito.duckdns.org:31494",
  //     type: DomainTypeEnum.DOMAIN,
  //   }
  // );

  // await computeClient.instance.deleteDomain(
  //   clusterInstance.id,
  //   instanceDomains[0].id
  // );

  // const domains: Domain[] = await computeClient.instance.getDomains(
  //   clusterInstance.id
  // );

  // const response: { deployment: InstanceDeployment; liveLogs: string[] } =
  //   await computeClient.instance.getInstanceDeployment(
  //     clusterInstance.activeDeployment
  //   );

  // const logs = await computeClient.instance.getInstanceDeploymentLogs(
  //   response.deployment.id,
  //   { from: 0, to: 1000, logType: InstanceLogType.INSTANCE_LOGS }
  // );

  // await computeClient.instance.update(clusterInstance.id, updateInstance);

  // await Promise.all(
  //   clusterInstancesExtended.map((instance) => {
  //     if (instance.state === ClusterInstanceStateEnum.ACTIVE)
  //       computeClient.instance.close(instance.id);
  //   })
  // );

  Logger.info("asdasd");
})();
