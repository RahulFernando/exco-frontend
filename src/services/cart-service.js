import axios from '../helpers/httpHelper';

const httpRequests = {
    postCart: (data) => axios.post('/carts', data),
    getCart: (id) => axios.get(`/carts/${id}`)
}

export default httpRequests;