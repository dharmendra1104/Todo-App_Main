const theme = document.querySelector('.theme');
const addButton = document.querySelector('.todo-input button');
const itemInput = document.getElementById('todo-input');
const todo = document.querySelector('.todos ul');
const clearButton = document.querySelector('.clear');
const mobClearButton = document.querySelector('.mob-clear');
const filters = document.querySelectorAll('.filters input[type="radio"]');

/* Change Theme */
const themePreference = localStorage.getItem('theme');

// Apply theme preference if it exists in local storage
if (themePreference) {
    document.body.classList.toggle('light', themePreference === 'light');
    theme.src = themePreference === 'light' ? 'images/icon-moon.svg' : 'images/icon-sun.svg';
}

/* Change Theme */
theme.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const themePreference = document.body.classList.contains('light') ? 'light' : 'dark';
    theme.src = themePreference === 'light' ? 'images/icon-moon.svg' : 'images/icon-sun.svg';
    localStorage.setItem('theme', themePreference); // Save theme preference in local storage
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
        item.querySelector('.remove').addEventListener('click', removeItem);
    }
}

/* Remove items */
function removeItem(event) {
    const listItem = event.target.closest('li');
    listItem.remove();
    updateCount(-1);
}

/*count items */
const itemCount = document.querySelector('.count span');
const mobItemCount = document.querySelector('.mob-count span');

function updateCount(num) {
    const currentCount = +itemCount.innerText;
    const newCount = currentCount + num;
    itemCount.innerText = newCount >= 0 ? newCount : 0;
    mobItemCount.innerText = newCount >= 0 ? newCount : 0;
}

/*clear complete items */
clearButton.addEventListener('click', clearCompletedTasks);
mobClearButton.addEventListener('click', clearCompletedTasks);
function clearCompletedTasks() {
    const completedItems = todo.querySelectorAll('.checkbox:checked');
    const numCompleted = completedItems.length;
    completedItems.forEach(item => item.closest('li').remove());
    updateCount(-numCompleted);
    // Subtract the number of completed items from the total count
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



