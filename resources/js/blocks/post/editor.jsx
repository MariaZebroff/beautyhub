import { __ } from '@wordpress/i18n';

import {
  useBlockProps,
  InspectorControls,
  PanelColorSettings,
  useSetting,
} from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { PanelBody } from '@wordpress/components';

registerBlockType('beautyhub/lastposts', {
  title: 'Beauty Hub Brand Posts',
  description: 'Beauty Hub Brand Post Block',
  icon: 'admin-post',
  category: 'common',
  textdomain: 'bhposts',

  attributes: {
    color: { type: 'string', default: 'black' },
    colorbg: { type: 'string', default: 'white' },
    latestPosts: { type: 'array', default: [] },
  },

  edit: EditComponent,
  save: ({ attributes }) => {
    const { color, colorbg, latestPosts } = attributes;
    return <div {...useBlockProps.save()}>POSTS</div>;
  },
});

function EditComponent({ attributes, setAttributes }) {
  const { color, colorbg, latestPosts } = attributes;

  const themeColors = useSetting('color.palette') || [];
  const getColorValue = (slug) => {
    const colorObj = themeColors.find((c) => c.slug === slug);
    return colorObj ? colorObj.color : '';
  };

  const handleColorChange = (newColor) => {
    setAttributes({ color: newColor });
  };

  return (
    <div {...useBlockProps()}>
      <InspectorControls>
        <PanelBody title="Cards Text Colors" initialOpen={false}>
          <PanelColorSettings
            title={__('Cards Text Color', 'bhpingpong')}
            colorSettings={[
              {
                value: getColorValue(color),
                onChange: handleColorChange,
                label: __('Select Cards Text Color', 'bhpingpong'),
              },
            ]}
            disableCustomColors={true}
          />
        </PanelBody>
      </InspectorControls>
      {/* Loading State */}
      POSTS
    </div>
  );
}
