import { Transition } from "@headlessui/react";

type Props = {
  isShowing: boolean;
  closeHandler: () => void;
};

// TODO: Only show filters on list view!

// TODO: use click outside to close
// or auto animate a div beneath header?

export const Filters = ({ isShowing, closeHandler }: Props) => (
  <Transition
    show={isShowing}
    enter="transition ease-in-out duration-200 transform"
    enterFrom="-translate-y-full"
    enterTo="-translate-y-0"
    leave="transition ease-in-out duration-200 transform"
    leaveFrom="-translate-y-0"
    leaveTo="-translate-y-full"
    className="fixed z-10 h-64 w-full bg-white/95 shadow-xl backdrop-blur-sm"
    onClick={closeHandler}
  >
    <div className="container mx-auto flex w-full flex-col p-4 text-neutral-700  md:px-4 lg:max-w-[1024px]">
      <div className="flex flex-row justify-between">
        <span>Filter menu TODO</span>
        <button
          type="button"
          onClick={closeHandler}
          title="Close filters"
          className="flex items-center rounded p-1 text-3xl md:hover:bg-slate-200"
        >
          <i className="fa-solid fa-close" />
        </button>
      </div>
    </div>
  </Transition>
);

// sm:mt-24 mt-16
