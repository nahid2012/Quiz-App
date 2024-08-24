const btn = document.querySelector(".btn button")
const ruleBox = document.querySelector(".ruleBox")
const exitbtn = document.querySelector(".btns .exit")
const Continuebtn = document.querySelector(".btns .Continue")
const Questions = document.querySelector('.Questions')
const nextBtn = document.querySelector(".nextBtn")
const timeCount = document.querySelector(".timeCount .seconds")
const timeLine = document.querySelector('.timeLine')

btn.onclick = () => {
    ruleBox.classList.add("activeInfo")
}

exitbtn.onclick = () => {
    ruleBox.classList.remove("activeInfo")
}

Continuebtn.onclick = () => {
    ruleBox.classList.remove("activeInfo")
    Questions.classList.add("activeQuiz")
    showQuestions(0)
    startTimer(timeValue)
    startTimerLine(widthValue)
}

let que_count = 0
nextBtn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count ++
        showQuestions(que_count)
        clearInterval(counter)
        startTimer(timeValue)

        clearInterval(counterLine)
        startTimerLine(widthValue)

        nextBtn.style.display = "none"
    } else {
        console.log("You have completed your Task 😃")
        showResult()
    }
}

const option_list = document.querySelector('.MyOptions')

function showQuestions(index) {
    const que_text  = document.getElementsByClassName("text")[1]
    let option_tag = `<div class="options">` + questions[index].options[0] + `</div>`
                    + `<div class="options">` + questions[index].options[1] + `</div>`
                    + `<div class="options">` + questions[index].options[2] + `</div>`
                    + `<div class="options">` + questions[index].options[3] + `</div>`
    let que_tag = "<span>" + questions[index].numb + '.' + questions[index].question + "</span>"
    que_text.innerHTML = que_tag
    option_list.innerHTML = option_tag
    const total_que = document.querySelector(".total_Que")
    total_que.innerHTML = `${questions[index].numb} of ${questions.length} questions`
    const options = option_list.querySelectorAll('.options')
    for(let i = 0; i < options.length; i++) {
        options[i].setAttribute("onclick", "optionSelected(this)")
    }
}

let tickIcon = `<div class="tick icon"><i class="fas fa-check"></i></div>`
let crossIcon = `<div class="cross icon"><i class="fas fa-times"></i></div>`

function optionSelected(answer) {
    clearInterval(counter)
    clearInterval(counterLine)
    let userAns = answer.textContent
    let correctAns = questions[que_count].answer
    let alloptions = option_list.children.length
    if(userAns === correctAns) {
        answer.classList.add('correct')
        console.log("You are Right")
        answer.insertAdjacentHTML("beforeend", tickIcon)
        userScore += 1
        console.log(userScore)
    }
    else{
        answer.classList.add("Incorrect")
        console.log("YOu are wrong")
        answer.insertAdjacentHTML("beforeend", crossIcon)

        for (let i = 0; i < alloptions; i ++) {
            if(option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "options correct")
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon)
            }
        }
    }

    for(i = 0; i < alloptions; i++) {
        option_list.children[i].classList.add("disabled")
    }

    nextBtn.style.display = "block"
}


let counter
let timeValue = 15

function startTimer(time) {
    counter = setInterval(timer, 1000)
    function timer() {
        timeCount.textContent = time
        time --
        if(time < 9) {
            let addzero = timeCount.textContent
            timeCount.textContent = 0 + addzero
        }
        if(time < 0) {
            clearInterval(counter)
            timeCount.textContent = '00'
        }
    }
}

let counterLine
let widthValue = 0
function startTimerLine(time) {
    counterLine = setInterval(timer, 50);
    function timer() {
        time += 1
        timeLine.style.width = time + "px"
        if(time > 319) {
            clearInterval(counterLine)
        }
    }
}

const resultBox = document.querySelector('.resultBox')
const restart = document.querySelector('.buttons .restart1')
const quit = document.querySelector('.buttons .quit')
let userScore = 0

function showResult() {
    ruleBox.classList.remove('activeInfo')
    Questions.classList.remove('activeQuiz')
    resultBox.classList.add('activeResult')
    const scoreText = document.querySelector('.score_text')
    if(userScore > 3) {
        let scoreTag = `<span>Congratulations, You got <p>`+ userScore +`</p> out of <p>`+ questions.length +`</p></span>`
        // scoreText.innerHTML = scoreTag
        console.log(scoreText)
    }
    else if (userScore > 1) {
        let scoreTag = `<span>Carry on 👍 You got <p>`+ userScore +`</p> out of <p>`+ questions.length +`</p></span>`
        scoreText.innerHTML = scoreTag
    }
    else {
        let scoreTag = `<span>I am Sorry You got <p>`+ userScore +`</p> out of <p>`+ questions.length +`</p></span>`
        scoreText.innerHTML = scoreTag
    }
}
quit.onclick = () => {
    window.location.reload()
}

restart.onclick = () => {
    resultBox.classList.remove('activeResult');
    Questions.classList.add('activeQuiz');
    userScore = 0;
    que_count = 0;
    clearInterval(counter)
    clearInterval(counterLine)
    showQuestions(que_count)
    startTimer(timeValue)
    startTimerLine(widthValue)
    nextBtn.style.display = "none"
}
