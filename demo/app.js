
import sensors from './dist/mp-xx/index.esm.js';
// 如果需要额外引入插件
//import plugin from './dist/mp-xx/plugin/sat-channel/index.esm.js';
// 如果需要额外引入插件
//sensors.use(plugin);

// 注意需要将神策的代码，放在 app.js 靠前的位置
sensors.init({
  name:'sensors',
  server_url:'http://xxx.com',
  show_log:true,
  autoTrack:{}
})

//app.js
App({
  onLaunch: function (option) {
    console.info('App onLaunch',option);

  }
})