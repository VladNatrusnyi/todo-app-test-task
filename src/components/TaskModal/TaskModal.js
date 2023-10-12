import {Button, Modal} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import {TodoForm} from "../TodoForm/TodoForm"
import {setIsSendFromModal} from "../../store/modalSlice"
import {useMemo} from "react"
import {createTodo, updateTodo} from "../../store/todosSlice"
import {setNotificationData} from "../../store/notificationSlice"

export const TaskModal = (props) => {
  const dispatch = useDispatch()
  const theme = useSelector(state => state.theme)
  const modalSettingData = useSelector(state => state.modal.modalSettingData)
  const todos = useSelector(state => state.todos.todos)


  const modalConfig = useMemo(() => {
    if (modalSettingData) {
      if (modalSettingData.type === 'update' && modalSettingData.taskId) {
        const currentTodo = todos.find(todo => todo.id === modalSettingData.taskId)
        return {
          title: 'Task editing',
          type: 'update',
          todoId: currentTodo.id,
          todoData: {
            title: currentTodo.title,
            body: currentTodo.body,
          },
          submitBtnName: 'Save changes'
        }
      } else if (modalSettingData.type === 'create') {
        return {
          title: 'Task creating',
          type: 'create',
          todoData: {
            title: '',
            body: '',
          },
          submitBtnName: 'Create task'
        }
      }
    }
  }, [modalSettingData, todos])



  const createOrUpdateTask = (values) => {
    if (modalConfig.type === 'update') {
      const areEqual = JSON.stringify(values) === JSON.stringify(modalConfig.todoData)
      if (areEqual) {
        dispatch(setNotificationData({
          text: 'You have not made any changes to the task',
          status: 'secondary'
        }))
      } else {
        dispatch(updateTodo({
          todoId: modalConfig.todoId,
          title: values.title,
          body: values.body,
        }))
        dispatch(setNotificationData({
          text: 'Task changed successfully',
          status: 'success'
        }))
      }
    } else {
        dispatch(createTodo({
          id: new Date().toISOString(),
          title: values.title,
          body: values.body,
          completed: false
        }))
      dispatch(setNotificationData({
        text: 'Task created successfully',
        status: 'success'
      }))
    }


  }

  const submitForm = () => dispatch(setIsSendFromModal(true))

  return (
    <>
      {modalConfig &&
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          contentClassName={ theme === 'dark' && 'dark-modal'}
          data-bs-theme={theme}
        >
          <Modal.Header
            closeButton
            closeVariant={ theme !== 'dark' ? 'dark': 'white' }
          >
            <Modal.Title id="contained-modal-title-vcenter">
              {modalConfig.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TodoForm
              createOrUpdateTask={createOrUpdateTask}
              initialValues={modalConfig.todoData}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={props.onHide}
            >
              Close
            </Button>
            <Button
              variant="info"
              onClick={submitForm}
            >
              {modalConfig.submitBtnName}
            </Button>
          </Modal.Footer>
        </Modal>
      }
    </>
  )
}
