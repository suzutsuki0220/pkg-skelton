const MODE = 'development';  // 'production' or 'development'

// development に設定するとソースマップ有効でJSファイルが出力される
const enabledSourceMap = (MODE === 'development');

const MODULE = {
    rules: [
        {
            test: /\.(s)?css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        url: true,
                        sourceMap: enabledSourceMap,

                        // 0 => no loaders (default);
                        // 1 => postcss-loader;
                        // 2 => postcss-loader, sass-loader
                        importLoaders: 2
                    },
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: enabledSourceMap,
                    }
                }
            ],
        }, {
            // 画像など
            test: /\.(gif|png|jpg)$/,
            loader: 'url-loader'  // Base64化
        }, {
            test: /\.(ttf|eot|svg|woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader'
        }
    ]
};

const webPackConfig = {
    mode: MODE,
    target: 'web',
    entry: './webpack-web-index.js',
    externals: [
        'fs',
        'xmlhttprequest'
    ],
    output: {
        path: __dirname,
        filename: 'dist/web/jsutils.js'
    },
    module: MODULE
};

const nodePackConfig = {
    mode: MODE,
    target: 'node',
    entry: './webpack-node-index.js',
    externals: [
        require('webpack-node-externals')()
    ],
    output: {
        path: __dirname,
        filename: 'dist/node/jsutils.js'
    },
    module: MODULE
};

module.exports = [webPackConfig, nodePackConfig];
