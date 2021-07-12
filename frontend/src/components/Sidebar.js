import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: flex-start;
    width: 50%;
    hight: 100%;
    padding: 10px 10px;
`

const Wrapper = styled

const Sidebar = (props) => {
    return (
        <Container>
            
            <h2>User-Friendly Data Mart Blue Layer</h2>
            <div>Customer Detail</div>
            <h2>User-Friendly Data Mart Green Layer</h2>
            <div>Account</div>
        </Container>
    )
}

export default Sidebar;