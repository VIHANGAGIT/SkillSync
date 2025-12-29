import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import React from 'react'

function HomePage() {
  return (
    <div>
        <h1>Homepage of SkillSync</h1>
        <SignedOut>
            <SignInButton mode="modal">
                <button>Sign In</button>
            </SignInButton>
        </SignedOut>

        <SignedIn>
            <SignOutButton mode="modal">
                <button>Sign Out</button>
            </SignOutButton>
        </SignedIn>

        <UserButton />

    </div>
  )
}

export default HomePage