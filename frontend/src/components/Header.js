import { useState } from 'react';
import headerLogo from '../images/header-logo.svg';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import NavbarMenu from './NavbarMenu';

export default function Header({ userData, signOut }) {
  const { pathname } = useLocation();
  const showRegistration = pathname === '/sign-in';
  const showLogin = pathname === '/sign-up';
  const showNavbar = !showLogin && !showRegistration;
  const [isMenuClicked, setIsMenuClicked] = useState(false);


  const handleNavbarClick = () => {
    setIsMenuClicked(!isMenuClicked);
  }

  return (
    <header className="header">
      <div>
        {showNavbar && (
          <NavbarMenu isMenuClicked={isMenuClicked}>
            <div className="header__navbar-user">{userData.email}</div>
            <Link to="/sign-in" className="header__navbar-link header__navbar-link_exit selectable-white" onClick={signOut}>Выйти</Link>
          </NavbarMenu>)}
      </div>
      <div className="header__line">
        <img className="header__logo" src={headerLogo} alt="Логотип сайта Место" />
        <div className="header__navbar selectable-white">
          {showRegistration && (<Link to="/sign-up" className="header__navbar-link selectable-white">Регистрация</Link>)}
          {showLogin && (<Link to="/sign-in" className="header__navbar-link selectable-white">Войти</Link>)}
          {showNavbar && (
            <Navbar isMenuClicked={isMenuClicked} onClick={handleNavbarClick} />
          )}
        </div>
      </div>
    </header>
  )
}
