import axios from 'axios'
import Cookie from '@/helpers/cookie/Cookie'

const token = (): string => <string>Cookie.get('token')

const api = axios.create({
    baseURL: 'https://back-missions.admlr.lipetsk.ru/',
    headers: {
        'Content-type': 'application/json',
        'Authorization': `Token ${token()}`
    },
    responseType: 'json'
})

export default api
