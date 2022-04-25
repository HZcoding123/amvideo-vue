// 先引入webpack
const webpack =require("webpack");
module.exports = {
// 再 配置 plugins
    configureWebpack: {
        plugins:[
            new webpack.ProvidePlugin({
                jQuery: "jquery",
                jquery:"jquery",
                $: "jquery",
                "window.jQuery":"jquery"
            })
        ]
    }
};