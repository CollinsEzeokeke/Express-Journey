import express from 'express';
import {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
} from '../controller/postController.js';
const router = express.Router();

//Get all posts
router.get('/', getPosts);

//Get single post 
    router.get('/:id',getPost)

//Create a new post
router.post('/',createPost);

//Update a post
router.put('/:id',updatePost);

//Delete a post
router.delete('/:id',deletePost);


export default router;