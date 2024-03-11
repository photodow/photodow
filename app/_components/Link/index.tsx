import './index.scss';

import NextLink from "next/link";
import { ButtonProps, LinkProps } from "@carbon/react";
import { LinkComp } from '../../_types/Link';

interface Comp extends LinkProps {
  children: React.ReactNode;
  kind?: ButtonProps<'a'>['kind'];
  compType?: LinkComp
}

export function Link ({ href = '', compType = LinkComp.Text, kind, size, className, children, ...props }: Comp) {

    if (compType === LinkComp.Button) {

    }
    return (
        <NextLink
            href={href}
            className={`cds--${setCompType(compType)}${size ? ` cds--link--${size} cds--layout--size-${size}` : ''}${className ? ` ${className}` : ''}${kind ? ` cds--btn--${kind}` : ''}`}
            {...props}
        >
            {children}
        </NextLink>
    );
}

function setCompType (compType: LinkComp) {
    switch (compType) {
        case LinkComp.Button:
            return 'btn'
            break;
        default:
            return 'link';
            break;
    }
}