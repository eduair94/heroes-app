import { types } from "../types/types";

interface UserPayloadI {
    id: string;
    name: string;
}


type PayloadI = UserPayloadI | null;


export interface AuthReducerInterface {
    logged?: boolean,
    user?: UserPayloadI | null
}

export const authReducer = (state: AuthReducerInterface = {}, action: {type?: string, payload?: PayloadI}): AuthReducerInterface => {
    switch (action.type) {
        case types.login:
            return {
                logged: true,
                user: action.payload as UserPayloadI
            }
        case types.logout:
        return {
            logged: false,
        }
        default:
            return state;
    }
}