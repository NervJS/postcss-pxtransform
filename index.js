const postcss = require('postcss')

module.exports = postcss.plugin('postcss-pxtransform', plugin)

const PLATFORM = {
  WEAPP: 'weapp',
  H5: 'h5'
}

const DEVICE_RATIO = {
  '640': 2.34 / 2,
  '750': 1,
  '828': 1.81 / 2
}

const baseFontSize = 40

function plugin (opts) {
  opts = opts || {
    designWidth: 750,
    platform: PLATFORM.WEAPP
  }
  return function (root) {
    root.walkDecls(function (decl) {
      let value = decl.value
      value = value.replace(/([0-9.]+)px/ig, function (match, size) {
        switch (opts.platform) {
          case PLATFORM.WEAPP:
            return parseInt(size, 10) / DEVICE_RATIO[opts.designWidth] + 'rpx'
          case PLATFORM.H5:
            return Math.ceil((parseInt(size, 10) / baseFontSize * 640 / opts.designWidth) * 10000) / 10000 + 'rem'
        }
      })
      decl.value = value
    })
  }
}
