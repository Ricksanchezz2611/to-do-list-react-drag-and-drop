import { useState } from 'react'
import './App.css'
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import Column from './components/Column/Column';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Input from './components/Input/Input';
function App() {
  const [tasks,settasks] = useState([
    {id: 1,title: "add tests to homepage"},
    {id: 2,title: "Fix styling in about section"},
    {id: 3,title: "Learn how to center a div"},
  ]);

  const addtask = (title) => {
    settasks((tasks) => [...tasks,{
      id :  tasks.length + 1,title
    }]);
  };

  const getTaskPos =  id => tasks.findIndex(task => task.id === id)

  const handledragend = event => {
    const {active,over} = event;

    if(active.id === over.id)return;
    settasks((tasks)=>{
      const originalPos = getTaskPos(active.id);
      const newpos = getTaskPos(over.id);
      return arrayMove(tasks,originalPos,newpos);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <>
      <div className="App">
      <div className="text">
      <h1>To-do-List</h1>
      <h4>(drag and play)</h4></div>  
      <DndContext sensors={sensors} onDragEnd={handledragend} collisionDetection={closestCorners}>
        <Input onSubmit={addtask}/>
        <Column tasks={tasks}/>
      </DndContext>
      </div>
    </>
  )
}

export default App
