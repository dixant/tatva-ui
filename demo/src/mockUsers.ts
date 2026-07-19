export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Archived';
  joined: string;
}

export const mockUsers: User[] = [
  { id: 1, name: 'Alice Chen', email: 'alice@example.com', role: 'Admin', status: 'Active', joined: '2023-04-11' },
  { id: 2, name: 'Bob Miller', email: 'bob@example.com', role: 'Editor', status: 'Active', joined: '2024-01-05' },
  { id: 3, name: 'Carol Diaz', email: 'carol@example.com', role: 'Viewer', status: 'Active', joined: '2024-06-22' },
  { id: 4, name: 'Dan Evans', email: 'dan@example.com', role: 'Editor', status: 'Archived', joined: '2025-02-10' },
  { id: 5, name: 'Eve Fox', email: 'eve@example.com', role: 'Viewer', status: 'Active', joined: '2025-04-01' },
  { id: 6, name: 'Frank Gale', email: 'frank@example.com', role: 'Editor', status: 'Active', joined: '2024-07-14' },
  { id: 7, name: 'Grace Han', email: 'grace@example.com', role: 'Admin', status: 'Active', joined: '2023-11-30' },
  { id: 8, name: 'Henry Ito', email: 'henry@example.com', role: 'Viewer', status: 'Archived', joined: '2024-09-08' },
  { id: 9, name: 'Ivy Jones', email: 'ivy@example.com', role: 'Editor', status: 'Active', joined: '2025-05-19' },
  { id: 10, name: 'Jack Kim', email: 'jack@example.com', role: 'Viewer', status: 'Active', joined: '2024-12-01' },
  { id: 11, name: 'Kara Lee', email: 'kara@example.com', role: 'Admin', status: 'Active', joined: '2023-06-04' },
  { id: 12, name: 'Liam Nash', email: 'liam@example.com', role: 'Editor', status: 'Archived', joined: '2025-01-25' },
  { id: 13, name: 'Mia Ojo', email: 'mia@example.com', role: 'Viewer', status: 'Active', joined: '2024-08-16' },
  { id: 14, name: 'Nate Park', email: 'nate@example.com', role: 'Editor', status: 'Active', joined: '2025-03-03' },
  { id: 15, name: 'Olivia Ray', email: 'olivia@example.com', role: 'Admin', status: 'Active', joined: '2024-02-12' },
];
