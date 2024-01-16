import { Outlet } from "react-router-dom";

import { LayoutProfessorContainer } from "./style";
import { ProfessorMenu } from "../../components/MenuProfessor";



export function LayoutProfessor(){

    return(
        <LayoutProfessorContainer>
            <ProfessorMenu />
            <Outlet />
        </LayoutProfessorContainer>  
    )
}