import styled from "styled-components";


export const Tabela = styled.table`
    overflow-y: auto;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    margin-right: auto;
    margin-left: auto;
    max-width: 80rem ;
    min-width: 20rem;
    min-height: 2rem;
    max-height: 15rem;

   thead {
        display: flex;
        background-color: ${props => props.theme["green-500"]};
        color:white;
        border-radius: 8px;
        text-align: center;
        tr {  
            th {   
                padding: 1rem;
                width: 14rem;
                text-align: center;
                line-height: 1.6;

                &:first-child {
                    border-top-left-radius: 8px;
                    padding-left: 1.5rem;
                }
                &:last-child {
                    border-top-right-radius: 8px;
                    padding-right: 1.5rem;
                }
            }
        }
   }

   tbody {
        tr {
           text-align: center;
            display: flex;
            justify-content: space-between;
            align-items: center;
            td {
                padding: 1rem;
                width: 14rem;
                text-align: center;
                line-height: 1.6;
                cursor: default;
            }
        }
   }
`

export const ContainerActualTasks = styled.div`
    display: flex;
    flex-direction: column;

`
export const ButtonRequest = styled.button`
    background-color: ${props => props.theme["green-500"]};
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
export const Text = styled.span`
    color:#848484;
`

export const MainContent = styled.div`
    display: flex;
    padding: 1rem;
    flex-direction: column;
    width: 100vw;
    justify-content: center;
    align-items: center;
    text-align: center;

`
export const Subtitle = styled.strong`
    color:#848484;
`
export const Message = styled.span`
    color:#848484;
`