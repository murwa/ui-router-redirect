/**
 * Created by mxgel on 2/7/17.
 */

/**
 * http://jasonwatmore.com/post/2016/07/26/angularjs-enable-html5-mode-page-refresh-without-404-errors-in-nodejs-and-iis
 * @type {any|Object}
 */

var express = require('express');
var path = require('path');
var app = express();

// serve angular front end files from root path
app.use('/', express.static('app', {redirect: false}));

// rewrite virtual urls to angular app to enable refreshing of internal pages
app.get('*', function (req, res, next) {
    res.sendFile(path.resolve('app/index.html'));
});

app.listen(3000, function () {
    console.log('Listening on port 3000!')
})