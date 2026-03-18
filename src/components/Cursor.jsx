import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let rafId;
    let targetFollower = { x: -100, y: -100 };

    const onMouseMove = (e) => {
      const pos = { x: e.clientX, y: e.clientY };
      setCursorPos(pos);

      const lerp = (a, b, t) => a + (b - a) * t;

      const animateFollower = () => {
        targetFollower = {
          x: lerp(targetFollower.x, pos.x, 0.12),
          y: lerp(targetFollower.y, pos.y, 0.12),
        };

        setFollowerPos({ ...targetFollower });

        rafId = requestAnimationFrame(animateFollower);
      };

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(animateFollower);
    };

    const onMouseOver = (e) => {
      if (e.target.closest("a, button, [data-hover]")) {
        setIsHovered(true);
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest("a, button, [data-hover]")) {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor hidden md:block"
        style={{ left: cursorPos.x - 6, top: cursorPos.y - 6 }}
      />

      <div
        ref={followerRef}
        className={`cursor-follower hidden md:block ${
          isHovered ? "hovered" : ""
        }`}
        style={{ left: followerPos.x - 18, top: followerPos.y - 18 }}
      />
    </>
  );
}