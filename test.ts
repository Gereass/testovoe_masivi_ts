interface Item {
    id: string | number;
    parent: string | number;
    type: string | null
}

const items: Item[] = [
        { id: 1, parent: 'root', type: null},
        { id: 2, parent: 1, type: 'test' },
        { id: 3, parent: 1, type: 'test' },
    
        { id: 4, parent: 2, type: 'test' },
        { id: 5, parent: 2, type: 'test' },
        { id: 6, parent: 2, type: 'test' },
    
        { id: 7, parent: 4, type: null },
        { id: 8, parent: 4, type: null },
    ];

function getAllChildren(parentId: string | number) {
    let children = [];

    items.forEach(item => {
        // Проверяем, если у текущего элемента родительский ID совпадает с переданным
        if (item.parent === parentId) {
            // Добавляем найденный элемент в массив дочерних
            children.push(item);
            // Рекурсивно ищем дочерние элементы для текущего элемента
            const childChildren = getAllChildren(item.id);
            children = children.concat(childChildren);
        }
    });

    return children;
}

function getAllParents(id: string | number) {
    let parent = [];
    items.forEach(item => {
        // Проверяем, если у текущего элемента родительский ID совпадает с переданным
        if (item.id === id) {
            // Добавляем найденный элемент в массив дочерних
            parent.push(item)
            // Рекурсивно ищем родительские элементы для текущего элемента
            const parentChildren = getAllParents(item.parent);
            parent= parent.concat(parentChildren)
        }
    });

    return parent;
}


function getItem(id) {
    let item = [];

    const element = items.filter(item => item.id === id);
    if (element) {
        return element;
    }
    else {
        return null
    }
}

function getAll() {
    return items
}

function getChildren(id) {
    return items.filter(item => item.parent === id)
}

// Пример использования:
const allItems = getAll();
console.log("get All")
console.log(allItems)
console.log("/------------/")

let itemId = getItem(7)
console.log("get itID(7)")
console.log(itemId)
console.log("/------------/")

let childr = getChildren(4)
console.log("get Children(4)")
console.log(childr)

childr = getChildren(5)
console.log("get Children(5)")
console.log(childr)

childr = getChildren(2)
console.log("get Children(2)")
console.log(childr)
console.log("/------------/")

console.log("get AllChildren(2)")
const allChildren = getAllChildren(2);
console.log(allChildren);
console.log("/------------/")

const allParentsForItem = getAllParents(7);
allParentsForItem.shift()
console.log("get AllParents(7)")
console.log(allParentsForItem);

