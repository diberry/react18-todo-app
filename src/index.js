import { css, Global } from '@emotion/react'
import { normalize } from 'polished'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <Global
      styles={[
        normalize,
        css`
          html,
          body,
          #root {
            width: 100%;
            height: 100%;
          }

          html {
            background-color: whitesmoke;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
              sans-serif;
          }

          button {
            background: none;
            border: none;
            cursor: pointer;

            &:active {
              opacity: 0.6;
            }
          }
        `,
      ]}
    />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
