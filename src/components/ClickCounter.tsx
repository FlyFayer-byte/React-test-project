import { useState } from 'react';

interface ClickCounterProps { 
    value: number;
    onUpdate: () => void;
};

// export default function ClickCounter() {
//   const [clicks, setClicks] = useState(0);

//   const handleClick = () => {
//     setClicks(clicks + 1);
//   };

//   return <button onClick={handleClick}>Clicked: {clicks}</button>;
// }

export default function ClickCounter({value, onUpdate}: ClickCounterProps) {
//   const [clicks, setClicks] = useState(0);

//   const handleClick = () => {
//     setClicks(clicks + 1);
//   };

  return <button onClick={onUpdate}>Clicked: {value}</button>;
}