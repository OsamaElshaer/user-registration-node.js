const { User } = require("../../models/User");
const { dbConnection, clien } = require("../../config/database");

beforeAll(async () => {
  await dbConnection();
  User.deleteMany();
});

describe("user auth", () => {
  let userId;
  it("should create user ", async () => {
    new User("osama", "O123456").save();
    let users = await User.fetchAll();
    userId = users[0]._id;
    expect(users.length).toBe(1);
    expect(users[0]).toMatchObject({ username: "osama" });
  });

  it("should be find user by name", async () => {
    let user = await User.findByName("osama");
    expect(user).toMatchObject({ username: "osama" });
  });

  it("should be find user by ID", async () => {
    let user = await User.findById(userId);
    expect(user).toMatchObject({ username: "osama" });
  });
});

afterAll(async () => {
  await User.deleteMany();
  await clien.close();
});
