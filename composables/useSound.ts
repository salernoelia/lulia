import {Howl, Howler} from 'howler';

export const useSound = (path) => {
    var sound = new Howl({
        src: [path]
    });
    return sound
}