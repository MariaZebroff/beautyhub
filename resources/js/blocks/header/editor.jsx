import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  RichText,
  BlockControls,
  InspectorControls,
  PanelColorSettings,
  useSetting,
} from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { ToolbarGroup, ToolbarButton, PanelBody } from '@wordpress/components';

registerBlockType('beautyhub/header', {
  title: 'Beauty Hub Brand Header',
  description: 'Beauty Hub Brand Header Block',
  icon: 'menu',
  category: 'common',
  textdomain: 'bhheader',

  attributes: {
    text: { type: 'string' },
    size: { type: 'string', default: 'large' },
    tagName: { type: 'string', default: 'h1' },
    color: { type: 'string', default: 'primary' },
    align: { type: 'string', default: 'left' },
  },

  edit: EditComponent,

  save: (props) => {
    const { text, size, tagName, color, align } = props.attributes;

    return (
      <RichText.Content
        value={text}
        tagName={tagName}
        className={`bhheader headline--${size} bh-${color}-color text-center sm:text-${align}`}
      />
    );
  },
});

function EditComponent(props) {
  const { attributes, setAttributes } = props;
  const { text, size, tagName, color, align } = attributes;

  const onTextChange = (val) => setAttributes({ text: val });

  const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
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

  return (
    <>
      <BlockControls>
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
            icon="editor-alignleft"
            label={__('Align Left', 'bhheader')}
            isPressed={align === 'left'}
            onClick={() => setAttributes({ align: 'left' })}
          />

          <ToolbarButton
            icon="editor-aligncenter"
            label={__('Align Center', 'bhheader')}
            isPressed={align === 'center'}
            onClick={() => setAttributes({ align: 'center' })}
          />

          <ToolbarButton
            icon="editor-alignright"
            label={__('Align Right', 'bhheader')}
            isPressed={align === 'right'}
            onClick={() => setAttributes({ align: 'right' })}
          />
        </ToolbarGroup>

        <ToolbarGroup>
          {headingTags.map((tag) => (
            <ToolbarButton
              key={tag}
              isPressed={tagName === tag}
              onClick={() => setAttributes({ tagName: tag })}
            >
              {tag.toUpperCase()}
            </ToolbarButton>
          ))}
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
                label: __('Text Color', 'bhheader'),
              },
            ]}
            disableCustomColors={true}
          />
        </PanelBody>
      </InspectorControls>

      <RichText
        allowedFormats={['core/bold']}
        tagName={tagName}
        value={text}
        onChange={onTextChange}
        className={`bhheader headline--${size} bh-${color}-color text-${align}`}
      />
    </>
  );
}
