import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 50%;
    hight: 100%;
    padding: 10px 10px;
`

const TableButton = styled.button`
    width: 20vw;
    hight: auto;
    font-family: Helvetica;
    font-size: 1rem;
    padding: 5px 0;
    margin: 5px 0;
`
const Label = styled.div`
    font-family: Helvetica;
    font-size: 1.2rem;
    font-weight: 600;
    color: white;
    hight: 12vh;
    width: 20vw;
    padding: 10px 0;
    text-align: center;
`
const Sidebar = (props) => {
    return (
        <Container>
            
            <Label style={{backgroundColor:"#3722f6"}}>UFDM - Blue Layer</Label>
            {props.blue.map((table) => (
                <TableButton>{table}</TableButton>
            ))}
            <Label style={{backgroundColor:"#41c300"}}>UFDM - Green Layer</Label>
            {props.green.map((table) => (
                <TableButton>{table}</TableButton>
            ))}
        </Container>
    )
}

export default Sidebar;