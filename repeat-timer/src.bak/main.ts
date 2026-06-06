import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app'; 

//import { platformBrowser } from '@angular/platform-browser';
//import { AppModule } from './app/app-module';


bootstrapApplication(App)
  .catch(err => console.error(err));


// platformBrowser().bootstrapModule(AppModule, {
  
// })
//   .catch(err => console.error(err));
