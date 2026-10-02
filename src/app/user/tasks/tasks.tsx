'use client';

import TaskList from 'components/tasks/TaskList';
import styles from './tasks-page.module.css';

export default function TasksPage() {
  return (
    <main className={styles.page}>
      {/* Header */}
      <section className={styles.header}>
        <div className={styles.eyebrow}>OPENCODE · GEEKCOIN</div>

        <div className={styles.titleRow}>
          <div>
            <h1 className={styles.title}>Tasks</h1>

            <p className={styles.japaneseTitle}>任務</p>
          </div>

          <div className={styles.sakura}>桜</div>
        </div>

        <p className={styles.description}>
          Complete quests throughout OpenCode and earn GeekCoins automatically.
        </p>

        <div className={styles.divider}>
          <span />
          <span className={styles.dividerMark}>✦</span>
          <span />
        </div>
      </section>

      {/* Tasks */}
      <section className={styles.tasksSection}>
        <TaskList eventName="opencode" />
      </section>
    </main>
  );
}
