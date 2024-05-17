document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItemButton');
    const itemList = document.getElementById('itemList');

    // ローカルストレージからアイテムを取得して表示
    function loadItems() {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.forEach(item => addItemToDOM(item));
    }

    // アイテムをDOMに追加
    function addItemToDOM(item) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex align-items-center';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.checked;
        checkbox.className = 'mr-2';
        checkbox.onchange = () => toggleItemChecked(item.name, checkbox.checked);

        const span = document.createElement('span');
        span.textContent = item.name;
        if (item.checked) {
            span.style.textDecoration = 'line-through';
        }

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-sm btn-warning ml-auto';
        editButton.textContent = '編集';
        editButton.onclick = () => editItem(item.name, span);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-sm btn-danger ml-2';
        deleteButton.textContent = '削除';
        deleteButton.onclick = () => deleteItem(item.name, li);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        itemList.appendChild(li);
    }

    // アイテムを追加
    addItemButton.onclick = () => {
        const itemName = itemInput.value.trim();
        if (itemName) {
            const item = { name: itemName, checked: false };
            addItemToDOM(item);
            saveItem(item);
            itemInput.value = '';
        }
    };

    // アイテムをローカルストレージに保存
    function saveItem(item) {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
    }

    // アイテムのチェック状態をトグル
    function toggleItemChecked(name, checked) {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        const item = items.find(item => item.name === name);
        if (item) {
            item.checked = checked;
            localStorage.setItem('items', JSON.stringify(items));
            updateItemDisplay();
        }
    }

    // アイテムを更新
    function updateItemDisplay() {
        itemList.innerHTML = '';
        loadItems();
    }

    // アイテムを編集
    function editItem(oldName, span) {
        const newName = prompt('アイテムを編集:', oldName);
        if (newName && newName.trim()) {
            const items = JSON.parse(localStorage.getItem('items')) || [];
            const item = items.find(item => item.name === oldName);
            if (item) {
                item.name = newName;
                localStorage.setItem('items', JSON.stringify(items));
                span.textContent = newName;
            }
        }
    }

    // アイテムを削除
    function deleteItem(name, li) {
        li.remove();
        removeItem(name);
    }

    // アイテムをローカルストレージから削除
    function removeItem(name) {
        const items = JSON.parse(localStorage.getItem('items')) || [];
        const index = items.findIndex(item => item.name === name);
        if (index !== -1) {
            items.splice(index, 1);
            localStorage.setItem('items', JSON.stringify(items));
        }
    }

    loadItems();
});
