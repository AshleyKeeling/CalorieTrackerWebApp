import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './Hooks/useAuthContext';

import NavBar from './Components/NavBar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import UpdateFoodItem from './Pages/updateFoodItem';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={user ? <Home /> : <Navigate to='/login' />}
            />
            <Route
              path='/login'
              element={!user ? <Login /> : <Navigate to='/' />}
            />
            <Route
              path='/signup'
              element={!user ? <Signup /> : <Navigate to='/' />}
            />
            <Route
              path='/updateFoodItem'
              element={user ? <UpdateFoodItem /> : <Navigate to='/login' />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
