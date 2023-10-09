import s from './Loading.module.css'

const Spinner = () => {
  return (
    <div className={s.loaderRoot}>
      <div className={s.loader}>
        <div />
      </div>
    </div>
  )
}

export default Spinner
