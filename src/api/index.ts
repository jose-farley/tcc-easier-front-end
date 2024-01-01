import axios from 'axios'


const api = axios.create({
    baseURL:"https://tcc-easier-backend.onrender.com/"
})
export {api}