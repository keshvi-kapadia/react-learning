import "./App.css";
import Intro from "./Intro.jsx";
import Footer from "./Footer.jsx";
import Employee from "./Emplyee.jsx";
import { useState } from "react";

function App() {
  const [Employees,setEmployees]=useState(["Keshvi","Khushi"]);
  // let Employees=["Keshvi","Khushi","Shruti","Harshita","Jiya"];
  const [showList,setshowList]=useState(false);
  const [empVal,setempVal]=useState("");
  const [noEmp,setNoEmp]=useState(false);

  function addEmp()
  {
    setEmployees(()=>[...Employees,empVal]);
    setempVal("");
    setNoEmp(false);
  }
  return (
    <>
      <Intro />
{/*       
      <div className="employeeList">
        <h2>Employee List - Props</h2>
        <Employee name="Keshvi" />
        <Employee name="Khushi" />
        <Employee name="Shruti" />
        </div> */}

      <div className="employeeList">
        <h2>Add Employee</h2>
        <input type="text" value={empVal} placeholder="Enter Name" id="addEmpib" onChange={(e)=>setempVal(e.target.value)}/>
        <button id="addBtn" onClick={addEmp}>Add</button>
        <h2>Employee List - Using Array Map Function</h2>
        <button id="showHideButton" onClick={(e)=>
          {
            setshowList(!showList);
          }
        }>{showList ? "Hide List" : "Show List"}</button>

        {
          showList && !noEmp &&
          Employees.map((emp,index)=><Employee key={index} name={emp} 
          onEmployeeClick={
            () => 
              {
                console.log(emp);
              }
          } 
          
          onDeleteEmployee={()=>
          {
            setEmployees(()=>Employees.filter((e)=>e!==emp));
            if(Employees.length==1)
            {
              setNoEmp(true);
            }
          }
          }
          />)
        }

        {
          noEmp && showList &&
          <h2>No Employee to list</h2>
        }
        
      </div>

      <Footer />
    </>
  );
}

export default App;