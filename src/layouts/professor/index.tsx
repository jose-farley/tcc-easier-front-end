import { Outlet } from "react-router-dom";

import { Content, LayoutProfessorContainer } from "./style";
import { ProfessorMenu } from "../../components/MenuProfessor";



export function LayoutProfessor(){

    return(
        <LayoutProfessorContainer>
            <ProfessorMenu />
            <Content>
                <Outlet />
            </Content>
        </LayoutProfessorContainer>  
    )
}