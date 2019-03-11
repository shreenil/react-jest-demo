import axios from "axios";
import { FETCH_USERS, ADD_USERS, UPDATE_USERS, DELETE_USERS } from "./types";

const url = 'http://localhost:8000/users';

export const fetchUsers = () => dispatch => {
    const request = axios.get(url);
    return request
        .then(users => {
            dispatch({
                type: FETCH_USERS,
                payload: users.data
            })
        });

}

export const addUser = (data) => dispatch => {

    const request = axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return request.then(res => {
        
        dispatch({
            type: ADD_USERS,
            payload: res.data
        })
    })

}

export const updateUser = (data) => dispatch => {

    const request = axios.put(url + "/" + data.id, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return request.then(res => {
        
        dispatch({
            type: UPDATE_USERS,
            payload: data
        })
    })

}

export const deleteUser = (data) => dispatch => {
    

    const request = axios.delete(url + "/" + data.id, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return request.then(res => {
        
        dispatch({
            type: DELETE_USERS,
            payload: data.id
        })
    })

}

