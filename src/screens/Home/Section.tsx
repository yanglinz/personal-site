import React from "react";

interface ComponentProps {
  title: string;
  children: React.ReactNode;
}

export default function HomeSection(props: ComponentProps) {
  return (
    <div className="Section py-7 lg:py-9">
      <div className="l-wide">
        <h2 className="pb-5 text-gray-500 text-xl font-bold lg:pb-7 lg:text-3xl">
          {props.title}
        </h2>
        {props.children}
      </div>
    </div>
  );
}
