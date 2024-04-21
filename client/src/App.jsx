import logo from './logo.svg';
import './App.css';
import Layout from './Components/Layout/Layout.jsx';
import Users from './Components/Users/Users.jsx';
import Categories from './Components/Categories/Categories.jsx';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Items from './Components/Items/Items.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import Login from './Components/Login/Login.jsx';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import ProtactecdRoute from './Components/ProtactecdRoute/ProtactecdRoute.jsx';
import NotFound from './Components/NotFound/NotFound.jsx';
import CreateUser from './Components/CreateUser/CreateUser.jsx';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import Profile from './Components/Profile/Profile.jsx';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile.jsx';
import OneItem from './Components/OneItem/OneItem.jsx';


function App() {

  // const [userStatus, setuserStatus] = useState(false)


  const [userData, setUserData] = useState(null)
  const [userInfo, setUserInfo] = useState(null)



  function saveData() {
    setUserData(localStorage.getItem('userToken'))

  }

  async function getUserInfo() {
    let token = localStorage.getItem('userToken')
    let headers = {
      Authorization: `Bearer ${token}`
    }
    let { data } = await axios(`https://dalilalhafr.com/api/auth/profilePage`, { headers })
    setUserInfo(data.data)
  }

  useEffect(() => {
    if (localStorage.getItem('userToken') != null) {
      saveData()
      getUserInfo()
    }
  }, [])




  let routes = createBrowserRouter([
    {
      path: '', element: <Layout userInfo={userInfo} getUserInfo={getUserInfo} userData={userData} setUserData={setUserData} />, children: [
        { index: true, element: <ProtactecdRoute><Users /></ProtactecdRoute> },
        { path: 'categories', element: <ProtactecdRoute> <Categories /> </ProtactecdRoute> },
        { path: 'items', element:<ProtactecdRoute>  <Items/> </ProtactecdRoute>  },
        { path: 'createUser', element: <ProtactecdRoute> <CreateUser />  </ProtactecdRoute> },
        { path: 'profile', element: <ProtactecdRoute> <Profile />  </ProtactecdRoute> },
        { path: 'updateProfile', element: <ProtactecdRoute> <UpdateProfile />  </ProtactecdRoute> },
        { path: 'oneItem/:id', element: <ProtactecdRoute> <OneItem />  </ProtactecdRoute> },


        { path: 'Login', element: <Login saveData={saveData} /> },
        { path: '*', element: <ProtactecdRoute><NotFound /></ProtactecdRoute> }

      ]
    }
  ])


  return <>
    <Provider store={store}>
      <Toaster toastOptions={{
        duration: 3000
      }} />
      <RouterProvider router={routes}></RouterProvider>

    </Provider>
  </>
}

export default App;
