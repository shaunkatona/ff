/**
 * Created by shaunkatona on 7/25/14.
 */
var stylus = require('stylus');
var express = require('express');
var nib = require('nib');
var app = express();

app.set('view engine', 'jade');
app.use(stylus.middleware(
    {
        src: __dirname + '/stylus/',
        dest: __dirname + '/public/',
        linenos: true,
        compile: function (str, path) {
            return stylus(str)
                .set('filename', path)
                .use(nib());
        }
    }
));
app.use(express.static(__dirname + '/public/'));

app.get('/', function (req, res) {
    res.render("index.jade");
});

app.listen(process.argv[2] || 8080);