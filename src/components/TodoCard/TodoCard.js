import {Badge, Button, Card, Form, Stack} from "react-bootstrap"
import {ExpandableContainer} from "../ExpandableContainer/ExpandableContainer"
import {useEffect, useRef, useState} from "react"
import styles from './TodoCard.module.css'
import {setModalShow} from "../../store/modalSlice"
import {useDispatch} from "react-redux"
import {changeTaskStatus, deleteTodo} from "../../store/todosSlice"
import {DeleteModal} from "../../DeleteModal/DeleteModal"
import {setNotificationData} from "../../store/notificationSlice"

export const TodoCard = ({todoData}) => {
  const dispatch = useDispatch()
  const blockRef = useRef(null)
  const [isShowControllers, setIsShowControllers] = useState(false)

  useEffect(() => {
    if (blockRef.current) {
      const height = blockRef.current.clientHeight
      if (height >= 30) {
        setIsShowControllers(true)
      } else {
        setIsShowControllers(false)
      }
    }
  }, [todoData])

  const updateTask = () => dispatch(setModalShow({
    isOpen: true,
    actionType: {type: 'update', taskId: todoData.id}}
  ))

  const deleteTask = () => {
    dispatch(deleteTodo(todoData.id))
    dispatch(setNotificationData({
      text: 'Task deleted successfully',
      status: 'success'
    }))
  }

  const changeTask = (e) => {
    const isChecked = e.target.checked
    dispatch(changeTaskStatus({
      todoId: todoData.id,
      status: isChecked
    }))
  }


  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)

  const closeModal = () => setIsModalOpen(false)
  return (
    <>
      <DeleteModal
        isShow={isModalOpen}
        onClickOk={deleteTask}
        closeModal={closeModal}
        content={{
          title: 'Delete confirmation',
          body: `Are you sure you want to delete the task: "${todoData.title}"?`,
          okBtnName: 'Delete'
        }}
      />
      {
        todoData &&
        <Card
          border={todoData.completed && 'success'}
          className={'mb-3'}
        >
          <Card.Header>
            <Stack direction="horizontal" gap={3}>
              <Form>
                <Form.Check // prettier-ignore
                  type="checkbox"
                  id={'custom-checkbox' + todoData.id}
                  checked={todoData.completed}
                  onChange={changeTask}
                />
              </Form>
              <div className={styles.title}>{todoData.title}</div>
              {todoData.completed && <Badge bg="success">Done</Badge>}
              <Button
                onClick={updateTask}
                size="sm"
                className="ms-auto"
                variant="outline-secondary"
              >
                Edit
              </Button>
              <Button
                onClick={openModal}
                size="sm"
                variant="outline-danger"
              >
                Delete
              </Button>
            </Stack>
          </Card.Header>
          <Card.Body>
            <ExpandableContainer
              isShowControllers={isShowControllers}
            >
              <div ref={blockRef}>
                <pre>
                  {todoData.body}
                </pre>
              </div>
            </ExpandableContainer>
          </Card.Body>
        </Card>
      }
    </>
  )
}
