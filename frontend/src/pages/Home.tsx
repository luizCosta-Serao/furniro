import Categories from '../components/Home/Categories/Categories'
import Hero from '../components/Home/Hero/Hero'
import Inspiration from '../components/Home/Inspiration/Inspiration'
import Products from '../components/Home/Products/Products'
import ShareSetup from '../components/Home/ShareSetup/ShareSetup'

const Home = () => {
  return (
    <main>
      <Hero />
      <Categories />
      <Products />
      <Inspiration />
      <ShareSetup />
    </main>
  )
}

export default Home