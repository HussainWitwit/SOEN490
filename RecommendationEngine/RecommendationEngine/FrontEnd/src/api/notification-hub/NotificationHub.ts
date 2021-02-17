import * as signalR from "@microsoft/signalr";

class NotificationHub {
  private static instance: NotificationHub;

  private constructor() {
    const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("/notificationhub", {
      accessTokenFactory: () => 'Koooohoooookoooooo'
    })
    .build();
 
    // Starts the SignalR connection
    hubConnection.start();
   }

  public static getInstance(): NotificationHub {
      if (!NotificationHub.instance) {
        NotificationHub.instance = new NotificationHub();
      }

      return NotificationHub.instance;
  }

}

// useEffect(() => {
//   hubConnection.on("setTime", message => {
//     setTime(message);
//   });
// });