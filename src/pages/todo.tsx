
import Snabbdom from 'snabbdom-pragma'

import type { ToDo } from './api/toDoAPI';

// API methods
import {
    getToDos,
    getToDoById,
    addToDo,
    updateToDo,
    deleteToDo
} from '../api/toDoAPI';

import Navigo from 'navigo';

let oldVNode: VNode;
let todos : ToDo[] = [] 

let patch: any;
let container: Element;

export function setup(p: any, c: Element): void {
    patch = p;
    container = c;
}

export async function renderToDoPage() : Promise<void> {
    todos = await getToDos();
    const vnode = render();
    oldVNode = patch(container, vnode);
}

function render(): VNode {
    return (
        <div>
            <h1>My TODOS</h1>
            <input
                props={{
                    type: "text",
                    id: "new-todo",
                    placeholder: "Add a todo"
                }}
            />
            <button on={{ click: onAddToDo }}>Add</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                    {todo.title}
                    <button on={{ click: () => onDeleteToDo(todo.id) }}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}



async function onAddToDo() : void {
    const input = document.getElementById("new-todo");
    if (!input) return;
    const title = input.value.trim();
    if (!title) return;
    console.log("add todo: " + title);
    const newToDo : ToDo = await addToDo(title);
    todos.push(newToDo);
    update();
    input.value = ''; // clear input
}

async function onDeleteToDo(id : number | string) : void {
    await deleteToDo(id);
    todos = todos.filter(t => t.id !== id);
    update();
}

function update(): void {
    const newVNode = render();
    oldVNode = patch(oldVNode, newVNode); 
}

