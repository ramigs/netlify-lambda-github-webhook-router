# netlify-lambda-github-webhook-router

Netlify Lambda Function that listens to GitHub's `push` Webhook, filtering which sites/folders include file changes, and triggering Netlify's build hook **only** for those specific sites.

This is useful if you have a repository with multiple sites, and would like to avoid unecessary builds
and deploys for sites to which no changes were pushed to the repository.

# Setup

To run the function locally, here’s what you’ll need:

Clone the repo:

```bash
git clone https://github.com/ramigs/netlify-lambda-github-webhook-router
cd netlify-lambda-github-webhook-router
```

### Install dependencies

```bash
npm install
```

### List your sites and endpoints

Create and edit file `.env` to specify the sites included in the repository, and their respective Netlify endpoints.

Each site is describe by two env variables:

- **SITE_1_FOLDER**, the relative repository path of site `1`
- **SITE_1_NETLIFY_ENDPOINT**, the URL of Netlify's build hook for site `1`

Check `.env_sample` to see an example.

### Build lambda function

```bash
npm run lambda-build
```

### Run lambda function locally

```bash
npm run lambda-serve
```

Function will be running at http://localhost:9000/webhookParser

### Testing locally

You can send a `POST` request to http://localhost:9000/webhookParser , following the same
request of GitHub's Webhook.

If you send the following HTTP request, and you have `11-Custom-Video-Player` site/folder added to your env variables, with the respective Netlify endpoint, the site's build and deploy will be triggered.

```json
{
	"head_commit": {
		"added": ["11-Custom-Video-Player/f1.txt", "f2.txt"],
		"removed": ["f3.txt", "f4.txt"],
		"modified": ["f5.txt", "f6.txt"]
		
	}
}
```

# Deploying function to Netlify

Create a new site on Netlify, and connect your function's repo to it.

# Add sites and endpoints to Netlify

Create your environment variables in your function's site, following the same format of `.env`.

PS: If you make changes to variables, a new build and deploy is required to force variables to be reloaded.

# GitHub Webhook to Netlify function

Configure GitHub to send the Webhook to the deployed function's Netlify endpoint.

# Ask Netlify Support

Request disabling of automatic deploys for all your sites in the repository, **while still maintaining the repo linked to Netlify**, as mentioned [here](https://community.netlify.com/t/common-issue-how-can-i-disable-automatic-git-deploys/166/2).
