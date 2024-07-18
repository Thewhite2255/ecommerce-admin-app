import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { LoginButton } from '../components/GoogleBtn'

const Home = () => {
  const [user, setUser] = useState(null)
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get('/api/auth/user')
        if (res.data.success) {
          setUser(res.data.user)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getUserData()
  }, [])

  const handleLogout = async () => {
    try {
      const res = await axios.post('/api/auth/logout')

      if (res.data.success) {
        setUser(null)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (!isLogged) {
    return (
      <div className="min-h-screen mx-auto max-w-md">
        <div className="flex flex-col gap-2 py-12">
          <h1>Connexion</h1>
          <LoginButton />
          <button
            onClick={() => setIsLogged(true)}
            className="px-3 py-2 w-full flex ring-1 ring-gray-300/90 bg-white text-gray-700 rounded hover:ring-blue-300/40 hover:bg-blue-50/50"
          >
            <span className="text-sm flex-grow text-gray-900 tracking-wide">
              Rester déconnecter
            </span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <h1>Dashboard</h1>
      {user && (
        <div className="text-blue-900 flex justify-between">
          <h2>
            Hello, <b>{user.name}</b>
          </h2>
          <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
            <img
              src={user.picture}
              alt="avatar"
              className="w-6 h-6 object-cover"
            />
            <span className="px-2">{user.name}</span>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Home
