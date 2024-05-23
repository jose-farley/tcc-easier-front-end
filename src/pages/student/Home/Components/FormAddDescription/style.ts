import styled from "styled-components";

export const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    text-align: center;
    align-items: center;

`
export const ButtonEdit = styled.strong`
    background-color: ${props => props.theme["green-500"]};
    width: 30%;
`
export const Subtitle = styled.strong`
    color:#848484;
`
export const PlaceText = styled.textarea`
    height: 8rem;
`