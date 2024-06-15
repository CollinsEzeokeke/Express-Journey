import express from 'express';
const router = express.Router();


let posts = [
    {id: 1, title: 'Post One'},
    {id: 2, title: 'Post Two'},
    {id: 3, title: 'Post Three'}
]

//Get all posts
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit)
    if(!isNaN(limit) && limit > 0){
       res.status(200).json(posts.slice(0, limit))
    }else{
        res.json(posts).status(200)
    }
})

//Get single post 
    router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (post) {
        res.json(post).status(200)
    }else{
        return res
        .status(404)
        .json({message: `A post with such id is not found`});
    }
})

//Create a new post
router.post('/', (req, res) => {
    const newPost = {
        id : posts.length + 1,
        title: req.body.title
    }

    if(!newPost.title){
        return res
        .status(400)
        .json({message: 'Title is required'});
    }
    posts.push(newPost);
    res.status(201).json(posts);
});

//Update a post
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        return res
        .status(404)
        .json({message: `A post with such id is not found`});
    }

    post.title = req.body.title;
    res.status(200).json(post);
});

//Delete a post
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        return res
        .status(404)
        .json({message: `A post with such id is not found`});
    }

    posts.splice(posts.indexOf(post), 1);
    res.status(200).json(post);
});


export default router;