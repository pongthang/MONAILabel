"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[8259],{

/***/ 78259:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ basic_test_mode_src)
});

// EXTERNAL MODULE: ../../core/src/index.ts + 71 modules
var src = __webpack_require__(29463);
// EXTERNAL MODULE: ../../ui/src/index.js + 690 modules
var ui_src = __webpack_require__(38223);
;// CONCATENATED MODULE: ../../../modes/basic-test-mode/src/toolbarButtons.ts
// TODO: torn, can either bake this here; or have to create a whole new button type
// Only ways that you can pass in a custom React component for render :l


const {
  windowLevelPresets
} = src/* defaults */.NT;
const {
  createButton
} = src/* ToolbarService */.hx;

/**
 *
 * @param {*} preset - preset number (from above import)
 * @param {*} title
 * @param {*} subtitle
 */
function _createWwwcPreset(preset, title, subtitle) {
  return {
    id: preset.toString(),
    title,
    subtitle,
    commands: [{
      commandName: 'setWindowLevel',
      commandOptions: {
        ...windowLevelPresets[preset]
      },
      context: 'CORNERSTONE'
    }]
  };
}
const setToolActiveToolbar = {
  commandName: 'setToolActiveToolbar',
  commandOptions: {
    toolGroupIds: ['default', 'mpr', 'SRToolGroup']
  }
};
const toolbarButtons = [{
  id: 'MeasurementTools',
  uiType: 'ohif.splitButton',
  props: {
    groupId: 'MeasurementTools',
    // group evaluate to determine which item should move to the top
    evaluate: 'evaluate.group.promoteToPrimaryIfCornerstoneToolNotActiveInTheList',
    primary: createButton({
      id: 'Length',
      icon: 'tool-length',
      label: 'Length',
      tooltip: 'Length Tool',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    }),
    secondary: {
      icon: 'chevron-down',
      tooltip: 'More Measure Tools'
    },
    items: [createButton({
      id: 'Length',
      icon: 'tool-length',
      label: 'Length',
      tooltip: 'Length Tool',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    }), createButton({
      id: 'Bidirectional',
      icon: 'tool-bidirectional',
      label: 'Bidirectional',
      tooltip: 'Bidirectional Tool',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    }), createButton({
      id: 'ArrowAnnotate',
      icon: 'tool-annotate',
      label: 'Annotation',
      tooltip: 'Arrow Annotate',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    }), createButton({
      id: 'EllipticalROI',
      icon: 'tool-ellipse',
      label: 'Ellipse',
      tooltip: 'Ellipse ROI',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    }), createButton({
      id: 'CircleROI',
      icon: 'tool-circle',
      label: 'Circle',
      tooltip: 'Circle Tool',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    }), createButton({
      id: 'PlanarFreehandROI',
      icon: 'icon-tool-freehand-roi',
      label: 'Freehand ROI',
      tooltip: 'Freehand ROI',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    }), createButton({
      id: 'SplineROI',
      icon: 'icon-tool-spline-roi',
      label: 'Spline ROI',
      tooltip: 'Spline ROI',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    }), createButton({
      id: 'LivewireContour',
      icon: 'icon-tool-livewire',
      label: 'Livewire tool',
      tooltip: 'Livewire tool',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    })]
  }
}, {
  id: 'Zoom',
  uiType: 'ohif.radioGroup',
  props: {
    icon: 'tool-zoom',
    label: 'Zoom',
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
},
// Window Level
{
  id: 'WindowLevel',
  uiType: 'ohif.splitButton',
  props: {
    groupId: 'WindowLevel',
    primary: createButton({
      id: 'WindowLevel',
      icon: 'tool-window-level',
      label: 'Window Level',
      tooltip: 'Window Level',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    }),
    secondary: {
      icon: 'chevron-down',
      label: 'W/L Manual',
      tooltip: 'W/L Presets'
    },
    renderer: ui_src/* WindowLevelMenuItem */.d4,
    items: [_createWwwcPreset(1, 'Soft tissue', '400 / 40'), _createWwwcPreset(2, 'Lung', '1500 / -600'), _createWwwcPreset(3, 'Liver', '150 / 90'), _createWwwcPreset(4, 'Bone', '2500 / 480'), _createWwwcPreset(5, 'Brain', '80 / 40')]
  }
},
// Pan...
{
  id: 'Pan',
  uiType: 'ohif.radioGroup',
  props: {
    type: 'tool',
    icon: 'tool-move',
    label: 'Pan',
    commands: setToolActiveToolbar,
    evaluate: 'evaluate.cornerstoneTool'
  }
}, {
  id: 'MPR',
  uiType: 'ohif.radioGroup',
  props: {
    icon: 'icon-mpr',
    label: 'MPR',
    commands: [{
      commandName: 'toggleHangingProtocol',
      commandOptions: {
        protocolId: 'mpr'
      }
    }],
    evaluate: 'evaluate.mpr'
  }
}, {
  id: 'TrackBallRotate',
  type: 'ohif.radioGroup',
  props: {
    type: 'tool',
    icon: 'tool-3d-rotate',
    label: '3D Rotate',
    commands: setToolActiveToolbar
  }
}, {
  id: 'Capture',
  uiType: 'ohif.radioGroup',
  props: {
    icon: 'tool-capture',
    label: 'Capture',
    commands: 'showDownloadViewportModal',
    evaluate: ['evaluate.action', {
      name: 'evaluate.viewport.supported',
      unsupportedViewportTypes: ['video', 'wholeSlide']
    }]
  }
}, {
  id: 'Layout',
  uiType: 'ohif.layoutSelector',
  props: {
    rows: 3,
    columns: 4,
    evaluate: 'evaluate.action',
    commands: 'setViewportGridLayout'
  }
}, {
  id: 'Crosshairs',
  uiType: 'ohif.radioGroup',
  props: {
    type: 'tool',
    icon: 'tool-crosshair',
    label: 'Crosshairs',
    commands: {
      commandName: 'setToolActiveToolbar',
      commandOptions: {
        toolGroupIds: ['mpr']
      }
    },
    evaluate: 'evaluate.cornerstoneTool'
  }
}];
/* harmony default export */ const src_toolbarButtons = (toolbarButtons);
;// CONCATENATED MODULE: ../../../modes/basic-test-mode/package.json
const package_namespaceObject = /*#__PURE__*/JSON.parse('{"UU":"@ohif/mode-test"}');
;// CONCATENATED MODULE: ../../../modes/basic-test-mode/src/id.js

const id = package_namespaceObject.UU;

;// CONCATENATED MODULE: ../../../modes/basic-test-mode/src/initToolGroups.ts
const colours = {
  'viewport-0': 'rgb(200, 0, 0)',
  'viewport-1': 'rgb(200, 200, 0)',
  'viewport-2': 'rgb(0, 200, 0)'
};
const colorsByOrientation = {
  axial: 'rgb(200, 0, 0)',
  sagittal: 'rgb(200, 200, 0)',
  coronal: 'rgb(0, 200, 0)'
};
function initDefaultToolGroup(extensionManager, toolGroupService, commandsManager, toolGroupId) {
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
  const {
    toolNames,
    Enums
  } = utilityModule.exports;
  const tools = {
    active: [{
      toolName: toolNames.WindowLevel,
      bindings: [{
        mouseButton: Enums.MouseBindings.Primary
      }]
    }, {
      toolName: toolNames.Pan,
      bindings: [{
        mouseButton: Enums.MouseBindings.Auxiliary
      }]
    }, {
      toolName: toolNames.Zoom,
      bindings: [{
        mouseButton: Enums.MouseBindings.Secondary
      }]
    }, {
      toolName: toolNames.StackScroll,
      bindings: [{
        mouseButton: Enums.MouseBindings.Wheel
      }]
    }],
    passive: [{
      toolName: toolNames.Length
    }, {
      toolName: toolNames.ArrowAnnotate,
      configuration: {
        getTextCallback: (callback, eventDetails) => commandsManager.runCommand('arrowTextCallback', {
          callback,
          eventDetails
        }),
        changeTextCallback: (data, eventDetails, callback) => commandsManager.runCommand('arrowTextCallback', {
          callback,
          data,
          eventDetails
        })
      }
    }, {
      toolName: toolNames.Bidirectional
    }, {
      toolName: toolNames.DragProbe
    }, {
      toolName: toolNames.Probe
    }, {
      toolName: toolNames.EllipticalROI
    }, {
      toolName: toolNames.CircleROI
    }, {
      toolName: toolNames.RectangleROI
    }, {
      toolName: toolNames.StackScroll
    }, {
      toolName: toolNames.Angle
    }, {
      toolName: toolNames.CobbAngle
    }, {
      toolName: toolNames.Magnify
    }, {
      toolName: toolNames.WindowLevelRegion
    }, {
      toolName: toolNames.UltrasoundDirectional
    }, {
      toolName: toolNames.PlanarFreehandROI
    }, {
      toolName: toolNames.SplineROI
    }, {
      toolName: toolNames.LivewireContour
    }],
    // enabled
    enabled: [{
      toolName: toolNames.ImageOverlayViewer
    }],
    // disabled
    disabled: [{
      toolName: toolNames.ReferenceLines
    }, {
      toolName: toolNames.AdvancedMagnify
    }]
  };
  toolGroupService.createToolGroupAndAddTools(toolGroupId, tools);
}
function initSRToolGroup(extensionManager, toolGroupService, commandsManager) {
  const SRUtilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone-dicom-sr.utilityModule.tools');
  const CS3DUtilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
  const {
    toolNames: SRToolNames
  } = SRUtilityModule.exports;
  const {
    toolNames,
    Enums
  } = CS3DUtilityModule.exports;
  const tools = {
    active: [{
      toolName: toolNames.WindowLevel,
      bindings: [{
        mouseButton: Enums.MouseBindings.Primary
      }]
    }, {
      toolName: toolNames.Pan,
      bindings: [{
        mouseButton: Enums.MouseBindings.Auxiliary
      }]
    }, {
      toolName: toolNames.Zoom,
      bindings: [{
        mouseButton: Enums.MouseBindings.Secondary
      }]
    }, {
      toolName: toolNames.StackScroll,
      bindings: [{
        mouseButton: Enums.MouseBindings.Wheel
      }]
    }],
    passive: [{
      toolName: SRToolNames.SRLength
    }, {
      toolName: SRToolNames.SRArrowAnnotate
    }, {
      toolName: SRToolNames.SRBidirectional
    }, {
      toolName: SRToolNames.SREllipticalROI
    }, {
      toolName: SRToolNames.SRCircleROI
    }, {
      toolName: toolNames.WindowLevelRegion
    }],
    enabled: [{
      toolName: SRToolNames.DICOMSRDisplay,
      bindings: []
    }]
    // disabled
  };
  const toolGroupId = 'SRToolGroup';
  toolGroupService.createToolGroupAndAddTools(toolGroupId, tools);
}
function initMPRToolGroup(extensionManager, toolGroupService, commandsManager) {
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
  const serviceManager = extensionManager._servicesManager;
  const {
    cornerstoneViewportService
  } = serviceManager.services;
  const {
    toolNames,
    Enums
  } = utilityModule.exports;
  const tools = {
    active: [{
      toolName: toolNames.WindowLevel,
      bindings: [{
        mouseButton: Enums.MouseBindings.Primary
      }]
    }, {
      toolName: toolNames.Pan,
      bindings: [{
        mouseButton: Enums.MouseBindings.Auxiliary
      }]
    }, {
      toolName: toolNames.Zoom,
      bindings: [{
        mouseButton: Enums.MouseBindings.Secondary
      }]
    }, {
      toolName: toolNames.StackScroll,
      bindings: [{
        mouseButton: Enums.MouseBindings.Wheel
      }]
    }],
    passive: [{
      toolName: toolNames.Length
    }, {
      toolName: toolNames.ArrowAnnotate,
      configuration: {
        getTextCallback: (callback, eventDetails) => commandsManager.runCommand('arrowTextCallback', {
          callback,
          eventDetails
        }),
        changeTextCallback: (data, eventDetails, callback) => commandsManager.runCommand('arrowTextCallback', {
          callback,
          data,
          eventDetails
        })
      }
    }, {
      toolName: toolNames.Bidirectional
    }, {
      toolName: toolNames.DragProbe
    }, {
      toolName: toolNames.Probe
    }, {
      toolName: toolNames.EllipticalROI
    }, {
      toolName: toolNames.CircleROI
    }, {
      toolName: toolNames.RectangleROI
    }, {
      toolName: toolNames.StackScroll
    }, {
      toolName: toolNames.Angle
    }, {
      toolName: toolNames.WindowLevelRegion
    }, {
      toolName: toolNames.PlanarFreehandROI
    }, {
      toolName: toolNames.SplineROI
    }],
    disabled: [{
      toolName: toolNames.Crosshairs,
      configuration: {
        viewportIndicators: false,
        autoPan: {
          enabled: false,
          panSize: 10
        },
        getReferenceLineColor: viewportId => {
          const viewportInfo = cornerstoneViewportService.getViewportInfo(viewportId);
          const viewportOptions = viewportInfo?.viewportOptions;
          if (viewportOptions) {
            return colours[viewportOptions.id] || colorsByOrientation[viewportOptions.orientation] || '#0c0';
          } else {
            console.warn('missing viewport?', viewportId);
            return '#0c0';
          }
        }
      }
    }, {
      toolName: toolNames.ReferenceLines
    }]

    // enabled
    // disabled
  };
  toolGroupService.createToolGroupAndAddTools('mpr', tools);
}
function initVolume3DToolGroup(extensionManager, toolGroupService) {
  const utilityModule = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.tools');
  const {
    toolNames,
    Enums
  } = utilityModule.exports;
  const tools = {
    active: [{
      toolName: toolNames.TrackballRotateTool,
      bindings: [{
        mouseButton: Enums.MouseBindings.Primary
      }]
    }, {
      toolName: toolNames.Zoom,
      bindings: [{
        mouseButton: Enums.MouseBindings.Secondary
      }]
    }, {
      toolName: toolNames.Pan,
      bindings: [{
        mouseButton: Enums.MouseBindings.Auxiliary
      }]
    }]
  };
  toolGroupService.createToolGroupAndAddTools('volume3d', tools);
}
function initToolGroups(extensionManager, toolGroupService, commandsManager) {
  initDefaultToolGroup(extensionManager, toolGroupService, commandsManager, 'default');
  initSRToolGroup(extensionManager, toolGroupService, commandsManager);
  initMPRToolGroup(extensionManager, toolGroupService, commandsManager);
  initVolume3DToolGroup(extensionManager, toolGroupService);
}
/* harmony default export */ const src_initToolGroups = (initToolGroups);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/core/dist/esm/index.js
var esm = __webpack_require__(81985);
;// CONCATENATED MODULE: ../../../modes/basic-test-mode/src/moreTools.ts



const {
  createButton: moreTools_createButton
} = src/* ToolbarService */.hx;
const ReferenceLinesListeners = [{
  commandName: 'setSourceViewportForReferenceLinesTool',
  context: 'CORNERSTONE'
}];
const moreTools = [{
  id: 'MoreTools',
  uiType: 'ohif.splitButton',
  props: {
    groupId: 'MoreTools',
    evaluate: 'evaluate.group.promoteToPrimaryIfCornerstoneToolNotActiveInTheList',
    primary: moreTools_createButton({
      id: 'Reset',
      icon: 'tool-reset',
      tooltip: 'Reset View',
      label: 'Reset',
      commands: 'resetViewport',
      evaluate: 'evaluate.action'
    }),
    secondary: {
      icon: 'chevron-down',
      label: '',
      tooltip: 'More Tools'
    },
    items: [moreTools_createButton({
      id: 'Reset',
      icon: 'tool-reset',
      label: 'Reset View',
      tooltip: 'Reset View',
      commands: 'resetViewport',
      evaluate: 'evaluate.action'
    }), moreTools_createButton({
      id: 'rotate-right',
      icon: 'tool-rotate-right',
      label: 'Rotate Right',
      tooltip: 'Rotate +90',
      commands: 'rotateViewportCW',
      evaluate: 'evaluate.action'
    }), moreTools_createButton({
      id: 'flipHorizontal',
      icon: 'tool-flip-horizontal',
      label: 'Flip Horizontal',
      tooltip: 'Flip Horizontally',
      commands: 'flipViewportHorizontal',
      evaluate: 'evaluate.viewportProperties.toggle'
    }), moreTools_createButton({
      id: 'ImageSliceSync',
      icon: 'link',
      label: 'Image Slice Sync',
      tooltip: 'Enable position synchronization on stack viewports',
      commands: {
        commandName: 'toggleSynchronizer',
        commandOptions: {
          type: 'imageSlice'
        }
      },
      listeners: {
        [esm.EVENTS.VIEWPORT_NEW_IMAGE_SET]: {
          commandName: 'toggleImageSliceSync',
          commandOptions: {
            toggledState: true
          }
        }
      },
      evaluate: 'evaluate.cornerstone.synchronizer'
    }), moreTools_createButton({
      id: 'ReferenceLines',
      icon: 'tool-referenceLines',
      label: 'Reference Lines',
      tooltip: 'Show Reference Lines',
      commands: 'toggleEnabledDisabledToolbar',
      listeners: {
        [src/* ViewportGridService */.sI.EVENTS.ACTIVE_VIEWPORT_ID_CHANGED]: ReferenceLinesListeners,
        [src/* ViewportGridService */.sI.EVENTS.VIEWPORTS_READY]: ReferenceLinesListeners
      },
      evaluate: 'evaluate.cornerstoneTool.toggle'
    }), moreTools_createButton({
      id: 'ImageOverlayViewer',
      icon: 'toggle-dicom-overlay',
      label: 'Image Overlay',
      tooltip: 'Toggle Image Overlay',
      commands: 'toggleEnabledDisabledToolbar',
      evaluate: 'evaluate.cornerstoneTool.toggle'
    }), moreTools_createButton({
      id: 'StackScroll',
      icon: 'tool-stack-scroll',
      label: 'Stack Scroll',
      tooltip: 'Stack Scroll',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    }), moreTools_createButton({
      id: 'invert',
      icon: 'tool-invert',
      label: 'Invert',
      tooltip: 'Invert Colors',
      commands: 'invertViewport',
      evaluate: 'evaluate.viewportProperties.toggle'
    }), moreTools_createButton({
      id: 'Probe',
      icon: 'tool-probe',
      label: 'Probe',
      tooltip: 'Probe',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    }), moreTools_createButton({
      id: 'Cine',
      icon: 'tool-cine',
      label: 'Cine',
      tooltip: 'Cine',
      commands: 'toggleCine',
      evaluate: 'evaluate.cine'
    }), moreTools_createButton({
      id: 'Angle',
      icon: 'tool-angle',
      label: 'Angle',
      tooltip: 'Angle',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    }), moreTools_createButton({
      id: 'CobbAngle',
      icon: 'icon-tool-cobb-angle',
      label: 'Cobb Angle',
      tooltip: 'Cobb Angle',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    }), moreTools_createButton({
      id: 'Magnify',
      icon: 'tool-magnify',
      label: 'Zoom-in',
      tooltip: 'Zoom-in',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    }), moreTools_createButton({
      id: 'RectangleROI',
      icon: 'tool-rectangle',
      label: 'Rectangle',
      tooltip: 'Rectangle',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    }), moreTools_createButton({
      id: 'CalibrationLine',
      icon: 'tool-calibration',
      label: 'Calibration',
      tooltip: 'Calibration Line',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    }), moreTools_createButton({
      id: 'TagBrowser',
      icon: 'dicom-tag-browser',
      label: 'Dicom Tag Browser',
      tooltip: 'Dicom Tag Browser',
      commands: 'openDICOMTagViewer'
    }), moreTools_createButton({
      id: 'AdvancedMagnify',
      icon: 'icon-tool-loupe',
      label: 'Magnify Probe',
      tooltip: 'Magnify Probe',
      commands: 'toggleActiveDisabledToolbar',
      evaluate: 'evaluate.cornerstoneTool.toggle.ifStrictlyDisabled'
    }), moreTools_createButton({
      id: 'UltrasoundDirectionalTool',
      icon: 'icon-tool-ultrasound-bidirectional',
      label: 'Ultrasound Directional',
      tooltip: 'Ultrasound Directional',
      commands: setToolActiveToolbar,
      evaluate: ['evaluate.cornerstoneTool', {
        name: 'evaluate.modality.supported',
        supportedModalities: ['US']
      }]
    }), moreTools_createButton({
      id: 'WindowLevelRegion',
      icon: 'icon-tool-window-region',
      label: 'Window Level Region',
      tooltip: 'Window Level Region',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool'
    })]
  }
}];
/* harmony default export */ const src_moreTools = (moreTools);
// EXTERNAL MODULE: ../../../node_modules/i18next/dist/esm/i18next.js
var i18next = __webpack_require__(40680);
;// CONCATENATED MODULE: ../../../modes/basic-test-mode/src/index.ts







// Allow this mode by excluding non-imaging modalities such as SR, SEG
// Also, SM is not a simple imaging modalities, so exclude it.
const NON_IMAGE_MODALITIES = ['ECG', 'SR', 'SEG', 'RTSTRUCT'];
const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  wsiSopClassHandler: '@ohif/extension-cornerstone.sopClassHandlerModule.DicomMicroscopySopClassHandler',
  thumbnailList: '@ohif/extension-default.panelModule.seriesList',
  measurements: '@ohif/extension-default.panelModule.measurements'
};
const tracked = {
  measurements: '@ohif/extension-measurement-tracking.panelModule.trackedMeasurements',
  thumbnailList: '@ohif/extension-measurement-tracking.panelModule.seriesList',
  viewport: '@ohif/extension-measurement-tracking.viewportModule.cornerstone-tracked'
};
const dicomsr = {
  sopClassHandler: '@ohif/extension-cornerstone-dicom-sr.sopClassHandlerModule.dicom-sr',
  viewport: '@ohif/extension-cornerstone-dicom-sr.viewportModule.dicom-sr'
};
const dicomvideo = {
  sopClassHandler: '@ohif/extension-dicom-video.sopClassHandlerModule.dicom-video',
  viewport: '@ohif/extension-dicom-video.viewportModule.dicom-video'
};
const dicompdf = {
  sopClassHandler: '@ohif/extension-dicom-pdf.sopClassHandlerModule.dicom-pdf',
  viewport: '@ohif/extension-dicom-pdf.viewportModule.dicom-pdf'
};
const dicomSeg = {
  sopClassHandler: '@ohif/extension-cornerstone-dicom-seg.sopClassHandlerModule.dicom-seg',
  viewport: '@ohif/extension-cornerstone-dicom-seg.viewportModule.dicom-seg'
};
const cornerstone = {
  panel: '@ohif/extension-cornerstone.panelModule.panelSegmentation'
};
const dicomPmap = {
  sopClassHandler: '@ohif/extension-cornerstone-dicom-pmap.sopClassHandlerModule.dicom-pmap',
  viewport: '@ohif/extension-cornerstone-dicom-pmap.viewportModule.dicom-pmap'
};
const extensionDependencies = {
  // Can derive the versions at least process.env.from npm_package_version
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
  '@ohif/extension-measurement-tracking': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-sr': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-seg': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-pmap': '^3.0.0',
  '@ohif/extension-dicom-pdf': '^3.0.1',
  '@ohif/extension-dicom-video': '^3.0.1',
  '@ohif/extension-test': '^0.0.1'
};
function modeFactory() {
  return {
    // TODO: We're using this as a route segment
    // We should not be.
    id: id,
    routeName: 'basic-test',
    displayName: i18next/* default */.A.t('Modes:Basic Test Mode'),
    /**
     * Lifecycle hooks
     */
    onModeEnter: ({
      servicesManager,
      extensionManager,
      commandsManager
    }) => {
      const {
        measurementService,
        toolbarService,
        toolGroupService,
        customizationService
      } = servicesManager.services;
      measurementService.clearMeasurements();

      // Init Default and SR ToolGroups
      src_initToolGroups(extensionManager, toolGroupService, commandsManager);

      // init customizations
      customizationService.addModeCustomizations(['@ohif/extension-test.customizationModule.custom-context-menu']);
      toolbarService.addButtons([...src_toolbarButtons, ...src_moreTools]);
      toolbarService.createButtonSection('primary', ['MeasurementTools', 'Zoom', 'WindowLevel', 'Pan', 'Capture', 'Layout', 'MPR', 'Crosshairs', 'MoreTools']);
    },
    onModeExit: ({
      servicesManager
    }) => {
      const {
        toolGroupService,
        syncGroupService,
        segmentationService,
        cornerstoneViewportService,
        uiDialogService,
        uiModalService
      } = servicesManager.services;
      uiDialogService.dismissAll();
      uiModalService.hide();
      toolGroupService.destroy();
      syncGroupService.destroy();
      segmentationService.destroy();
      cornerstoneViewportService.destroy();
    },
    validationTags: {
      study: [],
      series: []
    },
    isValidMode: function ({
      modalities
    }) {
      const modalities_list = modalities.split('\\');

      // Exclude non-image modalities
      return {
        valid: !!modalities_list.filter(modality => NON_IMAGE_MODALITIES.indexOf(modality) === -1).length,
        description: 'The mode does not support studies that ONLY include the following modalities: SM, ECG, SR, SEG'
      };
    },
    routes: [{
      path: 'basic-test',
      /*init: ({ servicesManager, extensionManager }) => {
        //defaultViewerRouteInit
      },*/
      layoutTemplate: () => {
        return {
          id: ohif.layout,
          props: {
            // Use the first two for an untracked view
            // leftPanels: [ohif.thumbnailList],
            // rightPanels: [dicomSeg.panel, ohif.measurements],
            leftPanels: [tracked.thumbnailList],
            rightPanels: [cornerstone.panel, tracked.measurements],
            // rightPanelClosed: true, // optional prop to start with collapse panels
            viewports: [{
              namespace: tracked.viewport,
              displaySetsToDisplay: [ohif.sopClassHandler, dicomvideo.sopClassHandler, ohif.wsiSopClassHandler]
            }, {
              namespace: dicomsr.viewport,
              displaySetsToDisplay: [dicomsr.sopClassHandler]
            }, {
              namespace: dicomvideo.viewport,
              displaySetsToDisplay: [dicomvideo.sopClassHandler]
            }, {
              namespace: dicompdf.viewport,
              displaySetsToDisplay: [dicompdf.sopClassHandler]
            }, {
              namespace: dicomSeg.viewport,
              displaySetsToDisplay: [dicomSeg.sopClassHandler]
            }, {
              namespace: dicomPmap.viewport,
              displaySetsToDisplay: [dicomPmap.sopClassHandler]
            }]
          }
        };
      }
    }],
    extensions: extensionDependencies,
    // Default protocol gets self-registered by default in the init
    hangingProtocol: 'default',
    // Order is important in sop class handlers when two handlers both use
    // the same sop class under different situations.  In that case, the more
    // general handler needs to come last.  For this case, the dicomvideo must
    // come first to remove video transfer syntax before ohif uses images
    sopClassHandlers: [dicomvideo.sopClassHandler, dicomSeg.sopClassHandler, ohif.wsiSopClassHandler, ohif.sopClassHandler, dicompdf.sopClassHandler, dicomsr.sopClassHandler],
    hotkeys: {
      // Don't store the hotkeys for basic-test-mode under the same key
      // because they get customized by tests
      name: 'basic-test-hotkeys',
      hotkeys: [...src/* hotkeys */.ot.defaults.hotkeyBindings]
    }
  };
}
const mode = {
  id: id,
  modeFactory,
  extensionDependencies
};
/* harmony default export */ const basic_test_mode_src = (mode);

/***/ })

}]);