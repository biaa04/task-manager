function Task({ task }) {

    const categoryColors = {
        Estudos: "bg-[#5A4E8C]",
        Trabalho: "bg-[#1F3A5F]",
        Pessoal: "bg-[#2F6F5E]",
        Faculdade: "bg-[#E6DDBF]",
        Finanças: "bg-[#C97A63]",
        Saúde: "bg-[#7FB8A6]",
        }

        const priorityColors = {
        Alta: "bg-[#E6B8A2]",
        Média: "bg-[#D9EFE8]",
        Baixa: "bg-[#C9DFF2]",
        }


    return (
        <div className="bg-[#f0c5d9] p-2 rounded-xl shadow border flex flex-col gap-1 hover:opacity-80">
            <h3 className="font-semibold text-sm mb-1">{task.title}</h3>

            <div className="text-xs text-gray-600 flex justify-between">
                <span className={`text-white px-2 py-1 rounded-2xl ${categoryColors[task.category] || "bg-[#f0c5d9]"}`}>{task.category}</span>
                <span className={`text-black px-2 py-1 rounded-2xl ${priorityColors[task.priority] || "bg-[#f0c5d9]"}`}>{task.priority}</span>
            </div>

            <span className="text-xs text-[#D12474] mt-1">
                {task.status}
            </span>
        </div>
    );
}

export default Task;
