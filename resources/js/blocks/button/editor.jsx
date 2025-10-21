import { __ } from '@wordpress/i18n';

import {
  useBlockProps,
  RichText,
  BlockControls,
  InspectorControls,
  PanelColorSettings,
  useSetting,
  __experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import {
  ToolbarGroup,
  ToolbarButton,
  PanelBody,
  Popover,
  Button,
} from '@wordpress/components';

registerBlockType('beautyhub/button', {
  title: 'Beauty Hub Brand Button',
  description: 'Beauty Hub Brand Button Block',
  icon: 'button',
  category: 'common',
  textdomain: 'bhbutton',

  attributes: {
    text: { type: 'string' },
    linkObject: { type: 'object' },
    size: { type: 'string', default: 'large' },
    type: { type: 'string', default: 'generic' },
    color: { type: 'string', default: 'background' },
  },

  edit: EditComponent,

  save: (props) => {
    const { text, size, type, color, linkObject } = props.attributes;

    return (
      <a
        href={linkObject?.url}
        className={`btn btn--${size} btn--${type}  btn-${color}-color`}
      >
        {text}
      </a>
    );
  },
});

function EditComponent(props) {
  const { attributes, setAttributes } = props;
  const { text, size, color, type, linkObject } = attributes;

  const onTextChange = (val) => setAttributes({ text: val });

  const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false);

  const buttonLinkHandler = () => {
    setIsLinkPickerVisible((prev) => !prev);
  };

  const themeColors = useSetting('color.palette') || [];

  // Find the current color object from the palette
  const currentColorObj = themeColors.find((c) => c.slug === color);
  const currentColorValue = currentColorObj ? currentColorObj.color : '';

  const handleColorChange = (newColorValue) => {
    // Match the picked color with a theme color slug
    const matched = themeColors.find((c) => c.color === newColorValue);
    if (matched) {
      setAttributes({ color: matched.slug });
    }
  };

  const handleLinkChange = (newLink) => {
    setAttributes({ linkObject: newLink });
  };

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            icon="admin-links"
            label="Add Link"
            onClick={buttonLinkHandler}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarButton
            isPressed={size === 'large'}
            onClick={() => setAttributes({ size: 'large' })}
          >
            Large
          </ToolbarButton>

          <ToolbarButton
            isPressed={size === 'small'}
            onClick={() => setAttributes({ size: 'small' })}
          >
            Small
          </ToolbarButton>
        </ToolbarGroup>

        <ToolbarGroup>
          <ToolbarButton
            isPressed={type === 'generic'}
            onClick={() => setAttributes({ type: 'generic' })}
          >
            Generic
          </ToolbarButton>
          <ToolbarButton
            isPressed={type === 'outlined'}
            onClick={() => setAttributes({ type: 'outlined' })}
          >
            Outlined
          </ToolbarButton>
        </ToolbarGroup>
      </BlockControls>

      <InspectorControls>
        <PanelBody title={__('Text Color', 'bhheader')}>
          <PanelColorSettings
            title={__('Color Settings', 'bhheader')}
            colorSettings={[
              {
                value: currentColorValue,
                onChange: handleColorChange,
                label: __('Button Color', 'bhheader'),
              },
            ]}
            disableCustomColors={true}
          />
        </PanelBody>
      </InspectorControls>

      <RichText
        allowedFormats={[]}
        tagName="a"
        value={text}
        onChange={onTextChange}
        className={`btn btn--${size} btn--${type} btn-${color}-color`}
      />
      {isLinkPickerVisible && (
        <Popover
          position="middle center"
          onFocusOutside={() => setIsLinkPickerVisible(false)}
        >
          <LinkControl
            settings={[]}
            value={linkObject}
            onChange={handleLinkChange}
          />
          <Button
            style={{ display: 'block', width: '100%' }}
            variant="primary"
            onClick={() => setIsLinkPickerVisible(false)}
          >
            Confirm Link
          </Button>
        </Popover>
      )}
    </>
  );
}
