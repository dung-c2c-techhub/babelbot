const MIN_PAUSE_BETWEEN_MESSAGES = 1500;
const MAX_PAUSE_BETWEEN_MESSAGES = 6000;
const VARIABLE_PAUSE = 2000;
const DEFAULT_CHUNK_SIZE = 300;

const arrayify = (obj) => (Array.isArray(obj) ? obj : [obj]);

module.exports = (_send, options = {}) => {
  _send = _send.bind(null);
  const { chunkSize = DEFAULT_CHUNK_SIZE } = options;
  const pauseFunc = chunkSize > 0
    ? calcuatePauseForText
    : () => 0;

  return (payload) => {
    const { text } = payload;

    const payloadOptions = payload.options;
    // Delete special options from payload to show only in last message
    delete payload.options;

    if (!text) return _send(payload);
    const payloads = _chunk(text, chunkSize).map((text) => ({ ...payload, text }));

    payloads[payloads.length - 1].options = payloadOptions;
    return _chainPromiseWithArguments(_send, payloads, pauseFunc);
  };
};

function makeParagraphs(string, maxLength, terminators) {
  const terminatorArray = arrayify(terminators);

  const paragraphs = [];
  let startIndex = 0;
  let lastTerminatorIndex = 0;
  let lastBreakIndex = 0;

  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    lastBreakIndex = char.match(/\s/) ? i : lastBreakIndex;

    if (terminatorArray.indexOf(char) !== -1) {
      lastTerminatorIndex = i;
    }

    if (i - startIndex >= maxLength) {
      if (lastTerminatorIndex - startIndex < 10) {
        lastTerminatorIndex = lastBreakIndex;
      }
      if (lastTerminatorIndex === startIndex) {
        lastTerminatorIndex = maxLength;
      }
      paragraphs.push(string.slice(startIndex, lastTerminatorIndex + 1));
      startIndex = lastTerminatorIndex + 1;
    } else if (i === string.length - 1) {
      paragraphs.push(string.slice(startIndex));
    }
  }

  return paragraphs.map((e) => e.trim());
}

function calcuatePauseForText({ text }) {
  let pause = text.length * 10;
  pause = Math.max(Math.min(pause, MAX_PAUSE_BETWEEN_MESSAGES), MIN_PAUSE_BETWEEN_MESSAGES);
  pause += Math.random() * VARIABLE_PAUSE;
  return pause;
}

function _chainPromiseWithArguments(_promise, argArray, _pauseFunc) {
  const first = argArray[0];
  const rest = argArray.slice(1);

  if (rest.length === 0) {
    return _promise(first);
  }

  const delay = process.env.TAPE_TEST ? 0 : _pauseFunc ? _pauseFunc(first) : 0;

  return _promise(first)
    .then(() => _resolveAfter(delay))
    .then(() => _chainPromiseWithArguments(_promise, rest, _pauseFunc));
}

function _chunk(message, size) {
  if (Array.isArray(message)) {
    return message.reduce((pre, cur) => pre.concat(_chunk(cur, size)), []);
  } if (typeof message === 'string' && size > 0 && message.length > size) {
    return makeParagraphs(message, size, ['\n', ',']);
  }
  return [message];
}

function _resolveAfter(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, process.env.TAPE_TEST ? 0 : delay);
  });
}
