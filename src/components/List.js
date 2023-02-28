import React, { useEffect, useState } from "react";
import axios from "axios";

function List() {
  const [allCerti, setAllCerti] = useState([]);
  let a = 1;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // const res = await axios.get("http://192.168.1.110/server/getList.php");
        const res = await axios.get(
          "https://movies.mishraa.com/server/getList.php"
        );
        setAllCerti(res.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAll();
  }, []);

  return (
    <div style={{ backgroundColor: "white", height: "100%", width: "100%" }}>
      <div>
        <table>
          <tr>
            <th>SNo</th>
            <th>Teacher</th>
            <th>Student</th>
            <th>Module Name</th>
            <th>Module Code</th>
            <th>Course Completion Date</th>
            <th>Certificate Download Date</th>
          </tr>
          {allCerti.map((m) => {
            return (
              <tr>
                {/* <td>{m.Sno}</td> */}
                <td>{a++}</td>
                <td>{m.TName}</td>
                <td>{m.SName}</td>
                <td>{m.MName}</td>
                <td>{m.MCode}</td>
                <td>{m.CourseDate}</td>
                <td>{m.CertiDownDate}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default List;
