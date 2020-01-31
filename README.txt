HOW RUN THE PROJECT

1.
Download and install .NET Core 2.2
https://dotnet.microsoft.com/download/dotnet-core/2.2

In command line check version: dotnet --version


2. Download and install node.js: https://nodejs.org/en/

In command line check version: node --version


3. Check in command line NPM version (nuget package manager): npm --version

4. If you want, you can download and install Visual Studio Code.


5. [COMMAND LINE] Install in ~/PortalRowerowy.API/: (=> cd PortalRowerowy.API)

dotnet tool --global instal  dotnet-ef

dotnet ef database update (if it doesn't work, maybe database was created)


6. [COMMAND LINE] Install in ~/PortalRowerowy.SPA/: (=> cd PortalRowerowy.SPA)

npm install -g @angular/cli

ng g guard auth --spec

npm install @auth0/angular-jwt

npm install ngx-bootstrap --save

npm install bootswatch

npm install alertifyjs --save

npm install bootstrap font-awesome

npm install ngx-gallery --save

NALEŻY RÓWNIEŻ DOKONAĆ ZMIAN W APP.MODULE.TS

import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
"PROVIDERS"
      {
         provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig
      },


7. RUN:

in ~/PortalRowerowy.SPA: ng serve --watch

http://localhost:4200/

in ~/PortalRowerowy.API: dotnet watch run 

http://localhost:5000
