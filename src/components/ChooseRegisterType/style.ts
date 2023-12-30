import styled from "styled-components"


export const ContainerRegisterTypes = styled.div`
    display: flex;
    flex-direction: column;
    width: 30rem;
    height: 20rem;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    h1{
        margin-bottom: 2rem;
        font-size: 1rem;
        @media (max-width:425px){
            margin-bottom: 0.8rem;
            margin-top: 0.4rem;
            
          
        }
    }
    @media (max-width:425px){
       margin-top: 0.4rem;
       width: 18rem;
       margin-left: auto;
       margin-right: auto;
       width: 12rem;
      
   }
`
export const ContainerOptions = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    @media (max-width:425px){
        flex-direction: column;
        gap: 0.4rem;
   }
    button {
        padding: 1rem;
        border: none;
        flex-direction: column;
        gap: 1rem;
        text-align: center;
        color: white;
        font-weight: bold;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        display: flex;
        width: 20rem;
        height: 10rem;
        background-color: ${props => props.theme["green-500"]};
        transition: 0.4s;
        @media (max-width:425px){
            width: 10rem;
            height: 6rem;
            font-size: 0.8rem;
        }
        &:hover{
            background-color: ${props => props.theme["green-700"]};
        }
    }
    img {
        display: flex;
        width: 5rem;
        height: 5rem;
        @media (max-width:425px){
            width: 2rem;
            height: 2rem;
        }
    }

    
`