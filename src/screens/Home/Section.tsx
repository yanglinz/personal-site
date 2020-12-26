import React from "react";

interface ComponentProps {
  title: string;
  children: React.ReactNode;
}

export default function HomeSection(props: ComponentProps) {
  return (
    <div className="Section">
      <div className="l-wide">
        <h2 className="Section-title">{props.title}</h2>
        {props.children}
      </div>
    </div>
  );
}
