import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.infos}>
        <div className={styles.address}>
          <h2>Funiro.</h2>
          <p>400 University Drive Suite 200 Coral Gables, FL 33134 USA</p>
        </div>
        <div className={styles.menuFooter}>
          <h3>Links</h3>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/shop'>Shop</Link></li>
            <li><Link to='/About'>About</Link></li>
            <li><Link to='/Contact'>Contact</Link></li>
          </ul>
        </div>
        <div className={styles.helper}>
          <h3>Help</h3>
          <ul>
            <li><Link to='/shop/cart'>Payment Options</Link></li>
            <li><Link to='/'>Returns</Link></li>
            <li><Link to='/policies'>Privacy Policies</Link></li>
          </ul>
        </div>
        <div className={styles.newsletter}>
          <h3>Newsletter</h3>
          <input type="text" placeholder='Enter your email address' />
          <button>SUBSCRIBE</button>
        </div>
      </section>

      <section className={styles.reserved}>
        <p>2023 furino. All rights reverved</p>
      </section>
    </footer>
  )
}

export default Footer