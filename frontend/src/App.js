import './App.css';

// Router
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Components 
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Hooks
import { useAuth } from './hooks/useAuth';
import EditProfile from './pages/EditProfile/EditProfile';

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path="/" element={auth ? <Home /> : <Navigate to="/login" />} />
            <Route path="/profile" element={auth ? <EditProfile /> : <Navigate to="/login" />} />
            <Route path="/login" element={!auth ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!auth ? <Register /> : <Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
