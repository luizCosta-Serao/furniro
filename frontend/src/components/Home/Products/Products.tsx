import React from 'react'
import styles from './Products.module.css'
import { GET_PRODUCTS} from '../../../api';
import ProductItem from './ProductItem';
import Loading from '../../Helper/Loading';
import { Product } from '../../../context/ProductsContext';

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
  const [products, setProducts] = React.useState<Product[] | null>(null)

  React.useEffect(() => {
    async function fetchProducts() {
      const data = await GET_PRODUCTS()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <section className={`${styles.products} container`}>
      <h2 className={styles.title}>Our Products</h2>
      {products ? (
        <ul className={styles.listProducts}>
          {products.map((product) => (
            <ProductItem
              _id={product._id}
              key={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          ))}
        </ul>
      ) : (
        <div className='container-loading'>
          <Loading />
        </div>
      )}
    </section>
  )
}

export default Products