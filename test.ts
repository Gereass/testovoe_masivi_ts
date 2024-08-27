class TreeStore {
    private readonly items: Item[];

    constructor(items: Item[]) {
        this.items = items;
    }

    getAll() {
        return this.items;
    }

    getItem(id: string | number) {
        return this.items.filter(item => item.id === id);
    }

    getChildren(id: string | number) {
        return this.items.filter(item => item.parent === id);
    }

    getAllChildren(id: string | number) {
        let children: Item[] = [];

        this.items.forEach(item => {
            if (item.parent === id) {
                children.push(item);
                const childChildren = this.getAllChildren(item.id);
                children = children.concat(childChildren);
            }
        });

        return children;
    }

    getAllParents(id: string | number) {
        let parents: Item[] = [];

        this.items.forEach(item => {
            if (item.id === id) {
                parents.push(item);
                const parentParents = this.getAllParents(item.parent);
                parents = parents.concat(parentParents);
            }
        });

        return parents;
    }
}

interface Item {
    id: string | number;
    parent: string | number;
    type: string | null;
}

const items: Item[] = [
    { id: 1, parent: 'root', type: null },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];

const treeStore = new TreeStore(items);

// Пример использования:
const allItems = treeStore.getAll();
console.log("get All");
console.log(allItems);
console.log("/------------/");

let itemId = treeStore.getItem(7);
console.log("get itID(7)");
console.log(itemId);
console.log("/------------/");

let childr = treeStore.getChildren(4);
console.log("get Children(4)");
console.log(childr);

childr = treeStore.getChildren(5);
console.log("get Children(5)");
console.log(childr);

childr = treeStore.getChildren(2);
console.log("get Children(2)");
console.log(childr);
console.log("/------------/");

console.log("get AllChildren(2)");
const allChildren = treeStore.getAllChildren(2);
console.log(allChildren);
console.log("/------------/");

const allParentsForItem = treeStore.getAllParents(7);
allParentsForItem.shift();
console.log("get AllParents(7)");
console.log(allParentsForItem);