import React from 'react'
import styles from './ProductItem.module.css'

type Product = {
  name: string;
  description: string;
  image: string;
  price: number;
}

const ProductItem = ({
  name,
  description,
  image,
  price
}: Product ) => {
  const [showHover, setShowHover] = React.useState(false)

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
        </div>
        ) : (
          ''
        ) 
      }
    </li>
  )
}

export default ProductItem