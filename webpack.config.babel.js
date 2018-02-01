import {
    join
} from "path";

const include = join(__dirname, "src");

export default {
    entry: "./src/index",
    target: 'node',
    output: {
        path: join(__dirname, "dist"),
        library: "fn-cli",
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                test: /\.js fn-cli$/,
                loader: "babel-loader",
                include
            },
            {
                test: /\.json$/,
                loader: "json-loader",
                include
            },
        ]
    }
};
