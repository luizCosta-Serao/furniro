import React from 'react'
import styles from './Button.module.css'

type BtnProps = {
  children: React.ReactNode;
  onClick?: () => void;
  width?: number;
  height?: number;
}

const Button = ({
  children,
  onClick,
  width,
  height
}: BtnProps ) => {
  return (
    <button
    style={{width: `${width}px`, height: `${height}px`}}
      onClick={onClick}
      className={styles.globalBtn}
    >
      {children}
    </button>
  )
}

export default Button