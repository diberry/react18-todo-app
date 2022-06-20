import styled from '@emotion/styled'
import { rgba } from 'polished'
import { NavLink } from 'react-router-dom'
import { Cell } from './Cell'

export const Footer = styled(Cell)`
  justify-content: center;
  font-size: 14px;
  color: grey;
  position: relative;
  padding: 10px 16px;
  border-top: 1px solid gainsboro;
`

export const FooterLeftContent = styled.div`
  position: absolute;
  left: 20px;
`

export const FooterRightButton = styled.button`
  position: absolute;
  right: 20px;
  text-align: right;
  cursor: pointer;
  border: none;
  background-color: ${rgba('tomato', 0.1)};
  color: tomato;
  padding: 8px 12px;
  border-radius: 4px;
`
FooterRightButton.defaultProps = {
  children: 'Clear completed',
}

export const FooterTabs = styled.div`
  display: flex;
  gap: 10px;
`

export const FooterTabItem = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: currentColor;
  padding: 8px 12px;
  border-radius: 4px;
  text-transform: capitalize;

  &.active {
    box-shadow: 0 0 0 1px mediumaquamarine;
    color: mediumaquamarine;
  }

  &:not(.active):hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`
