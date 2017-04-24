require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const crypto = require('crypto');
const mime = require('mime');
var {mongoose} = require('./db/mongoose');
var {Recipe} = require('./models/recipe');
// var {User} = require('./models/user');
var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});
var upload = multer({ storage: storage });



var app = express();
// var upload = multer({ dest: './uploads/' })
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/recipe', upload.single('file'), (req, res) => {
  console.log(req.file)
  console.log(req.body)
  var recipe = new Recipe(
    req.body
  )
  recipe.imageURL = req.file.path
  recipe.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/images/:id', function (req, res) {
  console.log(req.params)
  console.log(__dirname, '/uploads', req.params.id)
    res.sendFile(__dirname + '/uploads/' + req.params.id);
});

app.get('/recipes', (req, res) => {
  Recipe.find().then((recipes) => {
    res.send({recipes});
  }, (e) => {
    res.status(400).send(e);
  });
});


// I hope this works.
app.get('/recipes/random', (req, res) => {
  Recipe.count().exec(function (err, count) {
    var random = Math.floor(Math.random() * count)
    Recipe.findOne().skip(random).then((recipe) => {
      res.send({recipe});
    }, (e) => {
      res.status(400).send(e);
    });
  })
})

app.get('/recipes/:id', (req, res)=>{
  if(!ObjectID.isValid(req.params.id))
    return res.status(404).send();
  Recipe.findById(req.params.id).then((recipe) => {
    if(!recipe) return res.status(404).send();
      res.send({recipe})
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/recipes/:id', (req, res) => {
  if(!ObjectID.isValid(req.params.id))
    return res.status(404).send();
  Recipe.findOneAndRemove({_id : new mongoose.mongo.ObjectID(req.params.id)}).then((recipe) => {
    if(!recipe) return res.status(404).send();
      res.send({recipe})
  }).catch((e) => {
    res.status(400).send();
  });
});
//
app.patch('/recipes/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['title', 'instructions', 'ingredients']);

  if(!ObjectID.isValid(id)) return res.status(404).send();

  Recipe.findByIdAndUpdate(id, {$set: body}, {new: true}).then((recipe) => {
    if(!recipe) return res.status(404).send();
    res.send({recipe});
  }).catch((e) => {
    res.status(400).send();
  });
});




app.listen(port, () => {

  console.log(`started up on port ${port}`);
});

module.exports = {app}
