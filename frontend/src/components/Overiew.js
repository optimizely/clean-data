import { Fragment } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: auto;
    padding: 10px;
    
`
const Title = styled.div`
    font-family: Roboto;
    font-size: 2.5vw;
    font-weight: 600;
`
const Metrics = styled.div`
    font-family: Helvetica;
    font-size: 1.2vw;
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

const Number = styled.span`
    font-family: Helvetica;
    font-size: 1.2vw;
`
const Button = styled.button`
    hight: auto;
    font-family: Helvetica;
    font-size: 1vw;
    padding: 10px;
    margin: 5px 0;
    border-radius: 10px;
    background-color: azure;
    :hover {background-color: #29B6F6}
`

const Overview = (props) => {
    const tableLabel = props.tableLabel.split('.');
    const schema = tableLabel[0];
    const table = tableLabel[1];
    
    let ac_button;
    let c_validate;
    if (table !== 'customer_detail') {
        ac_button = <div></div>
        c_validate = <div></div>
    } else {
        ac_button = <Button onClick={(event) => props.getActiveCustomers(event, schema, table)}>{props.buttonName}</Button>
        c_validate = (
            <Fragment>
                <Wrapper>
                    <Metrics>Number of Customers with complete data</Metrics>
                    <Number>{props.data.without_nulls}</Number>
                </Wrapper>
                <Wrapper>
                    <Metrics>Number of Customers with missing data</Metrics>
                    <Number>{props.data.with_nulls}</Number>
                </Wrapper>
                <Wrapper>
                    <Metrics>Percentage of Customers with missing data</Metrics>
                    <Number>{(props.data.perc_nulls * 100).toFixed(1)}%</Number>
                </Wrapper>
            </Fragment>
        )
    }

    return (
        <Container>
            <Wrapper>
                <Title>{props.tableLabel} Overview</Title>
                {ac_button}
            </Wrapper>
            <Wrapper>
                <Metrics>Number of Columns</Metrics>
                <Number>{props.data.n_var}</Number>
            </Wrapper>
            <Wrapper>
                <Metrics>Total Row Count</Metrics>
                <Number>{props.data.n}</Number>
            </Wrapper>
            {c_validate}
        </Container>
    )
}


export default Overview;