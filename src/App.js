import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home-page/homePage.component';
import { ChakraProvider } from '@chakra-ui/react'
import AuthPage from './pages/auth-page/authPage.component';
import DetailedResultPage from './pages/detailed-result-page/detailedResultPage.component';
import { firebaseAuth, firebaseDatabase } from './backend/firebase-handler';
import { useContext, useEffect, useState } from 'react';
import context, { Provider } from './context/app-context';
import { child, get, ref } from 'firebase/database';

function App() {

  const [currentState, setCurrentState] = useState("SPLASH")
  const [userData, setUserData] = useContext(context)

  useEffect(() => {
    // firebaseAuth.signOut()
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        get(child(ref(firebaseDatabase), "USER_ARCHIVE/"+user.uid)).then((dataSnapshot)=>{
          if (dataSnapshot.exists()) {
            setUserData(dataSnapshot.val())
            setCurrentState("HOME")
          } else {
            setCurrentState("LOGIN")
          }
        })
      } else {
        setCurrentState("LOGIN")
      }
    })
  }, [])

  if (currentState === "SPLASH") {
    return(
      <div></div>
    )
  }

  if (currentState === "LOGIN") {
    return(
      <AuthPage />
    )
  }

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/auth-user' element={<AuthPage />} />
      <Route path='/sonar-cloud/:projectId' element={<DetailedResultPage />} />
      <Route path='/iz-analyser/:projectId' element={<DetailedResultPage />} />
    </Routes>
  );
}

export default () => {
  return(
    <Provider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
    
  )
};