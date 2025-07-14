// src/utils/storage.js

export function storeURL(data) {
  const existing = JSON.parse(localStorage.getItem('urls') || '[]');
  existing.push(data);
  localStorage.setItem('urls', JSON.stringify(existing));
}

export function retrieveURLs() {
  return JSON.parse(localStorage.getItem('urls') || '[]');
}

export function trackClick(code, info) {
  const existing = JSON.parse(localStorage.getItem('clicks') || '{}');
  existing[code] = existing[code] || [];
  existing[code].push(info);
  localStorage.setItem('clicks', JSON.stringify(existing));
}

export function getURLClicks(code) {
  const all = JSON.parse(localStorage.getItem('clicks') || '{}');
  return all[code] || [];
}
