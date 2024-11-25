import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';
import { error } from 'console';



 //This constant is used to simulate a delay in the response from the server.
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:5130/api';


//This method is used to intercept the request and response from the server so 
//that we can simulate a delay in the response from the server.
axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})




//This constant is used to get the response body
const responseBody = <T> (response: AxiosResponse<T>) => response.data;


//This constant is used to make requests to the server
const requests = {
    get: <T>  (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}


//This constant is used to make requests to the server for activities.
const Activities = {
list: () => requests.get<Activity[]>('/activities'),
details: (id: string) => requests.get<Activity>(`/activities/${id}`),
create: (activity: Activity) => requests.post<void>('/activities', activity),
update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
delete: (id: string) => requests.del<void>(`/activities/${id}`)
}


//Finally, we create a constant that will contain the agent so we can use it in other parts of the application.
// and  call the Activities constant and its methods.
const agent = {
    Activities
}

export default agent;