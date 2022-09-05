import axios from 'axios';
// const ax = axios.create({
//   baseUrl: 'http://127.0.0.1:3000/api/v1/',
// });

const getHeaders = () => {
  const user_jwt = localStorage.getItem('user_jwt');
  let headers;
  if (user_jwt) {
    headers = { Authorization: `Bearer ${user_jwt}` };
  }
  return headers;
};

const axGet = (url, params = {}) => {
  return axios.get('http://127.0.0.1:3000/api/v1/' + url, {
    params: params,
    headers: getHeaders(),
  });
};

const axPost = (url, params = {}) => {
  return axios.post('http://127.0.0.1:3000/api/v1/' + url, params, {
    headers: getHeaders(),
  });
};

const server = {
  getSitters(params = {}) {
    return axGet('sitters', params);
  },
  getSitter(id) {
    if (id) {
      return axGet('sitter', { id });
    } else {
      throw 'id need to be provided';
    }
  },
  register({ email, password, last_name, first_name, save } = {}) {
    return new Promise((resolve, reject) => {
      axPost('register', { email, password, first_name, last_name })
        .then((res) => {
          if (
            save !== false &&
            res.data &&
            res.data.success &&
            res.data.data.token
          ) {
            localStorage.setItem('user_jwt', res.data.data.token);
          }
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  login({ email, password, save } = {}) {
    return new Promise((resolve, reject) => {
      if (email && password) {
        axPost('login', { email, password })
          .then((res) => {
            if (
              save !== false &&
              res.data &&
              res.data.success &&
              res.data.data.token
            ) {
              localStorage.setItem('user_jwt', res.data.data.token);
            }
            resolve(res);
          })
          .catch((e) => {
            reject(e);
          });
      } else if (getHeaders) {
        axGet('user')
          .then((res) => {
            if (res.data && res.data.success && res.data.data.token) {
              localStorage.setItem('user_jwt', res.data.data.token);
            }
            resolve(res);
          })
          .catch((e) => {
            reject(e);
          });
      } else {
        reject('No credential provided');
      }
    });
  },
  reviewSave(params = {}) {
    return axPost('review/save', params);
  },
  reviewDelete(id) {
    return axPost('review/delete', { id });
  },
  petAdd(params = {}) {
    return axPost('pet/save', params);
  },
  petDelete(id) {
    return axPost('pet/delete', { id });
  },
  bookSave(params = {}) {
    return axPost('booking/save', {
      time: params.time,
      duration: params.duration,
      sitter_id: params.sitter_id,
      pets: params.pets,
    });
  },

  getBookings() {
    return axGet('bookings');
  },
  bookingDelete(id) {
    return axPost('booking/delete', { id });
  },
};

export default server;
