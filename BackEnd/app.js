// requiring all the modules needed
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const isImageUrl = require('is-image-url');


// main app - at port 8081
app.use(express.json());
const home_page_path = path.join(__dirname, "..", "FrontEnd", "index.html");

// Setting CORS
app.use(cors());

// connect backend to mongodb database
mongoose.connect('mongodb+srv://Arijit_2000:<password>@cluster0.b3x8u.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// establish a connection to database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("mongodb Connected.....");
});

// defining a schema
let post_schema = new mongoose.Schema({
    intId: Number,
    id: String,
    name: String,
    caption: String,
    url: String,
    date: Date,
    take: Boolean
});

// Create a model
let post_model = new mongoose.model('meme_posts', post_schema);

// Initiate collection
post_model.countDocuments({}, (error, count) => {
    if (error) console.log(error);

    if (count == 0) {
        const demo_obj = new post_model({ "take": false });
        demo_obj.save((err, obj) => {
            if (err) console.log(err);
        });
    }
});


// get End Point - /memes
// returns array of current 100 memes
app.get("/memes", (req, res) => {
    // get 100 memes sorted by id in descending order
    post_model.find({ "take": true }, (err, obj) => {
        if (err) {
            console.log(err);
            res.send(err);
        }

        // store the response in an array
        var res_obj = [];
        for (post of obj) {
            res_obj.push({ "id": post.id, "name": post.name, "url": post.url, "caption": post.caption });
            //console.log(res_obj);
        }

        // reverse the array so that objects in the array are sorted in ascending order by id
        res_obj.reverse();
        res.status(200).json(res_obj);
    }).sort({ intId: -1 }).limit(100);
});

// posting memes
app.post("/memes", (req, res) => {
    // check for invalid url
    if (!isImageUrl(req.body.url)) {
        res.status(404).send("<h1>Invalid url. Please provide a proper valid image url.</h1>");
    } else {
        // Create an object
        post_model.countDocuments({ "take": true }, (error, count) => {
            if (error) console.log(error);
            req.body.id = (count + 1).toString();
            req.body.intId = count + 1;
            req.body.take = true;
            const posted_obj = new post_model(req.body);
            posted_obj.save((err, obj) => {
                if (err) console.log(err);
            });

            res.status(200).json({ "id": req.body.id });
        });
    }
});

// Get memes by id number
app.get('/memes/:id', (req, res) => {
    const req_id = parseInt(req.params.id).toString();
    // check if id is available or not
    post_model.countDocuments({ "take": true }, (error, count) => {
        if (error) res.send(error);

        let req_id_int = parseInt(req_id);
        if (count < req_id_int || req_id_int < 1) {
            res.status(404).send("Not Found!! Send valid Id");
        }
    });

    post_model.find({ id: req_id }, (err, docs_arr) => {
        if (err) res.send(error);

        if (docs_arr.length == 0) return {};

        let docs = docs_arr[0];
        let response = { "id": docs.id, "name": docs.name, "url": docs.url, "caption": docs.caption };
        res.status(200).json(response);
    });
});

// patch requset to update a meme
app.patch('/memes/:id', (req, res) => {
    var updated_object = {};
    var id = req.params.id;

    // check if id is available or not
    post_model.countDocuments({ "take": true }, (error, count) => {
        if (error) res.send(error);

        let req_id_int = parseInt(id);
        if (count < req_id_int || req_id_int < 1) {
            res.status(404).send("Not Found!! Send valid Id");
        } else {
            if (req.body.caption !== "") updated_object["caption"] = req.body.caption;
            if (req.body.url !== "") updated_object["url"] = req.body.url;
            // console.log(updated_object);
            post_model.updateOne({ "id": id }, updated_object, (error, response) => {
                if (error) res.send(error);
                // console.log(response);
                res.status(200).send("success");
            });
        }
    });
});

// Invalid routes
app.all('*', (req, res) => {
    res.status(404).send("<h1 style='align-text: center;'>Bad Request !!! Invalid url</h1>")
});

app.listen(8081, () => {
    console.log("Server is running");
});


// Swagger app - at port 8080
const swagger_app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
swagger_app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

swagger_app.listen(8080, () => {
    console.log("swagger server started");
});