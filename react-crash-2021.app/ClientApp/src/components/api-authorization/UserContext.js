import React, { useContext, useState } from 'react'
//import { useToken } from './UseToken'

const TokenContext = React.createContext()
const UserIdContext = React.createContext()

export function useToken() {
    return useContext(TokenContext)
}

export function useUserId() {
    return useContext(UserIdContext)
}

export function UserProvider({ children }) {
    //this is for authentication, see: https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString)
        //console.log(userToken?.token)
        return userToken?.token
    }

    const [token, setToken] = useState(getToken())

    const saveToken = userToken => {     
        //console.log('saving token')
        setToken(userToken?.token);
        //console.log('done saving token')
    }

    let result = {
        setToken: saveToken,
        token
    }
    
    const getId = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString)
        //console.log(userToken?.id)
        return userToken?.id
    } 

    const [userId, setUserId] = useState(getId())

    const saveUserId = userToken => {       
        sessionStorage.setItem('token', JSON.stringify(userToken))
        //console.log('saving user id')
        setUserId(userToken?.id);
        //console.log('done saving userid')
    }
    
    //const UserProvider = useMemo(() => ({ userId, setUserId: saveUserId }, [userId, setUserId]))
    let user = { userId, setUserId: saveUserId } 

    return (
        <TokenContext.Provider value={result}>
            <UserIdContext.Provider value={user}>
                {children}
            </UserIdContext.Provider>
        </TokenContext.Provider>
                

    )
}