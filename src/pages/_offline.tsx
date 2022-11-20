import Head from "next/head";
import Image from "next/future/image";
import { BackButton } from "../components";
import NoConnection from "../../public/static/images/no-connection.svg";

const Offline = () => (
  <>
    <Head>
      <title>Offline</title>
      <meta name="description" content="Bath Cycling Club - Offline" />
    </Head>

    <div className=" text-neutral-800">
      <div className="flex h-64 items-center justify-center">
        <Image
          className="h-32 w-32"
          src={NoConnection}
          alt="No internet connection Logo"
        />
      </div>
      <div className="flex items-center p-4 text-center text-2xl text-neutral-700">
        You don&apos;t have an Internet connection right now.
      </div>
      <div className="flex items-center p-4 text-center text-2xl text-neutral-700">
        You can only view rides that you have already visited.
      </div>
      <div className="flex items-center justify-center p-4  text-neutral-700">
        <BackButton />
      </div>
    </div>
  </>
);

export default Offline;
