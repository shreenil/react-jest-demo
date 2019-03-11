import { FETCH_USERS, ADD_USERS, UPDATE_USERS, DELETE_USERS } from "../actions/types";

const initState = {
    users: [],
    user: {}
}

export default function reducer(state = initState, action = {}) {
    switch (action.type) {
        case FETCH_USERS: {
            return { ...state, users: action.payload }
        }
        case ADD_USERS: {
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        }
        case UPDATE_USERS: {
            return {
                ...state,
                users: state.users.map(user => {
                    if(user.id !== action.payload.id) {
                        return user
                    }
                    return action.payload
                })
            }
        }
        case DELETE_USERS: {
            return {
                ...state,
                users: state.users.filter(x => x.id !== action.payload)
            }
        }
        default: {
            return state;
        }
    }
}