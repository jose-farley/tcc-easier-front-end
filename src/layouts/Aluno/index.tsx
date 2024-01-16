import { Outlet } from "react-router-dom";
import { AlunoMenu } from "../../components/MenuAluno";
import { LayoutAlunoContainer } from "./style";



export function LayoutAluno(){

    return(
        <LayoutAlunoContainer>
            <AlunoMenu />
            <Outlet />
        </LayoutAlunoContainer>  
    )
}