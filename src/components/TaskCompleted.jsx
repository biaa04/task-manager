import { Plus, ListTodo } from "lucide-react";
import taskDataCompleted from '../data/task_completed.json'
import { useState } from "react";

function TaskCompleted() {

    const [tasksCompleted, setTasksCompleted] = useState(taskDataCompleted);

    return (
        <div className="bg-gray-100 w-[80%] border border-red-500 rounded-3xl py-4 shadow-md">
            <header className=" flex flex-row justify-between items-center pb-4 px-6">
                <div  className="flex flex-row gap-2">
                    <div className="bg-[#f0c5d9] rounded-full px-2 py-2 text-[#D12474]"><ListTodo /></div>
                    <h1>Atividades Concluídas</h1>
                    <p>(Concluídas)</p>
                </div>
            </header>
            <div className="flex flex-col items-center gap-2 overflow-y-auto px-6">
                {tasksCompleted.map((taskCompleted) => (
                    <button key={taskCompleted.id} className=" border border-[#D12474] bg-gray-200 w-full text-left shadow-md rounded-2xl px-4 py-3">{taskCompleted.title}</button>
                ))}
            </div>
        </div>
    );
}

export default TaskCompleted;

