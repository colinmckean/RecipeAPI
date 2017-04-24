var env = process.env.NODE_ENV || 'development';
console.log('***** ENV ', env)
if(env === 'development'){
  process.env.port = 3000;
}else if (env === 'test'){
  process.env.port = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/RecipeAPITest'
}
