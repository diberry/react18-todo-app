import { css, cx } from '@emotion/css'
import { RiCheckDoubleLine } from 'react-icons/ri'
import { Cell, CellLeftButton } from './Cell'

export function Input({ className, onCheckAll, allChecked = false, ...rest }) {
  return (
    <Cell>
      <CellLeftButton type="button" onClick={onCheckAll}>
        <RiCheckDoubleLine
          size={24}
          color={allChecked ? 'mediumaquamarine' : 'gainsboro'}
        />
      </CellLeftButton>

      <input
        type="text"
        placeholder="What needs to be done?"
        autoFocus
        className={cx(
          css`
            border: none;
            flex: 1;
            height: 100%;
            font-size: 24px;

            &:focus {
              outline: none;
            }

            &::placeholder {
              color: rgba(0, 0, 0, 0.2);
              font-style: italic;
            }
          `,
          className
        )}
        {...rest}
      />
    </Cell>
  )
}
