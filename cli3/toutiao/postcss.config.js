module.exports = {
    plugins: {
     // autoprefixer: {
      //  browsers: ['Android >= 4.0', 'iOS >= 8'],
     // },
      'postcss-pxtorem': {
          //转换的跟元素基准值 设计稿宽750
        rootValue: 37.5,
        propList: ['*'],
      },
    },
  };