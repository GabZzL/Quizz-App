import quizComplete from '../assets/quiz-complete.png';
import QUESTIONS from '../questions';

function Summary({ userAnswers }) {
    const skippedAnswers = userAnswers.filter((answer) => answer === null);
    const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]);
    
    const skippedAnswersResult = Math.round((skippedAnswers.length / userAnswers.length) * 100);
    const correctAnswersResult = Math.round((correctAnswers.length / userAnswers.length) * 100);
    const incorrectAnswersResult = 100 - correctAnswersResult - skippedAnswersResult;

    return(
        <div id="summary">
            <img src={quizComplete} alt="quiz-completed" />
            <h2>Quiz Completed!</h2>
            <div id='summary-stats'>
                <p>
                    <span className='number'>{skippedAnswersResult}%</span>
                    <span className='text'>skipped</span>
                </p>
                <p>
                    <span className='number'>{correctAnswersResult}%</span>
                    <span className='text'>answered correctly</span>
                </p>
                <p>
                    <span className='number'>{incorrectAnswersResult}%</span>
                    <span className='text'>answered incorrectly</span>
                </p>
            </div>
            <ol>
                {userAnswers.map((answer, index) => {
                    let classes = 'user-answer';

                    if (answer === null) {
                        classes += ' skipped';
                    } else if (answer === QUESTIONS[index].answers[0]) {
                        classes += ' correct';
                    } else {
                        classes += ' wrong';
                    }

                    return(
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className='question'>{QUESTIONS[index].text}</p>
                            <p className={classes}>{answer ?? 'Skipped'}</p>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}

export default Summary