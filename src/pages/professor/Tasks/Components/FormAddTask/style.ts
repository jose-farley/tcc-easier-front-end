import styled from "styled-components";



export const MaintContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 1rem;
   

`


export const RowForm = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;

`
export const FormTask = styled.form`
    display: flex;
    flex-direction: column;
    
    width: 30rem;
    gap: 1rem;
`

export const ContainerShowTasks = styled.div`
    display: flex;
    flex-direction: column;
    
    gap: 0.5rem;
    height: 10rem;
    width: 30rem;
    padding: 1rem;
    background-color: #D9D9D9;
    border-radius: 8px;
    overflow-y: auto;
   
   li{

    text-align: left;
   }
`
export const BtnAddTask = styled.button`
    display: flex;
    height: 2.4rem;
    align-items: center;
`

export const ButtonSendTask = styled.button`
    

`