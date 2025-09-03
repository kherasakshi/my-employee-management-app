import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class NotificationService {
  
  requestNotificationPermission() {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        console.log('Notification permission:', permission);
        if (permission === 'granted') {
          console.log('Permission granted!');
        } else {
          localStorage.setItem('hrNotify', 'false');
          console.warn('Permission not granted or denied by user.');
        }
      });
    } else {
      console.warn('This browser does not support notifications.');
    }
  }

  showNotification(title: string, body: string) {
    const notificationEnabled = localStorage.getItem('hrNotify') === 'true';
    console.log('HR Notification Enabled', notificationEnabled);

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body: body,
        icon: 'human-resources-Image.webp',
      });
    } else {
      console.warn('Notification permission not granted');
    }
  }
}
