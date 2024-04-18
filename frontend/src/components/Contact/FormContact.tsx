import React, { FormEvent } from 'react'
import styles from './FormContact.module.css'
import { url } from '../../api'
import Success from '../Helper/Success'

type ErrorMessage = {
  message: string;
}

const FormContact = () => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [subject, setSubject] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  async function sendMessage(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    try {
      setError(null)
      const response = await fetch(`${url}/contact`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message
        })
      })
      if (!response.ok) {
        const json = await response.json() as ErrorMessage
        throw new Error(json.message)
      }
        setSuccess(true)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
      setSuccess(false)
    } finally {
      window.setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }
  }

  return (
    <form className={styles.formContact}>
      <label htmlFor="name">Your name *</label>
      <input type="text" id='name' name='name' placeholder='Abc' value={name} onChange={(e) => setName(e.target.value)} required />

      <label htmlFor="email">Email address *</label>
      <input type="text" id='email' name='email' placeholder='Abc@def.com' value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label htmlFor="subject">Subject</label>
      <input type="text" id='subject' name='subject' placeholder='This is an optional' value={subject} onChange={(e) => setSubject(e.target.value)} />

      <label htmlFor="message">Message *</label>
      <textarea name="message" id="message" placeholder='Hi! i’d like to ask about' value={message} onChange={(e) => setMessage(e.target.value)} required/>

      {error && <p style={{color: 'red', marginBottom: '1rem', fontWeight: '500', fontSize: '1.1rem'}}>{error}</p>}
      <button className={styles.submit} type='submit' onClick={sendMessage}>Submit</button>
      {success && <Success>Message sent successfully</Success>}
    </form>
  )
}

export default FormContact