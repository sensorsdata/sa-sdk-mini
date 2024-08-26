var sa={is_first_launch:!1,launched:!1,_queue:[],mpshow_time:null,sa_referrer:'\u76f4\u63a5\u6253\u5f00',query_share_depth:0,share_distinct_id:'',share_method:'',current_scene:'',inited:!1,para:{server_url:'',send_timeout:1e3,show_log:!1,allow_amend_share_path:!0,max_string_length:500,datasend_timeout:3e3,source_channel:[],batch_send:{send_timeout:6e3,max_length:6},preset_properties:{}},platform:'',lib:{version:'0.14.3',name:'MiniGame',method:'code'},properties:{$lib:'MiniGame',$lib_version:'0.14.3'},currentProps:{}};const _toString=Object.prototype.toString,_hasOwnProperty=Object.prototype.hasOwnProperty,indexOf=Array.prototype.indexOf,slice=Array.prototype.slice,_isArray=Array.prototype.isArray,forEach=Array.prototype.forEach,bind=Function.prototype.bind;function isUndefined(e){return void 0===e}function isString(e){return'[object String]'==_toString.call(e)}function isDate(e){return'[object Date]'==_toString.call(e)}function isBoolean(e){return'[object Boolean]'==_toString.call(e)}function isNumber(e){return'[object Number]'==_toString.call(e)&&/[\d\\.]+/.test(String(e))}function isJSONString(e){try{JSON.parse(e)}catch(e){return!1}return!0}function isObject(e){return null!=e&&'[object Object]'===_toString.call(e)}function isPlainObject(e){return'[object Object]'===_toString.call(e)}function isArray(e){return _isArray||'[object Array]'===_toString.call(e)}function isFuction(e){try{return/^\s*\bfunction\b/.test(e)}catch(e){return!1}}function isArguments(e){return!(!e||!_hasOwnProperty.call(e,'callee'))}function toString(e){return null==e?'':isArray(e)||isPlainObject(e)&&e.toString===_toString?JSON.stringify(e,null,2):String(e)}function each(e,t,r){if(null==e)return!1;if(forEach&&e.forEach===forEach)e.forEach(t,r);else if(e.length===+e.length){for(var s=0,n=e.length;s<n;s++)if(s in e&&t.call(r,e[s],s,e)==={})return!1}else for(var a in e)if(_hasOwnProperty.call(e,a)&&t.call(r,e[a],a,e)==={})return!1}function toArray(e,t){if(!e)return[];var r=[];return e.toArray&&(r=e.toArray()),isArray(e)&&(r=slice.call(e)),isArguments(e)&&(r=slice.call(e)),r=values(e),t&&isNumber(t)&&(r=r.slice(t)),r}function values(e){var t=[];return null==e?t:(each(e,function(e){t[t.length]=e}),t)}function include(e,t){var r=!1;return null==e?r:indexOf&&e.indexOf===indexOf?-1!=e.indexOf(t):(each(e,function(e){if(r||(r=e===t))return{}}),r)}function unique(e){for(var t,r=[],s={},n=0;n<e.length;n++)s[t=e[n]]||(s[t]=!0,r.push(t));return r}function formatDate(e){function t(e){return e<10?'0'+e:e}return e.getFullYear()+'-'+t(e.getMonth()+1)+'-'+t(e.getDate())+' '+t(e.getHours())+':'+t(e.getMinutes())+':'+t(e.getSeconds())+'.'+t(e.getMilliseconds())}function searchObjDate(e){(isObject(e)||isArray(e))&&each(e,function(t,r){isObject(t)||isArray(t)?searchObjDate(e[r]):isDate(t)&&(e[r]=formatDate(t))})}function trim(e){return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,'')}function isFunction(e){if(!e)return!1;var t=Object.prototype.toString.call(e);return'[object Function]'==t||'[object AsyncFunction]'==t||'[object GeneratorFunction]'==t}function extend(e){return each(slice.call(arguments,1),function(t){for(var r in t)void 0!==t[r]&&(e[r]=t[r])}),e}function extend2Lev(e){return each(slice.call(arguments,1),function(t){for(var r in t)void 0!==t[r]&&null!==t[r]&&(isObject(t[r])&&isObject(e[r])?extend(e[r],t[r]):e[r]=t[r])}),e}function isEmptyObject(e){if(isObject(e)){for(var t in e)if(_hasOwnProperty.call(e,t))return!1;return!0}return!1}function deepCopy(e){var t={};return function e(t,r){for(var s in r){var n=r[s];isArray(n)?(t[s]=[],e(t[s],n)):isObject(n)?(t[s]={},e(t[s],n)):t[s]=n}}(t,e),t}function formatString(e){return e.length>sa.para.max_string_length?(sa.log('\u5b57\u7b26\u4e32\u957f\u5ea6\u8d85\u8fc7\u9650\u5236\uff0c\u5df2\u7ecf\u505a\u622a\u53d6--'+e),e.slice(0,sa.para.max_string_length)):e}function searchObjString(e){isObject(e)&&each(e,function(t,r){isObject(t)?searchObjString(e[r]):isString(t)&&(e[r]=formatString(t))})}function encodeDates(e){return each(e,function(t,r){isDate(t)?e[r]=formatDate(t):isObject(t)&&(e[r]=encodeDates(t))}),e}function utf8Encode(e){var t,r,s,n,a='';for(t=r=0,s=(e=(e+'').replace(/\r\n/g,'\n').replace(/\r/g,'\n')).length,n=0;n<s;n++){var i=e.charCodeAt(n),o=null;i<128?r++:o=i>127&&i<2048?String.fromCharCode(i>>6|192,63&i|128):String.fromCharCode(i>>12|224,i>>6&63|128,63&i|128),null!==o&&(r>t&&(a+=e.substring(t,r)),a+=o,t=r=n+1)}return r>t&&(a+=e.substring(t,e.length)),a}function base64Encode(e){var t,r,s,n,a,i='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',o=0,c=0,u='',p=[];if(!e)return e;e=utf8Encode(e);do{t=(a=e.charCodeAt(o++)<<16|e.charCodeAt(o++)<<8|e.charCodeAt(o++))>>18&63,r=a>>12&63,s=a>>6&63,n=63&a,p[c++]=i.charAt(t)+i.charAt(r)+i.charAt(s)+i.charAt(n)}while(o<e.length);switch(u=p.join(''),e.length%3){case 1:u=u.slice(0,-2)+'==';break;case 2:u=u.slice(0,-1)+'='}return u}function _decodeURIComponent(e){var t='';try{t=decodeURIComponent(e)}catch(r){t=e}return t}var SOURCE_CHANNEL_STANDARD='utm_source utm_medium utm_campaign utm_content utm_term',LATEST_SOURCE_CHANNEL=['$latest_utm_source','$latest_utm_medium','$latest_utm_campaign','$latest_utm_content','$latest_utm_term','$latest_sa_utm'],LATEST_SHARE_INFO=['$latest_share_distinct_id','$latest_share_url_path','$latest_share_depth','$latest_share_method'],IDENTITY_KEY={EMAIL:'$identity_email',MOBILE:'$identity_mobile',LOGIN:'$identity_login_id'},RESERVE_CHANNEL=' utm_source utm_medium utm_campaign utm_content utm_term sa_utm ',REQUEST={},meta={lib_version:'',launched:!1,lib_name:'',query_share_depth:0,page_show_time:Date.now(),mp_show_time:null,promise_list:[],current_scene:'',is_first_launch:!1,_queue:[],inited:!1,hasExeInit:!1,scene_prefix:'',share_distinct_id:'',sa_referrer:'\u76f4\u63a5\u6253\u5f00',source_channel_standard:SOURCE_CHANNEL_STANDARD,latest_source_channel:LATEST_SOURCE_CHANNEL,latest_share_info:LATEST_SHARE_INFO};function getAppId(){var e=sa.system_api.getAppInfoSync();return e&&e.appId?e.appId:''}function getObjFromQuery(e){var t=e.split('?'),r=[],s={};return t&&t[1]?(each(t[1].split('&'),function(e){(r=e.split('='))[0]&&r[1]&&(s[r[0]]=r[1])}),s):{}}function getMixedQuery(e){var t=detectOptionQuery(e),r=t.scene,s=t.q,n=t.query;for(var a in n)n[a]=_decodeURIComponent(n[a]);return r&&extend(n,getObjFromQuery(r=-1!==(r=_decodeURIComponent(r)).indexOf('?')?'?'+r.replace(/\?/g,''):'?'+r)),s&&extend(n,getObjFromQuery(_decodeURIComponent(s))),n}function detectOptionQuery(e){if(!e||!isObject(e.query))return{};var t,r,s,n,a={};return a.query=extend({},e.query),isString(a.query.scene)&&(t=a.query,r=['utm_source','utm_content','utm_medium','utm_campaign','utm_term','sa_utm'].concat(sa.para.source_channel),s=new RegExp('('+r.join('|')+')%3D','i'),1===(n=Object.keys(t)).length&&'scene'===n[0]&&s.test(t.scene))&&(a.scene=a.query.scene,delete a.query.scene),e.query.q&&e.query.scancode_time&&'101'===String(e.scene).slice(0,3)&&(a.q=String(a.query.q),delete a.query.q,delete a.query.scancode_time),a}function setUtm(e,t){var r={},s=getMixedQuery(e),n=getCustomUtmFromQuery(s,'$','_','$'),a=getCustomUtmFromQuery(s,'$latest_','_latest_','$latest_');return r.pre1=n,r.pre2=a,extend(t,n),r}function setLatestChannel(e){isEmptyObject(e)||(function(e,t){var r=!1;for(var s in t)e[t[s]]&&(r=!0);return r}(e,LATEST_SOURCE_CHANNEL)&&sa.clearAppRegister(LATEST_SOURCE_CHANNEL),sa.registerApp(e))}function getCustomUtmFromQuery(e,t,r,s){if(!isObject(e))return{};var n={};if(e.sa_utm)for(var a in e)'sa_utm'!==a?include(sa.para.source_channel,a)&&(n[r+a]=e[a]):n[s+a]=e[a];else for(var i in e)-1===(' '+SOURCE_CHANNEL_STANDARD+' ').indexOf(' '+i+' ')?include(sa.para.source_channel,i)&&(n[r+i]=e[i]):n[t+i]=e[i];return n}function existLatestUtm(){var e=!1;return each(LATEST_SOURCE_CHANNEL,function(t){sa.properties[t]&&(e=!0)}),e}function setQuery(e,t){if(e&&isObject(e)&&!isEmptyObject(e)){var r=[];return each(e,function(e,s){'q'===s&&isString(e)&&0===e.indexOf('http')||(t?r.push(s+'='+e):r.push(s+'='+_decodeURIComponent(e)))}),r.join('&')}return''}function getCurrentPage(){var e={};try{var t=isFunction(sa.system_api.getCurrentPages)?sa.system_api.getCurrentPages():getCurrentPages();e=t[t.length-1]}catch(e){sa.log('getCurrentPage:'+e)}return e}function getCurrentPath(){var e='\u672a\u53d6\u5230';try{var t=getCurrentPage();e=t?t.route:e}catch(e){sa.log('getCurrentPath:'+e)}return e}function isPresetIdKeys(e,t){var r=['$identity_anonymous_id'];for(var s of(isArray(t)&&(r=r.concat(t)),r))if(s===e)return!0;return!1}var isSafeInteger=Number.isSafeInteger||function(e){return isInteger(e)&&Math.abs(e)<=Math.pow(2,53)-1},isInteger=Number.isInteger||function(e){return'number'==typeof e&&isFinite(e)&&Math.floor(e)===e},check={checkKeyword:function(e){return/^((?!^distinct_id$|^original_id$|^device_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$|^user_group|^user_tag)[a-zA-Z_$][a-zA-Z\d_$]{0,99})$/i.test(e)},checkIdLength:function(e){return!(String(e).length>255)||(sa.log('id \u957f\u5ea6\u8d85\u8fc7 255 \u4e2a\u5b57\u7b26\uff01'),!1)}};function getOpenidNameByAppid(e){if(''==e||!isString(e))return sa.log('error: \u53c2\u6570\u5fc5\u987b\u662f\u6709\u6548\u503c'),!1;var t=getAppId(),r="$identity_"+e+"_openid";return t&&(r="$identity_"+e+'_'+t+"_openid"),r}function validId(e){return!isString(e)&&!isNumber(e)||''===e?(sa.log('\u8f93\u5165 ID \u7c7b\u578b\u9519\u8bef'),!1):isNumber(e)&&(e=String(e),!/^\d+$/.test(e))?(sa.log('\u8f93\u5165 ID \u7c7b\u578b\u9519\u8bef'),!1):!!check.checkIdLength(e)&&e}function isNewLoginId(e,t){return e!==sa.store._state.history_login_id.name||sa.store._state.history_login_id.value!==t}function isSameAndAnonymousID(e){var t=sa.store.getFirstId(),r=sa.store.getDistinctId();return t?e===t:e===r}function setUpperCase(e){return isString(e)?e.toLocaleUpperCase():e}function getIsFirstDay(){return!!('object'==typeof sa.store._state&&isNumber(sa.store._state.first_visit_day_time)&&sa.store._state.first_visit_day_time>(new Date).getTime())}function getPresetProperties(){if(sa.properties&&sa.properties.$lib){var e={};each(sa.properties,function(t,r){0===r.indexOf('$')&&(e[r]=t)});var t={$url_path:getCurrentPath(),$is_first_day:getIsFirstDay(),$is_first_time:meta.is_first_launch},r=extend(e,t,sa.properties,sa.store.getProps());return delete r.$lib,r}return{}}function joinUrl(e,t){return!!e&&('\u672a\u53d6\u5230'===e?'\u672a\u53d6\u5230':t?e+'?'+t:e)}function getPath(e){return e=isString(e)?e.replace(/^\//,''):'\u53d6\u503c\u5f02\u5e38'}function getAppProps(e){var t={};return e&&e.path&&(t.$url_path=getPath(e.path),t.$url_query=setQuery(e.query),t.$url=joinUrl(t.$url_path,t.$url_query)),t}function getPageProps(){var e=getCurrentPage(),t=getCurrentPath(),r=e.sensors_mp_url_query||'';return{$url_path:t,$url:joinUrl(t,r),$url_query:r}}function rot13defs(e){return rot13obfs(e=String(e),113)}function rot13obfs(e,t){t='number'==typeof t?t:13;for(var r=(e=String(e)).split(''),s=0,n=r.length;s<n;s++){r[s].charCodeAt(0)<126&&(r[s]=String.fromCharCode((r[s].charCodeAt(0)+t)%126))}return r.join('')}var decodeURIComponent$1=_decodeURIComponent;function formatSystem(e){var t=e.toLowerCase();return'ios'===t?'iOS':'android'===t?'Android':e}var getRandomBasic=function(){var e=(new Date).getTime();return function(t){return Math.ceil((e=(9301*e+49297)%233280)/233280*t)}}();function getRandom(){if('function'==typeof Uint32Array){var e='';if('undefined'!=typeof crypto?e=crypto:'undefined'!=typeof msCrypto&&(e=msCrypto),isObject(e)&&e.getRandomValues){var t=new Uint32Array(1);return e.getRandomValues(t)[0]/Math.pow(2,32)}}return getRandomBasic(1e19)/1e19}function getUUID(){return Date.now()+'-'+Math.floor(1e7*getRandom())+'-'+getRandom().toString(16).replace('.','')+'-'+String(31242*getRandom()).replace('.','').slice(0,8)}const _={getUUID:getUUID,formatSystem:formatSystem,indexOf:indexOf,slice:slice,forEach:forEach,bind:bind,_hasOwnProperty:_hasOwnProperty,_toString:_toString,isUndefined:isUndefined,isString:isString,isDate:isDate,isBoolean:isBoolean,isNumber:isNumber,isJSONString:isJSONString,isObject:isObject,isPlainObject:isPlainObject,isArray:isArray,isFuction:isFuction,isArguments:isArguments,toString:toString,unique:unique,include:include,values:values,toArray:toArray,each:each,formatDate:formatDate,searchObjDate:searchObjDate,utf8Encode:utf8Encode,decodeURIComponent:decodeURIComponent$1,encodeDates:encodeDates,base64Encode:base64Encode,trim:trim,isFunction:isFunction,extend:extend,extend2Lev:extend2Lev,isEmptyObject:isEmptyObject,searchObjString:searchObjString,formatString:formatString,setLatestChannel:setLatestChannel,getObjFromQuery:getObjFromQuery,getMixedQuery:getMixedQuery,detectOptionQuery:detectOptionQuery,setUtm:setUtm,getCustomUtmFromQuery:getCustomUtmFromQuery,existLatestUtm:existLatestUtm,setQuery:setQuery,getCurrentPage:getCurrentPage,getCurrentPath:getCurrentPath,rot13defs:rot13defs,rot13obfs:rot13obfs,isSafeInteger:isSafeInteger,isInteger:isInteger,isPresetIdKeys:isPresetIdKeys,deepCopy:deepCopy,check:check,getOpenidNameByAppid:getOpenidNameByAppid,validId:validId,isNewLoginId:isNewLoginId,isSameAndAnonymousID:isSameAndAnonymousID,setUpperCase:setUpperCase,getIsFirstDay:getIsFirstDay,getPageProps:getPageProps,getAppProps:getAppProps,getPath:getPath,joinUrl:joinUrl,getPresetProperties:getPresetProperties};function stripProperties(e){return isObject(e)?(each(e,function(t,r){if(isArray(t)){var s=[];each(t,function(e){if(isString(e))s.push(e);else if(isUndefined(e))s.push('null');else try{s.push(JSON.stringify(e))}catch(e){sa.log('\u60a8\u7684\u6570\u636e - '+r+':'+t+' - \u7684\u6570\u7ec4\u91cc\u7684\u503c\u6709\u9519\u8bef,\u5df2\u7ecf\u5c06\u5176\u5220\u9664')}}),e[r]=s}if(isObject(t))try{e[r]=JSON.stringify(t)}catch(s){delete e[r],sa.log('\u60a8\u7684\u6570\u636e - '+r+':'+t+' - \u7684\u6570\u636e\u503c\u6709\u9519\u8bef,\u5df2\u7ecf\u5c06\u5176\u5220\u9664')}else isString(t)||isNumber(t)||isDate(t)||isBoolean(t)||isArray(t)||(sa.log('\u60a8\u7684\u6570\u636e - ',t,'-\u683c\u5f0f\u4e0d\u6ee1\u8db3\u8981\u6c42\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664'),delete e[r])}),e):e}function parseSuperProperties(e){isObject(e)&&each(e,function(t,r){if(isFunction(t))try{e[r]=t(),isFunction(e[r])&&(sa.log('\u60a8\u7684\u5c5e\u6027 - '+r+' \u683c\u5f0f\u4e0d\u6ee1\u8db3\u8981\u6c42\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664'),delete e[r])}catch(t){delete e[r],sa.log('\u60a8\u7684\u5c5e\u6027 - '+r+' \u629b\u51fa\u4e86\u5f02\u5e38\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664')}})}function batchRequest(e){if(isArray(e.data)&&e.data.length>0){var t=Date.now(),r=sa.para.datasend_timeout;e.data.forEach(function(e){e._flush_time=t}),e.data=JSON.stringify(e.data);let s={url:sa.para.server_url,method:'POST',dataType:'text',data:'data_list='+encodeURIComponent(base64Encode(e.data)),timeout:r,success:function(){e.success(e.len)},fail:function(){e.fail()}};REQUEST.header&&(s.header=REQUEST.header),sa.system_api.request(s)}else e.success(e.len)}function onceSend(e){e._flush_time=Date.now();var t='',r=JSON.stringify(e);t=-1!==sa.para.server_url.indexOf('?')?sa.para.server_url+'&data='+encodeURIComponent(base64Encode(r)):sa.para.server_url+'?data='+encodeURIComponent(base64Encode(r));var s=sa.para.datasend_timeout;sa.system_api.request({url:t,dataType:'text',method:'GET',timeout:s})}var kit={batchRequest:batchRequest,onceSend:onceSend};function batchSend(){if(sa.batch_state.sended){var e,t,r=sa.batch_state.mem;(t=(e=r.length>=100?r.slice(0,100):r).length)>0&&(sa.batch_state.sended=!1,kit.batchRequest({data:e,len:t,success:batchRemove,fail:sendFail}))}}function sendFail(){sa.batch_state.sended=!0,sa.batch_state.failTime++}function batchRemove(e){sa.batch_state.clear(e),sa.batch_state.sended=!0,sa.batch_state.changed=!0,batchWrite(),sa.batch_state.failTime=0}function batchWrite(){sa.batch_state.changed&&(sa.batch_state.is_first_batch_write&&(sa.batch_state.is_first_batch_write=!1,setTimeout(function(){batchSend()},1e3)),sa.batch_state.syncStorage&&(sa.system_api.setStorageSync('sensors_prepare_data',sa.batch_state.mem),sa.batch_state.changed=!1))}function batchInterval(){!function e(){setTimeout(function(){batchWrite(),e()},1e3)}(),function e(){setTimeout(function(){batchSend(),e()},sa.para.batch_send.send_timeout*Math.pow(2,sa.batch_state.failTime))}()}function reportEvent(e){var t='';e._flush_time=Date.now(),t=e.event?"sensors_"+e.event:"sensors_"+e.type,e.dataSource='sensors',sa.log('report_event, name: ',t,'-- key: ',e),__mp_private_api__.reportEvent(t,e)}function isValidListener(e){return'function'==typeof e||!(!e||'object'!=typeof e)&&isValidListener(e.listener)}sa.batch_state={mem:[],changed:!1,sended:!0,is_first_batch_write:!0,sync_storage:!1,failTime:0,getLength:function(){return this.mem.length},add:function(e){this.mem.push(e)},clear:function(e){this.mem.splice(0,e)}},sa.batchWrite=batchWrite,sa.prepareData=function(e){var t={distinct_id:sa.store.getDistinctId(),lib:{$lib:sa.lib.name,$lib_method:sa.lib.method,$lib_version:String(sa.lib.version)},properties:{}};if(isObject(sa.store._state.identities)&&(t.identities=extend({},sa.store.getIdentities())),'track_id_unbind'===e.type&&'$UnbindID'===e.event&&(t.identities=_.deepCopy(e.unbind_value),delete e.unbind_value),extend(t,sa.store.getUnionId(),e),isObject(e.properties)&&!isEmptyObject(e.properties)&&extend(t.properties,e.properties),'track_id_unbind'===e.type&&'$UnbindID'===e.event&&(t.login_id&&delete t.login_id,t.anonymous_id&&delete t.anonymous_id),e.type&&'profile'===e.type.slice(0,7)||(t._track_id=Number(String(getRandom()).slice(2,5)+String(getRandom()).slice(2,4)+String(Date.now()).slice(-4)),t.properties=extend({},sa.properties,sa.store.getProps(),sa.currentProps,t.properties),'track'===e.type&&(t.properties.$is_first_day=getIsFirstDay())),t.properties.$time&&isDate(t.properties.$time)?(t.time=1*t.properties.$time,delete t.properties.$time):t.time=1*new Date,sa.ee.data.emit('beforeBuildCheck',t),parseSuperProperties(t.properties),searchObjDate(t),stripProperties(t.properties),searchObjString(t),sa.ee.data.emit('finalAdjustData',t),!sa.para.server_url)return!1;sa.log(t),sa.send(t)},sa.send=function(e){if('sensorsdata2015_binance'===sa.storageName&&'native'===sa.para.data_report_type)return reportEvent(e),!1;sa.para.batch_send?(sa.batch_state.getLength()>=500&&(sa.log('\u6570\u636e\u91cf\u5b58\u50a8\u8fc7\u5927\uff0c\u6709\u5f02\u5e38'),sa.batch_state.mem.shift()),sa.batch_state.add(e),sa.batch_state.changed=!0,sa.batch_state.getLength()>=sa.para.batch_send.max_length&&batchSend()):kit.onceSend(e)},sa.log=function(){if(sa.para.show_log&&'object'==typeof console&&console.log)try{var e=Array.prototype.slice.call(arguments);return console.log.apply(console,e)}catch(e){console.log(arguments[0])}},sa.track=function(e,t,r){sa.prepareData({type:'track',event:e,properties:t},r)},sa.setProfile=function(e){sa.prepareData({type:'profile_set',properties:e})},sa.setOnceProfile=function(e,t){sa.prepareData({type:'profile_set_once',properties:e},t)},sa.login=function(e){var t=sa.store.getFirstId(),r=sa.store.getDistinctId();e!==r&&(t?sa.trackSignup(e,'$SignUp'):(sa.store.set('first_id',r),sa.trackSignup(e,'$SignUp')))},sa.logout=function(e){var t=sa.store.getFirstId();t?(sa.store.set('first_id',''),!0===e?sa.store.set('distinct_id',getUUID()):sa.store.set('distinct_id',t)):sa.log('\u6ca1\u6709first_id\uff0clogout\u5931\u8d25')},sa.identify=function(e){(e=_.validId(e))&&(sa.store.getFirstId()?sa.store.set('first_id',e):sa.store.set('distinct_id',e))},sa.trackSignup=function(e,t,r){var s,n,a,i,o;isObject(e)?(s=e.id,n=e.event_name,a=e.id_name):(s=e,n=t),sa.store.set('distinct_id',s),i=a&&a!==IDENTITY_KEY.LOGIN?a+'+'+s:s,o=sa.store.getFirstId()||sa.store.getDistinctId(),sa.prepareData({original_id:o,distinct_id:i,type:'track_signup',event:n,properties:r})},sa.registerApp=function(e){isObject(e)&&!isEmptyObject(e)&&(sa.currentProps=extend(sa.currentProps,e))},sa.clearAppRegister=function(e){isArray(e)&&each(sa.currentProps,function(t,r){include(e,r)&&delete sa.currentProps[r]})},sa.register=function(e){isObject(e)&&!isEmptyObject(e)&&sa.store.setProps(e)},sa.clearAllRegister=function(){sa.store.setProps({},!0)},sa.use=function(e){const t=toArray(arguments,1);return t.unshift(this),isObject(e)&&isFunction(e.init)&&e.init.apply(e,t),e},sa.usePlugin=sa.use,sa.getServerUrl=function(){return sa.para.server_url},sa.registerPropertyPlugin=function(e){isFunction(e.properties)?!e.isMatchedWithFilter||isFunction(e.isMatchedWithFilter)?sa.ee.data.on('finalAdjustData',function(t){try{isFunction(e.isMatchedWithFilter)?e.isMatchedWithFilter(t)&&e.properties(t):e.properties(t)}catch(e){sa.log('execute registerPropertyPlugin callback error:'+e)}}):sa.log('registerPropertyPlugin arguments error, isMatchedWithFilter must be function'):sa.log('registerPropertyPlugin arguments error, properties must be function')};class EventEmitterBase{constructor(){this._events={}}on(e,t){if(!e||!t)return!1;if(!isValidListener(t))throw new Error('listener must be a function');this._events[e]=this._events[e]||[];var r='object'==typeof t;return this._events[e].push(r?t:{listener:t,once:!1}),this}prepend(e,t){if(!e||!t)return!1;if(!isValidListener(t))throw new Error('listener must be a function');this._events[e]=this._events[e]||[];var r='object'==typeof t;return this._events[e].unshift(r?t:{listener:t,once:!1}),this}prependOnce(e,t){return this.prepend(e,{listener:t,once:!0})}once(e,t){return this.on(e,{listener:t,once:!0})}off(e,t){var r=this._events[e];if(!r)return!1;if('number'==typeof t)r.splice(t,1);else if('function'==typeof t)for(var s=0,n=r.length;s<n;s++)r[s]&&r[s].listener===t&&r.splice(s,1);return this}emit(e,t){var r=this._events[e];if(!r)return!1;for(var s=0;s<r.length;s++){var n=r[s];n&&(n.listener.call(this,t||{}),n.once&&this.off(e,s))}return this}removeAllListeners(e){e&&this._events[e]?this._events[e]=[]:this._events={}}listeners(e){return e&&'string'==typeof e?this._events[e]:this._events}}class EventEmitterEx extends EventEmitterBase{constructor(){super(),this.cacheEvents=[],this.maxLen=20}replay(e,t){this.on(e,t),this.cacheEvents.length>0&&this.cacheEvents.forEach(function(r){r.type===e&&t.call(null,r.data)})}emit(e,t){super.emit.apply(this,arguments),this.cacheEvents.push({type:e,data:t}),this.cacheEvents.length>this.maxLen&&this.cacheEvents.shift()}}var ee={};ee.sdk=new EventEmitterEx,ee.data=new EventEmitterEx;var eventEmitter=function(){this.sub=[]};eventEmitter.prototype={add:function(e){this.sub.push(e)},emit:function(e,t){this.sub.forEach(function(r){r.on(e,t)})}};var eventSub=function(e){sa.events.add(this),this._events=[],this.handle=e,this.ready=!1};eventSub.prototype={on:function(e,t){if(this.ready){if(isFunction(this.handle))try{this.handle(e,t)}catch(e){sa.log(e)}}else this._events.push({event:e,data:t})},isReady:function(){var e=this;e.ready=!0,e._events.forEach(function(t){if(isFunction(e.handle))try{e.handle(t.event,t.data)}catch(e){sa.log(e)}})}},sa.ee=ee,sa.meta=meta,sa.kit=kit,sa.modules={},sa.eventSub=eventSub,sa.events=new eventEmitter,sa.init=function(e){if(!0===meta.hasExeInit)return!1;e&&isObject(e)&&sa.setPara(e),meta.hasExeInit=!0,e&&isObject(e)&&sa.setPara(e),ee.sdk.emit('afterInitPara'),sa.store.init(),sa.system.init(),sa.para.batch_send&&(sa.system_api.getStorage('sensors_prepare_data',function(e){var t=[];e&&e.data&&isArray(e.data)&&(t=e.data,sa.batch_state.mem=t.concat(sa.batch_state.mem)),sa.batch_state.syncStorage=!0}),batchInterval())},sa.setPara=function(e){sa.para=extend2Lev(sa.para,e);var t=[];if(isArray(sa.para.source_channel))for(var r=sa.para.source_channel.length,s=0;s<r;s++)-1===RESERVE_CHANNEL.indexOf(' '+sa.para.source_channel[s]+' ')&&t.push(sa.para.source_channel[s]);sa.para.source_channel=t,'number'!=typeof sa.para.send_timeout&&(sa.para.send_timeout=1e3);var n={send_timeout:6e3,max_length:6};e&&e.datasend_timeout||sa.para.batch_send&&(sa.para.datasend_timeout=1e4),!0===sa.para.batch_send?sa.para.batch_send=extend({},n):isObject(sa.para.batch_send)&&(sa.para.batch_send=extend({},n,sa.para.batch_send)),sa.para.server_url?sa.para.preset_properties=isObject(sa.para.preset_properties)?sa.para.preset_properties:{}:sa.log('\u8bf7\u4f7f\u7528 setPara() \u65b9\u6cd5\u8bbe\u7f6e server_url \u6570\u636e\u63a5\u6536\u5730\u5740,\u8be6\u60c5\u53ef\u67e5\u770bhttps://www.sensorsdata.cn/manual/mp_sdk_new.html#112-%E5%BC%95%E5%85%A5%E5%B9%B6%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0')},sa.checkInit=function(){!0===sa.system.inited&&!0===sa.store.inited&&(sa.inited=!0,sa._queue.length>0&&(each(sa._queue,function(e){sa[e[0]].apply(sa,slice.call(e[1]))}),sa._queue=[]))},each(['setProfile','setOnceProfile','track','identify','bind','unbind','login','logout','registerApp','clearAppRegister'],function(e){var t=sa[e];sa[e]=function(){sa.inited?t.apply(sa,arguments):sa._queue.push([e,arguments])}});var store={inited:!0,storageInfo:null,_state:{},toState:function(e){isObject(e)&&e.distinct_id?this._state=e:this.set('distinct_id',getUUID())},getFirstId:function(){return this._state.first_id},getDistinctId:function(){return this._state.distinct_id},getUnionId:function(){var e={},t=this._state.first_id,r=this._state.distinct_id;return t&&r?(e.login_id=r,e.anonymous_id=t):e.anonymous_id=r,e},getProps:function(){return this._state.props||{}},setProps:function(e,t){var r=this._state.props||{};t?this.set('props',e):(extend(r,e),this.set('props',r))},set:function(e,t){var r={};for(var s in'string'==typeof e?r[e]=t:'object'==typeof e&&(r=e),this._state=this._state||{},r)this._state[s]=r[s];this.save()},save:function(){sa.system_api.setStorageSync(sa.storageName,this._state)},init:function(){var e=sa.system_api.getStorageSync(sa.storageName);if(e)this.toState(e);else{meta.is_first_launch=!0;var t=new Date,r=t.getTime();t.setHours(23),t.setMinutes(59),t.setSeconds(60),this.set({distinct_id:getUUID(),first_visit_time:r,first_visit_day_time:t.getTime()}),sa.setOnceProfile({$first_visit_time:new Date})}}};function getNetwork(){return new Promise(function(e){sa.system_api.getNetworkType({success(e){sa.properties.$network_type=setUpperCase(e.networkType)},fail(e){sa.log('\u83b7\u53d6\u7f51\u7edc\u72b6\u6001\u4fe1\u606f\u5931\u8d25\uff1a ',e)},complete(){e()}})})}function getSystemInfo(){return new Promise(e=>{sa.system_api.getSystemInfo({success(e){var t=sa.properties;if(isObject(e)){t.$manufacturer=e.brand,t.$model=e.model,t.$brand=setUpperCase(e.brand)||'',t.$screen_width=Number(e.screenWidth),t.$screen_height=Number(e.screenHeight),t.$os=formatSystem(e.platform),t.$os_version=e.system.indexOf(' ')>-1?e.system.split(' ')[1]:e.system,t.$mp_client_app_version=e.version||'';var r=e.SDKVersion||'';r&&(t.$mp_client_basic_library_version=r)}},fail(e){sa.log('\u83b7\u53d6\u7cfb\u7edf\u4fe1\u606f\u5931\u8d25: ',e)},complete(){e()}})})}sa.store=store;var system={inited:!1,init:function(){var e=(new Date).getTimezoneOffset();isNumber(e)&&(sa.properties.$timezone_offset=e);var t=getAppId()||sa.para.app_id||sa.para.appid;t&&(sa.properties.$app_id=t);var r=getNetwork(),s=getSystemInfo();Promise.all([r,s]).then(function(){sa.system.inited=!0,sa.checkInit()})}};function request(e){var t;e.timeout&&(t=e.timeout,delete e.timeout);var r=sa.platform_obj.request(e);setTimeout(function(){try{isObject(r)&&isFunction(r.abort)&&r.abort()}catch(e){sa.log(e)}},t)}function getStorage(e,t){try{sa.platform_obj.getStorage({key:e,success:r,fail:r})}catch(t){try{sa.platform_obj.getStorage({key:e,success:r,fail:r})}catch(e){sa.log('\u83b7\u53d6 storage \u5931\u8d25\uff01',e)}}function r(e){if(e&&e.data&&isJSONString(e.data))try{var r=JSON.parse(e.data);e.data=r}catch(e){sa.log('parse res.data \u5931\u8d25\uff01',e)}t(e)}}function setStorage(e,t){var r;try{r=JSON.stringify(t)}catch(e){sa.log('\u5e8f\u5217\u5316\u7f13\u5b58\u5bf9\u8c61\u5931\u8d25\uff01',e)}try{sa.platform_obj.setStorage({key:e,data:r})}catch(t){try{sa.platform_obj.setStorage({key:e,data:r})}catch(e){sa.log('\u8bbe\u7f6e storage \u5931\u8d25: ',e)}}}function getStorageSync(e){var t='';try{t=sa.platform_obj.getStorageSync(e)}catch(r){try{t=sa.platform_obj.getStorageSync(e)}catch(e){sa.log('\u83b7\u53d6 storage \u5931\u8d25\uff01')}}return isJSONString(t)&&(t=JSON.parse(t)),t}function setStorageSync(e,t){var r;try{r=JSON.stringify(t)}catch(e){sa.log('\u5e8f\u5217\u5316\u7f13\u5b58\u5bf9\u8c61\u5931\u8d25\uff01',e)}var s=function(){sa.platform_obj.setStorageSync(e,r)};try{s()}catch(e){sa.log('set Storage fail --',e);try{s()}catch(e){sa.log('set Storage fail again --',e)}}}function getNetworkType(){return sa.platform_obj.getNetworkType.apply(null,arguments)}function getSystemInfo$1(){return sa.platform_obj.getSystemInfo.apply(null,arguments)}function getAppId$1(){var e;if(sa.platform_obj.getAccountInfoSync&&(e=sa.platform_obj.getAccountInfoSync()),isObject(e)&&isObject(e.miniProgram))return e.miniProgram}var compose={request:request,getStorage:getStorage,setStorage:setStorage,getStorageSync:getStorageSync,setStorageSync:setStorageSync,getAppInfoSync:getAppId$1,getNetworkType:getNetworkType,getSystemInfo:getSystemInfo$1};sa._=_,sa.lib.name='KuaishouMini',sa.properties.$lib='KuaishouMini',sa.system=system,sa.system_api=compose,sa.storageName='sensorsdata2015_ks',sa.platform_obj=ks,REQUEST.header={'Content-Type':'application/x-www-form-urlencoded'};export default sa;