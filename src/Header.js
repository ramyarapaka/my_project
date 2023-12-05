import React from 'react';
import ramya from "./ram.png";


const Header = () => {
  return (
    <header className="header text-light p-1">
      <div className='d-flex'>
        <img src={ramya} alt="Logo" className="logo-img" />
      </div>
    </header>
  );
};

export default Header;
