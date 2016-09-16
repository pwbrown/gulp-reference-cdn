var path = require('path')
, gutil = require('gulp-util')
, through = require('through2')
, fs = require('fs')
, glob = require('glob');

module.exports = function (bucket, quotes) {
    return through.obj(function (file, enc, cb) {
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-debug', 'Streaming not supported'));
            return cb();
        }
        if(!file.contents){
            return cb();
        }
        var filename = path.basename(file.path);

        if(Object.prototype.toString.call(quotes) == "[object Array]"){
            quotes.forEach(function(i_ifile){
                i_ifile && glob(i_ifile,function(err, i_files){
                    if(err) return console.log(err);
                    i_files.forEach(function(i_ilist){
                        var result = fs.readFileSync(i_ilist,'utf8').replace(new RegExp('(\'|\")([^\'\"]*)(' + filename + ')' ,"g"), function(original, quote, left, right){
                            return quote + bucket + "/" + right;
                        });
                        fs.writeFileSync(i_ilist, result, 'utf8');
                    })
                })
            })
        }else{
            quotes && glob(quotes,function(err, files){
                if(err) return console.log(err);
                files.forEach(function(i_ilist){
                    var result = fs.readFileSync(i_ilist,'utf8').replace(new RegExp('(\'|\")([^\'\"]*)(' + filename + ')' ,"g"), function(original, quote, left, right){
                        return quote + bucket + '/' + right;
                    });
                    fs.writeFileSync(i_ilist, result, 'utf8');
                })
            })
        }
        cb();
    }, function (cb) {
        cb();
    });
};