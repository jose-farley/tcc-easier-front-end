import { NavLink } from "react-router-dom";
import { LogoTCCEasierWhite, MenuProfessor, ProfessorMenuContainer } from "./style";
import { House, GraduationCap, UsersThree, ListChecks, Gear} from '@phosphor-icons/react'

import logo from '../../images/tcc-easier-high-resolution-logo-white-on-transparent-background.png'

export function ProfessorMenu(){
    return (
        <ProfessorMenuContainer>
             <NavLink to="/"><LogoTCCEasierWhite  src={logo} /></NavLink> 
            <MenuProfessor>
                <NavLink to="/professor/home"><House size={28} /> <span> fsadf</span></NavLink> 
                <NavLink to="/professor/orientadores"><UsersThree size={30}/><span> fasdf</span></NavLink>
                <NavLink to="/professor/alunos"><GraduationCap size={28}/><span>Alunos</span></NavLink>
                <NavLink to="/professor/tarefas"><ListChecks size={30}/><span>Tarefas</span></NavLink>
                <NavLink to="/professor/configuracoes"><Gear  size={28}/><span>dsaf</span></NavLink>
                <NavLink to="/professor/configuracoes"><Gear  size={28}/><span>dsaf</span></NavLink>
            </MenuProfessor>
        </ProfessorMenuContainer>
    )
}