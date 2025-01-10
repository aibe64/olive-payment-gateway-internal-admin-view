import { useCallback, useEffect, useState } from "react";
import { PagePermission } from "../functions/pagePermission";

export const usePageValidation = (claim: string) => {
  const [canAccessOnRender, setCanAccessOnRender] = useState(true);

  const checkPageValidation = useCallback(async (claim: string) => {
    const accessPage = (await PagePermission.IsUserPermitted(
      claim
    )) as unknown as boolean;
    setCanAccessOnRender(accessPage);
  }, []);
  useEffect(() => {
    checkPageValidation(claim);
  }, [checkPageValidation, claim]);

  return { canAccessOnRender };
};
