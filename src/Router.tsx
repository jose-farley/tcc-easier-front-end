import { Route, Routes } from "react-router-dom";
import { LoginScreen } from "./pages/Login";

export function Router(){
    return(
        <Routes>
            <Route path='/' element={<LoginScreen/>} />
        </Routes>
    )
}