import { Route, Routes } from "react-router-dom";
import { LoginScreen } from "./pages/Login";
import { LayoutAluno } from "./layouts/Aluno";
import { AdvisorsPage } from "./pages/student/Advisors";
import { SettingsPage } from "./pages/student/Settings";
import { TasksPage } from "./pages/student/Tasks";
import { MeetingsPage } from "./pages/student/Meetings";
import { HomePage } from "./pages/student/Home";

export function Router(){
    return(
        <Routes>
            <Route path='/' element={<LoginScreen/>} />

            <Route path="/aluno" element={ <LayoutAluno />}>
                <Route path="/aluno" element={<HomePage />} />
                <Route path="/aluno/orientadores" element={<AdvisorsPage />} />
                <Route path="/aluno/configuracoes"element={<SettingsPage />} />
                <Route path="/aluno/tarefas" element={<TasksPage />} />
                <Route path="/aluno/reunioes" element={<MeetingsPage />}/>
            </Route>
        </Routes>
    )
}