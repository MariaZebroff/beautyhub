const PostCard = ({ post }) => {
  const featuredImage =
    post._embedded &&
    post._embedded['wp:featuredmedia'] &&
    post._embedded['wp:featuredmedia'][0]?.source_url;
  console.log('POST: ', post);
  return (
    <li key={post.id} className="border-b border-gray-300 pb-2">
      {featuredImage && (
        <img
          src={featuredImage}
          alt={post.title.rendered}
          className="w-full h-48 object-cover"
        />
      )}
      <strong>{post.title.rendered}</strong>
      <div>{post.date}</div>
      <div
        className="text-sm text-gray-600"
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      />
      <a href={post.link}>Read More</a>
    </li>
  );
};

export default PostCard;
