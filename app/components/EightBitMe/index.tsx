"use client";

import "./index.scss";

import { useEffect, useState, useRef, MouseEventHandler, MouseEvent, RefObject } from 'react';
import calcMidPoint from '../../utils/calcMidPoint';
import miniUnits from '../../utils/miniUnits';
import TooltipExt from "../Tooltip";

export default function EightBitMe({ onClick, refObj }: { onClick: MouseEventHandler<HTMLButtonElement>, refObj: RefObject<HTMLButtonElement> }) {

  const remDirection = useRef('left');
  const moveCount = useRef(0);
  const tooltipShown = useRef(false);
  const tooltipTimeout = useRef<NodeJS.Timeout>();
  const transition = useRef<string>();
  const avatar = useRef<HTMLDivElement>(null);

  const [showMe, setShowMe] = useState('');
  const [bgStyles, setBgStyles] = useState({});
  const [containerStyles, setContainerStyles] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [openTooltip, setOpenTooltip] = useState(false);

  useEffect(() => {
    setShowMe('jd-eightbitme--active');

    resizeAvatar();
    document.addEventListener('resize', resizeAvatar);
    document.addEventListener('scroll', resizeAvatar);

    document.addEventListener('mousemove', e => {
      setMousePosition({ x: e.x, y: e.y});
    });

    document.addEventListener("touchmove", e => {
      const changedTouches = e.changedTouches[0];
      setMousePosition({ x: changedTouches.clientX, y: changedTouches.clientY});
    });
  }, []);

  return (
    <div className={`jd-eightbitme ${showMe}`} style={{"transition": transition.current, ...containerStyles}}>
      <button ref={refObj} title="Open Menu" className={`jd-eightbitme__inner jd-eightbitme--btn`} aria-label="Open Menu" onMouseOver={_onMouseOver} onClick={_onClick}>
        <TooltipExt label="Open Menu" align={'left'} open={openTooltip} disable={!openTooltip}>
          <div ref={avatar} className={`jd-eightbitme__avatar ${calcLookingDirection()}`}>
            <div className="hair-wind"></div>
            <div className="eyes"></div>
          </div>
        </TooltipExt>
      </button>
      <div className={`jd-eightbitme__bg`}  style={bgStyles} />
    </div>
  );

  function _onMouseOver () {
    clearTimeout(tooltipTimeout.current);
    tooltipShown.current = true;
    setOpenTooltip(false);
  }

  function _onClick (e: MouseEvent<HTMLButtonElement>) {
    transition.current = undefined;
    clearTimeout(tooltipTimeout.current);
    tooltipShown.current = true;
    setOpenTooltip(false);
    onClick(e);
  }

  function resizeAvatar () {
    const padding = miniUnits(2);
    const maxHeight = window.innerHeight - padding * 2;
    const minHeight = miniUnits(8);
    let currentHeight = maxHeight - window.scrollY;

    if (currentHeight <= minHeight) {
      currentHeight = minHeight;

      if (!tooltipShown.current) {
        const oneSecond = 1000;
        const initialDelay = 2 * oneSecond;
        const hideDelay = (10 * oneSecond) + initialDelay;

        clearTimeout(tooltipTimeout.current);
        tooltipTimeout.current = setTimeout(() => {
          remDirection.current = 'left';
          tooltipShown.current = true;
          setOpenTooltip(true);
        }, initialDelay);

        setTimeout(() => {
          setOpenTooltip(false);
        }, hideDelay);
      }
    } else if (currentHeight >= maxHeight) {
      currentHeight = maxHeight;
      clearTimeout(tooltipTimeout.current);
      if (tooltipShown.current) {
        setOpenTooltip(false);
      }
    }

    transition.current = 'none';
    const fontSize = { start: 16, end: 3 };
    const translateX = { start: 50, end: 0 };
    const top = { start: 0, end: padding };
    const rightPx = { start: 0, end: padding };
    const rightPerc = { start: 50, end: 0 };
    const bgScale = { start: 0, end: 1 };
    const containerHeight = {
      start: maxHeight,
      end: minHeight,
      current: currentHeight
    };

    setContainerStyles({
      height: `${currentHeight}px`,
      fontSize: `${calcMidPoint(fontSize, containerHeight)}px`,
      transform: `translate(${calcMidPoint(translateX, containerHeight)}%, 0)`,
      top: `${calcMidPoint(top, containerHeight)}px`,
      right: `calc(${calcMidPoint(rightPerc, containerHeight)}% + ${calcMidPoint(rightPx, containerHeight)}px)`,
    });

    setBgStyles({
      // transform: `scale(${calcMidPoint(bgScale, containerHeight)}) translate(-50%, -50%)`
      transform: `scale(${calcMidPoint(bgScale, containerHeight)})`
    });
  }

  function calcLookingDirection () {
    const avatarEl = avatar.current;
  
    if (avatarEl == null || moveCount.current < 30) {
      moveCount.current++;
      return remDirection.current;
    }

    const avatarRectBox = avatarEl.getBoundingClientRect();
    let direction = [];

    moveCount.current = 0;
    
    if (mousePosition.y < avatarRectBox.top) {
        direction.push('up');
    } else if (mousePosition.y > avatarRectBox.bottom) {
        direction.push('down');
    }

    if (mousePosition.x < avatarRectBox.left) {
        direction.push('left');
    } else if (mousePosition.x > avatarRectBox.right) {
        direction.push('right');
    }

    remDirection.current = direction.join(' ');

    return remDirection.current;
  }
}