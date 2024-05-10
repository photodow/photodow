import "./index.scss";

import { Tag, TagBaseProps } from "@carbon/react";

interface Comp {
    items?: string[];
    color?: TagBaseProps["type"];
    size?: TagBaseProps["size"];
    className?: string;
}

export default function Skills({ items, size, color, className }: Comp) {
    return !items?.length ? null : (
        <div className="jd-skills">
            {items?.length &&
                items.map((skill, i) => (
                    <>
                        <Tag
                            key={skill}
                            type={color}
                            size={size}
                            className={className}
                            style={{ transitionDelay: `${i * 0.1}s` }}
                        >
                            {skill}
                        </Tag>
                        {addComma(items.length, i)}
                    </>
                ))}
            <div className="hidden-copy-paste-formatting">
                <br />
            </div>
        </div>
    );

    function addComma(total: number, index: number) {
        if (index < total - 1) {
            return (
                <span className="hidden-copy-paste-formatting">
                    {","}&nbsp;
                </span>
            );
        }

        return null;
    }
}
