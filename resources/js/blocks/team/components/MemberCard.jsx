const MemberCard = ({ memberInfo }) => {
  console.log(memberInfo);
  return (
    <li className="team-card">
      <a href={memberInfo?.booking_link}>
        <img className="h-100" src={memberInfo?.thumbnail} />
      </a>
      <div>{memberInfo?.title || 'Unnamed Member'}</div>
      <div>
        <a href={memberInfo?.permalink}>Read More...</a>
      </div>
    </li>
  );
};

export default MemberCard;
