import { ExternalLink, FileText, Github } from 'lucide-react';

interface DataSourcesPanelProps {
  dateRange?: { startDate: string; endDate: string };
}

const SOURCES = [
  { name: 'NASA NeoWs Feed', url: 'https://api.nasa.gov/neo/rest/v1/feed' },
  { name: 'NASA DONKI', url: 'https://api.nasa.gov/DONKI/docs' },
  { name: 'NASA Open APIs', url: 'https://api.nasa.gov/' },
  { name: 'NASA/JPL Small-Body Database', url: 'https://ssd.jpl.nasa.gov/' },
];

export function DataSourcesPanel({ dateRange }: DataSourcesPanelProps) {
  return (
    <section id="about" className="data-sources-section" aria-labelledby="sources-heading">
      <h2 id="sources-heading" className="section-title">
        Data Sources
      </h2>

      <div className="data-sources-panel glass-panel">
        {dateRange && (
          <p className="data-sources-window">
            Asteroid data window: <strong>{dateRange.startDate}</strong> →{' '}
            <strong>{dateRange.endDate}</strong>
          </p>
        )}

        <ul className="data-sources-list">
          {SOURCES.map((s) => (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.name} <ExternalLink size={12} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        <div className="data-sources-docs">
          <a
            href="https://github.com/BeBecpp/helioguard-ai/blob/main/docs/RESEARCH.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText size={14} aria-hidden="true" />
            Research Documentation
          </a>
          <a
            href="https://github.com/BeBecpp/helioguard-ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={14} aria-hidden="true" />
            GitHub README
          </a>
        </div>

        <p className="data-sources-note">
          NASA public/open data — not an official NASA product.
        </p>
      </div>
    </section>
  );
}
