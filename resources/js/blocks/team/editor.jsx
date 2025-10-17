import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { PanelBody } from '@wordpress/components';

registerBlockType('beautyhub/team', {
  title: 'Beauty Hub Brand Team',
  description: 'Beauty Hub Brand Team Block',
  icon: 'groups',
  category: 'common',
  textdomain: 'bhteam',

  attributes: {},

  edit: EditComponent,
  save: (props) => {
    return <div {...useBlockProps.save()}>TEAM Save</div>;
  },
});

function EditComponent(props) {
  return (
    <>
      <div {...useBlockProps()}>TEAM</div>
    </>
  );
}
