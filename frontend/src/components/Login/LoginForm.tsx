import React, { FormEvent } from "react"
import styles from './LoginForm.module.css'
import { useUser } from "../../context/useUser"
import { useNavigate } from "react-router-dom"
import Loading from "../Helper/Loading"

const LoginForm = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { loginUser, error, loading } = useUser()
  const navigate = useNavigate()

  async function login(e: FormEvent) {
    const response = await loginUser(email, password, e)
    if (response === true) {
      navigate('/')
      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      })
    }
  }

  return (
    <section className={`${styles.loginForm} container`}>
      <form method="POST" className={styles.form} onSubmit={login}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p style={{color: 'red', marginBottom: '1rem', fontWeight: '500', fontSize: '1.1rem'}}>{error}</p>}
        {loading ? (
          <div className="container-loading" style={{marginTop: '0px', marginBottom: '0px'}}>
            <Loading />
          </div>
        ) : (
          <button className={styles.submit} type="submit">Login</button>
        )}
      </form>
    </section>
  )
}

export default LoginForm