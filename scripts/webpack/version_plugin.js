const pkg           = require('../../package.json');
const ConcatSource  = require('webpack-sources').ConcatSource;
const version = {};

class VersionPlugin {
    constructor(options) {
        const packageVersion = pkg.version.split('.');
        version.major = packageVersion[0];
        version.minor = packageVersion[1];
        version.patch = packageVersion[2];
        version.timestamp = + new Date();
        version.gitHash = require('child_process').execSync('git rev-parse HEAD').toString().trim();
    }

    apply(compiler) {
        compiler.hooks.thisCompilation.tap('version_plugin', compilation => {
            compilation.hooks.optimizeChunkAssets.tapAsync('version_plugin', (chunks, callback) => {
                chunks.forEach(chunk => {
                    chunk.files.forEach(filename => {
                        if (/^av-main\.js$/.test(filename)) {
                            const content = `var AVersion = ${JSON.stringify(version)};`;
                            compilation.assets[filename] = new ConcatSource(content, compilation.assets[filename]);
                        }
                    });
                });
                callback();
            });
        });
    }
}

module.exports = VersionPlugin;
