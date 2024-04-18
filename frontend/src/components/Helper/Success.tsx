import React from 'react'
import styles from './Success.module.css'

const Success = ({
  children
}: React.PropsWithChildren) => {
  return (
    <div className={styles.success}>
      <h1>{children}</h1>
    </div>
  )
}

export default Success