export const getPermissions = (user: any) => {
  const permissions = [];
  user.roles.forEach((role) => {
    role.permissions.forEach((permission) => {
      if (!permissions.includes(permission.name)) {
        permissions.push(permission.name);
      }
    });
  });
  return permissions;
};

export const getDelay = (delay: number) =>
  new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
