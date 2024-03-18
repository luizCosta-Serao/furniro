import { useNavigate } from 'react-router-dom';
import styles from './Category.module.css'

type CategoryProps = {
  src: string;
  alt: string;
  title: string;
  pathCategory: string;
}

const Category = ({
  src,
  alt,
  title,
  pathCategory
}: CategoryProps ) => {
  const navigate = useNavigate()

  function redirectToCategory() {
    navigate(`/shop/${pathCategory}`)
  }

  return (
    <li className={styles.category}>
      <img onClick={redirectToCategory} src={src} alt={alt} />
      <h3>{title}</h3>
    </li>
  )
}

export default Category