import React, { useRef } from 'react'
import styles from './Inspiration.module.css'
import Button from '../../Global/Button.tsx/Button'
import { useNavigate } from 'react-router-dom'
import InspirationOne from '../../../imgs/home/inspiration/inspiration_2.png'
import InspirationTwo from '../../../imgs/home/inspiration/inspiration_3.jpg'
import InspirationThree from '../../../imgs/home/inspiration/inspiration_4.jpg'
import InspirationFour from '../../../imgs/home/inspiration/inspiration_5.jpg'

const Inspiration = () => {
  const [position, setPosition] = React.useState(0)
  const [active, setActive] = React.useState(0)

  const navigate = useNavigate()
  const ulRef = useRef<HTMLUListElement>(null)

  function redirectExploration() {
    navigate('/shop')
  }

  const media = window.matchMedia('(max-width: 800px)')

  function moveSlide(active: number) {
    if (ulRef.current) {
      setActive(active)
      media.matches ?
        setPosition(-((400 * active) - (24 * active)))
        :
        setPosition(-((ulRef.current.clientWidth / 4) * active))
    }
  }

  React.useEffect(() => {
    function verifyMedia() {
      setPosition(0)
      setActive(0)
    }
    window.addEventListener('resize', verifyMedia)

    return () => {
      window.removeEventListener('resize', verifyMedia)
    }
  }, [])

  return (
    <section className={`${styles.inspiration} container`}>
      <div className={styles.content}>
        <h2>50+ Beautiful rooms inspiration</h2>
        <p>Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
        <Button onClick={redirectExploration}>Explore More</Button>
      </div>

      <div className={styles.imgsInspiration}>
      
        <div className={styles.imgMain}>
          <div className={styles.imgMainText}>
            <span>01 - Bed Room</span>
            <h3>Inner Peace</h3>
          </div>
        </div>
        
        <div className={styles.imgSlider}>
          
          <ul style={{transform: `translateX(${position}px)`}} ref={ulRef} className={styles.imgList}>
            <li><img className={active === 0 ? styles.active : ''} src={InspirationOne} alt="" /></li>
            <li><img className={active === 1 ? styles.active : ''} src={InspirationTwo} alt="" /></li>
            <li><img className={active === 2 ? styles.active : ''} src={InspirationThree} alt="" /></li>
            <li><img className={active === 3 ? styles.active : ''} src={InspirationFour} alt="" /></li>
          </ul>
          
          <div className={styles.changeImg}>
            <span className={active === 0 ? styles.active : ''} onClick={() => moveSlide(0)}></span>
            <span className={active === 1 ? styles.active : ''} onClick={() => moveSlide(1)}></span>
            <span className={active === 2 ? styles.active : ''} onClick={() => moveSlide(2)}></span>
            <span className={active === 3 ? styles.active : ''} onClick={() => moveSlide(3)}></span>
          </div>
        
        </div>
      
      </div>
    </section>
  )
}

export default Inspiration