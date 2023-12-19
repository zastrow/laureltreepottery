# Laurel Tree Pottery
Website for Lori’s pottery using Adobe’s AEM website builder.

## Environments
- Preview: https://main--laureltreepottery--zastrow.hlx.page/
- Live: https://main--laureltreepottery--zastrow.hlx.live/

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-boilerplate` template and add a mountpoint in the `fstab.yaml`
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Install the [AEM CLI](https://github.com/adobe/aem-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `laureltreepottery` directory in your favorite IDE and start coding :)
