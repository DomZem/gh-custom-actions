const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

// Custom JS will not install dependencies, we must include node_modules
function run() {
	core.notice('Hello from my custom JavaScript action!');
}

run();
