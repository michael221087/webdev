({
	baseUrl: "../js",
    paths: {
        requireLib: '../vendor/requirejs/require',
        facebook: "empty:"
    },
    include: 'requireLib',
    mainConfigFile: "../js/config.js",
	name: "main",
    out: "../js/main.min.js",
    //optimize: "none",
    wrap: false,
    findNestedDependencies: true,
    skipModuleInsertion: false,
    logLevel: 0,
    preserveLicenseComments: false
})