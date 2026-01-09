import { Plus, ListTodo, Pencil, Trash2, LibraryBig, MonitorCog, UserStar, GraduationCap, CircleDollarSign, Hospital, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AddTask({setIsOpen, tasks, deleteTask}) {

    const navigate = useNavigate()

    const generalTasks = tasks.filter(
        task => !task.startDate && !task.endDate
        );

    function addEmoji(task){
        console.log(task.category);
        switch(task.category){
            case "Trabalho":
                return <MonitorCog />;
            case "Estudos":
                return <LibraryBig />;
            case "Pessoal":
                return <UserStar />;
            case "Faculdade":
                return <GraduationCap />;
            case "Finanças":
                return <CircleDollarSign />; 
            case "Saúde":
                return <Hospital />;
            default:
                return <Heart />;
            
        }
    }

    return (
        <div className="bg-gray-100 w-[90%] border border-red-500 rounded-3xl py-4 shadow-md">
            <header className=" flex flex-row justify-between items-center pb-4 px-6">
                <div  className="flex flex-row gap-2">
                    <div className="bg-[#f0c5d9] rounded-full px-2 py-2 text-[#D12474]"><ListTodo /></div>
                    <h1>Atividades gerais</h1>
                    <p>({generalTasks.length} pendentes)</p>
                </div>
                <button onClick={() => setIsOpen(true)} className="flex flex-row border border-gray-200 px-6 py-2 rounded-2xl gap-2 bg-[#D12474] shadow-md text-white hover:opacity-80"><Plus /> Adicionar</button>
            </header>
            <div className="flex flex-col gap-2 overflow-y-auto px-6 pb-8 max-h-[240px] mr-4">
                {generalTasks.length === 0 ? (
                    <div className="flex flex-col items-center gap-1">
                        <div className="text-[#D12474]"><ListTodo size={40}/></div>
                        <p className="text-xl text-center">Nenhuma atividade geral</p>
                        <p className="text-sm text-center">Adicione tarefas que não têm dia específico</p>
                    </div>
                ) : (generalTasks.map((task) => (
                    <button key={task.id} className=" border border-[#D12474] bg-gray-200 w-full  text-left shadow-md rounded-2xl px-2 py-1 hover:opacity-80">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-xl text-[#D12474]">{addEmoji(task)}</span>
                                <span className="font-medium">{task.title}</span>
                            </div>
                            <div className="float-right flex gap-1 items-center">
                                <button className="hover:bg-[#D12474] p-2 hover:text-white rounded-full" onClick={() => navigate(`/task/${task.id}`)}><Pencil size={15}/></button>
                                <button className="hover:bg-[#D12474] p-2 hover:text-white rounded-full" onClick={(e) => {e.stopPropagation(); deleteTask(task.id);}}><Trash2 size={15}/></button>
                            </div>
                        </div>
                    </button>
                )))}
            </div>
        </div>
    );
}

export default AddTask;