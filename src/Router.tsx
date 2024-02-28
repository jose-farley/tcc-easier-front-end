import { Route, Routes } from "react-router-dom";
import { LoginScreen } from "./pages/Login";
import { LayoutAluno } from "./layouts/Aluno";
import { AdvisorsPage } from "./pages/student/Advisors";
import { SettingsPage } from "./pages/student/Settings";
import { TasksPage } from "./pages/student/Tasks";
import { MeetingsPage } from "./pages/student/Meetings";
import { HomePage } from "./pages/student/Home";
import { useContext } from "react";
import { AuthContext } from "./context/authentication";
import { LayoutProfessor } from "./layouts/professor";
import { StudentListPage } from "./pages/professor/StudentList";
import { HomeAdvisor } from "./pages/professor/Home";
import { ProfessorTasksPage } from "./pages/professor/Tasks";

export function Router(){
    const {role} = useContext(AuthContext)
    
    return(


        <Routes>
            {
                //role.length <= 0
                (false )?
                <>
                    <Route path='/' element={<LoginScreen/>} />
                </>:
                <>
                (role == 'student')?
                <>
                    <Route path='/' element={<LoginScreen/>} />
                    <Route path="/aluno" element={ <LayoutAluno />}>
                        <Route path="/aluno" element={<HomePage />} />
                        <Route path="/aluno/orientadores" element={<AdvisorsPage />} />
                        <Route path="/aluno/configuracoes"element={<SettingsPage />} />
                        <Route path="/aluno/tarefas" element={<TasksPage />} />
                        <Route path="/aluno/reunioes" element={<MeetingsPage />}/>
                    </Route>
                </>
                   :
                   <>
                    <Route path='/' element={<LoginScreen/>} />
                    <Route path="/professor" element={ <LayoutProfessor />}>
                            <Route path="/professor" element={<HomeAdvisor />} />
                            <Route path="/professor/orientadores" element={<AdvisorsPage />} />
                            <Route path="/professor/alunos"element={<StudentListPage />} />
                            <Route path="/professor/tarefas" element={<ProfessorTasksPage />} />
                            <Route path="/professor /reunioes" element={<MeetingsPage />}/>
                        </Route>
                   </>
                   
                </>
                
            }    
        </Routes>
    )
}