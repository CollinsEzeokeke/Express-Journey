let posts = [
    {id: 1, title: 'Post One'},
    {id: 2, title: 'Post Two'},
    {id: 3, title: 'Post Three'}
];

//@desc  GET all posts
//@route GET /api/posts
export const getPosts =  (req, res) => {
    const limit = parseInt(req.query.limit)
    if(!isNaN(limit) && limit > 0){
       res.status(200).json(posts.slice(0, limit))
    }else{
        res.json(posts).status(200)
    }
}

// @desc  GET single post
// @route GET .api/posts/:id

export const getPost =  (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        const error = new Error(`Post with such an id of ${id} does not found`);
        error.status = 404;
        return next(error);
    }else{
        return res
        .status(200)
        .json(post);
    }

    //theres a problem with the post it doesn't return what is contained in the error variable
}

//@desc  Create a new post
//@route POST /api/posts
export const createPost =  (req, res , next) => {
    const newPost = {
        id : posts.length + 1,
        title: req.body.title
    }

    if(!newPost.title){
        const error = new Error('You didn\'t add a title to your post');
        error.status = 400;
        return next(error);
    }
    posts.push(newPost);
    res.status(201).json(posts);
}

//@desc  Update a post
//@route PUT /api/posts/:id

export const updatePost =  (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        const error = new Error(`A post with such id of ${id} does not found`);
        error.status = 404;
        return next(error);
    }

    post.title = req.body.title;
    res.status(200).json(post);
}

//@desc  Delete a post
//@route DELETE /api/posts/:id

export const deletePost =  (req, res, next) => {

    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);

    if (!post) {
        const error = new Error(`such a post with that id of ${id} does not exist`);
        error.status = 404;
        return next(error);
    }

    posts.splice(posts.indexOf(post), 1);
    res.status(200).json(post);
}
