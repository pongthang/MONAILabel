"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[5252],{

/***/ 5057:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rendering_now__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(53586);
/* harmony import */ var _rendering_renderColorImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(48080);
/* harmony import */ var _rendering_renderGrayscaleImage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92885);
/* harmony import */ var _rendering_renderPseudoColorImage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(71209);




/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(enabledElement, invalidated) {
    const image = enabledElement.image;
    if (!enabledElement.canvas || !enabledElement.image) {
        return;
    }
    const start = (0,_rendering_now__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)();
    image.stats = {
        lastGetPixelDataTime: -1.0,
        lastStoredPixelDataToCanvasImageDataTime: -1.0,
        lastPutImageDataTime: -1.0,
        lastRenderTime: -1.0,
        lastLutGenerateTime: -1.0,
    };
    if (image) {
        let render = image.render;
        if (!render) {
            if (enabledElement.viewport.colormap) {
                render = _rendering_renderPseudoColorImage__WEBPACK_IMPORTED_MODULE_3__/* .renderPseudoColorImage */ .l;
            }
            else if (image.color) {
                render = _rendering_renderColorImage__WEBPACK_IMPORTED_MODULE_1__/* .renderColorImage */ .f;
            }
            else {
                render = _rendering_renderGrayscaleImage__WEBPACK_IMPORTED_MODULE_2__/* .renderGrayscaleImage */ .j;
            }
        }
        render(enabledElement, invalidated);
    }
    const renderTimeInMs = (0,_rendering_now__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)() - start;
    image.stats.lastRenderTime = renderTimeInMs;
    enabledElement.invalid = false;
    enabledElement.needsRedraw = false;
}


/***/ }),

/***/ 7808:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _transform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(45354);

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(enabledElement, scale) {
    const transform = new _transform__WEBPACK_IMPORTED_MODULE_0__/* .Transform */ .d();
    if (!enabledElement.viewport.displayedArea) {
        return transform;
    }
    transform.translate(enabledElement.canvas.width / 2, enabledElement.canvas.height / 2);
    const angle = enabledElement.viewport.rotation;
    if (angle !== 0) {
        transform.rotate((angle * Math.PI) / 180);
    }
    let widthScale = enabledElement.viewport.scale;
    let heightScale = enabledElement.viewport.scale;
    const width = enabledElement.viewport.displayedArea.brhc.x -
        (enabledElement.viewport.displayedArea.tlhc.x - 1);
    const height = enabledElement.viewport.displayedArea.brhc.y -
        (enabledElement.viewport.displayedArea.tlhc.y - 1);
    if (enabledElement.viewport.displayedArea.presentationSizeMode === 'NONE') {
        if (enabledElement.image.rowPixelSpacing <
            enabledElement.image.columnPixelSpacing) {
            widthScale *=
                enabledElement.image.columnPixelSpacing /
                    enabledElement.image.rowPixelSpacing;
        }
        else if (enabledElement.image.columnPixelSpacing <
            enabledElement.image.rowPixelSpacing) {
            heightScale *=
                enabledElement.image.rowPixelSpacing /
                    enabledElement.image.columnPixelSpacing;
        }
    }
    else {
        widthScale = enabledElement.viewport.displayedArea.columnPixelSpacing;
        heightScale = enabledElement.viewport.displayedArea.rowPixelSpacing;
        if (enabledElement.viewport.displayedArea.presentationSizeMode ===
            'SCALE TO FIT') {
            const verticalScale = enabledElement.canvas.height / (height * heightScale);
            const horizontalScale = enabledElement.canvas.width / (width * widthScale);
            widthScale = heightScale = Math.min(horizontalScale, verticalScale);
            if (enabledElement.viewport.displayedArea.rowPixelSpacing <
                enabledElement.viewport.displayedArea.columnPixelSpacing) {
                widthScale *=
                    enabledElement.viewport.displayedArea.columnPixelSpacing /
                        enabledElement.viewport.displayedArea.rowPixelSpacing;
            }
            else if (enabledElement.viewport.displayedArea.columnPixelSpacing <
                enabledElement.viewport.displayedArea.rowPixelSpacing) {
                heightScale *=
                    enabledElement.viewport.displayedArea.rowPixelSpacing /
                        enabledElement.viewport.displayedArea.columnPixelSpacing;
            }
        }
    }
    transform.scale(widthScale, heightScale);
    if (angle !== 0) {
        transform.rotate((-angle * Math.PI) / 180);
    }
    transform.translate(enabledElement.viewport.translation.x, enabledElement.viewport.translation.y);
    if (angle !== 0) {
        transform.rotate((angle * Math.PI) / 180);
    }
    if (scale !== undefined) {
        transform.scale(scale, scale);
    }
    if (enabledElement.viewport.hflip) {
        transform.scale(-1, 1);
    }
    if (enabledElement.viewport.vflip) {
        transform.scale(1, -1);
    }
    transform.translate(-width / 2, -height / 2);
    return transform;
}


/***/ }),

/***/ 36931:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createViewport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12132);
/* harmony import */ var _getImageFitScale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(57162);


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(canvas, image, modality, colormap) {
    if (canvas === undefined) {
        throw new Error('getDefaultViewport: parameter canvas must not be undefined');
    }
    if (image === undefined) {
        return (0,_createViewport__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)();
    }
    const scale = (0,_getImageFitScale__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(canvas, image, 0).scaleFactor;
    let voi;
    if (modality === 'PT' && image.isPreScaled) {
        voi = {
            windowWidth: 5,
            windowCenter: 2.5,
        };
    }
    else if (image.windowWidth !== undefined &&
        image.windowCenter !== undefined) {
        voi = {
            windowWidth: Array.isArray(image.windowWidth)
                ? image.windowWidth[0]
                : image.windowWidth,
            windowCenter: Array.isArray(image.windowCenter)
                ? image.windowCenter[0]
                : image.windowCenter,
        };
    }
    return {
        scale,
        translation: {
            x: 0,
            y: 0,
        },
        voi,
        invert: image.invert,
        pixelReplication: false,
        rotation: 0,
        hflip: false,
        vflip: false,
        modalityLUT: image.modalityLUT,
        modality,
        voiLUT: image.voiLUT,
        colormap: colormap !== undefined ? colormap : image.colormap,
        displayedArea: {
            tlhc: {
                x: 1,
                y: 1,
            },
            brhc: {
                x: image.columns,
                y: image.rows,
            },
            rowPixelSpacing: image.rowPixelSpacing === undefined ? 1 : image.rowPixelSpacing,
            columnPixelSpacing: image.columnPixelSpacing === undefined ? 1 : image.columnPixelSpacing,
            presentationSizeMode: 'NONE',
        },
    };
}


/***/ }),

/***/ 98834:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  oI: () => (/* reexport */ getOrCreateCanvas/* default */.Ay),
  A7: () => (/* reexport */ setVolumesForViewports/* default */.A)
});

// UNUSED EXPORTS: addImageSlicesToViewports, addVolumesToViewports, createVolumeActor, createVolumeMapper, volumeNewImageEventDispatcher

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/helpers/createVolumeActor.js + 2 modules
var createVolumeActor = __webpack_require__(61640);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/helpers/createVolumeMapper.js
var createVolumeMapper = __webpack_require__(92099);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/helpers/getOrCreateCanvas.js
var getOrCreateCanvas = __webpack_require__(30135);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/helpers/setVolumesForViewports.js
var setVolumesForViewports = __webpack_require__(10809);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/BaseVolumeViewport.js
var RenderingEngine_BaseVolumeViewport = __webpack_require__(46347);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/helpers/addVolumesToViewports.js

async function addVolumesToViewports(renderingEngine, volumeInputs, viewportIds, immediateRender = false, suppressEvents = false) {
    for (const viewportId of viewportIds) {
        const viewport = renderingEngine.getViewport(viewportId);
        if (!viewport) {
            throw new Error(`Viewport with Id ${viewportId} does not exist`);
        }
        if (!(viewport instanceof BaseVolumeViewport)) {
            console.warn(`Viewport with Id ${viewportId} is not a BaseVolumeViewport. Cannot add volume to this viewport.`);
            return;
        }
    }
    const addVolumePromises = viewportIds.map(async (viewportId) => {
        const viewport = renderingEngine.getViewport(viewportId);
        await viewport.addVolumes(volumeInputs, immediateRender, suppressEvents);
    });
    await Promise.all(addVolumePromises);
    return;
}
/* harmony default export */ const helpers_addVolumesToViewports = ((/* unused pure expression or super */ null && (addVolumesToViewports)));

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/helpers/volumeNewImageEventDispatcher.js
var volumeNewImageEventDispatcher = __webpack_require__(90740);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/helpers/addImageSlicesToViewports.js
async function addImageSlicesToViewports(renderingEngine, stackInputs, viewportIds) {
    for (const viewportId of viewportIds) {
        const viewport = renderingEngine.getStackViewport(viewportId);
        if (!viewport) {
            throw new Error(`Viewport with Id ${viewportId} does not exist`);
        }
        if (!viewport.addImages) {
            console.warn(`Viewport with Id ${viewportId} does not have addImages. Cannot add image segmentation to this viewport.`);
            return;
        }
    }
    const addStackPromises = viewportIds.map(async (viewportId) => {
        const viewport = renderingEngine.getStackViewport(viewportId);
        viewport.addImages(stackInputs);
    });
    await Promise.all(addStackPromises);
}
/* harmony default export */ const helpers_addImageSlicesToViewports = ((/* unused pure expression or super */ null && (addImageSlicesToViewports)));

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/helpers/index.js










/***/ }),

/***/ 90808:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony export Surface */
class Surface {
    constructor(props) {
        this._color = [200, 0, 0];
        this.id = props.id;
        this._points = props.points;
        this._polys = props.polys;
        this._color = props.color ?? this._color;
        this.frameOfReferenceUID = props.frameOfReferenceUID;
        this._segmentIndex = props.segmentIndex;
        this.sizeInBytes = this._getSizeInBytes();
        this._updateCentroid();
    }
    _getSizeInBytes() {
        return this._points.length * 4 + this._polys.length * 4;
    }
    _updateCentroid() {
        const numberOfPoints = this._points.length / 3;
        let sumX = 0, sumY = 0, sumZ = 0;
        for (let i = 0; i < this._points.length; i += 3) {
            sumX += this._points[i];
            sumY += this._points[i + 1];
            sumZ += this._points[i + 2];
        }
        this._centroid = [
            sumX / numberOfPoints,
            sumY / numberOfPoints,
            sumZ / numberOfPoints,
        ];
    }
    get color() {
        return this._color;
    }
    set color(color) {
        this._color = color;
    }
    get points() {
        return this._points;
    }
    set points(points) {
        this._points = points;
        this._updateCentroid();
    }
    get polys() {
        return this._polys;
    }
    set polys(polys) {
        this._polys = polys;
    }
    get segmentIndex() {
        return this._segmentIndex;
    }
    get centroid() {
        return this._centroid;
    }
    get flatPointsArray() {
        return this._points;
    }
    get totalNumberOfPoints() {
        return this._points.length / 3;
    }
}


/***/ }),

/***/ 31749:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Events: () => (/* reexport */ Events/* default */.A),
  ImageQualityStatus: () => (/* reexport */ ImageQualityStatus/* default */.A),
  InterpolationType: () => (/* reexport */ InterpolationType/* default */.A),
  MetadataModules: () => (/* reexport */ MetadataModules/* default */.A),
  OrientationAxis: () => (/* reexport */ OrientationAxis/* default */.A),
  RequestType: () => (/* reexport */ RequestType/* default */.A),
  VOILUTFunctionType: () => (/* reexport */ VOILUTFunctionType/* default */.A),
  VideoEnums: () => (/* reexport */ VideoEnums),
  ViewportStatus: () => (/* reexport */ ViewportStatus/* default */.A),
  ViewportType: () => (/* reexport */ ViewportType/* default */.A)
});

// UNUSED EXPORTS: BlendModes, CalibrationTypes, ContourType, DynamicOperatorType, GenerateImageType, GeometryType

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/Events.js
var Events = __webpack_require__(32643);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/RequestType.js
var RequestType = __webpack_require__(43213);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/ViewportType.js
var ViewportType = __webpack_require__(41864);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/InterpolationType.js
var InterpolationType = __webpack_require__(29310);
// EXTERNAL MODULE: ../../../node_modules/@kitware/vtk.js/Rendering/Core/VolumeMapper/Constants.js
var Constants = __webpack_require__(67737);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/BlendModes.js

const { BlendMode } = Constants/* default */.Ay;
var BlendModes;
(function (BlendModes) {
    BlendModes[BlendModes["COMPOSITE"] = BlendMode.COMPOSITE_BLEND] = "COMPOSITE";
    BlendModes[BlendModes["MAXIMUM_INTENSITY_BLEND"] = BlendMode.MAXIMUM_INTENSITY_BLEND] = "MAXIMUM_INTENSITY_BLEND";
    BlendModes[BlendModes["MINIMUM_INTENSITY_BLEND"] = BlendMode.MINIMUM_INTENSITY_BLEND] = "MINIMUM_INTENSITY_BLEND";
    BlendModes[BlendModes["AVERAGE_INTENSITY_BLEND"] = BlendMode.AVERAGE_INTENSITY_BLEND] = "AVERAGE_INTENSITY_BLEND";
})(BlendModes || (BlendModes = {}));
/* harmony default export */ const enums_BlendModes = ((/* unused pure expression or super */ null && (BlendModes)));

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/OrientationAxis.js
var OrientationAxis = __webpack_require__(18735);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/GeometryType.js
var GeometryType;
(function (GeometryType) {
    GeometryType["CONTOUR"] = "CONTOUR";
    GeometryType["SURFACE"] = "SURFACE";
})(GeometryType || (GeometryType = {}));
/* harmony default export */ const enums_GeometryType = ((/* unused pure expression or super */ null && (GeometryType)));

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/ContourType.js
var ContourType = __webpack_require__(86066);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/VOILUTFunctionType.js
var VOILUTFunctionType = __webpack_require__(82501);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/DynamicOperatorType.js
var DynamicOperatorType = __webpack_require__(91369);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/CalibrationTypes.js
var CalibrationTypes;
(function (CalibrationTypes) {
    CalibrationTypes["NOT_APPLICABLE"] = "";
    CalibrationTypes["ERMF"] = "ERMF";
    CalibrationTypes["USER"] = "User";
    CalibrationTypes["PROJECTION"] = "Proj";
    CalibrationTypes["REGION"] = "Region";
    CalibrationTypes["ERROR"] = "Error";
    CalibrationTypes["UNCALIBRATED"] = "Uncalibrated";
})(CalibrationTypes || (CalibrationTypes = {}));
/* harmony default export */ const enums_CalibrationTypes = ((/* unused pure expression or super */ null && (CalibrationTypes)));

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/ViewportStatus.js
var ViewportStatus = __webpack_require__(1814);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/ImageQualityStatus.js
var ImageQualityStatus = __webpack_require__(77474);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/VideoEnums.js
var VideoEnums = __webpack_require__(13545);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/MetadataModules.js
var MetadataModules = __webpack_require__(69850);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/GenerateImageType.js
var GenerateImageType;
(function (GenerateImageType) {
    GenerateImageType["SUM"] = "SUM";
    GenerateImageType["SUBTRACT"] = "SUBTRACT";
    GenerateImageType["AVERAGE"] = "AVERAGE";
})(GenerateImageType || (GenerateImageType = {}));

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/index.js



















/***/ }),

/***/ 86846:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (/* binding */ getEnabledElement)
/* harmony export */ });
/* unused harmony exports getEnabledElementByIds, getEnabledElementByViewportId, getEnabledElements */
/* harmony import */ var _RenderingEngine_getRenderingEngine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39536);

function getEnabledElement(element) {
    if (!element) {
        return;
    }
    const { viewportUid, renderingEngineUid } = element.dataset;
    return getEnabledElementByIds(viewportUid, renderingEngineUid);
}
function getEnabledElementByIds(viewportId, renderingEngineId) {
    if (!renderingEngineId || !viewportId) {
        return;
    }
    const renderingEngine = (0,_RenderingEngine_getRenderingEngine__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay)(renderingEngineId);
    if (!renderingEngine || renderingEngine.hasBeenDestroyed) {
        return;
    }
    const viewport = renderingEngine.getViewport(viewportId);
    if (!viewport) {
        return;
    }
    const FrameOfReferenceUID = viewport.getFrameOfReferenceUID();
    return {
        viewport,
        renderingEngine,
        viewportId,
        renderingEngineId,
        FrameOfReferenceUID,
    };
}
function getEnabledElementByViewportId(viewportId) {
    const renderingEngines = getRenderingEngines();
    for (let i = 0; i < renderingEngines.length; i++) {
        const renderingEngine = renderingEngines[i];
        const viewport = renderingEngine.getViewport(viewportId);
        if (viewport) {
            return getEnabledElementByIds(viewportId, renderingEngine.id);
        }
    }
}
function getEnabledElements() {
    const enabledElements = [];
    const renderingEngines = getRenderingEngines();
    renderingEngines.forEach((renderingEngine) => {
        const viewports = renderingEngine.getViewports();
        viewports.forEach(({ element }) => {
            enabledElements.push(getEnabledElement(element));
        });
    });
    return enabledElements;
}


/***/ }),

/***/ 59693:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  lk: () => (/* binding */ canRenderFloatTextures),
  D0: () => (/* binding */ getConfiguration),
  LH: () => (/* binding */ getShouldUseCPURendering),
  Dh: () => (/* binding */ isCornerstoneInitialized),
  a: () => (/* binding */ peerImport)
});

// UNUSED EXPORTS: getWebWorkerManager, init, resetInitialization, resetUseCPURendering, setConfiguration, setPreferSizeOverAccuracy, setUseCPURendering

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/getRenderingEngine.js
var getRenderingEngine = __webpack_require__(39536);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/deepMerge.js
var utilities_deepMerge = __webpack_require__(74268);
// EXTERNAL MODULE: ../../../node_modules/comlink/dist/esm/comlink.mjs
var comlink = __webpack_require__(99178);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/index.js + 4 modules
var enums = __webpack_require__(31749);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/requestPool/requestPoolManager.js
var requestPoolManager = __webpack_require__(24743);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/webWorkerManager/webWorkerManager.js



class CentralizedWorkerManager {
    constructor() {
        this.workerRegistry = {};
        this.workerPoolManager = new RequestPoolManager('webworker');
    }
    registerWorker(workerName, workerFn, options = {}) {
        const { maxWorkerInstances = 1, overwrite = false, autoTerminateOnIdle = {
            enabled: false,
            idleTimeThreshold: 3000,
        }, } = options;
        if (this.workerRegistry[workerName] && !overwrite) {
            console.warn(`Worker type '${workerName}' is already registered...`);
            return;
        }
        if (overwrite && this.workerRegistry[workerName]?.idleCheckIntervalId) {
            clearInterval(this.workerRegistry[workerName].idleCheckIntervalId);
        }
        const workerProperties = {
            workerFn: null,
            instances: [],
            loadCounters: [],
            lastActiveTime: [],
            nativeWorkers: [],
            autoTerminateOnIdle: autoTerminateOnIdle.enabled,
            idleCheckIntervalId: null,
            idleTimeThreshold: autoTerminateOnIdle.idleTimeThreshold,
        };
        workerProperties.loadCounters = Array(maxWorkerInstances).fill(0);
        workerProperties.lastActiveTime = Array(maxWorkerInstances).fill(null);
        for (let i = 0; i < maxWorkerInstances; i++) {
            const worker = workerFn();
            workerProperties.instances.push(Comlink.wrap(worker));
            workerProperties.nativeWorkers.push(worker);
            workerProperties.workerFn = workerFn;
        }
        this.workerRegistry[workerName] = workerProperties;
    }
    getNextWorkerAPI(workerName) {
        const workerProperties = this.workerRegistry[workerName];
        if (!workerProperties) {
            console.error(`Worker type '${workerName}' is not registered.`);
            return null;
        }
        const workerInstances = workerProperties.instances.filter((instance) => instance !== null);
        let minLoadIndex = 0;
        let minLoadValue = workerProperties.loadCounters[0] || 0;
        for (let i = 1; i < workerInstances.length; i++) {
            const currentLoadValue = workerProperties.loadCounters[i] || 0;
            if (currentLoadValue < minLoadValue) {
                minLoadIndex = i;
                minLoadValue = currentLoadValue;
            }
        }
        if (workerProperties.instances[minLoadIndex] === null) {
            const worker = workerProperties.workerFn();
            workerProperties.instances[minLoadIndex] = Comlink.wrap(worker);
            workerProperties.nativeWorkers[minLoadIndex] = worker;
        }
        workerProperties.loadCounters[minLoadIndex] += 1;
        return {
            api: workerProperties.instances[minLoadIndex],
            index: minLoadIndex,
        };
    }
    executeTask(workerName, methodName, args = {}, { requestType = RequestType.Compute, priority = 0, options = {}, callbacks = [], } = {}) {
        return new Promise((resolve, reject) => {
            const requestFn = async () => {
                const { api, index } = this.getNextWorkerAPI(workerName);
                if (!api) {
                    const error = new Error(`No available worker instance for '${workerName}'`);
                    console.error(error);
                    reject(error);
                    return;
                }
                try {
                    let finalCallbacks = [];
                    if (callbacks.length) {
                        finalCallbacks = callbacks.map((cb) => {
                            return Comlink.proxy(cb);
                        });
                    }
                    const workerProperties = this.workerRegistry[workerName];
                    workerProperties.processing = true;
                    const results = await api[methodName](args, ...finalCallbacks);
                    workerProperties.processing = false;
                    workerProperties.lastActiveTime[index] = Date.now();
                    if (workerProperties.autoTerminateOnIdle &&
                        !workerProperties.idleCheckIntervalId &&
                        workerProperties.idleTimeThreshold) {
                        workerProperties.idleCheckIntervalId = setInterval(() => {
                            this.terminateIdleWorkers(workerName, workerProperties.idleTimeThreshold);
                        }, workerProperties.idleTimeThreshold);
                    }
                    resolve(results);
                }
                catch (err) {
                    console.error(`Error executing method '${methodName}' on worker '${workerName}':`, err);
                    reject(err);
                }
                finally {
                    this.workerRegistry[workerName].loadCounters[index]--;
                }
            };
            this.workerPoolManager.addRequest(requestFn, requestType, options, priority);
        });
    }
    terminateIdleWorkers(workerName, idleTimeThreshold) {
        const workerProperties = this.workerRegistry[workerName];
        if (workerProperties.processing) {
            return;
        }
        const now = Date.now();
        workerProperties.instances.forEach((_, index) => {
            const lastActiveTime = workerProperties.lastActiveTime[index];
            const isWorkerActive = lastActiveTime !== null && workerProperties.loadCounters[index] > 0;
            const idleTime = now - lastActiveTime;
            if (!isWorkerActive && idleTime > idleTimeThreshold) {
                this.terminateWorkerInstance(workerName, index);
            }
        });
    }
    terminate(workerName) {
        const workerProperties = this.workerRegistry[workerName];
        if (!workerProperties) {
            console.error(`Worker type '${workerName}' is not registered.`);
            return;
        }
        workerProperties.instances.forEach((_, index) => {
            this.terminateWorkerInstance(workerName, index);
        });
    }
    terminateWorkerInstance(workerName, index) {
        const workerProperties = this.workerRegistry[workerName];
        const workerInstance = workerProperties.instances[index];
        if (workerInstance !== null) {
            workerInstance[Comlink.releaseProxy]();
            workerProperties.nativeWorkers[index].terminate();
            workerProperties.instances[index] = null;
            workerProperties.lastActiveTime[index] = null;
        }
    }
}
/* harmony default export */ const webWorkerManager = ((/* unused pure expression or super */ null && (CentralizedWorkerManager)));

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/init.js

let csRenderInitialized = false;


const defaultConfig = {
    gpuTier: { tier: 2 },
    isMobile: false,
    rendering: {
        useCPURendering: false,
        preferSizeOverAccuracy: false,
        strictZSpacingForVolumeViewport: true,
    },
    peerImport: (moduleId) => null,
};
let config = {
    ...defaultConfig,
    rendering: { ...defaultConfig.rendering },
};
let init_webWorkerManager = null;
function _getGLContext() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');
    return gl;
}
function _hasActiveWebGLContext() {
    const gl = _getGLContext();
    return (gl instanceof WebGLRenderingContext || gl instanceof WebGL2RenderingContext);
}
function _hasNorm16TextureSupport() {
    const gl = _getGLContext();
    if (gl) {
        const ext = gl.getExtension('EXT_texture_norm16');
        if (ext) {
            return true;
        }
    }
    return false;
}
function isIOS() {
    if (/iPad|iPhone|iPod/.test(navigator.platform)) {
        return true;
    }
    else {
        return (navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 2 &&
            navigator.platform.includes('MacIntel'));
    }
}
function init(configuration = config) {
    if (csRenderInitialized) {
        return csRenderInitialized;
    }
    config = deepMerge(defaultConfig, configuration);
    if (isIOS()) {
        if (configuration.rendering?.preferSizeOverAccuracy) {
            config.rendering.preferSizeOverAccuracy = true;
        }
        else {
            console.log('norm16 texture not supported, you can turn on the preferSizeOverAccuracy flag to use native data type, but be aware of the inaccuracy of the rendering in high bits');
        }
    }
    const hasWebGLContext = _hasActiveWebGLContext();
    if (!hasWebGLContext) {
        console.log('CornerstoneRender: GPU not detected, using CPU rendering');
        config.rendering.useCPURendering = true;
    }
    else {
        console.log('CornerstoneRender: using GPU rendering');
    }
    csRenderInitialized = true;
    if (!init_webWorkerManager) {
        init_webWorkerManager = new CentralizedWebWorkerManager();
    }
    return csRenderInitialized;
}
function setUseCPURendering(status, updateViewports = true) {
    config.rendering.useCPURendering = status;
    csRenderInitialized = true;
    if (updateViewports) {
        _updateRenderingPipelinesForAllViewports();
    }
}
function setPreferSizeOverAccuracy(status) {
    config.rendering.preferSizeOverAccuracy = status;
    csRenderInitialized = true;
    _updateRenderingPipelinesForAllViewports();
}
function canRenderFloatTextures() {
    if (!isIOS()) {
        return true;
    }
    return false;
}
function resetUseCPURendering() {
    config.rendering.useCPURendering = !_hasActiveWebGLContext();
    _updateRenderingPipelinesForAllViewports();
}
function getShouldUseCPURendering() {
    return config.rendering.useCPURendering;
}
function isCornerstoneInitialized() {
    return csRenderInitialized;
}
function resetInitialization() {
    csRenderInitialized = false;
}
function getConfiguration() {
    return config;
}
function setConfiguration(c) {
    config = c;
    _updateRenderingPipelinesForAllViewports();
}
function _updateRenderingPipelinesForAllViewports() {
    getRenderingEngines().forEach((engine) => {
        engine.getViewports().forEach((viewport) => {
            viewport.updateRenderingPipeline();
        });
    });
}
function getWebWorkerManager() {
    if (!init_webWorkerManager) {
        init_webWorkerManager = new CentralizedWebWorkerManager();
    }
    return init_webWorkerManager;
}
function peerImport(moduleId) {
    return config.peerImport(moduleId);
}



/***/ }),

/***/ 80068:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadAndCacheImage: () => (/* binding */ loadAndCacheImage),
/* harmony export */   loadImage: () => (/* binding */ loadImage)
/* harmony export */ });
/* unused harmony exports loadAndCacheImages, createAndCacheDerivedImage, createAndCacheDerivedImages, createAndCacheLocalImage, cancelLoadImage, cancelLoadImages, cancelLoadAll, registerImageLoader, registerUnknownImageLoader, unregisterAllImageLoaders, createAndCacheDerivedLabelmapImages, createAndCacheDerivedLabelmapImage */
/* harmony import */ var _cache_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49038);
/* harmony import */ var _enums_Events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32643);
/* harmony import */ var _eventTarget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10364);
/* harmony import */ var _utilities_genericMetadataProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(27119);
/* harmony import */ var _utilities_getBufferConfiguration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(99576);
/* harmony import */ var _utilities_triggerEvent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(69372);
/* harmony import */ var _utilities_uuidv4__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(80221);
/* harmony import */ var _utilities_VoxelManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24623);
/* harmony import */ var _requestPool_imageLoadPoolManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(51159);
/* harmony import */ var _metaData__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(74876);










const imageLoaders = {};
let unknownImageLoader;
function loadImageFromImageLoader(imageId, options) {
    const cachedImageLoadObject = _cache_cache__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.getImageLoadObject(imageId);
    if (cachedImageLoadObject) {
        handleImageLoadPromise(cachedImageLoadObject.promise, imageId);
        return cachedImageLoadObject;
    }
    const scheme = imageId.split(':')[0];
    const loader = imageLoaders[scheme] || unknownImageLoader;
    if (!loader) {
        throw new Error(`loadImageFromImageLoader: No image loader found for scheme '${scheme}'`);
    }
    const imageLoadObject = loader(imageId, options);
    handleImageLoadPromise(imageLoadObject.promise, imageId);
    return imageLoadObject;
}
function handleImageLoadPromise(imagePromise, imageId) {
    Promise.resolve(imagePromise)
        .then((image) => {
        ensureVoxelManager(image);
        (0,_utilities_triggerEvent__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)(_eventTarget__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, _enums_Events__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.IMAGE_LOADED, { image });
    })
        .catch((error) => {
        const errorDetails = {
            imageId,
            error,
        };
        (0,_utilities_triggerEvent__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)(_eventTarget__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A, _enums_Events__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A.IMAGE_LOAD_FAILED, errorDetails);
    });
}
function ensureVoxelManager(image) {
    if (!image.voxelManager) {
        const { width, height, numberOfComponents } = image;
        const voxelManager = _utilities_VoxelManager__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A.createImageVoxelManager({
            scalarData: image.getPixelData(),
            width,
            height,
            numberOfComponents,
        });
        image.voxelManager = voxelManager;
        image.getPixelData = () => voxelManager.getScalarData();
        delete image.imageFrame.pixelData;
    }
}
function loadImage(imageId, options = { priority: 0, requestType: 'prefetch' }) {
    if (imageId === undefined) {
        throw new Error('loadImage: parameter imageId must not be undefined');
    }
    return loadImageFromImageLoader(imageId, options).promise;
}
function loadAndCacheImage(imageId, options = { priority: 0, requestType: 'prefetch' }) {
    if (imageId === undefined) {
        throw new Error('loadAndCacheImage: parameter imageId must not be undefined');
    }
    const imageLoadObject = loadImageFromImageLoader(imageId, options);
    if (!_cache_cache__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.getImageLoadObject(imageId)) {
        _cache_cache__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.putImageLoadObject(imageId, imageLoadObject);
    }
    return imageLoadObject.promise;
}
function loadAndCacheImages(imageIds, options = { priority: 0, requestType: 'prefetch' }) {
    if (!imageIds || imageIds.length === 0) {
        throw new Error('loadAndCacheImages: parameter imageIds must be list of image Ids');
    }
    const allPromises = imageIds.map((imageId) => {
        return loadAndCacheImage(imageId, options);
    });
    return allPromises;
}
function createAndCacheDerivedImage(referencedImageId, options = {}) {
    if (referencedImageId === undefined) {
        throw new Error('createAndCacheDerivedImage: parameter imageId must not be undefined');
    }
    if (options.imageId === undefined) {
        options.imageId = `derived:${uuidv4()}`;
    }
    const { imageId, skipCreateBuffer, onCacheAdd } = options;
    const imagePlaneModule = metaData.get('imagePlaneModule', referencedImageId);
    const length = imagePlaneModule.rows * imagePlaneModule.columns;
    const { TypedArrayConstructor } = getBufferConfiguration(options.targetBuffer?.type, length);
    const imageScalarData = new TypedArrayConstructor(skipCreateBuffer ? 1 : length);
    const derivedImageId = imageId;
    const referencedImagePlaneMetadata = metaData.get('imagePlaneModule', referencedImageId);
    genericMetadataProvider.add(derivedImageId, {
        type: 'imagePlaneModule',
        metadata: referencedImagePlaneMetadata,
    });
    const referencedImageGeneralSeriesMetadata = metaData.get('generalSeriesModule', referencedImageId);
    genericMetadataProvider.add(derivedImageId, {
        type: 'generalSeriesModule',
        metadata: referencedImageGeneralSeriesMetadata,
    });
    genericMetadataProvider.add(derivedImageId, {
        type: 'generalImageModule',
        metadata: {
            instanceNumber: options.instanceNumber,
        },
    });
    const imagePixelModule = metaData.get('imagePixelModule', referencedImageId);
    genericMetadataProvider.add(derivedImageId, {
        type: 'imagePixelModule',
        metadata: {
            ...imagePixelModule,
            bitsAllocated: 8,
            bitsStored: 8,
            highBit: 7,
            samplesPerPixel: 1,
            pixelRepresentation: 0,
        },
    });
    const localImage = createAndCacheLocalImage(imageId, {
        scalarData: imageScalarData,
        onCacheAdd,
        skipCreateBuffer,
        targetBuffer: {
            type: imageScalarData.constructor.name,
        },
        dimensions: [imagePlaneModule.columns, imagePlaneModule.rows],
        spacing: [
            imagePlaneModule.columnPixelSpacing,
            imagePlaneModule.rowPixelSpacing,
        ],
        origin: imagePlaneModule.imagePositionPatient,
        direction: imagePlaneModule.imageOrientationPatient,
        frameOfReferenceUID: imagePlaneModule.frameOfReferenceUID,
    });
    localImage.referencedImageId = referencedImageId;
    if (!cache.getImageLoadObject(imageId)) {
        cache.putImageSync(imageId, localImage);
    }
    return localImage;
}
function createAndCacheDerivedImages(referencedImageIds, options = {}) {
    if (referencedImageIds.length === 0) {
        throw new Error('createAndCacheDerivedImages: parameter imageIds must be list of image Ids');
    }
    const derivedImageIds = [];
    const images = referencedImageIds.map((referencedImageId, index) => {
        const newOptions = {
            imageId: options?.getDerivedImageId?.(referencedImageId) ||
                `derived:${uuidv4()}`,
            ...options,
        };
        derivedImageIds.push(newOptions.imageId);
        return createAndCacheDerivedImage(referencedImageId, {
            ...newOptions,
            instanceNumber: index + 1,
        });
    });
    return images;
}
function createAndCacheLocalImage(imageId, options) {
    const { scalarData, origin, direction, targetBuffer, skipCreateBuffer, onCacheAdd, frameOfReferenceUID, } = options;
    const dimensions = options.dimensions;
    const spacing = options.spacing;
    if (!dimensions || !spacing) {
        throw new Error('createAndCacheLocalImage: dimensions and spacing are required');
    }
    const width = dimensions[0];
    const height = dimensions[1];
    const columnPixelSpacing = spacing[0];
    const rowPixelSpacing = spacing[1];
    const imagePlaneModule = {
        frameOfReferenceUID,
        rows: height,
        columns: width,
        imageOrientationPatient: direction ?? [1, 0, 0, 0, 1, 0],
        rowCosines: direction ? direction.slice(0, 3) : [1, 0, 0],
        columnCosines: direction ? direction.slice(3, 6) : [0, 1, 0],
        imagePositionPatient: origin ?? [0, 0, 0],
        pixelSpacing: [rowPixelSpacing, columnPixelSpacing],
        rowPixelSpacing: rowPixelSpacing,
        columnPixelSpacing: columnPixelSpacing,
    };
    const length = width * height;
    const numberOfComponents = scalarData.length / length;
    let scalarDataToUse;
    if (scalarData) {
        if (!(scalarData instanceof Uint8Array ||
            scalarData instanceof Float32Array ||
            scalarData instanceof Uint16Array ||
            scalarData instanceof Int16Array)) {
            throw new Error('createAndCacheLocalImage: scalarData must be of type Uint8Array, Uint16Array, Int16Array or Float32Array');
        }
        scalarDataToUse = scalarData;
    }
    else if (!skipCreateBuffer) {
        const { numBytes, TypedArrayConstructor } = getBufferConfiguration(targetBuffer?.type, length);
        const imageScalarData = new TypedArrayConstructor(length);
        scalarDataToUse = imageScalarData;
    }
    let bitsAllocated, bitsStored, highBit;
    if (scalarDataToUse instanceof Uint8Array) {
        bitsAllocated = 8;
        bitsStored = 8;
        highBit = 7;
    }
    else if (scalarDataToUse instanceof Uint16Array) {
        bitsAllocated = 16;
        bitsStored = 16;
        highBit = 15;
    }
    else if (scalarDataToUse instanceof Int16Array) {
        bitsAllocated = 16;
        bitsStored = 16;
        highBit = 15;
    }
    else if (scalarDataToUse instanceof Float32Array) {
        bitsAllocated = 32;
        bitsStored = 32;
        highBit = 31;
    }
    else {
        throw new Error('Unsupported scalarData type');
    }
    const imagePixelModule = {
        samplesPerPixel: 1,
        photometricInterpretation: scalarDataToUse.length > dimensions[0] * dimensions[1]
            ? 'RGB'
            : 'MONOCHROME2',
        rows: height,
        columns: width,
        bitsAllocated,
        bitsStored,
        highBit,
    };
    const metadata = {
        imagePlaneModule,
        imagePixelModule,
    };
    ['imagePlaneModule', 'imagePixelModule'].forEach((type) => {
        genericMetadataProvider.add(imageId, {
            type,
            metadata: metadata[type] || {},
        });
    });
    const voxelManager = VoxelManager.createImageVoxelManager({
        height,
        width,
        numberOfComponents,
        scalarData: scalarDataToUse,
    });
    let minPixelValue = scalarDataToUse[0];
    let maxPixelValue = scalarDataToUse[0];
    for (let i = 1; i < scalarDataToUse.length; i++) {
        if (scalarDataToUse[i] < minPixelValue) {
            minPixelValue = scalarDataToUse[i];
        }
        if (scalarDataToUse[i] > maxPixelValue) {
            maxPixelValue = scalarDataToUse[i];
        }
    }
    const image = {
        imageId: imageId,
        intercept: 0,
        windowCenter: 0,
        windowWidth: 0,
        color: imagePixelModule.photometricInterpretation === 'RGB',
        numberOfComponents: imagePixelModule.samplesPerPixel,
        dataType: targetBuffer?.type,
        slope: 1,
        minPixelValue,
        maxPixelValue,
        rows: imagePixelModule.rows,
        columns: imagePixelModule.columns,
        getCanvas: undefined,
        height: imagePixelModule.rows,
        width: imagePixelModule.columns,
        rgba: undefined,
        columnPixelSpacing: imagePlaneModule.columnPixelSpacing,
        rowPixelSpacing: imagePlaneModule.rowPixelSpacing,
        FrameOfReferenceUID: imagePlaneModule.frameOfReferenceUID,
        invert: false,
        getPixelData: () => voxelManager.getScalarData(),
        voxelManager,
        sizeInBytes: scalarData.byteLength,
    };
    onCacheAdd?.(image);
    cache.putImageSync(image.imageId, image);
    return image;
}
function cancelLoadImage(imageId) {
    const filterFunction = ({ additionalDetails }) => {
        if (additionalDetails.imageId) {
            return additionalDetails.imageId !== imageId;
        }
        return true;
    };
    imageLoadPoolManager.filterRequests(filterFunction);
    const imageLoadObject = cache.getImageLoadObject(imageId);
    if (imageLoadObject) {
        imageLoadObject.cancelFn();
    }
}
function cancelLoadImages(imageIds) {
    imageIds.forEach((imageId) => {
        cancelLoadImage(imageId);
    });
}
function cancelLoadAll() {
    const requestPool = imageLoadPoolManager.getRequestPool();
    Object.keys(requestPool).forEach((type) => {
        const requests = requestPool[type];
        Object.keys(requests).forEach((priority) => {
            const requestDetails = requests[priority].pop();
            const additionalDetails = requestDetails.additionalDetails;
            const { imageId, volumeId } = additionalDetails;
            let loadObject;
            if (imageId) {
                loadObject = cache.getImageLoadObject(imageId);
            }
            else if (volumeId) {
                loadObject = cache.getVolumeLoadObject(volumeId);
            }
            if (loadObject) {
                loadObject.cancel();
            }
        });
        imageLoadPoolManager.clearRequestStack(type);
    });
}
function registerImageLoader(scheme, imageLoader) {
    imageLoaders[scheme] = imageLoader;
}
function registerUnknownImageLoader(imageLoader) {
    const oldImageLoader = unknownImageLoader;
    unknownImageLoader = imageLoader;
    return oldImageLoader;
}
function unregisterAllImageLoaders() {
    Object.keys(imageLoaders).forEach((imageLoader) => delete imageLoaders[imageLoader]);
    unknownImageLoader = undefined;
}
function createAndCacheDerivedLabelmapImages(referencedImageIds, options = {}) {
    return createAndCacheDerivedImages(referencedImageIds, {
        ...options,
        targetBuffer: { type: 'Uint8Array' },
    });
}
function createAndCacheDerivedLabelmapImage(referencedImageId, options = {}) {
    return createAndCacheDerivedImage(referencedImageId, {
        ...options,
        targetBuffer: { type: 'Uint8Array' },
    });
}


/***/ }),

/***/ 39561:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createAndCacheVolume: () => (/* binding */ createAndCacheVolume),
/* harmony export */   getUnknownVolumeLoaderSchema: () => (/* binding */ getUnknownVolumeLoaderSchema),
/* harmony export */   getVolumeLoaderSchemes: () => (/* binding */ getVolumeLoaderSchemes),
/* harmony export */   loadVolume: () => (/* binding */ loadVolume)
/* harmony export */ });
/* unused harmony exports createAndCacheDerivedVolume, createAndCacheVolumeFromImages, createAndCacheVolumeFromImagesSync, createLocalVolume, registerVolumeLoader, registerUnknownVolumeLoader, createAndCacheDerivedLabelmapVolume, createLocalLabelmapVolume */
/* harmony import */ var _kitware_vtk_js_Rendering_Profiles_Volume__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7742);
/* harmony import */ var _cache_classes_ImageVolume__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(86252);
/* harmony import */ var _cache_cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(49038);
/* harmony import */ var _enums_Events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(32643);
/* harmony import */ var _eventTarget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10364);
/* harmony import */ var _utilities_triggerEvent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(69372);
/* harmony import */ var _utilities_uuidv4__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(80221);
/* harmony import */ var _utilities_VoxelManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(24623);
/* harmony import */ var _imageLoader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(80068);
/* harmony import */ var _utilities_generateVolumePropsFromImageIds__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9734);
/* harmony import */ var _cornerstoneStreamingImageVolumeLoader__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(55500);











const volumeLoaders = {};
let unknownVolumeLoader = _cornerstoneStreamingImageVolumeLoader__WEBPACK_IMPORTED_MODULE_10__/* .cornerstoneStreamingImageVolumeLoader */ .F;
function loadVolumeFromVolumeLoader(volumeId, options) {
    const colonIndex = volumeId.indexOf(':');
    const scheme = volumeId.substring(0, colonIndex);
    let loader = volumeLoaders[scheme];
    if (loader === undefined || loader === null) {
        if (unknownVolumeLoader == null ||
            typeof unknownVolumeLoader !== 'function') {
            throw new Error(`No volume loader for scheme ${scheme} has been registered`);
        }
        loader = unknownVolumeLoader;
    }
    const volumeLoadObject = loader(volumeId, options);
    volumeLoadObject.promise.then(function (volume) {
        (0,_utilities_triggerEvent__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)(_eventTarget__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, _enums_Events__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.VOLUME_LOADED, { volume });
    }, function (error) {
        const errorObject = {
            volumeId,
            error,
        };
        (0,_utilities_triggerEvent__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .A)(_eventTarget__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, _enums_Events__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A.VOLUME_LOADED_FAILED, errorObject);
    });
    return volumeLoadObject;
}
function loadVolume(volumeId, options = { imageIds: [] }) {
    if (volumeId === undefined) {
        throw new Error('loadVolume: parameter volumeId must not be undefined');
    }
    let volumeLoadObject = _cache_cache__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay.getVolumeLoadObject(volumeId);
    if (volumeLoadObject !== undefined) {
        return volumeLoadObject.promise;
    }
    volumeLoadObject = loadVolumeFromVolumeLoader(volumeId, options);
    return volumeLoadObject.promise.then((volume) => {
        return volume;
    });
}
async function createAndCacheVolume(volumeId, options) {
    if (volumeId === undefined) {
        throw new Error('createAndCacheVolume: parameter volumeId must not be undefined');
    }
    let volumeLoadObject = _cache_cache__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay.getVolumeLoadObject(volumeId);
    if (volumeLoadObject !== undefined) {
        return volumeLoadObject.promise;
    }
    volumeLoadObject = loadVolumeFromVolumeLoader(volumeId, options);
    _cache_cache__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Ay.putVolumeLoadObject(volumeId, volumeLoadObject);
    return volumeLoadObject.promise;
}
function createAndCacheDerivedVolume(referencedVolumeId, options) {
    const referencedVolume = cache.getVolume(referencedVolumeId);
    if (!referencedVolume) {
        throw new Error(`Cannot created derived volume: Referenced volume with id ${referencedVolumeId} does not exist.`);
    }
    let { volumeId } = options;
    if (volumeId === undefined) {
        volumeId = uuidv4();
    }
    const { metadata, dimensions, spacing, origin, direction } = referencedVolume;
    const referencedImageIds = referencedVolume.isDynamicVolume()
        ? referencedVolume.getCurrentTimePointImageIds()
        : referencedVolume.imageIds ?? [];
    const derivedImages = createAndCacheDerivedImages(referencedImageIds, {
        targetBuffer: options.targetBuffer,
    });
    const dataType = derivedImages[0].dataType;
    const derivedVolumeImageIds = derivedImages.map((image) => image.imageId);
    const derivedVolume = new ImageVolume({
        volumeId,
        dataType,
        metadata: structuredClone(metadata),
        dimensions: [dimensions[0], dimensions[1], dimensions[2]],
        spacing,
        origin,
        direction,
        referencedVolumeId,
        imageIds: derivedVolumeImageIds,
        referencedImageIds: referencedVolume.imageIds ?? [],
    });
    cache.putVolumeSync(volumeId, derivedVolume);
    return derivedVolume;
}
async function createAndCacheVolumeFromImages(volumeId, imageIds) {
    if (imageIds === undefined) {
        throw new Error('createAndCacheVolumeFromImages: parameter imageIds must not be undefined');
    }
    if (volumeId === undefined) {
        throw new Error('createAndCacheVolumeFromImages: parameter volumeId must not be undefined');
    }
    const cachedVolume = cache.getVolume(volumeId);
    if (cachedVolume) {
        return cachedVolume;
    }
    const imageIdsToLoad = imageIds.filter((imageId) => !cache.getImage(imageId));
    if (imageIdsToLoad.length === 0) {
        return createAndCacheVolumeFromImagesSync(volumeId, imageIds);
    }
    const volume = (await createAndCacheVolume(volumeId, {
        imageIds,
    }));
    return volume;
}
function createAndCacheVolumeFromImagesSync(volumeId, imageIds) {
    if (imageIds === undefined) {
        throw new Error('createAndCacheVolumeFromImagesSync: parameter imageIds must not be undefined');
    }
    if (volumeId === undefined) {
        throw new Error('createAndCacheVolumeFromImagesSync: parameter volumeId must not be undefined');
    }
    const cachedVolume = cache.getVolume(volumeId);
    if (cachedVolume) {
        return cachedVolume;
    }
    const volumeProps = generateVolumePropsFromImageIds(imageIds, volumeId);
    const derivedVolume = new ImageVolume({
        volumeId,
        dataType: volumeProps.dataType,
        metadata: structuredClone(volumeProps.metadata),
        dimensions: volumeProps.dimensions,
        spacing: volumeProps.spacing,
        origin: volumeProps.origin,
        direction: volumeProps.direction,
        referencedVolumeId: volumeProps.referencedVolumeId,
        imageIds: volumeProps.imageIds,
        referencedImageIds: volumeProps.referencedImageIds,
    });
    cache.putVolumeSync(volumeId, derivedVolume);
    return derivedVolume;
}
function createLocalVolume(volumeId, options = {}) {
    const { metadata, dimensions, spacing, origin, direction, scalarData, targetBuffer, preventCache = false, } = options;
    const cachedVolume = cache.getVolume(volumeId);
    if (cachedVolume) {
        return cachedVolume;
    }
    const sliceLength = dimensions[0] * dimensions[1];
    const dataType = scalarData
        ? scalarData.constructor.name
        : targetBuffer?.type ?? 'Float32Array';
    const totalNumberOfVoxels = sliceLength * dimensions[2];
    let byteLength;
    switch (dataType) {
        case 'Uint8Array':
        case 'Int8Array':
            byteLength = totalNumberOfVoxels;
            break;
        case 'Uint16Array':
        case 'Int16Array':
            byteLength = totalNumberOfVoxels * 2;
            break;
        case 'Float32Array':
            byteLength = totalNumberOfVoxels * 4;
            break;
    }
    const isCacheable = cache.isCacheable(byteLength);
    if (!isCacheable) {
        throw new Error(`Cannot created derived volume: Volume with id ${volumeId} is not cacheable.`);
    }
    const imageIds = [];
    const derivedImages = [];
    for (let i = 0; i < dimensions[2]; i++) {
        const imageId = `${volumeId}_slice_${i}`;
        imageIds.push(imageId);
        const sliceData = scalarData.subarray(i * sliceLength, (i + 1) * sliceLength);
        const derivedImage = createAndCacheLocalImage(imageId, {
            scalarData: sliceData,
            dimensions: [dimensions[0], dimensions[1]],
            spacing: [spacing[0], spacing[1]],
            origin,
            direction,
            targetBuffer: { type: dataType },
        });
        derivedImages.push(derivedImage);
    }
    const imageVolume = new ImageVolume({
        volumeId,
        metadata: structuredClone(metadata),
        dimensions: [dimensions[0], dimensions[1], dimensions[2]],
        spacing,
        origin,
        direction,
        imageIds,
        dataType,
    });
    const voxelManager = VoxelManager.createImageVolumeVoxelManager({
        imageIds,
        dimensions,
        numberOfComponents: 1,
    });
    imageVolume.voxelManager = voxelManager;
    if (!preventCache) {
        cache.putVolumeSync(volumeId, imageVolume);
    }
    return imageVolume;
}
function registerVolumeLoader(scheme, volumeLoader) {
    volumeLoaders[scheme] = volumeLoader;
}
function getVolumeLoaderSchemes() {
    return Object.keys(volumeLoaders);
}
function registerUnknownVolumeLoader(volumeLoader) {
    const oldVolumeLoader = unknownVolumeLoader;
    unknownVolumeLoader = volumeLoader;
    return oldVolumeLoader;
}
function getUnknownVolumeLoaderSchema() {
    return unknownVolumeLoader.name;
}
function createAndCacheDerivedLabelmapVolume(referencedVolumeId, options = {}) {
    return createAndCacheDerivedVolume(referencedVolumeId, {
        ...options,
        targetBuffer: { type: 'Uint8Array' },
    });
}
function createLocalLabelmapVolume(options, volumeId, preventCache = false) {
    if (!options.scalarData) {
        options.scalarData = new Uint8Array(options.dimensions[0] * options.dimensions[1] * options.dimensions[2]);
    }
    return createLocalVolume(volumeId, { ...options, preventCache });
}


/***/ }),

/***/ 22191:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ProgressiveIterator)
/* harmony export */ });
/* unused harmony export PromiseIterator */
class PromiseIterator extends (/* unused pure expression or super */ null && (Promise)) {
}
class ProgressiveIterator {
    constructor(name) {
        this.name = name || 'unknown';
    }
    static as(promise) {
        if (promise.iterator) {
            return promise.iterator;
        }
        const iterator = new ProgressiveIterator('as iterator');
        promise.then((v) => {
            try {
                iterator.add(v, true);
            }
            catch (e) {
                iterator.reject(e);
            }
        }, (reason) => {
            iterator.reject(reason);
        });
        return iterator;
    }
    add(x, done = false) {
        this.nextValue = x;
        this.done ||= done;
        if (this.waiting) {
            this.waiting.resolve(x);
            this.waiting = undefined;
        }
    }
    resolve() {
        this.done = true;
        if (this.waiting) {
            this.waiting.resolve(this.nextValue);
            this.waiting = undefined;
        }
    }
    reject(reason) {
        this.rejectReason = reason;
        this.waiting?.reject(reason);
    }
    getRecent() {
        if (this.rejectReason) {
            throw this.rejectReason;
        }
        return this.nextValue;
    }
    async *[Symbol.asyncIterator]() {
        while (!this.done) {
            if (this.rejectReason) {
                throw this.rejectReason;
            }
            if (this.nextValue !== undefined) {
                yield this.nextValue;
                if (this.done) {
                    break;
                }
            }
            if (!this.waiting) {
                this.waiting = {};
                this.waiting.promise = new Promise((resolve, reject) => {
                    this.waiting.resolve = resolve;
                    this.waiting.reject = reject;
                });
            }
            await this.waiting.promise;
        }
        yield this.nextValue;
    }
    async forEach(callback, errorCallback) {
        let index = 0;
        try {
            for await (const value of this) {
                const { done } = this;
                try {
                    await callback(value, done, index);
                    index++;
                }
                catch (e) {
                    if (!done) {
                        console.warn('Caught exception in intermediate value', e);
                        continue;
                    }
                    if (errorCallback) {
                        errorCallback(e, done);
                    }
                    else {
                        throw e;
                    }
                }
            }
        }
        catch (e) {
            if (errorCallback) {
                errorCallback(e, true);
            }
            else {
                throw e;
            }
        }
    }
    generate(processFunction, errorCallback) {
        return processFunction(this, this.reject.bind(this)).then(() => {
            if (!this.done) {
                this.resolve();
            }
        }, (reason) => {
            this.reject(reason);
            if (errorCallback) {
                errorCallback(reason);
            }
            else {
                console.warn("Couldn't process because", reason);
            }
        });
    }
    async nextPromise() {
        for await (const i of this) {
            if (i) {
                return i;
            }
        }
        return this.nextValue;
    }
    async donePromise() {
        for await (const i of this) {
        }
        return this.nextValue;
    }
    getNextPromise() {
        const promise = this.nextPromise();
        promise.iterator = this;
        return promise;
    }
    getDonePromise() {
        const promise = this.donePromise();
        promise.iterator = this;
        return promise;
    }
}


/***/ }),

/***/ 67645:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ RLEVoxelMap)
/* harmony export */ });
class RLEVoxelMap {
    constructor(width, height, depth = 1) {
        this.rows = new Map();
        this.height = 1;
        this.width = 1;
        this.depth = 1;
        this.jMultiple = 1;
        this.kMultiple = 1;
        this.numberOfComponents = 1;
        this.defaultValue = 0;
        this.pixelDataConstructor = Uint8Array;
        this.get = (index) => {
            const i = index % this.jMultiple;
            const j = (index - i) / this.jMultiple;
            const rle = this.getRLE(i, j);
            return rle?.value || this.defaultValue;
        };
        this.getRun = (j, k) => {
            const runIndex = j + k * this.height;
            return this.rows.get(runIndex);
        };
        this.set = (index, value) => {
            if (value === undefined) {
                throw new Error(`Can't set undefined at ${index % this.width}`);
            }
            const i = index % this.width;
            const j = (index - i) / this.width;
            const row = this.rows.get(j);
            if (!row) {
                this.rows.set(j, [{ start: i, end: i + 1, value }]);
                return;
            }
            const rleIndex = this.findIndex(row, i);
            const rle1 = row[rleIndex];
            const rle0 = row[rleIndex - 1];
            if (!rle1) {
                if (!rle0 || rle0.value !== value || rle0.end !== i) {
                    row[rleIndex] = { start: i, end: i + 1, value };
                    return;
                }
                rle0.end++;
                return;
            }
            const { start, end, value: oldValue } = rle1;
            if (value === oldValue && i >= start) {
                return;
            }
            const rleInsert = { start: i, end: i + 1, value };
            const isAfter = i > start;
            const insertIndex = isAfter ? rleIndex + 1 : rleIndex;
            const rlePrev = isAfter ? rle1 : rle0;
            let rleNext = isAfter ? row[rleIndex + 1] : rle1;
            if (rlePrev?.value === value && rlePrev.end === i) {
                rlePrev.end++;
                if (rleNext?.value === value && rleNext.start === i + 1) {
                    rlePrev.end = rleNext.end;
                    row.splice(rleIndex, 1);
                }
                else if (rleNext?.start === i) {
                    rleNext.start++;
                    if (rleNext.start === rleNext.end) {
                        row.splice(rleIndex, 1);
                        rleNext = row[rleIndex];
                        if (rleNext?.start === i + 1 && rleNext.value === value) {
                            rlePrev.end = rleNext.end;
                            row.splice(rleIndex, 1);
                        }
                    }
                }
                return;
            }
            if (rleNext?.value === value && rleNext.start === i + 1) {
                rleNext.start--;
                if (rlePrev?.end > i) {
                    rlePrev.end = i;
                    if (rlePrev.end === rlePrev.start) {
                        row.splice(rleIndex, 1);
                    }
                }
                return;
            }
            if (rleNext?.start === i && rleNext.end === i + 1) {
                rleNext.value = value;
                const nextnext = row[rleIndex + 1];
                if (nextnext?.start == i + 1 && nextnext?.value === value) {
                    row.splice(rleIndex + 1, 1);
                    rleNext.end = nextnext.end;
                }
                return;
            }
            if (i === rleNext?.start) {
                rleNext.start++;
            }
            if (isAfter && end > i + 1) {
                row.splice(insertIndex, 0, rleInsert, {
                    start: i + 1,
                    end: rlePrev.end,
                    value: rlePrev.value,
                });
            }
            else {
                row.splice(insertIndex, 0, rleInsert);
            }
            if (rlePrev?.end > i) {
                rlePrev.end = i;
            }
        };
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.jMultiple = width;
        this.kMultiple = this.jMultiple * height;
    }
    getRLE(i, j, k = 0) {
        const row = this.rows.get(j + k * this.height);
        if (!row) {
            return;
        }
        const index = this.findIndex(row, i);
        const rle = row[index];
        return i >= rle?.start ? rle : undefined;
    }
    findIndex(row, i) {
        for (let index = 0; index < row.length; index++) {
            const { end: iEnd } = row[index];
            if (i < iEnd) {
                return index;
            }
        }
        return row.length;
    }
    clear() {
        this.rows.clear();
    }
    keys() {
        return [...this.rows.keys()];
    }
    getPixelData(k = 0, pixelData) {
        if (!pixelData) {
            pixelData = new this.pixelDataConstructor(this.width * this.height * this.numberOfComponents);
        }
        else {
            pixelData.fill(0);
        }
        const { width, height, numberOfComponents } = this;
        for (let j = 0; j < height; j++) {
            const row = this.getRun(j, k);
            if (!row) {
                continue;
            }
            if (numberOfComponents === 1) {
                for (const rle of row) {
                    const rowOffset = j * width;
                    const { start, end, value } = rle;
                    for (let i = start; i < end; i++) {
                        pixelData[rowOffset + i] = value;
                    }
                }
            }
            else {
                for (const rle of row) {
                    const rowOffset = j * width * numberOfComponents;
                    const { start, end, value } = rle;
                    for (let i = start; i < end; i += numberOfComponents) {
                        for (let comp = 0; comp < numberOfComponents; comp++) {
                            pixelData[rowOffset + i + comp] = value[comp];
                        }
                    }
                }
            }
        }
        return pixelData;
    }
}


/***/ }),

/***/ 98039:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ actorIsA),
/* harmony export */   e: () => (/* binding */ isImageActor)
/* harmony export */ });
function isImageActor(actorEntry) {
    return (actorIsA(actorEntry, 'vtkVolume') || actorIsA(actorEntry, 'vtkImageSlice'));
}
function actorIsA(actorEntry, actorType) {
    const actorToCheck = 'isA' in actorEntry ? actorEntry : actorEntry.actor;
    return !!actorToCheck.isA(actorType);
}


/***/ }),

/***/ 96833:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ applyPreset)
/* harmony export */ });
/* harmony import */ var _kitware_vtk_js_Rendering_Core_ColorTransferFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33739);
/* harmony import */ var _kitware_vtk_js_Common_DataModel_PiecewiseFunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(99341);


function applyPreset(actor, preset) {
    const colorTransferArray = preset.colorTransfer
        .split(' ')
        .splice(1)
        .map(parseFloat);
    const { shiftRange } = getShiftRange(colorTransferArray);
    const min = shiftRange[0];
    const width = shiftRange[1] - shiftRange[0];
    const cfun = _kitware_vtk_js_Rendering_Core_ColorTransferFunction__WEBPACK_IMPORTED_MODULE_0__/* ["default"].newInstance */ .Ay.newInstance();
    const normColorTransferValuePoints = [];
    for (let i = 0; i < colorTransferArray.length; i += 4) {
        let value = colorTransferArray[i];
        const r = colorTransferArray[i + 1];
        const g = colorTransferArray[i + 2];
        const b = colorTransferArray[i + 3];
        value = (value - min) / width;
        normColorTransferValuePoints.push([value, r, g, b]);
    }
    applyPointsToRGBFunction(normColorTransferValuePoints, shiftRange, cfun);
    actor.getProperty().setRGBTransferFunction(0, cfun);
    const scalarOpacityArray = preset.scalarOpacity
        .split(' ')
        .splice(1)
        .map(parseFloat);
    const ofun = _kitware_vtk_js_Common_DataModel_PiecewiseFunction__WEBPACK_IMPORTED_MODULE_1__/* ["default"].newInstance */ .Ay.newInstance();
    const normPoints = [];
    for (let i = 0; i < scalarOpacityArray.length; i += 2) {
        let value = scalarOpacityArray[i];
        const opacity = scalarOpacityArray[i + 1];
        value = (value - min) / width;
        normPoints.push([value, opacity]);
    }
    applyPointsToPiecewiseFunction(normPoints, shiftRange, ofun);
    const property = actor.getProperty();
    property.setScalarOpacity(0, ofun);
    const [gradientMinValue, gradientMinOpacity, gradientMaxValue, gradientMaxOpacity,] = preset.gradientOpacity.split(' ').splice(1).map(parseFloat);
    property.setUseGradientOpacity(0, true);
    property.setGradientOpacityMinimumValue(0, gradientMinValue);
    property.setGradientOpacityMinimumOpacity(0, gradientMinOpacity);
    property.setGradientOpacityMaximumValue(0, gradientMaxValue);
    property.setGradientOpacityMaximumOpacity(0, gradientMaxOpacity);
    if (preset.interpolation === '1') {
        property.setInterpolationTypeToFastLinear();
    }
    property.setShade(preset.shade === '1');
    const ambient = parseFloat(preset.ambient);
    const diffuse = parseFloat(preset.diffuse);
    const specular = parseFloat(preset.specular);
    const specularPower = parseFloat(preset.specularPower);
    property.setAmbient(ambient);
    property.setDiffuse(diffuse);
    property.setSpecular(specular);
    property.setSpecularPower(specularPower);
}
function getShiftRange(colorTransferArray) {
    let min = Infinity;
    let max = -Infinity;
    for (let i = 0; i < colorTransferArray.length; i += 4) {
        min = Math.min(min, colorTransferArray[i]);
        max = Math.max(max, colorTransferArray[i]);
    }
    const center = (max - min) / 2;
    return {
        shiftRange: [-center, center],
        min,
        max,
    };
}
function applyPointsToRGBFunction(points, range, cfun) {
    const width = range[1] - range[0];
    const rescaled = points.map(([x, r, g, b]) => [
        x * width + range[0],
        r,
        g,
        b,
    ]);
    cfun.removeAllPoints();
    rescaled.forEach(([x, r, g, b]) => cfun.addRGBPoint(x, r, g, b));
    return rescaled;
}
function applyPointsToPiecewiseFunction(points, range, pwf) {
    const width = range[1] - range[0];
    const rescaled = points.map(([x, y]) => [x * width + range[0], y]);
    pwf.removeAllPoints();
    rescaled.forEach(([x, y]) => pwf.addPoint(x, y));
    return rescaled;
}


/***/ }),

/***/ 91979:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RenderingEngine_getRenderingEngine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39536);
/* harmony import */ var _getViewportsWithVolumeId__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24724);


const autoLoad = (volumeId) => {
    const renderingEngineAndViewportIds = getRenderingEngineAndViewportsContainingVolume(volumeId);
    if (!renderingEngineAndViewportIds?.length) {
        return;
    }
    renderingEngineAndViewportIds.forEach(({ renderingEngine, viewportIds }) => {
        if (!renderingEngine.hasBeenDestroyed) {
            renderingEngine.renderViewports(viewportIds);
        }
    });
};
function getRenderingEngineAndViewportsContainingVolume(volumeId) {
    const renderingEnginesArray = (0,_RenderingEngine_getRenderingEngine__WEBPACK_IMPORTED_MODULE_0__/* .getRenderingEngines */ .qO)();
    const renderingEngineAndViewportIds = [];
    renderingEnginesArray.forEach((renderingEngine) => {
        const viewports = (0,_getViewportsWithVolumeId__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(volumeId);
        if (viewports.length) {
            renderingEngineAndViewportIds.push({
                renderingEngine,
                viewportIds: viewports.map((viewport) => viewport.id),
            });
        }
    });
    return renderingEngineAndViewportIds;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (autoLoad);


/***/ }),

/***/ 84061:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ clamp),
/* harmony export */   q: () => (/* binding */ clamp)
/* harmony export */ });
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}



/***/ }),

/***/ 13859:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findMatchingColormap: () => (/* binding */ findMatchingColormap),
/* harmony export */   getColormap: () => (/* binding */ getColormap),
/* harmony export */   getColormapNames: () => (/* binding */ getColormapNames),
/* harmony export */   registerColormap: () => (/* binding */ registerColormap)
/* harmony export */ });
/* harmony import */ var _kitware_vtk_js_Rendering_Core_ColorTransferFunction_ColorMaps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(660);
/* harmony import */ var _isEqual__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(74638);
/* harmony import */ var _actorCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(98039);



const _colormaps = new Map();
function registerColormap(colormap) {
    _colormaps.set(colormap.Name, colormap);
}
function getColormap(name) {
    return _colormaps.get(name);
}
function getColormapNames() {
    return Array.from(_colormaps.keys());
}
function findMatchingColormap(rgbPoints, actor) {
    const colormapsVTK = _kitware_vtk_js_Rendering_Core_ColorTransferFunction_ColorMaps__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.rgbPresetNames.map((presetName) => _kitware_vtk_js_Rendering_Core_ColorTransferFunction_ColorMaps__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.getPresetByName(presetName));
    const colormapsCS3D = getColormapNames().map((colormapName) => getColormap(colormapName));
    const colormaps = colormapsVTK.concat(colormapsCS3D);
    const matchedColormap = colormaps.find((colormap) => {
        const { RGBPoints: presetRGBPoints } = colormap;
        if (presetRGBPoints.length !== rgbPoints.length) {
            return false;
        }
        for (let i = 0; i < presetRGBPoints.length; i += 4) {
            if (!(0,_isEqual__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay)(presetRGBPoints.slice(i + 1, i + 4), rgbPoints.slice(i + 1, i + 4))) {
                return false;
            }
        }
        return true;
    });
    if (!matchedColormap) {
        return null;
    }
    const opacity = [];
    if ((0,_actorCheck__WEBPACK_IMPORTED_MODULE_2__/* .actorIsA */ .N)(actor, 'vtkVolume')) {
        const opacityPoints = actor
            .getProperty()
            .getScalarOpacity(0)
            .getDataPointer();
        if (!opacityPoints) {
            return {
                name: matchedColormap.Name,
            };
        }
        for (let i = 0; i < opacityPoints.length; i += 2) {
            opacity.push({
                value: opacityPoints[i],
                opacity: opacityPoints[i + 1],
            });
        }
    }
    return {
        name: matchedColormap.Name,
        opacity,
    };
}



/***/ }),

/***/ 74657:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ createLinearRGBTransferFunction)
/* harmony export */ });
/* harmony import */ var _kitware_vtk_js_Rendering_Core_ColorTransferFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33739);

function createLinearRGBTransferFunction(voiRange) {
    const cfun = _kitware_vtk_js_Rendering_Core_ColorTransferFunction__WEBPACK_IMPORTED_MODULE_0__/* ["default"].newInstance */ .Ay.newInstance();
    let lower = 0;
    let upper = 1024;
    if (voiRange.lower !== undefined && voiRange.upper !== undefined) {
        lower = voiRange.lower;
        upper = voiRange.upper;
    }
    cfun.addRGBPoint(lower, 0.0, 0.0, 0.0);
    cfun.addRGBPoint(upper, 1.0, 1.0, 1.0);
    return cfun;
}


/***/ }),

/***/ 40256:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ createSigmoidRGBTransferFunction)
/* harmony export */ });
/* harmony import */ var _kitware_vtk_js_Rendering_Core_ColorTransferFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33739);
/* harmony import */ var _kitware_vtk_js_Common_Core_DataArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42008);
/* harmony import */ var _windowLevel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68136);



function createSigmoidRGBTransferFunction(voiRange, approximationNodes = 1024) {
    const { windowWidth, windowCenter } = _windowLevel__WEBPACK_IMPORTED_MODULE_2__.toWindowLevel(voiRange.lower, voiRange.upper);
    const sigmoid = (x, wc, ww) => {
        return 1 / (1 + Math.exp((-4 * (x - wc)) / ww));
    };
    const logit = (y, wc, ww) => {
        return wc - (ww / 4) * Math.log((1 - y) / y);
    };
    const range = Array.from({ length: approximationNodes }, (_, i) => (i + 1) / (approximationNodes + 2));
    const table = range.flatMap((y) => {
        const x = logit(y, windowCenter, windowWidth);
        return [x, y, y, y, 0.5, 0.0];
    });
    const cfun = _kitware_vtk_js_Rendering_Core_ColorTransferFunction__WEBPACK_IMPORTED_MODULE_0__/* ["default"].newInstance */ .Ay.newInstance();
    cfun.buildFunctionFromArray(_kitware_vtk_js_Common_Core_DataArray__WEBPACK_IMPORTED_MODULE_1__/* ["default"].newInstance */ .Ay.newInstance({
        values: table,
        numberOfComponents: 6,
    }));
    return cfun;
}


/***/ }),

/***/ 63470:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ decimate)
/* harmony export */ });
function decimate(list, interleave, offset = 0) {
    const interleaveIndices = [];
    for (let i = offset; i < list.length; i += interleave) {
        interleaveIndices.push(i);
    }
    return interleaveIndices;
}


/***/ }),

/***/ 99949:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ deepClone)
/* harmony export */ });
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (typeof obj === 'function') {
        return obj;
    }
    if (typeof structuredClone === 'function') {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(deepClone);
    }
    else {
        const clonedObj = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
}


/***/ }),

/***/ 88619:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getClosestImageId)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3823);
/* harmony import */ var _metaData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(74876);
/* harmony import */ var _getSpacingInNormalDirection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(85008);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19325);




function getClosestImageId(imageVolume, worldPos, viewPlaneNormal) {
    const { direction, spacing, imageIds } = imageVolume;
    if (!imageIds.length) {
        return;
    }
    const kVector = direction.slice(6, 9);
    const dotProducts = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.dot */ .eR.dot(kVector, viewPlaneNormal);
    if (Math.abs(dotProducts) < 1 - _constants__WEBPACK_IMPORTED_MODULE_3__.EPSILON) {
        return;
    }
    const spacingInNormalDirection = (0,_getSpacingInNormalDirection__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)({ direction, spacing }, viewPlaneNormal);
    const halfSpacingInNormalDirection = spacingInNormalDirection / 2;
    let imageIdForTool;
    for (let i = 0; i < imageIds.length; i++) {
        const imageId = imageIds[i];
        const { imagePositionPatient } = _metaData__WEBPACK_IMPORTED_MODULE_1__.get('imagePlaneModule', imageId);
        const dir = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.create */ .eR.create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.sub */ .eR.sub(dir, worldPos, imagePositionPatient);
        const dot = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.dot */ .eR.dot(dir, viewPlaneNormal);
        if (Math.abs(dot) < halfSpacingInNormalDirection) {
            imageIdForTool = imageId;
        }
    }
    return imageIdForTool;
}


/***/ }),

/***/ 47476:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getSliceRange__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20537);
/* harmony import */ var _getTargetVolumeAndSpacingInNormalDir__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65292);


function getImageSliceDataForVolumeViewport(viewport) {
    const camera = viewport.getCamera();
    const { spacingInNormalDirection, imageVolume } = (0,_getTargetVolumeAndSpacingInNormalDir__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(viewport, camera);
    if (!imageVolume) {
        return;
    }
    const { viewPlaneNormal, focalPoint } = camera;
    const actorEntry = viewport
        .getActors()
        .find((a) => a.referencedId === imageVolume.volumeId ||
        a.uid === imageVolume.volumeId);
    if (!actorEntry) {
        console.warn('No actor found for with actorUID of', imageVolume.volumeId);
    }
    const volumeActor = actorEntry.actor;
    const sliceRange = (0,_getSliceRange__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(volumeActor, viewPlaneNormal, focalPoint);
    const { min, max, current } = sliceRange;
    const numberOfSlices = Math.round((max - min) / spacingInNormalDirection) + 1;
    let imageIndex = ((current - min) / (max - min)) * numberOfSlices;
    imageIndex = Math.floor(imageIndex);
    if (imageIndex > numberOfSlices - 1) {
        imageIndex = numberOfSlices - 1;
    }
    else if (imageIndex < 0) {
        imageIndex = 0;
    }
    return {
        numberOfSlices,
        imageIndex,
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getImageSliceDataForVolumeViewport);


/***/ }),

/***/ 25308:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getMinMax)
/* harmony export */ });
function getMinMax(storedPixelData) {
    let min = storedPixelData[0];
    let max = storedPixelData[0];
    let storedPixel;
    const numPixels = storedPixelData.length;
    for (let index = 1; index < numPixels; index++) {
        storedPixel = storedPixelData[index];
        min = Math.min(min, storedPixel);
        max = Math.max(max, storedPixel);
    }
    return {
        min,
        max,
    };
}


/***/ }),

/***/ 32173:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getScalingParameters)
/* harmony export */ });
/* harmony import */ var _metaData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74876);

function getScalingParameters(imageId) {
    const modalityLutModule = _metaData__WEBPACK_IMPORTED_MODULE_0__.get('modalityLutModule', imageId) || {};
    const generalSeriesModule = _metaData__WEBPACK_IMPORTED_MODULE_0__.get('generalSeriesModule', imageId) || {};
    const { modality } = generalSeriesModule;
    const scalingParameters = {
        rescaleSlope: modalityLutModule.rescaleSlope || 1,
        rescaleIntercept: modalityLutModule.rescaleIntercept ?? 0,
        modality,
    };
    const suvFactor = _metaData__WEBPACK_IMPORTED_MODULE_0__.get('scalingModule', imageId) || {};
    return {
        ...scalingParameters,
        ...(modality === 'PT' && {
            suvbw: suvFactor.suvbw,
            suvbsa: suvFactor.suvbsa,
            suvlbm: suvFactor.suvlbm,
        }),
    };
}


/***/ }),

/***/ 20537:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getSliceRange)
/* harmony export */ });
/* harmony import */ var _kitware_vtk_js_Common_Core_MatrixBuilder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(89265);
/* harmony import */ var _getVolumeActorCorners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15105);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19325);



const SMALL_EPSILON = _constants__WEBPACK_IMPORTED_MODULE_2__.EPSILON * _constants__WEBPACK_IMPORTED_MODULE_2__.EPSILON;
const isOne = (v) => Math.abs(Math.abs(v) - 1) < SMALL_EPSILON;
const isUnit = (v, off) => isOne(v[off]) || isOne(v[off + 1]) || isOne(v[off + 2]);
const isOrthonormal = (v) => isUnit(v, 0) && isUnit(v, 3) && isUnit(v, 6);
function getSliceRange(volumeActor, viewPlaneNormal, focalPoint) {
    const imageData = volumeActor.getMapper().getInputData();
    let corners;
    const direction = imageData.getDirection();
    if (isOrthonormal(direction)) {
        corners = (0,_getVolumeActorCorners__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(volumeActor);
    }
    else {
        const [dx, dy, dz] = imageData.getDimensions();
        const cornersIdx = [
            [0, 0, 0],
            [dx - 1, 0, 0],
            [0, dy - 1, 0],
            [dx - 1, dy - 1, 0],
            [0, 0, dz - 1],
            [dx - 1, 0, dz - 1],
            [0, dy - 1, dz - 1],
            [dx - 1, dy - 1, dz - 1],
        ];
        corners = cornersIdx.map((it) => imageData.indexToWorld(it));
    }
    const transform = _kitware_vtk_js_Common_Core_MatrixBuilder__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A
        .buildFromDegree()
        .identity()
        .rotateFromDirections(viewPlaneNormal, [1, 0, 0]);
    corners.forEach((pt) => transform.apply(pt));
    const transformedFocalPoint = [...focalPoint];
    transform.apply(transformedFocalPoint);
    const currentSlice = transformedFocalPoint[0];
    let minX = Infinity;
    let maxX = -Infinity;
    for (let i = 0; i < 8; i++) {
        const x = corners[i][0];
        if (x > maxX) {
            maxX = x;
        }
        if (x < minX) {
            minX = x;
        }
    }
    return {
        min: minX,
        max: maxX,
        current: currentSlice,
        actor: volumeActor,
        viewPlaneNormal,
        focalPoint,
    };
}


/***/ }),

/***/ 85008:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getSpacingInNormalDirection)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3823);

function getSpacingInNormalDirection(imageVolume, viewPlaneNormal) {
    const { direction, spacing } = imageVolume;
    const iVector = direction.slice(0, 3);
    const jVector = direction.slice(3, 6);
    const kVector = direction.slice(6, 9);
    const dotProducts = [
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.dot */ .eR.dot(iVector, viewPlaneNormal),
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.dot */ .eR.dot(jVector, viewPlaneNormal),
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.dot */ .eR.dot(kVector, viewPlaneNormal),
    ];
    const projectedSpacing = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.create */ .eR.create();
    gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.set */ .eR.set(projectedSpacing, dotProducts[0] * spacing[0], dotProducts[1] * spacing[1], dotProducts[2] * spacing[2]);
    const spacingInNormalDirection = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.length */ .eR.length(projectedSpacing);
    return spacingInNormalDirection;
}


/***/ }),

/***/ 65292:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getTargetVolumeAndSpacingInNormalDir)
/* harmony export */ });
/* harmony import */ var _cache_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49038);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19325);
/* harmony import */ var _getSpacingInNormalDirection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(85008);
/* harmony import */ var _loaders_volumeLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(39561);
/* harmony import */ var _getVolumeId__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(12437);





const EPSILON_PART = 1 + _constants__WEBPACK_IMPORTED_MODULE_1__.EPSILON;
const startsWith = (str, starts) => starts === str.substring(0, Math.min(str.length, starts.length));
const isPrimaryVolume = (volume) => !!(0,_loaders_volumeLoader__WEBPACK_IMPORTED_MODULE_3__.getVolumeLoaderSchemes)().find((scheme) => startsWith(volume.volumeId, scheme));
function getTargetVolumeAndSpacingInNormalDir(viewport, camera, targetId, useSlabThickness = false) {
    const { viewPlaneNormal } = camera;
    const volumeActors = viewport.getActors();
    if (!volumeActors.length) {
        return {
            spacingInNormalDirection: null,
            imageVolume: null,
            actorUID: null,
        };
    }
    const imageVolumes = volumeActors
        .map((va) => {
        const actorUID = va.referencedId ?? va.uid;
        return _cache_cache__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.getVolume(actorUID);
    })
        .filter((iv) => !!iv);
    if (targetId) {
        const targetVolumeId = (0,_getVolumeId__WEBPACK_IMPORTED_MODULE_4__/* .getVolumeId */ .A)(targetId);
        const imageVolumeIndex = imageVolumes.findIndex((iv) => targetVolumeId.includes(iv.volumeId));
        const imageVolume = imageVolumes[imageVolumeIndex];
        const { uid: actorUID } = volumeActors[imageVolumeIndex];
        const spacingInNormalDirection = getSpacingInNormal(imageVolume, viewPlaneNormal, viewport, useSlabThickness);
        return { imageVolume, spacingInNormalDirection, actorUID };
    }
    if (!imageVolumes.length) {
        return {
            spacingInNormalDirection: null,
            imageVolume: null,
            actorUID: null,
        };
    }
    const smallest = {
        spacingInNormalDirection: Infinity,
        imageVolume: null,
        actorUID: null,
    };
    const hasPrimaryVolume = imageVolumes.find(isPrimaryVolume);
    for (let i = 0; i < imageVolumes.length; i++) {
        const imageVolume = imageVolumes[i];
        if (hasPrimaryVolume && !isPrimaryVolume(imageVolume)) {
            continue;
        }
        const spacingInNormalDirection = getSpacingInNormal(imageVolume, viewPlaneNormal, viewport);
        if (spacingInNormalDirection * EPSILON_PART <
            smallest.spacingInNormalDirection) {
            smallest.spacingInNormalDirection = spacingInNormalDirection;
            smallest.imageVolume = imageVolume;
            smallest.actorUID = volumeActors[i].uid;
        }
    }
    return smallest;
}
function getSpacingInNormal(imageVolume, viewPlaneNormal, viewport, useSlabThickness = false) {
    const { slabThickness } = viewport.getProperties();
    let spacingInNormalDirection = slabThickness;
    if (!slabThickness || !useSlabThickness) {
        spacingInNormalDirection = (0,_getSpacingInNormalDirection__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(imageVolume, viewPlaneNormal);
    }
    return spacingInNormalDirection;
}


/***/ }),

/***/ 24724:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RenderingEngine_getRenderingEngine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39536);

function getViewportsWithVolumeId(volumeId) {
    const renderingEngines = (0,_RenderingEngine_getRenderingEngine__WEBPACK_IMPORTED_MODULE_0__/* .getRenderingEngines */ .qO)();
    const targetViewports = [];
    renderingEngines.forEach((renderingEngine) => {
        const viewports = renderingEngine.getVolumeViewports();
        const filteredViewports = viewports.filter((vp) => vp.hasVolumeId(volumeId));
        targetViewports.push(...filteredViewports);
    });
    return targetViewports;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getViewportsWithVolumeId);


/***/ }),

/***/ 70210:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getVoiFromSigmoidRGBTransferFunction)
/* harmony export */ });
function getVoiFromSigmoidRGBTransferFunction(cfun) {
    let cfunRange = [];
    const [lower, upper] = cfun.getRange();
    cfun.getTable(lower, upper, 1024, cfunRange);
    cfunRange = cfunRange.filter((v, k) => k % 3 === 0);
    const cfunDomain = [...Array(1024).keys()].map((v, k) => {
        return lower + ((upper - lower) / (1024 - 1)) * k;
    });
    const y1 = cfunRange[256];
    const logy1 = Math.log((1 - y1) / y1);
    const x1 = cfunDomain[256];
    const y2 = cfunRange[256 * 3];
    const logy2 = Math.log((1 - y2) / y2);
    const x2 = cfunDomain[256 * 3];
    const ww = Math.round((4 * (x2 - x1)) / (logy1 - logy2));
    const wc = Math.round(x1 + (ww * logy1) / 4);
    return [Math.round(wc - ww / 2), Math.round(wc + ww / 2)];
}


/***/ }),

/***/ 15105:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getVolumeActorCorners)
/* harmony export */ });
function getVolumeActorCorners(volumeActor) {
    const imageData = volumeActor.getMapper().getInputData();
    const bounds = imageData.extentToBounds(imageData.getExtent());
    return [
        [bounds[0], bounds[2], bounds[4]],
        [bounds[0], bounds[2], bounds[5]],
        [bounds[0], bounds[3], bounds[4]],
        [bounds[0], bounds[3], bounds[5]],
        [bounds[1], bounds[2], bounds[4]],
        [bounds[1], bounds[2], bounds[5]],
        [bounds[1], bounds[3], bounds[4]],
        [bounds[1], bounds[3], bounds[5]],
    ];
}


/***/ }),

/***/ 12437:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ getVolumeId)
/* harmony export */ });
const getVolumeId = (targetId) => {
    const prefix = 'volumeId:';
    const str = targetId.includes(prefix)
        ? targetId.substring(prefix.length)
        : targetId;
    const index = str.indexOf('sliceIndex=');
    return index === -1 ? str : str.substring(0, index - 1);
};


/***/ }),

/***/ 4031:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getSliceRange__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20537);
/* harmony import */ var _getTargetVolumeAndSpacingInNormalDir__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65292);


function getVolumeSliceRangeInfo(viewport, volumeId, useSlabThickness = false) {
    const camera = viewport.getCamera();
    const { focalPoint, viewPlaneNormal } = camera;
    const { spacingInNormalDirection, actorUID } = (0,_getTargetVolumeAndSpacingInNormalDir__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(viewport, camera, volumeId, useSlabThickness);
    if (!actorUID) {
        throw new Error(`Could not find image volume with id ${volumeId} in the viewport`);
    }
    const actorEntry = viewport.getActor(actorUID);
    if (!actorEntry) {
        console.warn('No actor found for with actorUID of', actorUID);
        return null;
    }
    const volumeActor = actorEntry.actor;
    const sliceRange = (0,_getSliceRange__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(volumeActor, viewPlaneNormal, focalPoint);
    return {
        sliceRange,
        spacingInNormalDirection,
        camera,
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getVolumeSliceRangeInfo);


/***/ }),

/***/ 61375:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _getVolumeSliceRangeInfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4031);

function getVolumeViewportScrollInfo(viewport, volumeId, useSlabThickness = false) {
    const { sliceRange, spacingInNormalDirection, camera } = (0,_getVolumeSliceRangeInfo__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(viewport, volumeId, useSlabThickness);
    const { min, max, current } = sliceRange;
    const numScrollSteps = Math.round((max - min) / spacingInNormalDirection);
    const fraction = (current - min) / (max - min);
    const floatingStepNumber = fraction * numScrollSteps;
    const currentStepIndex = Math.round(floatingStepNumber);
    return {
        numScrollSteps,
        currentStepIndex,
        sliceRangeInfo: {
            sliceRange,
            spacingInNormalDirection,
            camera,
        },
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getVolumeViewportScrollInfo);


/***/ }),

/***/ 30169:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ hasFloatScalingParameters)
/* harmony export */ });
const hasFloatScalingParameters = (scalingParameters) => {
    const hasFloatRescale = Object.values(scalingParameters).some((value) => typeof value === 'number' && !Number.isInteger(value));
    return hasFloatRescale;
};


/***/ }),

/***/ 38883:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ hasNaNValues)
/* harmony export */ });
function hasNaNValues(input) {
    if (Array.isArray(input)) {
        return input.some((value) => Number.isNaN(value));
    }
    return Number.isNaN(input);
}


/***/ }),

/***/ 39537:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ imageIdToURI)
/* harmony export */ });
function imageIdToURI(imageId) {
    const colonIndex = imageId.indexOf(':');
    return imageId.substring(colonIndex + 1);
}


/***/ }),

/***/ 17791:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _metaData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74876);

const retrieveConfigurationState = new Map();
const IMAGE_RETRIEVE_CONFIGURATION = 'imageRetrieveConfiguration';
const imageRetrieveMetadataProvider = {
    IMAGE_RETRIEVE_CONFIGURATION,
    clear: () => {
        retrieveConfigurationState.clear();
    },
    add: (key, payload) => {
        retrieveConfigurationState.set(key, payload);
    },
    get: (type, ...queries) => {
        if (type === IMAGE_RETRIEVE_CONFIGURATION) {
            return queries
                .map((query) => retrieveConfigurationState.get(query))
                .find((it) => it !== undefined);
        }
    },
};
(0,_metaData__WEBPACK_IMPORTED_MODULE_0__.addProvider)(imageRetrieveMetadataProvider.get.bind(imageRetrieveMetadataProvider));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (imageRetrieveMetadataProvider);


/***/ }),

/***/ 49035:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  PointsManager: () => (/* reexport */ PointsManager),
  ProgressiveIterator: () => (/* reexport */ ProgressiveIterator/* default */.A),
  RLEVoxelMap: () => (/* reexport */ RLEVoxelMap/* default */.A),
  VoxelManager: () => (/* reexport */ VoxelManager/* default */.A),
  actorIsA: () => (/* reexport */ actorCheck/* actorIsA */.N),
  applyPreset: () => (/* reexport */ applyPreset/* default */.A),
  autoLoad: () => (/* reexport */ autoLoad/* default */.A),
  calculateViewportsSpatialRegistration: () => (/* reexport */ utilities_calculateViewportsSpatialRegistration),
  calibratedPixelSpacingMetadataProvider: () => (/* reexport */ calibratedPixelSpacingMetadataProvider),
  clamp: () => (/* reexport */ clamp/* default */.A),
  clip: () => (/* reexport */ utilities_clip),
  color: () => (/* reexport */ color_namespaceObject),
  colormap: () => (/* reexport */ colormap),
  convertStackToVolumeViewport: () => (/* reexport */ convertStackToVolumeViewport),
  convertToGrayscale: () => (/* reexport */ convertToGrayscale),
  convertVolumeToStackViewport: () => (/* reexport */ convertVolumeToStackViewport),
  createLinearRGBTransferFunction: () => (/* reexport */ createLinearRGBTransferFunction/* default */.A),
  createSigmoidRGBTransferFunction: () => (/* reexport */ createSigmoidRGBTransferFunction/* default */.A),
  decimate: () => (/* reexport */ decimate/* default */.A),
  deepClone: () => (/* reexport */ deepClone/* deepClone */.G),
  deepEqual: () => (/* reexport */ deepEqual),
  deepMerge: () => (/* reexport */ deepMerge/* default */.A),
  eventListener: () => (/* reexport */ eventListener_namespaceObject),
  generateVolumePropsFromImageIds: () => (/* reexport */ generateVolumePropsFromImageIds/* generateVolumePropsFromImageIds */.D),
  genericMetadataProvider: () => (/* reexport */ genericMetadataProvider/* default */.A),
  getBufferConfiguration: () => (/* reexport */ getBufferConfiguration/* getBufferConfiguration */.h),
  getClosestImageId: () => (/* reexport */ getClosestImageId/* default */.A),
  getClosestStackImageIndexForPoint: () => (/* reexport */ getClosestStackImageIndexForPoint),
  getCurrentVolumeViewportSlice: () => (/* reexport */ getCurrentVolumeViewportSlice),
  getDynamicVolumeInfo: () => (/* reexport */ utilities_getDynamicVolumeInfo),
  getImageLegacy: () => (/* reexport */ utilities_getImageLegacy),
  getImageSliceDataForVolumeViewport: () => (/* reexport */ getImageSliceDataForVolumeViewport/* default */.A),
  getMinMax: () => (/* reexport */ getMinMax/* default */.A),
  getRandomSampleFromArray: () => (/* reexport */ getRandomSampleFromArray),
  getRuntimeId: () => (/* reexport */ getRuntimeId),
  getScalingParameters: () => (/* reexport */ getScalingParameters/* default */.A),
  getSliceRange: () => (/* reexport */ getSliceRange/* default */.A),
  getSpacingInNormalDirection: () => (/* reexport */ getSpacingInNormalDirection/* default */.A),
  getTargetVolumeAndSpacingInNormalDir: () => (/* reexport */ getTargetVolumeAndSpacingInNormalDir/* default */.A),
  getViewportImageCornersInWorld: () => (/* reexport */ getViewportImageCornersInWorld),
  getViewportImageIds: () => (/* reexport */ utilities_getViewportImageIds),
  getViewportModality: () => (/* binding */ getViewportModality),
  getViewportsWithImageURI: () => (/* reexport */ getViewportsWithImageURI),
  getViewportsWithVolumeId: () => (/* reexport */ getViewportsWithVolumeId/* default */.A),
  getVoiFromSigmoidRGBTransferFunction: () => (/* reexport */ getVoiFromSigmoidRGBTransferFunction/* default */.A),
  getVolumeActorCorners: () => (/* reexport */ getVolumeActorCorners/* default */.A),
  getVolumeId: () => (/* reexport */ getVolumeId/* getVolumeId */.A),
  getVolumeSliceRangeInfo: () => (/* reexport */ getVolumeSliceRangeInfo/* default */.A),
  getVolumeViewportScrollInfo: () => (/* reexport */ getVolumeViewportScrollInfo/* default */.A),
  getVolumeViewportsContainingSameVolumes: () => (/* reexport */ utilities_getVolumeViewportsContainingSameVolumes),
  hasFloatScalingParameters: () => (/* reexport */ hasFloatScalingParameters/* hasFloatScalingParameters */.a),
  hasNaNValues: () => (/* reexport */ hasNaNValues/* default */.A),
  imageIdToURI: () => (/* reexport */ imageIdToURI/* default */.A),
  imageRetrieveMetadataProvider: () => (/* reexport */ imageRetrieveMetadataProvider/* default */.A),
  imageToWorldCoords: () => (/* reexport */ imageToWorldCoords),
  indexWithinDimensions: () => (/* reexport */ indexWithinDimensions),
  invertRgbTransferFunction: () => (/* reexport */ invertRgbTransferFunction/* default */.A),
  isEqual: () => (/* reexport */ isEqual/* isEqual */.n4),
  isEqualAbs: () => (/* reexport */ isEqual/* isEqualAbs */.Ph),
  isEqualNegative: () => (/* reexport */ isEqual/* isEqualNegative */.WC),
  isImageActor: () => (/* reexport */ actorCheck/* isImageActor */.e),
  isOpposite: () => (/* reexport */ isOpposite),
  isPTPrescaledWithSUV: () => (/* reexport */ utilities_isPTPrescaledWithSUV),
  isValidVolume: () => (/* reexport */ isValidVolume),
  isVideoTransferSyntax: () => (/* reexport */ isVideoTransferSyntax),
  jumpToSlice: () => (/* reexport */ jumpToSlice),
  loadImageToCanvas: () => (/* reexport */ loadImageToCanvas),
  makeVolumeMetadata: () => (/* reexport */ makeVolumeMetadata/* default */.A),
  planar: () => (/* reexport */ planar),
  pointInShapeCallback: () => (/* reexport */ pointInShapeCallback/* pointInShapeCallback */.i),
  renderToCanvasCPU: () => (/* reexport */ renderToCanvasCPU),
  renderToCanvasGPU: () => (/* reexport */ renderToCanvasGPU),
  roundNumber: () => (/* reexport */ utilities_roundNumber),
  roundToPrecision: () => (/* reexport */ roundToPrecision),
  scaleArray: () => (/* reexport */ scaleArray),
  scaleRgbTransferFunction: () => (/* reexport */ scaleRGBTransferFunction),
  scroll: () => (/* reexport */ scroll_scroll),
  snapFocalPointToSlice: () => (/* reexport */ snapFocalPointToSlice/* default */.A),
  sortImageIdsAndGetSpacing: () => (/* reexport */ sortImageIdsAndGetSpacing/* default */.A),
  spatialRegistrationMetadataProvider: () => (/* reexport */ utilities_spatialRegistrationMetadataProvider),
  splitImageIdsBy4DTags: () => (/* reexport */ utilities_splitImageIdsBy4DTags),
  transferFunctionUtils: () => (/* reexport */ transferFunctionUtils),
  transformIndexToWorld: () => (/* reexport */ transformIndexToWorld/* default */.A),
  transformWorldToIndex: () => (/* reexport */ transformWorldToIndex/* default */.A),
  triggerEvent: () => (/* reexport */ triggerEvent/* default */.A),
  updateVTKImageDataWithCornerstoneImage: () => (/* reexport */ updateVTKImageDataWithCornerstoneImage/* updateVTKImageDataWithCornerstoneImage */.J),
  uuidv4: () => (/* reexport */ uuidv4/* default */.A),
  windowLevel: () => (/* reexport */ windowLevel),
  worldToImageCoords: () => (/* reexport */ utilities_worldToImageCoords)
});

// NAMESPACE OBJECT: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/eventListener/index.js
var eventListener_namespaceObject = {};
__webpack_require__.r(eventListener_namespaceObject);
__webpack_require__.d(eventListener_namespaceObject, {
  MultiTargetEventListenerManager: () => (MultiTargetEventListenerManager),
  TargetEventListeners: () => (TargetEventListeners)
});

// NAMESPACE OBJECT: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/color.js
var color_namespaceObject = {};
__webpack_require__.r(color_namespaceObject);
__webpack_require__.d(color_namespaceObject, {
  hexToRgb: () => (hexToRgb),
  rgbToHex: () => (rgbToHex)
});

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/eventListener/TargetEventListeners.js
var EventListenerPhases;
(function (EventListenerPhases) {
    EventListenerPhases[EventListenerPhases["None"] = 0] = "None";
    EventListenerPhases[EventListenerPhases["Capture"] = 1] = "Capture";
    EventListenerPhases[EventListenerPhases["Bubble"] = 2] = "Bubble";
})(EventListenerPhases || (EventListenerPhases = {}));
class TargetEventListeners {
    constructor(target) {
        this._eventListeners = new Map();
        this._children = new Map();
        this._target = target;
    }
    get isEmpty() {
        return this._eventListeners.size === 0 && this._children.size === 0;
    }
    addEventListener(type, callback, options) {
        const dotIndex = type.indexOf('.');
        const isNamespace = dotIndex !== -1;
        if (isNamespace) {
            const namespaceToken = type.substring(0, dotIndex);
            let childElementEventListener = this._children.get(namespaceToken);
            if (!childElementEventListener) {
                childElementEventListener = new TargetEventListeners(this._target);
                this._children.set(namespaceToken, childElementEventListener);
            }
            type = type.substring(dotIndex + 1);
            childElementEventListener.addEventListener(type, callback, options);
        }
        else {
            this._addEventListener(type, callback, options);
        }
    }
    removeEventListener(type, callback, options) {
        const dotIndex = type.indexOf('.');
        const isNamespace = dotIndex !== -1;
        if (isNamespace) {
            const namespaceToken = type.substring(0, dotIndex);
            const childElementEventListener = this._children.get(namespaceToken);
            if (!childElementEventListener) {
                return;
            }
            type = type.substring(dotIndex + 1);
            childElementEventListener.removeEventListener(type, callback, options);
            if (childElementEventListener.isEmpty) {
                this._children.delete(namespaceToken);
            }
        }
        else {
            this._removeEventListener(type, callback, options);
        }
    }
    reset() {
        Array.from(this._children.entries()).forEach(([namespace, child]) => {
            child.reset();
            if (child.isEmpty) {
                this._children.delete(namespace);
            }
            else {
                throw new Error('Child is not empty and cannot be removed');
            }
        });
        this._unregisterAllEvents();
    }
    _addEventListener(type, callback, options) {
        let listenersMap = this._eventListeners.get(type);
        if (!listenersMap) {
            listenersMap = new Map();
            this._eventListeners.set(type, listenersMap);
        }
        const useCapture = options?.capture ?? false;
        const listenerPhase = useCapture
            ? EventListenerPhases.Capture
            : EventListenerPhases.Bubble;
        const registeredPhases = listenersMap.get(callback) ?? EventListenerPhases.None;
        if (registeredPhases & listenerPhase) {
            console.warn('A listener is already registered for this phase');
            return;
        }
        listenersMap.set(callback, registeredPhases | listenerPhase);
        this._target.addEventListener(type, callback, options);
    }
    _removeEventListener(type, callback, options) {
        const useCapture = options?.capture ?? false;
        const listenerPhase = useCapture
            ? EventListenerPhases.Capture
            : EventListenerPhases.Bubble;
        const listenersMap = this._eventListeners.get(type);
        if (!listenersMap) {
            return;
        }
        const callbacks = callback ? [callback] : Array.from(listenersMap.keys());
        callbacks.forEach((callbackItem) => {
            const registeredPhases = listenersMap.get(callbackItem) ?? EventListenerPhases.None;
            const phaseRegistered = !!(registeredPhases & listenerPhase);
            if (!phaseRegistered) {
                return;
            }
            this._target.removeEventListener(type, callbackItem, options);
            const newListenerPhase = registeredPhases ^ listenerPhase;
            if (newListenerPhase === EventListenerPhases.None) {
                listenersMap.delete(callbackItem);
            }
            else {
                listenersMap.set(callbackItem, newListenerPhase);
            }
        });
        if (!listenersMap.size) {
            this._eventListeners.delete(type);
        }
    }
    _unregisterAllListeners(type, listenersMap) {
        Array.from(listenersMap.entries()).forEach(([listener, eventPhases]) => {
            const startPhase = EventListenerPhases.Capture;
            for (let currentPhase = startPhase; eventPhases; currentPhase <<= 1) {
                if (!(eventPhases & currentPhase)) {
                    continue;
                }
                const useCapture = currentPhase === EventListenerPhases.Capture ? true : false;
                this.removeEventListener(type, listener, { capture: useCapture });
                eventPhases ^= currentPhase;
            }
        });
    }
    _unregisterAllEvents() {
        Array.from(this._eventListeners.entries()).forEach(([type, listenersMap]) => {
            this._unregisterAllListeners(type, listenersMap);
        });
    }
}


;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/eventListener/MultiTargetEventListenerManager.js

class MultiTargetEventListenerManager {
    constructor() {
        this._targetsEventListeners = new Map();
    }
    addEventListener(target, type, callback, options) {
        let eventListeners = this._targetsEventListeners.get(target);
        if (!eventListeners) {
            eventListeners = new TargetEventListeners(target);
            this._targetsEventListeners.set(target, eventListeners);
        }
        eventListeners.addEventListener(type, callback, options);
    }
    removeEventListener(target, type, callback, options) {
        const eventListeners = this._targetsEventListeners.get(target);
        if (!eventListeners) {
            return;
        }
        eventListeners.removeEventListener(type, callback, options);
        if (eventListeners.isEmpty) {
            this._targetsEventListeners.delete(target);
        }
    }
    reset() {
        Array.from(this._targetsEventListeners.entries()).forEach(([target, targetEventListeners]) => {
            targetEventListeners.reset();
            this._targetsEventListeners.delete(target);
        });
    }
}


;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/eventListener/index.js



// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/invertRgbTransferFunction.js
var invertRgbTransferFunction = __webpack_require__(50134);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/createSigmoidRGBTransferFunction.js
var createSigmoidRGBTransferFunction = __webpack_require__(40256);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getVoiFromSigmoidRGBTransferFunction.js
var getVoiFromSigmoidRGBTransferFunction = __webpack_require__(70210);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/createLinearRGBTransferFunction.js
var createLinearRGBTransferFunction = __webpack_require__(74657);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/scaleRgbTransferFunction.js
function scaleRGBTransferFunction(rgbTransferFunction, scalingFactor) {
    const size = rgbTransferFunction.getSize();
    for (let index = 0; index < size; index++) {
        const nodeValue1 = [];
        rgbTransferFunction.getNodeValue(index, nodeValue1);
        nodeValue1[1] = nodeValue1[1] * scalingFactor;
        nodeValue1[2] = nodeValue1[2] * scalingFactor;
        nodeValue1[3] = nodeValue1[3] * scalingFactor;
        rgbTransferFunction.setNodeValue(index, nodeValue1);
    }
}

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/triggerEvent.js
var triggerEvent = __webpack_require__(69372);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/uuidv4.js
var uuidv4 = __webpack_require__(80221);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getMinMax.js
var getMinMax = __webpack_require__(25308);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getRuntimeId.js
const LAST_RUNTIME_ID = Symbol('LastRuntimeId');
const GLOBAL_CONTEXT = {};
const DEFAULT_MAX = 0xffffffff;
const DEFAULT_SEPARATOR = '-';
function getRuntimeId(context, separator, max) {
    return getNextRuntimeId(context !== null && typeof context === 'object' ? context : GLOBAL_CONTEXT, LAST_RUNTIME_ID, (typeof max === 'number' && max > 0 ? max : DEFAULT_MAX) >>> 0).join(typeof separator === 'string' ? separator : DEFAULT_SEPARATOR);
}
function getNextRuntimeId(context, symbol, max) {
    let idComponents = context[symbol];
    if (!(idComponents instanceof Array)) {
        idComponents = [0];
        Object.defineProperty(context, symbol, { value: idComponents });
    }
    for (let carry = true, i = 0; carry && i < idComponents.length; ++i) {
        let n = idComponents[i] | 0;
        if (n < max) {
            carry = false;
            n = n + 1;
        }
        else {
            n = 0;
            if (i + 1 === idComponents.length) {
                idComponents.push(0);
            }
        }
        idComponents[i] = n;
    }
    return idComponents;
}

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/imageIdToURI.js
var imageIdToURI = __webpack_require__(39537);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/calibratedPixelSpacingMetadataProvider.js

const state = {};
const metadataProvider = {
    add: (imageId, payload) => {
        const imageURI = (0,imageIdToURI/* default */.A)(imageId);
        state[imageURI] = payload;
    },
    get: (type, imageId) => {
        if (type === 'calibratedPixelSpacing') {
            const imageURI = (0,imageIdToURI/* default */.A)(imageId);
            return state[imageURI];
        }
    },
};
/* harmony default export */ const calibratedPixelSpacingMetadataProvider = (metadataProvider);

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/clamp.js
var clamp = __webpack_require__(84061);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/isEqual.js
var isEqual = __webpack_require__(74638);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/isOpposite.js
function isOpposite(v1, v2, tolerance = 1e-5) {
    return (Math.abs(v1[0] + v2[0]) < tolerance &&
        Math.abs(v1[1] + v2[1]) < tolerance &&
        Math.abs(v1[2] + v2[2]) < tolerance);
}

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getClosestImageId.js
var getClosestImageId = __webpack_require__(88619);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getSpacingInNormalDirection.js
var getSpacingInNormalDirection = __webpack_require__(85008);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getTargetVolumeAndSpacingInNormalDir.js
var getTargetVolumeAndSpacingInNormalDir = __webpack_require__(65292);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getVolumeActorCorners.js
var getVolumeActorCorners = __webpack_require__(15105);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/indexWithinDimensions.js
function indexWithinDimensions(index, dimensions) {
    if (index[0] < 0 ||
        index[0] >= dimensions[0] ||
        index[1] < 0 ||
        index[1] >= dimensions[1] ||
        index[2] < 0 ||
        index[2] >= dimensions[2]) {
        return false;
    }
    return true;
}

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/getRenderingEngine.js
var getRenderingEngine = __webpack_require__(39536);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getVolumeViewportsContainingSameVolumes.js

function getVolumeViewportsContainingSameVolumes(targetViewport, renderingEngineId) {
    let renderingEngines;
    if (renderingEngineId) {
        renderingEngines = [(0,getRenderingEngine/* getRenderingEngine */.lD)(renderingEngineId)];
    }
    else {
        renderingEngines = (0,getRenderingEngine/* getRenderingEngines */.qO)();
    }
    const sameVolumesViewports = [];
    renderingEngines.forEach((renderingEngine) => {
        const targetActors = targetViewport.getActors();
        const viewports = renderingEngine.getVolumeViewports();
        for (const vp of viewports) {
            const vpActors = vp.getActors();
            if (vpActors.length !== targetActors.length) {
                continue;
            }
            const sameVolumes = targetActors.every(({ uid }) => vpActors.find((vpActor) => uid === vpActor.uid));
            if (sameVolumes) {
                sameVolumesViewports.push(vp);
            }
        }
    });
    return sameVolumesViewports;
}
/* harmony default export */ const utilities_getVolumeViewportsContainingSameVolumes = (getVolumeViewportsContainingSameVolumes);

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getViewportsWithVolumeId.js
var getViewportsWithVolumeId = __webpack_require__(24724);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/transformWorldToIndex.js
var transformWorldToIndex = __webpack_require__(38669);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/transformIndexToWorld.js
var transformIndexToWorld = __webpack_require__(94741);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/loaders/imageLoader.js
var imageLoader = __webpack_require__(80068);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/metaData.js
var metaData = __webpack_require__(74876);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/index.js + 4 modules
var enums = __webpack_require__(31749);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/requestPool/imageLoadPoolManager.js
var imageLoadPoolManager = __webpack_require__(51159);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/helpers/getOrCreateCanvas.js
var getOrCreateCanvas = __webpack_require__(30135);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/index.js + 3 modules
var RenderingEngine = __webpack_require__(56706);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/isPTPrescaledWithSUV.js
const isPTPrescaledWithSUV = (image) => {
    return image.preScale.scaled && image.preScale.scalingParameters.suvbw;
};
/* harmony default export */ const utilities_isPTPrescaledWithSUV = (isPTPrescaledWithSUV);

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/renderToCanvasGPU.js





function renderToCanvasGPU(canvas, imageOrVolume, modality = undefined, renderingEngineId = '_thumbnails', viewportOptions = {
    displayArea: { imageArea: [1, 1] },
}) {
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
        throw new Error('canvas element is required');
    }
    const isVolume = !imageOrVolume.imageId;
    const image = !isVolume && imageOrVolume;
    const volume = isVolume && imageOrVolume;
    const imageIdToPrint = image.imageId || volume.volumeId;
    const viewportId = `renderGPUViewport-${imageIdToPrint}`;
    const element = document.createElement('div');
    const devicePixelRatio = window.devicePixelRatio || 1;
    if (!viewportOptions.displayArea) {
        viewportOptions.displayArea = { imageArea: [1, 1] };
    }
    const originalWidth = canvas.width;
    const originalHeight = canvas.height;
    element.style.width = `${originalWidth / devicePixelRatio + getOrCreateCanvas/* EPSILON */.p8}px`;
    element.style.height = `${originalHeight / devicePixelRatio + getOrCreateCanvas/* EPSILON */.p8}px`;
    element.style.visibility = 'hidden';
    element.style.position = 'absolute';
    document.body.appendChild(element);
    const uniqueId = viewportId.split(':').join('-');
    element.setAttribute('viewport-id-for-remove', uniqueId);
    const temporaryCanvas = (0,getOrCreateCanvas/* default */.Ay)(element);
    const renderingEngine = (0,getRenderingEngine/* getRenderingEngine */.lD)(renderingEngineId) ||
        new RenderingEngine/* default */.Ay(renderingEngineId);
    let viewport = renderingEngine.getViewport(viewportId);
    if (!viewport) {
        const viewportInput = {
            viewportId,
            type: isVolume ? enums.ViewportType.ORTHOGRAPHIC : enums.ViewportType.STACK,
            element,
            defaultOptions: {
                ...viewportOptions,
                suppressEvents: true,
            },
        };
        renderingEngine.enableElement(viewportInput);
        viewport = renderingEngine.getViewport(viewportId);
    }
    return new Promise((resolve) => {
        let elementRendered = false;
        let { viewReference } = viewportOptions;
        const onImageRendered = (eventDetail) => {
            if (elementRendered) {
                return;
            }
            if (viewReference) {
                const useViewRef = viewReference;
                viewReference = null;
                viewport.setViewReference(useViewRef);
                viewport.render();
                return;
            }
            const context = canvas.getContext('2d');
            context.drawImage(temporaryCanvas, 0, 0, temporaryCanvas.width, temporaryCanvas.height, 0, 0, canvas.width, canvas.height);
            const origin = viewport.canvasToWorld([0, 0]);
            const topRight = viewport.canvasToWorld([
                temporaryCanvas.width / devicePixelRatio,
                0,
            ]);
            const bottomLeft = viewport.canvasToWorld([
                0,
                temporaryCanvas.height / devicePixelRatio,
            ]);
            const thicknessMm = 1;
            elementRendered = true;
            element.removeEventListener(enums.Events.IMAGE_RENDERED, onImageRendered);
            setTimeout(() => {
                renderingEngine.disableElement(viewportId);
                const elements = document.querySelectorAll(`[viewport-id-for-remove="${uniqueId}"]`);
                elements.forEach((element) => {
                    element.remove();
                });
            }, 0);
            resolve({
                origin,
                bottomLeft,
                topRight,
                thicknessMm,
            });
        };
        element.addEventListener(enums.Events.IMAGE_RENDERED, onImageRendered);
        if (isVolume) {
            viewport.setVolumes([volume], false, true);
        }
        else {
            viewport.renderImageObject(imageOrVolume);
        }
        viewport.resetCamera();
        if (modality === 'PT' && !utilities_isPTPrescaledWithSUV(image)) {
            viewport.setProperties({
                voiRange: {
                    lower: image.minPixelValue,
                    upper: image.maxPixelValue,
                },
            });
        }
        viewport.render();
    });
}

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/helpers/cpuFallback/rendering/getDefaultViewport.js
var getDefaultViewport = __webpack_require__(36931);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/helpers/cpuFallback/rendering/calculateTransform.js
var calculateTransform = __webpack_require__(7808);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/helpers/cpuFallback/drawImageSync.js
var drawImageSync = __webpack_require__(5057);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/renderToCanvasCPU.js



function renderToCanvasCPU(canvas, imageOrVolume, modality, _renderingEngineId, _viewportOptions) {
    const volume = imageOrVolume;
    if (volume.volumeId) {
        throw new Error('Unsupported volume rendering for CPU');
    }
    const image = imageOrVolume;
    const viewport = (0,getDefaultViewport/* default */.A)(canvas, image, modality);
    const enabledElement = {
        canvas,
        viewport,
        image,
        renderingTools: {},
    };
    enabledElement.transform = (0,calculateTransform/* default */.A)(enabledElement);
    const invalidated = true;
    return new Promise((resolve, reject) => {
        (0,drawImageSync/* default */.A)(enabledElement, invalidated);
        resolve(null);
    });
}

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/init.js + 1 modules
var init = __webpack_require__(59693);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/cache/cache.js
var cache = __webpack_require__(49038);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/loadImageToCanvas.js








function loadImageToCanvas(options) {
    const { canvas, imageId, viewReference, requestType = enums.RequestType.Thumbnail, priority = -5, renderingEngineId = '_thumbnails', useCPURendering = false, thumbnail = false, imageAspect = false, viewportOptions: baseViewportOptions, } = options;
    const volumeId = viewReference?.volumeId;
    const isVolume = volumeId && !imageId;
    const viewportOptions = viewReference && baseViewportOptions
        ? { ...baseViewportOptions, viewReference }
        : baseViewportOptions;
    const renderFn = useCPURendering ? renderToCanvasCPU : renderToCanvasGPU;
    return new Promise((resolve, reject) => {
        function successCallback(imageOrVolume, imageId) {
            const { modality } = metaData.get('generalSeriesModule', imageId) || {};
            const image = !isVolume && imageOrVolume;
            const volume = isVolume && imageOrVolume;
            if (image) {
                image.isPreScaled = image.isPreScaled || image.preScale?.scaled;
            }
            if (thumbnail) {
                canvas.height = 256;
                canvas.width = 256;
            }
            if (imageAspect && image) {
                canvas.width = image && (canvas.height * image.width) / image.height;
            }
            canvas.style.width = `${canvas.width / devicePixelRatio}px`;
            canvas.style.height = `${canvas.height / devicePixelRatio}px`;
            if (volume && useCPURendering) {
                reject(new Error('CPU rendering of volume not supported'));
            }
            renderFn(canvas, imageOrVolume, modality, renderingEngineId, viewportOptions).then(resolve);
        }
        function errorCallback(error, imageId) {
            console.error(error, imageId);
            reject(error);
        }
        function sendRequest(imageId, imageIdIndex, options) {
            return (0,imageLoader.loadAndCacheImage)(imageId, options).then((image) => {
                successCallback.call(this, image, imageId);
            }, (error) => {
                errorCallback.call(this, error, imageId);
            });
        }
        const options = {
            useRGBA: !!useCPURendering,
            requestType,
        };
        if (volumeId) {
            const volume = cache/* default */.Ay.getVolume(volumeId);
            if (!volume) {
                reject(new Error(`Volume id ${volumeId} not found in cache`));
            }
            const useImageId = volume.imageIds[0];
            successCallback(volume, useImageId);
        }
        else {
            imageLoadPoolManager/* default */.A.addRequest(sendRequest.bind(null, imageId, null, options), requestType, { imageId }, priority);
        }
    });
}

// EXTERNAL MODULE: ../../../node_modules/gl-matrix/esm/index.js + 1 modules
var esm = __webpack_require__(3823);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/worldToImageCoords.js


function worldToImageCoords(imageId, worldCoords) {
    const imagePlaneModule = (0,metaData.get)('imagePlaneModule', imageId);
    if (!imagePlaneModule) {
        throw new Error(`No imagePlaneModule found for imageId: ${imageId}`);
    }
    const { columnCosines, rowCosines, imagePositionPatient: origin, } = imagePlaneModule;
    let { columnPixelSpacing, rowPixelSpacing } = imagePlaneModule;
    columnPixelSpacing ||= 1;
    rowPixelSpacing ||= 1;
    const newOrigin = esm/* vec3.create */.eR.create();
    esm/* vec3.scaleAndAdd */.eR.scaleAndAdd(newOrigin, origin, columnCosines, -columnPixelSpacing / 2);
    esm/* vec3.scaleAndAdd */.eR.scaleAndAdd(newOrigin, newOrigin, rowCosines, -rowPixelSpacing / 2);
    const sub = esm/* vec3.create */.eR.create();
    esm/* vec3.sub */.eR.sub(sub, worldCoords, newOrigin);
    const rowDistance = esm/* vec3.dot */.eR.dot(sub, rowCosines);
    const columnDistance = esm/* vec3.dot */.eR.dot(sub, columnCosines);
    const imageCoords = [
        rowDistance / rowPixelSpacing,
        columnDistance / columnPixelSpacing,
    ];
    return imageCoords;
}
/* harmony default export */ const utilities_worldToImageCoords = (worldToImageCoords);

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/imageToWorldCoords.js


function imageToWorldCoords(imageId, imageCoords) {
    const imagePlaneModule = (0,metaData.get)('imagePlaneModule', imageId);
    if (!imagePlaneModule) {
        throw new Error(`No imagePlaneModule found for imageId: ${imageId}`);
    }
    const { columnCosines, rowCosines, imagePositionPatient: origin, } = imagePlaneModule;
    let { columnPixelSpacing, rowPixelSpacing } = imagePlaneModule;
    columnPixelSpacing ||= 1;
    rowPixelSpacing ||= 1;
    const imageCoordsInWorld = esm/* vec3.create */.eR.create();
    esm/* vec3.scaleAndAdd */.eR.scaleAndAdd(imageCoordsInWorld, origin, rowCosines, rowPixelSpacing * (imageCoords[0] - 0.5));
    esm/* vec3.scaleAndAdd */.eR.scaleAndAdd(imageCoordsInWorld, imageCoordsInWorld, columnCosines, columnPixelSpacing * (imageCoords[1] - 0.5));
    return Array.from(imageCoordsInWorld);
}

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getVolumeSliceRangeInfo.js
var getVolumeSliceRangeInfo = __webpack_require__(4031);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getVolumeViewportScrollInfo.js
var getVolumeViewportScrollInfo = __webpack_require__(61375);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getSliceRange.js
var getSliceRange = __webpack_require__(20537);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/snapFocalPointToSlice.js
var snapFocalPointToSlice = __webpack_require__(80500);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getImageSliceDataForVolumeViewport.js
var getImageSliceDataForVolumeViewport = __webpack_require__(47476);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/actorCheck.js
var actorCheck = __webpack_require__(98039);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getViewportsWithImageURI.js

function getViewportsWithImageURI(imageURI) {
    const renderingEngines = (0,getRenderingEngine/* getRenderingEngines */.qO)();
    const viewports = [];
    renderingEngines.forEach((renderingEngine) => {
        const viewportsForRenderingEngine = renderingEngine.getViewports();
        viewportsForRenderingEngine.forEach((viewport) => {
            if (viewport.hasImageURI(imageURI)) {
                viewports.push(viewport);
            }
        });
    });
    return viewports;
}

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/planar.js
var planar = __webpack_require__(52268);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getClosestStackImageIndexForPoint.js



function getClosestStackImageIndexForPoint(point, viewport) {
    const minimalDistance = calculateMinimalDistanceForStackViewport(point, viewport);
    return minimalDistance ? minimalDistance.index : null;
}
function calculateMinimalDistanceForStackViewport(point, viewport) {
    const imageIds = viewport.getImageIds();
    const currentImageIdIndex = viewport.getCurrentImageIdIndex();
    if (imageIds.length === 0) {
        return null;
    }
    const getDistance = (imageId) => {
        const planeMetadata = getPlaneMetadata(imageId);
        if (!planeMetadata) {
            return null;
        }
        const plane = planar.planeEquation(planeMetadata.planeNormal, planeMetadata.imagePositionPatient);
        const distance = planar.planeDistanceToPoint(plane, point);
        return distance;
    };
    const closestStack = {
        distance: getDistance(imageIds[currentImageIdIndex]) ?? Infinity,
        index: currentImageIdIndex,
    };
    const higherImageIds = imageIds.slice(currentImageIdIndex + 1);
    for (let i = 0; i < higherImageIds.length; i++) {
        const id = higherImageIds[i];
        const distance = getDistance(id);
        if (distance === null) {
            continue;
        }
        if (distance <= closestStack.distance) {
            closestStack.distance = distance;
            closestStack.index = i + currentImageIdIndex + 1;
        }
        else {
            break;
        }
    }
    const lowerImageIds = imageIds.slice(0, currentImageIdIndex);
    for (let i = lowerImageIds.length - 1; i >= 0; i--) {
        const id = lowerImageIds[i];
        const distance = getDistance(id);
        if (distance === null || distance === closestStack.distance) {
            continue;
        }
        if (distance < closestStack.distance) {
            closestStack.distance = distance;
            closestStack.index = i;
        }
        else {
            break;
        }
    }
    return closestStack.distance === Infinity ? null : closestStack;
}
function getPlaneMetadata(imageId) {
    const targetImagePlane = metaData.get('imagePlaneModule', imageId);
    if (!targetImagePlane ||
        !(targetImagePlane.rowCosines instanceof Array &&
            targetImagePlane.rowCosines.length === 3) ||
        !(targetImagePlane.columnCosines instanceof Array &&
            targetImagePlane.columnCosines.length === 3) ||
        !(targetImagePlane.imagePositionPatient instanceof Array &&
            targetImagePlane.imagePositionPatient.length === 3)) {
        return null;
    }
    const { rowCosines, columnCosines, imagePositionPatient, } = targetImagePlane;
    const rowVec = esm/* vec3.set */.eR.set(esm/* vec3.create */.eR.create(), ...rowCosines);
    const colVec = esm/* vec3.set */.eR.set(esm/* vec3.create */.eR.create(), ...columnCosines);
    const planeNormal = esm/* vec3.cross */.eR.cross(esm/* vec3.create */.eR.create(), rowVec, colVec);
    return { rowCosines, columnCosines, imagePositionPatient, planeNormal };
}

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/transformCanvasToIJK.js
var transformCanvasToIJK = __webpack_require__(51919);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getCurrentVolumeViewportSlice.js


function getCurrentVolumeViewportSlice(viewport) {
    const { width: canvasWidth, height: canvasHeight } = viewport.getCanvas();
    const { sliceToIndexMatrix, indexToSliceMatrix } = viewport.getSliceViewInfo();
    const ijkOriginPoint = (0,transformCanvasToIJK/* transformCanvasToIJK */.e)(viewport, [0, 0]);
    const ijkRowPoint = (0,transformCanvasToIJK/* transformCanvasToIJK */.e)(viewport, [canvasWidth - 1, 0]);
    const ijkColPoint = (0,transformCanvasToIJK/* transformCanvasToIJK */.e)(viewport, [0, canvasHeight - 1]);
    const ijkRowVec = esm/* vec3.sub */.eR.sub(esm/* vec3.create */.eR.create(), ijkRowPoint, ijkOriginPoint);
    const ijkColVec = esm/* vec3.sub */.eR.sub(esm/* vec3.create */.eR.create(), ijkColPoint, ijkOriginPoint);
    const ijkSliceVec = esm/* vec3.cross */.eR.cross(esm/* vec3.create */.eR.create(), ijkRowVec, ijkColVec);
    esm/* vec3.normalize */.eR.normalize(ijkRowVec, ijkRowVec);
    esm/* vec3.normalize */.eR.normalize(ijkColVec, ijkColVec);
    esm/* vec3.normalize */.eR.normalize(ijkSliceVec, ijkSliceVec);
    const maxIJKRowVec = Math.max(Math.abs(ijkRowVec[0]), Math.abs(ijkRowVec[1]), Math.abs(ijkRowVec[2]));
    const maxIJKColVec = Math.max(Math.abs(ijkColVec[0]), Math.abs(ijkColVec[1]), Math.abs(ijkColVec[2]));
    if (!esm/* glMatrix.equals */.Fd.equals(1, maxIJKRowVec) || !esm/* glMatrix.equals */.Fd.equals(1, maxIJKColVec)) {
        throw new Error('Livewire is not available for rotate/oblique viewports');
    }
    const { voxelManager } = viewport.getImageData();
    const sliceViewInfo = viewport.getSliceViewInfo();
    const scalarData = voxelManager.getSliceData(sliceViewInfo);
    return {
        width: sliceViewInfo.width,
        height: sliceViewInfo.height,
        scalarData,
        sliceToIndexMatrix,
        indexToSliceMatrix,
    };
}


;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/spatialRegistrationMetadataProvider.js


const spatialRegistrationMetadataProvider_state = {};
const spatialRegistrationMetadataProvider = {
    add: (query, payload) => {
        const [viewportId1, viewportId2] = query;
        const entryId = `${viewportId1}_${viewportId2}`;
        if (!spatialRegistrationMetadataProvider_state[entryId]) {
            spatialRegistrationMetadataProvider_state[entryId] = {};
        }
        spatialRegistrationMetadataProvider_state[entryId] = payload;
    },
    get: (type, viewportId1, viewportId2) => {
        if (type !== 'spatialRegistrationModule') {
            return;
        }
        const entryId = `${viewportId1}_${viewportId2}`;
        if (spatialRegistrationMetadataProvider_state[entryId]) {
            return spatialRegistrationMetadataProvider_state[entryId];
        }
        const entryIdReverse = `${viewportId2}_${viewportId1}`;
        if (spatialRegistrationMetadataProvider_state[entryIdReverse]) {
            return esm/* mat4.invert */.pB.invert(esm/* mat4.create */.pB.create(), spatialRegistrationMetadataProvider_state[entryIdReverse]);
        }
    },
};
(0,metaData.addProvider)(spatialRegistrationMetadataProvider.get.bind(spatialRegistrationMetadataProvider));
/* harmony default export */ const utilities_spatialRegistrationMetadataProvider = (spatialRegistrationMetadataProvider);

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/calculateViewportsSpatialRegistration.js



const ALLOWED_DELTA = 0.05;
function calculateViewportsSpatialRegistration(viewport1, viewport2) {
    const imageId1 = viewport1.getSliceIndex();
    const imageId2 = viewport2.getSliceIndex();
    const imagePlaneModule1 = (0,metaData.get)('imagePlaneModule', imageId1.toString());
    const imagePlaneModule2 = (0,metaData.get)('imagePlaneModule', imageId2.toString());
    if (!imagePlaneModule1 || !imagePlaneModule2) {
        console.log('Viewport spatial registration requires image plane module');
        return;
    }
    const { imageOrientationPatient: iop2 } = imagePlaneModule2;
    const isSameImagePlane = imagePlaneModule1.imageOrientationPatient.every((v, i) => Math.abs(v - iop2[i]) < ALLOWED_DELTA);
    if (!isSameImagePlane) {
        console.log('Viewport spatial registration only supported for same orientation (hence translation only) for now', imagePlaneModule1?.imageOrientationPatient, imagePlaneModule2?.imageOrientationPatient);
        return;
    }
    const imagePositionPatient1 = imagePlaneModule1.imagePositionPatient;
    const imagePositionPatient2 = imagePlaneModule2.imagePositionPatient;
    const translation = esm/* vec3.subtract */.eR.subtract(esm/* vec3.create */.eR.create(), imagePositionPatient1, imagePositionPatient2);
    const mat = esm/* mat4.fromTranslation */.pB.fromTranslation(esm/* mat4.create */.pB.create(), translation);
    utilities_spatialRegistrationMetadataProvider.add([viewport1.id, viewport2.id], mat);
}
/* harmony default export */ const utilities_calculateViewportsSpatialRegistration = (calculateViewportsSpatialRegistration);

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getViewportImageCornersInWorld.js
function getViewportImageCornersInWorld(viewport) {
    const { imageData, dimensions } = viewport.getImageData();
    const { canvas } = viewport;
    const ratio = window.devicePixelRatio;
    const topLeftCanvas = [0, 0];
    const topRightCanvas = [canvas.width / ratio, 0];
    const bottomRightCanvas = [
        canvas.width / ratio,
        canvas.height / ratio,
    ];
    const bottomLeftCanvas = [0, canvas.height / ratio];
    const topLeftWorld = viewport.canvasToWorld(topLeftCanvas);
    const topRightWorld = viewport.canvasToWorld(topRightCanvas);
    const bottomRightWorld = viewport.canvasToWorld(bottomRightCanvas);
    const bottomLeftWorld = viewport.canvasToWorld(bottomLeftCanvas);
    const topLeftImage = imageData.worldToIndex(topLeftWorld);
    const topRightImage = imageData.worldToIndex(topRightWorld);
    const bottomRightImage = imageData.worldToIndex(bottomRightWorld);
    const bottomLeftImage = imageData.worldToIndex(bottomLeftWorld);
    return _getStackViewportImageCorners({
        dimensions,
        imageData,
        topLeftImage,
        topRightImage,
        bottomRightImage,
        bottomLeftImage,
        topLeftWorld,
        topRightWorld,
        bottomRightWorld,
        bottomLeftWorld,
    });
}
function _getStackViewportImageCorners({ dimensions, imageData, topLeftImage, topRightImage, bottomRightImage, bottomLeftImage, topLeftWorld, topRightWorld, bottomRightWorld, bottomLeftWorld, }) {
    const topLeftImageWorld = _isInBounds(topLeftImage, dimensions)
        ? topLeftWorld
        : imageData.indexToWorld([0, 0, 0]);
    const topRightImageWorld = _isInBounds(topRightImage, dimensions)
        ? topRightWorld
        : imageData.indexToWorld([dimensions[0] - 1, 0, 0]);
    const bottomRightImageWorld = _isInBounds(bottomRightImage, dimensions)
        ? bottomRightWorld
        : imageData.indexToWorld([
            dimensions[0] - 1,
            dimensions[1] - 1,
            0,
        ]);
    const bottomLeftImageWorld = _isInBounds(bottomLeftImage, dimensions)
        ? bottomLeftWorld
        : imageData.indexToWorld([0, dimensions[1] - 1, 0]);
    return [
        topLeftImageWorld,
        topRightImageWorld,
        bottomLeftImageWorld,
        bottomRightImageWorld,
    ];
}
function _isInBounds(imageCoord, dimensions) {
    return (imageCoord[0] > 0 ||
        imageCoord[0] < dimensions[0] - 1 ||
        imageCoord[1] > 0 ||
        imageCoord[1] < dimensions[1] - 1 ||
        imageCoord[2] > 0 ||
        imageCoord[2] < dimensions[2] - 1);
}

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/hasNaNValues.js
var hasNaNValues = __webpack_require__(38883);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/applyPreset.js
var applyPreset = __webpack_require__(96833);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/PointsManager.js
class PointsManager {
    constructor(configuration = {}) {
        this._dimensions = 3;
        this._length = 0;
        this._byteSize = 4;
        this.growSize = 128;
        const { initialSize = 1024, dimensions = 3, growSize = 128, } = configuration;
        const itemLength = initialSize * dimensions;
        this.growSize = growSize;
        this.array = new ArrayBuffer(itemLength * this._byteSize);
        this.data = new Float32Array(this.array);
        this._dimensions = dimensions;
    }
    forEach(func) {
        for (let i = 0; i < this._length; i++) {
            func(this.getPoint(i), i);
        }
    }
    get length() {
        return this._length;
    }
    get dimensions() {
        return this._dimensions;
    }
    get dimensionLength() {
        return this._length * this._dimensions;
    }
    getPoint(index) {
        if (index < 0) {
            index += this._length;
        }
        if (index < 0 || index >= this._length) {
            return;
        }
        const offset = this._dimensions * index;
        return this.data.subarray(offset, offset + this._dimensions);
    }
    getPointArray(index) {
        const array = [];
        if (index < 0) {
            index += this._length;
        }
        if (index < 0 || index >= this._length) {
            return;
        }
        const offset = this._dimensions * index;
        for (let i = 0; i < this._dimensions; i++) {
            array.push(this.data[i + offset]);
        }
        return array;
    }
    grow(additionalSize = 1, growSize = this.growSize) {
        if (this.dimensionLength + additionalSize * this._dimensions <=
            this.data.length) {
            return;
        }
        const newSize = this.data.length + growSize;
        const newArray = new ArrayBuffer(newSize * this._dimensions * this._byteSize);
        const newData = new Float32Array(newArray);
        newData.set(this.data);
        this.data = newData;
        this.array = newArray;
    }
    reverse() {
        const midLength = Math.floor(this._length / 2);
        for (let i = 0; i < midLength; i++) {
            const indexStart = i * this._dimensions;
            const indexEnd = (this._length - 1 - i) * this._dimensions;
            for (let dimension = 0; dimension < this._dimensions; dimension++) {
                const valueStart = this.data[indexStart + dimension];
                this.data[indexStart + dimension] = this.data[indexEnd + dimension];
                this.data[indexEnd + dimension] = valueStart;
            }
        }
    }
    push(point) {
        this.grow(1);
        const offset = this.length * this._dimensions;
        for (let i = 0; i < this._dimensions; i++) {
            this.data[i + offset] = point[i];
        }
        this._length++;
    }
    map(f) {
        const mapData = [];
        for (let i = 0; i < this._length; i++) {
            mapData.push(f(this.getPoint(i), i));
        }
        return mapData;
    }
    get points() {
        return this.map((p) => p);
    }
    toXYZ() {
        const xyz = { x: [], y: [] };
        if (this._dimensions >= 3) {
            xyz.z = [];
        }
        const { x, y, z } = xyz;
        this.forEach((p) => {
            x.push(p[0]);
            y.push(p[1]);
            if (z) {
                z.push(p[2]);
            }
        });
        return xyz;
    }
    static fromXYZ({ x, y, z }) {
        const array = PointsManager.create3(x.length);
        let offset = 0;
        for (let i = 0; i < x.length; i++) {
            array.data[offset++] = x[i];
            array.data[offset++] = y[i];
            array.data[offset++] = z ? z[i] : 0;
        }
        array._length = x.length;
        return array;
    }
    subselect(count = 10, offset = 0) {
        const selected = new PointsManager({
            initialSize: count,
            dimensions: this._dimensions,
        });
        for (let i = 0; i < count; i++) {
            const index = (offset + Math.floor((this.length * i) / count)) % this.length;
            selected.push(this.getPoint(index));
        }
        return selected;
    }
    static create3(initialSize = 128) {
        return new PointsManager({ initialSize, dimensions: 3 });
    }
    static create2(initialSize = 128) {
        return new PointsManager({ initialSize, dimensions: 2 });
    }
}

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/deepMerge.js
var deepMerge = __webpack_require__(74268);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getScalingParameters.js
var getScalingParameters = __webpack_require__(32173);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/StackViewport.js + 12 modules
var StackViewport = __webpack_require__(58165);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/getEnabledElement.js
var getEnabledElement = __webpack_require__(86846);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getImageLegacy.js


function getImageLegacy(element) {
    const enabledElement = (0,getEnabledElement/* default */.Ay)(element);
    if (!enabledElement) {
        return;
    }
    const { viewport } = enabledElement;
    if (!(viewport instanceof StackViewport/* default */.A)) {
        throw new Error(`An image can only be fetched for a stack viewport and not for a viewport of type: ${viewport.type}`);
    }
    return viewport.getCornerstoneImage();
}
/* harmony default export */ const utilities_getImageLegacy = (getImageLegacy);

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/sortImageIdsAndGetSpacing.js
var sortImageIdsAndGetSpacing = __webpack_require__(90537);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/makeVolumeMetadata.js
var makeVolumeMetadata = __webpack_require__(1865);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/genericMetadataProvider.js
var genericMetadataProvider = __webpack_require__(27119);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/isValidVolume.js


function isValidVolume(imageIds) {
    const imageId0 = imageIds[0];
    const { modality, seriesInstanceUID } = metaData.get('generalSeriesModule', imageId0);
    const { imageOrientationPatient, pixelSpacing, frameOfReferenceUID, columns, rows, } = metaData.get('imagePlaneModule', imageId0);
    const baseMetadata = {
        modality,
        imageOrientationPatient,
        pixelSpacing,
        frameOfReferenceUID,
        columns,
        rows,
        seriesInstanceUID,
    };
    const validVolume = imageIds.every((imageId) => {
        const { modality, seriesInstanceUID } = metaData.get('generalSeriesModule', imageId);
        const { imageOrientationPatient, pixelSpacing, columns, rows } = metaData.get('imagePlaneModule', imageId);
        return (seriesInstanceUID === baseMetadata.seriesInstanceUID &&
            modality === baseMetadata.modality &&
            columns === baseMetadata.columns &&
            rows === baseMetadata.rows &&
            (0,isEqual/* default */.Ay)(imageOrientationPatient, baseMetadata.imageOrientationPatient) &&
            (0,isEqual/* default */.Ay)(pixelSpacing, baseMetadata.pixelSpacing));
    });
    return validVolume;
}


// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/updateVTKImageDataWithCornerstoneImage.js
var updateVTKImageDataWithCornerstoneImage = __webpack_require__(45278);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/ProgressiveIterator.js
var ProgressiveIterator = __webpack_require__(22191);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/decimate.js
var decimate = __webpack_require__(63470);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/imageRetrieveMetadataProvider.js
var imageRetrieveMetadataProvider = __webpack_require__(17791);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/isVideoTransferSyntax.js
const videoUIDs = new Set([
    '1.2.840.10008.1.2.4.100',
    '1.2.840.10008.1.2.4.100.1',
    '1.2.840.10008.1.2.4.101',
    '1.2.840.10008.1.2.4.101.1',
    '1.2.840.10008.1.2.4.102',
    '1.2.840.10008.1.2.4.102.1',
    '1.2.840.10008.1.2.4.103',
    '1.2.840.10008.1.2.4.103.1',
    '1.2.840.10008.1.2.4.104',
    '1.2.840.10008.1.2.4.104.1',
    '1.2.840.10008.1.2.4.105',
    '1.2.840.10008.1.2.4.105.1',
    '1.2.840.10008.1.2.4.106',
    '1.2.840.10008.1.2.4.106.1',
    '1.2.840.10008.1.2.4.107',
    '1.2.840.10008.1.2.4.108',
]);
function isVideoTransferSyntax(uidOrUids) {
    if (!uidOrUids) {
        return false;
    }
    const uids = Array.isArray(uidOrUids) ? uidOrUids : [uidOrUids];
    return uids.find((uid) => videoUIDs.has(uid));
}

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getBufferConfiguration.js
var getBufferConfiguration = __webpack_require__(99576);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/generateVolumePropsFromImageIds.js
var generateVolumePropsFromImageIds = __webpack_require__(9734);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/helpers/index.js + 2 modules
var helpers = __webpack_require__(98834);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/loaders/volumeLoader.js
var volumeLoader = __webpack_require__(39561);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/convertStackToVolumeViewport.js




async function convertStackToVolumeViewport({ viewport, options = {}, }) {
    const renderingEngine = viewport.getRenderingEngine();
    let volumeId = options.volumeId || `${(0,uuidv4/* default */.A)()}`;
    if (volumeId.split(':').length === 0) {
        const schema = (0,volumeLoader.getUnknownVolumeLoaderSchema)();
        volumeId = `${schema}:${volumeId}`;
    }
    const { id, element } = viewport;
    const viewportId = options.viewportId || id;
    const imageIds = viewport.getImageIds();
    const prevViewPresentation = viewport.getViewPresentation();
    const prevViewReference = viewport.getViewReference();
    renderingEngine.enableElement({
        viewportId,
        type: enums.ViewportType.ORTHOGRAPHIC,
        element,
        defaultOptions: {
            background: options.background,
            orientation: options.orientation,
        },
    });
    const volume = (await (0,volumeLoader.createAndCacheVolume)(volumeId, {
        imageIds,
    }));
    volume.load();
    const volumeViewport = renderingEngine.getViewport(viewportId);
    await (0,helpers/* setVolumesForViewports */.A7)(renderingEngine, [
        {
            volumeId,
        },
    ], [viewportId]);
    const volumeViewportNewVolumeHandler = () => {
        volumeViewport.render();
        element.removeEventListener(enums.Events.VOLUME_VIEWPORT_NEW_VOLUME, volumeViewportNewVolumeHandler);
    };
    const addVolumeViewportNewVolumeListener = () => {
        element.addEventListener(enums.Events.VOLUME_VIEWPORT_NEW_VOLUME, volumeViewportNewVolumeHandler);
    };
    addVolumeViewportNewVolumeListener();
    volumeViewport.setViewPresentation(prevViewPresentation);
    volumeViewport.setViewReference(prevViewReference);
    volumeViewport.render();
    return volumeViewport;
}


// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/cache/classes/ImageVolume.js
var ImageVolume = __webpack_require__(86252);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/convertVolumeToStackViewport.js



async function convertVolumeToStackViewport({ viewport, options, }) {
    const volumeViewport = viewport;
    const { id, element } = volumeViewport;
    const renderingEngine = viewport.getRenderingEngine();
    const { background } = options;
    const viewportId = options.viewportId || id;
    const volume = cache/* default */.Ay.getVolume(volumeViewport.getVolumeId());
    if (!(volume instanceof ImageVolume/* ImageVolume */.Q)) {
        throw new Error('Currently, you cannot decache a volume that is not an ImageVolume. So, unfortunately, volumes such as nifti  (which are basic Volume, without imageIds) cannot be decached.');
    }
    const viewportInput = {
        viewportId,
        type: enums.ViewportType.STACK,
        element,
        defaultOptions: {
            background,
        },
    };
    const prevView = volumeViewport.getViewReference();
    renderingEngine.enableElement(viewportInput);
    const stackViewport = renderingEngine.getViewport(viewportId);
    await stackViewport.setStack(volume.imageIds);
    stackViewport.setViewReference(prevView);
    stackViewport.render();
    return stackViewport;
}


// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/VoxelManager.js
var VoxelManager = __webpack_require__(24623);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/RLEVoxelMap.js
var RLEVoxelMap = __webpack_require__(67645);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/constants/index.js + 6 modules
var constants = __webpack_require__(19325);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/roundNumber.js

function roundNumber(value, precision = 2) {
    if (Array.isArray(value)) {
        return value.map((v) => roundNumber(v, precision)).join(', ');
    }
    if (value === undefined || value === null || value === '') {
        return 'NaN';
    }
    value = Number(value);
    const absValue = Math.abs(value);
    if (absValue < 0.0001) {
        return `${value}`;
    }
    const fixedPrecision = absValue >= 100
        ? precision - 2
        : absValue >= 10
            ? precision - 1
            : absValue >= 1
                ? precision
                : absValue >= 0.1
                    ? precision + 1
                    : absValue >= 0.01
                        ? precision + 2
                        : absValue >= 0.001
                            ? precision + 3
                            : precision + 4;
    return value.toFixed(fixedPrecision);
}
function roundToPrecision(value) {
    return Math.round(value / constants.EPSILON) * constants.EPSILON;
}

/* harmony default export */ const utilities_roundNumber = (roundNumber);

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/convertToGrayscale.js
function convertToGrayscale(scalarData, width, height) {
    const isRGBA = scalarData.length === width * height * 4;
    const isRGB = scalarData.length === width * height * 3;
    if (isRGBA || isRGB) {
        const newScalarData = new Float32Array(width * height);
        let offset = 0;
        let destOffset = 0;
        const increment = isRGBA ? 4 : 3;
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const r = scalarData[offset];
                const g = scalarData[offset + 1];
                const b = scalarData[offset + 2];
                newScalarData[destOffset] = (r + g + b) / 3;
                offset += increment;
                destOffset++;
            }
        }
        return newScalarData;
    }
    else {
        return scalarData;
    }
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getViewportImageIds.js


function getViewportImageIds(viewport) {
    if (viewport instanceof RenderingEngine/* VolumeViewport */.PX) {
        const volume = cache/* default */.Ay.getVolume(viewport.getVolumeId());
        return volume.imageIds;
    }
    else if (viewport.getImageIds) {
        return viewport.getImageIds();
    }
}
/* harmony default export */ const utilities_getViewportImageIds = (getViewportImageIds);

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getRandomSampleFromArray.js
function getRandomSampleFromArray(array, size) {
    const clonedArray = [...array];
    if (size >= clonedArray.length) {
        shuffleArray(clonedArray);
        return clonedArray;
    }
    shuffleArray(clonedArray);
    return clonedArray.slice(0, size);
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getVolumeId.js
var getVolumeId = __webpack_require__(12437);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/hasFloatScalingParameters.js
var hasFloatScalingParameters = __webpack_require__(30169);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/pointInShapeCallback.js
var pointInShapeCallback = __webpack_require__(56577);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/windowLevel.js
var windowLevel = __webpack_require__(68136);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/colormap.js
var colormap = __webpack_require__(13859);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/transferFunctionUtils.js
var transferFunctionUtils = __webpack_require__(85745);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/color.js
function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
}
function rgbToHex(r, g, b) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}


;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/deepEqual.js
function deepEqual(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }
    if (obj1 == null || obj2 == null) {
        return false;
    }
    try {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }
    catch (error) {
        console.debug('Error in JSON.stringify during deep comparison:', error);
        return obj1 === obj2;
    }
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getViewportModality.js
function _getViewportModality(viewport, volumeId, getVolume) {
    if (!getVolume) {
        throw new Error('getVolume is required, use the utilities export instead ');
    }
    if (viewport.modality) {
        return viewport.modality;
    }
    if (viewport.setVolumes) {
        volumeId = volumeId ?? viewport.getVolumeId();
        if (!volumeId || !getVolume) {
            return;
        }
        const volume = getVolume(volumeId);
        return volume.metadata.Modality;
    }
    throw new Error('Invalid viewport type');
}


;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/splitImageIdsBy4DTags.js

const groupBy = (array, key) => {
    return array.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};
function getIPPGroups(imageIds) {
    const ippMetadata = imageIds.map((imageId) => {
        const { imagePositionPatient } = metaData.get('imagePlaneModule', imageId) || {};
        return { imageId, imagePositionPatient };
    });
    if (!ippMetadata.every((item) => item.imagePositionPatient)) {
        return null;
    }
    const positionGroups = groupBy(ippMetadata, 'imagePositionPatient');
    const positions = Object.keys(positionGroups);
    const frame_count = positionGroups[positions[0]].length;
    if (frame_count === 1) {
        return null;
    }
    const frame_count_equal = positions.every((k) => positionGroups[k].length === frame_count);
    if (!frame_count_equal) {
        return null;
    }
    return positionGroups;
}
function test4DTag(IPPGroups, value_getter) {
    const frame_groups = {};
    let first_frame_value_set = [];
    const positions = Object.keys(IPPGroups);
    for (let i = 0; i < positions.length; i++) {
        const frame_value_set = new Set();
        const frames = IPPGroups[positions[i]];
        for (let j = 0; j < frames.length; j++) {
            const frame_value = value_getter(frames[j].imageId) || 0;
            frame_groups[frame_value] = frame_groups[frame_value] || [];
            frame_groups[frame_value].push({ imageId: frames[j].imageId });
            frame_value_set.add(frame_value);
            if (frame_value_set.size - 1 < j) {
                return undefined;
            }
        }
        if (i == 0) {
            first_frame_value_set = Array.from(frame_value_set);
        }
        else if (!setEquals(first_frame_value_set, frame_value_set)) {
            return undefined;
        }
    }
    return frame_groups;
}
function getTagValue(imageId, tag) {
    const value = metaData.get(tag, imageId);
    try {
        return parseFloat(value);
    }
    catch {
        return undefined;
    }
}
function getPhilipsPrivateBValue(imageId) {
    const value = metaData.get('20011003', imageId);
    try {
        const { InlineBinary } = value;
        if (InlineBinary) {
            const value_bytes = atob(InlineBinary);
            const ary_buf = new ArrayBuffer(value_bytes.length);
            const dv = new DataView(ary_buf);
            for (let i = 0; i < value_bytes.length; i++) {
                dv.setUint8(i, value_bytes.charCodeAt(i));
            }
            return new Float32Array(ary_buf)[0];
        }
        return parseFloat(value);
    }
    catch {
        return undefined;
    }
}
function getSiemensPrivateBValue(imageId) {
    let value = metaData.get('0019100c', imageId) || metaData.get('0019100C', imageId);
    try {
        const { InlineBinary } = value;
        if (InlineBinary) {
            value = atob(InlineBinary);
        }
        return parseFloat(value);
    }
    catch {
        return undefined;
    }
}
function getGEPrivateBValue(imageId) {
    let value = metaData.get('00431039', imageId);
    try {
        const { InlineBinary } = value;
        if (InlineBinary) {
            value = atob(InlineBinary).split('//');
        }
        return parseFloat(value[0]) % 100000;
    }
    catch {
        return undefined;
    }
}
function setEquals(set_a, set_b) {
    if (set_a.length != set_b.size) {
        return false;
    }
    for (let i = 0; i < set_a.length; i++) {
        if (!set_b.has(set_a[i])) {
            return false;
        }
    }
    return true;
}
function getPetFrameReferenceTime(imageId) {
    const moduleInfo = metaData.get('petImageModule', imageId);
    return moduleInfo ? moduleInfo['frameReferenceTime'] : 0;
}
function splitImageIdsBy4DTags(imageIds) {
    const positionGroups = getIPPGroups(imageIds);
    if (!positionGroups) {
        return { imageIdGroups: [imageIds], splittingTag: null };
    }
    const tags = [
        'TemporalPositionIdentifier',
        'DiffusionBValue',
        'TriggerTime',
        'EchoTime',
        'EchoNumber',
        'PhilipsPrivateBValue',
        'SiemensPrivateBValue',
        'GEPrivateBValue',
        'PetFrameReferenceTime',
    ];
    const fncList2 = [
        (imageId) => getTagValue(imageId, tags[0]),
        (imageId) => getTagValue(imageId, tags[1]),
        (imageId) => getTagValue(imageId, tags[2]),
        (imageId) => getTagValue(imageId, tags[3]),
        (imageId) => getTagValue(imageId, tags[4]),
        getPhilipsPrivateBValue,
        getSiemensPrivateBValue,
        getGEPrivateBValue,
        getPetFrameReferenceTime,
    ];
    for (let i = 0; i < fncList2.length; i++) {
        const frame_groups = test4DTag(positionGroups, fncList2[i]);
        if (frame_groups) {
            const sortedKeys = Object.keys(frame_groups)
                .map(Number.parseFloat)
                .sort((a, b) => a - b);
            const imageIdGroups = sortedKeys.map((key) => frame_groups[key].map((item) => item.imageId));
            return { imageIdGroups, splittingTag: tags[i] };
        }
    }
    return { imageIdGroups: [imageIds], splittingTag: null };
}
/* harmony default export */ const utilities_splitImageIdsBy4DTags = (splitImageIdsBy4DTags);

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/getDynamicVolumeInfo.js

function getDynamicVolumeInfo(imageIds) {
    const { imageIdGroups: timePoints, splittingTag } = utilities_splitImageIdsBy4DTags(imageIds);
    const isDynamicVolume = timePoints.length > 1;
    return { isDynamicVolume, timePoints, splittingTag };
}
/* harmony default export */ const utilities_getDynamicVolumeInfo = (getDynamicVolumeInfo);

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/autoLoad.js
var autoLoad = __webpack_require__(91979);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/scaleArray.js
function scaleArray(array, scalingParameters) {
    const arrayLength = array.length;
    const { rescaleSlope, rescaleIntercept, suvbw } = scalingParameters;
    if (scalingParameters.modality === 'PT' && typeof suvbw === 'number') {
        for (let i = 0; i < arrayLength; i++) {
            array[i] = suvbw * (array[i] * rescaleSlope + rescaleIntercept);
        }
    }
    else {
        for (let i = 0; i < arrayLength; i++) {
            array[i] = array[i] * rescaleSlope + rescaleIntercept;
        }
    }
    return array;
}

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/deepClone.js
var deepClone = __webpack_require__(99949);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/clip.js
function clip(val, low, high) {
    return Math.min(Math.max(low, val), high);
}
function clipToBox(point, box) {
    point.x = clip(point.x, 0, box.width);
    point.y = clip(point.y, 0, box.height);
}
/* harmony default export */ const utilities_clip = (clip);

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/eventTarget.js
var eventTarget = __webpack_require__(10364);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/scroll.js







function scroll_scroll(viewport, options) {
    const enabledElement = (0,getEnabledElement/* default */.Ay)(viewport.element);
    if (!enabledElement) {
        throw new Error('Scroll::Viewport is not enabled (it might be disabled)');
    }
    if (viewport instanceof RenderingEngine/* StackViewport */.hS &&
        viewport.getImageIds().length === 0) {
        throw new Error('Scroll::Stack Viewport has no images');
    }
    const { volumeId, delta, scrollSlabs } = options;
    if (viewport instanceof RenderingEngine/* VolumeViewport */.PX) {
        scrollVolume(viewport, volumeId, delta, scrollSlabs);
    }
    else {
        const imageIdIndex = viewport.getCurrentImageIdIndex();
        if (imageIdIndex + delta >
            viewport.getImageIds().length - 1 ||
            imageIdIndex + delta < 0) {
            const eventData = {
                imageIdIndex,
                direction: delta,
            };
            (0,triggerEvent/* default */.A)(eventTarget/* default */.A, enums.Events.STACK_SCROLL_OUT_OF_BOUNDS, eventData);
        }
        viewport.scroll(delta, options.debounceLoading, options.loop);
    }
}
function scrollVolume(viewport, volumeId, delta, scrollSlabs = false) {
    const useSlabThickness = scrollSlabs;
    const { numScrollSteps, currentStepIndex, sliceRangeInfo } = (0,getVolumeViewportScrollInfo/* default */.A)(viewport, volumeId, useSlabThickness);
    if (!sliceRangeInfo) {
        return;
    }
    const { sliceRange, spacingInNormalDirection, camera } = sliceRangeInfo;
    const { focalPoint, viewPlaneNormal, position } = camera;
    const { newFocalPoint, newPosition } = (0,snapFocalPointToSlice/* default */.A)(focalPoint, position, sliceRange, viewPlaneNormal, spacingInNormalDirection, delta);
    viewport.setCamera({
        focalPoint: newFocalPoint,
        position: newPosition,
    });
    viewport.render();
    const desiredStepIndex = currentStepIndex + delta;
    const VolumeScrollEventDetail = {
        volumeId,
        viewport,
        delta,
        desiredStepIndex,
        currentStepIndex,
        numScrollSteps,
        currentImageId: viewport.getCurrentImageId(),
    };
    if ((desiredStepIndex > numScrollSteps || desiredStepIndex < 0) &&
        viewport.getCurrentImageId()) {
        (0,triggerEvent/* default */.A)(eventTarget/* default */.A, enums.Events.VOLUME_VIEWPORT_SCROLL_OUT_OF_BOUNDS, VolumeScrollEventDetail);
    }
    else {
        (0,triggerEvent/* default */.A)(eventTarget/* default */.A, enums.Events.VOLUME_VIEWPORT_SCROLL, VolumeScrollEventDetail);
    }
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/jumpToSlice.js




async function jumpToSlice(element, options = {}) {
    const { imageIndex, debounceLoading, volumeId } = options;
    const enabledElement = (0,getEnabledElement/* default */.Ay)(element);
    if (!enabledElement) {
        throw new Error('Element has been disabled');
    }
    const { viewport } = enabledElement;
    const { imageIndex: currentImageIndex, numberOfSlices } = _getImageSliceData(viewport, debounceLoading);
    const imageIndexToJump = _getImageIndexToJump(numberOfSlices, imageIndex);
    const delta = imageIndexToJump - currentImageIndex;
    scroll_scroll(viewport, { delta, debounceLoading, volumeId });
}
function _getImageSliceData(viewport, debounceLoading) {
    if (viewport instanceof StackViewport/* default */.A) {
        return {
            numberOfSlices: viewport.getImageIds().length,
            imageIndex: debounceLoading
                ? viewport.getTargetImageIdIndex()
                : viewport.getCurrentImageIdIndex(),
        };
    }
    return {
        numberOfSlices: viewport.getNumberOfSlices(),
        imageIndex: viewport.getSliceIndex(),
    };
}
function _getImageIndexToJump(numberOfSlices, imageIndex) {
    const lastSliceIndex = numberOfSlices - 1;
    return utilities_clip(imageIndex, 0, lastSliceIndex);
}


;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/index.js






















































































const getViewportModality = (viewport, volumeId) => _getViewportModality(viewport, volumeId, cache/* default */.Ay.getVolume);



/***/ }),

/***/ 50134:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ invertRgbTransferFunction)
/* harmony export */ });
function invertRgbTransferFunction(rgbTransferFunction) {
    if (!rgbTransferFunction) {
        return;
    }
    const size = rgbTransferFunction.getSize();
    for (let index = 0; index < size; index++) {
        const nodeValue1 = [];
        rgbTransferFunction.getNodeValue(index, nodeValue1);
        nodeValue1[1] = 1 - nodeValue1[1];
        nodeValue1[2] = 1 - nodeValue1[2];
        nodeValue1[3] = 1 - nodeValue1[3];
        rgbTransferFunction.setNodeValue(index, nodeValue1);
    }
}


/***/ }),

/***/ 74638:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (/* binding */ isEqual),
/* harmony export */   Ph: () => (/* binding */ isEqualAbs),
/* harmony export */   WC: () => (/* binding */ isEqualNegative),
/* harmony export */   n4: () => (/* binding */ isEqual)
/* harmony export */ });
function areNumbersEqualWithTolerance(num1, num2, tolerance) {
    return Math.abs(num1 - num2) <= tolerance;
}
function areArraysEqual(arr1, arr2, tolerance = 1e-5) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (!areNumbersEqualWithTolerance(arr1[i], arr2[i], tolerance)) {
            return false;
        }
    }
    return true;
}
function isNumberType(value) {
    return typeof value === 'number';
}
function isNumberArrayLike(value) {
    return (value &&
        typeof value === 'object' &&
        'length' in value &&
        typeof value.length === 'number' &&
        value.length > 0 &&
        typeof value[0] === 'number');
}
function isEqual(v1, v2, tolerance = 1e-5) {
    if (typeof v1 !== typeof v2 || v1 === null || v2 === null) {
        return false;
    }
    if (isNumberType(v1) && isNumberType(v2)) {
        return areNumbersEqualWithTolerance(v1, v2, tolerance);
    }
    if (isNumberArrayLike(v1) && isNumberArrayLike(v2)) {
        return areArraysEqual(v1, v2, tolerance);
    }
    return false;
}
const negative = (v) => typeof v === 'number' ? -v : v?.map ? v.map(negative) : !v;
const abs = (v) => typeof v === 'number' ? Math.abs(v) : v?.map ? v.map(abs) : v;
const isEqualNegative = (v1, v2, tolerance = undefined) => isEqual(v1, negative(v2), tolerance);
const isEqualAbs = (v1, v2, tolerance = undefined) => isEqual(abs(v1), abs(v2), tolerance);



/***/ }),

/***/ 1865:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ makeVolumeMetadata)
/* harmony export */ });
/* harmony import */ var _metaData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74876);

function makeVolumeMetadata(imageIds) {
    const imageId0 = imageIds[0];
    const { pixelRepresentation, bitsAllocated, bitsStored, highBit, photometricInterpretation, samplesPerPixel, } = (0,_metaData__WEBPACK_IMPORTED_MODULE_0__.get)('imagePixelModule', imageId0);
    const voiLut = [];
    const voiLutModule = (0,_metaData__WEBPACK_IMPORTED_MODULE_0__.get)('voiLutModule', imageId0);
    let voiLUTFunction;
    if (voiLutModule) {
        const { windowWidth, windowCenter } = voiLutModule;
        voiLUTFunction = voiLutModule?.voiLUTFunction;
        if (Array.isArray(windowWidth)) {
            for (let i = 0; i < windowWidth.length; i++) {
                voiLut.push({
                    windowWidth: windowWidth[i],
                    windowCenter: windowCenter[i],
                });
            }
        }
        else {
            voiLut.push({
                windowWidth: windowWidth,
                windowCenter: windowCenter,
            });
        }
    }
    else {
        voiLut.push({
            windowWidth: undefined,
            windowCenter: undefined,
        });
    }
    const { modality, seriesInstanceUID } = (0,_metaData__WEBPACK_IMPORTED_MODULE_0__.get)('generalSeriesModule', imageId0);
    const { imageOrientationPatient, pixelSpacing, frameOfReferenceUID, columns, rows, } = (0,_metaData__WEBPACK_IMPORTED_MODULE_0__.get)('imagePlaneModule', imageId0);
    return {
        BitsAllocated: bitsAllocated,
        BitsStored: bitsStored,
        SamplesPerPixel: samplesPerPixel,
        HighBit: highBit,
        PhotometricInterpretation: photometricInterpretation,
        PixelRepresentation: pixelRepresentation,
        Modality: modality,
        ImageOrientationPatient: imageOrientationPatient,
        PixelSpacing: pixelSpacing,
        FrameOfReferenceUID: frameOfReferenceUID,
        Columns: columns,
        Rows: rows,
        voiLut,
        VOILUTFunction: voiLUTFunction,
        SeriesInstanceUID: seriesInstanceUID,
    };
}


/***/ }),

/***/ 52268:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   linePlaneIntersection: () => (/* binding */ linePlaneIntersection),
/* harmony export */   planeDistanceToPoint: () => (/* binding */ planeDistanceToPoint),
/* harmony export */   planeEquation: () => (/* binding */ planeEquation),
/* harmony export */   threePlaneIntersection: () => (/* binding */ threePlaneIntersection)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3823);

function linePlaneIntersection(p0, p1, plane) {
    const [x0, y0, z0] = p0;
    const [x1, y1, z1] = p1;
    const [A, B, C, D] = plane;
    const a = x1 - x0;
    const b = y1 - y0;
    const c = z1 - z0;
    const t = (-1 * (A * x0 + B * y0 + C * z0 - D)) / (A * a + B * b + C * c);
    const X = a * t + x0;
    const Y = b * t + y0;
    const Z = c * t + z0;
    return [X, Y, Z];
}
function planeEquation(normal, point, normalized = false) {
    const [A, B, C] = normal;
    const D = A * point[0] + B * point[1] + C * point[2];
    if (normalized) {
        const length = Math.sqrt(A * A + B * B + C * C);
        return [A / length, B / length, C / length, D / length];
    }
    return [A, B, C, D];
}
function threePlaneIntersection(firstPlane, secondPlane, thirdPlane) {
    const [A1, B1, C1, D1] = firstPlane;
    const [A2, B2, C2, D2] = secondPlane;
    const [A3, B3, C3, D3] = thirdPlane;
    const m0 = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .mat3.fromValues */ .w0.fromValues(A1, A2, A3, B1, B2, B3, C1, C2, C3);
    const m1 = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .mat3.fromValues */ .w0.fromValues(D1, D2, D3, B1, B2, B3, C1, C2, C3);
    const m2 = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .mat3.fromValues */ .w0.fromValues(A1, A2, A3, D1, D2, D3, C1, C2, C3);
    const m3 = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .mat3.fromValues */ .w0.fromValues(A1, A2, A3, B1, B2, B3, D1, D2, D3);
    const x = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .mat3.determinant */ .w0.determinant(m1) / gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .mat3.determinant */ .w0.determinant(m0);
    const y = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .mat3.determinant */ .w0.determinant(m2) / gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .mat3.determinant */ .w0.determinant(m0);
    const z = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .mat3.determinant */ .w0.determinant(m3) / gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .mat3.determinant */ .w0.determinant(m0);
    return [x, y, z];
}
function planeDistanceToPoint(plane, point, signed = false) {
    const [A, B, C, D] = plane;
    const [x, y, z] = point;
    const numerator = A * x + B * y + C * z - D;
    const distance = Math.abs(numerator) / Math.sqrt(A * A + B * B + C * C);
    const sign = signed ? Math.sign(numerator) : 1;
    return sign * distance;
}



/***/ }),

/***/ 56577:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ pointInShapeCallback)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3823);

function pointInShapeCallback(imageData, options) {
    const { pointInShapeFn, callback, boundsIJK, returnPoints = false, } = options;
    let iMin, iMax, jMin, jMax, kMin, kMax;
    let scalarData;
    const { numComps } = imageData;
    if (imageData.getScalarData) {
        scalarData = imageData.getScalarData();
    }
    else {
        scalarData = imageData
            .getPointData()
            .getScalars()
            .getData();
    }
    if (!scalarData) {
        console.warn('No scalar data found for imageData', imageData);
        return;
    }
    const dimensions = imageData.getDimensions();
    if (!boundsIJK) {
        iMin = 0;
        iMax = dimensions[0];
        jMin = 0;
        jMax = dimensions[1];
        kMin = 0;
        kMax = dimensions[2];
    }
    else {
        [[iMin, iMax], [jMin, jMax], [kMin, kMax]] = boundsIJK;
    }
    const start = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.fromValues */ .eR.fromValues(iMin, jMin, kMin);
    const direction = imageData.getDirection();
    const rowCosines = direction.slice(0, 3);
    const columnCosines = direction.slice(3, 6);
    const scanAxisNormal = direction.slice(6, 9);
    const spacing = imageData.getSpacing();
    const [rowSpacing, columnSpacing, scanAxisSpacing] = spacing;
    const worldPosStart = imageData.indexToWorld(start);
    const rowStep = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.fromValues */ .eR.fromValues(rowCosines[0] * rowSpacing, rowCosines[1] * rowSpacing, rowCosines[2] * rowSpacing);
    const columnStep = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.fromValues */ .eR.fromValues(columnCosines[0] * columnSpacing, columnCosines[1] * columnSpacing, columnCosines[2] * columnSpacing);
    const scanAxisStep = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.fromValues */ .eR.fromValues(scanAxisNormal[0] * scanAxisSpacing, scanAxisNormal[1] * scanAxisSpacing, scanAxisNormal[2] * scanAxisSpacing);
    const xMultiple = numComps ||
        scalarData.length / dimensions[2] / dimensions[1] / dimensions[0];
    const yMultiple = dimensions[0] * xMultiple;
    const zMultiple = dimensions[1] * yMultiple;
    const pointsInShape = [];
    const currentPos = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.clone */ .eR.clone(worldPosStart);
    for (let k = kMin; k <= kMax; k++) {
        const startPosJ = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.clone */ .eR.clone(currentPos);
        for (let j = jMin; j <= jMax; j++) {
            const startPosI = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.clone */ .eR.clone(currentPos);
            for (let i = iMin; i <= iMax; i++) {
                const pointIJK = [i, j, k];
                if (pointInShapeFn(currentPos, pointIJK)) {
                    const index = k * zMultiple + j * yMultiple + i * xMultiple;
                    let value;
                    if (xMultiple > 2) {
                        value = [
                            scalarData[index],
                            scalarData[index + 1],
                            scalarData[index + 2],
                        ];
                    }
                    else {
                        value = scalarData[index];
                    }
                    pointsInShape.push({
                        value,
                        index,
                        pointIJK,
                        pointLPS: currentPos.slice(),
                    });
                    if (callback) {
                        callback({
                            value,
                            index,
                            pointIJK,
                            pointLPS: currentPos,
                        });
                    }
                }
                gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.add */ .eR.add(currentPos, currentPos, rowStep);
            }
            gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.copy */ .eR.copy(currentPos, startPosI);
            gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.add */ .eR.add(currentPos, currentPos, columnStep);
        }
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.copy */ .eR.copy(currentPos, startPosJ);
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.add */ .eR.add(currentPos, currentPos, scanAxisStep);
    }
    return returnPoints ? pointsInShape : undefined;
}


/***/ }),

/***/ 80500:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ snapFocalPointToSlice)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3823);

function snapFocalPointToSlice(focalPoint, position, sliceRange, viewPlaneNormal, spacingInNormalDirection, deltaFrames) {
    const { min, max, current } = sliceRange;
    const posDiffFromFocalPoint = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.create */ .eR.create();
    gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.sub */ .eR.sub(posDiffFromFocalPoint, position, focalPoint);
    const steps = Math.round((max - min) / spacingInNormalDirection);
    const fraction = (current - min) / (max - min);
    const floatingStepNumber = fraction * steps;
    let frameIndex = Math.round(floatingStepNumber);
    let newFocalPoint = [
        focalPoint[0] -
            viewPlaneNormal[0] * floatingStepNumber * spacingInNormalDirection,
        focalPoint[1] -
            viewPlaneNormal[1] * floatingStepNumber * spacingInNormalDirection,
        focalPoint[2] -
            viewPlaneNormal[2] * floatingStepNumber * spacingInNormalDirection,
    ];
    frameIndex += deltaFrames;
    if (frameIndex > steps) {
        frameIndex = steps;
    }
    else if (frameIndex < 0) {
        frameIndex = 0;
    }
    const newSlicePosFromMin = frameIndex * spacingInNormalDirection;
    newFocalPoint = [
        newFocalPoint[0] + viewPlaneNormal[0] * newSlicePosFromMin,
        newFocalPoint[1] + viewPlaneNormal[1] * newSlicePosFromMin,
        newFocalPoint[2] + viewPlaneNormal[2] * newSlicePosFromMin,
    ];
    const newPosition = [
        newFocalPoint[0] + posDiffFromFocalPoint[0],
        newFocalPoint[1] + posDiffFromFocalPoint[1],
        newFocalPoint[2] + posDiffFromFocalPoint[2],
    ];
    return { newFocalPoint, newPosition };
}


/***/ }),

/***/ 90537:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ sortImageIdsAndGetSpacing)
/* harmony export */ });
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3823);
/* harmony import */ var _metaData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(74876);
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(59693);



function sortImageIdsAndGetSpacing(imageIds, scanAxisNormal) {
    const { imagePositionPatient: referenceImagePositionPatient, imageOrientationPatient, } = _metaData__WEBPACK_IMPORTED_MODULE_1__.get('imagePlaneModule', imageIds[0]);
    if (!scanAxisNormal) {
        const rowCosineVec = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.fromValues */ .eR.fromValues(imageOrientationPatient[0], imageOrientationPatient[1], imageOrientationPatient[2]);
        const colCosineVec = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.fromValues */ .eR.fromValues(imageOrientationPatient[3], imageOrientationPatient[4], imageOrientationPatient[5]);
        scanAxisNormal = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.create */ .eR.create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.cross */ .eR.cross(scanAxisNormal, rowCosineVec, colCosineVec);
    }
    const refIppVec = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.create */ .eR.create();
    const usingWadoUri = imageIds[0].split(':')[0] === 'wadouri';
    gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.set */ .eR.set(refIppVec, referenceImagePositionPatient[0], referenceImagePositionPatient[1], referenceImagePositionPatient[2]);
    let sortedImageIds;
    let zSpacing;
    function getDistance(imageId) {
        const { imagePositionPatient } = _metaData__WEBPACK_IMPORTED_MODULE_1__.get('imagePlaneModule', imageId);
        const positionVector = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.create */ .eR.create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.sub */ .eR.sub(positionVector, referenceImagePositionPatient, imagePositionPatient);
        return gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.dot */ .eR.dot(positionVector, scanAxisNormal);
    }
    if (!usingWadoUri) {
        const distanceImagePairs = imageIds.map((imageId) => {
            const distance = getDistance(imageId);
            return {
                distance,
                imageId,
            };
        });
        distanceImagePairs.sort((a, b) => b.distance - a.distance);
        sortedImageIds = distanceImagePairs.map((a) => a.imageId);
        const numImages = distanceImagePairs.length;
        zSpacing =
            Math.abs(distanceImagePairs[numImages - 1].distance -
                distanceImagePairs[0].distance) /
                (numImages - 1);
    }
    else {
        const prefetchedImageIds = [
            imageIds[0],
            imageIds[Math.floor(imageIds.length / 2)],
        ];
        sortedImageIds = imageIds;
        const firstImageDistance = getDistance(prefetchedImageIds[0]);
        const middleImageDistance = getDistance(prefetchedImageIds[1]);
        if (firstImageDistance - middleImageDistance < 0) {
            sortedImageIds.reverse();
        }
        const metadataForMiddleImage = _metaData__WEBPACK_IMPORTED_MODULE_1__.get('imagePlaneModule', prefetchedImageIds[1]);
        if (!metadataForMiddleImage) {
            throw new Error('Incomplete metadata required for volume construction.');
        }
        const positionVector = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.create */ .eR.create();
        gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.sub */ .eR.sub(positionVector, referenceImagePositionPatient, metadataForMiddleImage.imagePositionPatient);
        const distanceBetweenFirstAndMiddleImages = gl_matrix__WEBPACK_IMPORTED_MODULE_0__/* .vec3.dot */ .eR.dot(positionVector, scanAxisNormal);
        zSpacing =
            Math.abs(distanceBetweenFirstAndMiddleImages) /
                Math.floor(imageIds.length / 2);
    }
    const { imagePositionPatient: origin, sliceThickness, spacingBetweenSlices, } = _metaData__WEBPACK_IMPORTED_MODULE_1__.get('imagePlaneModule', sortedImageIds[0]);
    const { strictZSpacingForVolumeViewport } = (0,_init__WEBPACK_IMPORTED_MODULE_2__/* .getConfiguration */ .D0)().rendering;
    if (zSpacing === 0 && !strictZSpacingForVolumeViewport) {
        if (sliceThickness && spacingBetweenSlices) {
            console.log('Could not calculate zSpacing. Using spacingBetweenSlices');
            zSpacing = spacingBetweenSlices;
        }
        else if (sliceThickness) {
            console.log('Could not calculate zSpacing and no spacingBetweenSlices. Using sliceThickness');
            zSpacing = sliceThickness;
        }
        else {
            console.log('Could not calculate zSpacing. The VolumeViewport visualization is compromised. Setting zSpacing to 1 to render');
            zSpacing = 1;
        }
    }
    const result = {
        zSpacing,
        origin,
        sortedImageIds,
    };
    return result;
}


/***/ }),

/***/ 85745:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTransferFunctionNodes: () => (/* binding */ getTransferFunctionNodes),
/* harmony export */   setTransferFunctionNodes: () => (/* binding */ setTransferFunctionNodes)
/* harmony export */ });
function getTransferFunctionNodes(transferFunction) {
    const size = transferFunction.getSize();
    const values = [];
    for (let index = 0; index < size; index++) {
        const nodeValue1 = [];
        transferFunction.getNodeValue(index, nodeValue1);
        values.push(nodeValue1);
    }
    return values;
}
function setTransferFunctionNodes(transferFunction, nodes) {
    if (!nodes?.length) {
        return;
    }
    transferFunction.removeAllPoints();
    nodes.forEach((node) => {
        transferFunction.addRGBPoint(...node);
    });
}



/***/ }),

/***/ 51919:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ transformCanvasToIJK)
/* harmony export */ });
/* harmony import */ var _transformWorldToIndex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(38669);

function transformCanvasToIJK(viewport, canvasPoint) {
    const { imageData: vtkImageData } = viewport.getImageData();
    const worldPoint = viewport.canvasToWorld(canvasPoint);
    return (0,_transformWorldToIndex__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(vtkImageData, worldPoint);
}


/***/ }),

/***/ 94741:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ transformIndexToWorld)
/* harmony export */ });
function transformIndexToWorld(imageData, voxelPos) {
    return imageData.indexToWorld(voxelPos);
}


/***/ }),

/***/ 38669:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ transformWorldToIndex)
/* harmony export */ });
function transformWorldToIndex(imageData, worldPos) {
    const continuousIndex = imageData.worldToIndex(worldPos);
    const index = continuousIndex.map(Math.round);
    return index;
}


/***/ }),

/***/ 45278:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ updateVTKImageDataWithCornerstoneImage)
/* harmony export */ });
function updateVTKImageDataWithCornerstoneImage(sourceImageData, image) {
    const pixelData = image.voxelManager.getScalarData();
    if (!sourceImageData.getPointData) {
        return;
    }
    const scalarData = sourceImageData
        .getPointData()
        .getScalars()
        .getData();
    if (image.color && image.rgba) {
        const newPixelData = new Uint8Array(image.columns * image.rows * 3);
        for (let i = 0; i < image.columns * image.rows; i++) {
            newPixelData[i * 3] = pixelData[i * 4];
            newPixelData[i * 3 + 1] = pixelData[i * 4 + 1];
            newPixelData[i * 3 + 2] = pixelData[i * 4 + 2];
        }
        image.rgba = false;
        image.getPixelData = () => newPixelData;
        scalarData.set(newPixelData);
    }
    else {
        scalarData.set(pixelData);
    }
    sourceImageData.modified();
}



/***/ }),

/***/ 68136:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   toLowHighRange: () => (/* binding */ toLowHighRange),
/* harmony export */   toWindowLevel: () => (/* binding */ toWindowLevel)
/* harmony export */ });
function toWindowLevel(low, high) {
    const windowWidth = Math.abs(high - low) + 1;
    const windowCenter = (low + high + 1) / 2;
    return { windowWidth, windowCenter };
}
function toLowHighRange(windowWidth, windowCenter) {
    const lower = windowCenter - 0.5 - (windowWidth - 1) / 2;
    const upper = windowCenter - 0.5 + (windowWidth - 1) / 2;
    return { lower, upper };
}



/***/ }),

/***/ 25810:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ../../../node_modules/comlink/dist/esm/comlink.mjs
var comlink = __webpack_require__(99178);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/index.js + 4 modules
var enums = __webpack_require__(31749);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/constants/index.js + 6 modules
var constants = __webpack_require__(19325);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/index.js + 3 modules
var RenderingEngine = __webpack_require__(56706);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/helpers/createVolumeActor.js + 2 modules
var createVolumeActor = __webpack_require__(61640);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/helpers/createVolumeMapper.js
var createVolumeMapper = __webpack_require__(92099);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/helpers/getOrCreateCanvas.js
var getOrCreateCanvas = __webpack_require__(30135);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/VolumeViewport.js + 1 modules
var VolumeViewport = __webpack_require__(94155);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/VolumeViewport3D.js
var VolumeViewport3D = __webpack_require__(40893);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/BaseVolumeViewport.js
var BaseVolumeViewport = __webpack_require__(46347);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/StackViewport.js + 12 modules
var RenderingEngine_StackViewport = __webpack_require__(58165);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/VideoViewport.js + 3 modules
var VideoViewport = __webpack_require__(32501);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/WSIViewport.js + 1 modules
var WSIViewport = __webpack_require__(81466);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/Viewport.js
var Viewport = __webpack_require__(10056);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/eventTarget.js
var esm_eventTarget = __webpack_require__(10364);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/getRenderingEngine.js
var getRenderingEngine = __webpack_require__(39536);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/cache/index.js + 1 modules
var esm_cache = __webpack_require__(58927);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/cache/cache.js
var cache_cache = __webpack_require__(49038);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/requestPool/imageRetrievalPoolManager.js
var imageRetrievalPoolManager = __webpack_require__(91073);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/requestPool/imageLoadPoolManager.js
var imageLoadPoolManager = __webpack_require__(51159);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/getEnabledElement.js
var esm_getEnabledElement = __webpack_require__(86846);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/metaData.js
var metaData = __webpack_require__(74876);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/init.js + 1 modules
var init = __webpack_require__(59693);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/Settings.js
const DEFAULT_SETTINGS = Symbol('DefaultSettings');
const RUNTIME_SETTINGS = Symbol('RuntimeSettings');
const OBJECT_SETTINGS_MAP = Symbol('ObjectSettingsMap');
const DICTIONARY = Symbol('Dictionary');
class Settings {
    constructor(base) {
        const dictionary = Object.create((base instanceof Settings && DICTIONARY in base
            ? base[DICTIONARY]
            : null));
        Object.seal(Object.defineProperty(this, DICTIONARY, {
            value: dictionary,
        }));
    }
    set(key, value) {
        return set(this[DICTIONARY], key, value, null);
    }
    get(key) {
        return get(this[DICTIONARY], key);
    }
    unset(key) {
        return unset(this[DICTIONARY], key + '');
    }
    forEach(callback) {
        iterate(this[DICTIONARY], callback);
    }
    extend() {
        return new Settings(this);
    }
    import(root) {
        if (isPlainObject(root)) {
            Object.keys(root).forEach((key) => {
                set(this[DICTIONARY], key, root[key], null);
            });
        }
    }
    dump() {
        const context = {};
        iterate(this[DICTIONARY], (key, value) => {
            if (typeof value !== 'undefined') {
                deepSet(context, key, value);
            }
        });
        return context;
    }
    static assert(subject) {
        return subject instanceof Settings
            ? subject
            : Settings.getRuntimeSettings();
    }
    static getDefaultSettings(subfield = null) {
        let defaultSettings = Settings[DEFAULT_SETTINGS];
        if (!(defaultSettings instanceof Settings)) {
            defaultSettings = new Settings();
            Settings[DEFAULT_SETTINGS] = defaultSettings;
        }
        if (subfield) {
            const settingObj = {};
            defaultSettings.forEach((name) => {
                if (name.startsWith(subfield)) {
                    const setting = name.split(`${subfield}.`)[1];
                    settingObj[setting] = defaultSettings.get(name);
                }
            });
            return settingObj;
        }
        return defaultSettings;
    }
    static getRuntimeSettings() {
        let runtimeSettings = Settings[RUNTIME_SETTINGS];
        if (!(runtimeSettings instanceof Settings)) {
            runtimeSettings = new Settings(Settings.getDefaultSettings());
            Settings[RUNTIME_SETTINGS] = runtimeSettings;
        }
        return runtimeSettings;
    }
    static getObjectSettings(subject, from) {
        let settings = null;
        if (subject instanceof Settings) {
            settings = subject;
        }
        else if (typeof subject === 'object' && subject !== null) {
            let objectSettingsMap = Settings[OBJECT_SETTINGS_MAP];
            if (!(objectSettingsMap instanceof WeakMap)) {
                objectSettingsMap = new WeakMap();
                Settings[OBJECT_SETTINGS_MAP] = objectSettingsMap;
            }
            settings = objectSettingsMap.get(subject);
            if (!(settings instanceof Settings)) {
                settings = new Settings(Settings.assert(Settings.getObjectSettings(from)));
                objectSettingsMap.set(subject, settings);
            }
        }
        return settings;
    }
    static extendRuntimeSettings() {
        return Settings.getRuntimeSettings().extend();
    }
}
function unset(dictionary, name) {
    if (name.endsWith('.')) {
        let deleteCount = 0;
        const namespace = name;
        const base = namespace.slice(0, -1);
        const deleteAll = base.length === 0;
        for (const key in dictionary) {
            if (Object.prototype.hasOwnProperty.call(dictionary, key) &&
                (deleteAll || key.startsWith(namespace) || key === base)) {
                delete dictionary[key];
                ++deleteCount;
            }
        }
        return deleteCount > 0;
    }
    return delete dictionary[name];
}
function iterate(dictionary, callback) {
    for (const key in dictionary) {
        callback(key, dictionary[key]);
    }
}
function setAll(dictionary, prefix, record, references) {
    let failCount;
    if (references.has(record)) {
        return set(dictionary, prefix, null, references);
    }
    references.add(record);
    failCount = 0;
    for (const field in record) {
        if (Object.prototype.hasOwnProperty.call(record, field)) {
            const key = field.length === 0 ? prefix : `${prefix}.${field}`;
            if (!set(dictionary, key, record[field], references)) {
                ++failCount;
            }
        }
    }
    references.delete(record);
    return failCount === 0;
}
function set(dictionary, key, value, references) {
    if (isValidKey(key)) {
        if (isPlainObject(value)) {
            return setAll(dictionary, key, value, references instanceof WeakSet ? references : new WeakSet());
        }
        dictionary[key] = value;
        return true;
    }
    return false;
}
function get(dictionary, key) {
    return dictionary[key];
}
function isValidKey(key) {
    let last, current, previous;
    if (typeof key !== 'string' || (last = key.length - 1) < 0) {
        return false;
    }
    previous = -1;
    while ((current = key.indexOf('.', previous + 1)) >= 0) {
        if (current - previous < 2 || current === last) {
            return false;
        }
        previous = current;
    }
    return true;
}
function isPlainObject(subject) {
    if (typeof subject === 'object' && subject !== null) {
        const prototype = Object.getPrototypeOf(subject);
        if (prototype === Object.prototype || prototype === null) {
            return true;
        }
    }
    return false;
}
function deepSet(context, key, value) {
    const separator = key.indexOf('.');
    if (separator >= 0) {
        const subKey = key.slice(0, separator);
        let subContext = context[subKey];
        if (typeof subContext !== 'object' || subContext === null) {
            const subContextValue = subContext;
            subContext = {};
            if (typeof subContextValue !== 'undefined') {
                subContext[''] = subContextValue;
            }
            context[subKey] = subContext;
        }
        deepSet(subContext, key.slice(separator + 1, key.length), value);
    }
    else {
        context[key] = value;
    }
}
Settings.getDefaultSettings().set('useCursors', true);

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/loaders/volumeLoader.js
var volumeLoader = __webpack_require__(39561);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/loaders/imageLoader.js
var imageLoader = __webpack_require__(80068);
// EXTERNAL MODULE: ../../../node_modules/@kitware/vtk.js/Rendering/Profiles/Geometry.js + 19 modules
var Geometry = __webpack_require__(98455);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/loaders/utils/contourSet/validateContourSet.js
function validateContourSet_validateContourSet(contourSetData) {
    if (!contourSetData || contourSetData.data.length === 0) {
        throw new Error('Invalid contour set data, see publicContourSetData type for more info');
    }
    if (!contourSetData.id) {
        throw new Error('Invalid contour set data, each contour set must have an id');
    }
    if (!contourSetData.data || !Array.isArray(contourSetData.data)) {
        throw new Error('Invalid contour set data, each contour set must have an array of contours');
    }
    contourSetData.data.forEach((contourData) => {
        if (!contourData.points || !Array.isArray(contourData.points)) {
            throw new Error('Invalid contour set data, each contour must have an array of points');
        }
        contourData.points.forEach((point) => {
            if (!point || !Array.isArray(point) || point.length !== 3) {
                throw new Error('Invalid contour set data, each point must be an array of length 3');
            }
        });
    });
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/cache/classes/Contour.js
class Contour_Contour {
    constructor(props) {
        const { points, type } = props.data;
        this.id = props.id;
        this._points = points;
        this._type = type;
        this._color = props.color;
        this._segmentIndex = props.segmentIndex;
        this.sizeInBytes = this._getSizeInBytes();
    }
    _getSizeInBytes() {
        return this._points.length * 3;
    }
    get points() {
        return this._points;
    }
    set points(value) {
        this._points = value;
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get segmentIndex() {
        return this._segmentIndex;
    }
    set segmentIndex(value) {
        this._segmentIndex = value;
    }
    get flatPointsArray() {
        return this._points.map((point) => [...point]).flat();
    }
}
/* harmony default export */ const classes_Contour = ((/* unused pure expression or super */ null && (Contour_Contour)));

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/cache/classes/ContourSet.js

class ContourSet_ContourSet {
    constructor(props) {
        this._color = [200, 0, 0];
        this.id = props.id;
        this._contours = [];
        this._color = props.color ?? this._color;
        this.frameOfReferenceUID = props.frameOfReferenceUID;
        this._segmentIndex = props.segmentIndex;
        this._createEachContour(props.data);
        this.sizeInBytes = this._getSizeInBytes();
    }
    _createEachContour(contourDataArray) {
        contourDataArray.forEach((contourData) => {
            const { points, type, color } = contourData;
            const contour = new Contour({
                id: `${this.id}-segment-${this._segmentIndex}`,
                data: {
                    points,
                    type,
                    segmentIndex: this._segmentIndex,
                    color: color ?? this._color,
                },
                segmentIndex: this._segmentIndex,
                color: color ?? this._color,
            });
            this._contours.push(contour);
        });
        this._updateContourSetCentroid();
    }
    _updateContourSetCentroid() {
        const numberOfPoints = this.totalNumberOfPoints;
        const flatPointsArray = this.flatPointsArray;
        const sumOfPoints = flatPointsArray.reduce((acc, point) => {
            return [acc[0] + point[0], acc[1] + point[1], acc[2] + point[2]];
        }, [0, 0, 0]);
        const centroid = [
            sumOfPoints[0] / numberOfPoints,
            sumOfPoints[1] / numberOfPoints,
            sumOfPoints[2] / numberOfPoints,
        ];
        const closestPoint = flatPointsArray.reduce((closestPoint, point) => {
            const distanceToPoint = this._getDistance(centroid, point);
            const distanceToClosestPoint = this._getDistance(centroid, closestPoint);
            if (distanceToPoint < distanceToClosestPoint) {
                return point;
            }
            else {
                return closestPoint;
            }
        }, flatPointsArray[0]);
        this._centroid = closestPoint;
    }
    _getSizeInBytes() {
        return this._contours.reduce((sizeInBytes, contour) => {
            return sizeInBytes + contour.sizeInBytes;
        }, 0);
    }
    _getDistance(pointA, pointB) {
        return Math.sqrt((pointA[0] - pointB[0]) ** 2 +
            (pointA[1] - pointB[1]) ** 2 +
            (pointA[2] - pointB[2]) ** 2);
    }
    get centroid() {
        return this._centroid;
    }
    get segmentIndex() {
        return this._segmentIndex;
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
        this._contours.forEach((contour) => {
            if (contour instanceof Contour) {
                contour.color = value;
            }
        });
    }
    get contours() {
        return this._contours;
    }
    get flatPointsArray() {
        return this._contours.flatMap((contour) => contour.points);
    }
    get numberOfContours() {
        return this._contours.length;
    }
    get totalNumberOfPoints() {
        return this._contours.reduce((numberOfPoints, contour) => {
            return numberOfPoints + contour.points.length;
        }, 0);
    }
    get numberOfPointsArray() {
        return this._contours.map((contour) => contour.points.length);
    }
    getPointsInContour(contourIndex) {
        return this._contours[contourIndex].points;
    }
    getNumberOfPointsInAContour(contourIndex) {
        return this.getPointsInContour(contourIndex).length;
    }
}
/* harmony default export */ const classes_ContourSet = ((/* unused pure expression or super */ null && (ContourSet_ContourSet)));

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/loaders/utils/contourSet/createContourSet.js



function createContourSet_createContourSet(geometryId, contourSetData) {
    validateContourSet(contourSetData);
    const contourSet = new ContourSet({
        id: contourSetData.id,
        data: contourSetData.data,
        color: contourSetData.color,
        frameOfReferenceUID: contourSetData.frameOfReferenceUID,
        segmentIndex: contourSetData.segmentIndex ?? 1,
    });
    const geometry = {
        id: geometryId,
        type: GeometryType.CONTOUR,
        data: contourSet,
        sizeInBytes: contourSet.sizeInBytes,
    };
    return geometry;
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/loaders/utils/surface/validateSurface.js
function validateSurface_validateSurface(surfaceData) {
    if (!surfaceData.id) {
        throw new Error('Surface must have an id');
    }
    if (surfaceData.points?.length === 0) {
        throw new Error('Surface must have non-empty points array');
    }
    if (surfaceData.polys?.length === 0) {
        throw new Error('Surface must have non-empty polys array');
    }
    if (!surfaceData.frameOfReferenceUID) {
        throw new Error('Surface must have a frameOfReferenceUID');
    }
}

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/cache/classes/Surface.js
var classes_Surface = __webpack_require__(90808);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/loaders/utils/surface/createSurface.js



function createSurface_createSurface(geometryId, surfaceData) {
    validateSurface(surfaceData);
    const surface = new Surface({
        id: surfaceData.id,
        points: surfaceData.points,
        polys: surfaceData.polys,
        color: surfaceData.color,
        frameOfReferenceUID: surfaceData.frameOfReferenceUID,
        segmentIndex: surfaceData.segmentIndex ?? 1,
    });
    const geometry = {
        id: geometryId,
        type: GeometryType.SURFACE,
        data: surface,
        sizeInBytes: surface.sizeInBytes,
    };
    return geometry;
}

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/Events.js
var enums_Events = __webpack_require__(32643);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/triggerEvent.js
var utilities_triggerEvent = __webpack_require__(69372);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/loaders/geometryLoader.js








const geometryLoaders = {};
let unknownGeometryLoader;
function loadGeometryFromGeometryLoader(geometryId, options) {
    const colonIndex = geometryId.indexOf(':');
    const scheme = geometryId.substring(0, colonIndex);
    let loader = geometryLoaders[scheme];
    if (loader === undefined || loader === null) {
        if (unknownGeometryLoader == null ||
            typeof unknownGeometryLoader !== 'function') {
            throw new Error(`No geometry loader for scheme ${scheme} has been registered`);
        }
        loader = unknownGeometryLoader;
    }
    const geometryLoadObject = loader(geometryId, options);
    geometryLoadObject.promise.then(function (geometry) {
        triggerEvent(eventTarget, Events.GEOMETRY_LOADED, { geometry });
    }, function (error) {
        const errorObject = {
            geometryId,
            error,
        };
        triggerEvent(eventTarget, Events.GEOMETRY_LOADED_FAILED, errorObject);
    });
    return geometryLoadObject;
}
function loadGeometry(geometryId, options) {
    if (geometryId === undefined) {
        throw new Error('loadGeometry: parameter geometryId must not be undefined');
    }
    let geometryLoadObject = cache.getGeometryLoadObject(geometryId);
    if (geometryLoadObject !== undefined) {
        return geometryLoadObject.promise;
    }
    geometryLoadObject = loadGeometryFromGeometryLoader(geometryId, options);
    return geometryLoadObject.promise;
}
async function loadAndCacheGeometry(geometryId, options) {
    if (geometryId === undefined) {
        throw new Error('createAndCacheGeometry: parameter geometryId must not be undefined');
    }
    let geometryLoadObject = cache.getGeometryLoadObject(geometryId);
    if (geometryLoadObject !== undefined) {
        return geometryLoadObject.promise;
    }
    geometryLoadObject = loadGeometryFromGeometryLoader(geometryId, options);
    await cache.putGeometryLoadObject(geometryId, geometryLoadObject);
    return geometryLoadObject.promise;
}
function createAndCacheGeometry(geometryId, options) {
    if (geometryId === undefined) {
        throw new Error('createAndCacheGeometry: parameter geometryId must not be undefined');
    }
    let geometry = cache.getGeometry(geometryId);
    if (geometry) {
        return geometry;
    }
    if (options.type === GeometryType.CONTOUR) {
        geometry = createContourSet(geometryId, options.geometryData);
    }
    else if (options.type === GeometryType.SURFACE) {
        geometry = createSurface(geometryId, options.geometryData);
    }
    else {
        throw new Error('Unknown geometry type');
    }
    cache.putGeometrySync(geometryId, geometry);
    return geometry;
}
function registerGeometryLoader(scheme, geometryLoader) {
    geometryLoaders[scheme] = geometryLoader;
}
function registerUnknownGeometryLoader(geometryLoader) {
    const oldGeometryLoader = unknownGeometryLoader;
    unknownGeometryLoader = geometryLoader;
    return oldGeometryLoader;
}

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/loaders/ProgressiveRetrieveImages.js + 4 modules
var ProgressiveRetrieveImages = __webpack_require__(36822);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/index.js + 40 modules
var utilities = __webpack_require__(49035);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/loaders/cornerstoneStreamingImageVolumeLoader.js
var cornerstoneStreamingImageVolumeLoader = __webpack_require__(55500);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/loaders/cornerstoneStreamingDynamicImageVolumeLoader.js
var cornerstoneStreamingDynamicImageVolumeLoader = __webpack_require__(55509);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/RenderingEngine/helpers/index.js + 2 modules
var helpers = __webpack_require__(98834);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/index.js




































// EXTERNAL MODULE: ../../../node_modules/@kitware/vtk.js/Common/DataModel/ImageData.js
var ImageData = __webpack_require__(58498);
// EXTERNAL MODULE: ../../../node_modules/@kitware/vtk.js/Common/Core/DataArray.js
var DataArray = __webpack_require__(42008);
;// CONCATENATED MODULE: ../../../node_modules/@icr/polyseg-wasm/dist/ICRPolySeg.js

var ICRPolySegApp = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  
  return (
function(ICRPolySegApp) {
  ICRPolySegApp = ICRPolySegApp || {};

var Module=typeof ICRPolySegApp!="undefined"?ICRPolySegApp:{};var readyPromiseResolve,readyPromiseReject;Module["ready"]=new Promise(function(resolve,reject){readyPromiseResolve=resolve;readyPromiseReject=reject});var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var ENVIRONMENT_IS_WEB=true;var ENVIRONMENT_IS_WORKER=false;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary,setWindowTitle;if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(_scriptDir){scriptDirectory=_scriptDir}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}else{scriptDirectory=""}{read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)}}setWindowTitle=title=>document.title=title}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var POINTER_SIZE=4;var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!="object"){abort("no native wasm support detected")}var wasmMemory;var ABORT=false;var EXITSTATUS;var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heapOrArray,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}function stringToUTF8Array(str,heap,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023}if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}}heap[outIdx]=0;return outIdx-startIdx}function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var c=str.charCodeAt(i);if(c<=127){len++}else if(c<=2047){len+=2}else if(c>=55296&&c<=57343){len+=4;++i}else{len+=3}}return len}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||16777216;var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function keepRuntimeAlive(){return noExitRuntime}function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);readyPromiseReject(e);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}var wasmBinaryFile;wasmBinaryFile="ICRPolySeg.wasm";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}catch(err){abort(err)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch=="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"a":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["Q"];updateGlobalBufferAndViews(wasmMemory.buffer);wasmTable=Module["asm"]["T"];addOnInit(Module["asm"]["R"]);removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){return WebAssembly.instantiate(binary,info)}).then(function(instance){return instance}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(wasmBinaryFile)&&typeof fetch=="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiationResult,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiationResult)})})}else{return instantiateArrayBuffer(receiveInstantiationResult)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);readyPromiseReject(e)}}instantiateAsync().catch(readyPromiseReject);return{}}var ASM_CONSTS={638383:$0=>{if(Module.updateProgress){Module.updateProgress($0)}}};function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}function callRuntimeCallbacks(callbacks){while(callbacks.length>0){callbacks.shift()(Module)}}function ExceptionInfo(excPtr){this.excPtr=excPtr;this.ptr=excPtr-24;this.set_type=function(type){HEAPU32[this.ptr+4>>2]=type};this.get_type=function(){return HEAPU32[this.ptr+4>>2]};this.set_destructor=function(destructor){HEAPU32[this.ptr+8>>2]=destructor};this.get_destructor=function(){return HEAPU32[this.ptr+8>>2]};this.set_refcount=function(refcount){HEAP32[this.ptr>>2]=refcount};this.set_caught=function(caught){caught=caught?1:0;HEAP8[this.ptr+12>>0]=caught};this.get_caught=function(){return HEAP8[this.ptr+12>>0]!=0};this.set_rethrown=function(rethrown){rethrown=rethrown?1:0;HEAP8[this.ptr+13>>0]=rethrown};this.get_rethrown=function(){return HEAP8[this.ptr+13>>0]!=0};this.init=function(type,destructor){this.set_adjusted_ptr(0);this.set_type(type);this.set_destructor(destructor);this.set_refcount(0);this.set_caught(false);this.set_rethrown(false)};this.add_ref=function(){var value=HEAP32[this.ptr>>2];HEAP32[this.ptr>>2]=value+1};this.release_ref=function(){var prev=HEAP32[this.ptr>>2];HEAP32[this.ptr>>2]=prev-1;return prev===1};this.set_adjusted_ptr=function(adjustedPtr){HEAPU32[this.ptr+16>>2]=adjustedPtr};this.get_adjusted_ptr=function(){return HEAPU32[this.ptr+16>>2]};this.get_exception_ptr=function(){var isPointer=___cxa_is_pointer_type(this.get_type());if(isPointer){return HEAPU32[this.excPtr>>2]}var adjusted=this.get_adjusted_ptr();if(adjusted!==0)return adjusted;return this.excPtr}}var exceptionLast=0;var uncaughtExceptionCount=0;function ___cxa_throw(ptr,type,destructor){var info=new ExceptionInfo(ptr);info.init(type,destructor);exceptionLast=ptr;uncaughtExceptionCount++;throw ptr}var SYSCALLS={varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret}};function ___syscall_getcwd(buf,size){}function ___syscall_getdents64(fd,dirp,count){}function ___syscall_openat(dirfd,path,flags,varargs){SYSCALLS.varargs=varargs}function ___syscall_readlinkat(dirfd,path,buf,bufsize){}function ___syscall_stat64(path,buf){}var structRegistrations={};function runDestructors(destructors){while(destructors.length){var ptr=destructors.pop();var del=destructors.pop();del(ptr)}}function simpleReadValueFromPointer(pointer){return this["fromWireType"](HEAP32[pointer>>2])}var awaitingDependencies={};var registeredTypes={};var typeDependencies={};var char_0=48;var char_9=57;function makeLegalFunctionName(name){if(undefined===name){return"_unknown"}name=name.replace(/[^a-zA-Z0-9_]/g,"$");var f=name.charCodeAt(0);if(f>=char_0&&f<=char_9){return"_"+name}return name}function createNamedFunction(name,body){name=makeLegalFunctionName(name);return new Function("body","return function "+name+"() {\n"+'    "use strict";'+"    return body.apply(this, arguments);\n"+"};\n")(body)}function extendError(baseErrorType,errorName){var errorClass=createNamedFunction(errorName,function(message){this.name=errorName;this.message=message;var stack=new Error(message).stack;if(stack!==undefined){this.stack=this.toString()+"\n"+stack.replace(/^Error(:[^\n]*)?\n/,"")}});errorClass.prototype=Object.create(baseErrorType.prototype);errorClass.prototype.constructor=errorClass;errorClass.prototype.toString=function(){if(this.message===undefined){return this.name}else{return this.name+": "+this.message}};return errorClass}var InternalError=undefined;function throwInternalError(message){throw new InternalError(message)}function whenDependentTypesAreResolved(myTypes,dependentTypes,getTypeConverters){myTypes.forEach(function(type){typeDependencies[type]=dependentTypes});function onComplete(typeConverters){var myTypeConverters=getTypeConverters(typeConverters);if(myTypeConverters.length!==myTypes.length){throwInternalError("Mismatched type converter count")}for(var i=0;i<myTypes.length;++i){registerType(myTypes[i],myTypeConverters[i])}}var typeConverters=new Array(dependentTypes.length);var unregisteredTypes=[];var registered=0;dependentTypes.forEach((dt,i)=>{if(registeredTypes.hasOwnProperty(dt)){typeConverters[i]=registeredTypes[dt]}else{unregisteredTypes.push(dt);if(!awaitingDependencies.hasOwnProperty(dt)){awaitingDependencies[dt]=[]}awaitingDependencies[dt].push(()=>{typeConverters[i]=registeredTypes[dt];++registered;if(registered===unregisteredTypes.length){onComplete(typeConverters)}})}});if(0===unregisteredTypes.length){onComplete(typeConverters)}}function __embind_finalize_value_object(structType){var reg=structRegistrations[structType];delete structRegistrations[structType];var rawConstructor=reg.rawConstructor;var rawDestructor=reg.rawDestructor;var fieldRecords=reg.fields;var fieldTypes=fieldRecords.map(field=>field.getterReturnType).concat(fieldRecords.map(field=>field.setterArgumentType));whenDependentTypesAreResolved([structType],fieldTypes,fieldTypes=>{var fields={};fieldRecords.forEach((field,i)=>{var fieldName=field.fieldName;var getterReturnType=fieldTypes[i];var getter=field.getter;var getterContext=field.getterContext;var setterArgumentType=fieldTypes[i+fieldRecords.length];var setter=field.setter;var setterContext=field.setterContext;fields[fieldName]={read:ptr=>{return getterReturnType["fromWireType"](getter(getterContext,ptr))},write:(ptr,o)=>{var destructors=[];setter(setterContext,ptr,setterArgumentType["toWireType"](destructors,o));runDestructors(destructors)}}});return[{name:reg.name,"fromWireType":function(ptr){var rv={};for(var i in fields){rv[i]=fields[i].read(ptr)}rawDestructor(ptr);return rv},"toWireType":function(destructors,o){for(var fieldName in fields){if(!(fieldName in o)){throw new TypeError('Missing field:  "'+fieldName+'"')}}var ptr=rawConstructor();for(fieldName in fields){fields[fieldName].write(ptr,o[fieldName])}if(destructors!==null){destructors.push(rawDestructor,ptr)}return ptr},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:rawDestructor}]})}function __embind_register_bigint(primitiveType,name,size,minRange,maxRange){}function getShiftFromSize(size){switch(size){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+size)}}function embind_init_charCodes(){var codes=new Array(256);for(var i=0;i<256;++i){codes[i]=String.fromCharCode(i)}embind_charCodes=codes}var embind_charCodes=undefined;function readLatin1String(ptr){var ret="";var c=ptr;while(HEAPU8[c]){ret+=embind_charCodes[HEAPU8[c++]]}return ret}var BindingError=undefined;function throwBindingError(message){throw new BindingError(message)}function registerType(rawType,registeredInstance,options={}){if(!("argPackAdvance"in registeredInstance)){throw new TypeError("registerType registeredInstance requires argPackAdvance")}var name=registeredInstance.name;if(!rawType){throwBindingError('type "'+name+'" must have a positive integer typeid pointer')}if(registeredTypes.hasOwnProperty(rawType)){if(options.ignoreDuplicateRegistrations){return}else{throwBindingError("Cannot register type '"+name+"' twice")}}registeredTypes[rawType]=registeredInstance;delete typeDependencies[rawType];if(awaitingDependencies.hasOwnProperty(rawType)){var callbacks=awaitingDependencies[rawType];delete awaitingDependencies[rawType];callbacks.forEach(cb=>cb())}}function __embind_register_bool(rawType,name,size,trueValue,falseValue){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(wt){return!!wt},"toWireType":function(destructors,o){return o?trueValue:falseValue},"argPackAdvance":8,"readValueFromPointer":function(pointer){var heap;if(size===1){heap=HEAP8}else if(size===2){heap=HEAP16}else if(size===4){heap=HEAP32}else{throw new TypeError("Unknown boolean type size: "+name)}return this["fromWireType"](heap[pointer>>shift])},destructorFunction:null})}var emval_free_list=[];var emval_handle_array=[{},{value:undefined},{value:null},{value:true},{value:false}];function __emval_decref(handle){if(handle>4&&0===--emval_handle_array[handle].refcount){emval_handle_array[handle]=undefined;emval_free_list.push(handle)}}function count_emval_handles(){var count=0;for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){++count}}return count}function get_first_emval(){for(var i=5;i<emval_handle_array.length;++i){if(emval_handle_array[i]!==undefined){return emval_handle_array[i]}}return null}function init_emval(){Module["count_emval_handles"]=count_emval_handles;Module["get_first_emval"]=get_first_emval}var Emval={toValue:handle=>{if(!handle){throwBindingError("Cannot use deleted val. handle = "+handle)}return emval_handle_array[handle].value},toHandle:value=>{switch(value){case undefined:return 1;case null:return 2;case true:return 3;case false:return 4;default:{var handle=emval_free_list.length?emval_free_list.pop():emval_handle_array.length;emval_handle_array[handle]={refcount:1,value:value};return handle}}}};function __embind_register_emval(rawType,name){name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(handle){var rv=Emval.toValue(handle);__emval_decref(handle);return rv},"toWireType":function(destructors,value){return Emval.toHandle(value)},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:null})}function floatReadValueFromPointer(name,shift){switch(shift){case 2:return function(pointer){return this["fromWireType"](HEAPF32[pointer>>2])};case 3:return function(pointer){return this["fromWireType"](HEAPF64[pointer>>3])};default:throw new TypeError("Unknown float type: "+name)}}function __embind_register_float(rawType,name,size){var shift=getShiftFromSize(size);name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":function(value){return value},"toWireType":function(destructors,value){return value},"argPackAdvance":8,"readValueFromPointer":floatReadValueFromPointer(name,shift),destructorFunction:null})}function new_(constructor,argumentList){if(!(constructor instanceof Function)){throw new TypeError("new_ called with constructor type "+typeof constructor+" which is not a function")}var dummy=createNamedFunction(constructor.name||"unknownFunctionName",function(){});dummy.prototype=constructor.prototype;var obj=new dummy;var r=constructor.apply(obj,argumentList);return r instanceof Object?r:obj}function craftInvokerFunction(humanName,argTypes,classType,cppInvokerFunc,cppTargetFunc){var argCount=argTypes.length;if(argCount<2){throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!")}var isClassMethodFunc=argTypes[1]!==null&&classType!==null;var needsDestructorStack=false;for(var i=1;i<argTypes.length;++i){if(argTypes[i]!==null&&argTypes[i].destructorFunction===undefined){needsDestructorStack=true;break}}var returns=argTypes[0].name!=="void";var argsList="";var argsListWired="";for(var i=0;i<argCount-2;++i){argsList+=(i!==0?", ":"")+"arg"+i;argsListWired+=(i!==0?", ":"")+"arg"+i+"Wired"}var invokerFnBody="return function "+makeLegalFunctionName(humanName)+"("+argsList+") {\n"+"if (arguments.length !== "+(argCount-2)+") {\n"+"throwBindingError('function "+humanName+" called with ' + arguments.length + ' arguments, expected "+(argCount-2)+" args!');\n"+"}\n";if(needsDestructorStack){invokerFnBody+="var destructors = [];\n"}var dtorStack=needsDestructorStack?"destructors":"null";var args1=["throwBindingError","invoker","fn","runDestructors","retType","classParam"];var args2=[throwBindingError,cppInvokerFunc,cppTargetFunc,runDestructors,argTypes[0],argTypes[1]];if(isClassMethodFunc){invokerFnBody+="var thisWired = classParam.toWireType("+dtorStack+", this);\n"}for(var i=0;i<argCount-2;++i){invokerFnBody+="var arg"+i+"Wired = argType"+i+".toWireType("+dtorStack+", arg"+i+"); // "+argTypes[i+2].name+"\n";args1.push("argType"+i);args2.push(argTypes[i+2])}if(isClassMethodFunc){argsListWired="thisWired"+(argsListWired.length>0?", ":"")+argsListWired}invokerFnBody+=(returns?"var rv = ":"")+"invoker(fn"+(argsListWired.length>0?", ":"")+argsListWired+");\n";if(needsDestructorStack){invokerFnBody+="runDestructors(destructors);\n"}else{for(var i=isClassMethodFunc?1:2;i<argTypes.length;++i){var paramName=i===1?"thisWired":"arg"+(i-2)+"Wired";if(argTypes[i].destructorFunction!==null){invokerFnBody+=paramName+"_dtor("+paramName+"); // "+argTypes[i].name+"\n";args1.push(paramName+"_dtor");args2.push(argTypes[i].destructorFunction)}}}if(returns){invokerFnBody+="var ret = retType.fromWireType(rv);\n"+"return ret;\n"}else{}invokerFnBody+="}\n";args1.push(invokerFnBody);var invokerFunction=new_(Function,args1).apply(null,args2);return invokerFunction}function ensureOverloadTable(proto,methodName,humanName){if(undefined===proto[methodName].overloadTable){var prevFunc=proto[methodName];proto[methodName]=function(){if(!proto[methodName].overloadTable.hasOwnProperty(arguments.length)){throwBindingError("Function '"+humanName+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+proto[methodName].overloadTable+")!")}return proto[methodName].overloadTable[arguments.length].apply(this,arguments)};proto[methodName].overloadTable=[];proto[methodName].overloadTable[prevFunc.argCount]=prevFunc}}function exposePublicSymbol(name,value,numArguments){if(Module.hasOwnProperty(name)){if(undefined===numArguments||undefined!==Module[name].overloadTable&&undefined!==Module[name].overloadTable[numArguments]){throwBindingError("Cannot register public name '"+name+"' twice")}ensureOverloadTable(Module,name,name);if(Module.hasOwnProperty(numArguments)){throwBindingError("Cannot register multiple overloads of a function with the same number of arguments ("+numArguments+")!")}Module[name].overloadTable[numArguments]=value}else{Module[name]=value;if(undefined!==numArguments){Module[name].numArguments=numArguments}}}function heap32VectorToArray(count,firstElement){var array=[];for(var i=0;i<count;i++){array.push(HEAPU32[firstElement+i*4>>2])}return array}function replacePublicSymbol(name,value,numArguments){if(!Module.hasOwnProperty(name)){throwInternalError("Replacing nonexistant public symbol")}if(undefined!==Module[name].overloadTable&&undefined!==numArguments){Module[name].overloadTable[numArguments]=value}else{Module[name]=value;Module[name].argCount=numArguments}}function dynCallLegacy(sig,ptr,args){var f=Module["dynCall_"+sig];return args&&args.length?f.apply(null,[ptr].concat(args)):f.call(null,ptr)}var wasmTableMirror=[];function getWasmTableEntry(funcPtr){var func=wasmTableMirror[funcPtr];if(!func){if(funcPtr>=wasmTableMirror.length)wasmTableMirror.length=funcPtr+1;wasmTableMirror[funcPtr]=func=wasmTable.get(funcPtr)}return func}function dynCall(sig,ptr,args){if(sig.includes("j")){return dynCallLegacy(sig,ptr,args)}var rtn=getWasmTableEntry(ptr).apply(null,args);return rtn}function getDynCaller(sig,ptr){var argCache=[];return function(){argCache.length=0;Object.assign(argCache,arguments);return dynCall(sig,ptr,argCache)}}function embind__requireFunction(signature,rawFunction){signature=readLatin1String(signature);function makeDynCaller(){if(signature.includes("j")){return getDynCaller(signature,rawFunction)}return getWasmTableEntry(rawFunction)}var fp=makeDynCaller();if(typeof fp!="function"){throwBindingError("unknown function pointer with signature "+signature+": "+rawFunction)}return fp}var UnboundTypeError=undefined;function getTypeName(type){var ptr=___getTypeName(type);var rv=readLatin1String(ptr);_free(ptr);return rv}function throwUnboundTypeError(message,types){var unboundTypes=[];var seen={};function visit(type){if(seen[type]){return}if(registeredTypes[type]){return}if(typeDependencies[type]){typeDependencies[type].forEach(visit);return}unboundTypes.push(type);seen[type]=true}types.forEach(visit);throw new UnboundTypeError(message+": "+unboundTypes.map(getTypeName).join([", "]))}function __embind_register_function(name,argCount,rawArgTypesAddr,signature,rawInvoker,fn){var argTypes=heap32VectorToArray(argCount,rawArgTypesAddr);name=readLatin1String(name);rawInvoker=embind__requireFunction(signature,rawInvoker);exposePublicSymbol(name,function(){throwUnboundTypeError("Cannot call "+name+" due to unbound types",argTypes)},argCount-1);whenDependentTypesAreResolved([],argTypes,function(argTypes){var invokerArgsArray=[argTypes[0],null].concat(argTypes.slice(1));replacePublicSymbol(name,craftInvokerFunction(name,invokerArgsArray,null,rawInvoker,fn),argCount-1);return[]})}function integerReadValueFromPointer(name,shift,signed){switch(shift){case 0:return signed?function readS8FromPointer(pointer){return HEAP8[pointer]}:function readU8FromPointer(pointer){return HEAPU8[pointer]};case 1:return signed?function readS16FromPointer(pointer){return HEAP16[pointer>>1]}:function readU16FromPointer(pointer){return HEAPU16[pointer>>1]};case 2:return signed?function readS32FromPointer(pointer){return HEAP32[pointer>>2]}:function readU32FromPointer(pointer){return HEAPU32[pointer>>2]};default:throw new TypeError("Unknown integer type: "+name)}}function __embind_register_integer(primitiveType,name,size,minRange,maxRange){name=readLatin1String(name);if(maxRange===-1){maxRange=4294967295}var shift=getShiftFromSize(size);var fromWireType=value=>value;if(minRange===0){var bitshift=32-8*size;fromWireType=value=>value<<bitshift>>>bitshift}var isUnsignedType=name.includes("unsigned");var checkAssertions=(value,toTypeName)=>{};var toWireType;if(isUnsignedType){toWireType=function(destructors,value){checkAssertions(value,this.name);return value>>>0}}else{toWireType=function(destructors,value){checkAssertions(value,this.name);return value}}registerType(primitiveType,{name:name,"fromWireType":fromWireType,"toWireType":toWireType,"argPackAdvance":8,"readValueFromPointer":integerReadValueFromPointer(name,shift,minRange!==0),destructorFunction:null})}function __embind_register_memory_view(rawType,dataTypeIndex,name){var typeMapping=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array];var TA=typeMapping[dataTypeIndex];function decodeMemoryView(handle){handle=handle>>2;var heap=HEAPU32;var size=heap[handle];var data=heap[handle+1];return new TA(buffer,data,size)}name=readLatin1String(name);registerType(rawType,{name:name,"fromWireType":decodeMemoryView,"argPackAdvance":8,"readValueFromPointer":decodeMemoryView},{ignoreDuplicateRegistrations:true})}function __embind_register_std_string(rawType,name){name=readLatin1String(name);var stdStringIsUTF8=name==="std::string";registerType(rawType,{name:name,"fromWireType":function(value){var length=HEAPU32[value>>2];var payload=value+4;var str;if(stdStringIsUTF8){var decodeStartPtr=payload;for(var i=0;i<=length;++i){var currentBytePtr=payload+i;if(i==length||HEAPU8[currentBytePtr]==0){var maxRead=currentBytePtr-decodeStartPtr;var stringSegment=UTF8ToString(decodeStartPtr,maxRead);if(str===undefined){str=stringSegment}else{str+=String.fromCharCode(0);str+=stringSegment}decodeStartPtr=currentBytePtr+1}}}else{var a=new Array(length);for(var i=0;i<length;++i){a[i]=String.fromCharCode(HEAPU8[payload+i])}str=a.join("")}_free(value);return str},"toWireType":function(destructors,value){if(value instanceof ArrayBuffer){value=new Uint8Array(value)}var length;var valueIsOfTypeString=typeof value=="string";if(!(valueIsOfTypeString||value instanceof Uint8Array||value instanceof Uint8ClampedArray||value instanceof Int8Array)){throwBindingError("Cannot pass non-string to std::string")}if(stdStringIsUTF8&&valueIsOfTypeString){length=lengthBytesUTF8(value)}else{length=value.length}var base=_malloc(4+length+1);var ptr=base+4;HEAPU32[base>>2]=length;if(stdStringIsUTF8&&valueIsOfTypeString){stringToUTF8(value,ptr,length+1)}else{if(valueIsOfTypeString){for(var i=0;i<length;++i){var charCode=value.charCodeAt(i);if(charCode>255){_free(ptr);throwBindingError("String has UTF-16 code units that do not fit in 8 bits")}HEAPU8[ptr+i]=charCode}}else{for(var i=0;i<length;++i){HEAPU8[ptr+i]=value[i]}}}if(destructors!==null){destructors.push(_free,base)}return base},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:function(ptr){_free(ptr)}})}var UTF16Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf-16le"):undefined;function UTF16ToString(ptr,maxBytesToRead){var endPtr=ptr;var idx=endPtr>>1;var maxIdx=idx+maxBytesToRead/2;while(!(idx>=maxIdx)&&HEAPU16[idx])++idx;endPtr=idx<<1;if(endPtr-ptr>32&&UTF16Decoder)return UTF16Decoder.decode(HEAPU8.subarray(ptr,endPtr));var str="";for(var i=0;!(i>=maxBytesToRead/2);++i){var codeUnit=HEAP16[ptr+i*2>>1];if(codeUnit==0)break;str+=String.fromCharCode(codeUnit)}return str}function stringToUTF16(str,outPtr,maxBytesToWrite){if(maxBytesToWrite===undefined){maxBytesToWrite=2147483647}if(maxBytesToWrite<2)return 0;maxBytesToWrite-=2;var startPtr=outPtr;var numCharsToWrite=maxBytesToWrite<str.length*2?maxBytesToWrite/2:str.length;for(var i=0;i<numCharsToWrite;++i){var codeUnit=str.charCodeAt(i);HEAP16[outPtr>>1]=codeUnit;outPtr+=2}HEAP16[outPtr>>1]=0;return outPtr-startPtr}function lengthBytesUTF16(str){return str.length*2}function UTF32ToString(ptr,maxBytesToRead){var i=0;var str="";while(!(i>=maxBytesToRead/4)){var utf32=HEAP32[ptr+i*4>>2];if(utf32==0)break;++i;if(utf32>=65536){var ch=utf32-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}else{str+=String.fromCharCode(utf32)}}return str}function stringToUTF32(str,outPtr,maxBytesToWrite){if(maxBytesToWrite===undefined){maxBytesToWrite=2147483647}if(maxBytesToWrite<4)return 0;var startPtr=outPtr;var endPtr=startPtr+maxBytesToWrite-4;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343){var trailSurrogate=str.charCodeAt(++i);codeUnit=65536+((codeUnit&1023)<<10)|trailSurrogate&1023}HEAP32[outPtr>>2]=codeUnit;outPtr+=4;if(outPtr+4>endPtr)break}HEAP32[outPtr>>2]=0;return outPtr-startPtr}function lengthBytesUTF32(str){var len=0;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343)++i;len+=4}return len}function __embind_register_std_wstring(rawType,charSize,name){name=readLatin1String(name);var decodeString,encodeString,getHeap,lengthBytesUTF,shift;if(charSize===2){decodeString=UTF16ToString;encodeString=stringToUTF16;lengthBytesUTF=lengthBytesUTF16;getHeap=()=>HEAPU16;shift=1}else if(charSize===4){decodeString=UTF32ToString;encodeString=stringToUTF32;lengthBytesUTF=lengthBytesUTF32;getHeap=()=>HEAPU32;shift=2}registerType(rawType,{name:name,"fromWireType":function(value){var length=HEAPU32[value>>2];var HEAP=getHeap();var str;var decodeStartPtr=value+4;for(var i=0;i<=length;++i){var currentBytePtr=value+4+i*charSize;if(i==length||HEAP[currentBytePtr>>shift]==0){var maxReadBytes=currentBytePtr-decodeStartPtr;var stringSegment=decodeString(decodeStartPtr,maxReadBytes);if(str===undefined){str=stringSegment}else{str+=String.fromCharCode(0);str+=stringSegment}decodeStartPtr=currentBytePtr+charSize}}_free(value);return str},"toWireType":function(destructors,value){if(!(typeof value=="string")){throwBindingError("Cannot pass non-string to C++ string type "+name)}var length=lengthBytesUTF(value);var ptr=_malloc(4+length+charSize);HEAPU32[ptr>>2]=length>>shift;encodeString(value,ptr+4,length+charSize);if(destructors!==null){destructors.push(_free,ptr)}return ptr},"argPackAdvance":8,"readValueFromPointer":simpleReadValueFromPointer,destructorFunction:function(ptr){_free(ptr)}})}function __embind_register_value_object(rawType,name,constructorSignature,rawConstructor,destructorSignature,rawDestructor){structRegistrations[rawType]={name:readLatin1String(name),rawConstructor:embind__requireFunction(constructorSignature,rawConstructor),rawDestructor:embind__requireFunction(destructorSignature,rawDestructor),fields:[]}}function __embind_register_value_object_field(structType,fieldName,getterReturnType,getterSignature,getter,getterContext,setterArgumentType,setterSignature,setter,setterContext){structRegistrations[structType].fields.push({fieldName:readLatin1String(fieldName),getterReturnType:getterReturnType,getter:embind__requireFunction(getterSignature,getter),getterContext:getterContext,setterArgumentType:setterArgumentType,setter:embind__requireFunction(setterSignature,setter),setterContext:setterContext})}function __embind_register_void(rawType,name){name=readLatin1String(name);registerType(rawType,{isVoid:true,name:name,"argPackAdvance":0,"fromWireType":function(){return undefined},"toWireType":function(destructors,o){return undefined}})}function requireRegisteredType(rawType,humanName){var impl=registeredTypes[rawType];if(undefined===impl){throwBindingError(humanName+" has unknown type "+getTypeName(rawType))}return impl}function __emval_as(handle,returnType,destructorsRef){handle=Emval.toValue(handle);returnType=requireRegisteredType(returnType,"emval::as");var destructors=[];var rd=Emval.toHandle(destructors);HEAPU32[destructorsRef>>2]=rd;return returnType["toWireType"](destructors,handle)}var emval_symbols={};function getStringOrSymbol(address){var symbol=emval_symbols[address];if(symbol===undefined){return readLatin1String(address)}return symbol}var emval_methodCallers=[];function __emval_call_void_method(caller,handle,methodName,args){caller=emval_methodCallers[caller];handle=Emval.toValue(handle);methodName=getStringOrSymbol(methodName);caller(handle,methodName,null,args)}function emval_get_global(){if(typeof globalThis=="object"){return globalThis}return function(){return Function}()("return this")()}function __emval_get_global(name){if(name===0){return Emval.toHandle(emval_get_global())}else{name=getStringOrSymbol(name);return Emval.toHandle(emval_get_global()[name])}}function emval_addMethodCaller(caller){var id=emval_methodCallers.length;emval_methodCallers.push(caller);return id}function emval_lookupTypes(argCount,argTypes){var a=new Array(argCount);for(var i=0;i<argCount;++i){a[i]=requireRegisteredType(HEAPU32[argTypes+i*POINTER_SIZE>>2],"parameter "+i)}return a}var emval_registeredMethods=[];function __emval_get_method_caller(argCount,argTypes){var types=emval_lookupTypes(argCount,argTypes);var retType=types[0];var signatureName=retType.name+"_$"+types.slice(1).map(function(t){return t.name}).join("_")+"$";var returnId=emval_registeredMethods[signatureName];if(returnId!==undefined){return returnId}var params=["retType"];var args=[retType];var argsList="";for(var i=0;i<argCount-1;++i){argsList+=(i!==0?", ":"")+"arg"+i;params.push("argType"+i);args.push(types[1+i])}var functionName=makeLegalFunctionName("methodCaller_"+signatureName);var functionBody="return function "+functionName+"(handle, name, destructors, args) {\n";var offset=0;for(var i=0;i<argCount-1;++i){functionBody+="    var arg"+i+" = argType"+i+".readValueFromPointer(args"+(offset?"+"+offset:"")+");\n";offset+=types[i+1]["argPackAdvance"]}functionBody+="    var rv = handle[name]("+argsList+");\n";for(var i=0;i<argCount-1;++i){if(types[i+1]["deleteObject"]){functionBody+="    argType"+i+".deleteObject(arg"+i+");\n"}}if(!retType.isVoid){functionBody+="    return retType.toWireType(destructors, rv);\n"}functionBody+="};\n";params.push(functionBody);var invokerFunction=new_(Function,params).apply(null,args);returnId=emval_addMethodCaller(invokerFunction);emval_registeredMethods[signatureName]=returnId;return returnId}function __emval_get_property(handle,key){handle=Emval.toValue(handle);key=Emval.toValue(key);return Emval.toHandle(handle[key])}function __emval_incref(handle){if(handle>4){emval_handle_array[handle].refcount+=1}}function craftEmvalAllocator(argCount){var argsList="";for(var i=0;i<argCount;++i){argsList+=(i!==0?", ":"")+"arg"+i}var getMemory=()=>HEAPU32;var functionBody="return function emval_allocator_"+argCount+"(constructor, argTypes, args) {\n"+"  var HEAPU32 = getMemory();\n";for(var i=0;i<argCount;++i){functionBody+="var argType"+i+" = requireRegisteredType(HEAPU32[((argTypes)>>2)], 'parameter "+i+"');\n"+"var arg"+i+" = argType"+i+".readValueFromPointer(args);\n"+"args += argType"+i+"['argPackAdvance'];\n"+"argTypes += 4;\n"}functionBody+="var obj = new constructor("+argsList+");\n"+"return valueToHandle(obj);\n"+"}\n";return new Function("requireRegisteredType","Module","valueToHandle","getMemory",functionBody)(requireRegisteredType,Module,Emval.toHandle,getMemory)}var emval_newers={};function __emval_new(handle,argCount,argTypes,args){handle=Emval.toValue(handle);var newer=emval_newers[argCount];if(!newer){newer=craftEmvalAllocator(argCount);emval_newers[argCount]=newer}return newer(handle,argTypes,args)}function __emval_new_cstring(v){return Emval.toHandle(getStringOrSymbol(v))}function __emval_run_destructors(handle){var destructors=Emval.toValue(handle);runDestructors(destructors);__emval_decref(handle)}function __emval_take_value(type,arg){type=requireRegisteredType(type,"_emval_take_value");var v=type["readValueFromPointer"](arg);return Emval.toHandle(v)}function _abort(){abort("")}var readEmAsmArgsArray=[];function readEmAsmArgs(sigPtr,buf){readEmAsmArgsArray.length=0;var ch;buf>>=2;while(ch=HEAPU8[sigPtr++]){buf+=ch!=105&buf;readEmAsmArgsArray.push(ch==105?HEAP32[buf]:HEAPF64[buf++>>1]);++buf}return readEmAsmArgsArray}function runEmAsmFunction(code,sigPtr,argbuf){var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code].apply(null,args)}function _emscripten_asm_const_int(code,sigPtr,argbuf){return runEmAsmFunction(code,sigPtr,argbuf)}function getHeapMax(){return 2147483648}function _emscripten_get_heap_max(){return getHeapMax()}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num)}function emscripten_realloc_buffer(size){try{wasmMemory.grow(size-buffer.byteLength+65535>>>16);updateGlobalBufferAndViews(wasmMemory.buffer);return 1}catch(e){}}function _emscripten_resize_heap(requestedSize){var oldSize=HEAPU8.length;requestedSize=requestedSize>>>0;var maxHeapSize=getHeapMax();if(requestedSize>maxHeapSize){return false}let alignUp=(x,multiple)=>x+(multiple-x%multiple)%multiple;for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignUp(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=emscripten_realloc_buffer(newSize);if(replacement){return true}}return false}var ENV={};function getExecutableName(){return thisProgram||"./this.program"}function getEnvStrings(){if(!getEnvStrings.strings){var lang=(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8";var env={"USER":"web_user","LOGNAME":"web_user","PATH":"/","PWD":"/","HOME":"/home/web_user","LANG":lang,"_":getExecutableName()};for(var x in ENV){if(ENV[x]===undefined)delete env[x];else env[x]=ENV[x]}var strings=[];for(var x in env){strings.push(x+"="+env[x])}getEnvStrings.strings=strings}return getEnvStrings.strings}function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;++i){HEAP8[buffer++>>0]=str.charCodeAt(i)}if(!dontAddNull)HEAP8[buffer>>0]=0}function _environ_get(__environ,environ_buf){var bufSize=0;getEnvStrings().forEach(function(string,i){var ptr=environ_buf+bufSize;HEAPU32[__environ+i*4>>2]=ptr;writeAsciiToMemory(string,ptr);bufSize+=string.length+1});return 0}function _environ_sizes_get(penviron_count,penviron_buf_size){var strings=getEnvStrings();HEAPU32[penviron_count>>2]=strings.length;var bufSize=0;strings.forEach(function(string){bufSize+=string.length+1});HEAPU32[penviron_buf_size>>2]=bufSize;return 0}function _fd_close(fd){return 52}function _fd_read(fd,iov,iovcnt,pnum){return 52}function _fd_seek(fd,offset_low,offset_high,whence,newOffset){return 70}var printCharBuffers=[null,[],[]];function printChar(stream,curr){var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}}function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0}function __isLeapYear(year){return year%4===0&&(year%100!==0||year%400===0)}function __arraySum(array,index){var sum=0;for(var i=0;i<=index;sum+=array[i++]){}return sum}var __MONTH_DAYS_LEAP=[31,29,31,30,31,30,31,31,30,31,30,31];var __MONTH_DAYS_REGULAR=[31,28,31,30,31,30,31,31,30,31,30,31];function __addDays(date,days){var newDate=new Date(date.getTime());while(days>0){var leap=__isLeapYear(newDate.getFullYear());var currentMonth=newDate.getMonth();var daysInCurrentMonth=(leap?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR)[currentMonth];if(days>daysInCurrentMonth-newDate.getDate()){days-=daysInCurrentMonth-newDate.getDate()+1;newDate.setDate(1);if(currentMonth<11){newDate.setMonth(currentMonth+1)}else{newDate.setMonth(0);newDate.setFullYear(newDate.getFullYear()+1)}}else{newDate.setDate(newDate.getDate()+days);return newDate}}return newDate}function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array}function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer)}function _strftime(s,maxsize,format,tm){var tm_zone=HEAP32[tm+40>>2];var date={tm_sec:HEAP32[tm>>2],tm_min:HEAP32[tm+4>>2],tm_hour:HEAP32[tm+8>>2],tm_mday:HEAP32[tm+12>>2],tm_mon:HEAP32[tm+16>>2],tm_year:HEAP32[tm+20>>2],tm_wday:HEAP32[tm+24>>2],tm_yday:HEAP32[tm+28>>2],tm_isdst:HEAP32[tm+32>>2],tm_gmtoff:HEAP32[tm+36>>2],tm_zone:tm_zone?UTF8ToString(tm_zone):""};var pattern=UTF8ToString(format);var EXPANSION_RULES_1={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var rule in EXPANSION_RULES_1){pattern=pattern.replace(new RegExp(rule,"g"),EXPANSION_RULES_1[rule])}var WEEKDAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];function leadingSomething(value,digits,character){var str=typeof value=="number"?value.toString():value||"";while(str.length<digits){str=character[0]+str}return str}function leadingNulls(value,digits){return leadingSomething(value,digits,"0")}function compareByDay(date1,date2){function sgn(value){return value<0?-1:value>0?1:0}var compare;if((compare=sgn(date1.getFullYear()-date2.getFullYear()))===0){if((compare=sgn(date1.getMonth()-date2.getMonth()))===0){compare=sgn(date1.getDate()-date2.getDate())}}return compare}function getFirstWeekStartDate(janFourth){switch(janFourth.getDay()){case 0:return new Date(janFourth.getFullYear()-1,11,29);case 1:return janFourth;case 2:return new Date(janFourth.getFullYear(),0,3);case 3:return new Date(janFourth.getFullYear(),0,2);case 4:return new Date(janFourth.getFullYear(),0,1);case 5:return new Date(janFourth.getFullYear()-1,11,31);case 6:return new Date(janFourth.getFullYear()-1,11,30)}}function getWeekBasedYear(date){var thisDate=__addDays(new Date(date.tm_year+1900,0,1),date.tm_yday);var janFourthThisYear=new Date(thisDate.getFullYear(),0,4);var janFourthNextYear=new Date(thisDate.getFullYear()+1,0,4);var firstWeekStartThisYear=getFirstWeekStartDate(janFourthThisYear);var firstWeekStartNextYear=getFirstWeekStartDate(janFourthNextYear);if(compareByDay(firstWeekStartThisYear,thisDate)<=0){if(compareByDay(firstWeekStartNextYear,thisDate)<=0){return thisDate.getFullYear()+1}return thisDate.getFullYear()}return thisDate.getFullYear()-1}var EXPANSION_RULES_2={"%a":function(date){return WEEKDAYS[date.tm_wday].substring(0,3)},"%A":function(date){return WEEKDAYS[date.tm_wday]},"%b":function(date){return MONTHS[date.tm_mon].substring(0,3)},"%B":function(date){return MONTHS[date.tm_mon]},"%C":function(date){var year=date.tm_year+1900;return leadingNulls(year/100|0,2)},"%d":function(date){return leadingNulls(date.tm_mday,2)},"%e":function(date){return leadingSomething(date.tm_mday,2," ")},"%g":function(date){return getWeekBasedYear(date).toString().substring(2)},"%G":function(date){return getWeekBasedYear(date)},"%H":function(date){return leadingNulls(date.tm_hour,2)},"%I":function(date){var twelveHour=date.tm_hour;if(twelveHour==0)twelveHour=12;else if(twelveHour>12)twelveHour-=12;return leadingNulls(twelveHour,2)},"%j":function(date){return leadingNulls(date.tm_mday+__arraySum(__isLeapYear(date.tm_year+1900)?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,date.tm_mon-1),3)},"%m":function(date){return leadingNulls(date.tm_mon+1,2)},"%M":function(date){return leadingNulls(date.tm_min,2)},"%n":function(){return"\n"},"%p":function(date){if(date.tm_hour>=0&&date.tm_hour<12){return"AM"}return"PM"},"%S":function(date){return leadingNulls(date.tm_sec,2)},"%t":function(){return"\t"},"%u":function(date){return date.tm_wday||7},"%U":function(date){var days=date.tm_yday+7-date.tm_wday;return leadingNulls(Math.floor(days/7),2)},"%V":function(date){var val=Math.floor((date.tm_yday+7-(date.tm_wday+6)%7)/7);if((date.tm_wday+371-date.tm_yday-2)%7<=2){val++}if(!val){val=52;var dec31=(date.tm_wday+7-date.tm_yday-1)%7;if(dec31==4||dec31==5&&__isLeapYear(date.tm_year%400-1)){val++}}else if(val==53){var jan1=(date.tm_wday+371-date.tm_yday)%7;if(jan1!=4&&(jan1!=3||!__isLeapYear(date.tm_year)))val=1}return leadingNulls(val,2)},"%w":function(date){return date.tm_wday},"%W":function(date){var days=date.tm_yday+7-(date.tm_wday+6)%7;return leadingNulls(Math.floor(days/7),2)},"%y":function(date){return(date.tm_year+1900).toString().substring(2)},"%Y":function(date){return date.tm_year+1900},"%z":function(date){var off=date.tm_gmtoff;var ahead=off>=0;off=Math.abs(off)/60;off=off/60*100+off%60;return(ahead?"+":"-")+String("0000"+off).slice(-4)},"%Z":function(date){return date.tm_zone},"%%":function(){return"%"}};pattern=pattern.replace(/%%/g,"\0\0");for(var rule in EXPANSION_RULES_2){if(pattern.includes(rule)){pattern=pattern.replace(new RegExp(rule,"g"),EXPANSION_RULES_2[rule](date))}}pattern=pattern.replace(/\0\0/g,"%");var bytes=intArrayFromString(pattern,false);if(bytes.length>maxsize){return 0}writeArrayToMemory(bytes,s);return bytes.length-1}function _strftime_l(s,maxsize,format,tm,loc){return _strftime(s,maxsize,format,tm)}function _proc_exit(code){EXITSTATUS=code;if(!keepRuntimeAlive()){if(Module["onExit"])Module["onExit"](code);ABORT=true}quit_(code,new ExitStatus(code))}function exitJS(status,implicit){EXITSTATUS=status;_proc_exit(status)}function handleException(e){if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)}InternalError=Module["InternalError"]=extendError(Error,"InternalError");embind_init_charCodes();BindingError=Module["BindingError"]=extendError(Error,"BindingError");init_emval();UnboundTypeError=Module["UnboundTypeError"]=extendError(Error,"UnboundTypeError");var asmLibraryArg={"b":___cxa_throw,"J":___syscall_getcwd,"F":___syscall_getdents64,"L":___syscall_openat,"E":___syscall_readlinkat,"G":___syscall_stat64,"x":__embind_finalize_value_object,"A":__embind_register_bigint,"O":__embind_register_bool,"N":__embind_register_emval,"v":__embind_register_float,"g":__embind_register_function,"d":__embind_register_integer,"c":__embind_register_memory_view,"u":__embind_register_std_string,"m":__embind_register_std_wstring,"y":__embind_register_value_object,"e":__embind_register_value_object_field,"P":__embind_register_void,"r":__emval_as,"i":__emval_call_void_method,"a":__emval_decref,"p":__emval_get_global,"j":__emval_get_method_caller,"s":__emval_get_property,"f":__emval_incref,"o":__emval_new,"w":__emval_new_cstring,"q":__emval_run_destructors,"k":__emval_take_value,"n":_abort,"h":_emscripten_asm_const_int,"D":_emscripten_get_heap_max,"M":_emscripten_memcpy_big,"C":_emscripten_resize_heap,"H":_environ_get,"I":_environ_sizes_get,"l":_fd_close,"K":_fd_read,"z":_fd_seek,"t":_fd_write,"B":_strftime_l};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return(___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["R"]).apply(null,arguments)};var _main=Module["_main"]=function(){return(_main=Module["_main"]=Module["asm"]["S"]).apply(null,arguments)};var _malloc=Module["_malloc"]=function(){return(_malloc=Module["_malloc"]=Module["asm"]["U"]).apply(null,arguments)};var _free=Module["_free"]=function(){return(_free=Module["_free"]=Module["asm"]["V"]).apply(null,arguments)};var ___getTypeName=Module["___getTypeName"]=function(){return(___getTypeName=Module["___getTypeName"]=Module["asm"]["W"]).apply(null,arguments)};var __embind_initialize_bindings=Module["__embind_initialize_bindings"]=function(){return(__embind_initialize_bindings=Module["__embind_initialize_bindings"]=Module["asm"]["X"]).apply(null,arguments)};var ___cxa_is_pointer_type=Module["___cxa_is_pointer_type"]=function(){return(___cxa_is_pointer_type=Module["___cxa_is_pointer_type"]=Module["asm"]["Y"]).apply(null,arguments)};var dynCall_viij=Module["dynCall_viij"]=function(){return(dynCall_viij=Module["dynCall_viij"]=Module["asm"]["Z"]).apply(null,arguments)};var dynCall_vij=Module["dynCall_vij"]=function(){return(dynCall_vij=Module["dynCall_vij"]=Module["asm"]["_"]).apply(null,arguments)};var dynCall_iij=Module["dynCall_iij"]=function(){return(dynCall_iij=Module["dynCall_iij"]=Module["asm"]["$"]).apply(null,arguments)};var dynCall_viji=Module["dynCall_viji"]=function(){return(dynCall_viji=Module["dynCall_viji"]=Module["asm"]["aa"]).apply(null,arguments)};var dynCall_jiji=Module["dynCall_jiji"]=function(){return(dynCall_jiji=Module["dynCall_jiji"]=Module["asm"]["ba"]).apply(null,arguments)};var dynCall_viijii=Module["dynCall_viijii"]=function(){return(dynCall_viijii=Module["dynCall_viijii"]=Module["asm"]["ca"]).apply(null,arguments)};var dynCall_iiiiij=Module["dynCall_iiiiij"]=function(){return(dynCall_iiiiij=Module["dynCall_iiiiij"]=Module["asm"]["da"]).apply(null,arguments)};var dynCall_iiiiijj=Module["dynCall_iiiiijj"]=function(){return(dynCall_iiiiijj=Module["dynCall_iiiiijj"]=Module["asm"]["ea"]).apply(null,arguments)};var dynCall_iiiiiijj=Module["dynCall_iiiiiijj"]=function(){return(dynCall_iiiiiijj=Module["dynCall_iiiiiijj"]=Module["asm"]["fa"]).apply(null,arguments)};var ___start_em_js=Module["___start_em_js"]=638316;var ___stop_em_js=Module["___stop_em_js"]=638383;var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(args){var entryFunction=Module["_main"];var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(args){args=args||arguments_;if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();readyPromiseResolve(Module);if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain(args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();


  return ICRPolySegApp.ready
}
);
})();
/* harmony default export */ const dist_ICRPolySeg = (ICRPolySegApp);
;// CONCATENATED MODULE: ../../../node_modules/@icr/polyseg-wasm/dist/ICRPolySeg.wasm
const dist_ICRPolySeg_namespaceObject = __webpack_require__.p + "17dd54813d5acc10bf8f.wasm";
;// CONCATENATED MODULE: ../../../node_modules/@icr/polyseg-wasm/dist/index.js



class ICRPolySeg {
  constructor() {
    this._instance;
  }

  get instance() {
    if (this._instance) {
      return this._instance;
    }

    throw new Error('ICRPolySeg is not initialized.');
  }

  async initialize(params = {}) {
    this._instance = await dist_ICRPolySeg({
      locateFile: (f) => {
        if (f.endsWith('.wasm')) {
          return dist_ICRPolySeg_namespaceObject;
        }
        return f;
      },
      ...params
    });
  }
}

// EXTERNAL MODULE: ../../../node_modules/@kitware/vtk.js/Common/DataModel/Plane.js + 1 modules
var Plane = __webpack_require__(75127);
// EXTERNAL MODULE: ../../../node_modules/@kitware/vtk.js/Common/DataModel/PolyData.js + 9 modules
var PolyData = __webpack_require__(79484);
// EXTERNAL MODULE: ../../../node_modules/@kitware/vtk.js/macros2.js
var macros2 = __webpack_require__(28906);
;// CONCATENATED MODULE: ../../../node_modules/@kitware/vtk.js/Filters/General/ContourLoopExtraction.js



const Dir = {
  Forward: 1,
  Backward: -1
};
const visited = new Set();
function vtkContourLoopExtraction(publicAPI, model) {
  publicAPI.requestData = (inData, outData) => {
    const [input] = inData;
    if (!outData[0]) {
      outData[0] = PolyData/* default.newInstance */.Ay.newInstance();
    }
    const [output] = outData;
    publicAPI.extractContours(input, output);
    output.modified();
  };
  publicAPI.traverseLoop = (pd, dir, startLineId, startPtId, loopPoints) => {
    let lineId = startLineId;
    let lastPtId = startPtId;
    let terminated = false;
    let numInserted = 0;
    while (!terminated) {
      const {
        cellPointIds
      } = pd.getCellPoints(lineId);
      if (!cellPointIds) {
        // eslint-disable-next-line no-continue
        continue;
      }
      lastPtId = cellPointIds[0] !== lastPtId ? cellPointIds[0] : cellPointIds[1];
      numInserted++;

      // parametric point value
      const t = dir * numInserted;
      loopPoints.push({
        t,
        ptId: lastPtId
      });
      const lineCell = pd.getPointCells(lastPtId);
      if (lineCell.length !== 2 || lastPtId === startPtId) {
        // looped
        return lastPtId;
      }
      if (lineCell.length === 2) {
        // continue along loop
        lineId = lineCell[0] !== lineId ? lineCell[0] : lineCell[1];
        visited.add(lineId);
      } else {
        // empty or invalid cell
        terminated = true;
      }
    }
    return lastPtId;
  };
  publicAPI.extractContours = (input, output) => {
    const loops = [];
    visited.clear();
    const inLines = input.getLines();
    output.getPoints().setData(Float32Array.from(input.getPoints().getData()));

    // TODO skip if cached input mtime hasn't changed.
    // iterate over input lines
    for (let li = 0; li < inLines.getNumberOfCells(); li++) {
      if (visited.has(li)) {
        // eslint-disable-next-line no-continue
        continue;
      }
      const {
        cellPointIds
      } = input.getCellPoints(li);
      if (!cellPointIds) {
        // eslint-disable-next-line no-continue
        continue;
      }
      visited.add(li);
      const startPtId = cellPointIds[0];
      const loopPoints = [];
      loopPoints.push({
        t: 0,
        ptId: startPtId
      });
      const endPtId = publicAPI.traverseLoop(input, Dir.Forward, li, startPtId, loopPoints);
      if (startPtId !== endPtId) {
        // didn't find a loop. Go other direction to see where we end up
        publicAPI.traverseLoop(input, Dir.Backward, li, startPtId, loopPoints);
        loopPoints.sort((a, b) => a.t < b.t ? -1 : 1);
        // make closed contour
        if (loopPoints.length && loopPoints[0].ptId !== loopPoints[loopPoints.length - 1]?.ptId) {
          loopPoints.push({
            ...loopPoints[loopPoints.length - 1]
          });
        }
      }
      if (loopPoints.length) {
        loops.push(loopPoints);
      }
    }

    // clear output lines
    const outLines = output.getLines();
    outLines.resize(0);
    loops.forEach(loop => {
      outLines.insertNextCell(loop.map(pt => pt.ptId));
    });
  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {};

// ----------------------------------------------------------------------------

function extend(publicAPI, model) {
  let initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Object.assign(model, DEFAULT_VALUES, initialValues);
  macros2.m.obj(publicAPI, model);
  macros2.m.algo(publicAPI, model, 1, 1);
  vtkContourLoopExtraction(publicAPI);
}

// ----------------------------------------------------------------------------

const newInstance = macros2.m.newInstance(extend, 'vtkContourLoopExtraction');

// ----------------------------------------------------------------------------

var ContourLoopExtraction_index = {
  newInstance,
  extend
};



// EXTERNAL MODULE: ../../../node_modules/@kitware/vtk.js/Filters/Core/Cutter.js
var Cutter = __webpack_require__(61088);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/boundingBox/extend2DBoundingBoxInViewAxis.js
function extend2DBoundingBoxInViewAxis(boundsIJK, numSlicesToProject) {
    const sliceNormalIndex = boundsIJK.findIndex(([min, max]) => min === max);
    if (sliceNormalIndex === -1) {
        throw new Error('3D bounding boxes not supported in an oblique plane');
    }
    boundsIJK[sliceNormalIndex][0] -= numSlicesToProject;
    boundsIJK[sliceNormalIndex][1] += numSlicesToProject;
    return boundsIJK;
}
/* harmony default export */ const boundingBox_extend2DBoundingBoxInViewAxis = ((/* unused pure expression or super */ null && (extend2DBoundingBoxInViewAxis)));

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/boundingBox/getBoundingBoxAroundShape.js

const { EPSILON } = constants;
function calculateBoundingBox(points, dimensions, isWorld = false) {
    let xMin = Infinity;
    let xMax = isWorld ? -Infinity : 0;
    let yMin = Infinity;
    let yMax = isWorld ? -Infinity : 0;
    let zMin = Infinity;
    let zMax = isWorld ? -Infinity : 0;
    const is3D = points[0]?.length === 3;
    for (let i = 0; i < points.length; i++) {
        const p = points[i];
        xMin = Math.min(p[0], xMin);
        xMax = Math.max(p[0], xMax);
        yMin = Math.min(p[1], yMin);
        yMax = Math.max(p[1], yMax);
        if (is3D) {
            zMin = Math.min(p[2] ?? zMin, zMin);
            zMax = Math.max(p[2] ?? zMax, zMax);
        }
    }
    if (dimensions) {
        xMin = Math.max(isWorld ? dimensions[0] + EPSILON : 0, xMin);
        xMax = Math.min(isWorld ? dimensions[0] - EPSILON : dimensions[0] - 1, xMax);
        yMin = Math.max(isWorld ? dimensions[1] + EPSILON : 0, yMin);
        yMax = Math.min(isWorld ? dimensions[1] - EPSILON : dimensions[1] - 1, yMax);
        if (is3D && dimensions.length === 3) {
            zMin = Math.max(isWorld ? dimensions[2] + EPSILON : 0, zMin);
            zMax = Math.min(isWorld ? dimensions[2] - EPSILON : dimensions[2] - 1, zMax);
        }
    }
    else if (!isWorld) {
        xMin = Math.max(0, xMin);
        xMax = Math.min(Infinity, xMax);
        yMin = Math.max(0, yMin);
        yMax = Math.min(Infinity, yMax);
        if (is3D) {
            zMin = Math.max(0, zMin);
            zMax = Math.min(Infinity, zMax);
        }
    }
    return is3D
        ? [
            [xMin, xMax],
            [yMin, yMax],
            [zMin, zMax],
        ]
        : [[xMin, xMax], [yMin, yMax], null];
}
function getBoundingBoxAroundShapeIJK(points, dimensions) {
    return calculateBoundingBox(points, dimensions, false);
}
function getBoundingBoxAroundShapeWorld(points, clipBounds) {
    return calculateBoundingBox(points, clipBounds, true);
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/boundingBox/index.js




// EXTERNAL MODULE: ../../../node_modules/gl-matrix/esm/index.js + 1 modules
var esm = __webpack_require__(3823);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/point/distanceToPointSquared.js
function distanceToPointSquared_distanceToPointSquared(p1, p2) {
    if (p1.length !== p2.length) {
        throw Error('Both points should have the same dimensionality');
    }
    const [x1, y1, z1 = 0] = p1;
    const [x2, y2, z2 = 0] = p2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;
    return dx * dx + dy * dy + dz * dz;
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/point/distanceToPoint.js

function distanceToPoint(p1, p2) {
    return Math.sqrt(distanceToPointSquared(p1, p2));
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/point/mirror.js
function mirror(mirrorPoint, staticPoint) {
    const [x1, y1] = mirrorPoint;
    const [x2, y2] = staticPoint;
    const newX = 2 * x2 - x1;
    const newY = 2 * y2 - y1;
    return [newX, newY];
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/point/index.js




;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/isClosed.js


function isClosed(polyline) {
    if (polyline.length < 3) {
        return false;
    }
    const numPolylinePoints = polyline.length;
    const firstPoint = polyline[0];
    const lastPoint = polyline[numPolylinePoints - 1];
    const distFirstToLastPoints = distanceToPointSquared_distanceToPointSquared(firstPoint, lastPoint);
    return esm/* glMatrix.equals */.Fd.equals(0, distFirstToLastPoints);
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/containsPoint.js

function containsPoint_containsPoint(polyline, point, options = {
    closed: undefined,
}) {
    if (polyline.length < 3) {
        return false;
    }
    const numPolylinePoints = polyline.length;
    let numIntersections = 0;
    const { closed, holes } = options;
    if (holes?.length) {
        for (const hole of holes) {
            if (containsPoint_containsPoint(hole, point)) {
                return false;
            }
        }
    }
    const shouldClose = !(closed === undefined ? isClosed(polyline) : closed);
    const maxSegmentIndex = polyline.length - (shouldClose ? 1 : 2);
    for (let i = 0; i <= maxSegmentIndex; i++) {
        const p1 = polyline[i];
        const p2Index = i === numPolylinePoints - 1 ? 0 : i + 1;
        const p2 = polyline[p2Index];
        const maxX = p1[0] >= p2[0] ? p1[0] : p2[0];
        const maxY = p1[1] >= p2[1] ? p1[1] : p2[1];
        const minY = p1[1] <= p2[1] ? p1[1] : p2[1];
        const mayIntersectLineSegment = point[0] <= maxX && point[1] >= minY && point[1] < maxY;
        if (mayIntersectLineSegment) {
            const isVerticalLine = p1[0] === p2[0];
            let intersects = isVerticalLine;
            if (!intersects) {
                const xIntersection = ((point[1] - p1[1]) * (p2[0] - p1[0])) / (p2[1] - p1[1]) + p1[0];
                intersects = point[0] <= xIntersection;
            }
            numIntersections += intersects ? 1 : 0;
        }
    }
    return !!(numIntersections % 2);
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/containsPoints.js

function containsPoints(polyline, points) {
    for (let i = 0, numPoint = points.length; i < numPoint; i++) {
        if (!containsPoint(polyline, points[i])) {
            return false;
        }
    }
    return true;
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/getAABB.js
function getAABB(polyline, options) {
    let polylineToUse = polyline;
    const numDimensions = options?.numDimensions || 2;
    const is3D = numDimensions === 3;
    if (!Array.isArray(polyline[0])) {
        const currentPolyline = polyline;
        const totalPoints = currentPolyline.length / numDimensions;
        polylineToUse = new Array(currentPolyline.length / numDimensions);
        for (let i = 0, len = totalPoints; i < len; i++) {
            polylineToUse[i] = [
                currentPolyline[i * numDimensions],
                currentPolyline[i * numDimensions + 1],
            ];
            if (is3D) {
                polylineToUse[i].push(currentPolyline[i * numDimensions + 2]);
            }
        }
    }
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let minZ = Infinity;
    let maxZ = -Infinity;
    polylineToUse = polylineToUse;
    for (let i = 0, len = polylineToUse.length; i < len; i++) {
        const [x, y, z] = polylineToUse[i];
        minX = minX < x ? minX : x;
        minY = minY < y ? minY : y;
        maxX = maxX > x ? maxX : x;
        maxY = maxY > y ? maxY : y;
        if (is3D) {
            minZ = minZ < z ? minZ : z;
            maxZ = maxZ > z ? maxZ : z;
        }
    }
    return is3D
        ? { minX, maxX, minY, maxY, minZ, maxZ }
        : { minX, maxX, minY, maxY };
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/getArea.js
function getArea(points) {
    const n = points.length;
    let area = 0.0;
    let j = n - 1;
    for (let i = 0; i < n; i++) {
        area += (points[j][0] + points[i][0]) * (points[j][1] - points[i][1]);
        j = i;
    }
    return Math.abs(area / 2.0);
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/getSignedArea.js
function getSignedArea_getSignedArea(polyline) {
    if (polyline.length < 3) {
        return 0;
    }
    const refPoint = polyline[0];
    let area = 0;
    for (let i = 0, len = polyline.length; i < len; i++) {
        const p1 = polyline[i];
        const p2Index = i === len - 1 ? 0 : i + 1;
        const p2 = polyline[p2Index];
        const aX = p1[0] - refPoint[0];
        const aY = p1[1] - refPoint[1];
        const bX = p2[0] - refPoint[0];
        const bY = p2[1] - refPoint[1];
        area += aX * bY - aY * bX;
    }
    area *= 0.5;
    return area;
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/getWindingDirection.js

function getWindingDirection(polyline) {
    const signedArea = getSignedArea(polyline);
    return signedArea >= 0 ? 1 : -1;
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/getNormal3.js

function _getAreaVector(polyline) {
    const vecArea = vec3.create();
    const refPoint = polyline[0];
    for (let i = 0, len = polyline.length; i < len; i++) {
        const p1 = polyline[i];
        const p2Index = i === len - 1 ? 0 : i + 1;
        const p2 = polyline[p2Index];
        const aX = p1[0] - refPoint[0];
        const aY = p1[1] - refPoint[1];
        const aZ = p1[2] - refPoint[2];
        const bX = p2[0] - refPoint[0];
        const bY = p2[1] - refPoint[1];
        const bZ = p2[2] - refPoint[2];
        vecArea[0] += aY * bZ - aZ * bY;
        vecArea[1] += aZ * bX - aX * bZ;
        vecArea[2] += aX * bY - aY * bX;
    }
    vec3.scale(vecArea, vecArea, 0.5);
    return vecArea;
}
function getNormal3(polyline) {
    const vecArea = _getAreaVector(polyline);
    return vec3.normalize(vecArea, vecArea);
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/getNormal2.js

function getNormal2_getNormal2(polyline) {
    const area = getSignedArea(polyline);
    return [0, 0, area / Math.abs(area)];
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/areLineSegmentsIntersecting.js
function areLineSegmentsIntersecting_areLineSegmentsIntersecting(p1, q1, p2, q2) {
    let result = false;
    const line1MinX = p1[0] < q1[0] ? p1[0] : q1[0];
    const line1MinY = p1[1] < q1[1] ? p1[1] : q1[1];
    const line1MaxX = p1[0] > q1[0] ? p1[0] : q1[0];
    const line1MaxY = p1[1] > q1[1] ? p1[1] : q1[1];
    const line2MinX = p2[0] < q2[0] ? p2[0] : q2[0];
    const line2MinY = p2[1] < q2[1] ? p2[1] : q2[1];
    const line2MaxX = p2[0] > q2[0] ? p2[0] : q2[0];
    const line2MaxY = p2[1] > q2[1] ? p2[1] : q2[1];
    if (line1MinX > line2MaxX ||
        line1MaxX < line2MinX ||
        line1MinY > line2MaxY ||
        line1MaxY < line2MinY) {
        return false;
    }
    const orient = [
        orientation(p1, q1, p2),
        orientation(p1, q1, q2),
        orientation(p2, q2, p1),
        orientation(p2, q2, q1),
    ];
    if (orient[0] !== orient[1] && orient[2] !== orient[3]) {
        return true;
    }
    if (orient[0] === 0 && onSegment(p1, p2, q1)) {
        result = true;
    }
    else if (orient[1] === 0 && onSegment(p1, q2, q1)) {
        result = true;
    }
    else if (orient[2] === 0 && onSegment(p2, p1, q2)) {
        result = true;
    }
    else if (orient[3] === 0 && onSegment(p2, q1, q2)) {
        result = true;
    }
    return result;
}
function orientation(p, q, r) {
    const orientationValue = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
    if (orientationValue === 0) {
        return 0;
    }
    return orientationValue > 0 ? 1 : 2;
}
function onSegment(p, q, r) {
    if (q[0] <= Math.max(p[0], r[0]) &&
        q[0] >= Math.min(p[0], r[0]) &&
        q[1] <= Math.max(p[1], r[1]) &&
        q[1] >= Math.min(p[1], r[1])) {
        return true;
    }
    return false;
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/getLineSegmentIntersectionsIndexes.js

function getLineSegmentIntersectionsIndexes_getLineSegmentIntersectionsIndexes(polyline, p1, q1, closed = true) {
    const intersections = [];
    const numPoints = polyline.length;
    const maxI = numPoints - (closed ? 1 : 2);
    for (let i = 0; i <= maxI; i++) {
        const p2 = polyline[i];
        const j = i === numPoints - 1 ? 0 : i + 1;
        const q2 = polyline[j];
        if (areLineSegmentsIntersecting(p1, q1, p2, q2)) {
            intersections.push([i, j]);
        }
    }
    return intersections;
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/line/distanceToPointSquaredInfo.js

function distanceToPointSquaredInfo_distanceToPointSquaredInfo(lineStart, lineEnd, point) {
    let closestPoint;
    const distanceSquared = distanceToPointSquared(lineStart, lineEnd);
    if (lineStart[0] === lineEnd[0] && lineStart[1] === lineEnd[1]) {
        closestPoint = lineStart;
    }
    if (!closestPoint) {
        const dotProduct = ((point[0] - lineStart[0]) * (lineEnd[0] - lineStart[0]) +
            (point[1] - lineStart[1]) * (lineEnd[1] - lineStart[1])) /
            distanceSquared;
        if (dotProduct < 0) {
            closestPoint = lineStart;
        }
        else if (dotProduct > 1) {
            closestPoint = lineEnd;
        }
        else {
            closestPoint = [
                lineStart[0] + dotProduct * (lineEnd[0] - lineStart[0]),
                lineStart[1] + dotProduct * (lineEnd[1] - lineStart[1]),
            ];
        }
    }
    return {
        point: [...closestPoint],
        distanceSquared: distanceToPointSquared(point, closestPoint),
    };
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/line/distanceToPointSquared.js

function line_distanceToPointSquared_distanceToPointSquared(lineStart, lineEnd, point) {
    return distanceToPointSquaredInfo(lineStart, lineEnd, point).distanceSquared;
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/line/distanceToPoint.js

function distanceToPoint_distanceToPoint(lineStart, lineEnd, point) {
    if (lineStart.length !== 2 || lineEnd.length !== 2 || point.length !== 2) {
        throw Error('lineStart, lineEnd, and point should have 2 elements of [x, y]');
    }
    return Math.sqrt(distanceToPointSquared(lineStart, lineEnd, point));
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/line/intersectLine.js
function sign(x) {
    return typeof x === 'number'
        ? x
            ? x < 0
                ? -1
                : 1
            : x === x
                ? 0
                : NaN
        : NaN;
}
function intersectLine(line1Start, line1End, line2Start, line2End) {
    const [x1, y1] = line1Start;
    const [x2, y2] = line1End;
    const [x3, y3] = line2Start;
    const [x4, y4] = line2End;
    const a1 = y2 - y1;
    const b1 = x1 - x2;
    const c1 = x2 * y1 - x1 * y2;
    const r3 = a1 * x3 + b1 * y3 + c1;
    const r4 = a1 * x4 + b1 * y4 + c1;
    if (r3 !== 0 && r4 !== 0 && sign(r3) === sign(r4)) {
        return;
    }
    const a2 = y4 - y3;
    const b2 = x3 - x4;
    const c2 = x4 * y3 - x3 * y4;
    const r1 = a2 * x1 + b2 * y1 + c2;
    const r2 = a2 * x2 + b2 * y2 + c2;
    if (r1 !== 0 && r2 !== 0 && sign(r1) === sign(r2)) {
        return;
    }
    const denom = a1 * b2 - a2 * b1;
    let num;
    num = b1 * c2 - b2 * c1;
    const x = num / denom;
    num = a2 * c1 - a1 * c2;
    const y = num / denom;
    const intersectionPoint = [x, y];
    return intersectionPoint;
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/line/isPointOnLineSegment.js
const ORIENTATION_TOLERANCE = 1e-2;
function isPointOnLineSegment(lineStart, lineEnd, point) {
    const minX = lineStart[0] <= lineEnd[0] ? lineStart[0] : lineEnd[0];
    const maxX = lineStart[0] >= lineEnd[0] ? lineStart[0] : lineEnd[0];
    const minY = lineStart[1] <= lineEnd[1] ? lineStart[1] : lineEnd[1];
    const maxY = lineStart[1] >= lineEnd[1] ? lineStart[1] : lineEnd[1];
    const aabbContainsPoint = point[0] >= minX - ORIENTATION_TOLERANCE &&
        point[0] <= maxX + ORIENTATION_TOLERANCE &&
        point[1] >= minY - ORIENTATION_TOLERANCE &&
        point[1] <= maxY + ORIENTATION_TOLERANCE;
    if (!aabbContainsPoint) {
        return false;
    }
    const orientation = (lineEnd[1] - lineStart[1]) * (point[0] - lineEnd[0]) -
        (lineEnd[0] - lineStart[0]) * (point[1] - lineEnd[1]);
    const absOrientation = orientation >= 0 ? orientation : -orientation;
    return absOrientation <= ORIENTATION_TOLERANCE;
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/line/index.js







;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/getLinesIntersection.js

const PARALLEL_LINES_TOLERANCE = 1e-2;
function getLinesIntersection_getLinesIntersection(p1, q1, p2, q2) {
    const diffQ1P1 = [q1[0] - p1[0], q1[1] - p1[1]];
    const diffQ2P2 = [q2[0] - p2[0], q2[1] - p2[1]];
    const denominator = diffQ2P2[1] * diffQ1P1[0] - diffQ2P2[0] * diffQ1P1[1];
    const absDenominator = denominator >= 0 ? denominator : -denominator;
    if (absDenominator < PARALLEL_LINES_TOLERANCE) {
        const line1AABB = [
            p1[0] < q1[0] ? p1[0] : q1[0],
            p1[0] > q1[0] ? p1[0] : q1[0],
            p1[1] < q1[1] ? p1[1] : q1[1],
            p1[1] > q1[1] ? p1[1] : q1[1],
        ];
        const line2AABB = [
            p2[0] < q2[0] ? p2[0] : q2[0],
            p2[0] > q2[0] ? p2[0] : q2[0],
            p2[1] < q2[1] ? p2[1] : q2[1],
            p2[1] > q2[1] ? p2[1] : q2[1],
        ];
        const aabbIntersects = line1AABB[0] <= line2AABB[1] &&
            line1AABB[1] >= line2AABB[0] &&
            line1AABB[2] <= line2AABB[3] &&
            line1AABB[3] >= line2AABB[2];
        if (!aabbIntersects) {
            return;
        }
        const overlap = mathLine.isPointOnLineSegment(p1, q1, p2) ||
            mathLine.isPointOnLineSegment(p1, q1, q2) ||
            mathLine.isPointOnLineSegment(p2, q2, p1);
        if (!overlap) {
            return;
        }
        const minX = line1AABB[0] > line2AABB[0] ? line1AABB[0] : line2AABB[0];
        const maxX = line1AABB[1] < line2AABB[1] ? line1AABB[1] : line2AABB[1];
        const minY = line1AABB[2] > line2AABB[2] ? line1AABB[2] : line2AABB[2];
        const maxY = line1AABB[3] < line2AABB[3] ? line1AABB[3] : line2AABB[3];
        const midX = (minX + maxX) * 0.5;
        const midY = (minY + maxY) * 0.5;
        return [midX, midY];
    }
    let a = p1[1] - p2[1];
    let b = p1[0] - p2[0];
    const numerator1 = diffQ2P2[0] * a - diffQ2P2[1] * b;
    const numerator2 = diffQ1P1[0] * a - diffQ1P1[1] * b;
    a = numerator1 / denominator;
    b = numerator2 / denominator;
    const resultX = p1[0] + a * diffQ1P1[0];
    const resultY = p1[1] + a * diffQ1P1[1];
    return [resultX, resultY];
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/combinePolyline.js






var PolylinePointType;
(function (PolylinePointType) {
    PolylinePointType[PolylinePointType["Vertex"] = 0] = "Vertex";
    PolylinePointType[PolylinePointType["Intersection"] = 1] = "Intersection";
})(PolylinePointType || (PolylinePointType = {}));
var PolylinePointPosition;
(function (PolylinePointPosition) {
    PolylinePointPosition[PolylinePointPosition["Outside"] = -1] = "Outside";
    PolylinePointPosition[PolylinePointPosition["Edge"] = 0] = "Edge";
    PolylinePointPosition[PolylinePointPosition["Inside"] = 1] = "Inside";
})(PolylinePointPosition || (PolylinePointPosition = {}));
var PolylinePointDirection;
(function (PolylinePointDirection) {
    PolylinePointDirection[PolylinePointDirection["Exiting"] = -1] = "Exiting";
    PolylinePointDirection[PolylinePointDirection["Unknown"] = 0] = "Unknown";
    PolylinePointDirection[PolylinePointDirection["Entering"] = 1] = "Entering";
})(PolylinePointDirection || (PolylinePointDirection = {}));
function ensuresNextPointers(polylinePoints) {
    for (let i = 0, len = polylinePoints.length; i < len; i++) {
        const currentPoint = polylinePoints[i];
        if (!currentPoint.next) {
            currentPoint.next = polylinePoints[i === len - 1 ? 0 : i + 1];
        }
    }
}
function getSourceAndTargetPointsList(targetPolyline, sourcePolyline) {
    const targetPolylinePoints = [];
    const sourcePolylinePoints = [];
    const sourceIntersectionsCache = new Map();
    const isFirstPointInside = containsPoint(sourcePolyline, targetPolyline[0]);
    let intersectionPointDirection = isFirstPointInside
        ? PolylinePointDirection.Exiting
        : PolylinePointDirection.Entering;
    for (let i = 0, len = targetPolyline.length; i < len; i++) {
        const p1 = targetPolyline[i];
        const pointInside = containsPoint(sourcePolyline, p1);
        const vertexPoint = {
            type: PolylinePointType.Vertex,
            coordinates: p1,
            position: pointInside
                ? PolylinePointPosition.Inside
                : PolylinePointPosition.Outside,
            visited: false,
            next: null,
        };
        targetPolylinePoints.push(vertexPoint);
        const q1 = targetPolyline[i === len - 1 ? 0 : i + 1];
        const intersectionsInfo = getLineSegmentIntersectionsIndexes(sourcePolyline, p1, q1).map((intersectedLineSegment) => {
            const sourceLineSegmentId = intersectedLineSegment[0];
            const p2 = sourcePolyline[intersectedLineSegment[0]];
            const q2 = sourcePolyline[intersectedLineSegment[1]];
            const intersectionCoordinate = getLinesIntersection(p1, q1, p2, q2);
            const targetStartPointDistSquared = mathPoint.distanceToPointSquared(p1, intersectionCoordinate);
            return {
                sourceLineSegmentId,
                coordinate: intersectionCoordinate,
                targetStartPointDistSquared,
            };
        });
        intersectionsInfo.sort((left, right) => left.targetStartPointDistSquared - right.targetStartPointDistSquared);
        intersectionsInfo.forEach((intersectionInfo) => {
            const { sourceLineSegmentId, coordinate: intersectionCoordinate } = intersectionInfo;
            const targetEdgePoint = {
                type: PolylinePointType.Intersection,
                coordinates: intersectionCoordinate,
                position: PolylinePointPosition.Edge,
                direction: intersectionPointDirection,
                visited: false,
                next: null,
            };
            const sourceEdgePoint = {
                ...targetEdgePoint,
                direction: PolylinePointDirection.Unknown,
                cloned: true,
            };
            if (intersectionPointDirection === PolylinePointDirection.Entering) {
                targetEdgePoint.next = sourceEdgePoint;
            }
            else {
                sourceEdgePoint.next = targetEdgePoint;
            }
            let sourceIntersectionPoints = sourceIntersectionsCache.get(sourceLineSegmentId);
            if (!sourceIntersectionPoints) {
                sourceIntersectionPoints = [];
                sourceIntersectionsCache.set(sourceLineSegmentId, sourceIntersectionPoints);
            }
            targetPolylinePoints.push(targetEdgePoint);
            sourceIntersectionPoints.push(sourceEdgePoint);
            intersectionPointDirection *= -1;
        });
    }
    for (let i = 0, len = sourcePolyline.length; i < len; i++) {
        const lineSegmentId = i;
        const p1 = sourcePolyline[i];
        const vertexPoint = {
            type: PolylinePointType.Vertex,
            coordinates: p1,
            visited: false,
            next: null,
        };
        sourcePolylinePoints.push(vertexPoint);
        const sourceIntersectionPoints = sourceIntersectionsCache.get(lineSegmentId);
        if (!sourceIntersectionPoints?.length) {
            continue;
        }
        sourceIntersectionPoints
            .map((intersectionPoint) => ({
            intersectionPoint,
            lineSegStartDistSquared: mathPoint.distanceToPointSquared(p1, intersectionPoint.coordinates),
        }))
            .sort((left, right) => left.lineSegStartDistSquared - right.lineSegStartDistSquared)
            .map(({ intersectionPoint }) => intersectionPoint)
            .forEach((intersectionPoint) => sourcePolylinePoints.push(intersectionPoint));
    }
    ensuresNextPointers(targetPolylinePoints);
    ensuresNextPointers(sourcePolylinePoints);
    return { targetPolylinePoints, sourcePolylinePoints };
}
function getUnvisitedOutsidePoint(polylinePoints) {
    for (let i = 0, len = polylinePoints.length; i < len; i++) {
        const point = polylinePoints[i];
        if (!point.visited && point.position === PolylinePointPosition.Outside) {
            return point;
        }
    }
}
function mergePolylines(targetPolyline, sourcePolyline) {
    const targetNormal = getNormal2(targetPolyline);
    const sourceNormal = getNormal2(sourcePolyline);
    const dotNormals = vec3.dot(sourceNormal, targetNormal);
    if (!glMatrix.equals(1, dotNormals)) {
        sourcePolyline = sourcePolyline.slice().reverse();
    }
    const { targetPolylinePoints } = getSourceAndTargetPointsList(targetPolyline, sourcePolyline);
    const startPoint = getUnvisitedOutsidePoint(targetPolylinePoints);
    if (!startPoint) {
        return targetPolyline.slice();
    }
    const mergedPolyline = [startPoint.coordinates];
    let currentPoint = startPoint.next;
    while (currentPoint !== startPoint) {
        if (currentPoint.type === PolylinePointType.Intersection &&
            currentPoint.cloned) {
            currentPoint = currentPoint.next;
            continue;
        }
        mergedPolyline.push(currentPoint.coordinates);
        currentPoint = currentPoint.next;
    }
    return mergedPolyline;
}
function subtractPolylines(targetPolyline, sourcePolyline) {
    const targetNormal = getNormal2(targetPolyline);
    const sourceNormal = getNormal2(sourcePolyline);
    const dotNormals = vec3.dot(sourceNormal, targetNormal);
    if (!glMatrix.equals(-1, dotNormals)) {
        sourcePolyline = sourcePolyline.slice().reverse();
    }
    const { targetPolylinePoints } = getSourceAndTargetPointsList(targetPolyline, sourcePolyline);
    let startPoint = null;
    const subtractedPolylines = [];
    while ((startPoint = getUnvisitedOutsidePoint(targetPolylinePoints))) {
        const subtractedPolyline = [startPoint.coordinates];
        let currentPoint = startPoint.next;
        startPoint.visited = true;
        while (currentPoint !== startPoint) {
            currentPoint.visited = true;
            if (currentPoint.type === PolylinePointType.Intersection &&
                currentPoint.cloned) {
                currentPoint = currentPoint.next;
                continue;
            }
            subtractedPolyline.push(currentPoint.coordinates);
            currentPoint = currentPoint.next;
        }
        subtractedPolylines.push(subtractedPolyline);
    }
    return subtractedPolylines;
}


;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/getFirstLineSegmentIntersectionIndexes.js

function getFirstLineSegmentIntersectionIndexes_getFirstLineSegmentIntersectionIndexes(points, p1, q1, closed = true) {
    let initialI;
    let j;
    if (closed) {
        j = points.length - 1;
        initialI = 0;
    }
    else {
        j = 0;
        initialI = 1;
    }
    for (let i = initialI; i < points.length; i++) {
        const p2 = points[j];
        const q2 = points[i];
        if (areLineSegmentsIntersecting(p1, q1, p2, q2)) {
            return [j, i];
        }
        j = i;
    }
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/intersectPolyline.js

function intersectPolyline(sourcePolyline, targetPolyline) {
    for (let i = 0, sourceLen = sourcePolyline.length; i < sourceLen; i++) {
        const sourceP1 = sourcePolyline[i];
        const sourceP2Index = i === sourceLen - 1 ? 0 : i + 1;
        const sourceP2 = sourcePolyline[sourceP2Index];
        const intersectionPointIndexes = getFirstLineSegmentIntersectionIndexes(targetPolyline, sourceP1, sourceP2);
        if (intersectionPointIndexes?.length === 2) {
            return true;
        }
    }
    return false;
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/decimate.js

const DEFAULT_EPSILON = 0.1;
function decimate(polyline, epsilon = DEFAULT_EPSILON) {
    const numPoints = polyline.length;
    if (numPoints < 3) {
        return polyline;
    }
    const epsilonSquared = epsilon * epsilon;
    const partitionQueue = [[0, numPoints - 1]];
    const polylinePointFlags = new Array(numPoints).fill(false);
    let numDecimatedPoints = 2;
    polylinePointFlags[0] = true;
    polylinePointFlags[numPoints - 1] = true;
    while (partitionQueue.length) {
        const [startIndex, endIndex] = partitionQueue.pop();
        if (endIndex - startIndex === 1) {
            continue;
        }
        const startPoint = polyline[startIndex];
        const endPoint = polyline[endIndex];
        let maxDistSquared = -Infinity;
        let maxDistIndex = -1;
        for (let i = startIndex + 1; i < endIndex; i++) {
            const currentPoint = polyline[i];
            const distSquared = mathLine.distanceToPointSquared(startPoint, endPoint, currentPoint);
            if (distSquared > maxDistSquared) {
                maxDistSquared = distSquared;
                maxDistIndex = i;
            }
        }
        if (maxDistSquared < epsilonSquared) {
            continue;
        }
        polylinePointFlags[maxDistIndex] = true;
        numDecimatedPoints++;
        partitionQueue.push([maxDistIndex, endIndex]);
        partitionQueue.push([startIndex, maxDistIndex]);
    }
    const decimatedPolyline = new Array(numDecimatedPoints);
    for (let srcIndex = 0, dstIndex = 0; srcIndex < numPoints; srcIndex++) {
        if (polylinePointFlags[srcIndex]) {
            decimatedPolyline[dstIndex++] = polyline[srcIndex];
        }
    }
    return decimatedPolyline;
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/getLineSegmentIntersectionsCoordinates.js


function getLineSegmentIntersectionsCoordinates(points, p1, q1, closed = true) {
    const result = [];
    const polylineIndexes = getLineSegmentIntersectionsIndexes(points, p1, q1, closed);
    for (let i = 0; i < polylineIndexes.length; i++) {
        const p2 = points[polylineIndexes[i][0]];
        const q2 = points[polylineIndexes[i][1]];
        const intersection = getLinesIntersection(p1, q1, p2, q2);
        result.push(intersection);
    }
    return result;
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/getClosestLineSegmentIntersection.js


function getClosestLineSegmentIntersection(points, p1, q1, closed = true) {
    let initialQ2Index;
    let p2Index;
    if (closed) {
        p2Index = points.length - 1;
        initialQ2Index = 0;
    }
    else {
        p2Index = 0;
        initialQ2Index = 1;
    }
    const intersections = [];
    for (let q2Index = initialQ2Index; q2Index < points.length; q2Index++) {
        const p2 = points[p2Index];
        const q2 = points[q2Index];
        if (areLineSegmentsIntersecting(p1, q1, p2, q2)) {
            intersections.push([p2Index, q2Index]);
        }
        p2Index = q2Index;
    }
    if (intersections.length === 0) {
        return;
    }
    const distances = [];
    intersections.forEach((intersection) => {
        const intersectionPoints = [
            points[intersection[0]],
            points[intersection[1]],
        ];
        const midpoint = [
            (intersectionPoints[0][0] + intersectionPoints[1][0]) / 2,
            (intersectionPoints[0][1] + intersectionPoints[1][1]) / 2,
        ];
        distances.push(vec2.distance(midpoint, p1));
    });
    const minDistance = Math.min(...distances);
    const indexOfMinDistance = distances.indexOf(minDistance);
    return {
        segment: intersections[indexOfMinDistance],
        distance: minDistance,
    };
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/getSubPixelSpacingAndXYDirections.js


const getSubPixelSpacingAndXYDirections_EPSILON = 1e-3;
const getSubPixelSpacingAndXYDirections = (viewport, subPixelResolution) => {
    let spacing;
    let xDir;
    let yDir;
    if (viewport instanceof StackViewport) {
        const imageData = viewport.getImageData();
        xDir = imageData.direction.slice(0, 3);
        yDir = imageData.direction.slice(3, 6);
        spacing = imageData.spacing;
    }
    else {
        const imageData = viewport.getImageData();
        const { direction, spacing: volumeSpacing } = imageData;
        const { viewPlaneNormal, viewUp } = viewport.getCamera();
        const iVector = direction.slice(0, 3);
        const jVector = direction.slice(3, 6);
        const kVector = direction.slice(6, 9);
        const viewRight = vec3.create();
        vec3.cross(viewRight, viewUp, viewPlaneNormal);
        const absViewRightDotI = Math.abs(vec3.dot(viewRight, iVector));
        const absViewRightDotJ = Math.abs(vec3.dot(viewRight, jVector));
        const absViewRightDotK = Math.abs(vec3.dot(viewRight, kVector));
        let xSpacing;
        if (Math.abs(1 - absViewRightDotI) < getSubPixelSpacingAndXYDirections_EPSILON) {
            xSpacing = volumeSpacing[0];
            xDir = iVector;
        }
        else if (Math.abs(1 - absViewRightDotJ) < getSubPixelSpacingAndXYDirections_EPSILON) {
            xSpacing = volumeSpacing[1];
            xDir = jVector;
        }
        else if (Math.abs(1 - absViewRightDotK) < getSubPixelSpacingAndXYDirections_EPSILON) {
            xSpacing = volumeSpacing[2];
            xDir = kVector;
        }
        else {
            throw new Error('No support yet for oblique plane planar contours');
        }
        const absViewUpDotI = Math.abs(vec3.dot(viewUp, iVector));
        const absViewUpDotJ = Math.abs(vec3.dot(viewUp, jVector));
        const absViewUpDotK = Math.abs(vec3.dot(viewUp, kVector));
        let ySpacing;
        if (Math.abs(1 - absViewUpDotI) < getSubPixelSpacingAndXYDirections_EPSILON) {
            ySpacing = volumeSpacing[0];
            yDir = iVector;
        }
        else if (Math.abs(1 - absViewUpDotJ) < getSubPixelSpacingAndXYDirections_EPSILON) {
            ySpacing = volumeSpacing[1];
            yDir = jVector;
        }
        else if (Math.abs(1 - absViewUpDotK) < getSubPixelSpacingAndXYDirections_EPSILON) {
            ySpacing = volumeSpacing[2];
            yDir = kVector;
        }
        else {
            throw new Error('No support yet for oblique plane planar contours');
        }
        spacing = [xSpacing, ySpacing];
    }
    const subPixelSpacing = [
        spacing[0] / subPixelResolution,
        spacing[1] / subPixelResolution,
    ];
    return { spacing: subPixelSpacing, xDir, yDir };
};
/* harmony default export */ const polyline_getSubPixelSpacingAndXYDirections = ((/* unused pure expression or super */ null && (getSubPixelSpacingAndXYDirections)));

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/pointsAreWithinCloseContourProximity.js

const pointsAreWithinCloseContourProximity = (p1, p2, closeContourProximity) => {
    return vec2.dist(p1, p2) < closeContourProximity;
};
/* harmony default export */ const polyline_pointsAreWithinCloseContourProximity = ((/* unused pure expression or super */ null && (pointsAreWithinCloseContourProximity)));

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/addCanvasPointsToArray.js


const addCanvasPointsToArray = (element, canvasPoints, newCanvasPoint, commonData) => {
    const { xDir, yDir, spacing } = commonData;
    const enabledElement = getEnabledElement(element);
    const { viewport } = enabledElement;
    if (!canvasPoints.length) {
        canvasPoints.push(newCanvasPoint);
        console.log('>>>>> !canvasPoints. :: RETURN');
        return 1;
    }
    const lastWorldPos = viewport.canvasToWorld(canvasPoints[canvasPoints.length - 1]);
    const newWorldPos = viewport.canvasToWorld(newCanvasPoint);
    const worldPosDiff = vec3.create();
    vec3.subtract(worldPosDiff, newWorldPos, lastWorldPos);
    const xDist = Math.abs(vec3.dot(worldPosDiff, xDir));
    const yDist = Math.abs(vec3.dot(worldPosDiff, yDir));
    const numPointsToAdd = Math.max(Math.floor(xDist / spacing[0]), Math.floor(yDist / spacing[0]));
    if (numPointsToAdd > 1) {
        const lastCanvasPoint = canvasPoints[canvasPoints.length - 1];
        const canvasDist = vec2.dist(lastCanvasPoint, newCanvasPoint);
        const canvasDir = vec2.create();
        vec2.subtract(canvasDir, newCanvasPoint, lastCanvasPoint);
        vec2.set(canvasDir, canvasDir[0] / canvasDist, canvasDir[1] / canvasDist);
        const distPerPoint = canvasDist / numPointsToAdd;
        for (let i = 1; i <= numPointsToAdd; i++) {
            canvasPoints.push([
                lastCanvasPoint[0] + distPerPoint * canvasDir[0] * i,
                lastCanvasPoint[1] + distPerPoint * canvasDir[1] * i,
            ]);
        }
    }
    else {
        canvasPoints.push(newCanvasPoint);
    }
    return numPointsToAdd;
};
/* harmony default export */ const polyline_addCanvasPointsToArray = ((/* unused pure expression or super */ null && (addCanvasPointsToArray)));

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/pointCanProjectOnLine.js

const pointCanProjectOnLine = (p, p1, p2, proximity) => {
    const p1p = [p[0] - p1[0], p[1] - p1[1]];
    const p1p2 = [p2[0] - p1[0], p2[1] - p1[1]];
    const dot = p1p[0] * p1p2[0] + p1p[1] * p1p2[1];
    if (dot < 0) {
        return false;
    }
    const p1p2Mag = Math.sqrt(p1p2[0] * p1p2[0] + p1p2[1] * p1p2[1]);
    if (p1p2Mag === 0) {
        return false;
    }
    const projectionVectorMag = dot / p1p2Mag;
    const p1p2UnitVector = [p1p2[0] / p1p2Mag, p1p2[1] / p1p2Mag];
    const projectionVector = [
        p1p2UnitVector[0] * projectionVectorMag,
        p1p2UnitVector[1] * projectionVectorMag,
    ];
    const projectionPoint = [
        p1[0] + projectionVector[0],
        p1[1] + projectionVector[1],
    ];
    const distance = vec2.distance(p, projectionPoint);
    if (distance > proximity) {
        return false;
    }
    if (vec2.distance(p1, projectionPoint) > vec2.distance(p1, p2)) {
        return false;
    }
    return true;
};
/* harmony default export */ const polyline_pointCanProjectOnLine = ((/* unused pure expression or super */ null && (pointCanProjectOnLine)));

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/projectTo2D.js

const epsilon = 1e-6;
function projectTo2D_projectTo2D(polyline) {
    let sharedDimensionIndex;
    const testPoints = utilities.getRandomSampleFromArray(polyline, 50);
    for (let i = 0; i < 3; i++) {
        if (testPoints.every((point, index, array) => Math.abs(point[i] - array[0][i]) < epsilon)) {
            sharedDimensionIndex = i;
            break;
        }
    }
    if (sharedDimensionIndex === undefined) {
        throw new Error('Cannot find a shared dimension index for polyline, probably oblique plane');
    }
    const points2D = [];
    const firstDim = (sharedDimensionIndex + 1) % 3;
    const secondDim = (sharedDimensionIndex + 2) % 3;
    for (let i = 0; i < polyline.length; i++) {
        points2D.push([polyline[i][firstDim], polyline[i][secondDim]]);
    }
    return {
        sharedDimensionIndex,
        projectedPolyline: points2D,
    };
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/isPointInsidePolyline3D.js


function isPointInsidePolyline3D(point, polyline, options = {}) {
    const { sharedDimensionIndex, projectedPolyline } = projectTo2D(polyline);
    const { holes } = options;
    const projectedHoles = [];
    if (holes) {
        for (let i = 0; i < holes.length; i++) {
            const hole = holes[i];
            const hole2D = [];
            for (let j = 0; j < hole.length; j++) {
                hole2D.push([
                    hole[j][(sharedDimensionIndex + 1) % 3],
                    hole[j][(sharedDimensionIndex + 2) % 3],
                ]);
            }
            projectedHoles.push(hole2D);
        }
    }
    const point2D = [
        point[(sharedDimensionIndex + 1) % 3],
        point[(sharedDimensionIndex + 2) % 3],
    ];
    return containsPoint(projectedPolyline, point2D, { holes: projectedHoles });
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/math/polyline/index.js
























;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/planar/filterAnnotationsWithinSlice.js


const { EPSILON: filterAnnotationsWithinSlice_EPSILON } = constants;
const PARALLEL_THRESHOLD = 1 - filterAnnotationsWithinSlice_EPSILON;
function filterAnnotationsWithinSlice(annotations, camera, spacingInNormalDirection) {
    const { viewPlaneNormal } = camera;
    const annotationsWithParallelNormals = annotations.filter((td) => {
        let annotationViewPlaneNormal = td.metadata.viewPlaneNormal;
        if (!annotationViewPlaneNormal) {
            const { referencedImageId } = td.metadata;
            const { imageOrientationPatient } = metaData.get('imagePlaneModule', referencedImageId);
            const rowCosineVec = esm/* vec3.fromValues */.eR.fromValues(imageOrientationPatient[0], imageOrientationPatient[1], imageOrientationPatient[2]);
            const colCosineVec = esm/* vec3.fromValues */.eR.fromValues(imageOrientationPatient[3], imageOrientationPatient[4], imageOrientationPatient[5]);
            annotationViewPlaneNormal = esm/* vec3.create */.eR.create();
            esm/* vec3.cross */.eR.cross(annotationViewPlaneNormal, rowCosineVec, colCosineVec);
            td.metadata.viewPlaneNormal = annotationViewPlaneNormal;
        }
        const isParallel = Math.abs(esm/* vec3.dot */.eR.dot(viewPlaneNormal, annotationViewPlaneNormal)) >
            PARALLEL_THRESHOLD;
        return annotationViewPlaneNormal && isParallel;
    });
    if (!annotationsWithParallelNormals.length) {
        return [];
    }
    const halfSpacingInNormalDirection = spacingInNormalDirection / 2;
    const { focalPoint } = camera;
    const annotationsWithinSlice = [];
    for (const annotation of annotationsWithParallelNormals) {
        const data = annotation.data;
        const point = data.handles.points[0];
        if (!annotation.isVisible) {
            continue;
        }
        const dir = esm/* vec3.create */.eR.create();
        esm/* vec3.sub */.eR.sub(dir, focalPoint, point);
        const dot = esm/* vec3.dot */.eR.dot(dir, viewPlaneNormal);
        if (Math.abs(dot) < halfSpacingInNormalDirection) {
            annotationsWithinSlice.push(annotation);
        }
    }
    return annotationsWithinSlice;
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/planar/getWorldWidthAndHeightFromCorners.js

function getWorldWidthAndHeightFromCorners(viewPlaneNormal, viewUp, topLeftWorld, bottomRightWorld) {
    const viewRight = esm/* vec3.create */.eR.create();
    esm/* vec3.cross */.eR.cross(viewRight, viewUp, viewPlaneNormal);
    const pos1 = esm/* vec3.fromValues */.eR.fromValues(...topLeftWorld);
    const pos2 = esm/* vec3.fromValues */.eR.fromValues(...bottomRightWorld);
    const diagonal = esm/* vec3.create */.eR.create();
    esm/* vec3.subtract */.eR.subtract(diagonal, pos1, pos2);
    const diagonalLength = esm/* vec3.length */.eR.length(diagonal);
    if (diagonalLength < 0.0001) {
        return { worldWidth: 0, worldHeight: 0 };
    }
    const cosTheta = esm/* vec3.dot */.eR.dot(diagonal, viewRight) / (diagonalLength * esm/* vec3.length */.eR.length(viewRight));
    const sinTheta = Math.sqrt(1 - cosTheta * cosTheta);
    const worldWidth = sinTheta * diagonalLength;
    const worldHeight = cosTheta * diagonalLength;
    return { worldWidth, worldHeight };
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/planar/filterAnnotationsForDisplay.js


function filterAnnotationsForDisplay(viewport, annotations, filterOptions = {}) {
    if (viewport instanceof VolumeViewport/* default */.A) {
        const camera = viewport.getCamera();
        const { spacingInNormalDirection } = utilities.getTargetVolumeAndSpacingInNormalDir(viewport, camera);
        return filterAnnotationsWithinSlice(annotations, camera, spacingInNormalDirection);
    }
    if (viewport instanceof RenderingEngine_StackViewport/* default */.A) {
        const imageId = viewport.getCurrentImageId();
        const colonIndex = imageId.indexOf(':');
        filterOptions.imageURI = imageId.substring(colonIndex + 1);
    }
    return annotations.filter((annotation) => {
        if (!annotation.isVisible) {
            return false;
        }
        if (annotation.data.isCanvasAnnotation) {
            return true;
        }
        return viewport.isReferenceViewable(annotation.metadata, filterOptions);
    });
}

// EXTERNAL MODULE: ../../../node_modules/@kitware/vtk.js/Common/Core/Math.js
var Core_Math = __webpack_require__(84607);
;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/planar/getPointInLineOfSightWithCriteria.js


function getPointInLineOfSightWithCriteria(viewport, worldPos, targetVolumeId, criteriaFunction, stepSize = 0.25) {
    const camera = viewport.getCamera();
    const { position: cameraPosition } = camera;
    const { spacingInNormalDirection } = utilities.getTargetVolumeAndSpacingInNormalDir(viewport, camera, targetVolumeId);
    const step = spacingInNormalDirection * stepSize;
    const bounds = viewport.getBounds();
    const xMin = bounds[0];
    const xMax = bounds[1];
    const vector = [0, 0, 0];
    let point = [0, 0, 0];
    Core_Math/* default.subtract */.Ay.subtract(worldPos, cameraPosition, vector);
    let pickedPoint;
    for (let pointT = xMin; pointT <= xMax; pointT = pointT + step) {
        point = [pointT, 0, 0];
        const t = (pointT - cameraPosition[0]) / vector[0];
        point[1] = t * vector[1] + cameraPosition[1];
        point[2] = t * vector[2] + cameraPosition[2];
        if (_inBounds(point, bounds)) {
            const intensity = viewport.getIntensityFromWorld(point);
            const pointToPick = criteriaFunction(intensity, point);
            if (pointToPick) {
                pickedPoint = pointToPick;
            }
        }
    }
    return pickedPoint;
}
const _inBounds = function (point, bounds) {
    const [xMin, xMax, yMin, yMax, zMin, zMax] = bounds;
    return (point[0] > xMin &&
        point[0] < xMax &&
        point[1] > yMin &&
        point[1] < yMax &&
        point[2] > zMin &&
        point[2] < zMax);
};

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/planar/isPlaneIntersectingAABB.js

const isPlaneIntersectingAABB = (origin, normal, minX, minY, minZ, maxX, maxY, maxZ) => {
    const vertices = [
        esm/* vec3.fromValues */.eR.fromValues(minX, minY, minZ),
        esm/* vec3.fromValues */.eR.fromValues(maxX, minY, minZ),
        esm/* vec3.fromValues */.eR.fromValues(minX, maxY, minZ),
        esm/* vec3.fromValues */.eR.fromValues(maxX, maxY, minZ),
        esm/* vec3.fromValues */.eR.fromValues(minX, minY, maxZ),
        esm/* vec3.fromValues */.eR.fromValues(maxX, minY, maxZ),
        esm/* vec3.fromValues */.eR.fromValues(minX, maxY, maxZ),
        esm/* vec3.fromValues */.eR.fromValues(maxX, maxY, maxZ),
    ];
    const normalVec = esm/* vec3.fromValues */.eR.fromValues(normal[0], normal[1], normal[2]);
    const originVec = esm/* vec3.fromValues */.eR.fromValues(origin[0], origin[1], origin[2]);
    const planeDistance = -esm/* vec3.dot */.eR.dot(normalVec, originVec);
    let initialSign = null;
    for (const vertex of vertices) {
        const distance = esm/* vec3.dot */.eR.dot(normalVec, vertex) + planeDistance;
        if (initialSign === null) {
            initialSign = Math.sign(distance);
        }
        else if (Math.sign(distance) !== initialSign) {
            return true;
        }
    }
    return false;
};

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/planar/filterAnnotationsWithinPlane.js


const { EPSILON: filterAnnotationsWithinPlane_EPSILON } = constants;
const filterAnnotationsWithinPlane_PARALLEL_THRESHOLD = 1 - filterAnnotationsWithinPlane_EPSILON;
function filterAnnotationsWithinSamePlane(annotations, camera) {
    const { viewPlaneNormal } = camera;
    const annotationsWithParallelNormals = annotations.filter((td) => {
        let annotationViewPlaneNormal = td.metadata.viewPlaneNormal;
        if (!annotationViewPlaneNormal) {
            const { referencedImageId } = td.metadata;
            const { imageOrientationPatient } = metaData.get('imagePlaneModule', referencedImageId);
            const rowCosineVec = esm/* vec3.fromValues */.eR.fromValues(imageOrientationPatient[0], imageOrientationPatient[1], imageOrientationPatient[2]);
            const colCosineVec = esm/* vec3.fromValues */.eR.fromValues(imageOrientationPatient[3], imageOrientationPatient[4], imageOrientationPatient[5]);
            annotationViewPlaneNormal = esm/* vec3.create */.eR.create();
            esm/* vec3.cross */.eR.cross(annotationViewPlaneNormal, rowCosineVec, colCosineVec);
            td.metadata.viewPlaneNormal = annotationViewPlaneNormal;
        }
        const isParallel = Math.abs(esm/* vec3.dot */.eR.dot(viewPlaneNormal, annotationViewPlaneNormal)) >
            filterAnnotationsWithinPlane_PARALLEL_THRESHOLD;
        return annotationViewPlaneNormal && isParallel;
    });
    if (!annotationsWithParallelNormals.length) {
        return [];
    }
    return annotationsWithParallelNormals;
}

;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/planar/index.js






/* harmony default export */ const planar = ({
    filterAnnotationsWithinSlice: filterAnnotationsWithinSlice,
    getWorldWidthAndHeightFromCorners: getWorldWidthAndHeightFromCorners,
    filterAnnotationsForDisplay: filterAnnotationsForDisplay,
    getPointInLineOfSightWithCriteria: getPointInLineOfSightWithCriteria,
    isPlaneIntersectingAABB: isPlaneIntersectingAABB,
    filterAnnotationsWithinSamePlane: filterAnnotationsWithinSamePlane,
});


;// CONCATENATED MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/workers/polySegConverters.js












const polySegConverters = {
    polySeg: null,
    polySegInitializing: false,
    polySegInitializingPromise: null,
    async initializePolySeg(progressCallback) {
        if (this.polySegInitializing) {
            await this.polySegInitializingPromise;
            return;
        }
        if (this.polySeg?.instance) {
            return;
        }
        this.polySegInitializing = true;
        this.polySegInitializingPromise = new Promise((resolve) => {
            this.polySeg = new ICRPolySeg();
            this.polySeg
                .initialize({
                updateProgress: progressCallback,
            })
                .then(() => {
                this.polySegInitializing = false;
                resolve();
            });
        });
        await this.polySegInitializingPromise;
    },
    async convertContourToSurface(args, ...callbacks) {
        const { polylines, numPointsArray } = args;
        const [progressCallback] = callbacks;
        await this.initializePolySeg(progressCallback);
        const results = await this.polySeg.instance.convertContourRoiToSurface(polylines, numPointsArray);
        return results;
    },
    async convertLabelmapToSurface(args, ...callbacks) {
        const [progressCallback] = callbacks;
        await this.initializePolySeg(progressCallback);
        const results = this.polySeg.instance.convertLabelmapToSurface(args.scalarData, args.dimensions, args.spacing, args.direction, args.origin, [args.segmentIndex]);
        return results;
    },
    async convertContourToVolumeLabelmap(args, ...callbacks) {
        const [progressCallback] = callbacks;
        const polySeg = await new ICRPolySeg();
        await polySeg.initialize({
            updateProgress: progressCallback,
        });
        const { segmentIndices, scalarData, annotationUIDsInSegmentMap, dimensions, origin, direction, spacing, } = args;
        const segmentationVoxelManager = utilities.VoxelManager.createScalarVolumeVoxelManager({
            dimensions,
            scalarData,
        });
        const imageData = ImageData/* default.newInstance */.Ay.newInstance();
        imageData.setDimensions(dimensions);
        imageData.setOrigin(origin);
        imageData.setDirection(direction);
        imageData.setSpacing(spacing);
        const scalarArray = DataArray/* default.newInstance */.Ay.newInstance({
            name: 'Pixels',
            numberOfComponents: 1,
            values: scalarData,
        });
        imageData.getPointData().setScalars(scalarArray);
        imageData.modified();
        for (const index of segmentIndices) {
            const annotations = annotationUIDsInSegmentMap.get(index);
            for (const annotation of annotations) {
                if (!annotation.polyline) {
                    continue;
                }
                const { polyline, holesPolyline } = annotation;
                const bounds = getBoundingBoxAroundShapeWorld(polyline);
                const [iMin, jMin, kMin] = utilities.transformWorldToIndex(imageData, [
                    bounds[0][0],
                    bounds[1][0],
                    bounds[2][0],
                ]);
                const [iMax, jMax, kMax] = utilities.transformWorldToIndex(imageData, [
                    bounds[0][1],
                    bounds[1][1],
                    bounds[2][1],
                ]);
                const { projectedPolyline, sharedDimensionIndex } = projectTo2D_projectTo2D(polyline);
                const holes = holesPolyline?.map((hole) => {
                    const { projectedPolyline: projectedHole } = projectTo2D_projectTo2D(hole);
                    return projectedHole;
                });
                const firstDim = (sharedDimensionIndex + 1) % 3;
                const secondDim = (sharedDimensionIndex + 2) % 3;
                const voxels = utilities.VoxelManager.createScalarVolumeVoxelManager({
                    dimensions,
                    scalarData,
                });
                voxels.forEach(({ pointIJK }) => {
                    segmentationVoxelManager.setAtIJKPoint(pointIJK, index);
                }, {
                    imageData,
                    isInObject: (pointLPS) => {
                        const point2D = [pointLPS[firstDim], pointLPS[secondDim]];
                        const isInside = containsPoint_containsPoint(projectedPolyline, point2D, {
                            holes,
                        });
                        return isInside;
                    },
                    boundsIJK: [
                        [iMin, iMax],
                        [jMin, jMax],
                        [kMin, kMax],
                    ],
                });
            }
        }
        return segmentationVoxelManager.scalarData;
    },
    async convertContourToStackLabelmap(args, ...callbacks) {
        const [progressCallback] = callbacks;
        const polySeg = await new ICRPolySeg();
        await polySeg.initialize({
            updateProgress: progressCallback,
        });
        const { segmentationsInfo, annotationUIDsInSegmentMap, segmentIndices } = args;
        const segmentationVoxelManagers = new Map();
        segmentationsInfo.forEach((segmentationInfo, referencedImageId) => {
            const { dimensions, scalarData, direction, spacing, origin } = segmentationInfo;
            const manager = utilities.VoxelManager.createScalarVolumeVoxelManager({
                dimensions,
                scalarData,
            });
            const imageData = ImageData/* default.newInstance */.Ay.newInstance();
            imageData.setDimensions(dimensions);
            imageData.setOrigin(origin);
            imageData.setDirection(direction);
            imageData.setSpacing(spacing);
            const scalarArray = DataArray/* default.newInstance */.Ay.newInstance({
                name: 'Pixels',
                numberOfComponents: 1,
                values: scalarData,
            });
            imageData.getPointData().setScalars(scalarArray);
            imageData.modified();
            segmentationVoxelManagers.set(referencedImageId, { manager, imageData });
        });
        for (const index of segmentIndices) {
            const annotations = annotationUIDsInSegmentMap.get(index);
            for (const annotation of annotations) {
                if (!annotation.polyline) {
                    continue;
                }
                const { polyline, holesPolyline, referencedImageId } = annotation;
                const bounds = getBoundingBoxAroundShapeWorld(polyline);
                const { manager: segmentationVoxelManager, imageData } = segmentationVoxelManagers.get(referencedImageId);
                const [iMin, jMin, kMin] = utilities.transformWorldToIndex(imageData, [
                    bounds[0][0],
                    bounds[1][0],
                    bounds[2][0],
                ]);
                const [iMax, jMax, kMax] = utilities.transformWorldToIndex(imageData, [
                    bounds[0][1],
                    bounds[1][1],
                    bounds[2][1],
                ]);
                const { projectedPolyline, sharedDimensionIndex } = projectTo2D_projectTo2D(polyline);
                const holes = holesPolyline?.map((hole) => {
                    const { projectedPolyline: projectedHole } = projectTo2D_projectTo2D(hole);
                    return projectedHole;
                });
                const firstDim = (sharedDimensionIndex + 1) % 3;
                const secondDim = (sharedDimensionIndex + 2) % 3;
                const voxels = utilities.VoxelManager.createImageVoxelManager({
                    width: imageData.getDimensions()[0],
                    height: imageData.getDimensions()[1],
                    scalarData: imageData.getPointData().getScalars().getData(),
                });
                voxels.forEach(({ pointIJK }) => {
                    segmentationVoxelManager.setAtIJKPoint(pointIJK, index);
                }, {
                    imageData,
                    isInObject: (pointLPS) => {
                        const point2D = [pointLPS[firstDim], pointLPS[secondDim]];
                        const isInside = containsPoint_containsPoint(projectedPolyline, point2D, {
                            holes,
                        });
                        return isInside;
                    },
                    boundsIJK: [
                        [iMin, iMax],
                        [jMin, jMax],
                        [kMin, kMax],
                    ],
                });
            }
        }
        segmentationsInfo.forEach((segmentationInfo, referencedImageId) => {
            const { manager: segmentationVoxelManager } = segmentationVoxelManagers.get(referencedImageId);
            segmentationInfo.scalarData = segmentationVoxelManager.scalarData;
        });
        return segmentationsInfo;
    },
    async convertSurfaceToVolumeLabelmap(args, ...callbacks) {
        const [progressCallback] = callbacks;
        await this.initializePolySeg(progressCallback);
        const results = this.polySeg.instance.convertSurfaceToLabelmap(args.points, args.polys, args.dimensions, args.spacing, args.direction, args.origin);
        return results;
    },
    async convertSurfacesToVolumeLabelmap(args, ...callbacks) {
        const [progressCallback] = callbacks;
        await this.initializePolySeg(progressCallback);
        const { segmentsInfo } = args;
        const promises = Array.from(segmentsInfo.keys()).map((segmentIndex) => {
            const { points, polys } = segmentsInfo.get(segmentIndex);
            const result = this.polySeg.instance.convertSurfaceToLabelmap(points, polys, args.dimensions, args.spacing, args.direction, args.origin);
            return {
                ...result,
                segmentIndex,
            };
        });
        const results = await Promise.all(promises);
        const targetImageData = ImageData/* default.newInstance */.Ay.newInstance();
        targetImageData.setDimensions(args.dimensions);
        targetImageData.setOrigin(args.origin);
        targetImageData.setSpacing(args.spacing);
        targetImageData.setDirection(args.direction);
        const totalSize = args.dimensions[0] * args.dimensions[1] * args.dimensions[2];
        const scalarArray = DataArray/* default.newInstance */.Ay.newInstance({
            name: 'Pixels',
            numberOfComponents: 1,
            values: new Uint8Array(totalSize),
        });
        targetImageData.getPointData().setScalars(scalarArray);
        targetImageData.modified();
        const { dimensions } = args;
        const scalarData = targetImageData.getPointData().getScalars().getData();
        const segmentationVoxelManager = utilities.VoxelManager.createScalarVolumeVoxelManager({
            dimensions,
            scalarData,
        });
        const outputVolumesInfo = results.map((result) => {
            const { data, dimensions, direction, origin, spacing } = result;
            const volume = ImageData/* default.newInstance */.Ay.newInstance();
            volume.setDimensions(dimensions);
            volume.setOrigin(origin);
            volume.setSpacing(spacing);
            volume.setDirection(direction);
            const scalarArray = DataArray/* default.newInstance */.Ay.newInstance({
                name: 'Pixels',
                numberOfComponents: 1,
                values: data,
            });
            volume.getPointData().setScalars(scalarArray);
            volume.modified();
            const voxelManager = utilities.VoxelManager.createScalarVolumeVoxelManager({
                dimensions,
                scalarData: data,
            });
            const extent = volume.getExtent();
            return {
                volume,
                voxelManager,
                extent,
                scalarData: data,
                segmentIndex: result.segmentIndex,
            };
        });
        const voxels = utilities.VoxelManager.createScalarVolumeVoxelManager({
            dimensions: targetImageData.getDimensions(),
            scalarData: targetImageData.getPointData().getScalars().getData(),
        });
        voxels.forEach(({ pointIJK, pointLPS }) => {
            try {
                for (const volumeInfo of outputVolumesInfo) {
                    const { volume, extent, voxelManager, segmentIndex } = volumeInfo;
                    const index = volume.worldToIndex(pointLPS);
                    if (index[0] < extent[0] ||
                        index[0] > extent[1] ||
                        index[1] < extent[2] ||
                        index[1] > extent[3] ||
                        index[2] < extent[4] ||
                        index[2] > extent[5]) {
                        continue;
                    }
                    const roundedIndex = index.map(Math.round);
                    const value = voxelManager.getAtIJK(...roundedIndex);
                    if (value > 0) {
                        segmentationVoxelManager.setAtIJKPoint(pointIJK, segmentIndex);
                        break;
                    }
                }
            }
            catch (error) {
            }
        }, { imageData: targetImageData });
        return segmentationVoxelManager.scalarData;
    },
    getSurfacesAABBs({ surfacesInfo }) {
        const aabbs = new Map();
        for (const { points, id } of surfacesInfo) {
            const aabb = getAABB(points, { numDimensions: 3 });
            aabbs.set(id, aabb);
        }
        return aabbs;
    },
    cutSurfacesIntoPlanes({ planesInfo, surfacesInfo, surfacesAABB = new Map() }, progressCallback, updateCacheCallback) {
        const numberOfPlanes = planesInfo.length;
        const cutter = Cutter/* default.newInstance */.Ay.newInstance();
        const plane1 = Plane/* default.newInstance */.Ay.newInstance();
        cutter.setCutFunction(plane1);
        const surfacePolyData = PolyData/* default.newInstance */.Ay.newInstance();
        try {
            for (const [index, planeInfo] of planesInfo.entries()) {
                const { sliceIndex, planes } = planeInfo;
                const polyDataResults = new Map();
                for (const polyDataInfo of surfacesInfo) {
                    const { points, polys, id, segmentIndex } = polyDataInfo;
                    const aabb3 = surfacesAABB.get(id) || getAABB(points, { numDimensions: 3 });
                    if (!surfacesAABB.has(id)) {
                        surfacesAABB.set(id, aabb3);
                    }
                    const { minX, minY, minZ, maxX, maxY, maxZ } = aabb3;
                    const { origin, normal } = planes[0];
                    if (!isPlaneIntersectingAABB(origin, normal, minX, minY, minZ, maxX, maxY, maxZ)) {
                        continue;
                    }
                    surfacePolyData.getPoints().setData(points, 3);
                    surfacePolyData.getPolys().setData(polys, 3);
                    surfacePolyData.modified();
                    cutter.setInputData(surfacePolyData);
                    plane1.setOrigin(origin);
                    plane1.setNormal(normal);
                    try {
                        cutter.update();
                    }
                    catch (e) {
                        console.warn('Error during clipping', e);
                        continue;
                    }
                    const polyData = cutter.getOutputData();
                    const cutterOutput = polyData;
                    cutterOutput.buildLinks();
                    const loopExtraction = ContourLoopExtraction_index.newInstance();
                    loopExtraction.setInputData(cutterOutput);
                    const loopOutput = loopExtraction.getOutputData();
                    if (polyData) {
                        polyDataResults.set(segmentIndex, {
                            points: loopOutput.getPoints().getData(),
                            lines: loopOutput.getLines().getData(),
                            numberOfCells: loopOutput.getLines().getNumberOfCells(),
                            segmentIndex,
                        });
                    }
                }
                progressCallback({ progress: (index + 1) / numberOfPlanes });
                updateCacheCallback({ sliceIndex, polyDataResults });
            }
        }
        catch (e) {
            console.warn('Error during processing', e);
        }
        finally {
            surfacesInfo = null;
            plane1.delete();
        }
    },
};
(0,comlink/* expose */.p)(polySegConverters);


/***/ }),

/***/ 35056:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (/* binding */ vtkCellArray$1)
/* harmony export */ });
/* unused harmony exports STATIC, extend, newInstance */
/* harmony import */ var _macros2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28906);
/* harmony import */ var _DataArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42008);
/* harmony import */ var _DataArray_Constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28914);




// ----------------------------------------------------------------------------
// Global methods
// ----------------------------------------------------------------------------

function extractCellSizes(cellArray) {
  let currentIdx = 0;
  return cellArray.filter((value, index) => {
    if (index === currentIdx) {
      currentIdx += value + 1;
      return true;
    }
    return false;
  });
}
function getNumberOfCells(cellArray) {
  let cellId = 0;
  for (let cellArrayIndex = 0; cellArrayIndex < cellArray.length;) {
    cellArrayIndex += cellArray[cellArrayIndex] + 1;
    cellId++;
  }
  return cellId;
}

// ----------------------------------------------------------------------------
// Static API
// ----------------------------------------------------------------------------

const STATIC = {
  extractCellSizes,
  getNumberOfCells
};

// ----------------------------------------------------------------------------
// vtkCellArray methods
// ----------------------------------------------------------------------------

function vtkCellArray(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkCellArray');
  const superClass = {
    ...publicAPI
  };
  publicAPI.getNumberOfCells = recompute => {
    if (model.numberOfCells !== undefined && !recompute) {
      return model.numberOfCells;
    }
    if (model.cellSizes) {
      model.numberOfCells = model.cellSizes.length;
    } else {
      model.numberOfCells = getNumberOfCells(publicAPI.getData());
    }
    return model.numberOfCells;
  };
  publicAPI.getCellSizes = recompute => {
    if (model.cellSizes !== undefined && !recompute) {
      return model.cellSizes;
    }
    model.cellSizes = extractCellSizes(publicAPI.getData());
    return model.cellSizes;
  };

  /**
   * When `resize()` is being used, you then MUST use `insertNextCell()`.
   */
  publicAPI.resize = requestedNumTuples => {
    const oldNumTuples = publicAPI.getNumberOfTuples();
    superClass.resize(requestedNumTuples);
    const newNumTuples = publicAPI.getNumberOfTuples();
    if (newNumTuples < oldNumTuples) {
      if (newNumTuples === 0) {
        model.numberOfCells = 0;
        model.cellSizes = [];
      } else {
        // We do not know how many cells are left.
        // Set to undefined to ensure insertNextCell works correctly.
        model.numberOfCells = undefined;
        model.cellSizes = undefined;
      }
    }
  };
  publicAPI.setData = typedArray => {
    superClass.setData(typedArray, 1);
    model.numberOfCells = undefined;
    model.cellSizes = undefined;
  };
  publicAPI.getCell = loc => {
    let cellLoc = loc;
    const numberOfPoints = model.values[cellLoc++];
    return model.values.subarray(cellLoc, cellLoc + numberOfPoints);
  };
  publicAPI.insertNextCell = cellPointIds => {
    const cellId = publicAPI.getNumberOfCells();
    publicAPI.insertNextTuples([cellPointIds.length, ...cellPointIds]);
    // By computing the number of cells earlier, we made sure that numberOfCells is defined
    ++model.numberOfCells;
    if (model.cellSizes != null) {
      model.cellSizes.push(cellPointIds.length);
    }
    return cellId;
  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

function defaultValues(initialValues) {
  return {
    empty: true,
    numberOfComponents: 1,
    dataType: _DataArray_Constants_js__WEBPACK_IMPORTED_MODULE_2__/* .VtkDataTypes */ .JA.UNSIGNED_INT,
    ...initialValues
  };
}

// ----------------------------------------------------------------------------

function extend(publicAPI, model) {
  let initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  _DataArray_js__WEBPACK_IMPORTED_MODULE_1__/* ["default"].extend */ .Ay.extend(publicAPI, model, defaultValues(initialValues));
  vtkCellArray(publicAPI, model);
}

// ----------------------------------------------------------------------------

const newInstance = _macros2_js__WEBPACK_IMPORTED_MODULE_0__.m.newInstance(extend, 'vtkCellArray');

// ----------------------------------------------------------------------------

var vtkCellArray$1 = {
  newInstance,
  extend,
  ...STATIC
};




/***/ }),

/***/ 28914:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (/* binding */ Constants),
/* harmony export */   JA: () => (/* binding */ VtkDataTypes)
/* harmony export */ });
/* unused harmony exports DataTypeByteSize, DefaultDataType */
const DataTypeByteSize = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};
const VtkDataTypes = {
  VOID: '',
  // not sure to know what that should be
  CHAR: 'Int8Array',
  SIGNED_CHAR: 'Int8Array',
  UNSIGNED_CHAR: 'Uint8Array',
  UNSIGNED_CHAR_CLAMPED: 'Uint8ClampedArray',
  // should be used for VTK.js internal purpose only
  SHORT: 'Int16Array',
  UNSIGNED_SHORT: 'Uint16Array',
  INT: 'Int32Array',
  UNSIGNED_INT: 'Uint32Array',
  FLOAT: 'Float32Array',
  DOUBLE: 'Float64Array'
};
const DefaultDataType = VtkDataTypes.FLOAT;
var Constants = {
  DefaultDataType,
  DataTypeByteSize,
  VtkDataTypes
};




/***/ }),

/***/ 62612:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (/* binding */ Constants)
/* harmony export */ });
/* unused harmony exports AttributeCopyOperations, AttributeLimitTypes, AttributeTypes, CellGhostTypes, DesiredOutputPrecision, PointGhostTypes, ghostArrayName */
const AttributeTypes = {
  SCALARS: 0,
  VECTORS: 1,
  NORMALS: 2,
  TCOORDS: 3,
  TENSORS: 4,
  GLOBALIDS: 5,
  PEDIGREEIDS: 6,
  EDGEFLAG: 7,
  NUM_ATTRIBUTES: 8
};
const AttributeLimitTypes = {
  MAX: 0,
  EXACT: 1,
  NOLIMIT: 2
};
const CellGhostTypes = {
  DUPLICATECELL: 1,
  // the cell is present on multiple processors
  HIGHCONNECTIVITYCELL: 2,
  // the cell has more neighbors than in a regular mesh
  LOWCONNECTIVITYCELL: 4,
  // the cell has less neighbors than in a regular mesh
  REFINEDCELL: 8,
  // other cells are present that refines it.
  EXTERIORCELL: 16,
  // the cell is on the exterior of the data set
  HIDDENCELL: 32 // the cell is needed to maintain connectivity, but the data values should be ignored.
};

const PointGhostTypes = {
  DUPLICATEPOINT: 1,
  // the cell is present on multiple processors
  HIDDENPOINT: 2 // the point is needed to maintain connectivity, but the data values should be ignored.
};

const AttributeCopyOperations = {
  COPYTUPLE: 0,
  INTERPOLATE: 1,
  PASSDATA: 2,
  ALLCOPY: 3 // all of the above
};

const ghostArrayName = 'vtkGhostType';
const DesiredOutputPrecision = {
  DEFAULT: 0,
  // use the point type that does not truncate any data
  SINGLE: 1,
  // use Float32Array
  DOUBLE: 2 // use Float64Array
};

var Constants = {
  AttributeCopyOperations,
  AttributeLimitTypes,
  AttributeTypes,
  CellGhostTypes,
  DesiredOutputPrecision,
  PointGhostTypes,
  ghostArrayName
};




/***/ }),

/***/ 58498:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (/* binding */ vtkImageData$1)
/* harmony export */ });
/* unused harmony exports extend, newInstance */
/* harmony import */ var _macros2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28906);
/* harmony import */ var _Core_Math_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16632);
/* harmony import */ var _BoundingBox_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(21734);
/* harmony import */ var _DataSet_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(69147);
/* harmony import */ var _StructuredData_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24964);
/* harmony import */ var _StructuredData_Constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(85278);
/* harmony import */ var gl_matrix__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3823);








const {
  vtkErrorMacro
} = _macros2_js__WEBPACK_IMPORTED_MODULE_0__.m;

// ----------------------------------------------------------------------------
// vtkImageData methods
// ----------------------------------------------------------------------------

function vtkImageData(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkImageData');
  publicAPI.setExtent = function () {
    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method');
      return false;
    }
    for (var _len = arguments.length, inExtent = new Array(_len), _key = 0; _key < _len; _key++) {
      inExtent[_key] = arguments[_key];
    }
    const extentArray = inExtent.length === 1 ? inExtent[0] : inExtent;
    if (extentArray.length !== 6) {
      return false;
    }
    const changeDetected = model.extent.some((item, index) => item !== extentArray[index]);
    if (changeDetected) {
      model.extent = extentArray.slice();
      model.dataDescription = _StructuredData_js__WEBPACK_IMPORTED_MODULE_4__/* ["default"].getDataDescriptionFromExtent */ .A.getDataDescriptionFromExtent(model.extent);
      publicAPI.modified();
    }
    return changeDetected;
  };
  publicAPI.setDimensions = function () {
    let i;
    let j;
    let k;
    if (model.deleted) {
      vtkErrorMacro('instance deleted - cannot call any method');
      return;
    }
    if (arguments.length === 1) {
      const array = arguments.length <= 0 ? undefined : arguments[0];
      i = array[0];
      j = array[1];
      k = array[2];
    } else if (arguments.length === 3) {
      i = arguments.length <= 0 ? undefined : arguments[0];
      j = arguments.length <= 1 ? undefined : arguments[1];
      k = arguments.length <= 2 ? undefined : arguments[2];
    } else {
      vtkErrorMacro('Bad dimension specification');
      return;
    }
    publicAPI.setExtent(0, i - 1, 0, j - 1, 0, k - 1);
  };
  publicAPI.getDimensions = () => [model.extent[1] - model.extent[0] + 1, model.extent[3] - model.extent[2] + 1, model.extent[5] - model.extent[4] + 1];
  publicAPI.getNumberOfCells = () => {
    const dims = publicAPI.getDimensions();
    let nCells = 1;
    for (let i = 0; i < 3; i++) {
      if (dims[i] === 0) {
        return 0;
      }
      if (dims[i] > 1) {
        nCells *= dims[i] - 1;
      }
    }
    return nCells;
  };
  publicAPI.getNumberOfPoints = () => {
    const dims = publicAPI.getDimensions();
    return dims[0] * dims[1] * dims[2];
  };
  publicAPI.getPoint = index => {
    const dims = publicAPI.getDimensions();
    if (dims[0] === 0 || dims[1] === 0 || dims[2] === 0) {
      vtkErrorMacro('Requesting a point from an empty image.');
      return null;
    }
    const ijk = new Float64Array(3);
    switch (model.dataDescription) {
      case _StructuredData_Constants_js__WEBPACK_IMPORTED_MODULE_5__/* .StructuredType */ .e.EMPTY:
        return null;
      case _StructuredData_Constants_js__WEBPACK_IMPORTED_MODULE_5__/* .StructuredType */ .e.SINGLE_POINT:
        break;
      case _StructuredData_Constants_js__WEBPACK_IMPORTED_MODULE_5__/* .StructuredType */ .e.X_LINE:
        ijk[0] = index;
        break;
      case _StructuredData_Constants_js__WEBPACK_IMPORTED_MODULE_5__/* .StructuredType */ .e.Y_LINE:
        ijk[1] = index;
        break;
      case _StructuredData_Constants_js__WEBPACK_IMPORTED_MODULE_5__/* .StructuredType */ .e.Z_LINE:
        ijk[2] = index;
        break;
      case _StructuredData_Constants_js__WEBPACK_IMPORTED_MODULE_5__/* .StructuredType */ .e.XY_PLANE:
        ijk[0] = index % dims[0];
        ijk[1] = index / dims[0];
        break;
      case _StructuredData_Constants_js__WEBPACK_IMPORTED_MODULE_5__/* .StructuredType */ .e.YZ_PLANE:
        ijk[1] = index % dims[1];
        ijk[2] = index / dims[1];
        break;
      case _StructuredData_Constants_js__WEBPACK_IMPORTED_MODULE_5__/* .StructuredType */ .e.XZ_PLANE:
        ijk[0] = index % dims[0];
        ijk[2] = index / dims[0];
        break;
      case _StructuredData_Constants_js__WEBPACK_IMPORTED_MODULE_5__/* .StructuredType */ .e.XYZ_GRID:
        ijk[0] = index % dims[0];
        ijk[1] = index / dims[0] % dims[1];
        ijk[2] = index / (dims[0] * dims[1]);
        break;
      default:
        vtkErrorMacro('Invalid dataDescription');
        break;
    }
    const coords = [0, 0, 0];
    publicAPI.indexToWorld(ijk, coords);
    return coords;
  };

  // vtkCell *GetCell(vtkIdType cellId) VTK_OVERRIDE;
  // void GetCell(vtkIdType cellId, vtkGenericCell *cell) VTK_OVERRIDE;
  // void GetCellBounds(vtkIdType cellId, double bounds[6]) VTK_OVERRIDE;
  // virtual vtkIdType FindPoint(double x, double y, double z)
  // {
  //   return this->vtkDataSet::FindPoint(x, y, z);
  // }
  // vtkIdType FindPoint(double x[3]) VTK_OVERRIDE;
  // vtkIdType FindCell(
  //   double x[3], vtkCell *cell, vtkIdType cellId, double tol2,
  //   int& subId, double pcoords[3], double *weights) VTK_OVERRIDE;
  // vtkIdType FindCell(
  //   double x[3], vtkCell *cell, vtkGenericCell *gencell,
  //   vtkIdType cellId, double tol2, int& subId,
  //   double pcoords[3], double *weights) VTK_OVERRIDE;
  // vtkCell *FindAndGetCell(double x[3], vtkCell *cell, vtkIdType cellId,
  //                                 double tol2, int& subId, double pcoords[3],
  //                                 double *weights) VTK_OVERRIDE;
  // int GetCellType(vtkIdType cellId) VTK_OVERRIDE;
  // void GetCellPoints(vtkIdType cellId, vtkIdList *ptIds) VTK_OVERRIDE
  //   {vtkStructuredData::GetCellPoints(cellId,ptIds,this->DataDescription,
  //                                     this->GetDimensions());}
  // void GetPointCells(vtkIdType ptId, vtkIdList *cellIds) VTK_OVERRIDE
  //   {vtkStructuredData::GetPointCells(ptId,cellIds,this->GetDimensions());}
  // void ComputeBounds() VTK_OVERRIDE;
  // int GetMaxCellSize() VTK_OVERRIDE {return 8;}; //voxel is the largest

  publicAPI.getBounds = () => publicAPI.extentToBounds(publicAPI.getSpatialExtent());
  publicAPI.extentToBounds = ex => _BoundingBox_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].transformBounds */ .Ay.transformBounds(ex, model.indexToWorld);
  publicAPI.getSpatialExtent = () => _BoundingBox_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].inflate */ .Ay.inflate([...model.extent], 0.5);

  // Internal, shouldn't need to call this manually.
  publicAPI.computeTransforms = () => {
    gl_matrix__WEBPACK_IMPORTED_MODULE_6__/* .mat4.fromTranslation */ .pB.fromTranslation(model.indexToWorld, model.origin);
    model.indexToWorld[0] = model.direction[0];
    model.indexToWorld[1] = model.direction[1];
    model.indexToWorld[2] = model.direction[2];
    model.indexToWorld[4] = model.direction[3];
    model.indexToWorld[5] = model.direction[4];
    model.indexToWorld[6] = model.direction[5];
    model.indexToWorld[8] = model.direction[6];
    model.indexToWorld[9] = model.direction[7];
    model.indexToWorld[10] = model.direction[8];
    gl_matrix__WEBPACK_IMPORTED_MODULE_6__/* .mat4.scale */ .pB.scale(model.indexToWorld, model.indexToWorld, model.spacing);
    gl_matrix__WEBPACK_IMPORTED_MODULE_6__/* .mat4.invert */ .pB.invert(model.worldToIndex, model.indexToWorld);
  };
  publicAPI.indexToWorld = function (ain) {
    let aout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    gl_matrix__WEBPACK_IMPORTED_MODULE_6__/* .vec3.transformMat4 */ .eR.transformMat4(aout, ain, model.indexToWorld);
    return aout;
  };
  publicAPI.indexToWorldVec3 = publicAPI.indexToWorld;
  publicAPI.worldToIndex = function (ain) {
    let aout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    gl_matrix__WEBPACK_IMPORTED_MODULE_6__/* .vec3.transformMat4 */ .eR.transformMat4(aout, ain, model.worldToIndex);
    return aout;
  };
  publicAPI.worldToIndexVec3 = publicAPI.worldToIndex;
  publicAPI.indexToWorldBounds = function (bin) {
    let bout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return _BoundingBox_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].transformBounds */ .Ay.transformBounds(bin, model.indexToWorld, bout);
  };
  publicAPI.worldToIndexBounds = function (bin) {
    let bout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    return _BoundingBox_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].transformBounds */ .Ay.transformBounds(bin, model.worldToIndex, bout);
  };

  // Make sure the transform is correct
  publicAPI.onModified(publicAPI.computeTransforms);
  publicAPI.computeTransforms();
  publicAPI.getCenter = () => _BoundingBox_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].getCenter */ .Ay.getCenter(publicAPI.getBounds());
  publicAPI.computeHistogram = function (worldBounds) {
    let voxelFunction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    const bounds = [0, 0, 0, 0, 0, 0];
    publicAPI.worldToIndexBounds(worldBounds, bounds);
    const point1 = [0, 0, 0];
    const point2 = [0, 0, 0];
    _BoundingBox_js__WEBPACK_IMPORTED_MODULE_2__/* ["default"].computeCornerPoints */ .Ay.computeCornerPoints(bounds, point1, point2);
    (0,_Core_Math_index_js__WEBPACK_IMPORTED_MODULE_1__.b)(point1, point1);
    (0,_Core_Math_index_js__WEBPACK_IMPORTED_MODULE_1__.b)(point2, point2);
    const dimensions = publicAPI.getDimensions();
    (0,_Core_Math_index_js__WEBPACK_IMPORTED_MODULE_1__.c)(point1, [0, 0, 0], [dimensions[0] - 1, dimensions[1] - 1, dimensions[2] - 1], point1);
    (0,_Core_Math_index_js__WEBPACK_IMPORTED_MODULE_1__.c)(point2, [0, 0, 0], [dimensions[0] - 1, dimensions[1] - 1, dimensions[2] - 1], point2);
    const yStride = dimensions[0];
    const zStride = dimensions[0] * dimensions[1];
    const pixels = publicAPI.getPointData().getScalars().getData();
    let maximum = -Infinity;
    let minimum = Infinity;
    let sumOfSquares = 0;
    let isum = 0;
    let inum = 0;
    for (let z = point1[2]; z <= point2[2]; z++) {
      for (let y = point1[1]; y <= point2[1]; y++) {
        let index = point1[0] + y * yStride + z * zStride;
        for (let x = point1[0]; x <= point2[0]; x++) {
          if (!voxelFunction || voxelFunction([x, y, z], bounds)) {
            const pixel = pixels[index];
            if (pixel > maximum) maximum = pixel;
            if (pixel < minimum) minimum = pixel;
            sumOfSquares += pixel * pixel;
            isum += pixel;
            inum += 1;
          }
          ++index;
        }
      }
    }
    const average = inum > 0 ? isum / inum : 0;
    const variance = inum ? Math.abs(sumOfSquares / inum - average * average) : 0;
    const sigma = Math.sqrt(variance);
    return {
      minimum,
      maximum,
      average,
      variance,
      sigma,
      count: inum
    };
  };

  // TODO: use the unimplemented `vtkDataSetAttributes` for scalar length, that is currently also a TODO (GetNumberOfComponents).
  // Scalar data could be tuples for color information?
  publicAPI.computeIncrements = function (extent) {
    let numberOfComponents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    const increments = [];
    let incr = numberOfComponents;

    // Calculate array increment offsets
    // similar to c++ vtkImageData::ComputeIncrements
    for (let idx = 0; idx < 3; ++idx) {
      increments[idx] = incr;
      incr *= extent[idx * 2 + 1] - extent[idx * 2] + 1;
    }
    return increments;
  };

  /**
   * @param {Number[]} index the localized `[i,j,k]` pixel array position. Float values will be rounded.
   * @return {Number} the corresponding flattened index in the scalar array
   */
  publicAPI.computeOffsetIndex = _ref => {
    let [i, j, k] = _ref;
    const extent = publicAPI.getExtent();
    const numberOfComponents = publicAPI.getPointData().getScalars().getNumberOfComponents();
    const increments = publicAPI.computeIncrements(extent, numberOfComponents);
    // Use the array increments to find the pixel index
    // similar to c++ vtkImageData::GetArrayPointer
    // Math.floor to catch "practically 0" e^-15 scenarios.
    return Math.floor((Math.round(i) - extent[0]) * increments[0] + (Math.round(j) - extent[2]) * increments[1] + (Math.round(k) - extent[4]) * increments[2]);
  };

  /**
   * @param {Number[]} xyz the [x,y,z] Array in world coordinates
   * @return {Number|NaN} the corresponding pixel's index in the scalar array
   */
  publicAPI.getOffsetIndexFromWorld = xyz => {
    const extent = publicAPI.getExtent();
    const index = publicAPI.worldToIndex(xyz);

    // Confirm indexed i,j,k coords are within the bounds of the volume
    for (let idx = 0; idx < 3; ++idx) {
      if (index[idx] < extent[idx * 2] || index[idx] > extent[idx * 2 + 1]) {
        vtkErrorMacro(`GetScalarPointer: Pixel ${index} is not in memory. Current extent = ${extent}`);
        return NaN;
      }
    }

    // Assumed the index here is within 0 <-> scalarData.length, but doesn't hurt to check upstream
    return publicAPI.computeOffsetIndex(index);
  };
  /**
   * @param {Number[]} xyz the [x,y,z] Array in world coordinates
   * @param {Number?} comp the scalar component index for multi-component scalars
   * @return {Number|NaN} the corresponding pixel's scalar value
   */
  publicAPI.getScalarValueFromWorld = function (xyz) {
    let comp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    const numberOfComponents = publicAPI.getPointData().getScalars().getNumberOfComponents();
    if (comp < 0 || comp >= numberOfComponents) {
      vtkErrorMacro(`GetScalarPointer: Scalar Component ${comp} is not within bounds. Current Scalar numberOfComponents: ${numberOfComponents}`);
      return NaN;
    }
    const offsetIndex = publicAPI.getOffsetIndexFromWorld(xyz);
    if (Number.isNaN(offsetIndex)) {
      // VTK Error Macro will have been tripped already, no need to do it again,
      return offsetIndex;
    }
    return publicAPI.getPointData().getScalars().getComponent(offsetIndex, comp);
  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  direction: null,
  // a mat3
  indexToWorld: null,
  // a mat4
  worldToIndex: null,
  // a mat4
  spacing: [1.0, 1.0, 1.0],
  origin: [0.0, 0.0, 0.0],
  extent: [0, -1, 0, -1, 0, -1],
  dataDescription: _StructuredData_Constants_js__WEBPACK_IMPORTED_MODULE_5__/* .StructuredType */ .e.EMPTY
};

// ----------------------------------------------------------------------------

function extend(publicAPI, model) {
  let initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Inheritance
  _DataSet_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"].extend */ .Ay.extend(publicAPI, model, initialValues);
  if (!model.direction) {
    model.direction = gl_matrix__WEBPACK_IMPORTED_MODULE_6__/* .mat3.identity */ .w0.identity(new Float64Array(9));
  } else if (Array.isArray(model.direction)) {
    model.direction = new Float64Array(model.direction.slice(0, 9));
  }
  model.indexToWorld = new Float64Array(16);
  model.worldToIndex = new Float64Array(16);

  // Set/Get methods
  _macros2_js__WEBPACK_IMPORTED_MODULE_0__.m.get(publicAPI, model, ['indexToWorld', 'worldToIndex']);
  _macros2_js__WEBPACK_IMPORTED_MODULE_0__.m.setGetArray(publicAPI, model, ['origin', 'spacing'], 3);
  _macros2_js__WEBPACK_IMPORTED_MODULE_0__.m.setGetArray(publicAPI, model, ['direction'], 9);
  _macros2_js__WEBPACK_IMPORTED_MODULE_0__.m.getArray(publicAPI, model, ['extent'], 6);

  // Object specific methods
  vtkImageData(publicAPI, model);
}

// ----------------------------------------------------------------------------

const newInstance = _macros2_js__WEBPACK_IMPORTED_MODULE_0__.m.newInstance(extend, 'vtkImageData');

// ----------------------------------------------------------------------------

var vtkImageData$1 = {
  newInstance,
  extend
};




/***/ }),

/***/ 99178:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   p: () => (/* binding */ expose)
/* harmony export */ });
/* unused harmony exports createEndpoint, finalizer, proxy, proxyMarker, releaseProxy, transfer, transferHandlers, windowEndpoint, wrap */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const proxyMarker = Symbol("Comlink.proxy");
const createEndpoint = Symbol("Comlink.endpoint");
const releaseProxy = Symbol("Comlink.releaseProxy");
const finalizer = Symbol("Comlink.finalizer");
const throwMarker = Symbol("Comlink.thrown");
const isObject = (val) => (typeof val === "object" && val !== null) || typeof val === "function";
/**
 * Internal transfer handle to handle objects marked to proxy.
 */
const proxyTransferHandler = {
    canHandle: (val) => isObject(val) && val[proxyMarker],
    serialize(obj) {
        const { port1, port2 } = new MessageChannel();
        expose(obj, port1);
        return [port2, [port2]];
    },
    deserialize(port) {
        port.start();
        return wrap(port);
    },
};
/**
 * Internal transfer handler to handle thrown exceptions.
 */
const throwTransferHandler = {
    canHandle: (value) => isObject(value) && throwMarker in value,
    serialize({ value }) {
        let serialized;
        if (value instanceof Error) {
            serialized = {
                isError: true,
                value: {
                    message: value.message,
                    name: value.name,
                    stack: value.stack,
                },
            };
        }
        else {
            serialized = { isError: false, value };
        }
        return [serialized, []];
    },
    deserialize(serialized) {
        if (serialized.isError) {
            throw Object.assign(new Error(serialized.value.message), serialized.value);
        }
        throw serialized.value;
    },
};
/**
 * Allows customizing the serialization of certain values.
 */
const transferHandlers = new Map([
    ["proxy", proxyTransferHandler],
    ["throw", throwTransferHandler],
]);
function isAllowedOrigin(allowedOrigins, origin) {
    for (const allowedOrigin of allowedOrigins) {
        if (origin === allowedOrigin || allowedOrigin === "*") {
            return true;
        }
        if (allowedOrigin instanceof RegExp && allowedOrigin.test(origin)) {
            return true;
        }
    }
    return false;
}
function expose(obj, ep = globalThis, allowedOrigins = ["*"]) {
    ep.addEventListener("message", function callback(ev) {
        if (!ev || !ev.data) {
            return;
        }
        if (!isAllowedOrigin(allowedOrigins, ev.origin)) {
            console.warn(`Invalid origin '${ev.origin}' for comlink proxy`);
            return;
        }
        const { id, type, path } = Object.assign({ path: [] }, ev.data);
        const argumentList = (ev.data.argumentList || []).map(fromWireValue);
        let returnValue;
        try {
            const parent = path.slice(0, -1).reduce((obj, prop) => obj[prop], obj);
            const rawValue = path.reduce((obj, prop) => obj[prop], obj);
            switch (type) {
                case "GET" /* MessageType.GET */:
                    {
                        returnValue = rawValue;
                    }
                    break;
                case "SET" /* MessageType.SET */:
                    {
                        parent[path.slice(-1)[0]] = fromWireValue(ev.data.value);
                        returnValue = true;
                    }
                    break;
                case "APPLY" /* MessageType.APPLY */:
                    {
                        returnValue = rawValue.apply(parent, argumentList);
                    }
                    break;
                case "CONSTRUCT" /* MessageType.CONSTRUCT */:
                    {
                        const value = new rawValue(...argumentList);
                        returnValue = proxy(value);
                    }
                    break;
                case "ENDPOINT" /* MessageType.ENDPOINT */:
                    {
                        const { port1, port2 } = new MessageChannel();
                        expose(obj, port2);
                        returnValue = transfer(port1, [port1]);
                    }
                    break;
                case "RELEASE" /* MessageType.RELEASE */:
                    {
                        returnValue = undefined;
                    }
                    break;
                default:
                    return;
            }
        }
        catch (value) {
            returnValue = { value, [throwMarker]: 0 };
        }
        Promise.resolve(returnValue)
            .catch((value) => {
            return { value, [throwMarker]: 0 };
        })
            .then((returnValue) => {
            const [wireValue, transferables] = toWireValue(returnValue);
            ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables);
            if (type === "RELEASE" /* MessageType.RELEASE */) {
                // detach and deactive after sending release response above.
                ep.removeEventListener("message", callback);
                closeEndPoint(ep);
                if (finalizer in obj && typeof obj[finalizer] === "function") {
                    obj[finalizer]();
                }
            }
        })
            .catch((error) => {
            // Send Serialization Error To Caller
            const [wireValue, transferables] = toWireValue({
                value: new TypeError("Unserializable return value"),
                [throwMarker]: 0,
            });
            ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables);
        });
    });
    if (ep.start) {
        ep.start();
    }
}
function isMessagePort(endpoint) {
    return endpoint.constructor.name === "MessagePort";
}
function closeEndPoint(endpoint) {
    if (isMessagePort(endpoint))
        endpoint.close();
}
function wrap(ep, target) {
    return createProxy(ep, [], target);
}
function throwIfProxyReleased(isReleased) {
    if (isReleased) {
        throw new Error("Proxy has been released and is not useable");
    }
}
function releaseEndpoint(ep) {
    return requestResponseMessage(ep, {
        type: "RELEASE" /* MessageType.RELEASE */,
    }).then(() => {
        closeEndPoint(ep);
    });
}
const proxyCounter = new WeakMap();
const proxyFinalizers = "FinalizationRegistry" in globalThis &&
    new FinalizationRegistry((ep) => {
        const newCount = (proxyCounter.get(ep) || 0) - 1;
        proxyCounter.set(ep, newCount);
        if (newCount === 0) {
            releaseEndpoint(ep);
        }
    });
function registerProxy(proxy, ep) {
    const newCount = (proxyCounter.get(ep) || 0) + 1;
    proxyCounter.set(ep, newCount);
    if (proxyFinalizers) {
        proxyFinalizers.register(proxy, ep, proxy);
    }
}
function unregisterProxy(proxy) {
    if (proxyFinalizers) {
        proxyFinalizers.unregister(proxy);
    }
}
function createProxy(ep, path = [], target = function () { }) {
    let isProxyReleased = false;
    const proxy = new Proxy(target, {
        get(_target, prop) {
            throwIfProxyReleased(isProxyReleased);
            if (prop === releaseProxy) {
                return () => {
                    unregisterProxy(proxy);
                    releaseEndpoint(ep);
                    isProxyReleased = true;
                };
            }
            if (prop === "then") {
                if (path.length === 0) {
                    return { then: () => proxy };
                }
                const r = requestResponseMessage(ep, {
                    type: "GET" /* MessageType.GET */,
                    path: path.map((p) => p.toString()),
                }).then(fromWireValue);
                return r.then.bind(r);
            }
            return createProxy(ep, [...path, prop]);
        },
        set(_target, prop, rawValue) {
            throwIfProxyReleased(isProxyReleased);
            // FIXME: ES6 Proxy Handler `set` methods are supposed to return a
            // boolean. To show good will, we return true asynchronously ¯\_(ツ)_/¯
            const [value, transferables] = toWireValue(rawValue);
            return requestResponseMessage(ep, {
                type: "SET" /* MessageType.SET */,
                path: [...path, prop].map((p) => p.toString()),
                value,
            }, transferables).then(fromWireValue);
        },
        apply(_target, _thisArg, rawArgumentList) {
            throwIfProxyReleased(isProxyReleased);
            const last = path[path.length - 1];
            if (last === createEndpoint) {
                return requestResponseMessage(ep, {
                    type: "ENDPOINT" /* MessageType.ENDPOINT */,
                }).then(fromWireValue);
            }
            // We just pretend that `bind()` didn’t happen.
            if (last === "bind") {
                return createProxy(ep, path.slice(0, -1));
            }
            const [argumentList, transferables] = processArguments(rawArgumentList);
            return requestResponseMessage(ep, {
                type: "APPLY" /* MessageType.APPLY */,
                path: path.map((p) => p.toString()),
                argumentList,
            }, transferables).then(fromWireValue);
        },
        construct(_target, rawArgumentList) {
            throwIfProxyReleased(isProxyReleased);
            const [argumentList, transferables] = processArguments(rawArgumentList);
            return requestResponseMessage(ep, {
                type: "CONSTRUCT" /* MessageType.CONSTRUCT */,
                path: path.map((p) => p.toString()),
                argumentList,
            }, transferables).then(fromWireValue);
        },
    });
    registerProxy(proxy, ep);
    return proxy;
}
function myFlat(arr) {
    return Array.prototype.concat.apply([], arr);
}
function processArguments(argumentList) {
    const processed = argumentList.map(toWireValue);
    return [processed.map((v) => v[0]), myFlat(processed.map((v) => v[1]))];
}
const transferCache = new WeakMap();
function transfer(obj, transfers) {
    transferCache.set(obj, transfers);
    return obj;
}
function proxy(obj) {
    return Object.assign(obj, { [proxyMarker]: true });
}
function windowEndpoint(w, context = globalThis, targetOrigin = "*") {
    return {
        postMessage: (msg, transferables) => w.postMessage(msg, targetOrigin, transferables),
        addEventListener: context.addEventListener.bind(context),
        removeEventListener: context.removeEventListener.bind(context),
    };
}
function toWireValue(value) {
    for (const [name, handler] of transferHandlers) {
        if (handler.canHandle(value)) {
            const [serializedValue, transferables] = handler.serialize(value);
            return [
                {
                    type: "HANDLER" /* WireValueType.HANDLER */,
                    name,
                    value: serializedValue,
                },
                transferables,
            ];
        }
    }
    return [
        {
            type: "RAW" /* WireValueType.RAW */,
            value,
        },
        transferCache.get(value) || [],
    ];
}
function fromWireValue(value) {
    switch (value.type) {
        case "HANDLER" /* WireValueType.HANDLER */:
            return transferHandlers.get(value.name).deserialize(value.value);
        case "RAW" /* WireValueType.RAW */:
            return value.value;
    }
}
function requestResponseMessage(ep, msg, transfers) {
    return new Promise((resolve) => {
        const id = generateUUID();
        ep.addEventListener("message", function l(ev) {
            if (!ev.data || !ev.data.id || ev.data.id !== id) {
                return;
            }
            ep.removeEventListener("message", l);
            resolve(ev.data);
        });
        if (ep.start) {
            ep.start();
        }
        ep.postMessage(Object.assign({ id }, msg), transfers);
    });
}
function generateUUID() {
    return new Array(4)
        .fill(0)
        .map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))
        .join("-");
}


//# sourceMappingURL=comlink.mjs.map


/***/ }),

/***/ 75210:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  h1: () => (/* reexport */ bisect/* default */.Ay),
  yl: () => (/* reexport */ bisector/* default */.A),
  lq: () => (/* reexport */ ticks/* tickIncrement */.lq),
  sG: () => (/* reexport */ ticks/* tickStep */.sG),
  Zc: () => (/* reexport */ ticks/* default */.Ay)
});

// UNUSED EXPORTS: Adder, InternMap, InternSet, ascending, bin, bisectCenter, bisectLeft, bisectRight, blur, blur2, blurImage, count, cross, cumsum, descending, deviation, difference, disjoint, every, extent, fcumsum, filter, flatGroup, flatRollup, fsum, greatest, greatestIndex, group, groupSort, groups, histogram, index, indexes, intersection, least, leastIndex, map, max, maxIndex, mean, median, medianIndex, merge, min, minIndex, mode, nice, pairs, permute, quantile, quantileIndex, quantileSorted, quickselect, range, rank, reduce, reverse, rollup, rollups, scan, shuffle, shuffler, some, sort, subset, sum, superset, thresholdFreedmanDiaconis, thresholdScott, thresholdSturges, transpose, union, variance, zip

// EXTERNAL MODULE: ../../../node_modules/d3-array/src/bisect.js
var bisect = __webpack_require__(81068);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/ascending.js
var ascending = __webpack_require__(18642);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/bisector.js
var bisector = __webpack_require__(38153);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/blur.js
var src_blur = __webpack_require__(19743);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/count.js
var count = __webpack_require__(5739);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/cross.js
var cross = __webpack_require__(67800);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/cumsum.js
var cumsum = __webpack_require__(11472);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/descending.js
var descending = __webpack_require__(33760);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/deviation.js
var deviation = __webpack_require__(47803);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/extent.js
var extent = __webpack_require__(80130);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/fsum.js
var fsum = __webpack_require__(52827);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/group.js
var group = __webpack_require__(13723);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/groupSort.js
var groupSort = __webpack_require__(22543);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/bin.js + 2 modules
var bin = __webpack_require__(97315);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/threshold/freedmanDiaconis.js
var freedmanDiaconis = __webpack_require__(48210);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/threshold/scott.js
var scott = __webpack_require__(95211);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/threshold/sturges.js
var sturges = __webpack_require__(67049);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/max.js
var max = __webpack_require__(36426);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/maxIndex.js
var maxIndex = __webpack_require__(64196);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/mean.js
var mean = __webpack_require__(61515);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/median.js
var median = __webpack_require__(26892);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/merge.js
var merge = __webpack_require__(37412);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/min.js
var src_min = __webpack_require__(57623);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/minIndex.js
var minIndex = __webpack_require__(97982);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/mode.js
var mode = __webpack_require__(3581);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/nice.js
var nice = __webpack_require__(51963);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/pairs.js
var pairs = __webpack_require__(35457);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/permute.js
var permute = __webpack_require__(83254);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/quantile.js
var quantile = __webpack_require__(49115);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/quickselect.js
var quickselect = __webpack_require__(43523);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/range.js
var range = __webpack_require__(14029);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/rank.js
var rank = __webpack_require__(36820);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/least.js
var least = __webpack_require__(84201);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/leastIndex.js
var leastIndex = __webpack_require__(55973);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/greatest.js
var greatest = __webpack_require__(40049);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/greatestIndex.js
var greatestIndex = __webpack_require__(82061);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/scan.js
var scan = __webpack_require__(65591);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/shuffle.js
var shuffle = __webpack_require__(96945);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/sum.js
var sum = __webpack_require__(66871);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/ticks.js
var ticks = __webpack_require__(47598);
;// CONCATENATED MODULE: ../../../node_modules/d3-array/src/transpose.js


function transpose_transpose(matrix) {
  if (!(n = matrix.length)) return [];
  for (var i = -1, m = min(matrix, transpose_length), transpose = new Array(m); ++i < m;) {
    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
      row[j] = matrix[j][i];
    }
  }
  return transpose;
}

function transpose_length(d) {
  return d.length;
}

// EXTERNAL MODULE: ../../../node_modules/d3-array/src/variance.js
var variance = __webpack_require__(77097);
;// CONCATENATED MODULE: ../../../node_modules/d3-array/src/zip.js


function zip() {
  return transpose(arguments);
}

// EXTERNAL MODULE: ../../../node_modules/d3-array/src/every.js
var every = __webpack_require__(25475);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/some.js
var some = __webpack_require__(39034);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/filter.js
var filter = __webpack_require__(95388);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/map.js
var map = __webpack_require__(69010);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/reduce.js
var reduce = __webpack_require__(91804);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/reverse.js
var reverse = __webpack_require__(23526);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/sort.js
var sort = __webpack_require__(60786);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/difference.js
var difference = __webpack_require__(18949);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/disjoint.js
var disjoint = __webpack_require__(77050);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/intersection.js
var intersection = __webpack_require__(29351);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/subset.js
var subset = __webpack_require__(59128);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/superset.js
var superset = __webpack_require__(47051);
// EXTERNAL MODULE: ../../../node_modules/d3-array/src/union.js
var union = __webpack_require__(78603);
// EXTERNAL MODULE: ../../../node_modules/internmap/src/index.js
var src = __webpack_require__(59043);
;// CONCATENATED MODULE: ../../../node_modules/d3-array/src/index.js













 // Deprecated; use bin.






















 // Deprecated; use leastIndex.






















/***/ }),

/***/ 57623:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* unused harmony export default */
function min(values, valueof) {
  let min;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null
          && (min > value || (min === undefined && value >= value))) {
        min = value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null
          && (min > value || (min === undefined && value >= value))) {
        min = value;
      }
    }
  }
  return min;
}


/***/ }),

/***/ 65481:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  GW: () => (/* reexport */ value/* default */.A),
  Dj: () => (/* reexport */ number/* default */.A),
  sH: () => (/* reexport */ round/* default */.A)
});

// UNUSED EXPORTS: interpolateArray, interpolateBasis, interpolateBasisClosed, interpolateCubehelix, interpolateCubehelixLong, interpolateDate, interpolateDiscrete, interpolateHcl, interpolateHclLong, interpolateHsl, interpolateHslLong, interpolateHue, interpolateLab, interpolateNumberArray, interpolateObject, interpolateRgb, interpolateRgbBasis, interpolateRgbBasisClosed, interpolateString, interpolateTransformCss, interpolateTransformSvg, interpolateZoom, piecewise, quantize

// EXTERNAL MODULE: ../../../node_modules/d3-interpolate/src/value.js
var value = __webpack_require__(1283);
// EXTERNAL MODULE: ../../../node_modules/d3-interpolate/src/array.js
var array = __webpack_require__(82043);
// EXTERNAL MODULE: ../../../node_modules/d3-interpolate/src/basis.js
var basis = __webpack_require__(43724);
// EXTERNAL MODULE: ../../../node_modules/d3-interpolate/src/basisClosed.js
var basisClosed = __webpack_require__(96184);
// EXTERNAL MODULE: ../../../node_modules/d3-interpolate/src/date.js
var date = __webpack_require__(2728);
// EXTERNAL MODULE: ../../../node_modules/d3-interpolate/src/discrete.js
var discrete = __webpack_require__(61847);
// EXTERNAL MODULE: ../../../node_modules/d3-interpolate/src/hue.js
var hue = __webpack_require__(73524);
// EXTERNAL MODULE: ../../../node_modules/d3-interpolate/src/number.js
var number = __webpack_require__(20825);
// EXTERNAL MODULE: ../../../node_modules/d3-interpolate/src/numberArray.js
var numberArray = __webpack_require__(32204);
// EXTERNAL MODULE: ../../../node_modules/d3-interpolate/src/object.js
var object = __webpack_require__(34107);
// EXTERNAL MODULE: ../../../node_modules/d3-interpolate/src/round.js
var round = __webpack_require__(66822);
// EXTERNAL MODULE: ../../../node_modules/d3-interpolate/src/string.js
var string = __webpack_require__(33637);
// EXTERNAL MODULE: ../../../node_modules/d3-interpolate/src/transform/index.js + 2 modules
var transform = __webpack_require__(62911);
// EXTERNAL MODULE: ../../../node_modules/d3-interpolate/src/zoom.js
var zoom = __webpack_require__(85351);
// EXTERNAL MODULE: ../../../node_modules/d3-interpolate/src/rgb.js
var rgb = __webpack_require__(83441);
// EXTERNAL MODULE: ../../../node_modules/d3-interpolate/src/hsl.js
var hsl = __webpack_require__(26093);
// EXTERNAL MODULE: ../../../node_modules/d3-interpolate/src/lab.js
var lab = __webpack_require__(86617);
// EXTERNAL MODULE: ../../../node_modules/d3-interpolate/src/hcl.js
var hcl = __webpack_require__(69277);
// EXTERNAL MODULE: ../../../node_modules/d3-interpolate/src/cubehelix.js
var cubehelix = __webpack_require__(34121);
// EXTERNAL MODULE: ../../../node_modules/d3-interpolate/src/piecewise.js
var piecewise = __webpack_require__(84444);
;// CONCATENATED MODULE: ../../../node_modules/d3-interpolate/src/quantize.js
/* harmony default export */ function quantize(interpolator, n) {
  var samples = new Array(n);
  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
  return samples;
}

;// CONCATENATED MODULE: ../../../node_modules/d3-interpolate/src/index.js























/***/ })

}]);