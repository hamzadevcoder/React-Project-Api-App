import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'mock_users.json');

// Ensure the file exists
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

export const getMockUsers = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

export const saveMockUser = (user) => {
  const users = getMockUsers();
  const existing = users.findIndex(u => u.email === user.email);
  if (existing > -1) {
    users[existing] = { ...users[existing], ...user };
  } else {
    users.push({ id: `mock_${Date.now()}`, ...user });
  }
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
  return users.find(u => u.email === user.email);
};

export const findMockUserByEmail = (email) => {
  const users = getMockUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const findMockUserById = (id) => {
  const users = getMockUsers();
  return users.find(u => u.id === id);
};
