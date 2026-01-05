function Task({ task }) {

    const categoryColors = {
        Estudos: "bg-[#1E3A8A]",
        Trabalho: "bg-[#6D28D9]",
        Pessoal: "bg-[#166534]",
        Faculdade: "bg-[#FACC15]",
        Finanças: "bg-[#EA580C]",
        Saúde: "bg-[#B91C1C]",
    }

    const priorityColors = {
        Alta: "bg-[#C7EDE6]",
        Média: "bg-[#D1FAE5]",
        Baixa: "bg-[#DBEAFE]",
    }
    return (
        <div className="bg-[#f0c5d9] p-4 rounded-xl shadow border flex flex-col gap-1">
        <h3 className="font-semibold text-sm">{task.title}</h3>

        <div className="text-xs text-gray-600 flex justify-between">
            <span className={`text-white p-1 rounded-2xl ${categoryColors[task.category] || "bg-[#f0c5d9]"}`}>{task.category}</span>
            <span className={`text-white p-1 rounded-2xl ${priorityColors[task.priority] || "bg-[#f0c5d9]"}`}>{task.priority}</span>
        </div>

        <span className="text-xs text-gray-500">
            {task.status}
        </span>
        </div>
    );
}

export default Task;
