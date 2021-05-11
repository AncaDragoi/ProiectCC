const express = require('express')
const bodyParser = require('body-parser'); 
const Sequelize = require('sequelize');
const unirest = require('unirest');
const sequelize = new Sequelize('wwhotspot_db', 'root', 'admin', {
    dialect: 'mysql',
    timestamps: false
})
const mashupKey = "DY5yWcAGynmshlt4w1ZqZCWFdGSOp1PD86jjsndtAB3uBwT1K6";
//const geoip = require('geoip-lite');
//var geoip2 = require('geoip2');
//geoip2.init();
var where = require('node-where');
const ipAdress = require('ip');
const publicIp = require('public-ip');
//DECLARE TABLES
const User = sequelize.define('user', {
    fname: Sequelize.STRING,
    lname: Sequelize.STRING,
    age: Sequelize.INTEGER,
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }},
    password: Sequelize.STRING,
    phone: Sequelize.STRING

})
const History = sequelize.define('history', {
    searchedText: Sequelize.STRING
})

User.hasMany(History);


const Country = sequelize.define('country', {
    name: Sequelize.STRING,
    country_code:Sequelize.STRING
})


const Continent = sequelize.define('continent', {
    name: Sequelize.STRING,
    continent_code:Sequelize.STRING
})
Continent.hasMany(Country);
const Place = sequelize.define('place', {
    name: Sequelize.STRING,
})
Country.hasMany(Place);


const Story = sequelize.define('story', {
    text: {
        type: Sequelize.TEXT, validate: {
            len: [5, 100000]
        }
    },
    likes: Sequelize.INTEGER,
    dislikes: Sequelize.INTEGER,
    deleted: Sequelize.BOOLEAN,
    placeName:Sequelize.TEXT
})

Place.hasMany(Story);
User.hasMany(Story);


const app = express()
app.use(bodyParser.json());
app.use(express.static('../frontend/build'))

app.get('/create', (req, res) => {
    sequelize.sync({ force: true })
        .then(() => res.status(201).send('created tables'))
        .catch((err) => {
            console.warn(err)
            res.status(500).send('some error...')
        })
})
//USERS
app.get('/users', (req, res) => {
    User.findAll()
        .then((users) => res.status(200).json(users))
        .catch((error) => {
            console.warn(error)
            res.status(500).send('some error...')
        })
})

app.post('/user', (req, res) => {
    let user = req.body;
    User.create(user).then(() => res.status(201).send('created'))
        .catch((err) => {
            console.warn(err)
            res.status(500).send('some error')
        })
})
app.get('/user/:id', (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).send('not found')
            }
        })
        .catch((err) => {
            console.warn(err)
        })
})

app.put('/user/:id', (req, res) => {

    User.findById(req.params.id)
        .then((user) => {
            if (user) {
                return user.update(req.body)
            } else {
                res.status(404).send('not found')
            }
        }).then(() => res.status(200).send('updated' + res.json()))
        .catch((err) => {
            console.warn(err)
        })
})

app.delete('/user/:id', (req, res) => {


    User.findById(req.params.id)
        .then((user) => {
            if (user) {
                return user.destroy()
            } else {
                res.status(404).send('not found')
            }
        }).then(() => res.status(200).send('updated' + res.json()))
        .catch((err) => {
            console.warn(err)
        })
})

app.post("/login", (req,res) => {
    let requestBody = req.body;

    User.findAll({ where: {email: requestBody.email, password: requestBody.password} })
        .then((user) => {
            let response = {};
            if(user.length !== 0) {
                res.status(200).json(user[0].dataValues);
            }
            else {
                response.message = "Authentication failed";
                response.user_id = -1;
                res.status(200).json(response);
            }
        })
        .catch((err) => res.status(500).send("Errors"));
});

//HISTORY
app.get('/allHistory', (req, res) => {
    History.findAll()
        .then((allHistory) => res.status(200).json(allHistory))
        .catch((err) => {
            console.warn(err)
            res.status(500).send('some error...')
        })
})

