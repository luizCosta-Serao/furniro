import { HeroContact } from "../components/Contact/HeroContact"
import Location from '../imgs/contact/location.png'
import Phone from '../imgs/contact/phone.png'
import Clock from '../imgs/contact/clock.png'
import FormContact from "../components/Contact/FormContact"
import styles from './Contact.module.css'

const Contact = () => {
  return (
    <main className={styles.contact}>
      <HeroContact />
      <h1 className={styles.title}>Get In Touch With Us</h1>
      <p className={styles.description}>For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
      <section className={`${styles.moreContact} container`}>
        <ul className={styles.infoContact}>
          <li>
            <img src={Location} alt="" />
            <div>
              <h2>Address</h2>
              <p>236 5th SE Avenue, New York NY10000, United States</p>
            </div>
          </li>
          <li>
            <img src={Phone} alt="" />
            <div>
              <h2>Phone</h2>
              <p>Mobile: +(84) 546-6789</p>
              <p>Hotline: +(84) 456-6789</p>
            </div>
          </li>
          <li>
            <img src={Clock} alt="" />
            <div>
              <h2>Working Time</h2>
              <p>Monday-Friday: 9:00 - 22:00</p>
              <p>Saturday-Sunday: 9:00 - 21:00</p>
            </div>
          </li>
        </ul>
        <FormContact />
      </section>
    </main>
  )
}

export default Contact