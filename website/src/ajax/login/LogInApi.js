import ajax from 'src/ajax'
export default{
    handleLogIn(body) {
        return ajax.post('/api/website/user', body)
    }
}