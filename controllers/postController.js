
let posts = [
    {id: 1, title: 'Post One'},
    {id: 2, title: 'Post Two'},
    {id: 3, title: 'Post Three'},
]

// @desc Get all posts
// @route GET /app/posts
export const getPosts = (req, res) => {
    const limit = parseInt(req.query.limit)
    const sort = req.query.sort

    let result = [...posts]

    if (sort === 'asc') {
        result.sort((a, b) => a.id - b.id)
    } else if (sort === 'desc') {
        result.sort((a, b) => b.id - a.id)
    }

    if (!isNaN(limit) && limit > 0) {
        result = result.slice(0, limit)
    }

    res.status(200).json(result)
}


// @desc Get single post
// @route GET /app/posts/:id
export const getSinglePost = (req, res, next) => {
    const id = parseInt(req.params.id)
    // const post = posts.filter((p) => p.id === id)
    const post = posts.find((post) => post.id === id)
    if (!post) {
        // return res.status(404).json({message: 'Post not found'})
        const error = new Error(`A post with the id of ${id} was not found`)
        error.status = 404
        return next(error)
    }
    res.status(200).json(post)
}

// @desc Create new post
// @route POST /app/posts/:id
export const createPost = (req, res, next) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    }

    if (!newPost.title) {
        const error = new Error(`Please include a title`)
        error.status = 400
        return next(error)
    }
    posts.push(newPost)
    res.status(201).json(posts)
}


// @desc Update post
// @route UPDATE /app/posts/:id
export const updatePost = (req, res, next) => {
    const id = parseInt(req.params.id)
    const post = posts.find((post) => post.id === id)
    if (!post) {
        const error = new Error(`A post with the id of ${id} was not found`)
        error.status = 404
        return next(error)
    }
    post.title = req.body.title
    res.status(200).json(posts)
}


// @desc Delete post
// @route DELETE /app/posts/:id
export const deletePost = (req, res) => {
    const id = parseInt(req.params.id)
    const post = posts.find((post) => post.id === id)
    if (!post) {
        const error = new Error(`A post with the id of ${id} was not found`)
        error.status = 404
        return next(error)
    }
    posts = posts.filter((post) => post.id !== id)
    res.status(200).json(posts)
}