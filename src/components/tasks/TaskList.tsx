'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchMyTasks } from 'api/tasks/tasks';
import TaskItem from './TaskItem';
import styles from './tasks.module.css';

type TaskListProps = {
  eventName: string;
};

export default function TaskList({ eventName }: TaskListProps) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['Tasks', eventName],
    queryFn: () => fetchMyTasks(eventName),
  });

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (isError) {
    return (
      <div>
        Failed to load tasks.
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  const tasks = data?.tasks ?? [];

  if (tasks.length === 0) {
    return <div>No tasks available.</div>;
  }

  return (
    <section>
      <header>
        <span>任務</span>
        <h1>Tasks</h1>
        <p>Complete your trials and earn GeekCoins.</p>
      </header>

      <div className={styles.taskList}>
        {tasks.map((task, index) => (
          <TaskItem key={task.id} task={task} index={index} />
        ))}
      </div>
    </section>
  );
}
