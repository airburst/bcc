import ChevronLeft from "../../public/static/icons/solid/chevron-left.svg";

type IconProps = {
  children: JSX.Element;
}

const Icon = ({ children }: IconProps) => {
  return <div className="flex items-center justify-center w-16 h-16">
    {children}
  </div>
}

export const ChevronLeftIcon = () => (<Icon><ChevronLeft /></Icon>);

