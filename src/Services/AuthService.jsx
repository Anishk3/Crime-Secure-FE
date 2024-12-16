import axios from "axios"

const BASE_URL = "http://localhost:8080/api/auth"

class AuthService{

    loginUser(user){
        return axios.post("http://localhost:8080/api/auth/login",user)
    }

    RegisterUser(user){
        return axios({
            method: 'post',
            url: BASE_URL + "/register",
            data: user,

        })
    }
}

export default new AuthService();