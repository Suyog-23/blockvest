import Head from "next/head";
import Image from "next/image";
import data from "../constants/mock-nft.json";
import mockartist from "../constants/mock-artist.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Footer, Header } from "../components";
import { toast } from "react-toastify";
import ContractABI from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import { ethers } from "ethers";
import axios from "axios";

export default function PersonalandCompanyStats() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const mainURL = `https://arweave.net/`;

  const [addr, setAddr] = useState("");

  const [nfts, setNts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [valuation, setValuation] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const addr = localStorage.getItem("walletAddress");
    setAddr(addr);
    getNfts();
    getValuationNfts();
  }, []);


  const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    let contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ContractABI.abi,
      signer
    );
    return contract;
  };

  const getNfts = async () => {
    try {
      const contract = await getContract();

      const data = await contract.fetchMyNFTs();

      const items = await Promise.all(
        data?.map(async (i) => {
          const tokenURI = await contract.tokenURI(i.tokenId);

          const meta = await axios.get(mainURL + tokenURI);

          let price = ethers.utils.formatUnits(i.price.toString(), "ether");

          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
            tokenURI,
          };
          return item;
        })
      );
      setNts(items);
      setLoading(true);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", error);
    }
  };

  const getValuationNfts = async () => {

    var valuationtotal = 0;

    nfts.forEach((nft) => {
        valuationtotal= valuationtotal + nft.price;
        setValuation(valuationtotal)
        console.log(valuation)
    })

  }



  return (
    <div className="">
      <Head>
        <title>Blockvest </title>
        {/* <link rel="shortcut icon" href="logo.png" /> */}
      </Head>

      <div className="bg-[#1242ef] absolute left-[-250px] top-[-210px] h-[352px] w-[652px] blur-[350px] rounded-full "></div>

      {isWalletConnected ||  addr ? <Header /> : null}

      <div className="relative overflow-hidden">
        {/* HeroSection */}

        <center>
        <section className="max-w-[1240px] my-20 mx-auto  gap-2 font-body top-7 ">
          <h1 className="text-center w-full">Here are stats of your ownership</h1>

        
          <div className="grid grid-cols-3 gap-5 sm:grid-cols-1 sm:p-12 md:grid-cols-1 md:mx-10">

              <div
                className="w-full bg-[#272D37] flex flex-col justify-center items-center p-3 rounded-xl"
              >
                <div className="w-[80px] h-[80px] flex  justify-center items-center ">
                  <img
                    src="images/wallet.png"
                    className="w-full h-full"
                  />
                </div>
                <h4 className="font-bold text-[24px] md:text-[14px]">
                    Total buyable NFTs
                </h4>
                <p className="text-center text-[#ADB9C7] text-[14px]">
                We are looking to raise $50 Million from multiple investors
                </p>
              </div>

              <div
                className="w-full bg-[#272D37] flex flex-col justify-center items-center p-3 rounded-xl"
              >
                <div className="w-[80px] h-[80px] flex  justify-center items-center ">
                  <img
                    src="images/nft2.png"
                    className="w-full h-full"
                  />
                </div>
                <h4 className="font-bold text-[24px] md:text-[14px]">
                Percentage ownership
                </h4>
                <p className="text-center text-[#ADB9C7] text-[14px]">
                We are looking to raise $50 Million from multiple investors
                </p>
              </div>

              <div
                className="w-full bg-[#272D37] flex flex-col justify-center items-center p-3 rounded-xl"
              >
                <div className="w-[80px] h-[80px] flex  justify-center items-center ">
                  <img
                    src="images/nft3.png"
                    className="w-full h-full"
                  />
                </div>
                <h4 className="font-bold text-[24px] md:text-[14px]">
                Valuation of NFTs you own
                </h4>
                <p className="text-center text-[#ADB9C7] text-[14px]">
                    {valuation} Ether
                </p>
              </div>

          </div>

        </section>
        </center>


        <Footer />
      </div>
    </div>
  );
}
