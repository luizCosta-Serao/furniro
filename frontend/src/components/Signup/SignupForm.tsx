import React, { FormEvent } from 'react'
import styles from './SignupForm.module.css'
import { url } from '../../api'
import Success from '../Helper/Success';
import { Link } from 'react-router-dom';
import Loading from '../Helper/Loading';

type ErrorRegister = {
  error: string;
}

const SignupForm = () => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  async function RegisterUser(e: FormEvent) {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)
      const response = await fetch(`${url}/auth/register`, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword
        })
      })
      if (!response.ok) {
        const json = await response.json() as ErrorRegister
        throw new Error(json.error)
      }
      setSuccess(true)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        }
        setSuccess(false)
      } finally {
        setLoading(false)
        window.setTimeout(() => {
          setSuccess(false)
        }, 3000)
      }
  }

  return (
    <section className={`${styles.signupForm} container`}>
      <form onSubmit={RegisterUser} className={styles.form}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label htmlFor="confirmPassword">Confirm password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        {error && <p style={{color: 'red', marginBottom: '1rem', fontWeight: '500', fontSize: '1.1rem'}}>{error}</p>}
        {success && <Success>{name} successfully registered</Success>}
        {loading ? (
          <Loading />
        ) : (
          <div className={styles.signupAndLogin}>
            <button type='submit' className={styles.submit}>Register</button>
            <span>Or</span>
            <Link className={styles.login} to={'/login'}>Login</Link>
          </div>
        )}
      </form>
    </section>
  ) 
}

export default SignupForm