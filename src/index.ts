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
  Event,
  EventTypeEnum,
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

  let topicId = "";
  computeClient.instance.subscribeToEventStream(async (event: Event) => {
    Logger.info(`EVENT: ${JSON.stringify(event)}`);

    if (event.type === EventTypeEnum.CONNECTION) {
      topicId = event.session;
      //   const createClusterInstance: InstanceCreationConfig = {
      //     configuration: {
      //       image: "crccheck/hello-world",
      //       tag: "latest",
      //       instanceCount: 1,
      //       ports: [{ containerPort: 8000, exposedPort: 8000 }],
      //       env: [{ key: "t", value: "t", isSecret: false }],
      //       command: [],
      //       args: [],
      //       region: "any",
      //       machineImageName: "Ventus Small",
      //     },
      //     uniqueTopicId: topicId,
      //     clusterName: "wallet test sdk",
      //     healthCheckPath: "/",
      //     healthCheckPort: 8000,
      //   };

      //   await computeClient.instance.create(createClusterInstance);

      computeClient.instance.triggerLatestHealth(
        "645d0f52cb3b250012e8fedf",
        topicId
      );
    }

    if (event.type === EventTypeEnum.LATEST_HEALTH) {
      Logger.info(`EVENT HEALTH: ${JSON.stringify(event)}`);
    }
  });

  setInterval(() => {
    Logger.info("asd");
  }, 10000);

  // const org: Organization = await computeClient.organization.get();

  // const orgUsage: UsageWithLimits = await computeClient.organization.getUsage();

  // const categories: string[] =
  //   await computeClient.computeMarketplace.getCategories();

  // const marketplaceApps: MarketplaceApp[] =
  //   await computeClient.computeMarketplace.getAll();

  // const marketplaceApp: MarketplaceApp =
  //   await computeClient.computeMarketplace.get(marketplaceApps[0].id);

  // const clusters: Cluster[] = await computeClient.organization.getClusters({
  //   skip: 0,
  //   limit: 10,
  // });

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

  // const createClusterInstance: InstanceCreationConfig = {
  //   configuration: {
  //     image: "crccheck/hello-world",
  //     tag: "latest",
  //     instanceCount: 1,
  //     ports: [{ containerPort: 8000, exposedPort: 8000 }],
  //     env: [{ key: "t", value: "t", isSecret: false }],
  //     command: [],
  //     args: [],
  //     region: "any",
  //     machineImageName: "Ventus Small",
  //   },
  //   // uniqueTopicId: topicId,
  //   clusterName: "wallet test sdk",
  //   healthCheckPath: "/",
  //   healthCheckPort: 8000,
  // };

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
  //     if (instance.state === InstanceStateEnum.ACTIVE)
  //       computeClient.instance.close(instance.id);
  //   })
  // );

  Logger.info("asdasd");
})();
