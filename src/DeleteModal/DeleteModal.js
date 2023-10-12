import {Button, Modal} from "react-bootstrap"
import {useSelector} from "react-redux"

export const DeleteModal = ({isShow = false, onClickOk, closeModal, content}) => {
  const theme = useSelector(state => state.theme)


  return (
    <Modal
      contentClassName={ theme === 'dark' && 'dark-modal'}
      data-bs-theme={theme}
      show={isShow}
      onHide={closeModal}
    >
      <Modal.Header
        closeButton
        closeVariant={ theme !== 'dark' ? 'dark': 'white' }
      >
        <Modal.Title>{content.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={onClickOk}>
          {content.okBtnName}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
