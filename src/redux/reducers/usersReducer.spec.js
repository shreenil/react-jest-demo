import reducer from "./usersReducer";
import {
  FETCH_USERS,
  ADD_USERS,
  UPDATE_USERS,
  DELETE_USERS
} from "../actions/types";
import { Reducer } from "redux-testkit";

const initState = {
  users: [],
  user: {}
};

describe("Users Reducer", () => {
  let existingState;

  beforeEach(() => {
    existingState = {
      users: [
        {
          id: 1,
          name: "Mark",
          address: "Facebook, 12, Silicon Vally",
          country: "India",
          phoneNumber: "123-4567-8915",
          profilePhoto: "abcd"
        }
      ]
    };
  });

  it("should return initial state", () => {
    expect(reducer()).toEqual(initState);
  });

  it("should store the fetched records", () => {
    const users = [
      {
        id: 1,
        name: "Mark",
        address: "Facebook, 12, Silicon Vally",
        country: "India",
        phoneNumber: "123-4567-8915",
        profilePhoto: "abcd"
      }
    ];
    const action = { type: FETCH_USERS, payload: users };
    Reducer(reducer)
      .expect(action)
      .toReturnState({ ...initState, users: action.payload });
  });

  it("should insert record in immutable state", () => {
    const user = {
      id: 2,
      name: "Bill",
      address: "Microsoft, 13, Silicon Vally",
      country: "USA",
      phoneNumber: "123-4567-8915",
      profilePhoto: "abcd"
    };

    const action = { type: ADD_USERS, payload: user };
    Reducer(reducer)
      .withState(existingState)
      .expect(action)
      .toReturnState({
        ...existingState,
        users: [...existingState.users, user]
      });
  });

  it("should update record in current state", () => {
    const user = {
      id: 1,
      name: "Mark Zuckerburg",
      address: "Facebook, 12, Silicon Vally",
      country: "USA",
      phoneNumber: "123-4567-8915",
      profilePhoto: "abcd"
    };
    const action = { type: UPDATE_USERS, payload: user };
    Reducer(reducer)
      .withState(existingState)
      .expect(action)
      .toReturnState({
        ...existingState,
        users: existingState.users.map(user => {
          if (user.id !== action.payload.id) {
            return user;
          }
          return action.payload;
        })
      });
  });

  it("should delete record", () => {
    const id = 1;
    const action = { type: DELETE_USERS, payload: id };
    expect(existingState.users.filter(x => x.id === action.payload).length).toBe(1);
    Reducer(reducer)
      .withState(existingState)
      .expect(action)
      .toReturnState({
        ...existingState,
        users: existingState.users.filter(x => x.id !== action.payload)
      });
      // we can also run following
      // expect(reducer(existingState,action)).toEqual({
    //     ...existingState,
    //     users: existingState.users.filter(x => x.id !== action.payload)
    //   })
  });
});
