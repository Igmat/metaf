import { AbstractView, TouchList } from './AbstractView';
import * as NativeEvents from './NativeEvents';
//
// Event System
// ----------------------------------------------------------------------
export interface SyntheticEvent<T = Element> {
    bubbles: boolean;
    /**
     * A reference to the element on which the event listener is registered.
     */
    currentTarget: EventTarget & T;
    cancelable: boolean;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    nativeEvent: Event;
    // If you thought this should be `EventTarget & T`, see https://github.com/DefinitelyTyped/DefinitelyTyped/pull/12239
    /**
     * A reference to the element from which the event was originally dispatched.
     * This might be a child element to the element on which the event listener is registered.
     *
     * @see currentTarget
     */
    target: EventTarget;
    timeStamp: number;
    type: string;
    preventDefault(): void;
    isDefaultPrevented(): boolean;
    stopPropagation(): void;
    isPropagationStopped(): boolean;
    persist(): void;
}
export interface ClipboardEvent<T = Element> extends SyntheticEvent<T> {
    clipboardData: DataTransfer;
    nativeEvent: NativeEvents.NativeClipboardEvent;
}
export interface CompositionEvent<T = Element> extends SyntheticEvent<T> {
    data: string;
    nativeEvent: NativeEvents.NativeCompositionEvent;
}
export interface DragEvent<T = Element> extends MouseEvent<T> {
    dataTransfer: DataTransfer;
    nativeEvent: NativeEvents.NativeDragEvent;
}
export interface PointerEvent<T = Element> extends MouseEvent<T> {
    pointerId: number;
    pressure: number;
    tiltX: number;
    tiltY: number;
    width: number;
    height: number;
    pointerType: 'mouse' | 'pen' | 'touch';
    isPrimary: boolean;
    nativeEvent: NativeEvents.NativePointerEvent;
}
export interface FocusEvent<T = Element> extends SyntheticEvent<T> {
    nativeEvent: NativeEvents.NativeFocusEvent;
    relatedTarget: EventTarget;
    target: EventTarget & T;
}
// tslint:disable-next-line:no-empty-interface
export interface FormEvent<T = Element> extends SyntheticEvent<T> {
}
export interface ChangeEvent<T = Element> extends SyntheticEvent<T> {
    target: EventTarget & T;
}
export interface KeyboardEvent<T = Element> extends SyntheticEvent<T> {
    altKey: boolean;
    charCode: number;
    ctrlKey: boolean;
    /**
     * See the [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values). for possible values
     */
    key: string;
    keyCode: number;
    locale: string;
    location: number;
    metaKey: boolean;
    nativeEvent: NativeEvents.NativeKeyboardEvent;
    repeat: boolean;
    shiftKey: boolean;
    which: number;
    /**
     * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier).
     * for a list of valid (case-sensitive) arguments to this method.
     */
    getModifierState(key: string): boolean;
}
export interface MouseEvent<T = Element> extends SyntheticEvent<T> {
    altKey: boolean;
    button: number;
    buttons: number;
    clientX: number;
    clientY: number;
    ctrlKey: boolean;
    metaKey: boolean;
    nativeEvent: NativeEvents.NativeMouseEvent;
    pageX: number;
    pageY: number;
    relatedTarget: EventTarget;
    screenX: number;
    screenY: number;
    shiftKey: boolean;
    /**
     * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier).
     * for a list of valid (case-sensitive) arguments to this method.
     */
    getModifierState(key: string): boolean;
}
export interface TouchEvent<T = Element> extends SyntheticEvent<T> {
    altKey: boolean;
    changedTouches: TouchList;
    ctrlKey: boolean;
    metaKey: boolean;
    nativeEvent: NativeEvents.NativeTouchEvent;
    shiftKey: boolean;
    targetTouches: TouchList;
    touches: TouchList;
    /**
     * See [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#keys-modifier).
     * for a list of valid (case-sensitive) arguments to this method.
     */
    getModifierState(key: string): boolean;
}
export interface UIEvent<T = Element> extends SyntheticEvent<T> {
    detail: number;
    nativeEvent: NativeEvents.NativeUIEvent;
    view: AbstractView;
}
export interface WheelEvent<T = Element> extends MouseEvent<T> {
    deltaMode: number;
    deltaX: number;
    deltaY: number;
    deltaZ: number;
    nativeEvent: NativeEvents.NativeWheelEvent;
}
export interface AnimationEvent<T = Element> extends SyntheticEvent<T> {
    animationName: string;
    elapsedTime: number;
    nativeEvent: NativeEvents.NativeAnimationEvent;
    pseudoElement: string;
}
export interface TransitionEvent<T = Element> extends SyntheticEvent<T> {
    elapsedTime: number;
    nativeEvent: NativeEvents.NativeTransitionEvent;
    propertyName: string;
    pseudoElement: string;
}
