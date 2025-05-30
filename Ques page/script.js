const questions = [
  "You regularly make new friends.",
  "Complex and novel ideas excite you more than simple and straightforward ones.",
  "You usually feel more persuaded by what resonates emotionally with you than by factual arguments.",
  "Your living and working spaces are clean and organized.",
  "You usually stay calm, even under a lot of pressure.",
  "You find the idea of networking or promoting yourself to strangers very daunting.",
  "You prioritize and plan tasks effectively, often completing them well before the deadline.",
  "People’s stories and emotions speak louder to you than numbers or data.",
  "You like to use organizing tools like schedules and lists.",
  "Even a small mistake can cause you to doubt your overall abilities and knowledge.",
  "You feel comfortable just walking up to someone you find interesting and striking up a conversation.",
  "You are not too interested in discussions about various interpretations of creative works.",
  "You prioritize facts over people’s feelings when determining a course of action.",
  "You often allow the day to unfold without any schedule at all.",
  "You rarely worry about whether you make a good impression on people you meet.",
  "You enjoy participating in team-based activities.",
  "You enjoy experimenting with new and untested approaches.",
  "You prioritize being sensitive over being completely honest.",
  "You actively seek out new experiences and knowledge areas to explore.",
  "You are prone to worrying that things will take a turn for the worse.",
  "You enjoy solitary hobbies or activities more than group ones.",
  "You cannot imagine yourself writing fictional stories for a living.",
  "You favor efficiency in decisions, even if it means disregarding some emotional aspects.",
  "You prefer to do your chores before allowing yourself to relax.",
  "In disagreements, you prioritize proving your point over preserving the feelings of others.",
  "You usually wait for others to introduce themselves first at social gatherings.",
  "Your mood can change very quickly.",
  "You are not easily swayed by emotional arguments.",
  "You often end up doing things at the last possible moment.",
  "You enjoy debating ethical dilemmas.",
  "You usually prefer to be around others rather than on your own.",
  "You become bored or lose interest when the discussion gets highly theoretical.",
  "When facts and feelings conflict, you usually find yourself following your heart.",
  "You find it challenging to maintain a consistent work or study schedule.",
  "You rarely second-guess the choices that you have made.",
  "Your friends would describe you as lively and outgoing.",
  "You are drawn to various forms of creative expression, such as writing.",
  "You usually base your choices on objective facts rather than emotional impressions.",
  "You like to have a to-do list for each day.",
  "You rarely feel insecure.",
  "You avoid making phone calls.",
  "You enjoy exploring unfamiliar ideas and viewpoints.",
  "You can easily connect with people you have just met.",
  "If your plans are interrupted, your top priority is to get back on track as soon as possible.",
  "You are still bothered by mistakes that you made a long time ago.",
  "You are not too interested in discussing theories on what the world could look like in the future.",
  "Your emotions control you more than you control them.",
  "When making decisions, you focus more on how the affected people might feel than on what is most logical or efficient.",
  "Your personal work style is closer to spontaneous bursts of energy than organized and consistent efforts.",
  "When someone thinks highly of you, you wonder how long it will take them to feel disappointed in you.",
  "You would love a job that requires you to work alone most of the time.",
  "You believe that pondering abstract philosophical questions is a waste of time.",
  "You feel more drawn to busy, bustling atmospheres than to quiet, intimate places.",
  "If a decision feels right to you, you often act on it without needing further proof.",
  "You often feel overwhelmed.",
  "You complete things methodically without skipping over any steps.",
  "You prefer tasks that require you to come up with creative solutions rather than follow concrete steps.",
  "You are more likely to rely on emotional intuition than logical reasoning when making a choice.",
  "You struggle with deadlines.",
  "You feel confident that things will work out for you."
];

let currentIndex = 0;
const questionsPerPage = 6;

const renderQuestions = () => {
  const questionBox = document.getElementById("question-box");
  questionBox.innerHTML = "";

  const start = currentIndex * questionsPerPage;
  const end = Math.min(start + questionsPerPage, questions.length);

  for (let i = start; i < end; i++) {
    const q = document.createElement("div");
    q.classList.add("question");
    let html = `<p>${i + 1}. ${questions[i]}</p><div class='scale'>`;

    for (let j = 1; j <= 5; j++) {
      html += `
            <label>
              <input type="radio" name="q${i}" value="${j}" required />
              <span>${j}</span>
            </label>
          `;
    }

    html += `</div>`;
    q.innerHTML = html;
    questionBox.appendChild(q);
  }
};

document.getElementById("next-btn").addEventListener("click", () => {
  if ((currentIndex + 1) * questionsPerPage < questions.length) {
    currentIndex++;
    renderQuestions();
  }
});

document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderQuestions();
  }
});

renderQuestions();