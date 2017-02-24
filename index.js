'use strict';

var objectAssign = require('object-assign');
var through = require('through2');
var html2jade = require('html2jade');
var ext = require('gulp-util').replaceExtension;
var PluginError = require('gulp-util').PluginError;

module.exports = function gulpPug(options) {
  var opts = objectAssign({}, options);

  return through.obj(function (file, enc, cb) {

    if (file.isStream()) {
      return cb(new PluginError('gulp-htmltopug', 'Streaming not supported'));
    }

    if (file.isBuffer()) {
        var contents = String(file.contents);
        html2jade.convertHtml(contents, {}, function (err, pug) {
          if(err){
            return cb(new PluginError('gulp-htmltopug', e));
          }
          file.contents = new Buffer(pug);
          cb(null, file);
      });
    }
  });
};
