import s from './Footer.module.css'
import { Button, Logo } from '@components/ui'

const Footer = () => {
  const socialMedia = [
    {
      name: 'Github',
      link: 'https://github.com/rifkidhan',
      icon: 'github'
    },
    {
      name: 'Linkedin',
      link: 'https://linkedin.com/in/rifkidhan',
      icon: 'linkedin'
    },
    {
      name: 'Twitter',
      link: 'https://twitter.com/rifkidhan',
      icon: 'twitter'
    },
    {
      name: 'Facebook',
      link: 'https://facebook.com/rifki303',
      icon: 'facebook'
    }
  ]

  return (
    <footer className={s.root}>
      <div className={s.wrapper}>
        <div className={s.items}>
          <Logo className="w-7 md:w-10" />
          <div>© 2023, Rifkidhan</div>
        </div>
        <div className={s.items}>
          {socialMedia.map((items) => (
            <Button
              Component="a"
              icons={items.icon}
              variant="circle"
              href={items.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Rifkidhan's ${items.name}`}
              key={items.name}
              title={items.name}
            />
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
