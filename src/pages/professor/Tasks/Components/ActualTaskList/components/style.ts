import styled from "styled-components";



export const ContainerTasks = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`

export const List = styled.ul`
    display: flex;
    width: 20rem;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
   
`


interface props {
    condition:boolean
}
export const Item = styled.li`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

`

export const Status = styled.input`
    border: 1px solid transparent;
    height: 1rem;
    width: 1rem;
   
`
export const Subtitle = styled.strong`
    color:#848484;
`
export const ButtonRemove = styled.button`
    width: 5rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
`

