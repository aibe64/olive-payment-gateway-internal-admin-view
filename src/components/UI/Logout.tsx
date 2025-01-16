import { useNavigate } from "react-router-dom";

import { AppStorage, usePageStore } from "@/store";
import { ROUTE_PATH, State } from "@/models";

const Logout = () => {
  const state = usePageStore<State.Layout>((state) => state);
  const navigate = useNavigate();

  const onLogout = () => {
    //TODO
    // call logout API if available
    AppStorage.clear();
    navigate(ROUTE_PATH.Landing);
  };

  return (
    <div>
      logout
      <button onClick={onLogout}>logout</button>
      {JSON.stringify(state)}
    </div>
  );
};

export default Logout;
