const core = require('@actions/core');
// const github = require('@actions/github');
const exec = require('@actions/exec');

// Custom JS will not install dependencies, we must include node_modules
function run() {
	// 1) Get some input values
	const bucket = core.getInput('bucket', {
		required: true,
	});
	const bucketRegion = core.getInput('bucket-region', {
		required: true,
	});
	const distFolder = core.getInput('dist-folder', {
		required: true,
	});

	// 2) Upload files
	const s3Uri = `s3://${bucket}`;
	// AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set in the action environment
	exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion} --delete`);

	// 3) Set output values
	const websiteUrl = `http://${bucket}.s3-website.${bucketRegion}.amazonaws.com`;
	core.setOutput('website-url', websiteUrl);
}

run();
