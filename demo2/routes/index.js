var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Express',
      myName: 'wangjianbing',
      QQ: 1009978683,
      email: "1009978683@qq.com"
  });
});

module.exports = router;
