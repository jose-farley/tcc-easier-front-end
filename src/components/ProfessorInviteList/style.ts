import styled from "styled-components";

export const InviteContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #6D6D6D;
    border-radius: 8px;
    padding: 0.8rem;

`
export const RowContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;

`
export const Name = styled.strong`
    font-size: 1.2rem;
    color: #6D6D6D;

`
export const ContainerButtons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.4rem;
    justify-content: center;

`
export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 25rem;
    padding: 0.4rem;
    overflow-y: scroll;
    gap: 0.4rem;
    
`
export const ContainerNoInvites = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;

`