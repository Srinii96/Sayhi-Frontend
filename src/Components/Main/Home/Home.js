import CategoriesIcons from './CategoriesIcons'
import OfferInfo from './OfferInfo'
import BusinessInfo from './BusinessInfo'
import HowItWorks from './HowItWorks'
import WhyBookWithSayhi from './WhyBookWithSayhi'
import './style.css'

const Home = ()=>{

    return(
        <>
            {/* Offer Info */}
            <OfferInfo />

            {/* CategoriesIcon Component */}
            <CategoriesIcons />

            {/* business info */}
            <BusinessInfo />

            {/* How it works */}
            <HowItWorks />

            {/* Why Book with Services At Your Home Instant */}
            <WhyBookWithSayhi />
        </>
    )
}

export default Home

