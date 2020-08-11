function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function getSubscribtion() {
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      return sub;
    } catch (err) {
      console.log('Error in getSubscribtion ', err);
      return null;
    }
  }
  return null;
}

export function subscribeToPush() {
  const publicKey = urlBase64ToUint8Array(
    'BJ9TCBKYU5q7uuPyhpU8vLzD2_V0FaKA4lvOD9jiRuJ56zAX2QUflgQyBkpDHcFeLGKZGQ7dAGq-SBKZ3NNUkLM'
  );

  navigator.serviceWorker.ready
    .then(function (reg) {
      reg.pushManager.getSubscription().then(sub => {
        if (sub === null) {
          reg.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: publicKey,
            })
            .then(sub => {})
            .catch(err => console.log('subscribeToPush Error 2 ' + err));
        } else {
          // We have a subscription, update the database
          // localStorage.setItem('sub', JSON.stringify(sub));
        }
      });
    })
    .catch(err => console.log('subscribeToPush Error 1 ' + err));
}
