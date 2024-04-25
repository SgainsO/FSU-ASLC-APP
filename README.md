# FSU-ASLC-APP

## Getting Started

### Front-end


#### Prerequisites
- Clone the repository
- Ensure you have `NPM` installed on your machine.
- Download the `Expo Go` application on your mobile device.
- Make sure to install dependencies by going into the `client` folder and using `npm install`.

```bash
cd client
npm install
```

#### Creating an Expo Account
- Once you have installed the prequisites, you can create an account on the Expo Go mobile application, making sure to remember your login credentials to login on your desktop, using the following line and then entering your credentials:

```bash
npx expo login
```

#### Running the Code
- After logging in on both devices, ensure that they are both on the same Wi-Fi network. Then, you can start the Expo Go server locally and be able to see it on your Expo Go application.

```bash
npx expo start
### If that doesn't work use
npx expo start --tunnel
```

### Back-end
Follow these steps to run the client code on your machine:

Before starting server you must have access to the .env file and place it in the server folder 

#### Navigate to the /server/ folder
```
cd server

```
#### Installing Neccesary Modules
```
npm install
```

#### Starting Server
```
npm start
```

#### Change IP in line 6 of client/components/AxiosServices.js to your local IP
