const btn = document.getElementById('get-posts-btn')
const output = document.querySelector('#output')
const form = document.querySelector('#add-post-form')


const showPosts = async () => {
    try {
        const res = await fetch('http://localhost:8000/api/posts')
        if (!res.ok) {
            throw new Error('Failed to fetch posts')
        }
        
        const posts =  await res.json()
        output.innerHTML = ''

        posts.forEach(post => {
            const postEl = document.createElement('div')
            postEl.textContent = post.title;
            output.appendChild(postEl)
        })
    } catch (error) {
        console.log('Error fetching posts', error)
    }
}

const addPost = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const title = formData.get('title')

    try {
        const res = await fetch('http://localhost:8000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title})
        })

        if (!res.ok) throw new Error('Failed to add post')

        const newPost = await res.json()

        const div = document.createElement('div')
        div.textContent = newPost.title
        output.appendChild(div)
        
        showPosts()
    } catch (error) {
        console.log(error)
    }
}

btn.addEventListener('click', showPosts)
form.addEventListener('submit', addPost)