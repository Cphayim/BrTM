#!/bin/bash

rootPath=$(
	cd "$(dirname $0)/.."
	pwd
)

hash node 2>/dev/null || {
	echo >&2 "未检测到 Node.js 环境，请先在本机安装 node"
	exit 1
}

if [ ! -d "node_modules" ]; then
	if hash yarn 2>/dev/null; then
		yarn
	else
		npm install
	fi
fi
