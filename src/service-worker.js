function unregisterServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      if (registrations.length) {
        for (let registration of registrations) {
          registration.unregister();
        }
      }
    });
  }
}

export default unregisterServiceWorker;
