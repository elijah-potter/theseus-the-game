import classes from "./style.module.css";
import { ReactNode } from "react";

export default function ({
  children,
  src,
  color,
}: {
  children?: ReactNode;
  src?: string;
  color?: string;
}) {
  return (
    <div
      className={classes.backdrop}
      style={{
        backgroundColor: color ?? "black",
        backgroundImage: src ? `url(${src})` : undefined,
      }}
    >
      {children}
    </div>
  );
}
