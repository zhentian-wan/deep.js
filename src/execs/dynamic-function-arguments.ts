import { it } from 'vitest';

interface Events {
  click: {
    x: number;
    y: number;
  };
  focus: undefined;
}

export const sendEvent = <
  EventType extends keyof Events,
  EventPayload extends Events[EventType]
>(
  event: EventType,
  ...args: EventPayload extends undefined
    ? [payload?: undefined]
    : [payload: EventPayload]
) => {
  // Send the event somewhere!
};

it('Should force you to pass a second argument when you choose an event with a payload', () => {
  // @ts-expect-error
  sendEvent('click');

  sendEvent('click', {
    // @ts-expect-error
    x: 'oh dear',
  });

  sendEvent(
    'click',
    // @ts-expect-error
    {
      y: 1,
    }
  );

  sendEvent('click', {
    x: 1,
    y: 2,
  });
});

it('Should prevent you from passing a second argument when you choose an event without a payload', () => {
  sendEvent('focus');

  sendEvent(
    'focus',
    // @ts-expect-error
    {}
  );
});
