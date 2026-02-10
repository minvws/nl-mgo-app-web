export class MockWorker implements Worker {
    postMessage() {}
    terminate() {}
    addEventListener() {}
    removeEventListener() {}
    dispatchEvent() {
        return false;
    }
    onerror() {}
    onmessage() {}
    onmessageerror() {}
}
