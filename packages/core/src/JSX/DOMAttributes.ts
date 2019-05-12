// tslint:disable:max-file-line-count
import * as CSS from 'csstype';
import * as EventHandlers from './EventHandlers';

//
// Props / DOM Attributes
// ----------------------------------------------------------------------
export interface DOMAttributes<T> {
    // Clipboard Events
    onCopy?: EventHandlers.ClipboardEventHandler<T>;
    onCut?: EventHandlers.ClipboardEventHandler<T>;
    onPaste?: EventHandlers.ClipboardEventHandler<T>;
    // Composition Events
    onCompositionEnd?: EventHandlers.CompositionEventHandler<T>;
    onCompositionStart?: EventHandlers.CompositionEventHandler<T>;
    onCompositionUpdate?: EventHandlers.CompositionEventHandler<T>;
    // Focus Events
    onFocus?: EventHandlers.FocusEventHandler<T>;
    onBlur?: EventHandlers.FocusEventHandler<T>;
    // Form Events
    onChange?: EventHandlers.FormEventHandler<T>;
    onInput?: EventHandlers.FormEventHandler<T>;
    onReset?: EventHandlers.FormEventHandler<T>;
    onSubmit?: EventHandlers.FormEventHandler<T>;
    onInvalid?: EventHandlers.FormEventHandler<T>;
    // Image Events
    onLoad?: EventHandlers.MetaFEventHandler<T>;
    onError?: EventHandlers.MetaFEventHandler<T>; // also a Media Event
    // Keyboard Events
    onKeyDown?: EventHandlers.KeyboardEventHandler<T>;
    onKeyPress?: EventHandlers.KeyboardEventHandler<T>;
    onKeyUp?: EventHandlers.KeyboardEventHandler<T>;
    // Media Events
    onAbort?: EventHandlers.MetaFEventHandler<T>;
    onCanPlay?: EventHandlers.MetaFEventHandler<T>;
    onCanPlayThrough?: EventHandlers.MetaFEventHandler<T>;
    onDurationChange?: EventHandlers.MetaFEventHandler<T>;
    onEmptied?: EventHandlers.MetaFEventHandler<T>;
    onEncrypted?: EventHandlers.MetaFEventHandler<T>;
    onEnded?: EventHandlers.MetaFEventHandler<T>;
    onLoadedData?: EventHandlers.MetaFEventHandler<T>;
    onLoadedMetadata?: EventHandlers.MetaFEventHandler<T>;
    onLoadStart?: EventHandlers.MetaFEventHandler<T>;
    onPause?: EventHandlers.MetaFEventHandler<T>;
    onPlay?: EventHandlers.MetaFEventHandler<T>;
    onPlaying?: EventHandlers.MetaFEventHandler<T>;
    onProgress?: EventHandlers.MetaFEventHandler<T>;
    onRateChange?: EventHandlers.MetaFEventHandler<T>;
    onSeeked?: EventHandlers.MetaFEventHandler<T>;
    onSeeking?: EventHandlers.MetaFEventHandler<T>;
    onStalled?: EventHandlers.MetaFEventHandler<T>;
    onSuspend?: EventHandlers.MetaFEventHandler<T>;
    onTimeUpdate?: EventHandlers.MetaFEventHandler<T>;
    onVolumeChange?: EventHandlers.MetaFEventHandler<T>;
    onWaiting?: EventHandlers.MetaFEventHandler<T>;
    // MouseEvents
    onClick?: EventHandlers.MouseEventHandler<T>;
    onContextMenu?: EventHandlers.MouseEventHandler<T>;
    onDoubleClick?: EventHandlers.MouseEventHandler<T>;
    onDrag?: EventHandlers.DragEventHandler<T>;
    onDragEnd?: EventHandlers.DragEventHandler<T>;
    onDragEnter?: EventHandlers.DragEventHandler<T>;
    onDragExit?: EventHandlers.DragEventHandler<T>;
    onDragLeave?: EventHandlers.DragEventHandler<T>;
    onDragOver?: EventHandlers.DragEventHandler<T>;
    onDragStart?: EventHandlers.DragEventHandler<T>;
    onDrop?: EventHandlers.DragEventHandler<T>;
    onMouseDown?: EventHandlers.MouseEventHandler<T>;
    onMouseEnter?: EventHandlers.MouseEventHandler<T>;
    onMouseLeave?: EventHandlers.MouseEventHandler<T>;
    onMouseMove?: EventHandlers.MouseEventHandler<T>;
    onMouseOut?: EventHandlers.MouseEventHandler<T>;
    onMouseOver?: EventHandlers.MouseEventHandler<T>;
    onMouseUp?: EventHandlers.MouseEventHandler<T>;
    // Selection Events
    onSelect?: EventHandlers.MetaFEventHandler<T>;
    // Touch Events
    onTouchCancel?: EventHandlers.TouchEventHandler<T>;
    onTouchEnd?: EventHandlers.TouchEventHandler<T>;
    onTouchMove?: EventHandlers.TouchEventHandler<T>;
    onTouchStart?: EventHandlers.TouchEventHandler<T>;
    // Pointer Events
    onPointerDown?: EventHandlers.PointerEventHandler<T>;
    onPointerMove?: EventHandlers.PointerEventHandler<T>;
    onPointerUp?: EventHandlers.PointerEventHandler<T>;
    onPointerCancel?: EventHandlers.PointerEventHandler<T>;
    onPointerEnter?: EventHandlers.PointerEventHandler<T>;
    onPointerLeave?: EventHandlers.PointerEventHandler<T>;
    onPointerOver?: EventHandlers.PointerEventHandler<T>;
    onPointerOut?: EventHandlers.PointerEventHandler<T>;
    onGotPointerCapture?: EventHandlers.PointerEventHandler<T>;
    onLostPointerCapture?: EventHandlers.PointerEventHandler<T>;
    // UI Events
    onScroll?: EventHandlers.UIEventHandler<T>;
    // Wheel Events
    onWheel?: EventHandlers.WheelEventHandler<T>;
    // Animation Events
    onAnimationStart?: EventHandlers.AnimationEventHandler<T>;
    onAnimationEnd?: EventHandlers.AnimationEventHandler<T>;
    onAnimationIteration?: EventHandlers.AnimationEventHandler<T>;
    // Transition Events
    onTransitionEnd?: EventHandlers.TransitionEventHandler<T>;
}
export interface CSSProperties extends CSS.Properties<string | number> {
}
export interface HTMLAttributes<T> extends DOMAttributes<T> {
    // MetaF-specific Attributes
    defaultChecked?: boolean;
    defaultValue?: string | string[];
    suppressContentEditableWarning?: boolean;
    suppressHydrationWarning?: boolean;
    // Standard HTML Attributes
    accessKey?: string;
    class?: string;
    contentEditable?: boolean;
    contextMenu?: string;
    dir?: string;
    draggable?: boolean;
    hidden?: boolean;
    id?: string;
    lang?: string;
    placeholder?: string;
    slot?: string;
    spellCheck?: boolean;
    style?: CSSProperties;
    tabIndex?: number;
    title?: string;
    // Unknown
    inputMode?: string;
    is?: string;
    radioGroup?: string; // <command>, <menuitem>
    // WAI-ARIA
    role?: string;
    // RDFa Attributes
    about?: string;
    datatype?: string;
    inlist?: unknown;
    prefix?: string;
    property?: string;
    resource?: string;
    typeof?: string;
    vocab?: string;
    // Non-standard Attributes
    autoCapitalize?: string;
    autoCorrect?: string;
    autoSave?: string;
    color?: string;
    itemProp?: string;
    itemScope?: boolean;
    itemType?: string;
    itemID?: string;
    itemRef?: string;
    results?: number;
    security?: string;
    unselectable?: boolean;

