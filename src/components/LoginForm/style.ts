import styled from "styled-components";


export const FormLogin = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    min-width: 20rem;
    gap: 0.5rem;

    @media (max-width:940px){
        margin-top: -4rem;
        min-width: 100vw;
    }
    
    
`
export const LogoTCCEasier = styled.img`
    width: 10rem;
    height: 2rem;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 2rem;
    margin-top: 10rem;

    @media (max-width:940px){
        margin-left: auto;
        margin-right: auto;
        width: 10rem;
        height: 2rem;
    }
`
export const ContainerInputs = styled.div`
    display: flex;
    flex-direction: column;
    gap:0.5rem;
    input {
        margin-top: 0rem;
        width: 100%;
        @media (max-width:940px){
            width: 80%;
            margin-left: auto;
            margin-right: auto;
        }
    }
    input+input{
        margin-top: 2rem;
    }
`
export const ButtonEnter = styled.button`
    margin-top: 1rem;
    background-color: ${props => props.theme["green-500"]};

    &:hover {
        background-color: ${props => props.theme["green-700"]};
    }

    @media (max-width:940px){

       width: 15rem;
       margin-left: auto;
       margin-right: auto;
    }
   
`
export const InforText = styled.span`
    margin-top: 1rem;
    color: rgb(77, 77, 77);
    font-size: 0.875rem;
    text-align: center;
`
export const RedirectForSignUp = styled.span`
    cursor: pointer;
    color: ${props => props.theme["green-700"]};
    font-weight: 400;
    
    &:hover{
        text-decoration: underline;
    }
`

export const MessageEmailError= styled.span`
    display: flex;
    width: 80%;
    font-size: 0.75rem;
    color: ${props => props.theme["red-500"]};
    opacity: 0.6;
    font-weight: bold;

    @media (max-width:940px){
      margin-left: auto;
      margin-right: auto;
    }
`