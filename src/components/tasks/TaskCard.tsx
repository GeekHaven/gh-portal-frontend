'use client';

import type { Task } from '@/api/tasks/tasks';

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  const completed = task.status === 'COMPLETED';

  return (
    <div
      style={{
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '20px',
        background: 'rgba(255,255,255,0.03)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '16px',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '12px',
              opacity: 0.6,
              marginBottom: '6px',
            }}
          >
            {task.code} · {task.category}
          </div>

          <h3 style={{ margin: 0 }}>{task.title}</h3>

          {task.description && (
            <p
              style={{
                marginTop: '8px',
                opacity: 0.7,
              }}
            >
              {task.description}
            </p>
          )}
        </div>

        <div
          style={{
            whiteSpace: 'nowrap',
            fontWeight: 600,
          }}
        >
          +{task.reward} GC
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '6px',
            fontSize: '13px',
          }}
        >
          <span>Progress</span>
          <span>
            {task.progress} / {task.target}
          </span>
        </div>

        <div
          style={{
            width: '100%',
            height: '6px',
            borderRadius: '999px',
            background: 'rgba(255,255,255,0.1)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${Math.min((task.progress / task.target) * 100, 100)}%`,
              height: '100%',
              background: 'currentColor',
              borderRadius: '999px',
            }}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: '14px',
          fontSize: '13px',
          opacity: 0.7,
        }}
      >
        {completed
          ? `Completed · +${task.reward} GeekCoins received`
          : task.status === 'IN_PROGRESS'
            ? 'In progress'
            : 'Not started'}
      </div>
    </div>
  );
}
