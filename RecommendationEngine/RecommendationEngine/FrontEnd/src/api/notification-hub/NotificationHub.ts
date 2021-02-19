import * as signalR from '@microsoft/signalr';

export default class NotificationHub {
  private static instance: NotificationHub;
  private hubConnection: signalR.HubConnection;

  private constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('/notificationhub', {
        accessTokenFactory: () => 'Koooohoooookoooooo',
      })
      .build();

    // Starts the SignalR connection
    this.hubConnection
      .start()
      .catch(() =>
        console.log('Error connecting to notificationhub websocket!')
      );
  }

  public static getHubConnection(): signalR.HubConnection {
    if (!NotificationHub.instance) {
      NotificationHub.instance = new NotificationHub();
    }

    return NotificationHub.instance.hubConnection;
  }
}
