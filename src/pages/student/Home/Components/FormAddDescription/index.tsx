import { useState } from "react";
import { api } from "../../../../../api";
import { ButtonEdit, MainContent, PlaceText, Subtitle } from "./style";
interface props {
    closeModal(data:boolean):void
    refresh(data:boolean):void
}
export function FormAddDescription({closeModal, refresh}:props){
    const [description, setDescription] = useState("")

    async function handleAddDescription(){
        try {
            await api.put("/aluno/descricao", {
                id:localStorage.getItem("user.id"),
                description: description 

            })
            refresh((prev: any) => !prev)
            closeModal(false)
        } catch (error) {
            return alert("Houve um problema ao adicionar o tema.")
        }
    }
    return (
        <MainContent>
            <Subtitle>Insira a nova descrição do seu trabalho.</Subtitle>
            <PlaceText cols={6}  value={description} onChange={(el)=>{setDescription(el.target.value)}} className="form-control" />
            <ButtonEdit onClick={handleAddDescription} className="btn btn-success">Salvar</ButtonEdit>
        </MainContent>
    )
}