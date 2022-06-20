import { css } from '@emotion/css'
import styled from '@emotion/styled'
import { rgba, size } from 'polished'
import React, { useId } from 'react'
import { RiCheckLine, RiCloseLine } from 'react-icons/ri'
import { Cell, CellLeftButton } from './Cell'

const CheckBoxLabel = styled.label`
  ${size(30)}
  border-radius: 50%;
  background-color: none;
  border: 1px solid lightgrey;
  flex-shrink: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    transition: 0.1s;
    opacity: 0;
    transform: scale(0.4);
  }
`

export const TodoItem = styled(Cell)`
  font-size: 24px;
  &:last-of-type {
    border-bottom: none;
  }
`

export function TodoItemCheckBox({ checked, onChange }) {
  const id = useId()

  return (
    <CellLeftButton
      className={css`
        input:checked + label {
          color: mediumaquamarine;
          border-color: mediumaquamarine;
        }
        input:checked + label .icon {
          opacity: 1;
          transform: scale(1);
        }
      `}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(ev) => onChange?.(ev.target.checked)}
        hidden
      />
      <CheckBoxLabel htmlFor={id}>
        <RiCheckLine className="icon" size={20} />
      </CheckBoxLabel>
    </CellLeftButton>
  )
}

export const TodoItemContent = styled.div`
  margin-right: 16px;
  transition: 0.2s;
  position: relative;
  display: flex;
  align-items: center;

  &::after {
    content: '';
    transition: 0.2s;
    display: block;
    position: absolute;
    width: ${(props) => (props.completed ? '100%' : '0')};
    height: 2px;
    background-color: ${(props) =>
      props.completed ? rgba('mediumaquamarine', 0.6) : 'black'};
  }

  ${(props) =>
    props.completed && {
      color: `${rgba('mediumaquamarine', 0.4)}`,
    }}
`
TodoItemContent.defaultProps = {
  children: 'hello',
}

export const TodoItemContentEdit = styled.input`
  border: none;
  flex: 1;
  margin-right: 16px;
  padding: 8px;
`
TodoItemContentEdit.defaultProps = {
  type: 'text',
  autoFocus: true,
}

export const TodoItemRemoveButton = styled.button`
  margin-left: auto;
  ${size(34)}
  border-radius: 50%;
  flex-shrink: 0;
  background-color: ${rgba('tomato', 0.1)};
  display: grid;
  place-items: center;
`
TodoItemRemoveButton.defaultProps = {
  children: <RiCloseLine color="tomato" size={20} />,
}
