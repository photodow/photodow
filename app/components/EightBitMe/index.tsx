"use client";

import { useEffect } from 'react';

import "./index.scss";

let eightBitMeElement: HTMLElement | null;

export default function EightBitMe() {
  useEffect(() => {
    eightBitMeElement = document.querySelector('.jd-eightbitme__avatar');
    document.addEventListener('mousemove', setLookingDirection);
    document.addEventListener('scroll', resizeAvatar);
  });

  return (
    <div className="jd-eightbitme">
      <div className="jd-eightbitme__avatar left">
        <div className="hair-wind"></div>
        <div className="eyes"></div>
      </div>
    </div>
  );
}

let eightBitBox: DOMRect | undefined;
let originalHeight: number;
let originalRight: number;
const minHeight = 42; // header-inner - padding

function resizeAvatar (e: Event) {
  const eightbitContainer: HTMLElement | null = document.querySelector('.jd-eightbitme');

  if (!eightbitContainer) {
    return false;
  }

  if (!eightBitBox) {
    eightBitBox = eightbitContainer.getBoundingClientRect();
    originalHeight = eightBitBox.height - 16;
    originalRight = eightBitBox.right;
    console.log
  }

  eightBitBox.height = originalHeight - window.pageYOffset;

  if (eightBitBox.height <= minHeight) {
    eightBitBox.height = minHeight;
  } else if (eightBitBox.height >= originalHeight) {
    eightBitBox.height = originalHeight;
  }

  eightbitContainer.style.height = `${eightBitBox.height}px`;
  eightbitContainer.style.top = `${8 - ((eightBitBox.height - minHeight) / (originalHeight - minHeight) * 8)}px`;
  eightbitContainer.style.right = `calc(${((eightBitBox.height - minHeight) / (originalHeight - minHeight) * 50)}% + ${8 - ((eightBitBox.height - minHeight) / (originalHeight - minHeight) * 8)}px)`;
  eightbitContainer.style.transform = `translate(${((eightBitBox.height - minHeight) / (originalHeight - minHeight) * 50)}%, 0)`;
  eightbitContainer.style.fontSize = `${((eightBitBox.height - minHeight) / (originalHeight - minHeight) * (16 - 2.25)) + 2.25}px`;
}

function setLookingDirection (e: MouseEvent) {
  if (!eightBitMeElement) {
    return false;
  }

  const avatarBox = eightBitMeElement.getBoundingClientRect();

  if (e.x < avatarBox.left) {
      // left
      eightBitMeElement.classList.add('left');
      eightBitMeElement.classList.remove('right');
  } else if (e.x > avatarBox.right) {
      // right
      eightBitMeElement.classList.add('right');
      eightBitMeElement.classList.remove('left');
  } else {
      // middle
      eightBitMeElement.classList.remove('right');
      eightBitMeElement.classList.remove('left');
  }
  
  if (e.y < avatarBox.top) {
      // top
      eightBitMeElement.classList.add('up');
      eightBitMeElement.classList.remove('down');
  } else if (e.y > avatarBox.bottom) {
      // bottom
      eightBitMeElement.classList.add('down');
      eightBitMeElement.classList.remove('up');
  } else {
      // middle
      eightBitMeElement.classList.remove('down');
      eightBitMeElement.classList.remove('up');
  }
}