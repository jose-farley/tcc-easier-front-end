import styled from "styled-components";


export const ContainerStudent = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 0rem;
`
export const ErrorMessage = styled.span`
    font-size: 0.8rem;
    color: ${props => props.theme["red-500"]};
    height: 1rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: -0.8rem;
    margin-bottom: 0.2rem;
`
export const StudentForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: left;
    height: 28rem;
    

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