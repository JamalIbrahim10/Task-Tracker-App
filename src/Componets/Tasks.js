import Task from './Task'

const Tasks = ({tasks, onDelete, onToggle}) => {
    
    return (
        <>
        {
          tasks.map((item, index) =>(<Task key = {index} item = {item} onDelete = {onDelete} onToggle = {onToggle} />
        ))
        }
            
        </>
    )
}

export default Tasks
