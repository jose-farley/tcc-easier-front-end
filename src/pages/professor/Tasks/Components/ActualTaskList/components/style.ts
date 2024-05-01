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
   
`

export const Item = styled.li`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

`
interface props {
    condition:boolean
}
export const Status = styled.div<props>`
    border: 1px solid transparent;
    height: 1rem;
    width: 1rem;
    background-color: ${props => props.condition ? '#00B37E' : 'grey'};
`
export const Subtitle = styled.strong`
    color:#848484;
`


