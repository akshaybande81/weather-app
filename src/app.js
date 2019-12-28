const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("../utils/forecast.js");
const geocode = require("../utils/geocode.js");

const app = express(); // initialize application

const port = process.env.PORT || 3000; // heroku will provide the port with env variable

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const publicDirectoryPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");

// set library

app.set("view engine", "hbs");

app.set('views', path.join(__dirname, "../templates/views"));

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Akshay"
    });
})

app.get('/about', (req, res) => {

    res.render('about', {
        title: "About page",
        name: "Akshay"
    });
})

app.get('/help', (req, res) => {

    res.render('help', {
        title: "help page",
        name: "Akshay"
    });
})

app.get('/weather', (req, res) => {

    let params = req.query;

    if (params.hasOwnProperty('address')) {

        geocode.getCoordinates(params.address, (error, result) => {

            if (error) {
                console.log(error);
                return res.send({
                    error: error
                })
            }
            else {
                forecast.getForecast(result, (error, data) => {
                    if (error) {
                        console.log(error);
                        return res.send({
                            error: error
                        })
                    }
                    else {
                        console.log(data, "data");
                        return res.send({
                            title: "Weather",
                            text: data,
                            name: "Akshay Bande"
                        });
                    }
                });

            }
        })



    }
    else {
        return res.send({
            error: "You must provide the address"
        })
    }


})

app.get('/products', (req, res) => {

    console.log(req.query);

    res.send({
        products: []
    })
})


app.get("/help/*", (req, res) => {

    res.render('help-not-found');
})


app.get("*", (req, res) => {

    res.render('not-found');
})


app.listen(port, () => {
    console.log(`Web server is listening on port ${port}`);
})

