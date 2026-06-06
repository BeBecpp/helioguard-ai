import { useState, type ReactNode } from 'react';
import { ChevronDown, GraduationCap } from 'lucide-react';

interface EducationalNoteProps {
  title?: string;
  children: ReactNode;
  expandable?: boolean;
  defaultOpen?: boolean;
  studentMode?: boolean;
  simpleText?: string;
}

export function EducationalNote({
  title = 'Student Explanation',
  children,
  expandable = false,
  defaultOpen = false,
  studentMode = false,
  simpleText,
}: EducationalNoteProps) {
  const [open, setOpen] = useState(defaultOpen || !expandable);

  const content = studentMode && simpleText ? simpleText : children;

  return (
    <aside className="edu-note">
      {expandable ? (
        <button
          type="button"
          className="edu-note-header edu-note-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <GraduationCap size={14} />
          <span>{title}</span>
          <ChevronDown size={14} className={`edu-note-chevron ${open ? 'open' : ''}`} />
        </button>
      ) : (
        <div className="edu-note-header">
          <GraduationCap size={14} />
          <span>{title}</span>
        </div>
      )}
      {open && <div className="edu-note-body">{content}</div>}
    </aside>
  );
}
