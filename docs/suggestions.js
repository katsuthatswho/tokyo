// Only display the entry point after a genuine respondent URL is configured.
fetch('suggestion-config.json').then(r => {
  if (!r.ok) throw new Error('Suggestion form unavailable');
  return r.json();
}).then(config => {
  if (!config.formUrl) return;
  const url = new URL(config.formUrl);
  const isForm = url.hostname === 'forms.gle' || (url.hostname === 'docs.google.com' && url.pathname.startsWith('/forms/') && !url.pathname.endsWith('/edit'));
  if (url.protocol !== 'https:' || !isForm) return;
  document.querySelectorAll('[data-suggest-place]').forEach(link => {
    link.href = url.href;
    link.hidden = false;
  });
}).catch(() => {});
