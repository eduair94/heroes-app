import {authReducer, types} from '../../../src/auth';

describe('Test in AuthReducer', () => { 

    test('should return default state', () => {
        const user = authReducer({logged: false}, {});
       expect(user).toEqual({logged: false});
    });

    test('should authenticate and set the user name', () => {
        const action = {type: types.login, payload: {id: '123', name: 'Juan'}};
        const user = authReducer({}, action);
        expect(user).toEqual({logged: true, user: action.payload});
    })

    test('should delete the user name and logged in false', () => {
        const state = {logged: true, user: {id: '123', name: 'Juan'}};
        const action = {type: types.logout};
        const newState = authReducer(state, action);
        expect(newState).toEqual({logged: false});
    });
 })