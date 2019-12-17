module.exports = {
    APP_PORT: 7000,
    MEDIA_DIRECTORY: './src/public/uploads',
    LANGS: {
        en:'English',
        zh:'Chinese',
        nl:'Dutch',
        sp:'Spanish',
        ru:'Russian',
        fr:'Frensh'
    },
    FORMATS:{
        video: ['video/mp4'],
        images: ['image/jpeg','image/png'],
        audio: ['audio/mp3'],
        captions: ['text/vtt', 'application/octet-stream'],
    }
}