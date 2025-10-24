import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InspectorControls,
  PanelColorSettings,
  useSetting,
} from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { PanelBody, Spinner } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { useEffect, useState } from '@wordpress/element';

import PostCard from './shared';

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
    const { latestPosts, color, colorbg } = attributes;
    // Nothing to save since it’s dynamic
    return (
      <div {...useBlockProps.save()}>
        <ul className="py-20 md:py-20 lg:py-26  mx-auto">
          {latestPosts.map((post) => (
            <PostCard post={post} />
          ))}
        </ul>
      </div>
    );
  },
});

function EditComponent({ attributes, setAttributes }) {
  const { color } = attributes;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const themeColors = useSetting('color.palette') || [];
  const getColorValue = (slug) => {
    const colorObj = themeColors.find((c) => c.slug === slug);
    return colorObj ? colorObj.color : '';
  };

  const handleColorChange = (newColor) => {
    setAttributes({ color: newColor });
  };

  // 🔹 Fetch 3 latest posts
  useEffect(() => {
    apiFetch({ path: '/wp/v2/posts?per_page=3&_embed' })
      .then((posts) => {
        setPosts(posts);
        setAttributes({ latestPosts: posts });
      })
      .catch((err) => console.error('Error fetching posts:', err))
      .finally(() => setLoading(false));
  }, []);

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

      {/* Editor view */}
      {loading ? (
        <div className="p-4 flex items-center gap-2">
          <Spinner /> Loading posts...
        </div>
      ) : posts.length ? (
        <ul className="py-20 md:py-20 lg:py-26  mx-auto">
          {posts.map((post) => (
            <PostCard post={post} />
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
