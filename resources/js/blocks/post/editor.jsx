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
import styles from './PostStyles.module.css';

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
    // Nothing to save since it's dynamic
    return (
      <div {...useBlockProps.save()}>
        <div className="py-20 md:py-20 lg:py-26 mx-auto">
          <ul className={` ${styles.postsGrid}`}>
            {latestPosts.map((post) => (
              <PostCard post={post} color={color} colorbg={colorbg} />
            ))}
          </ul>
        </div>
      </div>
    );
  },
});

function EditComponent({ attributes, setAttributes }) {
  const { color, colorbg } = attributes;
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

  const handleColorBgChange = (newColor) => {
    setAttributes({ colorbg: newColor });
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
            title={__('Cards Text Color', 'bhposts')}
            colorSettings={[
              {
                value: color, // ✅ use the actual color value
                onChange: handleColorChange,
                label: __('Select Cards Text Color', 'bhposts'),
              },
            ]}
            disableCustomColors={false} // ✅ allow custom colors
          />
        </PanelBody>

        <PanelBody title="Cards Background Colors" initialOpen={false}>
          <PanelColorSettings
            title={__('Cards Background Color', 'bhposts')}
            colorSettings={[
              {
                value: colorbg, // ✅ correct color value
                onChange: handleColorBgChange,
                label: __('Select Cards Background Color', 'bhposts'),
              },
            ]}
            disableCustomColors={false}
          />
        </PanelBody>
      </InspectorControls>

      {/* Editor view */}
      {loading ? (
        <div className="p-4 flex items-center gap-2">
          <Spinner /> Loading posts...
        </div>
      ) : posts.length ? (
        <div className="py-20 md:py-20 lg:py-26 mx-auto">
          <ul className={`${styles.postsGrid}`}>
            {posts.map((post) => (
              <PostCard post={post} color={color} colorbg={colorbg} />
            ))}
          </ul>
        </div>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
