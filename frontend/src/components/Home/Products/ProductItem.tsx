import React from 'react'
import styles from './ProductItem.module.css'
import { Link } from 'react-router-dom';
import { useProducts } from '../../../context/useProducts';

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
  const { addCart, cart } = useProducts()

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

  async function getProductsCart() {
    const products = cart?.find((item) => item.product._id === _id)
    if (products) {
      await addCart(_id, products.quantity + 1)
    } else {
      await addCart(_id, 1)
    }
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
          <span onClick={() => getProductsCart()}>Add to cart</span>
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