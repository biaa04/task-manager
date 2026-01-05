import { Plus, ListTodo } from "lucide-react";
import taskData from '../data/task_itens.json';
import { useState } from "react";

function AddTask({setIsOpen}) {

    const [tasks, setTasks] = useState(taskData);

    return (
        <div className="bg-gray-100 w-[90%] border border-red-500 rounded-3xl py-4 shadow-md">
            <header className=" flex flex-row justify-between items-center pb-4 px-6">
                <div  className="flex flex-row gap-2">
                    <div className="bg-[#f0c5d9] rounded-full px-2 py-2 text-[#D12474]"><ListTodo /></div>
                    <h1>Atividades gerais</h1>
                    <p>({tasks.length} pendentes)</p>
                </div>
                <button onClick={() => setIsOpen(true)} className="flex flex-row border border-gray-200 px-6 py-2 rounded-2xl bg-[#D12474] shadow-md text-white"><Plus /> Adicionar</button>
            </header>
            <div className="flex flex-col gap-2 overflow-y-auto px-6 max-h-[240px] mr-4">
                {tasks.map((task) => (
                    <button key={task.id} className=" border border-[#D12474] bg-gray-200 w-full text-left shadow-md rounded-2xl px-4 py-3">{task.title}</button>
                ))}
            </div>
        </div>
    );
}

export default AddTask;