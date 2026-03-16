export function Item({item, onRemoveItem, onPackItem}) {
    return <li>
        <input type="checkbox" checked={item.packed} onChange={() => onPackItem(item.id)}/>
        <span style={item.packed ? {textDecoration: "line-through"} : {}}>{item.quantity} {item.description}</span>
        <button onClick={() => onRemoveItem(item.id)}>❌</button>
    </li>
}