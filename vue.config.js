// vue.config.js
module.exports = {
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('raw-loader')
      .test(/\.(glsl|vs|fs|vert|frag)$/)
      .use('raw-loader')
        .loader('raw-loader')
        .end()
      // Add another loader
      .rule('glslify-loader')
      .test(/\.(glsl|vs|fs|vert|frag)$/)
      .use('glslify-loader')
        .loader('glslify-loader')
        .end()
  }      
}