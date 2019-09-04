var express = require('express');
var router = express.Router();
var kube = require('../lib/kube_cmd');
var hashify = require('../lib/hashify');
var ansi2html = require('ansi2html');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/pods/:namespace', function(req, res, next) {
  kube.get_pods(req.params.namespace || 'weave').then(
    function(success) {
      var vals = hashify(success.output);
      res.render('pods', { pods: vals.values, keys: vals.keys, namespace: req.params.namespace });
    },
    function(error) {
      console.log(error);
      res.render('pods', { output: error});
    }
  )

});

router.get('/logs/:namespace/:pod_id', function(req, res, next) {
  kube.get_logs(req.params.namespace, req.params.pod_id).then(
    function(success) {
      console.log(success.output);
      res.render('logs', { output: ansi2html(success.output)});
    },
    function(error) {
      console.log(error);
      res.render('logs', { output: ansi2html(error)});
    }
  )
});

router.get('/terminal', function(req, res, next) {
  res.render('terminal')
});



module.exports = router;
