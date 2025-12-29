import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Link, useLocation } from 'react-router';
import { Menu, LayoutDashboard, Code2 } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 border-b border-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
          </div>
          {isMenuOpen && (
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/challenges">Challenges</Link></li>
            </ul>
          )}
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          SkillSync
        </Link>
      </div>
      <div className="navbar-end gap-2">
        <SignedIn>
          <Link to="/dashboard" className={`btn btn-outline btn-primary ${location.pathname === '/dashboard' ? 'btn-active' : ''}`}>
            <LayoutDashboard className="w-4 h-4 mr-1" />
            Dashboard
          </Link>
          <Link to="/challenges" className={`btn btn-outline btn-primary ${location.pathname === '/challenges' ? 'btn-active' : ''}`}>
            <Code2 className="w-4 h-4 mr-1" />
            Challenges
          </Link>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="btn btn-primary">Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton mode="modal" afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navbar;