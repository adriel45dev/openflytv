import { URLSearchParamsType } from "@/app/[locale]/shared/types";
import Link from "next/link";

const ArrowDownIcon = () => {
  return (
    <svg
      className="w-2.5 h-2.5 ms-2.5 group-hover:rotate-180"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m1 1 4 4 4-4"
      />
    </svg>
  );
};

const ClearListIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6 mr-2"
    >
      <path
        opacity="0.5"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H20C20.4142 5.25 20.75 5.58579 20.75 6C20.75 6.41421 20.4142 6.75 20 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6ZM2.25 11C2.25 10.5858 2.58579 10.25 3 10.25H11C11.4142 10.25 11.75 10.5858 11.75 11C11.75 11.4142 11.4142 11.75 11 11.75H3C2.58579 11.75 2.25 11.4142 2.25 11ZM2.25 16C2.25 15.5858 2.58579 15.25 3 15.25H11C11.4142 15.25 11.75 15.5858 11.75 16C11.75 16.4142 11.4142 16.75 11 16.75H3C2.58579 16.75 2.25 16.4142 2.25 16Z"
        fill="currentColor"
      />
      <path
        d="M14.4697 10.4697C14.7626 10.1768 15.2374 10.1768 15.5303 10.4697L17.5 12.4393L19.4697 10.4697C19.7626 10.1768 20.2374 10.1768 20.5303 10.4697C20.8232 10.7626 20.8232 11.2374 20.5303 11.5303L18.5607 13.5L20.5303 15.4697C20.8232 15.7626 20.8232 16.2374 20.5303 16.5303C20.2374 16.8232 19.7626 16.8232 19.4697 16.5303L17.5 14.5607L15.5303 16.5303C15.2374 16.8232 14.7626 16.8232 14.4697 16.5303C14.1768 16.2374 14.1768 15.7626 14.4697 15.4697L16.4393 13.5L14.4697 11.5303C14.1768 11.2374 14.1768 10.7626 14.4697 10.4697Z"
        fill="currentColor"
      />
    </svg>
  );
};

type ButtonProps = {
  title: string;
  t_title: string;
  children: React.ReactNode;
  dropdown: boolean;
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  oppositeDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  searchFilter: URLSearchParamsType;
  searchParams: URLSearchParamsType;
};

export default function ButtonFilters({
  title,
  t_title,
  children,
  dropdown,
  setDropdown,
  oppositeDropdown,
  searchFilter,
  searchParams,
}: ButtonProps) {
  return (
    <div className="group w-full" key={"button_filter"}>
      <button
        id={`sort_${title}`}
        data-dropdown-toggle={`dropdown_${title}`}
        className="inline-flex justify-between items-center px-4 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none  border-b group-hover:bg-blue-700 focus:ring-blue-800 w-full"
        type="button"
        onClick={() => {
          setDropdown((prev) => !prev);
          oppositeDropdown(false);
        }}
      >
        {t_title}
        <ArrowDownIcon />
      </button>
      <div
        id={`dropdown_${title}`}
        className={`absolute min-w-full pt-4 left-0 ease-in-out duration-300 ${
          dropdown ? "opacity-100 z-10" : "opacity-0 -z-50"
        }`}
      >
        <div className="bg-gray-700 rounded-lg shadow">
          <ul
            className="h-max px-3 pb-3 overflow-y-auto text-sm pt-4 text-gray-200"
            aria-labelledby={`${title}Dropdown`}
          >
            {children}
          </ul>
          <div className="w-full flex gap-2">
            <Link
              href={`?${new URLSearchParams({
                ...searchParams,
                [title]: "",
              })}#player`}
              className="w-full cursor-pointer flex items-center p-3 ml-2 my-2 text-sm font-bold border-t rounded-lg border-gray-600  bg-slate-800 hover:bg-gray-600 text-white hover:underline"
            >
              {/* Clear List Icon */}
              <ClearListIcon />
              Clear
            </Link>

            <Link
              href={`?${new URLSearchParams({
                ...searchParams,
                ...searchFilter,
              })}#player`}
              className="w-full cursor-pointer flex items-center p-3 mr-2 my-2 text-sm font-bold border-t rounded-lg border-gray-600  bg-blue-600 hover:bg-gray-600 text-white hover:underline"
            >
              <ClearListIcon />
              Apply
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
