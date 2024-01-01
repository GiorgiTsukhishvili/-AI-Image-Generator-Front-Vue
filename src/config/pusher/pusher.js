import Echo from "laravel-echo";
import { axios } from "services";
import Pusher from "pusher-js";

export const pusher = () => {
  Pusher.Runtime.createXHR = function () {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    return xhr;
  };

  window.Echo = new Echo({
    broadcaster: "pusher",
    key: import.meta.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    cluster: import.meta.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    forceTLS: true,
    authorizer: (channel) => {
      return {
        authorize: (socketId, callback) => {
          axios
            .post("/api/broadcasting/auth", {
              socket_id: socketId,
              channel_name: channel.name,
            })
            .then((response) => {
              callback(null, response.data);
            })
            .catch((error) => {
              callback(error);
            });
        },
      };
    },
  });
};