app.get('/historyOfUser', (req, res) => {
    History.findAll()
        .then((allHistory) =>
        {
            var userHistory = null;
            if (allHistory) {
                userHistory = new Array();
                for (let h of allHistory) {
                    console.log(h);
                    if (h.dataValues.userId == req.query.userId) {
                        console.log(req.query.userId);
                        console.log(h.userId);
                        userHistory.push(h);
                    }
                }
            } else{
                console.log('null history');
            }
            res.status(200).json(userHistory);
        
        })
        .catch((err) => {
            console.warn(err)
            res.status(500).send('some error...')
        })
})

app.post('/history', (req, res) => {
    let history = req.body;
    History.create(history).then(() => res.status(201).send('created'))
        .catch((err) => {
            console.warn(err)
            res.status(500).send('some error')
        })
})
app.get('/history/:id', (req, res) => {
    History.findById(req.params.id)
        .then((history) => {
            if (history) {
                res.status(200).json(history);
            } else {
                res.status(404).send('not found')
            }
        })
        .catch((err) => {
            console.warn(err)
        })
})

app.put('/history/:id', (req, res) => {
    History.findById(req.params.id)
        .then((history) => {
            if (history) {
                return history.update(req.body)
            } else {
                res.status(404).send('not found')
            }
        }).then(() => res.status(200).send('updated' + res.json()))
        .catch((err) => {
            console.warn(err)
        })
})

app.delete('/history/:id', (req, res) => {
    History.findById(req.params.id)
        .then((history) => {
            if (history) {
                return history.destroy()
            } else {
                res.status(404).send('not found')
            }
        }).then(() => res.status(200).send('updated' + res.json()))
        .catch((err) => {
            console.warn(err)
        })
})

//CONTINENT
app.get('/continents', (req, res) => {
    Continent.findAll()
        .then((continents) => res.status(200).json(continents))
        .catch((err) => {
            console.warn(err)
            res.status(500).send('some error...')
        })
})

app.post('/continent', (req, res) => {
    let continent = req.body;
    Continent.create(continent).then(() => res.status(201).send('created'))
        .catch((err) => {
            console.warn(err)
            res.status(500).send('some error')
        })
})
app.get('/continent/:id', (req, res) => {
    Continent.findById(req.params.id)
        .then((continent) => {
            if (continent) {
                res.status(200).json(continent);
            } else {
                res.status(404).send('not found')
            }
        })
        .catch((err) => {
            console.warn(err)
        })
})

app.put('/continent/:id', (req, res) => {
    Continent.findById(req.params.id)
        .then((continent) => {
            if (continent) {
                return continent.update(req.body)
            } else {
                res.status(404).send('not found')
            }
        }).then(() => res.status(200).send('updated' + res.json()))
        .catch((err) => {
            console.warn(err)
        })
})

app.delete('/continent/:id', (req, res) => {
    Continent.findById(req.params.id)
        .then((continent) => {
            if (continent) {
                return continent.destroy()
            } else {
                res.status(404).send('not found')
            }
        }).then(() => res.status(200).send('updated' + res.json()))
        .catch((err) => {
            console.warn(err)
        })
})

//COUNTRY
app.get('/countries', (req, res) => {
    Country.findAll()
        .then((countries) => res.status(200).json(countries))
        .catch((err) => {
            console.warn(err)
            res.status(500).send('some error...')
        })
})

app.post('/country', (req, res) => {
    let country = req.body;
    Country.create(country).then(() => res.status(201).send('created'))
        .catch((err) => {
            console.warn(err)
            res.status(500).send('some error')
        })
})
app.get('/country/:id', (req, res) => {
    Country.findById(req.params.id)
        .then((country) => {
            if (country) {
                res.status(200).json(country);
            } else {
                res.status(404).send('not found')
            }
        })
        .catch((err) => {
            console.warn(err)
        })
})

