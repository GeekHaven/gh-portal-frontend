export type TaskStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

export type Task = {
  id: string;
  code: string;
  title: string;
  description: string | null;
  category: string;
  reward: number;
  target: number;
  progress: number;
  status: TaskStatus;
  completedAt: string | null;
  rewardedAt: string | null;
  metadata: unknown;
};

export type GetTasksResponse = {
  ok: boolean;
  eventName: string;
  tasks: Task[];
};

export async function fetchMyTasks(
  eventName: string,
): Promise<GetTasksResponse> {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tasks/${eventName}/me`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  const responseData = await response.json();

  return responseData.message;
}
