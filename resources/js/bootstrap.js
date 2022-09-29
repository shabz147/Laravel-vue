import _ from 'lodash';
window._ = _;

//axios
import axios from 'axios';
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';


import Swal from 'sweetalert2';
window.Swal = Swal;

import toastr from 'toastr';
windoe.toastr = toastr;

//bootstarp
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'