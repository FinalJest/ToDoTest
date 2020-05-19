import React, { ChangeEvent,
                KeyboardEvent,
                useCallback,
                useMemo,
                useState } from 'react';

import getClassNameWithMods from '../lib/getClassNameWithMods';

import './TaskContainer.css';

interface ITask {
    id: number;
    text: string;
    completed: boolean;
}

export default function TaskContainer(): React.ReactElement {
    const defaultTaskList: ITask[] = [];
    const [taskList, changeTaskList] = useState(defaultTaskList);
    const [newFieldError, setNewFieldError] = useState(false);

    const addNewTask = useMemo(() => () => {
        const currentMaxId = taskList.reduce((result, task) => task.id > result ? task.id : result, -1);
        const newFieldInput = document.getElementById('newTaskField');

        if (!(newFieldInput instanceof HTMLInputElement)) {
            return;
        }

        const newFieldValue = newFieldInput.value;

        if (!newFieldValue) {
            setNewFieldError(true);

            return;
        }

        if (newFieldError) {
            setNewFieldError(false);
        }

        changeTaskList([...taskList, {
            id: currentMaxId + 1,
            text: newFieldValue,
            completed: false
        }])

        newFieldInput.value = '';
    }, [newFieldError, taskList]);

    const onAddNewTask = useCallback(() => {
        addNewTask();
    }, [addNewTask]);
    const onCheckboxChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.currentTarget;
        const parsedId = parseInt(id, 10);

        if (isNaN(parsedId)) {
            return;
        }

        changeTaskList(taskList.map((task) => task.id === parsedId ? { ...task, checked } : task));
    }, [taskList]);
    const onNewTaskPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            addNewTask();
        }
    }, [addNewTask])

    const taskListElements = useMemo(() => {
        if (!taskList.length) {
            return (
                <div className="noTasks">
                    No current tasks
                </div>
            );
        }

        return taskList.map((task) => {
            const { id,
                    text,
                    completed } = task;
            const checkboxName = `box${id}`;

            return (
                <div key={`key${id}`} className={getClassNameWithMods('Task', {completed})}>
                    <input onChange={onCheckboxChange} type="checkbox" id={`${id}`} name={checkboxName} value={id}/>
                    <label htmlFor={checkboxName}>{text}</label>
                </div>
            );
        });
    }, [taskList, onCheckboxChange]);

    return (
        <div className="TaskContainer">
            {taskListElements}

            <div className="AddNewTaskFieldContainer">
                <input
                    id="newTaskField"
                    className="AddNewTaskField"
                    type="text" name="newTaskField"
                    placeholder="New task"
                    onKeyUp={onNewTaskPress}
                />
                <button type="submit" onClick={onAddNewTask}>
                    Add
                </button>
            </div>
            <div className={getClassNameWithMods('ErrorContainer', { visible: newFieldError })}>
                <span>
                    You need to write task's text before adding it
                </span>
            </div>
        </div>
    )
}
