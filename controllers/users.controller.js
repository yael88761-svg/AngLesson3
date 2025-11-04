import users from "../users.js";

export const getAllUsers = (req, res) => {
  const search = req.query.search || "";
  const limitValue = +req.query.limit || 5;
  const skipValue = +req.query.skip || 0;
  let result = users;

  if (search) {
    result = result.filter(
      (u) => u.nameUser.includes(search) || u.email.includes(search)
    );
  }

  result = result.slice(skipValue, skipValue + limitValue);
  res.json(result);
};

export const getUserById = (req, res) => {
  const user = users.find((u) => u.code === +req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const addUser = (req, res) => {
  const newUser = req.body;
  if (!newUser.code || !newUser.nameUser) {
    return res.status(400).json({ message: "Invalid user data" });
  }
  users.push(newUser);
  res.json({ message: "User added", users });
};

export const updateUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((u) => u.code === id);

  if (userIndex === -1)
    return res.status(404).json({ message: "User not found" });

  users[userIndex] = { ...users[userIndex], ...req.body };
  res.json({ index: userIndex, message: "User updated", users });
};

export const lendBookToUser = (req, res) => {
  const userId = +req.params.id;
  const bookCode = +req.params.bookCode;
  const userIndex = users.findIndex((u) => u.code === userId);

  if (userIndex === -1)
    return res.status(404).json({ message: "User not found" });

  users[userIndex].lendBooks.push({ codeBook: bookCode });
  res.json({ index: userIndex, message: "Book lent to user", users });
};

export const returnBookFromUser = (req, res) => {
  const userId = +req.params.id;
  const bookCode = +req.params.bookCode;
  const userIndex = users.findIndex((u) => u.code === userId);

  if (userIndex === -1)
    return res.status(404).json({ message: "User not found" });

  users[userIndex].lendBooks = users[userIndex].lendBooks.filter(
    (b) => b.codeBook !== bookCode
  );
  res.json({ index: userIndex, message: "Book returned", users });
};

export const deleteUser = (req, res) => {
  const userIndex = users.findIndex((u) => u.code === +req.params.id);
  if (userIndex === -1)
    return res.status(404).json({ message: "User not found" });

  users.splice(userIndex, 1);
  res.json({ message: "User deleted", users });
};
