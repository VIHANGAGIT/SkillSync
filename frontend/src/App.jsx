import './App.css'
import { SignInButton, SignedOut, SignedIn, UserButton } from '@clerk/clerk-react'

function App() {

  return (
    <>
    
      <h1>Homepage of SkillSync</h1>

      <header>
        <SignedOut>
          <SignInButton mode='modal'> Sign In</SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

    </>
  )
}

export default App
