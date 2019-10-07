import { login } from './helper';

export const loginUser = () => {
    return () => {
        login();
    }
};


