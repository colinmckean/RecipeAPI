const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Recipe} = require('./../models/recipe');


const recipes = [{
  _id: new ObjectID(),
  title: "Homemade Jam",
  instructions: "Make the Jam",
  imageURL: "http://www.goggle.com",
  cookingTime: 60000
},{
  _id: new ObjectID(),
  title: "Homemade Pizza",
  instructions: "Make the Pizza",
  imageURL: "http://www.goggle.com",
  cookingTime: 60000
}]

beforeEach((done) => {
  Recipe.remove({}).then(() => {
    Recipe.insertMany(recipes);
  }).then(() => done());
});
describe('POST /recipe', () => {
  it('should create a new recipe', (done) => {

    var recipe = {
      title: "title",
      cookingTime: 0,
      instructions: "instructions to make sausage"
    };
    request(app)
      .post('/recipe')
      .send(recipe)
      .expect(200)
      .expect((res) => {
        expect(recipe.title).toBe(res.body.title);
      })
      .end((err, res) => {
        if(err) {
          return done(err);

        }
        Recipe.find(recipe).then((recipes) => {
          expect(recipes.length).toBe(1);
          expect(recipes[0].title).toBe(recipe.title);
          done()
        }).catch((e) => done(e));
      });
    });
    it('should not create recipe with invalid body', (done) =>{
        request(app)
          .post('/recipe')
          .send({})
          .expect(400)
          .end((err, res) => {
            if(err) {
              return done(err);
            }
            Recipe.find().then((recipes) => {
              expect(recipes.length).toBe(2);
              done()
          }).catch((e) => done(e));
        });
      });
  });

  describe('GET /recipes', () => {
    it('should get all recipes', (done) => {
      request(app)
      .get('/recipes')
      .expect(200)
      .expect((res) => {
        expect(res.body.recipes.length).toBe(2);
      })
      .end(done);
    });
  });

  describe('GET /recipes/:id', () => {
    it('should return recipe doc', (done) => {
      request(app)
      .get(`/recipes/${recipes[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.recipe.title).toBe(recipes[0].title);
      })
      .end(done);
    });

    it('should return 404 if recipe not found', (done) => {
      request(app)
      .get(`/recipes/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
    });

    it('should return 404 for invalid-object ids', (done) => {
      request(app)
      .get('/recipes/123abc')
      .expect(404)
      .end(done)
    });
  });

  describe('DELETE /recipes/:id', () => {
    it('should delete a recipe', (done) => {
      var hexId = recipes[1]._id.toHexString();
      request(app)
        .delete(`/recipes/${hexId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.recipe._id).toBe(hexId);
        })
        .end((err, res) => {
          if (err) return done(err);

        Recipe.findById(hexId).then((recipe) => {
          expect(recipe).toNotExist();
          done();
        }).catch((e) => done(e))
      })
    });
    it('should return 404 if recipe not found', (done) => {
      var hexId = new ObjectID().toHexString();
      request(app)
      .delete(`/recipes/${hexId}`)
      .expect(404)
      .end(done)
    });
    it('should return 404 if ObjectID is invalid', (done) => {
      request(app)
        .delete('/recipes/123abc')
        .expect(404)
        .end(done)
    });
  });
  describe('PATCH /recipes/:id', () => {
    it('should update the recipe', (done) => {
      var hexId = recipes[1]._id.toHexString();
        var title = "new text for recipe"
        request(app)
        .patch(`/recipes/${hexId}`)
        .send({title})
        .expect(200)
        .expect((res) => {
          expect(res.body.recipe.title).toBe(title);
        })
        .end(done)
      });
  });
