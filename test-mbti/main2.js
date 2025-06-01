
const QUESTIONS_PER_PAGE = 6;
const OPTION_SCORES = {
    "Strongly Disagree": -2,
    "Disagree": -1,
    "Neutral": 0,
    "Agree": 1,
    "Strongly Agree": 2
};



const questions = {
    mind: [
        "You regularly make new friends.",
        "You find the idea of networking or promoting yourself to strangers very daunting.",
        "You feel comfortable just walking up to someone you find interesting and striking up a conversation.",
        "You enjoy participating in team-based activities.",
        "You enjoy solitary hobbies or activities more than group ones.",
        "You usually wait for others to introduce themselves first at social gatherings.",
        "You usually prefer to be around others rather than on your own.",
        "Your friends would describe you as lively and outgoing.",
        "You avoid making phone calls.",
        "You feel more drawn to busy, bustling atmospheres than to quiet, intimate places.",
        "You would love a job that requires you to work alone most of the time.",
        "You can easily connect with people you have just met."
    ],
    energy: [
        "Complex and novel ideas excite you more than simple and straightforward ones.",
        "You are not too interested in discussions about various interpretations of creative works.",
        "You enjoy experimenting with new and untested approaches.",
        "You actively seek out new experiences and knowledge areas to explore.",
        "You cannot imagine yourself writing fictional stories for a living.",
        "You become bored or lose interest when the discussion gets highly theoretical.",
        "You are drawn to various forms of creative expression, such as writing.",
        "You enjoy exploring unfamiliar ideas and viewpoints.",
        "You are not too interested in discussing theories on what the world could look like in the future.",
        "You believe that pondering abstract philosophical questions is a waste of time.",
        "If a decision feels right to you, you often act on it without needing further proof.",
        "You prefer tasks that require you to come up with creative solutions rather than follow concrete steps."
    ],
    nature: [
        "You usually feel more persuaded by what resonates emotionally with you than by factual arguments.",
        "People’s stories and emotions speak louder to you than numbers or data.",
        "You prioritize facts over people’s feelings when determining a course of action.",
        "You prioritize being sensitive over being completely honest.",
        "You prioritize fairness over kindness in tough situations.",
        "In disagreements, you prioritize proving your point over preserving the feelings of others.",
        "You are not easily swayed by emotional arguments.",
        "You enjoy debating ethical dilemmas.",
        "When facts and feelings conflict, you usually find yourself following your heart.",
        "When making decisions, you focus more on how the affected people might feel than on what is most logical or efficient.",
        "You usually base your choices on objective facts rather than emotional impressions.",
        "You are more likely to rely on emotional intuition than logical reasoning when making a choice."
    ],
    tactics: [
        "Your living and working spaces are clean and organized.",
        "You prioritize and plan tasks effectively, often completing them well before the deadline.",
        "You like to use organizing tools like schedules and lists.",
        "You like to plan things in advance.",
        "You complete things methodically without skipping over any steps.",
        "You feel more comfortable with a clear structure.",
        "You often allow the day to unfold without any schedule at all.",
        "You prefer to do your chores before allowing yourself to relax.",
        "You often end up doing things at the last possible moment.",
        "You struggle with deadlines.",
        "Your personal work style is closer to spontaneous bursts of energy than organized and consistent efforts.",
        "If your plans are interrupted, your top priority is to get back on track as soon as possible."
    ],
    identity: [
        "You usually stay calm, even under a lot of pressure.",
        "Even a small mistake can cause you to doubt your overall abilities and knowledge.",
        "You rarely worry about whether you make a good impression on people you meet.",
        "You are prone to worrying that things will take a turn for the worse.",
        "You rarely second-guess the choices that you have made.",
        "Your mood can change very quickly.",
        "You are still bothered by mistakes that you made a long time ago.",
        "Your emotions control you more than you control them.",
        "You often feel overwhelmed.",
        "You feel confident that things will work out for you.",
        "You take criticism personally.",
        "When someone thinks highly of you, you wonder how long it will take them to feel disappointed in you."
    ]
};


