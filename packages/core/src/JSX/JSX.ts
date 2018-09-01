// import { IComponent } from './Component';
import * as MetaF from './MetaF';

// tslint:disable-next-line:no-namespace
export namespace JSX {
    // tslint:disable-next-line:no-empty-interface
    export interface Element extends MetaF.MetaFElement<any> { }
    // export interface ElementClass extends IComponent<any> {
    // }
    export interface ElementChildrenAttribute { children: {}; }

    export interface IntrinsicElements {
        // HTML
        a: MetaF.DetailedHTMLProps<MetaF.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
        abbr: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        address: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        area: MetaF.DetailedHTMLProps<MetaF.AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement>;
        article: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        aside: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        audio: MetaF.DetailedHTMLProps<MetaF.AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>;
        b: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        base: MetaF.DetailedHTMLProps<MetaF.BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement>;
        bdi: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        bdo: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        big: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        blockquote: MetaF.DetailedHTMLProps<MetaF.BlockquoteHTMLAttributes<HTMLElement>, HTMLElement>;
        body: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>;
        br: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLBRElement>, HTMLBRElement>;
        button: MetaF.DetailedHTMLProps<MetaF.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
        canvas: MetaF.DetailedHTMLProps<MetaF.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;
        caption: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        cite: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        code: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        col: MetaF.DetailedHTMLProps<MetaF.ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
        colgroup: MetaF.DetailedHTMLProps<MetaF.ColgroupHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
        data: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        datalist: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLDataListElement>, HTMLDataListElement>;
        dd: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        del: MetaF.DetailedHTMLProps<MetaF.DelHTMLAttributes<HTMLElement>, HTMLElement>;
        details: MetaF.DetailedHTMLProps<MetaF.DetailsHTMLAttributes<HTMLElement>, HTMLElement>;
        dfn: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        dialog: MetaF.DetailedHTMLProps<MetaF.DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>;
        div: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
        dl: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLDListElement>, HTMLDListElement>;
        dt: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        em: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        embed: MetaF.DetailedHTMLProps<MetaF.EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>;
        fieldset: MetaF.DetailedHTMLProps<MetaF.FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>;
        figcaption: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        figure: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        footer: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        form: MetaF.DetailedHTMLProps<MetaF.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
        h1: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
        h2: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
        h3: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
        h4: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
        h5: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
        h6: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
        head: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLHeadElement>, HTMLHeadElement>;
        header: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        hgroup: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        hr: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLHRElement>, HTMLHRElement>;
        html: MetaF.DetailedHTMLProps<MetaF.HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>;
        i: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        iframe: MetaF.DetailedHTMLProps<MetaF.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>;
        img: MetaF.DetailedHTMLProps<MetaF.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
        input: MetaF.DetailedHTMLProps<MetaF.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
        ins: MetaF.DetailedHTMLProps<MetaF.InsHTMLAttributes<HTMLModElement>, HTMLModElement>;
        kbd: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        keygen: MetaF.DetailedHTMLProps<MetaF.KeygenHTMLAttributes<HTMLElement>, HTMLElement>;
        label: MetaF.DetailedHTMLProps<MetaF.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
        legend: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLLegendElement>, HTMLLegendElement>;
        li: MetaF.DetailedHTMLProps<MetaF.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
        link: MetaF.DetailedHTMLProps<MetaF.LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>;
        main: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        map: MetaF.DetailedHTMLProps<MetaF.MapHTMLAttributes<HTMLMapElement>, HTMLMapElement>;
        mark: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        menu: MetaF.DetailedHTMLProps<MetaF.MenuHTMLAttributes<HTMLElement>, HTMLElement>;
        menuitem: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        meta: MetaF.DetailedHTMLProps<MetaF.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>;
        meter: MetaF.DetailedHTMLProps<MetaF.MeterHTMLAttributes<HTMLElement>, HTMLElement>;
        nav: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        noindex: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        noscript: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        object: MetaF.DetailedHTMLProps<MetaF.ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>;
        ol: MetaF.DetailedHTMLProps<MetaF.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>;
        optgroup: MetaF.DetailedHTMLProps<MetaF.OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement>;
        option: MetaF.DetailedHTMLProps<MetaF.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
        output: MetaF.DetailedHTMLProps<MetaF.OutputHTMLAttributes<HTMLElement>, HTMLElement>;
        p: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
        param: MetaF.DetailedHTMLProps<MetaF.ParamHTMLAttributes<HTMLParamElement>, HTMLParamElement>;
        picture: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        pre: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLPreElement>, HTMLPreElement>;
        progress: MetaF.DetailedHTMLProps<MetaF.ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement>;
        q: MetaF.DetailedHTMLProps<MetaF.QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>;
        rp: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        rt: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        ruby: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        s: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        samp: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        script: MetaF.DetailedHTMLProps<MetaF.ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>;
        section: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        select: MetaF.DetailedHTMLProps<MetaF.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
        small: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        source: MetaF.DetailedHTMLProps<MetaF.SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>;
        span: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
        strong: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        style: MetaF.DetailedHTMLProps<MetaF.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;
        sub: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        summary: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        sup: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        table: MetaF.DetailedHTMLProps<MetaF.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;
        tbody: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
        td: MetaF.DetailedHTMLProps<MetaF.TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>;
        textarea: MetaF.DetailedHTMLProps<MetaF.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
        tfoot: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
        th: MetaF.DetailedHTMLProps<MetaF.ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>;
        thead: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
        time: MetaF.DetailedHTMLProps<MetaF.TimeHTMLAttributes<HTMLElement>, HTMLElement>;
        title: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>;
        tr: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;
        track: MetaF.DetailedHTMLProps<MetaF.TrackHTMLAttributes<HTMLTrackElement>, HTMLTrackElement>;
        u: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        ul: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
        'var': MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        video: MetaF.DetailedHTMLProps<MetaF.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
        wbr: MetaF.DetailedHTMLProps<MetaF.HTMLAttributes<HTMLElement>, HTMLElement>;
        webview: MetaF.DetailedHTMLProps<MetaF.WebViewHTMLAttributes<HTMLWebViewElement>, HTMLWebViewElement>;

