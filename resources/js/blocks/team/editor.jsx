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
        <div className="data-div" data-attributes={JSON.stringify(attr)}></div>
      </div>
    );
  },
});

function EditComponent(props) {
  useEffect(() => {
    const getTeam = async () => {
      if (!window.bh || !window.bh.restUrl) {
        console.error('bh.restUrl is not defined');
        return;
      }

      try {
        const res = await fetch(`${window.bh.restUrl}beautyhub/v1/team`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        props.setAttributes({ teamMembers: data });
      } catch (err) {
        console.error('Failed to fetch team:', err);
      }
    };

    getTeam();
  }, []);

  return (
    <>
      <div {...useBlockProps()}>
        {props.attributes.teamMembers.length === 0 ? (
          <p>No members yet, please add</p>
        ) : (
          <TeamContent teamMembers={props.attributes.teamMembers} />
        )}
      </div>
    </>
  );
}
