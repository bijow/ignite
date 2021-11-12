type User = {
  permissions: string[];
  roles: string[];
}

type ValidateUserPermissionsParams = {
  user: User;
  permissions?: string[];
  roles?: string[];
}

export function validateUserPermissions({
  user,
  permissions,
  roles
}: ValidateUserPermissionsParams) {
  if (permissions?.length > 0) {
    const hasAllPermissions = permissions.every(permission => {
      // retorna true caso o usuário tenha todas as permissoes que está sendo
      // recebida no permissions
      return user.permissions.includes(permission);
    });

    if (!hasAllPermissions) return false;

  }

  if (roles?.length > 0) {
    const hasAllRoles = roles.some(role => {
      // retorna true caso o usuário tenha todas as roles que está sendo
      // recebida no roles
      return user.roles.includes(role);
    });
    if (!hasAllRoles) return false;
  }

  return true;
}