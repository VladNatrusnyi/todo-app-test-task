import styles from './ThemeButton.module.css'
import {useDispatch, useSelector} from "react-redux"
import {setTheme} from "../../store/themeSlice"

export const ThemeButton = () => {
  const dispatch = useDispatch()
  const theme = useSelector(state => state.theme)
  const isLightTheme = theme === 'light'

  const changeTheme = () => dispatch(setTheme(isLightTheme ? 'dark' : 'light'))


  return (
    <div className={styles.themeButton} onClick={changeTheme}>
      {isLightTheme ? <i className="bi bi-brightness-high-fill"></i> : <i className="bi bi-moon-stars"></i>}
    </div>
  )
}
