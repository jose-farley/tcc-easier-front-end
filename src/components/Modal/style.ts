import styled from "styled-components"


export const ContainerModal = styled.div`
    background-color: rgba(0,0,0, 0.6);
    height: 100vh;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;

`
interface ModalProps {
    size: 'default' | 'large'
}
export const ModalContent = styled.div<ModalProps>`  
    flex-direction: column;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    margin-top:${props => (props.size=='default')?'8rem':'1.75rem'};
    height: ${props => (props.size=='default')?'20rem':'33rem' };
    width: 40rem;
    background-color: white;
    box-shadow: 1px 0.4px 10px black;
    border-radius: 8px;
    z-index: 80;
    padding: 1rem;
    @media (max-width:940px){
        justify-content: center;
        margin-top:${props => (props.size=='default')?'8rem':'0.75rem'};
        height: ${props => (props.size=='default')?'20rem':'38rem' };
        width: 20rem;
        margin-left: auto;
        margin-right: auto;
    }
`
export const ContainerModalButtons = styled.div<ModalProps>`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    span {
        color: ${props => props.theme["gray-700"]};
    }
    button {
        border: none;
        background-color: white;
      
    }
    @media (max-width:940px){
        margin-top: ${props => (props.size=='default')?'0rem':'-5rem' };
        justify-content: flex-end;
   }
`