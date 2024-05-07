import styles from './Category.module.css'

type CategoryProps = {
  src: string;
  alt: string;
  title: string;
}

const Category = ({
  src,
  alt,
  title,
}: CategoryProps ) => {

  return (
    <li className={styles.category}>
      <img src={src} alt={alt} />
      <h3>{title}</h3>
    </li>
  )
}

export default Category