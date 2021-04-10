import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// let messagesData = [
//     {id: 1, text: 'Hui', fromMe: 0},
//     {id: 2, text: 'Pizda', fromMe: 1},
//     {id: 3, text: 'Skovoroda'},
//     {id: 4, text: 'Ponimayu', fromMe: 1},
//     {id: 5, text: 'Ne ponimayu'},
//     {id: 6, text: 'Spravedliva', fromMe: 1},
//     {id: 7, text: 'Ne spravedliva'},
//     {id: 8, text: 'Sliva'},
//     {id: 9, text: 'Sliva'},
//     {id: 10, text: 'Sliva'},
//     {id: 11, text: 'Sliva', fromMe: 1},
//     {id: 12, text: 'Sliva'},
//     {id: 13, text: 'Sliva'}
// ]
//
// let dialogsData = [
//     {id: 1, name: 'Voko'},
//     {id: 2, name: 'kirpich from the dungeon'},
//     {id: 3, name: 'Maria Larikova'},
//     {id: 4, name: 'Danylo Mykhailov'}
// ]

// let data = {
//
//     dialogsData: [
//         {id: 1, name: 'Voko'},
//         {id: 2, name: 'kirpich from the dungeon'},
//         {id: 3, name: 'Maria Larikova'},
//         {id: 4, name: 'Danylo Mykhailov'}
//     ],
//
//     messagesData: [
//         {id: 1, text: 'Hui', fromMe: 0},
//         {id: 2, text: 'Pizda', fromMe: 1},
//         {id: 3, text: 'Skovoroda'},
//         {id: 4, text: 'Ponimayu', fromMe: 1},
//         {id: 5, text: 'Ne ponimayu'},
//         {id: 6, text: 'Spravedliva', fromMe: 1},
//         {id: 7, text: 'Ne spravedliva'},
//         {id: 8, text: 'Sliva'},
//         {id: 9, text: 'Sliva'},
//         {id: 10, text: 'Sliva'},
//         {id: 11, text: 'Sliva', fromMe: 1},
//         {id: 12, text: 'Sliva'},
//         {id: 13, text: 'Sliva'}
//     ]
// }

// appData={data}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
