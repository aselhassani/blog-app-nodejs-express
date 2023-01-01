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

const savePost = async (article) => {
  await connect()
  if (article._id == null || article._id == '') {
    const articleEntity = new Article({ title:article.title, author:article.author, summary:article.summary, content:article.content})
    console.log("creating new post", articleEntity)
    await articleEntity.save()
  } else {
    await Article.findOneAndUpdate({_id:article._id}, article, {
      new: true
    });
  }
}

const findAllPosts = async () => {
  await connect()
  connect().catch(err => console.log(err))
  return await Article.find()
}

const findPostById = async (id) => {
  await connect()
  connect().catch(err => console.log(err))
  return await Article.findById(id)
}

async function disconnect() {
  await mongoose.disconnect()
}

module.exports = {savePost, findAllPosts, findPostById, disconnect};