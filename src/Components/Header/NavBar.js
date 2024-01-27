import { useState, useEffect, useContext } from "react"
import { Button, Dropdown, InputGroup, FormControl } from "react-bootstrap"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { useSelector } from "react-redux"
import reducerContext from "../../contextApi's/contextAPI"
import "./style.css"

const NavBar = ()=>{
    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()

    const userData = useSelector((state)=>{
        return state.user.profile
    })

    const showSearchBar = ['/categories-list', '/ServiceProvidersList']
    .some(path => location.pathname.startsWith(path) || location.pathname === '/')
    
    const {state, dispatch} = useContext(reducerContext)

    const [userRole, setUserRole] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    useEffect(()=>{
        if(localStorage.length > 0){
            const {role} = jwtDecode(localStorage.getItem("token"))
            setUserRole(role)
        }
    }, [state.userLoggedIn])

    const toggleDropdown = () => {
        setIsOpen(!isOpen) 
    }

    const handleSearch = (e)=>{
        dispatch({
            type: "SEARCH_CATEGORY",
            payload: e.target.value
        })
    }
    
    const handleLogout = () => {
        localStorage.clear()
        setUserRole("")
        window.location.reload()
        navigate("/")
        dispatch({
            type: "SIGN_IN_TOGGLE",
            payload: !state.toggle
        })
    }

    const defaultPicture = process.env.PUBLIC_URL + '/Images/logos/profile-pic.png'

    return(
        <>
            <div className="col-4">
                <a href="http://localhost:3000">
                    <img 
                        src={process.env.PUBLIC_URL + "/Images/logos/logo.png"} 
                        alt="brand_logo"
                        style={{width: "65px", objectFit: "contain"}}
                    />
                </a>
            </div>

            <div xs={4} className="rounded-pill">
               { showSearchBar && <InputGroup >
                <FormControl
                    type="text"
                    placeholder="Search here..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    value={state.search}
                    onChange={(e) => handleSearch(e)}
                />
                </InputGroup>}
            </div>

            <div className="col-3">
                <Link to="/" className="btn btn-outline-light mx-3">Home</Link>
                <Link to="/categories-list" className="btn btn-outline-light mx-3">Services</Link>
                <Link to="/register-as-a-partner" className="btn btn-outline-light mx-3">Register as a partner</Link>
            </div>

            <div className="col-0">
                {userRole ? (
                    <Dropdown className="user-profile" show={isOpen} onClick={toggleDropdown}>
                        <Dropdown.Toggle className='profile-icon' variant="success" id="dropdown-basic">
                            {/* Placeholder for profile picture */}
                            <img src={userData.profilePicture?.url || defaultPicture} alt="Profile" />
                        </Dropdown.Toggle>

                        {isOpen && <Dropdown.Menu>
                            <Dropdown.Item as={Link} to="/profile/update-profile">Profile</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>}
                    </Dropdown>
                ) : (
                    <Button className="btn btn-light rounded-pill" 
                        onClick={()=>{
                        dispatch({
                            type: "SIGN_IN_TOGGLE",
                            payload: !state.toggle
                        })
                    }}>
                        <Link to={state.toggle ? '/sign-up' : '/sign-in'} className="text-black">
                            {state.toggle ? 'Sign Up' : 'Sign In'}
                        </Link>
                    </Button>
                )}
                
            </div>
        </>
    )
}

export default NavBar

