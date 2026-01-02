import { useUser } from '@clerk/clerk-react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import ChallengesPage from './pages/ChallengesPage'
import { Toaster } from 'react-hot-toast'
import SolvePage from './pages/SolvePage'
import SessionPage from './pages/SessionPage'

function App() {

  const {isSignedIn, isLoaded} = useUser()

  if (!isLoaded) return null;

  return (
    <>
      <Routes>

        <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to="/dashboard" />}/> 
        <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to="/" />}/> 

        <Route path="/challenges" element={isSignedIn ? <ChallengesPage /> : <Navigate to="/" />}/>
        <Route path="/challenge/:sessionId" element={isSignedIn ? <SolvePage /> : <Navigate to="/" />}/>

        <Route path="/session/:sessionId" element={isSignedIn ? <SessionPage /> : <Navigate to="/" />}/>

      </Routes>
      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  )
}

export default App
