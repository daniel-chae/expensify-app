import { login, logout } from '../../actions/auth';

test('should create Logout action', () => {
    expect(logout()).toEqual({
        type: 'LOGOUT'
    })
});

test('should create Login action', () => {
    const uid = '1'
    expect(login(uid)).toEqual({
        type: 'LOGIN',
        uid
    })
})