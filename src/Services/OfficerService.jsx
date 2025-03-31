import axios from 'axios'

class OfficerService{
    getAssignedIncidents(token){
        // return axios.get("http://localhost:8080/api/officer/getofficerincidents")
        return axios({
            method: 'get',
            url: 'http://localhost:8080/api/officer/getofficerincidents' ,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        })
    }

    getActiveIncidents(token){
        //return axios.get("http://localhost:8080/api/stationhead/get-closed-incidents")
        return axios({
            method: 'get',
            url: 'http://localhost:8080/api/officer/get-active-incidents' ,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        })
    }

    updateStatusActiveToClosed(token, incidents) {
        return axios({
            method: 'put',
            url: 'http://localhost:8080/api/officer/changeStatusToClosed',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            },
            data: incidents // Send the array of verified incidents in the request body
        });
    }

    getOfficer(OfficerId,token) {
       
        return axios({
            method: 'get',
            url: `http://localhost:8080/api/officer/getOfficer/${OfficerId}`,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        })
    }
    
    getProfileImage(token, OfficerId) {
        return axios({
            method: 'get',
            url:`http://localhost:8080/api/officer/${OfficerId}/profile-image`,
            responseType: 'blob', // Correct responseType for binary data
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    updateOfficer(token, formData) {
        return axios({
            method: 'put',
            url: `http://localhost:8080/api/officer/updateOfficer`,  // Adjust endpoint as needed
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            data: formData,  // Send the form data (including the image) in the request body
        });
    }


    // updateStatusToClosed(){
    //     returnaxios.put("http://localhost:8080/api/officer/" + ${incidentId} + "/status/closed")
    // }
}

export default new OfficerService();