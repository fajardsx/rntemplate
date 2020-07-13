//  NAME ROUTERS
export class ROUTE_NAME {
  static Screen_OnBoarding = "OnboardingScreen";
  static Screen_Authorize = "AuthorizeScreen";
  static Screen_FirstLogin = "FirstLoginScreen"; // USE ONLY FIRST
  static Screen_Apps = "AppsScreen";
  //TAB
  static TAB_SCREEN = "ScreenTab";
  static TAB_SCREEN_HOME = "Home";
  static TAB_SCREEN_PROFIL = "Profile";
  //LOGIN
  static LOGIN_SCREEN = "ScreenLogin";
  static SIGNUP_SCREEN = "Register";
  static FORGOT_SCREEN = "ForgotPass";
}
// NAME REST API
export class RESTKEY {
  static ENVI = "versioning";
  static API = {
    req_url: "api/options",
    login_rsa: "login",
    forgpass_rsa: "forgetpassword",
    req_profile: "profile",
    req_update: "updateprofile",
    req_photo: "updatephoto",
    req_about: "about",
    req_contact: "contact",
    req_setting: "setting",
    req_help: "faq",
    change_pass: "changepassword",
    req_notification: "notification",
    update_notification: "update_notif",
    search: "search",
    req_share: "share_log",
    req_schdule: "visit_schedule",
    set_schdule: "set_schedule",
    result_schdule: "schedule_result",
    unset_schdule: "unset_schedule",
    req_attend: "attend",
    req_attend_sync: "attend_sync",
    req_expense: "expense",
    get_dokters: "doctors",
    send_location: "set_location",
    list_location: "location_list",
    oneInit: "onesignal_init",
    logut_rsa: "logout",
    expenselist: "expense_list",
    notification_list: "notification_list",
    schedule_result: "schedule_result",
    schedule_photo: "photo",
    doktordetail: "doctor",
  };
}
