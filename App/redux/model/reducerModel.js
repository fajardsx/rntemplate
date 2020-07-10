import Constant from "../../config/Constant";

export const model = {
  enviDefault: {
    api_url: "https://api.rhapsodie.co/",
    app_version: 1,
    environment: "staging",
    force_update: "yes",
    location_version: 1,
    update_constants: "yes",
  },
  userDefault: {
    name: "User",
    roleuser: "Manager",
    currentRole: Constant.ROLE_INLOGIN,
  },
};
