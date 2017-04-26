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


// following code is from https://github.com/expressjs/multer/issues/170
// other examples on this page
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
///////////////////////////////////////////


var app = express();
// var upload = multer({ dest: './uploads/' })
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/recipe', upload.single('file'), (req, res) => {
  var recipe = new Recipe(
    req.body
  )
  recipe.cookingTime = (recipe.cookingTime * 60) * 1000;
  if(req.file) recipe.imageURL = `images/${req.file.filename}`
  recipe.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/images/:id', function (req, res) {
  console.log(req.body)
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

// app.get('/', (req, res)  => {
//   // console.log(__dirname)
//   // res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

app.use(express.static(__dirname + './../client/build/'));
app.listen(port, () => {

  console.log(`started up on port ${port}`);
});

module.exports = {app}
