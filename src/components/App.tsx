// src/components/App.tsx

import Product from "./Product";
import Alert from "./Alert";
import Button from "./Button";
import UserMenu from "./UserMenu";

export default function App() {
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
    </>
  );
}