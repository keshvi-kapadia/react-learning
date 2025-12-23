import "./App.css";
import Intro from "./Intro.jsx";
import Footer from "./Footer.jsx";
import Employee from "./Emplyee.jsx";
import { useState } from "react";

function App() {
  const [Employees,setEmployees]=useState(["Keshvi","Khushi","Shruti","Harshita","Jiya"]);
  // let Employees=["Keshvi","Khushi","Shruti","Harshita","Jiya"];
  const [showList,setshowList]=useState(false);
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
        <h2>Employee List - Using Array Map Function</h2>
        <button id="showHideButton" onClick={(e)=>
          {
            setshowList(!showList);
          }
        }>{showList ? "Hide List" : "Show List"}</button>

        {
          showList &&
          Employees.map((emp,index)=><Employee key={index} name={emp} 
          onEmployeeClick={
            () => 
              {
                alert(emp+" clicked!!");
                console.log(emp);
              }
          } 
          
          onDeleteEmployee={()=>
          {
            setEmployees(Employees.filter((e)=>e!==emp) );
          }
          }
          />)
        }
        
      </div>

      <Footer />
    </>
  );
}

export default App;