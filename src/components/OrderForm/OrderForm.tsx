// Ми описали інтерфейс для props
interface OrderFormProps {
  onSubmit: (value: string) => void;
  // onSubmit — це властивість, яка є функцією.
  // Вона приймає один параметр value (типу string)
  // і нічого не повертає (void = "нічого").
}

export default function OrderForm({ onSubmit }: OrderFormProps) {
  const handleSubmit = (FormData: FormData) => {
    const username = FormData.get("username") as string;
    onSubmit(username);
  };

  return (
    <form action={handleSubmit}>
          <input type="text" name="username" />
          <button type="submit">Place order</button>
    </form>
  );
}
