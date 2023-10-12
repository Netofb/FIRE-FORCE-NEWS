const express = require('express');
const mongoose = require('mongoose')
var bodyParser = require('body-parser')

const path = require('path');


const app = express();

const Posts = require('./Posts')


mongoose.connect('mongodb+srv://root:ok8072NS8UTWMUt5@cluster0.mqepv9b.mongodb.net/dankicode?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}).then(function(){
    console.log('Conectado com sucesso');

}).catch(function(err){
    console.log(err.message)
})



app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));


app.get('/',(req,res)=>{
    
    if(req.query.busca == null){
        Posts.find({}).sort({'_id': -1}).exec(function(err,posts){
            //console.log(posts[0]);
            posts = posts.map(function(val){
                return{
                    Titulo: val.Titulo,
                    conteudo: val.conteudo,
                    descricaoCurta: val.conteudo.substr(0,100),
                    imagem: val.imagem,
                    slug: val.slug,
                    categoria: val.categoria,


                }


            })

            res.render('home',{posts:posts});

        });

    }else{
        res.render('busca',{});
    }

  
});


app.get('/:slug',(req,res)=>{
    //res.send(req.params.slug);
    res.render('single',{});
})






















app.listen(5000,()=>{
    console.log('server rodando!');
})