    // All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/

    /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
    'aria-activedescendant'?: string;
    /**
     * Indicates whether assistive technologies will present all, or only parts of,
     * the changed region based on the change notifications defined by the aria-relevant attribute.
     */
    'aria-atomic'?: boolean | 'false' | 'true';
    /**
     * Indicates whether inputting text could trigger display of one or more predictions of
     * the user's intended value for an input and specifies how predictions would be
     * presented if they are made.
     */
    'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
    /**
     * Indicates an element is being modified and that assistive technologies MAY
     * want to wait until the modifications are complete before exposing them to the user.
     */
    'aria-busy'?: boolean | 'false' | 'true';
    /**
     * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
     * @see aria-pressed @see aria-selected.
     */
    'aria-checked'?: boolean | 'false' | 'mixed' | 'true';
    /**
     * Defines the total number of columns in a table, grid, or treegrid.
     * @see aria-colindex.
     */
    'aria-colcount'?: number;
    /**
     * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
     * @see aria-colcount @see aria-colspan.
     */
    'aria-colindex'?: number;
    /**
     * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-colindex @see aria-rowspan.
     */
    'aria-colspan'?: number;
    /**
     * Identifies the element (or elements) whose contents or presence are controlled by the current element.
     * @see aria-owns.
     */
    'aria-controls'?: string;
    /** Indicates the element that represents the current item within a container or set of related elements. */
    'aria-current'?: boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time';
    /**
     * Identifies the element (or elements) that describes the object.
     * @see aria-labelledby
     */
    'aria-describedby'?: string;
    /**
     * Identifies the element that provides a detailed, extended description for the object.
     * @see aria-describedby.
     */
    'aria-details'?: string;
    /**
     * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
     * @see aria-hidden @see aria-readonly.
     */
    'aria-disabled'?: boolean | 'false' | 'true';
    /**
     * Indicates what functions can be performed when a dragged object is released on the drop target.
     * @deprecated in ARIA 1.1
     */
    'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup';
    /**
     * Identifies the element that provides an error message for the object.
     * @see aria-invalid @see aria-describedby.
     */
    'aria-errormessage'?: string;
    /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
    'aria-expanded'?: boolean | 'false' | 'true';
    /**
     * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
     * allows assistive technology to override the general default of reading in document source order.
     */
    'aria-flowto'?: string;
    /**
     * Indicates an element's "grabbed" state in a drag-and-drop operation.
     * @deprecated in ARIA 1.1
     */
    'aria-grabbed'?: boolean | 'false' | 'true';
    /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
    'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
    /**
     * Indicates whether the element is exposed to an accessibility API.
     * @see aria-disabled.
     */
    'aria-hidden'?: boolean | 'false' | 'true';
    /**
     * Indicates the entered value does not conform to the format expected by the application.
     * @see aria-errormessage.
     */
    'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling';
    /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
    'aria-keyshortcuts'?: string;
    /**
     * Defines a string value that labels the current element.
     * @see aria-labelledby.
     */
    'aria-label'?: string;
    /**
     * Identifies the element (or elements) that labels the current element.
     * @see aria-describedby.
     */
    'aria-labelledby'?: string;
    /** Defines the hierarchical level of an element within a structure. */
    'aria-level'?: number;
    /**
     * Indicates that an element will be updated, and describes the types
     * of updates the user agents, assistive technologies, and user can expect from the live region.
     */
    'aria-live'?: 'off' | 'assertive' | 'polite';
    /** Indicates whether an element is modal when displayed. */
    'aria-modal'?: boolean | 'false' | 'true';
    /** Indicates whether a text box accepts multiple lines of input or only a single line. */
    'aria-multiline'?: boolean | 'false' | 'true';
    /** Indicates that the user may select more than one item from the current selectable descendants. */
    'aria-multiselectable'?: boolean | 'false' | 'true';
    /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
    'aria-orientation'?: 'horizontal' | 'vertical';
    /**
     * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
     * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
     * @see aria-controls.
     */
    'aria-owns'?: string;
    /**
     * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
     * A hint could be a sample value or a brief description of the expected format.
     */
    'aria-placeholder'?: string;
    /**
     * Defines an element's number or position in the current set of listitems or treeitems.
     * Not required if all elements in the set are present in the DOM.
     * @see aria-setsize.
     */
    'aria-posinset'?: number;
    /**
     * Indicates the current "pressed" state of toggle buttons.
     * @see aria-checked @see aria-selected.
     */
    'aria-pressed'?: boolean | 'false' | 'mixed' | 'true';
    /**
     * Indicates that the element is not editable, but is otherwise operable.
     * @see aria-disabled.
     */
    'aria-readonly'?: boolean | 'false' | 'true';
    /**
     * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
     * @see aria-atomic.
     */
    'aria-relevant'?: 'additions' | 'additions text' | 'all' | 'removals' | 'text';
    /** Indicates that user input is required on the element before a form may be submitted. */
    'aria-required'?: boolean | 'false' | 'true';
    /** Defines a human-readable, author-localized description for the role of an element. */
    'aria-roledescription'?: string;
    /**
     * Defines the total number of rows in a table, grid, or treegrid.
     * @see aria-rowindex.
     */
    'aria-rowcount'?: number;
    /**
     * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
     * @see aria-rowcount @see aria-rowspan.
     */
    'aria-rowindex'?: number;
    /**
     * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-rowindex @see aria-colspan.
     */
    'aria-rowspan'?: number;
    /**
     * Indicates the current "selected" state of various widgets.
     * @see aria-checked @see aria-pressed.
     */
    'aria-selected'?: boolean | 'false' | 'true';
    /**
     * Defines the number of items in the current set of listitems or treeitems.
     * Not required if all elements in the set are present in the DOM.
     * @see aria-posinset.
     */
    'aria-setsize'?: number;
    /** Indicates if items in a table or grid are sorted in ascending or descending order. */
    'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other';
    /** Defines the maximum allowed value for a range widget. */
    'aria-valuemax'?: number;
    /** Defines the minimum allowed value for a range widget. */
    'aria-valuemin'?: number;
    /**
     * Defines the current value for a range widget.
     * @see aria-valuetext.
     */
    'aria-valuenow'?: number;
    /** Defines the human readable text alternative of aria-valuenow for a range widget. */
    'aria-valuetext'?: string;
}
export interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    download?: unknown;
    href?: string;
    hrefLang?: string;
    media?: string;
    rel?: string;
    target?: string;
    type?: string;
}
// tslint:disable-next-line:no-empty-interface
export interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {
}
export interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
    alt?: string;
    coords?: string;
    download?: unknown;
    href?: string;
    hrefLang?: string;
    media?: string;
    rel?: string;
    shape?: string;
    target?: string;
}
export interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
    href?: string;
    target?: string;
}
export interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
}
export interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    autoFocus?: boolean;
    disabled?: boolean;
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    name?: string;
    type?: string;
    value?: string | string[] | number;
}
export interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string;
    width?: number | string;
}
export interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: number;
    width?: number | string;
}
export interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: number;
}
export interface DetailsHTMLAttributes<T> extends HTMLAttributes<T> {
    open?: boolean;
}
export interface DelHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
    dateTime?: string;
}
export interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
    open?: boolean;
}
export interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string;
    src?: string;
    type?: string;
    width?: number | string;
}
export interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    form?: string;
    name?: string;
}
export interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    acceptCharset?: string;
    action?: string;
    autoComplete?: string;
    encType?: string;
    method?: string;
    name?: string;
    noValidate?: boolean;
    target?: string;
}
export interface HtmlHTMLAttributes<T> extends HTMLAttributes<T> {
    manifest?: string;
}
export interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    allowFullScreen?: boolean;
    allowTransparency?: boolean;
    frameBorder?: number | string;
    height?: number | string;
    marginHeight?: number;
    marginWidth?: number;
    name?: string;
    sandbox?: string;
    scrolling?: string;
    seamless?: boolean;
    src?: string;
    srcDoc?: string;
    width?: number | string;
}
export interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    alt?: string;
    crossOrigin?: 'anonymous' | 'use-credentials' | '';
    height?: number | string;
    sizes?: string;
    src?: string;
    srcSet?: string;
    useMap?: string;
    width?: number | string;
}
export interface InsHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
    dateTime?: string;
}
export interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    accept?: string;
    alt?: string;
    autoComplete?: string;
    autoFocus?: boolean;
    capture?: boolean | string; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
    checked?: boolean;
    crossOrigin?: string;
    disabled?: boolean;
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    height?: number | string;
    list?: string;
    max?: number | string;
    maxLength?: number;
    min?: number | string;
    minLength?: number;
    multiple?: boolean;
    name?: string;
    pattern?: string;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    size?: number;
    src?: string;
    step?: number | string;
    type?: string;
    value?: string | string[] | number;
    width?: number | string;
    onChange?: EventHandlers.ChangeEventHandler<T>;
}
export interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
    autoFocus?: boolean;
    challenge?: string;
    disabled?: boolean;
    form?: string;
    keyType?: string;
    keyParams?: string;
    name?: string;
}
export interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string;
    htmlFor?: string;
}
export interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | string[] | number;
}
export interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
    as?: string;
    crossOrigin?: string;
    href?: string;
    hrefLang?: string;
    integrity?: string;
    media?: string;
    rel?: string;
    sizes?: string;
    type?: string;
}
export interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string;
}
export interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
    type?: string;
}
export interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
    autoPlay?: boolean;
    controls?: boolean;
    controlsList?: string;
    crossOrigin?: string;
    loop?: boolean;
    mediaGroup?: string;
    muted?: boolean;
    playsinline?: boolean;
    preload?: string;
    src?: string;
}
export interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
    charSet?: string;
    content?: string;
    httpEquiv?: string;
    name?: string;
}
export interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string;
    high?: number;
    low?: number;
    max?: number | string;
    min?: number | string;
    optimum?: number;
    value?: string | string[] | number;
}
export interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string;
}
export interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
    classID?: string;
    data?: string;
    form?: string;
    height?: number | string;
    name?: string;
    type?: string;
    useMap?: string;
    width?: number | string;
    wmode?: string;
}
export interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
    reversed?: boolean;
    start?: number;
    type?: '1' | 'a' | 'A' | 'i' | 'I';
}
export interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    label?: string;
}
export interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    label?: string;
    selected?: boolean;
    value?: string | string[] | number;
}
export interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string;
    htmlFor?: string;
    name?: string;
}
export interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string;
    value?: string | string[] | number;
}
export interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
    max?: number | string;
    value?: string | string[] | number;
}
export interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
    async?: boolean;
    charSet?: string;
    crossOrigin?: string;
    defer?: boolean;
    integrity?: string;
    noModule?: boolean;
    nonce?: string;
    src?: string;
    type?: string;
}
export interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
    autoComplete?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    form?: string;
    multiple?: boolean;
    name?: string;
    required?: boolean;
    size?: number;
    value?: string | string[] | number;
    onChange?: EventHandlers.ChangeEventHandler<T>;
}
export interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
    media?: string;
    sizes?: string;
    src?: string;
    srcSet?: string;
    type?: string;
}
export interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
    media?: string;
    nonce?: string;
    scoped?: boolean;
    type?: string;
}
export interface TableHTMLAttributes<T> extends HTMLAttributes<T> {
    cellPadding?: number | string;
    cellSpacing?: number | string;
    summary?: string;
}
export interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
    autoComplete?: string;
    autoFocus?: boolean;
    cols?: number;
    dirName?: string;
    disabled?: boolean;
    form?: string;
    maxLength?: number;
    minLength?: number;
    name?: string;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    rows?: number;
    value?: string | string[] | number;
    wrap?: string;
    onChange?: EventHandlers.ChangeEventHandler<T>;
}
export interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
    colSpan?: number;
    headers?: string;
    rowSpan?: number;
    scope?: string;
}
export interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
    colSpan?: number;
    headers?: string;
    rowSpan?: number;
    scope?: string;
}
export interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
    dateTime?: string;
}
export interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
    default?: boolean;
    kind?: string;
    label?: string;
    src?: string;
    srcLang?: string;
}
export interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
    height?: number | string;
    playsInline?: boolean;
    poster?: string;
    width?: number | string;
}
export interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
    allowFullScreen?: boolean;
    allowpopups?: boolean;
    autoFocus?: boolean;
    autosize?: boolean;
    blinkfeatures?: string;
    disableblinkfeatures?: string;
    disableguestresize?: boolean;
    disablewebsecurity?: boolean;
    guestinstance?: string;
    httpreferrer?: string;
    nodeintegration?: boolean;
    partition?: string;
    plugins?: boolean;
    preload?: string;
    src?: string;
    useragent?: string;
    webpreferences?: string;
}
