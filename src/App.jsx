import "./App.css";
import Intro from "./Intro.jsx";
import Footer from "./Footer.jsx";
import Employee from "./Emplyee.jsx";
import { useState, useEffect, useRef, useCallback, use } from "react";

function App() {
  const [Employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem("employeesData");
    return savedEmployees ? JSON.parse(savedEmployees) : ["Keshvi", "Khushi"];
  });
  // let Employees=["Keshvi","Khushi","Shruti","Harshita","Jiya"];
  const [showList, setshowList] = useState(false);
  const [empVal, setempVal] = useState("");
  const totalEmpClick = useRef(0);
  const inputRef = useRef(null);
  const [timeSpent, setTimeSpent] = useState(0);

  console.log("App Rendered");

  useEffect(() => {
    console.log("Employees List Updated:", Employees);
    localStorage.setItem("employeesData", JSON.stringify(Employees));
  }, [Employees]);

  useEffect(() => {
    localStorage.setItem("startTime", Date.now());

    const interval = setInterval(() => {
      const startTime = parseInt(localStorage.getItem("startTime"), 10);
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      setTimeSpent(elapsedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addEmp = useCallback(() => {
    setEmployees((prev) => [...prev, empVal]);
    setempVal("");
    inputRef.current.focus();
  }, [empVal]);

  const deleteHandler = useCallback((empName) => {
    setEmployees((prev) => prev.filter((emp) => emp !== empName));
  }, []);

  const empClickHandler = useCallback(() => {
    totalEmpClick.current += 1;
    console.log(`Emps Clicked ${totalEmpClick.current} times`);
  }, []);

  const minutes = String(Math.floor(timeSpent / 60)).padStart(2, "0");
  const seconds = String(timeSpent % 60).padStart(2, "0");

  return (
    <>
      <div id="timerContainer">
        <h3 id="timer">
          Time Spent : {minutes}:{seconds}
        </h3>
      </div>
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
          ref={inputRef}
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

        {showList && (
          <h4 id="empCOunt"> Total Employees : {Employees.length}</h4>
        )}
        {showList &&
          Employees.length > 0 &&
          Employees.map((emp, index) => (
            <Employee
              key={index}
              name={emp}
              onEmployeeClick={() => {
                console.log(emp);
              }}
              onDeleteEmployee={() => deleteHandler(emp)}
              employeeClicked={empClickHandler}
            />
          ))}

        {Employees.length == 0 && showList && <h2>No Employee to list</h2>}
      </div>

      <Footer />
    </>
  );
}

export default App;
