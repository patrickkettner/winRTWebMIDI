import {initMIDIAccess} from './MIDIAccess.js';
import {DOMException} from 'w3c-domcore-errors';

function catchOnBeforeUnloadException(reject) {
  reject(new DOMException('AbortError'))
}

let initRequestMIDIAccess = () => {
  // SPEC: http://webaudio.github.io/web-midi-api/
  
  // don't polyfill a native impl
  if (!('requestMIDIAccess' in navigator)) {
      // SPEC: http://webaudio.github.io/web-midi-api/#dom-navigator-requestmidiaccess
      let requestMIDIAccess = (MIDIOptions) => {
      
      // SPEC: When invoked, returns a Promise object representing a request for access to MIDI devices on the user's system.
        
      // SPEC: Requesting MIDI access SHOULD prompt the user for access to MIDI devices, particularly if system exclusive access is requested. 
      //       In some scenarios, this permission may have already been implicitly or explicitly granted, in which case this prompt may not appear.
      //       If the user gives express permission or the call is otherwise approved, the vended Promise is resolved. The underlying system may
      //       choose to allow the user to select specific MIDI interfaces to expose to this API (i.e. pick and choose interfaces on an individual
      //       basis), although this is not required. The system may also choose to prompt (or not) based on whether system exclusive support
      //       is requested, as system exclusive access has greater privacy and security implications.
      //
      //       If the user declines or the call is denied for any other reason, the Promise is rejected with a DOMException parameter.

      // SPEC: When the requestMIDIAccess method is called, the user agent MUST run the algorithm to request MIDI Access:
      //       1. Let promise be a new Promise object and resolver be its associated resolver.
      //       2. Return promise and run the following steps asynchronously.
      return new Promise(async(resolve, reject) => {
      //       3. Let document be the calling context's Document.
      //       4. If document is not allowed to use the policy-controlled feature named midi, jump to the step labeled failure below.
      // note: We don't have Feature Policy, but as the WinRT api is gated by domain, we will treat it as the equivalent
      //
      //       5. Optionally, e.g. based on a previously-established user preference, for security reasons, or due to platform limitations, jump to the step labeled failure below.
      if (!!window.Windows.Devices.Midi) {
      //       6. Optionally, e.g. based on a previously-established user preference, jump to the step labeled success below.
      //       7. Prompt the user in a user-agent-specific manner for permission to provide the entry script's origin with a MIDIAccess object
      //          representing control over user's MIDI devices. This prompt may be contingent upon whether system exclusive support was requested,
      //          and may allow the user to enable or disable that access.
      // TODO: For now, installing an app is enough of a permission to be implicit approval. Would be great to get a permission flow, however.
      //       8. success: Let access be a new MIDIAccess object.( It is possible to call requestMIDIAccess() multiple times; this may prompt
      //          the user multiple times, so it may not be best practice, and the same instance of MIDIAccess will not be returned each time.)
        let access;

        // Note: see step 11
        window.addEventListener('beforeunload', () => {catchOnBeforeUnloadException(reject)})
        
        try {
          let MIDIAccess = await initMIDIAccess(MIDIOptions)
          access = new MIDIAccess(MIDIOptions)
        } catch (e) {
          // Note: see `InvalidStateError` section of step 11
          let err = new DOMException(`InvalidStateError - ${e.message}`)
          return reject(err)
        }
        
      //       9. Call resolver's accept(value) method with access as value argument.
        resolve(access)
        
        // Note: remove the listener for the `AbortError` section of step 11
        window.removeEventListener('beforeunload', () => {catchOnBeforeUnloadException(reject)})
      //       10. Terminate these steps.
      } else {
      //       11. failure: Let error be a new DOMException.
        let name;
        if (false) {
      //       This exception's name should be "SecurityError" if the user or their security settings denied the application from creating a
      //       MIDIAccess instance with the requested options, or if the error is the result of document not being allowed to use the feature
      // I cant figure out a case in which that would occur under the WinRT env, so just writing off as a noop for now
          name = "SecurityError"
        } else if (false) {
      //       "AbortError" if the page is going to be closed for a user navigation,
      // This is handeled up above, in order to ensure the listener is in place before and after the request is resolved
        } else if (false) {
      //       "InvalidStateError" if the underlying systems raise any errors
      // Note: handeled above
        } else {
      //       or otherwise it should be "NotSupportedError".
          name = "NotSupportedError"
        }
      //       12. Call resolver's reject(value) method with error as value argument.
          reject(new DOMException(name))
      }
      })
    }
    
    Object.defineProperty(requestMIDIAccess, 'toString', {
      value: () => 'function requestMIDIAccess() { [native code] }'
    })
    
    // SPEC: http://webaudio.github.io/web-midi-api/#x4-2-extensions-to-the-navigator-interface
    navigator.requestMIDIAccess = requestMIDIAccess
  }
}

export { initRequestMIDIAccess }