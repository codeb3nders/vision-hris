import axios from "axios"
import { URL_EMPLOYEES, URL_EMPLOYEES_WITH_LEAVES } from "constants/EndpointPath"

export const getEmployeesWithLeavesEndpoint = async ()=>{
try {
    return  await axios.get(URL_EMPLOYEES_WITH_LEAVES)
} catch (error:any) {
    console.error('ERROR in getEmployeesWithLeavesEndpoint',error)
    return error.message   
}
}


export const getEmployeesEndpoint = async ()=>{
    try {
        return  await axios.get(URL_EMPLOYEES)
    } catch (error:any) {
        console.error('ERROR in getEmployeesEndpoint',error)
        return error.message   
    }
    }
