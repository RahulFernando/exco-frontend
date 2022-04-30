import axios from '../helpers/httpHelper';

const httpRequests = {
    login: (data) => axios.post('/users', data)
}

export default httpRequests;