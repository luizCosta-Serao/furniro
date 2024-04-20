import React, { FormEvent } from "react"
import styles from './LoginForm.module.css'
import { useUser } from "../../context/useUser"

const LoginForm = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { loginUser, error } = useUser()

  async function login(e: FormEvent) {
    await loginUser(email, password, e)
  }

  return (
    <section className={`${styles.loginForm} container`}>
      <form className={styles.form} onSubmit={login}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p style={{color: 'red', marginBottom: '1rem', fontWeight: '500', fontSize: '1.1rem'}}>{error}</p>}
        <button className={styles.submit} type="submit">Login</button>
      </form>
    </section>
  )
}

export default LoginForm