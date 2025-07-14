// src/utils/logger.js
const logs = [];

export function recordLog(type, payload) {
  logs.push({
    timestamp: new Date().toISOString(),
    event: type,
    data: payload,
  });
}

export function fetchLogs() {
  return logs;
}
