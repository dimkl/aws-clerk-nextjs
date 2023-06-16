import type { GetServerSideProps } from 'next';
import React from 'react';
import { createClerkClient } from '@clerk/nextjs/server';
import { useSignIn, useUser, useAuth } from '@clerk/nextjs';

export const getServerSideProps: GetServerSideProps = async context => {
  const clerkClient = createClerkClient({
    apiUrl: 'https://api.clerkstage.dev',
    secretKey: process.env.CLERK_SECRET_KEY,
    jwtKey: process.env.CLERK_JWT_KEY
  })
  const { token: signInToken } = await clerkClient.signInTokens.createSignInToken({
    userId: 'user_2REuWnYlQ6PFs0f4dkZ6Ku0ib9H',
    expiresInSeconds: 3600
  });
  console.log('getServerSideProps', signInToken);
  return { props: { signInToken } };
};

const IframePage = ({ signInToken }: { signInToken: string }) => {
  const { signIn } = useSignIn();
  const { getToken } = useAuth();
  const { user } = useUser();

  React.useEffect(() => {
    void signIn
      ?.create({ strategy: 'ticket', ticket: signInToken })
      ?.then(() => getToken())
  }, [])

  return (
    <div>
      <p>Aloha</p>
      {!!user && <p> {JSON.stringify(user)}</p>}
    </div>
  );
};

export default IframePage;
