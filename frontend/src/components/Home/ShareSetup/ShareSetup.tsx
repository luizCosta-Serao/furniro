import React from 'react'
import ShareSetupImg from '../../../imgs/home/shareSetup/share_your_setup.png'
import styles from './ShareSetup.module.css'

const ShareSetup = () => {
  return (
    <section className={styles.shareSetup}>
      <p>Share your setup with</p>
      <h2>#FuniroFurniture</h2>
      <img src={ShareSetupImg} alt="setups" />
    </section>
  )
}

export default ShareSetup