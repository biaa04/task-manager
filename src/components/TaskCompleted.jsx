import { Plus, ListTodo } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TaskCompleted() {

    const [tasksCompleted] = useState(() => {
        return Object.keys(localStorage)
        .filter((key) => key.startsWith("task"))
        .map((key) => JSON.parse(localStorage.getItem(key)))
        .filter(
            (task) => task.status==="Concluída"
        );
    });

    const navigate = useNavigate()

    return (
        <div className="bg-gray-100 w-[90%] border border-red-500 rounded-3xl py-4 shadow-md">
            <header className=" flex flex-row justify-between items-center pb-4 px-6">
                <div  className="flex flex-row gap-2">
                    <div className="bg-[#f0c5d9] rounded-full px-2 py-2 text-[#D12474]"><ListTodo /></div>
                    <h1>Atividades Concluídas</h1>
                    <p>({tasksCompleted.length} {tasksCompleted.length > 1 ? "Concluídas" : "Concluída"})</p>
                </div>
            </header>
            <div className="flex flex-col gap-2 overflow-y-auto px-6 max-h-[240px] mr-4 pb-8">
                {tasksCompleted.length === 0 ? (
                    <div className="flex flex-col items-center gap-1">
                        <div className="text-[#D12474]"><ListTodo size={40}/></div>
                        <p className="text-xl text-center">Nenhuma atividade concluída</p>
                        <p className="text-sm text-center">Não esqueça de concluir suas atividades</p>
                    </div>
                ) : (tasksCompleted.map((task) => (
                    <button key={task.id} className=" border border-[#D12474] bg-gray-200 w-full text-left shadow-md hover:opacity-80 rounded-2xl px-4 py-3">{task.title}
                        <div className="float-right flex gap-1 items-center">
                            <button className="hover:bg-[#D12474] p-2 hover:text-white rounded-full" onClick={() => navigate(`/task/${task.id}`)}><Pencil size={15}/></button>
                            <button className="hover:bg-[#D12474] p-2 hover:text-white rounded-full"><Trash2 size={15}/></button>
                        </div>
                    </button>
                )))}
            </div>
        </div>
    );
}

export default TaskCompleted;

