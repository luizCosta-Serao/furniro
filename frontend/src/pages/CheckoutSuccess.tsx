import { Link } from 'react-router-dom'
import styles from './CheckoutSuccess.module.css'

const CheckoutSuccess = () => {
  return (
    <section className={styles.checkoutSuccess}>
      <h2>Checkout Success</h2>
      <Link to={'/'}>Home</Link>
    </section>
  )
}

export default CheckoutSuccess