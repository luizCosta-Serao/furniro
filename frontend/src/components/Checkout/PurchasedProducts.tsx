import React from 'react'
import { Cart } from '../../context/ProductsContext'
import { useProducts } from '../../context/useProducts'
import styles from './PurchasedProducts.module.css'
import { POST_CHECKOUT } from '../../api'

const PurchasedProducts = () => {
  const [products, setProducts] = React.useState<Cart[] | null>(null)
  const [total, setTotal] = React.useState(0)
  const { cart } = useProducts()

  React.useEffect(() => {
    setProducts(cart)
  }, [cart])

  React.useEffect(() => {
    const totalValue = cart?.reduce((accum, item) => {
      return accum + ( item.quantity * item.price )
    }, 0)
    totalValue ? setTotal(totalValue) : setTotal(0)
  }, [cart])

  return (
    <section className={`${styles.purchasedProducts} container`}>
      <div className={styles.listProducts}>
        <div className={styles.product}>
          <h2>Product</h2>
          {products && products.map((product) => (
            <p key={product._id} className={styles.itemProduct}>{product.name} <span> x {product.quantity}</span></p>
          ))}
        </div>
        <div className={styles.subtotal}>
          <h2>Subtotal</h2>
          {products && products.map((product) => (
            <p key={product._id} className={styles.itemPrice}>{product.price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
          ))}
        </div>
      </div>
      <div className={styles.totalCart}>
        <p className={styles.total}>Total</p>
        <p className={styles.totalValue}>{total.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
      </div>
      <button onClick={() => POST_CHECKOUT(products)} className={styles.placeOrder}>Place order</button>
    </section>
  )
}

export default PurchasedProducts