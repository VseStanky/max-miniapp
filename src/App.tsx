import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white shadow-md rounded-xl p-6 space-y-4">
        <h1 className="text-xl font-semibold text-gray-900">
          MAX Mini App
        </h1>
        <p className="text-gray-600 text-sm">
          Это стартовая страница твоего мини‑приложения для MAX.
          Ты можешь заменить этот текст и верстку на любой интерфейс, который нужен боту.
        </p>
        <div className="space-y-2 text-sm text-gray-500">
          <p>
            Сейчас приложение развернуто на GitHub Pages и доступно по HTTPS,
            поэтому URL страницы можно использовать в настройках mini app в MAX.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;