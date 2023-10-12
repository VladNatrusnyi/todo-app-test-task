import {Form, InputGroup} from "react-bootstrap"
import {filterTypes} from "../../data/filterTypes"
import {useDispatch, useSelector} from "react-redux"
import {setFilterValue} from "../../store/todosSlice"

export const TaskFilter = () => {
  const dispatch = useDispatch()
  const filterValue = useSelector(state => state.todos.filterValue)

  const changeSelectValue = (event) => dispatch(setFilterValue(event.target.value))
  return (
    <InputGroup>
      <Form>
        <Form.Select
          value={filterValue}
          onChange={changeSelectValue}
          aria-label="Filter select"
        >
          {
            filterTypes.map(el => {
              return <option key={el.value} value={el.value}>{el.title}</option>
            })
          }
        </Form.Select>
      </Form>
      <InputGroup.Text><i className="bi bi-funnel"></i></InputGroup.Text>
    </InputGroup>
  )
}
