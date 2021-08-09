
import { useState, useRef, Fragment } from "react";
import { CSVLink } from "react-csv";
import axios from 'axios';
import styled from "styled-components";
import { HOST } from "../App";

const Box = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid black;
    background-color: ${props => {
        if (props.number > 0.05) {
            return '#EF5350'; 
        } else if (props.number < 0.05 && props.number > 0) {
            return '#ffc77d';
        } else {
            return '#aaf255'
        }
    }};
    width: 100%;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-family: Helvetica;
    font-size: 1.1vw;
    width: 10vw;
`

const ButtonWrapper = styled.div`
    width: 6vw;
    height: 2.5vh;
    padding: 0 10px;
`

const Button = styled.button`
    width: 6vw;
    height: 3vh;
    font-family: Helvetica;
    font-size: 1.1vw;
    padding: 0 10px;
    background-color: azure;
    border-radius: 10px;
    :hover {background-color: #29B6F6}
`

const Name = styled.div`
    font-family: Helvetica;
    font-size: 1.2vw;
    width: 10vw;
    padding: 15px 10px;
`

const Label = styled.div`
    width: 6vw;
    height: 2.5vh;
    text-align: center;
    font-family: Helvetica;
    font-size: 1.2vw;
    padding: 0 10px;

`

const ColumnDetail = (props) => {
    const [csvData, setCSVData] = useState('');
    const csvLink = useRef();
    const tableName = props.tableLabel
    const buttonName = props.buttonName

    let solution = <div></div>;
    if (props.detail.p_missing > 0 && tableName === 'ufdm.account') {
        solution = (
            <ButtonWrapper>
                <Button onClick={() => getCSVFile(buttonName)}>Solution</Button>
                    <CSVLink
                        filename={`${props.name}_missing_report.csv`}
                        data={csvData}
                        ref={csvLink}
                        asyncOnClick={true}
                        target="_blank"
                    />
            </ButtonWrapper>)
    } else if (props.detail.p_missing == 0 && tableName === 'ufdm.account') {
        solution = <Label>It is clean!</Label>
    } 

    const getCSVFile = async (buttonName) => {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          };

        let endPoint = ``
        if (buttonName === 'Show Statistics of Active Customers'){
            endPoint = `${HOST}/get-missing-report/${props.name}-0`
        } else {
            endPoint = `${HOST}/get-missing-report/${props.name}-1`
        }

        axios.get(endPoint, headers)
        .then((res) => {
            setCSVData(res.data);
            csvLink.current.link.click()
        })
        .catch(err => console.error(err))
    }

    return (
        // <Container>
            <Box number={props.detail.p_missing}>
                <Name>{props.name}</Name>
                <Wrapper>
                    <span>Missing Rows: </span>
                    <span>{props.detail.n_missing}</span>
                </Wrapper>
                <Wrapper>
                    <span>Missing Percentage: </span>
                    <span number={props.detail.p_missing}>{(props.detail.p_missing * 100).toFixed(1)}%</span>
                </Wrapper>
                {solution}
            </Box>
        // </Container>
    )

  
};

export default ColumnDetail;