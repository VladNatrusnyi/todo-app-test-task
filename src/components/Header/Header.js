import {Button, Container, Navbar} from "react-bootstrap"
import {ThemeButton} from "../ThemeButton/ThemeButton"
import {setModalShow} from "../../store/modalSlice"
import {useDispatch} from "react-redux"
import {TaskFilter} from "../TaskFilter/TaskFilter"

export const Header = () => {
  const dispatch = useDispatch()
  const createTask = () => dispatch(setModalShow({isOpen: true, actionType: {type: 'create'}}))

  return (
    <Navbar
      fixed="top"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand>Todo list</Navbar.Brand>
        <Button
          onClick={createTask}
          variant="info"
        >
          Create task
        </Button>
        <div className={'d-flex justify-content-between align-items-center gap-5'}>
          <TaskFilter />
          <ThemeButton />
        </div>
      </Container>
    </Navbar>
  )
}
