const projectId = process.argv[2];
const baseURL = 'https://ta-app-git-preview-sajad-abbasis-projects.vercel.app';

function syncBoard(projectId: string) {
  console.log('Syncing board for projectId: ', projectId);
  return fetch(`${baseURL}/api/board-integrations/sync?projectId=${projectId}`);
}

syncBoard(projectId)
  .then(() => console.log('Syncing board...'))
  .catch((err) => console.error('Error syncing board:', err));
