var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.join(__dirname, 'node_modules');
var components_dir = path.join(__dirname, 'src/components')+"/";

//独立项
var deps = [
  'react/dist/react.min.js',
  'jquery/dist/jquery.min.js',
  'underscore/underscore-min.js'
];


//重定向文件
var alias= {
  Base          : components_dir + 'Base/Base.js',
  Loadmore      : components_dir + 'Loadmore/Loadmore.js',
  Dropdown      : components_dir + 'Dropdown/Dropdown.js',
  SignIn        : components_dir + 'SignIn/SignIn.js'
};

config = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    alias: []
  },
  module: {
    noParse : [],
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: [
        path.join(__dirname,'components'),path.join(__dirname,'features')
      ]
    },{
      test: /\.css$/,
      exclude: [
        path.resolve(__dirname, 'node_modules')
      ],
      loaders: ['style', 'css?modules&localIdentName=[name]_[local]_[hash:base64:5]','autoprefixer?{browsers:["> 5%", "ie 9"]}']
    }]
  }
};

//加载 alias项
deps.forEach(function (dep) {
  var depPath = path.resolve(node_modules_dir, dep);
  config.module.noParse.push(depPath);
});

//重定向文件赋值
config.resolve.alias = alias;

module.exports = config;
