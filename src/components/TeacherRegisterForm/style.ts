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
    label {
        @media (max-width:940px){
            display: none;
        }
    }
    textarea {
        width: 20rem;
        @media (max-width:940px){
            width: 15rem;
        }
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
        @media (max-width:940px){
            width: 10rem;
            height: 3rem;
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
        @media (max-width:940px){
            width: 15rem;
        }
    }
    select {
        width: 20rem;
        font-size: 1rem;
        color: ${props => props.theme["gray-600"]};
    }
`