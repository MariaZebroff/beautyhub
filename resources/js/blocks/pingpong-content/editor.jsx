import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InnerBlocks,
  PanelColorSettings,
  useSetting,
} from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType('beautyhub/pingpong-content', {
  title: 'Pingpong Content Block',
  parent: ['beautyhub/pingpong'],
  attributes: {
    color: { type: 'string', default: 'white' },
  },
  edit: ({ attributes, setAttributes }) => {
    const { color } = attributes;
    const themeColors = useSetting('color.palette') || [];

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
        {...useBlockProps({
          className: `bh-content-block bh-pingpong-block-bg-color-${color}`,
        })}
        style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
      >
        <PanelColorSettings
          title={__('Content Block Color', 'bhpingpong')}
          colorSettings={[
            {
              value: getColorValue(color),
              onChange: handleColorChange,
              label: __('Select Content Block Color', 'bhpingpong'),
            },
          ]}
          disableCustomColors
        />
        <InnerBlocks
          allowedBlocks={[
            'core/paragraph',
            'core/group',
            'beautyhub/header',
            'beautyhub/button',
          ]}
        />
      </div>
    );
  },
  save: ({ attributes }) => {
    const { color } = attributes;
    return (
      <div className={`bh-content-block bh-pingpong-block-bg-color-${color}`}>
        <InnerBlocks.Content />
      </div>
    );
  },
});
