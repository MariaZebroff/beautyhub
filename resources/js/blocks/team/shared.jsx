import MemberCard from './components/MemberCard';
import styles from './TeamStyles.module.css';

const TeamContent = (props) => {
  const teamMembers = props.teamMembers || [];

  console.log(teamMembers);

  if (!Array.isArray(teamMembers)) {
    return <p>Invalid team data</p>;
  }

  return (
    <div className="py-20 md:py-20 lg:py-26 px-4 md:px-16 lg:px-26 mx-auto">
      <ul
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 gap-y-10 justify-items-center items-center ${styles.waittime}`}
      >
        {teamMembers.map((member) => (
          <MemberCard memberInfo={member} key={member.id} />
        ))}
      </ul>
    </div>
  );
};

export default TeamContent;
