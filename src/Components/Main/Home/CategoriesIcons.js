import { useContext } from 'react'
import { Row, Col } from 'reactstrap'
import { Link } from "react-router-dom"
import _ from "lodash"
import reducerContext from "../../../contextApi's/contextAPI"

const CategoriesIcons = ()=>{
    const { state, dispatch } = useContext(reducerContext)

    const containerStylesRight = {
        display: 'flex',
        width: 'max-content',
        animationName: state.search ? 'none' : 'marqueeRight 8s linear infinite',
        animationDuration: '8s',
        animationTimingFunction: 'linear',
        animationDelay: '2s',
        position: 'relative',
    }

    const containerStylesLeft = {
        display: 'flex',
        width: 'max-content',
        animationName: state.search ? 'none' : 'marqueeLeft 18s linear infinite',
        animationDuration: '18s',
        animationTimingFunction: 'linear',
        animationDelay: '3s',
        position: 'relative',
    }

    const handleClearSearch = ()=>{
        dispatch({
            type: "CLEAR_SEARCH",
            payload: ""
        })
    }

    return(
        <Row>
            <Col className="mb-3">
                <div className="mt-4">
                    <div className="category_main_custom_r">
                        <h2>Services we offer at your home</h2>
                        <div className='category_list_custom_r mt-4'> 
                            <div className="image-container_r" style={containerStylesRight}>
                                {state.categories && 
                                _.chain(state.categories)
                                .sortBy('title').slice(0, 21)
                                .filter(ele => ele.title.toLowerCase().includes(state.search.toLowerCase()))
                                .map((ele)=>{
                                    return(
                                        <div key={ele._id} className="slide_r">
                                            <Link to={`/ServiceProvidersList/${ele._id}`}      className="text-decoration-none"
                                            onClick={handleClearSearch}
                                            >
                                                <img 
                                                    className="slide_image_r"
                                                    src={ele.picture.url} 
                                                    alt={ele.title}
                                                />
                                                <p className="rounded-pill">{ele.title}</p>
                                            </Link>
                                        </div>
                                    )
                                })
                                .value()}
                            </div>
                        </div>
                    </div>

                    <div className="category_main_custom_l mt-3">
                        <div className='category_list_custom_l'>
                            <div className="image-container_l" style={containerStylesLeft}>
                                {state.categories && 
                                _.chain(state.categories)
                                .sortBy('title').slice(21, 47)
                                .reverse()
                                .filter(ele => ele.title.toLowerCase().includes(state.search.toLowerCase()))
                                .map((ele)=>{
                                    return(
                                        <div key={ele._id} className="slide_l">
                                            <Link to={`/ServiceProvidersList/${ele._id}`} className="text-decoration-none">
                                                <img
                                                    className="slide_image_l" 
                                                    src={ele.picture.url} 
                                                    alt={ele.title}
                                                />
                                                <p className="rounded-pill">{ele.title}</p>
                                            </Link>
                                        </div>
                                    )
                                })
                                .value()}
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default CategoriesIcons