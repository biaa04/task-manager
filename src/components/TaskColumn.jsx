import { Plus } from "lucide-react";
import Task from "./Task";
import TaskPage from "./TaskPage";
import { useNavigate } from "react-router-dom";

function TaskColumn({day, tasks, setIsOpen, date, today}) {
    
    const navigate = useNavigate();

    const completedTasks = tasks.filter(
      task => task.status === "Concluída"
    );

    return(
        <section className={`flex flex-col bg-gray-100 px-4 py-2 rounded-2xl border h-[500px] pb-4 w-[16%] shadow-md ${today === date ? 'border-[#D12474] border-2' : 'border-gray-300 '}`}>
            <header className="mb-4 flex justify-between items-center">
              <h2 className="font-semibold">{day}</h2>
              <button className="text-xs hover:bg-[#D12474] p-2 hover:text-white rounded-full" onClick={() => setIsOpen(true)}> <Plus size={16} /> </button>
            </header>
            <div className="flex-1 overflow-y-auto flex flex-col gap-2">
               {tasks.length === 0 ? (
                  <p className="text-sm text-center py-16">Nenhuma atividade</p>
                ) : (
                  tasks.map(task => (
                    <div onClick={() => navigate(`/task/${task.id}`)} key={task.id}>
                      <Task key={task.id} task={task} />
                    </div>
                  ))
                )}
            </div>
            <footer className="mt-4 flex justify-center">
              <p>{completedTasks.length}/{tasks.length} Concluídas</p>
            </footer>
        </section>
    )
}

export default TaskColumn;