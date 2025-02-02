process.traceDeprecation = true;
const package_json = require("./package.json");
const path = require("path");
const patternslib_config = require("@patternslib/patternslib/webpack/webpack.config");
const mf_config = require("@patternslib/patternslib/webpack/webpack.mf");

module.exports = async (env, argv) => {
    let config = {
        entry: {
            "imagecropping.min": path.resolve(__dirname, "resources/index"),
        },
    };

    config = patternslib_config(env, argv, config, ["mockup"]);
    config.output.path = path.resolve(__dirname, "src/plone/app/imagecropping/browser/static");

    config.plugins.push(
        mf_config({
            filename: "imagecropping-remote.min.js",
            package_json: package_json,
            remote_entry: config.entry["imagecropping.min"],
        })
    );

    if (process.env.NODE_ENV === "development") {
        config.devServer.port = "8011";
        config.devServer.static.directory = __dirname;
    }

    console.log(JSON.stringify(config, null, 4));

    return config;
};

