const theme = document.querySelector('.theme');
const addButton = document.querySelector('.todo-input button');
const itemInput = document.getElementById('todo-input');
const todo = document.querySelector('.todos ul');
const clearButton = document.querySelector('.clear');
const filters = document.querySelectorAll('.filters input[type="radio"]');


/* Change Theme */
theme.addEventListener('click', () => {
    document.body.classList.toggle('light');
    theme.src = document.body.classList.contains('light') ? 'images/icon-moon.svg' : 'images/icon-sun.svg';
});


/*Add items */
addButton.addEventListener('click', addItem);
itemInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') addItem();
});

function addItem() {
    const text = itemInput.value.trim();
    if (text !== '') {
        const item = document.createElement('li');
        item.innerHTML = `
            <label class="list">
                <input class="checkbox" type="checkbox">
                <span class="text">${text}</span>
            </label>
            <span class="remove"></span>
        `;
        todo.appendChild(item);
        itemInput.value = '';
        updateCount(1);
    }
}


/*count items */
const itemCount = document.querySelector('.count span');
function updateCount(num) {
    itemCount.innerText = +itemCount.innerText + num;
}


/*clear complete items */
clearButton.addEventListener('click', clearCompletedTasks);

function clearCompletedTasks() {
    const completedItems = todo.querySelectorAll('.checkbox:checked');
    completedItems.forEach(item => item.closest('li').remove());
    updateCount(-1);
}


/*Filters */
filters.forEach(filter => {
    filter.addEventListener('change', () => {
        const filterValue = filter.id;
        todo.querySelectorAll('li').forEach(item => {
            const checkbox = item.querySelector('.checkbox');
            if (filterValue === 'all') {
                item.style.display = 'flex';
            } else if (filterValue === 'active' && !checkbox.checked) {
                item.style.display = 'flex';
            } else if (filterValue === 'completed' && checkbox.checked) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});