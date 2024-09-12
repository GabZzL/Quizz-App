import { useState, useCallback } from "react";

import QUESTIONS from '../questions';
import QuestionTimer from "./QuestionTimer";
import quizComplete from '../assets/quiz-complete.png';

function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState('');

    const activeQuestionIndex = answerState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(
        function handleSelectAnswer(selectedAnswer) {
            setAnswerState('answered');

            setUserAnswers((prevUserAnswers) => {
                return [...prevUserAnswers, selectedAnswer];
            });

            setTimeout(() => {
                if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                    setAnswerState('correct');
                } else {
                    setAnswerState('wrong');
                }

                setTimeout(() => {
                    setAnswerState('');
                }, 2000);
            }, 1000);
        }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    console.log(userAnswers);

    if (quizIsComplete) {
        return(
            <div id="summary">
                <img src={quizComplete} alt="quiz-completed" />
                <h2>Quiz Completed!</h2>
            </div>
        )
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return(
        <div id="quiz">
            <div id="question">
                <QuestionTimer
                    key={activeQuestionIndex} // recreate the QuestionTimer component 
                    timeout={10000} 
                    onTimeout={handleSkipAnswer}
                />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer, index) => {
                        const isSelected = userAnswers[userAnswers.length - 1] === answer;
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
                                    onClick={() => handleSelectAnswer(answer)}
                                    className={classes}
                                >
                                    {answer}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Quiz;