import Head from "next/head";
import Image from "next/image";
import data from "../constants/mock-nft.json";
import mockartist from "../constants/mock-artist.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Footer, Header } from "../components";

export default function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const [addr, setAddr] = useState("");

  const router = useRouter();

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please Install MetaMask");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setIsWalletConnected(true);
      localStorage.setItem("walletAddress", accounts[0]);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const addr = localStorage.getItem("walletAddress");
    setAddr(addr);
  }, []);

  return (
    <div className="">
      <Head>
        <title>Blockvest </title>
        {/* <link rel="shortcut icon" href="logo.png" /> */}
      </Head>

      <div className="font-Oxygen bg-[#1242ef] absolute left-[-250px] top-[-210px] h-[352px] w-[652px] blur-[350px] rounded-full "></div>

      {isWalletConnected ||  addr ? <Header /> : null}

      <div className="relative overflow-hidden">
        {/* HeroSection */}
        <section className="max-w-[1240px] my-20 mx-auto grid grid-cols-2  gap-2 font-body h-[540px] overflow-hidden top-7 md:gap-12 medium md:px-5 sm:grid-cols-1 sm:h-full relative ">
          <div className="flex flex-col items-start justify-center h-full sm:items-center">
            <h1 className="w-full text-4xl sm:text-center">
              Welcome to Blockvest
            </h1>
            <p className="text-[#ADB9C7] sm:text-center">
            Blockvest is your DAO's personal investing management tool. Here you can deploy your own NFTs and allow investors to be a part of your journey! NO worrying about long VC cycles and terms when you can show growth and performance.


            </p>
            {/* {addr ? (
              <button
                type="button"
                className="bg-[#1E50FF] outline-none border-none py-3 px-5 rounded-xl font-body cursor-pointer transition duration-250 ease-in-out hover:scale-125 hover:drop-shadow-xl hover:shadow-sky-600 w-auto focus:scale-90"
                onClick={connectWallet}
              >
                Create an NFT
              </button>
            ) : (
              <button
                type="button"
                className="bg-[#1E50FF] outline-none border-none py-3 px-5 rounded-xl font-body cursor-pointer  duration-250 ease-in-out hover:transform-x-1 hover:drop-shadow-xl hover:shadow-sky-600 w-full mt-8 transition transform hover:-translate-y-3 motion-reduce:transition-none motion-reduce:hover:transform-none "
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            )} */}
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="w-[400px] h-[536px] bg-[#272D37]/60 rounded-2xl flex flex-col p-6 sm:h-max">
              <Image
                src="/images/mock.png"
                alt="mock"
                height={352}
                width={352}
                layout="intrinsic"
              ></Image>
              <div className="">
                <h1>Hamlet</h1>
                <div className="h-[56px] flex justify-between">
                  <div className="flex flex-row gap-2">
                    <img
                      src="images/mockcreator.jpg"
                      alt="creator-image"
                      className="h-[56px] w-[56px] rounded-xl"
                    />
                    <div>
                      <p className="my-1 text-base text-[#8F9CA9]">Creator </p>
                      <h4 className="my-0">0x000...0000</h4>
                    </div>
                  </div>
                  <div>
                    <p className="my-1 text-[#8F9CA9]">Current Price</p>
                    <h4 className="my-0 ">4.99 ETH</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <Footer />
      </div>
    </div>
  );
}
