import styles from '../TeamStyles.module.css';

const MemberCard = ({ memberInfo }) => {
  console.log(memberInfo);
  return (
    <li className={styles.teamCard}>
      <a href={memberInfo?.permalink} className={styles.teamCardLink}>
        <div className={styles.teamCardImage}>
          <img
            src={memberInfo?.thumbnail}
            srcSet={`${memberInfo?.thumbnail} 1x, ${memberInfo?.thumbnail} 2x`}
            alt={memberInfo?.title || 'Team member'}
            loading="lazy"
          />
        </div>
        <div className={styles.teamCardContent}>
          <h4 className={styles.teamMemberName}>
            {memberInfo?.title || 'Unnamed Member'}
          </h4>
          <h5 className={styles.teamMemberSpaciality}>
            {memberInfo?.specialty || ''}
          </h5>
        </div>
      </a>
    </li>
  );
};

export default MemberCard;
