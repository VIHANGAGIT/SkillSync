import { SignInButton, SignedOut, SignedIn, UserButton, useUser } from '@clerk/clerk-react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import { Toaster } from 'react-hot-toast'

function App() {

  const {isSignedIn} = useUser()

  return (
    <>
      <Routes>

        <Route path="/" element={<HomePage />}/> 
        <Route path="/challenges" element={isSignedIn ? <ChallengesPage /> : <Navigate to="/" />}/>

      </Routes>
      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  )
}

export default App
