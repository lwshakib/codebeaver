# GitHub App Setup Guide

To enable the onboarding flow and repository indexing, you need to create a GitHub App and configure it with the following settings.

## Step 1: Create the GitHub App

1. Go to your [GitHub Settings](https://github.com/settings/apps) -> **GitHub Apps** -> **New GitHub App**.
2. **GitHub App name**: `PulseGrid-Dev` (or your preferred name).
3. **Homepage URL**: `http://localhost:3000` (or your production URL).
4. **Callback URL**: `http://localhost:3000/api/github/callback`
5. **Setup URL**: `http://localhost:3000/onboarding` (Optional, but helpful).
6. **Webhook**: 
    - **Active**: Check this.
    - **Webhook URL**: `http://localhost:3000/api/github/webhook` (We will implement this).
    - **Webhook secret**: Enter a random strong string (Save this for `.env`).

## Step 2: Permissions

Under **Repository permissions**, set the following:
- **Contents**: `Read-only` (To access code/files).
- **Metadata**: `Read-only` (Mandatory).
- **Pull requests**: `Read & Write` (To update descriptions and post comments).
- **Webhooks**: `Read & Write` (To manage repo webhooks).

Under **Subscribe to events**, check:
- **Push**
- **Pull request**

## Step 3: Installation

- **Where can this GitHub App be installed?**: Select **Any account** (if you want others to use it) or **Only on this account**.

## Step 4: Credentials

After creating the app:
1. **App ID**: Found at the top of the General page.
2. **Client ID**: Found in the "Client secrets" section.
3. **Client Secret**: Generate a new one.
4. **Private Key**: Scroll down and click **Generate a private key**. This will download a `.pem` file.

## Step 5: Update `.env`

Add these values to your `.env` file:

```env
GITHUB_APP_ID="YOUR_APP_ID"
GITHUB_APP_CLIENT_ID="YOUR_CLIENT_ID"
GITHUB_APP_CLIENT_SECRET="YOUR_CLIENT_SECRET"
GITHUB_APP_WEBHOOK_SECRET="YOUR_WEBHOOK_SECRET"

# The contents of the private key .pem file
# You can encode it in base64 to avoid newline issues: cat key.pem | base64
GITHUB_APP_PRIVATE_KEY="YOUR_BASE64_ENCODED_PRIVATE_KEY"
```

## Step 6: Public Link

To allow users to install the app, use this URL format on your onboarding page:
`https://github.com/apps/YOUR_APP_SLUG/installations/new`
