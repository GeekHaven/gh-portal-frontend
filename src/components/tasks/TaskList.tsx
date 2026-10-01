'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchMyTasks } from 'api/tasks/tasks';

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
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>

          {task.description && <p>{task.description}</p>}

          <p>
            {task.progress} / {task.target}
          </p>

          <p>+{task.reward} GeekCoins</p>

          <p>{task.status}</p>
        </div>
      ))}
    </div>
  );
}
