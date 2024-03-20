import jwt from "jsonwebtoken";

export const verifyUser = (token) => {
  let user;

  if (token == "" || token == null) return (user = null);

  user = jwt.verify(token, "DKbNMiLI3h4UhfDi4/fhIQo/ejgYab/K7pc0ymPNky0=");

  return user;
};
