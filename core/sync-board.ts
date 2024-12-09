const projectId = process.argv[2];
const baseURL = 'https://ta-app-git-preview-sajad-abbasis-projects.vercel.app';

function syncBoard(projectId: string) {
  return fetch(`${baseURL}/api/board-integrations/notion/inner-sync?projectId=${projectId}`);
}

syncBoard(projectId);
