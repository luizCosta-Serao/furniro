import React from 'react'
import styles from './RelatedProducts.module.css'
import { useProducts } from '../../context/useProducts'
import { useParams } from 'react-router-dom'
import ProductItem from '../Home/Products/ProductItem'
import { Product } from '../../context/ProductsContext'

const RelatedProducts = () => {
  const [products, setProducts] = React.useState<Product[] | null>(null)
  const { filterCategory, getSingleProduct } = useProducts()
  const { id } = useParams()

  React.useEffect(() => {
    async function sameCategory() {
      if (id) {
        const mainProduct = await getSingleProduct(id)
        let data = mainProduct.category && await filterCategory(mainProduct.category)
        if (data) {
          data = data?.filter((product) => product._id !== mainProduct._id)
          data && setProducts(data)

        }
      }
    }
    sameCategory()
  })

  return (
    <section className={`${styles.relatedProducts} container`}>
      <h2>Related Products</h2>
      <ul>
        {products && products.map((product, index) => {
          if (index < 4) {
            return (
              <ProductItem
              _id={product._id}
              key={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
              />
            )
          }
        })}
      </ul>
    </section>
  )
}

export default RelatedProducts