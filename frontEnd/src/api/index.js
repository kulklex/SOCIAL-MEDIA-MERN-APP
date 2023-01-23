import axios from "axios"

const axiosInstance = axios.create({baseURL: 'http://localhost:5000'})


//This function will help us with the verify middleware(authorization) in the server-side
axiosInstance.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

;

export const fetchPosts = () => axiosInstance.get("/posts");
export const createPosts = (newPost) => axiosInstance.post("/posts", newPost)
export const updatePost = (id, updatedPost) => axiosInstance.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => axiosInstance.delete(`/posts/${id}`)
export const likePost = (id) => axiosInstance.patch(`/posts/${id}/like`)
export const fetchPostsBySearch = (searchQuery) => axiosInstance.get(`/posts/search?searchQuery=${searchQuery.searchItem || 'none'}&tags=${searchQuery.tags}`)


export const signIn = (formData) => axiosInstance.post('/users/signin', formData)
export const signUp = (formData) => axiosInstance.post('/users/signup', formData)