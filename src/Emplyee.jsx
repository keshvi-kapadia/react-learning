import { useState } from "react";

function Employee(props)
{
    const [cnt,setClickCount]=useState(0);
    return(
        <div className="employeeCard">
            <h3>{props.name} - {cnt}</h3>
            <button onClick={()=>{
                props.onEmployeeClick();
                setClickCount(cnt + 1);
            }} className="clickbtn">Click Me</button>
            <button className="deleteBtn" onClick={props.onDeleteEmployee}>Delete</button>
        </div>
    );
}
export default Employee;