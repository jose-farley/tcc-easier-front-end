import styled from "styled-components";



export const LoginContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    flex-direction: row;
    background-color: black;
    z-index: 1;
    overflow: hidden;
`
export const LeftContent = styled.div`
    z-index: 1;
    display: flex;
    flex-grow: 1.4;
    background-image: url('./images/ifpbFrente.jpeg');
    background-repeat: no-repeat;
    background-size: cover;
    justify-content: center;
    text-align: center;
    align-items: center;
`
export const ImageFilter = styled.div`
    z-index: 1;
    display: none;
    display: flex;
    height: 100vh;
    width: 100%;
    background-color: rgba(102, 102, 102, 0.6);
    backdrop-filter: blur(2px);
    align-items: center;
    justify-content: center;
`
export const RightContent = styled.main`
    z-index: 1;
    display: flex;
    flex-grow: 0.6;
    background-color: white;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
`