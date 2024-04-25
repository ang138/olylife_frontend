import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function Question() {
  return (
    <>
      <div className="bg-green-500 p-4 lg:p-8">
        <span className="font-bold text-md lg:text-2xl pb-4 text-white flex justify-center">
          คำถามที่พบบ่อย
        </span>
        <div className="flex justify-center items-center relative">
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-[300px] h-[20px] md:w-[500px] p-4 ps-10 text-sm text-gray-900 border border-white rounded-lg bg-white  dark:bg-white dark:border-white dark:placeholder-gray-400 dark:text-black "
                placeholder="Search"
                required
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col justify-around py-4 w-full">
        <div className="py-4 ">
          <p className="flex justify-center p-2">
            <button className="boder-solid border-2 border-slate-300 rounded-full w-[150px] lg:w-[200px] py-2 hover:bg-green-500 hover:border-green-500">
              General
            </button>
          </p>
          <p className="flex justify-center p-2">
            <button className="boder-solid border-2 border-slate-300 rounded-full w-[150px] lg:w-[200px] py-2 hover:bg-green-500 hover:border-green-500">
              Companies
            </button>
          </p>
          <p className="flex justify-center p-2">
            <button className="boder-solid border-2 border-slate-300 rounded-full w-[150px] lg:w-[200px] py-2 hover:bg-green-500 hover:border-green-500">
              Members
            </button>
          </p>
          <p className="flex justify-center p-2">
            <button className="boder-solid border-2 border-slate-300 rounded-full w-[150px] lg:w-[200px] py-2 hover:bg-green-500 hover:border-green-500">
              Society
            </button>
          </p>
        </div>
        <div className="p-4 md:w-1/2">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between px-4 py-2 text-left text-lg">
                  <span>Excepteur esse sit eiusmod cillum nostr?</span>
                  <ChevronDownIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-7 w-7 hover:bg-green-500 rounded-full border text-gray-500 hover:text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500 text-wrap">
                  Esse consectetur nisi consequat ea do aliquip minim nostrud
                  est incididunt excepteur esse cillum aliquip reprehenderit
                  amet
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg  px-4 py-2 text-left text-lg ">
                  <span>Est ad incididunt sint magna incididunt?</span>
                  <ChevronDownIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-7 w-7 hover:bg-green-500 rounded-full border text-gray-500 hover:text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500 text-wrap">
                  No.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg  px-4 py-2 text-left text-lg ">
                  <span>Proident irure officia anim?</span>
                  <ChevronDownIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-7 w-7 hover:bg-green-500 rounded-full border text-gray-500 hover:text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500 text-wrap">
                  No.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg  px-4 py-2 text-left text-lg">
                  <span>Id anim nisi ut magna ut?</span>
                  <ChevronDownIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-7 w-7 hover:bg-green-500 rounded-full border text-gray-500 hover:text-black`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500 text-wrap">
                  No.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </>
  );
}
