import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
} from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { PanelBody, PanelRow, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

registerBlockType('beautyhub/pingpong', {
  title: __('Beauty Hub Brand Pingpong', 'bhpingpong'),
  description: __('Beauty Hub Brand Pingpong Block', 'bhpingpong'),
  icon: 'align-none',
  category: 'common',
  supports: {
    align: ['full'],
  },
  attributes: {
    align: { type: 'string', default: 'full' },
    imageLeft: { type: 'boolean', default: false },
  },
  edit: EditComponent,
  save: (props) => {
    const { imageLeft } = props.attributes;
    return (
      <div {...useBlockProps.save()}>
        <div className={`bh-ping-pong ${imageLeft ? 'bh-ping-pong-left' : ''}`}>
          <InnerBlocks.Content />
        </div>
      </div>
    );
  },
});

function EditComponent({ setAttributes, attributes, clientId }) {
  const { imageLeft } = attributes;

  const ALLOWED_BLOCKS = [
    'beautyhub/pingpong-content',
    'beautyhub/pingpong-image',
  ];

  // Count the number of child blocks in this parent
  const blockCount = useSelect(
    (select) => select('core/block-editor').getBlocks(clientId)?.length || 0,
    [clientId]
  );

  return (
    <div {...useBlockProps()}>
      <InspectorControls>
        <PanelBody
          title={__('Content Block Switcher', 'bhpingpong')}
          initialOpen={false}
        >
          <PanelRow>
            <ToggleControl
              label={__('Switch Image Block to the Left', 'bhpingpong')}
              checked={imageLeft}
              onChange={(value) => setAttributes({ imageLeft: value })}
              help={
                imageLeft
                  ? __('Image block placed to the left.', 'bhpingpong')
                  : __('Image block placed to the right.', 'bhpingpong')
              }
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>

      <div className={`bh-ping-pong ${imageLeft ? 'bh-ping-pong-left' : ''}`}>
        <InnerBlocks
          allowedBlocks={ALLOWED_BLOCKS}
          template={[]}
          templateLock={false} // allow editing
          orientation="horizontal"
          renderAppender={
            blockCount < 2 ? () => <InnerBlocks.ButtonBlockAppender /> : null
          }
          className="bh-ping-pong-innerblocks"
        />
      </div>
    </div>
  );
}
