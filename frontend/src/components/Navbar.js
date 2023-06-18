const Navbar = ({ onClick, isMenuClicked }) => {
  const burgerClass = `navbar__burger-bar ${isMenuClicked ? 'clicked' : 'unclicked'}`

  return (
    <nav className="navbar__overlay selectable-white" onClick={onClick}>
      <div className="navbar__burger-menu">
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
      </div>
    </nav>
  )
}

export default Navbar;
