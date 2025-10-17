import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { PanelBody } from '@wordpress/components';

registerBlockType('beautyhub/header', {
  title: 'Beauty Hub Brand Header',
  description: 'Beauty Hub Brand Header Block',
  icon: 'filter',
  category: 'common',
  textdomain: 'bhheader',

  attributes: {},

  edit: EditComponent,
  save: (props) => {
    return <div {...useBlockProps.save()}>HEADER Save</div>;
  },
});

function EditComponent(props) {
  return (
    <>
      <div {...useBlockProps()}>HEADER</div>
    </>
  );
}
