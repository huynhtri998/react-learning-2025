import './index.css';
import {useState} from "react";

const faqs = [
    {
        title: "Where are these chairs assembled?",
        text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
    },
    {
        title: "How long do I have to return my chair?",
        text:
            "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
    },
    {
        title: "Do you ship to countries outside the EU?",
        text:
            "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
    }
];

export default function App() {
  return (
    <div className="App">
        <Accordion/>
    </div>
  );
}

function Accordion(){
    return <div className={"accordion"}>
        {faqs.map((faq, index) => <AccordionItem key={faq.title} num={index} faq={faq}/>)}
    </div>
}

function AccordionItem({key, num, faq}){
    const [isOpen, setIsOpen] = useState(false);

    function handleToggle(){
        setIsOpen(!isOpen);
    }

    return <div className={`item ${isOpen ? "open" : ""}`} key={key} onClick={() => setIsOpen(!isOpen)}>
        <p className={"number"}>{num < 9 ? `0${num + 1}` : num + 1}</p>
        <p className={"title"}>{faq.title}</p>
        <p className={"icon"}>{isOpen ? "-" : "+"}</p>

        <div className={"content-box"}>{isOpen && faq.text}</div>
    </div>
}
