import React from "react";

const Footer = () => {
  return (
    <footer className="font-U= relative">
      <section className="max-w-[1240px] mt-20 mb-10 mx-auto  gap-2 font-body top-7 md:p-10">
        <div className="grid footer justify-between gap-[88px] md:grid-cols-2 md:gap-6 ">
          <div className="col-span-1">
            <div className="flex items-center justify-start gap-1">
              <h4 className="">Blockvest</h4>
            </div>
            <p className="text-lg text-[#ADB9C7]">
              Blockvest is your DAO's personal investing management tool. Here you can deploy your own NFTs and
              allow investors to be a part of your journey! NO worrying about long VC cycles and terms when you can
              show growth and performance.
            </p>
          </div>

        </div>
        <div>
          <h3>{new Date().getFullYear()} All Right Reserved</h3>
          <p>
            Designed and Developed By{" "}
            <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
              {" "}
              Team EDAI Group 15{" "}
            </span>
          </p>
        </div>
      </section>

      <div className="bg-[#1242ef] absolute left-[-380px] top-[222.18px] h-[352px] w-[652px] blur-[350px] rounded-full"></div>
    </footer>
  );
};

export default Footer;
