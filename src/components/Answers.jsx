import { useRef } from "react";

function Answers({ answers, selectedAnswer, answerState, onSelectAnswer }) {
    const shuffledAnswers = useRef();

    if(!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }

    return(
        <ul id="answers">
        {shuffledAnswers.current.map((answer, index) => {
            const isSelected = selectedAnswer === answer;
            let classes = '';

            if (answerState === 'answered' && isSelected) {
                classes = 'selected';
            }

            if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                classes = answerState;
            }

            return(
                <li key={index} className="answer">
                    <button 
                        onClick={() => onSelectAnswer(answer)}
                        className={classes}
                        disabled={answerState !== ''}
                    >
                        {answer}
                    </button>
                </li>
            )
        })}
    </ul>
    )
}

export default Answers;