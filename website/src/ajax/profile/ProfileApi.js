import ajax from 'src/ajax'
export default {
    fetchProfile() {
        return ajax.get('/api/website/profile')
    }
}