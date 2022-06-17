import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@chakra-ui/react'
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../backend/firebase-handler';
import { useNavigate } from 'react-router-dom';

const AuthBox = (props) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setLoading(false);
                if (props.authPage) {
                    navigate('/')
                    return;
                }
            }else {
                if (props.authPage) {
                    setLoading(false);
                    return;
                }
                navigate('/auth-user');
                
            }
        })
    }, [])

    if (loading) {
        return(
            <div style={{width:'100vw', height:'100vh',display:'flex' ,justifyContent:'center', alignItems:'center'}}>
                <CircularProgress isIndeterminate value={80} />
            </div>
        )
    }

    return (
        <div className={props.className}>
            {props.children}
        </div>
    )
}

export default AuthBox