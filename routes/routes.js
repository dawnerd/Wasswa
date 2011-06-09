var ph = require('utils/postHelper'),
    jade = require('jade');
    //md = require('markdown');

module.exports = function(app) {

  app.get('/', function(req, res){
    res.render('index', { 
      title: ''
    });
  });

  app.get('/article/:article', function(req, res, next) {
    if(ph.isFile(req.params.article)) {
      var article = require(ph.config.meta_path+req.params.article+'.js');
      if(!article.is_public) next();

      article.content = jade.render(ph.getPostContent(req.params.article));

      if(article.content===false) next();

      //article.content = md.parse(article.content);

      res.render('article/view', article);
    } else {
      next();
    }
  });

  // 404 :D
  app.get('*', function(req, res) {
    res.send('Not found', 404);
  })
}