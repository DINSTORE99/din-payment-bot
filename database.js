const users = new Map();

export function getUser(telegramId) {
  return users.get(
    String(telegramId)
  );
}

export function saveUser(user) {
  users.set(
    String(user.telegramId),
    user
  );

  return user;
}

export function createUser(
  telegramId,
  username,
  apiKey
) {
  const user = {
    telegramId: String(telegramId),
    username: username || null,

    apiKey,

    accountId: null,
    secretToken: null,

    balance: 0,

    status: "active",

    createdAt:
      new Date().toISOString()
  };

  return saveUser(user);
}
