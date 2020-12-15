import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/crown.svg'; // special syntax for importing SVG
// ReactComponent import name is special and tells Create React App that you want a React component that renders an SVG, rather than its filename
import './header.styles.scss';

const Header = ({isLogin, toggleLogin}) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/'>
        SHOP
      </Link>
      {isLogin ? (
        <div className='option' onClick={() => toggleLogin()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
      {/* <Link className='option' to='/signin'>
          SIGN IN
      </Link> */}
    </div>
  </div>
);

export default Header;
