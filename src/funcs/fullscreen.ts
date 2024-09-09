const requestFullscreenProps = [
  "requestFullScreen",
  "webkitRequestFullScreen",
  "mozRequestFullScreen",
  "msRequestFullScreen",
] as const;
const exitFullScreenProps = [
  "exitFullscreen",
  "webkitExitFullscreen",
  "mozCancelFullScreen",
  "msExitFullscreen",
] as const;
const fullscreenElementProps = [
  "fullscreenElement",
  "webkitFullscreenElement",
  "mozFullScreenElement",
  "msFullscreenElement",
] as const;

function getPropertyName<T extends string>(names: readonly T[], target: Node) {
  return names.find(function (name) {
    return name in target;
  });
}

const enterFullScreenName = getPropertyName(
  requestFullscreenProps,
  document.documentElement
);
export function enterFullscreen(el: Node) {
  enterFullScreenName && el[enterFullScreenName]();
}

const exitFullScreenName = getPropertyName(exitFullScreenProps, document);
export function exitFullscreen() {
  exitFullScreenName && document[exitFullScreenName]();
}

const fullEleName = getPropertyName(fullscreenElementProps, document);
export function fullscreenElement() {
  return (fullEleName && document[fullEleName]) || null;
}

export function isFullscreen() {
  return !!fullscreenElement();
}

export function toggleFullscreen(el: Node) {
  isFullscreen() ? exitFullscreen() : enterFullscreen(el);
}
