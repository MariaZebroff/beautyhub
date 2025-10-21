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

registerBlockType('beautyhub/banner', {
  title: 'Beauty Hub Brand Banner',
  description: 'Beauty Hub Brand Head Banner Block',
  icon: 'align-full-width',
  category: 'common',
  textdomain: 'bhbanner',
  supports: {
    align: ['full'],
  },

  attributes: {
    align: { type: 'string', default: 'full' },
    gradient: { type: 'boolean', default: true },
    image: { type: 'string' },
    imgId: { type: 'number' },
    showLogo: { type: 'boolean', default: false },
    logoImageText: { type: 'string' },
    logoImageColor: { type: 'string', default: 'background' },
    logoImageText: { type: 'string' },
  },

  edit: EditComponent,
  save: (props) => {
    const { image, imgId, gradient, showLogo, logoImageText, logoImageColor } =
      props.attributes;
    return (
      <div {...useBlockProps.save()}>
        <div
          className={`bh-banner ${showLogo && 'header-with-logo'}`}
          style={{
            backgroundImage: image ? `url(${image})` : 'none',
          }}
        >
          {gradient && (
            <div
              className="bh-banner-gradient"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))',
                zIndex: 1,
              }}
            ></div>
          )}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <InnerBlocks.Content />
          </div>
        </div>
      </div>
    );
  },
});

function EditComponent({ setAttributes, attributes }) {
  const { image, imgId, gradient, showLogo, logoImageText, logoImageColor } =
    attributes;

  const themeColors = useSetting('color.palette') || [];

  // Find the current color object from the palette
  const currentColorObj = themeColors.find((c) => c.slug === logoImageColor);
  const currentColorValue = currentColorObj ? currentColorObj.color : '';

  const handleColorChange = (newColorValue) => {
    // Match the picked color with a theme color slug
    const matched = themeColors.find((c) => c.color === newColorValue);
    if (matched) {
      setAttributes({ logoImageColor: matched.slug });
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

          {/* --- Gradient Toggle Section --- */}
          <PanelBody title="Beauty Hub Logo" initialOpen={false}>
            <PanelRow>
              <ToggleControl
                label="Enable Beauty Hub Logo"
                checked={showLogo}
                onChange={(value) => setAttributes({ showLogo: value })}
                help={
                  gradient
                    ? 'Beauty Hub Logo is enabled.'
                    : 'Beauty Hub Logo is disabled.'
                }
              />
            </PanelRow>
            {showLogo && (
              <>
                <PanelColorSettings
                  title={__('Logo Color', 'bhbanner')}
                  colorSettings={[
                    {
                      value: currentColorValue,
                      onChange: handleColorChange,
                      label: __('Select Logo Color', 'bhbanner'),
                    },
                  ]}
                  disableCustomColors={true}
                />
                <PanelRow>
                  <TextControl
                    label="Logo Text"
                    value={logoImageText}
                    onChange={(value) =>
                      setAttributes({ logoImageText: value })
                    }
                    placeholder="Enter Beauty Hub logo text"
                  />
                </PanelRow>
              </>
            )}
          </PanelBody>
        </InspectorControls>

        <div
          className={`bh-banner ${showLogo && 'header-with-logo'}`}
          style={{
            backgroundImage: image ? `url(${image})` : 'none',
          }}
        >
          {gradient && (
            <div
              className="bh-banner-gradient"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))',
                zIndex: 1,
              }}
            ></div>
          )}
          <div style={{ position: 'relative', zIndex: 2 }}>
            {showLogo && (
              <h1
                className={`logo-header-image bh-logo-header-image-${logoImageColor}-color`}
              >
                {logoImageText}
              </h1>
            )}
            <InnerBlocks
              allowedBlocks={['core/paragraph', 'beautyhub/header']}
            />
          </div>
        </div>
      </div>
    </>
  );
}
