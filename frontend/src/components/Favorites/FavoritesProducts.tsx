import { useProducts } from '../../context/useProducts'
import ProductItem from '../Home/Products/ProductItem'
import styles from './FavoritesProducts.module.css'

const FavoritesProducts = () => {
  const { favorites } = useProducts()

  return (
    <section className={`container`}>
      <ul className={styles.listFavorites}>
        {favorites && favorites.map((favorite) => (
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