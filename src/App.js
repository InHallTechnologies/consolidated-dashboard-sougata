import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home-page/homePage.component';
import { ChakraProvider } from '@chakra-ui/react'
import AuthPage from './pages/auth-page/authPage.component';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/auth-user' element={<AuthPage />} />
    </Routes>
  );
}

export default () => {
  return(
    <ChakraProvider>
      <App />
    </ChakraProvider>
  )
};