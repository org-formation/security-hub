import { Organizations } from "@aws-sdk/client-organizations";
import { STS } from "@aws-sdk/client-sts";
import yaml from 'js-yaml';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

const org = new Organizations({ region: "us-east-1" });
const sts = new STS({ region: "us-east-1" });

export const checkRunningInMgmgtAccount = async () => {
  const organization = await org.describeOrganization({});
  const caller = await sts.getCallerIdentity({});

  if (!organization.Organization) {
    console.error(`AWS account ${caller.Account} is not part of an organization!`);
    process.exitCode = 1;
    return;
  }

  if (organization.Organization.MasterAccountId !== caller.Account) {
    console.error(`This process needs to run in the context of account ${organization.Organization.MasterAccountId} (Organization Management Account)`);
    console.error(`Currently running in the context of account ${caller.Account}`);
    process.exitCode = 1;
    return;
  }
}

export const checkReplacedAccountIds = async () => {
  const parametersFilePath = path.resolve(__dirname, "../organization-parameters.yml");
  if (!existsSync(parametersFilePath)) {
    console.warn(`warn: could not find parameters file ${parametersFilePath}`);
    process.exitCode = 0;
  }

  const yamlContents = readFileSync(parametersFilePath, 'utf8');
  const parameters = yaml.load(yamlContents) as any;
  if (parameters.securityAccountId.Default === "123412341234") {
    console.error(`err: the value for "securityAccountId" in organization-parameters.yml needs to be replaced with an actual account ID`);
    process.exitCode = 1;
  }
  if (parameters.logArchiveAccountId.Default === "123412341234") {
    console.error(`err: the value for "logArchiveAccountId" in organization-parameters.yml needs to be replaced with an actual account ID`);
    process.exitCode = 1;
  }
}

const check = async () => {
  await checkRunningInMgmgtAccount();
  await checkReplacedAccountIds();

  if (!process.exitCode) {
    console.log("All prerequisites met!")
  }
}

check();