import axios from "axios";

const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        // baseURL: `https://bw-expat-journal-ls.herokuapp.com/api`,
        baseURL: `http://localhost:4000/api`,
        headers: {
            Authorization: token,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          
        }
    })
}

export default axiosWithAuth;
