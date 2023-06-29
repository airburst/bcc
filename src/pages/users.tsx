import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { getServerSession } from "next-auth";
import { useState, ChangeEvent } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import { listUsers } from "./api/user/list";
import { User } from "../types";
import { UserCard } from "../components/UserCard";

type Props = {
  users: User[];
};

const UsersList: NextPage<Props> = ({ users }: Props) => {
  const [searchText, setSearchText] = useState<string | null>(null);

  if (!users) {
    return null; // Redirect? or error
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
  };

  const filteredUsers = searchText
    ? users.filter(({ name, email }) =>
        `${name}${email}`.toLowerCase().includes(searchText.toLowerCase())
      )
    : users;

  return (
    <>
      <Head>
        <title>Manage Users</title>
        <meta name="description" content="Bath Cycling Club - Users" />
      </Head>

      <div className="w-full text-neutral-800">
        <div className="flex w-full flex-row items-center justify-center bg-primary p-2 font-bold uppercase tracking-wide text-white sm:rounded mb-4">
          Manage Users
        </div>
      </div>

      <div className="w-full px-2 sm:px-0">
        <input
          type="text"
          className="input input-bordered input-lg w-full mb-4"
          placeholder="Search by name or email"
          onChange={handleSearch}
        />
      </div>

      <div className="grid w-full grid-cols-1 gap-2 md:gap-2 px-2 sm:px-0">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </>
  );
};

export default UsersList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || (session && session.user?.role !== "ADMIN")) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const users = await listUsers();

  return {
    props: {
      users,
    },
  };
};
