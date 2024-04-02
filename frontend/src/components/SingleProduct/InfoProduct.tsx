import React from 'react'
import { Product } from '../../context/ProductsContext'
import { useProducts } from '../../context/useProducts'
import { useParams } from 'react-router-dom'
import styles from './InfoProduct.module.css'
import ArrowRight from '../../imgs/arrow_right.svg'
import Stars from '../../imgs/stars.png'

const InfoProduct = () => {
  const [product, setProduct] = React.useState<Product | null>(null)
  const [quantity, setQuantity] = React.useState(1)
  const [size, setSize] = React.useState('L')
  const [color, setColor] = React.useState('purple')
  const { getSingleProduct } = useProducts()
  const { id } = useParams()

  React.useEffect(() => {
    async function getProduct() {
      if (id) {
        const data = await getSingleProduct(id)
        setProduct(data)
      }
    }
    getProduct()
  }, [getSingleProduct, id])

  function addQuantity() {
    if (product && quantity < product?.stock) {
      setQuantity(quantity + 1)
    }
  }

  function removeQuantity() {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  if (!product) return null
  return (
    <section>
      <div className={styles.pathProduct}>
        <p className='container'>
          Home <img src={ArrowRight} alt=">" /> Shop <img src={ArrowRight} alt=">" /> | <h3>{product.name}</h3>
        </p>
      </div>
      <div className={`${styles.product} container`}>
        <div className={styles.imgProduct}>
          <img src={product.image} alt={product.name} />
        </div>
        <div className={styles.contentProduct}>
          <h1>{product.name}</h1>
          <span>$ {product.price}</span>
          <img className={styles.stars} src={Stars} alt="stars" />
          <p>{product.description}</p>
          <h2 className={styles.sizes}>Size</h2>
          <ul className={styles.size}>
            <li className={size === 'L' ? styles.sizeActive : ''} onClick={() => setSize('L')}>L</li>
            <li className={size === 'XL' ? styles.sizeActive : ''} onClick={() => setSize('XL')}>XL</li>
            <li className={size === 'XS' ? styles.sizeActive : ''} onClick={() => setSize('XS')}>XS</li>
          </ul>
          <h2 className={styles.colors}>Color</h2>
          <ul className={styles.color}>
            <li onClick={() => setColor('purple')} className={`${styles.colorOne} ${color === 'purple' ? styles.colorActive : ''}`}></li>
            <li onClick={() => setColor('black')} className={`${styles.colorTwo}  ${color === 'black' ? styles.colorActive : ''}`}></li>
            <li onClick={() => setColor('golden')} className={`${styles.colorThree}  ${color === 'golden' ? styles.colorActive : ''}`}></li>
          </ul>
          <div className={styles.buyActions}>
            <button className={styles.quantity}><span onClick={removeQuantity}>-</span> {quantity} <span onClick={addQuantity}>+</span></button>
            <button className={styles.addCart}>Add To Cart</button>
          </div>
          <div className={styles.inStock}>
            Stock: {product.stock}
          </div>
          <div className={styles.details}>
            <p>SKU: SS001</p>
            <p>Category: {product.category}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InfoProduct