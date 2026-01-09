import {ChevronLeft, ChevronRight, Plus} from 'lucide-react';
import TaskColumn from './components/TaskColumn';
import AddTask from './components/AddTask';
import TaskCompleted from './components/TaskCompleted';
import ModalAddTask from './components/ModalAddTask';
import { useState } from 'react';


const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];


function normalizeDate(d) {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);
    return date;
}

function taskBelongsToDate(task, date) {
    if (!task.startDate || !task.endDate) return false;

    const current = normalizeDate(date);
    const start = normalizeDate(task.startDate);
    const end = normalizeDate(task.endDate);

    return current >= start && current <= end;
}


function getWeekDays(baseDate) {
    const date = new Date(baseDate);
    const sunday = new Date(date);
    sunday.setDate(date.getDate() - date.getDay());

    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(sunday);
        d.setDate(sunday.getDate() + i);
        return d;
    });
}


function Home({setTasks, tasks, deleteTask}) {
  
    const [isOpen, setIsOpen] = useState(false);
    const [currentWeek, setCurrentWeek] = useState(new Date())
    console.log(currentWeek);
    const weekDays = getWeekDays(currentWeek);

    function goToPreviousWeek(){
        const newDate = new Date(currentWeek)
        newDate.setDate(currentWeek.getDate() - 7)
        setCurrentWeek(newDate)
    }

    function goToToday(){
        setCurrentWeek(new Date())
    }

    function goToNextWeek(){
        const newDate = new Date(currentWeek)
        newDate.setDate(currentWeek.getDate() + 7)
        setCurrentWeek(newDate)
    }

    const weekStart = weekDays[0].toLocaleDateString("pt-BR");
    const weekEnd = weekDays[6].toLocaleDateString("pt-BR");


  return (
    <div className="w-screen h-screen bg-gray-200">
      <header className="flex items-center justify-between py-8 w-[90%] mx-auto">
        <div >
          <h1 className="font-bold text-4xl pb-2">Tarefas da Semana</h1>
          <p>{weekStart} - {weekEnd}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className='border border-gray-400 px-2 py-2 rounded-full shadow-md hover:border-[#D12474] hover:bg-[#FDECEF] hover:text-[#D12474]' onClick={() => goToPreviousWeek()}> <ChevronLeft /> </button>
          <button className='border border-gray-400 px-6 py-2 rounded-2xl shadow-md hover:border-[#D12474] hover:bg-[#FDECEF] hover:text-[#D12474]' onClick={() => goToToday()}>Hoje</button>
          <button className='border border-gray-400 px-2 py-2 rounded-full shadow-md hover:border-[#D12474] hover:bg-[#FDECEF] hover:text-[#D12474]' onClick={() => goToNextWeek()}> <ChevronRight /> </button>
          <button 
              className='flex border bg-[#D12474] text-white px-6 py-2 rounded-2xl shadow-md gap-2 hover:opacity-80'
              onClick={() => setIsOpen(true)}
              > <Plus /> Adicionar Tarefa</button>
        </div>
      </header>
      <main className='bg-gray-200 flex flex-col gap-6'>
        <div className='w-[90%] mx-auto flex justify-center gap-2 '>
          {weekDays.map((date, index) => {
            const tasksOfDay = tasks.filter(task =>
              taskBelongsToDate(task, date)
            );

            return (
              <TaskColumn
                key={date.toISOString()}
                day={days[index]}
                date={date.toLocaleDateString("pt-BR")}
                today={new Date().toLocaleDateString("pt-BR")}
                tasks={tasksOfDay}
                setIsOpen={setIsOpen}
              />
            );
          })}
        </div>
        <div className='bg-gray-200 flex justify-center py-4 '>
          <AddTask setIsOpen={setIsOpen} tasks={tasks} deleteTask={deleteTask} />
        </div>
        <div className='bg-gray-200 flex justify-center py-4'>
          <TaskCompleted />
        </div>
      </main>

      <div>
          <ModalAddTask isOpen={isOpen} setIsOpen={setIsOpen} setTasks={setTasks} />
      </div>
    </div>
  )
}

export default Home;