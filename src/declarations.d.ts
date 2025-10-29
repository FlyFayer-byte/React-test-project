// При імпорті modern-normalize, ви імпортуєте CSS-файл напряму. 
// TypeScript не знає, що таке "modern-normalize", бо це не TypeScript-модуль. 
// Якщо типи не встановлено – з’явиться помилка (підкреслення).

// Щоб виправити це, створіть файл src/declarations.d.ts. 
// У ньому можна вручну оголосити модулі, які не мають типів:

// src/declarations.d.ts

declare module "modern-normalize";
