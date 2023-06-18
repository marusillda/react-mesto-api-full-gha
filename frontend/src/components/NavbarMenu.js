const NavbarMenu = ({ children, isMenuClicked }) => {
  const menuClass = `navbar__menu ${isMenuClicked ? 'navbar__menu_visible' : ''}`

  return (
    <div className={menuClass}>
      {children}
    </div>
  )
}

export default NavbarMenu;
