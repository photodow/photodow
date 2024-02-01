
import "./index.scss";

import { Tooltip } from "@carbon/react";
import { TooltipProps } from "@carbon/react/lib/_components/Tooltip/Tooltip";

interface Comp extends TooltipProps<React.ElementType> {
   open?: boolean; 
}

export default function TooltipExt({ open, disable, children, ...props }: Comp) {
  const openClass = open ? 'cds--popover--open' : '';
  const disableClass = disable ? 'cds--popover--hide' : '';

  return (
    <Tooltip className={`${openClass} ${disableClass}`} {...props}>
        {children}
    </Tooltip>
  );
}