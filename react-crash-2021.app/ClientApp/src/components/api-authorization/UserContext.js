import React, { useContext, useState } from 'react'
//import { useToken } from './UseToken'

const TokenContext = React.createContext()

export function useToken() {
    return useContext(TokenContext)
}

export function TokenProvider({ children }) {
    //this is for authentication, see: https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString)
        //console.log(userToken?.token)
        return userToken
    }

    const [token, setToken] = useState(getToken())

    const saveToken = userToken => {     
        console.log('saving token')
        console.log(userToken)
        setToken(userToken);
        //console.log('done saving token')
    }

    let result = {
        setToken: saveToken,
        token
    }
    

    return (
        <TokenContext.Provider value={result}>
            {children}
        </TokenContext.Provider>
                

    )
}