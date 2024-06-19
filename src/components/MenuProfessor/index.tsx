import { NavLink } from "react-router-dom";
import { LogoTCCEasierWhite, MenuProfessor, ProfessorMenuContainer } from "./style";
import { House, GraduationCap, UsersThree, ListChecks, Gear} from '@phosphor-icons/react'

import logo from '../../images/tcc-easier-high-resolution-logo-white-on-transparent-background.png'

export function ProfessorMenu(){
    return (
        <ProfessorMenuContainer>
             <NavLink to="/"><LogoTCCEasierWhite  src={logo} /></NavLink> 
            <MenuProfessor>
                <NavLink to="/professor/" className={({ isActive }) => (isActive ? 'active' : '')
                }><House size={28} /> <span> Inicio</span></NavLink> 
                <NavLink  to="/professor/reunioes" className={({ isActive }) => (isActive ? 'active' : '')
                }><UsersThree size={30}/><span> Reuniões</span></NavLink>
                <NavLink to="/professor/alunos" 
                className={({ isActive }) => (isActive ? 'active' : '')
                }>
                    <GraduationCap size={28}/><span>Alunos</span>
                </NavLink>
                <NavLink to="/professor/tarefas" className={({ isActive }) => (isActive ? 'active' : '')
                }><ListChecks size={30}/><span>Tarefas</span></NavLink>
                <NavLink to="/professor/configuracoes" className={({ isActive }) => (isActive ? 'active' : '')
                }><Gear  size={28}/><span>Configurações</span></NavLink>
                
            </MenuProfessor>
        </ProfessorMenuContainer>
    )
}