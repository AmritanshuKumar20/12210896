import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { retrieveURLs, trackClick } from '../utils/storage';
import { recordLog } from '../utils/Logger';

const RedirectHandler = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const allURLs = retrieveURLs();
    const match = allURLs.find((entry) => entry.shortcode === shortcode);

    if (!match) {
      recordLog('REDIRECT_FAIL', `No entry for code: ${shortcode}`);
      return;
    }

    const currentTime = new Date();
    const expiryTime = new Date(match.expiresAt);

    if (currentTime > expiryTime) {
      recordLog('REDIRECT_EXPIRED', `Code expired: ${shortcode}`);
      return;
    }

    trackClick(shortcode, {
      timestamp: currentTime.toISOString(),
      source: document.referrer || 'Direct',
      location: 'India',
    });

    recordLog('REDIRECT_SUCCESS', {
      code: shortcode,
      redirectTo: match.original,
    });

    window.location.href = match.original;
  }, [shortcode]);

  return <div>Redirecting you to your destination...</div>;
};

export default RedirectHandler;
