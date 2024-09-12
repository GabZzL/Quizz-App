import quizImage from "../assets/quiz-logo.png";

function Header() {
    return(
        <header>
            <img src={quizImage} alt="quiz-image" />
            <h1>React Quiz</h1>
        </header>
    )
}

export default Header;