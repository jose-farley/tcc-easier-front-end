import { NavLink } from "react-router-dom";
import { LogoTCCEasierWhite, MenuProfessor, ProfessorMenuContainer } from "./style";
import { House, GraduationCap, UsersThree, ListChecks, Gear} from '@phosphor-icons/react'

import logo from '../../images/tcc-easier-high-resolution-logo-white-on-transparent-background.png'

export function ProfessorMenu(){
    return (
        <ProfessorMenuContainer>
             <NavLink to="/"><LogoTCCEasierWhite  src={logo} /></NavLink> 
            <MenuProfessor>
                <NavLink to="/aluno"><House size={28} /> <span> Inicio</span></NavLink> 
                <NavLink to="/aluno/orientadores"><GraduationCap size={28}/><span> Tarefas</span></NavLink>
                <NavLink to="/aluno/reunioes"><UsersThree size={30}/><span>Configurações</span></NavLink>
                <NavLink to="/aluno/tarefas"><ListChecks size={30}/><span>Reuniões</span></NavLink>
                <NavLink to="/aluno/configuracoes"><Gear  size={28}/><span>Suporte</span></NavLink>
                <NavLink to="/aluno/configuracoes"><Gear  size={28}/><span>Orientandos</span></NavLink>
            </MenuProfessor>
        </ProfessorMenuContainer>
    )
}