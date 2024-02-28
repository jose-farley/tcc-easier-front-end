import styled from "styled-components";



export const MainContent = styled.div`

    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    align-items: center;

`

export const ContainerAddTask = styled.div`
    display: flex;
    min-width: 50rem;
    max-width: 20rem;
  
    justify-content: flex-end;
    margin-top: 5rem;
`

export const ButtonAddTask = styled.button`
   ${props => props.theme["green-700"]}
   border-radius: 100px;


`