import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import NewProduct from './pages/NewProduct'
import Orders from './pages/Orders'
import EditProduct from './pages/EditProduct'
import Settings from './pages/Settings'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Categories from './pages/Categories'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/products',
    element: <Products />,
  },
  {
    path: '/products/new',
    element: <NewProduct />,
  },
  {
    path: '/products/edit/:id',
    element: <EditProduct />,
  },
  {
    path: '/categories',
    element: <Categories />,
  },
  {
    path: '/orders',
    element: <Orders />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
