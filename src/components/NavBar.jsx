import React from 'react';

const NavBar = () => {
  return (
    <nav>
      <ul className="bg-cream h-16">
        <h1 className="text-4xl font-bold text-darkviolet inline mx-3">WorkWind</h1>
        <li className="inline mx-8 text-2xl hover:underline"><a href="/">Home</a></li>
        <li className="inline mx-8 text-2xl hover:underline"><a href="/Projects">Projects</a></li>
        <li className="inline mx-8 text-2xl hover:underline"><a href="/Project/Create">Create a Project</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;