app.put('/country/:id', (req, res) => {
    Country.findById(req.params.id)
        .then((country) => {
            if (country) {
                return country.update(req.body)
            } else {
                res.status(404).send('not found')
            }
        }).then(() => res.status(200).send('updated' + res.json()))
        .catch((err) => {
            console.warn(err)
        })
})

app.delete('/country/:id', (req, res) => {
    Country.findById(req.params.id)
        .then((country) => {
            if (country) {
                return country.destroy()
            } else {
                res.status(404).send('not found')
            }
        }).then(() => res.status(200).send('updated' + res.json()))
        .catch((err) => {
            console.warn(err)
        })
})

//PLACE

app.get('/places', (req, res) => {
    Place.findAll()
        .then((places) => res.status(200).json(places))
        .catch((err) => {
            console.warn(err)
            res.status(500).send('some error...')
        })
})

app.post('/place', (req, res) => {
    let place = req.body;
    Place.create(place).then(() => res.status(201).send('created').json(res.id))
        .catch((err) => {
            console.warn(err)
            res.status(500).send('some error')
        })
})
app.get('/place/:id', (req, res) => {
    Place.findById(req.params.id)
        .then((place) => {
            if (place) {
                res.status(200).json(place);
            } else {
                res.status(404).send('not found')
            }
        })
        .catch((err) => {
            console.warn(err)
        })
})

app.put('/place/:id', (req, res) => {
    Place.findById(req.params.id)
        .then((place) => {
            if (place) {
                return place.update(req.body)
            } else {
                res.status(404).send('not found')
            }
        }).then(() => res.status(200).send('updated' + res.json()))
        .catch((err) => {
            console.warn(err)
        })
})

app.delete('/place/:id', (req, res) => {
    Place.findById(req.params.id)
        .then((place) => {
            if (place) {
                return place.destroy()
            } else {
                res.status(404).send('not found')
            }
        }).then(() => res.status(200).send('updated' + res.json()))
        .catch((err) => {
            console.warn(err)
        })
})

//STORY
app.get('/stories', (req, res) => {
    Story.findAll()
        .then((stories) => res.status(200).json(stories))
        .catch((err) => {
            console.warn(err)
            res.status(500).send('some error...')
        })
})

app.post('/story', (req, res) => {
    let story = req.body;
    Story.create(story).then(() => res.status(201).send('created'))
        .catch((err) => {
            console.warn(err)
            res.status(500).send('some error')
        })
})
app.get('/story/:id', (req, res) => {
    Story.findById(req.params.id)
        .then((story) => {
            if (story) {
                res.status(200).json(story);
            } else {
                res.status(404).send('not found')
            }
        })
        .catch((err) => {
            console.warn(err)
        })
})

app.put('/story/:id', (req, res) => {
    Story.findById(req.params.id)
        .then((story) => {
            if (story) {
                return story.update(req.body)
            } else {
                res.status(404).send('not found')
            }
        }).then(() => res.status(200).send('updated' + res.json()))
        .catch((err) => {
            console.warn(err)
        })
})

app.delete('/story/:id', (req, res) => {
    Story.findById(req.params.id)
        .then((story) => {
            if (story) {
                return story.destroy()
            } else {
                res.status(404).send('not found')
            }
        }).then(() => res.status(200).send('updated' + res.json()))
        .catch((err) => {
            console.warn(err)
        })
})

app.get('/storyOfUser', (req, res) => {
    Story.findAll()
        .then((allstory) => {
            var userstory = null;
            if (allstory) {
                userstory = new Array();
                for (let h of allstory) {
                    if (h.dataValues.idUser == req.query.userId) {
                        userstory.push(h);
                    }
                }
            } else {
                console.log('null story');
            }
            res.status(200).json(userstory);

        })
        .catch((err) => {
            console.warn(err)
            res.status(500).send('some error...')
        })
})

