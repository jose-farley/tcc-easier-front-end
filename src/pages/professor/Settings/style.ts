import styled from "styled-components";



export const MainContent = styled.div`

    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    align-items: center;
    gap: 2rem;
    justify-content: center;

`

export const Tittle = styled.strong`
    text-align: center;
    font-size: 1.2rem;
    color: #6F6F6F;
    margin-top: 1rem;
   
`
export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    
`
export const ContainerForm = styled.div`
    gap: 1rem;
    display: flex;
    flex-direction: column;

`
export const CaixaDeTexto = styled.input`
    cursor: pointer;
`

export const ButtonRemoveAccount = styled.button`
    background-color: ${props => props.theme["red-200"]};
    border: none;
    max-height: 3rem;
    max-width: 12rem;
    &:hover {
        background-color: ${props => props.theme["red-300"]};
    }

    @media (max-width:940px){

       width: 15rem;
       margin-left: auto;
       margin-right: auto;
    }
   
`