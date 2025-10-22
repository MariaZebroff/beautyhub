import MemberCard from './components/MemberCard';
import styles from './TeamStyles.module.css';

const TeamContent = (props) => {
  const teamMembers = props.teamMembers || [];

  console.log(teamMembers);

  if (!Array.isArray(teamMembers)) {
    return <p>Invalid team data</p>;
  }

  return (
    <ul
      className={`sm:grid sm:grid-cols-2 md:grid-cols-4 sm:gap-4 waittime ${styles.waittime}`}
    >
      {teamMembers.map((member) => (
        <MemberCard memberInfo={member} key={member.id} />
      ))}
    </ul>
  );
};

export default TeamContent;
