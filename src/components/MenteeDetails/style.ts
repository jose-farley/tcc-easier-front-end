import styled from "styled-components";


export const ContainerStudentInfo = styled.div`
    display: flex;
    flex-direction: column;
   
    border-radius: 8px;
    min-width: 24rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
    gap:0.5rem;
`
export const Row = styled.div`
    display: flex;
    max-width: 20rem;
    text-align: justify;
    flex-direction: column;
    gap: 1rem;
 

`
export const ButtonSend = styled.button`
  
    max-height: 3rem;
    &:hover {
        background-color: ${props => props.theme["green-700"]};
    }

    @media (max-width:940px){

       width: 15rem;
       margin-left: auto;
       margin-right: auto;
    }
   
`

export const MessageTA = styled.textarea`
    border-radius: 8px;
    outline: none;
    border: none;
    border: 1px solid gray;
    padding: 0.5rem;
    color: #585858;
`
export const Title = styled.strong`
    font-weight: bold;
    color:  ${props => props.theme["green-700"]};
`
export const FormInvite = styled.form`
    display: flex;
    flex-direction: column;
    gap:1rem;
`