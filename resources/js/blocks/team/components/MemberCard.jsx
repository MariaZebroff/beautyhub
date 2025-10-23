import styles from '../TeamStyles.module.css';

const MemberCard = ({ memberInfo }) => {
  return (
    <li className={styles.teamCard}>
      <a href={memberInfo?.permalink} className={styles.teamCardLink}>
        <div className={styles.teamCardImage}>
          <img
            src={memberInfo?.thumbnail}
            alt={memberInfo?.title || 'Team member'}
          />
        </div>
        <div className={styles.teamCardContent}>
          <h3 className={styles.teamMemberName}>
            {memberInfo?.title || 'Unnamed Member'}
          </h3>
        </div>
      </a>
    </li>
  );
};

export default MemberCard;
