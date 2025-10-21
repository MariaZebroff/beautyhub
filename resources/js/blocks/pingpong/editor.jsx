import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InnerBlocks,
  MediaUpload,
  InspectorControls,
  MediaUploadCheck,
  PanelColorSettings,
  useSetting,
} from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import {
  PanelBody,
  PanelRow,
  Button,
  ToggleControl,
  TextControl,
} from '@wordpress/components';

registerBlockType('beautyhub/pingpong', {
  title: 'Beauty Hub Brand Pingpong',
  description: 'Beauty Hub Brand Pingpong Block',
  icon: 'align-none',
  category: 'common',
  textdomain: 'bhpingpong',
  supports: {
    align: ['full'],
  },

  attributes: {
    align: { type: 'string', default: 'full' },
    imageLeft: { type: 'boolean', default: false },
    image: { type: 'string' },
    imgId: { type: 'number' },
    contentBlockColor: { type: 'string', default: 'white' },
    imageBlockColor: { type: 'string', default: 'white' },
  },

  edit: EditComponent,
  save: (props) => {
    const { imageLeft, image, imgId, contentBlockColor, imageBlockColor } =
      props.attributes;
    return (
      <div {...useBlockProps.save()}>
        <div className={`bh-ping-pong ${imageLeft && 'bh-ping-pong-left'}`}>
          <div
            className={`bh-content-block bh-pingpong-block-bg-color-${contentBlockColor}`}
          >
            <InnerBlocks.Content />
          </div>
          <div className="bh-image-block">
            {image && (
              <div
                className="bh-image-block-bg-image"
                style={{
                  backgroundImage: image ? `url(${image})` : 'none',
                }}
              ></div>
            )}
            {!image && (
              <div
                className={`bh-image-block-bg-color bh-pingpong-block-bg-color-${imageBlockColor}`}
              >
                <InnerBlocks.Content />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
});

function EditComponent({ setAttributes, attributes }) {
  const { imageLeft, image, imgId, contentBlockColor, imageBlockColor } =
    attributes;

  const themeColors = useSetting('color.palette') || [];

  const getCurrentColorValue = (color) => {
    const currentColorObj = themeColors.find((c) => c.slug === color);
    return currentColorObj ? currentColorObj.color : '';
  };

  const currentColorValueCont = getCurrentColorValue(contentBlockColor);

  const handleColorChangeForContentBlock = (newColorValue) => {
    // Match the picked color with a theme color slug
    const matched = themeColors.find((c) => c.color === newColorValue);
    if (matched) {
      setAttributes({ contentBlockColor: matched.slug });
    }
  };

  const currentColorValueImg = getCurrentColorValue(imageBlockColor);

  const handleColorChangeForImageBlock = (newColorValue) => {
    const matched = themeColors.find((c) => c.color === newColorValue);
    if (matched) {
      setAttributes({ imageBlockColor: matched.slug });
    }
  };

  return (
    <>
      <div {...useBlockProps()}>
        <InspectorControls>
          {/* --- Background Section --- */}
          <PanelBody title="Image Block Background" initialOpen={true}>
            <PanelRow>
              {image && (
                <div
                  style={{
                    width: '100%',
                    height: '120px',
                    borderRadius: '4px',
                    marginBottom: '10px',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    border: '1px solid #ddd',
                  }}
                ></div>
              )}

              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(img) =>
                    setAttributes({
                      image: img.url,
                      imgId: img.id,
                    })
                  }
                  value={imgId}
                  render={({ open }) => (
                    <div>
                      <Button variant="secondary" onClick={open}>
                        {image ? 'Change Image' : 'Choose Image'}
                      </Button>
                    </div>
                  )}
                />
              </MediaUploadCheck>
            </PanelRow>
          </PanelBody>

          {/* --- Gradient Toggle Section --- */}
          <PanelBody title="Content Block Switcher" initialOpen={false}>
            <PanelRow>
              <ToggleControl
                label="Switch Image Block to the Left"
                checked={imageLeft}
                onChange={(value) => setAttributes({ imageLeft: value })}
                help={
                  imageLeft
                    ? 'Image block placed to the left.'
                    : 'Image block placed to the rigth.'
                }
              />
            </PanelRow>
          </PanelBody>

          <PanelBody title="Background Block Colors" initialOpen={false}>
            <PanelColorSettings
              title={__('Content Box Color', 'bhbanner')}
              colorSettings={[
                {
                  value: currentColorValueCont,
                  onChange: handleColorChangeForContentBlock,
                  label: __('Select Content Box Color', 'bhbanner'),
                },
              ]}
              disableCustomColors={true}
            />

            <PanelColorSettings
              title={__('Image Box Color', 'bhbanner')}
              colorSettings={[
                {
                  value: currentColorValueImg,
                  onChange: handleColorChangeForImageBlock,
                  label: __('SelectImage Box Color', 'bhbanner'),
                },
              ]}
              disableCustomColors={true}
            />
          </PanelBody>
        </InspectorControls>

        <div className={`bh-ping-pong ${imageLeft && 'bh-ping-pong-left'}`}>
          <div
            className={`bh-content-block bh-pingpong-block-bg-color-${contentBlockColor}`}
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
          <div className="bh-image-block">
            {image && (
              <div
                className="bh-image-block-bg-image"
                style={{
                  backgroundImage: image ? `url(${image})` : 'none',
                }}
              ></div>
            )}
            {!image && (
              <div
                className={`bh-image-block-bg-color bh-pingpong-block-bg-color-${imageBlockColor}`}
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
          </div>
        </div>
      </div>
    </>
  );
}
