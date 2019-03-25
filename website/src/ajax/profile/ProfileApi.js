import ajax from 'src/ajax'
export default {
    fetchProfile() {
        return ajax.get('/api/website/profile')
    },
    changeSkills(body) {
        return ajax.post('/api/website/profileSettings/setSkill',body)
    },
    changeInterest(body) {
        return ajax.post('/api/website/profileSettings/setInterest',body)
    },
    changeEdu(body) {
        return ajax.post('/api/website/profileSettings/setEdu', body)
    }
}