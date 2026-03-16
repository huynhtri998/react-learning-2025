import '../index.css';
import {useState} from "react";
import {Logo} from "./Logo";
import {Form} from "./Form";
import {PackingList} from "./PackingList";
import {Stats} from "./Stats";

const initialItems = [{id: 1, description: "Passports", quantity: 2, packed: false}, {
    id: 2, description: "Socks", quantity: 12, packed: true
}, {id: 3, description: "Charger", quantity: 1, packed: true}];

export default function App() {
    const [items, setItems] = useState(initialItems);

    function handleAddItem(newItem) {
        setItems(items => [...items, newItem]);
    }

    function handleRemoveItem(id) {
        setItems(items => items.filter(item => item.id !== id));
    }

    function handleClearList(){
        const confirmed = window.confirm("Are you sure you want to clear the list?");
        if (confirmed) setItems([]);
    }

    function handlePackItem(id) {
        setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item));
    }

    return (<div className="app">
        <Logo/>
        <Form onAddItem={handleAddItem}/>
        <PackingList items={items} onRemoveItem={handleRemoveItem} onPackItem={handlePackItem} onClearList={handleClearList}/>
        <Stats items={items}/>
    </div>);
}

