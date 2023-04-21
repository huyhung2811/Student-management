import React from 'react';
// import './App.css';
import Header from './Pages/Header';
import StudentForm from './Pages/StudentForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentList from './Pages/StudentList';
import EditStd from './Pages/EditStd';
import { useState, useEffect } from 'react';
import axios from "axios";
import ShowStd from './Pages/showStd';
export const UsersContext = React.createContext();

function App() {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "https://643fb2f43dee5b763e22dfe0.mockapi.io/student/students"
        );
        setUsers(response.data);
        setCount(response.data.length);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  const addUser = (newStudent) => {
    const id = count+1;
    setCount(count + 1);
    newStudent={...newStudent,id}
    setUsers([...users, newStudent]);
    console.log(users);
  };

  const updateUser = (student) => {
    setUsers(prevUsers => {
      const index = prevUsers.findIndex(item => item.id === student.id);
      if (index === -1) return prevUsers;
      const newUsers = [...prevUsers];
      newUsers[index] = student;
      return newUsers;
    });
  }

  return (

    <UsersContext.Provider value={{ users,updateUser, setUsers }}>
      <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<StudentList users={users}/>} />
          <Route exact path="/Add" element={<StudentForm addUser={addUser}/>} />
          <Route exact path="/Edit" element={<EditStd/>}/>
          <Route exact path="/Show" element={<ShowStd/>}/>
        </Routes>

      </div>
    </Router>
    </UsersContext.Provider>
    

  );
}

export default App;
