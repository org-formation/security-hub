# Security Hub IaC Quickstart

This repository is intended for anyone that wants to get started setting up Security Hub.

It will enable Security Hub, AWS Config, CloudTrail and GuardDuty across your AWS Organizations member accounts and regions.
It will also configure Security Hub to use the Consolidated findings feature and disable security controls based on [Guidance from AWS](https://docs.aws.amazon.com/securityhub/latest/userguide/controls-to-disable.html).

This repository uses Infrastructure as Code to set up Security Hub. The advantages are:
- you can review/audit the configuration of Security hub within source control
- the deployment is automated and no manual steps are needed
- you can modify and redeploy changes to your Security Hub configuration at any time to best fit your organizations need.

## Org-formation or AWS Control Tower?

The quickstart uses the org-formation to *deploy* cloudformation templates, however it supports any AWS Organization (built with org-formation or otherwise) and wont make any changes to your AWS Organization.

All you have to do is to modify the [organization-parameters.yml](./organization-parameters.yml) file and add the AccountId of your Security and LogArchive accounts and you are done.

## Getting started

1. fork this repo
2. modify the values in [organization-parameters.yml](./organization-parameters.yml)
3. ensure you are signed into the management account of your AWS Organization
4. run the following command to deploy Security Hub: `npm ci && npm run perform-tasks`
5. discuss, exchange best practices or get help on [slack](https://join.slack.com/t/org-formation/shared_invite/enQtOTA5NjM3Mzc4ODUwLTMxZjYxYzljZTE5YWUzODE2MTNmYjM5NTY5Nzc3MzljNjVlZGQ1ODEzZDgyMWVkMDg3Mzk1ZjQ1ZjM4MDhlOGM)