import { useProducts } from '../../context/useProducts'
import ProductItem from '../Home/Products/ProductItem'
import styles from './ShopProducts.module.css'
import Filter from '../../imgs/shop/filter.svg'
import React from 'react'
import Loading from '../Helper/Loading'

const ShopProducts = () => {
  const [show, setShow] = React.useState(4)
  const [showing, setShowing] = React.useState(4)
  const [page, setPage] = React.useState(1)
  const [search, setSearch] = React.useState('')
  const { products } = useProducts()
  const [allProducts, setAllProducts] = React.useState(products)
  const [toFilter, setToFilter] = React.useState(false)

  function nextProducts(nextPage: number) {
    setPage(nextPage)
    setShowing(nextPage * show)
    window.scrollTo({
      top: 420,
      behavior: 'smooth'
    })
  }

  React.useEffect(() => {
    setShowing(show)
  }, [show])

  React.useEffect(() => {
    function searchProduct() {
      const regex = new RegExp(search.toLowerCase())
      const filter = products?.filter((product) => product.name.toLowerCase().match(regex))
      
      if (search && filter) {
        setAllProducts(filter)
      } else {
        setAllProducts(products)
      }
    }
    searchProduct()  
  }, [products, search])

  function filterCategory(category: string) {
    const filter = products?.filter((product) => product.category === category)
    if (filter && category !== '') {
      setAllProducts(filter)
    } else {
      setAllProducts(products)
    }
    setToFilter(false)
  }

  return (
    <section className={styles.shopProducts}>
      <div className={styles.actions}>
        <div className={`container`}>
          <div className={styles.actionsOne}>
            <p className={styles.filter} onClick={() => setToFilter(!toFilter)}><img src={Filter} alt="Filter"/> Filter</p>
            <span className={styles.showing}>Showing {showing - show} - {showing} of {allProducts ? allProducts.length : '?'} results</span>
            <div className={toFilter ? styles.toFilter : ''}>
              <p onClick={() => filterCategory('')}>All</p>
              <p onClick={() => filterCategory('dining')}>Dining</p>
              <p onClick={() => filterCategory('living')}>Living</p>
              <p onClick={() => filterCategory('bedroom')}>Bedroom</p>
            </div>
          </div>
          <div className={styles.actionsTwo}>
            <div className={styles.show}>
              <label htmlFor='show'>Show</label>
              <input type="number" name='show' id='show' value={show} onChange={(e) => setShow(Number(e.target.value))}/>
            </div>
            <div className={styles.search}>
              <label htmlFor='search'>Search</label>
              <input type="text" name='search' id='search' value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        {allProducts ? (
          <ul className={styles.listProducts}>
            {allProducts.map((product, index) => {
              if (index < showing && index + 1 > showing - show ) {
                return <ProductItem
                  _id={product._id}
                  key={product._id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                />
              }
            })}
          </ul>
        ) : (
          <div className='container-loading'>
            <Loading />
          </div>
        )}
      </div>

      
      <div className={styles.pages}>
        {allProducts ? (allProducts.map((product, index) => {
          if (product && allProducts.length > show * index) {
            return <span key={product._id + index} onClick={() => nextProducts(index + 1)} className={`${styles.page} ${page === index + 1 ? styles.activePage : ''}`}>{index + 1}</span>
          }
        })) : ''}
        {allProducts ? (
          <span onClick={() => nextProducts(page + 1)} className={styles.next}>Next</span>
        ) : (
          ''
        )}
      </div>
    </section>
  )
}

export default ShopProducts