import Categories from '../components/Home/Categories/Categories'
import Hero from '../components/Home/Hero/Hero'
import Inspiration from '../components/Home/Inspiration/Inspiration'
import Products from '../components/Home/Products/Products'

const Home = () => {
  return (
    <main>
      <Hero />
      <Categories />
      <Products />
      <Inspiration />
    </main>
  )
}

export default Home