import { useContext } from "react"
import { Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import _ from "lodash";
import reducerContext from "../../../contextApi's/contextAPI"
import './style.css'

const CategoriesList = () => {
    const { state, dispatch } = useContext(reducerContext);

    const sortedImages = _.orderBy(state.categories, 'title')

    const handleClearSearch = ()=>{
        dispatch({
            type: "CLEAR_SEARCH",
            payload: ""
        })
    }

    return (
        <>
            <Row className="mt-4">
                <Col className="col-9">
                    <h3>Services we offer at your home</h3>
                    <div className="mt-4 mb-4 d-flex flex-wrap">
                        {sortedImages
                        .filter(ele => ele.title.toLowerCase().includes(state.search.toLowerCase()))
                        .map((ele) => {
                            const { _id, title } = ele
                            return (
                                <div
                                    key={_id}
                                    className="mr-4 mb-4 text-center"
                                    style={{
                                        position: 'relative',
                                        cursor: 'pointer',
                                        marginRight: '20px',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <Link 
                                        to={`/ServiceProvidersList/${ele._id}`} 
                                        style={{ textDecoration: "none" }}
                                        onClick={handleClearSearch}
                                        >
                                        <img
                                            src={ele.picture.url}
                                            alt={title}
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                transition: 'transform 0.3s ease-in-out',
                                                borderRadius: '5px',
                                                display: 'block',
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.transform = 'scale(1.3)'
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.transform = 'scale(1)'
                                            }}
                                        />
                                        <p className="mt-2"><span className="image_name">{title}</span></p>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </Col>

                <Col className="col-3">
                    <h3>Service Provider Ads</h3>

                    <div className="mt-4">
                        <iframe
                            width="360"
                            height="410"
                            src="https://www.youtube.com/embed/M1PxiYwjtwM?si=P9YjUOmWBkIgQBg1"
                            title="youTube-video-player"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="mt-4">
                        <iframe
                            width="360"
                            height="410"
                            src="https://www.youtube.com/embed/Hh3MjLaDNG8?si=2-L-9eyCeBOzOpdi&amp;start=2"
                            title="youTube-video-player"
                            allowFullScreen
                        ></iframe>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default CategoriesList
