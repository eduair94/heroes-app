import { types } from "../../../src/auth";

describe('Tests in types', () => { 
    test('should return this types', () => {
        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        })
    });
 })