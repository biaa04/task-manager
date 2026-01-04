import { Plus } from "lucide-react";

function TaskColumn({day}){
    return(
        <section className="flex flex-col bg-gray-100 px-4 py-2 rounded-2xl border border-gray-300 h-[500px] pb-4 w-[16%] shadow-md">
            <header className="mb-4 flex justify-between items-center">
              <h2 className="font-semibold">{day}</h2>
              <button className="text-xs"> <Plus size={16} /> </button>
            </header>
            <div className="flex-1 overflow-y-auto flex items-start justify-center">
              <p className="text-sm">Nenhuma atividade</p>
            </div>
            <footer className="mt-4 flex justify-center">
              <p>0/0 Concluídas</p>
            </footer>
        </section>
    )
}

export default TaskColumn;