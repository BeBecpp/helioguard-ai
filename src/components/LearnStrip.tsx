const TOPICS = [
  {
    title: 'What is miss distance?',
    text: 'How far an asteroid passes from Earth — not a collision prediction. Larger distances mean safer flybys for learning.',
  },
  {
    title: 'Why does speed matter?',
    text: 'Faster objects carry more energy. Our risk engine uses NASA velocity data to help students compare object attention scores.',
  },
  {
    title: 'What is space weather?',
    text: 'Solar activity from the Sun that can affect satellites and radio. HelioGuard summarizes NASA DONKI signals in plain language.',
  },
];

export function LearnStrip() {
  return (
    <section id="learn" className="learn-strip" aria-labelledby="learn-heading">
      <h2 id="learn-heading" className="compact-section-title">
        Quick Learn
      </h2>
      <div className="learn-strip-grid">
        {TOPICS.map((topic) => (
          <article key={topic.title} className="learn-card arcade-panel">
            <h3>{topic.title}</h3>
            <p>{topic.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
