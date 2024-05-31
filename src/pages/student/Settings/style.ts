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
    justify-content: center;
    text-align: center;
   
    width: 40rem;
    
`
export const ContainerForm = styled.div`
    gap: 1rem;
    display: flex;
    flex-direction: column;

`
export const CaixaDeTexto = styled.input`
    cursor:pointer ;
    width: 30%;
`
export const CaixaDeTextoEmail = styled.input`
    cursor: not-allowed;
    width: 30%;
`
export const SwitchContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
`;

// Estilização do input do switch
export const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

// Estilização do label do switch
export const SwitchLabel = styled.label<{ checked: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => (props.checked ? props.theme["green-500"] : '#ccc')};
  transition: 0.4s;
  border-radius: 34px;
  cursor: pointer;

  &::before {
    position: absolute;
    content: '';
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    transform: ${props => (props.checked ? 'translateX(26px)' : 'none')};
  }
`;

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

export const ButtonEditPassword = styled.button`
    background-color: ${props => props.theme["green-500"]};
    border: none;
    max-height: 3rem;
    max-width: 12rem;
    &:hover {
        background-color: ${props => props.theme["green-700"]};
    }

    @media (max-width:940px){

       width: 15rem;
       margin-left: auto;
       margin-right: auto;
    }
   
`