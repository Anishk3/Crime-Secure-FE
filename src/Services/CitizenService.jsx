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

    getUnseenIncidents(citizenId, token) {
        return axios({
            method: 'get',
            url: `${BASE_URL}/${citizenId}/unseen-incidents`,
            responseType: 'json',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    markIncidentsAsSeen(citizenId, token) {
        return axios({
            method: 'post',
            url: `${BASE_URL}/mark-incident-seen/9`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
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

    getIncidentByStatus(CitizenId, status, token){
        return axios({
            method: 'get',
            url: `${BASE_URL}/${CitizenId}/incidentsbystatus/${status}`,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });





}

    getCitizen(CitizenId,token) {
       
        return axios({
            method: 'get',
            url: (`${BASE_URL}/getCitizen/${CitizenId}`) ,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        })
    }
    
    getProfileImage(token, id) {
        return axios({
            method: 'get',
            url: `${BASE_URL}/${id}/profile-image`,
            responseType: 'blob', // Correct responseType for binary data
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    updateCitizen(token, formData) {
        return axios({
            method: 'put',
            url: `${BASE_URL}/updateCitizen`,  // Adjust endpoint as needed
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: formData,  // Send the form data (including the image) in the request body
        });
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