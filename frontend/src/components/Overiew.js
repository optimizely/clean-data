import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    padding: 10px
    
`
const Title = styled.h2`
    font-family: 'Roboto';
    font-size: '3rem';
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const Overview = (props) => {

    return (
        <Container>
            <Wrapper>
                <Title>Overview</Title>
                <button onClick={props.getActiveCustomers}>{props.buttonName}</button>
            </Wrapper>
            <Wrapper>
                <h4>Number of columns</h4>
                <span>{props.data.n_var}</span>
            </Wrapper>
            <Wrapper>
                <h4>Total Row Count</h4>
                <span>{props.data.n}</span>
            </Wrapper>
            <Wrapper>
                <h4>Number of Customers with complete data</h4>
                <span>0000000</span>
            </Wrapper>
            <Wrapper>
                <h4>Number of Customers with missing data</h4>
                <span>0000000</span>
            </Wrapper>
            <Wrapper>
                <h4>Percentage of Customers with missing data</h4>
                <span>00.00%</span>
            </Wrapper>
        </Container>
    )
}


export default Overview;