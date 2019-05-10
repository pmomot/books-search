import { Subject } from 'rxjs';

export function speechRecognition () {
    const result$ = new Subject();
    const recognition = window['webkitSpeechRecognition'] ? new window['webkitSpeechRecognition']() : new SpeechRecognition();
    recognition.lang = navigator.language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();

    recognition.onresult = event => {
        // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
        // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
        // It has a getter so it can be accessed like an array
        // The first [0] returns the SpeechRecognitionResult at position 0.
        // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
        // These also have getters so they can be accessed like arrays.
        // The second [0] returns the SpeechRecognitionAlternative at position 0.
        // We then return the transcript property of the SpeechRecognitionAlternative object
        const speechResult = event.results[0][0].transcript.toLowerCase();
        result$.next(speechResult);
        result$.complete();
    };

    recognition.onspeechend = () => {
        recognition.stop();
    };

    return result$;
}
