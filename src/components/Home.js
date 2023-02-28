import html2pdf from "html2pdf.js";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Certificate from "./Certificate";
import axios from "axios";

function Home() {
  const moduleList = [
    "Business Intelligence",
    "Animations",
    "Artificial Intelligence",
    "Coding Fundamentals",
    "Game Designing using Scratch",
    "Website Development",
    "Advanced Game Designing using Scratch",
    "Javascript Programming",
    "Advanced Javascript Programming",
    "Python Programming",
    "Advanced Python Programming",
    "Thunkable",
    "Build Apps Using AppLab",
  ];

  const quotes = [
    "Teaching kids is like herding cats, but way more rewarding.",
    "The best way to predict the future is to teach kids to create it.",
    "Teaching kids: where every day is a new adventure.",
    "I teach kids because I'm not brave enough to be a superhero.",
    "Teaching kids is like planting a garden, you have to give them the right soil and sunlight to grow.",
    "Teaching kids: the ultimate exercise in patience and creativity.",
    "I don't always teach kids, but when I do, I make sure it's fun and engaging.",
    "Teaching kids: the most challenging and rewarding job on the planet.",
    "Teaching kids is not for the faint of heart, but for those who want to make a difference in the world.",
    "Teaching kids: because molding young minds is way cooler than molding clay.",
  ];

  moduleList.sort();

  const randomNum = Math.floor(Math.random() * (9 - 0 + 1)) + 0;

  let objectDate = new Date();
  let day = objectDate.getDate();
  let month = objectDate.getMonth();
  let year = objectDate.getFullYear();
  let dateFormat = year + "-" + (month + 1) + "-" + day;

  const divRef = useRef(null);
  const [stuName, setStuname] = useState("");
  const [TName, setTname] = useState("");
  const [date, setDate] = useState("");
  const [module, setModule] = useState(moduleList[0]);
  const [quote] = useState(quotes[randomNum]);

  const handleGeneratePDF = async () => {
    if (stuName !== "" && TName !== "" && date !== "" && module !== "") {
      const input = divRef.current;
      const pdfData = {
        margin: 0,
        filename: stuName + ".pdf",
        image: { type: "jpeg", quality: 0.99 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "px", format: [1000, 720], orientation: "landscape" },
      };
      html2pdf().set(pdfData).from(input).save();

      // sending to database
      let data = new FormData();
      data.append("TName", TName);
      data.append("SName", stuName);
      data.append("MName", module);
      data.append("CourseDate", date);
      data.append("CertiDownDate", dateFormat);

      try {
        await axios.post("http://192.168.1.110/server/sendData.php", data);
        // await axios.post("https://movies.mishraa.com/server/sendData.php", data);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Fill the details");
    }
  };

  return (
    <div className="parent">
      {/* NOT TO BE MESSED WITH */}
      <div className="nonVisible">
        <Certificate
          divRef={divRef}
          stuName={stuName}
          date={date}
          module={module}
        />
      </div>
      {/* ENDS HERE */}
      <div className="container">
        <nav>{/* <Link to="./list"> LIST </Link> */}</nav>
        <div className="quotes">{quote}</div>
        <div className="studentDetails">
          <div className="inner">
            <h5>
              by{" "}
              <a href="https://mishraa.com" target="_blank" rel="noreferrer">
                MISHRAA.COM
              </a>
            </h5>
            <h1>Fill in the Student details</h1>
            <label htmlFor="teacher-name">Teacher Name</label>
            <input
              type="text"
              id="teacher-name"
              name="teacher-name"
              placeholder="Enter Teacher Name"
              value={TName}
              onChange={(e) => setTname(e.target.value)}
            />

            <label htmlFor="student-name">Student Name</label>
            <input
              type="text"
              id="student-name"
              name="student-name"
              placeholder="Enter Student Name"
              value={stuName}
              onChange={(e) => setStuname(e.target.value)}
            />

            <label htmlFor="module-name">Module Name</label>
            <select
              value={module}
              onChange={(e) => {
                setModule(e.target.value);
              }}
              defaultValue={moduleList[0]}
            >
              {moduleList.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <button onClick={handleGeneratePDF}>Generate PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
