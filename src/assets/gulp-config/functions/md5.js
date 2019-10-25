var crypto = require('crypto'),
    md5 = crypto.createHash('md5');

  var md5s=function(str){ //暴露出md5s方法
    md5.update(str,'UTF-8');
    str = md5.digest('hex');
    return str;
  }


  module.exports={
    md5:md5s
  }
