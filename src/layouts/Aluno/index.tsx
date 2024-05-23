import { Outlet } from "react-router-dom";
import { AlunoMenu } from "../../components/MenuAluno";
import { Content, LayoutAlunoContainer } from "./style";



export function LayoutAluno(){

    return(
        <LayoutAlunoContainer>
            <AlunoMenu />
            <Content>
                <Outlet />
            </Content>
        </LayoutAlunoContainer>  
    )
}