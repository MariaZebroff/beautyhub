import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { PanelBody } from '@wordpress/components';

registerBlockType('beautyhub/button', {
  title: 'Beauty Hub Brand Button',
  description: 'Beauty Hub Brand Button Block',
  icon: 'button',
  category: 'common',
  textdomain: 'bhbutton',

  attributes: {},

  edit: EditComponent,
  save: (props) => {
    return <div {...useBlockProps.save()}>Button Save</div>;
  },
});

function EditComponent(props) {
  return (
    <>
      <div {...useBlockProps()}>Button</div>
    </>
  );
}
