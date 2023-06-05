import Container from "@mui/material/Container";
import { Routes, Route} from 'react-router-dom';
import React from 'react';
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserPage from "./pages/UserPage";
import { EditProfile } from "./pages/EditProfile/EditProfile";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])


  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/posts/:id' element={<FullPost />}/>
          <Route path='/posts/:id/edit' element={<AddPost />}/>
          <Route path='/add-post' element={<AddPost />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Registration />}/>
          <Route path='/user/:id/edit' element={<EditProfile />}/>
          <Route path='/userPage/:id' element={<UserPage />}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;
