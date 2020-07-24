# Azure function for publishing JSON file to Algolia index

## Motivation

Main goal - have possibility to call it native way from DevOps pipeline

Example of use - [HUGO](https://gohugo.io/) site on [Azure](https://azure.microsoft.com/en-us/) and we should publish json file to [Algolia](https://www.algolia.com/) with [TechDoc theme](https://themes.gohugo.io/hugo-theme-techdoc/).

## Usage

For local development or testing we should use file
local.settings.json - where inside section `Values` we add 4 parameters
    "AlgoliaAppId":"Application Id from Algolia site",
    "AlgoliaAdminKey": "Admin key from algolia site",
    "AlgoliaIndexName": "Index name from algolia site",
    "JSON_URL":"https://URL/algolia.json"

For usage in Azure - we should add this parameters to `Application settings`

![Application settings](/static/azure-parameters.png)

function updateIndexFromURL - update index from url
function sendNewJsonToAlgolia - update index from multi part form data request with file

## Deploy

clone this repository, publish azure function from VS code

clone - `git clone https://github.com/vglu/AzureFunctionAlgoliaUpdateIndexFromJson.git`

Azure extension for VS code `https://code.visualstudio.com/docs/azure/extensions`

## CI/CD

Too many variants how to use CI/CD with Azure function.
I have created Azure DevOps project based on GitHub repository and setup Build and Release pipelines from Azure DevOps
