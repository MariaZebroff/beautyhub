import MemberCard from './components/MemberCard';
import styles from './TeamStyles.module.css';

const TeamContent = (props) => {
  const teamMembers = props.teamMembers || [];
  const color = props.color;

  console.log(color);

  if (!Array.isArray(teamMembers)) {
    return <p>Invalid team data</p>;
  }

  return (
    <div className="py-20 md:py-20 lg:py-26  mx-auto">
      <ul
        style={{ color: color }}
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 gap-y-10 justify-items-center items-center ${styles.teammemberul}`}
      >
        {teamMembers.map((member) => (
          <MemberCard memberInfo={member} key={member.id} />
        ))}
      </ul>
    </div>
  );
};

export default TeamContent;
