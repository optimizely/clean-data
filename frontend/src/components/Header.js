import styled from "styled-components";

const Bar = styled.div`
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
`
const Logo = styled.img`
    width: 6vw;
    padding: 20px 40px;
`
const Text = styled.div`
    display:flex;
    flex-direction: column
    padding: 10px 30px;
    font-family: 'Helvetica';
    font-size: 4vw;
`
const Subline = styled.p`
    font-family: 'Helvetica';
    font-size: 1.2vw;
    padding: 30px 10px 0 10px;
`

const Header = () => {
    return (
        <Bar>
            <Logo src="./logo.png"/>
            <Text>
                Clean Data Reports
                <Subline>Data Services</Subline>
            </Text>
        </Bar>
    )
}

export default Header;