export class UserTransformer {
  transform(user: any) {
    return {
      UID: user.id,
      fullname: user.name,
      email: user.email,
      status: user.status,
      statusText: user.status ? 'Active' : 'Inactive',
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }
}
