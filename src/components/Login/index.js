import {useState} from 'react'
import {useNavigate, Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import './index.css'

const Login = () => {
  const [username, setUsername] = useState('rahul')
  const [password, setPassword] = useState('rahul@2021')
  const [errorMsg, setErrorMsg] = useState('')
  const [showError, setShowError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  // Check if user is already logged in
  if (Cookies.get('jwt_token')) {
    return <Navigate to="/" replace />
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    navigate('/', {replace: true})
  }

  const onSubmitFailure = errorMsg => {
    setShowError(true)
    setErrorMsg(errorMsg)
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()

      if (response.ok) {
        onSubmitSuccess(data.jwt_token)
      } else {
        onSubmitFailure(data.error_msg)
      }
    } catch (error) {
      onSubmitFailure('Something went wrong. Please try again.')
    }
  }

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState)
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submitForm}>
        <h1 className="login-heading">Login</h1>
        <div className="input-container">
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            className="input-field"
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">PASSWORD</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="input-field"
            />
            <button
              type="button"
              className="toggle-password-button"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="eye-icon" />
              ) : (
                <AiOutlineEye className="eye-icon" />
              )}
            </button>
          </div>
        </div>
        {showError && <p className="error-message">{errorMsg}</p>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login 