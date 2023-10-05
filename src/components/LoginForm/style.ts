import styled from "styled-components";


export const FormLogin = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 0rem;
    
`
export const LogoTCCEasier = styled.img`
    width: 14rem;
    height: 14rem;
    margin-left: auto;
    margin-right: auto;
    background-color: aqua;
    margin-bottom: 1rem;
    margin-top: 4rem;
`
export const ContainerInputs = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: -4rem;
    input {
        margin-top: 0rem;
        width: 20vw;
    }
    input+input{
        margin-top: 1rem;
    }
`
export const ButtonEnter = styled.button`
    margin-top: 1rem;
    background-color: ${props => props.theme["green-500"]};

    &:hover {
        background-color: ${props => props.theme["green-700"]};
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