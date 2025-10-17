import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { PanelBody } from '@wordpress/components';

registerBlockType('beautyhub/banner', {
  title: 'Beauty Hub Brand Banner',
  description: 'Beauty Hub Brand Head Banner Block',
  icon: 'align-full-width',
  category: 'common',
  textdomain: 'bhbanner',

  attributes: {},

  edit: EditComponent,
  save: (props) => {
    return <div {...useBlockProps.save()}>BANNER Save</div>;
  },
});

function EditComponent(props) {
  return (
    <>
      <div {...useBlockProps()}>BANNER</div>
    </>
  );
}
