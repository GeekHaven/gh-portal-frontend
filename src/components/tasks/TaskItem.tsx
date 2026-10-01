'use client';

import type { Task } from 'api/tasks/tasks';
import styles from './tasks.module.css';

type TaskItemProps = {
  task: Task;
  index: number;
};

const japaneseNumbers = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];

export default function TaskItem({ task, index }: TaskItemProps) {
  const isCompleted = task.status === 'COMPLETED';
  const isInProgress = task.status === 'IN_PROGRESS';

  const japaneseStatus = isCompleted
    ? '達成'
    : isInProgress
      ? '進行中'
      : '未達成';

  const progressPercentage = Math.min((task.progress / task.target) * 100, 100);

  return (
    <article
      className={`${styles.taskItem} ${isCompleted ? styles.completed : ''}`}
    >
      <div className={styles.taskNumber}>
        {japaneseNumbers[index] ?? index + 1}
      </div>

      <div className={styles.taskContent}>
        <div className={styles.taskHeader}>
          <div>
            <span className={styles.taskCode}>{task.code}</span>

            <h2 className={styles.taskTitle}>{task.title}</h2>
          </div>

          <div className={styles.reward}>
            <span className={styles.rewardAmount}>+{task.reward}</span>
            <span className={styles.rewardLabel}>GEEKCOIN</span>
          </div>
        </div>

        {task.description && (
          <p className={styles.description}>{task.description}</p>
        )}

        <div className={styles.taskFooter}>
          <div className={styles.progressSection}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <span className={styles.progressText}>
              {task.progress} / {task.target}
            </span>
          </div>

          <div
            className={`${styles.status} ${
              isCompleted ? styles.statusCompleted : ''
            }`}
          >
            <span className={styles.statusJapanese}>{japaneseStatus}</span>

            <span className={styles.statusEnglish}>
              {task.status.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.seal}>{isCompleted ? '印' : '狐'}</div>
    </article>
  );
}
