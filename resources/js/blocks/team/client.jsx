/**
 * Internal dependencies
 */
import React from 'react';
import TeamContent from './shared'; // This should be the SAME shared component
import hydrate from '../../utils/hydrate';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
  hydrate('.wp-block-beautyhub-team', TeamContent);
});
