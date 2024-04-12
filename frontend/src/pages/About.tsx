import HeroAbout from "../components/About/HeroAbout"
import styles from './About.module.css'

const About = () => {
  return (
    <main className={styles.about}>
      <HeroAbout />
      <h1 className={styles.aboutTitle}>Our values</h1>
      <section className="container">
        <ul className={styles.values}>
          <li>Quality</li>
          <li>Responsibility</li>
          <li>fast delivery</li>
        </ul>
        <p className={styles.aboutUs}>Welcome to our world of furniture and decoration! Here, we believe that each space has a story to tell, and our furniture is the protagonist of this narrative. Allow us to introduce who we are and what we stand for:</p>
        <ul className={styles.listResponsibilities}>
          <li>
            <h2>Passsion for Design</h2>
            <p>We are passionate about design and functionality. Each piece in our catalog is carefully selected to combine style, comfort and practicality. We want your spaces to be an authentic reflection of your personal taste.</p>
          </li>
          <li>
            <h2>Quality and Durability</h2>
            <p>We don’t compromise when it comes to quality. Our furniture is constructed from premium materials, ensuring it will stand the test of time. We want you to enjoy them for years to come.</p>
          </li>
          <li>
            <h2>Variety for Every Style</h2>
            <p>Whether you're minimalist, classic, industrial or boho, we have something for everyone. Explore our collections of sofas, tables, chairs, shelves and more. Find the perfect furniture for every corner of your home.</p>
          </li>
          <li>
            <h2>Personalized Service</h2>
            <p>Our team is here to help. Whether you want to choose the ideal sofa for your living room or find the dining table of your dreams, we are at your disposal. Contact us by phone, chat or email.</p>
          </li>
          <li>
            <h2>Commitment to Sustainability</h2>
            <p>We value the environment. We work with suppliers that follow sustainable practices and eco-friendly materials. We believe that it is possible to create beautiful environments without harming the planet.</p>
          </li>
          <li>
            <h2>Safe and Fast Delivery</h2>
            <p>We know you are eager to receive your furniture. Therefore, our logistics are efficient and reliable. We deliver nationwide, with care and punctuality.</p>
          </li>
        </ul>
      </section>
    </main>
  )
}

export default About