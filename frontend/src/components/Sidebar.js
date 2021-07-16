import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 40vw;
    hight: 100%;
    padding: 10px 10px;
`

const TableButton = styled.button`
    width: 100%;
    hight: auto;
    font-family: Helvetica;
    font-size: 1.3vw;
    padding: 10px 0;
    margin: 5px 0;
    border-radius: 10px;
    background-color: azure;
    :hover {background-color: #29B6F6}
`
const Label = styled.div`
    font-family: Helvetica;
    font-size: 1.2vw;
    font-weight: 600;
    color: white;
    hight: 12vh;
    width: 100%;
    padding: 10px 0;
    text-align: center;
`
const Sidebar = (props) => {
    return (
        <Container>
            <Label style={{backgroundColor:"#3722f6"}}>UFDM - Blue Layer</Label>
            {props.blue.map((table) => {
                if (table.substring(0, 9) !== 'snapshot_') {
                    return (
                        <TableButton key={table}
                            onClick={() => props.getTableReports('ufdm_blue', table)}
                        >
                        {table}
                        </TableButton>
                    )
                }
            })}
            <Label style={{backgroundColor:"#41c300"}}>UFDM - Green Layer</Label>
            {props.green.map((table) => {
                if (table.substring(0, 9) !== 'snapshot_') {
                    return (
                        <TableButton key={table}
                            onClick={() => props.getTableReports('ufdm', table)}
                        >
                        {table}
                        </TableButton>
                    )
                }
            })}
        </Container>
    )
}

export default Sidebar;