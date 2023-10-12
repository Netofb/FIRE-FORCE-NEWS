let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let postSchema = new Schema({
    Titulo:String,
    categoria:String,
    conteudo:String,
    slug:String,
    imagem:String,
},{collection:'posts'});


let Posts = mongoose.model("Posts",postSchema);


module.exports = Posts;
