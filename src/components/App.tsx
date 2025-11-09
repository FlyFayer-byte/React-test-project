// src/components/App.tsx
import { useState, useEffect } from "react";

import Product from "./Product";
import Alert from "./Alert";
import Button from "./Button";
import UserMenu from "./UserMenu";
import ClickCounter from "./ClickCounter";
import OrderForm from "./OrderForm/OrderForm";
import SearchForm from "./SearchForm/SearchForm";
import ArticleList from "./ArticleList/ArticleList";
import { Article } from "../types/article";
// 1. Імпортуємо HTTP-функцію
import { fetchArticles } from "../services/articleService";
import Timer from "./Timer/Timer";
import Modal from "./Modal/Modal";

interface Values {
  x: number;
  y: number;
}

interface Article {
  objectID: string;
  title: string;
  url: string;
}

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
  };

  // Щоб обробити відправку форми, додаємо атрибут onSubmit і
  // передаємо в нього функцію, яка отримає подію
  // типу React.FormEvent<HTMLFormElement>.
  const handleOrder = (data: string) => {
    console.log("Order received from:", data);
  };

  // Оголошуємо і типізуємо стан
  const [articles, setArticles] = useState<Article[]>([]);

  // 1. Додаємо стан індикатора завантаження
  const [isLoading, setIsLoading] = useState(false);

  // Оголошуємо стан
  const [isError, setIsError] = useState(false);

  const handleSearch = async (topic: string) => {
    // Додаємо блок try...catch
    try {
      // Змінюємо індикатор завантаження на true перед запитом
      setIsLoading(true);
      // Скидаємо стан помилки в false перед кожним запитом
      setIsError(false);

      // Використовуємо HTTP-функцію
      const data = await fetchArticles(topic);
      setArticles(data);

      // const response = await axios.get<ArticlesHttpResponse>(
      //   `https://hn.algolia.com/api/v1/search?query=${topic}`
      // );
      // 2. Записуємо дані в стан після запиту
      // setArticles(response.data.hits);
    } catch {
      // Встановлюємо стан isError в true
      setIsError(true);
    } finally {
      // Змінюємо індикатор на false після запиту
      // після будь якого результату запиту
      setIsLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const [clicked, setClicks] = useState(() => {
    // Зчитуємо значення за ключем
    const savedClicks = window.localStorage.getItem("saved-clicks");

    // Якщо там щось є, повертаємо це
    // значення як початкове значення стану
    if (savedClicks !== null) {
      return JSON.parse(savedClicks);
    }

    // У протилежному випадку повертаємо
    // яке-небудь значення за замовчуванням
    return 0;
  });

  useEffect(() => {
    localStorage.setItem("saved-clicks", JSON.stringify(clicked));
  }, [clicked]);

  return (
    <>
      <div>
        <button onClick={() => setClicks(clicked + 1)}>
          You clicked {clicked} times
        </button>
        <button onClick={() => setClicks(0)}>Reset</button>
      </div>

      <div>
        <h1>Main content of the page</h1>
        <button onClick={openModal}>Open modal</button>
        {isModalOpen && (
          <Modal onClose={closeModal}>
            <h2>Modal Title</h2>
            <p>This is some content inside the modal.</p>
          </Modal>
        )}
      </div>
      <h1>Place your order</h1>
      <Timer />
      <OrderForm onSubmit={handleOrder} />

      <SearchForm onSubmit={handleSearch} />
      {/* 4. Відображаєм повідомлення про завантаження даних в JSX */}
      {isLoading && <p>Loading data, please wait...</p>}

      {/* 6. Використовуємо стан isError щоб показати помилку */}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {articles.length > 0 && <ArticleList items={articles} />}

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
      <Alert type="success" />
      <Alert type="error" />

      <Button variant="primary" text="Login" />
      <Button variant="secondary" text="Follow" />

      <UserMenu name="Guest" />

      <button onClick={handleClick}>Number of clicks: {clicks}</button>

      <ClickCounter value={clicks} onUpdate={handleClick} />
      <ClickCounter value={clicks} onUpdate={handleClick} />

      <button onClick={handleClick}>Clicked: {count}</button>
      <button onClick={toggleMessage}>
        {isOpen ? "Hide massage" : "Show message"}
      </button>

      {isOpen && <p>🎉 Surprise! You toggled me.</p>}

      <div>
        <p>
          x: {values.x}, y: {values.y}
        </p>
        <button onClick={updateX}>Update x</button>
        <button onClick={updateY}>Update y</button>
      </div>

      <button onClick={() => updateValue("x")}>Update x</button>
      <button onClick={() => updateValue("y")}>Update y</button>
    </>
  );
}
