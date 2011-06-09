var fs = require('fs');

module.exports = {
  config: {
    meta_path: 'posts/meta/',
    post_path: 'posts/post/'
  },

  isFile: function(file) {
    var status;
    try { 
      status =  fs.statSync(this.config.meta_path+file+'.js').isFile();
    } catch(e) {
      status = false;
    }

    return status;
  },

  getPostContent: function(file) {
    var content;
    try {
      content = fs.readFileSync(this.config.post_path+file+'.jade');
    } catch(e) {
      content =  false;
    }

    return content;
  }
}