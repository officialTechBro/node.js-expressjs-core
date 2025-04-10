import express from 'express'
const router = express.Router()
import { 
    getPosts, 
    getSinglePost, 
    createPost, 
    updatePost, 
    deletePost 
} from '../controllers/postController.js'

// const logger = (req, res, next) => {
//     console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`)
//     next()
// }

//Get all posts
router.get('/', getPosts)

//Get a single post
router.get('/:id', getSinglePost)

//Create new post
router.post('/', createPost)

//update post
router.put('/:id', updatePost)

//delete post
router.delete('/:id', deletePost)

export default router