import { generateMessagePattern } from "./generator";

// Test Message Pattern
export const testMessagePattern = generateMessagePattern({ action: 'test_user', domain: 'users' });

// Create User Message Pattern
export const createUserMessagePattern = generateMessagePattern({ action: 'create_user', domain: 'users' });

// Get User by Email Message Pattern
export const getUserByEmailMessagePattern = generateMessagePattern({ action: 'get_user_by_email', domain: 'users' });

// Get User by ID Message Pattern
export const getUserByIdMessagePattern = generateMessagePattern({ action: 'get_user_by_id', domain: 'users' });

// Update User Message Pattern
export const updateUserMessagePattern = generateMessagePattern({ action: 'update_user', domain: 'users' });

// Change Password Message Pattern
export const changePasswordMessagePattern = generateMessagePattern({ action: 'change_password', domain: 'users' });

// Delete User Message Pattern
export const deleteUserMessagePattern = generateMessagePattern({ action: 'delete_user', domain: 'users' });

// Update Roles Message Pattern
export const updateRolesMessagePattern = generateMessagePattern({ action: 'update_roles', domain: 'users' });

// Get Users in Restaurant Message Pattern
export const getUsersInRestaurantMessagePattern = generateMessagePattern({ action: 'get_users_in_restaurant', domain: 'users' });
