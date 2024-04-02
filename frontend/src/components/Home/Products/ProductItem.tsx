import React from 'react'
import styles from './ProductItem.module.css'
import { Link } from 'react-router-dom';

type Product = {
  name: string;
  description: string;
  image: string;
  price: number;
  _id: string;
}

const ProductItem = ({
  name,
  description,
  image,
  price,
  _id
}: Product ) => {
  const [showHover, setShowHover] = React.useState(false)

  function backToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  function trueHover() {
    setShowHover(true)
  }

  function falseHover() {
    setShowHover(false)
  }

  return (
    <li className={styles.productItem} onMouseOver={trueHover} onMouseLeave={falseHover}>
      <img src={image} alt={name} />
      <div className={styles.productContent}>
        <h3>{name}</h3>
        <p>{description}</p>
        <span>$ {price}</span>
      </div>
      {showHover ? (
        <div className={styles.actions}>
          <span>Add to cart</span>
          <Link onClick={backToTop} to={`/shop/${_id}`}>View</Link>
        </div>
        ) : (
          ''
        ) 
      }
    </li>
  )
}

export default ProductItem