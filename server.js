var express = require("express"); 
var session = require('express-session');
var path = require("path"); 
var app = express(); 
var bodyParser = require('body-parser'); 
let count = 10;

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(bodyParser.urlencoded({ extended: true })); // use it!

app.use(express.static(path.join(__dirname, "./static"))); // static content

app.set('views', path.join(__dirname, './views')); // setting up ejs and our views folder
app.set('view engine', 'ejs'); // root route to render the index.ejs view

app.get('/', function(req, res) { // post route for adding a user
    req.session.count = count;
    res.render("index", {count: req.session.count});
})

app.get('/reset', function(req, res) { // post route for adding a user
    count = 10;
    res.redirect("/");
})
app.post('/claim', function(req, res) {
    count--;
    let rand = Math.floor(Math.random() * 9000000) + 1000000;
    let results = {};
    if(count > 0) {
        results.discount = '50% Discount!',
        results.coupon = rand
    } else {
        results.discount = 'Sorry!',
        results.coupon = 'Unavailable'
    }
    res.render('claim', {results: results});
})

// tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
