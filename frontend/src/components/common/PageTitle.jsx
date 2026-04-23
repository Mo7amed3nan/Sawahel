import { useEffect } from 'react';

/**
 * Sets the document title. Place at the top of each page component.
 * Automatically appends " — Sawahel" suffix.
 *
 * @param {string} title - The page title
 */
export default function PageTitle({ title }) {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} — Sawahel` : 'Sawahel';
    return () => {
      document.title = prev;
    };
  }, [title]);

  return null;
}
