import styled from "styled-components";



export const ContainerContent = styled.div`

    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 4rem;
    width: 100vw;
    height: 100vh;
  
`
export const ContainerMenu = styled.div`

display: flex;
flex-direction: row;
padding: 4rem;
justify-content: end;


`
export const ButtonAddTask = styled.button`
   ${props => props.theme["green-700"]}
   border-radius: 100px;


`