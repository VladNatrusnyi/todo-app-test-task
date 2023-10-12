import './App.css'
import {useMemo} from "react"
import {Container} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import {useDispatch, useSelector} from "react-redux"
import {MainLayout} from "./layouts/MainLayuot/MainLayout"
import {TodoList} from "./components/TodoList/TodoList"
import {TaskModal} from "./components/TaskModal/TaskModal"
import {setModalShow} from "./store/modalSlice"
import {Notification} from "./components/Notification/Notification"
import {filterTypes} from "./data/filterTypes"


function App() {
  const dispatch = useDispatch()
  const modalShow = useSelector(state => state.modal.modalShow)
  const todos = useSelector(state => state.todos.todos)
  const filterValue = useSelector(state => state.todos.filterValue)


  const todoListData = useMemo(() => {
    const getNoSuchTaskText = (data) => filterTypes.find(el => el.value === data).noSuchTaskText

    switch (filterValue) {
      case '1':
        return {
          data: todos,
          noSuchTaskText: getNoSuchTaskText('1')
        }
      case '2':
        return {
          data: todos.filter(todo => todo.completed),
          noSuchTaskText: getNoSuchTaskText('2')
        }
      case '3':
        return {
          data: todos.filter(todo => !todo.completed),
          noSuchTaskText: getNoSuchTaskText('3')
        }
      default:
        return {
          data: todos,
          noSuchTaskText: getNoSuchTaskText('1')
        }
    }
  }, [todos, filterValue])

  return (
    <MainLayout>
      <Container className={'mt-4'} >
        <Notification />
        <TaskModal
          show={modalShow}
          onHide={() => dispatch(setModalShow({isOpen: false}))}
        />
        <TodoList todos={todoListData.data} notFoundText={todoListData.noSuchTaskText}/>
      </Container>
    </MainLayout>
  )
}

export default App
