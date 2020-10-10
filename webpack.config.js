var path = require('path');

var config = {
    entry: {
        app: './src/main/js/app.js'
    },
    cache: true,
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/[name].js'
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react", {
                                plugins: ["@babel/plugin-proposal-class-properties"]
                            }],
                            plugins: [ "emotion"]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: ['file-loader']
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src/main/js'), path.resolve(__dirname, 'src/main/resources/static'), 'node_modules'],
        alias: {
            '/images': path.resolve(__dirname, 'src/main/resources/static/images'),
            '/fonts': path.resolve(__dirname, 'src/main/resources/static/fonts'),
        },
    }
}

module.exports = (env, argv) => {
    config.mode = argv.mode;
    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }

    return config;
};