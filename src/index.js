import React from "react"
import ReactDOM from "react-dom/client"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { BrowserRouter } from "react-router-dom"
import { SnackbarProvider} from "notistack"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Provider } from "react-redux"
import "./index.css"
import App from "./App"
import configureStore from './redux/store/configure-store'

const store = configureStore()

// console.log('state', store.getState())

// store.subscribe(()=>{
//   console.log('state updated', store.getState())
// })

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <App />
        <ToastContainer />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>
)
