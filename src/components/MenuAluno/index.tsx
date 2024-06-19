import { NavLink } from "react-router-dom";
import { AlunoMenuContainer, LogoTCCEasierWhite, MenuAluno } from "./style";
import { House, GraduationCap, UsersThree, ListChecks, Gear} from '@phosphor-icons/react'

import logo from '../../images/tcc-easier-high-resolution-logo-white-on-transparent-background.png'

export function AlunoMenu(){
    return (
        <AlunoMenuContainer>
             <NavLink to="/"><LogoTCCEasierWhite  src={logo} /></NavLink> 
            <MenuAluno>
                <NavLink to="/aluno" className={({ isActive }) => (isActive ? 'unactive' : 'unactive')
                }><House size={28} /> <span> Inicio</span></NavLink> 
                <NavLink to="/aluno/orientadores" className={({ isActive }) => (isActive ? 'active' : 'unactive')
                }><GraduationCap size={28}/><span> Orientadores</span></NavLink>
                <NavLink to="/aluno/reunioes" className={({ isActive }) => (isActive ? 'active' : 'unactive')
                }><UsersThree size={30}/><span>Reuniões</span></NavLink>
                <NavLink to="/aluno/tarefas" className={({ isActive }) => (isActive ? 'active' : 'unactive')
                }><ListChecks size={30}/><span>Tarefas</span></NavLink>
                <NavLink to="/aluno/configuracoes" className={({ isActive }) => (isActive ? 'active' : 'unactive')
                }><Gear  size={28}/><span>Configurações</span></NavLink>
            </MenuAluno>
        </AlunoMenuContainer>
    )
}