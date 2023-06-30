import { getAllUsers } from '@/server/users';
import React from 'react';

export default function Home({users}: any) {
    // Just for listing out users
    return (
      <div>
        <h1>Users</h1>
        <ul>
          {users.map((user: any) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  }
  

export async function getStaticProps(){

    const users = await getAllUsers()

    return {
        props: {
            users
        }
    }
}