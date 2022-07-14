import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home-page/homePage.component';
import { ChakraProvider } from '@chakra-ui/react'
import AuthPage from './pages/auth-page/authPage.component';
import DetailedResultPage from './pages/detailed-result-page/detailedResultPage.component';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/auth-user' element={<AuthPage />} />
      <Route path='/:projectId' element={<DetailedResultPage />} />

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