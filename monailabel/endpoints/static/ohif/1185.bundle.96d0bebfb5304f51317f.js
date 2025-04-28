"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[1185],{

/***/ 5791:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  JX: () => (/* binding */ CornerstoneOverlay),
  Ay: () => (/* binding */ Overlays_CustomizableViewportOverlay)
});

// UNUSED EXPORTS: CustomizableViewportOverlay

// EXTERNAL MODULE: ../../../node_modules/react/index.js
var react = __webpack_require__(86326);
// EXTERNAL MODULE: ../../../node_modules/gl-matrix/esm/index.js + 1 modules
var esm = __webpack_require__(3823);
// EXTERNAL MODULE: ../../../node_modules/prop-types/index.js
var prop_types = __webpack_require__(97598);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/index.js
var dist_esm = __webpack_require__(81985);
// EXTERNAL MODULE: ../../ui/src/index.js + 690 modules
var src = __webpack_require__(38223);
// EXTERNAL MODULE: ../../../node_modules/moment/moment.js
var moment = __webpack_require__(14867);
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/Viewport/Overlays/utils.ts



/**
 * Checks if value is valid.
 *
 * @param {number} value
 * @returns {boolean} is valid.
 */
function isValidNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Formats number precision.
 *
 * @param {number} number
 * @param {number} precision
 * @returns {number} formatted number.
 */
function formatNumberPrecision(number, precision = 0) {
  if (number !== null) {
    return parseFloat(number).toFixed(precision);
  }
}

/**
 * Formats DICOM date.
 *
 * @param {string} date
 * @param {string} strFormat
 * @returns {string} formatted date.
 */
function formatDICOMDate(date, strFormat = 'MMM D, YYYY') {
  return moment_default()(date, 'YYYYMMDD').format(strFormat);
}

/**
 *    DICOM Time is stored as HHmmss.SSS, where:
 *      HH 24 hour time:
 *        m mm        0..59   Minutes
 *        s ss        0..59   Seconds
 *        S SS SSS    0..999  Fractional seconds
 *
 *        Goal: '24:12:12'
 *
 * @param {*} time
 * @param {string} strFormat
 * @returns {string} formatted name.
 */
function formatDICOMTime(time, strFormat = 'HH:mm:ss') {
  return moment_default()(time, 'HH:mm:ss').format(strFormat);
}

/**
 * Formats a patient name for display purposes
 *
 * @param {string} name
 * @returns {string} formatted name.
 */
function formatPN(name) {
  if (!name) {
    return '';
  }
  if (typeof name === 'object') {
    name = name.Alphabetic;
    if (!name) {
      return '';
    }
  }
  const cleaned = name.split('^').filter(s => !!s).join(', ').trim();
  return cleaned === ',' || cleaned === '' ? '' : cleaned;
}

/**
 * Gets compression type
 *
 * @param {number} imageId
 * @returns {string} compression type.
 */
function getCompression(imageId) {
  const generalImageModule = metaData.get('generalImageModule', imageId) || {};
  const {
    lossyImageCompression,
    lossyImageCompressionRatio,
    lossyImageCompressionMethod
  } = generalImageModule;
  if (lossyImageCompression === '01' && lossyImageCompressionRatio !== '') {
    const compressionMethod = lossyImageCompressionMethod || 'Lossy: ';
    const compressionRatio = formatNumberPrecision(lossyImageCompressionRatio, 2);
    return compressionMethod + compressionRatio + ' : 1';
  }
  return 'Lossless / Uncompressed';
}
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.css
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.tsx







const EPSILON = 1e-4;
const OverlayItemComponents = {
  'ohif.overlayItem': OverlayItem,
  'ohif.overlayItem.windowLevel': VOIOverlayItem,
  'ohif.overlayItem.zoomLevel': ZoomOverlayItem,
  'ohif.overlayItem.instanceNumber': InstanceNumberOverlayItem
};
const studyDateItem = {
  id: 'StudyDate',
  customizationType: 'ohif.overlayItem',
  label: '',
  title: 'Study date',
  condition: ({
    referenceInstance
  }) => referenceInstance?.StudyDate,
  contentF: ({
    referenceInstance,
    formatters: {
      formatDate
    }
  }) => formatDate(referenceInstance.StudyDate)
};
const seriesDescriptionItem = {
  id: 'SeriesDescription',
  customizationType: 'ohif.overlayItem',
  label: '',
  title: 'Series description',
  condition: ({
    referenceInstance
  }) => {
    return referenceInstance && referenceInstance.SeriesDescription;
  },
  contentF: ({
    referenceInstance
  }) => referenceInstance.SeriesDescription
};
const topLeftItems = {
  id: 'cornerstoneOverlayTopLeft',
  items: [studyDateItem, seriesDescriptionItem]
};
const topRightItems = {
  id: 'cornerstoneOverlayTopRight',
  items: []
};
const bottomLeftItems = {
  id: 'cornerstoneOverlayBottomLeft',
  items: [{
    id: 'WindowLevel',
    customizationType: 'ohif.overlayItem.windowLevel'
  }, {
    id: 'ZoomLevel',
    customizationType: 'ohif.overlayItem.zoomLevel',
    condition: props => {
      const activeToolName = props.toolGroupService.getActiveToolForViewport(props.viewportId);
      return activeToolName === 'Zoom';
    }
  }]
};
const bottomRightItems = {
  id: 'cornerstoneOverlayBottomRight',
  items: [{
    id: 'InstanceNumber',
    customizationType: 'ohif.overlayItem.instanceNumber'
  }]
};

/**
 * The @ohif/cornerstoneOverlay is a default value for a customization
 * for the cornerstone overlays.  The intent is to allow it to be extended
 * without needing to re-write the individual overlays by using the append
 * mechanism.  Individual attributes can be modified individually without
 * affecting the other items by using the append as well, with position
 * based replacement.
 * This is used as a default in the getCustomizationModule so that it
 * is available early for additional customization extensions.
 */
const CornerstoneOverlay = {
  id: '@ohif/cornerstoneOverlay',
  topLeftItems,
  topRightItems,
  bottomLeftItems,
  bottomRightItems
};

/**
 * Customizable Viewport Overlay
 */
function CustomizableViewportOverlay({
  element,
  viewportData,
  imageSliceData,
  viewportId,
  servicesManager
}) {
  const {
    cornerstoneViewportService,
    customizationService,
    toolGroupService,
    displaySetService
  } = servicesManager.services;
  const [voi, setVOI] = (0,react.useState)({
    windowCenter: null,
    windowWidth: null
  });
  const [scale, setScale] = (0,react.useState)(1);
  const {
    imageIndex
  } = imageSliceData;

  // The new customization is 'cornerstoneOverlay', with an append or replace
  // on the individual items rather than defining individual items.
  const cornerstoneOverlay = customizationService.getCustomization('@ohif/cornerstoneOverlay');

  // Historical usage defined the overlays as separate items due to lack of
  // append functionality.  This code enables the historical usage, but
  // the recommended functionality is to append to the default values in
  // cornerstoneOverlay rather than defining individual items.
  const topLeftCustomization = customizationService.getCustomization('cornerstoneOverlayTopLeft') || cornerstoneOverlay?.topLeftItems;
  const topRightCustomization = customizationService.getCustomization('cornerstoneOverlayTopRight') || cornerstoneOverlay?.topRightItems;
  const bottomLeftCustomization = customizationService.getCustomization('cornerstoneOverlayBottomLeft') || cornerstoneOverlay?.bottomLeftItems;
  const bottomRightCustomization = customizationService.getCustomization('cornerstoneOverlayBottomRight') || cornerstoneOverlay?.bottomRightItems;
  const instanceNumber = (0,react.useMemo)(() => viewportData ? getInstanceNumber(viewportData, viewportId, imageIndex, cornerstoneViewportService) : null, [viewportData, viewportId, imageIndex, cornerstoneViewportService]);
  const displaySetProps = (0,react.useMemo)(() => {
    const displaySets = getDisplaySets(viewportData, displaySetService);
    if (!displaySets) {
      return null;
    }
    const [displaySet] = displaySets;
    const {
      instances,
      instance: referenceInstance
    } = displaySet;
    return {
      displaySets,
      displaySet,
      instance: instances?.[imageIndex],
      instances,
      referenceInstance
    };
  }, [viewportData, viewportId, instanceNumber, cornerstoneViewportService]);

  /**
   * Updating the VOI when the viewport changes its voi
   */
  (0,react.useEffect)(() => {
    const updateVOI = eventDetail => {
      const {
        range
      } = eventDetail.detail;
      if (!range) {
        return;
      }
      const {
        lower,
        upper
      } = range;
      const {
        windowWidth,
        windowCenter
      } = dist_esm.utilities.windowLevel.toWindowLevel(lower, upper);
      setVOI({
        windowCenter,
        windowWidth
      });
    };
    element.addEventListener(dist_esm.Enums.Events.VOI_MODIFIED, updateVOI);
    return () => {
      element.removeEventListener(dist_esm.Enums.Events.VOI_MODIFIED, updateVOI);
    };
  }, [viewportId, viewportData, voi, element]);

  /**
   * Updating the scale when the viewport changes its zoom
   */
  (0,react.useEffect)(() => {
    const updateScale = eventDetail => {
      const {
        previousCamera,
        camera
      } = eventDetail.detail;
      if (previousCamera.parallelScale !== camera.parallelScale || previousCamera.scale !== camera.scale) {
        const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
        if (!viewport) {
          return;
        }
        const scale = viewport.getZoom();
        setScale(scale);
      }
    };
    element.addEventListener(dist_esm.Enums.Events.CAMERA_MODIFIED, updateScale);
    return () => {
      element.removeEventListener(dist_esm.Enums.Events.CAMERA_MODIFIED, updateScale);
    };
  }, [viewportId, viewportData, cornerstoneViewportService, element]);
  const _renderOverlayItem = (0,react.useCallback)((item, props) => {
    const overlayItemProps = {
      ...props,
      element,
      viewportData,
      imageSliceData,
      viewportId,
      servicesManager,
      customization: item,
      formatters: {
        formatPN: formatPN,
        formatDate: formatDICOMDate,
        formatTime: formatDICOMTime,
        formatNumberPrecision: formatNumberPrecision
      }
    };
    if (!item) {
      return null;
    }
    const {
      customizationType
    } = item;
    const OverlayItemComponent = OverlayItemComponents[customizationType];
    if (OverlayItemComponent) {
      return /*#__PURE__*/react.createElement(OverlayItemComponent, overlayItemProps);
    } else {
      const renderItem = customizationService.transform(item);
      if (typeof renderItem.contentF === 'function') {
        return renderItem.contentF(overlayItemProps);
      }
    }
  }, [element, viewportData, imageSliceData, viewportId, servicesManager, customizationService, displaySetProps, voi, scale, instanceNumber]);
  const getContent = (0,react.useCallback)((customization, keyPrefix) => {
    if (!customization?.items) {
      return null;
    }
    const {
      items
    } = customization;
    const props = {
      ...displaySetProps,
      formatters: {
        formatDate: formatDICOMDate
      },
      voi,
      scale,
      instanceNumber,
      viewportId,
      toolGroupService
    };
    return /*#__PURE__*/react.createElement(react.Fragment, null, items.map((item, index) => /*#__PURE__*/react.createElement("div", {
      key: `${keyPrefix}_${index}`
    }, (!item?.condition || item.condition(props)) && _renderOverlayItem(item, props) || null)));
  }, [_renderOverlayItem]);
  return /*#__PURE__*/react.createElement(src/* ViewportOverlay */.pU, {
    topLeft: getContent(topLeftCustomization, 'topLeftOverlayItem'),
    topRight: getContent(topRightCustomization, 'topRightOverlayItem'),
    bottomLeft: getContent(bottomLeftCustomization, 'bottomLeftOverlayItem'),
    bottomRight: getContent(bottomRightCustomization, 'bottomRightOverlayItem')
  });
}

/**
 * Gets an array of display sets for the given viewport, based on the viewport data.
 * Returns null if none found.
 */
function getDisplaySets(viewportData, displaySetService) {
  if (!viewportData?.data?.length) {
    return null;
  }
  const displaySets = viewportData.data.map(datum => displaySetService.getDisplaySetByUID(datum.displaySetInstanceUID)).filter(it => !!it);
  if (!displaySets.length) {
    return null;
  }
  return displaySets;
}
const getInstanceNumber = (viewportData, viewportId, imageIndex, cornerstoneViewportService) => {
  let instanceNumber;
  switch (viewportData.viewportType) {
    case dist_esm.Enums.ViewportType.STACK:
      instanceNumber = _getInstanceNumberFromStack(viewportData, imageIndex);
      break;
    case dist_esm.Enums.ViewportType.ORTHOGRAPHIC:
      instanceNumber = _getInstanceNumberFromVolume(viewportData, viewportId, cornerstoneViewportService, imageIndex);
      break;
  }
  return instanceNumber ?? null;
};
function _getInstanceNumberFromStack(viewportData, imageIndex) {
  const imageIds = viewportData.data[0].imageIds;
  const imageId = imageIds[imageIndex];
  if (!imageId) {
    return;
  }
  const generalImageModule = dist_esm.metaData.get('generalImageModule', imageId) || {};
  const {
    instanceNumber
  } = generalImageModule;
  const stackSize = imageIds.length;
  if (stackSize <= 1) {
    return;
  }
  return parseInt(instanceNumber);
}

// Since volume viewports can be in any view direction, they can render
// a reconstructed image which don't have imageIds; therefore, no instance and instanceNumber
// Here we check if viewport is in the acquisition direction and if so, we get the instanceNumber
function _getInstanceNumberFromVolume(viewportData, viewportId, cornerstoneViewportService, imageIndex) {
  const volumes = viewportData.data;
  if (!volumes) {
    return;
  }

  // Todo: support fusion of acquisition plane which has instanceNumber
  const {
    volume
  } = volumes[0];
  if (!volume) {
    return;
  }
  const {
    direction,
    imageIds
  } = volume;
  const cornerstoneViewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
  if (!cornerstoneViewport) {
    return;
  }
  const camera = cornerstoneViewport.getCamera();
  const {
    viewPlaneNormal
  } = camera;
  // checking if camera is looking at the acquisition plane (defined by the direction on the volume)

  const scanAxisNormal = direction.slice(6, 9);

  // check if viewPlaneNormal is parallel to scanAxisNormal
  const cross = esm/* vec3.cross */.eR.cross(esm/* vec3.create */.eR.create(), viewPlaneNormal, scanAxisNormal);
  const isAcquisitionPlane = esm/* vec3.length */.eR.length(cross) < EPSILON;
  if (isAcquisitionPlane) {
    const imageId = imageIds[imageIndex];
    if (!imageId) {
      return {};
    }
    const {
      instanceNumber
    } = dist_esm.metaData.get('generalImageModule', imageId) || {};
    return parseInt(instanceNumber);
  }
}
function OverlayItem(props) {
  const {
    instance,
    customization = {}
  } = props;
  const {
    color,
    attribute,
    title,
    label,
    background
  } = customization;
  const value = customization.contentF?.(props, customization) ?? instance?.[attribute];
  if (value === undefined || value === null) {
    return null;
  }
  return /*#__PURE__*/react.createElement("div", {
    className: "overlay-item flex flex-row",
    style: {
      color,
      background
    },
    title: title
  }, label ? /*#__PURE__*/react.createElement("span", {
    className: "mr-1 shrink-0"
  }, label) : null, /*#__PURE__*/react.createElement("span", {
    className: "ml-1 mr-2 shrink-0"
  }, value));
}

/**
 * Window Level / Center Overlay item
 */
function VOIOverlayItem({
  voi,
  customization
}) {
  const {
    windowWidth,
    windowCenter
  } = voi;
  if (typeof windowCenter !== 'number' || typeof windowWidth !== 'number') {
    return null;
  }
  return /*#__PURE__*/react.createElement("div", {
    className: "overlay-item flex flex-row",
    style: {
      color: customization?.color
    }
  }, /*#__PURE__*/react.createElement("span", {
    className: "mr-1 shrink-0"
  }, "W:"), /*#__PURE__*/react.createElement("span", {
    className: "ml-1 mr-2 shrink-0"
  }, windowWidth.toFixed(0)), /*#__PURE__*/react.createElement("span", {
    className: "mr-1 shrink-0"
  }, "L:"), /*#__PURE__*/react.createElement("span", {
    className: "ml-1 shrink-0"
  }, windowCenter.toFixed(0)));
}

/**
 * Zoom Level Overlay item
 */
function ZoomOverlayItem({
  scale,
  customization
}) {
  return /*#__PURE__*/react.createElement("div", {
    className: "overlay-item flex flex-row",
    style: {
      color: customization && customization.color || undefined
    }
  }, /*#__PURE__*/react.createElement("span", {
    className: "mr-1 shrink-0"
  }, "Zoom:"), /*#__PURE__*/react.createElement("span", null, scale.toFixed(2), "x"));
}

/**
 * Instance Number Overlay Item
 */
function InstanceNumberOverlayItem({
  instanceNumber,
  imageSliceData,
  customization
}) {
  const {
    imageIndex,
    numberOfSlices
  } = imageSliceData;
  return /*#__PURE__*/react.createElement("div", {
    className: "overlay-item flex flex-row",
    style: {
      color: customization && customization.color || undefined
    }
  }, /*#__PURE__*/react.createElement("span", null, instanceNumber !== undefined && instanceNumber !== null ? /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("span", {
    className: "mr-1 shrink-0"
  }, "I:"), /*#__PURE__*/react.createElement("span", null, `${instanceNumber} (${imageIndex + 1}/${numberOfSlices})`)) : `${imageIndex + 1}/${numberOfSlices}`));
}
CustomizableViewportOverlay.propTypes = {
  viewportData: (prop_types_default()).object,
  imageIndex: (prop_types_default()).number,
  viewportId: (prop_types_default()).string
};
/* harmony default export */ const Overlays_CustomizableViewportOverlay = (CustomizableViewportOverlay);


/***/ }),

/***/ 76255:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   It: () => (/* binding */ ViewportActionCornersProvider),
/* harmony export */   R4: () => (/* binding */ useViewportActionCornersContext)
/* harmony export */ });
/* unused harmony export ViewportActionCornersContext */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(86326);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(97598);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(38223);
/* harmony import */ var _services_ViewportActionCornersService_ViewportActionCornersService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(77954);




const DEFAULT_STATE = {
  // default here is the viewportId of the default viewport
  default: {
    [_ohif_ui__WEBPACK_IMPORTED_MODULE_2__/* .ViewportActionCornersLocations */ .ld.topLeft]: [],
    [_ohif_ui__WEBPACK_IMPORTED_MODULE_2__/* .ViewportActionCornersLocations */ .ld.topRight]: [],
    [_ohif_ui__WEBPACK_IMPORTED_MODULE_2__/* .ViewportActionCornersLocations */ .ld.bottomLeft]: [],
    [_ohif_ui__WEBPACK_IMPORTED_MODULE_2__/* .ViewportActionCornersLocations */ .ld.bottomRight]: []
  }
  // [anotherViewportId]: { ..... }
};
const ViewportActionCornersContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(DEFAULT_STATE);
function ViewportActionCornersProvider({
  children,
  service
}) {
  const viewportActionCornersReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_ACTION_COMPONENT':
        {
          const {
            viewportId,
            id,
            component,
            location,
            indexPriority
          } = action.payload;
          // Get the components at the specified location of the specified viewport.
          let locationComponents = state?.[viewportId]?.[location] ? [...state[viewportId][location]] : [];

          // If the component (id) already exists at the location specified in the payload,
          // then it must be replaced with the component in the payload so first
          // remove it from that location.
          const deletionIndex = locationComponents.findIndex(component => component.id === id);
          if (deletionIndex !== -1) {
            locationComponents = [...locationComponents.slice(0, deletionIndex), ...locationComponents.slice(deletionIndex + 1)];
          }

          // Insert the component from the payload but
          // do not insert an undefined or null component.
          if (component) {
            let insertionIndex;
            const isRightSide = location === _ohif_ui__WEBPACK_IMPORTED_MODULE_2__/* .ViewportActionCornersLocations */ .ld.topRight || location === _ohif_ui__WEBPACK_IMPORTED_MODULE_2__/* .ViewportActionCornersLocations */ .ld.bottomRight;
            if (indexPriority === undefined) {
              // If no indexPriority is provided, add it to the appropriate end
              insertionIndex = isRightSide ? 0 : locationComponents.length;
            } else {
              if (isRightSide) {
                insertionIndex = locationComponents.findIndex(component => indexPriority > component.indexPriority);
              } else {
                insertionIndex = locationComponents.findIndex(component => indexPriority <= component.indexPriority);
              }
              if (insertionIndex === -1) {
                // If no suitable position found, add to the appropriate end
                insertionIndex = isRightSide ? 0 : locationComponents.length;
              }
            }
            const defaultPriority = isRightSide ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER;
            locationComponents = [...locationComponents.slice(0, insertionIndex), {
              id,
              component,
              indexPriority: indexPriority ?? defaultPriority
            }, ...locationComponents.slice(insertionIndex)];
          }
          return {
            ...state,
            [viewportId]: {
              ...state[viewportId],
              [location]: locationComponents
            }
          };
        }
      case 'CLEAR_ACTION_COMPONENTS':
        {
          const viewportId = action.payload;
          const nextState = {
            ...state
          };
          delete nextState[viewportId];
          return nextState;
        }
      default:
        return {
          ...state
        };
    }
  };
  const [viewportActionCornersState, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(viewportActionCornersReducer, DEFAULT_STATE);
  const getState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    return viewportActionCornersState;
  }, [viewportActionCornersState]);
  const addComponent = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(actionComponentInfo => {
    dispatch({
      type: 'ADD_ACTION_COMPONENT',
      payload: actionComponentInfo
    });
  }, [dispatch]);
  const addComponents = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(actionComponentInfos => {
    actionComponentInfos.forEach(actionComponentInfo => dispatch({
      type: 'ADD_ACTION_COMPONENT',
      payload: actionComponentInfo
    }));
  }, [dispatch]);
  const clear = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(viewportId => dispatch({
    type: 'CLEAR_ACTION_COMPONENTS',
    payload: viewportId
  }), [dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (service) {
      service.setServiceImplementation({
        getState,
        addComponent,
        addComponents,
        clear
      });
    }
  }, [getState, service, addComponent, addComponents, clear]);
  const viewportCornerActions = {
    getState,
    addComponent: props => service.addComponent(props),
    addComponents: props => service.addComponents(props),
    clear: props => service.clear(props)
  };
  const contextValue = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => [viewportActionCornersState, viewportCornerActions], [viewportActionCornersState, viewportCornerActions]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ViewportActionCornersContext.Provider, {
    value: contextValue
  }, children);
}
ViewportActionCornersProvider.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node),
  service: prop_types__WEBPACK_IMPORTED_MODULE_1___default().instanceOf(_services_ViewportActionCornersService_ViewportActionCornersService__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A).isRequired
};
const useViewportActionCornersContext = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ViewportActionCornersContext);

/***/ }),

/***/ 73421:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ useSegmentations)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(86326);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(62051);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ohif_core_src_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(37415);



function mapSegmentationToDisplay(segmentation, customizationService) {
  const {
    label,
    segments
  } = segmentation;

  // Get the readable text mapping once
  const {
    readableText: readableTextMap
  } = customizationService.getCustomization('PanelSegmentation.readableText', {});

  // Helper function to recursively map cachedStats to readable display text
  function mapStatsToDisplay(stats, indent = 0) {
    const primary = [];
    const indentation = '  '.repeat(indent);
    for (const key in stats) {
      if (Object.prototype.hasOwnProperty.call(stats, key)) {
        const value = stats[key];
        const readableText = readableTextMap?.[key];
        if (!readableText) {
          continue;
        }
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          // Add empty row before category (except for the first category)
          if (primary.length > 0) {
            primary.push('');
          }
          // Add category title
          primary.push(`${indentation}${readableText}`);
          // Recursively handle nested objects
          primary.push(...mapStatsToDisplay(value, indent + 1));
        } else {
          // For non-nested values, don't add empty rows
          primary.push(`${indentation}${readableText}: ${(0,_ohif_core_src_utils__WEBPACK_IMPORTED_MODULE_2__/* .roundNumber */ .Wf)(value, 2)}`);
        }
      }
    }
    return primary;
  }

  // Get customization for display text mapping
  const displayTextMapper = segment => {
    const defaultDisplay = {
      primary: [],
      secondary: []
    };

    // If the segment has cachedStats, map it to readable text
    if (segment.cachedStats) {
      const primary = mapStatsToDisplay(segment.cachedStats);
      defaultDisplay.primary = primary;
    }
    return defaultDisplay;
  };
  const updatedSegments = {};
  Object.entries(segments).forEach(([segmentIndex, segment]) => {
    updatedSegments[segmentIndex] = {
      ...segment,
      displayText: displayTextMapper(segment)
    };
  });

  // Map the segments and apply the display text mapper
  return {
    ...segmentation,
    label,
    segments: updatedSegments
  };
}

/**
 * Custom hook that provides segmentation data.
 * @param options - The options object.
 * @param options.servicesManager - The services manager object.
 * @param options.subscribeToDataModified - Whether to subscribe to segmentation data modifications.
 * @param options.debounceTime - Debounce time in milliseconds for updates.
 * @returns An array of segmentation data.
 */
function useSegmentations({
  servicesManager,
  subscribeToDataModified = false,
  debounceTime = 0
}) {
  const {
    segmentationService,
    customizationService
  } = servicesManager.services;
  const [segmentations, setSegmentations] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const update = () => {
      const segmentations = segmentationService.getSegmentations();
      if (!segmentations?.length) {
        setSegmentations([]);
        return;
      }
      const mappedSegmentations = segmentations.map(segmentation => mapSegmentationToDisplay(segmentation, customizationService));
      setSegmentations(mappedSegmentations);
    };
    const debouncedUpdate = debounceTime > 0 ? lodash_debounce__WEBPACK_IMPORTED_MODULE_1___default()(update, debounceTime, {
      leading: true,
      trailing: true
    }) : update;
    update();
    const subscriptions = [segmentationService.subscribe(segmentationService.EVENTS.SEGMENTATION_MODIFIED, debouncedUpdate), segmentationService.subscribe(segmentationService.EVENTS.SEGMENTATION_REMOVED, debouncedUpdate)];
    if (subscribeToDataModified) {
      subscriptions.push(segmentationService.subscribe(segmentationService.EVENTS.SEGMENTATION_DATA_MODIFIED, debouncedUpdate));
    }
    return () => {
      subscriptions.forEach(subscription => subscription.unsubscribe());
      if (debounceTime > 0) {
        debouncedUpdate.cancel();
      }
    };
  }, [segmentationService, customizationService, debounceTime, subscribeToDataModified]);
  return segmentations;
}

/***/ }),

/***/ 11185:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  DicomUpload: () => (/* reexport */ DicomUpload_DicomUpload),
  Enums: () => (/* reexport */ enums),
  ImageOverlayViewerTool: () => (/* reexport */ tools_ImageOverlayViewerTool),
  PanelMeasurement: () => (/* reexport */ PanelMeasurementTable),
  PanelSegmentation: () => (/* reexport */ PanelSegmentation),
  Types: () => (/* reexport */ types_namespaceObject),
  "default": () => (/* binding */ cornerstone_src),
  dicomLoaderService: () => (/* reexport */ utils_dicomLoaderService),
  findNearbyToolData: () => (/* reexport */ findNearbyToolData),
  getActiveViewportEnabledElement: () => (/* reexport */ getActiveViewportEnabledElement),
  getEnabledElement: () => (/* reexport */ state/* getEnabledElement */.kJ),
  getSOPInstanceAttributes: () => (/* reexport */ getSOPInstanceAttributes),
  measurementMappingUtils: () => (/* reexport */ utils_namespaceObject),
  setEnabledElement: () => (/* reexport */ state/* setEnabledElement */.ye),
  toolNames: () => (/* reexport */ toolNames),
  useActiveViewportSegmentationRepresentations: () => (/* reexport */ useActiveViewportSegmentationRepresentations),
  useLutPresentationStore: () => (/* reexport */ useLutPresentationStore/* useLutPresentationStore */.I),
  useMeasurements: () => (/* reexport */ useMeasurements),
  usePositionPresentationStore: () => (/* reexport */ usePositionPresentationStore/* usePositionPresentationStore */.q),
  useSegmentationPresentationStore: () => (/* reexport */ useSegmentationPresentationStore/* useSegmentationPresentationStore */.v),
  useSegmentations: () => (/* reexport */ useSegmentations/* useSegmentations */.j),
  useSynchronizersStore: () => (/* reexport */ useSynchronizersStore/* useSynchronizersStore */.U)
});

// NAMESPACE OBJECT: ../../../extensions/cornerstone/src/enums.ts
var enums_namespaceObject = {};
__webpack_require__.r(enums_namespaceObject);
__webpack_require__.d(enums_namespaceObject, {
  rM: () => (CORNERSTONE_3D_TOOLS_SOURCE_NAME),
  yK: () => (CORNERSTONE_3D_TOOLS_SOURCE_VERSION),
  Ay: () => (enums)
});

// NAMESPACE OBJECT: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/index.ts
var utils_namespaceObject = {};
__webpack_require__.r(utils_namespaceObject);
__webpack_require__.d(utils_namespaceObject, {
  getDisplayUnit: () => (utils_getDisplayUnit),
  getFirstAnnotationSelected: () => (getFirstAnnotationSelected),
  getHandlesFromPoints: () => (getHandlesFromPoints),
  getSOPInstanceAttributes: () => (getSOPInstanceAttributes),
  isAnnotationSelected: () => (isAnnotationSelected),
  setAnnotationSelected: () => (setAnnotationSelected)
});

// NAMESPACE OBJECT: ../../../extensions/cornerstone/src/types/index.ts
var types_namespaceObject = {};
__webpack_require__.r(types_namespaceObject);

// EXTERNAL MODULE: ../../../node_modules/react/index.js
var react = __webpack_require__(86326);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/index.js
var esm = __webpack_require__(81985);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/index.js + 82 modules
var dist_esm = __webpack_require__(55139);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/enums.ts
const CORNERSTONE_3D_TOOLS_SOURCE_NAME = 'Cornerstone3DTools';
const CORNERSTONE_3D_TOOLS_SOURCE_VERSION = '0.1';
const Enums = {
  CORNERSTONE_3D_TOOLS_SOURCE_NAME,
  CORNERSTONE_3D_TOOLS_SOURCE_VERSION
};
/* harmony default export */ const enums = (Enums);
// EXTERNAL MODULE: ../../core/src/index.ts + 71 modules
var src = __webpack_require__(29463);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/loaders/index.js
var loaders = __webpack_require__(19742);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/RequestType.js
var RequestType = __webpack_require__(43213);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/dicom-image-loader/dist/esm/index.js + 76 modules
var dicom_image_loader_dist_esm = __webpack_require__(35485);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/initWADOImageLoader.js




const {
  registerVolumeLoader
} = esm.volumeLoader;
function initWADOImageLoader(userAuthenticationService, appConfig, extensionManager) {
  registerVolumeLoader('cornerstoneStreamingImageVolume', loaders/* cornerstoneStreamingImageVolumeLoader */.FC);
  registerVolumeLoader('cornerstoneStreamingDynamicImageVolume', loaders/* cornerstoneStreamingDynamicImageVolumeLoader */.Mr);
  dicom_image_loader_dist_esm/* default.init */.Ay.init({
    maxWebWorkers: Math.min(Math.max(navigator.hardwareConcurrency - 1, 1), appConfig.maxNumberOfWebWorkers),
    beforeSend: function (xhr) {
      //TODO should be removed in the future and request emitted by DicomWebDataSource
      const sourceConfig = extensionManager.getActiveDataSource()?.[0].getConfig() ?? {};
      const headers = userAuthenticationService.getAuthorizationHeader();
      const acceptHeader = src/* utils */.Wp.generateAcceptHeader(sourceConfig.acceptHeader, sourceConfig.requestTransferSyntaxUID, sourceConfig.omitQuotationForMultipartRequest);
      const xhrRequestHeaders = {
        Accept: acceptHeader
      };
      if (headers) {
        Object.assign(xhrRequestHeaders, headers);
      }
      return xhrRequestHeaders;
    },
    errorInterceptor: error => {
      src/* errorHandler */.r_.getHTTPErrorHandler(error);
    }
  });
}
function destroy() {
  console.debug('Destroying WADO Image Loader');
}
// EXTERNAL MODULE: ../../../extensions/default/src/index.ts + 114 modules
var default_src = __webpack_require__(71520);
// EXTERNAL MODULE: ../../../extensions/cornerstone/src/state.ts
var state = __webpack_require__(71353);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/getActiveViewportEnabledElement.ts


function getActiveViewportEnabledElement(viewportGridService) {
  const {
    activeViewportId
  } = viewportGridService.getState();
  const {
    element
  } = (0,state/* getEnabledElement */.kJ)(activeViewportId) || {};
  const enabledElement = (0,esm.getEnabledElement)(element);
  return enabledElement;
}
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/tools/CalibrationLineTool.ts



const {
  calibrateImageSpacing
} = dist_esm.utilities;

/**
 * Calibration Line tool works almost the same as the
 */
class CalibrationLineTool extends dist_esm.LengthTool {
  constructor(...args) {
    super(...args);
    this._renderingViewport = void 0;
    this._lengthToolRenderAnnotation = this.renderAnnotation;
    this.renderAnnotation = (enabledElement, svgDrawingHelper) => {
      const {
        viewport
      } = enabledElement;
      this._renderingViewport = viewport;
      return this._lengthToolRenderAnnotation(enabledElement, svgDrawingHelper);
    };
  }
  _getTextLines(data, targetId) {
    const [canvasPoint1, canvasPoint2] = data.handles.points.map(p => this._renderingViewport.worldToCanvas(p));
    // for display, round to 2 decimal points
    const lengthPx = Math.round(calculateLength2(canvasPoint1, canvasPoint2) * 100) / 100;
    const textLines = [`${lengthPx}px`];
    return textLines;
  }
}
CalibrationLineTool.toolName = 'CalibrationLine';
function calculateLength2(point1, point2) {
  const dx = point1[0] - point2[0];
  const dy = point1[1] - point2[1];
  return Math.sqrt(dx * dx + dy * dy);
}
function calculateLength3(pos1, pos2) {
  const dx = pos1[0] - pos2[0];
  const dy = pos1[1] - pos2[1];
  const dz = pos1[2] - pos2[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}
/* harmony default export */ const tools_CalibrationLineTool = (CalibrationLineTool);
function onCompletedCalibrationLine(servicesManager, csToolsEvent) {
  const {
    uiDialogService,
    viewportGridService
  } = servicesManager.services;

  // calculate length (mm) with the current Pixel Spacing
  const annotationAddedEventDetail = csToolsEvent.detail;
  const {
    annotation: {
      metadata,
      data: annotationData
    }
  } = annotationAddedEventDetail;
  const {
    referencedImageId: imageId
  } = metadata;
  const enabledElement = getActiveViewportEnabledElement(viewportGridService);
  const {
    viewport
  } = enabledElement;
  const length = Math.round(calculateLength3(annotationData.handles.points[0], annotationData.handles.points[1]) * 100) / 100;
  const adjustCalibration = newLength => {
    const spacingScale = newLength / length;

    // trigger resize of the viewport to adjust the world/pixel mapping
    calibrateImageSpacing(imageId, viewport.getRenderingEngine(), {
      type: 'User',
      scale: 1 / spacingScale
    });
  };
  return new Promise((resolve, reject) => {
    if (!uiDialogService) {
      reject('UIDialogService is not initiated');
      return;
    }
    (0,default_src.callInputDialog)(uiDialogService, {
      text: '',
      label: `${length}`
    }, (value, id) => {
      if (id === 'save') {
        adjustCalibration(Number.parseFloat(value));
        resolve(true);
      } else {
        reject('cancel');
      }
    }, false, {
      dialogTitle: 'Calibration',
      inputLabel: 'Actual Physical distance (mm)',
      // the input value must be a number
      validateFunc: val => {
        try {
          const v = Number.parseFloat(val);
          return !isNaN(v) && v !== 0.0;
        } catch {
          return false;
        }
      }
    });
  });
}
// EXTERNAL MODULE: ../../core/src/utils/index.ts + 29 modules
var utils = __webpack_require__(37415);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/tools/OverlayPlaneModuleProvider.ts

const _cachedOverlayMetadata = new Map();

/**
 * Image Overlay Viewer tool is not a traditional tool that requires user interactin.
 * But it is used to display Pixel Overlays. And it will provide toggling capability.
 *
 * The documentation for Overlay Plane Module of DICOM can be found in [C.9.2 of
 * Part-3 of DICOM standard](https://dicom.nema.org/medical/dicom/2018b/output/chtml/part03/sect_C.9.2.html)
 *
 * Image Overlay rendered by this tool can be toggled on and off using
 * toolGroup.setToolEnabled() and toolGroup.setToolDisabled()
 */
const OverlayPlaneModuleProvider = {
  /** Adds the metadata for overlayPlaneModule */
  add: (imageId, metadata) => {
    if (_cachedOverlayMetadata.get(imageId) === metadata) {
      // This is a no-op here as the tool re-caches the data
      return;
    }
    _cachedOverlayMetadata.set(imageId, metadata);
  },
  /** Standard getter for metadata */
  get: (type, query) => {
    if (Array.isArray(query)) {
      return;
    }
    if (type !== 'overlayPlaneModule') {
      return;
    }
    return _cachedOverlayMetadata.get(query);
  }
};

// Needs to be higher priority than default provider
esm.metaData.addProvider(OverlayPlaneModuleProvider.get, 10_000);
/* harmony default export */ const tools_OverlayPlaneModuleProvider = (OverlayPlaneModuleProvider);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/tools/ImageOverlayViewerTool.tsx




/**
 * Image Overlay Viewer tool is not a traditional tool that requires user interactin.
 * But it is used to display Pixel Overlays. And it will provide toggling capability.
 *
 * The documentation for Overlay Plane Module of DICOM can be found in [C.9.2 of
 * Part-3 of DICOM standard](https://dicom.nema.org/medical/dicom/2018b/output/chtml/part03/sect_C.9.2.html)
 *
 * Image Overlay rendered by this tool can be toggled on and off using
 * toolGroup.setToolEnabled() and toolGroup.setToolDisabled()
 */
class ImageOverlayViewerTool extends dist_esm.AnnotationDisplayTool {
  constructor(toolProps = {}, defaultToolProps = {
    supportedInteractionTypes: [],
    configuration: {
      fillColor: [255, 127, 127, 255]
    }
  }) {
    super(toolProps, defaultToolProps);
    this.onSetToolDisabled = () => {};
    this.renderAnnotation = (enabledElement, svgDrawingHelper) => {
      const {
        viewport
      } = enabledElement;
      const imageId = this.getReferencedImageId(viewport);
      if (!imageId) {
        return;
      }
      const overlayMetadata = esm.metaData.get('overlayPlaneModule', imageId);
      const overlays = overlayMetadata?.overlays;

      // no overlays
      if (!overlays?.length) {
        return;
      }

      // Fix the x, y positions
      overlays.forEach(overlay => {
        overlay.x ||= 0;
        overlay.y ||= 0;
      });

      // Will clear cached stat data when the overlay data changes
      ImageOverlayViewerTool.addOverlayPlaneModule(imageId, overlayMetadata);
      this._getCachedStat(imageId, overlayMetadata, this.configuration.fillColor).then(cachedStat => {
        cachedStat.overlays.forEach(overlay => {
          this._renderOverlay(enabledElement, svgDrawingHelper, overlay);
        });
      });
      return true;
    };
  }
  getReferencedImageId(viewport) {
    if (viewport instanceof esm.VolumeViewport) {
      return;
    }
    const targetId = this.getTargetId(viewport);
    return targetId.split('imageId:')[1];
  }
  /**
   * Render to DOM
   *
   * @param enabledElement
   * @param svgDrawingHelper
   * @param overlayData
   * @returns
   */
  _renderOverlay(enabledElement, svgDrawingHelper, overlayData) {
    const {
      viewport
    } = enabledElement;
    const imageId = this.getReferencedImageId(viewport);
    if (!imageId) {
      return;
    }

    // Decide the rendering position of the overlay image on the current canvas
    const {
      _id,
      columns: width,
      rows: height,
      x,
      y
    } = overlayData;
    const overlayTopLeftWorldPos = esm.utilities.imageToWorldCoords(imageId, [x - 1,
    // Remind that top-left corner's (x, y) is be (1, 1)
    y - 1]);
    const overlayTopLeftOnCanvas = viewport.worldToCanvas(overlayTopLeftWorldPos);
    const overlayBottomRightWorldPos = esm.utilities.imageToWorldCoords(imageId, [width, height]);
    const overlayBottomRightOnCanvas = viewport.worldToCanvas(overlayBottomRightWorldPos);

    // add image to the annotations svg layer
    const svgns = 'http://www.w3.org/2000/svg';
    const svgNodeHash = `image-overlay-${_id}`;
    const existingImageElement = svgDrawingHelper.getSvgNode(svgNodeHash);
    const attributes = {
      'data-id': svgNodeHash,
      width: overlayBottomRightOnCanvas[0] - overlayTopLeftOnCanvas[0],
      height: overlayBottomRightOnCanvas[1] - overlayTopLeftOnCanvas[1],
      x: overlayTopLeftOnCanvas[0],
      y: overlayTopLeftOnCanvas[1],
      href: overlayData.dataUrl
    };
    if (isNaN(attributes.x) || isNaN(attributes.y) || isNaN(attributes.width) || isNaN(attributes.height)) {
      console.warn('Invalid rendering attribute for image overlay', attributes['data-id']);
      return false;
    }
    if (existingImageElement) {
      dist_esm.drawing.setAttributesIfNecessary(attributes, existingImageElement);
      svgDrawingHelper.setNodeTouched(svgNodeHash);
    } else {
      const newImageElement = document.createElementNS(svgns, 'image');
      dist_esm.drawing.setNewAttributesIfValid(attributes, newImageElement);
      svgDrawingHelper.appendNode(newImageElement, svgNodeHash);
    }
    return true;
  }
  async _getCachedStat(imageId, overlayMetadata, color) {
    const missingOverlay = overlayMetadata.overlays.filter(overlay => overlay.pixelData && !overlay.dataUrl);
    if (missingOverlay.length === 0) {
      return overlayMetadata;
    }
    const overlays = await Promise.all(overlayMetadata.overlays.filter(overlay => overlay.pixelData).map(async (overlay, idx) => {
      let pixelData = null;
      if (overlay.pixelData.Value) {
        pixelData = overlay.pixelData.Value;
      } else if (overlay.pixelData instanceof Array) {
        pixelData = overlay.pixelData[0];
      } else if (overlay.pixelData.retrieveBulkData) {
        pixelData = await overlay.pixelData.retrieveBulkData();
      } else if (overlay.pixelData.InlineBinary) {
        const blob = (0,utils/* b64toBlob */.Vk)(overlay.pixelData.InlineBinary);
        const arrayBuffer = await blob.arrayBuffer();
        pixelData = arrayBuffer;
      }
      if (!pixelData) {
        return;
      }
      const dataUrl = this._renderOverlayToDataUrl({
        width: overlay.columns,
        height: overlay.rows
      }, overlay.color || color, pixelData);
      return {
        ...overlay,
        _id: (0,utils/* guid */.Os)(),
        dataUrl,
        // this will be a data url expression of the rendered image
        color
      };
    }));
    overlayMetadata.overlays = overlays;
    return overlayMetadata;
  }

  /**
   * compare two RGBA expression of colors.
   *
   * @param color1
   * @param color2
   * @returns
   */
  _isSameColor(color1, color2) {
    return color1 && color2 && color1[0] === color2[0] && color1[1] === color2[1] && color1[2] === color2[2] && color1[3] === color2[3];
  }

  /**
   * pixelData of overlayPlane module is an array of bits corresponding
   * to each of the underlying pixels of the image.
   * Let's create pixel data from bit array of overlay data
   *
   * @param pixelDataRaw
   * @param color
   * @returns
   */
  _renderOverlayToDataUrl({
    width,
    height
  }, color, pixelDataRaw) {
    const pixelDataView = new DataView(pixelDataRaw);
    const totalBits = width * height;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height); // make it transparent
    ctx.globalCompositeOperation = 'copy';
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0, bitIdx = 0, byteIdx = 0; i < totalBits; i++) {
      if (pixelDataView.getUint8(byteIdx) & 1 << bitIdx) {
        data[i * 4] = color[0];
        data[i * 4 + 1] = color[1];
        data[i * 4 + 2] = color[2];
        data[i * 4 + 3] = color[3];
      }

      // next bit, byte
      if (bitIdx >= 7) {
        bitIdx = 0;
        byteIdx++;
      } else {
        bitIdx++;
      }
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  }
}
ImageOverlayViewerTool.toolName = 'ImageOverlayViewer';
/**
 * The overlay plane module provider add method is exposed here to be used
 * when updating the overlay for this tool to use for displaying data.
 */
ImageOverlayViewerTool.addOverlayPlaneModule = tools_OverlayPlaneModuleProvider.add;
/* harmony default export */ const tools_ImageOverlayViewerTool = (ImageOverlayViewerTool);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/initCornerstoneTools.js



function initCornerstoneTools(configuration = {}) {
  dist_esm.CrosshairsTool.isAnnotation = false;
  dist_esm.ReferenceLinesTool.isAnnotation = false;
  dist_esm.AdvancedMagnifyTool.isAnnotation = false;
  dist_esm.PlanarFreehandContourSegmentationTool.isAnnotation = false;
  (0,dist_esm.init)(configuration);
  (0,dist_esm.addTool)(dist_esm.PanTool);
  (0,dist_esm.addTool)(dist_esm.WindowLevelTool);
  (0,dist_esm.addTool)(dist_esm.StackScrollTool);
  (0,dist_esm.addTool)(dist_esm.VolumeRotateTool);
  (0,dist_esm.addTool)(dist_esm.ZoomTool);
  (0,dist_esm.addTool)(dist_esm.ProbeTool);
  (0,dist_esm.addTool)(dist_esm.MIPJumpToClickTool);
  (0,dist_esm.addTool)(dist_esm.LengthTool);
  (0,dist_esm.addTool)(dist_esm.RectangleROITool);
  (0,dist_esm.addTool)(dist_esm.RectangleROIThresholdTool);
  (0,dist_esm.addTool)(dist_esm.EllipticalROITool);
  (0,dist_esm.addTool)(dist_esm.CircleROITool);
  (0,dist_esm.addTool)(dist_esm.BidirectionalTool);
  (0,dist_esm.addTool)(dist_esm.ArrowAnnotateTool);
  (0,dist_esm.addTool)(dist_esm.DragProbeTool);
  (0,dist_esm.addTool)(dist_esm.AngleTool);
  (0,dist_esm.addTool)(dist_esm.CobbAngleTool);
  (0,dist_esm.addTool)(dist_esm.MagnifyTool);
  (0,dist_esm.addTool)(dist_esm.CrosshairsTool);
  (0,dist_esm.addTool)(dist_esm.RectangleScissorsTool);
  (0,dist_esm.addTool)(dist_esm.SphereScissorsTool);
  (0,dist_esm.addTool)(dist_esm.CircleScissorsTool);
  (0,dist_esm.addTool)(dist_esm.BrushTool);
  (0,dist_esm.addTool)(dist_esm.PaintFillTool);
  (0,dist_esm.addTool)(dist_esm.ReferenceLinesTool);
  (0,dist_esm.addTool)(tools_CalibrationLineTool);
  (0,dist_esm.addTool)(dist_esm.TrackballRotateTool);
  (0,dist_esm.addTool)(tools_ImageOverlayViewerTool);
  (0,dist_esm.addTool)(dist_esm.AdvancedMagnifyTool);
  (0,dist_esm.addTool)(dist_esm.UltrasoundDirectionalTool);
  (0,dist_esm.addTool)(dist_esm.PlanarFreehandROITool);
  (0,dist_esm.addTool)(dist_esm.SplineROITool);
  (0,dist_esm.addTool)(dist_esm.LivewireContourTool);
  (0,dist_esm.addTool)(dist_esm.OrientationMarkerTool);
  (0,dist_esm.addTool)(dist_esm.WindowLevelRegionTool);
  (0,dist_esm.addTool)(dist_esm.PlanarFreehandContourSegmentationTool);

  // Modify annotation tools to use dashed lines on SR
  const annotationStyle = {
    textBoxFontSize: '15px',
    lineWidth: '1.5'
  };
  const defaultStyles = dist_esm.annotation.config.style.getDefaultToolStyles();
  dist_esm.annotation.config.style.setDefaultToolStyles({
    global: {
      ...defaultStyles.global,
      ...annotationStyle
    }
  });
}
const toolNames = {
  Pan: dist_esm.PanTool.toolName,
  ArrowAnnotate: dist_esm.ArrowAnnotateTool.toolName,
  WindowLevel: dist_esm.WindowLevelTool.toolName,
  StackScroll: dist_esm.StackScrollTool.toolName,
  Zoom: dist_esm.ZoomTool.toolName,
  VolumeRotate: dist_esm.VolumeRotateTool.toolName,
  MipJumpToClick: dist_esm.MIPJumpToClickTool.toolName,
  Length: dist_esm.LengthTool.toolName,
  DragProbe: dist_esm.DragProbeTool.toolName,
  Probe: dist_esm.ProbeTool.toolName,
  RectangleROI: dist_esm.RectangleROITool.toolName,
  RectangleROIThreshold: dist_esm.RectangleROIThresholdTool.toolName,
  EllipticalROI: dist_esm.EllipticalROITool.toolName,
  CircleROI: dist_esm.CircleROITool.toolName,
  Bidirectional: dist_esm.BidirectionalTool.toolName,
  Angle: dist_esm.AngleTool.toolName,
  CobbAngle: dist_esm.CobbAngleTool.toolName,
  Magnify: dist_esm.MagnifyTool.toolName,
  Crosshairs: dist_esm.CrosshairsTool.toolName,
  Brush: dist_esm.BrushTool.toolName,
  PaintFill: dist_esm.PaintFillTool.toolName,
  ReferenceLines: dist_esm.ReferenceLinesTool.toolName,
  CalibrationLine: tools_CalibrationLineTool.toolName,
  TrackballRotateTool: dist_esm.TrackballRotateTool.toolName,
  CircleScissors: dist_esm.CircleScissorsTool.toolName,
  RectangleScissors: dist_esm.RectangleScissorsTool.toolName,
  SphereScissors: dist_esm.SphereScissorsTool.toolName,
  ImageOverlayViewer: tools_ImageOverlayViewerTool.toolName,
  AdvancedMagnify: dist_esm.AdvancedMagnifyTool.toolName,
  UltrasoundDirectional: dist_esm.UltrasoundDirectionalTool.toolName,
  SplineROI: dist_esm.SplineROITool.toolName,
  LivewireContour: dist_esm.LivewireContourTool.toolName,
  PlanarFreehandROI: dist_esm.PlanarFreehandROITool.toolName,
  OrientationMarker: dist_esm.OrientationMarkerTool.toolName,
  WindowLevelRegion: dist_esm.WindowLevelRegionTool.toolName,
  PlanarFreehandContourSegmentation: dist_esm.PlanarFreehandContourSegmentationTool.toolName
};

;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/constants/supportedTools.js
const supportedTools = ['Length', 'EllipticalROI', 'CircleROI', 'Bidirectional', 'ArrowAnnotate', 'Angle', 'CobbAngle', 'Probe', 'RectangleROI', 'PlanarFreehandROI', 'SplineROI', 'LivewireContour', 'UltrasoundDirectionalTool', 'SCOORD3DPoint'];
/* harmony default export */ const constants_supportedTools = (supportedTools);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/stateManagement/annotation/index.js + 1 modules
var stateManagement_annotation = __webpack_require__(47807);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getIsLocked.ts

const getIsLocked = annotationUID => {
  return stateManagement_annotation.locking.isAnnotationLocked(annotationUID);
};
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getIsVisible.ts

const getIsVisible = annotationUID => {
  const isVisible = stateManagement_annotation.visibility.isAnnotationVisible(annotationUID);
  return isVisible;
};
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getSOPInstanceAttributes.js


/**
 * It checks if the imageId is provided then it uses it to query
 * the metadata and get the SOPInstanceUID, SeriesInstanceUID and StudyInstanceUID.
 * If the imageId is not provided then undefined is returned.
 * @param {string} imageId The image id of the referenced image
 * @returns
 */
function getSOPInstanceAttributes(imageId, displaySetService, annotation) {
  if (imageId) {
    return _getUIDFromImageID(imageId);
  }
  const {
    metadata
  } = annotation;
  const {
    volumeId
  } = metadata;
  const displaySet = displaySetService.getDisplaySetsBy(displaySet => volumeId.includes(displaySet.uid))[0];
  const {
    StudyInstanceUID,
    SeriesInstanceUID
  } = displaySet;
  return {
    SOPInstanceUID: undefined,
    SeriesInstanceUID,
    StudyInstanceUID
  };
}
function _getUIDFromImageID(imageId) {
  const instance = esm.metaData.get('instance', imageId);
  return {
    SOPInstanceUID: instance.SOPInstanceUID,
    SeriesInstanceUID: instance.SeriesInstanceUID,
    StudyInstanceUID: instance.StudyInstanceUID,
    frameNumber: instance.frameNumber || 1
  };
}
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/Length.ts






const Length = {
  toAnnotation: measurement => {},
  /**
   * Maps cornerstone annotation event data to measurement service format.
   *
   * @param {Object} cornerstone Cornerstone event data
   * @return {Measurement} Measurement instance
   */
  toMeasurement: (csToolsEventDetail, displaySetService, cornerstoneViewportService, getValueTypeFromToolType, customizationService) => {
    const {
      annotation
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    const isLocked = getIsLocked(annotationUID);
    const isVisible = getIsVisible(annotationUID);
    const colorString = stateManagement_annotation.config.style.getStyleProperty('color', {
      annotationUID
    });

    // color string is like 'rgb(255, 255, 255)' we need them to be in RGBA array [255, 255, 255, 255]
    // Todo: this should be in a utility
    // const color = colorString.replace('rgb(', '').replace(')', '').split(',').map(Number);

    if (!metadata || !data) {
      console.warn('Length tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = constants_supportedTools.includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
    }
    const {
      points,
      textBox
    } = data.handles;
    const mappedAnnotations = getMappedAnnotations(annotation, displaySetService);
    const displayText = getDisplayText(mappedAnnotations, displaySet);
    const getReport = () => _getReport(mappedAnnotations, points, FrameOfReferenceUID, customizationService);
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points,
      textBox,
      isLocked,
      isVisible,
      metadata,
      // color,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      referencedImageId,
      frameNumber: mappedAnnotations[0]?.frameNumber || 1,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.label,
      displayText: displayText,
      data: data.cachedStats,
      type: getValueTypeFromToolType(toolName),
      getReport
    };
  }
};
function getMappedAnnotations(annotation, displaySetService) {
  const {
    metadata,
    data
  } = annotation;
  const {
    cachedStats
  } = data;
  const {
    referencedImageId
  } = metadata;
  const targets = Object.keys(cachedStats);
  if (!targets.length) {
    return [];
  }
  const annotations = [];
  Object.keys(cachedStats).forEach(targetId => {
    const targetStats = cachedStats[targetId];
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      frameNumber
    } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
    const displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
    const {
      SeriesNumber
    } = displaySet;
    const {
      length,
      unit = 'mm'
    } = targetStats;
    annotations.push({
      SeriesInstanceUID,
      SOPInstanceUID,
      SeriesNumber,
      frameNumber,
      unit,
      length
    });
  });
  return annotations;
}

/*
This function is used to convert the measurement data to a format that is
suitable for the report generation (e.g. for the csv report). The report
returns a list of columns and corresponding values.
*/
function _getReport(mappedAnnotations, points, FrameOfReferenceUID, customizationService) {
  const columns = [];
  const values = [];

  // Add Type
  columns.push('AnnotationType');
  values.push('Cornerstone:Length');
  mappedAnnotations.forEach(annotation => {
    const {
      length,
      unit
    } = annotation;
    columns.push(`Length`);
    values.push(length);
    columns.push('Unit');
    values.push(unit);
  });
  if (FrameOfReferenceUID) {
    columns.push('FrameOfReferenceUID');
    values.push(FrameOfReferenceUID);
  }
  if (points) {
    columns.push('points');
    // points has the form of [[x1, y1, z1], [x2, y2, z2], ...]
    // convert it to string of [[x1 y1 z1];[x2 y2 z2];...]
    // so that it can be used in the csv report
    values.push(points.map(p => p.join(' ')).join(';'));
  }
  return {
    columns,
    values
  };
}
function getDisplayText(mappedAnnotations, displaySet) {
  const displayText = {
    primary: [],
    secondary: []
  };
  if (!mappedAnnotations || !mappedAnnotations.length) {
    return displayText;
  }

  // Length is the same for all series
  const {
    length,
    SeriesNumber,
    SOPInstanceUID,
    frameNumber,
    unit
  } = mappedAnnotations[0];
  const instance = displaySet.instances.find(image => image.SOPInstanceUID === SOPInstanceUID);
  let InstanceNumber;
  if (instance) {
    InstanceNumber = instance.InstanceNumber;
  }
  const instanceText = InstanceNumber ? ` I: ${InstanceNumber}` : '';
  const frameText = displaySet.isMultiFrame ? ` F: ${frameNumber}` : '';
  if (length === null || length === undefined) {
    return displayText;
  }
  const roundedLength = src/* utils */.Wp.roundNumber(length, 2);
  displayText.primary.push(`${roundedLength} ${unit}`);
  displayText.secondary.push(`S: ${SeriesNumber}${instanceText}${frameText}`);
  return displayText;
}
/* harmony default export */ const measurementServiceMappings_Length = (Length);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getHandlesFromPoints.js
function getHandlesFromPoints(points) {
  if (points.longAxis && points.shortAxis) {
    const handles = {};
    handles.start = points.longAxis[0];
    handles.end = points.longAxis[1];
    handles.perpendicularStart = points.longAxis[0];
    handles.perpendicularEnd = points.longAxis[1];
    return handles;
  }
  return points.map((p, i) => i % 10 === 0 ? {
    start: p
  } : {
    end: p
  }).reduce((obj, item) => Object.assign(obj, {
    ...item
  }), {});
}
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/selection.ts


/**
 * Check whether an annotation from imaging library is selected or not.
 * @param {string} annotationUID uid of imaging library annotation
 * @returns boolean
 */
function isAnnotationSelected(annotationUID) {
  return dist_esm.annotation.selection.isAnnotationSelected(annotationUID);
}

/**
 * Change an annotation from imaging library's selected property.
 * @param annotationUID - uid of imaging library annotation
 * @param selected - new value for selected
 */
function setAnnotationSelected(annotationUID, selected) {
  const isCurrentSelected = isAnnotationSelected(annotationUID);
  // branch cut, avoid invoking imaging library unnecessarily.
  if (isCurrentSelected !== selected) {
    dist_esm.annotation.selection.setAnnotationSelected(annotationUID, selected);
  }
}
function getFirstAnnotationSelected(element) {
  const [selectedAnnotationUID] = dist_esm.annotation.selection.getAnnotationsSelected() || [];
  if (selectedAnnotationUID) {
    return dist_esm.annotation.state.getAnnotation(selectedAnnotationUID);
  }
}

;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getDisplayUnit.js
const getDisplayUnit = unit => unit == null ? '' : unit;
/* harmony default export */ const utils_getDisplayUnit = (getDisplayUnit);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/index.ts





;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/Bidirectional.ts






const Bidirectional = {
  toAnnotation: measurement => {},
  toMeasurement: (csToolsEventDetail, displaySetService, cornerstoneViewportService, getValueTypeFromToolType, customizationService) => {
    const {
      annotation
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    const isLocked = getIsLocked(annotationUID);
    const isVisible = getIsVisible(annotationUID);
    if (!metadata || !data) {
      console.warn('Length tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = constants_supportedTools.includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
    }
    const {
      points,
      textBox
    } = data.handles;
    const mappedAnnotations = Bidirectional_getMappedAnnotations(annotation, displaySetService);
    const displayText = Bidirectional_getDisplayText(mappedAnnotations, displaySet);
    const getReport = () => Bidirectional_getReport(mappedAnnotations, points, FrameOfReferenceUID, customizationService);
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points,
      textBox,
      isLocked,
      isVisible,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      referencedImageId,
      frameNumber: mappedAnnotations[0]?.frameNumber || 1,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.label,
      displayText: displayText,
      data: data.cachedStats,
      type: getValueTypeFromToolType(toolName),
      getReport
    };
  }
};
function Bidirectional_getMappedAnnotations(annotation, displaySetService) {
  const {
    metadata,
    data
  } = annotation;
  const {
    cachedStats
  } = data;
  const {
    referencedImageId,
    referencedSeriesInstanceUID
  } = metadata;
  const targets = Object.keys(cachedStats);
  if (!targets.length) {
    return [];
  }
  const annotations = [];
  Object.keys(cachedStats).forEach(targetId => {
    const targetStats = cachedStats[targetId];
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      frameNumber
    } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
    const displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
    const {
      SeriesNumber
    } = displaySet;
    const {
      length,
      width,
      unit
    } = targetStats;
    annotations.push({
      SeriesInstanceUID,
      SOPInstanceUID,
      SeriesNumber,
      frameNumber,
      unit,
      length,
      width
    });
  });
  return annotations;
}

/*
This function is used to convert the measurement data to a format that is
suitable for the report generation (e.g. for the csv report). The report
returns a list of columns and corresponding values.
*/
function Bidirectional_getReport(mappedAnnotations, points, FrameOfReferenceUID, customizationService) {
  const columns = [];
  const values = [];

  // Add Type
  columns.push('AnnotationType');
  values.push('Cornerstone:Bidirectional');
  mappedAnnotations.forEach(annotation => {
    const {
      length,
      width,
      unit
    } = annotation;
    columns.push(`Length`, `Width`, 'Unit');
    values.push(length, width, unit);
  });
  if (FrameOfReferenceUID) {
    columns.push('FrameOfReferenceUID');
    values.push(FrameOfReferenceUID);
  }
  if (points) {
    columns.push('points');
    // points has the form of [[x1, y1, z1], [x2, y2, z2], ...]
    // convert it to string of [[x1 y1 z1];[x2 y2 z2];...]
    // so that it can be used in the csv report
    values.push(points.map(p => p.join(' ')).join(';'));
  }
  return {
    columns,
    values
  };
}
function Bidirectional_getDisplayText(mappedAnnotations, displaySet) {
  const displayText = {
    primary: [],
    secondary: []
  };
  if (!mappedAnnotations || !mappedAnnotations.length) {
    return displayText;
  }

  // Area is the same for all series
  const {
    length,
    width,
    unit,
    SeriesNumber,
    SOPInstanceUID,
    frameNumber
  } = mappedAnnotations[0];
  const roundedLength = src/* utils */.Wp.roundNumber(length, 2);
  const roundedWidth = src/* utils */.Wp.roundNumber(width, 2);
  const instance = displaySet.instances.find(image => image.SOPInstanceUID === SOPInstanceUID);
  let InstanceNumber;
  if (instance) {
    InstanceNumber = instance.InstanceNumber;
  }
  const instanceText = InstanceNumber ? ` I: ${InstanceNumber}` : '';
  const frameText = displaySet.isMultiFrame ? ` F: ${frameNumber}` : '';
  displayText.primary.push(`L: ${roundedLength} ${utils_getDisplayUnit(unit)}`);
  displayText.primary.push(`W: ${roundedWidth} ${utils_getDisplayUnit(unit)}`);
  displayText.secondary.push(`S: ${SeriesNumber}${instanceText}${frameText}`);
  return displayText;
}
/* harmony default export */ const measurementServiceMappings_Bidirectional = (Bidirectional);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/utils/getValueDisplayString.js


const getStatisticDisplayString = (numbers, unit, key) => {
  if (Array.isArray(numbers) && numbers.length > 0) {
    const results = numbers.map(number => src/* utils */.Wp.roundNumber(number, 2));
    return `${key.charAt(0).toUpperCase() + key.slice(1)}: ${results.join(', ')} ${utils_getDisplayUnit(unit)}`;
  }
  const result = src/* utils */.Wp.roundNumber(numbers, 2);
  return `${key.charAt(0).toUpperCase() + key.slice(1)}: ${result} ${utils_getDisplayUnit(unit)}`;
};
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/EllipticalROI.ts







const EllipticalROI = {
  toAnnotation: measurement => {},
  toMeasurement: (csToolsEventDetail, displaySetService, cornerstoneViewportService, getValueTypeFromToolType, customizationService) => {
    const {
      annotation
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    const isLocked = getIsLocked(annotationUID);
    const isVisible = getIsVisible(annotationUID);
    if (!metadata || !data) {
      console.warn('Length tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = constants_supportedTools.includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
    }
    const {
      points,
      textBox
    } = data.handles;
    const mappedAnnotations = EllipticalROI_getMappedAnnotations(annotation, displaySetService);
    const displayText = EllipticalROI_getDisplayText(mappedAnnotations, displaySet, customizationService);
    const getReport = () => EllipticalROI_getReport(mappedAnnotations, points, FrameOfReferenceUID, customizationService);
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points,
      textBox,
      metadata,
      isLocked,
      isVisible,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      referencedImageId,
      frameNumber: mappedAnnotations[0]?.frameNumber || 1,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.label,
      displayText: displayText,
      data: data.cachedStats,
      type: getValueTypeFromToolType(toolName),
      getReport
    };
  }
};
function EllipticalROI_getMappedAnnotations(annotation, displaySetService) {
  const {
    metadata,
    data
  } = annotation;
  const {
    cachedStats
  } = data;
  const {
    referencedImageId
  } = metadata;
  const targets = Object.keys(cachedStats);
  if (!targets.length) {
    return [];
  }
  const annotations = [];
  Object.keys(cachedStats).forEach(targetId => {
    const targetStats = cachedStats[targetId];
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      frameNumber
    } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
    const displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
    const {
      SeriesNumber
    } = displaySet;
    const {
      mean,
      stdDev,
      max,
      area,
      Modality,
      areaUnit,
      modalityUnit
    } = targetStats;
    annotations.push({
      SeriesInstanceUID,
      SOPInstanceUID,
      SeriesNumber,
      frameNumber,
      Modality,
      unit: modalityUnit,
      areaUnit,
      mean,
      stdDev,
      max,
      area
    });
  });
  return annotations;
}

/*
This function is used to convert the measurement data to a format that is
suitable for the report generation (e.g. for the csv report). The report
returns a list of columns and corresponding values.
*/
function EllipticalROI_getReport(mappedAnnotations, points, FrameOfReferenceUID, customizationService) {
  const columns = [];
  const values = [];

  // Add Type
  columns.push('AnnotationType');
  values.push('Cornerstone:EllipticalROI');
  mappedAnnotations.forEach(annotation => {
    const {
      mean,
      stdDev,
      max,
      area,
      unit,
      areaUnit
    } = annotation;
    if (!mean || !unit || !max || !area) {
      return;
    }
    columns.push(`max (${unit})`, `mean (${unit})`, `std (${unit})`, 'Area', 'Unit');
    values.push(max, mean, stdDev, area, areaUnit);
  });
  if (FrameOfReferenceUID) {
    columns.push('FrameOfReferenceUID');
    values.push(FrameOfReferenceUID);
  }
  if (points) {
    columns.push('points');
    // points has the form of [[x1, y1, z1], [x2, y2, z2], ...]
    // convert it to string of [[x1 y1 z1];[x2 y2 z2];...]
    // so that it can be used in the csv report
    values.push(points.map(p => p.join(' ')).join(';'));
  }
  return {
    columns,
    values
  };
}
function EllipticalROI_getDisplayText(mappedAnnotations, displaySet, customizationService) {
  const displayText = {
    primary: [],
    secondary: []
  };
  if (!mappedAnnotations || !mappedAnnotations.length) {
    return displayText;
  }

  // Area is the same for all series
  const {
    area,
    SOPInstanceUID,
    frameNumber,
    areaUnit
  } = mappedAnnotations[0];
  const instance = displaySet.instances.find(image => image.SOPInstanceUID === SOPInstanceUID);
  let InstanceNumber;
  if (instance) {
    InstanceNumber = instance.InstanceNumber;
  }
  const instanceText = InstanceNumber ? ` I: ${InstanceNumber}` : '';
  const frameText = displaySet.isMultiFrame ? ` F: ${frameNumber}` : '';
  const roundedArea = src/* utils */.Wp.roundNumber(area, 2);
  displayText.primary.push(`${roundedArea} ${utils_getDisplayUnit(areaUnit)}`);

  // Todo: we need a better UI for displaying all these information
  mappedAnnotations.forEach(mappedAnnotation => {
    const {
      unit,
      max,
      SeriesNumber
    } = mappedAnnotation;
    const maxStr = getStatisticDisplayString(max, unit, 'max');
    displayText.primary.push(maxStr);
    displayText.secondary.push(`S: ${SeriesNumber}${instanceText}${frameText}`);
  });
  return displayText;
}
/* harmony default export */ const measurementServiceMappings_EllipticalROI = (EllipticalROI);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/CircleROI.ts







const CircleROI = {
  toAnnotation: measurement => {},
  toMeasurement: (csToolsEventDetail, displaySetService, CornerstoneViewportService, getValueTypeFromToolType, customizationService) => {
    const {
      annotation
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    const isLocked = getIsLocked(annotationUID);
    const isVisible = getIsVisible(annotationUID);
    if (!metadata || !data) {
      console.warn('Length tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = constants_supportedTools.includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
    }
    const {
      points,
      textBox
    } = data.handles;
    const mappedAnnotations = CircleROI_getMappedAnnotations(annotation, displaySetService);
    const displayText = CircleROI_getDisplayText(mappedAnnotations, displaySet);
    const getReport = () => CircleROI_getReport(mappedAnnotations, points, FrameOfReferenceUID, customizationService);
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points,
      textBox,
      isLocked,
      isVisible,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      referencedImageId,
      frameNumber: mappedAnnotations[0]?.frameNumber || 1,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.label,
      displayText: displayText,
      data: data.cachedStats,
      type: getValueTypeFromToolType(toolName),
      getReport
    };
  }
};
function CircleROI_getMappedAnnotations(annotation, displaySetService) {
  const {
    metadata,
    data
  } = annotation;
  const {
    cachedStats
  } = data;
  const {
    referencedImageId
  } = metadata;
  const targets = Object.keys(cachedStats);
  if (!targets.length) {
    return [];
  }
  const annotations = [];
  Object.keys(cachedStats).forEach(targetId => {
    const targetStats = cachedStats[targetId];
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      frameNumber
    } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
    const displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
    const {
      SeriesNumber
    } = displaySet;
    const {
      mean,
      stdDev,
      max,
      area,
      Modality,
      areaUnit,
      modalityUnit
    } = targetStats;
    annotations.push({
      SeriesInstanceUID,
      SOPInstanceUID,
      SeriesNumber,
      frameNumber,
      Modality,
      unit: modalityUnit,
      mean,
      stdDev,
      max,
      area,
      areaUnit
    });
  });
  return annotations;
}

/*
This function is used to convert the measurement data to a format that is
suitable for the report generation (e.g. for the csv report). The report
returns a list of columns and corresponding values.
*/
function CircleROI_getReport(mappedAnnotations, points, FrameOfReferenceUID, customizationService) {
  const columns = [];
  const values = [];

  // Add Type
  columns.push('AnnotationType');
  values.push('Cornerstone:CircleROI');
  mappedAnnotations.forEach(annotation => {
    const {
      mean,
      stdDev,
      max,
      area,
      unit,
      areaUnit
    } = annotation;
    if (!mean || !unit || !max || !area) {
      return;
    }
    columns.push(`max (${unit})`, `mean (${unit})`, `std (${unit})`, 'Area', 'Unit');
    values.push(max, mean, stdDev, area, areaUnit);
  });
  if (FrameOfReferenceUID) {
    columns.push('FrameOfReferenceUID');
    values.push(FrameOfReferenceUID);
  }
  if (points) {
    columns.push('points');
    // points has the form of [[x1, y1, z1], [x2, y2, z2], ...]
    // convert it to string of [[x1 y1 z1];[x2 y2 z2];...]
    // so that it can be used in the csv report
    values.push(points.map(p => p.join(' ')).join(';'));
  }
  return {
    columns,
    values
  };
}
function CircleROI_getDisplayText(mappedAnnotations, displaySet) {
  const displayText = {
    primary: [],
    secondary: []
  };
  if (!mappedAnnotations || !mappedAnnotations.length) {
    return displayText;
  }

  // Area is the same for all series
  const {
    area,
    SOPInstanceUID,
    frameNumber,
    areaUnit
  } = mappedAnnotations[0];
  const instance = displaySet.instances.find(image => image.SOPInstanceUID === SOPInstanceUID);
  let InstanceNumber;
  if (instance) {
    InstanceNumber = instance.InstanceNumber;
  }
  const instanceText = InstanceNumber ? ` I: ${InstanceNumber}` : '';
  const frameText = displaySet.isMultiFrame ? ` F: ${frameNumber}` : '';

  // Area sometimes becomes undefined if `preventHandleOutsideImage` is off.
  const roundedArea = src/* utils */.Wp.roundNumber(area || 0, 2);
  displayText.primary.push(`${roundedArea} ${utils_getDisplayUnit(areaUnit)}`);

  // Todo: we need a better UI for displaying all these information
  mappedAnnotations.forEach(mappedAnnotation => {
    const {
      unit,
      max,
      SeriesNumber
    } = mappedAnnotation;
    const maxStr = getStatisticDisplayString(max, unit, 'max');
    displayText.primary.push(maxStr);
    displayText.secondary.push(`S: ${SeriesNumber}${instanceText}${frameText}`);
  });
  return displayText;
}
/* harmony default export */ const measurementServiceMappings_CircleROI = (CircleROI);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/ArrowAnnotate.ts




const ArrowAnnotate_Length = {
  toAnnotation: measurement => {},
  /**
   * Maps cornerstone annotation event data to measurement service format.
   *
   * @param {Object} cornerstone Cornerstone event data
   * @return {Measurement} Measurement instance
   */
  toMeasurement: (csToolsEventDetail, displaySetService, cornerstoneViewportService, getValueTypeFromToolType, customizationService) => {
    const {
      annotation
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    const isLocked = getIsLocked(annotationUID);
    const isVisible = getIsVisible(annotationUID);
    if (!metadata || !data) {
      console.warn('Length tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = constants_supportedTools.includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
    }
    const {
      points,
      textBox
    } = data.handles;
    const mappedAnnotations = ArrowAnnotate_getMappedAnnotations(annotation, displaySetService);
    const displayText = ArrowAnnotate_getDisplayText(mappedAnnotations, displaySet);
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points,
      textBox,
      isLocked,
      isVisible,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      referencedImageId,
      frameNumber: mappedAnnotations[0]?.frameNumber || 1,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.text,
      displayText: displayText,
      data: data.cachedStats,
      type: getValueTypeFromToolType(toolName),
      getReport: () => {
        throw new Error('Not implemented');
      }
    };
  }
};
function ArrowAnnotate_getMappedAnnotations(annotation, displaySetService) {
  const {
    metadata,
    data
  } = annotation;
  const {
    text
  } = data;
  const {
    referencedImageId
  } = metadata;
  const annotations = [];
  const {
    SOPInstanceUID,
    SeriesInstanceUID,
    frameNumber
  } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
  const displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
  const {
    SeriesNumber
  } = displaySet;
  annotations.push({
    SeriesInstanceUID,
    SOPInstanceUID,
    SeriesNumber,
    frameNumber,
    text
  });
  return annotations;
}
function ArrowAnnotate_getDisplayText(mappedAnnotations, displaySet) {
  const displayText = {
    primary: [],
    secondary: []
  };
  if (!mappedAnnotations || !mappedAnnotations.length) {
    return displayText;
  }
  const {
    SeriesNumber,
    SOPInstanceUID,
    frameNumber,
    text
  } = mappedAnnotations[0];
  const instance = displaySet.instances.find(image => image.SOPInstanceUID === SOPInstanceUID);
  let InstanceNumber;
  if (instance) {
    InstanceNumber = instance.InstanceNumber;
  }
  const instanceText = InstanceNumber ? ` I: ${InstanceNumber}` : '';
  const frameText = displaySet.isMultiFrame ? ` F: ${frameNumber}` : '';

  // Add the annotation text to the primary array
  if (text) {
    displayText.primary.push(text);
  }

  // Add the series information to the secondary array
  displayText.secondary.push(`S: ${SeriesNumber}${instanceText}${frameText}`);
  return displayText;
}
/* harmony default export */ const ArrowAnnotate = (ArrowAnnotate_Length);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/CobbAngle.ts






const CobbAngle = {
  toAnnotation: measurement => {},
  /**
   * Maps cornerstone annotation event data to measurement service format.
   *
   * @param {Object} cornerstone Cornerstone event data
   * @return {Measurement} Measurement instance
   */
  toMeasurement: (csToolsEventDetail, displaySetService, CornerstoneViewportService, getValueTypeFromToolType, customizationService) => {
    const {
      annotation
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    const isLocked = getIsLocked(annotationUID);
    const isVisible = getIsVisible(annotationUID);
    if (!metadata || !data) {
      console.warn('Cobb Angle tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = constants_supportedTools.includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
    }
    const {
      points,
      textBox
    } = data.handles;
    const mappedAnnotations = CobbAngle_getMappedAnnotations(annotation, displaySetService);
    const displayText = CobbAngle_getDisplayText(mappedAnnotations, displaySet);
    const getReport = () => CobbAngle_getReport(mappedAnnotations, points, FrameOfReferenceUID, customizationService);
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points,
      textBox,
      isLocked,
      isVisible,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      referencedImageId,
      frameNumber: mappedAnnotations?.[0]?.frameNumber || 1,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.label,
      displayText: displayText,
      data: data.cachedStats,
      type: getValueTypeFromToolType(toolName),
      getReport
    };
  }
};
function CobbAngle_getMappedAnnotations(annotation, displaySetService) {
  const {
    metadata,
    data
  } = annotation;
  const {
    cachedStats
  } = data;
  const {
    referencedImageId
  } = metadata;
  const targets = Object.keys(cachedStats);
  if (!targets.length) {
    return;
  }
  const annotations = [];
  Object.keys(cachedStats).forEach(targetId => {
    const targetStats = cachedStats[targetId];
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      frameNumber
    } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
    const displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
    const {
      SeriesNumber
    } = displaySet;
    const {
      angle
    } = targetStats;
    const unit = '\u00B0';
    annotations.push({
      SeriesInstanceUID,
      SOPInstanceUID,
      SeriesNumber,
      frameNumber,
      unit,
      angle
    });
  });
  return annotations;
}

/*
This function is used to convert the measurement data to a format that is
suitable for the report generation (e.g. for the csv report). The report
returns a list of columns and corresponding values.
*/
function CobbAngle_getReport(mappedAnnotations, points, FrameOfReferenceUID, customizationService) {
  const columns = [];
  const values = [];

  // Add Type
  columns.push('AnnotationType');
  values.push('Cornerstone:CobbAngle');
  mappedAnnotations.forEach(annotation => {
    const {
      angle,
      unit
    } = annotation;
    columns.push(`Angle (${unit})`);
    values.push(angle);
  });
  if (FrameOfReferenceUID) {
    columns.push('FrameOfReferenceUID');
    values.push(FrameOfReferenceUID);
  }
  if (points) {
    columns.push('points');
    // points has the form of [[x1, y1, z1], [x2, y2, z2], ...]
    // convert it to string of [[x1 y1 z1];[x2 y2 z2];...]
    // so that it can be used in the csv report
    values.push(points.map(p => p.join(' ')).join(';'));
  }
  return {
    columns,
    values
  };
}
function CobbAngle_getDisplayText(mappedAnnotations, displaySet) {
  const displayText = {
    primary: [],
    secondary: []
  };
  if (!mappedAnnotations || !mappedAnnotations.length) {
    return displayText;
  }

  // Angle is the same for all series
  const {
    angle,
    unit,
    SeriesNumber,
    SOPInstanceUID,
    frameNumber
  } = mappedAnnotations[0];
  const instance = displaySet.instances.find(image => image.SOPInstanceUID === SOPInstanceUID);
  let InstanceNumber;
  if (instance) {
    InstanceNumber = instance.InstanceNumber;
  }
  const instanceText = InstanceNumber ? ` I: ${InstanceNumber}` : '';
  const frameText = displaySet.isMultiFrame ? ` F: ${frameNumber}` : '';
  if (angle === undefined) {
    return displayText;
  }
  const roundedAngle = src/* utils */.Wp.roundNumber(angle, 2);
  displayText.primary.push(`${roundedAngle} ${utils_getDisplayUnit(unit)}`);
  displayText.secondary.push(`S: ${SeriesNumber}${instanceText}${frameText}`);
  return displayText;
}
/* harmony default export */ const measurementServiceMappings_CobbAngle = (CobbAngle);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/Angle.ts






const Angle = {
  toAnnotation: measurement => {},
  /**
   * Maps cornerstone annotation event data to measurement service format.
   *
   * @param {Object} cornerstone Cornerstone event data
   * @return {Measurement} Measurement instance
   */
  toMeasurement: (csToolsEventDetail, displaySetService, CornerstoneViewportService, getValueTypeFromToolType, customizationService) => {
    const {
      annotation
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    const isLocked = getIsLocked(annotationUID);
    const isVisible = getIsVisible(annotationUID);
    if (!metadata || !data) {
      console.warn('Length tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = constants_supportedTools.includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
    }
    const {
      points,
      textBox
    } = data.handles;
    const mappedAnnotations = Angle_getMappedAnnotations(annotation, displaySetService);
    const displayText = Angle_getDisplayText(mappedAnnotations, displaySet);
    const getReport = () => Angle_getReport(mappedAnnotations, points, FrameOfReferenceUID, customizationService);
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points,
      textBox,
      isLocked,
      isVisible,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      frameNumber: mappedAnnotations?.[0]?.frameNumber || 1,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.label,
      displayText: displayText,
      data: data.cachedStats,
      type: getValueTypeFromToolType(toolName),
      getReport,
      referencedImageId
    };
  }
};
function Angle_getMappedAnnotations(annotation, displaySetService) {
  const {
    metadata,
    data
  } = annotation;
  const {
    cachedStats
  } = data;
  const {
    referencedImageId
  } = metadata;
  const targets = Object.keys(cachedStats);
  if (!targets.length) {
    return;
  }
  const annotations = [];
  Object.keys(cachedStats).forEach(targetId => {
    const targetStats = cachedStats[targetId];
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      frameNumber
    } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
    const displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
    const {
      SeriesNumber
    } = displaySet;
    const {
      angle
    } = targetStats;
    const unit = '\u00B0';
    annotations.push({
      SeriesInstanceUID,
      SOPInstanceUID,
      SeriesNumber,
      frameNumber,
      unit,
      angle
    });
  });
  return annotations;
}

/*
This function is used to convert the measurement data to a format that is
suitable for the report generation (e.g. for the csv report). The report
returns a list of columns and corresponding values.
*/
function Angle_getReport(mappedAnnotations, points, FrameOfReferenceUID, customizationService) {
  const columns = [];
  const values = [];

  // Add Type
  columns.push('AnnotationType');
  values.push('Cornerstone:Angle');
  mappedAnnotations.forEach(annotation => {
    const {
      angle,
      unit
    } = annotation;
    columns.push(`Angle (${unit})`);
    values.push(angle);
  });
  if (FrameOfReferenceUID) {
    columns.push('FrameOfReferenceUID');
    values.push(FrameOfReferenceUID);
  }
  if (points) {
    columns.push('points');
    // points has the form of [[x1, y1, z1], [x2, y2, z2], ...]
    // convert it to string of [[x1 y1 z1];[x2 y2 z2];...]
    // so that it can be used in the csv report
    values.push(points.map(p => p.join(' ')).join(';'));
  }
  return {
    columns,
    values
  };
}
function Angle_getDisplayText(mappedAnnotations, displaySet) {
  const displayText = {
    primary: [],
    secondary: []
  };
  if (!mappedAnnotations || !mappedAnnotations.length) {
    return displayText;
  }

  // Area is the same for all series
  const {
    angle,
    unit,
    SeriesNumber,
    SOPInstanceUID,
    frameNumber
  } = mappedAnnotations[0];
  const instance = displaySet.instances.find(image => image.SOPInstanceUID === SOPInstanceUID);
  let InstanceNumber;
  if (instance) {
    InstanceNumber = instance.InstanceNumber;
  }
  const instanceText = InstanceNumber ? ` I: ${InstanceNumber}` : '';
  const frameText = displaySet.isMultiFrame ? ` F: ${frameNumber}` : '';
  if (angle === undefined) {
    return displayText;
  }
  const roundedAngle = src/* utils */.Wp.roundNumber(angle, 2);
  displayText.primary.push(`${roundedAngle} ${utils_getDisplayUnit(unit)}`);
  displayText.secondary.push(`S: ${SeriesNumber}${instanceText}${frameText}`);
  return displayText;
}
/* harmony default export */ const measurementServiceMappings_Angle = (Angle);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/PlanarFreehandROI.ts







/**
 * Represents a mapping utility for Planar Freehand ROI measurements.
 */
const PlanarFreehandROI = {
  toAnnotation: measurement => {},
  /**
   * Maps cornerstone annotation event data to measurement service format.
   *
   * @param {Object} csToolsEventDetail Cornerstone event data
   * @param {DisplaySetService} displaySetService Service for managing display sets
   * @param {CornerstoneViewportService} CornerstoneViewportService Service for managing viewports
   * @param {Function} getValueTypeFromToolType Function to get value type from tool type
   * @param {CustomizationService} customizationService Service for customization
   * @returns {Measurement | null} Measurement instance or null if invalid
   */
  toMeasurement: (csToolsEventDetail, displaySetService, CornerstoneViewportService, getValueTypeFromToolType, customizationService) => {
    const {
      annotation
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    const isLocked = getIsLocked(annotationUID);
    const isVisible = getIsVisible(annotationUID);
    if (!metadata || !data) {
      console.debug('PlanarFreehandROI tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = constants_supportedTools.includes(toolName);
    if (!validToolType) {
      throw new Error(`Tool ${toolName} not supported`);
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      frameNumber,
      StudyInstanceUID
    } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
    }
    const mappedAnnotations = PlanarFreehandROI_getMappedAnnotations(annotation, displaySetService);
    const displayText = PlanarFreehandROI_getDisplayText(mappedAnnotations, displaySet);
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points: data.contour.polyline,
      textBox: data.handles.textBox,
      metadata,
      frameNumber,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      referencedImageId,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.label,
      displayText: displayText,
      data: data.cachedStats,
      type: getValueTypeFromToolType(toolName),
      getReport: () => getColumnValueReport(annotation, customizationService),
      isLocked,
      isVisible
    };
  }
};

/**
 * Maps annotations to a structured format with relevant attributes.
 *
 * @param {Object} annotation The annotation object.
 * @param {DisplaySetService} displaySetService Service for managing display sets.
 * @returns {Array} Mapped annotations.
 */
function PlanarFreehandROI_getMappedAnnotations(annotation, displaySetService) {
  const {
    metadata,
    data
  } = annotation;
  const {
    cachedStats
  } = data;
  const {
    referencedImageId
  } = metadata;
  const targets = Object.keys(cachedStats);
  if (!targets.length) {
    return [];
  }
  const annotations = [];
  Object.keys(cachedStats).forEach(targetId => {
    const targetStats = cachedStats[targetId];
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      frameNumber
    } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
    const displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
    const {
      SeriesNumber
    } = displaySet;
    const {
      mean,
      stdDev,
      max,
      area,
      Modality,
      areaUnit,
      modalityUnit
    } = targetStats;
    annotations.push({
      SeriesInstanceUID,
      SOPInstanceUID,
      SeriesNumber,
      frameNumber,
      Modality,
      unit: modalityUnit,
      mean,
      stdDev,
      max,
      area,
      areaUnit
    });
  });
  return annotations;
}

/**
 * Converts the measurement data to a format suitable for report generation.
 *
 * @param {object} annotation The annotation object.
 * @param {CustomizationService} customizationService Service for customization.
 * @returns {object} Report's content.
 */
function getColumnValueReport(annotation, customizationService) {
  const {
    PlanarFreehandROI
  } = customizationService.get('cornerstone.measurements');
  const {
    report
  } = PlanarFreehandROI;
  const columns = [];
  const values = [];

  /** Add type */
  columns.push('AnnotationType');
  values.push('Cornerstone:PlanarFreehandROI');

  /** Add cachedStats */
  const {
    metadata,
    data
  } = annotation;
  const stats = data.cachedStats[`imageId:${metadata.referencedImageId}`];
  report.forEach(({
    name,
    value
  }) => {
    columns.push(name);
    stats[value] ? values.push(stats[value]) : values.push('not available');
  });

  /** Add FOR */
  if (metadata.FrameOfReferenceUID) {
    columns.push('FrameOfReferenceUID');
    values.push(metadata.FrameOfReferenceUID);
  }

  /** Add points */
  if (data.contour.polyline) {
    columns.push('points');
    values.push(data.contour.polyline.map(p => p.join(' ')).join(';'));
  }
  return {
    columns,
    values
  };
}

/**
 * Retrieves the display text for an annotation in a display set.
 *
 * @param {Array} mappedAnnotations The mapped annotations.
 * @param {Object} displaySet The display set object.
 * @returns {Object} Display text with primary and secondary information.
 */
function PlanarFreehandROI_getDisplayText(mappedAnnotations, displaySet) {
  const displayText = {
    primary: [],
    secondary: []
  };
  if (!mappedAnnotations || !mappedAnnotations.length) {
    return displayText;
  }

  // Area is the same for all series
  const {
    area,
    SOPInstanceUID,
    frameNumber,
    areaUnit
  } = mappedAnnotations[0];
  const instance = displaySet.instances.find(image => image.SOPInstanceUID === SOPInstanceUID);
  let InstanceNumber;
  if (instance) {
    InstanceNumber = instance.InstanceNumber;
  }
  const instanceText = InstanceNumber ? ` I: ${InstanceNumber}` : '';
  const frameText = displaySet.isMultiFrame ? ` F: ${frameNumber}` : '';
  const roundedArea = src/* utils */.Wp.roundNumber(area || 0, 2);
  displayText.primary.push(`${roundedArea} ${utils_getDisplayUnit(areaUnit)}`);
  mappedAnnotations.forEach(mappedAnnotation => {
    const {
      unit,
      max,
      SeriesNumber
    } = mappedAnnotation;
    const maxStr = getStatisticDisplayString(max, unit, 'max');
    displayText.primary.push(maxStr);
    displayText.secondary.push(`S: ${SeriesNumber}${instanceText}${frameText}`);
  });
  return displayText;
}
/* harmony default export */ const measurementServiceMappings_PlanarFreehandROI = (PlanarFreehandROI);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/RectangleROI.ts







const RectangleROI = {
  toAnnotation: measurement => {},
  toMeasurement: (csToolsEventDetail, displaySetService, CornerstoneViewportService, getValueTypeFromToolType, customizationService) => {
    const {
      annotation
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    const isLocked = getIsLocked(annotationUID);
    const isVisible = getIsVisible(annotationUID);
    if (!metadata || !data) {
      console.warn('Rectangle ROI tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = constants_supportedTools.includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
    }
    const {
      points,
      textBox
    } = data.handles;
    const mappedAnnotations = RectangleROI_getMappedAnnotations(annotation, displaySetService);
    const displayText = RectangleROI_getDisplayText(mappedAnnotations, displaySet, customizationService);
    const getReport = () => RectangleROI_getReport(mappedAnnotations, points, FrameOfReferenceUID, customizationService);
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points,
      textBox,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      referencedImageId,
      frameNumber: mappedAnnotations[0]?.frameNumber || 1,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.label,
      displayText: displayText,
      data: data.cachedStats,
      type: getValueTypeFromToolType(toolName),
      getReport,
      isLocked,
      isVisible
    };
  }
};
function RectangleROI_getMappedAnnotations(annotation, displaySetService) {
  const {
    metadata,
    data
  } = annotation;
  const {
    cachedStats
  } = data;
  const {
    referencedImageId
  } = metadata;
  const targets = Object.keys(cachedStats);
  if (!targets.length) {
    return [];
  }
  const annotations = [];
  Object.keys(cachedStats).forEach(targetId => {
    const targetStats = cachedStats[targetId];
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      frameNumber
    } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
    const displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
    const {
      SeriesNumber
    } = displaySet;
    const {
      mean,
      stdDev,
      max,
      area,
      Modality,
      modalityUnit,
      areaUnit
    } = targetStats;
    annotations.push({
      SeriesInstanceUID,
      SOPInstanceUID,
      SeriesNumber,
      frameNumber,
      Modality,
      unit: modalityUnit,
      mean,
      stdDev,
      metadata,
      max,
      area,
      areaUnit
    });
  });
  return annotations;
}

/*
This function is used to convert the measurement data to a format that is
suitable for the report generation (e.g. for the csv report). The report
returns a list of columns and corresponding values.
*/
function RectangleROI_getReport(mappedAnnotations, points, FrameOfReferenceUID, customizationService) {
  const columns = [];
  const values = [];

  // Add Type
  columns.push('AnnotationType');
  values.push('Cornerstone:RectangleROI');
  mappedAnnotations.forEach(annotation => {
    const {
      mean,
      stdDev,
      max,
      area,
      unit,
      areaUnit
    } = annotation;
    if (!mean || !unit || !max || !area) {
      return;
    }
    columns.push(`Maximum`, `Mean`, `Std Dev`, 'Pixel Unit', `Area`, 'Unit');
    values.push(max, mean, stdDev, unit, area, areaUnit);
  });
  if (FrameOfReferenceUID) {
    columns.push('FrameOfReferenceUID');
    values.push(FrameOfReferenceUID);
  }
  if (points) {
    columns.push('points');
    // points has the form of [[x1, y1, z1], [x2, y2, z2], ...]
    // convert it to string of [[x1 y1 z1];[x2 y2 z2];...]
    // so that it can be used in the csv report
    values.push(points.map(p => p.join(' ')).join(';'));
  }
  return {
    columns,
    values
  };
}
function RectangleROI_getDisplayText(mappedAnnotations, displaySet, customizationService) {
  const displayText = {
    primary: [],
    secondary: []
  };
  if (!mappedAnnotations || !mappedAnnotations.length) {
    return displayText;
  }

  // Area is the same for all series
  const {
    area,
    SOPInstanceUID,
    frameNumber,
    areaUnit
  } = mappedAnnotations[0];
  const instance = displaySet.instances.find(image => image.SOPInstanceUID === SOPInstanceUID);
  let InstanceNumber;
  if (instance) {
    InstanceNumber = instance.InstanceNumber;
  }
  const instanceText = InstanceNumber ? ` I: ${InstanceNumber}` : '';
  const frameText = displaySet.isMultiFrame ? ` F: ${frameNumber}` : '';

  // Area sometimes becomes undefined if `preventHandleOutsideImage` is off.
  const roundedArea = src/* utils */.Wp.roundNumber(area || 0, 2);
  displayText.primary.push(`${roundedArea} ${utils_getDisplayUnit(areaUnit)}`);

  // Todo: we need a better UI for displaying all these information
  mappedAnnotations.forEach(mappedAnnotation => {
    const {
      unit,
      max,
      SeriesNumber
    } = mappedAnnotation;
    const maxStr = getStatisticDisplayString(max, unit, 'max');
    displayText.primary.push(maxStr);
    displayText.secondary.push(`S: ${SeriesNumber}${instanceText}${frameText}`);
  });
  return displayText;
}
/* harmony default export */ const measurementServiceMappings_RectangleROI = (RectangleROI);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/SplineROI.ts






/**
 * Represents a mapping utility for Spline ROI measurements.
 */
const SplineROI = {
  toAnnotation: measurement => {
    // Implementation for converting measurement to annotation
  },
  /**
   * Maps cornerstone annotation event data to measurement service format.
   *
   * @param {Object} csToolsEventDetail - Cornerstone event data
   * @param {DisplaySetService} displaySetService - Service for managing display sets
   * @param {CornerstoneViewportService} CornerstoneViewportService - Service for managing viewports
   * @param {Function} getValueTypeFromToolType - Function to get value type from tool type
   * @param {CustomizationService} customizationService - Service for customization
   * @returns {Measurement | null} Measurement instance or null if invalid
   */
  toMeasurement: (csToolsEventDetail, displaySetService, CornerstoneViewportService, getValueTypeFromToolType, customizationService) => {
    const {
      annotation
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    const isLocked = getIsLocked(annotationUID);
    const isVisible = getIsVisible(annotationUID);
    if (!metadata || !data) {
      console.warn('SplineROI tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = constants_supportedTools.includes(toolName);
    if (!validToolType) {
      throw new Error(`Tool ${toolName} not supported`);
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      frameNumber,
      StudyInstanceUID
    } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
    }
    const mappedAnnotations = SplineROI_getMappedAnnotations(annotation, displaySetService);
    const displayText = SplineROI_getDisplayText(mappedAnnotations, displaySet);
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points: data.contour.polyline,
      textBox: data.handles.textBox,
      metadata,
      frameNumber,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      referencedImageId,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.label,
      displayText: displayText,
      data: data.cachedStats,
      type: getValueTypeFromToolType(toolName),
      getReport: () => SplineROI_getColumnValueReport(annotation, customizationService),
      isLocked,
      isVisible
    };
  }
};

/**
 * Maps annotations to a structured format with relevant attributes.
 *
 * @param {Object} annotation - The annotation object.
 * @param {DisplaySetService} displaySetService - Service for managing display sets.
 * @returns {Array} Mapped annotations.
 */
function SplineROI_getMappedAnnotations(annotation, displaySetService) {
  const {
    metadata,
    data
  } = annotation;
  const {
    cachedStats
  } = data;
  const {
    referencedImageId
  } = metadata;
  const targets = Object.keys(cachedStats);
  if (!targets.length) {
    return [];
  }
  const annotations = [];
  Object.keys(cachedStats).forEach(targetId => {
    const targetStats = cachedStats[targetId];
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      frameNumber
    } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
    const displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
    const {
      SeriesNumber
    } = displaySet;
    const {
      mean,
      stdDev,
      max,
      area,
      Modality,
      areaUnit,
      modalityUnit
    } = targetStats;
    annotations.push({
      SeriesInstanceUID,
      SOPInstanceUID,
      SeriesNumber,
      frameNumber,
      Modality,
      unit: modalityUnit,
      mean,
      stdDev,
      max,
      area,
      areaUnit
    });
  });
  return annotations;
}

/**
 * Converts the measurement data to a format suitable for report generation.
 *
 * @param {object} annotation - The annotation object.
 * @param {CustomizationService} customizationService - Service for customization.
 * @returns {object} Report's content.
 */
function SplineROI_getColumnValueReport(annotation, customizationService) {
  const {
    SplineROI
  } = customizationService.get('cornerstone.measurements');
  const {
    report
  } = SplineROI;
  const columns = [];
  const values = [];

  /** Add type */
  columns.push('AnnotationType');
  values.push('Cornerstone:SplineROI');

  /** Add cachedStats */
  const {
    metadata,
    data
  } = annotation;
  const stats = data.cachedStats[`imageId:${metadata.referencedImageId}`];
  report.forEach(({
    name,
    value
  }) => {
    columns.push(name);
    stats[value] ? values.push(stats[value]) : values.push('not available');
  });

  /** Add FOR */
  if (metadata.FrameOfReferenceUID) {
    columns.push('FrameOfReferenceUID');
    values.push(metadata.FrameOfReferenceUID);
  }

  /** Add points */
  if (data.contour.polyline) {
    columns.push('points');
    values.push(data.contour.polyline.map(p => p.join(' ')).join(';'));
  }
  return {
    columns,
    values
  };
}

/**
 * Retrieves the display text for an annotation in a display set.
 *
 * @param {Array} mappedAnnotations - The mapped annotations.
 * @param {Object} displaySet - The display set object.
 * @returns {Object} Display text with primary and secondary information.
 */
function SplineROI_getDisplayText(mappedAnnotations, displaySet) {
  const displayText = {
    primary: [],
    secondary: []
  };
  if (!mappedAnnotations || !mappedAnnotations.length) {
    return displayText;
  }

  // Area is the same for all series
  const {
    area,
    SOPInstanceUID,
    frameNumber,
    areaUnit
  } = mappedAnnotations[0];
  const instance = displaySet.instances.find(image => image.SOPInstanceUID === SOPInstanceUID);
  let InstanceNumber;
  if (instance) {
    InstanceNumber = instance.InstanceNumber;
  }
  const instanceText = InstanceNumber ? ` I: ${InstanceNumber}` : '';
  const frameText = displaySet.isMultiFrame ? ` F: ${frameNumber}` : '';
  const roundedArea = src/* utils */.Wp.roundNumber(area || 0, 2);
  displayText.primary.push(`${roundedArea} ${utils_getDisplayUnit(areaUnit)}`);

  // we don't have max yet for splines rois
  // mappedAnnotations.forEach(mappedAnnotation => {
  //   const { unit, max, SeriesNumber } = mappedAnnotation;

  //   const maxStr = getStatisticDisplayString(max, unit, 'max');

  //   displayText.primary.push(maxStr);
  //   displayText.secondary.push(`S: ${SeriesNumber}${instanceText}${frameText}`);
  // });

  return displayText;
}
/* harmony default export */ const measurementServiceMappings_SplineROI = (SplineROI);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/LivewireContour.ts






/**
 * Represents a mapping utility for Livewire measurements.
 */
const LivewireContour = {
  toAnnotation: measurement => {},
  /**
   * Maps cornerstone annotation event data to measurement service format.
   *
   * @param {Object} csToolsEventDetail Cornerstone event data
   * @param {DisplaySetService} DisplaySetService Service for managing display sets
   * @param {CornerstoneViewportService} CornerstoneViewportService Service for managing viewports
   * @param {Function} getValueTypeFromToolType Function to get value type from tool type
   * @returns {Measurement} Measurement instance
   */
  toMeasurement: (csToolsEventDetail, DisplaySetService, CornerstoneViewportService, getValueTypeFromToolType, customizationService) => {
    const {
      annotation
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    const isLocked = getIsLocked(annotationUID);
    const isVisible = getIsVisible(annotationUID);
    if (!metadata || !data) {
      console.warn('Livewire tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = constants_supportedTools.includes(toolName);
    if (!validToolType) {
      throw new Error(`Tool ${toolName} not supported`);
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      frameNumber,
      StudyInstanceUID
    } = getSOPInstanceAttributes(referencedImageId);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = DisplaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = DisplaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
    }
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points: data.contour.polyline,
      textBox: data.handles.textBox,
      metadata,
      frameNumber,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.label,
      isLocked,
      isVisible,
      displayText: LivewireContour_getDisplayText(annotation, displaySet),
      data: data.cachedStats,
      type: getValueTypeFromToolType(toolName),
      getReport: () => LivewireContour_getColumnValueReport(annotation, customizationService)
    };
  }
};

/**
 * This function is used to convert the measurement data to a
 * format that is suitable for report generation (e.g. for the csv report).
 * The report returns a list of columns and corresponding values.
 *
 * @param {object} annotation
 * @returns {object} Report's content from this tool
 */
function LivewireContour_getColumnValueReport(annotation, customizationService) {
  const columns = [];
  const values = [];

  /** Add type */
  columns.push('AnnotationType');
  values.push('Cornerstone:Livewire');

  /** Add cachedStats */
  const {
    metadata,
    data
  } = annotation;

  /** Add FOR */
  if (metadata.FrameOfReferenceUID) {
    columns.push('FrameOfReferenceUID');
    values.push(metadata.FrameOfReferenceUID);
  }

  /** Add points */
  if (data.contour.polyline) {
    /**
     * Points has the form of [[x1, y1, z1], [x2, y2, z2], ...]
     * convert it to string of [[x1 y1 z1];[x2 y2 z2];...]
     * so that it can be used in the CSV report
     */
    columns.push('points');
    values.push(data.contour.polyline.map(p => p.join(' ')).join(';'));
  }
  return {
    columns,
    values
  };
}

/**
 * Retrieves the display text for an annotation in a display set.
 *
 * @param {Object} annotation - The annotation object.
 * @param {Object} displaySet - The display set object.
 * @returns {string[]} - An array of display text.
 */
function LivewireContour_getDisplayText(annotation, displaySet) {
  const {
    metadata,
    data
  } = annotation;
  if (!data.cachedStats || !data.cachedStats[`imageId:${metadata.referencedImageId}`]) {
    return [];
  }
  const {
    area,
    areaUnit
  } = data.cachedStats[`imageId:${metadata.referencedImageId}`];
  const {
    SOPInstanceUID,
    frameNumber
  } = getSOPInstanceAttributes(metadata.referencedImageId);
  const displayText = [];
  const instance = displaySet.instances.find(image => image.SOPInstanceUID === SOPInstanceUID);
  let InstanceNumber;
  if (instance) {
    InstanceNumber = instance.InstanceNumber;
  }
  const instanceText = InstanceNumber ? ` I: ${InstanceNumber}` : '';
  const frameText = displaySet.isMultiFrame ? ` F: ${frameNumber}` : '';
  const {
    SeriesNumber
  } = displaySet;
  let seriesText = null;
  if (SeriesNumber !== undefined) {
    seriesText = `S: ${SeriesNumber}${instanceText}${frameText}`;
  }
  const texts = [];
  if (area) {
    const roundedArea = src/* utils */.Wp.roundNumber(area || 0, 2);
    texts.push(`${roundedArea} ${utils_getDisplayUnit(areaUnit)}`);
  }
  if (seriesText) {
    texts.push(seriesText);
  }
  displayText.push({
    text: texts,
    series: seriesText
  });
  return displayText;
}
/* harmony default export */ const measurementServiceMappings_LivewireContour = (LivewireContour);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/Probe.ts






const Probe = {
  toAnnotation: measurement => {},
  /**
   * Maps cornerstone annotation event data to measurement service format.
   *
   * @param {Object} cornerstone Cornerstone event data
   * @return {Measurement} Measurement instance
   */
  toMeasurement: (csToolsEventDetail, displaySetService, CornerstoneViewportService, getValueTypeFromToolType, customizationService) => {
    const {
      annotation
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    const isLocked = getIsLocked(annotationUID);
    const isVisible = getIsVisible(annotationUID);
    if (!metadata || !data) {
      console.warn('Probe tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = constants_supportedTools.includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
    }
    const {
      points
    } = data.handles;
    const mappedAnnotations = Probe_getMappedAnnotations(annotation, displaySetService);
    const displayText = Probe_getDisplayText(mappedAnnotations, displaySet, customizationService);
    const getReport = () => Probe_getReport(mappedAnnotations, points, FrameOfReferenceUID, customizationService);
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points,
      metadata,
      isLocked,
      isVisible,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      referencedImageId,
      frameNumber: mappedAnnotations?.[0]?.frameNumber || 1,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.label,
      displayText: displayText,
      data: data.cachedStats,
      type: getValueTypeFromToolType(toolName),
      getReport
    };
  }
};
function Probe_getMappedAnnotations(annotation, displaySetService) {
  const {
    metadata,
    data
  } = annotation;
  const {
    cachedStats
  } = data;
  const {
    referencedImageId
  } = metadata;
  const targets = Object.keys(cachedStats);
  if (!targets.length) {
    return;
  }
  const annotations = [];
  Object.keys(cachedStats).forEach(targetId => {
    const targetStats = cachedStats[targetId];
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      frameNumber
    } = getSOPInstanceAttributes(referencedImageId, displaySetService, annotation);
    const displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID)[0];
    const {
      SeriesNumber
    } = displaySet;
    const {
      value
    } = targetStats;
    const unit = 'HU';
    annotations.push({
      SeriesInstanceUID,
      SOPInstanceUID,
      SeriesNumber,
      frameNumber,
      unit,
      value
    });
  });
  return annotations;
}

/*
This function is used to convert the measurement data to a format that is
suitable for the report generation (e.g. for the csv report). The report
returns a list of columns and corresponding values.
*/
function Probe_getReport(mappedAnnotations, points, FrameOfReferenceUID, customizationService) {
  const columns = [];
  const values = [];

  // Add Type
  columns.push('AnnotationType');
  values.push('Cornerstone:Probe');
  mappedAnnotations.forEach(annotation => {
    const {
      value,
      unit
    } = annotation;
    columns.push(`Probe (${unit})`);
    values.push(value);
  });
  if (FrameOfReferenceUID) {
    columns.push('FrameOfReferenceUID');
    values.push(FrameOfReferenceUID);
  }
  if (points) {
    columns.push('points');
    values.push(points.map(p => p.join(' ')).join(';'));
  }
  return {
    columns,
    values
  };
}
function Probe_getDisplayText(mappedAnnotations, displaySet, customizationService) {
  const displayText = {
    primary: [],
    secondary: []
  };
  if (!mappedAnnotations || !mappedAnnotations.length) {
    return displayText;
  }
  const {
    value,
    unit,
    SeriesNumber,
    SOPInstanceUID,
    frameNumber
  } = mappedAnnotations[0];
  const instance = displaySet.instances.find(image => image.SOPInstanceUID === SOPInstanceUID);
  let InstanceNumber;
  if (instance) {
    InstanceNumber = instance.InstanceNumber;
  }
  const instanceText = InstanceNumber ? ` I: ${InstanceNumber}` : '';
  const frameText = displaySet.isMultiFrame ? ` F: ${frameNumber}` : '';
  if (value !== undefined) {
    const roundedValue = src/* utils */.Wp.roundNumber(value, 2);
    displayText.primary.push(`${roundedValue} ${utils_getDisplayUnit(unit)}`);
    displayText.secondary.push(`S: ${SeriesNumber}${instanceText}${frameText}`);
  }
  return displayText;
}
/* harmony default export */ const measurementServiceMappings_Probe = (Probe);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/UltrasoundDirectional.ts





const UltrasoundDirectional = {
  toAnnotation: measurement => {},
  /**
   * Maps cornerstone annotation event data to measurement service format.
   *
   * @param {Object} cornerstone Cornerstone event data
   * @return {Measurement} Measurement instance
   */
  toMeasurement: (csToolsEventDetail, displaySetService, CornerstoneViewportService, getValueTypeFromToolType, customizationService) => {
    const {
      annotation
    } = csToolsEventDetail;
    const {
      metadata,
      data,
      annotationUID
    } = annotation;
    const isLocked = getIsLocked(annotationUID);
    const isVisible = getIsVisible(annotationUID);
    if (!metadata || !data) {
      console.warn('Length tool: Missing metadata or data');
      return null;
    }
    const {
      toolName,
      referencedImageId,
      FrameOfReferenceUID
    } = metadata;
    const validToolType = constants_supportedTools.includes(toolName);
    if (!validToolType) {
      throw new Error('Tool not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      StudyInstanceUID
    } = getSOPInstanceAttributes(referencedImageId);
    let displaySet;
    if (SOPInstanceUID) {
      displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    } else {
      displaySet = displaySetService.getDisplaySetsForSeries(SeriesInstanceUID);
    }
    const {
      points
    } = data.handles;
    const mappedAnnotations = UltrasoundDirectional_getMappedAnnotations(annotation, displaySetService);
    const displayText = UltrasoundDirectional_getDisplayText(mappedAnnotations, displaySet, customizationService);
    const getReport = () => UltrasoundDirectional_getReport(mappedAnnotations, points, FrameOfReferenceUID, customizationService);
    return {
      uid: annotationUID,
      SOPInstanceUID,
      FrameOfReferenceUID,
      points,
      metadata,
      referenceSeriesUID: SeriesInstanceUID,
      referenceStudyUID: StudyInstanceUID,
      frameNumber: mappedAnnotations?.[0]?.frameNumber || 1,
      toolName: metadata.toolName,
      displaySetInstanceUID: displaySet.displaySetInstanceUID,
      label: data.label,
      displayText: displayText,
      data: data.cachedStats,
      type: getValueTypeFromToolType(toolName),
      getReport,
      isLocked,
      isVisible
    };
  }
};
function UltrasoundDirectional_getMappedAnnotations(annotation, DisplaySetService) {
  const {
    metadata,
    data
  } = annotation;
  const {
    cachedStats
  } = data;
  const {
    referencedImageId
  } = metadata;
  const targets = Object.keys(cachedStats);
  if (!targets.length) {
    return;
  }
  const annotations = [];
  Object.keys(cachedStats).forEach(targetId => {
    const targetStats = cachedStats[targetId];
    if (!referencedImageId) {
      throw new Error('Non-acquisition plane measurement mapping not supported');
    }
    const {
      SOPInstanceUID,
      SeriesInstanceUID,
      frameNumber
    } = getSOPInstanceAttributes(referencedImageId);
    const displaySet = DisplaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID, frameNumber);
    const {
      SeriesNumber
    } = displaySet;
    const {
      xValues,
      yValues,
      units,
      isUnitless,
      isHorizontal
    } = targetStats;
    annotations.push({
      SeriesInstanceUID,
      SOPInstanceUID,
      SeriesNumber,
      frameNumber,
      xValues,
      yValues,
      units,
      isUnitless,
      isHorizontal
    });
  });
  return annotations;
}

/*
This function is used to convert the measurement data to a format that is
suitable for the report generation (e.g. for the csv report). The report
returns a list of columns and corresponding values.
*/
function UltrasoundDirectional_getReport(mappedAnnotations, points, FrameOfReferenceUID, customizationService) {
  const columns = [];
  const values = [];

  // Add Type
  columns.push('AnnotationType');
  values.push('Cornerstone:UltrasoundDirectional');
  mappedAnnotations.forEach(annotation => {
    const {
      xValues,
      yValues,
      units,
      isUnitless
    } = annotation;
    if (isUnitless) {
      columns.push('Length' + units[0]);
      values.push(src/* utils */.Wp.roundNumber(xValues[0], 2));
    } else {
      const dist1 = Math.abs(xValues[1] - xValues[0]);
      const dist2 = Math.abs(yValues[1] - yValues[0]);
      columns.push('Time' + units[0]);
      values.push(src/* utils */.Wp.roundNumber(dist1, 2));
      columns.push('Length' + units[1]);
      values.push(src/* utils */.Wp.roundNumber(dist2, 2));
    }
  });
  if (FrameOfReferenceUID) {
    columns.push('FrameOfReferenceUID');
    values.push(FrameOfReferenceUID);
  }
  if (points) {
    columns.push('points');
    values.push(points.map(p => p.join(' ')).join(';'));
  }
  return {
    columns,
    values
  };
}
function UltrasoundDirectional_getDisplayText(mappedAnnotations, displaySet, customizationService) {
  const displayText = {
    primary: [],
    secondary: []
  };
  if (!mappedAnnotations || !mappedAnnotations.length) {
    return displayText;
  }
  const {
    xValues,
    yValues,
    units,
    isUnitless,
    SeriesNumber,
    SOPInstanceUID,
    frameNumber
  } = mappedAnnotations[0];
  const instance = displaySet.instances.find(image => image.SOPInstanceUID === SOPInstanceUID);
  let InstanceNumber;
  if (instance) {
    InstanceNumber = instance.InstanceNumber;
  }
  const instanceText = InstanceNumber ? ` I: ${InstanceNumber}` : '';
  const frameText = displaySet.isMultiFrame ? ` F: ${frameNumber}` : '';
  const seriesText = `S: ${SeriesNumber}${instanceText}${frameText}`;
  if (xValues === undefined || yValues === undefined) {
    return displayText;
  }
  if (isUnitless) {
    displayText.primary.push(`${src/* utils */.Wp.roundNumber(xValues[0], 2)} ${units[0]}`);
  } else {
    const dist1 = Math.abs(xValues[1] - xValues[0]);
    const dist2 = Math.abs(yValues[1] - yValues[0]);
    displayText.primary.push(`${src/* utils */.Wp.roundNumber(dist1)} ${units[0]}`);
    displayText.primary.push(`${src/* utils */.Wp.roundNumber(dist2)} ${units[1]}`);
  }
  displayText.secondary.push(seriesText);
  return displayText;
}
/* harmony default export */ const measurementServiceMappings_UltrasoundDirectional = (UltrasoundDirectional);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/measurementServiceMappingsFactory.ts














const measurementServiceMappingsFactory = (measurementService, displaySetService, cornerstoneViewportService, customizationService) => {
  /**
   * Maps measurement service format object to cornerstone annotation object.
   *
   * @param measurement The measurement instance
   * @param definition The source definition
   * @return Cornerstone annotation data
   */

  const _getValueTypeFromToolType = toolType => {
    const {
      POLYLINE,
      ELLIPSE,
      CIRCLE,
      RECTANGLE,
      BIDIRECTIONAL,
      POINT,
      ANGLE
    } = src/* MeasurementService */.C5.VALUE_TYPES;

    // TODO -> I get why this was attempted, but its not nearly flexible enough.
    // A single measurement may have an ellipse + a bidirectional measurement, for instances.
    // You can't define a bidirectional tool as a single type..
    const TOOL_TYPE_TO_VALUE_TYPE = {
      Length: POLYLINE,
      EllipticalROI: ELLIPSE,
      CircleROI: CIRCLE,
      RectangleROI: RECTANGLE,
      PlanarFreehandROI: POLYLINE,
      Bidirectional: BIDIRECTIONAL,
      ArrowAnnotate: POINT,
      CobbAngle: ANGLE,
      Angle: ANGLE,
      SplineROI: POLYLINE,
      LivewireContour: POLYLINE,
      Probe: POINT,
      UltrasoundDirectional: POLYLINE
    };
    return TOOL_TYPE_TO_VALUE_TYPE[toolType];
  };
  const factories = {
    Length: {
      toAnnotation: measurementServiceMappings_Length.toAnnotation,
      toMeasurement: csToolsAnnotation => measurementServiceMappings_Length.toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType, customizationService),
      matchingCriteria: [{
        valueType: src/* MeasurementService */.C5.VALUE_TYPES.POLYLINE,
        points: 2
      }]
    },
    Bidirectional: {
      toAnnotation: measurementServiceMappings_Bidirectional.toAnnotation,
      toMeasurement: csToolsAnnotation => measurementServiceMappings_Bidirectional.toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType, customizationService),
      matchingCriteria: [
      // TODO -> We should eventually do something like shortAxis + longAxis,
      // But its still a little unclear how these automatic interpretations will work.
      {
        valueType: src/* MeasurementService */.C5.VALUE_TYPES.POLYLINE,
        points: 2
      }, {
        valueType: src/* MeasurementService */.C5.VALUE_TYPES.POLYLINE,
        points: 2
      }]
    },
    EllipticalROI: {
      toAnnotation: measurementServiceMappings_EllipticalROI.toAnnotation,
      toMeasurement: csToolsAnnotation => measurementServiceMappings_EllipticalROI.toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType, customizationService),
      matchingCriteria: [{
        valueType: src/* MeasurementService */.C5.VALUE_TYPES.ELLIPSE
      }]
    },
    CircleROI: {
      toAnnotation: measurementServiceMappings_CircleROI.toAnnotation,
      toMeasurement: csToolsAnnotation => measurementServiceMappings_CircleROI.toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType, customizationService),
      matchingCriteria: [{
        valueType: src/* MeasurementService */.C5.VALUE_TYPES.CIRCLE
      }]
    },
    RectangleROI: {
      toAnnotation: measurementServiceMappings_RectangleROI.toAnnotation,
      toMeasurement: csToolsAnnotation => measurementServiceMappings_RectangleROI.toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType, customizationService),
      matchingCriteria: [{
        valueType: src/* MeasurementService */.C5.VALUE_TYPES.POLYLINE
      }]
    },
    PlanarFreehandROI: {
      toAnnotation: measurementServiceMappings_PlanarFreehandROI.toAnnotation,
      toMeasurement: csToolsAnnotation => measurementServiceMappings_PlanarFreehandROI.toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType, customizationService),
      matchingCriteria: [{
        valueType: src/* MeasurementService */.C5.VALUE_TYPES.POLYLINE
      }]
    },
    SplineROI: {
      toAnnotation: measurementServiceMappings_SplineROI.toAnnotation,
      toMeasurement: csToolsAnnotation => measurementServiceMappings_SplineROI.toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType, customizationService),
      matchingCriteria: [{
        valueType: src/* MeasurementService */.C5.VALUE_TYPES.POLYLINE
      }]
    },
    LivewireContour: {
      toAnnotation: measurementServiceMappings_LivewireContour.toAnnotation,
      toMeasurement: csToolsAnnotation => measurementServiceMappings_LivewireContour.toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType, customizationService),
      matchingCriteria: [{
        valueType: src/* MeasurementService */.C5.VALUE_TYPES.POLYLINE
      }]
    },
    ArrowAnnotate: {
      toAnnotation: ArrowAnnotate.toAnnotation,
      toMeasurement: csToolsAnnotation => ArrowAnnotate.toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType, customizationService),
      matchingCriteria: [{
        valueType: src/* MeasurementService */.C5.VALUE_TYPES.POINT,
        points: 1
      }]
    },
    Probe: {
      toAnnotation: measurementServiceMappings_Probe.toAnnotation,
      toMeasurement: csToolsAnnotation => measurementServiceMappings_Probe.toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType, customizationService),
      matchingCriteria: [{
        valueType: src/* MeasurementService */.C5.VALUE_TYPES.POINT,
        points: 1
      }]
    },
    CobbAngle: {
      toAnnotation: measurementServiceMappings_CobbAngle.toAnnotation,
      toMeasurement: csToolsAnnotation => measurementServiceMappings_CobbAngle.toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType, customizationService),
      matchingCriteria: [{
        valueType: src/* MeasurementService */.C5.VALUE_TYPES.ANGLE
      }]
    },
    Angle: {
      toAnnotation: measurementServiceMappings_Angle.toAnnotation,
      toMeasurement: csToolsAnnotation => measurementServiceMappings_Angle.toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType, customizationService),
      matchingCriteria: [{
        valueType: src/* MeasurementService */.C5.VALUE_TYPES.ANGLE
      }]
    },
    UltrasoundDirectional: {
      toAnnotation: measurementServiceMappings_UltrasoundDirectional.toAnnotation,
      toMeasurement: csToolsAnnotation => measurementServiceMappings_UltrasoundDirectional.toMeasurement(csToolsAnnotation, displaySetService, cornerstoneViewportService, _getValueTypeFromToolType, customizationService),
      matchingCriteria: [{
        valueType: src/* MeasurementService */.C5.VALUE_TYPES.POLYLINE,
        points: 2
      }]
    }
  };
  return factories;
};
/* harmony default export */ const measurementServiceMappings_measurementServiceMappingsFactory = (measurementServiceMappingsFactory);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/utilities/index.js + 1 modules
var utilities = __webpack_require__(23566);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/initMeasurementService.ts









const {
  /* CORNERSTONE_3D_TOOLS_SOURCE_NAME */ "rM": initMeasurementService_CORNERSTONE_3D_TOOLS_SOURCE_NAME,
  /* CORNERSTONE_3D_TOOLS_SOURCE_VERSION */ "yK": initMeasurementService_CORNERSTONE_3D_TOOLS_SOURCE_VERSION
} = enums_namespaceObject;
const {
  removeAnnotation
} = dist_esm.annotation.state;
const csToolsEvents = dist_esm.Enums.Events;
const initMeasurementService = (measurementService, displaySetService, cornerstoneViewportService, customizationService) => {
  /* Initialization */
  const {
    Length,
    Bidirectional,
    EllipticalROI,
    CircleROI,
    ArrowAnnotate,
    Angle,
    CobbAngle,
    RectangleROI,
    PlanarFreehandROI,
    SplineROI,
    LivewireContour,
    Probe,
    UltrasoundDirectional
  } = measurementServiceMappings_measurementServiceMappingsFactory(measurementService, displaySetService, cornerstoneViewportService, customizationService);
  const csTools3DVer1MeasurementSource = measurementService.createSource(initMeasurementService_CORNERSTONE_3D_TOOLS_SOURCE_NAME, initMeasurementService_CORNERSTONE_3D_TOOLS_SOURCE_VERSION);

  /* Mappings */
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'Length', Length.matchingCriteria, Length.toAnnotation, Length.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'Crosshairs', Length.matchingCriteria, () => {
    console.warn('Crosshairs mapping not implemented.');
  }, () => {
    console.warn('Crosshairs mapping not implemented.');
  });
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'Bidirectional', Bidirectional.matchingCriteria, Bidirectional.toAnnotation, Bidirectional.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'EllipticalROI', EllipticalROI.matchingCriteria, EllipticalROI.toAnnotation, EllipticalROI.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'CircleROI', CircleROI.matchingCriteria, CircleROI.toAnnotation, CircleROI.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'ArrowAnnotate', ArrowAnnotate.matchingCriteria, ArrowAnnotate.toAnnotation, ArrowAnnotate.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'CobbAngle', CobbAngle.matchingCriteria, CobbAngle.toAnnotation, CobbAngle.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'Angle', Angle.matchingCriteria, Angle.toAnnotation, Angle.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'RectangleROI', RectangleROI.matchingCriteria, RectangleROI.toAnnotation, RectangleROI.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'PlanarFreehandROI', PlanarFreehandROI.matchingCriteria, PlanarFreehandROI.toAnnotation, PlanarFreehandROI.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'SplineROI', SplineROI.matchingCriteria, SplineROI.toAnnotation, SplineROI.toMeasurement);

  // On the UI side, the Calibration Line tool will work almost the same as the
  // Length tool
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'CalibrationLine', Length.matchingCriteria, Length.toAnnotation, Length.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'LivewireContour', LivewireContour.matchingCriteria, LivewireContour.toAnnotation, LivewireContour.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'Probe', Probe.matchingCriteria, Probe.toAnnotation, Probe.toMeasurement);
  measurementService.addMapping(csTools3DVer1MeasurementSource, 'UltrasoundDirectionalTool', UltrasoundDirectional.matchingCriteria, UltrasoundDirectional.toAnnotation, UltrasoundDirectional.toMeasurement);
  return csTools3DVer1MeasurementSource;
};
const connectToolsToMeasurementService = servicesManager => {
  const {
    measurementService,
    displaySetService,
    cornerstoneViewportService,
    customizationService
  } = servicesManager.services;
  const csTools3DVer1MeasurementSource = initMeasurementService(measurementService, displaySetService, cornerstoneViewportService, customizationService);
  connectMeasurementServiceToTools(measurementService, cornerstoneViewportService);
  const {
    annotationToMeasurement,
    remove
  } = csTools3DVer1MeasurementSource;

  //
  function addMeasurement(csToolsEvent) {
    try {
      const annotationAddedEventDetail = csToolsEvent.detail;
      const {
        annotation: {
          metadata,
          annotationUID
        }
      } = annotationAddedEventDetail;
      const {
        toolName
      } = metadata;
      if (csToolsEvent.type === completedEvt && toolName === toolNames.CalibrationLine) {
        // show modal to input the measurement (mm)
        onCompletedCalibrationLine(servicesManager, csToolsEvent).then(() => {
          console.log('Calibration applied.');
        }, () => true).finally(() => {
          // we don't need the calibration line lingering around, remove the
          // annotation from the display
          removeAnnotation(annotationUID);
          removeMeasurement(csToolsEvent);
          // this will ensure redrawing of annotations
          cornerstoneViewportService.resize();
        });
      } else {
        // To force the measurementUID be the same as the annotationUID
        // Todo: this should be changed when a measurement can include multiple annotations
        // in the future
        annotationAddedEventDetail.uid = annotationUID;
        annotationToMeasurement(toolName, annotationAddedEventDetail);
      }
    } catch (error) {
      console.warn('Failed to add measurement:', error);
    }
  }
  function updateMeasurement(csToolsEvent) {
    try {
      const annotationModifiedEventDetail = csToolsEvent.detail;
      const {
        annotation: {
          metadata,
          annotationUID
        }
      } = annotationModifiedEventDetail;

      // If the measurement hasn't been added, don't modify it
      const measurement = measurementService.getMeasurement(annotationUID);
      if (!measurement) {
        return;
      }
      const {
        toolName
      } = metadata;
      annotationModifiedEventDetail.uid = annotationUID;
      // Passing true to indicate this is an update and NOT a annotation (start) completion.
      annotationToMeasurement(toolName, annotationModifiedEventDetail, true);
    } catch (error) {
      console.warn('Failed to update measurement:', error);
    }
  }
  function selectMeasurement(csToolsEvent) {
    try {
      const annotationSelectionEventDetail = csToolsEvent.detail;
      const {
        added: addedSelectedAnnotationUIDs,
        removed: removedSelectedAnnotationUIDs
      } = annotationSelectionEventDetail;
      if (removedSelectedAnnotationUIDs) {
        removedSelectedAnnotationUIDs.forEach(annotationUID => measurementService.setMeasurementSelected(annotationUID, false));
      }
      if (addedSelectedAnnotationUIDs) {
        addedSelectedAnnotationUIDs.forEach(annotationUID => measurementService.setMeasurementSelected(annotationUID, true));
      }
    } catch (error) {
      console.warn('Failed to select/unselect measurements:', error);
    }
  }

  /**
   * When csTools fires a removed event, remove the same measurement
   * from the measurement service
   *
   * @param {*} csToolsEvent
   */
  function removeMeasurement(csToolsEvent) {
    try {
      const annotationRemovedEventDetail = csToolsEvent.detail;
      const {
        annotation: {
          annotationUID
        }
      } = annotationRemovedEventDetail;
      const measurement = measurementService.getMeasurement(annotationUID);
      if (measurement) {
        remove(annotationUID, annotationRemovedEventDetail);
      }
    } catch (error) {
      console.warn('Failed to remove measurement:', error);
    }
  }

  // on display sets added, check if there are any measurements in measurement service that need to be
  // put into cornerstone tools
  const addedEvt = csToolsEvents.ANNOTATION_ADDED;
  const completedEvt = csToolsEvents.ANNOTATION_COMPLETED;
  const updatedEvt = csToolsEvents.ANNOTATION_MODIFIED;
  const removedEvt = csToolsEvents.ANNOTATION_REMOVED;
  const selectionEvt = csToolsEvents.ANNOTATION_SELECTION_CHANGE;
  esm.eventTarget.addEventListener(addedEvt, addMeasurement);
  esm.eventTarget.addEventListener(completedEvt, addMeasurement);
  esm.eventTarget.addEventListener(updatedEvt, updateMeasurement);
  esm.eventTarget.addEventListener(removedEvt, removeMeasurement);
  esm.eventTarget.addEventListener(selectionEvt, selectMeasurement);
  return csTools3DVer1MeasurementSource;
};
const connectMeasurementServiceToTools = (measurementService, cornerstoneViewportService) => {
  const {
    MEASUREMENT_REMOVED,
    MEASUREMENTS_CLEARED,
    MEASUREMENT_UPDATED,
    RAW_MEASUREMENT_ADDED
  } = measurementService.EVENTS;
  measurementService.subscribe(MEASUREMENTS_CLEARED, ({
    measurements
  }) => {
    if (!Object.keys(measurements).length) {
      return;
    }
    for (const measurement of Object.values(measurements)) {
      const {
        uid,
        source
      } = measurement;
      if (source.name !== initMeasurementService_CORNERSTONE_3D_TOOLS_SOURCE_NAME) {
        continue;
      }
      removeAnnotation(uid);
    }

    // trigger a render
    cornerstoneViewportService.getRenderingEngine().render();
  });
  measurementService.subscribe(MEASUREMENT_UPDATED, ({
    source,
    measurement,
    notYetUpdatedAtSource
  }) => {
    if (source.name !== initMeasurementService_CORNERSTONE_3D_TOOLS_SOURCE_NAME) {
      return;
    }
    if (notYetUpdatedAtSource === false) {
      // This event was fired by cornerstone telling the measurement service to sync.
      // Already in sync.
      return;
    }
    const {
      uid,
      label,
      isLocked,
      isVisible
    } = measurement;
    const sourceAnnotation = dist_esm.annotation.state.getAnnotation(uid);
    const {
      data,
      metadata
    } = sourceAnnotation;
    if (!data) {
      return;
    }
    if (data.label !== label) {
      data.label = label;
    }
    if (metadata.toolName === 'ArrowAnnotate') {
      data.text = label;
    }

    // update the isLocked state
    dist_esm.annotation.locking.setAnnotationLocked(uid, isLocked);

    // update the isVisible state
    dist_esm.annotation.visibility.setAnnotationVisibility(uid, isVisible);

    // annotation.config.style.setAnnotationStyles(uid, {
    //   color: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
    // });

    // I don't like this but will fix later
    const renderingEngine = cornerstoneViewportService.getRenderingEngine();
    // Note: We could do a better job by triggering the render on the
    // viewport itself, but the removeAnnotation does not include that info...
    const viewportIds = renderingEngine.getViewports().map(viewport => viewport.id);
    (0,utilities.triggerAnnotationRenderForViewportIds)(viewportIds);
  });
  measurementService.subscribe(RAW_MEASUREMENT_ADDED, ({
    source,
    measurement,
    data,
    dataSource
  }) => {
    if (source.name !== initMeasurementService_CORNERSTONE_3D_TOOLS_SOURCE_NAME) {
      return;
    }
    const {
      referenceSeriesUID,
      referenceStudyUID,
      SOPInstanceUID
    } = measurement;
    const instance = src/* DicomMetadataStore */.H8.getInstance(referenceStudyUID, referenceSeriesUID, SOPInstanceUID);
    let imageId;
    let frameNumber = 1;
    if (measurement?.metadata?.referencedImageId) {
      imageId = measurement.metadata.referencedImageId;
      frameNumber = getSOPInstanceAttributes(measurement.metadata.referencedImageId).frameNumber;
    } else {
      imageId = dataSource.getImageIdsForInstance({
        instance
      });
    }

    /**
     * This annotation is used by the cornerstone viewport.
     * This is not the read-only annotation rendered by the SR viewport.
     */
    const annotationManager = dist_esm.annotation.state.getAnnotationManager();
    annotationManager.addAnnotation({
      annotationUID: measurement.uid,
      highlighted: false,
      isLocked: false,
      invalidated: false,
      metadata: {
        toolName: measurement.toolName,
        FrameOfReferenceUID: measurement.FrameOfReferenceUID,
        referencedImageId: imageId
      },
      data: {
        /**
         * Don't remove this destructuring of data here.
         * This is used to pass annotation specific data forward e.g. contour
         */
        ...(data.annotation.data || {}),
        text: data.annotation.data.text,
        handles: {
          ...data.annotation.data.handles
        },
        cachedStats: {
          ...data.annotation.data.cachedStats
        },
        label: data.annotation.data.label,
        frameNumber
      }
    });
  });
  measurementService.subscribe(MEASUREMENT_REMOVED, ({
    source,
    measurement: removedMeasurementId
  }) => {
    if (source?.name && source.name !== initMeasurementService_CORNERSTONE_3D_TOOLS_SOURCE_NAME) {
      return;
    }
    removeAnnotation(removedMeasurementId);
    const renderingEngine = cornerstoneViewportService.getRenderingEngine();
    // Note: We could do a better job by triggering the render on the
    // viewport itself, but the removeAnnotation does not include that info...
    renderingEngine.render();
  });
};

;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/initCineService.ts


function _getVolumeFromViewport(viewport) {
  const volumeIds = viewport.getAllVolumeIds();
  const volumes = volumeIds.map(id => esm.cache.getVolume(id));
  const dynamicVolume = volumes.find(volume => volume.isDynamicVolume());
  return dynamicVolume ?? volumes[0];
}

/**
 * Return all viewports that needs to be synchronized with the source
 * viewport passed as parameter when cine is updated.
 * @param servicesManager ServiceManager
 * @param srcViewportIndex Source viewport index
 * @returns array with viewport information.
 */
function _getSyncedViewports(servicesManager, srcViewportId) {
  const {
    viewportGridService,
    cornerstoneViewportService
  } = servicesManager.services;
  const {
    viewports: viewportsStates
  } = viewportGridService.getState();
  const srcViewportState = viewportsStates.get(srcViewportId);
  if (srcViewportState?.viewportOptions?.viewportType !== 'volume') {
    return [];
  }
  const srcViewport = cornerstoneViewportService.getCornerstoneViewport(srcViewportId);
  const srcVolume = srcViewport ? _getVolumeFromViewport(srcViewport) : null;
  if (!srcVolume?.isDynamicVolume()) {
    return [];
  }
  const {
    volumeId: srcVolumeId
  } = srcVolume;
  return Array.from(viewportsStates.values()).filter(({
    viewportId
  }) => {
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    return viewportId !== srcViewportId && viewport?.hasVolumeId(srcVolumeId);
  }).map(({
    viewportId
  }) => ({
    viewportId
  }));
}
function initCineService(servicesManager) {
  const {
    cineService
  } = servicesManager.services;
  const getSyncedViewports = viewportId => {
    return _getSyncedViewports(servicesManager, viewportId);
  };
  const playClip = (element, playClipOptions) => {
    return dist_esm.utilities.cine.playClip(element, playClipOptions);
  };
  const stopClip = (element, stopClipOptions) => {
    return dist_esm.utilities.cine.stopClip(element, stopClipOptions);
  };
  cineService.setServiceImplementation({
    getSyncedViewports,
    playClip,
    stopClip
  });
}
/* harmony default export */ const src_initCineService = (initCineService);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/initStudyPrefetcherService.ts

function initStudyPrefetcherService(servicesManager) {
  const {
    studyPrefetcherService
  } = servicesManager.services;
  studyPrefetcherService.requestType = esm.Enums.RequestType.Prefetch;
  studyPrefetcherService.imageLoadPoolManager = esm.imageLoadPoolManager;
  studyPrefetcherService.imageLoader = esm.imageLoader;
  studyPrefetcherService.cache = {
    isImageCached(imageId) {
      return !!esm.cache.getImageLoadObject(imageId);
    }
  };
  studyPrefetcherService.imageLoadEventsManager = {
    addEventListeners(onImageLoaded, onImageLoadFailed) {
      esm.eventTarget.addEventListener(esm.EVENTS.IMAGE_LOADED, onImageLoaded);
      esm.eventTarget.addEventListener(esm.EVENTS.IMAGE_LOAD_FAILED, onImageLoadFailed);
      return [{
        unsubscribe: () => esm.eventTarget.removeEventListener(esm.EVENTS.IMAGE_LOADED, onImageLoaded)
      }, {
        unsubscribe: () => esm.eventTarget.removeEventListener(esm.EVENTS.IMAGE_LOAD_FAILED, onImageLoadFailed)
      }];
    }
  };
}
/* harmony default export */ const src_initStudyPrefetcherService = (initStudyPrefetcherService);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/getInterleavedFrames.js
function getInterleavedFrames(imageIds) {
  const minImageIdIndex = 0;
  const maxImageIdIndex = imageIds.length - 1;
  const middleImageIdIndex = Math.floor(imageIds.length / 2);
  let lowerImageIdIndex = middleImageIdIndex;
  let upperImageIdIndex = middleImageIdIndex;

  // Build up an array of images to prefetch, starting with the current image.
  const imageIdsToPrefetch = [{
    imageId: imageIds[middleImageIdIndex],
    imageIdIndex: middleImageIdIndex
  }];
  const prefetchQueuedFilled = {
    currentPositionDownToMinimum: false,
    currentPositionUpToMaximum: false
  };

  // Check if on edges and some criteria is already fulfilled

  if (middleImageIdIndex === minImageIdIndex) {
    prefetchQueuedFilled.currentPositionDownToMinimum = true;
  } else if (middleImageIdIndex === maxImageIdIndex) {
    prefetchQueuedFilled.currentPositionUpToMaximum = true;
  }
  while (!prefetchQueuedFilled.currentPositionDownToMinimum || !prefetchQueuedFilled.currentPositionUpToMaximum) {
    if (!prefetchQueuedFilled.currentPositionDownToMinimum) {
      // Add imageId below
      lowerImageIdIndex--;
      imageIdsToPrefetch.push({
        imageId: imageIds[lowerImageIdIndex],
        imageIdIndex: lowerImageIdIndex
      });
      if (lowerImageIdIndex === minImageIdIndex) {
        prefetchQueuedFilled.currentPositionDownToMinimum = true;
      }
    }
    if (!prefetchQueuedFilled.currentPositionUpToMaximum) {
      // Add imageId above
      upperImageIdIndex++;
      imageIdsToPrefetch.push({
        imageId: imageIds[upperImageIdIndex],
        imageIdIndex: upperImageIdIndex
      });
      if (upperImageIdIndex === maxImageIdIndex) {
        prefetchQueuedFilled.currentPositionUpToMaximum = true;
      }
    }
  }
  return imageIdsToPrefetch;
}
// EXTERNAL MODULE: ../../../node_modules/lodash/lodash.js
var lodash = __webpack_require__(637);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/interleaveCenterLoader.ts




// Map of volumeId and SeriesInstanceId
const volumeIdMapsToLoad = new Map();
const viewportIdVolumeInputArrayMap = new Map();

/**
 * This function caches the volumeUIDs until all the volumes inside the
 * hanging protocol are initialized. Then it goes through the imageIds
 * of the volumes, and interleave them, in order for the volumes to be loaded
 * together from middle to the start and the end.
 * @param {Object} props image loading properties from Cornerstone ViewportService
 * @returns
 */
function interleaveCenterLoader({
  data: {
    viewportId,
    volumeInputArray
  },
  displaySetsMatchDetails,
  viewportMatchDetails: matchDetails
}) {
  viewportIdVolumeInputArrayMap.set(viewportId, volumeInputArray);

  // Based on the volumeInputs store the volumeIds and SeriesInstanceIds
  // to keep track of the volumes being loaded
  for (const volumeInput of volumeInputArray) {
    const {
      volumeId
    } = volumeInput;
    const volume = esm.cache.getVolume(volumeId);
    if (!volume) {
      return;
    }

    // if the volumeUID is not in the volumeUIDs array, add it
    if (!volumeIdMapsToLoad.has(volumeId)) {
      const {
        metadata
      } = volume;
      volumeIdMapsToLoad.set(volumeId, metadata.SeriesInstanceUID);
    }
  }

  /**
   * The following is checking if all the viewports that were matched in the HP has been
   * successfully created their cornerstone viewport or not. Todo: This can be
   * improved by not checking it, and as soon as the matched DisplaySets have their
   * volume loaded, we start the loading, but that comes at the cost of viewports
   * not being created yet (e.g., in a 10 viewport ptCT fusion, when one ct viewport and one
   * pt viewport are created we have a guarantee that the volumes are created in the cache
   * but the rest of the viewports (fusion, mip etc.) are not created yet. So
   * we can't initiate setting the volumes for those viewports. One solution can be
   * to add an event when a viewport is created (not enabled element event) and then
   * listen to it and as the other viewports are created we can set the volumes for them
   * since volumes are already started loading.
   */
  const uniqueViewportVolumeDisplaySetUIDs = new Set();
  viewportIdVolumeInputArrayMap.forEach((volumeInputArray, viewportId) => {
    volumeInputArray.forEach(volumeInput => {
      const {
        volumeId
      } = volumeInput;
      uniqueViewportVolumeDisplaySetUIDs.add(volumeId);
    });
  });
  const uniqueMatchedDisplaySetUIDs = new Set();
  matchDetails.forEach(matchDetail => {
    const {
      displaySetsInfo
    } = matchDetail;
    displaySetsInfo.forEach(({
      displaySetInstanceUID
    }) => {
      uniqueMatchedDisplaySetUIDs.add(displaySetInstanceUID);
    });
  });
  if (uniqueViewportVolumeDisplaySetUIDs.size !== uniqueMatchedDisplaySetUIDs.size) {
    return;
  }
  const volumeIds = Array.from(volumeIdMapsToLoad.keys()).slice();
  // get volumes from cache
  const volumes = volumeIds.map(volumeId => {
    return esm.cache.getVolume(volumeId);
  });

  // iterate over all volumes, and get their imageIds, and interleave
  // the imageIds and save them in AllRequests for later use
  const AllRequests = [];
  volumes.forEach(volume => {
    const requests = volume.getImageLoadRequests();
    if (!requests.length || !requests[0] || !requests[0].imageId) {
      return;
    }
    const requestImageIds = requests.map(request => {
      return request.imageId;
    });
    const imageIds = getInterleavedFrames(requestImageIds);
    const reOrderedRequests = imageIds.map(({
      imageId
    }) => {
      const request = requests.find(req => req.imageId === imageId);
      return request;
    });
    AllRequests.push(reOrderedRequests);
  });

  // flatten the AllRequests array, which will result in a list of all the
  // imageIds for all the volumes but interleaved
  const interleavedRequests = (0,lodash.compact)((0,lodash.flatten)((0,lodash.zip)(...AllRequests)));

  // set the finalRequests to the imageLoadPoolManager
  const finalRequests = [];
  interleavedRequests.forEach(request => {
    const {
      imageId
    } = request;
    AllRequests.forEach(volumeRequests => {
      const volumeImageIdRequest = volumeRequests.find(req => req.imageId === imageId);
      if (volumeImageIdRequest) {
        finalRequests.push(volumeImageIdRequest);
      }
    });
  });
  const requestType = esm.Enums.RequestType.Prefetch;
  const priority = 0;
  finalRequests.forEach(({
    callLoadImage,
    additionalDetails,
    imageId,
    imageIdIndex,
    options
  }) => {
    const callLoadImageBound = callLoadImage.bind(null, imageId, imageIdIndex, options);
    esm.imageLoadPoolManager.addRequest(callLoadImageBound, requestType, additionalDetails, priority);
  });

  // clear the volumeIdMapsToLoad
  volumeIdMapsToLoad.clear();

  // copy the viewportIdVolumeInputArrayMap
  const viewportIdVolumeInputArrayMapCopy = new Map(viewportIdVolumeInputArrayMap);

  // reset the viewportIdVolumeInputArrayMap
  viewportIdVolumeInputArrayMap.clear();
  return viewportIdVolumeInputArrayMapCopy;
}
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/getNthFrames.js
/**
 * Returns a re-ordered array consisting of, in order:
 *    1. First few objects
 *    2. Center objects
 *    3. Last few objects
 *    4. nth Objects (n=7), set 2
 *    5. nth Objects set 5,
 *    6. Remaining objects
 * What this does is return the first/center/start objects, as those
 * are often used first, then a selection of objects scattered over the
 * instances in order to allow making requests over a set of image instances.
 *
 * @param {[]} imageIds
 * @returns [] reordered to be an nth selection
 */
function getNthFrames(imageIds) {
  const frames = [[], [], [], [], []];
  const centerStart = imageIds.length / 2 - 3;
  const centerEnd = centerStart + 6;
  for (let i = 0; i < imageIds.length; i++) {
    if (i < 2 || i > imageIds.length - 4 || i > centerStart && i < centerEnd) {
      frames[0].push(imageIds[i]);
    } else if (i % 7 === 2) {
      frames[1].push(imageIds[i]);
    } else if (i % 7 === 5) {
      frames[2].push(imageIds[i]);
    } else {
      frames[i % 2 + 3].push(imageIds[i]);
    }
  }
  const ret = [...frames[0], ...frames[1], ...frames[2], ...frames[3], ...frames[4]];
  return ret;
}
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/interleave.js
/**
 * Interleave the items from all the lists so that the first items are first
 * in the returned list, the second items are next etc.
 * Does this in a O(n) fashion, and return lists[0] if there is only one list.
 *
 * @param {[]} lists
 * @returns [] reordered to be breadth first traversal of lists
 */
function interleave(lists) {
  if (!lists || !lists.length) {
    return [];
  }
  if (lists.length === 1) {
    return lists[0];
  }
  console.time('interleave');
  const useLists = [...lists];
  const ret = [];
  for (let i = 0; useLists.length > 0; i++) {
    for (const list of useLists) {
      if (i >= list.length) {
        useLists.splice(useLists.indexOf(list), 1);
        continue;
      }
      ret.push(list[i]);
    }
  }
  console.timeEnd('interleave');
  return ret;
}
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/nthLoader.ts




// Map of volumeId and SeriesInstanceId
const nthLoader_volumeIdMapsToLoad = new Map();
const nthLoader_viewportIdVolumeInputArrayMap = new Map();

/**
 * This function caches the volumeUIDs until all the volumes inside the
 * hanging protocol are initialized. Then it goes through the requests and
 * chooses a sub-selection starting the the first few objects, center objects
 * and last objects, and then the remaining nth images until all instances are
 * retrieved.  This causes the image to have a progressive load order and looks
 * visually much better.
 * @param {Object} props image loading properties from Cornerstone ViewportService
 */
function interleaveNthLoader({
  data: {
    viewportId,
    volumeInputArray
  },
  displaySetsMatchDetails
}) {
  nthLoader_viewportIdVolumeInputArrayMap.set(viewportId, volumeInputArray);

  // Based on the volumeInputs store the volumeIds and SeriesInstanceIds
  // to keep track of the volumes being loaded
  for (const volumeInput of volumeInputArray) {
    const {
      volumeId
    } = volumeInput;
    const volume = esm.cache.getVolume(volumeId);
    if (!volume) {
      console.log("interleaveNthLoader::No volume, can't load it");
      return;
    }

    // if the volumeUID is not in the volumeUIDs array, add it
    if (!nthLoader_volumeIdMapsToLoad.has(volumeId)) {
      const {
        metadata
      } = volume;
      nthLoader_volumeIdMapsToLoad.set(volumeId, metadata.SeriesInstanceUID);
    }
  }
  const volumeIds = Array.from(nthLoader_volumeIdMapsToLoad.keys()).slice();
  // get volumes from cache
  const volumes = volumeIds.map(volumeId => {
    return esm.cache.getVolume(volumeId);
  });

  // iterate over all volumes, and get their imageIds, and interleave
  // the imageIds and save them in AllRequests for later use
  const originalRequests = volumes.map(volume => volume.getImageLoadRequests()).filter(requests => requests?.[0]?.imageId);
  const orderedRequests = originalRequests.map(request => getNthFrames(request));

  // set the finalRequests to the imageLoadPoolManager
  const finalRequests = interleave(orderedRequests);
  const requestType = esm.Enums.RequestType.Prefetch;
  const priority = 0;
  finalRequests.forEach(({
    callLoadImage,
    additionalDetails,
    imageId,
    imageIdIndex,
    options
  }) => {
    const callLoadImageBound = callLoadImage.bind(null, imageId, imageIdIndex, options);
    esm.imageLoadPoolManager.addRequest(callLoadImageBound, requestType, additionalDetails, priority);
  });

  // clear the volumeIdMapsToLoad
  nthLoader_volumeIdMapsToLoad.clear();

  // copy the viewportIdVolumeInputArrayMap
  const viewportIdVolumeInputArrayMapCopy = new Map(nthLoader_viewportIdVolumeInputArrayMap);

  // reset the viewportIdVolumeInputArrayMap
  nthLoader_viewportIdVolumeInputArrayMap.clear();
  return viewportIdVolumeInputArrayMapCopy;
}
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/interleaveTopToBottom.ts



// Map of volumeId and SeriesInstanceId
const interleaveTopToBottom_volumeIdMapsToLoad = new Map();
const interleaveTopToBottom_viewportIdVolumeInputArrayMap = new Map();

/**
 * This function caches the volumeIds until all the volumes inside the
 * hanging protocol are initialized. Then it goes through the imageIds
 * of the volumes, and interleave them, in order for the volumes to be loaded
 * together from middle to the start and the end.
 * @param {Object} {viewportData, displaySetMatchDetails}
 * @returns
 */
function interleaveTopToBottom({
  data: {
    viewportId,
    volumeInputArray
  },
  displaySetsMatchDetails,
  viewportMatchDetails: matchDetails
}) {
  interleaveTopToBottom_viewportIdVolumeInputArrayMap.set(viewportId, volumeInputArray);

  // Based on the volumeInputs store the volumeIds and SeriesInstanceIds
  // to keep track of the volumes being loaded
  for (const volumeInput of volumeInputArray) {
    const {
      volumeId
    } = volumeInput;
    const volume = esm.cache.getVolume(volumeId);
    if (!volume) {
      return;
    }

    // if the volumeUID is not in the volumeUIDs array, add it
    if (!interleaveTopToBottom_volumeIdMapsToLoad.has(volumeId)) {
      const {
        metadata
      } = volume;
      interleaveTopToBottom_volumeIdMapsToLoad.set(volumeId, metadata.SeriesInstanceUID);
    }
  }
  const filteredMatchDetails = [];
  const displaySetsToLoad = new Set();

  // Check all viewports that have a displaySet to be loaded. In some cases
  // (eg: line chart viewports which is not a Cornerstone viewport) the
  // displaySet is created on the client and there are no instances to be
  // downloaded. For those viewports the displaySet may have the `skipLoading`
  // option set to true otherwise it may block the download of all other
  // instances resulting in blank viewports.
  Array.from(matchDetails.values()).forEach(curMatchDetails => {
    const {
      displaySetsInfo
    } = curMatchDetails;
    let numDisplaySetsToLoad = 0;
    displaySetsInfo.forEach(({
      displaySetInstanceUID,
      displaySetOptions
    }) => {
      if (!displaySetOptions?.options?.skipLoading) {
        numDisplaySetsToLoad++;
        displaySetsToLoad.add(displaySetInstanceUID);
      }
    });
    if (numDisplaySetsToLoad) {
      filteredMatchDetails.push(curMatchDetails);
    }
  });

  /**
   * The following is checking if all the viewports that were matched in the HP has been
   * successfully created their cornerstone viewport or not. Todo: This can be
   * improved by not checking it, and as soon as the matched DisplaySets have their
   * volume loaded, we start the loading, but that comes at the cost of viewports
   * not being created yet (e.g., in a 10 viewport ptCT fusion, when one ct viewport and one
   * pt viewport are created we have a guarantee that the volumes are created in the cache
   * but the rest of the viewports (fusion, mip etc.) are not created yet. So
   * we can't initiate setting the volumes for those viewports. One solution can be
   * to add an event when a viewport is created (not enabled element event) and then
   * listen to it and as the other viewports are created we can set the volumes for them
   * since volumes are already started loading.
   */
  const uniqueViewportVolumeDisplaySetUIDs = new Set();
  interleaveTopToBottom_viewportIdVolumeInputArrayMap.forEach((volumeInputArray, viewportId) => {
    volumeInputArray.forEach(volumeInput => {
      const {
        volumeId
      } = volumeInput;
      uniqueViewportVolumeDisplaySetUIDs.add(volumeId);
    });
  });
  const uniqueMatchedDisplaySetUIDs = new Set();
  matchDetails.forEach(matchDetail => {
    const {
      displaySetsInfo
    } = matchDetail;
    displaySetsInfo.forEach(({
      displaySetInstanceUID
    }) => {
      uniqueMatchedDisplaySetUIDs.add(displaySetInstanceUID);
    });
  });
  if (uniqueViewportVolumeDisplaySetUIDs.size !== uniqueMatchedDisplaySetUIDs.size) {
    return;
  }
  const volumeIds = Array.from(interleaveTopToBottom_volumeIdMapsToLoad.keys()).slice();
  // get volumes from cache
  const volumes = volumeIds.map(volumeId => {
    return esm.cache.getVolume(volumeId);
  });

  // iterate over all volumes, and get their imageIds, and interleave
  // the imageIds and save them in AllRequests for later use
  const AllRequests = [];
  volumes.forEach(volume => {
    const requests = volume.getImageLoadRequests();
    if (!requests.length || !requests[0] || !requests[0].imageId) {
      return;
    }

    // reverse the requests
    AllRequests.push(requests.reverse());
  });

  // flatten the AllRequests array, which will result in a list of all the
  // imageIds for all the volumes but interleaved
  const interleavedRequests = (0,lodash.compact)((0,lodash.flatten)((0,lodash.zip)(...AllRequests)));

  // set the finalRequests to the imageLoadPoolManager
  const finalRequests = [];
  interleavedRequests.forEach(request => {
    const {
      imageId
    } = request;
    AllRequests.forEach(volumeRequests => {
      const volumeImageIdRequest = volumeRequests.find(req => req.imageId === imageId);
      if (volumeImageIdRequest) {
        finalRequests.push(volumeImageIdRequest);
      }
    });
  });
  const requestType = esm.Enums.RequestType.Prefetch;
  const priority = 0;
  finalRequests.forEach(({
    callLoadImage,
    additionalDetails,
    imageId,
    imageIdIndex,
    options
  }) => {
    const callLoadImageBound = callLoadImage.bind(null, imageId, imageIdIndex, options);
    esm.imageLoadPoolManager.addRequest(callLoadImageBound, requestType, additionalDetails, priority);
  });

  // clear the volumeIdMapsToLoad
  interleaveTopToBottom_volumeIdMapsToLoad.clear();

  // copy the viewportIdVolumeInputArrayMap
  const viewportIdVolumeInputArrayMapCopy = new Map(interleaveTopToBottom_viewportIdVolumeInputArrayMap);

  // reset the viewportIdVolumeInputArrayMap
  interleaveTopToBottom_viewportIdVolumeInputArrayMap.clear();
  return viewportIdVolumeInputArrayMapCopy;
}
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/findNearbyToolData.ts
/**
 * Finds tool nearby event position triggered.
 *
 * @param {Object} commandsManager mannager of commands
 * @param {Object} event that has being triggered
 * @returns cs toolData or undefined if not found.
 */
const findNearbyToolData = (commandsManager, evt) => {
  if (!evt?.detail) {
    return;
  }
  const {
    element,
    currentPoints
  } = evt.detail;
  return commandsManager.runCommand('getNearbyAnnotation', {
    element,
    canvasCoordinates: currentPoints?.canvas
  }, 'CORNERSTONE');
};
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/initContextMenu.ts




const cs3DToolsEvents = dist_esm.Enums.Events;
const DEFAULT_CONTEXT_MENU_CLICKS = {
  button1: {
    commands: [{
      commandName: 'closeContextMenu'
    }]
  },
  button3: {
    commands: [{
      commandName: 'showCornerstoneContextMenu',
      commandOptions: {
        requireNearbyToolData: true,
        menuId: 'measurementsContextMenu'
      }
    }]
  }
};

/**
 * Generates a name, consisting of:
 *    * alt when the alt key is down
 *    * ctrl when the cctrl key is down
 *    * shift when the shift key is down
 *    * 'button' followed by the button number (1 left, 3 right etc)
 */
function getEventName(evt) {
  const button = evt.detail.event.which;
  const nameArr = [];
  if (evt.detail.event.altKey) {
    nameArr.push('alt');
  }
  if (evt.detail.event.ctrlKey) {
    nameArr.push('ctrl');
  }
  if (evt.detail.event.shiftKey) {
    nameArr.push('shift');
  }
  nameArr.push('button');
  nameArr.push(button);
  return nameArr.join('');
}
function initContextMenu({
  cornerstoneViewportService,
  customizationService,
  commandsManager
}) {
  /*
   * Run the commands associated with the given button press,
   * defaults on button1 and button2
   */
  const cornerstoneViewportHandleEvent = (name, evt) => {
    const customizations = customizationService.get('cornerstoneViewportClickCommands') || DEFAULT_CONTEXT_MENU_CLICKS;
    const toRun = customizations[name];
    if (!toRun) {
      return;
    }

    // only find nearbyToolData if required, for the click (which closes the context menu
    // we don't need to find nearbyToolData)
    let nearbyToolData = null;
    if (toRun.commands.some(command => command.commandOptions?.requireNearbyToolData)) {
      nearbyToolData = findNearbyToolData(commandsManager, evt);
    }
    const options = {
      nearbyToolData,
      event: evt
    };
    commandsManager.run(toRun, options);
  };
  const cornerstoneViewportHandleClick = evt => {
    const name = getEventName(evt);
    cornerstoneViewportHandleEvent(name, evt);
  };
  function elementEnabledHandler(evt) {
    const {
      viewportId,
      element
    } = evt.detail;
    const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
    if (!viewportInfo) {
      return;
    }
    // TODO check update upstream
    (0,state/* setEnabledElement */.ye)(viewportId, element);
    element.addEventListener(cs3DToolsEvents.MOUSE_CLICK, cornerstoneViewportHandleClick);
  }
  function elementDisabledHandler(evt) {
    const {
      element
    } = evt.detail;
    element.removeEventListener(cs3DToolsEvents.MOUSE_CLICK, cornerstoneViewportHandleClick);
  }
  esm.eventTarget.addEventListener(esm.EVENTS.ELEMENT_ENABLED, elementEnabledHandler.bind(null));
  esm.eventTarget.addEventListener(esm.EVENTS.ELEMENT_DISABLED, elementDisabledHandler.bind(null));
}
/* harmony default export */ const src_initContextMenu = (initContextMenu);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/initDoubleClick.ts



const initDoubleClick_cs3DToolsEvents = dist_esm.Enums.Events;
const DEFAULT_DOUBLE_CLICK = {
  doubleClick: {
    commandName: 'toggleOneUp',
    commandOptions: {}
  }
};

/**
 * Generates a double click event name, consisting of:
 *    * alt when the alt key is down
 *    * ctrl when the cctrl key is down
 *    * shift when the shift key is down
 *    * 'doubleClick'
 */
function getDoubleClickEventName(evt) {
  const nameArr = [];
  if (evt.detail.event.altKey) {
    nameArr.push('alt');
  }
  if (evt.detail.event.ctrlKey) {
    nameArr.push('ctrl');
  }
  if (evt.detail.event.shiftKey) {
    nameArr.push('shift');
  }
  nameArr.push('doubleClick');
  return nameArr.join('');
}
function initDoubleClick({
  customizationService,
  commandsManager
}) {
  const cornerstoneViewportHandleDoubleClick = evt => {
    // Do not allow double click on a tool.
    const nearbyToolData = findNearbyToolData(commandsManager, evt);
    if (nearbyToolData) {
      return;
    }
    const eventName = getDoubleClickEventName(evt);

    // Allows for the customization of the double click on a viewport.
    const customizations = customizationService.get('cornerstoneViewportClickCommands') || DEFAULT_DOUBLE_CLICK;
    const toRun = customizations[eventName];
    if (!toRun) {
      return;
    }
    commandsManager.run(toRun);
  };
  function elementEnabledHandler(evt) {
    const {
      element
    } = evt.detail;
    element.addEventListener(initDoubleClick_cs3DToolsEvents.MOUSE_DOUBLE_CLICK, cornerstoneViewportHandleDoubleClick);
  }
  function elementDisabledHandler(evt) {
    const {
      element
    } = evt.detail;
    element.removeEventListener(initDoubleClick_cs3DToolsEvents.MOUSE_DOUBLE_CLICK, cornerstoneViewportHandleDoubleClick);
  }
  esm.eventTarget.addEventListener(esm.EVENTS.ELEMENT_ENABLED, elementEnabledHandler.bind(null));
  esm.eventTarget.addEventListener(esm.EVENTS.ELEMENT_DISABLED, elementDisabledHandler.bind(null));
}
/* harmony default export */ const src_initDoubleClick = (initDoubleClick);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/initViewTiming.ts


const IMAGE_TIMING_KEYS = [];
const imageTiming = {
  viewportsWaiting: 0
};

/**
 * Defines the initial view timing reporting.
 * This allows knowing how many viewports are waiting for initial views and
 * when the IMAGE_RENDERED gets sent out.
 * The first image rendered will fire the FIRST_IMAGE timeEnd logs, while
 * the last of the enabled viewport will fire the ALL_IMAGES timeEnd logs.
 *
 */

function initViewTiming({
  element
}) {
  if (!IMAGE_TIMING_KEYS.length) {
    // Work around a bug in WebPack that doesn't getting the enums initialized
    // quite fast enough to be declared statically.
    const {
      /* TimingEnum */ "W": TimingEnum
    } = src/* Enums */.fX;
    IMAGE_TIMING_KEYS.push(TimingEnum.DISPLAY_SETS_TO_ALL_IMAGES, TimingEnum.DISPLAY_SETS_TO_FIRST_IMAGE, TimingEnum.STUDY_TO_FIRST_IMAGE);
  }
  if (!IMAGE_TIMING_KEYS.find(key => src/* log */.Rm.timingKeys[key])) {
    return;
  }
  imageTiming.viewportsWaiting += 1;
  element.addEventListener(esm.EVENTS.IMAGE_RENDERED, imageRenderedListener);
}
function imageRenderedListener(evt) {
  if (evt.detail.viewportStatus === 'preRender') {
    return;
  }
  const {
    /* TimingEnum */ "W": TimingEnum
  } = src/* Enums */.fX;
  src/* log */.Rm.timeEnd(TimingEnum.DISPLAY_SETS_TO_FIRST_IMAGE);
  src/* log */.Rm.timeEnd(TimingEnum.STUDY_TO_FIRST_IMAGE);
  src/* log */.Rm.timeEnd(TimingEnum.SCRIPT_TO_VIEW);
  imageTiming.viewportsWaiting -= 1;
  evt.detail.element.removeEventListener(esm.EVENTS.IMAGE_RENDERED, imageRenderedListener);
  if (!imageTiming.viewportsWaiting) {
    src/* log */.Rm.timeEnd(TimingEnum.DISPLAY_SETS_TO_ALL_IMAGES);
  }
}
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/colormaps.js
const colormaps = [{
  ColorSpace: 'RGB',
  Name: 'Grayscale',
  name: 'Grayscale',
  NanColor: [1, 0, 0],
  RGBPoints: [0, 0, 0, 0, 1, 1, 1, 1],
  description: 'Grayscale'
}, {
  ColorSpace: 'RGB',
  Name: 'X Ray',
  name: 'X Ray',
  NanColor: [1, 0, 0],
  RGBPoints: [0, 1, 1, 1, 1, 0, 0, 0],
  description: 'X Ray'
}, {
  ColorSpace: 'RGB',
  Name: 'hsv',
  name: 'hsv',
  RGBPoints: [-1, 1, 0, 0, -0.666666, 1, 0, 1, -0.333333, 0, 0, 1, 0, 0, 1, 1, 0.33333, 0, 1, 0, 0.66666, 1, 1, 0, 1, 1, 0, 0],
  description: 'HSV'
}, {
  ColorSpace: 'RGB',
  Name: 'hot_iron',
  name: 'hot_iron',
  RGBPoints: [0.0, 0.0039215686, 0.0039215686, 0.0156862745, 0.00392156862745098, 0.0039215686, 0.0039215686, 0.0156862745, 0.00784313725490196, 0.0039215686, 0.0039215686, 0.031372549, 0.011764705882352941, 0.0039215686, 0.0039215686, 0.0470588235, 0.01568627450980392, 0.0039215686, 0.0039215686, 0.062745098, 0.0196078431372549, 0.0039215686, 0.0039215686, 0.0784313725, 0.023529411764705882, 0.0039215686, 0.0039215686, 0.0941176471, 0.027450980392156862, 0.0039215686, 0.0039215686, 0.1098039216, 0.03137254901960784, 0.0039215686, 0.0039215686, 0.1254901961, 0.03529411764705882, 0.0039215686, 0.0039215686, 0.1411764706, 0.0392156862745098, 0.0039215686, 0.0039215686, 0.1568627451, 0.043137254901960784, 0.0039215686, 0.0039215686, 0.1725490196, 0.047058823529411764, 0.0039215686, 0.0039215686, 0.1882352941, 0.050980392156862744, 0.0039215686, 0.0039215686, 0.2039215686, 0.054901960784313725, 0.0039215686, 0.0039215686, 0.2196078431, 0.05882352941176471, 0.0039215686, 0.0039215686, 0.2352941176, 0.06274509803921569, 0.0039215686, 0.0039215686, 0.2509803922, 0.06666666666666667, 0.0039215686, 0.0039215686, 0.262745098, 0.07058823529411765, 0.0039215686, 0.0039215686, 0.2784313725, 0.07450980392156863, 0.0039215686, 0.0039215686, 0.2941176471, 0.0784313725490196, 0.0039215686, 0.0039215686, 0.3098039216, 0.08235294117647059, 0.0039215686, 0.0039215686, 0.3254901961, 0.08627450980392157, 0.0039215686, 0.0039215686, 0.3411764706, 0.09019607843137255, 0.0039215686, 0.0039215686, 0.3568627451, 0.09411764705882353, 0.0039215686, 0.0039215686, 0.3725490196, 0.09803921568627451, 0.0039215686, 0.0039215686, 0.3882352941, 0.10196078431372549, 0.0039215686, 0.0039215686, 0.4039215686, 0.10588235294117647, 0.0039215686, 0.0039215686, 0.4196078431, 0.10980392156862745, 0.0039215686, 0.0039215686, 0.4352941176, 0.11372549019607843, 0.0039215686, 0.0039215686, 0.4509803922, 0.11764705882352942, 0.0039215686, 0.0039215686, 0.4666666667, 0.12156862745098039, 0.0039215686, 0.0039215686, 0.4823529412, 0.12549019607843137, 0.0039215686, 0.0039215686, 0.4980392157, 0.12941176470588237, 0.0039215686, 0.0039215686, 0.5137254902, 0.13333333333333333, 0.0039215686, 0.0039215686, 0.5294117647, 0.13725490196078433, 0.0039215686, 0.0039215686, 0.5450980392, 0.1411764705882353, 0.0039215686, 0.0039215686, 0.5607843137, 0.1450980392156863, 0.0039215686, 0.0039215686, 0.5764705882, 0.14901960784313725, 0.0039215686, 0.0039215686, 0.5921568627, 0.15294117647058825, 0.0039215686, 0.0039215686, 0.6078431373, 0.1568627450980392, 0.0039215686, 0.0039215686, 0.6235294118, 0.1607843137254902, 0.0039215686, 0.0039215686, 0.6392156863, 0.16470588235294117, 0.0039215686, 0.0039215686, 0.6549019608, 0.16862745098039217, 0.0039215686, 0.0039215686, 0.6705882353, 0.17254901960784313, 0.0039215686, 0.0039215686, 0.6862745098, 0.17647058823529413, 0.0039215686, 0.0039215686, 0.7019607843, 0.1803921568627451, 0.0039215686, 0.0039215686, 0.7176470588, 0.1843137254901961, 0.0039215686, 0.0039215686, 0.7333333333, 0.18823529411764706, 0.0039215686, 0.0039215686, 0.7490196078, 0.19215686274509805, 0.0039215686, 0.0039215686, 0.7607843137, 0.19607843137254902, 0.0039215686, 0.0039215686, 0.7764705882, 0.2, 0.0039215686, 0.0039215686, 0.7921568627, 0.20392156862745098, 0.0039215686, 0.0039215686, 0.8078431373, 0.20784313725490197, 0.0039215686, 0.0039215686, 0.8235294118, 0.21176470588235294, 0.0039215686, 0.0039215686, 0.8392156863, 0.21568627450980393, 0.0039215686, 0.0039215686, 0.8549019608, 0.2196078431372549, 0.0039215686, 0.0039215686, 0.8705882353, 0.2235294117647059, 0.0039215686, 0.0039215686, 0.8862745098, 0.22745098039215686, 0.0039215686, 0.0039215686, 0.9019607843, 0.23137254901960785, 0.0039215686, 0.0039215686, 0.9176470588, 0.23529411764705885, 0.0039215686, 0.0039215686, 0.9333333333, 0.23921568627450984, 0.0039215686, 0.0039215686, 0.9490196078, 0.24313725490196078, 0.0039215686, 0.0039215686, 0.9647058824, 0.24705882352941178, 0.0039215686, 0.0039215686, 0.9803921569, 0.25098039215686274, 0.0039215686, 0.0039215686, 0.9960784314, 0.2549019607843137, 0.0039215686, 0.0039215686, 0.9960784314, 0.25882352941176473, 0.0156862745, 0.0039215686, 0.9803921569, 0.2627450980392157, 0.031372549, 0.0039215686, 0.9647058824, 0.26666666666666666, 0.0470588235, 0.0039215686, 0.9490196078, 0.27058823529411763, 0.062745098, 0.0039215686, 0.9333333333, 0.27450980392156865, 0.0784313725, 0.0039215686, 0.9176470588, 0.2784313725490196, 0.0941176471, 0.0039215686, 0.9019607843, 0.2823529411764706, 0.1098039216, 0.0039215686, 0.8862745098, 0.28627450980392155, 0.1254901961, 0.0039215686, 0.8705882353, 0.2901960784313726, 0.1411764706, 0.0039215686, 0.8549019608, 0.29411764705882354, 0.1568627451, 0.0039215686, 0.8392156863, 0.2980392156862745, 0.1725490196, 0.0039215686, 0.8235294118, 0.30196078431372547, 0.1882352941, 0.0039215686, 0.8078431373, 0.3058823529411765, 0.2039215686, 0.0039215686, 0.7921568627, 0.30980392156862746, 0.2196078431, 0.0039215686, 0.7764705882, 0.3137254901960784, 0.2352941176, 0.0039215686, 0.7607843137, 0.3176470588235294, 0.2509803922, 0.0039215686, 0.7490196078, 0.3215686274509804, 0.262745098, 0.0039215686, 0.7333333333, 0.3254901960784314, 0.2784313725, 0.0039215686, 0.7176470588, 0.32941176470588235, 0.2941176471, 0.0039215686, 0.7019607843, 0.3333333333333333, 0.3098039216, 0.0039215686, 0.6862745098, 0.33725490196078434, 0.3254901961, 0.0039215686, 0.6705882353, 0.3411764705882353, 0.3411764706, 0.0039215686, 0.6549019608, 0.34509803921568627, 0.3568627451, 0.0039215686, 0.6392156863, 0.34901960784313724, 0.3725490196, 0.0039215686, 0.6235294118, 0.35294117647058826, 0.3882352941, 0.0039215686, 0.6078431373, 0.3568627450980392, 0.4039215686, 0.0039215686, 0.5921568627, 0.3607843137254902, 0.4196078431, 0.0039215686, 0.5764705882, 0.36470588235294116, 0.4352941176, 0.0039215686, 0.5607843137, 0.3686274509803922, 0.4509803922, 0.0039215686, 0.5450980392, 0.37254901960784315, 0.4666666667, 0.0039215686, 0.5294117647, 0.3764705882352941, 0.4823529412, 0.0039215686, 0.5137254902, 0.3803921568627451, 0.4980392157, 0.0039215686, 0.4980392157, 0.3843137254901961, 0.5137254902, 0.0039215686, 0.4823529412, 0.38823529411764707, 0.5294117647, 0.0039215686, 0.4666666667, 0.39215686274509803, 0.5450980392, 0.0039215686, 0.4509803922, 0.396078431372549, 0.5607843137, 0.0039215686, 0.4352941176, 0.4, 0.5764705882, 0.0039215686, 0.4196078431, 0.403921568627451, 0.5921568627, 0.0039215686, 0.4039215686, 0.40784313725490196, 0.6078431373, 0.0039215686, 0.3882352941, 0.4117647058823529, 0.6235294118, 0.0039215686, 0.3725490196, 0.41568627450980394, 0.6392156863, 0.0039215686, 0.3568627451, 0.4196078431372549, 0.6549019608, 0.0039215686, 0.3411764706, 0.4235294117647059, 0.6705882353, 0.0039215686, 0.3254901961, 0.42745098039215684, 0.6862745098, 0.0039215686, 0.3098039216, 0.43137254901960786, 0.7019607843, 0.0039215686, 0.2941176471, 0.43529411764705883, 0.7176470588, 0.0039215686, 0.2784313725, 0.4392156862745098, 0.7333333333, 0.0039215686, 0.262745098, 0.44313725490196076, 0.7490196078, 0.0039215686, 0.2509803922, 0.4470588235294118, 0.7607843137, 0.0039215686, 0.2352941176, 0.45098039215686275, 0.7764705882, 0.0039215686, 0.2196078431, 0.4549019607843137, 0.7921568627, 0.0039215686, 0.2039215686, 0.4588235294117647, 0.8078431373, 0.0039215686, 0.1882352941, 0.4627450980392157, 0.8235294118, 0.0039215686, 0.1725490196, 0.4666666666666667, 0.8392156863, 0.0039215686, 0.1568627451, 0.4705882352941177, 0.8549019608, 0.0039215686, 0.1411764706, 0.4745098039215686, 0.8705882353, 0.0039215686, 0.1254901961, 0.4784313725490197, 0.8862745098, 0.0039215686, 0.1098039216, 0.48235294117647065, 0.9019607843, 0.0039215686, 0.0941176471, 0.48627450980392156, 0.9176470588, 0.0039215686, 0.0784313725, 0.49019607843137253, 0.9333333333, 0.0039215686, 0.062745098, 0.49411764705882355, 0.9490196078, 0.0039215686, 0.0470588235, 0.4980392156862745, 0.9647058824, 0.0039215686, 0.031372549, 0.5019607843137255, 0.9803921569, 0.0039215686, 0.0156862745, 0.5058823529411764, 0.9960784314, 0.0039215686, 0.0039215686, 0.5098039215686274, 0.9960784314, 0.0156862745, 0.0039215686, 0.5137254901960784, 0.9960784314, 0.031372549, 0.0039215686, 0.5176470588235295, 0.9960784314, 0.0470588235, 0.0039215686, 0.5215686274509804, 0.9960784314, 0.062745098, 0.0039215686, 0.5254901960784314, 0.9960784314, 0.0784313725, 0.0039215686, 0.5294117647058824, 0.9960784314, 0.0941176471, 0.0039215686, 0.5333333333333333, 0.9960784314, 0.1098039216, 0.0039215686, 0.5372549019607843, 0.9960784314, 0.1254901961, 0.0039215686, 0.5411764705882353, 0.9960784314, 0.1411764706, 0.0039215686, 0.5450980392156862, 0.9960784314, 0.1568627451, 0.0039215686, 0.5490196078431373, 0.9960784314, 0.1725490196, 0.0039215686, 0.5529411764705883, 0.9960784314, 0.1882352941, 0.0039215686, 0.5568627450980392, 0.9960784314, 0.2039215686, 0.0039215686, 0.5607843137254902, 0.9960784314, 0.2196078431, 0.0039215686, 0.5647058823529412, 0.9960784314, 0.2352941176, 0.0039215686, 0.5686274509803921, 0.9960784314, 0.2509803922, 0.0039215686, 0.5725490196078431, 0.9960784314, 0.262745098, 0.0039215686, 0.5764705882352941, 0.9960784314, 0.2784313725, 0.0039215686, 0.5803921568627451, 0.9960784314, 0.2941176471, 0.0039215686, 0.5843137254901961, 0.9960784314, 0.3098039216, 0.0039215686, 0.5882352941176471, 0.9960784314, 0.3254901961, 0.0039215686, 0.592156862745098, 0.9960784314, 0.3411764706, 0.0039215686, 0.596078431372549, 0.9960784314, 0.3568627451, 0.0039215686, 0.6, 0.9960784314, 0.3725490196, 0.0039215686, 0.6039215686274509, 0.9960784314, 0.3882352941, 0.0039215686, 0.6078431372549019, 0.9960784314, 0.4039215686, 0.0039215686, 0.611764705882353, 0.9960784314, 0.4196078431, 0.0039215686, 0.615686274509804, 0.9960784314, 0.4352941176, 0.0039215686, 0.6196078431372549, 0.9960784314, 0.4509803922, 0.0039215686, 0.6235294117647059, 0.9960784314, 0.4666666667, 0.0039215686, 0.6274509803921569, 0.9960784314, 0.4823529412, 0.0039215686, 0.6313725490196078, 0.9960784314, 0.4980392157, 0.0039215686, 0.6352941176470588, 0.9960784314, 0.5137254902, 0.0039215686, 0.6392156862745098, 0.9960784314, 0.5294117647, 0.0039215686, 0.6431372549019608, 0.9960784314, 0.5450980392, 0.0039215686, 0.6470588235294118, 0.9960784314, 0.5607843137, 0.0039215686, 0.6509803921568628, 0.9960784314, 0.5764705882, 0.0039215686, 0.6549019607843137, 0.9960784314, 0.5921568627, 0.0039215686, 0.6588235294117647, 0.9960784314, 0.6078431373, 0.0039215686, 0.6627450980392157, 0.9960784314, 0.6235294118, 0.0039215686, 0.6666666666666666, 0.9960784314, 0.6392156863, 0.0039215686, 0.6705882352941176, 0.9960784314, 0.6549019608, 0.0039215686, 0.6745098039215687, 0.9960784314, 0.6705882353, 0.0039215686, 0.6784313725490196, 0.9960784314, 0.6862745098, 0.0039215686, 0.6823529411764706, 0.9960784314, 0.7019607843, 0.0039215686, 0.6862745098039216, 0.9960784314, 0.7176470588, 0.0039215686, 0.6901960784313725, 0.9960784314, 0.7333333333, 0.0039215686, 0.6941176470588235, 0.9960784314, 0.7490196078, 0.0039215686, 0.6980392156862745, 0.9960784314, 0.7607843137, 0.0039215686, 0.7019607843137254, 0.9960784314, 0.7764705882, 0.0039215686, 0.7058823529411765, 0.9960784314, 0.7921568627, 0.0039215686, 0.7098039215686275, 0.9960784314, 0.8078431373, 0.0039215686, 0.7137254901960784, 0.9960784314, 0.8235294118, 0.0039215686, 0.7176470588235294, 0.9960784314, 0.8392156863, 0.0039215686, 0.7215686274509804, 0.9960784314, 0.8549019608, 0.0039215686, 0.7254901960784313, 0.9960784314, 0.8705882353, 0.0039215686, 0.7294117647058823, 0.9960784314, 0.8862745098, 0.0039215686, 0.7333333333333333, 0.9960784314, 0.9019607843, 0.0039215686, 0.7372549019607844, 0.9960784314, 0.9176470588, 0.0039215686, 0.7411764705882353, 0.9960784314, 0.9333333333, 0.0039215686, 0.7450980392156863, 0.9960784314, 0.9490196078, 0.0039215686, 0.7490196078431373, 0.9960784314, 0.9647058824, 0.0039215686, 0.7529411764705882, 0.9960784314, 0.9803921569, 0.0039215686, 0.7568627450980392, 0.9960784314, 0.9960784314, 0.0039215686, 0.7607843137254902, 0.9960784314, 0.9960784314, 0.0196078431, 0.7647058823529411, 0.9960784314, 0.9960784314, 0.0352941176, 0.7686274509803922, 0.9960784314, 0.9960784314, 0.0509803922, 0.7725490196078432, 0.9960784314, 0.9960784314, 0.0666666667, 0.7764705882352941, 0.9960784314, 0.9960784314, 0.0823529412, 0.7803921568627451, 0.9960784314, 0.9960784314, 0.0980392157, 0.7843137254901961, 0.9960784314, 0.9960784314, 0.1137254902, 0.788235294117647, 0.9960784314, 0.9960784314, 0.1294117647, 0.792156862745098, 0.9960784314, 0.9960784314, 0.1450980392, 0.796078431372549, 0.9960784314, 0.9960784314, 0.1607843137, 0.8, 0.9960784314, 0.9960784314, 0.1764705882, 0.803921568627451, 0.9960784314, 0.9960784314, 0.1921568627, 0.807843137254902, 0.9960784314, 0.9960784314, 0.2078431373, 0.8117647058823529, 0.9960784314, 0.9960784314, 0.2235294118, 0.8156862745098039, 0.9960784314, 0.9960784314, 0.2392156863, 0.8196078431372549, 0.9960784314, 0.9960784314, 0.2509803922, 0.8235294117647058, 0.9960784314, 0.9960784314, 0.2666666667, 0.8274509803921568, 0.9960784314, 0.9960784314, 0.2823529412, 0.8313725490196079, 0.9960784314, 0.9960784314, 0.2980392157, 0.8352941176470589, 0.9960784314, 0.9960784314, 0.3137254902, 0.8392156862745098, 0.9960784314, 0.9960784314, 0.3333333333, 0.8431372549019608, 0.9960784314, 0.9960784314, 0.3490196078, 0.8470588235294118, 0.9960784314, 0.9960784314, 0.3647058824, 0.8509803921568627, 0.9960784314, 0.9960784314, 0.3803921569, 0.8549019607843137, 0.9960784314, 0.9960784314, 0.3960784314, 0.8588235294117647, 0.9960784314, 0.9960784314, 0.4117647059, 0.8627450980392157, 0.9960784314, 0.9960784314, 0.4274509804, 0.8666666666666667, 0.9960784314, 0.9960784314, 0.4431372549, 0.8705882352941177, 0.9960784314, 0.9960784314, 0.4588235294, 0.8745098039215686, 0.9960784314, 0.9960784314, 0.4745098039, 0.8784313725490196, 0.9960784314, 0.9960784314, 0.4901960784, 0.8823529411764706, 0.9960784314, 0.9960784314, 0.5058823529, 0.8862745098039215, 0.9960784314, 0.9960784314, 0.5215686275, 0.8901960784313725, 0.9960784314, 0.9960784314, 0.537254902, 0.8941176470588236, 0.9960784314, 0.9960784314, 0.5529411765, 0.8980392156862745, 0.9960784314, 0.9960784314, 0.568627451, 0.9019607843137255, 0.9960784314, 0.9960784314, 0.5843137255, 0.9058823529411765, 0.9960784314, 0.9960784314, 0.6, 0.9098039215686274, 0.9960784314, 0.9960784314, 0.6156862745, 0.9137254901960784, 0.9960784314, 0.9960784314, 0.631372549, 0.9176470588235294, 0.9960784314, 0.9960784314, 0.6470588235, 0.9215686274509803, 0.9960784314, 0.9960784314, 0.6666666667, 0.9254901960784314, 0.9960784314, 0.9960784314, 0.6823529412, 0.9294117647058824, 0.9960784314, 0.9960784314, 0.6980392157, 0.9333333333333333, 0.9960784314, 0.9960784314, 0.7137254902, 0.9372549019607843, 0.9960784314, 0.9960784314, 0.7294117647, 0.9411764705882354, 0.9960784314, 0.9960784314, 0.7450980392, 0.9450980392156864, 0.9960784314, 0.9960784314, 0.7568627451, 0.9490196078431372, 0.9960784314, 0.9960784314, 0.7725490196, 0.9529411764705882, 0.9960784314, 0.9960784314, 0.7882352941, 0.9568627450980394, 0.9960784314, 0.9960784314, 0.8039215686, 0.9607843137254903, 0.9960784314, 0.9960784314, 0.8196078431, 0.9647058823529413, 0.9960784314, 0.9960784314, 0.8352941176, 0.9686274509803922, 0.9960784314, 0.9960784314, 0.8509803922, 0.9725490196078431, 0.9960784314, 0.9960784314, 0.8666666667, 0.9764705882352941, 0.9960784314, 0.9960784314, 0.8823529412, 0.9803921568627451, 0.9960784314, 0.9960784314, 0.8980392157, 0.984313725490196, 0.9960784314, 0.9960784314, 0.9137254902, 0.9882352941176471, 0.9960784314, 0.9960784314, 0.9294117647, 0.9921568627450981, 0.9960784314, 0.9960784314, 0.9450980392, 0.996078431372549, 0.9960784314, 0.9960784314, 0.9607843137, 1.0, 0.9960784314, 0.9960784314, 0.9607843137],
  description: 'Hot Iron'
}, {
  ColorSpace: 'RGB',
  Name: 'red_hot',
  name: 'red_hot',
  RGBPoints: [0.0, 0.0, 0.0, 0.0, 0.00392156862745098, 0.0, 0.0, 0.0, 0.00784313725490196, 0.0, 0.0, 0.0, 0.011764705882352941, 0.0, 0.0, 0.0, 0.01568627450980392, 0.0039215686, 0.0039215686, 0.0039215686, 0.0196078431372549, 0.0039215686, 0.0039215686, 0.0039215686, 0.023529411764705882, 0.0039215686, 0.0039215686, 0.0039215686, 0.027450980392156862, 0.0039215686, 0.0039215686, 0.0039215686, 0.03137254901960784, 0.0039215686, 0.0039215686, 0.0039215686, 0.03529411764705882, 0.0156862745, 0.0, 0.0, 0.0392156862745098, 0.0274509804, 0.0, 0.0, 0.043137254901960784, 0.0392156863, 0.0, 0.0, 0.047058823529411764, 0.0509803922, 0.0, 0.0, 0.050980392156862744, 0.062745098, 0.0, 0.0, 0.054901960784313725, 0.0784313725, 0.0, 0.0, 0.05882352941176471, 0.0901960784, 0.0, 0.0, 0.06274509803921569, 0.1058823529, 0.0, 0.0, 0.06666666666666667, 0.1176470588, 0.0, 0.0, 0.07058823529411765, 0.1294117647, 0.0, 0.0, 0.07450980392156863, 0.1411764706, 0.0, 0.0, 0.0784313725490196, 0.1529411765, 0.0, 0.0, 0.08235294117647059, 0.1647058824, 0.0, 0.0, 0.08627450980392157, 0.1764705882, 0.0, 0.0, 0.09019607843137255, 0.1882352941, 0.0, 0.0, 0.09411764705882353, 0.2039215686, 0.0, 0.0, 0.09803921568627451, 0.2156862745, 0.0, 0.0, 0.10196078431372549, 0.2274509804, 0.0, 0.0, 0.10588235294117647, 0.2392156863, 0.0, 0.0, 0.10980392156862745, 0.2549019608, 0.0, 0.0, 0.11372549019607843, 0.2666666667, 0.0, 0.0, 0.11764705882352942, 0.2784313725, 0.0, 0.0, 0.12156862745098039, 0.2901960784, 0.0, 0.0, 0.12549019607843137, 0.3058823529, 0.0, 0.0, 0.12941176470588237, 0.3176470588, 0.0, 0.0, 0.13333333333333333, 0.3294117647, 0.0, 0.0, 0.13725490196078433, 0.3411764706, 0.0, 0.0, 0.1411764705882353, 0.3529411765, 0.0, 0.0, 0.1450980392156863, 0.3647058824, 0.0, 0.0, 0.14901960784313725, 0.3764705882, 0.0, 0.0, 0.15294117647058825, 0.3882352941, 0.0, 0.0, 0.1568627450980392, 0.4039215686, 0.0, 0.0, 0.1607843137254902, 0.4156862745, 0.0, 0.0, 0.16470588235294117, 0.431372549, 0.0, 0.0, 0.16862745098039217, 0.4431372549, 0.0, 0.0, 0.17254901960784313, 0.4588235294, 0.0, 0.0, 0.17647058823529413, 0.4705882353, 0.0, 0.0, 0.1803921568627451, 0.4823529412, 0.0, 0.0, 0.1843137254901961, 0.4941176471, 0.0, 0.0, 0.18823529411764706, 0.5098039216, 0.0, 0.0, 0.19215686274509805, 0.5215686275, 0.0, 0.0, 0.19607843137254902, 0.5333333333, 0.0, 0.0, 0.2, 0.5450980392, 0.0, 0.0, 0.20392156862745098, 0.5568627451, 0.0, 0.0, 0.20784313725490197, 0.568627451, 0.0, 0.0, 0.21176470588235294, 0.5803921569, 0.0, 0.0, 0.21568627450980393, 0.5921568627, 0.0, 0.0, 0.2196078431372549, 0.6078431373, 0.0, 0.0, 0.2235294117647059, 0.6196078431, 0.0, 0.0, 0.22745098039215686, 0.631372549, 0.0, 0.0, 0.23137254901960785, 0.6431372549, 0.0, 0.0, 0.23529411764705885, 0.6588235294, 0.0, 0.0, 0.23921568627450984, 0.6705882353, 0.0, 0.0, 0.24313725490196078, 0.6823529412, 0.0, 0.0, 0.24705882352941178, 0.6941176471, 0.0, 0.0, 0.25098039215686274, 0.7098039216, 0.0, 0.0, 0.2549019607843137, 0.7215686275, 0.0, 0.0, 0.25882352941176473, 0.7333333333, 0.0, 0.0, 0.2627450980392157, 0.7450980392, 0.0, 0.0, 0.26666666666666666, 0.7568627451, 0.0, 0.0, 0.27058823529411763, 0.768627451, 0.0, 0.0, 0.27450980392156865, 0.7843137255, 0.0, 0.0, 0.2784313725490196, 0.7960784314, 0.0, 0.0, 0.2823529411764706, 0.8117647059, 0.0, 0.0, 0.28627450980392155, 0.8235294118, 0.0, 0.0, 0.2901960784313726, 0.8352941176, 0.0, 0.0, 0.29411764705882354, 0.8470588235, 0.0, 0.0, 0.2980392156862745, 0.862745098, 0.0, 0.0, 0.30196078431372547, 0.8745098039, 0.0, 0.0, 0.3058823529411765, 0.8862745098, 0.0, 0.0, 0.30980392156862746, 0.8980392157, 0.0, 0.0, 0.3137254901960784, 0.9137254902, 0.0, 0.0, 0.3176470588235294, 0.9254901961, 0.0, 0.0, 0.3215686274509804, 0.937254902, 0.0, 0.0, 0.3254901960784314, 0.9490196078, 0.0, 0.0, 0.32941176470588235, 0.9607843137, 0.0, 0.0, 0.3333333333333333, 0.968627451, 0.0, 0.0, 0.33725490196078434, 0.9803921569, 0.0039215686, 0.0, 0.3411764705882353, 0.9882352941, 0.0078431373, 0.0, 0.34509803921568627, 1.0, 0.0117647059, 0.0, 0.34901960784313724, 1.0, 0.0235294118, 0.0, 0.35294117647058826, 1.0, 0.0352941176, 0.0, 0.3568627450980392, 1.0, 0.0470588235, 0.0, 0.3607843137254902, 1.0, 0.062745098, 0.0, 0.36470588235294116, 1.0, 0.0745098039, 0.0, 0.3686274509803922, 1.0, 0.0862745098, 0.0, 0.37254901960784315, 1.0, 0.0980392157, 0.0, 0.3764705882352941, 1.0, 0.1137254902, 0.0, 0.3803921568627451, 1.0, 0.1254901961, 0.0, 0.3843137254901961, 1.0, 0.137254902, 0.0, 0.38823529411764707, 1.0, 0.1490196078, 0.0, 0.39215686274509803, 1.0, 0.1647058824, 0.0, 0.396078431372549, 1.0, 0.1764705882, 0.0, 0.4, 1.0, 0.1882352941, 0.0, 0.403921568627451, 1.0, 0.2, 0.0, 0.40784313725490196, 1.0, 0.2156862745, 0.0, 0.4117647058823529, 1.0, 0.2274509804, 0.0, 0.41568627450980394, 1.0, 0.2392156863, 0.0, 0.4196078431372549, 1.0, 0.2509803922, 0.0, 0.4235294117647059, 1.0, 0.2666666667, 0.0, 0.42745098039215684, 1.0, 0.2784313725, 0.0, 0.43137254901960786, 1.0, 0.2901960784, 0.0, 0.43529411764705883, 1.0, 0.3019607843, 0.0, 0.4392156862745098, 1.0, 0.3176470588, 0.0, 0.44313725490196076, 1.0, 0.3294117647, 0.0, 0.4470588235294118, 1.0, 0.3411764706, 0.0, 0.45098039215686275, 1.0, 0.3529411765, 0.0, 0.4549019607843137, 1.0, 0.368627451, 0.0, 0.4588235294117647, 1.0, 0.3803921569, 0.0, 0.4627450980392157, 1.0, 0.3921568627, 0.0, 0.4666666666666667, 1.0, 0.4039215686, 0.0, 0.4705882352941177, 1.0, 0.4156862745, 0.0, 0.4745098039215686, 1.0, 0.4274509804, 0.0, 0.4784313725490197, 1.0, 0.4392156863, 0.0, 0.48235294117647065, 1.0, 0.4509803922, 0.0, 0.48627450980392156, 1.0, 0.4666666667, 0.0, 0.49019607843137253, 1.0, 0.4784313725, 0.0, 0.49411764705882355, 1.0, 0.4941176471, 0.0, 0.4980392156862745, 1.0, 0.5058823529, 0.0, 0.5019607843137255, 1.0, 0.5215686275, 0.0, 0.5058823529411764, 1.0, 0.5333333333, 0.0, 0.5098039215686274, 1.0, 0.5450980392, 0.0, 0.5137254901960784, 1.0, 0.5568627451, 0.0, 0.5176470588235295, 1.0, 0.568627451, 0.0, 0.5215686274509804, 1.0, 0.5803921569, 0.0, 0.5254901960784314, 1.0, 0.5921568627, 0.0, 0.5294117647058824, 1.0, 0.6039215686, 0.0, 0.5333333333333333, 1.0, 0.6196078431, 0.0, 0.5372549019607843, 1.0, 0.631372549, 0.0, 0.5411764705882353, 1.0, 0.6431372549, 0.0, 0.5450980392156862, 1.0, 0.6549019608, 0.0, 0.5490196078431373, 1.0, 0.6705882353, 0.0, 0.5529411764705883, 1.0, 0.6823529412, 0.0, 0.5568627450980392, 1.0, 0.6941176471, 0.0, 0.5607843137254902, 1.0, 0.7058823529, 0.0, 0.5647058823529412, 1.0, 0.7215686275, 0.0, 0.5686274509803921, 1.0, 0.7333333333, 0.0, 0.5725490196078431, 1.0, 0.7450980392, 0.0, 0.5764705882352941, 1.0, 0.7568627451, 0.0, 0.5803921568627451, 1.0, 0.7725490196, 0.0, 0.5843137254901961, 1.0, 0.7843137255, 0.0, 0.5882352941176471, 1.0, 0.7960784314, 0.0, 0.592156862745098, 1.0, 0.8078431373, 0.0, 0.596078431372549, 1.0, 0.8196078431, 0.0, 0.6, 1.0, 0.831372549, 0.0, 0.6039215686274509, 1.0, 0.8470588235, 0.0, 0.6078431372549019, 1.0, 0.8588235294, 0.0, 0.611764705882353, 1.0, 0.8745098039, 0.0, 0.615686274509804, 1.0, 0.8862745098, 0.0, 0.6196078431372549, 1.0, 0.8980392157, 0.0, 0.6235294117647059, 1.0, 0.9098039216, 0.0, 0.6274509803921569, 1.0, 0.9254901961, 0.0, 0.6313725490196078, 1.0, 0.937254902, 0.0, 0.6352941176470588, 1.0, 0.9490196078, 0.0, 0.6392156862745098, 1.0, 0.9607843137, 0.0, 0.6431372549019608, 1.0, 0.9764705882, 0.0, 0.6470588235294118, 1.0, 0.9803921569, 0.0039215686, 0.6509803921568628, 1.0, 0.9882352941, 0.0117647059, 0.6549019607843137, 1.0, 0.9921568627, 0.0156862745, 0.6588235294117647, 1.0, 1.0, 0.0235294118, 0.6627450980392157, 1.0, 1.0, 0.0352941176, 0.6666666666666666, 1.0, 1.0, 0.0470588235, 0.6705882352941176, 1.0, 1.0, 0.0588235294, 0.6745098039215687, 1.0, 1.0, 0.0745098039, 0.6784313725490196, 1.0, 1.0, 0.0862745098, 0.6823529411764706, 1.0, 1.0, 0.0980392157, 0.6862745098039216, 1.0, 1.0, 0.1098039216, 0.6901960784313725, 1.0, 1.0, 0.1254901961, 0.6941176470588235, 1.0, 1.0, 0.137254902, 0.6980392156862745, 1.0, 1.0, 0.1490196078, 0.7019607843137254, 1.0, 1.0, 0.1607843137, 0.7058823529411765, 1.0, 1.0, 0.1764705882, 0.7098039215686275, 1.0, 1.0, 0.1882352941, 0.7137254901960784, 1.0, 1.0, 0.2, 0.7176470588235294, 1.0, 1.0, 0.2117647059, 0.7215686274509804, 1.0, 1.0, 0.2274509804, 0.7254901960784313, 1.0, 1.0, 0.2392156863, 0.7294117647058823, 1.0, 1.0, 0.2509803922, 0.7333333333333333, 1.0, 1.0, 0.262745098, 0.7372549019607844, 1.0, 1.0, 0.2784313725, 0.7411764705882353, 1.0, 1.0, 0.2901960784, 0.7450980392156863, 1.0, 1.0, 0.3019607843, 0.7490196078431373, 1.0, 1.0, 0.3137254902, 0.7529411764705882, 1.0, 1.0, 0.3294117647, 0.7568627450980392, 1.0, 1.0, 0.3411764706, 0.7607843137254902, 1.0, 1.0, 0.3529411765, 0.7647058823529411, 1.0, 1.0, 0.3647058824, 0.7686274509803922, 1.0, 1.0, 0.3803921569, 0.7725490196078432, 1.0, 1.0, 0.3921568627, 0.7764705882352941, 1.0, 1.0, 0.4039215686, 0.7803921568627451, 1.0, 1.0, 0.4156862745, 0.7843137254901961, 1.0, 1.0, 0.431372549, 0.788235294117647, 1.0, 1.0, 0.4431372549, 0.792156862745098, 1.0, 1.0, 0.4549019608, 0.796078431372549, 1.0, 1.0, 0.4666666667, 0.8, 1.0, 1.0, 0.4784313725, 0.803921568627451, 1.0, 1.0, 0.4901960784, 0.807843137254902, 1.0, 1.0, 0.5019607843, 0.8117647058823529, 1.0, 1.0, 0.5137254902, 0.8156862745098039, 1.0, 1.0, 0.5294117647, 0.8196078431372549, 1.0, 1.0, 0.5411764706, 0.8235294117647058, 1.0, 1.0, 0.5568627451, 0.8274509803921568, 1.0, 1.0, 0.568627451, 0.8313725490196079, 1.0, 1.0, 0.5843137255, 0.8352941176470589, 1.0, 1.0, 0.5960784314, 0.8392156862745098, 1.0, 1.0, 0.6078431373, 0.8431372549019608, 1.0, 1.0, 0.6196078431, 0.8470588235294118, 1.0, 1.0, 0.631372549, 0.8509803921568627, 1.0, 1.0, 0.6431372549, 0.8549019607843137, 1.0, 1.0, 0.6549019608, 0.8588235294117647, 1.0, 1.0, 0.6666666667, 0.8627450980392157, 1.0, 1.0, 0.6823529412, 0.8666666666666667, 1.0, 1.0, 0.6941176471, 0.8705882352941177, 1.0, 1.0, 0.7058823529, 0.8745098039215686, 1.0, 1.0, 0.7176470588, 0.8784313725490196, 1.0, 1.0, 0.7333333333, 0.8823529411764706, 1.0, 1.0, 0.7450980392, 0.8862745098039215, 1.0, 1.0, 0.7568627451, 0.8901960784313725, 1.0, 1.0, 0.768627451, 0.8941176470588236, 1.0, 1.0, 0.7843137255, 0.8980392156862745, 1.0, 1.0, 0.7960784314, 0.9019607843137255, 1.0, 1.0, 0.8078431373, 0.9058823529411765, 1.0, 1.0, 0.8196078431, 0.9098039215686274, 1.0, 1.0, 0.8352941176, 0.9137254901960784, 1.0, 1.0, 0.8470588235, 0.9176470588235294, 1.0, 1.0, 0.8588235294, 0.9215686274509803, 1.0, 1.0, 0.8705882353, 0.9254901960784314, 1.0, 1.0, 0.8823529412, 0.9294117647058824, 1.0, 1.0, 0.8941176471, 0.9333333333333333, 1.0, 1.0, 0.9098039216, 0.9372549019607843, 1.0, 1.0, 0.9215686275, 0.9411764705882354, 1.0, 1.0, 0.937254902, 0.9450980392156864, 1.0, 1.0, 0.9490196078, 0.9490196078431372, 1.0, 1.0, 0.9607843137, 0.9529411764705882, 1.0, 1.0, 0.9725490196, 0.9568627450980394, 1.0, 1.0, 0.9882352941, 0.9607843137254903, 1.0, 1.0, 0.9882352941, 0.9647058823529413, 1.0, 1.0, 0.9921568627, 0.9686274509803922, 1.0, 1.0, 0.9960784314, 0.9725490196078431, 1.0, 1.0, 1.0, 0.9764705882352941, 1.0, 1.0, 1.0, 0.9803921568627451, 1.0, 1.0, 1.0, 0.984313725490196, 1.0, 1.0, 1.0, 0.9882352941176471, 1.0, 1.0, 1.0, 0.9921568627450981, 1.0, 1.0, 1.0, 0.996078431372549, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
  description: 'Red Hot'
}, {
  ColorSpace: 'RGB',
  Name: 's_pet',
  name: 's_pet',
  RGBPoints: [0.0, 0.0156862745, 0.0039215686, 0.0156862745, 0.00392156862745098, 0.0156862745, 0.0039215686, 0.0156862745, 0.00784313725490196, 0.0274509804, 0.0039215686, 0.031372549, 0.011764705882352941, 0.0352941176, 0.0039215686, 0.0509803922, 0.01568627450980392, 0.0392156863, 0.0039215686, 0.0666666667, 0.0196078431372549, 0.0509803922, 0.0039215686, 0.0823529412, 0.023529411764705882, 0.062745098, 0.0039215686, 0.0980392157, 0.027450980392156862, 0.0705882353, 0.0039215686, 0.1176470588, 0.03137254901960784, 0.0745098039, 0.0039215686, 0.1333333333, 0.03529411764705882, 0.0862745098, 0.0039215686, 0.1490196078, 0.0392156862745098, 0.0980392157, 0.0039215686, 0.1647058824, 0.043137254901960784, 0.1058823529, 0.0039215686, 0.1843137255, 0.047058823529411764, 0.1098039216, 0.0039215686, 0.2, 0.050980392156862744, 0.1215686275, 0.0039215686, 0.2156862745, 0.054901960784313725, 0.1333333333, 0.0039215686, 0.231372549, 0.05882352941176471, 0.137254902, 0.0039215686, 0.2509803922, 0.06274509803921569, 0.1490196078, 0.0039215686, 0.262745098, 0.06666666666666667, 0.1607843137, 0.0039215686, 0.2784313725, 0.07058823529411765, 0.168627451, 0.0039215686, 0.2941176471, 0.07450980392156863, 0.1725490196, 0.0039215686, 0.3137254902, 0.0784313725490196, 0.1843137255, 0.0039215686, 0.3294117647, 0.08235294117647059, 0.1960784314, 0.0039215686, 0.3450980392, 0.08627450980392157, 0.2039215686, 0.0039215686, 0.3607843137, 0.09019607843137255, 0.2078431373, 0.0039215686, 0.3803921569, 0.09411764705882353, 0.2196078431, 0.0039215686, 0.3960784314, 0.09803921568627451, 0.231372549, 0.0039215686, 0.4117647059, 0.10196078431372549, 0.2392156863, 0.0039215686, 0.4274509804, 0.10588235294117647, 0.2431372549, 0.0039215686, 0.4470588235, 0.10980392156862745, 0.2509803922, 0.0039215686, 0.462745098, 0.11372549019607843, 0.262745098, 0.0039215686, 0.4784313725, 0.11764705882352942, 0.2666666667, 0.0039215686, 0.4980392157, 0.12156862745098039, 0.2666666667, 0.0039215686, 0.4980392157, 0.12549019607843137, 0.262745098, 0.0039215686, 0.5137254902, 0.12941176470588237, 0.2509803922, 0.0039215686, 0.5294117647, 0.13333333333333333, 0.2431372549, 0.0039215686, 0.5450980392, 0.13725490196078433, 0.2392156863, 0.0039215686, 0.5607843137, 0.1411764705882353, 0.231372549, 0.0039215686, 0.5764705882, 0.1450980392156863, 0.2196078431, 0.0039215686, 0.5921568627, 0.14901960784313725, 0.2078431373, 0.0039215686, 0.6078431373, 0.15294117647058825, 0.2039215686, 0.0039215686, 0.6235294118, 0.1568627450980392, 0.1960784314, 0.0039215686, 0.6392156863, 0.1607843137254902, 0.1843137255, 0.0039215686, 0.6549019608, 0.16470588235294117, 0.1725490196, 0.0039215686, 0.6705882353, 0.16862745098039217, 0.168627451, 0.0039215686, 0.6862745098, 0.17254901960784313, 0.1607843137, 0.0039215686, 0.7019607843, 0.17647058823529413, 0.1490196078, 0.0039215686, 0.7176470588, 0.1803921568627451, 0.137254902, 0.0039215686, 0.7333333333, 0.1843137254901961, 0.1333333333, 0.0039215686, 0.7490196078, 0.18823529411764706, 0.1215686275, 0.0039215686, 0.7607843137, 0.19215686274509805, 0.1098039216, 0.0039215686, 0.7764705882, 0.19607843137254902, 0.1058823529, 0.0039215686, 0.7921568627, 0.2, 0.0980392157, 0.0039215686, 0.8078431373, 0.20392156862745098, 0.0862745098, 0.0039215686, 0.8235294118, 0.20784313725490197, 0.0745098039, 0.0039215686, 0.8392156863, 0.21176470588235294, 0.0705882353, 0.0039215686, 0.8549019608, 0.21568627450980393, 0.062745098, 0.0039215686, 0.8705882353, 0.2196078431372549, 0.0509803922, 0.0039215686, 0.8862745098, 0.2235294117647059, 0.0392156863, 0.0039215686, 0.9019607843, 0.22745098039215686, 0.0352941176, 0.0039215686, 0.9176470588, 0.23137254901960785, 0.0274509804, 0.0039215686, 0.9333333333, 0.23529411764705885, 0.0156862745, 0.0039215686, 0.9490196078, 0.23921568627450984, 0.0078431373, 0.0039215686, 0.9647058824, 0.24313725490196078, 0.0039215686, 0.0039215686, 0.9960784314, 0.24705882352941178, 0.0039215686, 0.0039215686, 0.9960784314, 0.25098039215686274, 0.0039215686, 0.0196078431, 0.9647058824, 0.2549019607843137, 0.0039215686, 0.0392156863, 0.9490196078, 0.25882352941176473, 0.0039215686, 0.0549019608, 0.9333333333, 0.2627450980392157, 0.0039215686, 0.0745098039, 0.9176470588, 0.26666666666666666, 0.0039215686, 0.0901960784, 0.9019607843, 0.27058823529411763, 0.0039215686, 0.1098039216, 0.8862745098, 0.27450980392156865, 0.0039215686, 0.1254901961, 0.8705882353, 0.2784313725490196, 0.0039215686, 0.1450980392, 0.8549019608, 0.2823529411764706, 0.0039215686, 0.1607843137, 0.8392156863, 0.28627450980392155, 0.0039215686, 0.1803921569, 0.8235294118, 0.2901960784313726, 0.0039215686, 0.1960784314, 0.8078431373, 0.29411764705882354, 0.0039215686, 0.2156862745, 0.7921568627, 0.2980392156862745, 0.0039215686, 0.231372549, 0.7764705882, 0.30196078431372547, 0.0039215686, 0.2509803922, 0.7607843137, 0.3058823529411765, 0.0039215686, 0.262745098, 0.7490196078, 0.30980392156862746, 0.0039215686, 0.2823529412, 0.7333333333, 0.3137254901960784, 0.0039215686, 0.2980392157, 0.7176470588, 0.3176470588235294, 0.0039215686, 0.3176470588, 0.7019607843, 0.3215686274509804, 0.0039215686, 0.3333333333, 0.6862745098, 0.3254901960784314, 0.0039215686, 0.3529411765, 0.6705882353, 0.32941176470588235, 0.0039215686, 0.368627451, 0.6549019608, 0.3333333333333333, 0.0039215686, 0.3882352941, 0.6392156863, 0.33725490196078434, 0.0039215686, 0.4039215686, 0.6235294118, 0.3411764705882353, 0.0039215686, 0.4235294118, 0.6078431373, 0.34509803921568627, 0.0039215686, 0.4392156863, 0.5921568627, 0.34901960784313724, 0.0039215686, 0.4588235294, 0.5764705882, 0.35294117647058826, 0.0039215686, 0.4745098039, 0.5607843137, 0.3568627450980392, 0.0039215686, 0.4941176471, 0.5450980392, 0.3607843137254902, 0.0039215686, 0.5098039216, 0.5294117647, 0.36470588235294116, 0.0039215686, 0.5294117647, 0.5137254902, 0.3686274509803922, 0.0039215686, 0.5450980392, 0.4980392157, 0.37254901960784315, 0.0039215686, 0.5647058824, 0.4784313725, 0.3764705882352941, 0.0039215686, 0.5803921569, 0.462745098, 0.3803921568627451, 0.0039215686, 0.6, 0.4470588235, 0.3843137254901961, 0.0039215686, 0.6156862745, 0.4274509804, 0.38823529411764707, 0.0039215686, 0.6352941176, 0.4117647059, 0.39215686274509803, 0.0039215686, 0.6509803922, 0.3960784314, 0.396078431372549, 0.0039215686, 0.6705882353, 0.3803921569, 0.4, 0.0039215686, 0.6862745098, 0.3607843137, 0.403921568627451, 0.0039215686, 0.7058823529, 0.3450980392, 0.40784313725490196, 0.0039215686, 0.7215686275, 0.3294117647, 0.4117647058823529, 0.0039215686, 0.7411764706, 0.3137254902, 0.41568627450980394, 0.0039215686, 0.7529411765, 0.2941176471, 0.4196078431372549, 0.0039215686, 0.7960784314, 0.2784313725, 0.4235294117647059, 0.0039215686, 0.7960784314, 0.262745098, 0.42745098039215684, 0.0392156863, 0.8039215686, 0.2509803922, 0.43137254901960786, 0.0745098039, 0.8117647059, 0.231372549, 0.43529411764705883, 0.1098039216, 0.8196078431, 0.2156862745, 0.4392156862745098, 0.1450980392, 0.8274509804, 0.2, 0.44313725490196076, 0.1803921569, 0.8352941176, 0.1843137255, 0.4470588235294118, 0.2156862745, 0.8431372549, 0.1647058824, 0.45098039215686275, 0.2509803922, 0.8509803922, 0.1490196078, 0.4549019607843137, 0.2823529412, 0.8588235294, 0.1333333333, 0.4588235294117647, 0.3176470588, 0.8666666667, 0.1176470588, 0.4627450980392157, 0.3529411765, 0.8745098039, 0.0980392157, 0.4666666666666667, 0.3882352941, 0.8823529412, 0.0823529412, 0.4705882352941177, 0.4235294118, 0.8901960784, 0.0666666667, 0.4745098039215686, 0.4588235294, 0.8980392157, 0.0509803922, 0.4784313725490197, 0.4941176471, 0.9058823529, 0.0431372549, 0.48235294117647065, 0.5294117647, 0.9137254902, 0.031372549, 0.48627450980392156, 0.5647058824, 0.9215686275, 0.0196078431, 0.49019607843137253, 0.6, 0.9294117647, 0.0078431373, 0.49411764705882355, 0.6352941176, 0.937254902, 0.0039215686, 0.4980392156862745, 0.6705882353, 0.9450980392, 0.0039215686, 0.5019607843137255, 0.7058823529, 0.9490196078, 0.0039215686, 0.5058823529411764, 0.7411764706, 0.9568627451, 0.0039215686, 0.5098039215686274, 0.7725490196, 0.9607843137, 0.0039215686, 0.5137254901960784, 0.8078431373, 0.968627451, 0.0039215686, 0.5176470588235295, 0.8431372549, 0.9725490196, 0.0039215686, 0.5215686274509804, 0.8784313725, 0.9803921569, 0.0039215686, 0.5254901960784314, 0.9137254902, 0.9843137255, 0.0039215686, 0.5294117647058824, 0.9490196078, 0.9921568627, 0.0039215686, 0.5333333333333333, 0.9960784314, 0.9960784314, 0.0039215686, 0.5372549019607843, 0.9960784314, 0.9960784314, 0.0039215686, 0.5411764705882353, 0.9960784314, 0.9921568627, 0.0039215686, 0.5450980392156862, 0.9960784314, 0.9843137255, 0.0039215686, 0.5490196078431373, 0.9960784314, 0.9764705882, 0.0039215686, 0.5529411764705883, 0.9960784314, 0.968627451, 0.0039215686, 0.5568627450980392, 0.9960784314, 0.9607843137, 0.0039215686, 0.5607843137254902, 0.9960784314, 0.9529411765, 0.0039215686, 0.5647058823529412, 0.9960784314, 0.9450980392, 0.0039215686, 0.5686274509803921, 0.9960784314, 0.937254902, 0.0039215686, 0.5725490196078431, 0.9960784314, 0.9294117647, 0.0039215686, 0.5764705882352941, 0.9960784314, 0.9215686275, 0.0039215686, 0.5803921568627451, 0.9960784314, 0.9137254902, 0.0039215686, 0.5843137254901961, 0.9960784314, 0.9058823529, 0.0039215686, 0.5882352941176471, 0.9960784314, 0.8980392157, 0.0039215686, 0.592156862745098, 0.9960784314, 0.8901960784, 0.0039215686, 0.596078431372549, 0.9960784314, 0.8823529412, 0.0039215686, 0.6, 0.9960784314, 0.8745098039, 0.0039215686, 0.6039215686274509, 0.9960784314, 0.8666666667, 0.0039215686, 0.6078431372549019, 0.9960784314, 0.8588235294, 0.0039215686, 0.611764705882353, 0.9960784314, 0.8509803922, 0.0039215686, 0.615686274509804, 0.9960784314, 0.8431372549, 0.0039215686, 0.6196078431372549, 0.9960784314, 0.8352941176, 0.0039215686, 0.6235294117647059, 0.9960784314, 0.8274509804, 0.0039215686, 0.6274509803921569, 0.9960784314, 0.8196078431, 0.0039215686, 0.6313725490196078, 0.9960784314, 0.8117647059, 0.0039215686, 0.6352941176470588, 0.9960784314, 0.8039215686, 0.0039215686, 0.6392156862745098, 0.9960784314, 0.7960784314, 0.0039215686, 0.6431372549019608, 0.9960784314, 0.7882352941, 0.0039215686, 0.6470588235294118, 0.9960784314, 0.7803921569, 0.0039215686, 0.6509803921568628, 0.9960784314, 0.7725490196, 0.0039215686, 0.6549019607843137, 0.9960784314, 0.7647058824, 0.0039215686, 0.6588235294117647, 0.9960784314, 0.7568627451, 0.0039215686, 0.6627450980392157, 0.9960784314, 0.7490196078, 0.0039215686, 0.6666666666666666, 0.9960784314, 0.7450980392, 0.0039215686, 0.6705882352941176, 0.9960784314, 0.737254902, 0.0039215686, 0.6745098039215687, 0.9960784314, 0.7294117647, 0.0039215686, 0.6784313725490196, 0.9960784314, 0.7215686275, 0.0039215686, 0.6823529411764706, 0.9960784314, 0.7137254902, 0.0039215686, 0.6862745098039216, 0.9960784314, 0.7058823529, 0.0039215686, 0.6901960784313725, 0.9960784314, 0.6980392157, 0.0039215686, 0.6941176470588235, 0.9960784314, 0.6901960784, 0.0039215686, 0.6980392156862745, 0.9960784314, 0.6823529412, 0.0039215686, 0.7019607843137254, 0.9960784314, 0.6745098039, 0.0039215686, 0.7058823529411765, 0.9960784314, 0.6666666667, 0.0039215686, 0.7098039215686275, 0.9960784314, 0.6588235294, 0.0039215686, 0.7137254901960784, 0.9960784314, 0.6509803922, 0.0039215686, 0.7176470588235294, 0.9960784314, 0.6431372549, 0.0039215686, 0.7215686274509804, 0.9960784314, 0.6352941176, 0.0039215686, 0.7254901960784313, 0.9960784314, 0.6274509804, 0.0039215686, 0.7294117647058823, 0.9960784314, 0.6196078431, 0.0039215686, 0.7333333333333333, 0.9960784314, 0.6117647059, 0.0039215686, 0.7372549019607844, 0.9960784314, 0.6039215686, 0.0039215686, 0.7411764705882353, 0.9960784314, 0.5960784314, 0.0039215686, 0.7450980392156863, 0.9960784314, 0.5882352941, 0.0039215686, 0.7490196078431373, 0.9960784314, 0.5803921569, 0.0039215686, 0.7529411764705882, 0.9960784314, 0.5725490196, 0.0039215686, 0.7568627450980392, 0.9960784314, 0.5647058824, 0.0039215686, 0.7607843137254902, 0.9960784314, 0.5568627451, 0.0039215686, 0.7647058823529411, 0.9960784314, 0.5490196078, 0.0039215686, 0.7686274509803922, 0.9960784314, 0.5411764706, 0.0039215686, 0.7725490196078432, 0.9960784314, 0.5333333333, 0.0039215686, 0.7764705882352941, 0.9960784314, 0.5254901961, 0.0039215686, 0.7803921568627451, 0.9960784314, 0.5176470588, 0.0039215686, 0.7843137254901961, 0.9960784314, 0.5098039216, 0.0039215686, 0.788235294117647, 0.9960784314, 0.5019607843, 0.0039215686, 0.792156862745098, 0.9960784314, 0.4941176471, 0.0039215686, 0.796078431372549, 0.9960784314, 0.4862745098, 0.0039215686, 0.8, 0.9960784314, 0.4784313725, 0.0039215686, 0.803921568627451, 0.9960784314, 0.4705882353, 0.0039215686, 0.807843137254902, 0.9960784314, 0.462745098, 0.0039215686, 0.8117647058823529, 0.9960784314, 0.4549019608, 0.0039215686, 0.8156862745098039, 0.9960784314, 0.4470588235, 0.0039215686, 0.8196078431372549, 0.9960784314, 0.4392156863, 0.0039215686, 0.8235294117647058, 0.9960784314, 0.431372549, 0.0039215686, 0.8274509803921568, 0.9960784314, 0.4235294118, 0.0039215686, 0.8313725490196079, 0.9960784314, 0.4156862745, 0.0039215686, 0.8352941176470589, 0.9960784314, 0.4078431373, 0.0039215686, 0.8392156862745098, 0.9960784314, 0.4, 0.0039215686, 0.8431372549019608, 0.9960784314, 0.3921568627, 0.0039215686, 0.8470588235294118, 0.9960784314, 0.3843137255, 0.0039215686, 0.8509803921568627, 0.9960784314, 0.3764705882, 0.0039215686, 0.8549019607843137, 0.9960784314, 0.368627451, 0.0039215686, 0.8588235294117647, 0.9960784314, 0.3607843137, 0.0039215686, 0.8627450980392157, 0.9960784314, 0.3529411765, 0.0039215686, 0.8666666666666667, 0.9960784314, 0.3450980392, 0.0039215686, 0.8705882352941177, 0.9960784314, 0.337254902, 0.0039215686, 0.8745098039215686, 0.9960784314, 0.3294117647, 0.0039215686, 0.8784313725490196, 0.9960784314, 0.3215686275, 0.0039215686, 0.8823529411764706, 0.9960784314, 0.3137254902, 0.0039215686, 0.8862745098039215, 0.9960784314, 0.3058823529, 0.0039215686, 0.8901960784313725, 0.9960784314, 0.2980392157, 0.0039215686, 0.8941176470588236, 0.9960784314, 0.2901960784, 0.0039215686, 0.8980392156862745, 0.9960784314, 0.2823529412, 0.0039215686, 0.9019607843137255, 0.9960784314, 0.2705882353, 0.0039215686, 0.9058823529411765, 0.9960784314, 0.2588235294, 0.0039215686, 0.9098039215686274, 0.9960784314, 0.2509803922, 0.0039215686, 0.9137254901960784, 0.9960784314, 0.2431372549, 0.0039215686, 0.9176470588235294, 0.9960784314, 0.231372549, 0.0039215686, 0.9215686274509803, 0.9960784314, 0.2196078431, 0.0039215686, 0.9254901960784314, 0.9960784314, 0.2117647059, 0.0039215686, 0.9294117647058824, 0.9960784314, 0.2, 0.0039215686, 0.9333333333333333, 0.9960784314, 0.1882352941, 0.0039215686, 0.9372549019607843, 0.9960784314, 0.1764705882, 0.0039215686, 0.9411764705882354, 0.9960784314, 0.168627451, 0.0039215686, 0.9450980392156864, 0.9960784314, 0.1568627451, 0.0039215686, 0.9490196078431372, 0.9960784314, 0.1450980392, 0.0039215686, 0.9529411764705882, 0.9960784314, 0.1333333333, 0.0039215686, 0.9568627450980394, 0.9960784314, 0.1254901961, 0.0039215686, 0.9607843137254903, 0.9960784314, 0.1137254902, 0.0039215686, 0.9647058823529413, 0.9960784314, 0.1019607843, 0.0039215686, 0.9686274509803922, 0.9960784314, 0.0901960784, 0.0039215686, 0.9725490196078431, 0.9960784314, 0.0823529412, 0.0039215686, 0.9764705882352941, 0.9960784314, 0.0705882353, 0.0039215686, 0.9803921568627451, 0.9960784314, 0.0588235294, 0.0039215686, 0.984313725490196, 0.9960784314, 0.0470588235, 0.0039215686, 0.9882352941176471, 0.9960784314, 0.0392156863, 0.0039215686, 0.9921568627450981, 0.9960784314, 0.0274509804, 0.0039215686, 0.996078431372549, 0.9960784314, 0.0156862745, 0.0039215686, 1.0, 0.9960784314, 0.0156862745, 0.0039215686],
  description: 'S PET'
}, {
  ColorSpace: 'RGB',
  Name: 'perfusion',
  name: 'perfusion',
  RGBPoints: [0.0, 0.0, 0.0, 0.0, 0.00392156862745098, 0.0078431373, 0.0235294118, 0.0235294118, 0.00784313725490196, 0.0078431373, 0.031372549, 0.0470588235, 0.011764705882352941, 0.0078431373, 0.0392156863, 0.062745098, 0.01568627450980392, 0.0078431373, 0.0470588235, 0.0862745098, 0.0196078431372549, 0.0078431373, 0.0549019608, 0.1019607843, 0.023529411764705882, 0.0078431373, 0.0549019608, 0.1254901961, 0.027450980392156862, 0.0078431373, 0.062745098, 0.1411764706, 0.03137254901960784, 0.0078431373, 0.0705882353, 0.1647058824, 0.03529411764705882, 0.0078431373, 0.0784313725, 0.1803921569, 0.0392156862745098, 0.0078431373, 0.0862745098, 0.2039215686, 0.043137254901960784, 0.0078431373, 0.0862745098, 0.2196078431, 0.047058823529411764, 0.0078431373, 0.0941176471, 0.2431372549, 0.050980392156862744, 0.0078431373, 0.1019607843, 0.2666666667, 0.054901960784313725, 0.0078431373, 0.1098039216, 0.2823529412, 0.05882352941176471, 0.0078431373, 0.1176470588, 0.3058823529, 0.06274509803921569, 0.0078431373, 0.1176470588, 0.3215686275, 0.06666666666666667, 0.0078431373, 0.1254901961, 0.3450980392, 0.07058823529411765, 0.0078431373, 0.1333333333, 0.3607843137, 0.07450980392156863, 0.0078431373, 0.1411764706, 0.3843137255, 0.0784313725490196, 0.0078431373, 0.1490196078, 0.4, 0.08235294117647059, 0.0078431373, 0.1490196078, 0.4235294118, 0.08627450980392157, 0.0078431373, 0.1568627451, 0.4392156863, 0.09019607843137255, 0.0078431373, 0.1647058824, 0.462745098, 0.09411764705882353, 0.0078431373, 0.1725490196, 0.4784313725, 0.09803921568627451, 0.0078431373, 0.1803921569, 0.5019607843, 0.10196078431372549, 0.0078431373, 0.1803921569, 0.5254901961, 0.10588235294117647, 0.0078431373, 0.1882352941, 0.5411764706, 0.10980392156862745, 0.0078431373, 0.1960784314, 0.5647058824, 0.11372549019607843, 0.0078431373, 0.2039215686, 0.5803921569, 0.11764705882352942, 0.0078431373, 0.2117647059, 0.6039215686, 0.12156862745098039, 0.0078431373, 0.2117647059, 0.6196078431, 0.12549019607843137, 0.0078431373, 0.2196078431, 0.6431372549, 0.12941176470588237, 0.0078431373, 0.2274509804, 0.6588235294, 0.13333333333333333, 0.0078431373, 0.2352941176, 0.6823529412, 0.13725490196078433, 0.0078431373, 0.2431372549, 0.6980392157, 0.1411764705882353, 0.0078431373, 0.2431372549, 0.7215686275, 0.1450980392156863, 0.0078431373, 0.2509803922, 0.737254902, 0.14901960784313725, 0.0078431373, 0.2588235294, 0.7607843137, 0.15294117647058825, 0.0078431373, 0.2666666667, 0.7843137255, 0.1568627450980392, 0.0078431373, 0.2745098039, 0.8, 0.1607843137254902, 0.0078431373, 0.2745098039, 0.8235294118, 0.16470588235294117, 0.0078431373, 0.2823529412, 0.8392156863, 0.16862745098039217, 0.0078431373, 0.2901960784, 0.862745098, 0.17254901960784313, 0.0078431373, 0.2980392157, 0.8784313725, 0.17647058823529413, 0.0078431373, 0.3058823529, 0.9019607843, 0.1803921568627451, 0.0078431373, 0.3058823529, 0.9176470588, 0.1843137254901961, 0.0078431373, 0.2980392157, 0.9411764706, 0.18823529411764706, 0.0078431373, 0.3058823529, 0.9568627451, 0.19215686274509805, 0.0078431373, 0.2980392157, 0.9803921569, 0.19607843137254902, 0.0078431373, 0.2980392157, 0.9882352941, 0.2, 0.0078431373, 0.2901960784, 0.9803921569, 0.20392156862745098, 0.0078431373, 0.2901960784, 0.9647058824, 0.20784313725490197, 0.0078431373, 0.2823529412, 0.9568627451, 0.21176470588235294, 0.0078431373, 0.2823529412, 0.9411764706, 0.21568627450980393, 0.0078431373, 0.2745098039, 0.9333333333, 0.2196078431372549, 0.0078431373, 0.2666666667, 0.9176470588, 0.2235294117647059, 0.0078431373, 0.2666666667, 0.9098039216, 0.22745098039215686, 0.0078431373, 0.2588235294, 0.9019607843, 0.23137254901960785, 0.0078431373, 0.2588235294, 0.8862745098, 0.23529411764705885, 0.0078431373, 0.2509803922, 0.8784313725, 0.23921568627450984, 0.0078431373, 0.2509803922, 0.862745098, 0.24313725490196078, 0.0078431373, 0.2431372549, 0.8549019608, 0.24705882352941178, 0.0078431373, 0.2352941176, 0.8392156863, 0.25098039215686274, 0.0078431373, 0.2352941176, 0.831372549, 0.2549019607843137, 0.0078431373, 0.2274509804, 0.8235294118, 0.25882352941176473, 0.0078431373, 0.2274509804, 0.8078431373, 0.2627450980392157, 0.0078431373, 0.2196078431, 0.8, 0.26666666666666666, 0.0078431373, 0.2196078431, 0.7843137255, 0.27058823529411763, 0.0078431373, 0.2117647059, 0.7764705882, 0.27450980392156865, 0.0078431373, 0.2039215686, 0.7607843137, 0.2784313725490196, 0.0078431373, 0.2039215686, 0.7529411765, 0.2823529411764706, 0.0078431373, 0.1960784314, 0.7450980392, 0.28627450980392155, 0.0078431373, 0.1960784314, 0.7294117647, 0.2901960784313726, 0.0078431373, 0.1882352941, 0.7215686275, 0.29411764705882354, 0.0078431373, 0.1882352941, 0.7058823529, 0.2980392156862745, 0.0078431373, 0.1803921569, 0.6980392157, 0.30196078431372547, 0.0078431373, 0.1803921569, 0.6823529412, 0.3058823529411765, 0.0078431373, 0.1725490196, 0.6745098039, 0.30980392156862746, 0.0078431373, 0.1647058824, 0.6666666667, 0.3137254901960784, 0.0078431373, 0.1647058824, 0.6509803922, 0.3176470588235294, 0.0078431373, 0.1568627451, 0.6431372549, 0.3215686274509804, 0.0078431373, 0.1568627451, 0.6274509804, 0.3254901960784314, 0.0078431373, 0.1490196078, 0.6196078431, 0.32941176470588235, 0.0078431373, 0.1490196078, 0.6039215686, 0.3333333333333333, 0.0078431373, 0.1411764706, 0.5960784314, 0.33725490196078434, 0.0078431373, 0.1333333333, 0.5882352941, 0.3411764705882353, 0.0078431373, 0.1333333333, 0.5725490196, 0.34509803921568627, 0.0078431373, 0.1254901961, 0.5647058824, 0.34901960784313724, 0.0078431373, 0.1254901961, 0.5490196078, 0.35294117647058826, 0.0078431373, 0.1176470588, 0.5411764706, 0.3568627450980392, 0.0078431373, 0.1176470588, 0.5254901961, 0.3607843137254902, 0.0078431373, 0.1098039216, 0.5176470588, 0.36470588235294116, 0.0078431373, 0.1019607843, 0.5098039216, 0.3686274509803922, 0.0078431373, 0.1019607843, 0.4941176471, 0.37254901960784315, 0.0078431373, 0.0941176471, 0.4862745098, 0.3764705882352941, 0.0078431373, 0.0941176471, 0.4705882353, 0.3803921568627451, 0.0078431373, 0.0862745098, 0.462745098, 0.3843137254901961, 0.0078431373, 0.0862745098, 0.4470588235, 0.38823529411764707, 0.0078431373, 0.0784313725, 0.4392156863, 0.39215686274509803, 0.0078431373, 0.0705882353, 0.431372549, 0.396078431372549, 0.0078431373, 0.0705882353, 0.4156862745, 0.4, 0.0078431373, 0.062745098, 0.4078431373, 0.403921568627451, 0.0078431373, 0.062745098, 0.3921568627, 0.40784313725490196, 0.0078431373, 0.0549019608, 0.3843137255, 0.4117647058823529, 0.0078431373, 0.0549019608, 0.368627451, 0.41568627450980394, 0.0078431373, 0.0470588235, 0.3607843137, 0.4196078431372549, 0.0078431373, 0.0470588235, 0.3529411765, 0.4235294117647059, 0.0078431373, 0.0392156863, 0.337254902, 0.42745098039215684, 0.0078431373, 0.031372549, 0.3294117647, 0.43137254901960786, 0.0078431373, 0.031372549, 0.3137254902, 0.43529411764705883, 0.0078431373, 0.0235294118, 0.3058823529, 0.4392156862745098, 0.0078431373, 0.0235294118, 0.2901960784, 0.44313725490196076, 0.0078431373, 0.0156862745, 0.2823529412, 0.4470588235294118, 0.0078431373, 0.0156862745, 0.2745098039, 0.45098039215686275, 0.0078431373, 0.0078431373, 0.2588235294, 0.4549019607843137, 0.0235294118, 0.0078431373, 0.2509803922, 0.4588235294117647, 0.0078431373, 0.0078431373, 0.2352941176, 0.4627450980392157, 0.0078431373, 0.0078431373, 0.2274509804, 0.4666666666666667, 0.0078431373, 0.0078431373, 0.2117647059, 0.4705882352941177, 0.0078431373, 0.0078431373, 0.2039215686, 0.4745098039215686, 0.0078431373, 0.0078431373, 0.1960784314, 0.4784313725490197, 0.0078431373, 0.0078431373, 0.1803921569, 0.48235294117647065, 0.0078431373, 0.0078431373, 0.1725490196, 0.48627450980392156, 0.0078431373, 0.0078431373, 0.1568627451, 0.49019607843137253, 0.0078431373, 0.0078431373, 0.1490196078, 0.49411764705882355, 0.0078431373, 0.0078431373, 0.1333333333, 0.4980392156862745, 0.0078431373, 0.0078431373, 0.1254901961, 0.5019607843137255, 0.0078431373, 0.0078431373, 0.1176470588, 0.5058823529411764, 0.0078431373, 0.0078431373, 0.1019607843, 0.5098039215686274, 0.0078431373, 0.0078431373, 0.0941176471, 0.5137254901960784, 0.0078431373, 0.0078431373, 0.0784313725, 0.5176470588235295, 0.0078431373, 0.0078431373, 0.0705882353, 0.5215686274509804, 0.0078431373, 0.0078431373, 0.0549019608, 0.5254901960784314, 0.0078431373, 0.0078431373, 0.0470588235, 0.5294117647058824, 0.0235294118, 0.0078431373, 0.0392156863, 0.5333333333333333, 0.031372549, 0.0078431373, 0.0235294118, 0.5372549019607843, 0.0392156863, 0.0078431373, 0.0156862745, 0.5411764705882353, 0.0549019608, 0.0078431373, 0.0, 0.5450980392156862, 0.062745098, 0.0078431373, 0.0, 0.5490196078431373, 0.0705882353, 0.0078431373, 0.0, 0.5529411764705883, 0.0862745098, 0.0078431373, 0.0, 0.5568627450980392, 0.0941176471, 0.0078431373, 0.0, 0.5607843137254902, 0.1019607843, 0.0078431373, 0.0, 0.5647058823529412, 0.1098039216, 0.0078431373, 0.0, 0.5686274509803921, 0.1254901961, 0.0078431373, 0.0, 0.5725490196078431, 0.1333333333, 0.0078431373, 0.0, 0.5764705882352941, 0.1411764706, 0.0078431373, 0.0, 0.5803921568627451, 0.1568627451, 0.0078431373, 0.0, 0.5843137254901961, 0.1647058824, 0.0078431373, 0.0, 0.5882352941176471, 0.1725490196, 0.0078431373, 0.0, 0.592156862745098, 0.1882352941, 0.0078431373, 0.0, 0.596078431372549, 0.1960784314, 0.0078431373, 0.0, 0.6, 0.2039215686, 0.0078431373, 0.0, 0.6039215686274509, 0.2117647059, 0.0078431373, 0.0, 0.6078431372549019, 0.2274509804, 0.0078431373, 0.0, 0.611764705882353, 0.2352941176, 0.0078431373, 0.0, 0.615686274509804, 0.2431372549, 0.0078431373, 0.0, 0.6196078431372549, 0.2588235294, 0.0078431373, 0.0, 0.6235294117647059, 0.2666666667, 0.0078431373, 0.0, 0.6274509803921569, 0.2745098039, 0.0, 0.0, 0.6313725490196078, 0.2901960784, 0.0156862745, 0.0, 0.6352941176470588, 0.2980392157, 0.0235294118, 0.0, 0.6392156862745098, 0.3058823529, 0.0392156863, 0.0, 0.6431372549019608, 0.3137254902, 0.0470588235, 0.0, 0.6470588235294118, 0.3294117647, 0.0549019608, 0.0, 0.6509803921568628, 0.337254902, 0.0705882353, 0.0, 0.6549019607843137, 0.3450980392, 0.0784313725, 0.0, 0.6588235294117647, 0.3607843137, 0.0862745098, 0.0, 0.6627450980392157, 0.368627451, 0.1019607843, 0.0, 0.6666666666666666, 0.3764705882, 0.1098039216, 0.0, 0.6705882352941176, 0.3843137255, 0.1176470588, 0.0, 0.6745098039215687, 0.4, 0.1333333333, 0.0, 0.6784313725490196, 0.4078431373, 0.1411764706, 0.0, 0.6823529411764706, 0.4156862745, 0.1490196078, 0.0, 0.6862745098039216, 0.431372549, 0.1647058824, 0.0, 0.6901960784313725, 0.4392156863, 0.1725490196, 0.0, 0.6941176470588235, 0.4470588235, 0.1803921569, 0.0, 0.6980392156862745, 0.462745098, 0.1960784314, 0.0, 0.7019607843137254, 0.4705882353, 0.2039215686, 0.0, 0.7058823529411765, 0.4784313725, 0.2117647059, 0.0, 0.7098039215686275, 0.4862745098, 0.2274509804, 0.0, 0.7137254901960784, 0.5019607843, 0.2352941176, 0.0, 0.7176470588235294, 0.5098039216, 0.2431372549, 0.0, 0.7215686274509804, 0.5176470588, 0.2588235294, 0.0, 0.7254901960784313, 0.5333333333, 0.2666666667, 0.0, 0.7294117647058823, 0.5411764706, 0.2745098039, 0.0, 0.7333333333333333, 0.5490196078, 0.2901960784, 0.0, 0.7372549019607844, 0.5647058824, 0.2980392157, 0.0, 0.7411764705882353, 0.5725490196, 0.3058823529, 0.0, 0.7450980392156863, 0.5803921569, 0.3215686275, 0.0, 0.7490196078431373, 0.5882352941, 0.3294117647, 0.0, 0.7529411764705882, 0.6039215686, 0.337254902, 0.0, 0.7568627450980392, 0.6117647059, 0.3529411765, 0.0, 0.7607843137254902, 0.6196078431, 0.3607843137, 0.0, 0.7647058823529411, 0.6352941176, 0.368627451, 0.0, 0.7686274509803922, 0.6431372549, 0.3843137255, 0.0, 0.7725490196078432, 0.6509803922, 0.3921568627, 0.0, 0.7764705882352941, 0.6588235294, 0.4, 0.0, 0.7803921568627451, 0.6745098039, 0.4156862745, 0.0, 0.7843137254901961, 0.6823529412, 0.4235294118, 0.0, 0.788235294117647, 0.6901960784, 0.431372549, 0.0, 0.792156862745098, 0.7058823529, 0.4470588235, 0.0, 0.796078431372549, 0.7137254902, 0.4549019608, 0.0, 0.8, 0.7215686275, 0.462745098, 0.0, 0.803921568627451, 0.737254902, 0.4784313725, 0.0, 0.807843137254902, 0.7450980392, 0.4862745098, 0.0, 0.8117647058823529, 0.7529411765, 0.4941176471, 0.0, 0.8156862745098039, 0.7607843137, 0.5098039216, 0.0, 0.8196078431372549, 0.7764705882, 0.5176470588, 0.0, 0.8235294117647058, 0.7843137255, 0.5254901961, 0.0, 0.8274509803921568, 0.7921568627, 0.5411764706, 0.0, 0.8313725490196079, 0.8078431373, 0.5490196078, 0.0, 0.8352941176470589, 0.8156862745, 0.5568627451, 0.0, 0.8392156862745098, 0.8235294118, 0.5725490196, 0.0, 0.8431372549019608, 0.8392156863, 0.5803921569, 0.0, 0.8470588235294118, 0.8470588235, 0.5882352941, 0.0, 0.8509803921568627, 0.8549019608, 0.6039215686, 0.0, 0.8549019607843137, 0.862745098, 0.6117647059, 0.0, 0.8588235294117647, 0.8784313725, 0.6196078431, 0.0, 0.8627450980392157, 0.8862745098, 0.6352941176, 0.0, 0.8666666666666667, 0.8941176471, 0.6431372549, 0.0, 0.8705882352941177, 0.9098039216, 0.6509803922, 0.0, 0.8745098039215686, 0.9176470588, 0.6666666667, 0.0, 0.8784313725490196, 0.9254901961, 0.6745098039, 0.0, 0.8823529411764706, 0.9411764706, 0.6823529412, 0.0, 0.8862745098039215, 0.9490196078, 0.6980392157, 0.0, 0.8901960784313725, 0.9568627451, 0.7058823529, 0.0, 0.8941176470588236, 0.9647058824, 0.7137254902, 0.0, 0.8980392156862745, 0.9803921569, 0.7294117647, 0.0, 0.9019607843137255, 0.9882352941, 0.737254902, 0.0, 0.9058823529411765, 0.9960784314, 0.7450980392, 0.0, 0.9098039215686274, 0.9960784314, 0.7607843137, 0.0, 0.9137254901960784, 0.9960784314, 0.768627451, 0.0, 0.9176470588235294, 0.9960784314, 0.7764705882, 0.0, 0.9215686274509803, 0.9960784314, 0.7921568627, 0.0, 0.9254901960784314, 0.9960784314, 0.8, 0.0, 0.9294117647058824, 0.9960784314, 0.8078431373, 0.0, 0.9333333333333333, 0.9960784314, 0.8235294118, 0.0, 0.9372549019607843, 0.9960784314, 0.831372549, 0.0, 0.9411764705882354, 0.9960784314, 0.8392156863, 0.0, 0.9450980392156864, 0.9960784314, 0.8549019608, 0.0, 0.9490196078431372, 0.9960784314, 0.862745098, 0.0549019608, 0.9529411764705882, 0.9960784314, 0.8705882353, 0.1098039216, 0.9568627450980394, 0.9960784314, 0.8862745098, 0.1647058824, 0.9607843137254903, 0.9960784314, 0.8941176471, 0.2196078431, 0.9647058823529413, 0.9960784314, 0.9019607843, 0.2666666667, 0.9686274509803922, 0.9960784314, 0.9176470588, 0.3215686275, 0.9725490196078431, 0.9960784314, 0.9254901961, 0.3764705882, 0.9764705882352941, 0.9960784314, 0.9333333333, 0.431372549, 0.9803921568627451, 0.9960784314, 0.9490196078, 0.4862745098, 0.984313725490196, 0.9960784314, 0.9568627451, 0.5333333333, 0.9882352941176471, 0.9960784314, 0.9647058824, 0.5882352941, 0.9921568627450981, 0.9960784314, 0.9803921569, 0.6431372549, 0.996078431372549, 0.9960784314, 0.9882352941, 0.6980392157, 1.0, 0.9960784314, 0.9960784314, 0.7450980392],
  description: 'Perfusion'
}, {
  ColorSpace: 'RGB',
  Name: 'rainbow_2',
  name: 'rainbow_2',
  RGBPoints: [0.0, 0.0, 0.0, 0.0, 0.00392156862745098, 0.0156862745, 0.0, 0.0117647059, 0.00784313725490196, 0.0352941176, 0.0, 0.0274509804, 0.011764705882352941, 0.0509803922, 0.0, 0.0392156863, 0.01568627450980392, 0.0705882353, 0.0, 0.0549019608, 0.0196078431372549, 0.0862745098, 0.0, 0.0745098039, 0.023529411764705882, 0.1058823529, 0.0, 0.0901960784, 0.027450980392156862, 0.1215686275, 0.0, 0.1098039216, 0.03137254901960784, 0.1411764706, 0.0, 0.1254901961, 0.03529411764705882, 0.1568627451, 0.0, 0.1490196078, 0.0392156862745098, 0.1764705882, 0.0, 0.168627451, 0.043137254901960784, 0.1960784314, 0.0, 0.1882352941, 0.047058823529411764, 0.2117647059, 0.0, 0.2078431373, 0.050980392156862744, 0.2274509804, 0.0, 0.231372549, 0.054901960784313725, 0.2392156863, 0.0, 0.2470588235, 0.05882352941176471, 0.2509803922, 0.0, 0.2666666667, 0.06274509803921569, 0.2666666667, 0.0, 0.2823529412, 0.06666666666666667, 0.2705882353, 0.0, 0.3019607843, 0.07058823529411765, 0.2823529412, 0.0, 0.3176470588, 0.07450980392156863, 0.2901960784, 0.0, 0.337254902, 0.0784313725490196, 0.3019607843, 0.0, 0.3568627451, 0.08235294117647059, 0.3098039216, 0.0, 0.3725490196, 0.08627450980392157, 0.3137254902, 0.0, 0.3921568627, 0.09019607843137255, 0.3215686275, 0.0, 0.4078431373, 0.09411764705882353, 0.3254901961, 0.0, 0.4274509804, 0.09803921568627451, 0.3333333333, 0.0, 0.4431372549, 0.10196078431372549, 0.3294117647, 0.0, 0.462745098, 0.10588235294117647, 0.337254902, 0.0, 0.4784313725, 0.10980392156862745, 0.3411764706, 0.0, 0.4980392157, 0.11372549019607843, 0.3450980392, 0.0, 0.5176470588, 0.11764705882352942, 0.337254902, 0.0, 0.5333333333, 0.12156862745098039, 0.3411764706, 0.0, 0.5529411765, 0.12549019607843137, 0.3411764706, 0.0, 0.568627451, 0.12941176470588237, 0.3411764706, 0.0, 0.5882352941, 0.13333333333333333, 0.3333333333, 0.0, 0.6039215686, 0.13725490196078433, 0.3294117647, 0.0, 0.6235294118, 0.1411764705882353, 0.3294117647, 0.0, 0.6392156863, 0.1450980392156863, 0.3294117647, 0.0, 0.6588235294, 0.14901960784313725, 0.3254901961, 0.0, 0.6784313725, 0.15294117647058825, 0.3098039216, 0.0, 0.6941176471, 0.1568627450980392, 0.3058823529, 0.0, 0.7137254902, 0.1607843137254902, 0.3019607843, 0.0, 0.7294117647, 0.16470588235294117, 0.2980392157, 0.0, 0.7490196078, 0.16862745098039217, 0.2784313725, 0.0, 0.7647058824, 0.17254901960784313, 0.2745098039, 0.0, 0.7843137255, 0.17647058823529413, 0.2666666667, 0.0, 0.8, 0.1803921568627451, 0.2588235294, 0.0, 0.8196078431, 0.1843137254901961, 0.2352941176, 0.0, 0.8392156863, 0.18823529411764706, 0.2274509804, 0.0, 0.8549019608, 0.19215686274509805, 0.2156862745, 0.0, 0.8745098039, 0.19607843137254902, 0.2078431373, 0.0, 0.8901960784, 0.2, 0.1803921569, 0.0, 0.9098039216, 0.20392156862745098, 0.168627451, 0.0, 0.9254901961, 0.20784313725490197, 0.1568627451, 0.0, 0.9450980392, 0.21176470588235294, 0.1411764706, 0.0, 0.9607843137, 0.21568627450980393, 0.1294117647, 0.0, 0.9803921569, 0.2196078431372549, 0.0980392157, 0.0, 1.0, 0.2235294117647059, 0.0823529412, 0.0, 1.0, 0.22745098039215686, 0.062745098, 0.0, 1.0, 0.23137254901960785, 0.0470588235, 0.0, 1.0, 0.23529411764705885, 0.0156862745, 0.0, 1.0, 0.23921568627450984, 0.0, 0.0, 1.0, 0.24313725490196078, 0.0, 0.0156862745, 1.0, 0.24705882352941178, 0.0, 0.031372549, 1.0, 0.25098039215686274, 0.0, 0.062745098, 1.0, 0.2549019607843137, 0.0, 0.0823529412, 1.0, 0.25882352941176473, 0.0, 0.0980392157, 1.0, 0.2627450980392157, 0.0, 0.1137254902, 1.0, 0.26666666666666666, 0.0, 0.1490196078, 1.0, 0.27058823529411763, 0.0, 0.1647058824, 1.0, 0.27450980392156865, 0.0, 0.1803921569, 1.0, 0.2784313725490196, 0.0, 0.2, 1.0, 0.2823529411764706, 0.0, 0.2156862745, 1.0, 0.28627450980392155, 0.0, 0.2470588235, 1.0, 0.2901960784313726, 0.0, 0.262745098, 1.0, 0.29411764705882354, 0.0, 0.2823529412, 1.0, 0.2980392156862745, 0.0, 0.2980392157, 1.0, 0.30196078431372547, 0.0, 0.3294117647, 1.0, 0.3058823529411765, 0.0, 0.3490196078, 1.0, 0.30980392156862746, 0.0, 0.3647058824, 1.0, 0.3137254901960784, 0.0, 0.3803921569, 1.0, 0.3176470588235294, 0.0, 0.4156862745, 1.0, 0.3215686274509804, 0.0, 0.431372549, 1.0, 0.3254901960784314, 0.0, 0.4470588235, 1.0, 0.32941176470588235, 0.0, 0.4666666667, 1.0, 0.3333333333333333, 0.0, 0.4980392157, 1.0, 0.33725490196078434, 0.0, 0.5137254902, 1.0, 0.3411764705882353, 0.0, 0.5294117647, 1.0, 0.34509803921568627, 0.0, 0.5490196078, 1.0, 0.34901960784313724, 0.0, 0.5647058824, 1.0, 0.35294117647058826, 0.0, 0.5960784314, 1.0, 0.3568627450980392, 0.0, 0.6156862745, 1.0, 0.3607843137254902, 0.0, 0.631372549, 1.0, 0.36470588235294116, 0.0, 0.6470588235, 1.0, 0.3686274509803922, 0.0, 0.6823529412, 1.0, 0.37254901960784315, 0.0, 0.6980392157, 1.0, 0.3764705882352941, 0.0, 0.7137254902, 1.0, 0.3803921568627451, 0.0, 0.7333333333, 1.0, 0.3843137254901961, 0.0, 0.7647058824, 1.0, 0.38823529411764707, 0.0, 0.7803921569, 1.0, 0.39215686274509803, 0.0, 0.7960784314, 1.0, 0.396078431372549, 0.0, 0.8156862745, 1.0, 0.4, 0.0, 0.8470588235, 1.0, 0.403921568627451, 0.0, 0.862745098, 1.0, 0.40784313725490196, 0.0, 0.8823529412, 1.0, 0.4117647058823529, 0.0, 0.8980392157, 1.0, 0.41568627450980394, 0.0, 0.9137254902, 1.0, 0.4196078431372549, 0.0, 0.9490196078, 1.0, 0.4235294117647059, 0.0, 0.9647058824, 1.0, 0.42745098039215684, 0.0, 0.9803921569, 1.0, 0.43137254901960786, 0.0, 1.0, 1.0, 0.43529411764705883, 0.0, 1.0, 0.9647058824, 0.4392156862745098, 0.0, 1.0, 0.9490196078, 0.44313725490196076, 0.0, 1.0, 0.9333333333, 0.4470588235294118, 0.0, 1.0, 0.9137254902, 0.45098039215686275, 0.0, 1.0, 0.8823529412, 0.4549019607843137, 0.0, 1.0, 0.862745098, 0.4588235294117647, 0.0, 1.0, 0.8470588235, 0.4627450980392157, 0.0, 1.0, 0.831372549, 0.4666666666666667, 0.0, 1.0, 0.7960784314, 0.4705882352941177, 0.0, 1.0, 0.7803921569, 0.4745098039215686, 0.0, 1.0, 0.7647058824, 0.4784313725490197, 0.0, 1.0, 0.7490196078, 0.48235294117647065, 0.0, 1.0, 0.7333333333, 0.48627450980392156, 0.0, 1.0, 0.6980392157, 0.49019607843137253, 0.0, 1.0, 0.6823529412, 0.49411764705882355, 0.0, 1.0, 0.6666666667, 0.4980392156862745, 0.0, 1.0, 0.6470588235, 0.5019607843137255, 0.0, 1.0, 0.6156862745, 0.5058823529411764, 0.0, 1.0, 0.5960784314, 0.5098039215686274, 0.0, 1.0, 0.5803921569, 0.5137254901960784, 0.0, 1.0, 0.5647058824, 0.5176470588235295, 0.0, 1.0, 0.5294117647, 0.5215686274509804, 0.0, 1.0, 0.5137254902, 0.5254901960784314, 0.0, 1.0, 0.4980392157, 0.5294117647058824, 0.0, 1.0, 0.4823529412, 0.5333333333333333, 0.0, 1.0, 0.4470588235, 0.5372549019607843, 0.0, 1.0, 0.431372549, 0.5411764705882353, 0.0, 1.0, 0.4156862745, 0.5450980392156862, 0.0, 1.0, 0.4, 0.5490196078431373, 0.0, 1.0, 0.3803921569, 0.5529411764705883, 0.0, 1.0, 0.3490196078, 0.5568627450980392, 0.0, 1.0, 0.3294117647, 0.5607843137254902, 0.0, 1.0, 0.3137254902, 0.5647058823529412, 0.0, 1.0, 0.2980392157, 0.5686274509803921, 0.0, 1.0, 0.262745098, 0.5725490196078431, 0.0, 1.0, 0.2470588235, 0.5764705882352941, 0.0, 1.0, 0.231372549, 0.5803921568627451, 0.0, 1.0, 0.2156862745, 0.5843137254901961, 0.0, 1.0, 0.1803921569, 0.5882352941176471, 0.0, 1.0, 0.1647058824, 0.592156862745098, 0.0, 1.0, 0.1490196078, 0.596078431372549, 0.0, 1.0, 0.1333333333, 0.6, 0.0, 1.0, 0.0980392157, 0.6039215686274509, 0.0, 1.0, 0.0823529412, 0.6078431372549019, 0.0, 1.0, 0.062745098, 0.611764705882353, 0.0, 1.0, 0.0470588235, 0.615686274509804, 0.0, 1.0, 0.031372549, 0.6196078431372549, 0.0, 1.0, 0.0, 0.6235294117647059, 0.0156862745, 1.0, 0.0, 0.6274509803921569, 0.031372549, 1.0, 0.0, 0.6313725490196078, 0.0470588235, 1.0, 0.0, 0.6352941176470588, 0.0823529412, 1.0, 0.0, 0.6392156862745098, 0.0980392157, 1.0, 0.0, 0.6431372549019608, 0.1137254902, 1.0, 0.0, 0.6470588235294118, 0.1294117647, 1.0, 0.0, 0.6509803921568628, 0.1647058824, 1.0, 0.0, 0.6549019607843137, 0.1803921569, 1.0, 0.0, 0.6588235294117647, 0.2, 1.0, 0.0, 0.6627450980392157, 0.2156862745, 1.0, 0.0, 0.6666666666666666, 0.2470588235, 1.0, 0.0, 0.6705882352941176, 0.262745098, 1.0, 0.0, 0.6745098039215687, 0.2823529412, 1.0, 0.0, 0.6784313725490196, 0.2980392157, 1.0, 0.0, 0.6823529411764706, 0.3137254902, 1.0, 0.0, 0.6862745098039216, 0.3490196078, 1.0, 0.0, 0.6901960784313725, 0.3647058824, 1.0, 0.0, 0.6941176470588235, 0.3803921569, 1.0, 0.0, 0.6980392156862745, 0.3960784314, 1.0, 0.0, 0.7019607843137254, 0.431372549, 1.0, 0.0, 0.7058823529411765, 0.4470588235, 1.0, 0.0, 0.7098039215686275, 0.4666666667, 1.0, 0.0, 0.7137254901960784, 0.4823529412, 1.0, 0.0, 0.7176470588235294, 0.5137254902, 1.0, 0.0, 0.7215686274509804, 0.5294117647, 1.0, 0.0, 0.7254901960784313, 0.5490196078, 1.0, 0.0, 0.7294117647058823, 0.5647058824, 1.0, 0.0, 0.7333333333333333, 0.6, 1.0, 0.0, 0.7372549019607844, 0.6156862745, 1.0, 0.0, 0.7411764705882353, 0.631372549, 1.0, 0.0, 0.7450980392156863, 0.6470588235, 1.0, 0.0, 0.7490196078431373, 0.662745098, 1.0, 0.0, 0.7529411764705882, 0.6980392157, 1.0, 0.0, 0.7568627450980392, 0.7137254902, 1.0, 0.0, 0.7607843137254902, 0.7333333333, 1.0, 0.0, 0.7647058823529411, 0.7490196078, 1.0, 0.0, 0.7686274509803922, 0.7803921569, 1.0, 0.0, 0.7725490196078432, 0.7960784314, 1.0, 0.0, 0.7764705882352941, 0.8156862745, 1.0, 0.0, 0.7803921568627451, 0.831372549, 1.0, 0.0, 0.7843137254901961, 0.8666666667, 1.0, 0.0, 0.788235294117647, 0.8823529412, 1.0, 0.0, 0.792156862745098, 0.8980392157, 1.0, 0.0, 0.796078431372549, 0.9137254902, 1.0, 0.0, 0.8, 0.9490196078, 1.0, 0.0, 0.803921568627451, 0.9647058824, 1.0, 0.0, 0.807843137254902, 0.9803921569, 1.0, 0.0, 0.8117647058823529, 1.0, 1.0, 0.0, 0.8156862745098039, 1.0, 0.9803921569, 0.0, 0.8196078431372549, 1.0, 0.9490196078, 0.0, 0.8235294117647058, 1.0, 0.9333333333, 0.0, 0.8274509803921568, 1.0, 0.9137254902, 0.0, 0.8313725490196079, 1.0, 0.8980392157, 0.0, 0.8352941176470589, 1.0, 0.8666666667, 0.0, 0.8392156862745098, 1.0, 0.8470588235, 0.0, 0.8431372549019608, 1.0, 0.831372549, 0.0, 0.8470588235294118, 1.0, 0.8156862745, 0.0, 0.8509803921568627, 1.0, 0.7803921569, 0.0, 0.8549019607843137, 1.0, 0.7647058824, 0.0, 0.8588235294117647, 1.0, 0.7490196078, 0.0, 0.8627450980392157, 1.0, 0.7333333333, 0.0, 0.8666666666666667, 1.0, 0.6980392157, 0.0, 0.8705882352941177, 1.0, 0.6823529412, 0.0, 0.8745098039215686, 1.0, 0.6666666667, 0.0, 0.8784313725490196, 1.0, 0.6470588235, 0.0, 0.8823529411764706, 1.0, 0.631372549, 0.0, 0.8862745098039215, 1.0, 0.6, 0.0, 0.8901960784313725, 1.0, 0.5803921569, 0.0, 0.8941176470588236, 1.0, 0.5647058824, 0.0, 0.8980392156862745, 1.0, 0.5490196078, 0.0, 0.9019607843137255, 1.0, 0.5137254902, 0.0, 0.9058823529411765, 1.0, 0.4980392157, 0.0, 0.9098039215686274, 1.0, 0.4823529412, 0.0, 0.9137254901960784, 1.0, 0.4666666667, 0.0, 0.9176470588235294, 1.0, 0.431372549, 0.0, 0.9215686274509803, 1.0, 0.4156862745, 0.0, 0.9254901960784314, 1.0, 0.4, 0.0, 0.9294117647058824, 1.0, 0.3803921569, 0.0, 0.9333333333333333, 1.0, 0.3490196078, 0.0, 0.9372549019607843, 1.0, 0.3333333333, 0.0, 0.9411764705882354, 1.0, 0.3137254902, 0.0, 0.9450980392156864, 1.0, 0.2980392157, 0.0, 0.9490196078431372, 1.0, 0.2823529412, 0.0, 0.9529411764705882, 1.0, 0.2470588235, 0.0, 0.9568627450980394, 1.0, 0.231372549, 0.0, 0.9607843137254903, 1.0, 0.2156862745, 0.0, 0.9647058823529413, 1.0, 0.2, 0.0, 0.9686274509803922, 1.0, 0.1647058824, 0.0, 0.9725490196078431, 1.0, 0.1490196078, 0.0, 0.9764705882352941, 1.0, 0.1333333333, 0.0, 0.9803921568627451, 1.0, 0.1137254902, 0.0, 0.984313725490196, 1.0, 0.0823529412, 0.0, 0.9882352941176471, 1.0, 0.0666666667, 0.0, 0.9921568627450981, 1.0, 0.0470588235, 0.0, 0.996078431372549, 1.0, 0.031372549, 0.0, 1.0, 1.0, 0.0, 0.0],
  description: 'Rainbow'
}, {
  ColorSpace: 'RGB',
  Name: 'suv',
  name: 'suv',
  RGBPoints: [0.0, 1.0, 1.0, 1.0, 0.00392156862745098, 1.0, 1.0, 1.0, 0.00784313725490196, 1.0, 1.0, 1.0, 0.011764705882352941, 1.0, 1.0, 1.0, 0.01568627450980392, 1.0, 1.0, 1.0, 0.0196078431372549, 1.0, 1.0, 1.0, 0.023529411764705882, 1.0, 1.0, 1.0, 0.027450980392156862, 1.0, 1.0, 1.0, 0.03137254901960784, 1.0, 1.0, 1.0, 0.03529411764705882, 1.0, 1.0, 1.0, 0.0392156862745098, 1.0, 1.0, 1.0, 0.043137254901960784, 1.0, 1.0, 1.0, 0.047058823529411764, 1.0, 1.0, 1.0, 0.050980392156862744, 1.0, 1.0, 1.0, 0.054901960784313725, 1.0, 1.0, 1.0, 0.05882352941176471, 1.0, 1.0, 1.0, 0.06274509803921569, 1.0, 1.0, 1.0, 0.06666666666666667, 1.0, 1.0, 1.0, 0.07058823529411765, 1.0, 1.0, 1.0, 0.07450980392156863, 1.0, 1.0, 1.0, 0.0784313725490196, 1.0, 1.0, 1.0, 0.08235294117647059, 1.0, 1.0, 1.0, 0.08627450980392157, 1.0, 1.0, 1.0, 0.09019607843137255, 1.0, 1.0, 1.0, 0.09411764705882353, 1.0, 1.0, 1.0, 0.09803921568627451, 1.0, 1.0, 1.0, 0.10196078431372549, 0.737254902, 0.737254902, 0.737254902, 0.10588235294117647, 0.737254902, 0.737254902, 0.737254902, 0.10980392156862745, 0.737254902, 0.737254902, 0.737254902, 0.11372549019607843, 0.737254902, 0.737254902, 0.737254902, 0.11764705882352942, 0.737254902, 0.737254902, 0.737254902, 0.12156862745098039, 0.737254902, 0.737254902, 0.737254902, 0.12549019607843137, 0.737254902, 0.737254902, 0.737254902, 0.12941176470588237, 0.737254902, 0.737254902, 0.737254902, 0.13333333333333333, 0.737254902, 0.737254902, 0.737254902, 0.13725490196078433, 0.737254902, 0.737254902, 0.737254902, 0.1411764705882353, 0.737254902, 0.737254902, 0.737254902, 0.1450980392156863, 0.737254902, 0.737254902, 0.737254902, 0.14901960784313725, 0.737254902, 0.737254902, 0.737254902, 0.15294117647058825, 0.737254902, 0.737254902, 0.737254902, 0.1568627450980392, 0.737254902, 0.737254902, 0.737254902, 0.1607843137254902, 0.737254902, 0.737254902, 0.737254902, 0.16470588235294117, 0.737254902, 0.737254902, 0.737254902, 0.16862745098039217, 0.737254902, 0.737254902, 0.737254902, 0.17254901960784313, 0.737254902, 0.737254902, 0.737254902, 0.17647058823529413, 0.737254902, 0.737254902, 0.737254902, 0.1803921568627451, 0.737254902, 0.737254902, 0.737254902, 0.1843137254901961, 0.737254902, 0.737254902, 0.737254902, 0.18823529411764706, 0.737254902, 0.737254902, 0.737254902, 0.19215686274509805, 0.737254902, 0.737254902, 0.737254902, 0.19607843137254902, 0.737254902, 0.737254902, 0.737254902, 0.2, 0.737254902, 0.737254902, 0.737254902, 0.20392156862745098, 0.431372549, 0.0, 0.568627451, 0.20784313725490197, 0.431372549, 0.0, 0.568627451, 0.21176470588235294, 0.431372549, 0.0, 0.568627451, 0.21568627450980393, 0.431372549, 0.0, 0.568627451, 0.2196078431372549, 0.431372549, 0.0, 0.568627451, 0.2235294117647059, 0.431372549, 0.0, 0.568627451, 0.22745098039215686, 0.431372549, 0.0, 0.568627451, 0.23137254901960785, 0.431372549, 0.0, 0.568627451, 0.23529411764705885, 0.431372549, 0.0, 0.568627451, 0.23921568627450984, 0.431372549, 0.0, 0.568627451, 0.24313725490196078, 0.431372549, 0.0, 0.568627451, 0.24705882352941178, 0.431372549, 0.0, 0.568627451, 0.25098039215686274, 0.431372549, 0.0, 0.568627451, 0.2549019607843137, 0.431372549, 0.0, 0.568627451, 0.25882352941176473, 0.431372549, 0.0, 0.568627451, 0.2627450980392157, 0.431372549, 0.0, 0.568627451, 0.26666666666666666, 0.431372549, 0.0, 0.568627451, 0.27058823529411763, 0.431372549, 0.0, 0.568627451, 0.27450980392156865, 0.431372549, 0.0, 0.568627451, 0.2784313725490196, 0.431372549, 0.0, 0.568627451, 0.2823529411764706, 0.431372549, 0.0, 0.568627451, 0.28627450980392155, 0.431372549, 0.0, 0.568627451, 0.2901960784313726, 0.431372549, 0.0, 0.568627451, 0.29411764705882354, 0.431372549, 0.0, 0.568627451, 0.2980392156862745, 0.431372549, 0.0, 0.568627451, 0.30196078431372547, 0.431372549, 0.0, 0.568627451, 0.3058823529411765, 0.2509803922, 0.3333333333, 0.6509803922, 0.30980392156862746, 0.2509803922, 0.3333333333, 0.6509803922, 0.3137254901960784, 0.2509803922, 0.3333333333, 0.6509803922, 0.3176470588235294, 0.2509803922, 0.3333333333, 0.6509803922, 0.3215686274509804, 0.2509803922, 0.3333333333, 0.6509803922, 0.3254901960784314, 0.2509803922, 0.3333333333, 0.6509803922, 0.32941176470588235, 0.2509803922, 0.3333333333, 0.6509803922, 0.3333333333333333, 0.2509803922, 0.3333333333, 0.6509803922, 0.33725490196078434, 0.2509803922, 0.3333333333, 0.6509803922, 0.3411764705882353, 0.2509803922, 0.3333333333, 0.6509803922, 0.34509803921568627, 0.2509803922, 0.3333333333, 0.6509803922, 0.34901960784313724, 0.2509803922, 0.3333333333, 0.6509803922, 0.35294117647058826, 0.2509803922, 0.3333333333, 0.6509803922, 0.3568627450980392, 0.2509803922, 0.3333333333, 0.6509803922, 0.3607843137254902, 0.2509803922, 0.3333333333, 0.6509803922, 0.36470588235294116, 0.2509803922, 0.3333333333, 0.6509803922, 0.3686274509803922, 0.2509803922, 0.3333333333, 0.6509803922, 0.37254901960784315, 0.2509803922, 0.3333333333, 0.6509803922, 0.3764705882352941, 0.2509803922, 0.3333333333, 0.6509803922, 0.3803921568627451, 0.2509803922, 0.3333333333, 0.6509803922, 0.3843137254901961, 0.2509803922, 0.3333333333, 0.6509803922, 0.38823529411764707, 0.2509803922, 0.3333333333, 0.6509803922, 0.39215686274509803, 0.2509803922, 0.3333333333, 0.6509803922, 0.396078431372549, 0.2509803922, 0.3333333333, 0.6509803922, 0.4, 0.2509803922, 0.3333333333, 0.6509803922, 0.403921568627451, 0.2509803922, 0.3333333333, 0.6509803922, 0.40784313725490196, 0.0, 0.8, 1.0, 0.4117647058823529, 0.0, 0.8, 1.0, 0.41568627450980394, 0.0, 0.8, 1.0, 0.4196078431372549, 0.0, 0.8, 1.0, 0.4235294117647059, 0.0, 0.8, 1.0, 0.42745098039215684, 0.0, 0.8, 1.0, 0.43137254901960786, 0.0, 0.8, 1.0, 0.43529411764705883, 0.0, 0.8, 1.0, 0.4392156862745098, 0.0, 0.8, 1.0, 0.44313725490196076, 0.0, 0.8, 1.0, 0.4470588235294118, 0.0, 0.8, 1.0, 0.45098039215686275, 0.0, 0.8, 1.0, 0.4549019607843137, 0.0, 0.8, 1.0, 0.4588235294117647, 0.0, 0.8, 1.0, 0.4627450980392157, 0.0, 0.8, 1.0, 0.4666666666666667, 0.0, 0.8, 1.0, 0.4705882352941177, 0.0, 0.8, 1.0, 0.4745098039215686, 0.0, 0.8, 1.0, 0.4784313725490197, 0.0, 0.8, 1.0, 0.48235294117647065, 0.0, 0.8, 1.0, 0.48627450980392156, 0.0, 0.8, 1.0, 0.49019607843137253, 0.0, 0.8, 1.0, 0.49411764705882355, 0.0, 0.8, 1.0, 0.4980392156862745, 0.0, 0.8, 1.0, 0.5019607843137255, 0.0, 0.8, 1.0, 0.5058823529411764, 0.0, 0.6666666667, 0.5333333333, 0.5098039215686274, 0.0, 0.6666666667, 0.5333333333, 0.5137254901960784, 0.0, 0.6666666667, 0.5333333333, 0.5176470588235295, 0.0, 0.6666666667, 0.5333333333, 0.5215686274509804, 0.0, 0.6666666667, 0.5333333333, 0.5254901960784314, 0.0, 0.6666666667, 0.5333333333, 0.5294117647058824, 0.0, 0.6666666667, 0.5333333333, 0.5333333333333333, 0.0, 0.6666666667, 0.5333333333, 0.5372549019607843, 0.0, 0.6666666667, 0.5333333333, 0.5411764705882353, 0.0, 0.6666666667, 0.5333333333, 0.5450980392156862, 0.0, 0.6666666667, 0.5333333333, 0.5490196078431373, 0.0, 0.6666666667, 0.5333333333, 0.5529411764705883, 0.0, 0.6666666667, 0.5333333333, 0.5568627450980392, 0.0, 0.6666666667, 0.5333333333, 0.5607843137254902, 0.0, 0.6666666667, 0.5333333333, 0.5647058823529412, 0.0, 0.6666666667, 0.5333333333, 0.5686274509803921, 0.0, 0.6666666667, 0.5333333333, 0.5725490196078431, 0.0, 0.6666666667, 0.5333333333, 0.5764705882352941, 0.0, 0.6666666667, 0.5333333333, 0.5803921568627451, 0.0, 0.6666666667, 0.5333333333, 0.5843137254901961, 0.0, 0.6666666667, 0.5333333333, 0.5882352941176471, 0.0, 0.6666666667, 0.5333333333, 0.592156862745098, 0.0, 0.6666666667, 0.5333333333, 0.596078431372549, 0.0, 0.6666666667, 0.5333333333, 0.6, 0.0, 0.6666666667, 0.5333333333, 0.6039215686274509, 0.0, 0.6666666667, 0.5333333333, 0.6078431372549019, 0.4, 1.0, 0.4, 0.611764705882353, 0.4, 1.0, 0.4, 0.615686274509804, 0.4, 1.0, 0.4, 0.6196078431372549, 0.4, 1.0, 0.4, 0.6235294117647059, 0.4, 1.0, 0.4, 0.6274509803921569, 0.4, 1.0, 0.4, 0.6313725490196078, 0.4, 1.0, 0.4, 0.6352941176470588, 0.4, 1.0, 0.4, 0.6392156862745098, 0.4, 1.0, 0.4, 0.6431372549019608, 0.4, 1.0, 0.4, 0.6470588235294118, 0.4, 1.0, 0.4, 0.6509803921568628, 0.4, 1.0, 0.4, 0.6549019607843137, 0.4, 1.0, 0.4, 0.6588235294117647, 0.4, 1.0, 0.4, 0.6627450980392157, 0.4, 1.0, 0.4, 0.6666666666666666, 0.4, 1.0, 0.4, 0.6705882352941176, 0.4, 1.0, 0.4, 0.6745098039215687, 0.4, 1.0, 0.4, 0.6784313725490196, 0.4, 1.0, 0.4, 0.6823529411764706, 0.4, 1.0, 0.4, 0.6862745098039216, 0.4, 1.0, 0.4, 0.6901960784313725, 0.4, 1.0, 0.4, 0.6941176470588235, 0.4, 1.0, 0.4, 0.6980392156862745, 0.4, 1.0, 0.4, 0.7019607843137254, 0.4, 1.0, 0.4, 0.7058823529411765, 1.0, 0.9490196078, 0.0, 0.7098039215686275, 1.0, 0.9490196078, 0.0, 0.7137254901960784, 1.0, 0.9490196078, 0.0, 0.7176470588235294, 1.0, 0.9490196078, 0.0, 0.7215686274509804, 1.0, 0.9490196078, 0.0, 0.7254901960784313, 1.0, 0.9490196078, 0.0, 0.7294117647058823, 1.0, 0.9490196078, 0.0, 0.7333333333333333, 1.0, 0.9490196078, 0.0, 0.7372549019607844, 1.0, 0.9490196078, 0.0, 0.7411764705882353, 1.0, 0.9490196078, 0.0, 0.7450980392156863, 1.0, 0.9490196078, 0.0, 0.7490196078431373, 1.0, 0.9490196078, 0.0, 0.7529411764705882, 1.0, 0.9490196078, 0.0, 0.7568627450980392, 1.0, 0.9490196078, 0.0, 0.7607843137254902, 1.0, 0.9490196078, 0.0, 0.7647058823529411, 1.0, 0.9490196078, 0.0, 0.7686274509803922, 1.0, 0.9490196078, 0.0, 0.7725490196078432, 1.0, 0.9490196078, 0.0, 0.7764705882352941, 1.0, 0.9490196078, 0.0, 0.7803921568627451, 1.0, 0.9490196078, 0.0, 0.7843137254901961, 1.0, 0.9490196078, 0.0, 0.788235294117647, 1.0, 0.9490196078, 0.0, 0.792156862745098, 1.0, 0.9490196078, 0.0, 0.796078431372549, 1.0, 0.9490196078, 0.0, 0.8, 1.0, 0.9490196078, 0.0, 0.803921568627451, 1.0, 0.9490196078, 0.0, 0.807843137254902, 0.9490196078, 0.6509803922, 0.2509803922, 0.8117647058823529, 0.9490196078, 0.6509803922, 0.2509803922, 0.8156862745098039, 0.9490196078, 0.6509803922, 0.2509803922, 0.8196078431372549, 0.9490196078, 0.6509803922, 0.2509803922, 0.8235294117647058, 0.9490196078, 0.6509803922, 0.2509803922, 0.8274509803921568, 0.9490196078, 0.6509803922, 0.2509803922, 0.8313725490196079, 0.9490196078, 0.6509803922, 0.2509803922, 0.8352941176470589, 0.9490196078, 0.6509803922, 0.2509803922, 0.8392156862745098, 0.9490196078, 0.6509803922, 0.2509803922, 0.8431372549019608, 0.9490196078, 0.6509803922, 0.2509803922, 0.8470588235294118, 0.9490196078, 0.6509803922, 0.2509803922, 0.8509803921568627, 0.9490196078, 0.6509803922, 0.2509803922, 0.8549019607843137, 0.9490196078, 0.6509803922, 0.2509803922, 0.8588235294117647, 0.9490196078, 0.6509803922, 0.2509803922, 0.8627450980392157, 0.9490196078, 0.6509803922, 0.2509803922, 0.8666666666666667, 0.9490196078, 0.6509803922, 0.2509803922, 0.8705882352941177, 0.9490196078, 0.6509803922, 0.2509803922, 0.8745098039215686, 0.9490196078, 0.6509803922, 0.2509803922, 0.8784313725490196, 0.9490196078, 0.6509803922, 0.2509803922, 0.8823529411764706, 0.9490196078, 0.6509803922, 0.2509803922, 0.8862745098039215, 0.9490196078, 0.6509803922, 0.2509803922, 0.8901960784313725, 0.9490196078, 0.6509803922, 0.2509803922, 0.8941176470588236, 0.9490196078, 0.6509803922, 0.2509803922, 0.8980392156862745, 0.9490196078, 0.6509803922, 0.2509803922, 0.9019607843137255, 0.9490196078, 0.6509803922, 0.2509803922, 0.9058823529411765, 0.9490196078, 0.6509803922, 0.2509803922, 0.9098039215686274, 1.0, 0.0, 0.0, 0.9137254901960784, 1.0, 0.0, 0.0, 0.9176470588235294, 1.0, 0.0, 0.0, 0.9215686274509803, 1.0, 0.0, 0.0, 0.9254901960784314, 1.0, 0.0, 0.0, 0.9294117647058824, 1.0, 0.0, 0.0, 0.9333333333333333, 1.0, 0.0, 0.0, 0.9372549019607843, 1.0, 0.0, 0.0, 0.9411764705882354, 1.0, 0.0, 0.0, 0.9450980392156864, 1.0, 0.0, 0.0, 0.9490196078431372, 1.0, 0.0, 0.0, 0.9529411764705882, 1.0, 0.0, 0.0, 0.9568627450980394, 1.0, 0.0, 0.0, 0.9607843137254903, 1.0, 0.0, 0.0, 0.9647058823529413, 1.0, 0.0, 0.0, 0.9686274509803922, 1.0, 0.0, 0.0, 0.9725490196078431, 1.0, 0.0, 0.0, 0.9764705882352941, 1.0, 0.0, 0.0, 0.9803921568627451, 1.0, 0.0, 0.0, 0.984313725490196, 1.0, 0.0, 0.0, 0.9882352941176471, 1.0, 0.0, 0.0, 0.9921568627450981, 1.0, 0.0, 0.0, 0.996078431372549, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0],
  description: 'SUV'
}, {
  ColorSpace: 'RGB',
  Name: 'ge_256',
  name: 'ge_256',
  RGBPoints: [0.0, 0.0039215686, 0.0078431373, 0.0078431373, 0.00392156862745098, 0.0039215686, 0.0078431373, 0.0078431373, 0.00784313725490196, 0.0039215686, 0.0078431373, 0.0117647059, 0.011764705882352941, 0.0039215686, 0.0117647059, 0.0156862745, 0.01568627450980392, 0.0039215686, 0.0117647059, 0.0196078431, 0.0196078431372549, 0.0039215686, 0.0156862745, 0.0235294118, 0.023529411764705882, 0.0039215686, 0.0156862745, 0.0274509804, 0.027450980392156862, 0.0039215686, 0.0196078431, 0.031372549, 0.03137254901960784, 0.0039215686, 0.0196078431, 0.0352941176, 0.03529411764705882, 0.0039215686, 0.0235294118, 0.0392156863, 0.0392156862745098, 0.0039215686, 0.0235294118, 0.0431372549, 0.043137254901960784, 0.0039215686, 0.0274509804, 0.0470588235, 0.047058823529411764, 0.0039215686, 0.0274509804, 0.0509803922, 0.050980392156862744, 0.0039215686, 0.031372549, 0.0549019608, 0.054901960784313725, 0.0039215686, 0.031372549, 0.0588235294, 0.05882352941176471, 0.0039215686, 0.0352941176, 0.062745098, 0.06274509803921569, 0.0039215686, 0.0352941176, 0.0666666667, 0.06666666666666667, 0.0039215686, 0.0392156863, 0.0705882353, 0.07058823529411765, 0.0039215686, 0.0392156863, 0.0745098039, 0.07450980392156863, 0.0039215686, 0.0431372549, 0.0784313725, 0.0784313725490196, 0.0039215686, 0.0431372549, 0.0823529412, 0.08235294117647059, 0.0039215686, 0.0470588235, 0.0862745098, 0.08627450980392157, 0.0039215686, 0.0470588235, 0.0901960784, 0.09019607843137255, 0.0039215686, 0.0509803922, 0.0941176471, 0.09411764705882353, 0.0039215686, 0.0509803922, 0.0980392157, 0.09803921568627451, 0.0039215686, 0.0549019608, 0.1019607843, 0.10196078431372549, 0.0039215686, 0.0549019608, 0.1058823529, 0.10588235294117647, 0.0039215686, 0.0588235294, 0.1098039216, 0.10980392156862745, 0.0039215686, 0.0588235294, 0.1137254902, 0.11372549019607843, 0.0039215686, 0.062745098, 0.1176470588, 0.11764705882352942, 0.0039215686, 0.062745098, 0.1215686275, 0.12156862745098039, 0.0039215686, 0.0666666667, 0.1254901961, 0.12549019607843137, 0.0039215686, 0.0666666667, 0.1294117647, 0.12941176470588237, 0.0039215686, 0.0705882353, 0.1333333333, 0.13333333333333333, 0.0039215686, 0.0705882353, 0.137254902, 0.13725490196078433, 0.0039215686, 0.0745098039, 0.1411764706, 0.1411764705882353, 0.0039215686, 0.0745098039, 0.1450980392, 0.1450980392156863, 0.0039215686, 0.0784313725, 0.1490196078, 0.14901960784313725, 0.0039215686, 0.0784313725, 0.1529411765, 0.15294117647058825, 0.0039215686, 0.0823529412, 0.1568627451, 0.1568627450980392, 0.0039215686, 0.0823529412, 0.1607843137, 0.1607843137254902, 0.0039215686, 0.0862745098, 0.1647058824, 0.16470588235294117, 0.0039215686, 0.0862745098, 0.168627451, 0.16862745098039217, 0.0039215686, 0.0901960784, 0.1725490196, 0.17254901960784313, 0.0039215686, 0.0901960784, 0.1764705882, 0.17647058823529413, 0.0039215686, 0.0941176471, 0.1803921569, 0.1803921568627451, 0.0039215686, 0.0941176471, 0.1843137255, 0.1843137254901961, 0.0039215686, 0.0980392157, 0.1882352941, 0.18823529411764706, 0.0039215686, 0.0980392157, 0.1921568627, 0.19215686274509805, 0.0039215686, 0.1019607843, 0.1960784314, 0.19607843137254902, 0.0039215686, 0.1019607843, 0.2, 0.2, 0.0039215686, 0.1058823529, 0.2039215686, 0.20392156862745098, 0.0039215686, 0.1058823529, 0.2078431373, 0.20784313725490197, 0.0039215686, 0.1098039216, 0.2117647059, 0.21176470588235294, 0.0039215686, 0.1098039216, 0.2156862745, 0.21568627450980393, 0.0039215686, 0.1137254902, 0.2196078431, 0.2196078431372549, 0.0039215686, 0.1137254902, 0.2235294118, 0.2235294117647059, 0.0039215686, 0.1176470588, 0.2274509804, 0.22745098039215686, 0.0039215686, 0.1176470588, 0.231372549, 0.23137254901960785, 0.0039215686, 0.1215686275, 0.2352941176, 0.23529411764705885, 0.0039215686, 0.1215686275, 0.2392156863, 0.23921568627450984, 0.0039215686, 0.1254901961, 0.2431372549, 0.24313725490196078, 0.0039215686, 0.1254901961, 0.2470588235, 0.24705882352941178, 0.0039215686, 0.1294117647, 0.2509803922, 0.25098039215686274, 0.0039215686, 0.1294117647, 0.2509803922, 0.2549019607843137, 0.0078431373, 0.1254901961, 0.2549019608, 0.25882352941176473, 0.0156862745, 0.1254901961, 0.2588235294, 0.2627450980392157, 0.0235294118, 0.1215686275, 0.262745098, 0.26666666666666666, 0.031372549, 0.1215686275, 0.2666666667, 0.27058823529411763, 0.0392156863, 0.1176470588, 0.2705882353, 0.27450980392156865, 0.0470588235, 0.1176470588, 0.2745098039, 0.2784313725490196, 0.0549019608, 0.1137254902, 0.2784313725, 0.2823529411764706, 0.062745098, 0.1137254902, 0.2823529412, 0.28627450980392155, 0.0705882353, 0.1098039216, 0.2862745098, 0.2901960784313726, 0.0784313725, 0.1098039216, 0.2901960784, 0.29411764705882354, 0.0862745098, 0.1058823529, 0.2941176471, 0.2980392156862745, 0.0941176471, 0.1058823529, 0.2980392157, 0.30196078431372547, 0.1019607843, 0.1019607843, 0.3019607843, 0.3058823529411765, 0.1098039216, 0.1019607843, 0.3058823529, 0.30980392156862746, 0.1176470588, 0.0980392157, 0.3098039216, 0.3137254901960784, 0.1254901961, 0.0980392157, 0.3137254902, 0.3176470588235294, 0.1333333333, 0.0941176471, 0.3176470588, 0.3215686274509804, 0.1411764706, 0.0941176471, 0.3215686275, 0.3254901960784314, 0.1490196078, 0.0901960784, 0.3254901961, 0.32941176470588235, 0.1568627451, 0.0901960784, 0.3294117647, 0.3333333333333333, 0.1647058824, 0.0862745098, 0.3333333333, 0.33725490196078434, 0.1725490196, 0.0862745098, 0.337254902, 0.3411764705882353, 0.1803921569, 0.0823529412, 0.3411764706, 0.34509803921568627, 0.1882352941, 0.0823529412, 0.3450980392, 0.34901960784313724, 0.1960784314, 0.0784313725, 0.3490196078, 0.35294117647058826, 0.2039215686, 0.0784313725, 0.3529411765, 0.3568627450980392, 0.2117647059, 0.0745098039, 0.3568627451, 0.3607843137254902, 0.2196078431, 0.0745098039, 0.3607843137, 0.36470588235294116, 0.2274509804, 0.0705882353, 0.3647058824, 0.3686274509803922, 0.2352941176, 0.0705882353, 0.368627451, 0.37254901960784315, 0.2431372549, 0.0666666667, 0.3725490196, 0.3764705882352941, 0.2509803922, 0.0666666667, 0.3764705882, 0.3803921568627451, 0.2549019608, 0.062745098, 0.3803921569, 0.3843137254901961, 0.262745098, 0.062745098, 0.3843137255, 0.38823529411764707, 0.2705882353, 0.0588235294, 0.3882352941, 0.39215686274509803, 0.2784313725, 0.0588235294, 0.3921568627, 0.396078431372549, 0.2862745098, 0.0549019608, 0.3960784314, 0.4, 0.2941176471, 0.0549019608, 0.4, 0.403921568627451, 0.3019607843, 0.0509803922, 0.4039215686, 0.40784313725490196, 0.3098039216, 0.0509803922, 0.4078431373, 0.4117647058823529, 0.3176470588, 0.0470588235, 0.4117647059, 0.41568627450980394, 0.3254901961, 0.0470588235, 0.4156862745, 0.4196078431372549, 0.3333333333, 0.0431372549, 0.4196078431, 0.4235294117647059, 0.3411764706, 0.0431372549, 0.4235294118, 0.42745098039215684, 0.3490196078, 0.0392156863, 0.4274509804, 0.43137254901960786, 0.3568627451, 0.0392156863, 0.431372549, 0.43529411764705883, 0.3647058824, 0.0352941176, 0.4352941176, 0.4392156862745098, 0.3725490196, 0.0352941176, 0.4392156863, 0.44313725490196076, 0.3803921569, 0.031372549, 0.4431372549, 0.4470588235294118, 0.3882352941, 0.031372549, 0.4470588235, 0.45098039215686275, 0.3960784314, 0.0274509804, 0.4509803922, 0.4549019607843137, 0.4039215686, 0.0274509804, 0.4549019608, 0.4588235294117647, 0.4117647059, 0.0235294118, 0.4588235294, 0.4627450980392157, 0.4196078431, 0.0235294118, 0.462745098, 0.4666666666666667, 0.4274509804, 0.0196078431, 0.4666666667, 0.4705882352941177, 0.4352941176, 0.0196078431, 0.4705882353, 0.4745098039215686, 0.4431372549, 0.0156862745, 0.4745098039, 0.4784313725490197, 0.4509803922, 0.0156862745, 0.4784313725, 0.48235294117647065, 0.4588235294, 0.0117647059, 0.4823529412, 0.48627450980392156, 0.4666666667, 0.0117647059, 0.4862745098, 0.49019607843137253, 0.4745098039, 0.0078431373, 0.4901960784, 0.49411764705882355, 0.4823529412, 0.0078431373, 0.4941176471, 0.4980392156862745, 0.4901960784, 0.0039215686, 0.4980392157, 0.5019607843137255, 0.4980392157, 0.0117647059, 0.4980392157, 0.5058823529411764, 0.5058823529, 0.0156862745, 0.4901960784, 0.5098039215686274, 0.5137254902, 0.0235294118, 0.4823529412, 0.5137254901960784, 0.5215686275, 0.0274509804, 0.4745098039, 0.5176470588235295, 0.5294117647, 0.0352941176, 0.4666666667, 0.5215686274509804, 0.537254902, 0.0392156863, 0.4588235294, 0.5254901960784314, 0.5450980392, 0.0470588235, 0.4509803922, 0.5294117647058824, 0.5529411765, 0.0509803922, 0.4431372549, 0.5333333333333333, 0.5607843137, 0.0588235294, 0.4352941176, 0.5372549019607843, 0.568627451, 0.062745098, 0.4274509804, 0.5411764705882353, 0.5764705882, 0.0705882353, 0.4196078431, 0.5450980392156862, 0.5843137255, 0.0745098039, 0.4117647059, 0.5490196078431373, 0.5921568627, 0.0823529412, 0.4039215686, 0.5529411764705883, 0.6, 0.0862745098, 0.3960784314, 0.5568627450980392, 0.6078431373, 0.0941176471, 0.3882352941, 0.5607843137254902, 0.6156862745, 0.0980392157, 0.3803921569, 0.5647058823529412, 0.6235294118, 0.1058823529, 0.3725490196, 0.5686274509803921, 0.631372549, 0.1098039216, 0.3647058824, 0.5725490196078431, 0.6392156863, 0.1176470588, 0.3568627451, 0.5764705882352941, 0.6470588235, 0.1215686275, 0.3490196078, 0.5803921568627451, 0.6549019608, 0.1294117647, 0.3411764706, 0.5843137254901961, 0.662745098, 0.1333333333, 0.3333333333, 0.5882352941176471, 0.6705882353, 0.1411764706, 0.3254901961, 0.592156862745098, 0.6784313725, 0.1450980392, 0.3176470588, 0.596078431372549, 0.6862745098, 0.1529411765, 0.3098039216, 0.6, 0.6941176471, 0.1568627451, 0.3019607843, 0.6039215686274509, 0.7019607843, 0.1647058824, 0.2941176471, 0.6078431372549019, 0.7098039216, 0.168627451, 0.2862745098, 0.611764705882353, 0.7176470588, 0.1764705882, 0.2784313725, 0.615686274509804, 0.7254901961, 0.1803921569, 0.2705882353, 0.6196078431372549, 0.7333333333, 0.1882352941, 0.262745098, 0.6235294117647059, 0.7411764706, 0.1921568627, 0.2549019608, 0.6274509803921569, 0.7490196078, 0.2, 0.2509803922, 0.6313725490196078, 0.7529411765, 0.2039215686, 0.2431372549, 0.6352941176470588, 0.7607843137, 0.2117647059, 0.2352941176, 0.6392156862745098, 0.768627451, 0.2156862745, 0.2274509804, 0.6431372549019608, 0.7764705882, 0.2235294118, 0.2196078431, 0.6470588235294118, 0.7843137255, 0.2274509804, 0.2117647059, 0.6509803921568628, 0.7921568627, 0.2352941176, 0.2039215686, 0.6549019607843137, 0.8, 0.2392156863, 0.1960784314, 0.6588235294117647, 0.8078431373, 0.2470588235, 0.1882352941, 0.6627450980392157, 0.8156862745, 0.2509803922, 0.1803921569, 0.6666666666666666, 0.8235294118, 0.2549019608, 0.1725490196, 0.6705882352941176, 0.831372549, 0.2588235294, 0.1647058824, 0.6745098039215687, 0.8392156863, 0.2666666667, 0.1568627451, 0.6784313725490196, 0.8470588235, 0.2705882353, 0.1490196078, 0.6823529411764706, 0.8549019608, 0.2784313725, 0.1411764706, 0.6862745098039216, 0.862745098, 0.2823529412, 0.1333333333, 0.6901960784313725, 0.8705882353, 0.2901960784, 0.1254901961, 0.6941176470588235, 0.8784313725, 0.2941176471, 0.1176470588, 0.6980392156862745, 0.8862745098, 0.3019607843, 0.1098039216, 0.7019607843137254, 0.8941176471, 0.3058823529, 0.1019607843, 0.7058823529411765, 0.9019607843, 0.3137254902, 0.0941176471, 0.7098039215686275, 0.9098039216, 0.3176470588, 0.0862745098, 0.7137254901960784, 0.9176470588, 0.3254901961, 0.0784313725, 0.7176470588235294, 0.9254901961, 0.3294117647, 0.0705882353, 0.7215686274509804, 0.9333333333, 0.337254902, 0.062745098, 0.7254901960784313, 0.9411764706, 0.3411764706, 0.0549019608, 0.7294117647058823, 0.9490196078, 0.3490196078, 0.0470588235, 0.7333333333333333, 0.9568627451, 0.3529411765, 0.0392156863, 0.7372549019607844, 0.9647058824, 0.3607843137, 0.031372549, 0.7411764705882353, 0.9725490196, 0.3647058824, 0.0235294118, 0.7450980392156863, 0.9803921569, 0.3725490196, 0.0156862745, 0.7490196078431373, 0.9882352941, 0.3725490196, 0.0039215686, 0.7529411764705882, 0.9960784314, 0.3843137255, 0.0156862745, 0.7568627450980392, 0.9960784314, 0.3921568627, 0.031372549, 0.7607843137254902, 0.9960784314, 0.4039215686, 0.0470588235, 0.7647058823529411, 0.9960784314, 0.4117647059, 0.062745098, 0.7686274509803922, 0.9960784314, 0.4235294118, 0.0784313725, 0.7725490196078432, 0.9960784314, 0.431372549, 0.0941176471, 0.7764705882352941, 0.9960784314, 0.4431372549, 0.1098039216, 0.7803921568627451, 0.9960784314, 0.4509803922, 0.1254901961, 0.7843137254901961, 0.9960784314, 0.462745098, 0.1411764706, 0.788235294117647, 0.9960784314, 0.4705882353, 0.1568627451, 0.792156862745098, 0.9960784314, 0.4823529412, 0.1725490196, 0.796078431372549, 0.9960784314, 0.4901960784, 0.1882352941, 0.8, 0.9960784314, 0.5019607843, 0.2039215686, 0.803921568627451, 0.9960784314, 0.5098039216, 0.2196078431, 0.807843137254902, 0.9960784314, 0.5215686275, 0.2352941176, 0.8117647058823529, 0.9960784314, 0.5294117647, 0.2509803922, 0.8156862745098039, 0.9960784314, 0.5411764706, 0.262745098, 0.8196078431372549, 0.9960784314, 0.5490196078, 0.2784313725, 0.8235294117647058, 0.9960784314, 0.5607843137, 0.2941176471, 0.8274509803921568, 0.9960784314, 0.568627451, 0.3098039216, 0.8313725490196079, 0.9960784314, 0.5803921569, 0.3254901961, 0.8352941176470589, 0.9960784314, 0.5882352941, 0.3411764706, 0.8392156862745098, 0.9960784314, 0.6, 0.3568627451, 0.8431372549019608, 0.9960784314, 0.6078431373, 0.3725490196, 0.8470588235294118, 0.9960784314, 0.6196078431, 0.3882352941, 0.8509803921568627, 0.9960784314, 0.6274509804, 0.4039215686, 0.8549019607843137, 0.9960784314, 0.6392156863, 0.4196078431, 0.8588235294117647, 0.9960784314, 0.6470588235, 0.4352941176, 0.8627450980392157, 0.9960784314, 0.6588235294, 0.4509803922, 0.8666666666666667, 0.9960784314, 0.6666666667, 0.4666666667, 0.8705882352941177, 0.9960784314, 0.6784313725, 0.4823529412, 0.8745098039215686, 0.9960784314, 0.6862745098, 0.4980392157, 0.8784313725490196, 0.9960784314, 0.6980392157, 0.5137254902, 0.8823529411764706, 0.9960784314, 0.7058823529, 0.5294117647, 0.8862745098039215, 0.9960784314, 0.7176470588, 0.5450980392, 0.8901960784313725, 0.9960784314, 0.7254901961, 0.5607843137, 0.8941176470588236, 0.9960784314, 0.737254902, 0.5764705882, 0.8980392156862745, 0.9960784314, 0.7450980392, 0.5921568627, 0.9019607843137255, 0.9960784314, 0.7529411765, 0.6078431373, 0.9058823529411765, 0.9960784314, 0.7607843137, 0.6235294118, 0.9098039215686274, 0.9960784314, 0.7725490196, 0.6392156863, 0.9137254901960784, 0.9960784314, 0.7803921569, 0.6549019608, 0.9176470588235294, 0.9960784314, 0.7921568627, 0.6705882353, 0.9215686274509803, 0.9960784314, 0.8, 0.6862745098, 0.9254901960784314, 0.9960784314, 0.8117647059, 0.7019607843, 0.9294117647058824, 0.9960784314, 0.8196078431, 0.7176470588, 0.9333333333333333, 0.9960784314, 0.831372549, 0.7333333333, 0.9372549019607843, 0.9960784314, 0.8392156863, 0.7490196078, 0.9411764705882354, 0.9960784314, 0.8509803922, 0.7607843137, 0.9450980392156864, 0.9960784314, 0.8588235294, 0.7764705882, 0.9490196078431372, 0.9960784314, 0.8705882353, 0.7921568627, 0.9529411764705882, 0.9960784314, 0.8784313725, 0.8078431373, 0.9568627450980394, 0.9960784314, 0.8901960784, 0.8235294118, 0.9607843137254903, 0.9960784314, 0.8980392157, 0.8392156863, 0.9647058823529413, 0.9960784314, 0.9098039216, 0.8549019608, 0.9686274509803922, 0.9960784314, 0.9176470588, 0.8705882353, 0.9725490196078431, 0.9960784314, 0.9294117647, 0.8862745098, 0.9764705882352941, 0.9960784314, 0.937254902, 0.9019607843, 0.9803921568627451, 0.9960784314, 0.9490196078, 0.9176470588, 0.984313725490196, 0.9960784314, 0.9568627451, 0.9333333333, 0.9882352941176471, 0.9960784314, 0.968627451, 0.9490196078, 0.9921568627450981, 0.9960784314, 0.9764705882, 0.9647058824, 0.996078431372549, 0.9960784314, 0.9882352941, 0.9803921569, 1.0, 0.9960784314, 0.9882352941, 0.9803921569],
  description: 'GE 256'
}, {
  ColorSpace: 'RGB',
  Name: 'ge',
  name: 'ge',
  RGBPoints: [0.0, 0.0078431373, 0.0078431373, 0.0078431373, 0.00392156862745098, 0.0078431373, 0.0078431373, 0.0078431373, 0.00784313725490196, 0.0078431373, 0.0078431373, 0.0078431373, 0.011764705882352941, 0.0078431373, 0.0078431373, 0.0078431373, 0.01568627450980392, 0.0078431373, 0.0078431373, 0.0078431373, 0.0196078431372549, 0.0078431373, 0.0078431373, 0.0078431373, 0.023529411764705882, 0.0078431373, 0.0078431373, 0.0078431373, 0.027450980392156862, 0.0078431373, 0.0078431373, 0.0078431373, 0.03137254901960784, 0.0078431373, 0.0078431373, 0.0078431373, 0.03529411764705882, 0.0078431373, 0.0078431373, 0.0078431373, 0.0392156862745098, 0.0078431373, 0.0078431373, 0.0078431373, 0.043137254901960784, 0.0078431373, 0.0078431373, 0.0078431373, 0.047058823529411764, 0.0078431373, 0.0078431373, 0.0078431373, 0.050980392156862744, 0.0078431373, 0.0078431373, 0.0078431373, 0.054901960784313725, 0.0078431373, 0.0078431373, 0.0078431373, 0.05882352941176471, 0.0117647059, 0.0078431373, 0.0078431373, 0.06274509803921569, 0.0078431373, 0.0156862745, 0.0156862745, 0.06666666666666667, 0.0078431373, 0.0235294118, 0.0235294118, 0.07058823529411765, 0.0078431373, 0.031372549, 0.031372549, 0.07450980392156863, 0.0078431373, 0.0392156863, 0.0392156863, 0.0784313725490196, 0.0078431373, 0.0470588235, 0.0470588235, 0.08235294117647059, 0.0078431373, 0.0549019608, 0.0549019608, 0.08627450980392157, 0.0078431373, 0.062745098, 0.062745098, 0.09019607843137255, 0.0078431373, 0.0705882353, 0.0705882353, 0.09411764705882353, 0.0078431373, 0.0784313725, 0.0784313725, 0.09803921568627451, 0.0078431373, 0.0901960784, 0.0862745098, 0.10196078431372549, 0.0078431373, 0.0980392157, 0.0941176471, 0.10588235294117647, 0.0078431373, 0.1058823529, 0.1019607843, 0.10980392156862745, 0.0078431373, 0.1137254902, 0.1098039216, 0.11372549019607843, 0.0078431373, 0.1215686275, 0.1176470588, 0.11764705882352942, 0.0078431373, 0.1294117647, 0.1254901961, 0.12156862745098039, 0.0078431373, 0.137254902, 0.1333333333, 0.12549019607843137, 0.0078431373, 0.1450980392, 0.1411764706, 0.12941176470588237, 0.0078431373, 0.1529411765, 0.1490196078, 0.13333333333333333, 0.0078431373, 0.1647058824, 0.1568627451, 0.13725490196078433, 0.0078431373, 0.1725490196, 0.1647058824, 0.1411764705882353, 0.0078431373, 0.1803921569, 0.1725490196, 0.1450980392156863, 0.0078431373, 0.1882352941, 0.1803921569, 0.14901960784313725, 0.0078431373, 0.1960784314, 0.1882352941, 0.15294117647058825, 0.0078431373, 0.2039215686, 0.1960784314, 0.1568627450980392, 0.0078431373, 0.2117647059, 0.2039215686, 0.1607843137254902, 0.0078431373, 0.2196078431, 0.2117647059, 0.16470588235294117, 0.0078431373, 0.2274509804, 0.2196078431, 0.16862745098039217, 0.0078431373, 0.2352941176, 0.2274509804, 0.17254901960784313, 0.0078431373, 0.2470588235, 0.2352941176, 0.17647058823529413, 0.0078431373, 0.2509803922, 0.2431372549, 0.1803921568627451, 0.0078431373, 0.2549019608, 0.2509803922, 0.1843137254901961, 0.0078431373, 0.262745098, 0.2509803922, 0.18823529411764706, 0.0078431373, 0.2705882353, 0.2588235294, 0.19215686274509805, 0.0078431373, 0.2784313725, 0.2666666667, 0.19607843137254902, 0.0078431373, 0.2862745098, 0.2745098039, 0.2, 0.0078431373, 0.2941176471, 0.2823529412, 0.20392156862745098, 0.0078431373, 0.3019607843, 0.2901960784, 0.20784313725490197, 0.0078431373, 0.3137254902, 0.2980392157, 0.21176470588235294, 0.0078431373, 0.3215686275, 0.3058823529, 0.21568627450980393, 0.0078431373, 0.3294117647, 0.3137254902, 0.2196078431372549, 0.0078431373, 0.337254902, 0.3215686275, 0.2235294117647059, 0.0078431373, 0.3450980392, 0.3294117647, 0.22745098039215686, 0.0078431373, 0.3529411765, 0.337254902, 0.23137254901960785, 0.0078431373, 0.3607843137, 0.3450980392, 0.23529411764705885, 0.0078431373, 0.368627451, 0.3529411765, 0.23921568627450984, 0.0078431373, 0.3764705882, 0.3607843137, 0.24313725490196078, 0.0078431373, 0.3843137255, 0.368627451, 0.24705882352941178, 0.0078431373, 0.3960784314, 0.3764705882, 0.25098039215686274, 0.0078431373, 0.4039215686, 0.3843137255, 0.2549019607843137, 0.0078431373, 0.4117647059, 0.3921568627, 0.25882352941176473, 0.0078431373, 0.4196078431, 0.4, 0.2627450980392157, 0.0078431373, 0.4274509804, 0.4078431373, 0.26666666666666666, 0.0078431373, 0.4352941176, 0.4156862745, 0.27058823529411763, 0.0078431373, 0.4431372549, 0.4235294118, 0.27450980392156865, 0.0078431373, 0.4509803922, 0.431372549, 0.2784313725490196, 0.0078431373, 0.4588235294, 0.4392156863, 0.2823529411764706, 0.0078431373, 0.4705882353, 0.4470588235, 0.28627450980392155, 0.0078431373, 0.4784313725, 0.4549019608, 0.2901960784313726, 0.0078431373, 0.4862745098, 0.462745098, 0.29411764705882354, 0.0078431373, 0.4941176471, 0.4705882353, 0.2980392156862745, 0.0078431373, 0.5019607843, 0.4784313725, 0.30196078431372547, 0.0117647059, 0.5098039216, 0.4862745098, 0.3058823529411765, 0.0196078431, 0.5019607843, 0.4941176471, 0.30980392156862746, 0.0274509804, 0.4941176471, 0.5058823529, 0.3137254901960784, 0.0352941176, 0.4862745098, 0.5137254902, 0.3176470588235294, 0.0431372549, 0.4784313725, 0.5215686275, 0.3215686274509804, 0.0509803922, 0.4705882353, 0.5294117647, 0.3254901960784314, 0.0588235294, 0.462745098, 0.537254902, 0.32941176470588235, 0.0666666667, 0.4549019608, 0.5450980392, 0.3333333333333333, 0.0745098039, 0.4470588235, 0.5529411765, 0.33725490196078434, 0.0823529412, 0.4392156863, 0.5607843137, 0.3411764705882353, 0.0901960784, 0.431372549, 0.568627451, 0.34509803921568627, 0.0980392157, 0.4235294118, 0.5764705882, 0.34901960784313724, 0.1058823529, 0.4156862745, 0.5843137255, 0.35294117647058826, 0.1137254902, 0.4078431373, 0.5921568627, 0.3568627450980392, 0.1215686275, 0.4, 0.6, 0.3607843137254902, 0.1294117647, 0.3921568627, 0.6078431373, 0.36470588235294116, 0.137254902, 0.3843137255, 0.6156862745, 0.3686274509803922, 0.1450980392, 0.3764705882, 0.6235294118, 0.37254901960784315, 0.1529411765, 0.368627451, 0.631372549, 0.3764705882352941, 0.1607843137, 0.3607843137, 0.6392156863, 0.3803921568627451, 0.168627451, 0.3529411765, 0.6470588235, 0.3843137254901961, 0.1764705882, 0.3450980392, 0.6549019608, 0.38823529411764707, 0.1843137255, 0.337254902, 0.662745098, 0.39215686274509803, 0.1921568627, 0.3294117647, 0.6705882353, 0.396078431372549, 0.2, 0.3215686275, 0.6784313725, 0.4, 0.2078431373, 0.3137254902, 0.6862745098, 0.403921568627451, 0.2156862745, 0.3058823529, 0.6941176471, 0.40784313725490196, 0.2235294118, 0.2980392157, 0.7019607843, 0.4117647058823529, 0.231372549, 0.2901960784, 0.7098039216, 0.41568627450980394, 0.2392156863, 0.2823529412, 0.7176470588, 0.4196078431372549, 0.2470588235, 0.2745098039, 0.7254901961, 0.4235294117647059, 0.2509803922, 0.2666666667, 0.7333333333, 0.42745098039215684, 0.2509803922, 0.2588235294, 0.7411764706, 0.43137254901960786, 0.2588235294, 0.2509803922, 0.7490196078, 0.43529411764705883, 0.2666666667, 0.2509803922, 0.7490196078, 0.4392156862745098, 0.2745098039, 0.2431372549, 0.7568627451, 0.44313725490196076, 0.2823529412, 0.2352941176, 0.7647058824, 0.4470588235294118, 0.2901960784, 0.2274509804, 0.7725490196, 0.45098039215686275, 0.2980392157, 0.2196078431, 0.7803921569, 0.4549019607843137, 0.3058823529, 0.2117647059, 0.7882352941, 0.4588235294117647, 0.3137254902, 0.2039215686, 0.7960784314, 0.4627450980392157, 0.3215686275, 0.1960784314, 0.8039215686, 0.4666666666666667, 0.3294117647, 0.1882352941, 0.8117647059, 0.4705882352941177, 0.337254902, 0.1803921569, 0.8196078431, 0.4745098039215686, 0.3450980392, 0.1725490196, 0.8274509804, 0.4784313725490197, 0.3529411765, 0.1647058824, 0.8352941176, 0.48235294117647065, 0.3607843137, 0.1568627451, 0.8431372549, 0.48627450980392156, 0.368627451, 0.1490196078, 0.8509803922, 0.49019607843137253, 0.3764705882, 0.1411764706, 0.8588235294, 0.49411764705882355, 0.3843137255, 0.1333333333, 0.8666666667, 0.4980392156862745, 0.3921568627, 0.1254901961, 0.8745098039, 0.5019607843137255, 0.4, 0.1176470588, 0.8823529412, 0.5058823529411764, 0.4078431373, 0.1098039216, 0.8901960784, 0.5098039215686274, 0.4156862745, 0.1019607843, 0.8980392157, 0.5137254901960784, 0.4235294118, 0.0941176471, 0.9058823529, 0.5176470588235295, 0.431372549, 0.0862745098, 0.9137254902, 0.5215686274509804, 0.4392156863, 0.0784313725, 0.9215686275, 0.5254901960784314, 0.4470588235, 0.0705882353, 0.9294117647, 0.5294117647058824, 0.4549019608, 0.062745098, 0.937254902, 0.5333333333333333, 0.462745098, 0.0549019608, 0.9450980392, 0.5372549019607843, 0.4705882353, 0.0470588235, 0.9529411765, 0.5411764705882353, 0.4784313725, 0.0392156863, 0.9607843137, 0.5450980392156862, 0.4862745098, 0.031372549, 0.968627451, 0.5490196078431373, 0.4941176471, 0.0235294118, 0.9764705882, 0.5529411764705883, 0.4980392157, 0.0156862745, 0.9843137255, 0.5568627450980392, 0.5058823529, 0.0078431373, 0.9921568627, 0.5607843137254902, 0.5137254902, 0.0156862745, 0.9803921569, 0.5647058823529412, 0.5215686275, 0.0235294118, 0.9647058824, 0.5686274509803921, 0.5294117647, 0.0352941176, 0.9490196078, 0.5725490196078431, 0.537254902, 0.0431372549, 0.9333333333, 0.5764705882352941, 0.5450980392, 0.0509803922, 0.9176470588, 0.5803921568627451, 0.5529411765, 0.062745098, 0.9019607843, 0.5843137254901961, 0.5607843137, 0.0705882353, 0.8862745098, 0.5882352941176471, 0.568627451, 0.0784313725, 0.8705882353, 0.592156862745098, 0.5764705882, 0.0901960784, 0.8549019608, 0.596078431372549, 0.5843137255, 0.0980392157, 0.8392156863, 0.6, 0.5921568627, 0.1098039216, 0.8235294118, 0.6039215686274509, 0.6, 0.1176470588, 0.8078431373, 0.6078431372549019, 0.6078431373, 0.1254901961, 0.7921568627, 0.611764705882353, 0.6156862745, 0.137254902, 0.7764705882, 0.615686274509804, 0.6235294118, 0.1450980392, 0.7607843137, 0.6196078431372549, 0.631372549, 0.1529411765, 0.7490196078, 0.6235294117647059, 0.6392156863, 0.1647058824, 0.737254902, 0.6274509803921569, 0.6470588235, 0.1725490196, 0.7215686275, 0.6313725490196078, 0.6549019608, 0.1843137255, 0.7058823529, 0.6352941176470588, 0.662745098, 0.1921568627, 0.6901960784, 0.6392156862745098, 0.6705882353, 0.2, 0.6745098039, 0.6431372549019608, 0.6784313725, 0.2117647059, 0.6588235294, 0.6470588235294118, 0.6862745098, 0.2196078431, 0.6431372549, 0.6509803921568628, 0.6941176471, 0.2274509804, 0.6274509804, 0.6549019607843137, 0.7019607843, 0.2392156863, 0.6117647059, 0.6588235294117647, 0.7098039216, 0.2470588235, 0.5960784314, 0.6627450980392157, 0.7176470588, 0.2509803922, 0.5803921569, 0.6666666666666666, 0.7254901961, 0.2588235294, 0.5647058824, 0.6705882352941176, 0.7333333333, 0.2666666667, 0.5490196078, 0.6745098039215687, 0.7411764706, 0.2784313725, 0.5333333333, 0.6784313725490196, 0.7490196078, 0.2862745098, 0.5176470588, 0.6823529411764706, 0.7490196078, 0.2941176471, 0.5019607843, 0.6862745098039216, 0.7529411765, 0.3058823529, 0.4862745098, 0.6901960784313725, 0.7607843137, 0.3137254902, 0.4705882353, 0.6941176470588235, 0.768627451, 0.3215686275, 0.4549019608, 0.6980392156862745, 0.7764705882, 0.3333333333, 0.4392156863, 0.7019607843137254, 0.7843137255, 0.3411764706, 0.4235294118, 0.7058823529411765, 0.7921568627, 0.3529411765, 0.4078431373, 0.7098039215686275, 0.8, 0.3607843137, 0.3921568627, 0.7137254901960784, 0.8078431373, 0.368627451, 0.3764705882, 0.7176470588235294, 0.8156862745, 0.3803921569, 0.3607843137, 0.7215686274509804, 0.8235294118, 0.3882352941, 0.3450980392, 0.7254901960784313, 0.831372549, 0.3960784314, 0.3294117647, 0.7294117647058823, 0.8392156863, 0.4078431373, 0.3137254902, 0.7333333333333333, 0.8470588235, 0.4156862745, 0.2980392157, 0.7372549019607844, 0.8549019608, 0.4274509804, 0.2823529412, 0.7411764705882353, 0.862745098, 0.4352941176, 0.2666666667, 0.7450980392156863, 0.8705882353, 0.4431372549, 0.2509803922, 0.7490196078431373, 0.8784313725, 0.4549019608, 0.2431372549, 0.7529411764705882, 0.8862745098, 0.462745098, 0.2274509804, 0.7568627450980392, 0.8941176471, 0.4705882353, 0.2117647059, 0.7607843137254902, 0.9019607843, 0.4823529412, 0.1960784314, 0.7647058823529411, 0.9098039216, 0.4901960784, 0.1803921569, 0.7686274509803922, 0.9176470588, 0.4980392157, 0.1647058824, 0.7725490196078432, 0.9254901961, 0.5098039216, 0.1490196078, 0.7764705882352941, 0.9333333333, 0.5176470588, 0.1333333333, 0.7803921568627451, 0.9411764706, 0.5294117647, 0.1176470588, 0.7843137254901961, 0.9490196078, 0.537254902, 0.1019607843, 0.788235294117647, 0.9568627451, 0.5450980392, 0.0862745098, 0.792156862745098, 0.9647058824, 0.5568627451, 0.0705882353, 0.796078431372549, 0.9725490196, 0.5647058824, 0.0549019608, 0.8, 0.9803921569, 0.5725490196, 0.0392156863, 0.803921568627451, 0.9882352941, 0.5843137255, 0.0235294118, 0.807843137254902, 0.9921568627, 0.5921568627, 0.0078431373, 0.8117647058823529, 0.9921568627, 0.6039215686, 0.0274509804, 0.8156862745098039, 0.9921568627, 0.6117647059, 0.0509803922, 0.8196078431372549, 0.9921568627, 0.6196078431, 0.0745098039, 0.8235294117647058, 0.9921568627, 0.631372549, 0.0980392157, 0.8274509803921568, 0.9921568627, 0.6392156863, 0.1215686275, 0.8313725490196079, 0.9921568627, 0.6470588235, 0.1411764706, 0.8352941176470589, 0.9921568627, 0.6588235294, 0.1647058824, 0.8392156862745098, 0.9921568627, 0.6666666667, 0.1882352941, 0.8431372549019608, 0.9921568627, 0.6784313725, 0.2117647059, 0.8470588235294118, 0.9921568627, 0.6862745098, 0.2352941176, 0.8509803921568627, 0.9921568627, 0.6941176471, 0.2509803922, 0.8549019607843137, 0.9921568627, 0.7058823529, 0.2705882353, 0.8588235294117647, 0.9921568627, 0.7137254902, 0.2941176471, 0.8627450980392157, 0.9921568627, 0.7215686275, 0.3176470588, 0.8666666666666667, 0.9921568627, 0.7333333333, 0.3411764706, 0.8705882352941177, 0.9921568627, 0.7411764706, 0.3647058824, 0.8745098039215686, 0.9921568627, 0.7490196078, 0.3843137255, 0.8784313725490196, 0.9921568627, 0.7529411765, 0.4078431373, 0.8823529411764706, 0.9921568627, 0.7607843137, 0.431372549, 0.8862745098039215, 0.9921568627, 0.7725490196, 0.4549019608, 0.8901960784313725, 0.9921568627, 0.7803921569, 0.4784313725, 0.8941176470588236, 0.9921568627, 0.7882352941, 0.4980392157, 0.8980392156862745, 0.9921568627, 0.8, 0.5215686275, 0.9019607843137255, 0.9921568627, 0.8078431373, 0.5450980392, 0.9058823529411765, 0.9921568627, 0.8156862745, 0.568627451, 0.9098039215686274, 0.9921568627, 0.8274509804, 0.5921568627, 0.9137254901960784, 0.9921568627, 0.8352941176, 0.6156862745, 0.9176470588235294, 0.9921568627, 0.8470588235, 0.6352941176, 0.9215686274509803, 0.9921568627, 0.8549019608, 0.6588235294, 0.9254901960784314, 0.9921568627, 0.862745098, 0.6823529412, 0.9294117647058824, 0.9921568627, 0.8745098039, 0.7058823529, 0.9333333333333333, 0.9921568627, 0.8823529412, 0.7294117647, 0.9372549019607843, 0.9921568627, 0.8901960784, 0.7490196078, 0.9411764705882354, 0.9921568627, 0.9019607843, 0.7647058824, 0.9450980392156864, 0.9921568627, 0.9098039216, 0.7882352941, 0.9490196078431372, 0.9921568627, 0.9215686275, 0.8117647059, 0.9529411764705882, 0.9921568627, 0.9294117647, 0.8352941176, 0.9568627450980394, 0.9921568627, 0.937254902, 0.8588235294, 0.9607843137254903, 0.9921568627, 0.9490196078, 0.8784313725, 0.9647058823529413, 0.9921568627, 0.9568627451, 0.9019607843, 0.9686274509803922, 0.9921568627, 0.9647058824, 0.9254901961, 0.9725490196078431, 0.9921568627, 0.9764705882, 0.9490196078, 0.9764705882352941, 0.9921568627, 0.9843137255, 0.9725490196, 0.9803921568627451, 0.9921568627, 0.9921568627, 0.9921568627, 0.984313725490196, 0.9921568627, 0.9921568627, 0.9921568627, 0.9882352941176471, 0.9921568627, 0.9921568627, 0.9921568627, 0.9921568627450981, 0.9921568627, 0.9921568627, 0.9921568627, 0.996078431372549, 0.9921568627, 0.9921568627, 0.9921568627, 1.0, 0.9921568627, 0.9921568627, 0.9921568627],
  description: 'GE'
}, {
  ColorSpace: 'RGB',
  Name: 'siemens',
  name: 'siemens',
  RGBPoints: [0.0, 0.0078431373, 0.0039215686, 0.1254901961, 0.00392156862745098, 0.0078431373, 0.0039215686, 0.1254901961, 0.00784313725490196, 0.0078431373, 0.0039215686, 0.1882352941, 0.011764705882352941, 0.0117647059, 0.0039215686, 0.2509803922, 0.01568627450980392, 0.0117647059, 0.0039215686, 0.3098039216, 0.0196078431372549, 0.0156862745, 0.0039215686, 0.3725490196, 0.023529411764705882, 0.0156862745, 0.0039215686, 0.3725490196, 0.027450980392156862, 0.0156862745, 0.0039215686, 0.3725490196, 0.03137254901960784, 0.0156862745, 0.0039215686, 0.3725490196, 0.03529411764705882, 0.0156862745, 0.0039215686, 0.3725490196, 0.0392156862745098, 0.0156862745, 0.0039215686, 0.3725490196, 0.043137254901960784, 0.0156862745, 0.0039215686, 0.3725490196, 0.047058823529411764, 0.0156862745, 0.0039215686, 0.3725490196, 0.050980392156862744, 0.0156862745, 0.0039215686, 0.3725490196, 0.054901960784313725, 0.0156862745, 0.0039215686, 0.3725490196, 0.05882352941176471, 0.0156862745, 0.0039215686, 0.3725490196, 0.06274509803921569, 0.0156862745, 0.0039215686, 0.3882352941, 0.06666666666666667, 0.0156862745, 0.0039215686, 0.4078431373, 0.07058823529411765, 0.0156862745, 0.0039215686, 0.4235294118, 0.07450980392156863, 0.0156862745, 0.0039215686, 0.4431372549, 0.0784313725490196, 0.0156862745, 0.0039215686, 0.462745098, 0.08235294117647059, 0.0156862745, 0.0039215686, 0.4784313725, 0.08627450980392157, 0.0156862745, 0.0039215686, 0.4980392157, 0.09019607843137255, 0.0196078431, 0.0039215686, 0.5137254902, 0.09411764705882353, 0.0196078431, 0.0039215686, 0.5333333333, 0.09803921568627451, 0.0196078431, 0.0039215686, 0.5529411765, 0.10196078431372549, 0.0196078431, 0.0039215686, 0.568627451, 0.10588235294117647, 0.0196078431, 0.0039215686, 0.5882352941, 0.10980392156862745, 0.0196078431, 0.0039215686, 0.6039215686, 0.11372549019607843, 0.0196078431, 0.0039215686, 0.6235294118, 0.11764705882352942, 0.0196078431, 0.0039215686, 0.6431372549, 0.12156862745098039, 0.0235294118, 0.0039215686, 0.6588235294, 0.12549019607843137, 0.0235294118, 0.0039215686, 0.6784313725, 0.12941176470588237, 0.0235294118, 0.0039215686, 0.6980392157, 0.13333333333333333, 0.0235294118, 0.0039215686, 0.7137254902, 0.13725490196078433, 0.0235294118, 0.0039215686, 0.7333333333, 0.1411764705882353, 0.0235294118, 0.0039215686, 0.7490196078, 0.1450980392156863, 0.0235294118, 0.0039215686, 0.7647058824, 0.14901960784313725, 0.0235294118, 0.0039215686, 0.7843137255, 0.15294117647058825, 0.0274509804, 0.0039215686, 0.8, 0.1568627450980392, 0.0274509804, 0.0039215686, 0.8196078431, 0.1607843137254902, 0.0274509804, 0.0039215686, 0.8352941176, 0.16470588235294117, 0.0274509804, 0.0039215686, 0.8549019608, 0.16862745098039217, 0.0274509804, 0.0039215686, 0.8745098039, 0.17254901960784313, 0.0274509804, 0.0039215686, 0.8901960784, 0.17647058823529413, 0.0274509804, 0.0039215686, 0.9098039216, 0.1803921568627451, 0.031372549, 0.0039215686, 0.9294117647, 0.1843137254901961, 0.031372549, 0.0039215686, 0.9254901961, 0.18823529411764706, 0.0509803922, 0.0039215686, 0.9098039216, 0.19215686274509805, 0.0705882353, 0.0039215686, 0.8901960784, 0.19607843137254902, 0.0901960784, 0.0039215686, 0.8705882353, 0.2, 0.1137254902, 0.0039215686, 0.8509803922, 0.20392156862745098, 0.1333333333, 0.0039215686, 0.831372549, 0.20784313725490197, 0.1529411765, 0.0039215686, 0.8117647059, 0.21176470588235294, 0.1725490196, 0.0039215686, 0.7921568627, 0.21568627450980393, 0.1960784314, 0.0039215686, 0.7725490196, 0.2196078431372549, 0.2156862745, 0.0039215686, 0.7529411765, 0.2235294117647059, 0.2352941176, 0.0039215686, 0.737254902, 0.22745098039215686, 0.2509803922, 0.0039215686, 0.7176470588, 0.23137254901960785, 0.2745098039, 0.0039215686, 0.6980392157, 0.23529411764705885, 0.2941176471, 0.0039215686, 0.6784313725, 0.23921568627450984, 0.3137254902, 0.0039215686, 0.6588235294, 0.24313725490196078, 0.3333333333, 0.0039215686, 0.6392156863, 0.24705882352941178, 0.3568627451, 0.0039215686, 0.6196078431, 0.25098039215686274, 0.3764705882, 0.0039215686, 0.6, 0.2549019607843137, 0.3960784314, 0.0039215686, 0.5803921569, 0.25882352941176473, 0.4156862745, 0.0039215686, 0.5607843137, 0.2627450980392157, 0.4392156863, 0.0039215686, 0.5411764706, 0.26666666666666666, 0.4588235294, 0.0039215686, 0.5215686275, 0.27058823529411763, 0.4784313725, 0.0039215686, 0.5019607843, 0.27450980392156865, 0.4980392157, 0.0039215686, 0.4823529412, 0.2784313725490196, 0.5215686275, 0.0039215686, 0.4666666667, 0.2823529411764706, 0.5411764706, 0.0039215686, 0.4470588235, 0.28627450980392155, 0.5607843137, 0.0039215686, 0.4274509804, 0.2901960784313726, 0.5803921569, 0.0039215686, 0.4078431373, 0.29411764705882354, 0.6039215686, 0.0039215686, 0.3882352941, 0.2980392156862745, 0.6235294118, 0.0039215686, 0.368627451, 0.30196078431372547, 0.6431372549, 0.0039215686, 0.3490196078, 0.3058823529411765, 0.662745098, 0.0039215686, 0.3294117647, 0.30980392156862746, 0.6862745098, 0.0039215686, 0.3098039216, 0.3137254901960784, 0.7058823529, 0.0039215686, 0.2901960784, 0.3176470588235294, 0.7254901961, 0.0039215686, 0.2705882353, 0.3215686274509804, 0.7450980392, 0.0039215686, 0.2509803922, 0.3254901960784314, 0.7647058824, 0.0039215686, 0.2352941176, 0.32941176470588235, 0.7843137255, 0.0039215686, 0.2156862745, 0.3333333333333333, 0.8039215686, 0.0039215686, 0.1960784314, 0.33725490196078434, 0.8235294118, 0.0039215686, 0.1764705882, 0.3411764705882353, 0.8470588235, 0.0039215686, 0.1568627451, 0.34509803921568627, 0.8666666667, 0.0039215686, 0.137254902, 0.34901960784313724, 0.8862745098, 0.0039215686, 0.1176470588, 0.35294117647058826, 0.9058823529, 0.0039215686, 0.0980392157, 0.3568627450980392, 0.9294117647, 0.0039215686, 0.0784313725, 0.3607843137254902, 0.9490196078, 0.0039215686, 0.0588235294, 0.36470588235294116, 0.968627451, 0.0039215686, 0.0392156863, 0.3686274509803922, 0.9921568627, 0.0039215686, 0.0235294118, 0.37254901960784315, 0.9529411765, 0.0039215686, 0.0588235294, 0.3764705882352941, 0.9529411765, 0.0078431373, 0.0549019608, 0.3803921568627451, 0.9529411765, 0.0156862745, 0.0549019608, 0.3843137254901961, 0.9529411765, 0.0235294118, 0.0549019608, 0.38823529411764707, 0.9529411765, 0.031372549, 0.0549019608, 0.39215686274509803, 0.9529411765, 0.0352941176, 0.0549019608, 0.396078431372549, 0.9529411765, 0.0431372549, 0.0549019608, 0.4, 0.9529411765, 0.0509803922, 0.0549019608, 0.403921568627451, 0.9529411765, 0.0588235294, 0.0549019608, 0.40784313725490196, 0.9529411765, 0.062745098, 0.0549019608, 0.4117647058823529, 0.9529411765, 0.0705882353, 0.0549019608, 0.41568627450980394, 0.9529411765, 0.0784313725, 0.0509803922, 0.4196078431372549, 0.9529411765, 0.0862745098, 0.0509803922, 0.4235294117647059, 0.9568627451, 0.0941176471, 0.0509803922, 0.42745098039215684, 0.9568627451, 0.0980392157, 0.0509803922, 0.43137254901960786, 0.9568627451, 0.1058823529, 0.0509803922, 0.43529411764705883, 0.9568627451, 0.1137254902, 0.0509803922, 0.4392156862745098, 0.9568627451, 0.1215686275, 0.0509803922, 0.44313725490196076, 0.9568627451, 0.1254901961, 0.0509803922, 0.4470588235294118, 0.9568627451, 0.1333333333, 0.0509803922, 0.45098039215686275, 0.9568627451, 0.1411764706, 0.0509803922, 0.4549019607843137, 0.9568627451, 0.1490196078, 0.0470588235, 0.4588235294117647, 0.9568627451, 0.1568627451, 0.0470588235, 0.4627450980392157, 0.9568627451, 0.1607843137, 0.0470588235, 0.4666666666666667, 0.9568627451, 0.168627451, 0.0470588235, 0.4705882352941177, 0.9607843137, 0.1764705882, 0.0470588235, 0.4745098039215686, 0.9607843137, 0.1843137255, 0.0470588235, 0.4784313725490197, 0.9607843137, 0.1882352941, 0.0470588235, 0.48235294117647065, 0.9607843137, 0.1960784314, 0.0470588235, 0.48627450980392156, 0.9607843137, 0.2039215686, 0.0470588235, 0.49019607843137253, 0.9607843137, 0.2117647059, 0.0470588235, 0.49411764705882355, 0.9607843137, 0.2196078431, 0.0431372549, 0.4980392156862745, 0.9607843137, 0.2235294118, 0.0431372549, 0.5019607843137255, 0.9607843137, 0.231372549, 0.0431372549, 0.5058823529411764, 0.9607843137, 0.2392156863, 0.0431372549, 0.5098039215686274, 0.9607843137, 0.2470588235, 0.0431372549, 0.5137254901960784, 0.9607843137, 0.2509803922, 0.0431372549, 0.5176470588235295, 0.9647058824, 0.2549019608, 0.0431372549, 0.5215686274509804, 0.9647058824, 0.262745098, 0.0431372549, 0.5254901960784314, 0.9647058824, 0.2705882353, 0.0431372549, 0.5294117647058824, 0.9647058824, 0.2745098039, 0.0431372549, 0.5333333333333333, 0.9647058824, 0.2823529412, 0.0392156863, 0.5372549019607843, 0.9647058824, 0.2901960784, 0.0392156863, 0.5411764705882353, 0.9647058824, 0.2980392157, 0.0392156863, 0.5450980392156862, 0.9647058824, 0.3058823529, 0.0392156863, 0.5490196078431373, 0.9647058824, 0.3098039216, 0.0392156863, 0.5529411764705883, 0.9647058824, 0.3176470588, 0.0392156863, 0.5568627450980392, 0.9647058824, 0.3254901961, 0.0392156863, 0.5607843137254902, 0.9647058824, 0.3333333333, 0.0392156863, 0.5647058823529412, 0.9647058824, 0.337254902, 0.0392156863, 0.5686274509803921, 0.968627451, 0.3450980392, 0.0392156863, 0.5725490196078431, 0.968627451, 0.3529411765, 0.0352941176, 0.5764705882352941, 0.968627451, 0.3607843137, 0.0352941176, 0.5803921568627451, 0.968627451, 0.368627451, 0.0352941176, 0.5843137254901961, 0.968627451, 0.3725490196, 0.0352941176, 0.5882352941176471, 0.968627451, 0.3803921569, 0.0352941176, 0.592156862745098, 0.968627451, 0.3882352941, 0.0352941176, 0.596078431372549, 0.968627451, 0.3960784314, 0.0352941176, 0.6, 0.968627451, 0.4, 0.0352941176, 0.6039215686274509, 0.968627451, 0.4078431373, 0.0352941176, 0.6078431372549019, 0.968627451, 0.4156862745, 0.0352941176, 0.611764705882353, 0.968627451, 0.4235294118, 0.031372549, 0.615686274509804, 0.9725490196, 0.431372549, 0.031372549, 0.6196078431372549, 0.9725490196, 0.4352941176, 0.031372549, 0.6235294117647059, 0.9725490196, 0.4431372549, 0.031372549, 0.6274509803921569, 0.9725490196, 0.4509803922, 0.031372549, 0.6313725490196078, 0.9725490196, 0.4588235294, 0.031372549, 0.6352941176470588, 0.9725490196, 0.462745098, 0.031372549, 0.6392156862745098, 0.9725490196, 0.4705882353, 0.031372549, 0.6431372549019608, 0.9725490196, 0.4784313725, 0.031372549, 0.6470588235294118, 0.9725490196, 0.4862745098, 0.031372549, 0.6509803921568628, 0.9725490196, 0.4941176471, 0.0274509804, 0.6549019607843137, 0.9725490196, 0.4980392157, 0.0274509804, 0.6588235294117647, 0.9725490196, 0.5058823529, 0.0274509804, 0.6627450980392157, 0.9764705882, 0.5137254902, 0.0274509804, 0.6666666666666666, 0.9764705882, 0.5215686275, 0.0274509804, 0.6705882352941176, 0.9764705882, 0.5254901961, 0.0274509804, 0.6745098039215687, 0.9764705882, 0.5333333333, 0.0274509804, 0.6784313725490196, 0.9764705882, 0.5411764706, 0.0274509804, 0.6823529411764706, 0.9764705882, 0.5490196078, 0.0274509804, 0.6862745098039216, 0.9764705882, 0.5529411765, 0.0274509804, 0.6901960784313725, 0.9764705882, 0.5607843137, 0.0235294118, 0.6941176470588235, 0.9764705882, 0.568627451, 0.0235294118, 0.6980392156862745, 0.9764705882, 0.5764705882, 0.0235294118, 0.7019607843137254, 0.9764705882, 0.5843137255, 0.0235294118, 0.7058823529411765, 0.9764705882, 0.5882352941, 0.0235294118, 0.7098039215686275, 0.9764705882, 0.5960784314, 0.0235294118, 0.7137254901960784, 0.9803921569, 0.6039215686, 0.0235294118, 0.7176470588235294, 0.9803921569, 0.6117647059, 0.0235294118, 0.7215686274509804, 0.9803921569, 0.6156862745, 0.0235294118, 0.7254901960784313, 0.9803921569, 0.6235294118, 0.0235294118, 0.7294117647058823, 0.9803921569, 0.631372549, 0.0196078431, 0.7333333333333333, 0.9803921569, 0.6392156863, 0.0196078431, 0.7372549019607844, 0.9803921569, 0.6470588235, 0.0196078431, 0.7411764705882353, 0.9803921569, 0.6509803922, 0.0196078431, 0.7450980392156863, 0.9803921569, 0.6588235294, 0.0196078431, 0.7490196078431373, 0.9803921569, 0.6666666667, 0.0196078431, 0.7529411764705882, 0.9803921569, 0.6745098039, 0.0196078431, 0.7568627450980392, 0.9803921569, 0.6784313725, 0.0196078431, 0.7607843137254902, 0.9843137255, 0.6862745098, 0.0196078431, 0.7647058823529411, 0.9843137255, 0.6941176471, 0.0196078431, 0.7686274509803922, 0.9843137255, 0.7019607843, 0.0156862745, 0.7725490196078432, 0.9843137255, 0.7098039216, 0.0156862745, 0.7764705882352941, 0.9843137255, 0.7137254902, 0.0156862745, 0.7803921568627451, 0.9843137255, 0.7215686275, 0.0156862745, 0.7843137254901961, 0.9843137255, 0.7294117647, 0.0156862745, 0.788235294117647, 0.9843137255, 0.737254902, 0.0156862745, 0.792156862745098, 0.9843137255, 0.7411764706, 0.0156862745, 0.796078431372549, 0.9843137255, 0.7490196078, 0.0156862745, 0.8, 0.9843137255, 0.7529411765, 0.0156862745, 0.803921568627451, 0.9843137255, 0.7607843137, 0.0156862745, 0.807843137254902, 0.9882352941, 0.768627451, 0.0156862745, 0.8117647058823529, 0.9882352941, 0.768627451, 0.0156862745, 0.8156862745098039, 0.9843137255, 0.7843137255, 0.0117647059, 0.8196078431372549, 0.9843137255, 0.8, 0.0117647059, 0.8235294117647058, 0.9843137255, 0.8156862745, 0.0117647059, 0.8274509803921568, 0.9803921569, 0.831372549, 0.0117647059, 0.8313725490196079, 0.9803921569, 0.8431372549, 0.0117647059, 0.8352941176470589, 0.9803921569, 0.8588235294, 0.0078431373, 0.8392156862745098, 0.9803921569, 0.8745098039, 0.0078431373, 0.8431372549019608, 0.9764705882, 0.8901960784, 0.0078431373, 0.8470588235294118, 0.9764705882, 0.9058823529, 0.0078431373, 0.8509803921568627, 0.9764705882, 0.9176470588, 0.0078431373, 0.8549019607843137, 0.9764705882, 0.9333333333, 0.0039215686, 0.8588235294117647, 0.9725490196, 0.9490196078, 0.0039215686, 0.8627450980392157, 0.9725490196, 0.9647058824, 0.0039215686, 0.8666666666666667, 0.9725490196, 0.9803921569, 0.0039215686, 0.8705882352941177, 0.9725490196, 0.9960784314, 0.0039215686, 0.8745098039215686, 0.9725490196, 0.9960784314, 0.0039215686, 0.8784313725490196, 0.9725490196, 0.9960784314, 0.0352941176, 0.8823529411764706, 0.9725490196, 0.9960784314, 0.0666666667, 0.8862745098039215, 0.9725490196, 0.9960784314, 0.0980392157, 0.8901960784313725, 0.9725490196, 0.9960784314, 0.1294117647, 0.8941176470588236, 0.9725490196, 0.9960784314, 0.1647058824, 0.8980392156862745, 0.9764705882, 0.9960784314, 0.1960784314, 0.9019607843137255, 0.9764705882, 0.9960784314, 0.2274509804, 0.9058823529411765, 0.9764705882, 0.9960784314, 0.2549019608, 0.9098039215686274, 0.9764705882, 0.9960784314, 0.2901960784, 0.9137254901960784, 0.9764705882, 0.9960784314, 0.3215686275, 0.9176470588235294, 0.9803921569, 0.9960784314, 0.3529411765, 0.9215686274509803, 0.9803921569, 0.9960784314, 0.3843137255, 0.9254901960784314, 0.9803921569, 0.9960784314, 0.4156862745, 0.9294117647058824, 0.9803921569, 0.9960784314, 0.4509803922, 0.9333333333333333, 0.9803921569, 0.9960784314, 0.4823529412, 0.9372549019607843, 0.9843137255, 0.9960784314, 0.5137254902, 0.9411764705882354, 0.9843137255, 0.9960784314, 0.5450980392, 0.9450980392156864, 0.9843137255, 0.9960784314, 0.5803921569, 0.9490196078431372, 0.9843137255, 0.9960784314, 0.6117647059, 0.9529411764705882, 0.9843137255, 0.9960784314, 0.6431372549, 0.9568627450980394, 0.9882352941, 0.9960784314, 0.6745098039, 0.9607843137254903, 0.9882352941, 0.9960784314, 0.7058823529, 0.9647058823529413, 0.9882352941, 0.9960784314, 0.7411764706, 0.9686274509803922, 0.9882352941, 0.9960784314, 0.768627451, 0.9725490196078431, 0.9882352941, 0.9960784314, 0.8, 0.9764705882352941, 0.9921568627, 0.9960784314, 0.831372549, 0.9803921568627451, 0.9921568627, 0.9960784314, 0.8666666667, 0.984313725490196, 0.9921568627, 0.9960784314, 0.8980392157, 0.9882352941176471, 0.9921568627, 0.9960784314, 0.9294117647, 0.9921568627450981, 0.9921568627, 0.9960784314, 0.9607843137, 0.996078431372549, 0.9960784314, 0.9960784314, 0.9607843137, 1.0, 0.9960784314, 0.9960784314, 0.9607843137],
  description: 'Siemens'
}];

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/enums/index.js + 2 modules
var esm_enums = __webpack_require__(99737);
// EXTERNAL MODULE: ../../../extensions/cornerstone/src/stores/useLutPresentationStore.ts
var useLutPresentationStore = __webpack_require__(10182);
// EXTERNAL MODULE: ../../../extensions/cornerstone/src/stores/usePositionPresentationStore.ts
var usePositionPresentationStore = __webpack_require__(44646);
// EXTERNAL MODULE: ../../../extensions/cornerstone/src/stores/useSegmentationPresentationStore.ts + 1 modules
var useSegmentationPresentationStore = __webpack_require__(2847);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/init.tsx























const {
  registerColormap
} = esm.utilities.colormap;

// TODO: Cypress tests are currently grabbing this from the window?
window.cornerstone = esm;
window.cornerstoneTools = dist_esm;
/**
 *
 */
async function init({
  servicesManager,
  commandsManager,
  extensionManager,
  appConfig
}) {
  // Note: this should run first before initializing the cornerstone
  // DO NOT CHANGE THE ORDER

  await (0,esm.init)({
    peerImport: appConfig.peerImport
  });

  // For debugging e2e tests that are failing on CI
  esm.setUseCPURendering(Boolean(appConfig.useCPURendering));
  esm.setConfiguration({
    ...esm.getConfiguration(),
    rendering: {
      ...esm.getConfiguration().rendering,
      strictZSpacingForVolumeViewport: appConfig.strictZSpacingForVolumeViewport
    }
  });

  // For debugging large datasets, otherwise prefer the defaults
  const {
    maxCacheSize
  } = appConfig;
  if (maxCacheSize) {
    esm.cache.setMaxCacheSize(maxCacheSize);
  }
  initCornerstoneTools();
  esm.Settings.getRuntimeSettings().set('useCursors', Boolean(appConfig.useCursors));
  const {
    userAuthenticationService,
    customizationService,
    uiModalService,
    uiNotificationService,
    cornerstoneViewportService,
    hangingProtocolService,
    viewportGridService
  } = servicesManager.services;
  window.services = servicesManager.services;
  window.extensionManager = extensionManager;
  window.commandsManager = commandsManager;
  if (appConfig.showCPUFallbackMessage && esm.getShouldUseCPURendering()) {
    _showCPURenderingModal(uiModalService, hangingProtocolService);
  }
  const {
    getPresentationId: getLutPresentationId
  } = useLutPresentationStore/* useLutPresentationStore */.I.getState();
  const {
    getPresentationId: getSegmentationPresentationId
  } = useSegmentationPresentationStore/* useSegmentationPresentationStore */.v.getState();
  const {
    getPresentationId: getPositionPresentationId
  } = usePositionPresentationStore/* usePositionPresentationStore */.q.getState();

  // register presentation id providers
  viewportGridService.addPresentationIdProvider('positionPresentationId', getPositionPresentationId);
  viewportGridService.addPresentationIdProvider('lutPresentationId', getLutPresentationId);
  viewportGridService.addPresentationIdProvider('segmentationPresentationId', getSegmentationPresentationId);
  dist_esm.segmentation.config.style.setStyle({
    type: esm_enums.SegmentationRepresentations.Contour
  }, {
    renderFill: false
  });
  const metadataProvider = src/* default.classes */.Ay.classes.MetadataProvider;
  esm.volumeLoader.registerVolumeLoader('cornerstoneStreamingImageVolume', loaders/* cornerstoneStreamingImageVolumeLoader */.FC);
  esm.volumeLoader.registerVolumeLoader('cornerstoneStreamingDynamicImageVolume', loaders/* cornerstoneStreamingDynamicImageVolumeLoader */.Mr);
  hangingProtocolService.registerImageLoadStrategy('interleaveCenter', interleaveCenterLoader);
  hangingProtocolService.registerImageLoadStrategy('interleaveTopToBottom', interleaveTopToBottom);
  hangingProtocolService.registerImageLoadStrategy('nth', interleaveNthLoader);

  // add metadata providers
  esm.metaData.addProvider(esm.utilities.calibratedPixelSpacingMetadataProvider.get.bind(esm.utilities.calibratedPixelSpacingMetadataProvider)); // this provider is required for Calibration tool
  esm.metaData.addProvider(metadataProvider.get.bind(metadataProvider), 9999);

  // These are set reasonably low to allow for interleaved retrieves and slower
  // connections.
  esm.imageLoadPoolManager.maxNumRequests = {
    [RequestType/* default */.A.Interaction]: appConfig?.maxNumRequests?.interaction || 10,
    [RequestType/* default */.A.Thumbnail]: appConfig?.maxNumRequests?.thumbnail || 5,
    [RequestType/* default */.A.Prefetch]: appConfig?.maxNumRequests?.prefetch || 5,
    [RequestType/* default */.A.Compute]: appConfig?.maxNumRequests?.compute || 10
  };
  initWADOImageLoader(userAuthenticationService, appConfig, extensionManager);

  /* Measurement Service */
  this.measurementServiceSource = connectToolsToMeasurementService(servicesManager);
  src_initCineService(servicesManager);
  src_initStudyPrefetcherService(servicesManager);

  // When a custom image load is performed, update the relevant viewports
  hangingProtocolService.subscribe(hangingProtocolService.EVENTS.CUSTOM_IMAGE_LOAD_PERFORMED, volumeInputArrayMap => {
    const {
      lutPresentationStore
    } = useLutPresentationStore/* useLutPresentationStore */.I.getState();
    const {
      segmentationPresentationStore
    } = useSegmentationPresentationStore/* useSegmentationPresentationStore */.v.getState();
    const {
      positionPresentationStore
    } = usePositionPresentationStore/* usePositionPresentationStore */.q.getState();
    for (const entry of volumeInputArrayMap.entries()) {
      const [viewportId, volumeInputArray] = entry;
      const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
      const ohifViewport = cornerstoneViewportService.getViewportInfo(viewportId);
      const {
        presentationIds
      } = ohifViewport.getViewportOptions();
      const presentations = {
        positionPresentation: positionPresentationStore[presentationIds?.positionPresentationId],
        lutPresentation: lutPresentationStore[presentationIds?.lutPresentationId],
        segmentationPresentation: segmentationPresentationStore[presentationIds?.segmentationPresentationId]
      };
      cornerstoneViewportService.setVolumesForViewport(viewport, volumeInputArray, presentations);
    }
  });

  // resize the cornerstone viewport service when the grid size changes
  // IMPORTANT: this should happen outside of the OHIFCornerstoneViewport
  // since it will trigger a rerender of each viewport and each resizing
  // the offscreen canvas which would result in a performance hit, this should
  // done only once per grid resize here. Doing it once here, allows us to reduce
  // the refreshRage(in ms) to 10 from 50. I tried with even 1 or 5 ms it worked fine
  viewportGridService.subscribe(viewportGridService.EVENTS.GRID_SIZE_CHANGED, () => {
    cornerstoneViewportService.resize(true);
  });
  src_initContextMenu({
    cornerstoneViewportService,
    customizationService,
    commandsManager
  });
  src_initDoubleClick({
    customizationService,
    commandsManager
  });

  /**
   * Runs error handler for failed requests.
   * @param event
   */
  const imageLoadFailedHandler = ({
    detail
  }) => {
    const handler = src/* errorHandler */.r_.getHTTPErrorHandler();
    handler(detail.error);
  };
  esm.eventTarget.addEventListener(esm.EVENTS.IMAGE_LOAD_FAILED, imageLoadFailedHandler);
  esm.eventTarget.addEventListener(esm.EVENTS.IMAGE_LOAD_ERROR, imageLoadFailedHandler);
  function elementEnabledHandler(evt) {
    const {
      element
    } = evt.detail;
    element.addEventListener(esm.EVENTS.CAMERA_RESET, evt => {
      const {
        element
      } = evt.detail;
      const enabledElement = (0,esm.getEnabledElement)(element);
      if (!enabledElement) {
        return;
      }
      const {
        viewportId
      } = enabledElement;
      commandsManager.runCommand('resetCrosshairs', {
        viewportId
      });
    });
    initViewTiming({
      element
    });
  }
  esm.eventTarget.addEventListener(esm.EVENTS.ELEMENT_ENABLED, elementEnabledHandler.bind(null));
  colormaps.forEach(registerColormap);

  // Event listener
  esm.eventTarget.addEventListenerDebounced(esm.EVENTS.ERROR_EVENT, ({
    detail
  }) => {
    uiNotificationService.show({
      title: detail.type,
      message: detail.message,
      type: 'error'
    });
  }, 100);

  // Call this function when initializing
  initializeWebWorkerProgressHandler(servicesManager.services.uiNotificationService);
}
function initializeWebWorkerProgressHandler(uiNotificationService) {
  const activeToasts = new Map();
  esm.eventTarget.addEventListener(esm.EVENTS.WEB_WORKER_PROGRESS, ({
    detail
  }) => {
    const {
      progress,
      type,
      id
    } = detail;
    const cacheKey = `${type}-${id}`;
    if (progress === 0 && !activeToasts.has(cacheKey)) {
      const progressPromise = new Promise((resolve, reject) => {
        activeToasts.set(cacheKey, {
          resolve,
          reject
        });
      });
      uiNotificationService.show({
        id: cacheKey,
        title: `${type}`,
        message: `${type}: ${progress}%`,
        autoClose: false,
        promise: progressPromise,
        promiseMessages: {
          loading: `Computing...`,
          success: `Completed successfully`,
          error: 'Web Worker failed'
        }
      });
    } else {
      if (progress === 100) {
        const {
          resolve
        } = activeToasts.get(cacheKey);
        resolve({
          progress,
          type
        });
        activeToasts.delete(cacheKey);
      }
    }
  });
}
function CPUModal() {
  return /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("p", null, "Your computer does not have enough GPU power to support the default GPU rendering mode. OHIF has switched to CPU rendering mode. Please note that CPU rendering does not support all features such as Volume Rendering, Multiplanar Reconstruction, and Segmentation Overlays."));
}
function _showCPURenderingModal(uiModalService, hangingProtocolService) {
  const callback = progress => {
    if (progress === 100) {
      uiModalService.show({
        content: CPUModal,
        title: 'OHIF Fell Back to CPU Rendering'
      });
      return true;
    }
  };
  const {
    unsubscribe
  } = hangingProtocolService.subscribe(hangingProtocolService.EVENTS.PROTOCOL_CHANGED, () => {
    const done = callback(100);
    if (done) {
      unsubscribe();
    }
  });
}
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/components/WindowLevelActionMenu/defaultWindowLevelPresets.ts
// The following are the default window level presets and can be further
// configured via the customization service.
const defaultWindowLevelPresets = {
  CT: [{
    description: 'Soft tissue',
    window: '400',
    level: '40'
  }, {
    description: 'Lung',
    window: '1500',
    level: '-600'
  }, {
    description: 'Liver',
    window: '150',
    level: '90'
  }, {
    description: 'Bone',
    window: '2500',
    level: '480'
  }, {
    description: 'Brain',
    window: '80',
    level: '40'
  }],
  PT: [{
    description: 'Default',
    window: '5',
    level: '2.5'
  }, {
    description: 'SUV',
    window: '0',
    level: '3'
  }, {
    description: 'SUV',
    window: '0',
    level: '5'
  }, {
    description: 'SUV',
    window: '0',
    level: '7'
  }, {
    description: 'SUV',
    window: '0',
    level: '8'
  }, {
    description: 'SUV',
    window: '0',
    level: '10'
  }, {
    description: 'SUV',
    window: '0',
    level: '15'
  }]
};
/* harmony default export */ const WindowLevelActionMenu_defaultWindowLevelPresets = (defaultWindowLevelPresets);
// EXTERNAL MODULE: ../../../extensions/cornerstone/src/Viewport/Overlays/CustomizableViewportOverlay.tsx + 2 modules
var CustomizableViewportOverlay = __webpack_require__(5791);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/getCustomizationModule.ts






const DefaultColormap = 'Grayscale';
const {
  VIEWPORT_PRESETS
} = esm.CONSTANTS;
const tools = {
  active: [{
    toolName: toolNames.WindowLevel,
    bindings: [{
      mouseButton: dist_esm.Enums.MouseBindings.Primary
    }]
  }, {
    toolName: toolNames.Pan,
    bindings: [{
      mouseButton: dist_esm.Enums.MouseBindings.Auxiliary
    }]
  }, {
    toolName: toolNames.Zoom,
    bindings: [{
      mouseButton: dist_esm.Enums.MouseBindings.Secondary
    }]
  }, {
    toolName: toolNames.StackScroll,
    bindings: [{
      mouseButton: dist_esm.Enums.MouseBindings.Wheel
    }]
  }],
  enabled: [{
    toolName: toolNames.PlanarFreehandContourSegmentation,
    configuration: {
      displayOnePointAsCrosshairs: true
    }
  }]
};
function getCustomizationModule() {
  return [{
    name: 'default',
    value: [CustomizableViewportOverlay/* CornerstoneOverlay */.JX, {
      id: 'cornerstone.overlayViewportTools',
      tools
    }, {
      id: 'cornerstone.windowLevelPresets',
      presets: WindowLevelActionMenu_defaultWindowLevelPresets
    }, {
      id: 'cornerstone.colorbar',
      width: '16px',
      colorbarTickPosition: 'left',
      colormaps: colormaps,
      colorbarContainerPosition: 'right',
      colorbarInitialColormap: DefaultColormap
    }, {
      id: 'cornerstone.3dVolumeRendering',
      volumeRenderingPresets: VIEWPORT_PRESETS,
      volumeRenderingQualityRange: {
        min: 1,
        max: 4,
        step: 1
      }
    }, {
      id: 'cornerstone.measurements',
      Angle: {
        displayText: [],
        report: []
      },
      CobbAngle: {
        displayText: [],
        report: []
      },
      ArrowAnnotate: {
        displayText: [],
        report: []
      },
      RectangleROi: {
        displayText: [],
        report: []
      },
      CircleROI: {
        displayText: [],
        report: []
      },
      EllipticalROI: {
        displayText: [],
        report: []
      },
      Bidirectional: {
        displayText: [],
        report: []
      },
      Length: {
        displayText: [],
        report: []
      },
      LivewireContour: {
        displayText: [],
        report: []
      },
      SplineROI: {
        displayText: [{
          displayName: 'Area',
          value: 'area',
          type: 'value'
        }, {
          value: 'areaUnits',
          for: ['area'],
          type: 'unit'
        }
        /**
        {
          displayName: 'Modality',
          value: 'Modality',
          type: 'value',
        },
        */],
        report: [{
          displayName: 'Area',
          value: 'area',
          type: 'value'
        }, {
          displayName: 'Unit',
          value: 'areaUnits',
          type: 'value'
        }]
      },
      PlanarFreehandROI: {
        displayTextOpen: [{
          displayName: 'Length',
          value: 'length',
          type: 'value'
        }],
        displayText: [{
          displayName: 'Mean',
          value: 'mean',
          type: 'value'
        }, {
          displayName: 'Max',
          value: 'max',
          type: 'value'
        }, {
          displayName: 'Area',
          value: 'area',
          type: 'value'
        }, {
          value: 'pixelValueUnits',
          for: ['mean', 'max' /** 'stdDev **/],
          type: 'unit'
        }, {
          value: 'areaUnits',
          for: ['area'],
          type: 'unit'
        }
        /**
        {
          displayName: 'Std Dev',
          value: 'stdDev',
          type: 'value',
        },
        */],
        report: [{
          displayName: 'Mean',
          value: 'mean',
          type: 'value'
        }, {
          displayName: 'Max',
          value: 'max',
          type: 'value'
        }, {
          displayName: 'Area',
          value: 'area',
          type: 'value'
        }, {
          displayName: 'Unit',
          value: 'unit',
          type: 'value'
        }]
      }
    }]
  }];
}
/* harmony default export */ const src_getCustomizationModule = (getCustomizationModule);
// EXTERNAL MODULE: ../../../node_modules/gl-matrix/esm/index.js + 1 modules
var gl_matrix_esm = __webpack_require__(3823);
// EXTERNAL MODULE: ../../../node_modules/html2canvas/dist/html2canvas.esm.js
var html2canvas_esm = __webpack_require__(91037);
// EXTERNAL MODULE: ../../ui/src/index.js + 690 modules
var ui_src = __webpack_require__(38223);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/CornerstoneViewportDownloadForm.tsx






const MINIMUM_SIZE = 100;
const DEFAULT_SIZE = 512;
const MAX_TEXTURE_SIZE = 10000;
const VIEWPORT_ID = 'cornerstone-viewport-download-form';
const CornerstoneViewportDownloadForm = ({
  onClose,
  activeViewportId: activeViewportIdProp,
  cornerstoneViewportService
}) => {
  const enabledElement = (0,state/* getEnabledElement */.kJ)(activeViewportIdProp);
  const activeViewportElement = enabledElement?.element;
  const activeViewportEnabledElement = (0,esm.getEnabledElement)(activeViewportElement);
  const {
    viewportId: activeViewportId,
    renderingEngineId,
    viewport: activeViewport
  } = activeViewportEnabledElement;
  const toolGroup = dist_esm.ToolGroupManager.getToolGroupForViewport(activeViewportId, renderingEngineId);
  const toolModeAndBindings = Object.keys(toolGroup.toolOptions).reduce((acc, toolName) => {
    const tool = toolGroup.toolOptions[toolName];
    const {
      mode,
      bindings
    } = tool;
    return {
      ...acc,
      [toolName]: {
        mode,
        bindings
      }
    };
  }, {});
  (0,react.useEffect)(() => {
    return () => {
      Object.keys(toolModeAndBindings).forEach(toolName => {
        const {
          mode,
          bindings
        } = toolModeAndBindings[toolName];
        toolGroup.setToolMode(toolName, mode, {
          bindings
        });
      });
    };
  }, []);
  const enableViewport = viewportElement => {
    if (viewportElement) {
      const {
        renderingEngine,
        viewport
      } = (0,esm.getEnabledElement)(activeViewportElement);
      const viewportInput = {
        viewportId: VIEWPORT_ID,
        element: viewportElement,
        type: viewport.type,
        defaultOptions: {
          background: viewport.defaultOptions.background,
          orientation: viewport.defaultOptions.orientation
        }
      };
      renderingEngine.enableElement(viewportInput);
    }
  };
  const disableViewport = viewportElement => {
    if (viewportElement) {
      const {
        renderingEngine
      } = (0,esm.getEnabledElement)(viewportElement);
      return new Promise(resolve => {
        renderingEngine.disableElement(VIEWPORT_ID);
      });
    }
  };
  const updateViewportPreview = (downloadViewportElement, internalCanvas, fileType) => new Promise(resolve => {
    const enabledElement = (0,esm.getEnabledElement)(downloadViewportElement);
    const {
      viewport: downloadViewport,
      renderingEngine
    } = enabledElement;

    // Note: Since any trigger of dimensions will update the viewport,
    // we need to resize the offScreenCanvas to accommodate for the new
    // dimensions, this is due to the reason that we are using the GPU offScreenCanvas
    // to render the viewport for the downloadViewport.
    renderingEngine.resize();

    // Trigger the render on the viewport to update the on screen
    // downloadViewport.resetCamera();
    downloadViewport.render();
    downloadViewportElement.addEventListener(esm.Enums.Events.IMAGE_RENDERED, function updateViewport(event) {
      const enabledElement = (0,esm.getEnabledElement)(event.target);
      const {
        viewport
      } = enabledElement;
      const {
        element
      } = viewport;
      const downloadCanvas = (0,esm.getOrCreateCanvas)(element);
      const type = 'image/' + fileType;
      const dataUrl = downloadCanvas.toDataURL(type, 1);
      let newWidth = element.offsetHeight;
      let newHeight = element.offsetWidth;
      if (newWidth > DEFAULT_SIZE || newHeight > DEFAULT_SIZE) {
        const multiplier = DEFAULT_SIZE / Math.max(newWidth, newHeight);
        newHeight *= multiplier;
        newWidth *= multiplier;
      }
      resolve({
        dataUrl,
        width: newWidth,
        height: newHeight
      });
      downloadViewportElement.removeEventListener(esm.Enums.Events.IMAGE_RENDERED, updateViewport);

      // for some reason we need a reset camera here, and I don't know why
      downloadViewport.resetCamera();
      const presentation = activeViewport.getViewPresentation();
      if (downloadViewport.setView) {
        downloadViewport.setView(activeViewport.getViewReference(), presentation);
      }
      downloadViewport.render();
    });
  });
  const loadImage = (activeViewportElement, viewportElement, width, height) => new Promise(resolve => {
    if (activeViewportElement && viewportElement) {
      const activeViewportEnabledElement = (0,esm.getEnabledElement)(activeViewportElement);
      if (!activeViewportEnabledElement) {
        return;
      }
      const {
        viewport
      } = activeViewportEnabledElement;
      const renderingEngine = cornerstoneViewportService.getRenderingEngine();
      const downloadViewport = renderingEngine.getViewport(VIEWPORT_ID);
      if (downloadViewport instanceof esm.StackViewport) {
        const imageId = viewport.getCurrentImageId();
        const properties = viewport.getProperties();
        downloadViewport.setStack([imageId]).then(() => {
          try {
            downloadViewport.setProperties(properties);
            const newWidth = Math.min(width || image.width, MAX_TEXTURE_SIZE);
            const newHeight = Math.min(height || image.height, MAX_TEXTURE_SIZE);
            resolve({
              width: newWidth,
              height: newHeight
            });
          } catch (e) {
            // Happens on clicking the cancel button
            console.warn('Unable to set properties', e);
          }
        });
      } else if (downloadViewport instanceof esm.BaseVolumeViewport) {
        const actors = viewport.getActors();
        // downloadViewport.setActors(actors);
        actors.forEach(actor => {
          downloadViewport.addActor(actor);
        });
        downloadViewport.render();
        const newWidth = Math.min(width || image.width, MAX_TEXTURE_SIZE);
        const newHeight = Math.min(height || image.height, MAX_TEXTURE_SIZE);
        resolve({
          width: newWidth,
          height: newHeight
        });
      }
    }
  });
  const toggleAnnotations = (toggle, viewportElement, activeViewportElement) => {
    const activeViewportEnabledElement = (0,esm.getEnabledElement)(activeViewportElement);
    const downloadViewportElement = (0,esm.getEnabledElement)(viewportElement);
    const {
      viewportId: activeViewportId,
      renderingEngineId
    } = activeViewportEnabledElement;
    const {
      viewportId: downloadViewportId
    } = downloadViewportElement;
    if (!activeViewportEnabledElement || !downloadViewportElement) {
      return;
    }
    const toolGroup = dist_esm.ToolGroupManager.getToolGroupForViewport(activeViewportId, renderingEngineId);

    // add the viewport to the toolGroup
    toolGroup.addViewport(downloadViewportId, renderingEngineId);
    Object.keys(toolGroup.getToolInstances()).forEach(toolName => {
      // make all tools Enabled so that they can not be interacted with
      // in the download viewport
      if (toggle && toolName !== 'Crosshairs') {
        try {
          toolGroup.setToolEnabled(toolName);
        } catch (e) {
          console.log(e);
        }
      } else {
        toolGroup.setToolDisabled(toolName);
      }
    });
  };
  const downloadBlob = (filename, fileType) => {
    const file = `${filename}.${fileType}`;
    const divForDownloadViewport = document.querySelector(`div[data-viewport-uid="${VIEWPORT_ID}"]`);
    (0,html2canvas_esm/* default */.A)(divForDownloadViewport).then(canvas => {
      const link = document.createElement('a');
      link.download = file;
      link.href = canvas.toDataURL(fileType, 1.0);
      link.click();
    });
  };
  return /*#__PURE__*/react.createElement(ui_src/* ViewportDownloadForm */.VS, {
    onClose: onClose,
    minimumSize: MINIMUM_SIZE,
    maximumSize: MAX_TEXTURE_SIZE,
    defaultSize: DEFAULT_SIZE,
    activeViewportElement: activeViewportElement,
    enableViewport: enableViewport,
    disableViewport: disableViewport,
    updateViewportPreview: updateViewportPreview,
    loadImage: loadImage,
    toggleAnnotations: toggleAnnotations,
    downloadBlob: downloadBlob
  });
};
/* harmony default export */ const utils_CornerstoneViewportDownloadForm = (CornerstoneViewportDownloadForm);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/imageSliceSync/toggleImageSliceSync.ts
const IMAGE_SLICE_SYNC_NAME = 'IMAGE_SLICE_SYNC';
function toggleImageSliceSync({
  servicesManager,
  viewports: providedViewports,
  syncId
}) {
  const {
    syncGroupService,
    viewportGridService,
    displaySetService,
    cornerstoneViewportService
  } = servicesManager.services;
  syncId ||= IMAGE_SLICE_SYNC_NAME;
  const viewports = providedViewports || getReconstructableStackViewports(viewportGridService, displaySetService);

  // Todo: right now we don't have a proper way to define specific
  // viewports to add to synchronizers, and right now it is global or not
  // after we do that, we should do fine grained control of the synchronizers
  const someViewportHasSync = viewports.some(viewport => {
    const syncStates = syncGroupService.getSynchronizersForViewport(viewport.viewportOptions.viewportId);
    const imageSync = syncStates.find(syncState => syncState.id === syncId);
    return !!imageSync;
  });
  if (someViewportHasSync) {
    return disableSync(syncId, servicesManager);
  }

  // create synchronization group and add the viewports to it.
  viewports.forEach(gridViewport => {
    const {
      viewportId
    } = gridViewport.viewportOptions;
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    if (!viewport) {
      return;
    }
    syncGroupService.addViewportToSyncGroup(viewportId, viewport.getRenderingEngine().id, {
      type: 'imageSlice',
      id: syncId,
      source: true,
      target: true
    });
  });
}
function disableSync(syncName, servicesManager) {
  const {
    syncGroupService,
    viewportGridService,
    displaySetService,
    cornerstoneViewportService
  } = servicesManager.services;
  const viewports = getReconstructableStackViewports(viewportGridService, displaySetService);
  viewports.forEach(gridViewport => {
    const {
      viewportId
    } = gridViewport.viewportOptions;
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    if (!viewport) {
      return;
    }
    syncGroupService.removeViewportFromSyncGroup(viewport.id, viewport.getRenderingEngine().id, syncName);
  });
}

/**
 * Gets the consistent spacing stack viewport types, which are the ones which
 * can be navigated using the stack image sync right now.
 */
function getReconstructableStackViewports(viewportGridService, displaySetService) {
  let {
    viewports
  } = viewportGridService.getState();
  viewports = [...viewports.values()];
  // filter empty viewports
  viewports = viewports.filter(viewport => viewport.displaySetInstanceUIDs && viewport.displaySetInstanceUIDs.length);

  // filter reconstructable viewports
  viewports = viewports.filter(viewport => {
    const {
      displaySetInstanceUIDs
    } = viewport;
    for (const displaySetInstanceUID of displaySetInstanceUIDs) {
      const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);

      // TODO - add a better test than isReconstructable
      if (displaySet && displaySet.isReconstructable) {
        return true;
      }
      return false;
    }
  });
  return viewports;
}
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/toggleVOISliceSync.ts
const VOI_SYNC_NAME = 'VOI_SYNC';
const getSyncId = modality => `${VOI_SYNC_NAME}_${modality}`;
function toggleVOISliceSync({
  servicesManager,
  viewports: providedViewports,
  syncId
}) {
  const {
    syncGroupService,
    viewportGridService,
    displaySetService,
    cornerstoneViewportService
  } = servicesManager.services;
  const viewports = providedViewports || groupViewportsByModality(viewportGridService, displaySetService);

  // Todo: right now we don't have a proper way to define specific
  // viewports to add to synchronizers, and right now it is global or not
  // after we do that, we should do fine grained control of the synchronizers

  // we can apply voi sync within each modality group
  for (const [modality, modalityViewports] of Object.entries(viewports)) {
    const syncIdToUse = syncId || getSyncId(modality);
    const someViewportHasSync = modalityViewports.some(viewport => {
      const syncStates = syncGroupService.getSynchronizersForViewport(viewport.viewportOptions.viewportId);
      const imageSync = syncStates.find(syncState => syncState.id === syncIdToUse);
      return !!imageSync;
    });
    if (someViewportHasSync) {
      return toggleVOISliceSync_disableSync(modalityViewports, syncIdToUse, servicesManager);
    }

    // create synchronization group and add the modalityViewports to it.
    modalityViewports.forEach(gridViewport => {
      const {
        viewportId
      } = gridViewport.viewportOptions;
      const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
      if (!viewport) {
        return;
      }
      syncGroupService.addViewportToSyncGroup(viewportId, viewport.getRenderingEngine().id, {
        type: 'voi',
        id: syncIdToUse,
        source: true,
        target: true
      });
    });
  }
}
function toggleVOISliceSync_disableSync(modalityViewports, syncId, servicesManager) {
  const {
    syncGroupService,
    cornerstoneViewportService
  } = servicesManager.services;
  const viewports = modalityViewports;
  viewports.forEach(gridViewport => {
    const {
      viewportId
    } = gridViewport.viewportOptions;
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    if (!viewport) {
      return;
    }
    syncGroupService.removeViewportFromSyncGroup(viewport.id, viewport.getRenderingEngine().id, syncId);
  });
}
function groupViewportsByModality(viewportGridService, displaySetService) {
  let {
    viewports
  } = viewportGridService.getState();
  viewports = [...viewports.values()];

  // group the viewports by modality
  return viewports.reduce((acc, viewport) => {
    const {
      displaySetInstanceUIDs
    } = viewport;
    // Todo: add proper fusion support
    const displaySetInstanceUID = displaySetInstanceUIDs[0];
    const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
    const modality = displaySet.Modality;
    if (!acc[modality]) {
      acc[modality] = [];
    }
    acc[modality].push(viewport);
    return acc;
  }, {});
}
// EXTERNAL MODULE: ../../../extensions/cornerstone/src/stores/useSynchronizersStore.ts
var useSynchronizersStore = __webpack_require__(68578);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/stores/index.ts




;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/commandsModule.ts










const toggleSyncFunctions = {
  imageSlice: toggleImageSliceSync,
  voi: toggleVOISliceSync
};
function commandsModule({
  servicesManager,
  extensionManager,
  commandsManager
}) {
  const {
    viewportGridService,
    toolGroupService,
    cineService,
    uiDialogService,
    cornerstoneViewportService,
    uiNotificationService,
    measurementService,
    customizationService,
    colorbarService,
    hangingProtocolService,
    syncGroupService
  } = servicesManager.services;
  const {
    measurementServiceSource
  } = this;
  function _getActiveViewportEnabledElement() {
    return getActiveViewportEnabledElement(viewportGridService);
  }
  function _getActiveViewportToolGroupId() {
    const viewport = _getActiveViewportEnabledElement();
    return toolGroupService.getToolGroupForViewport(viewport.id);
  }
  const actions = {
    /**
     * Generates the selector props for the context menu, specific to
     * the cornerstone viewport, and then runs the context menu.
     */
    showCornerstoneContextMenu: options => {
      const element = _getActiveViewportEnabledElement()?.viewport?.element;
      const optionsToUse = {
        ...options,
        element
      };
      const {
        useSelectedAnnotation,
        nearbyToolData,
        event
      } = optionsToUse;

      // This code is used to invoke the context menu via keyboard shortcuts
      if (useSelectedAnnotation && !nearbyToolData) {
        const firstAnnotationSelected = getFirstAnnotationSelected(element);
        // filter by allowed selected tools from config property (if there is any)
        const isToolAllowed = !optionsToUse.allowedSelectedTools || optionsToUse.allowedSelectedTools.includes(firstAnnotationSelected?.metadata?.toolName);
        if (isToolAllowed) {
          optionsToUse.nearbyToolData = firstAnnotationSelected;
        } else {
          return;
        }
      }
      optionsToUse.defaultPointsPosition = [];
      // if (optionsToUse.nearbyToolData) {
      //   optionsToUse.defaultPointsPosition = commandsManager.runCommand(
      //     'getToolDataActiveCanvasPoints',
      //     { toolData: optionsToUse.nearbyToolData }
      //   );
      // }

      // TODO - make the selectorProps richer by including the study metadata and display set.
      optionsToUse.selectorProps = {
        toolName: optionsToUse.nearbyToolData?.metadata?.toolName,
        value: optionsToUse.nearbyToolData,
        uid: optionsToUse.nearbyToolData?.annotationUID,
        nearbyToolData: optionsToUse.nearbyToolData,
        event,
        ...optionsToUse.selectorProps
      };
      commandsManager.run(options, optionsToUse);
    },
    updateStoredSegmentationPresentation: ({
      displaySet,
      type
    }) => {
      const {
        addSegmentationPresentationItem
      } = useSegmentationPresentationStore/* useSegmentationPresentationStore */.v.getState();
      const referencedDisplaySetInstanceUID = displaySet.referencedDisplaySetInstanceUID;
      addSegmentationPresentationItem(referencedDisplaySetInstanceUID, {
        segmentationId: displaySet.displaySetInstanceUID,
        hydrated: true,
        type
      });
    },
    updateStoredPositionPresentation: ({
      viewportId,
      displaySetInstanceUID
    }) => {
      const presentations = cornerstoneViewportService.getPresentations(viewportId);
      const {
        positionPresentationStore,
        setPositionPresentation,
        getPositionPresentationId
      } = usePositionPresentationStore/* usePositionPresentationStore */.q.getState();

      // Look inside positionPresentationStore and find the key that includes the displaySetInstanceUID
      // and the value has viewportId as activeViewportId.
      const previousReferencedDisplaySetStoreKey = Object.entries(positionPresentationStore).find(([key, value]) => key.includes(displaySetInstanceUID) && value.viewportId === viewportId)?.[0];
      if (previousReferencedDisplaySetStoreKey) {
        setPositionPresentation(previousReferencedDisplaySetStoreKey, presentations.positionPresentation);
        return;
      }

      // if not found means we have not visited that referencedDisplaySetInstanceUID before
      // so we need to grab the positionPresentationId directly from the store,
      // Todo: this is really hacky, we should have a better way for this

      const positionPresentationId = getPositionPresentationId({
        displaySetInstanceUIDs: [displaySetInstanceUID],
        viewportId
      });
      setPositionPresentation(positionPresentationId, presentations.positionPresentation);
    },
    getNearbyToolData({
      nearbyToolData,
      element,
      canvasCoordinates
    }) {
      return nearbyToolData ?? dist_esm.utilities.getAnnotationNearPoint(element, canvasCoordinates);
    },
    getNearbyAnnotation({
      element,
      canvasCoordinates
    }) {
      const nearbyToolData = actions.getNearbyToolData({
        nearbyToolData: null,
        element,
        canvasCoordinates
      });
      const isAnnotation = toolName => {
        const enabledElement = (0,esm.getEnabledElement)(element);
        if (!enabledElement) {
          return;
        }
        const {
          renderingEngineId,
          viewportId
        } = enabledElement;
        const toolGroup = dist_esm.ToolGroupManager.getToolGroupForViewport(viewportId, renderingEngineId);
        const toolInstance = toolGroup.getToolInstance(toolName);
        return toolInstance?.constructor?.isAnnotation ?? true;
      };
      return nearbyToolData?.metadata?.toolName && isAnnotation(nearbyToolData.metadata.toolName) ? nearbyToolData : null;
    },
    /** Delete the given measurement */
    deleteMeasurement: ({
      uid
    }) => {
      if (uid) {
        measurementServiceSource.remove(uid);
      }
    },
    /**
     * Show the measurement labelling input dialog and update the label
     * on the measurement with a response if not cancelled.
     */
    setMeasurementLabel: ({
      uid
    }) => {
      const labelConfig = customizationService.get('measurementLabels');
      const measurement = measurementService.getMeasurement(uid);
      (0,default_src.showLabelAnnotationPopup)(measurement, uiDialogService, labelConfig).then(val => {
        measurementService.update(uid, {
          ...val
        }, true);
      });
    },
    /**
     *
     * @param props - containing the updates to apply
     * @param props.measurementKey - chooses the measurement key to apply the
     *        code to.  This will typically be finding or site to apply a
     *        finding code or a findingSites code.
     * @param props.code - A coding scheme value from DICOM, including:
     *       * CodeValue - the language independent code, for example '1234'
     *       * CodingSchemeDesignator - the issue of the code value
     *       * CodeMeaning - the text value shown to the user
     *       * ref - a string reference in the form `<designator>:<codeValue>`
     *       * Other fields
     *     Note it is a valid option to remove the finding or site values by
     *     supplying null for the code.
     * @param props.uid - the measurement UID to find it with
     * @param props.label - the text value for the code.  Has NOTHING to do with
     *        the measurement label, which can be set with textLabel
     * @param props.textLabel is the measurement label to apply.  Set to null to
     *            delete.
     *
     * If the measurementKey is `site`, then the code will also be added/replace
     * the 0 element of findingSites.  This behaviour is expected to be enhanced
     * in the future with ability to set other site information.
     */
    updateMeasurement: props => {
      const {
        code,
        uid,
        textLabel,
        label
      } = props;
      const measurement = measurementService.getMeasurement(uid);
      const updatedMeasurement = {
        ...measurement
      };
      // Call it textLabel as the label value
      // TODO - remove the label setting when direct rendering of findingSites is enabled
      if (textLabel !== undefined) {
        updatedMeasurement.label = textLabel;
      }
      if (code !== undefined) {
        const measurementKey = code.type || 'finding';
        if (code.ref && !code.CodeValue) {
          const split = code.ref.indexOf(':');
          code.CodeValue = code.ref.substring(split + 1);
          code.CodeMeaning = code.text || label;
          code.CodingSchemeDesignator = code.ref.substring(0, split);
        }
        updatedMeasurement[measurementKey] = code;
        // TODO - remove this line once the measurements table customizations are in
        if (measurementKey !== 'finding') {
          if (updatedMeasurement.findingSites) {
            updatedMeasurement.findingSites = updatedMeasurement.findingSites.filter(it => it.type !== measurementKey);
            updatedMeasurement.findingSites.push(code);
          } else {
            updatedMeasurement.findingSites = [code];
          }
        }
      }
      measurementService.update(updatedMeasurement.uid, updatedMeasurement, true);
    },
    // Retrieve value commands
    getActiveViewportEnabledElement: _getActiveViewportEnabledElement,
    setViewportActive: ({
      viewportId
    }) => {
      const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
      if (!viewportInfo) {
        console.warn('No viewport found for viewportId:', viewportId);
        return;
      }
      viewportGridService.setActiveViewportId(viewportId);
    },
    arrowTextCallback: ({
      callback,
      data,
      uid
    }) => {
      const labelConfig = customizationService.get('measurementLabels');
      (0,default_src.callLabelAutocompleteDialog)(uiDialogService, callback, {}, labelConfig);
    },
    toggleCine: () => {
      const {
        viewports
      } = viewportGridService.getState();
      const {
        isCineEnabled
      } = cineService.getState();
      cineService.setIsCineEnabled(!isCineEnabled);
      viewports.forEach((_, index) => cineService.setCine({
        id: index,
        isPlaying: false
      }));
    },
    setViewportWindowLevel({
      viewportId,
      window,
      level
    }) {
      // convert to numbers
      const windowWidthNum = Number(window);
      const windowCenterNum = Number(level);

      // get actor from the viewport
      const renderingEngine = cornerstoneViewportService.getRenderingEngine();
      const viewport = renderingEngine.getViewport(viewportId);
      const {
        lower,
        upper
      } = esm.utilities.windowLevel.toLowHighRange(windowWidthNum, windowCenterNum);
      viewport.setProperties({
        voiRange: {
          upper,
          lower
        }
      });
      viewport.render();
    },
    toggleViewportColorbar: ({
      viewportId,
      displaySetInstanceUIDs,
      options = {}
    }) => {
      const hasColorbar = colorbarService.hasColorbar(viewportId);
      if (hasColorbar) {
        colorbarService.removeColorbar(viewportId);
        return;
      }
      colorbarService.addColorbar(viewportId, displaySetInstanceUIDs, options);
    },
    setWindowLevel(props) {
      const {
        toolGroupId
      } = props;
      const {
        viewportId
      } = _getActiveViewportEnabledElement();
      const viewportToolGroupId = toolGroupService.getToolGroupForViewport(viewportId);
      if (toolGroupId && toolGroupId !== viewportToolGroupId) {
        return;
      }
      actions.setViewportWindowLevel({
        ...props,
        viewportId
      });
    },
    setToolEnabled: ({
      toolName,
      toggle,
      toolGroupId
    }) => {
      const {
        viewports
      } = viewportGridService.getState();
      if (!viewports.size) {
        return;
      }
      const toolGroup = toolGroupService.getToolGroup(toolGroupId ?? null);
      if (!toolGroup || !toolGroup.hasTool(toolName)) {
        return;
      }
      const toolIsEnabled = toolGroup.getToolOptions(toolName).mode === dist_esm.Enums.ToolModes.Enabled;

      // Toggle the tool's state only if the toggle is true
      if (toggle) {
        toolIsEnabled ? toolGroup.setToolDisabled(toolName) : toolGroup.setToolEnabled(toolName);
      } else {
        toolGroup.setToolEnabled(toolName);
      }
      const renderingEngine = cornerstoneViewportService.getRenderingEngine();
      renderingEngine.render();
    },
    toggleEnabledDisabledToolbar({
      value,
      itemId,
      toolGroupId
    }) {
      const toolName = itemId || value;
      toolGroupId = toolGroupId ?? _getActiveViewportToolGroupId();
      const toolGroup = toolGroupService.getToolGroup(toolGroupId);
      if (!toolGroup || !toolGroup.hasTool(toolName)) {
        return;
      }
      const toolIsEnabled = toolGroup.getToolOptions(toolName).mode === dist_esm.Enums.ToolModes.Enabled;
      toolIsEnabled ? toolGroup.setToolDisabled(toolName) : toolGroup.setToolEnabled(toolName);
    },
    toggleActiveDisabledToolbar({
      value,
      itemId,
      toolGroupId
    }) {
      const toolName = itemId || value;
      toolGroupId = toolGroupId ?? _getActiveViewportToolGroupId();
      const toolGroup = toolGroupService.getToolGroup(toolGroupId);
      if (!toolGroup || !toolGroup.hasTool(toolName)) {
        return;
      }
      const toolIsActive = [dist_esm.Enums.ToolModes.Active, dist_esm.Enums.ToolModes.Enabled, dist_esm.Enums.ToolModes.Passive].includes(toolGroup.getToolOptions(toolName).mode);
      toolIsActive ? toolGroup.setToolDisabled(toolName) : actions.setToolActive({
        toolName,
        toolGroupId
      });

      // we should set the previously active tool to active after we set the
      // current tool disabled
      if (toolIsActive) {
        const prevToolName = toolGroup.getPrevActivePrimaryToolName();
        if (prevToolName !== toolName) {
          actions.setToolActive({
            toolName: prevToolName,
            toolGroupId
          });
        }
      }
    },
    setToolActiveToolbar: ({
      value,
      itemId,
      toolName,
      toolGroupIds = []
    }) => {
      // Sometimes it is passed as value (tools with options), sometimes as itemId (toolbar buttons)
      toolName = toolName || itemId || value;
      toolGroupIds = toolGroupIds.length ? toolGroupIds : toolGroupService.getToolGroupIds();
      toolGroupIds.forEach(toolGroupId => {
        actions.setToolActive({
          toolName,
          toolGroupId
        });
      });
    },
    setToolActive: ({
      toolName,
      toolGroupId = null
    }) => {
      const {
        viewports
      } = viewportGridService.getState();
      if (!viewports.size) {
        return;
      }
      const toolGroup = toolGroupService.getToolGroup(toolGroupId);
      if (!toolGroup) {
        return;
      }
      if (!toolGroup.hasTool(toolName)) {
        return;
      }
      const activeToolName = toolGroup.getActivePrimaryMouseButtonTool();
      if (activeToolName) {
        const activeToolOptions = toolGroup.getToolConfiguration(activeToolName);
        activeToolOptions?.disableOnPassive ? toolGroup.setToolDisabled(activeToolName) : toolGroup.setToolPassive(activeToolName);
      }

      // Set the new toolName to be active
      toolGroup.setToolActive(toolName, {
        bindings: [{
          mouseButton: dist_esm.Enums.MouseBindings.Primary
        }]
      });
    },
    showDownloadViewportModal: () => {
      const {
        activeViewportId
      } = viewportGridService.getState();
      if (!cornerstoneViewportService.getCornerstoneViewport(activeViewportId)) {
        // Cannot download a non-cornerstone viewport (image).
        uiNotificationService.show({
          title: 'Download Image',
          message: 'Image cannot be downloaded',
          type: 'error'
        });
        return;
      }
      const {
        uiModalService
      } = servicesManager.services;
      if (uiModalService) {
        uiModalService.show({
          content: utils_CornerstoneViewportDownloadForm,
          title: 'Download High Quality Image',
          contentProps: {
            activeViewportId,
            onClose: uiModalService.hide,
            cornerstoneViewportService
          },
          containerDimensions: 'w-[70%] max-w-[900px]'
        });
      }
    },
    rotateViewport: ({
      rotation
    }) => {
      const enabledElement = _getActiveViewportEnabledElement();
      if (!enabledElement) {
        return;
      }
      const {
        viewport
      } = enabledElement;
      if (viewport instanceof esm.BaseVolumeViewport) {
        const camera = viewport.getCamera();
        const rotAngle = rotation * Math.PI / 180;
        const rotMat = gl_matrix_esm/* mat4.identity */.pB.identity(new Float32Array(16));
        gl_matrix_esm/* mat4.rotate */.pB.rotate(rotMat, rotMat, rotAngle, camera.viewPlaneNormal);
        const rotatedViewUp = gl_matrix_esm/* vec3.transformMat4 */.eR.transformMat4(gl_matrix_esm/* vec3.create */.eR.create(), camera.viewUp, rotMat);
        viewport.setCamera({
          viewUp: rotatedViewUp
        });
        viewport.render();
      } else if (viewport.getRotation !== undefined) {
        const presentation = viewport.getViewPresentation();
        const {
          rotation: currentRotation
        } = presentation;
        const newRotation = (currentRotation + rotation) % 360;
        viewport.setViewPresentation({
          rotation: newRotation
        });
        viewport.render();
      }
    },
    flipViewportHorizontal: () => {
      const enabledElement = _getActiveViewportEnabledElement();
      if (!enabledElement) {
        return;
      }
      const {
        viewport
      } = enabledElement;
      const {
        flipHorizontal
      } = viewport.getCamera();
      viewport.setCamera({
        flipHorizontal: !flipHorizontal
      });
      viewport.render();
    },
    flipViewportVertical: () => {
      const enabledElement = _getActiveViewportEnabledElement();
      if (!enabledElement) {
        return;
      }
      const {
        viewport
      } = enabledElement;
      const {
        flipVertical
      } = viewport.getCamera();
      viewport.setCamera({
        flipVertical: !flipVertical
      });
      viewport.render();
    },
    invertViewport: ({
      element
    }) => {
      let enabledElement;
      if (element === undefined) {
        enabledElement = _getActiveViewportEnabledElement();
      } else {
        enabledElement = element;
      }
      if (!enabledElement) {
        return;
      }
      const {
        viewport
      } = enabledElement;
      const {
        invert
      } = viewport.getProperties();
      viewport.setProperties({
        invert: !invert
      });
      viewport.render();
    },
    resetViewport: () => {
      const enabledElement = _getActiveViewportEnabledElement();
      if (!enabledElement) {
        return;
      }
      const {
        viewport
      } = enabledElement;
      viewport.resetProperties?.();
      viewport.resetCamera();
      viewport.render();
    },
    scaleViewport: ({
      direction
    }) => {
      const enabledElement = _getActiveViewportEnabledElement();
      const scaleFactor = direction > 0 ? 0.9 : 1.1;
      if (!enabledElement) {
        return;
      }
      const {
        viewport
      } = enabledElement;
      if (viewport instanceof esm.StackViewport) {
        if (direction) {
          const {
            parallelScale
          } = viewport.getCamera();
          viewport.setCamera({
            parallelScale: parallelScale * scaleFactor
          });
          viewport.render();
        } else {
          viewport.resetCamera();
          viewport.render();
        }
      }
    },
    /** Jumps the active viewport or the specified one to the given slice index */
    jumpToImage: ({
      imageIndex,
      viewport: gridViewport
    }) => {
      // Get current active viewport (return if none active)
      let viewport;
      if (!gridViewport) {
        const enabledElement = _getActiveViewportEnabledElement();
        if (!enabledElement) {
          return;
        }
        viewport = enabledElement.viewport;
      } else {
        viewport = cornerstoneViewportService.getCornerstoneViewport(gridViewport.id);
      }

      // Get number of slices
      // -> Copied from cornerstone3D jumpToSlice\_getImageSliceData()
      let numberOfSlices = 0;
      if (viewport instanceof esm.StackViewport) {
        numberOfSlices = viewport.getImageIds().length;
      } else if (viewport instanceof esm.VolumeViewport) {
        numberOfSlices = esm.utilities.getImageSliceDataForVolumeViewport(viewport).numberOfSlices;
      } else {
        throw new Error('Unsupported viewport type');
      }
      const jumpIndex = imageIndex < 0 ? numberOfSlices + imageIndex : imageIndex;
      if (jumpIndex >= numberOfSlices || jumpIndex < 0) {
        throw new Error(`Can't jump to ${imageIndex}`);
      }

      // Set slice to last slice
      const options = {
        imageIndex: jumpIndex
      };
      esm.utilities.jumpToSlice(viewport.element, options);
    },
    scroll: ({
      direction
    }) => {
      const enabledElement = _getActiveViewportEnabledElement();
      if (!enabledElement) {
        return;
      }
      const {
        viewport
      } = enabledElement;
      const options = {
        delta: direction
      };
      esm.utilities.scroll(viewport, options);
    },
    setViewportColormap: ({
      viewportId,
      displaySetInstanceUID,
      colormap,
      opacity = 1,
      immediate = false
    }) => {
      const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
      let hpOpacity;
      // Retrieve active protocol's viewport match details
      const {
        viewportMatchDetails
      } = hangingProtocolService.getActiveProtocol();
      // Get display set options for the specified viewport ID
      const displaySetsInfo = viewportMatchDetails.get(viewportId)?.displaySetsInfo;
      if (displaySetsInfo) {
        // Find the display set that matches the given UID
        const matchingDisplaySet = displaySetsInfo.find(displaySet => displaySet.displaySetInstanceUID === displaySetInstanceUID);
        // If a matching display set is found, update the opacity with its value
        hpOpacity = matchingDisplaySet?.displaySetOptions?.options?.colormap?.opacity;
      }

      // HP takes priority over the default opacity
      colormap = {
        ...colormap,
        opacity: hpOpacity || opacity
      };
      if (viewport instanceof esm.StackViewport) {
        viewport.setProperties({
          colormap
        });
      }
      if (viewport instanceof esm.VolumeViewport) {
        if (!displaySetInstanceUID) {
          const {
            viewports
          } = viewportGridService.getState();
          displaySetInstanceUID = viewports.get(viewportId)?.displaySetInstanceUIDs[0];
        }
        const volumeId = viewport.getVolumeId();
        viewport.setProperties({
          colormap
        }, volumeId);
      }
      if (immediate) {
        viewport.render();
      }
    },
    changeActiveViewport: ({
      direction = 1
    }) => {
      const {
        activeViewportId,
        viewports
      } = viewportGridService.getState();
      const viewportIds = Array.from(viewports.keys());
      const currentIndex = viewportIds.indexOf(activeViewportId);
      const nextViewportIndex = (currentIndex + direction + viewportIds.length) % viewportIds.length;
      viewportGridService.setActiveViewportId(viewportIds[nextViewportIndex]);
    },
    /**
     * If the syncId is given and a synchronizer with that ID already exists, it will
     * toggle it on/off for the provided viewports. If not, it will attempt to create
     * a new synchronizer using the given syncId and type for the specified viewports.
     * If no viewports are provided, you may notice some default behavior.
     * - 'voi' type, we will aim to synchronize all viewports with the same modality
     * -'imageSlice' type, we will aim to synchronize all viewports with the same orientation.
     *
     * @param options
     * @param options.viewports - The viewports to synchronize
     * @param options.syncId - The synchronization group ID
     * @param options.type - The type of synchronization to perform
     */
    toggleSynchronizer: ({
      type,
      viewports,
      syncId
    }) => {
      const synchronizer = syncGroupService.getSynchronizer(syncId);
      if (synchronizer) {
        synchronizer.isDisabled() ? synchronizer.setEnabled(true) : synchronizer.setEnabled(false);
        return;
      }
      const fn = toggleSyncFunctions[type];
      if (fn) {
        fn({
          servicesManager,
          viewports,
          syncId
        });
      }
    },
    setSourceViewportForReferenceLinesTool: ({
      viewportId
    }) => {
      if (!viewportId) {
        const {
          activeViewportId
        } = viewportGridService.getState();
        viewportId = activeViewportId ?? 'default';
      }
      const toolGroup = toolGroupService.getToolGroupForViewport(viewportId);
      toolGroup?.setToolConfiguration(dist_esm.ReferenceLinesTool.toolName, {
        sourceViewportId: viewportId
      }, true // overwrite
      );
      const renderingEngine = cornerstoneViewportService.getRenderingEngine();
      renderingEngine.render();
    },
    storePresentation: ({
      viewportId
    }) => {
      cornerstoneViewportService.storePresentation({
        viewportId
      });
    },
    updateVolumeData: ({
      volume
    }) => {
      // update vtkOpenGLTexture and imageData of computed volume
      const {
        imageData,
        vtkOpenGLTexture
      } = volume;
      const numSlices = imageData.getDimensions()[2];
      const slicesToUpdate = [...Array(numSlices).keys()];
      slicesToUpdate.forEach(i => {
        vtkOpenGLTexture.setUpdatedFrame(i);
      });
      imageData.modified();
    },
    attachProtocolViewportDataListener: ({
      protocol,
      stageIndex
    }) => {
      const EVENT = cornerstoneViewportService.EVENTS.VIEWPORT_DATA_CHANGED;
      const command = protocol.callbacks.onViewportDataInitialized;
      const numPanes = protocol.stages?.[stageIndex]?.viewports.length ?? 1;
      let numPanesWithData = 0;
      const {
        unsubscribe
      } = cornerstoneViewportService.subscribe(EVENT, evt => {
        numPanesWithData++;
        if (numPanesWithData === numPanes) {
          commandsManager.run(...command);

          // Unsubscribe from the event
          unsubscribe(EVENT);
        }
      });
    },
    setViewportPreset: ({
      viewportId,
      preset
    }) => {
      const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
      if (!viewport) {
        return;
      }
      viewport.setProperties({
        preset
      });
      viewport.render();
    },
    /**
     * Sets the volume quality for a given viewport.
     * @param {string} viewportId - The ID of the viewport to set the volume quality.
     * @param {number} volumeQuality - The desired quality level of the volume rendering.
     */

    setVolumeRenderingQulaity: ({
      viewportId,
      volumeQuality
    }) => {
      const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
      const {
        actor
      } = viewport.getActors()[0];
      const mapper = actor.getMapper();
      const image = mapper.getInputData();
      const dims = image.getDimensions();
      const spacing = image.getSpacing();
      const spatialDiagonal = gl_matrix_esm/* vec3.length */.eR.length(gl_matrix_esm/* vec3.fromValues */.eR.fromValues(dims[0] * spacing[0], dims[1] * spacing[1], dims[2] * spacing[2]));
      let sampleDistance = spacing.reduce((a, b) => a + b) / 3.0;
      sampleDistance /= volumeQuality > 1 ? 0.5 * volumeQuality ** 2 : 1.0;
      const samplesPerRay = spatialDiagonal / sampleDistance + 1;
      mapper.setMaximumSamplesPerRay(samplesPerRay);
      mapper.setSampleDistance(sampleDistance);
      viewport.render();
    },
    /**
     * Shifts opacity points for a given viewport id.
     * @param {string} viewportId - The ID of the viewport to set the mapping range.
     * @param {number} shift - The shift value to shift the points by.
     */
    shiftVolumeOpacityPoints: ({
      viewportId,
      shift
    }) => {
      const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
      const {
        actor
      } = viewport.getActors()[0];
      const ofun = actor.getProperty().getScalarOpacity(0);
      const opacityPointValues = []; // Array to hold values
      // Gather Existing Values
      const size = ofun.getSize();
      for (let pointIdx = 0; pointIdx < size; pointIdx++) {
        const opacityPointValue = [0, 0, 0, 0];
        ofun.getNodeValue(pointIdx, opacityPointValue);
        // opacityPointValue now holds [xLocation, opacity, midpoint, sharpness]
        opacityPointValues.push(opacityPointValue);
      }
      // Add offset
      opacityPointValues.forEach(opacityPointValue => {
        opacityPointValue[0] += shift; // Change the location value
      });
      // Set new values
      ofun.removeAllPoints();
      opacityPointValues.forEach(opacityPointValue => {
        ofun.addPoint(...opacityPointValue);
      });
      viewport.render();
    },
    /**
     * Sets the volume lighting settings for a given viewport.
     * @param {string} viewportId - The ID of the viewport to set the lighting settings.
     * @param {Object} options - The lighting settings to be set.
     * @param {boolean} options.shade - The shade setting for the lighting.
     * @param {number} options.ambient - The ambient setting for the lighting.
     * @param {number} options.diffuse - The diffuse setting for the lighting.
     * @param {number} options.specular - The specular setting for the lighting.
     **/

    setVolumeLighting: ({
      viewportId,
      options
    }) => {
      const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
      const {
        actor
      } = viewport.getActors()[0];
      const property = actor.getProperty();
      if (options.shade !== undefined) {
        property.setShade(options.shade);
      }
      if (options.ambient !== undefined) {
        property.setAmbient(options.ambient);
      }
      if (options.diffuse !== undefined) {
        property.setDiffuse(options.diffuse);
      }
      if (options.specular !== undefined) {
        property.setSpecular(options.specular);
      }
      viewport.render();
    },
    resetCrosshairs: ({
      viewportId
    }) => {
      const crosshairInstances = [];
      const getCrosshairInstances = toolGroupId => {
        const toolGroup = toolGroupService.getToolGroup(toolGroupId);
        crosshairInstances.push(toolGroup.getToolInstance('Crosshairs'));
      };
      if (!viewportId) {
        const toolGroupIds = toolGroupService.getToolGroupIds();
        toolGroupIds.forEach(getCrosshairInstances);
      } else {
        const toolGroup = toolGroupService.getToolGroupForViewport(viewportId);
        getCrosshairInstances(toolGroup.id);
      }
      crosshairInstances.forEach(ins => {
        ins?.computeToolCenter();
      });
    },
    /**
     * Creates a labelmap for the active viewport
     */
    createLabelmapForViewport: async ({
      viewportId,
      options = {}
    }) => {
      const {
        viewportGridService,
        displaySetService,
        segmentationService
      } = servicesManager.services;
      const {
        viewports
      } = viewportGridService.getState();
      const targetViewportId = viewportId;
      const viewport = viewports.get(targetViewportId);

      // Todo: add support for multiple display sets
      const displaySetInstanceUID = options.displaySetInstanceUID || viewport.displaySetInstanceUIDs[0];
      const segs = segmentationService.getSegmentations();
      const label = options.label || `Segmentation ${segs.length + 1}`;
      const segmentationId = options.segmentationId || `${esm.utilities.uuidv4()}`;
      const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
      const generatedSegmentationId = await segmentationService.createLabelmapForDisplaySet(displaySet, {
        label,
        segmentationId,
        segments: options.createInitialSegment ? {
          1: {
            label: 'Segment 1',
            active: true
          }
        } : {}
      });
      await segmentationService.addSegmentationRepresentation(viewportId, {
        segmentationId,
        type: dist_esm.Enums.SegmentationRepresentations.Labelmap
      });
      return generatedSegmentationId;
    },
    /**
     * Sets the active segmentation for a viewport
     * @param props.segmentationId - The ID of the segmentation to set as active
     */
    setActiveSegmentation: ({
      segmentationId
    }) => {
      const {
        viewportGridService,
        segmentationService
      } = servicesManager.services;
      segmentationService.setActiveSegmentation(viewportGridService.getActiveViewportId(), segmentationId);
    },
    /**
     * Adds a new segment to a segmentation
     * @param props.segmentationId - The ID of the segmentation to add the segment to
     */
    addSegmentCommand: ({
      segmentationId
    }) => {
      const {
        segmentationService
      } = servicesManager.services;
      segmentationService.addSegment(segmentationId);
    },
    /**
     * Sets the active segment and jumps to its center
     * @param props.segmentationId - The ID of the segmentation
     * @param props.segmentIndex - The index of the segment to activate
     */
    setActiveSegmentAndCenterCommand: ({
      segmentationId,
      segmentIndex
    }) => {
      const {
        segmentationService
      } = servicesManager.services;
      segmentationService.setActiveSegment(segmentationId, segmentIndex);
      segmentationService.jumpToSegmentCenter(segmentationId, segmentIndex);
    },
    /**
     * Toggles the visibility of a segment
     * @param props.segmentationId - The ID of the segmentation
     * @param props.segmentIndex - The index of the segment
     * @param props.type - The type of visibility to toggle
     */
    toggleSegmentVisibilityCommand: ({
      segmentationId,
      segmentIndex,
      type
    }) => {
      const {
        segmentationService,
        viewportGridService
      } = servicesManager.services;
      segmentationService.toggleSegmentVisibility(viewportGridService.getActiveViewportId(), segmentationId, segmentIndex, type);
    },
    /**
     * Toggles the lock state of a segment
     * @param props.segmentationId - The ID of the segmentation
     * @param props.segmentIndex - The index of the segment
     */
    toggleSegmentLockCommand: ({
      segmentationId,
      segmentIndex
    }) => {
      const {
        segmentationService
      } = servicesManager.services;
      segmentationService.toggleSegmentLocked(segmentationId, segmentIndex);
    },
    /**
     * Toggles the visibility of a segmentation representation
     * @param props.segmentationId - The ID of the segmentation
     * @param props.type - The type of representation
     */
    toggleSegmentationVisibilityCommand: ({
      segmentationId,
      type
    }) => {
      const {
        segmentationService,
        viewportGridService
      } = servicesManager.services;
      segmentationService.toggleSegmentationRepresentationVisibility(viewportGridService.getActiveViewportId(), {
        segmentationId,
        type
      });
    },
    /**
     * Downloads a segmentation
     * @param props.segmentationId - The ID of the segmentation to download
     */
    downloadSegmentationCommand: ({
      segmentationId
    }) => {
      const {
        segmentationService
      } = servicesManager.services;
      segmentationService.downloadSegmentation(segmentationId);
    },
    /**
     * Stores a segmentation and shows it in the viewport
     * @param props.segmentationId - The ID of the segmentation to store
     */
    storeSegmentationCommand: async ({
      segmentationId
    }) => {
      const {
        segmentationService,
        viewportGridService
      } = servicesManager.services;
      const datasources = extensionManager.getActiveDataSource();
      const displaySetInstanceUIDs = await (0,default_src.createReportAsync)({
        servicesManager,
        getReport: () => commandsManager.runCommand('storeSegmentation', {
          segmentationId,
          dataSource: datasources[0]
        }),
        reportType: 'Segmentation'
      });
      if (displaySetInstanceUIDs) {
        segmentationService.remove(segmentationId);
        viewportGridService.setDisplaySetsForViewport({
          viewportId: viewportGridService.getActiveViewportId(),
          displaySetInstanceUIDs
        });
      }
    },
    /**
     * Downloads a segmentation as RTSS
     * @param props.segmentationId - The ID of the segmentation
     */
    downloadRTSSCommand: ({
      segmentationId
    }) => {
      const {
        segmentationService
      } = servicesManager.services;
      segmentationService.downloadRTSS(segmentationId);
    },
    /**
     * Sets the style for a segmentation
     * @param props.segmentationId - The ID of the segmentation
     * @param props.type - The type of style
     * @param props.key - The style key to set
     * @param props.value - The style value
     */
    setSegmentationStyleCommand: ({
      type,
      key,
      value
    }) => {
      const {
        segmentationService
      } = servicesManager.services;
      segmentationService.setStyle({
        type
      }, {
        [key]: value
      });
    },
    /**
     * Deletes a segment from a segmentation
     * @param props.segmentationId - The ID of the segmentation
     * @param props.segmentIndex - The index of the segment to delete
     */
    deleteSegmentCommand: ({
      segmentationId,
      segmentIndex
    }) => {
      const {
        segmentationService
      } = servicesManager.services;
      segmentationService.removeSegment(segmentationId, segmentIndex);
    },
    /**
     * Deletes an entire segmentation
     * @param props.segmentationId - The ID of the segmentation to delete
     */
    deleteSegmentationCommand: ({
      segmentationId
    }) => {
      const {
        segmentationService
      } = servicesManager.services;
      segmentationService.remove(segmentationId);
    },
    /**
     * Removes a segmentation from the viewport
     * @param props.segmentationId - The ID of the segmentation to remove
     */
    removeSegmentationFromViewportCommand: ({
      segmentationId
    }) => {
      const {
        segmentationService,
        viewportGridService
      } = servicesManager.services;
      segmentationService.removeSegmentationRepresentations(viewportGridService.getActiveViewportId(), {
        segmentationId
      });
    },
    /**
     * Toggles rendering of inactive segmentations
     */
    toggleRenderInactiveSegmentationsCommand: () => {
      const {
        segmentationService,
        viewportGridService
      } = servicesManager.services;
      const viewportId = viewportGridService.getActiveViewportId();
      const renderInactive = segmentationService.getRenderInactiveSegmentations(viewportId);
      segmentationService.setRenderInactiveSegmentations(viewportId, !renderInactive);
    },
    /**
     * Sets the fill alpha value for a segmentation type
     * @param props.type - The type of segmentation
     * @param props.value - The alpha value to set
     */
    setFillAlphaCommand: ({
      type,
      value
    }) => {
      const {
        segmentationService
      } = servicesManager.services;
      segmentationService.setStyle({
        type
      }, {
        fillAlpha: value
      });
    },
    /**
     * Sets the outline width for a segmentation type
     * @param props.type - The type of segmentation
     * @param props.value - The width value to set
     */
    setOutlineWidthCommand: ({
      type,
      value
    }) => {
      const {
        segmentationService
      } = servicesManager.services;
      segmentationService.setStyle({
        type
      }, {
        outlineWidth: value
      });
    },
    /**
     * Sets whether to render fill for a segmentation type
     * @param props.type - The type of segmentation
     * @param props.value - Whether to render fill
     */
    setRenderFillCommand: ({
      type,
      value
    }) => {
      const {
        segmentationService
      } = servicesManager.services;
      segmentationService.setStyle({
        type
      }, {
        renderFill: value
      });
    },
    /**
     * Sets whether to render outline for a segmentation type
     * @param props.type - The type of segmentation
     * @param props.value - Whether to render outline
     */
    setRenderOutlineCommand: ({
      type,
      value
    }) => {
      const {
        segmentationService
      } = servicesManager.services;
      segmentationService.setStyle({
        type
      }, {
        renderOutline: value
      });
    },
    /**
     * Sets the fill alpha for inactive segmentations
     * @param props.type - The type of segmentation
     * @param props.value - The alpha value to set
     */
    setFillAlphaInactiveCommand: ({
      type,
      value
    }) => {
      const {
        segmentationService
      } = servicesManager.services;
      segmentationService.setStyle({
        type
      }, {
        fillAlphaInactive: value
      });
    },
    editSegmentLabel: ({
      segmentationId,
      segmentIndex
    }) => {
      const {
        segmentationService,
        uiDialogService
      } = servicesManager.services;
      const segmentation = segmentationService.getSegmentation(segmentationId);
      if (!segmentation) {
        return;
      }
      const segment = segmentation.segments[segmentIndex];
      const {
        label
      } = segment;
      const callback = (label, actionId) => {
        if (label === '') {
          return;
        }
        segmentationService.setSegmentLabel(segmentationId, segmentIndex, label);
      };
      (0,default_src.callInputDialog)(uiDialogService, label, callback, false, {
        dialogTitle: 'Edit Segment Label',
        inputLabel: 'Enter new label'
      });
    },
    editSegmentationLabel: ({
      segmentationId
    }) => {
      const {
        segmentationService,
        uiDialogService
      } = servicesManager.services;
      const segmentation = segmentationService.getSegmentation(segmentationId);
      if (!segmentation) {
        return;
      }
      const {
        label
      } = segmentation;
      const callback = (label, actionId) => {
        if (label === '') {
          return;
        }
        segmentationService.addOrUpdateSegmentation({
          segmentationId,
          label
        });
      };
      (0,default_src.callInputDialog)(uiDialogService, label, callback, false, {
        dialogTitle: 'Edit Segmentation Label',
        inputLabel: 'Enter new label'
      });
    },
    editSegmentColor: ({
      segmentationId,
      segmentIndex
    }) => {
      const {
        segmentationService,
        uiDialogService,
        viewportGridService
      } = servicesManager.services;
      const viewportId = viewportGridService.getActiveViewportId();
      const color = segmentationService.getSegmentColor(viewportId, segmentationId, segmentIndex);
      const rgbaColor = {
        r: color[0],
        g: color[1],
        b: color[2],
        a: color[3] / 255.0
      };
      (0,default_src.colorPickerDialog)(uiDialogService, rgbaColor, (newRgbaColor, actionId) => {
        if (actionId === 'cancel') {
          return;
        }
        const color = [newRgbaColor.r, newRgbaColor.g, newRgbaColor.b, newRgbaColor.a * 255.0];
        segmentationService.setSegmentColor(viewportId, segmentationId, segmentIndex, color);
      });
    },
    getRenderInactiveSegmentations: () => {
      const {
        segmentationService,
        viewportGridService
      } = servicesManager.services;
      return segmentationService.getRenderInactiveSegmentations(viewportGridService.getActiveViewportId());
    }
  };
  const definitions = {
    // The command here is to show the viewer context menu, as being the
    // context menu
    showCornerstoneContextMenu: {
      commandFn: actions.showCornerstoneContextMenu,
      options: {
        menuCustomizationId: 'measurementsContextMenu',
        commands: [{
          commandName: 'showContextMenu'
        }]
      }
    },
    getNearbyToolData: {
      commandFn: actions.getNearbyToolData
    },
    getNearbyAnnotation: {
      commandFn: actions.getNearbyAnnotation,
      storeContexts: [],
      options: {}
    },
    toggleViewportColorbar: {
      commandFn: actions.toggleViewportColorbar
    },
    deleteMeasurement: {
      commandFn: actions.deleteMeasurement
    },
    setMeasurementLabel: {
      commandFn: actions.setMeasurementLabel
    },
    updateMeasurement: {
      commandFn: actions.updateMeasurement
    },
    setViewportWindowLevel: {
      commandFn: actions.setViewportWindowLevel
    },
    setWindowLevel: {
      commandFn: actions.setWindowLevel
    },
    setToolActive: {
      commandFn: actions.setToolActive
    },
    setToolActiveToolbar: {
      commandFn: actions.setToolActiveToolbar
    },
    setToolEnabled: {
      commandFn: actions.setToolEnabled
    },
    rotateViewportCW: {
      commandFn: actions.rotateViewport,
      options: {
        rotation: 90
      }
    },
    rotateViewportCCW: {
      commandFn: actions.rotateViewport,
      options: {
        rotation: -90
      }
    },
    incrementActiveViewport: {
      commandFn: actions.changeActiveViewport
    },
    decrementActiveViewport: {
      commandFn: actions.changeActiveViewport,
      options: {
        direction: -1
      }
    },
    flipViewportHorizontal: {
      commandFn: actions.flipViewportHorizontal
    },
    flipViewportVertical: {
      commandFn: actions.flipViewportVertical
    },
    invertViewport: {
      commandFn: actions.invertViewport
    },
    resetViewport: {
      commandFn: actions.resetViewport
    },
    scaleUpViewport: {
      commandFn: actions.scaleViewport,
      options: {
        direction: 1
      }
    },
    scaleDownViewport: {
      commandFn: actions.scaleViewport,
      options: {
        direction: -1
      }
    },
    fitViewportToWindow: {
      commandFn: actions.scaleViewport,
      options: {
        direction: 0
      }
    },
    nextImage: {
      commandFn: actions.scroll,
      options: {
        direction: 1
      }
    },
    previousImage: {
      commandFn: actions.scroll,
      options: {
        direction: -1
      }
    },
    firstImage: {
      commandFn: actions.jumpToImage,
      options: {
        imageIndex: 0
      }
    },
    lastImage: {
      commandFn: actions.jumpToImage,
      options: {
        imageIndex: -1
      }
    },
    jumpToImage: {
      commandFn: actions.jumpToImage
    },
    showDownloadViewportModal: {
      commandFn: actions.showDownloadViewportModal
    },
    toggleCine: {
      commandFn: actions.toggleCine
    },
    arrowTextCallback: {
      commandFn: actions.arrowTextCallback
    },
    setViewportActive: {
      commandFn: actions.setViewportActive
    },
    setViewportColormap: {
      commandFn: actions.setViewportColormap
    },
    setSourceViewportForReferenceLinesTool: {
      commandFn: actions.setSourceViewportForReferenceLinesTool
    },
    storePresentation: {
      commandFn: actions.storePresentation
    },
    attachProtocolViewportDataListener: {
      commandFn: actions.attachProtocolViewportDataListener
    },
    setViewportPreset: {
      commandFn: actions.setViewportPreset
    },
    setVolumeRenderingQulaity: {
      commandFn: actions.setVolumeRenderingQulaity
    },
    shiftVolumeOpacityPoints: {
      commandFn: actions.shiftVolumeOpacityPoints
    },
    setVolumeLighting: {
      commandFn: actions.setVolumeLighting
    },
    resetCrosshairs: {
      commandFn: actions.resetCrosshairs
    },
    toggleSynchronizer: {
      commandFn: actions.toggleSynchronizer
    },
    updateVolumeData: {
      commandFn: actions.updateVolumeData
    },
    toggleEnabledDisabledToolbar: {
      commandFn: actions.toggleEnabledDisabledToolbar
    },
    toggleActiveDisabledToolbar: {
      commandFn: actions.toggleActiveDisabledToolbar
    },
    updateStoredPositionPresentation: {
      commandFn: actions.updateStoredPositionPresentation
    },
    updateStoredSegmentationPresentation: {
      commandFn: actions.updateStoredSegmentationPresentation
    },
    createLabelmapForViewport: {
      commandFn: actions.createLabelmapForViewport
    },
    setActiveSegmentation: {
      commandFn: actions.setActiveSegmentation
    },
    addSegment: {
      commandFn: actions.addSegmentCommand
    },
    setActiveSegmentAndCenter: {
      commandFn: actions.setActiveSegmentAndCenterCommand
    },
    toggleSegmentVisibility: {
      commandFn: actions.toggleSegmentVisibilityCommand
    },
    toggleSegmentLock: {
      commandFn: actions.toggleSegmentLockCommand
    },
    toggleSegmentationVisibility: {
      commandFn: actions.toggleSegmentationVisibilityCommand
    },
    downloadSegmentation: {
      commandFn: actions.downloadSegmentationCommand
    },
    storeSegmentation: {
      commandFn: actions.storeSegmentationCommand
    },
    downloadRTSS: {
      commandFn: actions.downloadRTSSCommand
    },
    setSegmentationStyle: {
      commandFn: actions.setSegmentationStyleCommand
    },
    deleteSegment: {
      commandFn: actions.deleteSegmentCommand
    },
    deleteSegmentation: {
      commandFn: actions.deleteSegmentationCommand
    },
    removeSegmentationFromViewport: {
      commandFn: actions.removeSegmentationFromViewportCommand
    },
    toggleRenderInactiveSegmentations: {
      commandFn: actions.toggleRenderInactiveSegmentationsCommand
    },
    setFillAlpha: {
      commandFn: actions.setFillAlphaCommand
    },
    setOutlineWidth: {
      commandFn: actions.setOutlineWidthCommand
    },
    setRenderFill: {
      commandFn: actions.setRenderFillCommand
    },
    setRenderOutline: {
      commandFn: actions.setRenderOutlineCommand
    },
    setFillAlphaInactive: {
      commandFn: actions.setFillAlphaInactiveCommand
    },
    editSegmentLabel: {
      commandFn: actions.editSegmentLabel
    },
    editSegmentationLabel: {
      commandFn: actions.editSegmentationLabel
    },
    editSegmentColor: {
      commandFn: actions.editSegmentColor
    },
    getRenderInactiveSegmentations: {
      commandFn: actions.getRenderInactiveSegmentations
    }
  };
  return {
    actions,
    definitions,
    defaultContext: 'CORNERSTONE'
  };
}
/* harmony default export */ const src_commandsModule = (commandsModule);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/hps/fourUp.ts
const fourUp = {
  id: 'fourUp',
  locked: true,
  name: '3D four up',
  icon: 'layout-advanced-3d-four-up',
  isPreset: true,
  createdDate: '2023-03-15T10:29:44.894Z',
  modifiedDate: '2023-03-15T10:29:44.894Z',
  availableTo: {},
  editableBy: {},
  protocolMatchingRules: [],
  imageLoadStrategy: 'interleaveCenter',
  displaySetSelectors: {
    activeDisplaySet: {
      seriesMatchingRules: [{
        weight: 1,
        attribute: 'isReconstructable',
        constraint: {
          equals: {
            value: true
          }
        },
        required: true
      }]
    }
  },
  stages: [{
    id: 'fourUpStage',
    name: 'fourUp',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 2
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'axial',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [{
          type: 'voi',
          id: 'mpr',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }]
      },
      displaySets: [{
        id: 'activeDisplaySet'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'volume3d',
        viewportType: 'volume3d',
        orientation: 'coronal',
        customViewportProps: {
          hideOverlays: true
        }
      },
      displaySets: [{
        id: 'activeDisplaySet',
        options: {
          displayPreset: {
            CT: 'CT-Bone',
            MR: 'MR-Default',
            default: 'CT-Bone'
          }
        }
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'coronal',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [{
          type: 'voi',
          id: 'mpr',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }]
      },
      displaySets: [{
        id: 'activeDisplaySet'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'sagittal',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [{
          type: 'voi',
          id: 'mpr',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }]
      },
      displaySets: [{
        id: 'activeDisplaySet'
      }]
    }]
  }]
};
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/hps/main3D.ts
const main3D = {
  id: 'main3D',
  locked: true,
  name: '3D main',
  icon: 'layout-advanced-3d-main',
  isPreset: true,
  createdDate: '2023-03-15T10:29:44.894Z',
  modifiedDate: '2023-03-15T10:29:44.894Z',
  availableTo: {},
  editableBy: {},
  protocolMatchingRules: [],
  imageLoadStrategy: 'interleaveCenter',
  displaySetSelectors: {
    activeDisplaySet: {
      seriesMatchingRules: [{
        weight: 1,
        attribute: 'isReconstructable',
        constraint: {
          equals: {
            value: true
          }
        },
        required: true
      }]
    }
  },
  stages: [{
    id: 'main3DStage',
    name: 'main3D',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 3,
        layoutOptions: [{
          x: 0,
          y: 0,
          width: 1,
          height: 1 / 2
        }, {
          x: 0,
          y: 1 / 2,
          width: 1 / 3,
          height: 1 / 2
        }, {
          x: 1 / 3,
          y: 1 / 2,
          width: 1 / 3,
          height: 1 / 2
        }, {
          x: 2 / 3,
          y: 1 / 2,
          width: 1 / 3,
          height: 1 / 2
        }]
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'volume3d',
        viewportType: 'volume3d',
        orientation: 'coronal',
        customViewportProps: {
          hideOverlays: true
        }
      },
      displaySets: [{
        id: 'activeDisplaySet',
        options: {
          displayPreset: {
            CT: 'CT-Bone',
            MR: 'MR-Default',
            default: 'CT-Bone'
          }
        }
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'axial',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [{
          type: 'voi',
          id: 'mpr',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }]
      },
      displaySets: [{
        id: 'activeDisplaySet'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'coronal',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [{
          type: 'voi',
          id: 'mpr',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }]
      },
      displaySets: [{
        id: 'activeDisplaySet'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'sagittal',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [{
          type: 'voi',
          id: 'mpr',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }]
      },
      displaySets: [{
        id: 'activeDisplaySet'
      }]
    }]
  }]
};
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/hps/mpr.ts
const VOI_SYNC_GROUP = {
  type: 'voi',
  id: 'mpr',
  source: true,
  target: true,
  options: {
    syncColormap: true
  }
};
const HYDRATE_SEG_SYNC_GROUP = {
  type: 'hydrateseg',
  id: 'sameFORId',
  source: true,
  target: true,
  options: {
    matchingRules: ['sameFOR']
  }
};
const mpr = {
  id: 'mpr',
  name: 'MPR',
  locked: true,
  icon: 'layout-advanced-mpr',
  isPreset: true,
  createdDate: '2021-02-23',
  modifiedDate: '2023-08-15',
  availableTo: {},
  editableBy: {},
  numberOfPriorsReferenced: 0,
  protocolMatchingRules: [],
  imageLoadStrategy: 'nth',
  callbacks: {},
  displaySetSelectors: {
    activeDisplaySet: {
      seriesMatchingRules: [{
        weight: 1,
        attribute: 'isReconstructable',
        constraint: {
          equals: {
            value: true
          }
        },
        required: true
      }]
    }
  },
  stages: [{
    name: 'MPR 1x3',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 3,
        layoutOptions: [{
          x: 0,
          y: 0,
          width: 1 / 3,
          height: 1
        }, {
          x: 1 / 3,
          y: 0,
          width: 1 / 3,
          height: 1
        }, {
          x: 2 / 3,
          y: 0,
          width: 1 / 3,
          height: 1
        }]
      }
    },
    viewports: [{
      viewportOptions: {
        viewportId: 'mpr-axial',
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'axial',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [VOI_SYNC_GROUP, HYDRATE_SEG_SYNC_GROUP]
      },
      displaySets: [{
        id: 'activeDisplaySet'
      }]
    }, {
      viewportOptions: {
        viewportId: 'mpr-sagittal',
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'sagittal',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [VOI_SYNC_GROUP, HYDRATE_SEG_SYNC_GROUP]
      },
      displaySets: [{
        id: 'activeDisplaySet'
      }]
    }, {
      viewportOptions: {
        viewportId: 'mpr-coronal',
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'coronal',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [VOI_SYNC_GROUP, HYDRATE_SEG_SYNC_GROUP]
      },
      displaySets: [{
        id: 'activeDisplaySet'
      }]
    }]
  }]
};
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/hps/mprAnd3DVolumeViewport.ts
const mprAnd3DVolumeViewport = {
  id: 'mprAnd3DVolumeViewport',
  locked: true,
  name: 'mpr',
  createdDate: '2023-03-15T10:29:44.894Z',
  modifiedDate: '2023-03-15T10:29:44.894Z',
  availableTo: {},
  editableBy: {},
  protocolMatchingRules: [],
  imageLoadStrategy: 'interleaveCenter',
  displaySetSelectors: {
    activeDisplaySet: {
      seriesMatchingRules: [{
        weight: 1,
        attribute: 'isReconstructable',
        constraint: {
          equals: {
            value: true
          }
        },
        required: true
      }, {
        attribute: 'Modality',
        constraint: {
          equals: {
            value: 'CT'
          }
        },
        required: true
      }]
    }
  },
  stages: [{
    id: 'mpr3Stage',
    name: 'mpr',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 2
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'axial',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [{
          type: 'voi',
          id: 'mpr',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }]
      },
      displaySets: [{
        id: 'activeDisplaySet'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'volume3d',
        viewportType: 'volume3d',
        orientation: 'coronal',
        customViewportProps: {
          hideOverlays: true
        }
      },
      displaySets: [{
        id: 'activeDisplaySet',
        options: {
          displayPreset: {
            CT: 'CT-Bone',
            MR: 'MR-Default',
            default: 'CT-Bone'
          }
        }
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'coronal',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [{
          type: 'voi',
          id: 'mpr',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }]
      },
      displaySets: [{
        id: 'activeDisplaySet'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'sagittal',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [{
          type: 'voi',
          id: 'mpr',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }]
      },
      displaySets: [{
        id: 'activeDisplaySet'
      }]
    }]
  }]
};
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/hps/only3D.ts
const only3D = {
  id: 'only3D',
  locked: true,
  name: '3D only',
  icon: 'layout-advanced-3d-only',
  isPreset: true,
  createdDate: '2023-03-15T10:29:44.894Z',
  modifiedDate: '2023-03-15T10:29:44.894Z',
  availableTo: {},
  editableBy: {},
  protocolMatchingRules: [],
  imageLoadStrategy: 'interleaveCenter',
  displaySetSelectors: {
    activeDisplaySet: {
      seriesMatchingRules: [{
        weight: 1,
        attribute: 'isReconstructable',
        constraint: {
          equals: {
            value: true
          }
        },
        required: true
      }]
    }
  },
  stages: [{
    id: 'only3DStage',
    name: 'only3D',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 1
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'volume3d',
        viewportType: 'volume3d',
        orientation: 'coronal',
        customViewportProps: {
          hideOverlays: true
        }
      },
      displaySets: [{
        id: 'activeDisplaySet',
        options: {
          displayPreset: {
            CT: 'CT-Bone',
            MR: 'MR-Default',
            default: 'CT-Bone'
          }
        }
      }]
    }]
  }]
};
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/hps/primary3D.ts
const primary3D = {
  id: 'primary3D',
  locked: true,
  name: '3D primary',
  icon: 'layout-advanced-3d-primary',
  isPreset: true,
  createdDate: '2023-03-15T10:29:44.894Z',
  modifiedDate: '2023-03-15T10:29:44.894Z',
  availableTo: {},
  editableBy: {},
  protocolMatchingRules: [],
  imageLoadStrategy: 'interleaveCenter',
  displaySetSelectors: {
    activeDisplaySet: {
      seriesMatchingRules: [{
        weight: 1,
        attribute: 'isReconstructable',
        constraint: {
          equals: {
            value: true
          }
        },
        required: true
      }]
    }
  },
  stages: [{
    id: 'primary3DStage',
    name: 'primary3D',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 3,
        columns: 3,
        layoutOptions: [{
          x: 0,
          y: 0,
          width: 2 / 3,
          height: 1
        }, {
          x: 2 / 3,
          y: 0,
          width: 1 / 3,
          height: 1 / 3
        }, {
          x: 2 / 3,
          y: 1 / 3,
          width: 1 / 3,
          height: 1 / 3
        }, {
          x: 2 / 3,
          y: 2 / 3,
          width: 1 / 3,
          height: 1 / 3
        }]
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'volume3d',
        viewportType: 'volume3d',
        orientation: 'coronal',
        customViewportProps: {
          hideOverlays: true
        }
      },
      displaySets: [{
        id: 'activeDisplaySet',
        options: {
          displayPreset: {
            CT: 'CT-Bone',
            MR: 'MR-Default',
            default: 'CT-Bone'
          }
        }
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'axial',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [{
          type: 'voi',
          id: 'mpr',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }]
      },
      displaySets: [{
        id: 'activeDisplaySet'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'coronal',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [{
          type: 'voi',
          id: 'mpr',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }]
      },
      displaySets: [{
        id: 'activeDisplaySet'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'sagittal',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [{
          type: 'voi',
          id: 'mpr',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }]
      },
      displaySets: [{
        id: 'activeDisplaySet'
      }]
    }]
  }]
};
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/hps/primaryAxial.ts
const primaryAxial = {
  id: 'primaryAxial',
  locked: true,
  name: 'Axial Primary',
  icon: 'layout-advanced-axial-primary',
  isPreset: true,
  createdDate: '2023-03-15T10:29:44.894Z',
  modifiedDate: '2023-03-15T10:29:44.894Z',
  availableTo: {},
  editableBy: {},
  protocolMatchingRules: [],
  imageLoadStrategy: 'interleaveCenter',
  displaySetSelectors: {
    activeDisplaySet: {
      seriesMatchingRules: [{
        weight: 1,
        attribute: 'isReconstructable',
        constraint: {
          equals: {
            value: true
          }
        },
        required: true
      }]
    }
  },
  stages: [{
    id: 'primaryAxialStage',
    name: 'primaryAxial',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 3,
        layoutOptions: [{
          x: 0,
          y: 0,
          width: 2 / 3,
          height: 1
        }, {
          x: 2 / 3,
          y: 0,
          width: 1 / 3,
          height: 1 / 2
        }, {
          x: 2 / 3,
          y: 1 / 2,
          width: 1 / 3,
          height: 1 / 2
        }]
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'axial',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [{
          type: 'voi',
          id: 'mpr',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }]
      },
      displaySets: [{
        id: 'activeDisplaySet'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'sagittal',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [{
          type: 'voi',
          id: 'mpr',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }]
      },
      displaySets: [{
        id: 'activeDisplaySet'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'mpr',
        viewportType: 'volume',
        orientation: 'coronal',
        initialImageOptions: {
          preset: 'middle'
        },
        syncGroups: [{
          type: 'voi',
          id: 'mpr',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }]
      },
      displaySets: [{
        id: 'activeDisplaySet'
      }]
    }]
  }]
};
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/hps/frameView.ts
const frameView = {
  id: '@ohif/frameView',
  description: 'Frame view for the active series',
  name: 'Frame View',
  icon: 'tool-stack-scroll',
  isPreset: true,
  toolGroupIds: ['default'],
  protocolMatchingRules: [],
  displaySetSelectors: {
    defaultDisplaySetId: {
      seriesMatchingRules: [{
        attribute: 'numImageFrames',
        constraint: {
          greaterThan: {
            value: 16
          }
        },
        required: true
      }, {
        attribute: 'isDisplaySetFromUrl',
        weight: 10,
        constraint: {
          equals: true
        }
      }]
    }
  },
  defaultViewport: {
    viewportOptions: {
      viewportType: 'stack',
      toolGroupId: 'default',
      allowUnmatchedView: true
    },
    displaySets: [{
      id: 'defaultDisplaySetId',
      matchedDisplaySetsIndex: -1
    }]
  },
  stages: [{
    name: 'frameView',
    id: '4x4',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 4,
        columns: 4
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 0
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 1
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 2
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 3
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 4
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 5
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 6
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 7
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 8
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 9
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 10
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 11
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 12
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 13
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 14
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 15
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }]
  }, {
    name: 'frameView',
    id: '3x3',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 3,
        columns: 3
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 0
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 1
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 2
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 3
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 4
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 5
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 6
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 7
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 8
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }]
  }, {
    name: 'frameView',
    id: '3x2',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 3
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 0
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 1
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 2
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 3
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 4
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 5
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }]
  }, {
    name: 'frameView',
    id: '2x2',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 2
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 0
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 1
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 2
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 3
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }]
  }, {
    name: 'frameView',
    id: '1x3',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 3
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 0
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 1
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 2
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }]
  }, {
    name: 'frameView',
    id: '1x2',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 2
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 0
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        syncGroups: [{
          type: 'zoompan',
          id: 'zoompansync',
          source: true,
          target: true
        }, {
          type: 'voi',
          id: 'wlsync',
          source: true,
          target: true,
          options: {
            syncColormap: true
          }
        }, {
          type: 'frameview',
          id: 'frameViewSync',
          source: true,
          target: true,
          options: {
            viewportIndex: 1
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }]
  }]
};

;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/getHangingProtocolModule.ts








function getHangingProtocolModule() {
  return [{
    name: mpr.id,
    protocol: mpr
  }, {
    name: mprAnd3DVolumeViewport.id,
    protocol: mprAnd3DVolumeViewport
  }, {
    name: fourUp.id,
    protocol: fourUp
  }, {
    name: main3D.id,
    protocol: main3D
  }, {
    name: primaryAxial.id,
    protocol: primaryAxial
  }, {
    name: only3D.id,
    protocol: only3D
  }, {
    name: primary3D.id,
    protocol: primary3D
  }, {
    name: frameView.id,
    protocol: frameView
  }];
}
/* harmony default export */ const src_getHangingProtocolModule = (getHangingProtocolModule);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/getToolbarModule.tsx

const getToggledClassName = isToggled => {
  return isToggled ? '!text-primary-active' : '!text-common-bright hover:!bg-primary-dark hover:text-primary-light';
};
const getDisabledState = disabledText => ({
  disabled: true,
  className: '!text-common-bright ohif-disabled',
  disabledText: disabledText ?? 'Not available on the current viewport'
});
function getToolbarModule({
  commandsManager,
  servicesManager
}) {
  const {
    toolGroupService,
    toolbarService,
    syncGroupService,
    cornerstoneViewportService,
    hangingProtocolService,
    displaySetService,
    viewportGridService
  } = servicesManager.services;
  return [
  // functions/helpers to be used by the toolbar buttons to decide if they should
  // enabled or not
  {
    name: 'evaluate.viewport.supported',
    evaluate: ({
      viewportId,
      unsupportedViewportTypes,
      disabledText
    }) => {
      const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
      if (viewport && unsupportedViewportTypes?.includes(viewport.type)) {
        return getDisabledState(disabledText);
      }
      return undefined;
    }
  }, {
    name: 'evaluate.modality.supported',
    evaluate: ({
      viewportId,
      unsupportedModalities,
      supportedModalities,
      disabledText
    }) => {
      const displaySetUIDs = viewportGridService.getDisplaySetsUIDsForViewport(viewportId);
      if (!displaySetUIDs?.length) {
        return;
      }
      const displaySets = displaySetUIDs.map(displaySetService.getDisplaySetByUID);

      // Check for unsupported modalities (exclusion)
      if (unsupportedModalities?.length) {
        const hasUnsupportedModality = displaySets.some(displaySet => unsupportedModalities.includes(displaySet?.Modality));
        if (hasUnsupportedModality) {
          return getDisabledState(disabledText);
        }
      }

      // Check for supported modalities (inclusion)
      if (supportedModalities?.length) {
        const hasAnySupportedModality = displaySets.some(displaySet => supportedModalities.includes(displaySet?.Modality));
        if (!hasAnySupportedModality) {
          return getDisabledState(disabledText || 'Tool not available for this modality');
        }
      }
    }
  }, {
    name: 'evaluate.cornerstoneTool',
    evaluate: ({
      viewportId,
      button,
      toolNames,
      disabledText
    }) => {
      const toolGroup = toolGroupService.getToolGroupForViewport(viewportId);
      if (!toolGroup) {
        return;
      }
      const toolName = toolbarService.getToolNameForButton(button);
      if (!toolGroup || !toolGroup.hasTool(toolName) && !toolNames) {
        return getDisabledState(disabledText);
      }
      const isPrimaryActive = toolNames ? toolNames.includes(toolGroup.getActivePrimaryMouseButtonTool()) : toolGroup.getActivePrimaryMouseButtonTool() === toolName;
      return {
        disabled: false,
        className: isPrimaryActive ? '!text-black bg-primary-light rounded' : '!text-common-bright hover:!bg-primary-dark hover:!text-primary-light rounded',
        // Todo: isActive right now is used for nested buttons where the primary
        // button needs to be fully rounded (vs partial rounded) when active
        // otherwise it does not have any other use
        isActive: isPrimaryActive
      };
    }
  }, {
    name: 'evaluate.group.promoteToPrimaryIfCornerstoneToolNotActiveInTheList',
    evaluate: ({
      viewportId,
      button,
      itemId
    }) => {
      const {
        items
      } = button.props;
      const toolGroup = toolGroupService.getToolGroupForViewport(viewportId);
      if (!toolGroup) {
        return {
          primary: button.props.primary,
          items
        };
      }
      const activeToolName = toolGroup.getActivePrimaryMouseButtonTool();

      // check if the active toolName is part of the items then we need
      // to move it to the primary button
      const activeToolIndex = items.findIndex(item => {
        const toolName = toolbarService.getToolNameForButton(item);
        return toolName === activeToolName;
      });

      // if there is an active tool in the items dropdown bound to the primary mouse/touch
      // we should show that no matter what
      if (activeToolIndex > -1) {
        return {
          primary: items[activeToolIndex],
          items
        };
      }
      if (!itemId) {
        return {
          primary: button.props.primary,
          items
        };
      }

      // other wise we can move the clicked tool to the primary button
      const clickedItemProps = items.find(item => item.id === itemId || item.itemId === itemId);
      return {
        primary: clickedItemProps,
        items
      };
    }
  }, {
    name: 'evaluate.action',
    evaluate: ({
      viewportId,
      button
    }) => {
      return {
        className: '!text-common-bright hover:!bg-primary-dark hover:text-primary-light'
      };
    }
  }, {
    name: 'evaluate.cornerstoneTool.toggle.ifStrictlyDisabled',
    evaluate: ({
      viewportId,
      button,
      disabledText
    }) => _evaluateToggle({
      viewportId,
      button,
      toolbarService,
      disabledText,
      offModes: [dist_esm.Enums.ToolModes.Disabled],
      toolGroupService
    })
  }, {
    name: 'evaluate.cornerstoneTool.toggle',
    evaluate: ({
      viewportId,
      button,
      disabledText
    }) => _evaluateToggle({
      viewportId,
      button,
      toolbarService,
      disabledText,
      offModes: [dist_esm.Enums.ToolModes.Disabled, dist_esm.Enums.ToolModes.Passive],
      toolGroupService
    })
  }, {
    name: 'evaluate.cornerstone.synchronizer',
    evaluate: ({
      viewportId,
      button
    }) => {
      let synchronizers = syncGroupService.getSynchronizersForViewport(viewportId);
      if (!synchronizers?.length) {
        return {
          className: getToggledClassName(false)
        };
      }
      const isArray = Array.isArray(button.commands);
      const synchronizerType = isArray ? button.commands?.[0].commandOptions.type : button.commands?.commandOptions.type;
      synchronizers = syncGroupService.getSynchronizersOfType(synchronizerType);
      if (!synchronizers?.length) {
        return {
          className: getToggledClassName(false)
        };
      }

      // Todo: we need a better way to find the synchronizers based on their
      // type, but for now we just check the first one and see if it is
      // enabled
      const synchronizer = synchronizers[0];
      const isEnabled = synchronizer?._enabled;
      return {
        className: getToggledClassName(isEnabled)
      };
    }
  }, {
    name: 'evaluate.viewportProperties.toggle',
    evaluate: ({
      viewportId,
      button
    }) => {
      const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
      if (!viewport || viewport.isDisabled) {
        return;
      }
      const propId = button.id;
      const properties = viewport.getProperties();
      const camera = viewport.getCamera();
      const prop = camera?.[propId] || properties?.[propId];
      if (!prop) {
        return {
          disabled: false,
          className: '!text-common-bright hover:!bg-primary-dark hover:text-primary-light'
        };
      }
      const isToggled = prop;
      return {
        className: getToggledClassName(isToggled)
      };
    }
  }, {
    name: 'evaluate.mpr',
    evaluate: ({
      viewportId,
      disabledText = 'Selected viewport is not reconstructable'
    }) => {
      const {
        protocol
      } = hangingProtocolService.getActiveProtocol();
      const displaySetUIDs = viewportGridService.getDisplaySetsUIDsForViewport(viewportId);
      if (!displaySetUIDs?.length) {
        return;
      }
      const displaySets = displaySetUIDs.map(displaySetService.getDisplaySetByUID);
      const areReconstructable = displaySets.every(displaySet => {
        return displaySet?.isReconstructable;
      });
      if (!areReconstructable) {
        return getDisabledState(disabledText);
      }
      const isMpr = protocol?.id === 'mpr';
      return {
        disabled: false,
        className: getToggledClassName(isMpr)
      };
    }
  }];
}
function _evaluateToggle({
  viewportId,
  toolbarService,
  button,
  disabledText,
  offModes,
  toolGroupService
}) {
  const toolGroup = toolGroupService.getToolGroupForViewport(viewportId);
  if (!toolGroup) {
    return;
  }
  const toolName = toolbarService.getToolNameForButton(button);
  if (!toolGroup.hasTool(toolName)) {
    return getDisabledState(disabledText);
  }
  const isOff = offModes.includes(toolGroup.getToolOptions(toolName).mode);
  return {
    className: getToggledClassName(!isOff)
  };
}
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/services/ToolGroupService/ToolGroupService.ts
var _ToolGroupService;




const EVENTS = {
  VIEWPORT_ADDED: 'event::cornerstone::toolgroupservice:viewportadded',
  TOOLGROUP_CREATED: 'event::cornerstone::toolgroupservice:toolgroupcreated',
  TOOL_ACTIVATED: 'event::cornerstone::toolgroupservice:toolactivated',
  PRIMARY_TOOL_ACTIVATED: 'event::cornerstone::toolgroupservice:primarytoolactivated'
};
class ToolGroupService {
  constructor(servicesManager) {
    this.servicesManager = void 0;
    this.cornerstoneViewportService = void 0;
    this.viewportGridService = void 0;
    this.uiNotificationService = void 0;
    this.toolGroupIds = new Set();
    /**
     * Service-specific
     */
    this.listeners = void 0;
    this.EVENTS = void 0;
    this._onToolActivated = evt => {
      const {
        toolGroupId,
        toolName,
        toolBindingsOptions
      } = evt.detail;
      const isPrimaryTool = toolBindingsOptions.bindings?.some(binding => binding.mouseButton === dist_esm.Enums.MouseBindings.Primary);
      const callbackProps = {
        toolGroupId,
        toolName,
        toolBindingsOptions
      };
      this._broadcastEvent(EVENTS.TOOL_ACTIVATED, callbackProps);
      if (isPrimaryTool) {
        this._broadcastEvent(EVENTS.PRIMARY_TOOL_ACTIVATED, callbackProps);
      }
    };
    const {
      cornerstoneViewportService,
      viewportGridService,
      uiNotificationService
    } = servicesManager.services;
    this.cornerstoneViewportService = cornerstoneViewportService;
    this.viewportGridService = viewportGridService;
    this.uiNotificationService = uiNotificationService;
    this.listeners = {};
    this.EVENTS = EVENTS;
    Object.assign(this, src/* pubSubServiceInterface */.Ml);
    this._init();
  }
  onModeExit() {
    this.destroy();
  }
  _init() {
    esm.eventTarget.addEventListener(dist_esm.Enums.Events.TOOL_ACTIVATED, this._onToolActivated);
  }

  /**
   * Retrieves a tool group from the ToolGroupManager by tool group ID.
   * If no tool group ID is provided, it retrieves the tool group of the active viewport.
   * @param toolGroupId - Optional ID of the tool group to retrieve.
   * @returns The tool group or undefined if it is not found.
   */
  getToolGroup(toolGroupId) {
    let toolGroupIdToUse = toolGroupId;
    if (!toolGroupIdToUse) {
      // Use the active viewport's tool group if no tool group id is provided
      const enabledElement = getActiveViewportEnabledElement(this.viewportGridService);
      if (!enabledElement) {
        return;
      }
      const {
        renderingEngineId,
        viewportId
      } = enabledElement;
      const toolGroup = dist_esm.ToolGroupManager.getToolGroupForViewport(viewportId, renderingEngineId);
      if (!toolGroup) {
        console.warn('No tool group found for viewportId:', viewportId, 'and renderingEngineId:', renderingEngineId);
        return;
      }
      toolGroupIdToUse = toolGroup.id;
    }
    const toolGroup = dist_esm.ToolGroupManager.getToolGroup(toolGroupIdToUse);
    return toolGroup;
  }
  getToolGroupIds() {
    return Array.from(this.toolGroupIds);
  }
  getToolGroupForViewport(viewportId) {
    const renderingEngine = this.cornerstoneViewportService.getRenderingEngine();
    return dist_esm.ToolGroupManager.getToolGroupForViewport(viewportId, renderingEngine.id);
  }
  getActiveToolForViewport(viewportId) {
    const toolGroup = this.getToolGroupForViewport(viewportId);
    if (!toolGroup) {
      return;
    }
    return toolGroup.getActivePrimaryMouseButtonTool();
  }
  destroy() {
    dist_esm.ToolGroupManager.destroy();
    this.toolGroupIds = new Set();
    esm.eventTarget.removeEventListener(dist_esm.Enums.Events.TOOL_ACTIVATED, this._onToolActivated);
  }
  destroyToolGroup(toolGroupId) {
    dist_esm.ToolGroupManager.destroyToolGroup(toolGroupId);
    this.toolGroupIds.delete(toolGroupId);
  }
  removeViewportFromToolGroup(viewportId, renderingEngineId, deleteToolGroupIfEmpty) {
    const toolGroup = dist_esm.ToolGroupManager.getToolGroupForViewport(viewportId, renderingEngineId);
    if (!toolGroup) {
      return;
    }
    toolGroup.removeViewports(renderingEngineId, viewportId);
    const viewportIds = toolGroup.getViewportIds();
    if (viewportIds.length === 0 && deleteToolGroupIfEmpty) {
      dist_esm.ToolGroupManager.destroyToolGroup(toolGroup.id);
    }
  }
  addViewportToToolGroup(viewportId, renderingEngineId, toolGroupId) {
    if (!toolGroupId) {
      // If toolGroupId is not provided, add the viewport to all toolGroups
      const toolGroups = dist_esm.ToolGroupManager.getAllToolGroups();
      toolGroups.forEach(toolGroup => {
        toolGroup.addViewport(viewportId, renderingEngineId);
      });
    } else {
      let toolGroup = dist_esm.ToolGroupManager.getToolGroup(toolGroupId);
      if (!toolGroup) {
        toolGroup = this.createToolGroup(toolGroupId);
      }
      toolGroup.addViewport(viewportId, renderingEngineId);
    }
    this._broadcastEvent(EVENTS.VIEWPORT_ADDED, {
      viewportId,
      toolGroupId
    });
  }
  createToolGroup(toolGroupId) {
    if (this.getToolGroup(toolGroupId)) {
      throw new Error(`ToolGroup ${toolGroupId} already exists`);
    }

    // if the toolGroup doesn't exist, create it
    const toolGroup = dist_esm.ToolGroupManager.createToolGroup(toolGroupId);
    this.toolGroupIds.add(toolGroupId);
    this._broadcastEvent(EVENTS.TOOLGROUP_CREATED, {
      toolGroupId
    });
    return toolGroup;
  }
  addToolsToToolGroup(toolGroupId, tools, configs = {}) {
    const toolGroup = dist_esm.ToolGroupManager.getToolGroup(toolGroupId);
    // this.changeConfigurationIfNecessary(toolGroup, volumeId);
    this._addTools(toolGroup, tools, configs);
    this._setToolsMode(toolGroup, tools);
  }
  createToolGroupAndAddTools(toolGroupId, tools) {
    const toolGroup = this.createToolGroup(toolGroupId);
    this.addToolsToToolGroup(toolGroupId, tools);
    return toolGroup;
  }
  /**
   * Get the tool's configuration based on the tool name and tool group id
   * @param toolGroupId - The id of the tool group that the tool instance belongs to.
   * @param toolName - The name of the tool
   * @returns The configuration of the tool.
   */
  getToolConfiguration(toolGroupId, toolName) {
    const toolGroup = dist_esm.ToolGroupManager.getToolGroup(toolGroupId);
    if (!toolGroup) {
      return null;
    }
    const tool = toolGroup.getToolInstance(toolName);
    if (!tool) {
      return null;
    }
    return tool.configuration;
  }

  /**
   * Set the tool instance configuration. This will update the tool instance configuration
   * on the toolGroup
   * @param toolGroupId - The id of the tool group that the tool instance belongs to.
   * @param toolName - The name of the tool
   * @param config - The configuration object that you want to set.
   */
  setToolConfiguration(toolGroupId, toolName, config) {
    const toolGroup = dist_esm.ToolGroupManager.getToolGroup(toolGroupId);
    const toolInstance = toolGroup.getToolInstance(toolName);
    toolInstance.configuration = config;
  }
  getActivePrimaryMouseButtonTool(toolGroupId) {
    return this.getToolGroup(toolGroupId)?.getActivePrimaryMouseButtonTool();
  }
  _setToolsMode(toolGroup, tools) {
    const {
      active,
      passive,
      enabled,
      disabled
    } = tools;
    if (active) {
      active.forEach(({
        toolName,
        bindings
      }) => {
        toolGroup.setToolActive(toolName, {
          bindings
        });
      });
    }
    if (passive) {
      passive.forEach(({
        toolName
      }) => {
        toolGroup.setToolPassive(toolName);
      });
    }
    if (enabled) {
      enabled.forEach(({
        toolName
      }) => {
        toolGroup.setToolEnabled(toolName);
      });
    }
    if (disabled) {
      disabled.forEach(({
        toolName
      }) => {
        toolGroup.setToolDisabled(toolName);
      });
    }
  }
  _addTools(toolGroup, tools) {
    const addTools = tools => {
      tools.forEach(({
        toolName,
        parentTool,
        configuration
      }) => {
        if (parentTool) {
          toolGroup.addToolInstance(toolName, parentTool, {
            ...configuration
          });
        } else {
          toolGroup.addTool(toolName, {
            ...configuration
          });
        }
      });
    };
    if (tools.active) {
      addTools(tools.active);
    }
    if (tools.passive) {
      addTools(tools.passive);
    }
    if (tools.enabled) {
      addTools(tools.enabled);
    }
    if (tools.disabled) {
      addTools(tools.disabled);
    }
  }
}
_ToolGroupService = ToolGroupService;
ToolGroupService.REGISTRATION = {
  name: 'toolGroupService',
  altName: 'ToolGroupService',
  create: ({
    servicesManager
  }) => {
    return new _ToolGroupService(servicesManager);
  }
};
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/services/ToolGroupService/index.js

/* harmony default export */ const services_ToolGroupService = (ToolGroupService);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/services/SyncGroupService/createHydrateSegmentationSynchronizer.ts


const {
  createSynchronizer
} = dist_esm.SynchronizerManager;
const {
  SEGMENTATION_REPRESENTATION_ADDED
} = dist_esm.Enums.Events;
function createHydrateSegmentationSynchronizer(synchronizerName, {
  servicesManager,
  ...options
}) {
  const stackImageSynchronizer = createSynchronizer(synchronizerName, SEGMENTATION_REPRESENTATION_ADDED, (synchronizerInstance, sourceViewport, targetViewport, sourceEvent) => segmentationRepresentationModifiedCallback(synchronizerInstance, sourceViewport, targetViewport, sourceEvent, {
    servicesManager,
    options
  }), {
    eventSource: 'eventTarget'
  });
  return stackImageSynchronizer;
}
const segmentationRepresentationModifiedCallback = async (synchronizerInstance, sourceViewport, targetViewport, sourceEvent, {
  servicesManager,
  options
}) => {
  const event = sourceEvent;
  const {
    segmentationId,
    viewportId
  } = event.detail;
  const {
    segmentationService,
    hangingProtocolService
  } = servicesManager.services;
  const targetViewportId = targetViewport.viewportId;
  const {
    viewport
  } = (0,esm.getEnabledElementByViewportId)(targetViewportId);
  const targetFrameOfReferenceUID = viewport.getFrameOfReferenceUID();
  if (!targetFrameOfReferenceUID) {
    console.debug('No frame of reference UID found for the target viewport');
    return;
  }
  const targetViewportRepresentation = segmentationService.getSegmentationRepresentations(targetViewportId, {
    segmentationId
  });
  if (targetViewportRepresentation.length > 0) {
    return;
  }

  // whatever type the source viewport has, we need to add that to the target viewport
  const sourceViewportRepresentation = segmentationService.getSegmentationRepresentations(sourceViewport.viewportId, {
    segmentationId
  });
  const type = sourceViewportRepresentation[0].type;
  await segmentationService.addSegmentationRepresentation(targetViewportId, {
    segmentationId,
    type
  });
};
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/services/SyncGroupService/SyncGroupService.ts
var _SyncGroupService;




const SyncGroupService_EVENTS = {
  TOOL_GROUP_CREATED: 'event::cornerstone::syncgroupservice:toolgroupcreated'
};

/**
 * @params options - are an optional set of options associated with the first
 * sync group declared.
 */

const POSITION = 'cameraposition';
const VOI = 'voi';
const ZOOMPAN = 'zoompan';
const STACKIMAGE = 'stackimage';
const IMAGE_SLICE = 'imageslice';
const HYDRATE_SEG = 'hydrateseg';
const asSyncGroup = syncGroup => typeof syncGroup === 'string' ? {
  type: syncGroup
} : syncGroup;
class SyncGroupService {
  constructor(servicesManager) {
    this.servicesManager = void 0;
    this.listeners = {};
    this.EVENTS = void 0;
    this.synchronizerCreators = {
      [POSITION]: dist_esm.synchronizers.createCameraPositionSynchronizer,
      [VOI]: dist_esm.synchronizers.createVOISynchronizer,
      [ZOOMPAN]: dist_esm.synchronizers.createZoomPanSynchronizer,
      // todo: remove stack image since it is legacy now and the image_slice
      // handles both stack and volume viewports
      [STACKIMAGE]: dist_esm.synchronizers.createImageSliceSynchronizer,
      [IMAGE_SLICE]: dist_esm.synchronizers.createImageSliceSynchronizer,
      [HYDRATE_SEG]: createHydrateSegmentationSynchronizer
    };
    this.synchronizersByType = {};
    this.servicesManager = servicesManager;
    this.listeners = {};
    this.EVENTS = SyncGroupService_EVENTS;
    //
    Object.assign(this, src/* pubSubServiceInterface */.Ml);
  }
  _createSynchronizer(type, id, options) {
    // Initialize if not already done
    this.synchronizersByType[type] = this.synchronizersByType[type] || [];
    const syncCreator = this.synchronizerCreators[type.toLowerCase()];
    if (syncCreator) {
      // Pass the servicesManager along with other parameters
      const synchronizer = syncCreator(id, {
        ...options,
        servicesManager: this.servicesManager
      });
      if (synchronizer) {
        this.synchronizersByType[type].push(synchronizer);
        return synchronizer;
      }
    } else {
      console.debug(`Unknown synchronizer type: ${type}, id: ${id}`);
    }
  }
  getSyncCreatorForType(type) {
    return this.synchronizerCreators[type.toLowerCase()];
  }

  /**
   * Creates a synchronizer type.
   * @param type is the type of the synchronizer to create
   * @param creator
   */
  addSynchronizerType(type, creator) {
    this.synchronizerCreators[type.toLowerCase()] = creator;
  }
  getSynchronizer(id) {
    return dist_esm.SynchronizerManager.getSynchronizer(id);
  }

  /**
   * Registers a custom synchronizer.
   * @param id - The id of the synchronizer.
   * @param createFunction - The function that creates the synchronizer.
   */
  registerCustomSynchronizer(id, createFunction) {
    this.synchronizerCreators[id] = createFunction;
  }

  /**
   * Retrieves an array of synchronizers of a specific type.
   * @param type - The type of synchronizers to retrieve.
   * @returns An array of synchronizers of the specified type.
   */
  getSynchronizersOfType(type) {
    return this.synchronizersByType[type];
  }
  _getOrCreateSynchronizer(type, id, options) {
    let synchronizer = dist_esm.SynchronizerManager.getSynchronizer(id);
    if (!synchronizer) {
      synchronizer = this._createSynchronizer(type, id, options);
    }
    return synchronizer;
  }
  addViewportToSyncGroup(viewportId, renderingEngineId, syncGroups) {
    if (!syncGroups) {
      return;
    }
    const syncGroupsArray = Array.isArray(syncGroups) ? syncGroups : [syncGroups];
    syncGroupsArray.forEach(syncGroup => {
      const syncGroupObj = asSyncGroup(syncGroup);
      const {
        type,
        target = true,
        source = true,
        options = {},
        id = type
      } = syncGroupObj;
      const synchronizer = this._getOrCreateSynchronizer(type, id, options);
      if (!synchronizer) {
        return;
      }
      synchronizer.setOptions(viewportId, options);
      const viewportInfo = {
        viewportId,
        renderingEngineId
      };
      if (target && source) {
        synchronizer.add(viewportInfo);
        return;
      } else if (source) {
        synchronizer.addSource(viewportInfo);
      } else if (target) {
        synchronizer.addTarget(viewportInfo);
      }
    });
  }
  destroy() {
    dist_esm.SynchronizerManager.destroy();
  }
  getSynchronizersForViewport(viewportId) {
    const renderingEngine = (0,esm.getRenderingEngines)().find(re => {
      return re.getViewports().find(vp => vp.id === viewportId);
    }) || (0,esm.getRenderingEngines)()[0];
    const synchronizers = dist_esm.SynchronizerManager.getAllSynchronizers();
    return synchronizers.filter(s => s.hasSourceViewport(renderingEngine.id, viewportId) || s.hasTargetViewport(renderingEngine.id, viewportId));
  }
  removeViewportFromSyncGroup(viewportId, renderingEngineId, syncGroupId) {
    const synchronizers = dist_esm.SynchronizerManager.getAllSynchronizers();
    const filteredSynchronizers = syncGroupId ? synchronizers.filter(s => s.id === syncGroupId) : synchronizers;
    filteredSynchronizers.forEach(synchronizer => {
      if (!synchronizer) {
        return;
      }

      // Only image slice synchronizer register spatial registration
      if (this.isImageSliceSyncronizer(synchronizer)) {
        this.unRegisterSpatialRegistration(synchronizer);
      }
      synchronizer.remove({
        viewportId,
        renderingEngineId
      });

      // check if any viewport is left in any of the sync groups, if not, delete that sync group
      const sourceViewports = synchronizer.getSourceViewports();
      const targetViewports = synchronizer.getTargetViewports();
      if (!sourceViewports.length && !targetViewports.length) {
        dist_esm.SynchronizerManager.destroySynchronizer(synchronizer.id);
      }
    });
  }
  /**
   * Clean up the spatial registration metadata created by synchronizer
   * This is needed to be able to re-sync images slices if needed
   * @param synchronizer
   */
  unRegisterSpatialRegistration(synchronizer) {
    const sourceViewports = synchronizer.getSourceViewports().map(vp => vp.viewportId);
    const targetViewports = synchronizer.getTargetViewports().map(vp => vp.viewportId);

    // Create an array of pair of viewports to remove from spatialRegistrationMetadataProvider
    // All sourceViewports combined with all targetViewports
    const toUnregister = sourceViewports.map(sourceViewportId => {
      return targetViewports.map(targetViewportId => [targetViewportId, sourceViewportId]);
    }).reduce((acc, c) => acc.concat(c), []);
    toUnregister.forEach(viewportIdPair => {
      esm.utilities.spatialRegistrationMetadataProvider.add(viewportIdPair, undefined);
    });
  }
  /**
   * Check if the synchronizer type is IMAGE_SLICE
   * Need to convert to lowercase here because the types are lowercase
   * e.g: synchronizerCreators
   * @param synchronizer
   */
  isImageSliceSyncronizer(synchronizer) {
    return this.getSynchronizerType(synchronizer).toLowerCase() === IMAGE_SLICE;
  }
  /**
   * Returns the syncronizer type
   * @param synchronizer
   */
  getSynchronizerType(synchronizer) {
    const synchronizerTypes = Object.keys(this.synchronizersByType);
    const syncType = synchronizerTypes.find(syncType => this.getSynchronizersOfType(syncType).includes(synchronizer));
    return syncType;
  }
}
_SyncGroupService = SyncGroupService;
SyncGroupService.REGISTRATION = {
  name: 'syncGroupService',
  altName: 'SyncGroupService',
  create: ({
    servicesManager
  }) => {
    return new _SyncGroupService(servicesManager);
  }
};
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/services/SyncGroupService/index.js

/* harmony default export */ const services_SyncGroupService = (SyncGroupService);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/transitions.ts
/**
 * It is a bell curved function that uses ease in out quadratic for css
 * transition timing function for each side of the curve.
 *
 * @param {number} x - The current time, in the range [0, 1].
 * @param {number} baseline - The baseline value to start from and return to.
 * @returns the value of the transition at time x.
 */
function easeInOutBell(x, baseline) {
  const alpha = 1 - baseline;

  // prettier-ignore
  if (x < 1 / 4) {
    return 4 * Math.pow(2 * x, 3) * alpha + baseline;
  } else if (x < 1 / 2) {
    return (1 - Math.pow(-4 * x + 2, 3) / 2) * alpha + baseline;
  } else if (x < 3 / 4) {
    return (1 - Math.pow(4 * x - 2, 3) / 2) * alpha + baseline;
  } else {
    return -4 * Math.pow(2 * x - 2, 3) * alpha + baseline;
  }
}

/**
 * A reversed bell curved function that starts from 1 and goes to baseline and
 * come back to 1 again. It uses ease in out quadratic for css transition
 * timing function for each side of the curve.
 *
 * @param {number} x - The current time, in the range [0, 1].
 * @param {number} baseline - The baseline value to start from and return to.
 * @returns the value of the transition at time x.
 */
function reverseEaseInOutBell(x, baseline) {
  const y = easeInOutBell(x, baseline);
  return -y + 1 + baseline;
}
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/services/SegmentationService/RTSTRUCT/mapROIContoursToRTStructData.ts
/**
 * Maps a DICOM RT Struct ROI Contour to a RTStruct data that can be used
 * in Segmentation Service
 *
 * @param structureSet - A DICOM RT Struct ROI Contour
 * @param rtDisplaySetUID - A CornerstoneTools DisplaySet UID
 * @returns An array of object that includes data, id, segmentIndex, color
 * and geometry Id
 */
function mapROIContoursToRTStructData(structureSet, rtDisplaySetUID) {
  return structureSet.ROIContours.map(({
    contourPoints,
    ROINumber,
    ROIName,
    colorArray
  }) => {
    const data = contourPoints.map(({
      points,
      ...rest
    }) => {
      const newPoints = points.map(({
        x,
        y,
        z
      }) => {
        return [x, y, z];
      });
      return {
        ...rest,
        points: newPoints
      };
    });
    const id = ROIName || ROINumber;
    return {
      data,
      id,
      segmentIndex: ROINumber,
      color: colorArray,
      geometryId: `${rtDisplaySetUID}:${id}:segmentIndex-${ROINumber}`
    };
  });
}
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/stateManagement/segmentation/addColorLUT.js
var addColorLUT = __webpack_require__(4714);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/stateManagement/segmentation/getNextColorLUTIndex.js
var getNextColorLUTIndex = __webpack_require__(70906);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/enums/index.js + 4 modules
var dist_esm_enums = __webpack_require__(31749);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/stateManagement/segmentation/updateLabelmapSegmentationImageReferences.js
var updateLabelmapSegmentationImageReferences = __webpack_require__(78231);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/stateManagement/segmentation/triggerSegmentationEvents.js
var triggerSegmentationEvents = __webpack_require__(49906);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/stateManagement/segmentation/helpers/convertStackToVolumeLabelmap.js
var convertStackToVolumeLabelmap = __webpack_require__(6273);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/stateManagement/segmentation/index.js + 9 modules
var stateManagement_segmentation = __webpack_require__(1300);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/services/SegmentationService/SegmentationService.ts
var _SegmentationService;













const LABELMAP = dist_esm.Enums.SegmentationRepresentations.Labelmap;
const CONTOUR = dist_esm.Enums.SegmentationRepresentations.Contour;
const SegmentationService_EVENTS = {
  SEGMENTATION_MODIFIED: 'event::segmentation_modified',
  // fired when the segmentation is added
  SEGMENTATION_ADDED: 'event::segmentation_added',
  //
  SEGMENTATION_DATA_MODIFIED: 'event::segmentation_data_modified',
  // fired when the segmentation is removed
  SEGMENTATION_REMOVED: 'event::segmentation_removed',
  //
  // fired when segmentation representation is added
  SEGMENTATION_REPRESENTATION_MODIFIED: 'event::segmentation_representation_modified',
  // fired when segmentation representation is removed
  SEGMENTATION_REPRESENTATION_REMOVED: 'event::segmentation_representation_removed',
  //
  // LOADING EVENTS
  // fired when the active segment is loaded in SEG or RTSTRUCT
  SEGMENT_LOADING_COMPLETE: 'event::segment_loading_complete',
  // loading completed for all segments
  SEGMENTATION_LOADING_COMPLETE: 'event::segmentation_loading_complete'
};
const VALUE_TYPES = {};
const VOLUME_LOADER_SCHEME = 'cornerstoneStreamingImageVolume';
class SegmentationService extends src/* PubSubService */.Rc {
  constructor({
    servicesManager
  }) {
    super(SegmentationService_EVENTS);
    this._segmentationIdToColorLUTIndexMap = void 0;
    this.servicesManager = void 0;
    this.highlightIntervalId = null;
    this.EVENTS = SegmentationService_EVENTS;
    this.destroy = () => {
      esm.eventTarget.removeEventListener(dist_esm.Enums.Events.SEGMENTATION_MODIFIED, this._onSegmentationModifiedFromSource);
      esm.eventTarget.removeEventListener(dist_esm.Enums.Events.SEGMENTATION_REMOVED, this._onSegmentationModifiedFromSource);
      esm.eventTarget.removeEventListener(dist_esm.Enums.Events.SEGMENTATION_DATA_MODIFIED, this._onSegmentationDataModifiedFromSource);
      esm.eventTarget.removeEventListener(dist_esm.Enums.Events.SEGMENTATION_REPRESENTATION_ADDED, this._onSegmentationModifiedFromSource);
      esm.eventTarget.removeEventListener(dist_esm.Enums.Events.SEGMENTATION_ADDED, this._onSegmentationAddedFromSource);
      this.listeners = {};
    };
    this.getStyle = specifier => {
      const style = dist_esm.segmentation.config.style.getStyle(specifier);
      return style;
    };
    this.setStyle = (specifier, style) => {
      dist_esm.segmentation.config.style.setStyle(specifier, style);
    };
    this.resetToGlobalStyle = () => {
      dist_esm.segmentation.config.style.resetToGlobalStyle();
    };
    /**
     * Toggles the visibility of a segmentation in the state, and broadcasts the event.
     * Note: this method does not update the segmentation state in the source. It only
     * updates the state, and there should be separate listeners for that.
     * @param ids segmentation ids
     */
    this.toggleSegmentationRepresentationVisibility = (viewportId, {
      segmentationId,
      type
    }) => {
      this._toggleSegmentationRepresentationVisibility(viewportId, segmentationId, type);
    };
    this.getViewportIdsWithSegmentation = segmentationId => {
      const viewportIds = dist_esm.segmentation.state.getViewportIdsWithSegmentation(segmentationId);
      return viewportIds;
    };
    this._toggleSegmentationRepresentationVisibility = (viewportId, segmentationId, type) => {
      const representations = this.getSegmentationRepresentations(viewportId, {
        segmentationId,
        type
      });
      const representation = representations[0];
      const segmentsHidden = dist_esm.segmentation.config.visibility.getHiddenSegmentIndices(viewportId, {
        segmentationId,
        type: representation.type
      });
      const currentVisibility = segmentsHidden.size === 0;
      this._setSegmentationRepresentationVisibility(viewportId, segmentationId, representation.type, !currentVisibility);
    };
    this._onSegmentationDataModifiedFromSource = evt => {
      const {
        segmentationId
      } = evt.detail;
      this._broadcastEvent(this.EVENTS.SEGMENTATION_DATA_MODIFIED, {
        segmentationId
      });
    };
    this._onSegmentationRepresentationModifiedFromSource = evt => {
      const {
        segmentationId,
        viewportId
      } = evt.detail;
      this._broadcastEvent(this.EVENTS.SEGMENTATION_REPRESENTATION_MODIFIED, {
        segmentationId,
        viewportId
      });
    };
    this._onSegmentationModifiedFromSource = evt => {
      const {
        segmentationId
      } = evt.detail;
      this._broadcastEvent(this.EVENTS.SEGMENTATION_MODIFIED, {
        segmentationId
      });
    };
    this._onSegmentationAddedFromSource = evt => {
      const {
        segmentationId
      } = evt.detail;
      this._broadcastEvent(this.EVENTS.SEGMENTATION_ADDED, {
        segmentationId
      });
    };
    this._segmentationIdToColorLUTIndexMap = new Map();
    this.servicesManager = servicesManager;
  }
  onModeEnter() {
    this._initSegmentationService();
  }
  onModeExit() {
    this.destroy();
  }

  /**
   * Retrieves a segmentation by its ID.
   *
   * @param segmentationId - The unique identifier of the segmentation to retrieve.
   * @returns The segmentation object if found, or undefined if not found.
   *
   * @remarks
   * This method directly accesses the cornerstone tools segmentation state to fetch
   * the segmentation data. It's useful when you need to access specific properties
   * or perform operations on a particular segmentation.
   */
  getSegmentation(segmentationId) {
    return dist_esm.segmentation.state.getSegmentation(segmentationId);
  }

  /**
   * Retrieves all segmentations from the cornerstone tools segmentation state.
   *
   * @returns An array of all segmentations currently stored in the state
   *
   * @remarks
   * This is a convenience method that directly accesses the cornerstone tools
   * segmentation state to get all available segmentations. It returns the raw
   * segmentation objects without any additional processing or filtering.
   */
  getSegmentations() {
    return dist_esm.segmentation.state.getSegmentations();
  }
  getPresentation(viewportId) {
    const segmentationPresentations = [];
    const segmentationsMap = new Map();
    const representations = this.getSegmentationRepresentations(viewportId);
    for (const representation of representations) {
      const {
        segmentationId
      } = representation;
      if (!representation) {
        continue;
      }
      const {
        type
      } = representation;
      segmentationsMap.set(segmentationId, {
        segmentationId,
        type,
        hydrated: true,
        config: representation.config || {}
      });
    }

    // Check inside the removedDisplaySetAndRepresentationMaps to see if any of the representations are not hydrated
    // const hydrationMap = this._segmentationRepresentationHydrationMaps.get(presentationId);

    // if (hydrationMap) {
    //   hydrationMap.forEach(rep => {
    //     segmentationsMap.set(rep.segmentationId, {
    //       segmentationId: rep.segmentationId,
    //       type: rep.type,
    //       hydrated: rep.hydrated,
    //       config: rep.config || {},
    //     });
    //   });
    // }

    // // Convert the Map to an array
    segmentationPresentations.push(...segmentationsMap.values());
    return segmentationPresentations;
  }
  getRepresentationsForSegmentation(segmentationId) {
    const representations = dist_esm.segmentation.state.getSegmentationRepresentationsBySegmentationId(segmentationId);
    return representations;
  }

  /**
   * Retrieves segmentation representations (labelmap, contour, surface) based on specified criteria.
   *
   * @param viewportId - The ID of the viewport.
   * @param specifier - An object containing optional `segmentationId` and `type` to filter the representations.
   * @returns An array of `SegmentationRepresentation` matching the criteria, or an empty array if none are found.
   *
   * @remarks
   * This method filters the segmentation representations according to the provided `specifier`:
   * - **No `segmentationId` or `type` provided**: Returns all representations associated with the given `viewportId`.
   * - **Only `segmentationId` provided**: Returns all representations with that `segmentationId`, regardless of `viewportId`.
   * - **Only `type` provided**: Returns all representations of that `type` associated with the given `viewportId`.
   * - **Both `segmentationId` and `type` provided**: Returns representations matching both criteria, regardless of `viewportId`.
   */
  getSegmentationRepresentations(viewportId, specifier = {}) {
    // Get all representations for the viewportId
    const representations = dist_esm.segmentation.state.getSegmentationRepresentations(viewportId, specifier);

    // Map to our SegmentationRepresentation type
    const ohifRepresentations = representations.map(repr => this._toOHIFSegmentationRepresentation(viewportId, repr));
    return ohifRepresentations;
  }
  async addSegmentationRepresentation(viewportId, {
    segmentationId,
    type,
    suppressEvents = false
  }) {
    const segmentation = this.getSegmentation(segmentationId);
    const csViewport = this.getAndValidateViewport(viewportId);
    const colorLUTIndex = this._segmentationIdToColorLUTIndexMap.get(segmentationId);
    const defaultRepresentationType = dist_esm.Enums.SegmentationRepresentations.Labelmap;
    let representationTypeToUse = type || defaultRepresentationType;
    let isConverted = false;
    if (type === dist_esm.Enums.SegmentationRepresentations.Labelmap) {
      const {
        isVolumeViewport,
        isVolumeSegmentation
      } = this.determineViewportAndSegmentationType(csViewport, segmentation);
      ({
        representationTypeToUse,
        isConverted
      } = await this.handleViewportConversion(isVolumeViewport, isVolumeSegmentation, csViewport, segmentation, viewportId, segmentationId, representationTypeToUse));
    }
    await this._addSegmentationRepresentation(viewportId, segmentationId, representationTypeToUse, colorLUTIndex, isConverted);
    if (!suppressEvents) {
      this._broadcastEvent(this.EVENTS.SEGMENTATION_REPRESENTATION_MODIFIED, {
        segmentationId
      });
    }
  }

  /**
   * Creates an labelmap segmentation for a given display set
   *
   * @param displaySet - The display set to create the segmentation for.
   * @param options - Optional parameters for creating the segmentation.
   * @param options.segmentationId - Custom segmentation ID. If not provided, a UUID will be generated.
   * @param options.FrameOfReferenceUID - Frame of reference UID for the segmentation.
   * @param options.label - Label for the segmentation.
   * @returns A promise that resolves to the created segmentation ID.
   */
  async createLabelmapForDisplaySet(displaySet, options) {
    // Todo: random does not makes sense, make this better, like
    // labelmap 1, 2, 3 etc
    const segmentationId = options?.segmentationId ?? `${esm.utilities.uuidv4()}`;
    const isDynamicVolume = displaySet.isDynamicVolume;
    let referenceImageIds = displaySet.imageIds;
    if (isDynamicVolume) {
      // get the middle timepoint for referenceImageIds
      const timePoints = displaySet.dynamicVolumeInfo.timePoints;
      const middleTimePoint = timePoints[Math.floor(timePoints.length / 2)];
      referenceImageIds = middleTimePoint;
    }
    const derivedImages = await esm.imageLoader.createAndCacheDerivedLabelmapImages(referenceImageIds);
    const segs = this.getSegmentations();
    const label = options.label || `Segmentation ${segs.length + 1}`;
    const segImageIds = derivedImages.map(image => image.imageId);
    const segmentationPublicInput = {
      segmentationId,
      representation: {
        type: LABELMAP,
        data: {
          imageIds: segImageIds,
          referencedVolumeId: this._getVolumeIdForDisplaySet(displaySet),
          referencedImageIds: referenceImageIds
        }
      },
      config: {
        label,
        segments: options.segments && Object.keys(options.segments).length > 0 ? options.segments : {
          1: {
            label: 'Segment 1',
            active: true
          }
        },
        cachedStats: {
          info: `S${displaySet.SeriesNumber}: ${displaySet.SeriesDescription}`
        }
      }
    };
    this.addOrUpdateSegmentation(segmentationPublicInput);
    return segmentationId;
  }
  async createSegmentationForSEGDisplaySet(segDisplaySet, options = {
    type: LABELMAP
  }) {
    const {
      type
    } = options;
    let {
      segmentationId
    } = options;
    const {
      labelmapBufferArray
    } = segDisplaySet;
    if (type !== LABELMAP) {
      throw new Error('Only labelmap type is supported for SEG display sets right now');
    }
    if (!labelmapBufferArray) {
      throw new Error('SEG reading failed');
    }
    segmentationId = segmentationId ?? segDisplaySet.displaySetInstanceUID;
    const referencedDisplaySetInstanceUID = segDisplaySet.referencedDisplaySetInstanceUID;
    const referencedDisplaySet = this.servicesManager.services.displaySetService.getDisplaySetByUID(referencedDisplaySetInstanceUID);
    const images = referencedDisplaySet.instances;
    if (!images.length) {
      throw new Error('No instances were provided for the referenced display set of the SEG');
    }
    const imageIds = images.map(image => image.imageId);
    const derivedSegmentationImages = await esm.imageLoader.createAndCacheDerivedLabelmapImages(imageIds);
    segDisplaySet.images = derivedSegmentationImages;
    const segmentsInfo = segDisplaySet.segMetadata.data;
    const segments = {};
    const colorLUT = [];
    segmentsInfo.forEach((segmentInfo, index) => {
      if (index === 0) {
        colorLUT.push([0, 0, 0, 0]);
        return;
      }
      const {
        SegmentedPropertyCategoryCodeSequence,
        SegmentNumber,
        SegmentLabel,
        SegmentAlgorithmType,
        SegmentAlgorithmName,
        SegmentedPropertyTypeCodeSequence,
        rgba
      } = segmentInfo;
      colorLUT.push(rgba);
      const segmentIndex = Number(SegmentNumber);
      const imageCentroidXYZ = segDisplaySet.centroids.get(index).image || {
        x: 0,
        y: 0,
        z: 0
      };
      const worldCentroidXYZ = segDisplaySet.centroids.get(index).world || {
        x: 0,
        y: 0,
        z: 0
      };
      segments[segmentIndex] = {
        segmentIndex,
        label: SegmentLabel || `Segment ${SegmentNumber}`,
        locked: false,
        active: false,
        cachedStats: {
          center: {
            image: [imageCentroidXYZ.x, imageCentroidXYZ.y, imageCentroidXYZ.z],
            world: [worldCentroidXYZ.x, worldCentroidXYZ.y, worldCentroidXYZ.z]
          },
          modifiedTime: segDisplaySet.SeriesDate,
          category: SegmentedPropertyCategoryCodeSequence ? SegmentedPropertyCategoryCodeSequence.CodeMeaning : '',
          type: SegmentedPropertyTypeCodeSequence ? SegmentedPropertyTypeCodeSequence.CodeMeaning : '',
          algorithmType: SegmentAlgorithmType,
          algorithmName: SegmentAlgorithmName
        }
      };
    });

    // get next color lut index
    const colorLUTIndex = (0,getNextColorLUTIndex/* getNextColorLUTIndex */.u)();
    (0,addColorLUT/* addColorLUT */.u)(colorLUT, colorLUTIndex);
    this._segmentationIdToColorLUTIndexMap.set(segmentationId, colorLUTIndex);

    // now we need to chop the volume array into chunks and set the scalar data for each derived segmentation image
    const volumeScalarData = new Uint8Array(labelmapBufferArray[0]);

    // We should parse the segmentation as separate slices to support overlapping segments.
    // This parsing should occur in the CornerstoneJS library adapters.
    // For now, we use the volume returned from the library and chop it here.
    for (let i = 0; i < derivedSegmentationImages.length; i++) {
      const voxelManager = derivedSegmentationImages[i].voxelManager;
      const scalarData = voxelManager.getScalarData();
      scalarData.set(volumeScalarData.slice(i * scalarData.length, (i + 1) * scalarData.length));
      voxelManager.setScalarData(scalarData);
    }
    this._broadcastEvent(SegmentationService_EVENTS.SEGMENTATION_LOADING_COMPLETE, {
      segmentationId,
      segDisplaySet
    });
    const seg = {
      segmentationId,
      representation: {
        type: LABELMAP,
        data: {
          imageIds: derivedSegmentationImages.map(image => image.imageId),
          referencedVolumeId: this._getVolumeIdForDisplaySet(referencedDisplaySet),
          referencedImageIds: imageIds
        }
      },
      config: {
        label: segDisplaySet.SeriesDescription,
        segments
      }
    };
    segDisplaySet.isLoaded = true;
    this.addOrUpdateSegmentation(seg);
    return segmentationId;
  }
  async createSegmentationForRTDisplaySet(rtDisplaySet, options = {
    type: CONTOUR
  }) {
    const {
      type
    } = options;
    let {
      segmentationId
    } = options;

    // Currently, only contour representation is supported for RT display
    if (type !== CONTOUR) {
      throw new Error('Only contour type is supported for RT display sets right now');
    }

    // Assign segmentationId if not provided
    segmentationId = segmentationId ?? rtDisplaySet.displaySetInstanceUID;
    const {
      structureSet
    } = rtDisplaySet;
    if (!structureSet) {
      throw new Error('To create the contours from RT displaySet, the displaySet should be loaded first. You can perform rtDisplaySet.load() before calling this method.');
    }
    const rtDisplaySetUID = rtDisplaySet.displaySetInstanceUID;

    // Map ROI contours to RT Struct Data
    const allRTStructData = mapROIContoursToRTStructData(structureSet, rtDisplaySetUID);

    // Sort by segmentIndex for consistency
    allRTStructData.sort((a, b) => a.segmentIndex - b.segmentIndex);
    const geometryIds = allRTStructData.map(({
      geometryId
    }) => geometryId);

    // Initialize SegmentationPublicInput similar to SEG function
    const segmentation = {
      segmentationId,
      representation: {
        type: CONTOUR,
        data: {
          geometryIds
        }
      },
      config: {
        label: rtDisplaySet.SeriesDescription
      }
    };
    if (!structureSet.ROIContours?.length) {
      throw new Error('The structureSet does not contain any ROIContours. Please ensure the structureSet is loaded first.');
    }
    const segments = {};
    let segmentsCachedStats = {};

    // Process each segment similarly to the SEG function
    for (const rtStructData of allRTStructData) {
      const {
        data,
        id,
        color,
        segmentIndex,
        geometryId
      } = rtStructData;
      try {
        const geometry = await esm.geometryLoader.createAndCacheGeometry(geometryId, {
          geometryData: {
            data,
            id,
            color,
            frameOfReferenceUID: structureSet.frameOfReferenceUID,
            segmentIndex
          },
          type: esm.Enums.GeometryType.CONTOUR
        });
        const contourSet = geometry.data;
        const centroid = contourSet.centroid;
        segmentsCachedStats = {
          center: {
            world: centroid
          },
          modifiedTime: rtDisplaySet.SeriesDate // Using SeriesDate as modifiedTime
        };
        segments[segmentIndex] = {
          label: id,
          segmentIndex,
          cachedStats: segmentsCachedStats,
          locked: false,
          active: false
        };

        // Broadcast segment loading progress
        const numInitialized = Object.keys(segmentsCachedStats).length;
        const percentComplete = Math.round(numInitialized / allRTStructData.length * 100);
        this._broadcastEvent(SegmentationService_EVENTS.SEGMENT_LOADING_COMPLETE, {
          percentComplete,
          numSegments: allRTStructData.length
        });
      } catch (e) {
        console.warn(`Error initializing contour for segment ${segmentIndex}:`, e);
        continue; // Continue processing other segments even if one fails
      }
    }

    // Assign processed segments to segmentation config
    segmentation.config.segments = segments;

    // Broadcast segmentation loading complete event
    this._broadcastEvent(SegmentationService_EVENTS.SEGMENTATION_LOADING_COMPLETE, {
      segmentationId,
      rtDisplaySet
    });

    // Mark the RT display set as loaded
    rtDisplaySet.isLoaded = true;

    // Add or update the segmentation in the state
    this.addOrUpdateSegmentation(segmentation);
    return segmentationId;
  }

  /**
   * Adds or updates a segmentation in the state
   * @param segmentationId - The ID of the segmentation to add or update
   * @param data - The data to add or update the segmentation with
   *
   * @remarks
   * This method handles the addition or update of a segmentation in the state.
   * If the segmentation already exists, it updates the existing segmentation.
   * If the segmentation does not exist, it adds a new segmentation.
   */
  addOrUpdateSegmentation(data) {
    const segmentationId = data.segmentationId;
    const existingSegmentation = dist_esm.segmentation.state.getSegmentation(segmentationId);
    if (existingSegmentation) {
      // Update the existing segmentation
      this.updateSegmentationInSource(segmentationId, data);
    } else {
      // Add a new segmentation
      this.addSegmentationToSource(data);
    }
  }
  setActiveSegmentation(viewportId, segmentationId) {
    dist_esm.segmentation.activeSegmentation.setActiveSegmentation(viewportId, segmentationId);
  }

  /**
   * Gets the active segmentation for a viewport
   * @param viewportId - The ID of the viewport to get the active segmentation for
   * @returns The active segmentation object, or null if no segmentation is active
   *
   * @remarks
   * This method retrieves the currently active segmentation for the specified viewport.
   * The active segmentation is the one that is currently selected for editing operations.
   * Returns null if no segmentation is active in the viewport.
   */
  getActiveSegmentation(viewportId) {
    return dist_esm.segmentation.activeSegmentation.getActiveSegmentation(viewportId);
  }

  /**
   * Gets the active segment from the active segmentation in a viewport
   * @param viewportId - The ID of the viewport to get the active segment from
   * @returns The active segment object, or undefined if no segment is active
   *
   * @remarks
   * This method retrieves the currently active segment from the active segmentation
   * in the specified viewport. The active segment is the one that is currently
   * selected for editing operations. Returns undefined if no segment is active or
   * if there is no active segmentation.
   */
  getActiveSegment(viewportId) {
    const activeSegmentation = this.getActiveSegmentation(viewportId);
    if (!activeSegmentation) {
      return;
    }
    const {
      segments
    } = activeSegmentation;
    let activeSegment;
    for (const segment of Object.values(segments)) {
      if (segment.active) {
        activeSegment = segment;
        break;
      }
    }
    return activeSegment;
  }
  hasCustomStyles(specifier) {
    return dist_esm.segmentation.config.style.hasCustomStyle(specifier);
  }
  /**
   * Adds a new segment to the specified segmentation.
   * @param segmentationId - The ID of the segmentation to add the segment to.
   * @param viewportId: The ID of the viewport to add the segment to, it is used to get the representation, if it is not
   * provided, the first available representation for the segmentationId will be used.
   * @param config - An object containing the configuration options for the new segment.
   *   - segmentIndex: (optional) The index of the segment to add. If not provided, the next available index will be used.
   *   - properties: (optional) An object containing the properties of the new segment.
   *     - label: (optional) The label of the new segment. If not provided, a default label will be used.
   *     - color: (optional) The color of the new segment in RGB format. If not provided, a default color will be used.
   *     - visibility: (optional) Whether the new segment should be visible. If not provided, the segment will be visible by default.
   *     - isLocked: (optional) Whether the new segment should be locked for editing. If not provided, the segment will not be locked by default.
   *     - active: (optional) Whether the new segment should be the active segment to be edited. If not provided, the segment will not be active by default.
   */
  addSegment(segmentationId, config = {}) {
    if (config?.segmentIndex === 0) {
      throw new Error('Segment index 0 is reserved for "no label"');
    }
    const csSegmentation = this.getCornerstoneSegmentation(segmentationId);
    let segmentIndex = config.segmentIndex;
    if (!segmentIndex) {
      // grab the next available segment index based on the object keys,
      // so basically get the highest segment index value + 1
      segmentIndex = Math.max(...Object.keys(csSegmentation.segments).map(Number)) + 1;
    }

    // update the segmentation
    if (!config.label) {
      config.label = `Segment ${segmentIndex}`;
    }
    const currentSegments = csSegmentation.segments;
    dist_esm.segmentation.updateSegmentations([{
      segmentationId,
      payload: {
        segments: {
          ...currentSegments,
          [segmentIndex]: {
            ...currentSegments[segmentIndex],
            segmentIndex,
            cachedStats: {},
            locked: false,
            ...config
          }
        }
      }
    }]);
    this.setActiveSegment(segmentationId, segmentIndex);

    // Apply additional configurations
    if (config.isLocked !== undefined) {
      this._setSegmentLockedStatus(segmentationId, segmentIndex, config.isLocked);
    }

    // Get all viewports that have this segmentation
    const viewportIds = this.getViewportIdsWithSegmentation(segmentationId);
    viewportIds.forEach(viewportId => {
      // Set color if provided
      if (config.color !== undefined) {
        this.setSegmentColor(viewportId, segmentationId, segmentIndex, config.color);
      }

      // Set visibility if provided
      if (config.visibility !== undefined) {
        this.setSegmentVisibility(viewportId, segmentationId, segmentIndex, config.visibility);
      }
    });
  }

  /**
   * Removes a segment from a segmentation and updates the active segment index if necessary.
   *
   * @param segmentationId - The ID of the segmentation containing the segment to remove.
   * @param segmentIndex - The index of the segment to remove.
   *
   * @remarks
   * This method performs the following actions:
   * 1. Clears the segment value in the Cornerstone segmentation.
   * 2. Updates all related segmentation representations to remove the segment.
   * 3. If the removed segment was the active segment, it updates the active segment index.
   *
   */
  removeSegment(segmentationId, segmentIndex) {
    dist_esm.segmentation.removeSegment(segmentationId, segmentIndex);
  }
  setSegmentVisibility(viewportId, segmentationId, segmentIndex, isVisible, type) {
    this._setSegmentVisibility(viewportId, segmentationId, segmentIndex, isVisible, type);
  }

  /**
   * Sets the locked status of a segment in a segmentation.
   *
   * @param segmentationId - The ID of the segmentation containing the segment.
   * @param segmentIndex - The index of the segment to set the locked status for.
   * @param isLocked - The new locked status of the segment.
   *
   * @remarks
   * This method updates the locked status of a specific segment within a segmentation.
   * A locked segment cannot be modified or edited.
   */
  setSegmentLocked(segmentationId, segmentIndex, isLocked) {
    this._setSegmentLockedStatus(segmentationId, segmentIndex, isLocked);
  }

  /**
   * Toggles the locked state of a segment in a segmentation.
   * @param segmentationId - The ID of the segmentation.
   * @param segmentIndex - The index of the segment to toggle.
   */
  toggleSegmentLocked(segmentationId, segmentIndex) {
    const isLocked = dist_esm.segmentation.segmentLocking.isSegmentIndexLocked(segmentationId, segmentIndex);
    this._setSegmentLockedStatus(segmentationId, segmentIndex, !isLocked);
  }
  toggleSegmentVisibility(viewportId, segmentationId, segmentIndex, type) {
    const isVisible = dist_esm.segmentation.config.visibility.getSegmentIndexVisibility(viewportId, {
      segmentationId,
      type
    }, segmentIndex);
    this._setSegmentVisibility(viewportId, segmentationId, segmentIndex, !isVisible, type);
  }

  /**
   * Sets the color of a specific segment in a segmentation.
   *
   * @param viewportId - The ID of the viewport containing the segmentation
   * @param segmentationId - The ID of the segmentation containing the segment
   * @param segmentIndex - The index of the segment to set the color for
   * @param color - The new color to apply to the segment as an array of RGBA values
   *
   * @remarks
   * This method updates the color of a specific segment within a segmentation.
   * The color parameter should be an array of 4 numbers representing RGBA values.
   */
  setSegmentColor(viewportId, segmentationId, segmentIndex, color) {
    dist_esm.segmentation.config.color.setSegmentIndexColor(viewportId, segmentationId, segmentIndex, color);
  }

  /**
   * Gets the current color of a specific segment in a segmentation.
   *
   * @param viewportId - The ID of the viewport containing the segmentation
   * @param segmentationId - The ID of the segmentation containing the segment
   * @param segmentIndex - The index of the segment to get the color for
   * @returns An array of 4 numbers representing the RGBA color values of the segment
   *
   * @remarks
   * This method retrieves the current color of a specific segment within a segmentation.
   * The returned color is an array of 4 numbers representing RGBA values.
   */
  getSegmentColor(viewportId, segmentationId, segmentIndex) {
    return dist_esm.segmentation.config.color.getSegmentIndexColor(viewportId, segmentationId, segmentIndex);
  }

  /**
   * Gets the labelmap volume for a segmentation
   * @param segmentationId - The ID of the segmentation to get the labelmap volume for
   * @returns The labelmap volume for the segmentation, or null if not found
   *
   * @remarks
   * This method retrieves the labelmap volume data for a specific segmentation.
   * The labelmap volume contains the actual segmentation data in the form of a 3D volume.
   * Returns null if the segmentation does not have valid labelmap volume data.
   */
  getLabelmapVolume(segmentationId) {
    const csSegmentation = dist_esm.segmentation.state.getSegmentation(segmentationId);
    const labelmapData = csSegmentation.representationData[esm_enums.SegmentationRepresentations.Labelmap];
    if (!labelmapData || !labelmapData.volumeId) {
      return null;
    }
    const {
      volumeId
    } = labelmapData;
    const labelmapVolume = esm.cache.getVolume(volumeId);
    return labelmapVolume;
  }

  /**
   * Sets the label for a specific segment in a segmentation
   * @param segmentationId - The ID of the segmentation containing the segment
   * @param segmentIndex - The index of the segment to set the label for
   * @param label - The new label to apply to the segment
   *
   * @remarks
   * This method updates the text label of a specific segment within a segmentation.
   * The label is used to identify and describe the segment in the UI.
   */
  setSegmentLabel(segmentationId, segmentIndex, label) {
    this._setSegmentLabel(segmentationId, segmentIndex, label);
  }

  /**
   * Sets the active segment for a segmentation
   * @param segmentationId - The ID of the segmentation containing the segment
   * @param segmentIndex - The index of the segment to set as active
   *
   * @remarks
   * This method updates which segment is considered "active" within a segmentation.
   * The active segment is typically highlighted and available for editing operations.
   */
  setActiveSegment(segmentationId, segmentIndex) {
    this._setActiveSegment(segmentationId, segmentIndex);
  }

  /**
   * Controls whether inactive segmentations should be rendered in a viewport
   * @param viewportId - The ID of the viewport to update
   * @param renderInactive - Whether inactive segmentations should be rendered
   *
   * @remarks
   * This method configures if segmentations that are not currently active
   * should still be visible in the specified viewport. This can be useful
   * for comparing or viewing multiple segmentations simultaneously.
   */
  setRenderInactiveSegmentations(viewportId, renderInactive) {
    dist_esm.segmentation.config.style.setRenderInactiveSegmentations(viewportId, renderInactive);
  }

  /**
   * Gets whether inactive segmentations are being rendered for a viewport
   * @param viewportId - The ID of the viewport to check
   * @returns boolean indicating if inactive segmentations are rendered
   *
   * @remarks
   * This method retrieves the current rendering state for inactive segmentations
   * in the specified viewport. Returns true if inactive segmentations are visible.
   */
  getRenderInactiveSegmentations(viewportId) {
    return dist_esm.segmentation.config.style.getRenderInactiveSegmentations(viewportId);
  }
  /**
   * Clears segmentation representations from the viewport.
   * Unlike removeSegmentationRepresentations, this doesn't update
   * removed display set and representation maps.
   * We track removed segmentations manually to avoid re-adding them
   * when the display set is added again.
   * @param viewportId - The viewport ID to clear segmentation representations from.
   */
  clearSegmentationRepresentations(viewportId) {
    this.removeSegmentationRepresentations(viewportId);
  }

  /**
   * Completely removes a segmentation from the state
   * @param segmentationId - The ID of the segmentation to remove.
   */
  remove(segmentationId) {
    dist_esm.segmentation.state.removeSegmentation(segmentationId);
  }
  removeAllSegmentations() {
    dist_esm.segmentation.state.removeAllSegmentations();
  }

  /**
   * It removes the segmentation representations from the viewport.
   * @param viewportId - The viewport id to remove the segmentation representations from.
   * @param specifier - The specifier to remove the segmentation representations.
   *
   * @remarks
   * If no specifier is provided, all segmentation representations for the viewport are removed.
   * If a segmentationId specifier is provided, only the segmentation representation with the specified segmentationId and type are removed.
   * If a type specifier is provided, only the segmentation representation with the specified type are removed.
   * If both a segmentationId and type specifier are provided, only the segmentation representation with the specified segmentationId and type are removed.
   */
  removeSegmentationRepresentations(viewportId, specifier = {}) {
    dist_esm.segmentation.removeSegmentationRepresentations(viewportId, specifier);
  }
  jumpToSegmentCenter(segmentationId, segmentIndex, viewportId, highlightAlpha = 0.9, highlightSegment = true, animationLength = 750, highlightHideOthers = false, highlightFunctionType = 'ease-in-out' // todo: make animation functions configurable from outside
  ) {
    const center = this._getSegmentCenter(segmentationId, segmentIndex);
    if (!center) {
      return;
    }
    const {
      world
    } = center;

    // need to find which viewports are displaying the segmentation
    const viewportIds = viewportId ? [viewportId] : this.getViewportIdsWithSegmentation(segmentationId);
    viewportIds.forEach(viewportId => {
      const {
        viewport
      } = (0,esm.getEnabledElementByViewportId)(viewportId);
      viewport.jumpToWorld(world);
      highlightSegment && this.highlightSegment(segmentationId, segmentIndex, viewportId, highlightAlpha, animationLength, highlightHideOthers);
    });
  }
  highlightSegment(segmentationId, segmentIndex, viewportId, alpha = 0.9, animationLength = 750, hideOthers = true, highlightFunctionType = 'ease-in-out') {
    if (this.highlightIntervalId) {
      clearInterval(this.highlightIntervalId);
    }
    const csSegmentation = this.getCornerstoneSegmentation(segmentationId);
    const viewportIds = viewportId ? [viewportId] : this.getViewportIdsWithSegmentation(segmentationId);
    viewportIds.forEach(viewportId => {
      const segmentationRepresentation = this.getSegmentationRepresentations(viewportId, {
        segmentationId
      });
      const representation = segmentationRepresentation[0];
      const {
        type
      } = representation;
      const segments = csSegmentation.segments;
      const highlightFn = type === LABELMAP ? this._highlightLabelmap.bind(this) : this._highlightContour.bind(this);
      const adjustedAlpha = type === LABELMAP ? alpha : 1 - alpha;
      highlightFn(segmentIndex, adjustedAlpha, hideOthers, segments, viewportId, animationLength, representation);
    });
  }
  getAndValidateViewport(viewportId) {
    const csViewport = this.servicesManager.services.cornerstoneViewportService.getCornerstoneViewport(viewportId);
    if (!csViewport) {
      throw new Error(`Viewport with id ${viewportId} not found.`);
    }
    return csViewport;
  }

  /**
   * Sets the visibility of a segmentation representation.
   *
   * @param viewportId - The ID of the viewport.
   * @param segmentationId - The ID of the segmentation.
   * @param isVisible - The new visibility state.
   */
  _setSegmentationRepresentationVisibility(viewportId, segmentationId, type, isVisible) {
    const representations = this.getSegmentationRepresentations(viewportId, {
      segmentationId,
      type
    });
    const representation = representations[0];
    if (!representation) {
      console.debug('No segmentation representation found for the given viewportId and segmentationId');
      return;
    }
    dist_esm.segmentation.config.visibility.setSegmentationRepresentationVisibility(viewportId, {
      segmentationId,
      type
    }, isVisible);
  }
  determineViewportAndSegmentationType(csViewport, segmentation) {
    const isVolumeViewport = csViewport.type === dist_esm_enums.ViewportType.ORTHOGRAPHIC || csViewport.type === dist_esm_enums.ViewportType.VOLUME_3D;
    const isVolumeSegmentation = 'volumeId' in segmentation.representationData[LABELMAP];
    return {
      isVolumeViewport,
      isVolumeSegmentation
    };
  }
  async handleViewportConversion(isVolumeViewport, isVolumeSegmentation, csViewport, segmentation, viewportId, segmentationId, representationType) {
    let representationTypeToUse = representationType;
    let isConverted = false;
    const handler = isVolumeViewport ? this.handleVolumeViewportCase : this.handleStackViewportCase;
    ({
      representationTypeToUse,
      isConverted
    } = await handler.apply(this, [csViewport, segmentation, isVolumeSegmentation, viewportId, segmentationId]));
    return {
      representationTypeToUse,
      isConverted
    };
  }
  async handleVolumeViewportCase(csViewport, segmentation, isVolumeSegmentation) {
    if (csViewport.type === dist_esm_enums.ViewportType.VOLUME_3D) {
      return {
        representationTypeToUse: esm_enums.SegmentationRepresentations.Surface,
        isConverted: false
      };
    } else {
      await this.handleVolumeViewport(csViewport, segmentation, isVolumeSegmentation);
      return {
        representationTypeToUse: esm_enums.SegmentationRepresentations.Labelmap,
        isConverted: false
      };
    }
  }
  async handleStackViewportCase(csViewport, segmentation, isVolumeSegmentation, viewportId, segmentationId) {
    if (isVolumeSegmentation) {
      const isConverted = await this.convertStackToVolumeViewport(csViewport);
      return {
        representationTypeToUse: esm_enums.SegmentationRepresentations.Labelmap,
        isConverted
      };
    }
    if ((0,updateLabelmapSegmentationImageReferences/* updateLabelmapSegmentationImageReferences */.t)(viewportId, segmentationId)) {
      return {
        representationTypeToUse: esm_enums.SegmentationRepresentations.Labelmap,
        isConverted: false
      };
    }
    const isConverted = await this.attemptStackToVolumeConversion(csViewport, segmentation, viewportId, segmentationId);
    return {
      representationTypeToUse: esm_enums.SegmentationRepresentations.Labelmap,
      isConverted
    };
  }
  async _addSegmentationRepresentation(viewportId, segmentationId, representationType, colorLUTIndex, isConverted) {
    const representation = {
      type: representationType,
      segmentationId,
      config: {
        colorLUTOrIndex: colorLUTIndex
      }
    };
    const addRepresentation = () => dist_esm.segmentation.addSegmentationRepresentations(viewportId, [representation]);
    if (isConverted) {
      const {
        viewportGridService
      } = this.servicesManager.services;
      await new Promise(resolve => {
        const {
          unsubscribe
        } = viewportGridService.subscribe(viewportGridService.EVENTS.GRID_STATE_CHANGED, () => {
          addRepresentation();
          unsubscribe();
          resolve();
        });
      });
    } else {
      addRepresentation();
    }
  }
  async handleVolumeViewport(viewport, segmentation, isVolumeSegmentation) {
    if (isVolumeSegmentation) {
      return; // Volume Labelmap on Volume Viewport is natively supported
    }
    const frameOfReferenceUID = viewport.getFrameOfReferenceUID();
    const imageIds = (0,stateManagement_segmentation.getLabelmapImageIds)(segmentation.segmentationId);
    const segImage = esm.cache.getImage(imageIds[0]);
    if (segImage?.FrameOfReferenceUID === frameOfReferenceUID) {
      await (0,convertStackToVolumeLabelmap/* convertStackToVolumeLabelmap */.p)(segmentation);
    }
  }
  async convertStackToVolumeViewport(viewport) {
    const {
      viewportGridService,
      cornerstoneViewportService
    } = this.servicesManager.services;
    const state = viewportGridService.getState();
    const gridViewport = state.viewports.get(viewport.id);
    const prevViewPresentation = viewport.getViewPresentation();
    const prevViewReference = viewport.getViewReference();
    const stackViewport = cornerstoneViewportService.getCornerstoneViewport(viewport.id);
    const {
      element
    } = stackViewport;
    const volumeViewportNewVolumeHandler = () => {
      const volumeViewport = cornerstoneViewportService.getCornerstoneViewport(viewport.id);
      volumeViewport.setViewPresentation(prevViewPresentation);
      volumeViewport.setViewReference(prevViewReference);
      volumeViewport.render();
      element.removeEventListener(esm.Enums.Events.VOLUME_VIEWPORT_NEW_VOLUME, volumeViewportNewVolumeHandler);
    };
    element.addEventListener(esm.Enums.Events.VOLUME_VIEWPORT_NEW_VOLUME, volumeViewportNewVolumeHandler);
    viewportGridService.setDisplaySetsForViewport({
      viewportId: viewport.id,
      displaySetInstanceUIDs: gridViewport.displaySetInstanceUIDs,
      viewportOptions: {
        ...gridViewport.viewportOptions,
        viewportType: dist_esm_enums.ViewportType.ORTHOGRAPHIC
      }
    });
    return true;
  }
  async attemptStackToVolumeConversion(viewport, segmentation, viewportId, segmentationId) {
    const imageIds = (0,stateManagement_segmentation.getLabelmapImageIds)(segmentation.segmentationId);
    const frameOfReferenceUID = viewport.getFrameOfReferenceUID();
    const segImage = esm.cache.getImage(imageIds[0]);
    if (segImage?.FrameOfReferenceUID && frameOfReferenceUID && segImage.FrameOfReferenceUID === frameOfReferenceUID) {
      const isConverted = await this.convertStackToVolumeViewport(viewport);
      (0,triggerSegmentationEvents.triggerSegmentationRepresentationModified)(viewportId, segmentationId, esm_enums.SegmentationRepresentations.Labelmap);
      return isConverted;
    }
  }
  addSegmentationToSource(segmentationPublicInput) {
    dist_esm.segmentation.addSegmentations([segmentationPublicInput]);
  }
  updateSegmentationInSource(segmentationId, payload) {
    dist_esm.segmentation.updateSegmentations([{
      segmentationId,
      payload
    }]);
  }
  _toOHIFSegmentationRepresentation(viewportId, csRepresentation) {
    const {
      segmentationId,
      type,
      active,
      visible
    } = csRepresentation;
    const {
      colorLUTIndex
    } = csRepresentation;
    const segmentsRepresentations = {};
    const segmentation = dist_esm.segmentation.state.getSegmentation(segmentationId);
    if (!segmentation) {
      throw new Error(`Segmentation with ID ${segmentationId} not found.`);
    }
    const segmentIds = Object.keys(segmentation.segments);
    for (const segmentId of segmentIds) {
      const segmentIndex = parseInt(segmentId, 10);
      const color = dist_esm.segmentation.config.color.getSegmentIndexColor(viewportId, segmentationId, segmentIndex);
      const isVisible = dist_esm.segmentation.config.visibility.getSegmentIndexVisibility(viewportId, {
        segmentationId,
        type
      }, segmentIndex);
      segmentsRepresentations[segmentIndex] = {
        color,
        segmentIndex,
        opacity: color[3],
        visible: isVisible
      };
    }
    const styles = dist_esm.segmentation.config.style.getStyle({
      viewportId,
      segmentationId,
      type
    });
    const id = `${segmentationId}-${type}-${viewportId}`;
    return {
      id: id,
      segmentationId,
      label: segmentation.label,
      active,
      type,
      visible,
      segments: segmentsRepresentations,
      styles,
      viewportId,
      colorLUTIndex,
      config: {}
    };
  }
  _initSegmentationService() {
    esm.eventTarget.addEventListener(dist_esm.Enums.Events.SEGMENTATION_MODIFIED, this._onSegmentationModifiedFromSource);
    esm.eventTarget.addEventListener(dist_esm.Enums.Events.SEGMENTATION_REMOVED, this._onSegmentationModifiedFromSource);
    esm.eventTarget.addEventListener(dist_esm.Enums.Events.SEGMENTATION_DATA_MODIFIED, this._onSegmentationDataModifiedFromSource);
    esm.eventTarget.addEventListener(dist_esm.Enums.Events.SEGMENTATION_REPRESENTATION_MODIFIED, this._onSegmentationRepresentationModifiedFromSource);
    esm.eventTarget.addEventListener(dist_esm.Enums.Events.SEGMENTATION_REPRESENTATION_ADDED, this._onSegmentationRepresentationModifiedFromSource);
    esm.eventTarget.addEventListener(dist_esm.Enums.Events.SEGMENTATION_REPRESENTATION_REMOVED, this._onSegmentationRepresentationModifiedFromSource);
    esm.eventTarget.addEventListener(dist_esm.Enums.Events.SEGMENTATION_ADDED, this._onSegmentationAddedFromSource);
  }
  getCornerstoneSegmentation(segmentationId) {
    return dist_esm.segmentation.state.getSegmentation(segmentationId);
  }
  _highlightLabelmap(segmentIndex, alpha, hideOthers, segments, viewportId, animationLength, representation) {
    const {
      segmentationId
    } = representation;
    const newSegmentSpecificConfig = {
      fillAlpha: alpha
    };
    if (hideOthers) {
      throw new Error('hideOthers is not working right now');
      for (let i = 0; i < segments.length; i++) {
        if (i !== segmentIndex) {
          newSegmentSpecificConfig[i] = {
            fillAlpha: 0
          };
        }
      }
    }
    const {
      fillAlpha
    } = this.getStyle({
      viewportId,
      segmentationId,
      type: LABELMAP,
      segmentIndex
    });
    let startTime = null;
    const animation = timestamp => {
      if (startTime === null) {
        startTime = timestamp;
      }
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / animationLength, 1);
      dist_esm.segmentation.config.style.setStyle({
        segmentationId,
        segmentIndex,
        type: LABELMAP
      }, {
        fillAlpha: easeInOutBell(progress, fillAlpha)
      });
      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        dist_esm.segmentation.config.style.setStyle({
          segmentationId,
          segmentIndex,
          type: LABELMAP
        }, {});
      }
    };
    requestAnimationFrame(animation);
  }
  _highlightContour(segmentIndex, alpha, hideOthers, segments, viewportId, animationLength, representation) {
    const {
      segmentationId
    } = representation;
    const startTime = performance.now();
    const prevStyle = dist_esm.segmentation.config.style.getStyle({
      viewportId,
      segmentationId,
      type: CONTOUR,
      segmentIndex
    });
    const prevOutlineWidth = prevStyle.outlineWidth;
    // make this configurable
    const baseline = Math.max(prevOutlineWidth * 3.5, 5);
    const animate = currentTime => {
      const progress = (currentTime - startTime) / animationLength;
      if (progress >= 1) {
        dist_esm.segmentation.config.style.setStyle({
          segmentationId,
          segmentIndex,
          type: CONTOUR
        }, {});
        return;
      }
      const reversedProgress = reverseEaseInOutBell(progress, baseline);
      dist_esm.segmentation.config.style.setStyle({
        segmentationId,
        segmentIndex,
        type: CONTOUR
      }, {
        outlineWidth: reversedProgress
      });
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
  _setActiveSegment(segmentationId, segmentIndex) {
    dist_esm.segmentation.segmentIndex.setActiveSegmentIndex(segmentationId, segmentIndex);
  }
  _getVolumeIdForDisplaySet(displaySet) {
    const volumeLoaderSchema = displaySet.volumeLoaderSchema ?? VOLUME_LOADER_SCHEME;
    return `${volumeLoaderSchema}:${displaySet.displaySetInstanceUID}`;
  }
  _getSegmentCenter(segmentationId, segmentIndex) {
    const segmentation = this.getSegmentation(segmentationId);
    if (!segmentation) {
      return;
    }
    const {
      segments
    } = segmentation;
    const {
      cachedStats
    } = segments[segmentIndex];
    if (!cachedStats) {
      return;
    }
    const {
      center
    } = cachedStats;
    return center;
  }
  _setSegmentLockedStatus(segmentationId, segmentIndex, isLocked) {
    dist_esm.segmentation.segmentLocking.setSegmentIndexLocked(segmentationId, segmentIndex, isLocked);
  }
  _setSegmentVisibility(viewportId, segmentationId, segmentIndex, isVisible, type) {
    dist_esm.segmentation.config.visibility.setSegmentIndexVisibility(viewportId, {
      segmentationId,
      type
    }, segmentIndex, isVisible);
  }
  _setSegmentLabel(segmentationId, segmentIndex, segmentLabel) {
    const segmentation = this.getCornerstoneSegmentation(segmentationId);
    const {
      segments
    } = segmentation;
    segments[segmentIndex].label = segmentLabel;
    dist_esm.segmentation.updateSegmentations([{
      segmentationId,
      payload: {
        segments
      }
    }]);
  }
}
_SegmentationService = SegmentationService;
SegmentationService.REGISTRATION = {
  name: 'segmentationService',
  altName: 'SegmentationService',
  create: ({
    servicesManager
  }) => {
    return new _SegmentationService({
      servicesManager
    });
  }
};
/* harmony default export */ const SegmentationService_SegmentationService = (SegmentationService);

;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/services/SegmentationService/index.ts

/* harmony default export */ const services_SegmentationService = (SegmentationService_SegmentationService);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/getCornerstoneViewportType.ts

const STACK = 'stack';
const VOLUME = 'volume';
const ORTHOGRAPHIC = 'orthographic';
const VOLUME_3D = 'volume3d';
const VIDEO = 'video';
const WHOLESLIDE = 'wholeslide';
function getCornerstoneViewportType(viewportType, displaySets) {
  const lowerViewportType = displaySets?.[0]?.viewportType?.toLowerCase() || viewportType.toLowerCase();
  if (lowerViewportType === STACK) {
    return esm.Enums.ViewportType.STACK;
  }
  if (lowerViewportType === VIDEO) {
    return esm.Enums.ViewportType.VIDEO;
  }
  if (lowerViewportType === WHOLESLIDE) {
    return esm.Enums.ViewportType.WHOLE_SLIDE;
  }
  if (lowerViewportType === VOLUME || lowerViewportType === ORTHOGRAPHIC) {
    return esm.Enums.ViewportType.ORTHOGRAPHIC;
  }
  if (lowerViewportType === VOLUME_3D) {
    return esm.Enums.ViewportType.VOLUME_3D;
  }
  throw new Error(`Invalid viewport type: ${viewportType}. Valid types are: stack, volume, video, wholeslide`);
}
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/services/CornerstoneCacheService/CornerstoneCacheService.ts
var _CornerstoneCacheService;


const CornerstoneCacheService_VOLUME_LOADER_SCHEME = 'cornerstoneStreamingImageVolume';
class CornerstoneCacheService {
  constructor(servicesManager) {
    this.stackImageIds = new Map();
    this.volumeImageIds = new Map();
    this.servicesManager = void 0;
    this.servicesManager = servicesManager;
  }
  getCacheSize() {
    return esm.cache.getCacheSize();
  }
  getCacheFreeSpace() {
    return esm.cache.getBytesAvailable();
  }
  async createViewportData(displaySets, viewportOptions, dataSource, initialImageIndex) {
    const viewportType = viewportOptions.viewportType;
    const cs3DViewportType = getCornerstoneViewportType(viewportType, displaySets);
    let viewportData;
    if (cs3DViewportType === esm.Enums.ViewportType.ORTHOGRAPHIC || cs3DViewportType === esm.Enums.ViewportType.VOLUME_3D) {
      viewportData = await this._getVolumeViewportData(dataSource, displaySets, cs3DViewportType);
    } else if (cs3DViewportType === esm.Enums.ViewportType.STACK) {
      // Everything else looks like a stack
      viewportData = await this._getStackViewportData(dataSource, displaySets, initialImageIndex, cs3DViewportType);
    } else {
      viewportData = await this._getOtherViewportData(dataSource, displaySets, initialImageIndex, cs3DViewportType);
    }
    viewportData.viewportType = cs3DViewportType;
    return viewportData;
  }
  async invalidateViewportData(viewportData, invalidatedDisplaySetInstanceUID, dataSource, displaySetService) {
    if (viewportData.viewportType === esm.Enums.ViewportType.STACK) {
      const displaySet = displaySetService.getDisplaySetByUID(invalidatedDisplaySetInstanceUID);
      const imageIds = this._getCornerstoneStackImageIds(displaySet, dataSource);

      // remove images from the cache to be able to re-load them
      imageIds.forEach(imageId => {
        if (esm.cache.getImageLoadObject(imageId)) {
          esm.cache.removeImageLoadObject(imageId);
        }
      });
      return {
        viewportType: esm.Enums.ViewportType.STACK,
        data: {
          StudyInstanceUID: displaySet.StudyInstanceUID,
          displaySetInstanceUID: invalidatedDisplaySetInstanceUID,
          imageIds
        }
      };
    }

    // Todo: grab the volume and get the id from the viewport itself
    const volumeId = `${CornerstoneCacheService_VOLUME_LOADER_SCHEME}:${invalidatedDisplaySetInstanceUID}`;
    const volume = esm.cache.getVolume(volumeId);
    if (volume) {
      if (volume.imageIds) {
        // also for each imageId in the volume, remove the imageId from the cache
        // since that will hold the old metadata as well

        volume.imageIds.forEach(imageId => {
          if (esm.cache.getImageLoadObject(imageId)) {
            esm.cache.removeImageLoadObject(imageId);
          }
        });
      }

      // this shouldn't be via removeVolumeLoadObject, since that will
      // remove the texture as well, but here we really just need a remove
      // from registry so that we load it again
      esm.cache._volumeCache.delete(volumeId);
      this.volumeImageIds.delete(volumeId);
    }
    const displaySets = viewportData.data.map(({
      displaySetInstanceUID
    }) => displaySetService.getDisplaySetByUID(displaySetInstanceUID));
    const newViewportData = await this._getVolumeViewportData(dataSource, displaySets, viewportData.viewportType);
    return newViewportData;
  }
  async _getOtherViewportData(dataSource, displaySets, _initialImageIndex, viewportType) {
    // TODO - handle overlays and secondary display sets, but for now assume
    // the 1st display set is the one of interest
    const [displaySet] = displaySets;
    if (!displaySet.imageIds) {
      displaySet.imagesIds = this._getCornerstoneStackImageIds(displaySet, dataSource);
    }
    const {
      imageIds: data,
      viewportType: dsViewportType
    } = displaySet;
    return {
      viewportType: dsViewportType || viewportType,
      data: displaySets
    };
  }
  async _getStackViewportData(dataSource, displaySets, initialImageIndex, viewportType) {
    const {
      uiNotificationService
    } = this.servicesManager.services;
    const overlayDisplaySets = displaySets.filter(ds => ds.isOverlayDisplaySet);
    for (const overlayDisplaySet of overlayDisplaySets) {
      if (overlayDisplaySet.load && overlayDisplaySet.load instanceof Function) {
        const {
          userAuthenticationService
        } = this.servicesManager.services;
        const headers = userAuthenticationService.getAuthorizationHeader();
        try {
          await overlayDisplaySet.load({
            headers
          });
        } catch (e) {
          uiNotificationService.show({
            title: 'Error loading displaySet',
            message: e.message,
            type: 'error'
          });
          console.error(e);
        }
      }
    }

    // Ensuring the first non-overlay `displaySet` is always the primary one
    const StackViewportData = [];
    for (const displaySet of displaySets) {
      const {
        displaySetInstanceUID,
        StudyInstanceUID,
        isCompositeStack
      } = displaySet;
      if (displaySet.load && displaySet.load instanceof Function) {
        const {
          userAuthenticationService
        } = this.servicesManager.services;
        const headers = userAuthenticationService.getAuthorizationHeader();
        try {
          await displaySet.load({
            headers
          });
        } catch (e) {
          uiNotificationService.show({
            title: 'Error loading displaySet',
            message: e.message,
            type: 'error'
          });
          console.error(e);
        }
      }
      let stackImageIds = this.stackImageIds.get(displaySet.displaySetInstanceUID);
      if (!stackImageIds) {
        stackImageIds = this._getCornerstoneStackImageIds(displaySet, dataSource);
        // assign imageIds to the displaySet
        displaySet.imageIds = stackImageIds;
        this.stackImageIds.set(displaySet.displaySetInstanceUID, stackImageIds);
      }
      StackViewportData.push({
        StudyInstanceUID,
        displaySetInstanceUID,
        isCompositeStack,
        imageIds: stackImageIds,
        initialImageIndex
      });
    }
    return {
      viewportType,
      data: StackViewportData
    };
  }
  async _getVolumeViewportData(dataSource, displaySets, viewportType) {
    // Todo: Check the cache for multiple scenarios to see if we need to
    // decache the volume data from other viewports or not

    const volumeData = [];
    for (const displaySet of displaySets) {
      const {
        Modality
      } = displaySet;
      const isParametricMap = Modality === 'PMAP';
      const isSeg = Modality === 'SEG';

      // Don't create volumes for the displaySets that have custom load
      // function (e.g., SEG, RT, since they rely on the reference volumes
      // and they take care of their own loading after they are created in their
      // getSOPClassHandler method

      if (displaySet.load && displaySet.load instanceof Function) {
        const {
          userAuthenticationService
        } = this.servicesManager.services;
        const headers = userAuthenticationService.getAuthorizationHeader();
        try {
          await displaySet.load({
            headers
          });
        } catch (e) {
          const {
            uiNotificationService
          } = this.servicesManager.services;
          uiNotificationService.show({
            title: 'Error loading displaySet',
            message: e.message,
            type: 'error'
          });
          console.error(e);
        }

        // Parametric maps have a `load` method but it should not be loaded in the
        // same way as SEG and RTSTRUCT but like a normal volume
        if (!isParametricMap) {
          volumeData.push({
            studyInstanceUID: displaySet.StudyInstanceUID,
            displaySetInstanceUID: displaySet.displaySetInstanceUID
          });

          // Todo: do some cache check and empty the cache if needed
          continue;
        }
      }
      const volumeLoaderSchema = displaySet.volumeLoaderSchema ?? CornerstoneCacheService_VOLUME_LOADER_SCHEME;
      const volumeId = `${volumeLoaderSchema}:${displaySet.displaySetInstanceUID}`;
      let volumeImageIds = this.volumeImageIds.get(displaySet.displaySetInstanceUID);
      let volume = esm.cache.getVolume(volumeId);

      // Parametric maps do not have image ids but they already have volume data
      // therefore a new volume should not be created.
      if (!isParametricMap && !isSeg && (!volumeImageIds || !volume)) {
        volumeImageIds = this._getCornerstoneVolumeImageIds(displaySet, dataSource);
        volume = await esm.volumeLoader.createAndCacheVolume(volumeId, {
          imageIds: volumeImageIds
        });
        this.volumeImageIds.set(displaySet.displaySetInstanceUID, volumeImageIds);

        // Add imageIds to the displaySet for volumes
        displaySet.imageIds = volumeImageIds;
      }
      volumeData.push({
        StudyInstanceUID: displaySet.StudyInstanceUID,
        displaySetInstanceUID: displaySet.displaySetInstanceUID,
        volume,
        volumeId,
        imageIds: volumeImageIds,
        isDynamicVolume: displaySet.isDynamicVolume
      });
    }
    return {
      viewportType,
      data: volumeData
    };
  }
  _getCornerstoneStackImageIds(displaySet, dataSource) {
    return dataSource.getImageIdsForDisplaySet(displaySet);
  }
  _getCornerstoneVolumeImageIds(displaySet, dataSource) {
    if (displaySet.imageIds) {
      return displaySet.imageIds;
    }
    const stackImageIds = this._getCornerstoneStackImageIds(displaySet, dataSource);
    return stackImageIds;
  }
}
_CornerstoneCacheService = CornerstoneCacheService;
CornerstoneCacheService.REGISTRATION = {
  name: 'cornerstoneCacheService',
  altName: 'CornerstoneCacheService',
  create: ({
    servicesManager
  }) => {
    return new _CornerstoneCacheService(servicesManager);
  }
};
/* harmony default export */ const CornerstoneCacheService_CornerstoneCacheService = (CornerstoneCacheService);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/services/CornerstoneCacheService/index.js

/* harmony default export */ const services_CornerstoneCacheService = (CornerstoneCacheService_CornerstoneCacheService);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/services/ViewportService/constants.ts
const RENDERING_ENGINE_ID = 'OHIFCornerstoneRenderingEngine';

;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/getCornerstoneBlendMode.ts

const MIP = 'mip';
const MINIP = 'minip';
const AVG = 'avg';
function getCornerstoneBlendMode(blendMode) {
  if (!blendMode) {
    return esm.Enums.BlendModes.COMPOSITE;
  }
  if (blendMode.toLowerCase() === MIP) {
    return esm.Enums.BlendModes.MAXIMUM_INTENSITY_BLEND;
  }
  if (blendMode.toLowerCase() === MINIP) {
    return esm.Enums.BlendModes.MINIMUM_INTENSITY_BLEND;
  }
  if (blendMode.toLowerCase() === AVG) {
    return esm.Enums.BlendModes.AVERAGE_INTENSITY_BLEND;
  }
  throw new Error(`Unsupported blend mode: ${blendMode}`);
}
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/getCornerstoneOrientation.ts

const AXIAL = 'axial';
const SAGITTAL = 'sagittal';
const CORONAL = 'coronal';
function getCornerstoneOrientation(orientation) {
  if (orientation) {
    switch (orientation.toLowerCase()) {
      case AXIAL:
        return esm.Enums.OrientationAxis.AXIAL;
      case SAGITTAL:
        return esm.Enums.OrientationAxis.SAGITTAL;
      case CORONAL:
        return esm.Enums.OrientationAxis.CORONAL;
      default:
        return esm.Enums.OrientationAxis.ACQUISITION;
    }
  }
  return esm.Enums.OrientationAxis.ACQUISITION;
}
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/services/ViewportService/Viewport.ts




const Viewport_STACK = 'stack';
const DEFAULT_TOOLGROUP_ID = 'default';

// Return true if the data contains the given display set UID OR the imageId
// if it is a composite object.
const dataContains = ({
  data,
  displaySetUID,
  imageId,
  viewport
}) => {
  if (imageId && data.isCompositeStack && data.imageIds) {
    return !!data.imageIds.find(dataId => dataId === imageId);
  }
  if (imageId && (data.volumeId || viewport instanceof esm.VolumeViewport)) {
    const isAcquisition = !!viewport.getCurrentImageId();
    if (!isAcquisition) {
      return false;
    }
    const imageURI = esm.utilities.imageIdToURI(imageId);
    const hasImageId = viewport.hasImageURI(imageURI);
    if (hasImageId) {
      return true;
    }
  }
  if (data.displaySetInstanceUID === displaySetUID) {
    return true;
  }
  return false;
};
class ViewportInfo {
  constructor(viewportId) {
    this.viewportId = '';
    this.element = void 0;
    this.viewportOptions = void 0;
    this.displaySetOptions = void 0;
    this.viewportData = void 0;
    this.renderingEngineId = void 0;
    this.viewReference = void 0;
    this.destroy = () => {
      this.element = null;
      this.viewportData = null;
      this.viewportOptions = null;
      this.displaySetOptions = null;
    };
    this.viewportId = viewportId;
    this.setPublicViewportOptions({});
    this.setPublicDisplaySetOptions([{}]);
  }

  /**
   * Return true if the viewport contains the given display set UID,
   * OR if it is a composite stack and contains the given imageId
   */
  contains(displaySetUID, imageId) {
    if (!this.viewportData?.data) {
      return false;
    }
    const {
      viewport
    } = (0,esm.getEnabledElementByViewportId)(this.viewportId) || {};
    if (this.viewportData.data.length) {
      return !!this.viewportData.data.find(data => dataContains({
        data,
        displaySetUID,
        imageId,
        viewport
      }));
    }
    return dataContains({
      data: this.viewportData.data,
      displaySetUID,
      imageId,
      viewport
    });
  }
  setRenderingEngineId(renderingEngineId) {
    this.renderingEngineId = renderingEngineId;
  }
  getRenderingEngineId() {
    return this.renderingEngineId;
  }
  setViewportId(viewportId) {
    this.viewportId = viewportId;
  }
  setElement(element) {
    this.element = element;
  }
  setViewportData(viewportData) {
    this.viewportData = viewportData;
  }
  getViewportData() {
    return this.viewportData;
  }
  getElement() {
    return this.element;
  }
  getViewportId() {
    return this.viewportId;
  }
  getViewReference() {
    return this.viewportOptions?.viewReference;
  }
  setPublicDisplaySetOptions(publicDisplaySetOptions) {
    // map the displaySetOptions and check if they are undefined then set them to default values
    const displaySetOptions = this.mapDisplaySetOptions(publicDisplaySetOptions);
    this.setDisplaySetOptions(displaySetOptions);
    return this.displaySetOptions;
  }
  hasDisplaySet(displaySetInstanceUID) {
    // Todo: currently this does not work for non image & referenceImage displaySets.
    // Since SEG and other derived displaySets are loaded in a different way, and not
    // via cornerstoneViewportService
    let viewportData = this.getViewportData();
    if (viewportData.viewportType === esm.Enums.ViewportType.ORTHOGRAPHIC || viewportData.viewportType === esm.Enums.ViewportType.VOLUME_3D) {
      viewportData = viewportData;
      return viewportData.data.some(({
        displaySetInstanceUID: dsUID
      }) => dsUID === displaySetInstanceUID);
    }
    viewportData = viewportData;
    return viewportData.data.displaySetInstanceUID === displaySetInstanceUID;
  }

  /**
   *
   * @param viewportOptionsEntry - the base values for the options
   * @param viewportTypeDisplaySet  - allows overriding the viewport type
   */
  setPublicViewportOptions(viewportOptionsEntry, viewportTypeDisplaySet) {
    const ohifViewportType = viewportTypeDisplaySet || viewportOptionsEntry.viewportType || Viewport_STACK;
    const {
      presentationIds
    } = viewportOptionsEntry;
    let {
      toolGroupId = DEFAULT_TOOLGROUP_ID
    } = viewportOptionsEntry;
    // Just assign the orientation for any viewport type and let the viewport deal with it
    const orientation = getCornerstoneOrientation(viewportOptionsEntry.orientation);
    const viewportType = getCornerstoneViewportType(ohifViewportType);
    if (!toolGroupId) {
      toolGroupId = DEFAULT_TOOLGROUP_ID;
    }
    this.setViewportOptions({
      ...viewportOptionsEntry,
      viewportId: this.viewportId,
      viewportType: viewportType,
      orientation,
      toolGroupId,
      presentationIds
    });
    return this.viewportOptions;
  }
  setViewportOptions(viewportOptions) {
    this.viewportOptions = viewportOptions;
  }
  getViewportOptions() {
    return this.viewportOptions;
  }
  getPresentationIds() {
    const {
      presentationIds
    } = this.viewportOptions;
    return presentationIds;
  }
  setDisplaySetOptions(displaySetOptions) {
    this.displaySetOptions = displaySetOptions;
  }
  getSyncGroups() {
    this.viewportOptions.syncGroups ||= [];
    return this.viewportOptions.syncGroups;
  }
  getDisplaySetOptions() {
    return this.displaySetOptions;
  }
  getViewportType() {
    return this.viewportOptions.viewportType || esm.Enums.ViewportType.STACK;
  }
  getToolGroupId() {
    return this.viewportOptions.toolGroupId;
  }
  getBackground() {
    return this.viewportOptions.background || [0, 0, 0];
  }
  getOrientation() {
    return this.viewportOptions.orientation;
  }
  getDisplayArea() {
    return this.viewportOptions.displayArea;
  }
  getInitialImageOptions() {
    return this.viewportOptions.initialImageOptions;
  }

  // Handle incoming public display set options or a display set select
  // with a contained options.
  mapDisplaySetOptions(options = [{}]) {
    const displaySetOptions = [];
    options.forEach(item => {
      let option = item?.options || item;
      if (!option) {
        option = {
          blendMode: undefined,
          slabThickness: undefined,
          colormap: undefined,
          voi: {},
          voiInverted: false
        };
      }
      const blendMode = getCornerstoneBlendMode(option.blendMode);
      displaySetOptions.push({
        voi: option.voi,
        voiInverted: option.voiInverted,
        colormap: option.colormap,
        slabThickness: option.slabThickness,
        blendMode,
        displayPreset: option.displayPreset
      });
    });
    return displaySetOptions;
  }
}
/* harmony default export */ const Viewport = (ViewportInfo);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/JumpPresets.ts
/**
 * Jump Presets - This enum defines the 3 jump states which are available
 * to be used with the jumpToSlice utility function.
 */
var JumpPresets = /*#__PURE__*/function (JumpPresets) {
  JumpPresets["First"] = "first";
  JumpPresets["Last"] = "last";
  JumpPresets["Middle"] = "middle";
  return JumpPresets;
}(JumpPresets || {});
/* harmony default export */ const utils_JumpPresets = (JumpPresets);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/services/ViewportService/CornerstoneViewportService.ts
var _CornerstoneViewportService;










const CornerstoneViewportService_EVENTS = {
  VIEWPORT_DATA_CHANGED: 'event::cornerstoneViewportService:viewportDataChanged',
  VIEWPORT_VOLUMES_CHANGED: 'event::cornerstoneViewportService:viewportVolumesChanged'
};

/**
 * Handles cornerstone viewport logic including enabling, disabling, and
 * updating the viewport.
 */
class CornerstoneViewportService extends src/* PubSubService */.Rc {
  constructor(servicesManager) {
    super(CornerstoneViewportService_EVENTS);
    this.renderingEngine = void 0;
    this.viewportsById = new Map();
    this.viewportGridResizeObserver = void 0;
    this.viewportsDisplaySets = new Map();
    this.beforeResizePositionPresentations = new Map();
    // Some configs
    this.enableResizeDetector = void 0;
    this.resizeRefreshRateMs = void 0;
    this.resizeRefreshMode = void 0;
    this.servicesManager = null;
    this.resizeQueue = [];
    this.viewportResizeTimer = null;
    this.gridResizeDelay = 50;
    this.gridResizeTimeOut = null;
    this.hangingProtocolService = void 0;
    this.viewportsInfo = void 0;
    this.sceneVolumeInputs = void 0;
    this.viewportDivElements = void 0;
    this.ViewportPropertiesMap = void 0;
    this.volumeUIDs = void 0;
    this.displaySetsNeedRerendering = void 0;
    this.viewportDisplaySets = void 0;
    this.renderingEngine = null;
    this.viewportGridResizeObserver = null;
    this.servicesManager = servicesManager;
  }
  /**
   * Adds the HTML element to the viewportService
   * @param {*} viewportId
   * @param {*} elementRef
   */
  enableViewport(viewportId, elementRef) {
    const viewportInfo = new Viewport(viewportId);
    viewportInfo.setElement(elementRef);
    this.viewportsById.set(viewportId, viewportInfo);
  }
  getViewportIds() {
    return Array.from(this.viewportsById.keys());
  }

  /**
   * It retrieves the renderingEngine if it does exist, or creates one otherwise
   * @returns {RenderingEngine} rendering engine
   */
  getRenderingEngine() {
    // get renderingEngine from cache if it exists
    const renderingEngine = (0,esm.getRenderingEngine)(RENDERING_ENGINE_ID);
    if (renderingEngine) {
      this.renderingEngine = renderingEngine;
      return this.renderingEngine;
    }
    if (!renderingEngine || renderingEngine.hasBeenDestroyed) {
      this.renderingEngine = new esm.RenderingEngine(RENDERING_ENGINE_ID);
    }
    return this.renderingEngine;
  }

  /**
   * It triggers the resize on the rendering engine, and renders the viewports
   *
   * @param isGridResize - if the resize is triggered by a grid resize
   * this is used to avoid double resize of the viewports since if the
   * grid is resized, all viewports will be resized so there is no need
   * to resize them individually which will get triggered by their
   * individual resize observers
   */
  resize(isGridResize = false) {
    // https://stackoverflow.com/a/26279685
    // This resize() call, among other things, rerenders the viewports. But when the entire viewer is
    // display: none'd, it makes the size of all hidden elements 0, including the viewport canvas and its containers.
    // Even if the viewer is later displayed again, trying to render when the size is 0 permanently "breaks" the
    // viewport, making it fully black even after the size is normal again. So just ignore resize events when hidden:
    const areViewportsHidden = Array.from(this.viewportsById.values()).every(viewportInfo => {
      const element = viewportInfo.getElement();
      return element.clientWidth === 0 && element.clientHeight === 0;
    });
    if (areViewportsHidden) {
      console.warn('Ignoring resize when viewports have size 0');
      return;
    }

    // if there is a grid resize happening, it means the viewport grid
    // has been manipulated (e.g., panels closed, added, etc.) and we need
    // to resize all viewports, so we will add a timeout here to make sure
    // we don't double resize the viewports when viewports in the grid are
    // resized individually
    if (isGridResize) {
      this.performResize();
      this.resetGridResizeTimeout();
      this.resizeQueue = [];
      clearTimeout(this.viewportResizeTimer);
    } else {
      this.enqueueViewportResizeRequest();
    }
  }

  /**
   * Removes the viewport from cornerstone, and destroys the rendering engine
   */
  destroy() {
    this._removeResizeObserver();
    this.viewportGridResizeObserver = null;
    try {
      this.renderingEngine?.destroy?.();
    } catch (e) {
      console.warn('Rendering engine not destroyed', e);
    }
    this.viewportsDisplaySets.clear();
    this.renderingEngine = null;
    esm.cache.purgeCache();
  }

  /**
   * Disables the viewport inside the renderingEngine, if no viewport is left
   * it destroys the renderingEngine.
   *
   * This is called when the element goes away entirely - with new viewportId's
   * created for every new viewport, this will be called whenever the set of
   * viewports is changed, but NOT when the viewport position changes only.
   *
   * @param viewportId - The viewportId to disable
   */
  disableElement(viewportId) {
    this.renderingEngine?.disableElement(viewportId);

    // clean up
    this.viewportsById.delete(viewportId);
    this.viewportsDisplaySets.delete(viewportId);
  }

  /**
   * Sets the presentations for a given viewport. Presentations is an object
   * that can define the lut or position for a viewport.
   *
   * @param viewportId - The ID of the viewport.
   * @param presentations - The presentations to apply to the viewport.
   * @param viewportInfo - Contains a view reference for immediate application
   */
  setPresentations(viewportId, presentations) {
    const viewport = this.getCornerstoneViewport(viewportId);
    if (!viewport || !presentations) {
      return;
    }
    const {
      lutPresentation,
      positionPresentation,
      segmentationPresentation
    } = presentations;

    // Always set the segmentation presentation first, since there might be some
    // lutpresentation states that need to be set on the segmentation
    // Todo: i think we should even await this
    this._setSegmentationPresentation(viewport, segmentationPresentation);
    this._setLutPresentation(viewport, lutPresentation);
    this._setPositionPresentation(viewport, {
      ...positionPresentation,
      viewportId
    });
  }

  /**
   * Stores the presentation state for a given viewport inside the
   * each store. This is used to persist the presentation state
   * across different scenarios e.g., when the viewport is changing the
   * display set, or when the viewport is moving to a different layout.
   *
   * @param viewportId The ID of the viewport.
   */
  storePresentation({
    viewportId
  }) {
    const presentationIds = this.getPresentationIds(viewportId);
    const {
      syncGroupService
    } = this.servicesManager.services;
    const synchronizers = syncGroupService.getSynchronizersForViewport(viewportId);
    if (!presentationIds || Object.keys(presentationIds).length === 0) {
      return null;
    }
    const {
      lutPresentationId,
      positionPresentationId,
      segmentationPresentationId
    } = presentationIds;
    const positionPresentation = this._getPositionPresentation(viewportId);
    const lutPresentation = this._getLutPresentation(viewportId);
    const segmentationPresentation = this._getSegmentationPresentation(viewportId);
    const {
      setLutPresentation
    } = useLutPresentationStore/* useLutPresentationStore */.I.getState();
    const {
      setPositionPresentation
    } = usePositionPresentationStore/* usePositionPresentationStore */.q.getState();
    const {
      setSynchronizers
    } = useSynchronizersStore/* useSynchronizersStore */.U.getState();
    const {
      setSegmentationPresentation
    } = useSegmentationPresentationStore/* useSegmentationPresentationStore */.v.getState();
    if (lutPresentationId) {
      setLutPresentation(lutPresentationId, lutPresentation);
    }
    if (positionPresentationId) {
      setPositionPresentation(positionPresentationId, positionPresentation);
    }
    if (segmentationPresentationId) {
      setSegmentationPresentation(segmentationPresentationId, segmentationPresentation);
    }
    if (synchronizers?.length) {
      setSynchronizers(viewportId, synchronizers.map(synchronizer => ({
        id: synchronizer.id,
        sourceViewports: [...synchronizer.getSourceViewports()],
        targetViewports: [...synchronizer.getTargetViewports()]
      })));
    }
  }

  /**
   * Retrieves the presentations for a given viewport.
   * @param viewportId - The ID of the viewport.
   * @returns The presentations for the viewport.
   */
  getPresentations(viewportId) {
    const positionPresentation = this._getPositionPresentation(viewportId);
    const lutPresentation = this._getLutPresentation(viewportId);
    const segmentationPresentation = this._getSegmentationPresentation(viewportId);
    return {
      positionPresentation,
      lutPresentation,
      segmentationPresentation
    };
  }
  getPresentationIds(viewportId) {
    const viewportInfo = this.viewportsById.get(viewportId);
    if (!viewportInfo) {
      return null;
    }
    return viewportInfo.getPresentationIds();
  }
  _getPositionPresentation(viewportId) {
    const csViewport = this.getCornerstoneViewport(viewportId);
    if (!csViewport) {
      return;
    }
    const viewportInfo = this.viewportsById.get(viewportId);
    return {
      viewportType: viewportInfo.getViewportType(),
      viewReference: csViewport instanceof esm.VolumeViewport3D ? null : csViewport.getViewReference(),
      viewPresentation: csViewport.getViewPresentation({
        pan: true,
        zoom: true
      }),
      viewportId
    };
  }
  _getLutPresentation(viewportId) {
    const csViewport = this.getCornerstoneViewport(viewportId);
    if (!csViewport) {
      return;
    }
    const cleanProperties = properties => {
      if (properties?.isComputedVOI) {
        delete properties?.voiRange;
        delete properties?.VOILUTFunction;
      }
      return properties;
    };
    const properties = csViewport instanceof esm.BaseVolumeViewport ? new Map() : cleanProperties(csViewport.getProperties());
    if (properties instanceof Map) {
      const volumeIds = csViewport.getAllVolumeIds();
      volumeIds?.forEach(volumeId => {
        const csProps = cleanProperties(csViewport.getProperties(volumeId));
        properties.set(volumeId, csProps);
      });
    }
    const viewportInfo = this.viewportsById.get(viewportId);
    return {
      viewportType: viewportInfo.getViewportType(),
      properties
    };
  }
  _getSegmentationPresentation(viewportId) {
    const {
      segmentationService
    } = this.servicesManager.services;
    const presentation = segmentationService.getPresentation(viewportId);
    return presentation;
  }

  /**
   * Sets the viewport data for a viewport.
   * @param viewportId - The ID of the viewport to set the data for.
   * @param viewportData - The viewport data to set.
   * @param publicViewportOptions - The public viewport options.
   * @param publicDisplaySetOptions - The public display set options.
   * @param presentations - The presentations to set.
   */
  setViewportData(viewportId, viewportData, publicViewportOptions, publicDisplaySetOptions, presentations) {
    const renderingEngine = this.getRenderingEngine();

    // if not valid viewportData then return early
    if (viewportData.viewportType === esm.Enums.ViewportType.STACK) {
      // check if imageIds is valid
      if (!viewportData.data[0].imageIds?.length) {
        return;
      }
    }

    // This is the old viewportInfo, which may have old options but we might be
    // using its viewport (same viewportId as the new viewportInfo)
    const viewportInfo = this.viewportsById.get(viewportId);

    // We should store the presentation for the current viewport since we can't only
    // rely to store it WHEN the viewport is disabled since we might keep around the
    // same viewport/element and just change the viewportData for it (drag and drop etc.)
    // the disableElement storePresentation handle would not be called in this case
    // and we would lose the presentation.
    this.storePresentation({
      viewportId: viewportInfo.getViewportId()
    });

    // Todo: i don't like this here, move it
    this.servicesManager.services.segmentationService.clearSegmentationRepresentations(viewportInfo.getViewportId());
    if (!viewportInfo) {
      throw new Error('element is not enabled for the given viewportId');
    }

    // override the viewportOptions and displaySetOptions with the public ones
    // since those are the newly set ones, we set them here so that it handles defaults
    const displaySetOptions = viewportInfo.setPublicDisplaySetOptions(publicDisplaySetOptions);
    // Specify an over-ride for the viewport type, even though it is in the public
    // viewport options, because the one in the viewportData is a requirement based on the
    // type of data being displayed.
    const viewportOptions = viewportInfo.setPublicViewportOptions(publicViewportOptions, viewportData.viewportType);
    const element = viewportInfo.getElement();
    const type = viewportInfo.getViewportType();
    const background = viewportInfo.getBackground();
    const orientation = viewportInfo.getOrientation();
    const displayArea = viewportInfo.getDisplayArea();
    const viewportInput = {
      viewportId,
      element,
      type,
      defaultOptions: {
        background,
        orientation,
        displayArea
      }
    };

    // Rendering Engine Id set should happen before enabling the element
    // since there are callbacks that depend on the renderingEngine id
    // Todo: however, this is a limitation which means that we can't change
    // the rendering engine id for a given viewport which might be a super edge
    // case
    viewportInfo.setRenderingEngineId(renderingEngine.id);

    // Todo: this is not optimal at all, we are re-enabling the already enabled
    // element which is not what we want. But enabledElement as part of the
    // renderingEngine is designed to be used like this. This will trigger
    // ENABLED_ELEMENT again and again, which will run onEnableElement callbacks
    renderingEngine.enableElement(viewportInput);
    viewportInfo.setViewportOptions(viewportOptions);
    viewportInfo.setDisplaySetOptions(displaySetOptions);
    viewportInfo.setViewportData(viewportData);
    viewportInfo.setViewportId(viewportId);
    this.viewportsById.set(viewportId, viewportInfo);
    const viewport = renderingEngine.getViewport(viewportId);
    const displaySetPromise = this._setDisplaySets(viewport, viewportData, viewportInfo, presentations);

    // The broadcast event here ensures that listeners have a valid, up to date
    // viewport to access.  Doing it too early can result in exceptions or
    // invalid data.
    displaySetPromise.then(() => {
      this._broadcastEvent(this.EVENTS.VIEWPORT_DATA_CHANGED, {
        viewportData,
        viewportId
      });
    });
  }

  /**
   * Retrieves the Cornerstone viewport with the specified ID.
   *
   * @param viewportId - The ID of the viewport.
   * @returns The Cornerstone viewport object if found, otherwise null.
   */
  getCornerstoneViewport(viewportId) {
    const viewportInfo = this.getViewportInfo(viewportId);
    if (!viewportInfo || !this.renderingEngine || this.renderingEngine.hasBeenDestroyed) {
      return null;
    }
    const viewport = this.renderingEngine.getViewport(viewportId);
    return viewport;
  }

  /**
   * Retrieves the viewport information for a given viewport ID. The viewport information
   * is the OHIF construct that holds different options and data for a given viewport and
   * is different from the cornerstone viewport.
   *
   * @param viewportId The ID of the viewport.
   * @returns The viewport information.
   */
  getViewportInfo(viewportId) {
    return this.viewportsById.get(viewportId);
  }

  /**
   * Looks through the viewports to see if the specified measurement can be
   * displayed in one of the viewports. This function tries to get a "best fit"
   * viewport to display the image in where it matches, in order:
   *   * Active viewport that can be navigated to the given image without orientation change
   *   * Other viewport that can be navigated to the given image without orientation change
   *   * Active viewport that can change orientation to display the image
   *   * Other viewport that can change orientation to display the image
   *
   * It returns `null` otherwise, indicating that a viewport needs display set/type
   * changes in order to display the image.
   *
   * Notes:
   *   * If the display set is displayed in multiple viewports all needing orientation change,
   *     then the active one or first one listed will be modified.  This can create unexpected
   *     behaviour for MPR views.
   *   * If the image is contained in multiple display sets, then the first one
   *     found will be navigated (active first, followed by first found)
   *
   * @param measurement - The measurement that is desired to view.
   * @param activeViewportId - the index that was active at the time the jump
   *          was initiated.
   * @return the viewportId that the measurement should be displayed in.
   */
  getViewportIdToJump(activeViewportId, metadata) {
    // First check if the active viewport can just be navigated to show the given item
    const activeViewport = this.getCornerstoneViewport(activeViewportId);
    if (activeViewport.isReferenceViewable(metadata, {
      withNavigation: true
    })) {
      return activeViewportId;
    }

    // Next, see if any viewport could be navigated to show the given item,
    // without considering orientation changes.
    for (const id of this.viewportsById.keys()) {
      const viewport = this.getCornerstoneViewport(id);
      if (viewport?.isReferenceViewable(metadata, {
        withNavigation: true
      })) {
        return id;
      }
    }

    // No viewport is in the right display set/orientation to show this, so see if
    // the active viewport could change orientations to show this
    if (activeViewport.isReferenceViewable(metadata, {
      withNavigation: true,
      withOrientation: true
    })) {
      return activeViewportId;
    }

    // See if any viewport could show this with an orientation change
    for (const id of this.viewportsById.keys()) {
      const viewport = this.getCornerstoneViewport(id);
      if (viewport?.isReferenceViewable(metadata, {
        withNavigation: true,
        withOrientation: true
      })) {
        return id;
      }
    }

    // No luck, need to update the viewport itself
    return null;
  }

  /**
   * Sets the image data for the given viewport.
   */
  async _setOtherViewport(viewport, viewportData, viewportInfo, _presentations = {}) {
    const [displaySet] = viewportData.data;
    return viewport.setDataIds(displaySet.imageIds, {
      groupId: displaySet.displaySetInstanceUID,
      viewReference: viewportInfo.getViewReference()
    });
  }
  async _setStackViewport(viewport, viewportData, viewportInfo, presentations = {}) {
    const displaySetOptions = viewportInfo.getDisplaySetOptions();
    const displaySetInstanceUIDs = viewportData.data.map(data => data.displaySetInstanceUID);

    // based on the cache service construct always the first one is the non-overlay
    // and the rest are overlays

    this.viewportsDisplaySets.set(viewport.id, [...displaySetInstanceUIDs]);
    const {
      initialImageIndex,
      imageIds
    } = viewportData.data[0];

    // Use the slice index from any provided view reference, as the view reference
    // is being used to navigate to the initial view position for measurement
    // navigation and other navigation forcing specific views.
    let initialImageIndexToUse = presentations?.positionPresentation?.initialImageIndex ?? initialImageIndex;
    if (initialImageIndexToUse === undefined || initialImageIndexToUse === null) {
      initialImageIndexToUse = this._getInitialImageIndexForViewport(viewportInfo, imageIds) || 0;
    }
    const {
      rotation,
      flipHorizontal,
      displayArea
    } = viewportInfo.getViewportOptions();
    const properties = {
      ...presentations.lutPresentation?.properties
    };
    if (!presentations.lutPresentation?.properties) {
      const {
        voi,
        voiInverted,
        colormap
      } = displaySetOptions[0];
      if (voi && (voi.windowWidth || voi.windowCenter)) {
        const {
          lower,
          upper
        } = esm.utilities.windowLevel.toLowHighRange(voi.windowWidth, voi.windowCenter);
        properties.voiRange = {
          lower,
          upper
        };
      }
      properties.invert = voiInverted ?? properties.invert;
      properties.colormap = colormap ?? properties.colormap;
    }
    viewport.element.addEventListener(esm.Enums.Events.VIEWPORT_NEW_IMAGE_SET, evt => {
      const {
        element
      } = evt.detail;
      if (element !== viewport.element) {
        return;
      }
      dist_esm.utilities.stackContextPrefetch.enable(element);
    });
    let imageIdsToSet = imageIds;
    const res = this._processExtraDisplaySetsForViewport(viewport);
    imageIdsToSet = res?.imageIds ?? imageIdsToSet;
    return viewport.setStack(imageIdsToSet, initialImageIndexToUse).then(() => {
      viewport.setProperties({
        ...properties
      });
      this.setPresentations(viewport.id, presentations, viewportInfo);
      if (displayArea) {
        viewport.setDisplayArea(displayArea);
      }
      if (rotation) {
        viewport.setProperties({
          rotation
        });
      }
      if (flipHorizontal) {
        viewport.setCamera({
          flipHorizontal: true
        });
      }
    });
  }
  _getInitialImageIndexForViewport(viewportInfo, imageIds) {
    const initialImageOptions = viewportInfo.getInitialImageOptions();
    if (!initialImageOptions) {
      return;
    }
    const {
      index,
      preset
    } = initialImageOptions;
    const viewportType = viewportInfo.getViewportType();
    let numberOfSlices;
    if (viewportType === esm.Enums.ViewportType.STACK) {
      numberOfSlices = imageIds.length;
    } else if (viewportType === esm.Enums.ViewportType.ORTHOGRAPHIC) {
      const viewport = this.getCornerstoneViewport(viewportInfo.getViewportId());
      const imageSliceData = esm.utilities.getImageSliceDataForVolumeViewport(viewport);
      if (!imageSliceData) {
        return;
      }
      ({
        numberOfSlices
      } = imageSliceData);
    } else {
      return;
    }
    return this._getInitialImageIndex(numberOfSlices, index, preset);
  }
  _getInitialImageIndex(numberOfSlices, imageIndex, preset) {
    const lastSliceIndex = numberOfSlices - 1;
    if (imageIndex !== undefined) {
      return esm.utilities.clip(imageIndex, 0, lastSliceIndex);
    }
    if (preset === utils_JumpPresets.First) {
      return 0;
    }
    if (preset === utils_JumpPresets.Last) {
      return lastSliceIndex;
    }
    if (preset === utils_JumpPresets.Middle) {
      // Note: this is a simple but yet very important formula.
      // since viewport reset works with the middle slice
      // if the below formula is not correct, on a viewport reset
      // it will jump to a different slice than the middle one which
      // was the initial slice, and we have some tools such as Crosshairs
      // which rely on a relative camera modifications and those will break.
      return lastSliceIndex % 2 === 0 ? lastSliceIndex / 2 : (lastSliceIndex + 1) / 2;
    }
    return 0;
  }
  async _setVolumeViewport(viewport, viewportData, viewportInfo, presentations = {}) {
    // TODO: We need to overhaul the way data sources work so requests can be made
    // async. I think we should follow the image loader pattern which is async and
    // has a cache behind it.
    // The problem is that to set this volume, we need the metadata, but the request is
    // already in-flight, and the promise is not cached, so we have no way to wait for
    // it and know when it has fully arrived.
    // loadStudyMetadata(StudyInstanceUID) => Promise([instances for study])
    // loadSeriesMetadata(StudyInstanceUID, SeriesInstanceUID) => Promise([instances for series])
    // If you call loadStudyMetadata and it's not in the DicomMetadataStore cache, it should fire
    // a request through the data source?
    // (This call may or may not create sub-requests for series metadata)
    const volumeInputArray = [];
    const displaySetOptionsArray = viewportInfo.getDisplaySetOptions();
    const {
      hangingProtocolService
    } = this.servicesManager.services;
    const volumeToLoad = [];
    const displaySetInstanceUIDs = [];
    for (const [index, data] of viewportData.data.entries()) {
      const {
        volume,
        imageIds,
        displaySetInstanceUID
      } = data;
      displaySetInstanceUIDs.push(displaySetInstanceUID);
      if (!volume) {
        console.log('Volume display set not found');
        continue;
      }
      volumeToLoad.push(volume);
      const displaySetOptions = displaySetOptionsArray[index];
      const {
        volumeId
      } = volume;
      volumeInputArray.push({
        imageIds,
        volumeId,
        blendMode: displaySetOptions.blendMode,
        slabThickness: this._getSlabThickness(displaySetOptions, volumeId)
      });
    }
    this.viewportsDisplaySets.set(viewport.id, displaySetInstanceUIDs);
    const volumesNotLoaded = volumeToLoad.filter(volume => !volume.loadStatus?.loaded);
    if (volumesNotLoaded.length) {
      if (hangingProtocolService.getShouldPerformCustomImageLoad()) {
        // delegate the volume loading to the hanging protocol service if it has a custom image load strategy
        return hangingProtocolService.runImageLoadStrategy({
          viewportId: viewport.id,
          volumeInputArray
        });
      }
      volumesNotLoaded.forEach(volume => {
        if (!volume.loadStatus?.loading && volume.load instanceof Function) {
          volume.load();
        }
      });
    }

    // It's crucial not to return here because the volume may be loaded,
    // but the viewport also needs to set the volume.
    // if (!volumesNotLoaded.length) {
    //   return;
    // }

    // This returns the async continuation only
    return this.setVolumesForViewport(viewport, volumeInputArray, presentations);
  }
  async setVolumesForViewport(viewport, volumeInputArray, presentations) {
    const {
      displaySetService,
      viewportGridService
    } = this.servicesManager.services;
    const viewportInfo = this.getViewportInfo(viewport.id);
    const displaySetOptions = viewportInfo.getDisplaySetOptions();
    const displaySetUIDs = viewportGridService.getDisplaySetsUIDsForViewport(viewport.id);
    const displaySet = displaySetService.getDisplaySetByUID(displaySetUIDs[0]);
    const displaySetModality = displaySet?.Modality;
    // Todo: use presentations states
    const volumesProperties = volumeInputArray.map((volumeInput, index) => {
      const {
        volumeId
      } = volumeInput;
      const displaySetOption = displaySetOptions[index];
      const {
        voi,
        voiInverted,
        colormap,
        displayPreset
      } = displaySetOption;
      const properties = {};
      if (voi && (voi.windowWidth || voi.windowCenter)) {
        const {
          lower,
          upper
        } = esm.utilities.windowLevel.toLowHighRange(voi.windowWidth, voi.windowCenter);
        properties.voiRange = {
          lower,
          upper
        };
      }
      if (voiInverted !== undefined) {
        properties.invert = voiInverted;
      }
      if (colormap !== undefined) {
        properties.colormap = colormap;
      }
      if (displayPreset !== undefined) {
        properties.preset = displayPreset[displaySetModality] || displayPreset.default;
      }
      return {
        properties,
        volumeId
      };
    });

    // For SEG and RT viewports
    this._processExtraDisplaySetsForViewport(viewport);
    await viewport.setVolumes(volumeInputArray);
    volumesProperties.forEach(({
      properties,
      volumeId
    }) => {
      viewport.setProperties(properties, volumeId);
    });
    this.setPresentations(viewport.id, presentations, viewportInfo);
    const imageIndex = this._getInitialImageIndexForViewport(viewportInfo);
    if (imageIndex !== undefined) {
      esm.utilities.jumpToSlice(viewport.element, {
        imageIndex
      });
    }
    viewport.render();
    this._broadcastEvent(this.EVENTS.VIEWPORT_VOLUMES_CHANGED, {
      viewportInfo
    });
  }
  _processExtraDisplaySetsForViewport(viewport) {
    const {
      displaySetService
    } = this.servicesManager.services;

    // load any secondary displaySets
    const displaySetInstanceUIDs = this.viewportsDisplaySets.get(viewport.id);

    // Can be SEG or RTSTRUCT for now but not PMAP
    const segOrRTSOverlayDisplaySet = displaySetInstanceUIDs.map(displaySetService.getDisplaySetByUID).find(displaySet => displaySet?.isOverlayDisplaySet && ['SEG', 'RTSTRUCT'].includes(displaySet.Modality));

    // if it is only the overlay displaySet, then we need to get the reference
    // displaySet imageIds and set them as the imageIds for the viewport,
    // here we can do some logic if the reference is missing
    // then find the most similar match of displaySet instead
    if (!segOrRTSOverlayDisplaySet) {
      return;
    }
    const referenceDisplaySet = displaySetService.getDisplaySetByUID(segOrRTSOverlayDisplaySet.referencedDisplaySetInstanceUID);
    const imageIds = referenceDisplaySet.images.map(image => image.imageId);
    this.addOverlayRepresentationForDisplaySet(segOrRTSOverlayDisplaySet, viewport);
    return {
      imageIds
    };
  }
  addOverlayRepresentationForDisplaySet(displaySet, viewport) {
    const {
      segmentationService
    } = this.servicesManager.services;
    const segmentationId = displaySet.displaySetInstanceUID;
    const representationType = displaySet.Modality === 'SEG' ? dist_esm.Enums.SegmentationRepresentations.Labelmap : dist_esm.Enums.SegmentationRepresentations.Contour;
    segmentationService.addSegmentationRepresentation(viewport.id, {
      segmentationId,
      type: representationType
    });

    // store the segmentation presentation id in the viewport info
    this.storePresentation({
      viewportId: viewport.id
    });
  }

  // Todo: keepCamera is an interim solution until we have a better solution for
  // keeping the camera position when the viewport data is changed
  updateViewport(viewportId, viewportData, keepCamera = false) {
    const viewportInfo = this.getViewportInfo(viewportId);
    const viewport = this.getCornerstoneViewport(viewportId);
    const viewportCamera = viewport.getCamera();
    let displaySetPromise;
    if (viewport instanceof esm.VolumeViewport || viewport instanceof esm.VolumeViewport3D) {
      displaySetPromise = this._setVolumeViewport(viewport, viewportData, viewportInfo).then(() => {
        if (keepCamera) {
          viewport.setCamera(viewportCamera);
          viewport.render();
        }
      });
    }
    if (viewport instanceof esm.StackViewport) {
      displaySetPromise = this._setStackViewport(viewport, viewportData, viewportInfo);
    }
    displaySetPromise.then(() => {
      this._broadcastEvent(this.EVENTS.VIEWPORT_DATA_CHANGED, {
        viewportData,
        viewportId
      });
    });
  }
  _setDisplaySets(viewport, viewportData, viewportInfo, presentations = {}) {
    if (viewport instanceof esm.StackViewport) {
      return this._setStackViewport(viewport, viewportData, viewportInfo, presentations);
    }
    if ([esm.VolumeViewport, esm.VolumeViewport3D].some(type => viewport instanceof type)) {
      return this._setVolumeViewport(viewport, viewportData, viewportInfo, presentations);
    }
    return this._setOtherViewport(viewport, viewportData, viewportInfo, presentations);
  }

  /**
   * Removes the resize observer from the viewport element
   */
  _removeResizeObserver() {
    if (this.viewportGridResizeObserver) {
      this.viewportGridResizeObserver.disconnect();
    }
  }
  _getSlabThickness(displaySetOptions, volumeId) {
    const {
      blendMode
    } = displaySetOptions;
    if (blendMode === undefined || displaySetOptions.slabThickness === undefined) {
      return;
    }

    // if there is a slabThickness set as a number then use it
    if (typeof displaySetOptions.slabThickness === 'number') {
      return displaySetOptions.slabThickness;
    }
    if (displaySetOptions.slabThickness.toLowerCase() === 'fullvolume') {
      // calculate the slab thickness based on the volume dimensions
      const imageVolume = esm.cache.getVolume(volumeId);
      const {
        dimensions,
        spacing
      } = imageVolume;
      const slabThickness = Math.sqrt(Math.pow(dimensions[0] * spacing[0], 2) + Math.pow(dimensions[1] * spacing[1], 2) + Math.pow(dimensions[2] * spacing[2], 2));
      return slabThickness;
    }
  }
  _getFrameOfReferenceUID(displaySetInstanceUID) {
    const {
      displaySetService
    } = this.servicesManager.services;
    const displaySet = displaySetService.getDisplaySetByUID(displaySetInstanceUID);
    if (!displaySet) {
      return;
    }
    if (displaySet.frameOfReferenceUID) {
      return displaySet.frameOfReferenceUID;
    }
    if (displaySet.Modality === 'SEG') {
      const {
        instance
      } = displaySet;
      return instance.FrameOfReferenceUID;
    }
    if (displaySet.Modality === 'RTSTRUCT') {
      const {
        instance
      } = displaySet;
      return instance.ReferencedFrameOfReferenceSequence.FrameOfReferenceUID;
    }
    const {
      images
    } = displaySet;
    if (images && images.length) {
      return images[0].FrameOfReferenceUID;
    }
  }
  enqueueViewportResizeRequest() {
    this.resizeQueue.push(false); // false indicates viewport resize

    clearTimeout(this.viewportResizeTimer);
    this.viewportResizeTimer = setTimeout(() => {
      this.processViewportResizeQueue();
    }, this.gridResizeDelay);
  }
  processViewportResizeQueue() {
    const isGridResizeInQueue = this.resizeQueue.some(isGridResize => isGridResize);
    if (this.resizeQueue.length > 0 && !isGridResizeInQueue && !this.gridResizeTimeOut) {
      this.performResize();
    }

    // Clear the queue after processing viewport resizes
    this.resizeQueue = [];
  }
  performResize() {
    const isImmediate = false;
    try {
      const viewports = this.getRenderingEngine().getViewports();

      // Store the current position presentations for each viewport.
      viewports.forEach(({
        id: viewportId
      }) => {
        const presentation = this._getPositionPresentation(viewportId);
        this.beforeResizePositionPresentations.set(viewportId, presentation);
      });

      // Resize the rendering engine and render.
      const renderingEngine = this.renderingEngine;
      renderingEngine.resize(isImmediate);
      renderingEngine.render();

      // Reset the camera for viewports that should reset their camera on resize,
      // which means only those viewports that have a zoom level of 1.
      this.beforeResizePositionPresentations.forEach((positionPresentation, viewportId) => {
        this.setPresentations(viewportId, {
          positionPresentation
        });
      });

      // Resize and render the rendering engine again.
      renderingEngine.resize(isImmediate);
      renderingEngine.render();
    } catch (e) {
      // This can happen if the resize is too close to navigation or shutdown
      console.warn('Caught resize exception', e);
    }
  }
  resetGridResizeTimeout() {
    clearTimeout(this.gridResizeTimeOut);
    this.gridResizeTimeOut = setTimeout(() => {
      this.gridResizeTimeOut = null;
    }, this.gridResizeDelay);
  }
  _setLutPresentation(viewport, lutPresentation) {
    if (!lutPresentation) {
      return;
    }
    const {
      properties
    } = lutPresentation;
    if (viewport instanceof esm.BaseVolumeViewport) {
      if (properties instanceof Map) {
        properties.forEach((propertiesEntry, volumeId) => {
          viewport.setProperties(propertiesEntry, volumeId);
        });
      } else {
        viewport.setProperties(properties);
      }
    } else {
      viewport.setProperties(properties);
    }
  }
  _setPositionPresentation(viewport, positionPresentation) {
    const viewRef = positionPresentation?.viewReference;
    if (viewRef) {
      viewport.setViewReference(viewRef);
    }
    const viewPresentation = positionPresentation?.viewPresentation;
    if (viewPresentation) {
      viewport.setViewPresentation(viewPresentation);
    }
  }
  _setSegmentationPresentation(viewport, segmentationPresentation) {
    if (!segmentationPresentation) {
      return;
    }
    const {
      segmentationService
    } = this.servicesManager.services;
    segmentationPresentation.forEach(presentationItem => {
      const {
        segmentationId,
        type,
        hydrated
      } = presentationItem;
      if (hydrated) {
        segmentationService.addSegmentationRepresentation(viewport.id, {
          segmentationId,
          type
        });
      }
    });
  }
}
_CornerstoneViewportService = CornerstoneViewportService;
CornerstoneViewportService.REGISTRATION = {
  name: 'cornerstoneViewportService',
  altName: 'CornerstoneViewportService',
  create: ({
    servicesManager
  }) => {
    return new _CornerstoneViewportService(servicesManager);
  }
};
/* harmony default export */ const ViewportService_CornerstoneViewportService = (CornerstoneViewportService);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/types/Colorbar.ts
let ChangeTypes = /*#__PURE__*/function (ChangeTypes) {
  ChangeTypes["Removed"] = "removed";
  ChangeTypes["Added"] = "added";
  ChangeTypes["Modified"] = "modified";
  return ChangeTypes;
}({});
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/services/ColorbarService/ColorbarService.ts
var _ColorbarService;





const {
  ViewportColorbar
} = dist_esm.utilities.voi.colorbar;
class ColorbarService extends src/* PubSubService */.Rc {
  constructor() {
    super(ColorbarService.EVENTS);
    this.colorbars = {};
  }

  /**
   * Gets the volume ID for a given identifier by searching through the viewport's volume IDs.
   * @param viewport - The viewport instance to search volumes in
   * @param searchId - The identifier to search for within volume IDs
   * @returns The matching volume ID if found, null otherwise
   */
  getVolumeIdForIdentifier(viewport, searchId) {
    const volumeIds = viewport.getAllVolumeIds?.() || [];
    return volumeIds.length > 0 ? volumeIds.find(id => id.includes(searchId)) || null : null;
  }

  /**
   * Adds a colorbar to a specific viewport identified by `viewportId`, using the provided `displaySetInstanceUIDs` and `options`.
   * This method sets up the colorbar, associates it with the viewport, and applies initial configurations based on the provided options.
   *
   * @param viewportId The identifier for the viewport where the colorbar will be added.
   * @param displaySetInstanceUIDs An array of display set instance UIDs to associate with the colorbar.
   * @param options Configuration options for the colorbar, including position, colormaps, active colormap name, ticks, and width.
   */
  addColorbar(viewportId, displaySetInstanceUIDs, options = {}) {
    const renderingEngine = (0,esm.getRenderingEngine)(RENDERING_ENGINE_ID);
    const viewport = renderingEngine.getViewport(viewportId);
    if (!viewport) {
      return;
    }
    const {
      element
    } = viewport;
    const actorEntries = viewport.getActors();
    if (!actorEntries || actorEntries.length === 0) {
      return;
    }
    const {
      position,
      width: thickness,
      activeColormapName,
      colormaps
    } = options;
    const numContainers = displaySetInstanceUIDs.length;
    const containers = this.createContainers(numContainers, element, position, thickness, viewportId);
    displaySetInstanceUIDs.forEach((displaySetInstanceUID, index) => {
      const volumeId = this.getVolumeIdForIdentifier(viewport, displaySetInstanceUID);
      const properties = viewport?.getProperties(volumeId);
      const colormap = properties?.colormap;
      if (activeColormapName && !colormap) {
        this.setViewportColormap(viewportId, displaySetInstanceUID, colormaps[activeColormapName], true);
      }
      const colorbarContainer = containers[index];
      const colorbar = new ViewportColorbar({
        id: `ctColorbar-${viewportId}-${index}`,
        element,
        colormaps: options.colormaps || {},
        // if there's an existing colormap set, we use it, otherwise we use the activeColormapName, otherwise, grayscale
        activeColormapName: colormap?.name || options?.activeColormapName || 'Grayscale',
        container: colorbarContainer,
        ticks: {
          ...ColorbarService.defaultTickStyles,
          ...options.ticks
        },
        volumeId: viewport instanceof esm.VolumeViewport ? volumeId : undefined
      });
      if (this.colorbars[viewportId]) {
        this.colorbars[viewportId].push({
          colorbar,
          container: colorbarContainer
        });
      } else {
        this.colorbars[viewportId] = [{
          colorbar,
          container: colorbarContainer
        }];
      }
    });
    this._broadcastEvent(ColorbarService.EVENTS.STATE_CHANGED, {
      viewportId,
      changeType: ChangeTypes.Added
    });
  }

  /**
   * Removes the colorbar associated with a given viewport ID. This involves cleaning up any created DOM elements and internal references.
   *
   * @param viewportId The identifier for the viewport from which the colorbar will be removed.
   */
  removeColorbar(viewportId) {
    const colorbarInfo = this.colorbars[viewportId];
    if (!colorbarInfo) {
      return;
    }
    colorbarInfo.forEach(({
      colorbar,
      container
    }) => {
      container.parentNode.removeChild(container);
    });
    delete this.colorbars[viewportId];
    this._broadcastEvent(ColorbarService.EVENTS.STATE_CHANGED, {
      viewportId,
      changeType: ChangeTypes.Removed
    });
  }

  /**
   * Checks whether a colorbar is associated with a given viewport ID.
   *
   * @param viewportId The identifier for the viewport to check.
   * @returns `true` if a colorbar exists for the specified viewport, otherwise `false`.
   */
  hasColorbar(viewportId) {
    return this.colorbars[viewportId] ? true : false;
  }

  /**
   * Retrieves the current state of colorbars, including all active colorbars and their configurations.
   *
   * @returns An object representing the current state of all colorbars managed by this service.
   */
  getState() {
    return this.colorbars;
  }

  /**
   * Retrieves colorbar information for a specific viewport ID.
   *
   * @param viewportId The identifier for the viewport to retrieve colorbar information for.
   * @returns The colorbar information associated with the specified viewport, if available.
   */
  getViewportColorbar(viewportId) {
    return this.colorbars[viewportId];
  }

  /**
   * Handles the cleanup and removal of all colorbars from the viewports. This is typically called
   * when exiting the mode or context in which the colorbars are used, ensuring that no DOM
   * elements or references are left behind.
   */
  onModeExit() {
    const viewportIds = Object.keys(this.colorbars);
    viewportIds.forEach(viewportId => {
      this.removeColorbar(viewportId);
    });
  }

  /**
   * Sets the colormap for a viewport. This function is used internally to update the colormap the viewport
   *
   * @param viewportId The identifier of the viewport to update.
   * @param displaySetInstanceUID The display set instance UID associated with the viewport.
   * @param colormap The colormap object to set on the viewport.
   * @param immediate A boolean indicating whether the viewport should be re-rendered immediately after setting the colormap.
   */
  setViewportColormap(viewportId, displaySetInstanceUID, colormap, immediate = false) {
    const renderingEngine = (0,esm.getRenderingEngine)(RENDERING_ENGINE_ID);
    const viewport = renderingEngine.getViewport(viewportId);
    const actorEntries = viewport?.getActors();
    if (!viewport || !actorEntries || actorEntries.length === 0) {
      return;
    }
    const setViewportProperties = (viewport, uid) => {
      const volumeId = this.getVolumeIdForIdentifier(viewport, uid);
      viewport.setProperties({
        colormap
      }, volumeId);
    };
    if (viewport instanceof esm.StackViewport) {
      setViewportProperties(viewport, viewportId);
    }
    if (viewport instanceof esm.VolumeViewport) {
      setViewportProperties(viewport, displaySetInstanceUID);
    }
    if (immediate) {
      viewport.render();
    }
  }

  /**
   * Creates the container elements for colorbars based on the specified parameters. This function dynamically
   * generates and styles DOM elements to host the colorbars, positioning them according to the specified options.
   *
   * @param numContainers The number of containers to create, typically corresponding to the number of colorbars.
   * @param element The DOM element within which the colorbar containers will be placed.
   * @param position The position of the colorbar containers (e.g., 'top', 'bottom', 'left', 'right').
   * @param thickness The thickness of the colorbar containers, affecting their width or height depending on their position.
   * @param viewportId The identifier of the viewport for which the containers are being created.
   * @returns An array of the created container DOM elements.
   */
  createContainers(numContainers, element, position, thickness, viewportId) {
    const containers = [];
    const dimensions = {
      1: 50,
      2: 33
    };
    const dimension = dimensions[numContainers] || 50 / numContainers;
    Array.from({
      length: numContainers
    }).forEach((_, i) => {
      const colorbarContainer = document.createElement('div');
      colorbarContainer.id = `ctColorbarContainer-${viewportId}-${i + 1}`;
      Object.assign(colorbarContainer.style, ColorbarService.defaultStyles);
      if (['top', 'bottom'].includes(position)) {
        Object.assign(colorbarContainer.style, {
          width: `${dimension}%`,
          height: thickness || '2.5%',
          left: `${(i + 1) * dimension}%`,
          transform: 'translateX(-50%)',
          ...ColorbarService.positionStyles[position]
        });
      } else if (['left', 'right'].includes(position)) {
        Object.assign(colorbarContainer.style, {
          height: `${dimension}%`,
          width: thickness || '2.5%',
          top: `${(i + 1) * dimension}%`,
          transform: 'translateY(-50%)',
          ...ColorbarService.positionStyles[position]
        });
      }
      element.appendChild(colorbarContainer);
      containers.push(colorbarContainer);
    });
    return containers;
  }
}
_ColorbarService = ColorbarService;
ColorbarService.EVENTS = {
  STATE_CHANGED: 'event::ColorbarService:stateChanged'
};
ColorbarService.defaultStyles = {
  position: 'absolute',
  boxSizing: 'border-box',
  border: 'solid 1px #555',
  cursor: 'initial'
};
ColorbarService.positionStyles = {
  left: {
    left: '5%'
  },
  right: {
    right: '5%'
  },
  top: {
    top: '5%'
  },
  bottom: {
    bottom: '5%'
  }
};
ColorbarService.defaultTickStyles = {
  position: 'left',
  style: {
    font: '12px Arial',
    color: '#fff',
    maxNumTicks: 8,
    tickSize: 5,
    tickWidth: 1,
    labelMargin: 3
  }
};
ColorbarService.REGISTRATION = {
  name: 'colorbarService',
  create: () => {
    return new _ColorbarService();
  }
};
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/services/ColorbarService/index.ts

/* harmony default export */ const services_ColorbarService = (ColorbarService);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/types/index.ts


// EXTERNAL MODULE: ../../../node_modules/dicomweb-client/build/dicomweb-client.es.js
var dicomweb_client_es = __webpack_require__(83562);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/dicomLoaderService.js




const getImageId = imageObj => {
  if (!imageObj) {
    return;
  }
  return typeof imageObj.getImageId === 'function' ? imageObj.getImageId() : imageObj.url;
};
const findImageIdOnStudies = (studies, displaySetInstanceUID) => {
  const study = studies.find(study => {
    const displaySet = study.displaySets.some(displaySet => displaySet.displaySetInstanceUID === displaySetInstanceUID);
    return displaySet;
  });
  const {
    series = []
  } = study;
  const {
    instances = []
  } = series[0] || {};
  const instance = instances[0];
  return getImageId(instance);
};
const someInvalidStrings = strings => {
  const stringsArray = Array.isArray(strings) ? strings : [strings];
  const emptyString = string => !string;
  let invalid = stringsArray.some(emptyString);
  return invalid;
};
const getImageInstance = dataset => {
  return dataset && dataset.images && dataset.images[0];
};
const getNonImageInstance = dataset => {
  return dataset && dataset.instance;
};
const getImageInstanceId = imageInstance => {
  return getImageId(imageInstance);
};
const fetchIt = (url, headers = src/* DICOMWeb */.ll.getAuthorizationHeader()) => {
  return fetch(url, headers).then(response => response.arrayBuffer());
};
const cornerstoneRetriever = imageId => {
  return esm.imageLoader.loadAndCacheImage(imageId).then(image => {
    return image && image.data && image.data.byteArray.buffer;
  });
};
const wadorsRetriever = (url, studyInstanceUID, seriesInstanceUID, sopInstanceUID, headers = src/* DICOMWeb */.ll.getAuthorizationHeader(), errorInterceptor = src/* errorHandler */.r_.getHTTPErrorHandler()) => {
  const config = {
    url,
    headers,
    errorInterceptor
  };
  const dicomWeb = new dicomweb_client_es/* api */.FH.DICOMwebClient(config);
  return dicomWeb.retrieveInstance({
    studyInstanceUID,
    seriesInstanceUID,
    sopInstanceUID
  });
};
const getImageLoaderType = imageId => {
  const loaderRegExp = /^\w+\:/;
  const loaderType = loaderRegExp.exec(imageId);
  return loaderRegExp.lastIndex === 0 && loaderType && loaderType[0] && loaderType[0].replace(':', '') || '';
};
class DicomLoaderService {
  getLocalData(dataset, studies) {
    // Use referenced imageInstance
    const imageInstance = getImageInstance(dataset);
    const nonImageInstance = getNonImageInstance(dataset);
    if (!imageInstance && !nonImageInstance || !nonImageInstance.imageId?.startsWith('dicomfile')) {
      return;
    }
    const instance = imageInstance || nonImageInstance;
    let imageId = getImageInstanceId(instance);

    // or Try to get it from studies
    if (someInvalidStrings(imageId)) {
      imageId = findImageIdOnStudies(studies, dataset.displaySetInstanceUID);
    }
    if (!someInvalidStrings(imageId)) {
      return dicom_image_loader_dist_esm/* default.wadouri */.Ay.wadouri.loadFileRequest(imageId);
    }
  }
  getDataByImageType(dataset) {
    const imageInstance = getImageInstance(dataset);
    if (imageInstance) {
      const imageId = getImageInstanceId(imageInstance);
      let getDicomDataMethod = fetchIt;
      const loaderType = getImageLoaderType(imageId);
      switch (loaderType) {
        case 'dicomfile':
          getDicomDataMethod = cornerstoneRetriever.bind(this, imageId);
          break;
        case 'wadors':
          const url = imageInstance.getData().wadoRoot;
          const studyInstanceUID = imageInstance.getStudyInstanceUID();
          const seriesInstanceUID = imageInstance.getSeriesInstanceUID();
          const sopInstanceUID = imageInstance.getSOPInstanceUID();
          const invalidParams = someInvalidStrings([url, studyInstanceUID, seriesInstanceUID, sopInstanceUID]);
          if (invalidParams) {
            return;
          }
          getDicomDataMethod = wadorsRetriever.bind(this, url, studyInstanceUID, seriesInstanceUID, sopInstanceUID);
          break;
        case 'wadouri':
          // Strip out the image loader specifier
          imageId = imageId.substring(imageId.indexOf(':') + 1);
          if (someInvalidStrings(imageId)) {
            return;
          }
          getDicomDataMethod = fetchIt.bind(this, imageId);
          break;
        default:
          return;
      }
      return getDicomDataMethod();
    }
  }
  getDataByDatasetType(dataset) {
    const {
      StudyInstanceUID,
      SeriesInstanceUID,
      SOPInstanceUID,
      authorizationHeaders,
      wadoRoot,
      wadoUri,
      instance
    } = dataset;
    // Retrieve wadors or just try to fetch wadouri
    if (!someInvalidStrings(wadoRoot)) {
      return wadorsRetriever(wadoRoot, StudyInstanceUID, SeriesInstanceUID, SOPInstanceUID, authorizationHeaders);
    } else if (!someInvalidStrings(wadoUri)) {
      return fetchIt(wadoUri, {
        headers: authorizationHeaders
      });
    } else if (!someInvalidStrings(instance?.url)) {
      // make sure the url is absolute, remove the scope
      // from it if it is not absolute. For instance it might be dicomweb:http://....
      // and we need to remove the dicomweb: part
      const url = instance.url;
      const absoluteUrl = url.startsWith('http') ? url : url.substring(url.indexOf(':') + 1);
      return fetchIt(absoluteUrl, {
        headers: authorizationHeaders
      });
    }
  }
  *getLoaderIterator(dataset, studies, headers) {
    yield this.getLocalData(dataset, studies);
    yield this.getDataByImageType(dataset);
    yield this.getDataByDatasetType(dataset);
  }
  findDicomDataPromise(dataset, studies, headers) {
    dataset.authorizationHeaders = headers;
    const loaderIterator = this.getLoaderIterator(dataset, studies);
    // it returns first valid retriever method.
    for (const loader of loaderIterator) {
      if (loader) {
        return loader;
      }
    }

    // in case of no valid loader
    throw new Error('Invalid dicom data loader');
  }
}
const dicomLoaderService = new DicomLoaderService();
/* harmony default export */ const utils_dicomLoaderService = (dicomLoaderService);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/package.json
const package_namespaceObject = /*#__PURE__*/JSON.parse('{"UU":"@ohif/extension-cornerstone"}');
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/id.js

const id = package_namespaceObject.UU;

;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/measurementServiceMappings/index.ts


// EXTERNAL MODULE: ../../../extensions/cornerstone/src/services/ViewportActionCornersService/ViewportActionCornersService.ts
var ViewportActionCornersService = __webpack_require__(77954);
// EXTERNAL MODULE: ../../../extensions/cornerstone/src/contextProviders/ViewportActionCornersProvider.tsx
var ViewportActionCornersProvider = __webpack_require__(76255);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/synchronizers/frameViewSynchronizer.ts


const frameViewSyncCallback = (synchronizerInstance, sourceViewport, targetViewport) => {
  const renderingEngine = (0,esm.getRenderingEngine)(targetViewport.renderingEngineId);
  if (!renderingEngine) {
    throw new Error(`No RenderingEngine for Id: ${targetViewport.renderingEngineId}`);
  }
  const sViewport = renderingEngine.getViewport(sourceViewport.viewportId);
  const {
    viewportIndex: targetViewportIndex
  } = synchronizerInstance.getOptions(targetViewport.viewportId);
  const {
    viewportIndex: sourceViewportIndex
  } = synchronizerInstance.getOptions(sourceViewport.viewportId);
  if (targetViewportIndex === undefined || sourceViewportIndex === undefined) {
    throw new Error('No viewportIndex provided');
  }
  const tViewport = renderingEngine.getViewport(targetViewport.viewportId);
  const sourceSliceIndex = sViewport.getSliceIndex();
  const sliceDifference = Number(targetViewportIndex) - Number(sourceViewportIndex);
  const targetSliceIndex = sourceSliceIndex + sliceDifference;
  if (targetSliceIndex === tViewport.getSliceIndex()) {
    return;
  }
  esm.utilities.jumpToSlice(tViewport.element, {
    imageIndex: targetSliceIndex
  });
};
const createFrameViewSynchronizer = synchronizerName => {
  const synchronizer = dist_esm.SynchronizerManager.createSynchronizer(synchronizerName, esm.EVENTS.CAMERA_MODIFIED, frameViewSyncCallback);
  return synchronizer;
};

// EXTERNAL MODULE: ../../../node_modules/dcmjs/build/dcmjs.es.js
var dcmjs_es = __webpack_require__(5842);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/getSopClassHandlerModule.js




const {
  MetadataModules
} = esm.Enums;
const {
  utils: getSopClassHandlerModule_utils
} = src/* default */.Ay;
const {
  denaturalizeDataset
} = dcmjs_es/* default.data */.Ay.data.DicomMetaDictionary;
const {
  transferDenaturalizedDataset,
  fixMultiValueKeys
} = default_src.dicomWebUtils;
const SOP_CLASS_UIDS = {
  VL_WHOLE_SLIDE_MICROSCOPY_IMAGE_STORAGE: '1.2.840.10008.5.1.4.1.1.77.1.6'
};
const SOPClassHandlerId = '@ohif/extension-cornerstone.sopClassHandlerModule.DicomMicroscopySopClassHandler';
function _getDisplaySetsFromSeries(instances, servicesManager, extensionManager) {
  // If the series has no instances, stop here
  if (!instances || !instances.length) {
    throw new Error('No instances were provided');
  }
  const instance = instances[0];
  let singleFrameInstance = instance;
  let currentFrames = +singleFrameInstance.NumberOfFrames || 1;
  for (const instanceI of instances) {
    const framesI = +instanceI.NumberOfFrames || 1;
    if (framesI < currentFrames) {
      singleFrameInstance = instanceI;
      currentFrames = framesI;
    }
  }
  let imageIdForThumbnail = null;
  const dataSource = extensionManager.getActiveDataSource()[0];
  if (singleFrameInstance) {
    if (currentFrames == 1) {
      // Not all DICOM server implementations support thumbnail service,
      // So if we have a single-frame image, we will prefer it.
      imageIdForThumbnail = singleFrameInstance.imageId;
    }
    if (!imageIdForThumbnail) {
      // use the thumbnail service provided by DICOM server
      imageIdForThumbnail = dataSource.getImageIdsForInstance({
        instance: singleFrameInstance,
        thumbnail: true
      });
    }
  }
  const {
    FrameOfReferenceUID,
    SeriesDescription,
    ContentDate,
    ContentTime,
    SeriesNumber,
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID,
    SOPClassUID
  } = instance;
  instances = instances.map(inst => {
    // NOTE: According to DICOM standard a series should have a FrameOfReferenceUID
    // When the Microscopy file was built by certain tool from multiple image files,
    // each instance's FrameOfReferenceUID is sometimes different.
    // Even though this means the file was not well formatted DICOM VL Whole Slide Microscopy Image,
    // the case is so often, so let's override this value manually here.
    //
    // https://dicom.nema.org/medical/dicom/current/output/chtml/part03/sect_C.7.4.html#sect_C.7.4.1.1.1

    inst.FrameOfReferenceUID = instance.FrameOfReferenceUID;
    return inst;
  });
  const othersFrameOfReferenceUID = instances.filter(v => v).map(inst => inst.FrameOfReferenceUID).filter((value, index, array) => array.indexOf(value) === index);
  if (othersFrameOfReferenceUID.length > 1) {
    console.warn('Expected FrameOfReferenceUID of difference instances within a series to be the same, found multiple different values', othersFrameOfReferenceUID);
  }
  const displaySet = {
    plugin: 'microscopy',
    Modality: 'SM',
    viewportType: esm.Enums.ViewportType.WHOLE_SLIDE,
    altImageText: 'Microscopy',
    displaySetInstanceUID: getSopClassHandlerModule_utils.guid(),
    SOPInstanceUID,
    SeriesInstanceUID,
    StudyInstanceUID,
    FrameOfReferenceUID,
    SOPClassHandlerId,
    SOPClassUID,
    SeriesDescription: SeriesDescription || 'Microscopy Data',
    // Map ContentDate/Time to SeriesTime for series list sorting.
    SeriesDate: ContentDate,
    SeriesTime: ContentTime,
    SeriesNumber,
    firstInstance: singleFrameInstance,
    // top level instance in the image Pyramid
    instance,
    numImageFrames: 0,
    numInstances: 1,
    imageIdForThumbnail,
    // thumbnail image
    others: instances,
    // all other level instances in the image Pyramid
    instances,
    othersFrameOfReferenceUID,
    imageIds: instances.map(instance => instance.imageId)
  };
  // The microscopy viewer directly accesses the metadata already loaded, and
  // uses the DICOMweb client library directly for loading, so it has to be
  // provided here.
  const dicomWebClient = dataSource.retrieve.getWadoDicomWebClient?.();
  const instanceMap = new Map();
  instances.forEach(instance => instanceMap.set(instance.imageId, instance));
  if (dicomWebClient) {
    const webClient = Object.create(dicomWebClient);
    // This replaces just the dicom web metadata call with one which retrieves
    // internally.
    webClient.getDICOMwebMetadata = getDICOMwebMetadata.bind(webClient, instanceMap);
    esm.utilities.genericMetadataProvider.addRaw(displaySet.imageIds[0], {
      type: MetadataModules.WADO_WEB_CLIENT,
      metadata: webClient
    });
  } else {
    // Might have some other way of getting the data in the future or internally?
    // throw new Error('Unable to provide a DICOMWeb client library, microscopy will fail to view');
  }
  return [displaySet];
}

/**
 * This method provides access to the internal DICOMweb metadata, used to avoid
 * refetching the DICOMweb data.  It gets assigned as a member function to the
 * dicom web client.
 */
function getDICOMwebMetadata(instanceMap, imageId) {
  const instance = instanceMap.get(imageId);
  if (!instance) {
    console.warn('Metadata not already found for', imageId, 'in', instanceMap);
    return this.super.getDICOMwebMetadata(imageId);
  }
  return transferDenaturalizedDataset(denaturalizeDataset(fixMultiValueKeys(instanceMap.get(imageId))));
}
function getDicomMicroscopySopClassHandler({
  servicesManager,
  extensionManager
}) {
  const getDisplaySetsFromSeries = instances => {
    return _getDisplaySetsFromSeries(instances, servicesManager, extensionManager);
  };
  return {
    name: 'DicomMicroscopySopClassHandler',
    sopClassUids: [SOP_CLASS_UIDS.VL_WHOLE_SLIDE_MICROSCOPY_IMAGE_STORAGE],
    getDisplaySetsFromSeries
  };
}
function getSopClassHandlerModule(params) {
  return [getDicomMicroscopySopClassHandler(params)];
}
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/utilities/index.js + 40 modules
var esm_utilities = __webpack_require__(49035);
// EXTERNAL MODULE: ../../../extensions/default/src/stores/useToggleOneUpViewportGridStore.ts
var useToggleOneUpViewportGridStore = __webpack_require__(73325);
// EXTERNAL MODULE: ../../../node_modules/lodash.debounce/index.js
var lodash_debounce = __webpack_require__(62051);
var lodash_debounce_default = /*#__PURE__*/__webpack_require__.n(lodash_debounce);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/hooks/useActiveViewportSegmentationRepresentations.ts



const excludedModalities = ['SM', 'OT', 'DOC', 'ECG'];
function mapSegmentationToDisplay(segmentation, customizationService) {
  const {
    label,
    segments
  } = segmentation;

  // Get the readable text mapping once
  const {
    readableText: readableTextMap
  } = customizationService.getCustomization('PanelSegmentation.readableText', {});

  // Helper function to recursively map cachedStats to readable display text
  function mapStatsToDisplay(stats, indent = 0) {
    const primary = [];
    const indentation = '  '.repeat(indent);
    for (const key in stats) {
      if (Object.prototype.hasOwnProperty.call(stats, key)) {
        const value = stats[key];
        const readableText = readableTextMap?.[key];
        if (!readableText) {
          continue;
        }
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          // Add empty row before category (except for the first category)
          if (primary.length > 0) {
            primary.push('');
          }
          // Add category title
          primary.push(`${indentation}${readableText}`);
          // Recursively handle nested objects
          primary.push(...mapStatsToDisplay(value, indent + 1));
        } else {
          // For non-nested values, don't add empty rows
          primary.push(`${indentation}${readableText}: ${(0,utils/* roundNumber */.Wf)(value, 2)}`);
        }
      }
    }
    return primary;
  }

  // Get customization for display text mapping
  const displayTextMapper = segment => {
    const defaultDisplay = {
      primary: [],
      secondary: []
    };

    // If the segment has cachedStats, map it to readable text
    if (segment.cachedStats) {
      const primary = mapStatsToDisplay(segment.cachedStats);
      defaultDisplay.primary = primary;
    }
    return defaultDisplay;
  };
  const updatedSegments = {};
  Object.entries(segments).forEach(([segmentIndex, segment]) => {
    updatedSegments[segmentIndex] = {
      ...segment,
      displayText: displayTextMapper(segment)
    };
  });

  // Map the segments and apply the display text mapper
  return {
    ...segmentation,
    label,
    segments: updatedSegments
  };
}

/**
 * Represents the combination of segmentation data and its representation in a viewport.
 */

/**
 * Custom hook that provides segmentation data and their representations for the active viewport.
 * @param options - The options object.
 * @param options.servicesManager - The services manager object.
 * @param options.subscribeToDataModified - Whether to subscribe to segmentation data modifications.
 * @param options.debounceTime - Debounce time in milliseconds for updates.
 * @returns An array of segmentation data and their representations for the active viewport.
 */
function useActiveViewportSegmentationRepresentations({
  servicesManager,
  subscribeToDataModified = false,
  debounceTime = 0
}) {
  const {
    segmentationService,
    viewportGridService,
    customizationService,
    displaySetService
  } = servicesManager.services;
  const [segmentationsWithRepresentations, setSegmentationsWithRepresentations] = (0,react.useState)({
    segmentationsWithRepresentations: [],
    disabled: false
  });
  (0,react.useEffect)(() => {
    const update = () => {
      const viewportId = viewportGridService.getActiveViewportId();
      const displaySetUIDs = viewportGridService.getDisplaySetsUIDsForViewport(viewportId);
      if (!displaySetUIDs?.length) {
        return;
      }
      const displaySet = displaySetService.getDisplaySetByUID(displaySetUIDs[0]);
      if (!displaySet) {
        return;
      }
      if (excludedModalities.includes(displaySet.Modality)) {
        setSegmentationsWithRepresentations(prev => ({
          segmentationsWithRepresentations: [],
          disabled: true
        }));
        return;
      }
      const segmentations = segmentationService.getSegmentations();
      if (!segmentations?.length) {
        setSegmentationsWithRepresentations(prev => ({
          segmentationsWithRepresentations: [],
          disabled: false
        }));
        return;
      }
      const representations = segmentationService.getSegmentationRepresentations(viewportId);
      const newSegmentationsWithRepresentations = representations.map(representation => {
        const segmentation = segmentationService.getSegmentation(representation.segmentationId);
        const mappedSegmentation = mapSegmentationToDisplay(segmentation, customizationService);
        return {
          representation,
          segmentation: mappedSegmentation
        };
      });
      setSegmentationsWithRepresentations({
        segmentationsWithRepresentations: newSegmentationsWithRepresentations,
        disabled: false
      });
    };
    const debouncedUpdate = debounceTime > 0 ? lodash_debounce_default()(update, debounceTime, {
      leading: true,
      trailing: true
    }) : update;
    update();
    const subscriptions = [segmentationService.subscribe(segmentationService.EVENTS.SEGMENTATION_MODIFIED, debouncedUpdate), segmentationService.subscribe(segmentationService.EVENTS.SEGMENTATION_REMOVED, debouncedUpdate), segmentationService.subscribe(segmentationService.EVENTS.SEGMENTATION_REPRESENTATION_MODIFIED, debouncedUpdate), viewportGridService.subscribe(viewportGridService.EVENTS.ACTIVE_VIEWPORT_ID_CHANGED, debouncedUpdate), viewportGridService.subscribe(viewportGridService.EVENTS.GRID_STATE_CHANGED, debouncedUpdate)];
    if (subscribeToDataModified) {
      subscriptions.push(segmentationService.subscribe(segmentationService.EVENTS.SEGMENTATION_DATA_MODIFIED, debouncedUpdate));
    }
    return () => {
      subscriptions.forEach(subscription => subscription.unsubscribe());
      if (debounceTime > 0) {
        debouncedUpdate.cancel();
      }
    };
  }, [segmentationService, viewportGridService, customizationService, displaySetService, debounceTime, subscribeToDataModified]);
  return segmentationsWithRepresentations;
}
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/hooks/useMeasurements.ts


function mapMeasurementToDisplay(measurement, displaySetService) {
  const {
    referenceSeriesUID
  } = measurement;
  const displaySets = displaySetService.getDisplaySetsForSeries(referenceSeriesUID);
  if (!displaySets[0]?.instances) {
    throw new Error('The tracked measurements panel should only be tracking "stack" displaySets.');
  }
  const {
    findingSites,
    finding,
    label: baseLabel,
    displayText: baseDisplayText
  } = measurement;
  const firstSite = findingSites?.[0];
  const label = baseLabel || finding?.text || firstSite?.text || '(empty)';

  // Initialize displayText with the structure used in Length.ts and CobbAngle.ts
  const displayText = {
    primary: [],
    secondary: baseDisplayText?.secondary || []
  };

  // Add baseDisplayText to primary if it exists
  if (baseDisplayText) {
    displayText.primary.push(...baseDisplayText.primary);
  }

  // Add finding sites to primary
  if (findingSites) {
    findingSites.forEach(site => {
      if (site?.text && site.text !== label) {
        displayText.primary.push(site.text);
      }
    });
  }

  // Add finding to primary if it's different from the label
  if (finding && finding.text && finding.text !== label) {
    displayText.primary.push(finding.text);
  }
  return {
    ...measurement,
    displayText,
    label
  };
}

/**
 * A custom hook that provides mapped measurements based on the given services and filters.
 *
 * @param {Object} servicesManager - The services manager object.
 * @param {Object} options - The options for filtering and mapping measurements.
 * @param {Function} options.measurementFilter - Optional function to filter measurements.
 * @param {Object} options.valueTypes - The value types for mapping measurements.
 * @returns {Array} An array of mapped and filtered measurements.
 */
function useMeasurements(servicesManager, {
  measurementFilter
}) {
  const {
    measurementService,
    displaySetService
  } = servicesManager.services;
  const [displayMeasurements, setDisplayMeasurements] = (0,react.useState)([]);
  (0,react.useEffect)(() => {
    const updateDisplayMeasurements = () => {
      let measurements = measurementService.getMeasurements();
      if (measurementFilter) {
        measurements = measurements.filter(measurementFilter);
      }
      const mappedMeasurements = measurements.map(m => mapMeasurementToDisplay(m, displaySetService));
      setDisplayMeasurements(prevMeasurements => {
        if (JSON.stringify(prevMeasurements) !== JSON.stringify(mappedMeasurements)) {
          return mappedMeasurements;
        }
        return prevMeasurements;
      });
    };
    const debouncedUpdate = lodash_debounce_default()(updateDisplayMeasurements, 100);
    updateDisplayMeasurements();
    const events = [measurementService.EVENTS.MEASUREMENT_ADDED, measurementService.EVENTS.RAW_MEASUREMENT_ADDED, measurementService.EVENTS.MEASUREMENT_UPDATED, measurementService.EVENTS.MEASUREMENT_REMOVED, measurementService.EVENTS.MEASUREMENTS_CLEARED];
    const subscriptions = events.map(evt => measurementService.subscribe(evt, debouncedUpdate).unsubscribe);
    return () => {
      subscriptions.forEach(unsub => unsub());
      debouncedUpdate.cancel();
    };
  }, [measurementService, measurementFilter, displaySetService]);
  return displayMeasurements;
}
// EXTERNAL MODULE: ../../ui-next/src/index.ts + 2483 modules
var ui_next_src = __webpack_require__(35570);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/panels/PanelSegmentation.tsx




function PanelSegmentation({
  servicesManager,
  commandsManager,
  children
}) {
  const {
    customizationService,
    viewportGridService,
    displaySetService
  } = servicesManager.services;
  const {
    segmentationsWithRepresentations,
    disabled
  } = useActiveViewportSegmentationRepresentations({
    servicesManager
  });
  const handlers = {
    onSegmentationAdd: async () => {
      const viewportId = viewportGridService.getState().activeViewportId;
      commandsManager.run('createLabelmapForViewport', {
        viewportId
      });
    },
    onSegmentationClick: segmentationId => {
      commandsManager.run('setActiveSegmentation', {
        segmentationId
      });
    },
    onSegmentAdd: segmentationId => {
      commandsManager.run('addSegment', {
        segmentationId
      });
    },
    onSegmentClick: (segmentationId, segmentIndex) => {
      commandsManager.run('setActiveSegmentAndCenter', {
        segmentationId,
        segmentIndex
      });
    },
    onSegmentEdit: (segmentationId, segmentIndex) => {
      commandsManager.run('editSegmentLabel', {
        segmentationId,
        segmentIndex
      });
    },
    onSegmentationEdit: segmentationId => {
      commandsManager.run('editSegmentationLabel', {
        segmentationId
      });
    },
    onSegmentColorClick: (segmentationId, segmentIndex) => {
      commandsManager.run('editSegmentColor', {
        segmentationId,
        segmentIndex
      });
    },
    onSegmentDelete: (segmentationId, segmentIndex) => {
      commandsManager.run('deleteSegment', {
        segmentationId,
        segmentIndex
      });
    },
    onToggleSegmentVisibility: (segmentationId, segmentIndex, type) => {
      commandsManager.run('toggleSegmentVisibility', {
        segmentationId,
        segmentIndex,
        type
      });
    },
    onToggleSegmentLock: (segmentationId, segmentIndex) => {
      commandsManager.run('toggleSegmentLock', {
        segmentationId,
        segmentIndex
      });
    },
    onToggleSegmentationRepresentationVisibility: (segmentationId, type) => {
      commandsManager.run('toggleSegmentationVisibility', {
        segmentationId,
        type
      });
    },
    onSegmentationDownload: segmentationId => {
      commandsManager.run('downloadSegmentation', {
        segmentationId
      });
    },
    storeSegmentation: async segmentationId => {
      commandsManager.run('storeSegmentation', {
        segmentationId
      });
    },
    onSegmentationDownloadRTSS: segmentationId => {
      commandsManager.run('downloadRTSS', {
        segmentationId
      });
    },
    setStyle: (segmentationId, type, key, value) => {
      commandsManager.run('setSegmentationStyle', {
        segmentationId,
        type,
        key,
        value
      });
    },
    toggleRenderInactiveSegmentations: () => {
      commandsManager.run('toggleRenderInactiveSegmentations');
    },
    onSegmentationRemoveFromViewport: segmentationId => {
      commandsManager.run('removeSegmentationFromViewport', {
        segmentationId
      });
    },
    onSegmentationDelete: segmentationId => {
      commandsManager.run('deleteSegmentation', {
        segmentationId
      });
    },
    setFillAlpha: ({
      type
    }, value) => {
      commandsManager.run('setFillAlpha', {
        type,
        value
      });
    },
    setOutlineWidth: ({
      type
    }, value) => {
      commandsManager.run('setOutlineWidth', {
        type,
        value
      });
    },
    setRenderFill: ({
      type
    }, value) => {
      commandsManager.run('setRenderFill', {
        type,
        value
      });
    },
    setRenderOutline: ({
      type
    }, value) => {
      commandsManager.run('setRenderOutline', {
        type,
        value
      });
    },
    setFillAlphaInactive: ({
      type
    }, value) => {
      commandsManager.run('setFillAlphaInactive', {
        type,
        value
      });
    },
    getRenderInactiveSegmentations: () => {
      return commandsManager.run('getRenderInactiveSegmentations');
    }
  };
  const {
    mode: SegmentationTableMode
  } = customizationService.getCustomization('PanelSegmentation.tableMode', {
    id: 'default.segmentationTable.mode',
    mode: 'collapsed'
  });

  // custom onSegmentationAdd if provided
  const {
    onSegmentationAdd
  } = customizationService.getCustomization('PanelSegmentation.onSegmentationAdd', {
    id: 'segmentation.onSegmentationAdd',
    onSegmentationAdd: handlers.onSegmentationAdd
  });
  const {
    disableEditing
  } = customizationService.getCustomization('PanelSegmentation.disableEditing', {
    id: 'default.disableEditing',
    disableEditing: false
  });
  const {
    showAddSegment
  } = customizationService.getCustomization('PanelSegmentation.showAddSegment', {
    id: 'default.showAddSegment',
    showAddSegment: true
  });
  const exportOptions = segmentationsWithRepresentations.map(({
    segmentation
  }) => {
    const {
      representationData,
      segmentationId
    } = segmentation;
    const {
      Labelmap
    } = representationData;
    if (!Labelmap) {
      return {
        segmentationId,
        isExportable: true
      };
    }
    const referencedImageIds = Labelmap.referencedImageIds;
    const firstImageId = referencedImageIds[0];
    const instance = esm.metaData.get('instance', firstImageId);
    const {
      SOPInstanceUID,
      SeriesInstanceUID
    } = instance;
    const displaySet = displaySetService.getDisplaySetForSOPInstanceUID(SOPInstanceUID, SeriesInstanceUID);
    const isExportable = displaySet.isReconstructable;
    return {
      segmentationId,
      isExportable
    };
  });
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(ui_next_src/* SegmentationTable */.R4, {
    disabled: disabled,
    data: segmentationsWithRepresentations,
    mode: SegmentationTableMode,
    title: "Segmentations",
    exportOptions: exportOptions,
    disableEditing: disableEditing,
    onSegmentationAdd: onSegmentationAdd,
    onSegmentationClick: handlers.onSegmentationClick,
    onSegmentationDelete: handlers.onSegmentationDelete,
    showAddSegment: showAddSegment,
    onSegmentAdd: handlers.onSegmentAdd,
    onSegmentClick: handlers.onSegmentClick,
    onSegmentEdit: handlers.onSegmentEdit,
    onSegmentationEdit: handlers.onSegmentationEdit,
    onSegmentColorClick: handlers.onSegmentColorClick,
    onSegmentDelete: handlers.onSegmentDelete,
    onToggleSegmentVisibility: handlers.onToggleSegmentVisibility,
    onToggleSegmentLock: handlers.onToggleSegmentLock,
    onToggleSegmentationRepresentationVisibility: handlers.onToggleSegmentationRepresentationVisibility,
    onSegmentationDownload: handlers.onSegmentationDownload,
    storeSegmentation: handlers.storeSegmentation,
    onSegmentationDownloadRTSS: handlers.onSegmentationDownloadRTSS,
    setStyle: handlers.setStyle,
    toggleRenderInactiveSegmentations: handlers.toggleRenderInactiveSegmentations,
    onSegmentationRemoveFromViewport: handlers.onSegmentationRemoveFromViewport,
    setFillAlpha: handlers.setFillAlpha,
    setOutlineWidth: handlers.setOutlineWidth,
    setRenderFill: handlers.setRenderFill,
    setRenderOutline: handlers.setRenderOutline,
    setFillAlphaInactive: handlers.setFillAlphaInactive,
    renderInactiveSegmentations: handlers.getRenderInactiveSegmentations()
  }, children, /*#__PURE__*/react.createElement(ui_next_src/* SegmentationTable */.R4.Config, null), /*#__PURE__*/react.createElement(ui_next_src/* SegmentationTable */.R4.AddSegmentationRow, null), SegmentationTableMode === 'collapsed' ? /*#__PURE__*/react.createElement(ui_next_src/* SegmentationTable */.R4.Collapsed, null, /*#__PURE__*/react.createElement(ui_next_src/* SegmentationTable */.R4.SelectorHeader, null), /*#__PURE__*/react.createElement(ui_next_src/* SegmentationTable */.R4.AddSegmentRow, null), /*#__PURE__*/react.createElement(ui_next_src/* SegmentationTable */.R4.Segments, null)) : /*#__PURE__*/react.createElement(ui_next_src/* SegmentationTable */.R4.Expanded, null, /*#__PURE__*/react.createElement(ui_next_src/* SegmentationTable */.R4.Header, null), /*#__PURE__*/react.createElement(ui_next_src/* SegmentationTable */.R4.Segments, null))));
}
// EXTERNAL MODULE: ../../../node_modules/prop-types/index.js
var prop_types = __webpack_require__(97598);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ../../../node_modules/@kitware/vtk.js/Rendering/Core/ColorTransferFunction/ColorMaps.js + 1 modules
var ColorMaps = __webpack_require__(660);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/components/ViewportWindowLevel/getViewportVolumeHistogram.ts

const workerManager = (0,esm.getWebWorkerManager)();
const WorkerOptions = {
  maxWorkerInstances: 1,
  autoTerminateOnIdle: {
    enabled: true,
    idleTimeThreshold: 1000
  }
};

// Register the task
const workerFn = () => {
  return new Worker(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u(3054), __webpack_require__.b), {
    name: 'histogram-worker' // name used by the browser to name the worker
  });
};
const getViewportVolumeHistogram = async (viewport, volume, options) => {
  workerManager.registerWorker('histogram-worker', workerFn, WorkerOptions);
  const volumeImageData = viewport.getImageData(volume.volumeId);
  if (!volumeImageData) {
    return undefined;
  }
  let scalarData = volume.scalarData;
  if (volume.numTimePoints > 1) {
    const targetTimePoint = volume.numTimePoints - 1; // or any other time point you need
    scalarData = volume.voxelManager.getTimePointScalarData(targetTimePoint);
  } else {
    scalarData = volume.voxelManager.getCompleteScalarDataArray();
  }
  if (!scalarData?.length) {
    return undefined;
  }
  const {
    dimensions,
    origin,
    direction,
    spacing
  } = volume;
  const range = await workerManager.executeTask('histogram-worker', 'getRange', {
    dimensions,
    origin,
    direction,
    spacing,
    scalarData
  });
  const {
    minimum: min,
    maximum: max
  } = range;
  if (min === Infinity || max === -Infinity) {
    return undefined;
  }
  const calcHistOptions = {
    numBins: 256,
    min: Math.max(min, options?.min ?? min),
    max: Math.min(max, options?.max ?? max)
  };
  const histogram = await workerManager.executeTask('histogram-worker', 'calcHistogram', {
    data: scalarData,
    options: calcHistOptions
  });
  return histogram;
};

;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/components/ViewportWindowLevel/utils.ts





/**
 * Gets node opacity from volume actor
 */
const getNodeOpacity = (volumeActor, nodeIndex) => {
  const volumeOpacity = volumeActor.getProperty().getScalarOpacity(0);
  const nodeValue = [];
  volumeOpacity.getNodeValue(nodeIndex, nodeValue);
  return nodeValue[1];
};

/**
 * Checks if the opacity applied to the PET volume follows a specific pattern
 */
const isPetVolumeWithDefaultOpacity = (volumeId, volumeActor) => {
  const volume = esm.cache.getVolume(volumeId);
  if (!volume || volume.metadata.Modality !== 'PT') {
    return false;
  }
  const volumeOpacity = volumeActor.getProperty().getScalarOpacity(0);
  if (volumeOpacity.getSize() < 2) {
    return false;
  }
  const node1Value = [];
  const node2Value = [];
  volumeOpacity.getNodeValue(0, node1Value);
  volumeOpacity.getNodeValue(1, node2Value);
  if (node1Value[0] !== 0 || node1Value[1] !== 0 || node2Value[0] !== 0.1) {
    return false;
  }
  const expectedOpacity = node2Value[1];
  const opacitySize = volumeOpacity.getSize();
  const currentNodeValue = [];
  for (let i = 2; i < opacitySize; i++) {
    volumeOpacity.getNodeValue(i, currentNodeValue);
    if (currentNodeValue[1] !== expectedOpacity) {
      return false;
    }
  }
  return true;
};

/**
 * Checks if volume has constant opacity
 */
const isVolumeWithConstantOpacity = volumeActor => {
  const volumeOpacity = volumeActor.getProperty().getScalarOpacity(0);
  const opacitySize = volumeOpacity.getSize();
  const firstNodeValue = [];
  volumeOpacity.getNodeValue(0, firstNodeValue);
  const firstNodeOpacity = firstNodeValue[1];
  for (let i = 0; i < opacitySize; i++) {
    const currentNodeValue = [];
    volumeOpacity.getNodeValue(0, currentNodeValue);
    if (currentNodeValue[1] !== firstNodeOpacity) {
      return false;
    }
  }
  return true;
};

/**
 * Gets window levels data for a viewport
 */
const getWindowLevelsData = async (viewport, viewportInfo, getVolumeOpacity) => {
  if (!viewport) {
    return [];
  }
  const volumeIds = viewport.getAllVolumeIds();
  const viewportProperties = viewport.getProperties();
  const {
    voiRange
  } = viewportProperties;
  const viewportVoi = voiRange ? {
    windowWidth: voiRange.upper - voiRange.lower,
    windowCenter: voiRange.lower + (voiRange.upper - voiRange.lower) / 2
  } : undefined;
  const windowLevels = await Promise.all(volumeIds.map(async (volumeId, volumeIndex) => {
    const volume = esm.cache.getVolume(volumeId);
    const opacity = getVolumeOpacity(viewport, volumeId);
    const {
      metadata,
      scaling
    } = volume;
    const modality = metadata.Modality;
    const options = {
      min: modality === 'PT' ? 0.1 : -999,
      max: modality === 'PT' ? 5 : 10000
    };
    const histogram = await getViewportVolumeHistogram(viewport, volume, options);
    if (!histogram || histogram.range.min === histogram.range.max) {
      return null;
    }
    if (!viewportInfo.displaySetOptions || !viewportInfo.displaySetOptions[volumeIndex]) {
      return null;
    }
    const {
      voi: displaySetVOI,
      colormap: displaySetColormap
    } = viewportInfo.displaySetOptions[volumeIndex];
    let colormap;
    if (displaySetColormap) {
      colormap = esm.utilities.colormap.getColormap(displaySetColormap.name) ?? ColorMaps/* default */.A.getPresetByName(displaySetColormap.name);
    }
    const voi = !volumeIndex ? viewportVoi ?? displaySetVOI : displaySetVOI;
    return {
      viewportId: viewportInfo.viewportId,
      modality,
      volumeId,
      volumeIndex,
      voi,
      histogram,
      colormap,
      step: scaling?.PT ? 0.05 : 1,
      opacity,
      showOpacitySlider: volumeIndex === 1 && opacity !== undefined
    };
  }));
  return windowLevels.filter(Boolean);
};
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/components/ViewportWindowLevel/ViewportWindowLevel.tsx







const {
  Events
} = esm.Enums;
const ViewportWindowLevel = ({
  servicesManager,
  viewportId
}) => {
  const {
    cornerstoneViewportService
  } = servicesManager.services;
  const [windowLevels, setWindowLevels] = (0,react.useState)([]);
  const [isLoading, setIsLoading] = (0,react.useState)(true);
  const displaySets = (0,src/* useActiveViewportDisplaySets */.BZ)({
    servicesManager
  });
  const getViewportsWithVolumeIds = (0,react.useCallback)(volumeIds => {
    const renderingEngine = cornerstoneViewportService.getRenderingEngine();
    const viewports = renderingEngine.getVolumeViewports();
    return viewports.filter(vp => {
      const viewportVolumeIds = vp.getActors().map(actor => actor.referencedId);
      return volumeIds.length === viewportVolumeIds.length && volumeIds.every(volumeId => viewportVolumeIds.includes(volumeId));
    });
  }, [cornerstoneViewportService]);
  const getVolumeOpacity = (0,react.useCallback)((viewport, volumeId) => {
    const volumeActor = viewport.getActors().find(actor => actor.referencedId === volumeId)?.actor;
    if (isPetVolumeWithDefaultOpacity(volumeId, volumeActor)) {
      return getNodeOpacity(volumeActor, 1);
    } else if (isVolumeWithConstantOpacity(volumeActor)) {
      return getNodeOpacity(volumeActor, 0);
    }
    return undefined;
  }, []);
  const updateViewportHistograms = (0,react.useCallback)(() => {
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
    getWindowLevelsData(viewport, viewportInfo, getVolumeOpacity).then(data => {
      setWindowLevels(data);
    });
  }, [viewportId, cornerstoneViewportService, getVolumeOpacity]);
  const handleCornerstoneVOIModified = (0,react.useCallback)(e => {
    const {
      detail
    } = e;
    const {
      volumeId,
      range
    } = detail;
    const oldWindowLevel = windowLevels.find(wl => wl.volumeId === volumeId);
    if (!oldWindowLevel) {
      return;
    }
    const oldVOI = oldWindowLevel.voi;
    const windowWidth = range.upper - range.lower;
    const windowCenter = range.lower + windowWidth / 2;
    if (windowWidth === oldVOI.windowWidth && windowCenter === oldVOI.windowCenter) {
      return;
    }
    const newWindowLevel = {
      ...oldWindowLevel,
      voi: {
        windowWidth,
        windowCenter
      }
    };
    setWindowLevels(windowLevels.map(windowLevel => windowLevel === oldWindowLevel ? newWindowLevel : windowLevel));
  }, [windowLevels]);
  const debouncedHandleCornerstoneVOIModified = (0,react.useMemo)(() => lodash_debounce_default()(handleCornerstoneVOIModified, 100), [handleCornerstoneVOIModified]);
  const handleVOIChange = (0,react.useCallback)((volumeId, voi) => {
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    const newRange = {
      lower: voi.windowCenter - voi.windowWidth / 2,
      upper: voi.windowCenter + voi.windowWidth / 2
    };
    viewport.setProperties({
      voiRange: newRange
    }, volumeId);
    viewport.render();
  }, [cornerstoneViewportService, viewportId]);
  const handleOpacityChange = (0,react.useCallback)((viewportId, _volumeIndex, volumeId, opacity) => {
    const viewport = cornerstoneViewportService.getCornerstoneViewport(viewportId);
    if (!viewport) {
      return;
    }
    const viewportVolumeIds = viewport.getActors().map(actor => actor.referencedId);
    const viewports = getViewportsWithVolumeIds(viewportVolumeIds);
    viewports.forEach(vp => {
      vp.setProperties({
        colormap: {
          opacity
        }
      }, volumeId);
      vp.render();
    });
  }, [getViewportsWithVolumeIds, cornerstoneViewportService]);

  // New function to handle image volume loading completion
  const handleImageVolumeLoadingCompleted = (0,react.useCallback)(() => {
    setIsLoading(false);
    updateViewportHistograms();
  }, [updateViewportHistograms]);

  // Listen to cornerstone events and set up interval for histogram updates
  (0,react.useEffect)(() => {
    document.addEventListener(Events.VOI_MODIFIED, debouncedHandleCornerstoneVOIModified, true);
    esm.eventTarget.addEventListener(Events.IMAGE_VOLUME_LOADING_COMPLETED, handleImageVolumeLoadingCompleted);
    const intervalId = setInterval(() => {
      if (isLoading) {
        updateViewportHistograms();
      }
    }, 1000);
    return () => {
      document.removeEventListener(Events.VOI_MODIFIED, debouncedHandleCornerstoneVOIModified, true);
      esm.eventTarget.removeEventListener(Events.IMAGE_VOLUME_LOADING_COMPLETED, handleImageVolumeLoadingCompleted);
      clearInterval(intervalId);
    };
  }, [updateViewportHistograms, debouncedHandleCornerstoneVOIModified, handleImageVolumeLoadingCompleted, isLoading]);

  // Create a memoized version of displaySet IDs for comparison
  const displaySetIds = (0,react.useMemo)(() => {
    return displaySets?.map(ds => ds.displaySetInstanceUID).sort() || [];
  }, [displaySets]);
  (0,react.useEffect)(() => {
    const {
      unsubscribe
    } = cornerstoneViewportService.subscribe(cornerstoneViewportService.EVENTS.VIEWPORT_VOLUMES_CHANGED, ({
      viewportInfo
    }) => {
      if (viewportInfo.viewportId === viewportId) {
        updateViewportHistograms();
      }
    });

    // Only update if displaySets actually changed and are loaded
    if (displaySetIds.length && !isLoading) {
      updateViewportHistograms();
    }
    return () => {
      unsubscribe();
    };
  }, [viewportId, cornerstoneViewportService, updateViewportHistograms, displaySetIds, isLoading]);
  return /*#__PURE__*/react.createElement(ui_src/* PanelSection */.aU, {
    title: "Window Level"
  }, windowLevels.map((windowLevel, i) => {
    if (!windowLevel.histogram) {
      return null;
    }
    return /*#__PURE__*/react.createElement(ui_src/* WindowLevel */.bL, {
      key: windowLevel.volumeId,
      title: `${windowLevel.modality}`,
      histogram: windowLevel.histogram,
      voi: windowLevel.voi,
      step: windowLevel.step,
      showOpacitySlider: windowLevel.showOpacitySlider,
      colormap: windowLevel.colormap,
      onVOIChange: voi => handleVOIChange(windowLevel.volumeId, voi),
      opacity: windowLevel.opacity,
      onOpacityChange: opacity => handleOpacityChange(windowLevel.viewportId, i, windowLevel.volumeId, opacity)
    });
  }));
};
ViewportWindowLevel.propTypes = {
  servicesManager: (prop_types_default()).object.isRequired,
  viewportId: (prop_types_default()).string.isRequired
};
/* harmony default export */ const ViewportWindowLevel_ViewportWindowLevel = (ViewportWindowLevel);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/components/ActiveViewportWindowLevel/ActiveViewportWindowLevel.tsx




const ActiveViewportWindowLevel = ({
  servicesManager
}) => {
  const [viewportGrid] = (0,ui_src/* useViewportGrid */.ih)();
  const {
    activeViewportId
  } = viewportGrid;
  return /*#__PURE__*/react.createElement(react.Fragment, null, activeViewportId && /*#__PURE__*/react.createElement(ViewportWindowLevel_ViewportWindowLevel, {
    servicesManager: servicesManager,
    viewportId: activeViewportId
  }));
};
ActiveViewportWindowLevel.propTypes = {
  servicesManager: (prop_types_default()).object.isRequired
};
/* harmony default export */ const ActiveViewportWindowLevel_ActiveViewportWindowLevel = (ActiveViewportWindowLevel);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/components/ActiveViewportWindowLevel/index.js

;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/panels/PanelMeasurement.tsx






function PanelMeasurementTable({
  servicesManager,
  customHeader,
  measurementFilter
}) {
  const measurementsPanelRef = (0,react.useRef)(null);
  const [viewportGrid] = (0,ui_src/* useViewportGrid */.ih)();
  const {
    measurementService,
    customizationService,
    uiDialogService
  } = servicesManager.services;
  const displayMeasurements = useMeasurements(servicesManager, {
    measurementFilter
  });
  (0,react.useEffect)(() => {
    if (displayMeasurements.length > 0) {
      lodash_debounce_default()(() => {
        measurementsPanelRef.current.scrollTop = measurementsPanelRef.current.scrollHeight;
      }, 300)();
    }
  }, [displayMeasurements.length]);
  const onMeasurementItemClickHandler = (uid, isActive) => {
    if (isActive) {
      return;
    }
    const measurements = [...displayMeasurements];
    const measurement = measurements.find(m => m.uid === uid);
    measurements.forEach(m => m.isActive = m.uid !== uid ? false : true);
    measurement.isActive = true;
  };
  const jumpToImage = uid => {
    measurementService.jumpToMeasurement(viewportGrid.activeViewportId, uid);
    onMeasurementItemClickHandler(uid, true);
  };
  const removeMeasurement = uid => {
    measurementService.remove(uid);
  };
  const renameMeasurement = uid => {
    jumpToImage(uid);
    const labelConfig = customizationService.get('measurementLabels');
    const measurement = measurementService.getMeasurement(uid);
    (0,default_src.showLabelAnnotationPopup)(measurement, uiDialogService, labelConfig).then(val => {
      measurementService.update(uid, {
        ...val
      }, true);
    });
  };
  const changeColorMeasurement = uid => {
    const {
      color
    } = measurementService.getMeasurement(uid);
    const rgbaColor = {
      r: color[0],
      g: color[1],
      b: color[2],
      a: color[3] / 255.0
    };
    (0,default_src.colorPickerDialog)(uiDialogService, rgbaColor, (newRgbaColor, actionId) => {
      if (actionId === 'cancel') {
        return;
      }
      const color = [newRgbaColor.r, newRgbaColor.g, newRgbaColor.b, newRgbaColor.a * 255.0];
      // segmentationService.setSegmentColor(viewportId, segmentationId, segmentIndex, color);
    });
  };
  const toggleLockMeasurement = uid => {
    measurementService.toggleLockMeasurement(uid);
  };
  const toggleVisibilityMeasurement = uid => {
    measurementService.toggleVisibilityMeasurement(uid);
  };
  const measurements = displayMeasurements.filter(dm => dm.measurementType !== measurementService.VALUE_TYPES.POINT && dm.referencedImageId);
  const additionalFindings = displayMeasurements.filter(dm => dm.measurementType === measurementService.VALUE_TYPES.POINT && dm.referencedImageId);
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
    className: "invisible-scrollbar overflow-y-auto overflow-x-hidden",
    ref: measurementsPanelRef,
    "data-cy": 'trackedMeasurements-panel'
  }, /*#__PURE__*/react.createElement(ui_next_src/* MeasurementTable */.V, {
    title: "Measurements",
    data: measurements,
    onClick: jumpToImage,
    onDelete: removeMeasurement,
    onToggleVisibility: toggleVisibilityMeasurement,
    onToggleLocked: toggleLockMeasurement,
    onRename: renameMeasurement
    // onColor={changeColorMeasurement}
  }, /*#__PURE__*/react.createElement(ui_next_src/* MeasurementTable */.V.Header, null, customHeader && /*#__PURE__*/react.createElement(react.Fragment, null, typeof customHeader === 'function' ? customHeader({
    additionalFindings,
    measurements
  }) : customHeader)), /*#__PURE__*/react.createElement(ui_next_src/* MeasurementTable */.V.Body, null)), additionalFindings.length > 0 && /*#__PURE__*/react.createElement(ui_next_src/* MeasurementTable */.V, {
    data: additionalFindings,
    title: "Additional Findings",
    onClick: jumpToImage,
    onDelete: removeMeasurement,
    onToggleVisibility: toggleVisibilityMeasurement,
    onToggleLocked: toggleLockMeasurement,
    onRename: renameMeasurement
    // onColor={changeColorMeasurement}
  }, /*#__PURE__*/react.createElement(ui_next_src/* MeasurementTable */.V.Body, null))));
}
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/getPanelModule.tsx





const getPanelModule = ({
  commandsManager,
  servicesManager,
  extensionManager
}) => {
  const wrappedPanelSegmentation = ({
    configuration
  }) => {
    return /*#__PURE__*/react.createElement(PanelSegmentation, {
      commandsManager: commandsManager,
      servicesManager: servicesManager,
      extensionManager: extensionManager,
      configuration: {
        ...configuration
      }
    });
  };
  const wrappedPanelSegmentationNoHeader = ({
    configuration
  }) => {
    return /*#__PURE__*/react.createElement(PanelSegmentation, {
      commandsManager: commandsManager,
      servicesManager: servicesManager,
      extensionManager: extensionManager,
      configuration: {
        ...configuration
      }
    });
  };
  const wrappedPanelSegmentationWithTools = ({
    configuration
  }) => {
    return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(ui_next_src/* Toolbox */.OO, {
      commandsManager: commandsManager,
      servicesManager: servicesManager,
      extensionManager: extensionManager,
      buttonSectionId: "segmentationToolbox",
      title: "Segmentation Tools",
      configuration: {
        ...configuration
      }
    }), /*#__PURE__*/react.createElement(PanelSegmentation, {
      commandsManager: commandsManager,
      servicesManager: servicesManager,
      extensionManager: extensionManager,
      configuration: {
        ...configuration
      }
    }));
  };
  const wrappedPanelMeasurement = ({
    configuration
  }) => {
    return /*#__PURE__*/react.createElement(PanelMeasurementTable, {
      commandsManager: commandsManager,
      servicesManager: servicesManager,
      extensionManager: extensionManager,
      configuration: {
        ...configuration
      }
    });
  };
  return [{
    name: 'activeViewportWindowLevel',
    component: () => {
      return /*#__PURE__*/react.createElement(ActiveViewportWindowLevel_ActiveViewportWindowLevel, {
        servicesManager: servicesManager
      });
    }
  }, {
    name: 'panelMeasurement',
    iconName: 'tab-linear',
    iconLabel: 'Measure',
    label: 'Measurement',
    component: wrappedPanelMeasurement
  }, {
    name: 'panelSegmentation',
    iconName: 'tab-segmentation',
    iconLabel: 'Segmentation',
    label: 'Segmentation',
    component: wrappedPanelSegmentation
  }, {
    name: 'panelSegmentationNoHeader',
    iconName: 'tab-segmentation',
    iconLabel: 'Segmentation',
    label: 'Segmentation',
    component: wrappedPanelSegmentationNoHeader
  }, {
    name: 'panelSegmentationWithTools',
    iconName: 'tab-segmentation',
    iconLabel: 'Segmentation',
    label: 'Segmentation',
    component: wrappedPanelSegmentationWithTools
  }];
};
/* harmony default export */ const src_getPanelModule = (getPanelModule);
// EXTERNAL MODULE: ../../../node_modules/react-dropzone/dist/es/index.js + 4 modules
var es = __webpack_require__(85252);
// EXTERNAL MODULE: ../../../node_modules/classnames/index.js
var classnames = __webpack_require__(55530);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/DicomFileUploader.ts


const DicomFileUploader_EVENTS = {
  PROGRESS: 'event:DicomFileUploader:progress'
};
let UploadStatus = /*#__PURE__*/function (UploadStatus) {
  UploadStatus[UploadStatus["NotStarted"] = 0] = "NotStarted";
  UploadStatus[UploadStatus["InProgress"] = 1] = "InProgress";
  UploadStatus[UploadStatus["Success"] = 2] = "Success";
  UploadStatus[UploadStatus["Failed"] = 3] = "Failed";
  UploadStatus[UploadStatus["Cancelled"] = 4] = "Cancelled";
  return UploadStatus;
}({});
class UploadRejection {
  constructor(status, message) {
    this.message = void 0;
    this.status = void 0;
    this.message = message;
    this.status = status;
  }
}
class DicomFileUploader extends src/* PubSubService */.Rc {
  constructor(file, dataSource) {
    super(DicomFileUploader_EVENTS);
    this._file = void 0;
    this._fileId = void 0;
    this._dataSource = void 0;
    this._loadPromise = void 0;
    this._abortController = new AbortController();
    this._status = UploadStatus.NotStarted;
    this._percentComplete = 0;
    this._file = file;
    this._fileId = dicom_image_loader_dist_esm/* default.wadouri */.Ay.wadouri.fileManager.add(file);
    this._dataSource = dataSource;
  }
  getFileId() {
    return this._fileId;
  }
  getFileName() {
    return this._file.name;
  }
  getFileSize() {
    return this._file.size;
  }
  cancel() {
    this._abortController.abort();
  }
  getStatus() {
    return this._status;
  }
  getPercentComplete() {
    return this._percentComplete;
  }
  async load() {
    if (this._loadPromise) {
      // Already started loading, return the load promise.
      return this._loadPromise;
    }
    this._loadPromise = new Promise((resolve, reject) => {
      // The upload listeners: fire progress events and/or settle the promise.
      const uploadCallbacks = {
        progress: evt => {
          if (!evt.lengthComputable) {
            // Progress computation is not possible.
            return;
          }
          this._status = UploadStatus.InProgress;
          this._percentComplete = Math.round(100 * evt.loaded / evt.total);
          this._broadcastEvent(DicomFileUploader_EVENTS.PROGRESS, {
            fileId: this._fileId,
            percentComplete: this._percentComplete
          });
        },
        timeout: () => {
          this._reject(reject, new UploadRejection(UploadStatus.Failed, 'The request timed out.'));
        },
        abort: () => {
          this._reject(reject, new UploadRejection(UploadStatus.Cancelled, 'Cancelled'));
        },
        error: () => {
          this._reject(reject, new UploadRejection(UploadStatus.Failed, 'The request failed.'));
        }
      };

      // First try to load the file.
      dicom_image_loader_dist_esm/* default.wadouri */.Ay.wadouri.loadFileRequest(this._fileId).then(dicomFile => {
        if (this._abortController.signal.aborted) {
          this._reject(reject, new UploadRejection(UploadStatus.Cancelled, 'Cancelled'));
          return;
        }
        if (!this._checkDicomFile(dicomFile)) {
          // The file is not DICOM
          this._reject(reject, new UploadRejection(UploadStatus.Failed, 'Not a valid DICOM file.'));
          return;
        }
        const request = new XMLHttpRequest();
        this._addRequestCallbacks(request, uploadCallbacks);

        // Do the actual upload by supplying the DICOM file and upload callbacks/listeners.
        return this._dataSource.store.dicom(dicomFile, request).then(() => {
          this._status = UploadStatus.Success;
          resolve();
        }).catch(reason => {
          this._reject(reject, reason);
        });
      }).catch(reason => {
        this._reject(reject, reason);
      });
    });
    return this._loadPromise;
  }
  _isRejected() {
    return this._status === UploadStatus.Failed || this._status === UploadStatus.Cancelled;
  }
  _reject(reject, reason) {
    if (this._isRejected()) {
      return;
    }
    if (reason instanceof UploadRejection) {
      this._status = reason.status;
      reject(reason);
      return;
    }
    this._status = UploadStatus.Failed;
    if (reason.message) {
      reject(new UploadRejection(UploadStatus.Failed, reason.message));
      return;
    }
    reject(new UploadRejection(UploadStatus.Failed, reason));
  }
  _addRequestCallbacks(request, uploadCallbacks) {
    const abortCallback = () => request.abort();
    this._abortController.signal.addEventListener('abort', abortCallback);
    for (const [eventName, callback] of Object.entries(uploadCallbacks)) {
      request.upload.addEventListener(eventName, callback);
    }
    const cleanUpCallback = () => {
      this._abortController.signal.removeEventListener('abort', abortCallback);
      for (const [eventName, callback] of Object.entries(uploadCallbacks)) {
        request.upload.removeEventListener(eventName, callback);
      }
      request.removeEventListener('loadend', cleanUpCallback);
    };
    request.addEventListener('loadend', cleanUpCallback);
  }
  _checkDicomFile(arrayBuffer) {
    if (arrayBuffer.length <= 132) {
      return false;
    }
    const arr = new Uint8Array(arrayBuffer.slice(128, 132));
    // bytes from 128 to 132 must be "DICM"
    return Array.from('DICM').every((char, i) => char.charCodeAt(0) === arr[i]);
  }
}
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/components/DicomUpload/DicomUploadProgressItem.tsx




// eslint-disable-next-line react/display-name
const DicomUploadProgressItem = /*#__PURE__*/(0,react.memo)(({
  dicomFileUploader
}) => {
  const [percentComplete, setPercentComplete] = (0,react.useState)(dicomFileUploader.getPercentComplete());
  const [failedReason, setFailedReason] = (0,react.useState)('');
  const [status, setStatus] = (0,react.useState)(dicomFileUploader.getStatus());
  const isComplete = (0,react.useCallback)(() => {
    return status === UploadStatus.Failed || status === UploadStatus.Cancelled || status === UploadStatus.Success;
  }, [status]);
  (0,react.useEffect)(() => {
    const progressSubscription = dicomFileUploader.subscribe(DicomFileUploader_EVENTS.PROGRESS, dicomFileUploaderProgressEvent => {
      setPercentComplete(dicomFileUploaderProgressEvent.percentComplete);
    });
    dicomFileUploader.load().catch(reason => {
      setStatus(reason.status);
      setFailedReason(reason.message ?? '');
    }).finally(() => setStatus(dicomFileUploader.getStatus()));
    return () => progressSubscription.unsubscribe();
  }, []);
  const cancelUpload = (0,react.useCallback)(() => {
    dicomFileUploader.cancel();
  }, []);
  const getStatusIcon = () => {
    switch (dicomFileUploader.getStatus()) {
      case UploadStatus.Success:
        return /*#__PURE__*/react.createElement(ui_src/* Icon */.In, {
          name: "status-tracked",
          className: "text-primary-light"
        });
      case UploadStatus.InProgress:
        return /*#__PURE__*/react.createElement(ui_src/* Icon */.In, {
          name: "icon-transferring"
        });
      case UploadStatus.Failed:
        return /*#__PURE__*/react.createElement(ui_src/* Icon */.In, {
          name: "icon-alert-small"
        });
      case UploadStatus.Cancelled:
        return /*#__PURE__*/react.createElement(ui_src/* Icon */.In, {
          name: "icon-alert-outline"
        });
      default:
        return /*#__PURE__*/react.createElement(react.Fragment, null);
    }
  };
  return /*#__PURE__*/react.createElement("div", {
    className: "min-h-14 border-secondary-light flex w-full items-center overflow-hidden border-b p-2.5 text-lg"
  }, /*#__PURE__*/react.createElement("div", {
    className: "self-top flex w-0 shrink grow flex-col gap-1"
  }, /*#__PURE__*/react.createElement("div", {
    className: "flex gap-4"
  }, /*#__PURE__*/react.createElement("div", {
    className: "flex w-6 shrink-0 items-center justify-center"
  }, getStatusIcon()), /*#__PURE__*/react.createElement("div", {
    className: "overflow-hidden text-ellipsis whitespace-nowrap"
  }, dicomFileUploader.getFileName())), failedReason && /*#__PURE__*/react.createElement("div", {
    className: "pl-10"
  }, failedReason)), /*#__PURE__*/react.createElement("div", {
    className: "flex w-24 items-center"
  }, !isComplete() && /*#__PURE__*/react.createElement(react.Fragment, null, dicomFileUploader.getStatus() === UploadStatus.InProgress && /*#__PURE__*/react.createElement("div", {
    className: "w-10 text-right"
  }, percentComplete, "%"), /*#__PURE__*/react.createElement("div", {
    className: "ml-auto flex cursor-pointer"
  }, /*#__PURE__*/react.createElement(ui_src/* Icon */.In, {
    className: "text-primary-active self-center",
    name: "close",
    onClick: cancelUpload
  })))));
});
DicomUploadProgressItem.propTypes = {
  dicomFileUploader: prop_types_default().instanceOf(DicomFileUploader).isRequired
};
/* harmony default export */ const DicomUpload_DicomUploadProgressItem = (DicomUploadProgressItem);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/components/DicomUpload/DicomUploadProgress.tsx






const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;

// The base/initial interval time length used to calculate the
// rate of the upload and in turn estimate the
// the amount of time remaining for the upload. This is the length
// of the very first interval to get a reasonable estimate on screen in
// a reasonable amount of time. The length of each interval after the first
// is based on the upload rate calculated. Faster rates use this base interval
// length. Slower rates below UPLOAD_RATE_THRESHOLD get longer interval times
// to obtain more accurate upload rates.
const BASE_INTERVAL_TIME = 15000;

// The upload rate threshold to determine the length of the interval to
// calculate the upload rate.
const UPLOAD_RATE_THRESHOLD = 75;
const NO_WRAP_ELLIPSIS_CLASS_NAMES = 'text-ellipsis whitespace-nowrap overflow-hidden';
function DicomUploadProgress({
  dicomFileUploaderArr,
  onComplete
}) {
  const [totalUploadSize] = (0,react.useState)(dicomFileUploaderArr.reduce((acc, fileUploader) => acc + fileUploader.getFileSize(), 0));
  const currentUploadSizeRef = (0,react.useRef)(0);
  const uploadRateRef = (0,react.useRef)(0);
  const [timeRemaining, setTimeRemaining] = (0,react.useState)(null);
  const [percentComplete, setPercentComplete] = (0,react.useState)(0);
  const [numFilesCompleted, setNumFilesCompleted] = (0,react.useState)(0);
  const [numFails, setNumFails] = (0,react.useState)(0);
  const [showFailedOnly, setShowFailedOnly] = (0,react.useState)(false);
  const progressBarContainerRef = (0,react.useRef)();

  /**
   * The effect for measuring and setting the current upload rate. This is
   * done by measuring the amount of data uploaded in a set interval time.
   */
  (0,react.useEffect)(() => {
    let timeoutId;

    // The amount of data already uploaded at the start of the interval.
    let intervalStartUploadSize = 0;

    // The starting time of the interval.
    let intervalStartTime = Date.now();
    const setUploadRateRef = () => {
      const uploadSizeFromStartOfInterval = currentUploadSizeRef.current - intervalStartUploadSize;
      const now = Date.now();
      const timeSinceStartOfInterval = now - intervalStartTime;

      // Calculate and set the upload rate (ref)
      uploadRateRef.current = uploadSizeFromStartOfInterval / timeSinceStartOfInterval;

      // Reset the interval starting values.
      intervalStartUploadSize = currentUploadSizeRef.current;
      intervalStartTime = now;

      // Only start a new interval if there is more to upload.
      if (totalUploadSize - currentUploadSizeRef.current > 0) {
        if (uploadRateRef.current >= UPLOAD_RATE_THRESHOLD) {
          timeoutId = setTimeout(setUploadRateRef, BASE_INTERVAL_TIME);
        } else {
          // The current upload rate is relatively slow, so use a larger
          // time interval to get a better upload rate estimate.
          timeoutId = setTimeout(setUploadRateRef, BASE_INTERVAL_TIME * 2);
        }
      }
    };

    // The very first interval is just the base time interval length.
    timeoutId = setTimeout(setUploadRateRef, BASE_INTERVAL_TIME);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  /**
   * The effect for: updating the overall percentage complete; setting the
   * estimated time remaining; updating the number of files uploaded; and
   * detecting if any error has occurred.
   */
  (0,react.useEffect)(() => {
    let currentTimeRemaining = null;

    // For each uploader, listen for the progress percentage complete and
    // add promise catch/finally callbacks to detect errors and count number
    // of uploads complete.
    const subscriptions = dicomFileUploaderArr.map(fileUploader => {
      let currentFileUploadSize = 0;
      const updateProgress = percentComplete => {
        const previousFileUploadSize = currentFileUploadSize;
        currentFileUploadSize = Math.round(percentComplete / 100 * fileUploader.getFileSize());
        currentUploadSizeRef.current = Math.min(totalUploadSize, currentUploadSizeRef.current - previousFileUploadSize + currentFileUploadSize);
        setPercentComplete(currentUploadSizeRef.current / totalUploadSize * 100);
        if (uploadRateRef.current !== 0) {
          const uploadSizeRemaining = totalUploadSize - currentUploadSizeRef.current;
          const timeRemaining = Math.round(uploadSizeRemaining / uploadRateRef.current);
          if (currentTimeRemaining === null) {
            currentTimeRemaining = timeRemaining;
            setTimeRemaining(currentTimeRemaining);
            return;
          }

          // Do not show an increase in the time remaining by two seconds or minutes
          // so as to prevent jumping the time remaining up and down constantly
          // due to rounding, inaccuracies in the estimate and slight variations
          // in upload rates over time.
          if (timeRemaining < ONE_MINUTE) {
            const currentSecondsRemaining = Math.ceil(currentTimeRemaining / ONE_SECOND);
            const secondsRemaining = Math.ceil(timeRemaining / ONE_SECOND);
            const delta = secondsRemaining - currentSecondsRemaining;
            if (delta < 0 || delta > 2) {
              currentTimeRemaining = timeRemaining;
              setTimeRemaining(currentTimeRemaining);
            }
            return;
          }
          if (timeRemaining < ONE_HOUR) {
            const currentMinutesRemaining = Math.ceil(currentTimeRemaining / ONE_MINUTE);
            const minutesRemaining = Math.ceil(timeRemaining / ONE_MINUTE);
            const delta = minutesRemaining - currentMinutesRemaining;
            if (delta < 0 || delta > 2) {
              currentTimeRemaining = timeRemaining;
              setTimeRemaining(currentTimeRemaining);
            }
            return;
          }

          // Hours remaining...
          currentTimeRemaining = timeRemaining;
          setTimeRemaining(currentTimeRemaining);
        }
      };
      const progressCallback = progressEvent => {
        updateProgress(progressEvent.percentComplete);
      };

      // Use the uploader promise to flag any error and count the number of
      // uploads completed.
      fileUploader.load().catch(rejection => {
        if (rejection.status === UploadStatus.Failed) {
          setNumFails(numFails => numFails + 1);
        }
      }).finally(() => {
        // If any error occurred, the percent complete progress stops firing
        // but this call to updateProgress nicely puts all finished uploads at 100%.
        updateProgress(100);
        setNumFilesCompleted(numCompleted => numCompleted + 1);
      });
      return fileUploader.subscribe(DicomFileUploader_EVENTS.PROGRESS, progressCallback);
    });
    return () => {
      subscriptions.forEach(subscription => subscription.unsubscribe());
    };
  }, []);
  const cancelAllUploads = (0,react.useCallback)(async () => {
    for (const dicomFileUploader of dicomFileUploaderArr) {
      // Important: we need a non-blocking way to cancel every upload,
      // otherwise the UI will freeze and the user will not be able
      // to interact with the app and progress will not be updated.
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          dicomFileUploader.cancel();
          resolve();
        }, 0);
      });
    }
  }, []);
  const getFormattedTimeRemaining = (0,react.useCallback)(() => {
    if (timeRemaining == null) {
      return '';
    }
    if (timeRemaining < ONE_MINUTE) {
      const secondsRemaining = Math.ceil(timeRemaining / ONE_SECOND);
      return `${secondsRemaining} ${secondsRemaining === 1 ? 'second' : 'seconds'}`;
    }
    if (timeRemaining < ONE_HOUR) {
      const minutesRemaining = Math.ceil(timeRemaining / ONE_MINUTE);
      return `${minutesRemaining} ${minutesRemaining === 1 ? 'minute' : 'minutes'}`;
    }
    const hoursRemaining = Math.ceil(timeRemaining / ONE_HOUR);
    return `${hoursRemaining} ${hoursRemaining === 1 ? 'hour' : 'hours'}`;
  }, [timeRemaining]);
  const getPercentCompleteRounded = (0,react.useCallback)(() => Math.min(100, Math.round(percentComplete)), [percentComplete]);

  /**
   * Determines if the progress bar should show the infinite animation or not.
   * Show the infinite animation for progress less than 1% AND if less than
   * one pixel of the progress bar would be displayed.
   */
  const showInfiniteProgressBar = (0,react.useCallback)(() => {
    return getPercentCompleteRounded() < 1 && (progressBarContainerRef?.current?.offsetWidth ?? 0) * (percentComplete / 100) < 1;
  }, [getPercentCompleteRounded, percentComplete]);

  /**
   * Gets the css style for the 'n of m' (files completed) text. The only css attribute
   * of the style is width such that the 'n of m' is always a fixed width and thus
   * as each file completes uploading the text on screen does not constantly shift
   * left and right.
   */
  const getNofMFilesStyle = (0,react.useCallback)(() => {
    // the number of digits accounts for the digits being on each side of the ' of '
    const numDigits = 2 * dicomFileUploaderArr.length.toString().length;
    // the number of digits + 2 spaces and 2 characters for ' of '
    const numChars = numDigits + 4;
    return {
      width: `${numChars}ch`
    };
  }, []);
  const getNumCompletedAndTimeRemainingComponent = () => {
    return /*#__PURE__*/react.createElement("div", {
      className: "bg-primary-dark flex h-14 items-center px-1 pb-4 text-lg"
    }, numFilesCompleted === dicomFileUploaderArr.length ? /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("span", {
      className: NO_WRAP_ELLIPSIS_CLASS_NAMES
    }, `${dicomFileUploaderArr.length} ${dicomFileUploaderArr.length > 1 ? 'files' : 'file'} completed.`), /*#__PURE__*/react.createElement(ui_src/* Button */.$n, {
      disabled: false,
      className: "ml-auto",
      onClick: onComplete
    }, 'Close')) : /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("span", {
      style: getNofMFilesStyle(),
      className: classnames_default()(NO_WRAP_ELLIPSIS_CLASS_NAMES, 'text-end')
    }, `${numFilesCompleted} of ${dicomFileUploaderArr.length}`, "\xA0"), /*#__PURE__*/react.createElement("span", {
      className: NO_WRAP_ELLIPSIS_CLASS_NAMES
    }, ' files completed.', "\xA0"), /*#__PURE__*/react.createElement("span", {
      className: NO_WRAP_ELLIPSIS_CLASS_NAMES
    }, timeRemaining ? `Less than ${getFormattedTimeRemaining()} remaining. ` : ''), /*#__PURE__*/react.createElement("span", {
      className: classnames_default()(NO_WRAP_ELLIPSIS_CLASS_NAMES, 'text-primary-active hover:text-primary-light active:text-aqua-pale ml-auto cursor-pointer'),
      onClick: cancelAllUploads
    }, "Cancel All Uploads")));
  };
  const getShowFailedOnlyIconComponent = () => {
    return /*#__PURE__*/react.createElement("div", {
      className: "ml-auto flex w-6 justify-center"
    }, numFails > 0 && /*#__PURE__*/react.createElement("div", {
      onClick: () => setShowFailedOnly(currentShowFailedOnly => !currentShowFailedOnly)
    }, /*#__PURE__*/react.createElement(ui_src/* Icon */.In, {
      className: "cursor-pointer",
      name: "icon-status-alert"
    })));
  };
  const getPercentCompleteComponent = () => {
    return /*#__PURE__*/react.createElement("div", {
      className: "ohif-scrollbar border-secondary-light overflow-y-scroll border-b px-2"
    }, /*#__PURE__*/react.createElement("div", {
      className: "min-h-14 flex w-full items-center p-2.5"
    }, numFilesCompleted === dicomFileUploaderArr.length ? /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
      className: "text-primary-light text-xl"
    }, numFails > 0 ? `Completed with ${numFails} ${numFails > 1 ? 'errors' : 'error'}!` : 'Completed!'), getShowFailedOnlyIconComponent()) : /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
      ref: progressBarContainerRef,
      className: "flex-grow"
    }, /*#__PURE__*/react.createElement(ui_src/* ProgressLoadingBar */.dD, {
      progress: showInfiniteProgressBar() ? undefined : Math.min(100, percentComplete)
    })), /*#__PURE__*/react.createElement("div", {
      className: "ml-1 flex w-24 items-center"
    }, /*#__PURE__*/react.createElement("div", {
      className: "w-10 text-right"
    }, `${getPercentCompleteRounded()}%`), getShowFailedOnlyIconComponent()))));
  };
  return /*#__PURE__*/react.createElement("div", {
    className: "flex grow flex-col"
  }, getNumCompletedAndTimeRemainingComponent(), /*#__PURE__*/react.createElement("div", {
    className: "flex grow flex-col overflow-hidden bg-black text-lg"
  }, getPercentCompleteComponent(), /*#__PURE__*/react.createElement("div", {
    className: "ohif-scrollbar h-1 grow overflow-y-scroll px-2"
  }, dicomFileUploaderArr.filter(dicomFileUploader => !showFailedOnly || dicomFileUploader.getStatus() === UploadStatus.Failed).map(dicomFileUploader => /*#__PURE__*/react.createElement(DicomUpload_DicomUploadProgressItem, {
    key: dicomFileUploader.getFileId(),
    dicomFileUploader: dicomFileUploader
  })))));
}
DicomUploadProgress.propTypes = {
  dicomFileUploaderArr: prop_types_default().arrayOf(prop_types_default().instanceOf(DicomFileUploader)).isRequired,
  onComplete: (prop_types_default()).func.isRequired
};
/* harmony default export */ const DicomUpload_DicomUploadProgress = (DicomUploadProgress);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/components/DicomUpload/DicomUpload.css
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/components/DicomUpload/DicomUpload.tsx
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }








function DicomUpload({
  dataSource,
  onComplete,
  onStarted
}) {
  const baseClassNames = 'min-h-[480px] flex flex-col bg-black select-none';
  const [dicomFileUploaderArr, setDicomFileUploaderArr] = (0,react.useState)([]);
  const onDrop = (0,react.useCallback)(async acceptedFiles => {
    onStarted();
    setDicomFileUploaderArr(acceptedFiles.map(file => new DicomFileUploader(file, dataSource)));
  }, []);
  const getDropZoneComponent = () => {
    return /*#__PURE__*/react.createElement(es/* default */.A, {
      onDrop: acceptedFiles => {
        onDrop(acceptedFiles);
      },
      noClick: true
    }, ({
      getRootProps
    }) => /*#__PURE__*/react.createElement("div", _extends({}, getRootProps(), {
      className: "dicom-upload-drop-area-border-dash m-5 flex h-full flex-col items-center justify-center"
    }), /*#__PURE__*/react.createElement("div", {
      className: "flex gap-3"
    }, /*#__PURE__*/react.createElement(es/* default */.A, {
      onDrop: onDrop,
      noDrag: true
    }, ({
      getRootProps,
      getInputProps
    }) => /*#__PURE__*/react.createElement("div", getRootProps(), /*#__PURE__*/react.createElement(ui_src/* Button */.$n, {
      disabled: false,
      onClick: () => {}
    }, 'Add files', /*#__PURE__*/react.createElement("input", getInputProps())))), /*#__PURE__*/react.createElement(es/* default */.A, {
      onDrop: onDrop,
      noDrag: true
    }, ({
      getRootProps,
      getInputProps
    }) => /*#__PURE__*/react.createElement("div", getRootProps(), /*#__PURE__*/react.createElement(ui_src/* Button */.$n, {
      type: ui_src/* ButtonEnums.type */.Ny.NW.secondary,
      disabled: false,
      onClick: () => {}
    }, 'Add folder', /*#__PURE__*/react.createElement("input", _extends({}, getInputProps(), {
      webkitdirectory: "true",
      mozdirectory: "true"
    })))))), /*#__PURE__*/react.createElement("div", {
      className: "pt-5"
    }, "or drag images or folders here"), /*#__PURE__*/react.createElement("div", {
      className: "text-aqua-pale pt-3 text-lg"
    }, "(DICOM files supported)")));
  };
  return /*#__PURE__*/react.createElement(react.Fragment, null, dicomFileUploaderArr.length ? /*#__PURE__*/react.createElement("div", {
    className: classnames_default()('h-[calc(100vh-300px)]', baseClassNames)
  }, /*#__PURE__*/react.createElement(DicomUpload_DicomUploadProgress, {
    dicomFileUploaderArr: Array.from(dicomFileUploaderArr),
    onComplete: onComplete
  })) : /*#__PURE__*/react.createElement("div", {
    className: classnames_default()('h-[480px]', baseClassNames)
  }, getDropZoneComponent()));
}
DicomUpload.propTypes = {
  dataSource: (prop_types_default()).object.isRequired,
  onComplete: (prop_types_default()).func.isRequired,
  onStarted: (prop_types_default()).func.isRequired
};
/* harmony default export */ const DicomUpload_DicomUpload = (DicomUpload);
// EXTERNAL MODULE: ../../../extensions/cornerstone/src/hooks/useSegmentations.ts
var useSegmentations = __webpack_require__(73421);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/index.tsx
function src_extends() { return src_extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, src_extends.apply(null, arguments); }









































const {
  imageRetrieveMetadataProvider
} = esm.utilities;
const Component = /*#__PURE__*/react.lazy(() => {
  return __webpack_require__.e(/* import() */ 9611).then(__webpack_require__.bind(__webpack_require__, 69611));
});
const OHIFCornerstoneViewport = props => {
  return /*#__PURE__*/react.createElement(react.Suspense, {
    fallback: /*#__PURE__*/react.createElement("div", null, "Loading...")
  }, /*#__PURE__*/react.createElement(Component, props));
};
const stackRetrieveOptions = {
  retrieveOptions: {
    single: {
      streaming: true,
      decodeLevel: 1
    }
  }
};

/**
 *
 */
const cornerstoneExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: id,
  onModeEnter: ({
    servicesManager
  }) => {
    const {
      cornerstoneViewportService,
      toolbarService,
      segmentationService
    } = servicesManager.services;
    toolbarService.registerEventForToolbarUpdate(cornerstoneViewportService, [cornerstoneViewportService.EVENTS.VIEWPORT_DATA_CHANGED]);
    toolbarService.registerEventForToolbarUpdate(segmentationService, [segmentationService.EVENTS.SEGMENTATION_REMOVED, segmentationService.EVENTS.SEGMENTATION_MODIFIED]);
    toolbarService.registerEventForToolbarUpdate(esm.eventTarget, [dist_esm.Enums.Events.TOOL_ACTIVATED]);

    // Configure the interleaved/HTJ2K loader
    imageRetrieveMetadataProvider.clear();
    // The default volume interleaved options are to interleave the
    // image retrieve, but don't perform progressive loading per image
    // This interleaves images and replicates them for low-resolution depth volume
    // reconstruction, which progressively improves
    imageRetrieveMetadataProvider.add('volume', esm.ProgressiveRetrieveImages.interleavedRetrieveStages);
    // The default stack loading option is to progressive load HTJ2K images
    // There are other possible options, but these need more thought about
    // how to define them.
    imageRetrieveMetadataProvider.add('stack', stackRetrieveOptions);
  },
  getPanelModule: src_getPanelModule,
  onModeExit: ({
    servicesManager
  }) => {
    const {
      cineService,
      segmentationService
    } = servicesManager.services;
    // Empty out the image load and retrieval pools to prevent memory leaks
    // on the mode exits
    Object.values(esm.Enums.RequestType).forEach(type => {
      esm.imageLoadPoolManager.clearRequestStack(type);
      esm.imageRetrievalPoolManager.clearRequestStack(type);
    });
    cineService.setIsCineEnabled(false);
    (0,state/* reset */.cL)();
    useLutPresentationStore/* useLutPresentationStore */.I.getState().clearLutPresentationStore();
    usePositionPresentationStore/* usePositionPresentationStore */.q.getState().clearPositionPresentationStore();
    useSynchronizersStore/* useSynchronizersStore */.U.getState().clearSynchronizersStore();
    useToggleOneUpViewportGridStore/* useToggleOneUpViewportGridStore */.Y.getState().clearToggleOneUpViewportGridStore();
    useSegmentationPresentationStore/* useSegmentationPresentationStore */.v.getState().clearSegmentationPresentationStore();
    segmentationService.removeAllSegmentations();
  },
  /**
   * Register the Cornerstone 3D services and set them up for use.
   *
   * @param configuration.csToolsConfig - Passed directly to `initCornerstoneTools`
   */
  preRegistration: function (props) {
    const {
      servicesManager,
      serviceProvidersManager
    } = props;
    servicesManager.registerService(ViewportService_CornerstoneViewportService.REGISTRATION);
    servicesManager.registerService(services_ToolGroupService.REGISTRATION);
    servicesManager.registerService(services_SyncGroupService.REGISTRATION);
    servicesManager.registerService(services_SegmentationService.REGISTRATION);
    servicesManager.registerService(services_CornerstoneCacheService.REGISTRATION);
    servicesManager.registerService(ViewportActionCornersService/* default */.A.REGISTRATION);
    servicesManager.registerService(services_ColorbarService.REGISTRATION);
    serviceProvidersManager.registerProvider(ViewportActionCornersService/* default */.A.REGISTRATION.name, ViewportActionCornersProvider/* ViewportActionCornersProvider */.It);
    const {
      syncGroupService
    } = servicesManager.services;
    syncGroupService.registerCustomSynchronizer('frameview', createFrameViewSynchronizer);
    servicesManager.services.customizationService.setGlobalCustomization('dicomUploadComponent', {
      component: props => /*#__PURE__*/react.createElement(DicomUpload_DicomUpload, props)
    });
    return init.call(this, props);
  },
  getToolbarModule: getToolbarModule,
  getHangingProtocolModule: src_getHangingProtocolModule,
  getViewportModule({
    servicesManager,
    commandsManager
  }) {
    const ExtendedOHIFCornerstoneViewport = props => {
      // const onNewImageHandler = jumpData => {
      //   commandsManager.runCommand('jumpToImage', jumpData);
      // };
      const {
        toolbarService
      } = servicesManager.services;
      return /*#__PURE__*/react.createElement(OHIFCornerstoneViewport, src_extends({}, props, {
        toolbarService: toolbarService,
        servicesManager: servicesManager,
        commandsManager: commandsManager
      }));
    };
    return [{
      name: 'cornerstone',
      component: ExtendedOHIFCornerstoneViewport
    }];
  },
  getCommandsModule: src_commandsModule,
  getCustomizationModule: src_getCustomizationModule,
  getUtilityModule({
    servicesManager
  }) {
    return [{
      name: 'common',
      exports: {
        getCornerstoneLibraries: () => {
          return {
            cornerstone: esm,
            cornerstoneTools: dist_esm
          };
        },
        getEnabledElement: state/* getEnabledElement */.kJ,
        dicomLoaderService: utils_dicomLoaderService
      }
    }, {
      name: 'core',
      exports: {
        Enums: esm.Enums
      }
    }, {
      name: 'tools',
      exports: {
        toolNames: toolNames,
        Enums: dist_esm.Enums
      }
    }, {
      name: 'volumeLoader',
      exports: {
        getDynamicVolumeInfo: esm_utilities.getDynamicVolumeInfo
      }
    }];
  },
  getSopClassHandlerModule: getSopClassHandlerModule
};

/* harmony default export */ const cornerstone_src = (cornerstoneExtension);

/***/ }),

/***/ 77954:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ohif_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29463);
/* harmony import */ var _ohif_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38223);
var _ViewportActionCornersService;


class ViewportActionCornersService extends _ohif_core__WEBPACK_IMPORTED_MODULE_0__/* .PubSubService */ .Rc {
  constructor() {
    super(ViewportActionCornersService.EVENTS);
    this.serviceImplementation = {};
    this.LOCATIONS = ViewportActionCornersService.LOCATIONS;
    this.serviceImplementation = {};
  }
  setServiceImplementation({
    getState: getStateImplementation,
    addComponent: addComponentImplementation,
    addComponents: addComponentsImplementation,
    clear: clearComponentsImplementation
  }) {
    if (getStateImplementation) {
      this.serviceImplementation._getState = getStateImplementation;
    }
    if (addComponentImplementation) {
      this.serviceImplementation._addComponent = addComponentImplementation;
    }
    if (addComponentsImplementation) {
      this.serviceImplementation._addComponents = addComponentsImplementation;
    }
    if (clearComponentsImplementation) {
      this.serviceImplementation._clear = clearComponentsImplementation;
    }
  }
  getState() {
    return this.serviceImplementation._getState();
  }
  addComponent(component) {
    this.serviceImplementation._addComponent(component);
  }
  addComponents(components) {
    this.serviceImplementation._addComponents(components);
  }
  clear(viewportId) {
    this.serviceImplementation._clear(viewportId);
  }
}
_ViewportActionCornersService = ViewportActionCornersService;
ViewportActionCornersService.EVENTS = {};
ViewportActionCornersService.LOCATIONS = _ohif_ui__WEBPACK_IMPORTED_MODULE_1__/* .ViewportActionCornersLocations */ .ld;
ViewportActionCornersService.REGISTRATION = {
  name: 'viewportActionCornersService',
  altName: 'ViewportActionCornersService',
  create: ({
    configuration = {}
  }) => {
    return new _ViewportActionCornersService();
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ViewportActionCornersService);

/***/ }),

/***/ 71353:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cL: () => (/* binding */ reset),
/* harmony export */   kJ: () => (/* binding */ getEnabledElement),
/* harmony export */   ye: () => (/* binding */ setEnabledElement)
/* harmony export */ });
const state = {
  // The `defaultContext` of an extension's commandsModule
  DEFAULT_CONTEXT: 'CORNERSTONE',
  enabledElements: {}
};

/**
 * Sets the enabled element `dom` reference for an active viewport.
 * @param {HTMLElement} dom Active viewport element.
 * @return void
 */
const setEnabledElement = (viewportId, element, context) => {
  const targetContext = context || state.DEFAULT_CONTEXT;
  state.enabledElements[viewportId] = {
    element,
    context: targetContext
  };
};

/**
 * Grabs the enabled element `dom` reference of an active viewport.
 *
 * @return {HTMLElement} Active viewport element.
 */
const getEnabledElement = viewportId => {
  return state.enabledElements[viewportId];
};
const reset = () => {
  state.enabledElements = {};
};


/***/ }),

/***/ 46026:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FG: () => (/* binding */ JOIN_STR),
/* harmony export */   H7: () => (/* binding */ addUniqueIndex),
/* harmony export */   gS: () => (/* binding */ DEFAULT_STR)
/* harmony export */ });
const JOIN_STR = '&';

// The default lut presentation id if none defined
const DEFAULT_STR = 'default';

// This code finds the first unique index to add to the presentation id so that
// two viewports containing the same display set in the same type of viewport
// can have different presentation information.  This allows comparison of
// a single display set in two or more viewports, when the user has simply
// dragged and dropped the view in twice.  For example, it allows displaying
// bone, brain and soft tissue views of a single display set, and to still
// remember the specific changes to each viewport.
const addUniqueIndex = (arr, key, viewports, isUpdatingSameViewport) => {
  arr.push(0);

  // If we are updating the viewport, we should not increment the index
  if (isUpdatingSameViewport) {
    return;
  }

  // The 128 is just a value that is larger than how many viewports we
  // display at once, used as an upper bound on how many unique presentation
  // ID's might exist for a single display set at once.
  for (let displayInstance = 0; displayInstance < 128; displayInstance++) {
    arr[arr.length - 1] = displayInstance;
    const testId = arr.join(JOIN_STR);
    if (!Array.from(viewports.values()).find(viewport => viewport.viewportOptions?.presentationIds?.[key] === testId)) {
      break;
    }
  }
};


/***/ }),

/***/ 10182:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ useLutPresentationStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95759);
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39100);
/* harmony import */ var _presentationUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(46026);




/**
 * Identifier for the LUT Presentation store type.
 */
const PRESENTATION_TYPE_ID = 'lutPresentationId';

/**
 * Flag to enable or disable debug mode for the store.
 * Set to `true` to enable zustand devtools.
 */
const DEBUG_STORE = false;

/**
 * Represents the state and actions for managing LUT presentations.
 */

/**
 * Generates a presentation ID for LUT based on the viewport configuration.
 *
 * @param id - The ID to check.
 * @param options - Configuration options.
 * @param options.viewport - The current viewport.
 * @param options.viewports - All available viewports.
 * @param options.isUpdatingSameViewport - Indicates if the same viewport is being updated.
 * @returns The LUT presentation ID or undefined.
 */
const getLutPresentationId = (id, {
  viewport,
  viewports,
  isUpdatingSameViewport
}) => {
  if (id !== PRESENTATION_TYPE_ID) {
    return;
  }
  const getLutId = ds => {
    if (!ds || !ds.options) {
      return _presentationUtils__WEBPACK_IMPORTED_MODULE_2__/* .DEFAULT_STR */ .gS;
    }
    if (ds.options.id) {
      return ds.options.id;
    }
    const arr = Object.entries(ds.options).map(([key, val]) => `${key}=${val}`);
    if (!arr.length) {
      return _presentationUtils__WEBPACK_IMPORTED_MODULE_2__/* .DEFAULT_STR */ .gS;
    }
    return arr.join(_presentationUtils__WEBPACK_IMPORTED_MODULE_2__/* .JOIN_STR */ .FG);
  };
  if (!viewport || !viewport.viewportOptions || !viewport.displaySetInstanceUIDs?.length) {
    return;
  }
  const {
    displaySetOptions,
    displaySetInstanceUIDs
  } = viewport;
  const lutId = getLutId(displaySetOptions[0]);
  const lutPresentationArr = [lutId];
  for (const uid of displaySetInstanceUIDs) {
    lutPresentationArr.push(uid);
  }
  (0,_presentationUtils__WEBPACK_IMPORTED_MODULE_2__/* .addUniqueIndex */ .H7)(lutPresentationArr, PRESENTATION_TYPE_ID, viewports, isUpdatingSameViewport);
  return lutPresentationArr.join(_presentationUtils__WEBPACK_IMPORTED_MODULE_2__/* .JOIN_STR */ .FG);
};

/**
 * Creates the LUT Presentation store.
 *
 * @param set - The zustand set function.
 * @returns The LUT Presentation store state and actions.
 */
const createLutPresentationStore = set => ({
  type: PRESENTATION_TYPE_ID,
  lutPresentationStore: {},
  /**
   * Sets the LUT presentation for a given key.
   */
  setLutPresentation: (key, value) => set(state => ({
    lutPresentationStore: {
      ...state.lutPresentationStore,
      [key]: value
    }
  }), false, 'setLutPresentation'),
  /**
   * Clears all LUT presentations from the store.
   */
  clearLutPresentationStore: () => set({
    lutPresentationStore: {}
  }, false, 'clearLutPresentationStore'),
  /**
   * Retrieves the presentation ID based on the provided parameters.
   */
  getPresentationId: getLutPresentationId
});

/**
 * Zustand store for managing LUT presentations.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const useLutPresentationStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__/* .create */ .vt)()(DEBUG_STORE ? (0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__/* .devtools */ .lt)(createLutPresentationStore, {
  name: 'LutPresentationStore'
}) : createLutPresentationStore);

/***/ }),

/***/ 44646:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ usePositionPresentationStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95759);
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39100);
/* harmony import */ var _presentationUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(46026);



const PRESENTATION_TYPE_ID = 'positionPresentationId';
const DEBUG_STORE = true;

/**
 * Represents the state and actions for managing position presentations.
 */

/**
 * Generates a position presentation ID based on the viewport configuration.
 *
 * @param id - The ID to check.
 * @param options - Configuration options.
 * @param options.viewport - The current viewport.
 * @param options.viewports - All available viewports.
 * @param options.isUpdatingSameViewport - Indicates if the same viewport is being updated.
 * @returns The position presentation ID or undefined.
 */
const getPresentationId = (id, {
  viewport,
  viewports,
  isUpdatingSameViewport
}) => {
  if (id !== PRESENTATION_TYPE_ID) {
    return;
  }
  if (!viewport?.viewportOptions || !viewport.displaySetInstanceUIDs?.length) {
    return;
  }
  return getPositionPresentationId(viewport, viewports, isUpdatingSameViewport);
};
function getPositionPresentationId(viewport, viewports, isUpdatingSameViewport) {
  const {
    viewportOptions = {},
    displaySetInstanceUIDs = [],
    displaySetOptions = []
  } = viewport;
  const {
    id: viewportOptionId,
    orientation
  } = viewportOptions;
  const positionPresentationArr = [orientation || 'acquisition'];
  if (viewportOptionId) {
    positionPresentationArr.push(viewportOptionId);
  }
  if (displaySetOptions?.some(ds => ds.options?.blendMode || ds.options?.displayPreset)) {
    positionPresentationArr.push(`custom`);
  }
  for (const uid of displaySetInstanceUIDs) {
    positionPresentationArr.push(uid);
  }
  if (viewports && viewports.length && isUpdatingSameViewport !== undefined) {
    (0,_presentationUtils__WEBPACK_IMPORTED_MODULE_2__/* .addUniqueIndex */ .H7)(positionPresentationArr, PRESENTATION_TYPE_ID, viewports, isUpdatingSameViewport);
  } else {
    positionPresentationArr.push(0);
  }
  return positionPresentationArr.join(_presentationUtils__WEBPACK_IMPORTED_MODULE_2__/* .JOIN_STR */ .FG);
}

/**
 * Creates the Position Presentation store.
 *
 * @param set - The zustand set function.
 * @returns The Position Presentation store state and actions.
 */
const createPositionPresentationStore = set => ({
  type: PRESENTATION_TYPE_ID,
  positionPresentationStore: {},
  /**
   * Sets the position presentation for a given key.
   */
  setPositionPresentation: (key, value) => set(state => ({
    positionPresentationStore: {
      ...state.positionPresentationStore,
      [key]: value
    }
  }), false, 'setPositionPresentation'),
  /**
   * Clears all position presentations from the store.
   */
  clearPositionPresentationStore: () => set({
    positionPresentationStore: {}
  }, false, 'clearPositionPresentationStore'),
  /**
   * Retrieves the presentation ID based on the provided parameters.
   */
  getPresentationId,
  getPositionPresentationId: getPositionPresentationId
});

/**
 * Zustand store for managing position presentations.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const usePositionPresentationStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__/* .create */ .vt)()(DEBUG_STORE ? (0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__/* .devtools */ .lt)(createPositionPresentationStore, {
  name: 'PositionPresentationStore'
}) : createPositionPresentationStore);

/***/ }),

/***/ 2847:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  v: () => (/* binding */ useSegmentationPresentationStore)
});

// EXTERNAL MODULE: ../node_modules/zustand/esm/index.mjs + 1 modules
var esm = __webpack_require__(95759);
// EXTERNAL MODULE: ../node_modules/zustand/esm/middleware.mjs
var middleware = __webpack_require__(39100);
// EXTERNAL MODULE: ../../../extensions/cornerstone/src/stores/presentationUtils.ts
var presentationUtils = __webpack_require__(46026);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/index.js
var dist_esm = __webpack_require__(81985);
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/utils/getViewportOrientationFromImageOrientationPatient.ts

const {
  MPR_CAMERA_VALUES
} = dist_esm.CONSTANTS;

/**
 * Determines the viewport orientation (axial, sagittal, or coronal) based on the image orientation patient values.
 * This is done by comparing the view vectors with predefined MPR camera values.
 *
 * @param imageOrientationPatient - Array of 6 numbers representing the image orientation patient values.
 * The first 3 numbers represent the direction cosines of the first row and the second 3 numbers
 * represent the direction cosines of the first column.
 *
 * @returns The viewport orientation as a string ('axial', 'sagittal', 'coronal') or undefined if
 * the orientation cannot be determined or if the input is invalid.
 *
 * @example
 * ```typescript
 * const orientation = getViewportOrientationFromImageOrientationPatient([1,0,0,0,1,0]);
 * console.debug(orientation); // 'axial'
 * ```
 */
const getViewportOrientationFromImageOrientationPatient = imageOrientationPatient => {
  if (!imageOrientationPatient || imageOrientationPatient.length !== 6) {
    return undefined;
  }
  const viewRight = imageOrientationPatient.slice(0, 3);
  const viewDown = imageOrientationPatient.slice(3, 6);
  const viewUp = [-viewDown[0], -viewDown[1], -viewDown[2]];

  // Compare vectors with MPR camera values using utilities.isEqual
  if (dist_esm.utilities.isEqual(viewRight, MPR_CAMERA_VALUES.axial.viewRight) && dist_esm.utilities.isEqual(viewUp, MPR_CAMERA_VALUES.axial.viewUp)) {
    return 'axial';
  }
  if (dist_esm.utilities.isEqual(viewRight, MPR_CAMERA_VALUES.sagittal.viewRight) && dist_esm.utilities.isEqual(viewUp, MPR_CAMERA_VALUES.sagittal.viewUp)) {
    return 'sagittal';
  }
  if (dist_esm.utilities.isEqual(viewRight, MPR_CAMERA_VALUES.coronal.viewRight) && dist_esm.utilities.isEqual(viewUp, MPR_CAMERA_VALUES.coronal.viewUp)) {
    return 'coronal';
  }
  return undefined;
};
;// CONCATENATED MODULE: ../../../extensions/cornerstone/src/stores/useSegmentationPresentationStore.ts




const PRESENTATION_TYPE_ID = 'segmentationPresentationId';
const DEBUG_STORE = false;

/**
 * The keys are the presentationId.
 */

/**
 * Generates a segmentation presentation ID based on the viewport configuration.
 *
 * @param id - The ID to check.
 * @param options - Configuration options.
 * @param options.viewport - The current viewport.
 * @param options.viewports - All available viewports.
 * @param options.isUpdatingSameViewport - Indicates if the same viewport is being updated.
 * @param options.servicesManager - The services manager instance.
 * @returns The segmentation presentation ID or undefined.
 */
const getPresentationId = (id, {
  viewport,
  viewports,
  isUpdatingSameViewport,
  servicesManager
}) => {
  if (id !== PRESENTATION_TYPE_ID) {
    return;
  }
  return _getSegmentationPresentationId({
    viewport,
    servicesManager
  });
};

/**
 * Helper function to generate the segmentation presentation ID.
 *
 * @param params - Parameters for generating the segmentation presentation ID.
 * @param params.viewport - The current viewport.
 * @param params.servicesManager - The services manager instance.
 * @returns The segmentation presentation ID or undefined.
 */
const _getSegmentationPresentationId = ({
  viewport,
  servicesManager
}) => {
  if (!viewport?.viewportOptions || !viewport.displaySetInstanceUIDs?.length) {
    return;
  }
  const {
    displaySetInstanceUIDs,
    viewportOptions
  } = viewport;
  let orientation = viewportOptions.orientation;
  if (!orientation) {
    // Calculate orientation from the viewport sample image
    const displaySet = servicesManager.services.displaySetService.getDisplaySetByUID(displaySetInstanceUIDs[0]);
    const sampleImage = displaySet.images?.[0];
    const imageOrientationPatient = sampleImage?.ImageOrientationPatient;
    orientation = getViewportOrientationFromImageOrientationPatient(imageOrientationPatient);
  }
  const segmentationPresentationArr = [];
  segmentationPresentationArr.push(...displaySetInstanceUIDs);

  // Uncomment if unique indexing is needed
  // addUniqueIndex(
  //   segmentationPresentationArr,
  //   'segmentationPresentationId',
  //   viewports,
  //   isUpdatingSameViewport
  // );

  return segmentationPresentationArr.join(presentationUtils/* JOIN_STR */.FG);
};

/**
 * Creates the Segmentation Presentation store.
 *
 * @param set - The zustand set function.
 * @returns The Segmentation Presentation store state and actions.
 */
const createSegmentationPresentationStore = set => ({
  type: PRESENTATION_TYPE_ID,
  segmentationPresentationStore: {},
  /**
   * Clears all segmentation presentations from the store.
   */
  clearSegmentationPresentationStore: () => set({
    segmentationPresentationStore: {}
  }, false, 'clearSegmentationPresentationStore'),
  /**
   * Adds a new segmentation presentation item to the store.
   *
   * segmentationPresentationItem: {
   *   segmentationId: string;
   *   type: SegmentationRepresentations;
   *   hydrated: boolean | null;
   *   config?: unknown;
   * }
   */
  addSegmentationPresentationItem: (presentationId, segmentationPresentationItem) => set(state => ({
    segmentationPresentationStore: {
      ...state.segmentationPresentationStore,
      [presentationId]: [...(state.segmentationPresentationStore[presentationId] || []), segmentationPresentationItem]
    }
  }), false, 'addSegmentationPresentationItem'),
  /**
   * Sets the segmentation presentation for a given presentation ID. A segmentation
   * presentation is an array of SegmentationPresentationItem.
   *
   * segmentationPresentationItem: {
   *   segmentationId: string;
   *   type: SegmentationRepresentations;
   *   hydrated: boolean | null;
   *   config?: unknown;
   * }
   *
   * segmentationPresentation: SegmentationPresentationItem[]
   */
  setSegmentationPresentation: (presentationId, values) => set(state => ({
    segmentationPresentationStore: {
      ...state.segmentationPresentationStore,
      [presentationId]: values
    }
  }), false, 'setSegmentationPresentation'),
  /**
   * Retrieves the presentation ID based on the provided parameters.
   */
  getPresentationId,
  /**
   * Retrieves the current segmentation presentation ID.
   */
  getSegmentationPresentationId: _getSegmentationPresentationId
});

/**
 * Zustand store for managing segmentation presentations.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const useSegmentationPresentationStore = (0,esm/* create */.vt)()(DEBUG_STORE ? (0,middleware/* devtools */.lt)(createSegmentationPresentationStore, {
  name: 'Segmentation Presentation Store'
}) : createSegmentationPresentationStore);

/***/ }),

/***/ 68578:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   U: () => (/* binding */ useSynchronizersStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95759);
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(39100);



/**
 * Identifier for the synchronizers store type.
 */
const PRESENTATION_TYPE_ID = 'synchronizersStoreId';

/**
 * Flag to enable or disable debug mode for the store.
 * Set to `true` to enable zustand devtools.
 */
const DEBUG_STORE = false;

/**
 * Information about a single synchronizer.
 */

/**
 * State shape for the Synchronizers store.
 */

/**
 * Creates the Synchronizers store.
 *
 * @param set - The zustand set function.
 * @returns The synchronizers store state and actions.
 */
const createSynchronizersStore = set => ({
  synchronizersStore: {},
  type: PRESENTATION_TYPE_ID,
  setSynchronizers: (viewportId, synchronizers) => {
    set(state => ({
      synchronizersStore: {
        ...state.synchronizersStore,
        [viewportId]: synchronizers
      }
    }), false, 'setSynchronizers');
  },
  clearSynchronizersStore: () => {
    set({
      synchronizersStore: {}
    }, false, 'clearSynchronizersStore');
  }
});

/**
 * Zustand store for managing synchronizers.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const useSynchronizersStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__/* .create */ .vt)()(DEBUG_STORE ? (0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__/* .devtools */ .lt)(createSynchronizersStore, {
  name: 'SynchronizersStore'
}) : createSynchronizersStore);

/***/ })

}]);