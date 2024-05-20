import styled from "styled-components";

export const MainContent = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    justify-content: center;

`
export const Tittle = styled.strong`
    text-align: center;
    font-size: 1.2rem;
    color: #6F6F6F;
    margin-top: 1rem;
   
`
export const Text = styled.span`
    color:#848484;
`
export const TextContainer = styled.span`
    display: flex;
    flex-direction: column;
`

export const ButtonRemoveAccount = styled.button`
    background-color: ${props => props.theme["red-200"]};
    border: none;
;
    max-height: 5rem;
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