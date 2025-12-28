import "./App.css";
import Intro from "./Intro.jsx";
import Footer from "./Footer.jsx";
import Employee from "./Emplyee.jsx";
import { useState,useEffect,useRef } from "react";

function App() {
  const [Employees, setEmployees] = useState(()=>
  {
    const savedEmployees = localStorage.getItem("employeesData");
    return savedEmployees ? JSON.parse(savedEmployees) : ["Keshvi","Khushi"];
  });
  // let Employees=["Keshvi","Khushi","Shruti","Harshita","Jiya"];
  const [showList, setshowList] = useState(false);
  const [empVal, setempVal] = useState("");
  var totalEmpClick=useRef(0);

  useEffect(()=>
    {
      console.log("Employees List Updated:",Employees);
      localStorage.setItem("employeesData",JSON.stringify(Employees));
    }, [Employees]);

  function addEmp() {
    setEmployees(() => [...Employees, empVal]);
    setempVal("");
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
        <input
          type="text"
          value={empVal}
          placeholder="Enter Name"
          id="addEmpib"
          onChange={(e) => setempVal(e.target.value)}
        />
        <button id="addBtn" onClick={addEmp} disabled={empVal === ""}>
          Add
        </button>
        <h2>Employee List - Using Array Map Function</h2>
        <button
          id="showHideButton"
          onClick={(e) => {
            setshowList(!showList);
          }}
        >
          {showList ? "Hide List" : "Show List"}
        </button>

        {showList && <h4> Total Employees {Employees.length}</h4>}
        {showList &&
          Employees.length > 0 &&
          Employees.map((emp, index) => (
            <Employee
              key={index}
              name={emp}
              onEmployeeClick={() => {
                console.log(emp);
              }}
              onDeleteEmployee={() => {
                setEmployees(() => Employees.filter((e) => e !== emp));
              }}
              employeeClicked={()=>{
                totalEmpClick.current+=1;
                console.log(`Emps Clicked ${totalEmpClick.current} times`);
              }}
            />
          ))}

        {Employees.length == 0 && showList && <h2>No Employee to list</h2>}
      </div>

      <Footer />
    </>
  );
}

export default App;
