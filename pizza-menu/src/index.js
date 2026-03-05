import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [{
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
}, {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
}, {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
}, {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
}, {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
}, {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
},];


function App() {
    return <div className={"container"}>
        <Header/>
        <Menu/>
        <Footer/>
    </div>

}

function Header() {
    return <header className={"header"}>
        <h1>React Fast Pizza Co.</h1>
    </header>
}

function Footer() {
    const hours = new Date().getHours();
    const openHour = 12;
    const closeHour = 22;
    const isOpen = hours >= openHour && hours <= closeHour;

    return <footer className={"footer"}>
        {isOpen ? (<Order closeHour={closeHour}/>) : (<p>We are happy to welcome you between {openHour}:00 and {closeHour}:00.</p>)}
    </footer>
}

function Menu() {
    const pizzaCount = pizzaData.length;
    return <main className={"menu"}>
        <h2>Our Menu</h2>
        {pizzaCount > 0 ? (<ul className={"pizzas"}>
            {pizzaData.map(pizza => <Pizza pizzaObject={pizza}/>)}
        </ul>):(<p>We are still working on our menu. Please come back later.</p>)}
        {/*<Pizza />*/}
    </main>
}

function Pizza({pizzaObject}) {
    return <li className={`pizza ${pizzaObject.soldOut ? "sold-out" : ""}`}>
        <img src={pizzaObject.photoName} alt={pizzaObject.photoName}/>
        <div>
            <h3>{pizzaObject.name}</h3>
            <p>{pizzaObject.ingredients}</p>
            <span>{pizzaObject.soldOut ? "SOLD OUT" : pizzaObject.price}</span>
        </div>
    </li>
}

function Order({closeHour}) {
    return <div className={"order"}>
        <p>We are open until {closeHour}:00. Come visit us or order online.</p>
        <button className={"btn"}>Order</button>
    </div>
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);