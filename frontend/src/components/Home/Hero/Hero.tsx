import { useNavigate } from 'react-router-dom'
import Button from '../../Global/Button.tsx/Button'
import styles from './Hero.module.css'

const Hero = () => {
  const navigate = useNavigate()
  
  function redirectShop() {
    navigate('/shop')
  }

  return (
    <section className={styles.heroHome}>
      <div className={styles.containerContent}>
        <div className={styles.content}>
          <span>New Arrival</span>
          <h1>Discover Our <br /> New Collection</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
          <Button onClick={redirectShop}>BUY NOW</Button>
        </div>
      </div>
    </section>
  )
}

export default Hero