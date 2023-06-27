import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { getServerSession } from "next-auth";
import { useState, ChangeEvent } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import { listUsers } from "./api/user/list";
import { User } from "../types";

type Props = {
  users: User[];
};

const UsersList: NextPage<Props> = ({ users }: Props) => {
  const [searchText, setSearchText] = useState<string | null>(null);
  const [isSwiping, setSwiping] = useState(false);
  const router = useRouter();

  if (!users) {
    return null; // Redirect? or error
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);
  };

  const onPress = (id: string) => {
    router.push(`/profile/${id}`);
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
        {filteredUsers.map(({ id, name, email }) => (
          <div
            key={id}
            id={id}
            className="md:mx-autotext-neutral-500 box-border flex w-full cursor-pointer gap-2 rounded bg-white shadow-md hover:text-neutral-700 hover:shadow-lg md:gap-2"
            role="presentation"
            onMouseDown={() => setSwiping(false)}
            onMouseMove={() => setSwiping(true)}
            onMouseUp={(e) => {
              if (!isSwiping && e.button === 0) {
                onPress(id);
              }
              setSwiping(false);
            }}
            onTouchStart={() => setSwiping(false)}
            onTouchMove={() => setSwiping(true)}
            onTouchEnd={(e) => {
              if (e.cancelable) e.preventDefault();
              if (!isSwiping) {
                onPress(id);
              }
              setSwiping(false);
            }}
          >
            <div className="flex-auto p-1 px-2 font-bold uppercase tracking-wide">
              {name}
            </div>
            <div className="truncate p-1">{email}</div>
          </div>
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
