const storageKey = 'modern-todo-items-v1'
const el = id=>document.getElementById(id)
let todos = []
let filter = 'all'

function save(){ localStorage.setItem(storageKey, JSON.stringify(todos)) }
function load(){ const raw = localStorage.getItem(storageKey); todos = raw?JSON.parse(raw):[] }

function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,6)}

function render(){
  const list = el('todoList'); list.innerHTML=''
  const filtered = todos.filter(t=> filter==='all' ? true : filter==='active' ? !t.done : t.done)
  for(const t of filtered){
    const li = document.createElement('li'); li.className='todo-item'+(t.done?' completed':'');
    li.dataset.id = t.id

    const check = document.createElement('button'); check.className='check'; check.innerHTML = t.done? '✓':''
    check.title = 'Toggle'
    check.addEventListener('click', ()=>{ t.done = !t.done; save(); render(); })

    const label = document.createElement('div'); label.className='label'; label.textContent = t.text
    label.contentEditable = true
    label.spellcheck = false
    label.addEventListener('blur', ()=>{ t.text = label.textContent.trim() || t.text; save(); render(); })
    label.addEventListener('keydown',(ev)=>{ if(ev.key==='Enter'){ ev.preventDefault(); label.blur(); } })

    const actions = document.createElement('div'); actions.className='actions'
    const del = document.createElement('button'); del.className='icon-btn'; del.textContent='🗑'; del.title='Delete'
    del.addEventListener('click', ()=>{ todos = todos.filter(x=>x.id!==t.id); save(); render(); })

    actions.appendChild(del)
    li.appendChild(check); li.appendChild(label); li.appendChild(actions)
    list.appendChild(li)
  }

  el('itemsLeft').textContent = `${todos.filter(t=>!t.done).length} items left`
  // update filter buttons
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.toggle('active', b.dataset.filter===filter))
}

function addTodo(text){ const trimmed = text.trim(); if(!trimmed) return; todos.unshift({id:uid(), text:trimmed, done:false}); save(); render(); }

function clearCompleted(){ todos = todos.filter(t=>!t.done); save(); render(); }

function bind(){
  el('todoForm').addEventListener('submit', e=>{ e.preventDefault(); addTodo(el('todoInput').value); el('todoInput').value=''; })
  el('clearCompleted').addEventListener('click', clearCompleted)
  document.querySelectorAll('.filter-btn').forEach(b=> b.addEventListener('click', ()=>{ filter = b.dataset.filter; render(); }))
  el('themeToggle').addEventListener('click', ()=>{ document.documentElement.classList.toggle('dark'); el('themeToggle').textContent = document.documentElement.classList.contains('dark')? '☀️':'🌙' })
}

// Init
load(); document.addEventListener('DOMContentLoaded', ()=>{ bind(); render(); })