        // SVG
        svg: MetaF.SVGProps<SVGSVGElement>;

        animate: MetaF.SVGProps<SVGElement>; // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
        animateTransform: MetaF.SVGProps<SVGElement>; // TODO: It is SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
        circle: MetaF.SVGProps<SVGCircleElement>;
        clipPath: MetaF.SVGProps<SVGClipPathElement>;
        defs: MetaF.SVGProps<SVGDefsElement>;
        desc: MetaF.SVGProps<SVGDescElement>;
        ellipse: MetaF.SVGProps<SVGEllipseElement>;
        feBlend: MetaF.SVGProps<SVGFEBlendElement>;
        feColorMatrix: MetaF.SVGProps<SVGFEColorMatrixElement>;
        feComponentTransfer: MetaF.SVGProps<SVGFEComponentTransferElement>;
        feComposite: MetaF.SVGProps<SVGFECompositeElement>;
        feConvolveMatrix: MetaF.SVGProps<SVGFEConvolveMatrixElement>;
        feDiffuseLighting: MetaF.SVGProps<SVGFEDiffuseLightingElement>;
        feDisplacementMap: MetaF.SVGProps<SVGFEDisplacementMapElement>;
        feDistantLight: MetaF.SVGProps<SVGFEDistantLightElement>;
        feFlood: MetaF.SVGProps<SVGFEFloodElement>;
        feFuncA: MetaF.SVGProps<SVGFEFuncAElement>;
        feFuncB: MetaF.SVGProps<SVGFEFuncBElement>;
        feFuncG: MetaF.SVGProps<SVGFEFuncGElement>;
        feFuncR: MetaF.SVGProps<SVGFEFuncRElement>;
        feGaussianBlur: MetaF.SVGProps<SVGFEGaussianBlurElement>;
        feImage: MetaF.SVGProps<SVGFEImageElement>;
        feMerge: MetaF.SVGProps<SVGFEMergeElement>;
        feMergeNode: MetaF.SVGProps<SVGFEMergeNodeElement>;
        feMorphology: MetaF.SVGProps<SVGFEMorphologyElement>;
        feOffset: MetaF.SVGProps<SVGFEOffsetElement>;
        fePointLight: MetaF.SVGProps<SVGFEPointLightElement>;
        feSpecularLighting: MetaF.SVGProps<SVGFESpecularLightingElement>;
        feSpotLight: MetaF.SVGProps<SVGFESpotLightElement>;
        feTile: MetaF.SVGProps<SVGFETileElement>;
        feTurbulence: MetaF.SVGProps<SVGFETurbulenceElement>;
        filter: MetaF.SVGProps<SVGFilterElement>;
        foreignObject: MetaF.SVGProps<SVGForeignObjectElement>;
        g: MetaF.SVGProps<SVGGElement>;
        image: MetaF.SVGProps<SVGImageElement>;
        line: MetaF.SVGProps<SVGLineElement>;
        linearGradient: MetaF.SVGProps<SVGLinearGradientElement>;
        marker: MetaF.SVGProps<SVGMarkerElement>;
        mask: MetaF.SVGProps<SVGMaskElement>;
        metadata: MetaF.SVGProps<SVGMetadataElement>;
        path: MetaF.SVGProps<SVGPathElement>;
        pattern: MetaF.SVGProps<SVGPatternElement>;
        polygon: MetaF.SVGProps<SVGPolygonElement>;
        polyline: MetaF.SVGProps<SVGPolylineElement>;
        radialGradient: MetaF.SVGProps<SVGRadialGradientElement>;
        rect: MetaF.SVGProps<SVGRectElement>;
        stop: MetaF.SVGProps<SVGStopElement>;
        switch: MetaF.SVGProps<SVGSwitchElement>;
        symbol: MetaF.SVGProps<SVGSymbolElement>;
        text: MetaF.SVGProps<SVGTextElement>;
        textPath: MetaF.SVGProps<SVGTextPathElement>;
        tspan: MetaF.SVGProps<SVGTSpanElement>;
        use: MetaF.SVGProps<SVGUseElement>;
        view: MetaF.SVGProps<SVGViewElement>;
    }
}
