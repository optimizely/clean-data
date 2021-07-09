// import { useState, useEffect } from "react";
import ColumnDetail from './ColumnDetail';
import styled from "styled-components";

const Title = styled.h2`
    font-family: 'Roboto';
    font-size: '3rem';
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 48%;
    padding: 10px
`


function ColumnsView(props) {

    return (
        <Container>
            <Title>Column Validation</Title>
                {props.data.map((column) => (
                    <ColumnDetail key={column[0]} name={column[0]} detail={column[1]} />
                ))}
        </Container>
    )
}

export default ColumnsView;