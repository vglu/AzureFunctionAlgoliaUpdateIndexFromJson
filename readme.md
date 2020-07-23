# Azure function for publishing JSON file to Algolia index

## Motivation

Main goal - have possibility to call it native way from DevOps pipeline

Example of use - HUGO site on Azure and we should publish json file to Algolia.

## Usage

For local development or testing we should use file
local.settings.json - where inside section `Values` we add 3 parameters
    "AlgoliaAppId":"Application Id from Algolia site",
    "AlgoliaAdminKey": "Admin key from algolia site",
    "AlgoliaIndexName": "Index name from algolia site"

For usage in Azure - we should add this parameters to `Application settings`

![Application settings](/static/azure-parameters.png)