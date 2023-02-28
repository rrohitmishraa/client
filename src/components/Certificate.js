import React from "react";

function Certificate(props) {
  return (
    <div ref={props.divRef} className="main">
      <div className="pdf">
        <span className="stuName">{props.stuName}</span>
        <span className="date">{props.date}</span>

        <span className="message">
          For recognition of the efforts put in completing the
          <br />
          {props.module}.
        </span>
      </div>
    </div>
  );
}

export default Certificate;
