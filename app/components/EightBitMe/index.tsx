"use client";

import { MouseEventHandler, useEffect, useState, useRef } from 'react';
import calcMidPoint from '../../utils/calcMidPoint';
import miniUnits from '../../utils/miniUnits';

import "./index.scss";

export default function EightBitMe({ mobileNavControl }: {mobileNavControl: MouseEventHandler}) {
  const mouseEventCount = useRef(0);
  const container = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const avatar = useRef<HTMLDivElement>(null);
  const [showMe, setShowMe] = useState('');
  const [lookingDirection, setLookingDirection] = useState('left');
  const [bgStyles, setBgStyles] = useState({});
  const [containerStyles, setContainerStyles] = useState({});

  useEffect(() => {
    resizeAvatar(container.current, bg.current);
    setShowMe('jd-eightbitme--active');

    document.addEventListener('resize', e => resizeAvatar(container.current, bg.current));
    document.addEventListener('scroll', e => resizeAvatar(container.current, bg.current));

    document.addEventListener('mousemove', e => {
      calcLookingDirection(e.x, e.y);
    });

    document.addEventListener("touchmove", e => {
      const changedTouches = e.changedTouches[0];
      calcLookingDirection(changedTouches.clientX, changedTouches.clientY);
    });
  }, []);

  return (
    <div ref={container} className={`jd-eightbitme ${showMe}`}  style={containerStyles}>
      <div className={`jd-eightbitme__inner`}>
        <div ref={avatar} className={`jd-eightbitme__avatar ${lookingDirection}`} onClick={mobileNavControl}>
          <div className="hair-wind"></div>
          <div className="eyes"></div>
        </div>
      </div>
      <div ref={bg} className={`jd-eightbitme__bg`} style={bgStyles} />
    </div>
  );

  function resizeAvatar (container: HTMLDivElement | null, bg: HTMLDivElement | null) {
    if (!container || !bg) {
      return false;
    }

    const padding = miniUnits(2);
    const maxHeight = window.innerHeight - padding * 2;
    const minHeight = miniUnits(8); // header-inner - padding
    let currentHeight = maxHeight - window.scrollY;

    if (currentHeight <= minHeight) {
      currentHeight = minHeight;
    } else if (currentHeight >= maxHeight) {
      currentHeight = maxHeight;
    }

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
    })

    setBgStyles({
      transform: `scale(${calcMidPoint(bgScale, containerHeight)}) translate(-50%, -50%)`
    });
  }

  function calcLookingDirection (x: number, y: number) {
    const avatarEl = avatar.current;

    if (!avatarEl || mouseEventCount.current < 30) {
      mouseEventCount.current++;
      return;
    }

    let direction = [];
    const avatarRectBox = avatarEl.getBoundingClientRect();

    if (x < avatarRectBox.left) {
        direction.push('left');
    } else if (x > avatarRectBox.right) {
        direction.push('right');
    }
    
    if (y < avatarRectBox.top) {
        direction.push('up');
    } else if (y > avatarRectBox.bottom) {
        direction.push('down');
    }

    setLookingDirection(direction.join(' '));
    mouseEventCount.current = 0;
  }
}