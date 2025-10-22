import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  MediaUpload,
  InspectorControls,
  MediaUploadCheck,
} from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { PanelBody, PanelRow, Button } from '@wordpress/components';

registerBlockType('beautyhub/pingpong-image', {
  title: 'Pingpong Image Block',
  parent: ['beautyhub/pingpong'],
  attributes: {
    image: { type: 'string' },
    imgId: { type: 'number' },
  },
  edit: ({ attributes, setAttributes, isSelected }) => {
    const { image, imgId } = attributes;

    return (
      <div
        {...useBlockProps()}
        style={{
          minHeight: '150px',
          border: '1px dashed #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
        }}
      >
        {!image && !isSelected && (
          <span>{__('Pingpong Image Placeholder', 'bhpingpong')}</span>
        )}

        <InspectorControls>
          <PanelBody title="Image Block Background" initialOpen={true}>
            <PanelRow>
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
                    <Button variant="secondary" onClick={open}>
                      {image ? 'Change Image' : 'Choose Image'}
                    </Button>
                  )}
                />
              </MediaUploadCheck>
            </PanelRow>
          </PanelBody>
        </InspectorControls>

        {image && (
          <div
            className="bh-image-block"
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        )}
      </div>
    );
  },
  save: ({ attributes }) => {
    const { image } = attributes;
    return (
      <div {...useBlockProps.save()}>
        {image && (
          <div
            className="bh-image-block"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        )}
      </div>
    );
  },
});
