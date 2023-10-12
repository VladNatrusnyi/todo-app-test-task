import { Toast, ToastContainer} from "react-bootstrap"
import {setNotificationData} from "../../store/notificationSlice"
import {useDispatch, useSelector} from "react-redux"

export const Notification = () => {
  const dispatch = useDispatch()
  const notificationData = useSelector(state => state.notification.notificationData)

  const close = () => {
    dispatch(setNotificationData(null))
  }
  return (
    <>
      {notificationData &&
        <ToastContainer
          position="bottom-start"
          className="p-3"
        >
          <Toast
            onClose={close}
            bg={notificationData.status}
            animation={true}
            show={!!notificationData}
            delay={3000} autohide
          >
            <Toast.Body>{notificationData.text} !</Toast.Body>
          </Toast>
        </ToastContainer>
      }
    </>
  )
}
