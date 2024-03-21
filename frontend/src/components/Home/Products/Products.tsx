import React from 'react'
import styles from './Products.module.css'
import { GET_PRODUCTS} from '../../../api';
import ProductItem from './ProductItem';

export type Products = {
  _id: string;
  name: string;
  description: string
  price: number;
  image: string;
  stock: number;
  category: string;
}

const Products = () => {
  const [products, setProducts] = React.useState<Products[] | null>(null)

  React.useEffect(() => {
    async function fetchProducts() {
      const data = await GET_PRODUCTS()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  if (!products) return null
  return (
    <section className={`${styles.products} container`}>
      <h2 className={styles.title}>Our Products</h2>
      <ul className={styles.listProducts}>
        {products.map((product) => (
          <ProductItem
            key={product._id}
            name={product.name}
            description={product.description}
            price={product.price}
            image={product.image}
          />
        ))}
      </ul>
    </section>
  )
}

export default Products