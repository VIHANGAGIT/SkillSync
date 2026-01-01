import React from 'react';

function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Challenges</a>
        <a className="link link-hover">Contact</a>
      </nav>
      <aside>
        <p>{new Date().getFullYear()} &nbsp; | &nbsp; All rights reserved by Vihanga Vithanawasam</p>
      </aside>
    </footer>
  );
}

export default Footer;