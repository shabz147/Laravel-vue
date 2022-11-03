let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export default {

  convert(param) {
    const val = param.split(" ");
    let mon = val[0].split("-");
    const month = months[parseInt(mon[1]) - 1];
    mon = mon[2] + "-" + month + "-" + mon[0];
    const rlt = mon + " " + val[1];
    return rlt;
  },

  // to get authenticated user data
  authUser() {
    return ApiService
      .get("/api/auth/user")
      .then(response => response.data)
      .then(response => {
        return response;
      })
      .catch(error => {
        this.showDataErrorMsg(error);
      });
  },

  // to check for authenticated user
  check() {
    return ApiService
      .post("/api/auth/check")
      .then(response => response.data)
      .then(response => {
        store.dispatch("setConfig", response.config);
        store.dispatch("setShopStatus", response.shop);
        store.dispatch("setPublishKey", response.publish_key);
        store.dispatch("setMinimumOrderQuantity", response.minimumHoodieOrderQty);
        store.dispatch("setHoodieAssets", response.hoodie_assets_dir);
        store.dispatch("setXmasAssets", response.xmas_assets_dir);
        store.dispatch("setProductInfo", response.products_info);

        // if(response.ip_restricted)
        //     localStorage.setItem('ip_restricted',true);
        // else
        //     localStorage.removeItem('ip_restricted');
        if (response.authenticated) {
          store.dispatch("setAuthUserDetail", {
            id: response.user.user_id,
            user_title: response.user.user_title,
            first_name: response.user.user_fname,
            last_name: response.user.user_lname,
            email: response.user.user_email,
            user_type: response.user.user_type
          });

          // store.dispatch("setPermission", 0);
          // store.dispatch('setDefaultRole',0);

          this.setLastActivity();
        } else {
          store.dispatch("resetAuthUserDetail");
        }

        return response.authenticated;
      })
      .catch(error => {
        store.dispatch("resetAuthUserDetail");
        store.dispatch("resetConfig");
      });
  },

  // to set notification position
  notification() {
    var notificationPosition =
      this.getConfig("notification_position") || "toast-top-right";
    toastr.options = {
      positionClass: notificationPosition
    };
    this.setLastActivity();

    $("[data-toastr]").on("click", function() {
      var type = $(this).data("toastr"),
        message = $(this).data("message"),
        title = $(this).data("title");
      toastr[type](message, title);
    });
  },

  setLastActivity() {
    if (!this.isScreenLocked()) store.dispatch("setLastActivity");
  },

  // to check for last activity time and lock/unlock screen
  isScreenLocked() {
    let last_activity = this.getLastActivity();
    let lock_screen_timeout = this.getConfig("lock_screen_timeout");
    let last_activity_after_timeout = moment(last_activity)
      .add(lock_screen_timeout, "minutes")
      .format("LLL");
    return moment().format("LLL") > last_activity_after_timeout;
  },

  // to append filter variables in the URL
  getFilterURL(data) {
    let url = "";
    $.each(data, function(key, value) {
      url += value ? "&" + key + "=" + encodeURI(value) : "";
    });
    return url;
  },

  getTwoFactorCode() {
    return store.getters.getTwoFactorCode;
  },

  getLastActivity() {
    return store.getters.getLastActivity;
  },

  // to get Auth Status
  isAuth() {
    return store.getters.getAuthStatus;
  },

  // to get Auth user detail
  getAuthUser(name) {
    if (name === "full_name")
      return (
        store.getters.getAuthUser("first_name") +
        " " +
        store.getters.getAuthUser("last_name")
      );
    else if (name === "full_name_with_title")
      return (
        store.getters.getAuthUser("user_title") +
        " " +
        store.getters.getAuthUser("first_name") +
        " " +
        store.getters.getAuthUser("last_name")
      );
    else if (name === "avatar") {
      if (store.getters.getAuthUser("avatar"))
        return "/" + store.getters.getAuthUser("avatar");
      else return "/images/avatar.png";
    } else return store.getters.getAuthUser(name);
  },

  // to get User avatar
  getAvatar(user) {
    if (user && user.profile.avatar) return "/" + user.profile.avatar;
    else return "/images/avatar.png";
  },

  // to get config
  getConfig(config) {
    return store.getters.getConfig(config);
  },

  // to get config
  getShopStatus() {
    return store.state.shopStatus;
  },

  // to get default role name of system
  getDefaultRole(role) {
    return store.getters.getDefaultRole(role);
  },

  // to check role of authenticated user
  hasRole(role) {
    return store.getters.hasRole(this.getDefaultRole(role));
  },

  // to check permission for authenticated user
  hasPermission(permission) {
    return store.getters.hasPermission(permission);
  },

  // to check Admin role
  hasAdminRole() {
    if (this.hasRole("admin")) return 1;
    else return 0;
  },

  // to check whether a given user has given role
  userHasRole(user, role_name) {
    if (!user.roles) return false;

    let user_role = user.roles.filter(
      role => role.name === this.getDefaultRole(role_name)
    );
    if (user_role.length) return true;
    return false;
  },

  // to check feature is available or not
  featureAvailable(feature) {
    return this.getConfig(feature);
  },

  // returns not accessible message if permission is denied
  notAccessibleMsg() {
    toastr.error(i18n.permission.permission_denied);
  },

  // returns feature not available message if permission is denied
  featureNotAvailableMsg() {
    toastr.error(i18n.general.feature_not_available);
  },

  // returns user status
  getUserStatus(user) {
    let status = [];

    if (user.status === "activated")
      status.push({ color: "success", label: i18n.user.status_activated });
    else if (user.status === "pending_activation")
      status.push({
        color: "warning",
        label: i18n.user.status_pending_activation
      });
    else if (user.status === "pending_approval")
      status.push({
        color: "warning",
        label: i18n.user.status_pending_approval
      });
    else if (user.status === "banned")
      status.push({ color: "danger", label: i18n.user.status_banned });
    else if (user.status === "disapproved")
      status.push({ color: "danger", label: i18n.user.status_disapproved });

    return status;
  },

  // to mass assign one object in another object
  formAssign(form, data) {
    for (let key of Object.keys(form)) {
      if (
        key !== "originalData" &&
        key !== "errors" &&
        key !== "autoReset" &&
        key !== "providers"
      ) {
        form[key] = data[key] || "";
      }
    }
    return form;
  },

  convertCodes(code) {
    let rlt = "";
    for (let i = 0; i < code.length; i += 1) {
      rlt += code[i].toString();
      if (i != code.length - 1) {
        rlt += ",";
      }
    }
    return rlt;
  },
  formatDateForTicketHeader(date) {
    if (!date) return;
    return moment(date).format("Do MMMM YYYY");
  },
  formatDateForTicketThreads(date) {
    if (!date) return;
    return moment(date).format("DD MMM YYYY hh:mm:ss");
  },
  // to get date in desired format
  formatDate(date) {
    if (!date) return;
    return moment(date).format(this.getConfig("date_format"));
  },
  formatHoodieDateForEdit(date) {
    if (!date) return;
    return new Date(moment.utc(date).format('YYYY MM DD'));
  },
  formatYear(date) {
    if (!date) return;
    return moment.utc(date).format('YYYY');
  },
  formatHoodieDateForUpdate(date) {
    if (!date) return;
    return moment(date).format('YYYY/MM/DD');
  },
  formatDateForBackend(date) {
    if (!date) return;
    return moment(date).format('YYYY-MM-DD');
  },
  formatHoodieDate(date) {
    if (!date) return;
    return moment(date).format('DD/MM/YYYY');
  },

  formatDateToString(date) {
    if (!date) return;
    return moment(date).format(this.getConfig("date_format_string"));
  },

  formatDateToString2(date) {
    if (!date) return;
    return moment(date).format(this.getConfig("date_format_string2"));
  },
  
  formatCurrentDateForSearch() {
    let date = new Date;
    return moment(date).format('DD-MMM-YYYY');
  },

  // to get date time in desired format
  formatDateTime(date) {
    if (!date) return;

    var date_format = this.getConfig("date_format");
    var time_format = this.getConfig("time_format");

    return moment(date).format(date_format + " " + time_format);
  },

  // to get date time in desired format
  formatDateTimeToDispaly(date) {
    if (!date) return;
    return moment(date).format('ddd Do MMM YYYY HH:mm:ss');
  },

  // to get time from now
  formatDateTimeFromNow(datetime) {
    if (!datetime) return;

    return moment(datetime).fromNow();
  },

  // to change first character of every word to upper case
  ucword(value) {
    if (!value) return;

    return value.toLowerCase().replace(/\b[a-z]/g, function(value) {
      return value.toUpperCase();
    });
  },

  // to change string into human readable format
  toWord(value) {
    if (!value) return;

    value = value.replace(/-/g, " ");
    value = value.replace(/_/g, " ");

    return value.toLowerCase().replace(/\b[a-z]/g, function(value) {
      return value.toUpperCase();
    });
  },

  // shows toastr notification for ApiService request
  showDataErrorMsg(error) {
    this.setLastActivity();

    if (error.hasOwnProperty("error")) {
      if (error.error.indexOf(" ") >= 0) toastr.error(error.error);
      else toastr.error(i18n.general[error.error]);

      if (error.error === "token_expired") router.push("/login");
    } else if (
      error.hasOwnProperty("response") &&
      error.response.status == 403
    ) {
      toastr.error(i18n.general.permission_denied);
    } else if (
      error.hasOwnProperty("response") &&
      error.response.status == 422 &&
      error.response.data.hasOwnProperty("error")
    ) {
      toastr.error(error.response.data.error);
    } else if (
      error.hasOwnProperty("response") &&
      error.response.status == 404
    ) {
      toastr.error(i18n.general.invalid_link);
    } else if (error.response.data.errors.hasOwnProperty("message"))
      toastr.error(error.response.data.errors.message[0]);
  },

  // returns error message for ApiService request
  fetchDataErrorMsg(error) {
    if (error.response.data.errors.email !== undefined)
      return error.response.data.errors.email[0];
    if (error.response.data.errors.message !== undefined)
      return error.response.data.errors.message[0];
  },

  // shows toastr notification for ApiService form request
  showErrorMsg(error) {
    this.setLastActivity();
    if (error.hasOwnProperty("error") || error.hasOwnProperty("errors")) {
      if (error.error.indexOf(" ") >= 0) toastr.error(error.error);
      else toastr.error(i18n.general[error.error]);
      if (error.error === "token_expired") router.push("/login");
    } else if (
      error.hasOwnProperty("response") &&
      error.response.status == 403
    ) {
      toastr.error(i18n.general.permission_denied);
    } else if (
      error.hasOwnProperty("response") &&
      error.response.status == 422 &&
      error.response.data.hasOwnProperty("error")
    ) {
      toastr.error(error.response.data.error);
    } else if (
      error.hasOwnProperty("response") &&
      error.response.status == 422 &&
      error.response.data.hasOwnProperty("errors")
    ) {
      if (error.response.data.errors.hasOwnProperty("message")) {
        toastr.error(error.response.data.errors["message"][0]);
      } else {
        toastr.error(error.response.data.message);
      }
    } else if (
      error.hasOwnProperty("response") &&
      error.response.status == 404
    ) {
      toastr.error(i18n.general.invalid_link);
    } else if (error.errors.hasOwnProperty("message"))
      toastr.error(error.errors.message[0]);
  },

  // returns error message for ApiService form request
  fetchErrorMsg(error) {
    return error.errors.message[0];
  },

  // round numbers as given precision
  roundNumber(number, precision) {
    precision = Math.abs(parseInt(precision)) || 0;
    var multiplier = Math.pow(10, precision);
    return Math.round(number * multiplier) / multiplier;
  },

  // round numbers as given precision
  formatNumber(number, decimal_place) {
    if (decimal_place === undefined) decimal_place = 2;
    return this.roundNumber(number, decimal_place);
  },

  // fill number with padding
  formatWithPadding(n, width, z) {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  },

  // generates random string of certain length
  randomString(length) {
    if (length === undefined) length = 40;
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
};
