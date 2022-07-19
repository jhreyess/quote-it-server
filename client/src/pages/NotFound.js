import { Link } from 'react-router-dom'
import styled from "styled-components";

const Wrapper = styled.div`
    position: relative;
    height: 100vh;
`
const Container = styled.div`
    width: 66%;
    position: absolute;
    top: 50%;
    left: 50%;
    font-weight: bold;
    text-align: center;
    font-size: 3em;
    transform: translate(-50%, -50%);
`
const Message = styled.h6`
    font-weight: normal;
    margin-top: 0;
`
const Button = styled(Link)`
    display: inline-block;
    color: #000000;
    padding: 0.75em 2em;
    font-size: 0.5em;
    background-color: #FFC400;
    border-radius: 2em;
    text-decoration: none;
    transition: 200ms;
    &:hover{
        box-shadow: 0 5px 45px -15px #ffc400;
    }
`

const NotFound = () => {
    return(
        <Wrapper>
            <Container>
                <code>404</code>
                <Message>La página que buscas parece no existir</Message>
                <Button to={'/'}>Volver</Button>
            </Container>
        </Wrapper>
    ) 
}

export default NotFound;