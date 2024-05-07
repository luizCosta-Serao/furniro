import Category from './Category'
import Dining from '../../../imgs/home/categories/dining.png'
import Living from '../../../imgs/home/categories/living.png'
import Bedroom from '../../../imgs/home/categories/bedroom.png'
import styles from './Categories.module.css'

const Categories = () => {
  return (
    <section className={`${styles.categories} container`}>
      <h2 className={styles.title}>Browse The Range</h2>
      <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <ul className={styles.listCategories}>
        <Category src={Dining} alt='Dining' title='Dining' />
        <Category src={Living} alt='Living' title='Living' />
        <Category src={Bedroom} alt='Bedroom' title='Bedroom' />
      </ul>
    </section>
  )
}

export default Categories