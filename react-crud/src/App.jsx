import React, { useEffect, useState } from "react";
import { EmployeeData } from "./EmployeeData";
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const[isUpdate, setIsUpdate] = useState(false);

  const handleEdit = (id) => {
    const dt = data.filter(item => item.id === id);
    if(dt!==undefined){
      setIsUpdate(true);
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure you want to delete?")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
      }
    }
  };

  const handleSave = (e)=>{
    let error = "";

    if(firstName === '')
      error += "First Name is required,  ";

    if(lastName === '')
      error += "Last Name is required,  ";

    if(age <=0)
      error += "Age is Required. ";


    if(error === ''){
      e.preventDefault();
      const dt =[...data];
      const newObject = {
        id: EmployeeData.length + 1,
        firstName: firstName,
        lastName: lastName,
        age: age
    }

    dt.push(newObject);
    setData(dt);
    handleClear();
    } else{
      alert(error);
    }
  }

  const handleUpdate = ()=>{
    const index = data.map((item)=>{
      return item.id;
    }).indexOf(id);

    const dt = [...data];
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;

    setData(dt);
    handleClear();
  }

  const handleClear = () => {
    setId(0);
    setFirstName('');
    setLastName('');
    setAge('');
    setIsUpdate(false);
  }

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  return (
    <div>
      <div className="form col-md-10 offset-md-1 p-4">
        <div>
          <label htmlFor="">First Name : </label>
          <input value={firstName} type="text" placeholder="Enter First Name" onChange={(e)=>setFirstName(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="">Last Name : </label>
          <input value={lastName} type="text" placeholder="Enter Last Name" onChange={(e)=>setLastName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="">Age : </label>
          <input value={age} type="text" placeholder="Enter Age" onChange={(e)=>setAge(e.target.value)} />
        </div>
        <div>
          {
            !isUpdate ? 
            <button
            className="btn btn-primary"
            onClick={(e) => handleSave(e)}
          >
            Save
          </button> : 
            <button
            className="btn btn-primary"
            onClick={() => handleUpdate()}
          >
            Update
          </button>
          }
          
        
          <button
            className="btn btn-danger ms-2"
            onClick={() => handleClear()}
          >
            Clear
          </button>
        </div>
      </div>
      <div className="container col-md-10 offset-md-1 p-4">
        <table className="table ">
          <thead className="table-warning">
            <tr>
              <td>Sr. No</td>
              <td>First Name</td>
              <td>Last Name</td>
              <td>Age</td>
              <td className="text-center">Action</td>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger ms-2"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
