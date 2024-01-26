
import "./index.scss";

import { Tooltip } from "@carbon/react";
import { TooltipProps } from "@carbon/react/lib/components/Tooltip/Tooltip";

interface TooltipExtType extends TooltipProps<React.ElementType> {
   open?: boolean; 
}

export default function TooltipExt({ open, disable, children, ...props }: TooltipExtType) {
  const openClass = open ? 'cds--popover--open' : '';
  const disableClass = disable ? 'cds--popover--hide' : '';

  return (
    <Tooltip className={`${openClass} ${disableClass}`} {...props}>
        {children}
    </Tooltip>
  );
}