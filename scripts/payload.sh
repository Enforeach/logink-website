#!/usr/bin/env bash
# Payload CLI wrapper: the CLI only loads this TS config as ESM with SWC on Node 24/25, so package.json gets
# "type": "module" for the duration of the command and is always restored. Usage: scripts/payload.sh migrate:create name
set -euo pipefail
cd "$(dirname "$0")/.."
cp package.json /tmp/logink-package.json.bak
trap 'cp /tmp/logink-package.json.bak package.json' EXIT INT TERM HUP
node -e "const f='package.json',p=require('./'+f);p.type='module';require('fs').writeFileSync(f,JSON.stringify(p,null,2)+'\n')"
# env files fill in what the command line did not set (DATABASE_URL=... scripts/payload.sh ... wins)
keep=$(export -p | grep -E ' (DATABASE_URL|PAYLOAD_SECRET|PAYLOAD_PUSH)=' || true)
set -a; [ -f .env ] && . ./.env; [ -f .env.development.local ] && . ./.env.development.local; set +a
eval "$keep"
npx payload "$@" --use-swc
