import styled from "styled-components";

export const DivMsgInvites = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    margin-top: 8rem;
    gap:1rem;
    width: 70%;

`

export const MsgInvite = styled.span`
    color: ${props => {return props.theme["gray-500"]}};
`
export const Tittle = styled.strong`
    text-align: center;
    font-size: 1.2rem;
    color: #6F6F6F;
    margin-top: 1rem;
   
`


export const RowIntie = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`
export const ContainerInvites = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-content: center;
    text-align: center;
    align-items: center;
    gap:1rem;
`
export const Text = styled.span`
    color:#848484;
`
export const Paragraph = styled.p`
    height: 1.5rem;
    font-size: 0.8rem;
    color: ${props => {return props.theme["gray-600"]}} ;
`

export const RowButtons = styled.div`

    display: flex;
    gap: 0.5rem;
    justify-content: center;
`

export const ButtonAccept = styled.button`
  
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
export const ButtonReject = styled.button`
  
    max-height: 3rem;
    &:hover {
        background-color: ${props => props.theme["red-500"]};
    }

    @media (max-width:940px){

       width: 15rem;
       margin-left: auto;
       margin-right: auto;
    }
   
`
export const ContainerContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    width: 100vw;
`
export const TabelaStudents = styled.table`
    overflow-y: auto;  
    margin-top: -4rem;
    display: flex;
    flex-direction: column;
    margin-right: auto;
    margin-left: auto;
    width: 55rem;
   thead {
     background-color: ${props => props.theme["green-500"]};
     color:white;
     border-radius: 8px;
     text-align: center;
        tr {
          
            
            th {   
                padding: 1rem;
                width: 18rem;
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
            }
        }
   }
`

export const DivNoInvites = styled.div`
    display:flex;
    flex-direction: column;
    text-align: center;
` 
export const ContainerAdvisorInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100vw;
    justify-content: center;
    align-items: center;

`
export const IdentificatorTxt = styled.strong`
    text-align: center;
    font-size: 1.2rem;
    color: #6F6F6F;
    margin-top: 1rem;
`
export const AdvisorName = styled.strong`
  color: ${props => {return props.theme["gray-500"]}};
  font-size: 1rem;
`

export const InputShowContact = styled.input`
    padding: 0.4rem;
    text-align: center;
    width: 15rem;

`
export const RowInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  
   

`