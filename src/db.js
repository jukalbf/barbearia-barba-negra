// fakeDatabase.js

export const fakeDB = {
    users: [
      {
        name: "João Silva",
        phoneNumber: "11999999999",
        appointments: [
          { service: "haircut", time: "10:00" },
          { service: "beard", time: "14:00" },
        ],
      },
    ],
  
    findUser(phoneNumber) {
      return this.users.find((user) => user.phoneNumber === phoneNumber);
    },
  
    addUser(user) {
      this.users.push({ ...user, appointments: [] });
    },
  
    addAppointment(phoneNumber, appointment) {
      const user = this.findUser(phoneNumber);
      if (user) {
        user.appointments.push(appointment);
      }
    },
  
    cancelAppointment(phoneNumber, index) {
      const user = this.findUser(phoneNumber);
      if (user) {
        user.appointments.splice(index, 1);
      }
    },
  };
  