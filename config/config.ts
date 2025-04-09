
export const config = {
    PortBacklog: import.meta.env.VITE_PORT_BACKLOG || "http://localhost:3000/backlog",
    PortSprintList: import.meta.env.VITE_PORT_SPRINTLIST || "http://localhost:3000/sprintList",
  };