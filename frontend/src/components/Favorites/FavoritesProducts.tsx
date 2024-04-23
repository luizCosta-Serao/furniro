import React from 'react'
import { useProducts } from '../../context/useProducts'
import ProductItem from '../Home/Products/ProductItem'
import styles from './FavoritesProducts.module.css'
import { Products } from '../Home/Products/Products'

const FavoritesProducts = () => {
  const [favoriteItems, setFavoriteItems] = React.useState<Products[] | null>(null)
  const { favorites } = useProducts()

  React.useEffect(() => {
    const fav = JSON.parse(window.localStorage.getItem('favorites') || '[]')
    setFavoriteItems(fav)
  }, [favorites])

  return (
    <section className={`container`}>
      <ul className={styles.listFavorites}>
        {favoriteItems && favoriteItems.map((favorite) => (
          <ProductItem
            _id={favorite._id}
            key={favorite._id}
            name={favorite.name}
            description={favorite.description}
            price={favorite.price}
            image={favorite.image}
          />
        ))}
      </ul>
    </section>
  )
}

export default FavoritesProducts