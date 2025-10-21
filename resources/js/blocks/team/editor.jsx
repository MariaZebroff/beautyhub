import { __ } from '@wordpress/i18n';

import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { PanelBody } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import TeamContent from './shared';

registerBlockType('beautyhub/team', {
  title: 'Beauty Hub Brand Team',
  description: 'Beauty Hub Brand Team Block',
  icon: 'groups',
  category: 'common',
  textdomain: 'bhteam',

  attributes: {
    teamMembers: { type: 'array', default: [] },
  },

  edit: EditComponent,
  save: ({ attributes }) => {
    const attr = attributes;
    return (
      <div {...useBlockProps.save()}>
        <TeamContent teamMembers={attributes.teamMembers} />
      </div>
    );
  },
});

function EditComponent({ attributes, setAttributes }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTeam = async () => {
      // Reset states
      setIsLoading(true);
      setError(null);

      // Validate window.bh configuration
      if (!window.bh) {
        const errorMsg = 'Window configuration (bh) is not defined';
        console.error(errorMsg);
        setError(errorMsg);
        setIsLoading(false);
        return;
      }

      if (!window.bh.restUrl) {
        const errorMsg = 'REST API URL is not configured';
        console.error(errorMsg);
        setError(errorMsg);
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`${window.bh.restUrl}beautyhub/v1/team`);

        // Check if the response is OK
        if (!res.ok) {
          const errorMsg = `HTTP error! status: ${res.status} ${res.statusText}`;
          console.error(errorMsg);
          setError(errorMsg);
          return;
        }

        // Check if response is JSON
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const errorMsg = 'Server returned non-JSON response';
          console.error(errorMsg);
          setError(errorMsg);
          return;
        }

        const data = await res.json();

        // Validate the response data structure
        if (!Array.isArray(data)) {
          const errorMsg =
            'Invalid response format: expected array of team members';
          console.error(errorMsg, data);
          setError(errorMsg);
          return;
        }

        // Success case
        setAttributes({ teamMembers: data });
        setError(null);
      } catch (err) {
        // Handle different types of errors
        let errorMsg = 'Failed to fetch team members';

        if (err.name === 'TypeError' && err.message.includes('fetch')) {
          errorMsg = 'Network error: Unable to connect to server';
        } else if (err.name === 'SyntaxError') {
          errorMsg = 'Invalid JSON response from server';
        } else {
          errorMsg = `Error: ${err.message}`;
        }

        console.error('Failed to fetch team:', err);
        setError(errorMsg);
      } finally {
        setIsLoading(false);
      }
    };

    getTeam();
  }, []);

  // Retry function
  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    // The useEffect will run again because isLoading changed
  };

  return (
    <div {...useBlockProps()}>
      {/* Loading State */}
      {isLoading && (
        <div
          style={{
            padding: '20px',
            textAlign: 'center',
            border: '1px dashed #ccc',
            borderRadius: '4px',
          }}
        >
          <p>Loading team members...</p>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div
          style={{
            padding: '16px',
            backgroundColor: '#fff0f0',
            border: '1px solid #ffcccc',
            borderRadius: '4px',
            color: '#d00',
          }}
        >
          <p>
            <strong>Error loading team members:</strong> {error}
          </p>
          <button
            onClick={handleRetry}
            style={{
              marginTop: '8px',
              padding: '8px 16px',
              backgroundColor: '#007cba',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Success State */}
      {!isLoading && !error && attributes.teamMembers.length === 0 && (
        <div
          style={{
            padding: '20px',
            textAlign: 'center',
            border: '1px dashed #ccc',
            borderRadius: '4px',
          }}
        >
          <p>No team members found. Please add team members.</p>
        </div>
      )}

      {/* Data Loaded Successfully */}
      {!isLoading && !error && attributes.teamMembers.length > 0 && (
        <TeamContent teamMembers={attributes.teamMembers} />
      )}
    </div>
  );
}
