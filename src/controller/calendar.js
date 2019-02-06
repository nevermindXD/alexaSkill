import { google } from 'googleapis';

let privateKey = {
    'type': 'service_account',
    'project_id': '',
    'private_key_id': '',
    'private_key': '',
    'client_email': '',
    'client_id': '',
    'auth_uri': '',
    'token_uri': '',
    'auth_provider_x509_cert_url': '',
    'client_x509_cert_url': ''
};

export const calendar  = (info) => {
    let calendar = google.calendar('v3');

    let jwtClient = new google.auth.JWT(
        privatekey.client_email,
        null,
        privateKey.private_key,
        ['https://www.googleapis.com/auth/calendar']
    );

    jwtClient.authorize (function (err, tokens) {
        if(err){
            console.log(err);
            return;
        }else{
            console.log('Successfully connected!')
        }
    })

    var event = {
        summary: 'Servicio de Jardineria',
        location,
        description: 'Servicio de Jardineria',
        'start': {
            'dateTime': '',
            'timeZone': 'America/Mexico_City'
        },
        'end': {
            'dateTime': '',
            'timeZone': 'America/Mexico_City'
        },
        'attendees': [
            { 'email': '' },
            { 'email': 'nevermindjc@gmail.com' }
        ],
        'reminders':{
            'useDefault': false,
            'overrides': [
                { 'method': 'email', 'minute': 24*60 },
                { 'method': 'popup', 'minutes': 120 }
            ]
        }
    };

    calendar.events.insert({
        auth: jwtClient,
        caledarId: 'primary',
        resource: event,
        sendNotifications: true,
    }, function(err, event) {
        if(err) {
            console.log('there was an error with the server');
            return;
        }
        return event;
    });

};