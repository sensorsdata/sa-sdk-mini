import sensors from './sensors.js';

sensors.init({
  server_url: '数据接收地址',
  heatmap: {
     //是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
     clickmap:'default',
     //是否开启触达注意力图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
     scroll_notice_map:'not_collect'
  }
});
sensors.quick('autoTrack'); //用于采集 $pageview 事件。