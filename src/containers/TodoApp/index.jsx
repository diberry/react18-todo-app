import styled from '@emotion/styled'
import produce from 'immer'
import { nanoid } from 'nanoid'
import { useEffect, useReducer, useRef } from 'react'
import { flushSync } from 'react-dom'
import { useParams } from 'react-router-dom'
import { useLocalStorage } from 'react-use'
import {
  Footer,
  FooterLeftContent,
  FooterRightButton,
  FooterTabItem,
  FooterTabs,
} from '../../components/Footer'
import { Input } from '../../components/Input'
import {
  TodoItem,
  TodoItemCheckBox,
  TodoItemContent,
  TodoItemContentEdit,
  TodoItemRemoveButton,
} from '../../components/TodoItem'

const Container = styled.div`
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MainCard = styled.div`
  width: 550px;
  border-radius: 2px;
  box-shadow: 0 7px 6px -5px rgba(0, 0, 0, 0.08), 0 10px 0 -5px white,
    0 11px 0 -5px gainsboro, 0 11px 0 -5px gainsboro,
    0 14px 6px -10px rgba(0, 0, 0, 0.08), 0 20px 0 -10px white,
    0 21px 0 -10px gainsboro, 0 21px 4px -10px rgba(0, 0, 0, 0.2),
    0 0 4px rgba(0, 0, 0, 0.1), 0 10px 30px rgba(0, 0, 0, 0.1);

  .todoItem .todoRemoveButton {
    visibility: hidden;
  }
  .todoItem:hover .todoRemoveButton {
    visibility: visible;
  }
  .todoItem:focus-within .todoRemoveButton {
    visibility: visible;
  }
`

const ListContainer = styled.div`
  max-height: 40vh;
  overflow-y: auto;
`

const Status = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
}

function todoReducer(state, { type, input, id, editMode, checked }) {
  const updateState = (updater) => produce(updater)(state)

  switch (type) {
    case 'input': {
      return updateState((prev) => {
        prev.input = input
      })
    }
    case 'checkAll': {
      const allChecked =
        !!state.list.length && state.list.every((item) => item.checked)

      return updateState((prev) => {
        if (allChecked) {
          prev.list.forEach((item) => (item.checked = false))
        } else {
          prev.list.forEach((item) => (item.checked = true))
        }
      })
    }
    case 'editItemContent': {
      return updateState((prev) => {
        const found = prev.list.find((item) => item.id === id)
        found.content = input
      })
    }
    case 'editMode': {
      return updateState((prev) => {
        const found = prev.list.find((item) => item.id === id)
        found.editMode = editMode
      })
    }
    case 'checkbox': {
      return updateState((prev) => {
        const found = prev.list.find((item) => item.id === id)
        found.checked = checked
      })
    }
    case 'remove': {
      return updateState((prev) => {
        prev.list = prev.list.filter((item) => item.id !== id)
      })
    }
    case 'add': {
      return updateState((prev) => {
        prev.input = ''
        prev.list.push({
          id: nanoid(),
          checked: false,
          content: state.input.trim(),
          editMode: false,
        })
      })
    }
    case 'clearCompleted': {
      return updateState((prev) => {
        prev.list = prev.list.filter((item) => !item.checked)
      })
    }
    default:
      throw new Error(`Unhandled action type: ${type}`)
  }
}

const defaultState = {
  input: '',
  list: [
    {
      id: nanoid(),
      checked: false,
      content: 'hello world',
      editMode: false,
    },
  ],
}

export function TodoApp() {
  const { status = Status.ALL } = useParams()
  const [todoAppStorage, setTodoAppStorage] = useLocalStorage(
    'TODO_APP_CACHE',
    defaultState
  )
  const [state, dispatch] = useReducer(todoReducer, todoAppStorage)
  const listContainerRef = useRef()

  useEffect(() => {
    setTodoAppStorage(state)
  }, [state, setTodoAppStorage])

  const checkedItems = state.list.filter((item) => item.checked)
  const total = state.list.length
  const allChecked =
    !!state.list.length && state.list.every((item) => item.checked === true)
  const currentList = {
    [Status.ALL]: state.list,
    [Status.ACTIVE]: state.list.filter((item) => !item.checked),
    [Status.COMPLETED]: state.list.filter((item) => item.checked),
  }[status]

  function handleInput({ target: { value } }) {
    dispatch({ type: 'input', input: value })
  }

  function handleCheckAll() {
    dispatch({ type: 'checkAll' })
  }

  function handleEditItemContent(id) {
    return ({ target: { value } }) => {
      dispatch({
        type: 'editItemContent',
        id,
        input: value,
      })
    }
  }

  function handleDbClickItemContent(id) {
    return () => {
      dispatch({
        type: 'editMode',
        id,
        editMode: true,
      })
    }
  }

  function handleItemContentBlur(id) {
    return () => {
      dispatch({
        type: 'editMode',
        id,
        editMode: false,
      })
    }
  }

  function handleItemCheckbox(id) {
    return (checked) => {
      dispatch({
        type: 'checkbox',
        id,
        checked,
      })
    }
  }

  function handleClickItemRemoveButton(id) {
    return () => {
      dispatch({
        type: 'remove',
        id,
      })
    }
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const { input } = state
    if (!!input.trim()) {
      flushSync(() => {
        dispatch({
          type: 'add',
        })
      })
      const el = listContainerRef.current
      const { scrollHeight } = el
      el.scrollTo(0, scrollHeight)
    }
  }

  function handleClickClearCompleted() {
    dispatch({ type: 'clearCompleted' })
  }

  return (
    <Container className="TodoApp">
      <MainCard>
        <form onSubmit={handleSubmit}>
          <Input
            value={state.input}
            onChange={handleInput}
            allChecked={allChecked}
            onCheckAll={handleCheckAll}
          />
        </form>

        <ListContainer ref={listContainerRef}>
          {currentList.map((item) => (
            <TodoItem key={item.id} className="todoItem">
              <TodoItemCheckBox
                checked={item.checked}
                onChange={handleItemCheckbox(item.id)}
              />
              {item.editMode ? (
                <TodoItemContentEdit
                  value={item.content}
                  onChange={handleEditItemContent(item.id)}
                  onBlur={handleItemContentBlur(item.id)}
                />
              ) : (
                <TodoItemContent
                  onDoubleClick={handleDbClickItemContent(item.id)}
                  completed={item.checked}
                >
                  {item.content}
                </TodoItemContent>
              )}
              <TodoItemRemoveButton
                className="todoRemoveButton"
                onClick={handleClickItemRemoveButton(item.id)}
              />
            </TodoItem>
          ))}
        </ListContainer>

        <Footer>
          {!!total && (
            <FooterLeftContent>
              {total} item{total > 1 && 's'} left
            </FooterLeftContent>
          )}
          <FooterTabs>
            <FooterTabItem to="/">All</FooterTabItem>
            <FooterTabItem to={`/${Status.ACTIVE}`}>
              {Status.ACTIVE}
            </FooterTabItem>
            <FooterTabItem to={`/${Status.COMPLETED}`}>
              {Status.COMPLETED}
            </FooterTabItem>
          </FooterTabs>
          {!!checkedItems.length && (
            <FooterRightButton onClick={handleClickClearCompleted} />
          )}
        </Footer>
      </MainCard>
    </Container>
  )
}
