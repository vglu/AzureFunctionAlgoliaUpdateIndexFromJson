# Azure function for publishing JSON file to Algolia index

## Motivation

Main goal - have possibility to call it native way from DevOps pipeline

Example of use - [HUGO](https://gohugo.io/) site on [Azure](https://azure.microsoft.com/en-us/) and we should publish json file to [Algolia](https://www.algolia.com/) with [TechDoc theme](https://themes.gohugo.io/hugo-theme-techdoc/).

## Usage

For local development or testing we should use file
local.settings.json - where inside section `Values` we add 3 parameters
    "AlgoliaAppId":"Application Id from Algolia site",
    "AlgoliaAdminKey": "Admin key from algolia site",
    "AlgoliaIndexName": "Index name from algolia site"

For usage in Azure - we should add this parameters to `Application settings`

![Application settings](/static/azure-parameters.png)

You can setup Hugo site hosted on Azure. You can setup Azure DevOps pipeline for Hugo static site to support CI-CD foe static web site. You can use additional step to call algolia index update. In general, this function can be used from Power Shell - Invoke-WebRequest, or from Postman (example below).

## Deploy

clone this repository, publish azure function from VS code

clone - `git clone https://github.com/vglu/AzureFunctionAlgoliaUpdateIndexFromJson.git`

Azure extension for VS code `https://code.visualstudio.com/docs/azure/extensions`

## CI/CD

Too many variants how to use CI/CD with Azure function.
I have created Azure DevOps project based on GitHub repository and setup Build and Release pipelines from Azure DevOps

## Postman usage

Here is example how to use it from `Postman`

![Headers](/static/postman1.png)

![Body](/static/postman2.png)