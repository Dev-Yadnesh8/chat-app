import type { ReactNode } from "react";

type ContainerProp = {
  child: ReactNode;
};

function Container({ child }: ContainerProp) {
  return (
    <div className="border border-gray-300 dark:border-gray-700  rounded-lg p-2 w-full">
      {child}
    </div>
  );
}

export default Container;
