declare const _default: {
    redo: import("../../../common/interfaces").Command<object, import("../../../common/interfaces").Graph>;
    undo: import("../../../common/interfaces").Command<object, import("../../../common/interfaces").Graph>;
    add: import("./base").BaseCommand<import("./add").AddCommandParams, import("../../../common/interfaces").Graph>;
    remove: import("./base").BaseCommand<import("./remove").RemoveCommandParams, import("../../../common/interfaces").Graph>;
    update: import("./base").BaseCommand<import("./update").UpdateCommandParams, import("../../../common/interfaces").Graph & import("../../../common/interfaces").TreeGraph>;
    copy: import("./base").BaseCommand<object, import("../../../common/interfaces").Graph>;
    paste: import("./base").BaseCommand<import("./paste").PasteCommandParams, import("../../../common/interfaces").Graph>;
    pasteHere: import("./base").BaseCommand<import("./pasteHere").PasteHereCommandParams, import("../../../common/interfaces").Graph>;
    zoomIn: import("./base").BaseCommand<object, import("../../../common/interfaces").Graph>;
    zoomOut: import("./base").BaseCommand<object, import("../../../common/interfaces").Graph>;
};
export default _default;
