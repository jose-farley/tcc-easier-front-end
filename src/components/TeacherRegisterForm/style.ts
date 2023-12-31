import styled from "styled-components";


export const ContainerTeacherForm = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
`

export const TeacherForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    textarea {
        width: 20rem;
    }

    button {
        background-color: ${props => props.theme["green-500"]};
        color: white;
        border: none;
        width: 22rem;
        height: 3rem;
        border-radius: 8px;
        margin-top: 1rem;

        &:hover {
            background-color: ${props => props.theme["green-700"]};
        }
    }
    
`

export const RowForm = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    input {
        width: 20rem;
    }
    select {
        width: 20rem;
        font-size: 1rem;
        color: ${props => props.theme["gray-600"]};
    }
`