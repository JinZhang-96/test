var request = require('request'),
    through = require('through2'),
    gutil = require('gulp-util');
    PluginError = gutil.PluginError;
    md5 = require('md5/md5');
// 常量
const PLUGIN_NAME = 'gulp-i18n';

var url="http://api.fanyi.baidu.com/api/trans/vip/translate",
    appid = '2015063000000001',
    key = '12345678',
    salt = (new Date).getTime(),
    from = 'zh',
    to = 'en';

/**
 * 转换json的语言
 * @param from 翻译源语言
 * @param to  译文语言
 * @returns {*}
 */
function i18n(from,to){
  // 创建一个 stream 通道，以让每个文件通过
  var stream = through.obj(function(file, enc, cb) {
    // console.log(JSON.stringify(file))
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }
    if (file.isBuffer()) {
      var json= JSON.parse(file.contents.toString());
      var tJson='';
      //  获取json文件要翻译的数据
      tJson=getText(json,tJson);

      // if(tJson.length >2000)
         // this.emit('error', new PluginError(PLUGIN_NAME, '源文件 大于 2000字'));

      // 翻译文件
      post({
         "from":from,"query": tJson,"to":to, "callback":  (error, response, body) => {
           if(!error && response.statusCode === 200 ){
             var result=JSON.parse(body).trans_result;
             var content=file.contents.toString().replace(/(:\s*")(\S+)(")/gi, function (match, p1, p2, p3, offset, string) {
               for (var k in result) {
                 if (result[k]['src'] === p2) {
                   return p1 + result[k]['dst'] + p3;
                 }
               }
               return match
             })

             file.contents=new Buffer(content);
             // 确保文件进入下一个 gulp 插件
             this.push(file);
             // 告诉 stream 引擎，我们已经处理完了这个文件
             cb();
           }
    }
    });
    }
  });
  // 返回文件 stream
  return stream;
}

/**
 * 获取要翻译的数据
 * @param src
 * @param dst
 * @returns {*}
 */
function getText(src,dst){
  for(var k in src){
    if(src[k] instanceof Object){
      dst = getText(src[k],dst);
    }
    else {
      dst += src[k] + "\n";
    }
  }
  return dst;
}
// 请求百度翻译要翻译的文本
function post(options) {
  var str1 = options.appid ? options.appid : appid + options.query + salt + key;
  var sign = md5(str1);
  request({
      url: options.url ? options.url : url,
      method: "POST",
      form: {
        q: options.query,
        appid: options.appid ? optioss.appid : appid,
        salt: salt,
        from: options.from ? options.from : from,
        to: options.to ? options.to : to,
        sign: sign
      }
    },
    options.callback
  )
}
module.exports= i18n;
