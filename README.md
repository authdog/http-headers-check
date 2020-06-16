# Authdog Headers Check API

![](https://github.com/authdog/core-api/workflows/adg-hhc-ci/badge.svg)

# Prerequisites

- yarn
- node12

## Get started

- create a `secret.yml` file based on the `secret.tpl.yml`
- install dependencies with `yarn`
- start development server with `yarn .`

## Test locally

```bash
    curl -X POST \
     -H "Content-Type: application/json" \
    --data '{"uri":"https://www.authdog.com"}' \
    http://localhost:5501/api/v1/headers/check

```
