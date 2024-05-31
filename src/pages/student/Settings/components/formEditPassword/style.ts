import styled from "styled-components"


export const ContainerForm = styled.form`
    gap: 1rem;
    display: flex;
    flex-direction: column;

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
    justify-content: center;
    text-align: center;
   
    width: 30rem;

    span {
        width: 8rem;
    }
    
`
export const CaixaDeTexto = styled.input`
    width: 40%;
`


export const ButtonEditPassword = styled.button`
    background-color: ${props => props.theme["green-500"]};
    border: none;
    max-height: 3rem;
    max-width: 12rem;
    margin-left: auto;
    margin-right: auto;
    &:hover {
        background-color: ${props => props.theme["green-700"]};
    }

    @media (max-width:940px){

       width: 15rem;
       margin-left: auto;
       margin-right: auto;
    }
   
`