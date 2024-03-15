import React from 'react'
import styles from './Button.module.css'

type BtnProps = {
  children: React.ReactNode
  onClick?: () => void
}

const Button = ({
  children,
  onClick
}: BtnProps ) => {
  return (
    <button
      onClick={onClick}
      className={styles.globalBtn}
    >
      {children}
    </button>
  )
}

export default Button