const traits = {
    mind: { name: "Mind", left: "Extraversion", right: "Introversion" },
    energy: { name: "Energy", left: "Sensing", right: "Intuition" },
    nature: { name: "Nature", left: "Thinking", right: "Feeling" },
    tactics: { name: "Tactics", left: "Judging", right: "Perceiving" },
    identity: { name: "Identity", left: "Assertive", right: "Turbulent" }
};


const elements = {
    pagesContainer: document.getElementById('pagesContainer'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    submitBtn: document.getElementById('submitBtn'),
    testContainer: document.getElementById('testContainer'),
    resultContainer: document.getElementById('resultContainer'),
    resultsContent: document.getElementById('resultsContent'),
    restartBtn: document.getElementById('restartBtn'),
    progressIndicator: document.getElementById('progressIndicator')
};


const state = {
    currentPage: 0,
    answers: Array(Object.values(questions).flat().length).fill(null),
    pages: [],
    currentActiveQuestion: 0
};

function init() {
    createQuestionPages();
    renderPage(0);
    setupEventListeners();
}


function createQuestionPages() {
    const allQuestions = Object.entries(questions)
        .flatMap(([category, items]) => 
            items.map((text, index) => ({ text, category, index }))
        );
    
    shuffleArray(allQuestions);

    
    for (let i = 0; i < allQuestions.length; i += QUESTIONS_PER_PAGE) {
        state.pages.push(allQuestions.slice(i, i + QUESTIONS_PER_PAGE));
    }
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function renderPage(pageIndex) {
    state.currentPage = pageIndex;
    state.currentActiveQuestion = 0;
    
    elements.pagesContainer.innerHTML = '';
    elements.progressIndicator.textContent = `Page ${pageIndex + 1} of ${state.pages.length}`;
    
    const pageDiv = document.createElement('div');
    pageDiv.className = 'questions-page active';
    
    state.pages[pageIndex].forEach((question, qIndex) => {
        const questionDiv = createQuestionElement(question, pageIndex, qIndex);
        pageDiv.appendChild(questionDiv);
    });
    
    elements.pagesContainer.appendChild(pageDiv);
    updateButtonStates();
}

function createQuestionElement(question, pageIndex, qIndex) {
    const questionDiv = document.createElement('div');
    questionDiv.className = `question ${qIndex === 0 ? 'active' : ''}`;
    questionDiv.id = `q-${pageIndex}-${qIndex}`;
    
    questionDiv.innerHTML = `
        <div class="question-text">${question.text}</div>
        <div class="options">
    ${["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"].map(option => `
        <div class="option">
            <input type="radio" name="q${pageIndex}-${qIndex}" id="q${pageIndex}-${qIndex}-${option.replace(/\s/g, '').toLowerCase()}"
                value="${option}" ${getAnswerState(pageIndex, qIndex, option)}>
            <label for="q${pageIndex}-${qIndex}-${option.replace(/\s/g, '').toLowerCase()}">${option}</label>
        </div>
    `).join('')}
</div>

    `;
    
    addRadioButtonListeners(questionDiv, pageIndex, qIndex);
    return questionDiv;
}

function getAnswerState(pageIndex, qIndex, value) {
    return state.answers[pageIndex * QUESTIONS_PER_PAGE + qIndex] === value ? 'checked' : '';
}

function addRadioButtonListeners(container, pageIndex, qIndex) {
    const radioInputs = container.querySelectorAll('input[type="radio"]');
    
    radioInputs.forEach(input => {
        input.addEventListener('change', () => {
            saveAnswer(pageIndex, qIndex, input.value);
            animateSelection(input.nextElementSibling);
            
            if (qIndex < QUESTIONS_PER_PAGE - 1) {
                moveToNextQuestion(container, pageIndex, qIndex);
            }
        });
    });
}

function saveAnswer(pageIndex, qIndex, value) {
    state.answers[pageIndex * QUESTIONS_PER_PAGE + qIndex] = value;
}

function animateSelection(element) {
    element.classList.add('pulse');
    setTimeout(() => element.classList.remove('pulse'), 300);
}

function moveToNextQuestion(currentContainer, pageIndex, qIndex) {
    currentContainer.classList.remove('active');
    const nextQuestion = document.querySelector(`#q-${pageIndex}-${qIndex + 1}`);
    nextQuestion.classList.add('active');
    nextQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
    state.currentActiveQuestion = qIndex + 1;
}

function updateButtonStates() {
    elements.prevBtn.disabled = state.currentPage === 0;
    elements.nextBtn.style.display = state.currentPage === state.pages.length - 1 ? 'none' : 'block';
    elements.submitBtn.style.display = state.currentPage === state.pages.length - 1 ? 'block' : 'none';
}


function calculateResults() {
    const results = {};
    
    Object.keys(traits).forEach(category => {
        results[category] = { left: 0, right: 0, total: 0 };
    });
    
    state.pages.flat().forEach((question, index) => {
        if (!state.answers[index]) return;
        
        const score = OPTION_SCORES[state.answers[index]];
        const isIdentity = question.category === 'identity';
        
        if (score > 0) {
            results[question.category][isIdentity ? 'right' : 'left'] += Math.abs(score);
        } else {
            results[question.category][isIdentity ? 'left' : 'right'] += Math.abs(score);
        }
        
        results[question.category].total += Math.abs(score);
    });
    
    return results;
}


function showResults() {
    elements.submitBtn.innerHTML = '<span class="loading"></span> Calculating...';
    
    setTimeout(() => {
        const results = calculateResults();
        elements.resultsContent.innerHTML = Object.entries(results)
            .map(([category, data], i) => {
                const leftPercent = Math.round((data.left / (data.total || 1)) * 100);
                const rightPercent = Math.round((data.right / (data.total || 1)) * 100);
                const { left, right, name } = traits[category];
                
                return `
                    <div class="trait-result" style="animation-delay: ${i * 0.1}s">
                        <div class="trait-name">${name}: ${Math.max(leftPercent, rightPercent)}% ${leftPercent > rightPercent ? left : right}</div>
                        <div class="progress-container">
                            <div class="progress-bar" style="width: ${leftPercent}%;">
                                <span class="progress-label">${leftPercent}%</span>
                            </div>
                        </div>
                        <div class="trait-labels">
                            <span>${left}</span>
                            <span>${right}</span>
                        </div>
                    </div>
                `;
            })
            .join('');
        
        elements.testContainer.style.display = 'none';
        elements.resultContainer.style.display = 'block';
        elements.submitBtn.innerHTML = 'Get Results';
    }, 800);
}


function setupEventListeners() {
    elements.nextBtn.addEventListener('click', () => {
        if (validateCurrentPage()) {
            animateButton(elements.nextBtn);
            renderPage(state.currentPage + 1);
            scrollToTop();
        } else {
            alert('Please answer all questions on this page.');
        }
    });
    
    elements.prevBtn.addEventListener('click', () => {
        animateButton(elements.prevBtn);
        renderPage(state.currentPage - 1);
        scrollToTop();
    });
    
    elements.submitBtn.addEventListener('click', () => {
        if (state.answers.includes(null)) {
            alert('Please answer all questions.');
            return;
        }
        animateButton(elements.submitBtn);
        showResults();
    });
    
    elements.restartBtn.addEventListener('click', () => {
        animateButton(elements.restartBtn);
        resetTest();
    });
}

function validateCurrentPage() {
    const startIdx = state.currentPage * QUESTIONS_PER_PAGE;
    const endIdx = startIdx + QUESTIONS_PER_PAGE;
    return state.answers.slice(startIdx, endIdx).every(answer => answer !== null);
}

function animateButton(button) {
    button.classList.add('pulse');
    setTimeout(() => button.classList.remove('pulse'), 300);
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetTest() {
    state.currentPage = 0;
    state.currentActiveQuestion = 0;
    state.answers = state.answers.fill(null);
    elements.testContainer.style.display = 'block';
    elements.resultContainer.style.display = 'none';
    init();
}


document.addEventListener('DOMContentLoaded', init);