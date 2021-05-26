const fs            = require('fs');
const path          = require('path');
const Merge         = require('webpack-merge').merge;
const webpack       = require('webpack');
const CommonConfig  = require('./webpack.common.js');
const SriPlugin     = require('webpack-subresource-integrity');
const pkg           = require('./package.json');
const ZipPlugin     = require('zip-webpack-plugin');
const CopyPlugin    = require('copy-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function (env) {
    const config = Merge(CommonConfig(env), {});

    config.mode = 'production';
    config.devtool = 'source-map';

    config.plugins.push(
        new CopyPlugin({
            patterns: [
                { context: 'src/locales/help/', from: '*', to: 'help' }
            ]
        }));

    config.plugins.push(
        new ZipPlugin({
            path:  path.resolve(__dirname, 'dist'),
            filename:  path.resolve(__dirname, `dist/fgpa-${pkg.version}.zip`),
            exclude: [/samples/]
        }));

    config.plugins.push(
        new SriPlugin({
            hashFuncNames: ['sha256', 'sha384'],
            enabled: true
        }));

    config.optimization = {
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                terserOptions: {
                    compress: {
                        pure_funcs: [
                            'console.log',
                            'console.debug',
                            'console.info'
                        ]
                    }
                }
            })
        ]
    }

    return config;
}
