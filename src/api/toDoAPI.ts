
const API_BASE = '/api';

// TODO: add some error handling lmao
export type ToDo = {
    id: number
    title: string
    completed: boolean
}

export async function getToDos() : Promise<ToDo[]> {
    const res = await fetch(`${API_BASE}/todos`);
    return res.json();
}

export async function getToDoById(id : number | string) : Promise<ToDo> {
    const res = await fetch(`${API_BASE}/todos/${id}`);
    return res.json();
}

export async function addToDo(title : string) : Promise<ToDo> {
    const res = await fetch(`${API_BASE}/todos?title=${encodeURIComponent(title)}`, {
        method: 'POST'
    });
    return res.json();
}

export async function updateToDo(   id: number | string,
                                    title: string,
                                    completed: boolean) {
    const res = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            "title": title,
            "completed": completed
        })
    })
}

export async function deleteToDo(id: number | string): Promise<void> {
    await fetch(`${API_BASE}/todos/${id}`, {
        method: 'DELETE'
    });
}

