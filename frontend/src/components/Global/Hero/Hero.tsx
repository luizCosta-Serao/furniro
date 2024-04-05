import styles from './Hero.module.css'

type HeroProps = {
  title: string;
  firstPath: string;
  secondPath: string;
}

const Hero = ({
  title,
  firstPath,
  secondPath
}: HeroProps ) => {
  return (
    <section className={styles.hero}>
      <h1>{title}</h1>
      <p>{firstPath} {'>'} <span>{secondPath}</span></p>
    </section>
  )
}

export default Hero