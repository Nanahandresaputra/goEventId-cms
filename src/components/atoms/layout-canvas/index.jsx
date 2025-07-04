import React from "react";
import { useLocation } from "react-router-dom";
import { Spin } from "antd";
import CanvasComp from "../other/canvas";

const LayoutCanvas = ({
  childMain,
  childSecondary,
  extraMainActionHeader = () => {},
}) => {
  const { pathname } = useLocation();
  const title = pathname
    .replace("/desktop/", "")
    .split("-")
    .map((text) => `${text.charAt(0).toUpperCase()}${text.substring(1)}`)
    .toString()
    .replaceAll(",", " ");

  return (
    <section className={`grid grid-cols-8 h-full w-full gap-x-3`}>
      <div className={childSecondary ? "col-span-5" : "col-span-8"}>
        <CanvasComp className={"lg:space-y-5"}>
          <div className="w-full flex justify-between items-center">
            <div>
              <p className="lg:text-xl 2xl:text-2xl font-bold">{title}</p>
            </div>
            {extraMainActionHeader()}
          </div>

          {childMain()}
        </CanvasComp>
      </div>
      {childSecondary && (
        <div className="col-span-3">
          <CanvasComp>
            <div>{childSecondary()}</div>
          </CanvasComp>
        </div>
      )}
    </section>
  );
};

export default LayoutCanvas;
