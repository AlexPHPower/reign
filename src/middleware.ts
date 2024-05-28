export { default as middleware } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";

export const config = { matcher: ["/dashboard"] };

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});
