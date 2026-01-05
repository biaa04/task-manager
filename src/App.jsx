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
  const current = normalizeDate(date);
  const start = normalizeDate(task.startDate);
  const end = normalizeDate(task.endDate);

  return current >= start && current <= end;
}

function getWeekDays() {
  const today = new Date();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay());

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    return d;
  });
}


function App() {
  
  const [isOpen, setIsOpen] = useState(false);
  const weekDays = getWeekDays();
  const [tasks, setTasks] = useState(() => {

    const loadedTasks = [];

    for(let i=0; i<localStorage.length; i++){
      const key = localStorage.key(i);
      if(key.startsWith('task')){
        const task = JSON.parse(localStorage.getItem(key));
        loadedTasks.push({
        ...task,
        startDate: new Date(task.startDate),
        endDate: new Date(task.endDate),
        });
      }
    }

      return loadedTasks;

  });

  return (
    <div className="w-screen h-screen bg-gray-200">
      <header className="flex items-center justify-between py-4 w-[90%] mx-auto">
        <div>
          <h1 className="font-bold text-4xl">Tarefas da Semana</h1>
          <p>data</p>
        </div>
        <div className="flex items-center gap-3">
          <button className='border border-black px-2 py-2 rounded-full shadow-md'> <ChevronLeft /> </button>
          <button className='border border-black px-4 py-2 rounded-xl shadow-md'>hoje</button>
          <button className='border border-black px-2 py-2 rounded-full shadow-md'> <ChevronRight /> </button>
          <button 
              className='flex border bg-[#D12474] text-white px-6 py-2 rounded-2xl shadow-md'
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
                tasks={tasksOfDay}
              />
            );
          })}
        </div>
        <div className='bg-gray-200 flex justify-center py-4 '>
          <AddTask setIsOpen={setIsOpen} />
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

export default App;