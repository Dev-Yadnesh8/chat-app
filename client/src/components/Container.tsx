import type { ReactNode } from "react";

type ContainerProp = {
  child: ReactNode;
  className?:string
};

function Container({ child,className }: ContainerProp) {
  return (
    <div className={`border border-gray-300 dark:border-gray-700  rounded-lg w-full  transition-all duration-500 ease ${className && className}`}>
      {child}
    </div>
  );
}

export default Container;
