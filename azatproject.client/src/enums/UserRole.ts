export const UserRole = {
  Admin: 0,
  Manager: 1,
  User: 2,
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export const roles: UserRole[] = [UserRole.Admin, UserRole.Manager, UserRole.User];

export const UserRoleLabels: Record<UserRole, string> = {
  [UserRole.Admin]: "Администратор",
  [UserRole.Manager]: "Меенеджер",
  [UserRole.User]: "Пользователь",
};