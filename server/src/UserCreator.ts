import { createUser } from "./api/user/createUser";
import { User } from "./models/User.model";

const cliArgs: string[] = process.argv.slice(2);
const userData: { login: string; name: string; password: string; admin: boolean; active: boolean } = {
  login: cliArgs[0],
  name: cliArgs[1],
  password: cliArgs[2],
  admin: cliArgs[3] == "true" || cliArgs[4] == "1" ? true : false,
  active: cliArgs[4] == "true" || cliArgs[4] == "1" ? true : false,
};
createUser(userData.login, userData.name, userData.password, userData.admin, userData.active, (error, user: User) => {
  if (error) return console.log("Error creating user... Please try again!");
  console.log("User " + user.name + " created successfully.");
});
