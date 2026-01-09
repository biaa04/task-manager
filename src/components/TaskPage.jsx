import { useState} from "react";
import { useParams} from "react-router-dom";
import DatePicker from "react-datepicker";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useNavigate } from "react-router-dom";

import { House } from "lucide-react";

function TaskPage({setTasks, deleteTask}) {

    const { id } = useParams();

    const taskFromStorage = (() => {
        const stored = localStorage.getItem(`task${id}`);
        if (!stored) return null;

        const parsed = JSON.parse(stored);
        return {
        ...parsed,
        startDate: parsed.startDate ? new Date(parsed.startDate) : null,
        endDate: parsed.endDate ? new Date(parsed.endDate) : null,
        };
    })();

    const [task, setTask] = useState(taskFromStorage);
    const [draft, setDraft] = useState(taskFromStorage);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    if (!task) return <p className="p-8">Carregando...</p>;

    function handleSave() {
        const normalizedDraft = {
            ...draft,
            startDate: draft.startDate ? new Date(draft.startDate) : null,
            endDate: draft.endDate ? new Date(draft.endDate) : null,
        };

        localStorage.setItem(`task${id}`, JSON.stringify(normalizedDraft));

        setTasks(prev =>
            prev.map(t =>
            t.id === normalizedDraft.id ? normalizedDraft : t
            )
        );

        setTask(normalizedDraft);
        setIsEditing(false);
}

    function handleCancel(){
        setDraft(task);
        setIsEditing(false);
    }

    return(
        <div className="bg-gray-200 w-full min-h-screen flex items-center justify-center">
            <div className="absolute top-4 left-4 cursor-pointer text-gray-600 hover:text-[#D12474] p-4">
                <button onClick={() => navigate("/")}><House /></button>
            </div>
            <div className="flex flex-col border border-[#D12474] rounded-3xl w-[80%] h-[90vh] max-w-5xl bg-white shadow-md overflow-y-auto overflow-x-hidden">
                <header className="flex justify-start mx-auto mt-6 w-[80%]">
                {!isEditing ? (<h3 className="w-full break-words overflow-hidden text-4xl">{task.title}</h3>) : 
                (<div className="w-full">
                    <h4 className="text-xl pb-2">Título</h4>
                    <input className='w-full h-10 border border-gray-500 shadow-md rounded-2xl p-2'
                    type="text" value={draft.title} onChange={(title_value) => setDraft({ ...draft, title: title_value.target.value})} />
                </div>)}
                </header>
                <main className="flex flex-col w-[80%] mx-auto mt-2 mb-2 h-[60%]">

                    <div>
                        <h4 className="text-xl pb-2">Descrição</h4>
                        {!isEditing ? (<p className="border bg-gray-100 mb-2 border-black shadow-md rounded-2xl px-4 py-4 h-40 overflow-y-auto break-words overflow-x-hidden">{task.description}</p>) : 
                            (<textarea className='w-full h-40 border border-gray-500 shadow-md rounded-2xl p-2'
                            value={draft.description} onChange={(desc_value) => setDraft({ ...draft, description: desc_value.target.value})} />)}
                    </div>
                    
                    <div className="flex justify-between gap-4">
                        <div className="flex flex-col w-full">
                            <h4 className="text-xl py-2">Período da atividade</h4>
                            <div className="relative w-fit">
                                <DatePicker
                                    className={`border border-black shadow-md rounded-2xl p-2 pr-10 ${
                                            !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
                                        }`}
                                    wrapperClassName="w-full"
                                    selectsRange
                                    startDate={draft.startDate}
                                    endDate={draft.endDate}
                                    onChange={(update) => {
                                        if (!isEditing) return;

                                        setDraft({
                                            ...draft,
                                            startDate: update?.[0] ?? null,
                                            endDate: update?.[1] ?? null,
                                        });
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    disabled={!isEditing}
                                    isClearable={isEditing}
                                    placeholderText="Indefinido"
                                />
                            </div>

                            <h4 className="text-xl py-2">Status</h4>
                            <Select value={draft.status} onValueChange={(value) => setDraft({ ...draft, status: value})} disabled={!isEditing}>
                                    <SelectTrigger className={`border border-black p-4 shadow-md rounded-2xl ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}>
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent className='rounded-2xl placeholder-black'>
                                        <SelectItem className='border rounded-2xl placeholder-black' value="Em Andamento">Em Andamento</SelectItem>
                                        <SelectItem className='rounded-2xl placeholder-black' value="Pendente">Pendente</SelectItem>
                                        <SelectItem className='rounded-2xl placeholder-black' value="Concluída">Concluída</SelectItem>
                                    </SelectContent>
                            </Select>

                        </div>

                        <div className="flex flex-col w-full">
                            <h4 className="text-xl py-2">Prioridade</h4>
                            <div className="mb-1">
                                <Select value={draft.priority} onValueChange={(value) => setDraft({ ...draft, priority: value})} disabled={!isEditing}>
                                    <SelectTrigger className={`border border-black shadow-md rounded-2xl p-4 ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}>
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent className='rounded-2xl placeholder-black'>
                                        <SelectItem className='border rounded-2xl placeholder-black' value="Alta">Alta</SelectItem>
                                        <SelectItem className='rounded-2xl placeholder-black' value="Média">Média</SelectItem>
                                        <SelectItem className='rounded-2xl placeholder-black' value="Baixa">Baixa</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <h4 className="text-xl py-2">Categoria</h4>
                            <div className="w-full">
                                <Select value={draft.category} onValueChange={(value) => setDraft({ ...draft, category: value})} disabled={!isEditing}>
                                    <SelectTrigger className={`border border-black shadow-md rounded-2xl p-4 ${!isEditing ? "bg-gray-100 cursor-not-allowed" : ""}`}>
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent className='rounded-2xl placeholder-black'>
                                        <SelectItem className='rounded-2xl placeholder-black' value="Estudos">Estudos</SelectItem>
                                        <SelectItem className='rounded-2xl placeholder-black' value="Trabalho">Trabalho</SelectItem>
                                        <SelectItem className='rounded-2xl placeholder-black' value="Pessoal">Pessoal</SelectItem>
                                        <SelectItem className='rounded-2xl placeholder-black' value="Faculdade">Faculdade</SelectItem>
                                        <SelectItem className='rounded-2xl placeholder-black' value="Finanças">Finanças</SelectItem>
                                        <SelectItem className='rounded-2xl placeholder-black' value="Saúde">Saúde</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                </main>
                <footer className="flex items-center justify-end py-4 w-[80%] mx-auto mb-6">
                    {!isEditing ? 
                    (<div className="flex gap-4">
                        <button className="bg-[#D12474] text-white px-4 py-2 rounded-2xl" onClick={(e) => {e.stopPropagation(); deleteTask(task.id); navigate("/");}}>Deletar</button>
                        <button className="bg-[#D12474] text-white px-4 py-2 rounded-2xl" onClick={() => setIsEditing(true)}>Editar</button>
                    </div>) : 
                    ( <div className="flex gap-4">
                        <button className="bg-[#D12474] text-white px-4 py-2 rounded-2xl" onClick={handleCancel}>Cancelar</button>
                        <button className="bg-[#D12474] text-white px-4 py-2 rounded-2xl" onClick={handleSave}>Salvar Alterações</button> 
                    </div> )}
                </footer>
            </div>
        </div>
    )
}

export default TaskPage;