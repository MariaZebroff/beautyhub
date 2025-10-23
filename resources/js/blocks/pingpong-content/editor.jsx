import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  PanelColorSettings,
  useSetting,
} from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { PanelBody } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

registerBlockType('beautyhub/pingpong-content', {
  title: 'Pingpong Content Block',
  parent: ['beautyhub/pingpong'],
  attributes: {
    color: { type: 'string', default: 'white' },
  },
  edit: ({ attributes, setAttributes, clientId, isSelected }) => {
    const { color } = attributes;
    const themeColors = useSetting('color.palette') || [];

    // Count inner blocks to hide placeholder when content exists
    const innerBlockCount = useSelect(
      (select) => select('core/block-editor').getBlocks(clientId)?.length || 0,
      [clientId]
    );

    const getColorValue = (slug) => {
      const colorObj = themeColors.find((c) => c.slug === slug);
      return colorObj ? colorObj.color : '';
    };

    const handleColorChange = (newColor) => {
      const matched = themeColors.find((c) => c.color === newColor);
      if (matched) setAttributes({ color: matched.slug });
    };

    return (
      <div
        {...useBlockProps()}
        className={`bh-content-block bh-pingpong-block-bg-color-${color}`}
        style={{
          minHeight: '150px',
          border: '1px dashed #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          position: 'relative',
        }}
      >
        {/* Show placeholder only if no inner blocks and not selected */}
        {!isSelected && innerBlockCount === 0 && (
          <span style={{ position: 'absolute' }}>
            {__('Pingpong Content Placeholder', 'bhpingpong')}
          </span>
        )}

        <InspectorControls>
          <PanelBody title="Background Block Colors" initialOpen={false}>
            <PanelColorSettings
              title={__('Content Block Color', 'bhpingpong')}
              colorSettings={[
                {
                  value: getColorValue(color),
                  onChange: handleColorChange,
                  label: __('Select Content Block Color', 'bhpingpong'),
                },
              ]}
              disableCustomColors={true}
            />
          </PanelBody>
        </InspectorControls>

        <div className="bh-container-tw-faker bh-ping-pong-content-block-wrapper px-4 md:px-16 lg:px-26">
          <InnerBlocks
            allowedBlocks={[
              'core/paragraph',
              'core/group',
              'beautyhub/header',
              'beautyhub/button',
            ]}
          />
        </div>
      </div>
    );
  },
  save: ({ attributes }) => {
    const { color } = attributes;
    return (
      <div
        {...useBlockProps.save()}
        className={`bh-content-block bh-pingpong-block-bg-color-${color}`}
      >
        <div className="bh-ping-pong-content-block-wrapper bh-container-tw-faker px-4 md:px-16 lg:px-26">
          <InnerBlocks.Content />
        </div>
      </div>
    );
  },
});
