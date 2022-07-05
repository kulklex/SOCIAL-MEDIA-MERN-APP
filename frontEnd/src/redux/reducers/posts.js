export default function reducer (posts = [], action) {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload
         case 'CREATE':
             return [...posts, action.payload];               
        default:
            return posts
    }
}