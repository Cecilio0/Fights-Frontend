import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      getServerSession
      {session?.user?.name ? (
        <div>{session?.user?.name}</div>
      ) : (
        <div>Not signed in</div>
      )}
      <br />
      <h2>Session Object:</h2>
      <div>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </>
  );
}
