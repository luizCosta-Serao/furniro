import { Link } from 'react-router-dom'
import LogoFurniro from '../../imgs/logo_furniro.svg'
import Account from '../../imgs/header/mdi_account-alert-outline.svg'
import Heart from '../../imgs/header/akar-icons_heart.svg'
import Cart from '../../imgs/header/ant-design_shopping-cart-outlined.svg'
import Search from '../../imgs/header/akar-icons_search.svg'
import styles from './Header.module.css'
import Menu from '../../imgs/header/menu_FILL0_wght400_GRAD0_opsz24.svg'
import React from 'react'

const Header = () => {
  const [menuActive, setMenuActive] = React.useState(false)

  function showMenu() {
    setMenuActive(!menuActive)
  }

  return (
    <header className={styles.header}>
      <Link className={styles.logo} to='/' >
        <img src={LogoFurniro} alt="Furniro" />
      </Link>
      <button onClick={showMenu} className={`${styles.menuMobile} ${menuActive ? styles.menuActive : ''}`}><img src={Menu} alt="Menu" /></button>
      <nav className={`${styles.nav}  ${menuActive ? styles.menuActive : ''}`}>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/shop'>Shop</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/contact'>Contact</Link></li>
        </ul>
      </nav>
      <ul className={`${styles.actions}  ${menuActive ? styles.menuActive : ''}`}>
        <span><img src={Account} alt="Account" /></span>
        <span><img src={Search} alt="Search" /></span>
        <span><img src={Heart} alt="Heart" /></span>
        <span><img src={Cart} alt="Cart" /></span>
      </ul>
    </header>
  )
}

export default Header