import { useEffect, useState } from 'react'
import Input from '../../components/Input'
import { Link } from 'react-router-dom'
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'
import { LoginButton } from '../../components/GoogleBtn'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [isFormValid, setIsFormValid] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const noErrors = Object.values(errors).every((error) => error === '')
    const allFieldsFilled = Object.values(formData).every(
      (value) => value !== ''
    )
    setIsFormValid(noErrors && allFieldsFilled)
  }, [errors, formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    let error = ''

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        error = 'Adresse email invalide'
      }
    }

    if (name === 'password') {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      if (!passwordRegex.test(value)) {
        error =
          'Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre'
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value.trim() }))
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="wrapper min-h-screen bg-primary">
      <div className="max-w-xl mx-auto p-8">
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="p-6 bg-white rounded-md shadow-md"
        >
          <div className="text-center">
            <div className="mb-6">Logo</div>
            <div>
              <h1 className="text-2xl font-bold">Connexion</h1>
            </div>
          </div>
          <div className="my-6">
            <div className="mb-4">
              <Input
                label="Email"
                type="text"
                name="email"
                autoComplete="on"
                onChange={handleChange}
                value={formData['email']}
                errorMsg={errors.email}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Mot de passe"
                type="text"
                name="password"
                onChange={handleChange}
                value={formData['password']}
                errorMsg={errors.password}
                rightIcon={
                  showPassword ? (
                    <MdOutlineVisibilityOff
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <MdOutlineVisibility
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )
                }
              />
            </div>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full h-10 rounded-md font-semibold text-white ${
                isFormValid
                  ? 'bg-primary active:bg-blue-700'
                  : 'bg-accent-dark cursor-not-allowed'
              }`}
            >
              Se connecter
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>Vous n'avez pas de compte ?</span>{' '}
            <Link
              to="/register"
              className="text-primary font-semibold hover:underline"
            >
              Inscription
            </Link>
          </div>
          <div className=" m-4 flex items-center justify-center gap-2">
            <div className="border-t flex-grow"></div>
            <span>OU</span>
            <div className="border-t flex-grow"></div>
          </div>
          <LoginButton />
        </form>
      </div>
    </div>
  )
}

export default Login
