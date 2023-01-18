import axios from "axios"

const axiosInstance = axios.create({baseURL: 'http://localhost:5000'})


//This function will help us with the verify middleware(authorization) in the server-side
axiosInstance.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})


const url = "/posts";

export const fetchPosts = () => axiosInstance.get(url);
export const createPosts = (newPost) => axiosInstance.post(url, newPost)
export const updatePost = (id, updatedPost) => axiosInstance.patch(`${url}/${id}`, updatedPost)
export const deletePost = (id) => axiosInstance.delete(`${url}/${id}`)
export const likePost = (id) => axiosInstance.patch(`${url}/${id}/like`)


export const signIn = (formData) => axiosInstance.post('/users/signin', formData)
export const signUp = (formData) => axiosInstance.post('users/signup', formData)