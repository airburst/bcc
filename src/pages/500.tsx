import Head from "next/head";
import { BackButton } from "../components";

const Offline = () => (
  <>
    <Head>
      <title>Offline</title>
      <meta name="description" content="Bath Cycling Club - Offline" />
    </Head>

    <div className=" text-neutral-800">
      <div className="flex h-64 items-center justify-center">
        <i className="fa-solid fa-circle-exclamation text-8xl text-red-500" />
      </div>
      <div className="flex items-center p-4 text-center text-2xl text-neutral-700">
        Sorry - we can&apos;t get this information right now.
      </div>
      <div className="flex items-center p-4 text-center text-2xl text-neutral-700">
        If you don&apos;t have an Internet connection, you can only view rides
        that you have already visited.
      </div>
      <div className="flex items-center justify-center p-4  text-neutral-700">
        <BackButton />
      </div>
    </div>
  </>
);

export default Offline;
