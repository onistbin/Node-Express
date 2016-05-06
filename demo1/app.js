/**
 * Created by wangjianbing on 16/5/5.
 */

var express = require('express');

var app = express();

app.get('/', function(req, res) {

    res.send(
        `<div style="background: red;">
            Hello Express!
        </div>`
    );
});
app.listen(3000);