//WEBCAM TRAVEL
app.get('/webcamByBbox', (req, res) => {
    var neLat = req.query.neLat;
    var neLng = req.query.neLng;
    var swLat = req.query.swLat;
    var swLng = req.query.swLng;

    unirest.get("https://webcamstravel.p.mashape.com/webcams/list/bbox=" + neLat+"," + neLng + "," + swLat+","+swLng)
        .header("X-Mashape-Key", mashupKey)
        .end(function (result) {
            if (result) {
                console.log(result.status, result.headers, result.body);
                res.status(200).json(result);
            } else {
                res.status(500).send('server error');
            }
            
        });
})

app.get('/webcamByContinent', (req, res) => {
    var continent = req.query.continent;
    unirest.get("https://webcamstravel.p.mashape.com/webcams/list/continent="+continent+"?lang=en&show=webcams%3Aimage%2Clocation")
        .header("X-Mashape-Key", mashupKey)
        .end(function (result) {
            if (result) {
                console.log(result.status, result.headers, result.body);
                res.status(200).json(result);
            } else {
                res.status(500).send('server error');
            }
        });
})

app.get('/webcamsOrderdBy', (req, res) => {
    orderby = req.params.orderby;
    sort = req.param.sort;
    unirest.get("https://webcamstravel.p.mashape.com/webcams/list/orderby="+orderby+","+sort+"?lang=en&show=webcams%3Aimage%2Clocation")
        .header("X-Mashape-Key", mashupKey)
        .end(function (result) {
             if (result) {
                console.log(result.status, result.headers, result.body);
                res.status(200).json(result);
            } else {
                res.status(500).send('server error');
            }
        });

})
app.get('/webcamByCountry', (req, res) => {
    var country = req.param.country;
    unirest.get("https://webcamstravel.p.mashape.com/webcams/list/country="+country+"?lang=en&show=webcams%3Aimage%2Clocation")
        .header("X-Mashape-Key", mashupKey)
        .end(function (result) {
            if (result) {
                console.log(result.status, result.headers, result.body);
                res.status(200).json(result);
            } else {
                res.status(500).send('server error');
            }
        });
})

app.get('/webcamList', (req, res) => {
    limit = req.query.limit;
    unirest.get("https://webcamstravel.p.mashape.com/webcams/list/limit="+limit+",0?lang=en&show=webcams%3Aimage%2Clocation")
        .header("X-Mashape-Key", mashupKey)
        .end(function (result) {
            if (result) {
                console.log(result.status, result.headers, result.body);
                res.status(200).json(result);
            } else {
                res.status(500).send('server error');
            }
        });
})

app.get('/webcamByCategory', (req, res) => {
    var category = req.query.category;
    unirest.get("https://webcamstravel.p.mashape.com/webcams/list/category="+category+"?lang=en&show=webcams%3Aimage%2Clocation")
        .header("X-Mashape-Key", "DY5yWcAGynmshlt4w1ZqZCWFdGSOp1PD86jjsndtAB3uBwT1K6")
        .end(function (result) {
            if (result) {
                console.log(result.status, result.headers, result.body);
                res.status(200).json(result);
            } else {
                res.status(500).send('error');
            }
        });
})

////getLocation
//app.get('/location', (req, res) => {
//    geoip.lookup(req.ip).then((location) => {
//        if (location) {
//            return res.status(200).json(location)
//        } else {
//            res.status(404).send('location not found')
//        }
//    }).then(() => res.status(200).send('updated' + res.json()))
//        .catch((err) => {
//            console.warn(err)
//        })

//})

////getLocation
//app.get('/getLocation', (req, res) => {
//    geoip2.lookupSimple(req.ip, function (error, result) {
//        if (error) {
//            console.log("Error: %s", error);
//            res.status(500).send('server error');
//        }
//        else if (result) {
//            res.status(200).json(result);
//        }
//    });
//}
//)

app.get('/getLocation', (req, res) => {
    publicIp.v4().then(ip => {
        console.log(ip);
        where.is(ip, function (err, result) {
            if (err) {
                res.status(500).send('server error');
                console.log("Error: %s", err);
            } else if (result) {
                res.status(200).json(result);
            }
        });
      
    });
}
)


app.listen(1234);