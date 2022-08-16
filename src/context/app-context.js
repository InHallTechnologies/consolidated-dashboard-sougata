import React, { createContext, useState } from 'react'
import userSample from '../entities/user-sample'

const context = createContext()

export const Provider = ({children}) => {
    const [userData, setUserData] = useState(userSample)
    return(
        <context.Provider value={[userData, setUserData]}>
            {children}
        </context.Provider>
    )
} 

export default context