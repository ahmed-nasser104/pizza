import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SplitText({
  text,
  className = "",
  delay = 0.05,
  duration = 1,
  tag: Tag = "h1",
  onLetterAnimationComplete,
}) {
  const textRef = useRef();

  useGSAP(() => {
    const split = new SplitType(textRef.current, {
      types: "chars",
    });

    gsap.from(split.chars, {
      opacity: 0,
      y: 60,
      duration,
      stagger: delay,
      ease: "power3.out",

      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        once: true,
      },

      onComplete: () => {
        onLetterAnimationComplete?.();
      },
    });

    return () => {
      split.revert();
    };
  });

  return (
    <Tag ref={textRef} className={className}>
      {text}
    </Tag>
  );
}
