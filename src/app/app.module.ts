import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { LinkifyPipe } from './linkify.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { ContentComponent } from './content/content.component';
import { ChatComponent } from './chat/chat.component';
import { routes } from './app.routing';
import { ConversationComponent } from './conversation/conversation.component';
import { ProfileComponent } from './profile/profile.component';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyA5UVtY4RH6xTsvpHiNK-y6vCRTdf0bwqg',
  authDomain: 'quien-ba643.firebaseapp.com',
  databaseURL: 'https://quien-ba643.firebaseio.com/',
  storageBucket: 'gs://quien-ba643.appspot.com',
  messagingSenderId: ''
};


@NgModule({
  declarations: [
    AppComponent,
    LinkifyPipe,
    NavbarComponent,
    WelcomeComponent,
    LoginComponent,
    ContentComponent,
    ChatComponent,
    ConversationComponent,
    ProfileComponent
  ],
  imports: [
    routes,
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
