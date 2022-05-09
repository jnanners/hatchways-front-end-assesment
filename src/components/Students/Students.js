import axios from "axios";
import React, {useEffect, useState} from "react";
import "./students.scss"

const Students = () => {
    const [studentInfo, setStudentInfo] = useState([]);

  useEffect(() => {
    fetchHatchwayData().then((data) => {
      setStudentInfo(data.students);
    })
  }, [])

  const getFullName = (studentInfo) => {
    return `${studentInfo.firstName} ${studentInfo.lastName}`;
  }

  const getAverage = (grades) => {
    let sum = 0;
    for(let i = 0; i < grades.length; i++){
      sum += parseInt(grades[i]);
    }
    return sum / grades.length;
  }

  const fetchHatchwayData = () => {
    return axios.get("https://api.hatchways.io/assessment/students")
      .then(({data}) => {
        console.log(data);
        return data;
      })
      .catch(err => {
        console.error(err);
      })
  }

  return (
    <div className="studentList">
      {
        studentInfo.map((studentInfo) => (
          <div className="student" key={studentInfo.id}>
            <div className="studentImage">
                <img src={studentInfo.pic} alt={getFullName(studentInfo)} className="studentPic"></img>
            </div>
            <div className="studentInfo">
                <h1>{getFullName(studentInfo)}</h1> 
                <p>Email: {studentInfo.email}</p>
                <p>Company: {studentInfo.company}</p>
                <p>Skill: {studentInfo.skill}</p>
                <p>Average: {getAverage(studentInfo.grades)}%</p>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Students;