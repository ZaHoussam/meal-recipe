const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/meal-recipe/",
  chainWebpack: (config) => {
    config.output.chunkFilename(`./js/[name].[id].[chunkhash:8].js`);
  },
  outputDir: "meal-recipe",
});
