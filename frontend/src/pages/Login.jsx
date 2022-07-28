import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  } 

  const hanldeSubmit = (e) => {
    e.preventDefault()
  } 

  return (
    <div className="register">
      <Link to='/' style={{textDecoration: "none"}}>
        <h6>Go Back</h6>
      </Link>
      <section className="subHead">
        <h1>Login</h1>
      </section>

      <section className="form">
        <form onSubmit={hanldeSubmit}>
          <div>
            <input type="email" id="email" name='email' value={email}
            placeholder='Enter your email' onChange={handleChange}/>
           </div>
           <div>
            <input type="password" id="password" name='password' value={password}
            placeholder='Enter password' onChange={handleChange}/>
           </div>
           <div>
              <button type="submit">Submit</button>
            </div>
        </form>
      </section>
      <span>
        <Link to='/register'>
          <p>Register here</p>
        </Link>
      </span>
    </div>
  )
}
