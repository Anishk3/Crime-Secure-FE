import axios from "axios";

const BASE_URL = "http://localhost:8080/api/citizens"

class CitizenService{

    getAllIncidents(id,token) {
       
        return axios({
            method: 'get',
            url: (`${BASE_URL}/${id}/getallincidents`) ,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        })
    }
    
    getEmail(email,token) {
       
        return axios({
            method: 'get',
            url: (`http://localhost:8080/sendMail/${email}`) ,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        })
    }


    getIncidentById(CitizenId,Incidentid,token) {
       
        return axios({
            method: 'get',
            url: (`${BASE_URL}/${CitizenId}/getIncident/${Incidentid}`) ,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        })
    }


    AddIncident(CitizenId,token,incident) {
       
        return axios({
            method: 'post',
            url: (`${BASE_URL}/${CitizenId}/add-incident`) ,    
            responseType: 'json',
            data: incident,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }   
 
        })


    }





}   


export default new CitizenService();