//instructions https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        //console.log(userToken)
        return userToken?.token
    };


    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        //console.log(`%c saving token ${userToken}`, 'background: #222; color: #87CEEB')
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken?.token);
    }

    //const removeToken = userToken => {
    //    localStorage.removeItem('token');
    //    setToken(null);
    //};

    let result = {
        setToken: saveToken,
        token
    }

    //console.log(`%c result:${result.setToken}, ${result.token}`, 'background: #222; color: #87CEEB')

    return result
}

