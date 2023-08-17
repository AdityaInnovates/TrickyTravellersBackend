export const roles = ["user", "admin", "agent"];

export const rights = new Map();

rights.set(roles[0], [
  "blog-create",
  "blog-update",
  "blog-read",
  "event-create",
  "event-update",
  "event-read",
  "category-read",
  "destination-read",
  "profile",
]);
rights.set(roles[1], [
  "blog-create",
  "blog-update",
  "blog-read",
  "blog-delete",
  "event-create",
  "event-update",
  "event-read",
  "event-delete",
  "category-create",
  "category-update",
  "category-read",
  "category-delete",
  "destination-create",
  "destination-update",
  "destination-read",
  "destination-delete",
]);
