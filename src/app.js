const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

const app = express();

const port = process.env.PORT;


const homePagePath = path.join(__dirname,'../public');

app.set('view engine','hbs');
app.set('views',path.join(__dirname,'/Templates/views'));
hbs.registerPartials(path.join(__dirname,'/Templates/partials'));

app.use(express.static(homePagePath));

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        devloper: 'Arjun'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Us',
        devloper: 'Arjun'
    })
}) 

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Need Help?',
        devloper: 'Arjun'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Plz provide search term'
        })
    }
    geocode(req.query.search,(error,{latitude,longitude} = {}) => {
        if(error) {
          return res.send({
                     error
            })
        }
        forcast(latitude,longitude,(error,temperature,rain,region,country) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                temperature,
                country,
                region,
                rain
            })
        })
    }) 
})

app.get('*',(req,res) => {
    res.render('error',{
        title: 'Error page'
    })
})

app.listen(port,() => {
    console.log('It is Running')
}); 