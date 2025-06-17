import { Outlet } from "react-router-dom";
import style from "./mainLayout.module.scss";

export const MainLayout = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.outlet}>
        <Outlet />
      </div>
    </div>
  );
};
