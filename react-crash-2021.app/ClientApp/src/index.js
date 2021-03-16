import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './components/api-authorization/UserContext'



//renders the app component into the div with the id "root" that's in the index.html file

//takes params of the react component, and the html element to render it in
ReactDOM.render(
    <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
