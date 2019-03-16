import ajax from 'src/ajax'

export default {
    fetchComments() {
        return ajax.get('/api/website/comment')
    },
    setComment(body) {
        return ajax.post('/api/website/comment',body)
    }
}