import { X } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";


function ModalAddTask({isOpen, setIsOpen}) {

    const today = new Date();
    const[dateRange, setDateRange] = useState([today, today]);
    const[startDate, endDate] = dateRange;
    const[priority, setPriority] = useState("Média");
    const[category, setCategory] = useState("Estudos")
    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    const id = crypto.randomUUID();

    function handleAddTask(e) {

        e.preventDefault();

        const newTask = {
            id,
            title,
            description,
            category,
            priority,
            startDate,
            endDate
        }

        localStorage.setItem(`task${id}`, JSON.stringify(newTask));

        setIsOpen(false);
        setValue();
    }

    function setValue(){
        setTitle("");
        setDescription("");
        setCategory("Estudos");
        setPriority("Média");
        setDateRange([today, today]);
    }

    if(isOpen){

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="absolute inset-0 bg-black/50" />
                <div className="p-4 relative w-[60%] max-h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col animate-fade-in">
                    <header className='flex p-2 justify-between'>
                        <h2 className="text-2xl font-bold mb-4 text-[#D12474]">Adicionar Nova Tarefa</h2>
                        <button className='text-[#D12474]' onClick={() => setIsOpen(false)}><X /></button>
                    </header>
                    <main className='overflow-y-auto flex-1'>
                        <div className='flex flex-col gap-2 p-2'>
                            <h3>Título</h3>
                            <input className='w-full border border-gray-500 rounded-2xl p-2 placeholder-black'
                                type="text" value={title} onChange={title_value => setTitle(title_value.target.value)} placeholder='Adicione o título da atividade' />

                            <h3>Descrição</h3>
                            <textarea className='w-full border border-gray-500 rounded-2xl p-2 placeholder-black'
                                type="text" value={description} onChange={description_value => setDescription(description_value.target.value)}
                                placeholder='Descreva a atividade'></textarea>

                            <h3>Período da atividade</h3>
                            
                            <DatePicker
                                className='w-full border border-gray-500 rounded-2xl p-2 placeholder-black'
                                wrapperClassName="w-full"
                                selectsRange
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(update) => setDateRange(update)}
                                dateFormat="dd/MM/yyyy"
                                isClearable
                            />
                            
                            <h3>Prioridade</h3>
                            <Select value={priority} onValueChange={(value) => setPriority(value)}>
                                <SelectTrigger className='w-full border border-gray-500 rounded-2xl p-4 placeholder-black'>
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent className='rounded-2xl placeholder-black'>
                                    <SelectItem className='border rounded-2xl placeholder-black' value="Alta">Alta</SelectItem>
                                    <SelectItem className='rounded-2xl placeholder-black' value="Média">Média</SelectItem>
                                    <SelectItem className='rounded-2xl placeholder-black' value="Baixa">Baixa</SelectItem>
                                </SelectContent>
                            </Select>

                            <h3>Categoria</h3>
                            <Select value={category} onValueChange={(value) => setCategory(value)}>
                                <SelectTrigger className='w-full border border-gray-500 rounded-2xl p-4 placeholder-black'>
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

                    </main>
                    <div className='flex justify-end gap-2 mt-4'>
                        <button onClick={() => setIsOpen(false)} className='bg-gray-300 text-black rounded-2xl p-2 px-4'>Cancelar</button>
                        <button type="submit"
                            onClick={handleAddTask} 
                            disabled={!title} 
                            className='bg-[#D12474] text-white rounded-2xl p-2 px-4 transition disabled:opacity-50 disabled:cursor-not-allowed'
                            >Adicionar</button>
                    </div>
                </div>
            </div>
        )

    }
    return null;

}

export default ModalAddTask;