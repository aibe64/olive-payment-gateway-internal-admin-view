import { ROUTE_PATH, AppState } from "@/models";
import { usePageStore } from "@/store";
import { useTheme, LazyLoader, PageLoader } from "@/components";
import { SunOutlined, MoonOutlined, ForwardOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { Props } from "@/models";
import { AppConfig } from "@/config";

export const LandingPageLayout: React.FC<Props.LandingPageLayout> = ({
  appDescription,
  appMotto,
  appName,
  appDescriptionImage,
  appLogo,
}) => {
  document.title = `${appName}${AppConfig.APP_DESCRIPTION}`;
  const state = usePageStore<AppState>((state) => state);

  const { themeMode, toggleTheme } = useTheme();

  if (state.loadingPage) {
    return (
      <>
        <PageLoader />
        <LazyLoader />
      </>
    );
  }

  return (
    <div
      className="h-screen grid grid-rows-[4rem_1fr] max-w-screen-2xl mx-auto"
      style={{
        backgroundColor: themeMode === "dark" ? "#121212" : "#FFFFFF",
      }}
    >
      <header className="flex items-center justify-between pr-3 lg:px-5 sticky top-0 left-0 z-50 bg-[#FFFFFF]  dark:bg-primary-dark">
        <div className="h-[70%] lg:h-[90%] w-24 grid place-content-center">
          <img src={appLogo} alt="logo-img" className="h-full w-full" />
          <h1 className="text-center text-[0.5rem] text-primary font-inter-semibold">
            {appName}
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <button onClick={toggleTheme}>
            {themeMode === "dark" ? (
              <SunOutlined className="!text-[#FFFFFF]" />
            ) : (
              <MoonOutlined />
            )}
          </button>
          <Button
            type="default"
            className="!shadow-none !font-inter-medium lg:!p-5"
            onClick={() => (window.location.href = ROUTE_PATH.Login + "signup")}
          >
            Get Started
          </Button>
          <Button
            type="primary"
            className="!shadow-none !font-inter-medium lg:!p-5"
            onClick={() =>
              (window.location.href =
                ROUTE_PATH.Login + "?redirectTo=" + window.location.origin)
            }
          >
            Login
          </Button>
        </div>
      </header>
      <main className="lg:grid lg:grid-cols-2 flex flex-col-reverse  mb-10 lg:mb-0">
        <section className="p-5 lg:p-14 my-auto">
          <Typography className="!font-inter-bold !text-2xl lg:!text-5xl !text-center lg:!text-left">
            {appMotto}
          </Typography>
          <Typography className="!font-inter-regular !my-10 !text-justify !text-lg lg:!text-lg !leading-loose">
            {appDescription}
          </Typography>
          <div className="grid lg:flex items-center gap-5 flex-wrap">
            <Button
              type="primary"
              className="!font-inter-semibold !shadow-none !rounded-md"
              onClick={() =>
                (window.location.href = ROUTE_PATH.Login + "signup")
              }
              icon={<ForwardOutlined className="text-xl" />}
              iconPosition="end"
            >
              Get started
            </Button>
          </div>
        </section>
        <section>
          <img src={appDescriptionImage} alt="" />
        </section>
      </main>
      <footer className="flex items-center mx-auto -mt-5 mb-5">
        <Typography className="!font-inter-medium text-gray-text !text-[0.7rem] lg:!text-base !text-center">
          Xpress Payment Solutions Limited - Licensed by the{" "}
          <strong>Central Bank of Nigeria</strong>
        </Typography>
      </footer>
    </div>
  );
};
