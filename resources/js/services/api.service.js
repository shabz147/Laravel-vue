import axios from "axios";

const ApiService = {
  init() {
    axios.defaults.baseURL =  "http://127.0.0.1:8000";
    axios.defaults.headers['Access-Control-Allow-Origin'] = "*";
    axios.defaults.headers['Access-Control-Allow-Headers'] = "*";
    axios.defaults.headers['Access-Control-Allow-Methods'] = "*";
    axios.defaults.headers['Content-Type'] = "application/json";
    axios.defaults.headers["Authorization"] = "Bearer " + localStorage.getItem("auth_token");
    let token = document.head.querySelector('meta[name="csrf-token"]');
    if (token) {
      axios.defaults.headers["X-CSRF-TOKEN"] = token.content;
    } else {
      console.error(
        "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"
      );
    }
  },

  setAuthToken(){
    axios.defaults.headers["Authorization"] = "Bearer " + localStorage.getItem("auth_token");
  }
  ,
  get(resource, params=[]) {
    this.init();
    return axios.get(resource, params)
  },

  post(resource, params = []) {
    try{
      this.init();
      return axios.post(`${resource}`, params)
    }catch(error){
      console.log(error);
    }

  },

  body(resource, params = []) {
    this.init();
    axios.defaults.headers.common['Content-Type'] = "multipart/form-data";
    return axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    this.init();
    return axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    this.init();
    return axios.put(`${resource}`, params);
  },


  delete(resource) {
    this.init();
    return axios.delete(resource)
  }
};

export default ApiService;
