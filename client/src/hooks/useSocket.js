import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
    const client = io(socketUrl, {
      transports: ["websocket", "polling"]
    });
    setSocket(client);

    return () => client.disconnect();
  }, []);

  return socket;
};
