export const roles = ["user", "admin", "agent"];

export const rights = new Map();

rights.set(roles[0], [
  "blog-create",
  "blog-update",
  "blog-read",
  "category-read",
  "profile",
]);
rights.set(roles[1], [
  "blog-create",
  "blog-update",
  "blog-read",
  "blog-delete",
  "category-create",
  "category-update",
  "category-read",
  "category-delete",
]);
