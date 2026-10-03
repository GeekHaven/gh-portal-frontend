'use client';

import TaskList from 'components/tasks/TaskList';

export default function TasksPage() {
  return <TaskList eventName={process.env.NEXT_PUBLIC_EVENT_NAME!} />;
}
