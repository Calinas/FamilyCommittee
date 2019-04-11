const path = require('path');
var prod = process.env.NODE_ENV === 'production';

module.exports = {
  wpyExt: '.wpy',
  eslint: false,
  cliLogs: !prod,
  build: {
  },
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
      api: path.join(__dirname, 'src/api'),
      images: path.join(__dirname, 'src/images'),
      store: path.join(__dirname, 'src/store'),
      utils: path.join(__dirname, 'src/utils'),
      components: path.join(__dirname, 'src/components')
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    less: {
      compress: prod
    },
    sass: {
      outputStyle: 'compressed'
    },
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions',
        'transform-node-env-inline',
        ['global-define', {
          isProd: prod
        }]
      ]
    }
  },
  plugins: {
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery'],
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://www.ctjwh.com/api/v1' : 'https://test.ctjwh.com/api/v1'
  }
}

if (prod) {

  // 压缩sass
  module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {
      }
    },
    filemin: {
      filter: /\.(json|wxml|xml)$/
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  }
}
