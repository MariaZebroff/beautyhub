import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { PanelBody } from '@wordpress/components';

registerBlockType('beautyhub/pingpong', {
  title: 'Beauty Hub Brand Pingpong',
  description: 'Beauty Hub Brand Pingpong Block',
  icon: 'align-none',
  category: 'common',
  textdomain: 'bhpingpong',

  attributes: {},

  edit: EditComponent,
  save: (props) => {
    return <div {...useBlockProps.save()}>Pingpong Save</div>;
  },
});

function EditComponent(props) {
  return (
    <>
      <div {...useBlockProps()}>Pingpong</div>
    </>
  );
}
