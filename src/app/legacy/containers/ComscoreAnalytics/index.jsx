import React, { useContext } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import AmpComscoreAnalytics from './Amp';
import CanonicalComscoreAnalytics from './Canonical';
import { useAmp } from 'next/amp';

const ComscoreAnalytics = () => {
  const isAmp = useAmp();
  const { enabled } = useToggle('comscoreAnalytics');
  if (!enabled) {
    return null;
  }

  return isAmp ? <AmpComscoreAnalytics /> : <CanonicalComscoreAnalytics />;
};

export default ComscoreAnalytics;
