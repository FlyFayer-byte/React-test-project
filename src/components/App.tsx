// src/components/App.tsx
import { useState } from "react";

import Product from "./Product";
import Alert from "./Alert";
import Button from "./Button";
import UserMenu from "./UserMenu";
import ClickCounter from "./ClickCounter";

interface Values {
  x: number;
  y: number;
};

export default function App() {

  const [values, setValues] = useState<Values>({ x: 0, y: 0 });
  const updateX = () => { 
    setValues({
      ...values,
      x: values.x + 1,
    });
  };
  const updateY = () => { 
    setValues({
      ...values,
      y: values.y + 1,
    });
  };

  const [clicks, setClick] = useState(0);
  const handleClick = () => {
    setClick(clicks + 1);
  };


  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMessage = () => {
    setIsOpen(!isOpen);
  };

  const updateValue = (key: keyof Values) => { 
    setValues({
      ...values,
      [key]: values[key] + 1,
    });
  }

  return (
    <>
      <h1>Best selling</h1>
      <Product
        name="Tacos With Lime"
        imgUrl="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?w=640"
        price={10.99}
      />
      <Product
        name="Fries and Burger"
        imgUrl="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?w=640"
        price={14.29}
      />
      <Alert />
      <Alert type="success"/>
      <Alert type="error" />

      <Button variant="primary" text="Login" />
      <Button variant="secondary" text="Follow"/>

      <UserMenu name="Guest" />

      <button onClick={handleClick}>Number of clicks: { clicks }</button>

      <ClickCounter value={clicks} onUpdate={handleClick} />
      <ClickCounter value={clicks} onUpdate={handleClick} />

      <button onClick={handleClick}>Clicked: {count}</button>
      <button onClick={toggleMessage}>{isOpen ? "Hide massage" : "Show message"}</button>
      
      {isOpen && <p>🎉 Surprise! You toggled me.</p>}

      <div>
        <p>x: {values.x}, y: {values.y}</p>
        <button onClick={updateX}>Update x</button>
        <button onClick={updateY}>Update y</button>
      </div>

      <button onClick={() => updateValue("x")}>Update x</button>
      <button onClick={() => updateValue("y")}>Update y</button>
    </>
  );
}