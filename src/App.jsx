//import libreria rotte
import { BrowserRouter, Routes, Route } from "react-router-dom"

//import del GlobalProvider
import { GlobalProvider } from "./context/GlobalContext"

//import Layout
import DefaultLayout from "./layouts/DefaultLayout"
//import NotFound Page
import NotFound from "./pages/NotFound"
//import HomePage, ProductPage e RegionPage
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import RegionPage from "./pages/RegionPage"

function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />} >
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/region/" element={<RegionPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App
