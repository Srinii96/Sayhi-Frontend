import { useReducer, useEffect, useState } from "react"
import { Container, Row, Alert} from "react-bootstrap"
import { useDispatch } from "react-redux"
import "./App.css"
import axios from "./config/axios"
import Header from "./Components/Header/Header"
import Main from "./Components/Main/Main"
import Footer from "./Components/Footer/Footer"
import reducer from "./useReducers/useReducer"
import reducerContext from "./contextApi's/contextAPI"
import { startGetUserData } from "./redux/actions/user-actions"


function App() {
  const reduxDispatch = useDispatch()

  const [state, dispatch] = useReducer(reducer, { toggle: true, categories:[], userLoggedIn: false, search: "" })

  const [error, setError] = useState("")

  useEffect(()=>{
    (async ()=>{
        try{
          const categories = await axios.get("/api/category")
          dispatch({
            type: "SET_CATEGORIES",
            payload: categories.data
          })
        }catch(err){
          setError(err.message)
        }
      }
    )()
  }, [dispatch])

  useEffect(()=>{
    if(localStorage.length > 0){
      reduxDispatch(startGetUserData())
    }
  }, [reduxDispatch, state.userLoggedIn])

  return (
    <div className="custom_font">
      <div className="error-container">
        {error && (
          <Alert variant="danger" className="custom-alert-width">
            Error occurred: {error}
          </Alert>
        )}
      </div>

      <reducerContext.Provider value={{state, dispatch}}>
        
        <Container fluid className="custom_header">
          <Row>
              <Header />
          </Row>
        </Container>

        <Container fluid className="custom_main">
          <Row>
              <Main />
          </Row>
        </Container>

        <Container fluid className="custom_footer">
          <Row>
            <Footer />
          </Row>
        </Container>
      </reducerContext.Provider>
    </div>
  )
}

export default App
