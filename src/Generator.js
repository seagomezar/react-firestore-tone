export const MAJOR_SCALES = {
    "C": ["C1", "D1", "E1", "F1", "G1", "A1", "B1", "C2"],
    "D": ["D1", "E1", "F#1", "G1", "A1", "B1", "C#2", "D2"],
    "E": ["E1", "F#1", "G#1", "A1", "B1", "C#2", "D#2", "E2"],
    "F": ["F1", "G1", "A1", "A#1", "C2", "D2", "E2", "F2"],
    "G": ["G1", "A1", "B1", "C2", "D2", "E2", "F#2", "G2"],
    "A": ["A1", "B1", "C#2", "D2", "E2", "F#2", "G#2", "A2"],
    "B": ["B1", "C#2", "D#2", "E2", "F#2", "G#2", "A#2", "B2"],
    "F#" : ["F#1", "G#1", "A#1", "C#2", "D#2", "E#2", "F2"],
};

export let CURRENT_SOUNDS = setScale(MAJOR_SCALES["C"], 4);
export const ALL_DURATIONS = [2, 1, 0.5];

function setScale(scale, octave) {
    let setOfNotes = scale.map(e => {
        return e.replace("2", octave+1).replace("1", octave);
    });
    return setOfNotes;
}

export function generateMusicAndTempo(duration) {
    const song = [];
    let currentTempo = 0;
    while (currentTempo < duration) {
        const tempo = getRandomFigure(ALL_DURATIONS);
        let figure = '1q';
        currentTempo += tempo;
        song.push(["0:" + currentTempo, getRandomNote(CURRENT_SOUNDS), figure]);
    }
    return song;
}

function getRandomFigure(possibleFigures) {
    let randomTempo = Math.floor(possibleFigures.length - Math.random() * possibleFigures.length);
    return possibleFigures[randomTempo];
}

function getRandomNote(posibleNotes) {
    let randomNote = Math.floor(posibleNotes.length - Math.random() * posibleNotes.length);
    return posibleNotes[randomNote];
}