import React, { useRef, useState } from "react";
import './authPage.styles.css';
import logo from '../../assets/logo.svg';
import illustration from  '../../assets/illus.png';
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from '@chakra-ui/react'
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseAuth } from "../../backend/firebase-handler";
import AuthBox from "../../Components/AuthBox/AuthBox.component";

const AuthPage = () => {
    const emailIdRef = useRef();
    const passwordRef = useRef();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    signOut(firebaseAuth)

    const handleLogin = async () => {
        try {
            setLoading(true);
            const emailId = emailIdRef.current.value;
            const password = passwordRef.current.value;
            console.log(emailId, password)
            await signInWithEmailAndPassword(firebaseAuth, emailId, password)
            navigate('/')
        }catch(err) {
            setLoading(false);
            alert(err);
        }
       
    }

    return(
        <AuthBox className="auth-page-main-container main-pages-container" authPage>
            <div className="auth-page-navigation-container">
                <img className="navigation-logo" src={logo} alt='consolidated dashboard home' />
                <p className="auth-page-signup">
                    Don't have an account? <Link to={'#'} className="signup-button">SignUp</Link>
                </p>
            </div>
            <div className="auth-page-content">
                <div className="auth-page-box">
                    <h1 className="auth-headline">Welcome Back</h1>
                    <label className="auth-input-label">Email Id</label>
                    <Input ref={emailIdRef} className="auth-box-input" type={'email'} variant='outline' placeholder='name@domain.com' />
                    <label className="auth-input-label">Password</label>
                    <Input ref={passwordRef} className="auth-box-input" type={'password'} variant='outline' placeholder='**********' />
                    <Link className="forgot-password" to={"#"}>Forgot Password?</Link>
                    <Button isLoading={loading} loadingText='Hold On' onClick={handleLogin} className="auth-box-button" colorScheme='teal' size='md'>LOGIN</Button>
                </div>
                <div className="auth-page-illustration">
                    <img className="illustration-image" src={illustration} />
                </div>
            </div>
        </AuthBox>
    )
}

export default AuthPage;