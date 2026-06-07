/** Trim full briefing text to a short homepage summary (UI only — engine unchanged). */
export function getBriefingSummary(briefing: string, maxSentences = 4): string {
  const paragraphs = briefing.split('\n\n').filter(Boolean);
  const body = paragraphs.slice(1, -1).join(' ');
  if (!body) return '';

  const sentences = body.match(/[^.!?]+[.!?]+/g) ?? [body];
  return sentences.slice(0, maxSentences).join(' ').trim();
}
