import * as SyntheticEvents from './SyntheticEvents';
//
// Event Handler Types
// ----------------------------------------------------------------------
export type EventHandler<E extends SyntheticEvents.SyntheticEvent<unknown>> = {
    bivarianceHack(event: E): void;
}['bivarianceHack'];
export type MetaFEventHandler<T = Element> = EventHandler<SyntheticEvents.SyntheticEvent<T>>;
export type ClipboardEventHandler<T = Element> = EventHandler<SyntheticEvents.ClipboardEvent<T>>;
export type CompositionEventHandler<T = Element> = EventHandler<SyntheticEvents.CompositionEvent<T>>;
export type DragEventHandler<T = Element> = EventHandler<SyntheticEvents.DragEvent<T>>;
export type FocusEventHandler<T = Element> = EventHandler<SyntheticEvents.FocusEvent<T>>;
export type FormEventHandler<T = Element> = EventHandler<SyntheticEvents.FormEvent<T>>;
export type ChangeEventHandler<T = Element> = EventHandler<SyntheticEvents.ChangeEvent<T>>;
export type KeyboardEventHandler<T = Element> = EventHandler<SyntheticEvents.KeyboardEvent<T>>;
export type MouseEventHandler<T = Element> = EventHandler<SyntheticEvents.MouseEvent<T>>;
export type TouchEventHandler<T = Element> = EventHandler<SyntheticEvents.TouchEvent<T>>;
export type PointerEventHandler<T = Element> = EventHandler<SyntheticEvents.PointerEvent<T>>;
export type UIEventHandler<T = Element> = EventHandler<SyntheticEvents.UIEvent<T>>;
export type WheelEventHandler<T = Element> = EventHandler<SyntheticEvents.WheelEvent<T>>;
export type AnimationEventHandler<T = Element> = EventHandler<SyntheticEvents.AnimationEvent<T>>;
export type TransitionEventHandler<T = Element> = EventHandler<SyntheticEvents.TransitionEvent<T>>;
