const mongoose = require('mongoose');

connect().catch(err => console.log(err));

const articleSchema = new mongoose.Schema({
  title: String,
  author:String,
  createdAt:Date,
  updatedAt:Date,
  summary:String,
  content:String
});

const Article = mongoose.model('Article', articleSchema);

async function connect() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test')
}

const saveArticle = (article) => {
  connect()
  const articleEntity = new Article({ ...article})
  console.log("Saving article in mongodb", articleEntity)
  articleEntity.save()
  mongoose.disconnect()
}

const findAllArticles = () => {
  connect()
  return Article.find()
}

const disconnect = () => {
  mongoose.disconnect()
}

module.exports = {saveArticle, findAllArticles, disconnect};