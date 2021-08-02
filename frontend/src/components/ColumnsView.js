import { Fragment } from "react";
import ColumnDetail from './ColumnDetail';
import styled from "styled-components";

const Title = styled.div`
    font-family: 'Roboto';
    font-size: 2.5vw;
    font-weight: 600;
    padding: 10px;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 5px;
    width: 100%;
    height: 90vh;
    overflow-y: auto;
`


function ColumnsView(props) {


    return (
        <Fragment>
            <Title>Column Validation</Title>
            <Container>
                    {props.data.map((column) => (
                        <ColumnDetail key = {column[0]} 
                                name = {column[0]} 
                                detail = {column[1]} 
                                buttonName = {props.buttonName} 
                                tableLabel = {props.tableLabel}/>
                    ))}
            </Container>
        </Fragment>
    )
}

export default ColumnsView;