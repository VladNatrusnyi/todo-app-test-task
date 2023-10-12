import {Container} from "react-bootstrap"
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {setTheme} from "../../store/themeSlice"
import {Header} from "../../components/Header/Header"

export const MainLayout = ({children}) => {
  const dispatch = useDispatch()
  const theme = useSelector(state => state.theme)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      dispatch(setTheme(savedTheme))
    } else {
      dispatch(setTheme('light'))
    }
  }, [])

  return (
    <div>
      <Container
        fluid
        data-bs-theme={theme}
        className={`App ${theme} vh-100 pt-5`}
      >
        <Header />
        {children}
      </Container>
    </div>
  )
}
