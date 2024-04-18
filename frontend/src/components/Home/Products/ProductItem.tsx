import React from 'react'
import styles from './ProductItem.module.css'
import { Link } from 'react-router-dom';
import { useProducts } from '../../../context/useProducts';
import FavoritePink from '../../../imgs/favorites/favorite-pink.png'
import FavoriteRed from '../../../imgs/favorites/favorite-red.png'
import { useUser } from '../../../context/useUser';
import Fail from '../../Helper/Fail';

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
  const [fail, setFail] = React.useState(false)
  const [failMessage, setFailMessage] = React.useState('')
  const { addCart, cart, addFavorites, removeFavorites, favorites, setFavorites } = useProducts()
  const [iconFavorite, setIconFavorite] = React.useState(FavoritePink)
  const { login } = useUser()

  function backToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  React.useEffect(() => {
    if (login) {
      const findFavorite = favorites?.find((favorite) => favorite._id === _id)
      if (findFavorite) {
        setIconFavorite(FavoriteRed)
      }
    }
  }, [favorites, _id, login])

  function toFavorite() {
    if (!login) {
      setFailMessage('login to add to favorites')
      setFail(true)
      setTimeout(() => {
        setFail(false)
      }, 2000)
    } else {
      if (iconFavorite === FavoritePink) {
        setIconFavorite(FavoriteRed)
        addFavorites(_id)
      } else {
        setIconFavorite(FavoritePink)
        removeFavorites(_id)
        console.log(favorites)
      }
    }
  }

  React.useEffect(() => {
    if (login) {
      const favoritesLocal = JSON.parse(window.localStorage.getItem('favorites') || '')
      setFavorites(favoritesLocal)
    }
  }, [login ,setFavorites])

  function trueHover() {
    setShowHover(true)
  }

  function falseHover() {
    setShowHover(false)
  }

  async function getProductsCart() {
    if (!login) {
      setFailMessage('login to add to cart')
      setFail(true)
      setTimeout(() => {
        setFail(false)
        setFailMessage('')
      }, 2000)
    } else {
      const products = cart?.find((item) => item.product._id === _id)
      if (products) {
        await addCart(_id, products.quantity + 1)
      } else {
        await addCart(_id, 1)
      }
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
          <div className={styles.toFavorite}>
            <img onClick={toFavorite} src={iconFavorite} alt="Favorite" />
          </div>
        </div>
        ) : (
          ''
        ) 
      }
      {fail && <Fail>{failMessage}</Fail>}
    </li>
  )
}

export default ProductItem