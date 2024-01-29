import s from './Footer.module.css'
import { Button, Logo } from '#/components/ui'
import { Github, Facebook, Twitter, Linkedin, X } from 'lucide-react'

const Footer = () => {
  const socialMedia = [
    {
      id: 'github',
      name: 'Github',
      link: 'https://github.com/rifkidhan',
      icon: <Github size={16} />
    },
    {
      id: 'linkedin',
      name: 'Linkedin',
      link: 'https://linkedin.com/in/rifkidhan',
      icon: <Linkedin size={16} />
    },
    {
      id: 'twitter',
      name: 'Twitter',
      link: 'https://twitter.com/rifkidhan',
      icon: <Twitter size={16} />
    },
    {
      id: 'facebook',
      name: 'Facebook',
      link: 'https://facebook.com/rifki303',
      icon: <Facebook size={16} />
    }
  ]

  const years = new Date().getFullYear().toString()

  return (
    <footer className={s.root}>
      <div className={s.wrapper}>
        <div className={s.items}>
          <Logo className="w-7 md:w-10" />
          <div>© {years}, Rifkidhan</div>
        </div>
        <div className={s.items}>
          {socialMedia.map((item) => (
            <Button
              Component="a"
              icons={item.icon}
              variant="circle"
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Rifkidhan's ${item.name}`}
              key={item.id}
              title={item.name}
            />
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
