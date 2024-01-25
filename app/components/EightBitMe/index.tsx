"use client";

import { MouseEventHandler, useEffect, useState, useRef } from 'react';
import calcMidPoint from '../../utils/calcMidPoint';
import miniUnits from '../../utils/miniUnits';

import "./index.scss";

export default function EightBitMe() {

  const remDirection = useRef('left');
  const moveCount = useRef(0);
  const avatar = useRef<HTMLDivElement>(null);

  const [showMe, setShowMe] = useState('');
  const [bgStyles, setBgStyles] = useState({});
  const [containerStyles, setContainerStyles] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    resizeAvatar();
    setShowMe('jd-eightbitme--active');

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
    <div className={`jd-eightbitme ${showMe}`} style={containerStyles}>
      <div className={`jd-eightbitme__inner`}>
        <div ref={avatar} className={`jd-eightbitme__avatar ${calcLookingDirection()}`}>
          <div className="hair-wind"></div>
          <div className="eyes"></div>
        </div>
      </div>
      <div className={`jd-eightbitme__bg`} style={bgStyles} />
    </div>
  );

  function resizeAvatar () {
    const padding = miniUnits(2);
    const maxHeight = window.innerHeight - padding * 2;
    const minHeight = miniUnits(8);
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

  function calcLookingDirection () {
    const avatarEl = avatar.current;
  
    if (avatarEl == null || moveCount.current < 30) {
      moveCount.current++;
      return remDirection.current;
    }

    const avatarRectBox = avatarEl.getBoundingClientRect();
    let direction = [];

    moveCount.current = 0;

    if (mousePosition.x < avatarRectBox.left) {
        direction.push('left');
    } else if (mousePosition.x > avatarRectBox.right) {
        direction.push('right');
    }
    
    if (mousePosition.y < avatarRectBox.top) {
        direction.push('up');
    } else if (mousePosition.y > avatarRectBox.bottom) {
        direction.push('down');
    }

    remDirection.current = direction.join(' ');

    return remDirection.current;
  }
}