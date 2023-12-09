import React, { useEffect, useState } from "react";
import "./studentForm.css";
import BookGraph from "../bookGraph/bookGraph";

const StudentForm = () => {
  const [genre, setGenre] = useState();
  const [style, setStyle] = useState();
  const [complexity, setComplexity] = useState();
  const [stepper, setStepper] = useState(1);
  const [genreList, setGenreList] = useState([]);
  const [styleList, setStyleList] = useState([]);
  const [complexityList, setComplexityList] = useState([]);

  const handleNext = () => {
    if (genre) {
      if (stepper == 1) setStepper(2);
      if (stepper == 2) setStepper(3);
      if (stepper == 3) setStepper(4);
    }
  };

  useEffect(() => {
    fetch("http://localhost:4000/api/genres")
      .then((res) => res.json())
      .then((data) => {
        setGenreList(data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/api/styles")
      .then((res) => res.json())
      .then((data) => {
        setStyleList(data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/api/complexities")
      .then((res) => res.json())
      .then((data) => {
        setComplexityList(data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  return (
    <div className="student_form">
      {stepper == 4 ? (
        <BookGraph
          genre={genre}
          style={style}
          complexity={complexity}
          stepper={stepper}
          setStepper={setStepper}
        ></BookGraph>
      ) : (
        <>
          <p className="intial_header">
            Answer these questions to get suggestions...
          </p>
          {stepper == 1 && (
            <div className="genre_ques">
              <p>What genre you prefer ?</p>
              <div className="options_container">
                {genreList.map((each) => {
                  return (
                    <div
                      className="options"
                      onClick={() => setGenre(each)}
                      style={{
                        backgroundColor:
                          genre?.name == each?.name ? "#526284" : "#D8D8D8",
                      }}
                    >
                      <p
                        style={{
                          color:
                            genre?.name == each?.name
                              ? "whitesmoke"
                              : "#656464",
                        }}
                      >
                        {each?.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {stepper == 2 && (
            <div className="genre_ques">
              <p>What style you prefer ?</p>
              <div className="options_container">
                {styleList.map((each) => {
                  return (
                    <div
                      className="options"
                      onClick={() => setStyle(each)}
                      style={{
                        backgroundColor:
                          style?.name == each?.name ? "#526284" : "#D8D8D8",
                      }}
                    >
                      <p
                        style={{
                          color:
                            style?.name == each?.name
                              ? "whitesmoke"
                              : "#656464",
                        }}
                      >
                        {each?.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {stepper == 3 && (
            <div className="genre_ques">
              <p>What complexity you prefer ?</p>
              <div className="options_container">
                {complexityList.map((each) => {
                  return (
                    <div
                      className="options"
                      onClick={() => setComplexity(each)}
                      style={{
                        backgroundColor:
                          complexity?.name == each?.name
                            ? "#526284"
                            : "#D8D8D8",
                      }}
                    >
                      <p
                        style={{
                          color:
                            complexity?.name == each?.name
                              ? "whitesmoke"
                              : "#656464",
                        }}
                      >
                        {each?.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div className="next_button" onClick={() => handleNext()}>
            <p style={{ color: "whitesmoke" }}>Next</p>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentForm;
