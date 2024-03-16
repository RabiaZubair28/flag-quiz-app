import questions from "./assets/questions.json";
import React from "react";

function App() {
  const [allQuestions, setAllQuestions] = React.useState(questions);
  const [qIndex, setQIndex] = React.useState(0);
  const [clickCount, setClickCount] = React.useState(0);
  const [currentQuestionNum, setCurrentQuestionNum] = React.useState(1);

  const q = allQuestions[qIndex];

  
  const imgSrc = `../img/${q.img}`;

  const onSelectOption = (qimg, op) => {
    const copyQuestions = [...allQuestions];
    const question = copyQuestions.find((q) => q.img === qimg);
    question.selectedOption = op;
    setAllQuestions(copyQuestions);
    setClickCount(prevCount => prevCount + 1); 
  };

  const getOptionStyle = (q, op) => {
    const style = "btn options btn-info mx-auto my-2 py-2 ";

    if (op !== q.selectedOption) return style;

    // you are rendering selected option
    if (op === q.right_answer) return " options-green";
    else return " options-red";
  };

  const calculateScore = () => {
    const correctAnswers = allQuestions.filter((q) => q.selectedOption === q.right_answer);
    return correctAnswers.length;
  };

 

  const handleNextQuestion = () => {
    setQIndex(Math.floor(Math.random() * allQuestions.length));
    setCurrentQuestionNum(prevNum => prevNum + 1);
  };

  return (
    <div className="background">
   
   <div className="text-center">
    
    <h3 className="question-heading">Question {currentQuestionNum} of {allQuestions.length}</h3></div>
      <div className="justify-content-center align-items-center container my-3">

      
        <div className="text-center my-3">
          <img src={imgSrc} alt="" className="image" />
        </div>
        <div className="container card text-center ">
          <div className="card-header">
            <h4 className="heading">Choose The Country</h4>
          </div>
          <div className="card-body text-center">
            <div className=" list-group list-group-flush my-1">
              {q.options.map((op) => (
                <button
                  type="button"
                  key={op}
                  className={getOptionStyle(q, op)}
                  onClick={() => onSelectOption(q.img, op)}
                >
                  {op}
                </button>
              ))}
            </div>
            <button
              className="btn py-2 button"
              onClick={handleNextQuestion}
            >
              Wanna Play More?
            </button>
          </div>
          <div className="card-footer text-body-secondary">
            <div className="results">
            <h4 className="question-heading">Total Clicks: {clickCount}</h4>
            <h4 className="question-heading">Total Score: {calculateScore()}</h4>
            </div>
            
          </div>
        </div>
      </div>
 
    </div>
  );
}

export default App;
