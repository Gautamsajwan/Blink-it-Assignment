import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar, Footer } from './components';
import { Home, SignUp, Login } from './pages';
import FileUploader from './pages/FileUploader';

function App() {
  const location = useLocation()

  const navbarPaths = ['/', '/upload']

  const showNavbar = navbarPaths.includes(location.pathname)

  return (
    <>
      {showNavbar && (
        <header>
          <Navbar />
        </header>
      )}

      <main>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/upload' element={<FileUploader />}/>
          <Route path='/signUp' element={<SignUp />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </main>

      {showNavbar && (
        <footer>
          <Footer />
        </footer>
      )}
    </>
  )
}

export default App;