
// import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

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
    let solution = <div></div>;
    if (props.detail.p_missing > 0) {
        solution = <button>Solution</button>
    } 

    return (
        <Container>
            <Box>
                <div>
                    <h3>{props.name}</h3>
                    <input type="button" value="Export to CSV File" />
                    {/* <CSVLink
                    headers={headers}
                    filename="report.csv"
                    data={data}
                    ref={this.csvLinkEl}
                    /> */}
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