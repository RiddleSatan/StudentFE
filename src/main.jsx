import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ContextProvider } from './context/Context.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './components/Home';
import UpdateStudent from './components/UpdateStudent';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,  // <App /> should contain <Outlet />
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'update/:id',
        element: <UpdateStudent />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>
);
