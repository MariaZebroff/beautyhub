const TeamContent = (props) => {
  const teamMembers = props.teamMembers || [];

  if (!Array.isArray(teamMembers)) {
    return <p>Invalid team data</p>;
  }

  return (
    <ul className="sm:grid sm:grid-cols-2 md:grid-cols-4 sm:gap-4">
      {teamMembers.map((member, index) => (
        <li key={member.id || index}>{member?.title || 'Unnamed Member'}</li>
      ))}
    </ul>
  );
};

export default TeamContent;
