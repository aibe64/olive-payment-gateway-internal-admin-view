import { XpressSideBar } from "./sideBar";
import "./style.css";
import { TopBar } from "./topBar";

export const XpressLayout = ({ children }: any) => {
  return (
    <section className="flex mx-auto max-w-screen-2x w-full">
      <XpressSideBar />
      <main className="flex flex-col w-full">
        <TopBar />
        {children}
      </main>
    </section>
  );
};
