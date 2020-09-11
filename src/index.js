if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js').then(registration =>{
        console.log('Sw registered');
        console.log(registration);
        navigator.serviceWorker.onmessage = event => {
            const message = JSON.parse(event.data);
            //TODO: detect the type of message and refresh the view
          };
    }).catch(error =>{
        console.log('sw registration failed');
        console.log(error);
    });
}
