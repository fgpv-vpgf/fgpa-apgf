const webpack   = require('webpack');
const path      = require('path');
const fs        = require('fs');
const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const TranslationPlugin     = require('./scripts/webpack/translations_plugin.js');
const CopyWebpackPlugin     = require('copy-webpack-plugin');
const VersionPlugin         = require('./scripts/webpack/version_plugin.js');
const WrapperPlugin         = require('wrapper-webpack-plugin');
const CleanWebpackPlugin    = require('clean-webpack-plugin');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = function (env) {

    const geoPath = env.geoLocal ?
        env.geoLocal.length > 0 ?
            env.geoLocal :
            path.resolve(__dirname, '../', 'geoApi') :
        path.resolve(__dirname, 'node_modules/geoApi');

    const config = {
        entry: {
            'av-main': path.resolve(__dirname, 'src/app/app-loader.js'),
            'ie-polyfills': path.resolve(__dirname, 'src/polyfill/polyfill-loader.js')
        },

        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].js'
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: [path.resolve(__dirname, 'src/app'), path.resolve(__dirname, 'src/plugins'), geoPath],
                    use: [{
                        loader: 'ng-annotate-loader'
                    }, {
                        loader: 'babel-loader',
                        options: { presets: ['es2015', 'stage-2'], cacheDirectory: true }
                    }, {
                        loader: 'eslint-loader'
                    }]
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        use: ['style-loader', 'css-loader']
                    })
                },
                {
                // for .css files in bootsrap node_modules
                    test: /\.css$/,
                    include: [path.resolve(__dirname, 'node_modules/bootstrap')],
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.(woff|woff2|ttf|eot)$/,
                    loader: "url-loader?limit=10000&mimetype=application/font-woff"
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'resolve-url-loader', 'sass-loader?sourceMap']
                    })
                },
                {
                    test: /\.html$/,
                    use: ['ngtemplate-loader?relativeTo=' + (path.resolve(__dirname, './src/app')), 'html-loader?minimize=false']
                },
                {
                    test: /\.(png|svg)$/,
                    use: 'url-loader'
                },
                {
                    test: /\.xsl$/,
                    use: 'raw-loader'
                },
                {
                    test: /ui-sortable/,
                    use: ['imports-loader?$UI=jquery-ui/ui/widgets/sortable']
                }
            ]
        },

        plugins: [
            new webpack.PrefetchPlugin(geoPath),
            new webpack.PrefetchPlugin(path.resolve(__dirname, 'src/app/app-loader.js')),

            new webpack.optimize.ModuleConcatenationPlugin(),

            new CopyWebpackPlugin([{
                context: 'src/content/samples',
                from: '**/*.json',
                to: 'samples'
            },{
                context: 'src/content/samples',
                from: '**/*.html',
                to: 'samples'
            },{
                context: 'src/content/samples',
                from: '**/*.js',
                to: 'samples'
            },{
                from: 'src/locales/help',
                to: 'samples/help'
            },{
                from: 'src/schemas/schemaForm',
                to: 'samples/schemaForm'
            }]),

            new CopyWebpackPlugin([
                { from: 'node_modules/tv4/tv4.js', to: 'form'},
                { from: 'node_modules/angular-schema-form-bootstrap/dist/angular-schema-form-bootstrap-bundled.min.js', to: 'form'}
            ]),

            // need to add angular-schema-form inside html with HtmlWebpackIncludeAssetsPlugin... https://github.com/json-schema-form/json-schema-form-core/pull/5
            new HtmlWebpackPlugin({
                filename: 'samples/index-author.html'
            }),
            new HtmlWebpackIncludeAssetsPlugin({
                assets: ['form/tv4.js'],
                append: false
            }),
            new HtmlWebpackIncludeAssetsPlugin({
                assets: ['form/angular-schema-form-bootstrap-bundled.min.js'],
                append: true
            }),

            new ExtractTextPlugin('av-styles.css'),

            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }),

            new TranslationPlugin('./src/locales/translations.csv'),

            new WrapperPlugin({
                header: fileName => /^av-main\.js$/.test(fileName) ? fs.readFileSync('./scripts/webpack/header.js', 'utf8') : '',
                footer: fileName => /^av-main\.js$/.test(fileName) ? fs.readFileSync('./scripts/webpack/footer.js', 'utf8') : ''
            }),

            new VersionPlugin(),

            new CleanWebpackPlugin(['build'])
        ],

        // TODO: remove? externals: { 'TweenLite': 'TweenLite' },

        resolve: {
            modules: [path.resolve(__dirname, 'node_modules'), path.resolve(geoPath, 'node_modules')],
            alias: {
                XSLT: path.resolve(__dirname, 'src/content/metadata/')
            }
        },

        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
            ignored: /node_modules/
        },

        devServer: {
            host: '0.0.0.0',
            publicPath: '/',
            historyApiFallback: {
                index: '/samples/webpack-note.html',
                verbose: true
            },
            disableHostCheck: true,
            contentBase: false,
            port: 6001,
            stats: { colors: true },
            compress: true
        }
    };

    config.plugins.push(...htmlInjectPlugins());

    if (env.geoLocal) {
        config.resolve.alias['geoApi$'] = geoPath;
    }

    return config;
}

function htmlInjectPlugins() {
    return fs.readdirSync('src/content/samples').map(file => {
        if (/\.tpl$/.test(file)) {
            return new HtmlWebpackPlugin({
                inject: false,
                filename: `samples/${file.replace(/\.[^/.]+$/, '.html')}`,
                template: `src/content/samples/${file}`,
                excludeChunks: ['ie-polyfills'],
                chunksSortMode: (a, b) => {  //alphabetical order
                    if (a.names[0] < b.names[0]) { return 1; }
                    if (a.names[0] > b.names[0]) { return -1; }
                    return 0;
                }
            });
        }
    }).filter(x => typeof x !== 'undefined');
}
