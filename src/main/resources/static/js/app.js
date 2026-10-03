const API = '/api';
let token = localStorage.getItem('token');
let currentStatus = 'TODO';

// Auth
document.getElementById('show-login').onclick = () => switchTab('login');
document.getElementById('show-register').onclick = () => switchTab('register');

function switchTab(tab) {
    document.getElementById('show-login').classList.toggle('active', tab === 'login');
    document.getElementById('show-register').classList.toggle('active', tab === 'register');
    document.getElementById('login-form').style.display = tab === 'login' ? 'flex' : 'none';
    document.getElementById('register-form').style.display = tab === 'register' ? 'flex' : 'none';
}

document.getElementById('login-form').onsubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: document.getElementById('login-username').value,
            password: document.getElementById('login-password').value
        })
    });
    const data = await res.json();
    if (res.ok) {
        token = data.token;
        localStorage.setItem('token', token);
        showBoard(data.username);
    } else {
        alert(data.message || 'Login failed');
    }
};

document.getElementById('register-form').onsubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: document.getElementById('reg-username').value,
            password: document.getElementById('reg-password').value
        })
    });
    const data = await res.json();
    if (res.ok) {
        token = data.token;
        localStorage.setItem('token', token);
        showBoard(data.username);
    } else {
        alert(data.message || 'Register failed');
    }
};

document.getElementById('logout-btn').onclick = () => {
    token = null;
    localStorage.removeItem('token');
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('board-section').style.display = 'none';
};

function showBoard(username) {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('board-section').style.display = 'block';
    document.getElementById('username-display').textContent = username;
    loadTasks();
}

// Tasks
async function drag(ev, id) {
    ev.dataTransfer.setData("text", id);
}
function allowDrop(ev) {
    ev.preventDefault();
}
function dropEvent(ev) {
    drop(ev).catch(() => {});
}
async function drop(ev) {
    ev.preventDefault();
    const id = ev.dataTransfer.getData("text");
    const newStatus = ev.currentTarget.dataset.status;
    // Get current task data first
    const getRes = await fetch(`${API}/tasks`, { headers: { 'Authorization': 'Bearer ' + (token || '') } });
    const all = await getRes.json();
    const task = all.find(t => t.id == id);
    if (!task) return;
    const res = await fetch(`${API}/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (token || '')
        },
        body: JSON.stringify({ status: newStatus, title: task.title, description: task.description })
    });
    if (res.ok) loadTasks();
}
async function loadTasks() {
    const res = await fetch(`${API}/tasks`, {
        headers: { 'Authorization': 'Bearer ' + (token || '') }
    });
    const tasks = await res.json();

    ['TODO', 'IN_PROGRESS', 'DONE'].forEach(status => {
        const col = tasks.filter(t => t.status === status);
        document.getElementById('count-todo').textContent = tasks.filter(t => t.status === 'TODO').length;
        document.getElementById('count-progress').textContent = tasks.filter(t => t.status === 'IN_PROGRESS').length;
        document.getElementById('count-done').textContent = tasks.filter(t => t.status === 'DONE').length;

        let containerId = 'todo-tasks';
        if (status === 'IN_PROGRESS') containerId = 'progress-tasks';
        else if (status === 'DONE') containerId = 'done-tasks';
        document.getElementById(containerId).innerHTML = col.map(t => `
            <div class="task-card" draggable="true" ondragstart="drag(event, ${t.id})" ondragover="allowDrop(event)" onclick="editTask(${t.id})">
                <h3>${escapeHtml(t.title)}</h3>
                <p>${escapeHtml(t.description || '')}</p>
                <div class="meta">Assigned: ${escapeHtml(t.assignedTo || 'me')} | ${t.updatedAt || ''}</div>
            </div>
        `).join('');
    });
}

function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function openAddModal(status) {
    currentStatus = status;
    document.getElementById('modal-title').textContent = 'Add Task';
    document.getElementById('task-id').value = '';
    document.getElementById('task-title').value = '';
    document.getElementById('task-desc').value = '';
    document.getElementById('task-status').value = status;
    document.getElementById('task-modal').style.display = 'flex';
}

async function editTask(id) {
    const res = await fetch(`${API}/tasks`, {
        headers: { 'Authorization': 'Bearer ' + (token || '') }
    });
    const tasks = await res.json();
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    currentStatus = task.status;
    document.getElementById('modal-title').textContent = 'Edit Task';
    document.getElementById('task-id').value = task.id;
    document.getElementById('task-title').value = task.title;
    document.getElementById('task-desc').value = task.description || '';
    document.getElementById('task-status').value = task.status;
    document.getElementById('task-modal').style.display = 'flex';
}

document.getElementById('save-task').onclick = async () => {
    const id = document.getElementById('task-id').value;
    const data = {
        title: document.getElementById('task-title').value,
        description: document.getElementById('task-desc').value,
        status: document.getElementById('task-status').value
    };

    const url = id ? `${API}/tasks/${id}` : `${API}/tasks`;
    const method = id ? 'PUT' : 'POST';

    const res = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (token || '')
        },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        document.getElementById('task-modal').style.display = 'none';
        loadTasks();
    } else {
        alert('Operation failed');
    }
};

document.getElementById('cancel-modal').onclick = () => {
    document.getElementById('task-modal').style.display = 'none';
};

// On load
if (token) {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('board-section').style.display = 'block';
    document.getElementById('username-display').textContent = 'User';
    loadTasks();
}
