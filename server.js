// placeholder
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const {readBurger, createBurger , deleteBurger , clearList } = require('./models/burger.js');

app.engine("handlebars",exphbs({ defaultLayout : "main" }));
app.set('view engine','handlebars');
app.use(express.static('public'));
app.use(express.json({limit:"1mb"}));

const refresh = async () => {
  const list = await readBurger().catch(err=>console.log(err));
  return list;
}

app.get('/', async (req,res)=>{
  const list = await refresh();
  res.render('index',{
    burger: list[0],
    ate: list[1]
  })
})

app.post('/api/burger/',async (req,res)=>{
  const {data} = req.body;
  await createBurger(data);
  res.send();
})

app.delete('/api/burger/',async (req,res)=>{
  const {id , burg} = req.body;
  await deleteBurger(id,burg)
  res.send();
})

app.delete('/api/clearlist',async (req,res)=>{
  await clearList()
  res.send()
})

const PORT = process.env.PORT || 8080;
app.listen( PORT , ()=>{
  console.log(`on port ${PORT}`)
});



