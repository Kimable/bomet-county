import jwt from "jsonwebtoken";

export const verifyUser = (token) => {
  let user;
  try {
    if (token == "" || token == null) return (user = null);
    user = jwt.verify(token, "DKbNMiLI3h4UhfDi4/fhIQo/ejgYab/K7pc0ymPNky0=");
    if (user.name === "TokenExpiredError") {
      return (user = null);
    }
    return user;
  } catch (error) {
    console.log(error);
    return (user = null);
  }
};
