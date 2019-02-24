import authReducer from '../../reducers/auth';

test('should handle Logout properly', ()=>{
    expect(authReducer({ uid: 'anything' }, {
        type: 'LOGOUT'
    })).toEqual({});
});

test('should handle Login properly', ()=>{
    const uid = '1';
    expect(authReducer({}, {
        type: 'LOGIN',
        uid
    })).toEqual({uid});
});