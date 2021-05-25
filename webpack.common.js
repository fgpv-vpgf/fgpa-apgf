const webpack   = require('webpack');
const path      = require('path');
const fs        = require('fs');
const glob      = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const TranslationPlugin     = require('./scripts/webpack/translations_plugin.js');
const CopyWebpackPlugin     = require('copy-webpack-plugin');
const VersionPlugin         = require('./scripts/webpack/version_plugin.js');
const WrapperPlugin         = require('wrapper-webpack-plugin');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const htmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const BundleAnalyzerPlugin  = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

const babelPresets = {
    presets: ['@babel/preset-env'],
    plugins: ['angularjs-annotate'],
    cacheDirectory: true
}

// eslint-disable-next-line complexity
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
                    test: /\.(woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
                    include: [path.resolve(__dirname, 'src/content/fonts')],
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            mimetype: 'application/font-woff',
                            publicPath: 'fonts/',
                            outputPath: 'fonts/'
                        }
                    }]
                },
                {
                    test: /\.js$/,
                    include: [path.resolve(__dirname, 'src/app'), geoPath],
                    use: [{
                        loader: 'babel-loader',
                        options: babelPresets
                    }]
                },
                {
                    test: /\.s?[ac]ss$/,
                    include: [path.resolve(__dirname, 'src/content/styles'), path.resolve(__dirname, 'node_modules/@fgpv')],
                    use: [
                        env.hmr ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {loader: 'css-loader'},
                        {
                            loader: 'resolve-url-loader'
                        },
                        'sass-loader'
                    ]
                },
                {
                    test: /\.html$/,
                    include: [path.resolve(__dirname, 'src/content/samples'), path.resolve(__dirname, 'src/app')],
                    use: ['ngtemplate-loader?relativeTo=' + (path.resolve(__dirname, './src/app')), 'html-loader?minimize=false']
                },
                {
                    test: /\.(png|svg|woff|woff2)$/,
                    include: [path.resolve(__dirname, 'src/content'), path.resolve(__dirname, 'node_modules/ag-grid-community'),
                        path.resolve(__dirname, 'node_modules/@claviska'), path.resolve(__dirname, 'node_modules/bootstrap/dist/fonts')],
                    use: 'url-loader'
                },
                {   test: /\.(ttf|eot)$/,
                    loader: 'file-loader'
                },
                {
                    test: /ui-sortable/,
                    use: ['imports-loader?$UI=jquery-ui/ui/widgets/sortable']
                }
            ]
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: 'av-styles.css'
            }),

            new ESLintPlugin({}),

            new WebpackShellPluginNext({
                onBuildStart: { scripts: ['bash scripts/preBuild.sh'] },
                onBuildEnd: { scripts: ['bash scripts/postBuild.sh'] }
            }),

            new CopyWebpackPlugin({ patterns: [{
                context: 'src/content/samples',
                from: '**/*.+(json|js|css|html)',
                to: 'samples'
            },{
                from: 'src/locales/help',
                to: 'samples/help'
            },{
                from: 'src/schemas/schemaForm',
                to: 'samples/schemaForm'
            }]}),

            new CopyWebpackPlugin({ patterns: [
                { from: 'node_modules/tv4/tv4.js', to: 'form'},
                { from: 'node_modules/angular-schema-form-bootstrap/dist/angular-schema-form-bootstrap-bundled.min.js', to: 'form'}
            ]}),

            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            }),

            new TranslationPlugin('./src/locales/translations.csv'),

            new WrapperPlugin({
                test: /^av-main\.js$/,
                header: fs.readFileSync('./scripts/webpack/header.js', 'utf8'),
                footer: fs.readFileSync('./scripts/webpack/footer.js', 'utf8')
            }),

            new VersionPlugin()
        ],

        resolve: {
            modules: [path.resolve(__dirname, 'node_modules'), path.resolve(geoPath, 'node_modules')],
            alias: {
                jquery: 'jquery/src/jquery', // so webpack builds from src and not dist - optional but good to have
                src: path.resolve(__dirname, 'src/'),
                app: path.resolve(__dirname, 'src/app/')
            },
            extensions: ['.js', 'css', 'scss']
        },

        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
            ignored: /node_modules/
        },

        devServer: {
            host: '0.0.0.0',
            https: !!env.https,
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

    const files = glob.sync('samples/**/*', {cwd: './src/content/', nodir: true});
    config.plugins.push(...files.map(file => {
        if (/\.tpl$/.test(file)) {
            const filePath = file.split('/');
            const fileName = filePath.pop();
            return new HtmlWebpackPlugin({
                inject: false,
                filename: `${filePath.join('/')}/${fileName.replace(/\.[^/.]+$/, '.html')}`,
                template: `src/content/${file}`,
                excludeChunks: ['ie-polyfills']
            });
        }
    }).filter(x => x)
    );

    config.plugins.push(new htmlWebpackTagsPlugin({
        tags: ['form/tv4.js'],
        append: false
    }));
    config.plugins.push(new htmlWebpackTagsPlugin({
        tags: ['form/angular-schema-form-bootstrap-bundled.min.js'],
        append: true
    }));

    // not supported while doing hmr - causes memory leaks and slows build time by ~40%
    if (!env.hmr && !env.inspect) {
        config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
    }

    if (env.inspect) {
        config.plugins.push(new BundleAnalyzerPlugin({openAnalyzer: false, generateStatsFile: true}));
    }

    if (env.geoLocal) {
        config.resolve.alias['geoApi$'] = geoPath;
    }

    return config;
}
