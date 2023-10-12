import {Form} from "react-bootstrap"
import * as yup from 'yup'
import {useFormik} from "formik"
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {clearModal, setIsSendFromModal} from "../../store/modalSlice"


export const TodoForm = (
  {
    createOrUpdateTask,
    initialValues
  }
) => {
  const dispatch = useDispatch()
  const isSendFromModal = useSelector(state => state.modal.isSendFromModal)

  const schema = yup.object().shape({
    title: yup.string().trim().required().min(1),
    body: yup.string().trim().required().min(1),
  })


  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: values => {
      createOrUpdateTask(values)
      formik.resetForm()
      dispatch(clearModal())
    }
  })

  useEffect(() => {
    if (isSendFromModal) {
      submitForm()
    }
  }, [isSendFromModal])


  const submitForm = () => {
    formik.handleSubmit()
    dispatch(setIsSendFromModal(false))
  }


  return (
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Task title</Form.Label>
          <Form.Control
            placeholder="Task title"
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            isValid={formik.touched.title && !formik.errors.title}
            isInvalid={!!formik.errors.title}
          />
          <Form.Control.Feedback type="invalid">
            Please write title.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Task description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="body"
            value={formik.values.body}
            onChange={formik.handleChange}
            isValid={formik.touched.body && !formik.errors.body}
            isInvalid={!!formik.errors.body}
            style={{ whiteSpace: 'pre-wrap' }}
          />
          <Form.Control.Feedback type="invalid">
            Please write description.
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
  )
}
