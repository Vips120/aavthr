
let user = require('../routes/users');
let registration = require('../routes/user.register.routes');
let genre = require('../routes/genre.routes');
let movie = require('../routes/movie.routes');
let auth = require('../auth/auth');
module.exports = function(app) {
    app.use('/api/user', user);
    app.use('/api/customer', registration);
    app.use('/api/genre', genre);
    app.use('/api/movie',movie);
    app.use('/api/auth', auth);
}