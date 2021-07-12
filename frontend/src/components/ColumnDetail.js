
import { useState, useRef } from "react";
import { CSVLink } from "react-csv";
import axios from 'axios';
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
`

const Box = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid black;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const BlinkySpan = styled.span`
    color: ${props => {
            if (props.number > 0.05) {
                return 'red'; 
            } else if (props.number < 0.05 && props.number > 0) {
                return 'orange';
            } else {
                return 'green';
            }
        }};
`

const ColumnDetail = (props) => {
    const [csvData, setCSVData] = useState('');
    const csvLink = useRef();

    let solution = <div></div>;
    if (props.detail.p_missing > 0) {
        solution = <button>Solution</button>
    } else {
        solution = <div>It is clean!</div>
    }

    const getCSVFile = async () => {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          };

        axios.get(`http://localhost:8000/get-missing-report/${props.name}`, headers)
        .then((res) => {
            setCSVData(res.data);
            csvLink.current.link.click()
        })
        .catch(err => console.error(err))
    }

    return (
        <Container>
            <Box>
                <div>
                    <h3>{props.name}</h3>
                    <button onClick={() => getCSVFile()}>Export to CSV File</button>
                    <CSVLink
                        filename={`${props.name}_missing_report.csv`}
                        data={csvData}
                        ref={csvLink}
                        asyncOnClick={true}
                        target="_blank"
                    />
                </div>
                <div>
                    <Wrapper>
                        <span>Missing Rows: </span>
                        <span>{props.detail.n_missing}</span>
                    </Wrapper>
                    <Wrapper>
                        <span>Percentage: </span>
                        <BlinkySpan number={props.detail.p_missing}>{(props.detail.p_missing * 100).toFixed(2)}%</BlinkySpan>
                    </Wrapper>
                </div>
                {solution}

            </Box>
        </Container>
    )

  
};

export default ColumnDetail;