const TOPICS = [
  {
    title: 'What is miss distance?',
    text: 'How far an asteroid passes from Earth — not a collision prediction. Larger distances mean safer flybys for learning.',
  },
  {
    title: 'Why does velocity matter?',
    text: 'Faster objects carry more energy. Our risk engine uses NASA velocity data to help students compare object attention scores.',
  },
  {
    title: 'What is a potentially hazardous asteroid?',
    text: 'NASA flags objects above a certain size that pass within a defined distance. It means "watch closely," not "impact imminent."',
  },
  {
    title: 'What is space weather?',
    text: 'Solar activity from the Sun that can affect satellites and radio. HelioGuard summarizes NASA DONKI signals in plain language.',
  },
  {
    title: 'Why can solar storms affect GPS?',
    text: 'Charged particles from the Sun can disturb the ionosphere, delaying GPS signals. Space weather helps us understand that chain.',
  },
  {
    title: 'Why is this educational, not an official alert?',
    text: 'HelioGuard uses public NASA data for learning. For real alerts, always check official NASA, NOAA, and government sources.',
  },
];

export function LearningCards() {
  return (
    <section id="learn" className="learning-section" aria-labelledby="learn-heading">
      <h2 id="learn-heading" className="section-title">
        Student Learning
      </h2>
      <div className="learning-grid">
        {TOPICS.map((topic) => (
          <article key={topic.title} className="learning-card glass-panel card-hover">
            <h3>{topic.title}</h3>
            <p>{topic.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
