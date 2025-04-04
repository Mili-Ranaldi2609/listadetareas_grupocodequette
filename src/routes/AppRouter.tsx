import { Navigate, Route, Routes } from "react-router-dom"
import { TareaScreen } from "../components/screens/TareasScreen"
import { Header } from "../components/ui/Header/Header"
import { SprintDetail } from "../components/screens/SprintDetalles"


export const AppRouter=()=>{
   return (
        <>
            <Header/>
            <Routes>
            <Route path="/" element={<Navigate to="/Backlog" />} />
                <Route path="/Backlog" element={<TareaScreen/>}/>  
                <Route path="/sprint/:id" element={<SprintDetail />} />         
            </Routes>
            
        </>
      )
}
         

