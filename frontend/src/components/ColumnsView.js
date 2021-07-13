// import { useState, useEffect } from "react";
import ColumnDetail from './ColumnDetail';
import styled from "styled-components";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 100%;
    height: 90vh;
    overflow-y: auto;
`


function ColumnsView(props) {

    return (
        <Container>
                {props.data.map((column) => (
                    <ColumnDetail key={column[0]} name={column[0]} detail={column[1]} />
                ))}
        </Container>
    )
}

export default ColumnsView;