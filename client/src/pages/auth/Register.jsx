import { useState, useEffect } from 'react'
import Input from '../../components/Input'
import { Link } from 'react-router-dom'
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isFormValid, setIsFormValid] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

    const processedValue =
      name === 'username' ? value.replace(/\s/g, '_') : value

    if (name === 'username') {
      const usernameRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\s\d_.]{3,20}$/
      if (!usernameRegex.test(value)) {
        error =
          "Le nom d'utilisateur doit contenir entre 3 et 20 caractères, des lettres, des chiffres, des tirets et des underscores."
      }
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        error = 'Adresse email invalide'
      }
    }

    if (name === 'password') {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s]{8,}$/

      if (!passwordRegex.test(value)) {
        error =
          'Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre'
      }
    }

    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        error = 'Les mots de passe ne correspondent pas'
      }
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }))
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
              <h1 className="text-2xl font-bold">Inscription</h1>
            </div>
          </div>
          <div className="my-6">
            <div className="mb-4">
              <Input
                label="Nom complet"
                type="text"
                name="fullName"
                onChange={handleChange}
                value={formData['fullName']}
                errorMsg={errors.fullName}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Nom d'utilisateur"
                type="text"
                name="username"
                onChange={handleChange}
                value={formData['username']}
                errorMsg={errors.username}
              />
            </div>
            <div className="mb-4">
              <Input
                label="E-mail"
                type="text"
                name="email"
                onChange={handleChange}
                value={formData['email']}
                errorMsg={errors.email}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Mot de passe"
                type="password"
                name="password"
                onChange={handleChange}
                value={formData['password']}
                errorMsg={errors.password}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Confirmer le mot de passe"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                rightIcon={
                  showConfirmPassword ? (
                    <MdOutlineVisibilityOff
                      className="w-5 h-5 cursor-pointer"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  ) : (
                    <MdOutlineVisibility
                      className="w-5 h-5 cursor-pointer"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  )
                }
                onChange={handleChange}
                value={formData['confirmPassword']}
                errorMsg={errors.confirmPassword}
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
              S'inscrire
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>Vous avez déjà un compte ?</span>{' '}
            <Link
              to="/login"
              className="text-primary font-semibold  hover:underline"
            >
              Connexion
            </Link>
          </div>
          <div className="hidden m-4 flex items-center justify-center gap-2">
            <div className="border-t flex-grow"></div>
            <span>OU</span>
            <div className="border-t flex-grow"></div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
