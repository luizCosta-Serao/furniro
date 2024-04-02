import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import { ProductsProvider } from './context/ProductsContext'
import SingleProduct from './pages/SingleProduct'

function App() {

  return (
    <ProductsProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/shop/:id' element={<SingleProduct />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ProductsProvider>
  )
}

export default App
