import ajax from 'src/ajax'

export default {
    fetchPost() {
        return ajax.get('/api/website/post')
    },
    createPost(body) {
        return ajax.post('/api/website/post',body)
    }
}