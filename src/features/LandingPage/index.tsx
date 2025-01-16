import { lanndingImage, logo } from "@/assets";
import { LandingPageLayout } from "@/components";

const LandingPage = () => {
  return (
    <LandingPageLayout
      appDescription=" This platform serves as an opportunity for businesses to engage in
    large-scale reselling of VAS products, allowing them to earn
    commissions. With its user-friendly and easily integrable APIs, the
    platform ensures seamless integration, while also offering a robust
    reporting module for comprehensive data analysis."
      appDescriptionImage={lanndingImage}
      appLogo={logo}
      appMotto="More opportunities for Businesses"
      appName="Xpress App"
    />
  );
};

export default LandingPage;
