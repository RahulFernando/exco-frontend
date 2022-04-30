import axios from '../helpers/httpHelper';

const httpRequests = {
    getLendings: () => axios.get('/lendings')
}

export default httpRequests;