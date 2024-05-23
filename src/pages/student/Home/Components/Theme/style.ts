import styled from "styled-components";

export const ContainerContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
`
export const ContainerTheme = styled.div`
    display: flex;
    flex-direction: column;
    width: 20rem;
    height: 15rem;
   
    text-align: center;
    align-items: center;
    gap: 2rem;
`
export const ContainerDescription = styled.div`
    display: flex;
    flex-direction: column;
    width: 20rem;
    height: 15rem; 
    text-align: center;
    align-items: center;
    gap: 2rem;
`
export const Title = styled.strong`
    background-color: ${props => props.theme["green-500"]};
    color: white;
    padding: 1rem;
    border-radius: 8px;
    width: 100%;

`
export const ButtonEdit = styled.strong`
    background-color: ${props => props.theme["green-500"]};
    width: 30%;
`


export const Text = styled.span`
    color:#848484;
`