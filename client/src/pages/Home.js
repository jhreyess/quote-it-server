import { Fragment } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import brand from '../images/brand.svg'
import screenshot from '../images/screenshot.svg'

const Badge = styled.img`
    height: 7.5em;
    @media(max-width: 500px){
        height: 5em;
    }
`
const Section = styled.section`
    position: relative;
    display: grid;
    grid-template-columns: repeat(16,1fr);
    grid-template-rows: 1fr 7fr 7fr 1fr;
    padding: 0 8em;
    height: 100vh;
    @media(max-width: 1024px){
        grid-template-rows: 1fr 2fr 2fr 1fr;
        padding: 0 4em;
    }
    @media(max-width: 768px){
        padding: 0 2em;
        padding-top: 4em;
        height: initial;
        text-align: center;
        display: flex;
        flex-direction: column;
    }
    @media(max-width: 500px){
        padding-left: 0;
        padding-right: 0;
    }
`
const Logo = styled.img`
    grid-row: 2;
    grid-column: 1/7;
    margin: auto;
    width: 100%;
    @media(max-width: 768px){
        width: 50%;
    }
`
const Text = styled.p`
    font-size: 4vw;
    margin-top: 0;
    font-weight: bold;
    @media(max-width: 768px){        
        font-size: 7vw;
    }
`
const Hero = styled.div`
    grid-column: 1/9;
    grid-row: 3;
    @media(max-width: 768px){        
        margin: 1em;
        margin-bottom: 3em;
    }
`
const GridImage = styled.img`
    margin: auto;
    grid-column: 11/17;
    grid-row: 2/4;
    min-height: 0;
    height: 100%;
    @media(max-width: 500px){
        width: 80%;
    }
`
const Footer = styled.footer`
    position: fixed;
    bottom: 0;
    text-align: center;
    width: 100%;
    padding: 1.5em 0;
    @media(max-width: 768px){
        position: initial;
        display: block;
    }
`
const StyledLink = styled(Link)`
    color: inherit;
    text-decoration: none;
    &:hover{
        text-decoration: underline;
    }
`
const Circle = styled.div` 
    width: ${props => props.small ? "190px" : "900px"};
    height: ${props => props.small ? "190px" : "900px"};
    background-color: ${props => props.small ? "#FFC400" : "#333333"};
    position: absolute;
    border-radius: 50%;
    z-index: -1;
    top: ${props => props.top || "initial"};
    bottom: ${props => props.bottom || "initial"};
    left: ${props => props.left || "initial"};
    right: ${props => props.right || "initial"};
    transform: ${props => props.position || "initial"};
    @media(max-width: 768px){
        width: ${props => props.small ? "190px" : "500px"};
        height: ${props => props.small ? "190px" : "500px"};
        display: ${props => props.responsive ? "initial" : "none" };
        left: ${props => props.small ? "initial" : "0"};
        right: ${props => props.small ? "0" : "initial"};
        transform: ${props => props.small ? "translateX(50%)" : "translate(-70%, 10%)"};
        top: 30%;
    }
`
const Layer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: -2;
`

const Home = () => {

    let badge = (
        <a href={'https://play.google.com/store/apps/details?id=com.quoteit.android&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'}>
            <Badge alt='Get it on Google Play' src={'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'}/>
        </a>
    )

    return(
        <Fragment>
            <Section>
                <Logo src={brand} alt="logo"/>
                <Hero>
                    {badge}
                    <Text>Convierte tus palabras en la inspiración del mañana</Text>
                </Hero>
                <GridImage src={screenshot} alt="screenshot"/>
            </Section>
            <div>
                <Layer>
                    <Circle responsive right={"0"} position={"translateX(66%)"}/>
                    <Circle responsive small right={"0"} top={"0"} position={"translate(30%, -30%)"} />
                    <Circle bottom={"0"} left={"0"} position={"translate(-30%, 45%)"} />
                </Layer>
            </div>
            <Footer>
                <StyledLink to='terms'>Términos y condiciones</StyledLink>{' | '}
                <StyledLink to='privacy'>Política de privacidad</StyledLink>
            </Footer>
        </Fragment>
    );
}

export default Home;