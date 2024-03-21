import jwt from "jsonwebtoken";

export const verifyUser = (token) => {
  let user;
  try {
    if (token == "" || token == null) return (user = null);
    user = jwt.verify(token, "DKbNMiLI3h4UhfDi4/fhIQo/ejgYab/K7pc0ymPNky0=");
    return user;
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return (user = null);
    }
    return (user = null);
  }
};
