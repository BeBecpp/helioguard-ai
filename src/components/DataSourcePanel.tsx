import { Database, ExternalLink, FileText, Info } from 'lucide-react';
import { PixelFrame } from './PixelFrame';

const DATA_SOURCES = [
  {
    name: 'NASA NeoWs Feed',
    url: 'https://api.nasa.gov/neo/rest/v1/feed',
    description: 'Near-Earth object close-approach data for the next 7 days.',
  },
  {
    name: 'NASA DONKI',
    url: 'https://api.nasa.gov/DONKI/docs',
    description: 'Space weather notifications, CMEs, and solar flare events.',
  },
  {
    name: 'NASA Open APIs',
    url: 'https://api.nasa.gov/',
    description: 'Public NASA data portal — no official partnership implied.',
  },
];

interface DataSourcePanelProps {
  dateRange?: { startDate: string; endDate: string };
}

export function DataSourcePanel({ dateRange }: DataSourcePanelProps) {
  return (
    <section className="sources-section" aria-labelledby="sources-heading">
      <div className="section-intro section-intro-left">
        <span className="section-kicker">Research & Data</span>
        <h2 id="sources-heading">NASA Data Sources</h2>
        <p className="section-lead">
          Every number on this mission comes from NASA public APIs — linked below for verification.
        </p>
      </div>

      <PixelFrame accent="neutral" className="glass-card data-source-panel card-fade-in">
        {dateRange && (
          <p className="date-range">
            Asteroid window: <code>{dateRange.startDate}</code> → <code>{dateRange.endDate}</code>
          </p>
        )}

        <ul className="source-list">
          {DATA_SOURCES.map((source) => (
            <li key={source.name}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                <Database size={14} />
                {source.name} <ExternalLink size={12} />
              </a>
              <p>{source.description}</p>
            </li>
          ))}
          <li className="source-research">
            <span className="source-research-label">
              <FileText size={14} />
              Research: <code>docs/RESEARCH.md</code>
            </span>
            <p>Mathematical model, ethics, and evaluation plan for this student research project.</p>
          </li>
        </ul>

        <p className="source-disclaimer">
          <Info size={14} />
          This project uses NASA public/open data. It is not an official NASA product or emergency
          alert system.
        </p>
      </PixelFrame>
    </section>
  );
}
