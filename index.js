const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/user');
const bcrypt = require('bcrypt');

app.set('view engine', 'ejs');
app.set('views', 'views');

mongoose.connect('mongodb://localhost:27017/authDemo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   })
   .then(() => console.log('mongoDB connected...'))
   .catch(err => {
       console.log('Mongoose connection error');
       console.log(err)
   })

app.use(express.urlencoded({ extended : true }));

app.get('/', (req, res) => {
    res.send('THIS IS THE HOMEPAGE!')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const { password, username } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password: hash
    })
    await user.save();
    res.redirect('/')
})

app.get('/secret', (req, res) => {
    res.send('This is a secret place! Without auth you shall not pass!')
})

app.listen(3000, () => {
    console.log("App running in port 3000")
})