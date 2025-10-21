import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InnerBlocks,
  MediaUpload,
  MediaUploadCheck,
  PanelColorSettings,
  useSetting,
} from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { Button } from '@wordpress/components';

registerBlockType('beautyhub/pingpong-image', {
  title: 'Pingpong Image Block',
  parent: ['beautyhub/pingpong'],
  attributes: {
    image: { type: 'string' },
    imgId: { type: 'number' },
    color: { type: 'string', default: 'white' },
  },
  edit: ({ attributes, setAttributes }) => {
    const { image, imgId, color } = attributes;
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
          className: `bh-image-block bh-pingpong-block-bg-color-${color}`,
        })}
        style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
      >
        <PanelColorSettings
          title={__('Image Block Color', 'bhpingpong')}
          colorSettings={[
            {
              value: getColorValue(color),
              onChange: handleColorChange,
              label: __('Select Image Block Color', 'bhpingpong'),
            },
          ]}
          disableCustomColors
        />

        {image ? (
          <div
            className="bh-image-block-bg-image"
            style={{ backgroundImage: `url(${image})`, height: '100%' }}
          ></div>
        ) : (
          <div
            className={`bh-pingpong-block-bg-color-${color}`}
            style={{ height: '100%' }}
          >
            <InnerBlocks
              allowedBlocks={[
                'core/paragraph',
                'core/group',
                'beautyhub/header',
                'beautyhub/button',
              ]}
            />
          </div>
        )}

        <MediaUploadCheck>
          <MediaUpload
            onSelect={(img) => setAttributes({ image: img.url, imgId: img.id })}
            value={imgId}
            render={({ open }) => (
              <Button variant="secondary" onClick={open}>
                {image
                  ? __('Change Image', 'bhpingpong')
                  : __('Choose Image', 'bhpingpong')}
              </Button>
            )}
          />
        </MediaUploadCheck>
      </div>
    );
  },
  save: ({ attributes }) => {
    const { image, color } = attributes;
    return image ? (
      <div
        className="bh-image-block-bg-image"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
    ) : (
      <div className={`bh-image-block bh-pingpong-block-bg-color-${color}`}>
        <InnerBlocks.Content />
      </div>
    );
  },
});
