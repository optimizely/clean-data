import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 30vh;
    padding: 10px
    
`
const Title = styled.div`
    font-family: Helvetica;
    font-size: 2rem;
`
const Metrics = styled.div`
    font-family: Roboto;
    font-size: 1rem;
    padding: 5px 0;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 5px 0;
`

const Overview = (props) => {

    return (
        <Container>
            <Wrapper>
                <Title>{props.tableLabel} Overview</Title>
                <button onClick={props.getActiveCustomers}>{props.buttonName}</button>
            </Wrapper>
            <Wrapper>
                <Metrics>Number of columns</Metrics>
                <span>{props.data.n_var}</span>
            </Wrapper>
            <Wrapper>
                <Metrics>Total Row Count</Metrics>
                <span>{props.data.n}</span>
            </Wrapper>
            <Wrapper>
                <Metrics>Number of Customers with complete data</Metrics>
                <span>{props.data.without_nulls}</span>
            </Wrapper>
            <Wrapper>
                <Metrics>Number of Customers with missing data</Metrics>
                <span>{props.data.with_nulls}</span>
            </Wrapper>
            <Wrapper>
                <Metrics>Percentage of Customers with missing data</Metrics>
                <span>{(props.data.perc_nulls * 100).toFixed(2)}%</span>
            </Wrapper>
        </Container>
    )
}


export default Overview;