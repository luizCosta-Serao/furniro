import React from 'react'
import styles from './Fail.module.css'

const Fail = ({
  children
}: React.PropsWithChildren ) => {

  return (
    <div className={styles.fail}>
      <h1>{children}</h1>
    </div>
  )
}

export default Fail