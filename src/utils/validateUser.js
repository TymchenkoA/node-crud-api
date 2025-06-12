import { validate as isValidUUID } from 'uuid';

export const validateUserData = (data) => {
  if (
    !data.username ||
    typeof data.username !== 'string' ||
    !data.username.trim()
  ) {
    throw new Error('Username is required and must be a string');
  }
  if (!data.age || typeof data.age !== 'number' || data.age <= 0) {
    throw new Error('Age is required and must be a positive number');
  }
  if (
    !Array.isArray(data.hobbies) ||
    (data.hobbies.length !== 0 &&
      !data.hobbies.every((hobby) => typeof hobby === 'string'))
  ) {
    throw new Error(
      'Hobbies is required field. It must be an array of strings or an empty array',
    );
  }
};

export const validateUserId = (id) => {
  if (!isValidUUID(id)) {
    throw new Error('Invalid User ID format. The ID must be a valid UUID.');
  }
};
