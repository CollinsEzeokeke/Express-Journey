const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000

const app = express();

//setup static folder
// app.use(express.static(path.join(__dirname, 'public')))

let posts = [
    {id: 1, title: 'Post One'},
    {id: 2, title: 'Post Two'},
    {id: 3, title: 'Post Three'}
]

let tester = [
    {id: 1, title: 'let this stuff work'}
]
//Get all posts
app.get('/api/posts', (req, res) => {
    const limit = parseInt(req.query.limit)

    if(!isNaN(limit) && limit > 0) {
        res.json(posts.slice(0, limit));
    }else{
        res.jsom(tester)
    }
})

//Get single post 
    app.get('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id)
    res.json(posts.filter((post) => post.id === id));
    
})
app.listen(port, () => console.log(`server is running on port ${port}`));