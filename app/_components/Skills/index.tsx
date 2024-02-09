
import "./index.scss";

import { Tag, TagBaseProps } from "@carbon/react";

interface Comp {
  items: string[],
  color?: TagBaseProps["type"],
  size?: TagBaseProps["size"],
  className?: string,
}

export default function Skills ({ items, size, color, className }: Comp) {
  console.log(items);
  return (
    items.map((skill, i) =>
      <Tag
        key={skill}
        type={color}
        size={size}
        className={className}
        style={{ transitionDelay: `${i * .2}s`}}
      >{skill}</Tag>)
  );
}