import ajax from 'src/ajax'

export default {
    fetchPost() {
        return ajax.get('/api/website/post')
    }
}