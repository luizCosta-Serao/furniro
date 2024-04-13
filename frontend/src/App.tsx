import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import { ProductsProvider } from './context/ProductsContext'
import SingleProduct from './pages/SingleProduct'
import Checkout from './pages/Checkout'
import CheckoutSuccess from './pages/CheckoutSuccess'
import Contact from './pages/Contact'
import About from './pages/About'
import Favorites from './pages/Favorites'

function App() {

  return (
    <ProductsProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/shop/:id' element={<SingleProduct />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/checkout-success' element={<CheckoutSuccess />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ProductsProvider>
  )
}

export default App
