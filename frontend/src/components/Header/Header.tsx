import { Link } from 'react-router-dom'
import LogoFurniro from '../../imgs/logo_furniro.svg'
import Account from '../../imgs/header/mdi_account-alert-outline.svg'
import Heart from '../../imgs/header/akar-icons_heart.svg'
import Cart from '../../imgs/header/ant-design_shopping-cart-outlined.svg'
import Search from '../../imgs/header/akar-icons_search.svg'
import styles from './Header.module.css'
import Menu from '../../imgs/header/menu_FILL0_wght400_GRAD0_opsz24.svg'
import React from 'react'
import { useProducts } from '../../context/useProducts'
import DeleteSVG from '../../imgs/delete.svg'

const Header = () => {
  const [menuActive, setMenuActive] = React.useState(false)
  const [cartActive, setCartActive] = React.useState(false)
  const { cart, setCart } = useProducts()
  const [total, setTotal] = React.useState(0)

  function showMenu() {
    setMenuActive(!menuActive)
  }

  function showCart() {
    setCartActive(!cartActive)
  }

  function deleteProduct(id: string) {
    const findProduct = cart?.find((item) => item.product._id === id)
    if (cart && findProduct && findProduct?.quantity > 1) {
      const mapProducts = cart.map((item) => {
        if (item.quantity > 1 && item.product._id === id) {
          return {
            product: item.product,
            quantity: item.quantity - 1
          }
        } else {
          return {
            product: item.product,
            quantity: item.quantity
          }
        }
      })
      console.log(mapProducts)
      mapProducts && setCart(mapProducts)
    } else {
      const products = cart?.filter((item) => {
        return item.product._id !== id
      })
      products && setCart(products)
    }
  }

  React.useEffect(() => {
    const valorTotal = cart?.reduce((accum, item) => {
      return accum + item.product.price * item.quantity
    }, 0)
    if (valorTotal && cart) {
      setTotal(valorTotal)
    } else {
      setTotal(0)
    }
  }, [cart])

  return (
    <header className={`${styles.header} container`}>
      <Link className={styles.logo} to='/' >
        <img src={LogoFurniro} alt="Furniro" />
      </Link>
      <button onClick={showMenu} className={`${styles.menuMobile} ${menuActive ? styles.menuActive : ''}`}><img src={Menu} alt="Menu" /></button>
      <nav className={`${styles.nav}  ${menuActive ? styles.menuActive : ''}`}>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/shop'>Shop</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/contact'>Contact</Link></li>
        </ul>
      </nav>
      <ul className={`${styles.actions}  ${menuActive ? styles.menuActive : ''}`}>
        <span><img src={Account} alt="Account" /></span>
        <span><img src={Search} alt="Search" /></span>
        <span><img src={Heart} alt="Heart" /></span>
        <span onClick={showCart}><img src={Cart} alt="Cart" /></span>
      </ul>
      {cartActive && (
        <div className={styles.cart}>
          <h2>Shopping Cart</h2>
          <ul>
            {cart && cart.map((product) => (
              <li>
                <img className={styles.imgProduct} src={product.product.image} alt={product.product.name} />
                <div>
                  <h2>{product.product.name}</h2>
                  <p className={styles.priceProduct}><span className={styles.quantityProduct}>{product.quantity} x </span> {product.product.price}</p>
                </div>
                <img className={styles.deleteProduct} onClick={() => deleteProduct(product.product._id)} src={DeleteSVG} alt="X" />
              </li>
            ))}
          </ul>
          <p className={styles.subtotal}>Subtotal <span>{total.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</span></p>
          <div className={styles.cartActions}>
            <button className={styles.checkout}>Checkout</button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header