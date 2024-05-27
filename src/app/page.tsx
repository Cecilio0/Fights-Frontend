import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

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
