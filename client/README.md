# React-1.Домашка

## Компоненты

* buttons
  * **Button.js**
  * **SettingsBtn.js**
* forms
  * **FormInput.js**
  * **Settings.js**
* modals
  * **BuildModal.js**
* pages
  * **BuildHistoryPage.js**
  * **BuildPage.js**
  * **HomePage.js**
  * **SettingsPage.js**
* **App.js**
* **Commit.js**
* **Footer.js**
* **Header.js**
* **Logo.js**

## Состояние приложения

Использую `Redux` и `useState`.

## Сторонние библиотеки

* **react-router-dom**
* **ansi-to-html** - Должна красиво парсить логи в html, но насколько хорошо пока не проверял.  
* **html-react-parser**
* **normalize.css**
* **prop-types**
* **react-redux**
* **redux**
* **focus-trap-react** - Чинит tab'ы для модальных окон.
* **react-toastify** - Красивые toast сообщения в углу.

## Роуты

`/` - домашняя страница.  
`/settings` - настройки.  
`/build/:buildNumber` - детали билда  

Домашняя страница может находиться в двух состояниях - стартовая страница и коммиты. Чтобы открыть страницу коммитов сохраните любые настройки на странице `/settings` или поменяйте флаг `allSettled` в файле `reducers/settings.js`.

## Запуск приложения

`npm i`  
`npm start`
