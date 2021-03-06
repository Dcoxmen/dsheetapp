const path = require('path')
const http = require('http')
const expressHbs = require('express-handlebars')

const express = require('express')

const app = express();

app.engine('handlebars', expressHbs)
app.set('view engine', 'hbs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const dsheetRoutes = require('./routes/mydsheet')

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(dsheetRoutes)

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
  });


const server = http.createServer(app);

server.listen(3000);