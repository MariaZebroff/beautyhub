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

registerBlockType('beautyhub/bhcontainer', {
  title: 'Beauty Hub Container',
  description: 'Beauty Hub Container Block',
  icon: 'controls-repeat',
  category: 'common',
  textdomain: 'bhcontainer',
  supports: {
    align: ['full'],
  },

  attributes: {
    align: { type: 'string', default: 'full' },
    gradient: { type: 'boolean', default: false },
    image: { type: 'string' },
    imgId: { type: 'number' },
    backgroundContainerColor: { type: 'string', default: 'white' },
  },

  edit: EditComponent,
  save: (props) => {
    const { image, gradient, backgroundContainerColor } = props.attributes;
    return (
      <div {...useBlockProps.save()}>
        <div
          className={`bh-container px-4 md:px-16 lg:px-26 bh-pingpong-block-bg-color-${backgroundContainerColor}`}
          style={{
            backgroundImage: image ? `url(${image})` : 'none',
          }}
        >
          {gradient && <div className="bh-container-gradient"></div>}
          <div className="bh-container-content">
            <InnerBlocks.Content />
          </div>
        </div>
      </div>
    );
  },
});

function EditComponent({ setAttributes, attributes }) {
  const { image, imgId, gradient, backgroundContainerColor } = attributes;

  const themeColors = useSetting('color.palette') || [];

  // Find the current color object from the palette
  const currentColorObj = themeColors.find(
    (c) => c.slug === backgroundContainerColor
  );
  const currentColorValue = currentColorObj ? currentColorObj.color : '';

  const handleColorChange = (newColorValue) => {
    // Match the picked color with a theme color slug
    const matched = themeColors.find((c) => c.color === newColorValue);
    if (matched) {
      setAttributes({ backgroundContainerColor: matched.slug });
    }
  };

  return (
    <>
      <div {...useBlockProps()}>
        <InspectorControls>
          {/* --- Background Section --- */}
          <PanelBody title="Background" initialOpen={true}>
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
          <PanelBody title="Gradient Overlay" initialOpen={false}>
            <PanelRow>
              <ToggleControl
                label="Enable Gradient Overlay"
                checked={gradient}
                onChange={(value) => setAttributes({ gradient: value })}
                help={
                  gradient
                    ? 'Gradient overlay is enabled.'
                    : 'Gradient overlay is disabled.'
                }
              />
            </PanelRow>
          </PanelBody>

          <PanelBody
            title="Beauty Hub Container Background Color"
            initialOpen={false}
          >
            <PanelColorSettings
              title={__('Container Background Color', 'bhcontainer')}
              colorSettings={[
                {
                  value: currentColorValue,
                  onChange: handleColorChange,
                  label: __('Select Background Color', 'bhcontainer'),
                },
              ]}
              disableCustomColors={true}
            />
          </PanelBody>
        </InspectorControls>

        <div
          className={`bh-container px-4 md:px-16 lg:px-26 bh-pingpong-block-bg-color-${backgroundContainerColor}`}
          style={{
            backgroundImage: image ? `url(${image})` : 'none',
          }}
        >
          {gradient && <div className="bh-container-gradient"></div>}
          <div className="bh-container-content">
            <InnerBlocks />
          </div>
        </div>
      </div>
    </>
  );
}
