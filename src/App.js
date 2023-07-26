// App.css
import './App.css';

// Third-party imports
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

// Components
import Footer from './components/Footer';
import Nav from './components/Nav';

// Pages
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import SignIn from './pages/SignIn';

// Utils
import { getCookies } from './utils/cookies.utils';
import { useUserIdentifierContext } from './Hooks/useUserIdentifierContext';
import SignUp from './pages/SignUp';
import VerificationPage from './pages/VerificationPage';
import ResetPassword from './pages/ResetPassword';
import ForgetPassword from './pages/ForgetPassword';


function App() {

  const { setUserIdentifier } = useUserIdentifierContext();


  useEffect(() => {
    const { userIdentifier } = getCookies()
    setUserIdentifier(userIdentifier)
  }, [setUserIdentifier])

  return (
    <div className='max-h-screen'>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/verifyAccount' element={<VerificationPage />} />
        <Route path='/forgot-password' element={<ForgetPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
