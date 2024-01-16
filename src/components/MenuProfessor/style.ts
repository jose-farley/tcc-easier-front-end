import styled from "styled-components";



export const ProfessorMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme["green-500"]};
    width: 18rem;

`
export const MenuProfessor = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    a{
        text-decoration: none;
        display: flex;
        align-items: flex-end;
        font-weight: bold;
        color: ${props => props.theme["gray-100"]};
        gap: 0.5rem;
        padding: 1rem;
        border-radius: 8px;
    }
    a:hover {
        background-color: ${props => props.theme["green-700"]};
    }
    a:active{
        background-color: ${props => props.theme["green-700"]};
    }
    span {
        font-weight: bold;
        color: ${props => props.theme["gray-100"]};
        
    }
`   
export const LogoTCCEasierWhite = styled.img`
    width: 10rem;
    height: 1.5rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 4rem;
    
`