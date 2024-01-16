import { BrowserRouter } from "react-router-dom"
import { Router } from "./Router"
import { ThemeProvider} from 'styled-components'
import { DefaultTheme } from "./styles/theme/default"
import { GlobalStyle } from "./styles/global"
import { AuthFornecedor } from "./context/authentication"


export function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <BrowserRouter>
      <AuthFornecedor>
        <Router />
        <GlobalStyle />
      </AuthFornecedor>
      </BrowserRouter>
    </ThemeProvider>
  )
}
