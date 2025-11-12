import { LazyLoader } from "@/components";
import { useAuthorization } from "@/hooks";

const LandingPage = () => {
  useAuthorization();
  return (
    <div>
      <LazyLoader />
    </div>
  );
};

export default LandingPage;
