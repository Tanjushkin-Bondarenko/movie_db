import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './Home/Home';
import { About } from './About/About';
import { Provider } from 'react-redux';
import store from './store';
import { LinearProgress } from '@mui/material';
import { CustomizedAuth0Provider } from './auth/CustomizedAuth0Provider';
import { AuthCallback } from './auth/AuthCallback';
import { Profile } from './Profile/Profile';
import { AuthenticationGaurd } from './auth/AuthenticationGaurd';

const Movies = lazy(() => import("./Movie/Movie"))
const AppEntryPoint = () => {
  return(
<CustomizedAuth0Provider>
  <Provider store = {store}>
      <App/>
  </Provider>
</CustomizedAuth0Provider>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppEntryPoint/>,
      children:[
        {
          path: "/",
          element: <Home/>, 
        },
        {
          path: "/movie",
          element:(<Suspense fallback={<LinearProgress/>}><Movies/></Suspense>)
         },
       {
        path: "/about", 
        element: <About/>,
       },
       {
        path: "callback", 
        element: <AuthCallback/>,
       },
       {
        path: "profile", 
        element: <AuthenticationGaurd component={Profile}/>,
       }
      
      ]
  }

])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
