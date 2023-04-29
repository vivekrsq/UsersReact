import Form from './Form';
import AllUsers from './AllUsers';
import { useState, useEffect } from 'react';
function AddUser() {
    const [user, setUser] = useState([])

    //all users
    const getAllUsers = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/users/`);
        const responseJson = await response.json()
        console.log(responseJson);
        setUser(responseJson)
        // console.log(process.env.SERVER)
    }

    //add user
    const newUser = async (data) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/users/`,{
            method: "POST",
            body: data
        });
        const responseJson = await response.json()
        console.log(responseJson);
        // setUser([...user, responseJson])
        getAllUsers()
        return responseJson;
    }

    //delete user
    const deleteUser = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/users/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
              },
            // body: JSON.stringify(data)
        });
        const responseJson = await response.json()
        console.log(responseJson);
        getAllUsers()
    }

    //edit user
    const editUser = async (id, data) => {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/users/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(data)
        });
        const responseJson = await response.json()
        console.log(responseJson);
        getAllUsers()
    }

    useEffect(() => {
        getAllUsers()
    
    }, [])
    

    return (
      <>
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-6 p-3 border border-primary rounded">
              <h3>Add User</h3>
              <hr/>
              <Form add={newUser}/>
              </div>
            <div className="col-md-6 mt-3">
              <h3>All Users</h3>
              <hr/>
              <AllUsers data={user} onDelete={deleteUser} onEdit={editUser}/>
              </div>
          </div>
        </div>
      </>
    );
  }
  
  export default AddUser;
  