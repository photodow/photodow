"use client";

import { MouseEventHandler, useEffect, useState, useRef } from 'react';

// leverage state more
// slow loadtime

import "./index.scss";

let eightBitMeElement: HTMLElement | null;

export default function EightBitMe({ mobileNavControl }: {mobileNavControl: MouseEventHandler}) {
  const eightBitMe = useRef(null);
  const [lookingDirection, setLookingDirection] = useState('left');
  const [showMe, setShowMe] = useState('');

  useEffect(() => {
    resizeAvatar();
    eightBitMeElement = document.querySelector('.jd-eightbitme__avatar');
    document.addEventListener('scroll', resizeAvatar);

    setShowMe('jd-eightbitme--active');


    document.addEventListener('mousemove', e => {
      calcLookingDirection(e.x, e.y, eightBitMe.current, setLookingDirection);
    });

    document.addEventListener("touchmove", e => {
      const changedTouches = e.changedTouches[0];
      calcLookingDirection(changedTouches.clientX, changedTouches.clientY, eightBitMe.current, setLookingDirection);
    });
  }, []);

  return (
    <div className={`jd-eightbitme ${showMe}`}>
      <div className={`jd-eightbitme__inner`}>
        <div ref={eightBitMe} className={`jd-eightbitme__avatar ${lookingDirection}`} onClick={mobileNavControl}>
          <div className="hair-wind"></div>
          <div className="eyes"></div>
        </div>
      </div>
      <div className={`jd-eightbitme__bg`} />
    </div>
  );
}

let eightBitBox: DOMRect | undefined;
let originalHeight: number;
const minHeight = 42; // header-inner - padding
const padding = 8;

function resizeAvatar () {
  const eightbitContainer: HTMLElement | null = document?.querySelector('.jd-eightbitme');
  const eightbitBG: HTMLElement | null = document?.querySelector('.jd-eightbitme__bg');

  if (!eightbitContainer || !eightbitBG) {
    return false;
  }

  if (!eightBitBox) {
    eightBitBox = eightbitContainer.getBoundingClientRect();
    originalHeight = eightBitBox.height - padding * 2;
    console.log
  }

  eightBitBox.height = originalHeight - window.scrollY;

  if (eightBitBox.height <= minHeight) {
    eightBitBox.height = minHeight;
  } else if (eightBitBox.height >= originalHeight) {
    eightBitBox.height = originalHeight;
  }

  eightbitContainer.style.height = `${eightBitBox.height}px`;
  eightbitContainer.style.fontSize =  `${calcMidPointBy(16, 2.25)}px`;
  eightbitContainer.style.transform = `translate(${calcMidPointBy(50, 0)}%, 0)`;
  eightbitContainer.style.top = `${calcMidPointBy(0, padding)}px`;
  eightbitContainer.style.right = `calc(${calcMidPointBy(50, 0)}% + ${calcMidPointBy(0, padding)}px)`;

  eightbitBG.style.transform = `scale(${calcMidPointBy(0, 1)}) translate(-50%, -50%)`;
}

function calcMidPointBy (
  from: number = 0,
  to: number = 0,
  height: number = eightBitBox?.height || 0,
  fromHeight: number = originalHeight,
  toHeight: number = minHeight
) {
  return ((height - toHeight) / (fromHeight - toHeight) * (from - to)) + to;
}

function calcLookingDirection (x: number, y: number, ref: HTMLElement | null, update: Function) {
  if (!ref) {
    return;
  }

  let direction = [];
  const avatarBox = ref.getBoundingClientRect();

  if (x < avatarBox.left) {
      direction.push('left');
  } else if (x > avatarBox.right) {
      direction.push('right');
  }
  
  if (y < avatarBox.top) {
      direction.push('up');
  } else if (y > avatarBox.bottom) {
      direction.push('down');
  }

  update(direction.join(' '));
}