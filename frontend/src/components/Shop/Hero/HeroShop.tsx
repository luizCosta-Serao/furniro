import styles from './HeroShop.module.css'

const HeroShop = () => {
  return (
    <section className={styles.heroShop}>
      <h1>Shop</h1>
      <p>Home {'>'} <span>Shop</span></p>
    </section>
  )
}

export default HeroShop