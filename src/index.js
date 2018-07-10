import {initRequestMIDIAccess} from './winrtWebMIDI/index.js';
import { EventTarget, defineEventAttribute } from 'event-target-shim';

if (window.Windows) {
  initRequestMIDIAccess()
}



function onMIDISuccess( midiAccess ) {
  console.log( "MIDI ready!" );
  window.midi = midiAccess
  
  midiAccess.inputs.get('input-1')
}

function onMIDIFailure(msg) {
  console.log( "Failed to get MIDI access - " + msg );
}

navigator.requestMIDIAccess().then( onMIDISuccess, onMIDIFailure );