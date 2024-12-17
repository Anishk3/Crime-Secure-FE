import axios from "axios";

const BASE_URL = "http://localhost:8080/api/stationhead/1"

class StationHeadService {

    getAllOfficers(token) {
        //return axios.get('http://localhost:8080/api/stationhead/get-all-officers')
        return axios({
            method: 'get',
            url: 'http://localhost:8080/api/stationhead/get-all-officers' ,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        })
    }

    addOfficer(officer, token) {
       // return axios.post("http://localhost:8080/api/stationhead/1/add-officer", officer)
       return axios({
        method: 'post',
        url: 'http://localhost:8080/api/stationhead/1/add-officer',  
        data: officer,       
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`
        }
    });
    }

    deleteOfficer(id, token) {
        //return axios.delete("http://localhost:8080/api/stationhead/deleteofficerbyid/" + id)
        return axios({
            method: 'delete',
            url: 'http://localhost:8080/api/stationhead/deleteofficerbyid/' + id,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        })
    }

    getInitiatedIncidents(token) {
        //return axios.get("http://localhost:8080/api/stationhead/get-initiated-incidents")
        return axios({
            method: 'get',
            url: 'http://localhost:8080/api/stationhead/get-initiated-incidents' ,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        })
    }

    getAvailableOfficersList(token) {
        //return axios.get("http://localhost:8080/api/stationhead/available-officers")
        return axios({
            method: 'get',
            url: 'http://localhost:8080/api/stationhead/available-officers' ,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        })
    }

    assignOfficerToIncident(incidentId, officerId, token) {
        const requestBody = {
            incidentId,
            officerIds: [officerId],
        };
    
        return axios({
            method: 'post',
            url: "http://localhost:8080/api/stationhead/assign-officers",
            data: requestBody, 
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}` 
            }
        });
    }
    

    getClosedIncidents(token){
        //return axios.get("http://localhost:8080/api/stationhead/get-closed-incidents")
        return axios({
            method: 'get',
            url: 'http://localhost:8080/api/stationhead/get-closed-incidents' ,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        })
    }

    updateStatusClosedToVerify(token) {
        //return axios.put("http://localhost:8080/api/stationhead/changeStatusToVerified");
        return axios({
            method: 'put',
            url: 'http://localhost:8080/api/stationhead/changeStatusToVerified',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        });
    }


    getIncidentSummary(token) {
        //return axios.get("http://localhost:8080/api/stationhead/summary")
        return axios({
            method: 'get',
            url: 'http://localhost:8080/api/stationhead/summary' ,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        })
    }

    getIncidentOfficer(token) {
        //return axios.get("http://localhost:8080/api/stationhead/1/get-incidents-officer")
        return axios({
            method: 'get',
            url: 'http://localhost:8080/api/stationhead/1/get-incidents-officer' ,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
 
        })
    }

    registerStationHead(user,token){
        //return axios.post("http://localhost:8080/api/auth/register",user)
        return axios({
            method: 'post',
            url: 'http://localhost:8080/api/auth/register',  
            data: user,       
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    loginStationHead(user,token){
        //return axios.post("http://localhost:8080/api/auth/login", user)
        return axios({
            method: 'post',
            url: 'http://localhost:8080/api/auth/login',  
            data: user,       
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }

}


export default new StationHeadService();