module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://netease-cloud-music-api-gules-two.vercel.app', // 目标路径
          // target:"http://localhost:3000",
          ws: true,
          changeOrigin: true, // 是否允许跨域
          pathRewrite: { 
            '^/api' : '' // 路径重写
        } 
        },
      }
    }
  }