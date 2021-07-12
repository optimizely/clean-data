import styled from "styled-components";

const Bar = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
`
const Logo = styled.img`
    width: 5%;
    padding: 20px 40px;
`
const Text = styled.div`
    display:flex;
    flex-direction: column
    padding: 10px 30px;
    font-family: 'Helvetica';
    font-size: 3rem;
`
const Subline = styled.p`
    font-family: 'Helvetica';
    font-size: 1rem;
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