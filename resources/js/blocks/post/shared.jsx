import styles from './PostStyles.module.css';

const PostCard = ({ post, color, colorbg }) => {
  const featuredImage =
    post._embedded &&
    post._embedded['wp:featuredmedia'] &&
    post._embedded['wp:featuredmedia'][0]?.source_url;

  // Format date to "October 25, 2025" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  console.log('POST: ', post);
  return (
    <li
      key={post.id}
      className={styles.card}
      style={{ color: color, backgroundColor: colorbg }}
    >
      {featuredImage && (
        <img
          src={featuredImage}
          alt={post.title.rendered}
          className={styles.cardImage}
        />
      )}
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{post.title.rendered}</h3>
        <div className={styles.cardDate}>{formatDate(post.date)}</div>
        <div
          className={styles.cardExcerpt}
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        <a
          href={post.link}
          className={styles.cardLink}
          style={{ color: color }}
        >
          Read More
        </a>
      </div>
    </li>
  );
};

export default PostCard;
