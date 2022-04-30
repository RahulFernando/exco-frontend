import axios from '../helpers/httpHelper';

const httpRequests = {
    getReferences: () => axios.get('/references')
}

export default httpRequests;