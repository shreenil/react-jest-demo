import { FETCH_USERS, ADD_USERS, UPDATE_USERS, DELETE_USERS } from "./types";
import * as actions from "./userActions";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import expect from 'expect';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mock = {
    get: jest.fn(() => Promise.resolve({ data: ["do something"] }))
}

let user = {
    id: 1,
    name: "Mark Zuckerburg",
    address: "Facebook, 12, Silicon Vally",
    country: "USA",
    phoneNumber: "123-4567-8915",
    profilePhoto: "abcd"
  };

describe("User Actions(Including Aync)", () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  beforeEach(() => {
       
  })

  it("should dispatch " + FETCH_USERS + " after fetching records", () => {

    axios.get = jest.fn().mockImplementation(() =>
    Promise.resolve({data: user}))

    const store = mockStore({ users: [], user: {} });
    let expectedActions = {
      type: FETCH_USERS,
      payload: user
    };
    return store.dispatch(actions.fetchUsers()).then(() => {
      // return of async actions
      expect(store.getActions()[0]).toEqual(expectedActions);
    });
  });

  it("should dispatch " + ADD_USERS + " after adding record", () => {

    axios.post = jest.fn().mockImplementation(() =>
    Promise.resolve({data: user}))

    const store = mockStore({ users: [], user: {} });
    let expectedActions = {
      type: ADD_USERS,
      payload: user
    };
    return store.dispatch(actions.addUser(user)).then(() => {
      // return of async actions
      expect(store.getActions()[0]).toEqual(expectedActions);
    });
  });

  it("should dispatch " + UPDATE_USERS + " after updating record", () => {

    axios.put = jest.fn().mockImplementation(() =>
    Promise.resolve({data: user}))

    const store = mockStore({ users: [], user: {} });
    let expectedActions = {
      type: UPDATE_USERS,
      payload: user
    };
    return store.dispatch(actions.updateUser(user)).then(() => {
      // return of async actions
      expect(store.getActions()[0]).toEqual(expectedActions);
    });
  });

  it("should dispatch " + DELETE_USERS + " after deleting record", () => {

    axios.delete = jest.fn().mockImplementation(() =>
    Promise.resolve({data: user}))

    const store = mockStore({ users: [], user: {} });
    let expectedActions = {
      type: DELETE_USERS,
      payload: user.id
    };
    return store.dispatch(actions.deleteUser(user)).then(() => {
      // return of async actions
      expect(store.getActions()[0]).toEqual(expectedActions);
    });
  });


});
