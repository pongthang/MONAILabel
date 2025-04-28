"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[1520],{

/***/ 71520:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ContextMenuController: () => (/* reexport */ ContextMenuController),
  CustomizableContextMenuTypes: () => (/* reexport */ types_namespaceObject),
  PanelStudyBrowserHeader: () => (/* reexport */ PanelStudyBrowserHeader),
  StaticWadoClient: () => (/* reexport */ StaticWadoClient),
  callInputDialog: () => (/* reexport */ callInputDialog),
  callLabelAutocompleteDialog: () => (/* reexport */ callLabelAutocompleteDialog),
  cleanDenaturalizedDataset: () => (/* reexport */ cleanDenaturalizedDataset),
  colorPickerDialog: () => (/* reexport */ utils_colorPickerDialog),
  createReportAsync: () => (/* reexport */ Actions_createReportAsync),
  createReportDialogPrompt: () => (/* reexport */ CreateReportDialogPrompt),
  "default": () => (/* binding */ default_src),
  dicomWebUtils: () => (/* reexport */ utils_namespaceObject),
  getStudiesForPatientByMRN: () => (/* reexport */ Panels_getStudiesForPatientByMRN),
  promptLabelAnnotation: () => (/* reexport */ utils_promptLabelAnnotation),
  promptSaveReport: () => (/* reexport */ utils_promptSaveReport),
  showLabelAnnotationPopup: () => (/* reexport */ showLabelAnnotationPopup),
  useDisplaySetSelectorStore: () => (/* reexport */ useDisplaySetSelectorStore),
  useHangingProtocolStageIndexStore: () => (/* reexport */ useHangingProtocolStageIndexStore),
  usePatientInfo: () => (/* reexport */ hooks_usePatientInfo),
  useToggleHangingProtocolStore: () => (/* reexport */ useToggleHangingProtocolStore),
  useToggleOneUpViewportGridStore: () => (/* reexport */ useToggleOneUpViewportGridStore/* useToggleOneUpViewportGridStore */.Y),
  useUIStateStore: () => (/* reexport */ useUIStateStore),
  useViewportGridStore: () => (/* reexport */ useViewportGridStore),
  useViewportsByPositionStore: () => (/* reexport */ useViewportsByPositionStore),
  utils: () => (/* reexport */ src_utils_namespaceObject)
});

// NAMESPACE OBJECT: ../../../extensions/default/src/CustomizableContextMenu/types.ts
var types_namespaceObject = {};
__webpack_require__.r(types_namespaceObject);

// NAMESPACE OBJECT: ../../../extensions/default/src/DicomWebDataSource/utils/index.ts
var utils_namespaceObject = {};
__webpack_require__.r(utils_namespaceObject);
__webpack_require__.d(utils_namespaceObject, {
  cleanDenaturalizedDataset: () => (cleanDenaturalizedDataset),
  fixBulkDataURI: () => (fixBulkDataURI),
  fixMultiValueKeys: () => (fixMultiValueKeys),
  transferDenaturalizedDataset: () => (transferDenaturalizedDataset)
});

// NAMESPACE OBJECT: ../../../extensions/default/src/utils/index.ts
var src_utils_namespaceObject = {};
__webpack_require__.r(src_utils_namespaceObject);
__webpack_require__.d(src_utils_namespaceObject, {
  addIcon: () => (addIcon)
});

// EXTERNAL MODULE: ../../../node_modules/dicomweb-client/build/dicomweb-client.es.js
var dicomweb_client_es = __webpack_require__(83562);
// EXTERNAL MODULE: ../../core/src/index.ts + 71 modules
var src = __webpack_require__(29463);
// EXTERNAL MODULE: ../../core/src/utils/sortStudy.ts
var sortStudy = __webpack_require__(45476);
;// CONCATENATED MODULE: ../../../extensions/default/src/DicomWebDataSource/qido.js
/**
 * QIDO - Query based on ID for DICOM Objects
 * search for studies, series and instances by patient ID, and receive their
 * unique identifiers for further usage.
 *
 * Quick: https://www.dicomstandard.org/dicomweb/query-qido-rs/
 * Standard: http://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.6
 *
 * Routes:
 * ==========
 * /studies?
 * /studies/{studyInstanceUid}/series?
 * /studies/{studyInstanceUid}/series/{seriesInstanceUid}/instances?
 *
 * Query Parameters:
 * ================
 * | KEY              | VALUE              |
 * |------------------|--------------------|
 * | {attributeId}    | {value}            |
 * | includeField     | {attribute} or all |
 * | fuzzymatching    | true OR false      |
 * | limit            | {number}           |
 * | offset           | {number}           |
 */


const {
  getString,
  getName,
  getModalities
} = src/* DICOMWeb */.ll;

/**
 * Parses resulting data from a QIDO call into a set of Study MetaData
 *
 * @param {Array} qidoStudies - An array of study objects. Each object contains a keys for DICOM tags.
 * @param {object} qidoStudies[0].qidoStudy - An object where each key is the DICOM Tag group+element
 * @param {object} qidoStudies[0].qidoStudy[dicomTag] - Optional object that represents DICOM Tag
 * @param {string} qidoStudies[0].qidoStudy[dicomTag].vr - Value Representation
 * @param {string[]} qidoStudies[0].qidoStudy[dicomTag].Value - Optional string array representation of the DICOM Tag's value
 * @returns {Array} An array of Study MetaData objects
 */
function processResults(qidoStudies) {
  if (!qidoStudies || !qidoStudies.length) {
    return [];
  }
  const studies = [];
  qidoStudies.forEach(qidoStudy => studies.push({
    studyInstanceUid: getString(qidoStudy['0020000D']),
    date: getString(qidoStudy['00080020']),
    // YYYYMMDD
    time: getString(qidoStudy['00080030']),
    // HHmmss.SSS (24-hour, minutes, seconds, fractional seconds)
    accession: getString(qidoStudy['00080050']) || '',
    // short string, probably a number?
    mrn: getString(qidoStudy['00100020']) || '',
    // medicalRecordNumber
    patientName: src/* utils */.Wp.formatPN(getName(qidoStudy['00100010'])) || '',
    instances: Number(getString(qidoStudy['00201208'])) || 0,
    // number
    description: getString(qidoStudy['00081030']) || '',
    modalities: getString(getModalities(qidoStudy['00080060'], qidoStudy['00080061'])) || ''
  }));
  return studies;
}

/**
 * Parses resulting data from a QIDO call into a set of Study MetaData
 *
 * @param {Array} qidoSeries - An array of study objects. Each object contains a keys for DICOM tags.
 * @param {object} qidoSeries[0].qidoSeries - An object where each key is the DICOM Tag group+element
 * @param {object} qidoSeries[0].qidoSeries[dicomTag] - Optional object that represents DICOM Tag
 * @param {string} qidoSeries[0].qidoSeries[dicomTag].vr - Value Representation
 * @param {string[]} qidoSeries[0].qidoSeries[dicomTag].Value - Optional string array representation of the DICOM Tag's value
 * @returns {Array} An array of Study MetaData objects
 */
function processSeriesResults(qidoSeries) {
  const series = [];
  if (qidoSeries && qidoSeries.length) {
    qidoSeries.forEach(qidoSeries => series.push({
      studyInstanceUid: getString(qidoSeries['0020000D']),
      seriesInstanceUid: getString(qidoSeries['0020000E']),
      modality: getString(qidoSeries['00080060']),
      seriesNumber: getString(qidoSeries['00200011']),
      seriesDate: src/* utils */.Wp.formatDate(getString(qidoSeries['00080021'])),
      numSeriesInstances: Number(getString(qidoSeries['00201209'])),
      description: getString(qidoSeries['0008103E'])
    }));
  }
  (0,sortStudy/* sortStudySeries */.LM)(series);
  return series;
}

/**
 *
 * @param {object} dicomWebClient - Client similar to what's provided by `dicomweb-client` library
 * @param {function} dicomWebClient.searchForStudies -
 * @param {string} [studyInstanceUid]
 * @param {string} [seriesInstanceUid]
 * @param {string} [queryParamaters]
 * @returns {Promise<results>} - Promise that resolves results
 */
async function search(dicomWebClient, studyInstanceUid, seriesInstanceUid, queryParameters) {
  let searchResult = await dicomWebClient.searchForStudies({
    studyInstanceUid: undefined,
    queryParams: queryParameters
  });
  return searchResult;
}

/**
 *
 * @param {string} studyInstanceUID - ID of study to return a list of series for
 * @returns {Promise} - Resolves SeriesMetadata[] in study
 */
function seriesInStudy(dicomWebClient, studyInstanceUID) {
  // Series Description
  // Already included?
  const commaSeparatedFields = ['0008103E', '00080021'].join(',');
  const queryParams = {
    includefield: commaSeparatedFields
  };
  return dicomWebClient.searchForSeries({
    studyInstanceUID,
    queryParams
  });
}
function searchStudies(server, filter) {
  const queryParams = getQIDOQueryParams(filter, server.qidoSupportsIncludeField);
  const options = {
    queryParams
  };
  return dicomWeb.searchForStudies(options).then(resultDataToStudies);
}

/**
 * Produces a QIDO URL given server details and a set of specified search filter
 * items
 *
 * @param filter
 * @param serverSupportsQIDOIncludeField
 * @returns {string} The URL with encoded filter query data
 */
function mapParams(params, options = {}) {
  if (!params) {
    return;
  }
  const commaSeparatedFields = ['00081030',
  // Study Description
  '00080060' // Modality
  // Add more fields here if you want them in the result
  ].join(',');
  const useWildcard = params?.disableWildcard !== undefined ? !params.disableWildcard : options.supportsWildcard;
  const withWildcard = value => {
    return useWildcard && value ? `*${value}*` : value;
  };
  const parameters = {
    // Named
    PatientName: withWildcard(params.patientName),
    //PatientID: withWildcard(params.patientId),
    '00100020': withWildcard(params.patientId),
    // Temporarily to make the tests pass with dicomweb-server.. Apparently it's broken?
    AccessionNumber: withWildcard(params.accessionNumber),
    StudyDescription: withWildcard(params.studyDescription),
    ModalitiesInStudy: params.modalitiesInStudy,
    // Other
    limit: params.limit || 101,
    offset: params.offset || 0,
    fuzzymatching: options.supportsFuzzyMatching === true,
    includefield: commaSeparatedFields // serverSupportsQIDOIncludeField ? commaSeparatedFields : 'all',
  };

  // build the StudyDate range parameter
  if (params.startDate && params.endDate) {
    parameters.StudyDate = `${params.startDate}-${params.endDate}`;
  } else if (params.startDate) {
    const today = new Date();
    const DD = String(today.getDate()).padStart(2, '0');
    const MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const YYYY = today.getFullYear();
    const todayStr = `${YYYY}${MM}${DD}`;
    parameters.StudyDate = `${params.startDate}-${todayStr}`;
  } else if (params.endDate) {
    const oldDateStr = `19700102`;
    parameters.StudyDate = `${oldDateStr}-${params.endDate}`;
  }

  // Build the StudyInstanceUID parameter
  if (params.studyInstanceUid) {
    let studyUids = params.studyInstanceUid;
    studyUids = Array.isArray(studyUids) ? studyUids.join() : studyUids;
    studyUids = studyUids.replace(/[^0-9.]+/g, '\\');
    parameters.StudyInstanceUID = studyUids;
  }

  // Clean query params of undefined values.
  const final = {};
  Object.keys(parameters).forEach(key => {
    if (parameters[key] !== undefined && parameters[key] !== '') {
      final[key] = parameters[key];
    }
  });
  return final;
}

;// CONCATENATED MODULE: ../../../extensions/default/src/DicomWebDataSource/dcm4cheeReject.js
/* harmony default export */ function dcm4cheeReject(wadoRoot) {
  return {
    series: (StudyInstanceUID, SeriesInstanceUID) => {
      return new Promise((resolve, reject) => {
        // Reject because of Quality. (Seems the most sensible out of the options)
        const CodeValueAndCodeSchemeDesignator = `113001%5EDCM`;
        const url = `${wadoRoot}/studies/${StudyInstanceUID}/series/${SeriesInstanceUID}/reject/${CodeValueAndCodeSchemeDesignator}`;
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);

        //Send the proper header information along with the request
        // TODO -> Auth when we re-add authorization.

        console.log(xhr);
        xhr.onreadystatechange = function () {
          //Call a function when the state changes.
          if (xhr.readyState == 4) {
            switch (xhr.status) {
              case 204:
                resolve(xhr.responseText);
                break;
              case 404:
                reject('Your dataSource does not support reject functionality');
            }
          }
        };
        xhr.send();
      });
    }
  };
}
;// CONCATENATED MODULE: ../../../extensions/default/src/DicomWebDataSource/utils/getWADORSImageId.js
function buildInstanceWadoRsUri(instance, config) {
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID
  } = instance;
  return `${config.wadoRoot}/studies/${StudyInstanceUID}/series/${SeriesInstanceUID}/instances/${SOPInstanceUID}`;
}
function buildInstanceFrameWadoRsUri(instance, config, frame) {
  const baseWadoRsUri = buildInstanceWadoRsUri(instance, config);
  frame = frame || 1;
  return `${baseWadoRsUri}/frames/${frame}`;
}

// function getWADORSImageUrl(instance, frame) {
//   const wadorsuri = buildInstanceFrameWadoRsUri(instance, config, frame);

//   if (!wadorsuri) {
//     return;
//   }

//   // Use null to obtain an imageId which represents the instance
//   if (frame === null) {
//     wadorsuri = wadorsuri.replace(/frames\/(\d+)/, '');
//   } else {
//     // We need to sum 1 because WADO-RS frame number is 1-based
//     frame = frame ? parseInt(frame) + 1 : 1;

//     // Replaces /frame/1 by /frame/{frame}
//     wadorsuri = wadorsuri.replace(/frames\/(\d+)/, `frames/${frame}`);
//   }

//   return wadorsuri;
// }

/**
 * Obtain an imageId for Cornerstone based on the WADO-RS scheme
 *
 * @param {object} instanceMetada metadata object (InstanceMetadata)
 * @param {(string\|number)} [frame] the frame number
 * @returns {string} The imageId to be used by Cornerstone
 */
function getWADORSImageId(instance, config, frame) {
  //const uri = getWADORSImageUrl(instance, frame);
  const uri = buildInstanceFrameWadoRsUri(instance, config, frame);
  if (!uri) {
    return;
  }
  return `wadors:${uri}`;
}
;// CONCATENATED MODULE: ../../../extensions/default/src/DicomWebDataSource/utils/getImageId.js

function buildInstanceWadoUrl(config, instance) {
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID
  } = instance;
  const params = [];
  params.push('requestType=WADO');
  params.push(`studyUID=${StudyInstanceUID}`);
  params.push(`seriesUID=${SeriesInstanceUID}`);
  params.push(`objectUID=${SOPInstanceUID}`);
  params.push('contentType=application/dicom');
  params.push('transferSyntax=*');
  const paramString = params.join('&');
  return `${config.wadoUriRoot}?${paramString}`;
}

/**
 * Obtain an imageId for Cornerstone from an image instance
 *
 * @param instance
 * @param frame
 * @param thumbnail
 * @returns {string} The imageId to be used by Cornerstone
 */
function getImageId({
  instance,
  frame,
  config,
  thumbnail = false
}) {
  if (!instance) {
    return;
  }
  if (instance.imageId && frame === undefined) {
    return instance.imageId;
  }
  if (instance.url) {
    return instance.url;
  }
  const renderingAttr = thumbnail ? 'thumbnailRendering' : 'imageRendering';
  if (!config[renderingAttr] || config[renderingAttr] === 'wadouri') {
    const wadouri = buildInstanceWadoUrl(config, instance);
    let imageId = 'dicomweb:' + wadouri;
    if (frame !== undefined) {
      imageId += '&frame=' + frame;
    }
    return imageId;
  } else {
    return getWADORSImageId(instance, config, frame); // WADO-RS Retrieve Frame
  }
}
// EXTERNAL MODULE: ../../../node_modules/dcmjs/build/dcmjs.es.js
var dcmjs_es = __webpack_require__(5842);
;// CONCATENATED MODULE: ../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoader.js
/**
 * Class to define inheritance of load retrieve strategy.
 * The process can be async load (lazy) or sync load
 *
 * There are methods that must be implemented at consumer level
 * To retrieve study call execLoad
 */
class RetrieveMetadataLoader {
  /**
   * @constructor
   * @param {Object} client The dicomweb-client.
   * @param {Array} studyInstanceUID Study instance ui to be retrieved
   * @param {Object} [filters] - Object containing filters to be applied on retrieve metadata process
   * @param {string} [filters.seriesInstanceUID] - series instance uid to filter results against
   * @param {Object} [sortCriteria] - Custom sort criteria used for series
   * @param {Function} [sortFunction] - Custom sort function for series
   */
  constructor(client, studyInstanceUID, filters = {}, sortCriteria = undefined, sortFunction = undefined) {
    this.client = client;
    this.studyInstanceUID = studyInstanceUID;
    this.filters = filters;
    this.sortCriteria = sortCriteria;
    this.sortFunction = sortFunction;
  }
  async execLoad() {
    const preLoadData = await this.preLoad();
    const loadData = await this.load(preLoadData);
    const postLoadData = await this.posLoad(loadData);
    return postLoadData;
  }

  /**
   * It iterates over given loaders running each one. Loaders parameters must be bind when getting it.
   * @param {Array} loaders - array of loader to retrieve data.
   */
  async runLoaders(loaders) {
    let result;
    for (const loader of loaders) {
      result = await loader();
      if (result && result.length) {
        break; // closes iterator in case data is retrieved successfully
      }
    }
    if (loaders.next().done && !result) {
      throw new Error('RetrieveMetadataLoader failed');
    }
    return result;
  }

  // Methods to be overwrite
  async configLoad() {}
  async preLoad() {}
  async load(preLoadData) {}
  async posLoad(loadData) {}
}
;// CONCATENATED MODULE: ../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderSync.js
// import { api } from 'dicomweb-client';
// import DICOMWeb from '../../../DICOMWeb/';



/**
 * Class for sync load of study metadata.
 * It inherits from RetrieveMetadataLoader
 *
 * A list of loaders (getLoaders) can be created so, it will be applied a fallback load strategy.
 * I.e Retrieve metadata using all loaders possibilities.
 */
class RetrieveMetadataLoaderSync extends RetrieveMetadataLoader {
  getOptions() {
    const {
      studyInstanceUID,
      filters
    } = this;
    const options = {
      studyInstanceUID
    };
    const {
      seriesInstanceUID
    } = filters;
    if (seriesInstanceUID) {
      options['seriesInstanceUID'] = seriesInstanceUID;
    }
    return options;
  }

  /**
   * @returns {Array} Array of loaders. To be consumed as queue
   */
  *getLoaders() {
    const loaders = [];
    const {
      studyInstanceUID,
      filters: {
        seriesInstanceUID
      } = {},
      client
    } = this;
    if (seriesInstanceUID) {
      loaders.push(client.retrieveSeriesMetadata.bind(client, {
        studyInstanceUID,
        seriesInstanceUID
      }));
    }
    loaders.push(client.retrieveStudyMetadata.bind(client, {
      studyInstanceUID
    }));
    yield* loaders;
  }
  async load(preLoadData) {
    const loaders = this.getLoaders();
    const result = this.runLoaders(loaders);
    return result;
  }
  async posLoad(loadData) {
    return loadData;
  }
}
;// CONCATENATED MODULE: ../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadataLoaderAsync.js




// Series Date, Series Time, Series Description and Series Number to be included
// in the series metadata query result
const includeField = ['00080021', '00080031', '0008103E', '00200011'].join(',');
class DeferredPromise {
  constructor() {
    this.metadata = undefined;
    this.processFunction = undefined;
    this.internalPromise = undefined;
    this.thenFunction = undefined;
    this.rejectFunction = undefined;
  }
  setMetadata(metadata) {
    this.metadata = metadata;
  }
  setProcessFunction(func) {
    this.processFunction = func;
  }
  getPromise() {
    return this.start();
  }
  start() {
    if (this.internalPromise) {
      return this.internalPromise;
    }
    this.internalPromise = this.processFunction();
    // in case then and reject functions called before start
    if (this.thenFunction) {
      this.then(this.thenFunction);
      this.thenFunction = undefined;
    }
    if (this.rejectFunction) {
      this.reject(this.rejectFunction);
      this.rejectFunction = undefined;
    }
    return this.internalPromise;
  }
  then(func) {
    if (this.internalPromise) {
      return this.internalPromise.then(func);
    } else {
      this.thenFunction = func;
    }
  }
  reject(func) {
    if (this.internalPromise) {
      return this.internalPromise.reject(func);
    } else {
      this.rejectFunction = func;
    }
  }
}
/**
 * Creates an immutable series loader object which loads each series sequentially using the iterator interface.
 *
 * @param {DICOMWebClient} dicomWebClient The DICOMWebClient instance to be used for series load
 * @param {string} studyInstanceUID The Study Instance UID from which series will be loaded
 * @param {Array} seriesInstanceUIDList A list of Series Instance UIDs
 *
 * @returns {Object} Returns an object which supports loading of instances from each of given Series Instance UID
 */
function makeSeriesAsyncLoader(client, studyInstanceUID, seriesInstanceUIDList) {
  return Object.freeze({
    hasNext() {
      return seriesInstanceUIDList.length > 0;
    },
    next() {
      const {
        seriesInstanceUID,
        metadata
      } = seriesInstanceUIDList.shift();
      const promise = new DeferredPromise();
      promise.setMetadata(metadata);
      promise.setProcessFunction(() => {
        return client.retrieveSeriesMetadata({
          studyInstanceUID,
          seriesInstanceUID
        });
      });
      return promise;
    }
  });
}

/**
 * Class for async load of study metadata.
 * It inherits from RetrieveMetadataLoader
 *
 * It loads the one series and then append to seriesLoader the others to be consumed/loaded
 */
class RetrieveMetadataLoaderAsync extends RetrieveMetadataLoader {
  /**
   * @returns {Array} Array of preLoaders. To be consumed as queue
   */
  *getPreLoaders() {
    const preLoaders = [];
    const {
      studyInstanceUID,
      filters: {
        seriesInstanceUID
      } = {},
      client
    } = this;

    // asking to include Series Date, Series Time, Series Description
    // and Series Number in the series metadata returned to better sort series
    // in preLoad function
    let options = {
      studyInstanceUID,
      queryParams: {
        includefield: includeField
      }
    };
    if (seriesInstanceUID) {
      options.queryParams.SeriesInstanceUID = seriesInstanceUID;
      preLoaders.push(client.searchForSeries.bind(client, options));
    }
    // Fallback preloader
    preLoaders.push(client.searchForSeries.bind(client, options));
    yield* preLoaders;
  }
  async preLoad() {
    const preLoaders = this.getPreLoaders();
    const result = await this.runLoaders(preLoaders);
    const sortCriteria = this.sortCriteria;
    const sortFunction = this.sortFunction;
    const {
      naturalizeDataset
    } = dcmjs_es/* default.data */.Ay.data.DicomMetaDictionary;
    const naturalized = result.map(naturalizeDataset);
    return (0,sortStudy/* sortStudySeries */.LM)(naturalized, sortCriteria, sortFunction);
  }
  async load(preLoadData) {
    const {
      client,
      studyInstanceUID
    } = this;
    const seriesInstanceUIDs = preLoadData.map(seriesMetadata => {
      return {
        seriesInstanceUID: seriesMetadata.SeriesInstanceUID,
        metadata: seriesMetadata
      };
    });
    const seriesAsyncLoader = makeSeriesAsyncLoader(client, studyInstanceUID, seriesInstanceUIDs);
    const promises = [];
    while (seriesAsyncLoader.hasNext()) {
      const promise = seriesAsyncLoader.next();
      promises.push(promise);
    }
    return {
      preLoadData,
      promises
    };
  }
  async posLoad({
    preLoadData,
    promises
  }) {
    return {
      preLoadData,
      promises
    };
  }
}
;// CONCATENATED MODULE: ../../../extensions/default/src/DicomWebDataSource/wado/retrieveMetadata.js



/**
 * Retrieve Study metadata from a DICOM server. If the server is configured to use lazy load, only the first series
 * will be loaded and the property "studyLoader" will be set to let consumer load remaining series as needed.
 *
 * @param {*} dicomWebClient The DICOMWebClient instance to be used for series load
 * @param {*} StudyInstanceUID The UID of the Study to be retrieved
 * @param {*} enableStudyLazyLoad Whether the study metadata should be loaded asynchronously
 * @param {object} filters Object containing filters to be applied on retrieve metadata process
 * @param {string} [filters.seriesInstanceUID] Series instance uid to filter results against
 * @param {function} [sortCriteria] Sort criteria function
 * @param {function} [sortFunction] Sort function
 *
 * @returns {Promise} A promises that resolves the study descriptor object
 */
async function RetrieveMetadata(dicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters = {}, sortCriteria, sortFunction) {
  const RetrieveMetadataLoader = enableStudyLazyLoad !== false ? RetrieveMetadataLoaderAsync : RetrieveMetadataLoaderSync;
  const retrieveMetadataLoader = new RetrieveMetadataLoader(dicomWebClient, StudyInstanceUID, filters, sortCriteria, sortFunction);
  const data = await retrieveMetadataLoader.execLoad();
  return data;
}
/* harmony default export */ const retrieveMetadata = (RetrieveMetadata);
;// CONCATENATED MODULE: ../../../extensions/default/src/DicomWebDataSource/utils/retrieveMetadataFiltered.js


/**
 * Retrieve metadata filtered.
 *
 * @param {*} dicomWebClient The DICOMWebClient instance to be used for series load
 * @param {*} StudyInstanceUID The UID of the Study to be retrieved
 * @param {*} enableStudyLazyLoad Whether the study metadata should be loaded asynchronously
 * @param {object} filters Object containing filters to be applied on retrieve metadata process
 * @param {string} [filters.seriesInstanceUID] Series instance uid to filter results against
 * @param {function} [sortCriteria] Sort criteria function
 * @param {function} [sortFunction] Sort function
 *
 * @returns
 */
function retrieveMetadataFiltered(dicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction) {
  const {
    seriesInstanceUID
  } = filters;
  return new Promise((resolve, reject) => {
    const promises = seriesInstanceUID.map(uid => {
      const seriesSpecificFilters = Object.assign({}, filters, {
        seriesInstanceUID: uid
      });
      return retrieveMetadata(dicomWebClient, StudyInstanceUID, enableStudyLazyLoad, seriesSpecificFilters, sortCriteria, sortFunction);
    });
    if (enableStudyLazyLoad === true) {
      Promise.all(promises).then(results => {
        const aggregatedResult = {
          preLoadData: [],
          promises: []
        };
        results.forEach(({
          preLoadData,
          promises
        }) => {
          aggregatedResult.preLoadData = aggregatedResult.preLoadData.concat(preLoadData);
          aggregatedResult.promises = aggregatedResult.promises.concat(promises);
        });
        resolve(aggregatedResult);
      }, reject);
    } else {
      Promise.all(promises).then(results => {
        resolve(results.flat());
      }, reject);
    }
  });
}
/* harmony default export */ const utils_retrieveMetadataFiltered = (retrieveMetadataFiltered);
;// CONCATENATED MODULE: ../../../extensions/default/src/DicomWebDataSource/retrieveStudyMetadata.js


const moduleName = 'RetrieveStudyMetadata';
// Cache for promises. Prevents unnecessary subsequent calls to the server
const StudyMetaDataPromises = new Map();

/**
 * Retrieves study metadata.
 *
 * @param {Object} dicomWebClient The DICOMWebClient instance to be used for series load
 * @param {string} StudyInstanceUID The UID of the Study to be retrieved
 * @param {boolean} enableStudyLazyLoad Whether the study metadata should be loaded asynchronously.
 * @param {Object} [filters] Object containing filters to be applied on retrieve metadata process
 * @param {string} [filters.seriesInstanceUID] Series instance uid to filter results against
 * @param {function} [sortCriteria] Sort criteria function
 * @param {function} [sortFunction] Sort function
 *
 * @returns {Promise} that will be resolved with the metadata or rejected with the error
 */
function retrieveStudyMetadata(dicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction, dicomWebConfig = {}) {
  // @TODO: Whenever a study metadata request has failed, its related promise will be rejected once and for all
  // and further requests for that metadata will always fail. On failure, we probably need to remove the
  // corresponding promise from the "StudyMetaDataPromises" map...

  if (!dicomWebClient) {
    throw new Error(`${moduleName}: Required 'dicomWebClient' parameter not provided.`);
  }
  if (!StudyInstanceUID) {
    throw new Error(`${moduleName}: Required 'StudyInstanceUID' parameter not provided.`);
  }
  const promiseId = `${dicomWebConfig.name}:${StudyInstanceUID}`;

  // Already waiting on result? Return cached promise
  if (StudyMetaDataPromises.has(promiseId)) {
    return StudyMetaDataPromises.get(promiseId);
  }
  let promise;
  if (filters && filters.seriesInstanceUID && Array.isArray(filters.seriesInstanceUID)) {
    promise = utils_retrieveMetadataFiltered(dicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction);
  } else {
    // Create a promise to handle the data retrieval
    promise = new Promise((resolve, reject) => {
      retrieveMetadata(dicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction).then(function (data) {
        resolve(data);
      }, reject);
    });
  }

  // Store the promise in cache
  StudyMetaDataPromises.set(promiseId, promise);
  return promise;
}

/**
 * Delete the cached study metadata retrieval promise to ensure that the browser will
 * re-retrieve the study metadata when it is next requested.
 *
 * @param {String} StudyInstanceUID The UID of the Study to be removed from cache
 */
function deleteStudyMetadataPromise(StudyInstanceUID) {
  if (StudyMetaDataPromises.has(StudyInstanceUID)) {
    StudyMetaDataPromises.delete(StudyInstanceUID);
  }
}
;// CONCATENATED MODULE: ../../../extensions/default/src/DicomWebDataSource/utils/findIndexOfString.ts
function checkToken(token, data, dataOffset) {
  if (dataOffset + token.length > data.length) {
    return false;
  }
  let endIndex = dataOffset;
  for (let i = 0; i < token.length; i++) {
    if (token[i] !== data[endIndex++]) {
      return false;
    }
  }
  return true;
}
function stringToUint8Array(str) {
  const uint = new Uint8Array(str.length);
  for (let i = 0, j = str.length; i < j; i++) {
    uint[i] = str.charCodeAt(i);
  }
  return uint;
}
function findIndexOfString(data, str, offset) {
  offset = offset || 0;
  const token = stringToUint8Array(str);
  for (let i = offset; i < data.length; i++) {
    if (token[0] === data[i]) {
      // console.log('match @', i);
      if (checkToken(token, data, i)) {
        return i;
      }
    }
  }
  return -1;
}
/* harmony default export */ const utils_findIndexOfString = (findIndexOfString);
;// CONCATENATED MODULE: ../../../extensions/default/src/DicomWebDataSource/utils/fixMultipart.ts


/**
 * Fix multipart data coming back from the retrieve bulkdata request, but
 * incorrectly tagged as application/octet-stream.  Some servers don't handle
 * the response type correctly, and this method is relatively robust about
 * detecting multipart data correctly.  It will only extract one value.
 */
function fixMultipart(arrayData) {
  const data = new Uint8Array(arrayData[0]);
  // Don't know the exact minimum length, but it is at least 25 to encode multipart
  if (data.length < 25) {
    return arrayData;
  }
  const dashIndex = utils_findIndexOfString(data, '--');
  if (dashIndex > 6) {
    return arrayData;
  }
  const tokenIndex = utils_findIndexOfString(data, '\r\n\r\n', dashIndex);
  if (tokenIndex > 512) {
    // Allow for 512 characters in the header - there is no apriori limit, but
    // this seems ok for now as we only expect it to have content type in it.
    return arrayData;
  }
  const header = uint8ArrayToString(data, 0, tokenIndex);
  // Now find the boundary  marker
  const responseHeaders = header.split('\r\n');
  const boundary = findBoundary(responseHeaders);
  if (!boundary) {
    return arrayData;
  }
  // Start of actual data is 4 characters after the token
  const offset = tokenIndex + 4;
  const endIndex = utils_findIndexOfString(data, boundary, offset);
  if (endIndex === -1) {
    return arrayData;
  }
  return [data.slice(offset, endIndex - 2).buffer];
}
function findBoundary(header) {
  for (let i = 0; i < header.length; i++) {
    if (header[i].substr(0, 2) === '--') {
      return header[i];
    }
  }
}
function findContentType(header) {
  for (let i = 0; i < header.length; i++) {
    if (header[i].substr(0, 13) === 'Content-Type:') {
      return header[i].substr(13).trim();
    }
  }
}
function uint8ArrayToString(data, offset, length) {
  offset = offset || 0;
  length = length || data.length - offset;
  let str = '';
  for (let i = offset; i < offset + length; i++) {
    str += String.fromCharCode(data[i]);
  }
  return str;
}
;// CONCATENATED MODULE: ../../../extensions/default/src/DicomWebDataSource/utils/StaticWadoClient.ts


const {
  DICOMwebClient
} = dicomweb_client_es/* api */.FH;
const anyDicomwebClient = DICOMwebClient;

// Ugly over-ride, but the internals aren't otherwise accessible.
if (!anyDicomwebClient._orig_buildMultipartAcceptHeaderFieldValue) {
  anyDicomwebClient._orig_buildMultipartAcceptHeaderFieldValue = anyDicomwebClient._buildMultipartAcceptHeaderFieldValue;
  anyDicomwebClient._buildMultipartAcceptHeaderFieldValue = function (mediaTypes, acceptableTypes) {
    if (mediaTypes.length === 1 && mediaTypes[0].mediaType.endsWith('/*')) {
      return '*/*';
    } else {
      return anyDicomwebClient._orig_buildMultipartAcceptHeaderFieldValue(mediaTypes, acceptableTypes);
    }
  };
}

/**
 * An implementation of the static wado client, that fetches data from
 * a static response rather than actually doing real queries.  This allows
 * fast encoding of test data, but because it is static, anything actually
 * performing searches doesn't work.  This version fixes the query issue
 * by manually implementing a query option.
 */

class StaticWadoClient extends dicomweb_client_es/* api */.FH.DICOMwebClient {
  constructor(config) {
    super(config);
    this.config = void 0;
    this.staticWado = void 0;
    this.staticWado = config.staticWado;
    this.config = config;
  }

  /**
   * Handle improperly specified multipart/related return type.
   * Note if the response is SUPPOSED to be multipart encoded already, then this
   * will double-decode it.
   *
   * @param options
   * @returns De-multiparted response data.
   *
   */
  retrieveBulkData(options) {
    const shouldFixMultipart = this.config.fixBulkdataMultipart !== false;
    const useOptions = {
      ...options
    };
    if (this.staticWado) {
      useOptions.mediaTypes = [{
        mediaType: 'application/*'
      }];
    }
    return super.retrieveBulkData(useOptions).then(result => shouldFixMultipart ? fixMultipart(result) : result);
  }

  /**
   * Retrieves instance frames using the image/* media type when configured
   * to do so (static wado back end).
   */
  retrieveInstanceFrames(options) {
    if (this.staticWado) {
      return super.retrieveInstanceFrames({
        ...options,
        mediaTypes: [{
          mediaType: 'image/*'
        }]
      });
    } else {
      return super.retrieveInstanceFrames(options);
    }
  }

  /**
   * Replace the search for studies remote query with a local version which
   * retrieves a complete query list and then sub-selects from it locally.
   * @param {*} options
   * @returns
   */
  async searchForStudies(options) {
    if (!this.staticWado) {
      return super.searchForStudies(options);
    }
    const searchResult = await super.searchForStudies(options);
    const {
      queryParams
    } = options;
    if (!queryParams) {
      return searchResult;
    }
    const lowerParams = this.toLowerParams(queryParams);
    const filtered = searchResult.filter(study => {
      for (const key of Object.keys(StaticWadoClient.studyFilterKeys)) {
        if (!this.filterItem(key, lowerParams, study, StaticWadoClient.studyFilterKeys)) {
          return false;
        }
      }
      return true;
    });
    return filtered;
  }
  async searchForSeries(options) {
    if (!this.staticWado) {
      return super.searchForSeries(options);
    }
    const searchResult = await super.searchForSeries(options);
    const {
      queryParams
    } = options;
    if (!queryParams) {
      return searchResult;
    }
    const lowerParams = this.toLowerParams(queryParams);
    const filtered = searchResult.filter(series => {
      for (const key of Object.keys(StaticWadoClient.seriesFilterKeys)) {
        if (!this.filterItem(key, lowerParams, series, StaticWadoClient.seriesFilterKeys)) {
          return false;
        }
      }
      return true;
    });
    return filtered;
  }

  /**
   * Compares values, matching any instance of desired to any instance of
   * actual by recursively go through the paired set of values.  That is,
   * this is O(m*n) where m is how many items in desired and n is the length of actual
   * Then, at the individual item node, compares the Alphabetic name if present,
   * and does a sub-string matching on string values, and otherwise does an
   * exact match comparison.
   *
   * @param {*} desired
   * @param {*} actual
   * @returns true if the values match
   */
  compareValues(desired, actual) {
    if (Array.isArray(desired)) {
      return desired.find(item => this.compareValues(item, actual));
    }
    if (Array.isArray(actual)) {
      return actual.find(actualItem => this.compareValues(desired, actualItem));
    }
    if (actual?.Alphabetic) {
      actual = actual.Alphabetic;
    }
    if (typeof actual == 'string') {
      if (actual.length === 0) {
        return true;
      }
      if (desired.length === 0 || desired === '*') {
        return true;
      }
      if (desired[0] === '*' && desired[desired.length - 1] === '*') {
        // console.log(`Comparing ${actual} to ${desired.substring(1, desired.length - 1)}`)
        return actual.indexOf(desired.substring(1, desired.length - 1)) != -1;
      } else if (desired[desired.length - 1] === '*') {
        return actual.indexOf(desired.substring(0, desired.length - 1)) != -1;
      } else if (desired[0] === '*') {
        return actual.indexOf(desired.substring(1)) === actual.length - desired.length + 1;
      }
    }
    return desired === actual;
  }

  /** Compares a pair of dates to see if the value is within the range */
  compareDateRange(range, value) {
    if (!value) {
      return true;
    }
    const dash = range.indexOf('-');
    if (dash === -1) {
      return this.compareValues(range, value);
    }
    const start = range.substring(0, dash);
    const end = range.substring(dash + 1);
    return (!start || value >= start) && (!end || value <= end);
  }

  /**
   * Filters the return list by the query parameters.
   *
   * @param anyCaseKey - a possible search key
   * @param queryParams -
   * @param {*} study
   * @param {*} sourceFilterMap
   * @returns
   */
  filterItem(key, queryParams, study, sourceFilterMap) {
    const altKey = sourceFilterMap[key] || key;
    if (!queryParams) {
      return true;
    }
    const testValue = queryParams[key] || queryParams[altKey];
    if (!testValue) {
      return true;
    }
    const valueElem = study[key] || study[altKey];
    if (!valueElem) {
      return false;
    }
    if (valueElem.vr === 'DA' && valueElem.Value?.[0]) {
      return this.compareDateRange(testValue, valueElem.Value[0]);
    }
    const value = valueElem.Value;
    return this.compareValues(testValue, value);
  }

  /** Converts the query parameters to lower case query parameters */
  toLowerParams(queryParams) {
    const lowerParams = {};
    Object.entries(queryParams).forEach(([key, value]) => {
      lowerParams[key.toLowerCase()] = value;
    });
    return lowerParams;
  }
}
StaticWadoClient.studyFilterKeys = {
  studyinstanceuid: '0020000D',
  patientname: '00100010',
  '00100020': 'mrn',
  studydescription: '00081030',
  studydate: '00080020',
  modalitiesinstudy: '00080061',
  accessionnumber: '00080050'
};
StaticWadoClient.seriesFilterKeys = {
  seriesinstanceuid: '0020000E',
  seriesnumber: '00200011',
  modality: '00080060'
};
;// CONCATENATED MODULE: ../../../extensions/default/src/utils/getBulkdataValue.js
/**
 * Generates a URL that can be used for direct retrieve of the bulkdata.
 *
 * @param {object} config - The configuration object.
 * @param {object} params - The parameters object.
 * @param {string} params.tag - The tag name of the URL to retrieve.
 * @param {string} params.defaultPath - The path for the pixel data URL.
 * @param {object} params.instance - The instance object that the tag is in.
 * @param {string} params.defaultType - The mime type of the response.
 * @param {string} params.singlepart - The type of the part to retrieve.
 * @param {string} params.fetchPart - Unknown.
 * @returns {string|Promise<string>} - An absolute URL to the resource, if the absolute URL can be retrieved as singlepart,
 *    or is already retrieved, or a promise to a URL for such use if a BulkDataURI.
 */
const getBulkdataValue = (config, params) => {
  const {
    instance,
    tag = 'PixelData',
    defaultPath = '/pixeldata',
    defaultType = 'video/mp4'
  } = params;
  const value = instance[tag];
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID
  } = instance;
  const BulkDataURI = value && value.BulkDataURI || `series/${SeriesInstanceUID}/instances/${SOPInstanceUID}${defaultPath}`;
  const hasQuery = BulkDataURI.indexOf('?') !== -1;
  const hasAccept = BulkDataURI.indexOf('accept=') !== -1;
  const acceptUri = BulkDataURI + (hasAccept ? '' : (hasQuery ? '&' : '?') + `accept=${defaultType}`);
  if (acceptUri.startsWith('series/')) {
    const {
      wadoRoot
    } = config;
    return `${wadoRoot}/studies/${StudyInstanceUID}/${acceptUri}`;
  }

  // The DICOMweb standard states that the default is multipart related, and then
  // separately states that the accept parameter is the URL parameter equivalent of the accept header.
  return acceptUri;
};
/* harmony default export */ const utils_getBulkdataValue = (getBulkdataValue);
;// CONCATENATED MODULE: ../../../extensions/default/src/utils/createRenderedRetrieve.js
/**
 * Generates the rendered URL that can be used for direct retrieve of the pixel data binary stream.
 *
 * @param {object} config - The configuration object.
 * @param {string} config.wadoRoot - The root URL for the WADO service.
 * @param {object} params - The parameters object.
 * @param {string} params.tag - The tag name of the URL to retrieve.
 * @param {string} params.defaultPath - The path for the pixel data URL.
 * @param {object} params.instance - The instance object that the tag is in.
 * @param {string} params.defaultType - The mime type of the response.
 * @param {string} params.singlepart - The type of the part to retrieve.
 * @param {string} params.fetchPart - Unknown parameter.
 * @param {string} params.url - Unknown parameter.
 * @returns {string|Promise<string>} - An absolute URL to the binary stream.
 */
const createRenderedRetrieve = (config, params) => {
  const {
    wadoRoot
  } = config;
  const {
    instance,
    tag = 'PixelData'
  } = params;
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID
  } = instance;
  const bulkDataURI = instance[tag]?.BulkDataURI ?? '';
  if (bulkDataURI?.indexOf('?') !== -1) {
    // The value instance has parameters, so it should not revert to the rendered
    return;
  }
  if (tag === 'PixelData' || tag === 'EncapsulatedDocument') {
    return `${wadoRoot}/studies/${StudyInstanceUID}/series/${SeriesInstanceUID}/instances/${SOPInstanceUID}/rendered`;
  }
};
/* harmony default export */ const utils_createRenderedRetrieve = (createRenderedRetrieve);
;// CONCATENATED MODULE: ../../../extensions/default/src/utils/getDirectURL.ts




/**
 * Generates a URL that can be used for direct retrieve of the bulkdata
 *
 * @param {object} params
 * @param {string} params.tag is the tag name of the URL to retrieve
 * @param {string} params.defaultPath path for the pixel data url
 * @param {object} params.instance is the instance object that the tag is in
 * @param {string} params.defaultType is the mime type of the response
 * @param {string} params.singlepart is the type of the part to retrieve
 * @param {string} params.fetchPart unknown?
 * @param {string} params.url unknown?
 * @returns an absolute URL to the resource, if the absolute URL can be retrieved as singlepart,
 *    or is already retrieved, or a promise to a URL for such use if a BulkDataURI
 */
const getDirectURL = (config, params) => {
  const {
    singlepart
  } = config;
  const {
    instance,
    tag = 'PixelData',
    defaultType = 'video/mp4',
    singlepart: fetchPart = 'video',
    url = null
  } = params;
  if (url) {
    return url;
  }
  const value = instance[tag];
  if (value) {
    if (value.DirectRetrieveURL) {
      return value.DirectRetrieveURL;
    }
    if (value.InlineBinary) {
      const blob = src/* utils */.Wp.b64toBlob(value.InlineBinary, defaultType);
      value.DirectRetrieveURL = URL.createObjectURL(blob);
      return value.DirectRetrieveURL;
    }
    if (!singlepart || singlepart !== true && singlepart.indexOf(fetchPart) === -1) {
      if (value.retrieveBulkData) {
        // Try the specified retrieve type.
        const options = {
          mediaType: defaultType
        };
        return value.retrieveBulkData(options).then(arr => {
          value.DirectRetrieveURL = URL.createObjectURL(new Blob([arr], {
            type: defaultType
          }));
          return value.DirectRetrieveURL;
        });
      }
      console.warn('Unable to retrieve', tag, 'from', instance);
      return undefined;
    }
  }
  return utils_createRenderedRetrieve(config, params) || utils_getBulkdataValue(config, params);
};
/* harmony default export */ const utils_getDirectURL = (getDirectURL);
;// CONCATENATED MODULE: ../../../extensions/default/src/DicomWebDataSource/utils/fixBulkDataURI.ts
/**
 * Modifies a bulkDataURI to ensure it is absolute based on the DICOMWeb configuration and
 * instance data. The modification is in-place.
 *
 * If the bulkDataURI is relative to the series or study (according to the DICOM standard),
 * it is made absolute by prepending the relevant paths.
 *
 * In scenarios where the bulkDataURI is a server-relative path (starting with '/'), the function
 * handles two cases:
 *
 * 1. If the wado root is absolute (starts with 'http'), it prepends the wado root to the bulkDataURI.
 * 2. If the wado root is relative, no changes are needed as the bulkDataURI is already correctly relative to the server root.
 *
 * @param value - The object containing BulkDataURI to be fixed.
 * @param instance - The object (DICOM instance data) containing StudyInstanceUID and SeriesInstanceUID.
 * @param dicomWebConfig - The DICOMWeb configuration object, containing wadoRoot and potentially bulkDataURI.relativeResolution.
 * @returns The function modifies `value` in-place, it does not return a value.
 */
function fixBulkDataURI(value, instance, dicomWebConfig) {
  // in case of the relative path, make it absolute. The current DICOM standard says
  // the bulkdataURI is relative to the series. However, there are situations where
  // it can be relative to the study too
  let {
    BulkDataURI
  } = value;
  const {
    bulkDataURI: uriConfig = {}
  } = dicomWebConfig;
  BulkDataURI = uriConfig.transform?.(BulkDataURI) || BulkDataURI;

  // Handle incorrectly prefixed origins
  const {
    startsWith,
    prefixWith = ''
  } = uriConfig;
  if (startsWith && BulkDataURI.startsWith(startsWith)) {
    BulkDataURI = prefixWith + BulkDataURI.substring(startsWith.length);
    value.BulkDataURI = BulkDataURI;
  }
  if (!BulkDataURI.startsWith('http') && !value.BulkDataURI.startsWith('/')) {
    const {
      StudyInstanceUID,
      SeriesInstanceUID
    } = instance;
    const isInstanceStart = BulkDataURI.startsWith('instances/') || BulkDataURI.startsWith('../');
    if (BulkDataURI.startsWith('series/') || BulkDataURI.startsWith('bulkdata/') || uriConfig.relativeResolution === 'studies' && !isInstanceStart) {
      value.BulkDataURI = `${dicomWebConfig.wadoRoot}/studies/${StudyInstanceUID}/${BulkDataURI}`;
    } else if (isInstanceStart || uriConfig.relativeResolution === 'series' || !uriConfig.relativeResolution) {
      value.BulkDataURI = `${dicomWebConfig.wadoRoot}/studies/${StudyInstanceUID}/series/${SeriesInstanceUID}/${BulkDataURI}`;
    }
    return;
  }

  // in case it is relative path but starts at the server (e.g., /bulk/1e, note the missing http
  // in the beginning and the first character is /) There are two scenarios, whether the wado root
  // is absolute or relative. In case of absolute, we need to prepend the wado root to the bulkdata
  // uri (e.g., bulkData: /bulk/1e, wado root: http://myserver.com/dicomweb, output: http://myserver.com/bulk/1e)
  // and in case of relative wado root, we need to prepend the bulkdata uri to the wado root (e.g,. bulkData: /bulk/1e
  // wado root: /dicomweb, output: /bulk/1e)
  if (BulkDataURI[0] === '/') {
    if (dicomWebConfig.wadoRoot.startsWith('http')) {
      // Absolute wado root
      const url = new URL(dicomWebConfig.wadoRoot);
      value.BulkDataURI = `${url.origin}${BulkDataURI}`;
    } else {
      // Relative wado root, we don't need to do anything, bulkdata uri is already correct
    }
  }
}

;// CONCATENATED MODULE: ../../../extensions/default/src/DicomWebDataSource/index.js










const {
  DicomMetaDictionary,
  DicomDict
} = dcmjs_es/* default.data */.Ay.data;
const {
  naturalizeDataset,
  denaturalizeDataset
} = DicomMetaDictionary;
const ImplementationClassUID = '2.25.270695996825855179949881587723571202391.2.0.0';
const ImplementationVersionName = 'OHIF-VIEWER-2.0.0';
const EXPLICIT_VR_LITTLE_ENDIAN = '1.2.840.10008.1.2.1';
const metadataProvider = src/* classes */.Ly.MetadataProvider;

/**
 * Creates a DICOM Web API based on the provided configuration.
 *
 * @param {object} dicomWebConfig - Configuration for the DICOM Web API
 * @param {string} dicomWebConfig.name - Data source name
 * @param {string} dicomWebConfig.wadoUriRoot - Legacy? (potentially unused/replaced)
 * @param {string} dicomWebConfig.qidoRoot - Base URL to use for QIDO requests
 * @param {string} dicomWebConfig.wadoRoot - Base URL to use for WADO requests
 * @param {string} dicomWebConfig.wadoUri - Base URL to use for WADO URI requests
 * @param {boolean} dicomWebConfig.qidoSupportsIncludeField - Whether QIDO supports the "Include" option to request additional fields in response
 * @param {string} dicomWebConfig.imageRendering - wadors | ? (unsure of where/how this is used)
 * @param {string} dicomWebConfig.thumbnailRendering - wadors | ? (unsure of where/how this is used)
 * @param {boolean} dicomWebConfig.supportsReject - Whether the server supports reject calls (i.e. DCM4CHEE)
 * @param {boolean} dicomWebConfig.lazyLoadStudy - "enableStudyLazyLoad"; Request series meta async instead of blocking
 * @param {string|boolean} dicomWebConfig.singlepart - indicates if the retrieves can fetch singlepart. Options are bulkdata, video, image, or boolean true
 * @param {string} dicomWebConfig.requestTransferSyntaxUID - Transfer syntax to request from the server
 * @param {object} dicomWebConfig.acceptHeader - Accept header to use for requests
 * @param {boolean} dicomWebConfig.omitQuotationForMultipartRequest - Whether to omit quotation marks for multipart requests
 * @param {boolean} dicomWebConfig.supportsFuzzyMatching - Whether the server supports fuzzy matching
 * @param {boolean} dicomWebConfig.supportsWildcard - Whether the server supports wildcard matching
 * @param {boolean} dicomWebConfig.supportsNativeDICOMModel - Whether the server supports the native DICOM model
 * @param {boolean} dicomWebConfig.enableStudyLazyLoad - Whether to enable study lazy loading
 * @param {boolean} dicomWebConfig.enableRequestTag - Whether to enable request tag
 * @param {boolean} dicomWebConfig.enableStudyLazyLoad - Whether to enable study lazy loading
 * @param {boolean} dicomWebConfig.bulkDataURI - Whether to enable bulkDataURI
 * @param {function} dicomWebConfig.onConfiguration - Function that is called after the configuration is initialized
 * @param {boolean} dicomWebConfig.staticWado - Whether to use the static WADO client
 * @param {object} userAuthenticationService - User authentication service
 * @param {object} userAuthenticationService.getAuthorizationHeader - Function that returns the authorization header
 * @returns {object} - DICOM Web API object
 */
function createDicomWebApi(dicomWebConfig, servicesManager) {
  const {
    userAuthenticationService,
    customizationService
  } = servicesManager.services;
  let dicomWebConfigCopy, qidoConfig, wadoConfig, qidoDicomWebClient, wadoDicomWebClient, getAuthrorizationHeader, generateWadoHeader;
  const implementation = {
    initialize: ({
      params,
      query
    }) => {
      if (dicomWebConfig.onConfiguration && typeof dicomWebConfig.onConfiguration === 'function') {
        dicomWebConfig = dicomWebConfig.onConfiguration(dicomWebConfig, {
          params,
          query
        });
      }
      dicomWebConfigCopy = JSON.parse(JSON.stringify(dicomWebConfig));
      getAuthrorizationHeader = () => {
        const xhrRequestHeaders = {};
        const authHeaders = userAuthenticationService.getAuthorizationHeader();
        if (authHeaders && authHeaders.Authorization) {
          xhrRequestHeaders.Authorization = authHeaders.Authorization;
        }
        return xhrRequestHeaders;
      };
      generateWadoHeader = () => {
        const authorizationHeader = getAuthrorizationHeader();
        //Generate accept header depending on config params
        const formattedAcceptHeader = src/* utils */.Wp.generateAcceptHeader(dicomWebConfig.acceptHeader, dicomWebConfig.requestTransferSyntaxUID, dicomWebConfig.omitQuotationForMultipartRequest);
        return {
          ...authorizationHeader,
          Accept: formattedAcceptHeader
        };
      };
      qidoConfig = {
        url: dicomWebConfig.qidoRoot,
        staticWado: dicomWebConfig.staticWado,
        singlepart: dicomWebConfig.singlepart,
        headers: userAuthenticationService.getAuthorizationHeader(),
        errorInterceptor: src/* errorHandler */.r_.getHTTPErrorHandler()
      };
      wadoConfig = {
        url: dicomWebConfig.wadoRoot,
        staticWado: dicomWebConfig.staticWado,
        singlepart: dicomWebConfig.singlepart,
        headers: userAuthenticationService.getAuthorizationHeader(),
        errorInterceptor: src/* errorHandler */.r_.getHTTPErrorHandler()
      };

      // TODO -> Two clients sucks, but its better than 1000.
      // TODO -> We'll need to merge auth later.
      qidoDicomWebClient = dicomWebConfig.staticWado ? new StaticWadoClient(qidoConfig) : new dicomweb_client_es/* api */.FH.DICOMwebClient(qidoConfig);
      wadoDicomWebClient = dicomWebConfig.staticWado ? new StaticWadoClient(wadoConfig) : new dicomweb_client_es/* api */.FH.DICOMwebClient(wadoConfig);
    },
    query: {
      studies: {
        mapParams: mapParams.bind(),
        search: async function (origParams) {
          qidoDicomWebClient.headers = getAuthrorizationHeader();
          const {
            studyInstanceUid,
            seriesInstanceUid,
            ...mappedParams
          } = mapParams(origParams, {
            supportsFuzzyMatching: dicomWebConfig.supportsFuzzyMatching,
            supportsWildcard: dicomWebConfig.supportsWildcard
          }) || {};
          const results = await search(qidoDicomWebClient, undefined, undefined, mappedParams);
          return processResults(results);
        },
        processResults: processResults.bind()
      },
      series: {
        // mapParams: mapParams.bind(),
        search: async function (studyInstanceUid) {
          qidoDicomWebClient.headers = getAuthrorizationHeader();
          const results = await seriesInStudy(qidoDicomWebClient, studyInstanceUid);
          return processSeriesResults(results);
        }
        // processResults: processResults.bind(),
      },
      instances: {
        search: (studyInstanceUid, queryParameters) => {
          qidoDicomWebClient.headers = getAuthrorizationHeader();
          return search.call(undefined, qidoDicomWebClient, studyInstanceUid, null, queryParameters);
        }
      }
    },
    retrieve: {
      /**
       * Generates a URL that can be used for direct retrieve of the bulkdata
       *
       * @param {object} params
       * @param {string} params.tag is the tag name of the URL to retrieve
       * @param {object} params.instance is the instance object that the tag is in
       * @param {string} params.defaultType is the mime type of the response
       * @param {string} params.singlepart is the type of the part to retrieve
       * @returns an absolute URL to the resource, if the absolute URL can be retrieved as singlepart,
       *    or is already retrieved, or a promise to a URL for such use if a BulkDataURI
       */
      directURL: params => {
        return utils_getDirectURL({
          wadoRoot: dicomWebConfig.wadoRoot,
          singlepart: dicomWebConfig.singlepart
        }, params);
      },
      /**
       * Provide direct access to the dicom web client for certain use cases
       * where the dicom web client is used by an external library such as the
       * microscopy viewer.
       * Note this instance only needs to support the wado queries, and may not
       * support any QIDO or STOW operations.
       */
      getWadoDicomWebClient: () => wadoDicomWebClient,
      bulkDataURI: async ({
        StudyInstanceUID,
        BulkDataURI
      }) => {
        qidoDicomWebClient.headers = getAuthrorizationHeader();
        const options = {
          multipart: false,
          BulkDataURI,
          StudyInstanceUID
        };
        return qidoDicomWebClient.retrieveBulkData(options).then(val => {
          const ret = val && val[0] || undefined;
          return ret;
        });
      },
      series: {
        metadata: async ({
          StudyInstanceUID,
          filters,
          sortCriteria,
          sortFunction,
          madeInClient = false,
          returnPromises = false
        } = {}) => {
          if (!StudyInstanceUID) {
            throw new Error('Unable to query for SeriesMetadata without StudyInstanceUID');
          }
          if (dicomWebConfig.enableStudyLazyLoad) {
            return implementation._retrieveSeriesMetadataAsync(StudyInstanceUID, filters, sortCriteria, sortFunction, madeInClient, returnPromises);
          }
          return implementation._retrieveSeriesMetadataSync(StudyInstanceUID, filters, sortCriteria, sortFunction, madeInClient);
        }
      }
    },
    store: {
      dicom: async (dataset, request, dicomDict) => {
        wadoDicomWebClient.headers = getAuthrorizationHeader();
        if (dataset instanceof ArrayBuffer) {
          const options = {
            datasets: [dataset],
            request
          };
          await wadoDicomWebClient.storeInstances(options);
        } else {
          let effectiveDicomDict = dicomDict;
          if (!dicomDict) {
            const meta = {
              FileMetaInformationVersion: dataset._meta?.FileMetaInformationVersion?.Value,
              MediaStorageSOPClassUID: dataset.SOPClassUID,
              MediaStorageSOPInstanceUID: dataset.SOPInstanceUID,
              TransferSyntaxUID: EXPLICIT_VR_LITTLE_ENDIAN,
              ImplementationClassUID,
              ImplementationVersionName
            };
            const denaturalized = denaturalizeDataset(meta);
            const defaultDicomDict = new DicomDict(denaturalized);
            defaultDicomDict.dict = denaturalizeDataset(dataset);
            effectiveDicomDict = defaultDicomDict;
          }
          const part10Buffer = effectiveDicomDict.write();
          const options = {
            datasets: [part10Buffer],
            request
          };
          await wadoDicomWebClient.storeInstances(options);
        }
      }
    },
    _retrieveSeriesMetadataSync: async (StudyInstanceUID, filters, sortCriteria, sortFunction, madeInClient) => {
      const enableStudyLazyLoad = false;
      wadoDicomWebClient.headers = generateWadoHeader();
      // data is all SOPInstanceUIDs
      const data = await retrieveStudyMetadata(wadoDicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction, dicomWebConfig);

      // first naturalize the data
      const naturalizedInstancesMetadata = data.map(naturalizeDataset);
      const seriesSummaryMetadata = {};
      const instancesPerSeries = {};
      naturalizedInstancesMetadata.forEach(instance => {
        if (!seriesSummaryMetadata[instance.SeriesInstanceUID]) {
          seriesSummaryMetadata[instance.SeriesInstanceUID] = {
            StudyInstanceUID: instance.StudyInstanceUID,
            StudyDescription: instance.StudyDescription,
            SeriesInstanceUID: instance.SeriesInstanceUID,
            SeriesDescription: instance.SeriesDescription,
            SeriesNumber: instance.SeriesNumber,
            SeriesTime: instance.SeriesTime,
            SOPClassUID: instance.SOPClassUID,
            ProtocolName: instance.ProtocolName,
            Modality: instance.Modality
          };
        }
        if (!instancesPerSeries[instance.SeriesInstanceUID]) {
          instancesPerSeries[instance.SeriesInstanceUID] = [];
        }
        const imageId = implementation.getImageIdsForInstance({
          instance
        });
        instance.imageId = imageId;
        instance.wadoRoot = dicomWebConfig.wadoRoot;
        instance.wadoUri = dicomWebConfig.wadoUri;
        metadataProvider.addImageIdToUIDs(imageId, {
          StudyInstanceUID,
          SeriesInstanceUID: instance.SeriesInstanceUID,
          SOPInstanceUID: instance.SOPInstanceUID
        });
        instancesPerSeries[instance.SeriesInstanceUID].push(instance);
      });

      // grab all the series metadata
      const seriesMetadata = Object.values(seriesSummaryMetadata);
      src/* DicomMetadataStore */.H8.addSeriesMetadata(seriesMetadata, madeInClient);
      Object.keys(instancesPerSeries).forEach(seriesInstanceUID => src/* DicomMetadataStore */.H8.addInstances(instancesPerSeries[seriesInstanceUID], madeInClient));
      return seriesSummaryMetadata;
    },
    _retrieveSeriesMetadataAsync: async (StudyInstanceUID, filters, sortCriteria, sortFunction, madeInClient = false, returnPromises = false) => {
      const enableStudyLazyLoad = true;
      wadoDicomWebClient.headers = generateWadoHeader();
      // Get Series
      const {
        preLoadData: seriesSummaryMetadata,
        promises: seriesPromises
      } = await retrieveStudyMetadata(wadoDicomWebClient, StudyInstanceUID, enableStudyLazyLoad, filters, sortCriteria, sortFunction, dicomWebConfig);

      /**
       * Adds the retrieve bulkdata function to naturalized DICOM data.
       * This is done recursively, for sub-sequences.
       */
      const addRetrieveBulkDataNaturalized = (naturalized, instance = naturalized) => {
        for (const key of Object.keys(naturalized)) {
          const value = naturalized[key];
          if (Array.isArray(value) && typeof value[0] === 'object') {
            // Fix recursive values
            value.forEach(child => addRetrieveBulkDataNaturalized(child, instance));
            continue;
          }

          // The value.Value will be set with the bulkdata read value
          // in which case it isn't necessary to re-read this.
          if (value && value.BulkDataURI && !value.Value) {
            // handle the scenarios where bulkDataURI is relative path
            fixBulkDataURI(value, instance, dicomWebConfig);
            // Provide a method to fetch bulkdata
            value.retrieveBulkData = retrieveBulkData.bind(qidoDicomWebClient, value);
          }
        }
        return naturalized;
      };

      /**
       * naturalizes the dataset, and adds a retrieve bulkdata method
       * to any values containing BulkDataURI.
       * @param {*} instance
       * @returns naturalized dataset, with retrieveBulkData methods
       */
      const addRetrieveBulkData = instance => {
        const naturalized = naturalizeDataset(instance);

        // if we know the server doesn't use bulkDataURI, then don't
        if (!dicomWebConfig.bulkDataURI?.enabled) {
          return naturalized;
        }
        return addRetrieveBulkDataNaturalized(naturalized);
      };

      // Async load series, store as retrieved
      function storeInstances(instances) {
        const naturalizedInstances = instances.map(addRetrieveBulkData);

        // Adding instanceMetadata to OHIF MetadataProvider
        naturalizedInstances.forEach(instance => {
          instance.wadoRoot = dicomWebConfig.wadoRoot;
          instance.wadoUri = dicomWebConfig.wadoUri;
          const imageId = implementation.getImageIdsForInstance({
            instance
          });

          // Adding imageId to each instance
          // Todo: This is not the best way I can think of to let external
          // metadata handlers know about the imageId that is stored in the store
          instance.imageId = imageId;

          // Adding UIDs to metadataProvider
          // Note: storing imageURI in metadataProvider since stack viewports
          // will use the same imageURI
          metadataProvider.addImageIdToUIDs(imageId, {
            StudyInstanceUID,
            SeriesInstanceUID: instance.SeriesInstanceUID,
            SOPInstanceUID: instance.SOPInstanceUID
          });
        });
        src/* DicomMetadataStore */.H8.addInstances(naturalizedInstances, madeInClient);
      }
      function setSuccessFlag() {
        const study = src/* DicomMetadataStore */.H8.getStudy(StudyInstanceUID);
        if (!study) {
          return;
        }
        study.isLoaded = true;
      }

      // Google Cloud Healthcare doesn't return StudyInstanceUID, so we need to add
      // it manually here
      seriesSummaryMetadata.forEach(aSeries => {
        aSeries.StudyInstanceUID = StudyInstanceUID;
      });
      src/* DicomMetadataStore */.H8.addSeriesMetadata(seriesSummaryMetadata, madeInClient);
      const seriesDeliveredPromises = seriesPromises.map(promise => {
        if (!returnPromises) {
          promise?.start();
        }
        return promise.then(instances => {
          storeInstances(instances);
        });
      });
      if (returnPromises) {
        Promise.all(seriesDeliveredPromises).then(() => setSuccessFlag());
        return seriesPromises;
      } else {
        await Promise.all(seriesDeliveredPromises);
        setSuccessFlag();
      }
      return seriesSummaryMetadata;
    },
    deleteStudyMetadataPromise: deleteStudyMetadataPromise,
    getImageIdsForDisplaySet(displaySet) {
      const images = displaySet.images;
      const imageIds = [];
      if (!images) {
        return imageIds;
      }
      displaySet.images.forEach(instance => {
        const NumberOfFrames = instance.NumberOfFrames;
        if (NumberOfFrames > 1) {
          for (let frame = 1; frame <= NumberOfFrames; frame++) {
            const imageId = this.getImageIdsForInstance({
              instance,
              frame
            });
            imageIds.push(imageId);
          }
        } else {
          const imageId = this.getImageIdsForInstance({
            instance
          });
          imageIds.push(imageId);
        }
      });
      return imageIds;
    },
    getImageIdsForInstance({
      instance,
      frame = undefined
    }) {
      const imageIds = getImageId({
        instance,
        frame,
        config: dicomWebConfig
      });
      return imageIds;
    },
    getConfig() {
      return dicomWebConfigCopy;
    },
    getStudyInstanceUIDs({
      params,
      query
    }) {
      const {
        StudyInstanceUIDs: paramsStudyInstanceUIDs
      } = params;
      const queryStudyInstanceUIDs = src/* utils */.Wp.splitComma(query.getAll('StudyInstanceUIDs'));
      const StudyInstanceUIDs = queryStudyInstanceUIDs.length && queryStudyInstanceUIDs || paramsStudyInstanceUIDs;
      const StudyInstanceUIDsAsArray = StudyInstanceUIDs && Array.isArray(StudyInstanceUIDs) ? StudyInstanceUIDs : [StudyInstanceUIDs];
      return StudyInstanceUIDsAsArray;
    }
  };
  if (dicomWebConfig.supportsReject) {
    implementation.reject = dcm4cheeReject(dicomWebConfig.wadoRoot);
  }
  return src/* IWebApiDataSource */.pt.create(implementation);
}

/**
 * A bindable function that retrieves the bulk data against this as the
 * dicomweb client, and on the given value element.
 *
 * @param value - a bind value that stores the retrieve value to short circuit the
 *    next retrieve instance.
 * @param options - to allow specifying the content type.
 */
function retrieveBulkData(value, options = {}) {
  const {
    mediaType
  } = options;
  const useOptions = {
    // The bulkdata fetches work with either multipart or
    // singlepart, so set multipart to false to let the server
    // decide which type to respond with.
    multipart: false,
    BulkDataURI: value.BulkDataURI,
    mediaTypes: mediaType ? [{
      mediaType
    }, {
      mediaType: 'application/octet-stream'
    }] : undefined,
    ...options
  };
  return this.retrieveBulkData(useOptions).then(val => {
    // There are DICOM PDF cases where the first ArrayBuffer in the array is
    // the bulk data and DICOM video cases where the second ArrayBuffer is
    // the bulk data. Here we play it safe and do a find.
    const ret = val instanceof Array && val.find(arrayBuffer => arrayBuffer?.byteLength) || undefined;
    value.Value = ret;
    return ret;
  });
}

// EXTERNAL MODULE: ../../../node_modules/query-string/index.js
var query_string = __webpack_require__(98985);
;// CONCATENATED MODULE: ../../../extensions/default/src/DicomJSONDataSource/index.js





const DicomJSONDataSource_metadataProvider = src/* default.classes */.Ay.classes.MetadataProvider;
const mappings = {
  studyInstanceUid: 'StudyInstanceUID',
  patientId: 'PatientID'
};
let _store = {
  urls: [],
  studyInstanceUIDMap: new Map() // map of urls to array of study instance UIDs
  // {
  //   url: url1
  //   studies: [Study1, Study2], // if multiple studies
  // }
  // {
  //   url: url2
  //   studies: [Study1],
  // }
  // }
};
function wrapSequences(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      // Recursively wrap sequences for nested objects
      acc[key] = wrapSequences(obj[key]);
    } else {
      acc[key] = obj[key];
    }
    if (key.endsWith('Sequence')) {
      acc[key] = src/* default.utils */.Ay.utils.addAccessors(acc[key]);
    }
    return acc;
  }, Array.isArray(obj) ? [] : {});
}
const getMetaDataByURL = url => {
  return _store.urls.find(metaData => metaData.url === url);
};
const findStudies = (key, value) => {
  let studies = [];
  _store.urls.map(metaData => {
    metaData.studies.map(aStudy => {
      if (aStudy[key] === value) {
        studies.push(aStudy);
      }
    });
  });
  return studies;
};
function createDicomJSONApi(dicomJsonConfig) {
  const implementation = {
    initialize: async ({
      query,
      url
    }) => {
      if (!url) {
        url = query.get('url');
      }
      let metaData = getMetaDataByURL(url);

      // if we have already cached the data from this specific url
      // We are only handling one StudyInstanceUID to run; however,
      // all studies for patientID will be put in the correct tab
      if (metaData) {
        return metaData.studies.map(aStudy => {
          return aStudy.StudyInstanceUID;
        });
      }
      const response = await fetch(url);
      const data = await response.json();
      let StudyInstanceUID;
      let SeriesInstanceUID;
      data.studies.forEach(study => {
        StudyInstanceUID = study.StudyInstanceUID;
        study.series.forEach(series => {
          SeriesInstanceUID = series.SeriesInstanceUID;
          series.instances.forEach(instance => {
            const {
              metadata: naturalizedDicom
            } = instance;
            const imageId = getImageId({
              instance,
              config: dicomJsonConfig
            });
            const {
              query
            } = query_string.parseUrl(instance.url);

            // Add imageId specific mapping to this data as the URL isn't necessarliy WADO-URI.
            DicomJSONDataSource_metadataProvider.addImageIdToUIDs(imageId, {
              StudyInstanceUID,
              SeriesInstanceUID,
              SOPInstanceUID: naturalizedDicom.SOPInstanceUID,
              frameNumber: query.frame ? parseInt(query.frame) : undefined
            });
          });
        });
      });
      _store.urls.push({
        url,
        studies: [...data.studies]
      });
      _store.studyInstanceUIDMap.set(url, data.studies.map(study => study.StudyInstanceUID));
    },
    query: {
      studies: {
        mapParams: () => {},
        search: async param => {
          const [key, value] = Object.entries(param)[0];
          const mappedParam = mappings[key];

          // todo: should fetch from dicomMetadataStore
          const studies = findStudies(mappedParam, value);
          return studies.map(aStudy => {
            return {
              accession: aStudy.AccessionNumber,
              date: aStudy.StudyDate,
              description: aStudy.StudyDescription,
              instances: aStudy.NumInstances,
              modalities: aStudy.Modalities,
              mrn: aStudy.PatientID,
              patientName: aStudy.PatientName,
              studyInstanceUid: aStudy.StudyInstanceUID,
              NumInstances: aStudy.NumInstances,
              time: aStudy.StudyTime
            };
          });
        },
        processResults: () => {
          console.warn(' DICOMJson QUERY processResults not implemented');
        }
      },
      series: {
        // mapParams: mapParams.bind(),
        search: () => {
          console.warn(' DICOMJson QUERY SERIES SEARCH not implemented');
        }
      },
      instances: {
        search: () => {
          console.warn(' DICOMJson QUERY instances SEARCH not implemented');
        }
      }
    },
    retrieve: {
      /**
       * Generates a URL that can be used for direct retrieve of the bulkdata
       *
       * @param {object} params
       * @param {string} params.tag is the tag name of the URL to retrieve
       * @param {string} params.defaultPath path for the pixel data url
       * @param {object} params.instance is the instance object that the tag is in
       * @param {string} params.defaultType is the mime type of the response
       * @param {string} params.singlepart is the type of the part to retrieve
       * @param {string} params.fetchPart unknown?
       * @returns an absolute URL to the resource, if the absolute URL can be retrieved as singlepart,
       *    or is already retrieved, or a promise to a URL for such use if a BulkDataURI
       */
      directURL: params => {
        return utils_getDirectURL(dicomJsonConfig, params);
      },
      series: {
        metadata: async ({
          filters,
          StudyInstanceUID,
          madeInClient = false,
          customSort
        } = {}) => {
          if (!StudyInstanceUID) {
            throw new Error('Unable to query for SeriesMetadata without StudyInstanceUID');
          }
          const study = findStudies('StudyInstanceUID', StudyInstanceUID)[0];
          let series;
          if (customSort) {
            series = customSort(study.series);
          } else {
            series = study.series;
          }
          const seriesKeys = ['SeriesInstanceUID', 'SeriesInstanceUIDs', 'seriesInstanceUID', 'seriesInstanceUIDs'];
          const seriesFilter = seriesKeys.find(key => filters[key]);
          if (seriesFilter) {
            const seriesUIDs = filters[seriesFilter];
            series = series.filter(s => seriesUIDs.includes(s.SeriesInstanceUID));
          }
          const seriesSummaryMetadata = series.map(series => {
            const seriesSummary = {
              StudyInstanceUID: study.StudyInstanceUID,
              ...series
            };
            delete seriesSummary.instances;
            return seriesSummary;
          });

          // Async load series, store as retrieved
          function storeInstances(naturalizedInstances) {
            src/* DicomMetadataStore */.H8.addInstances(naturalizedInstances, madeInClient);
          }
          src/* DicomMetadataStore */.H8.addSeriesMetadata(seriesSummaryMetadata, madeInClient);
          function setSuccessFlag() {
            const study = src/* DicomMetadataStore */.H8.getStudy(StudyInstanceUID, madeInClient);
            study.isLoaded = true;
          }
          const numberOfSeries = series.length;
          series.forEach((series, index) => {
            const instances = series.instances.map(instance => {
              // for instance.metadata if the key ends with sequence then
              // we need to add a proxy to the first item in the sequence
              // so that we can access the value of the sequence
              // by using sequenceName.value
              const modifiedMetadata = wrapSequences(instance.metadata);
              const obj = {
                ...modifiedMetadata,
                url: instance.url,
                imageId: getImageId({
                  instance,
                  config: dicomJsonConfig
                }),
                ...series,
                ...study
              };
              delete obj.instances;
              delete obj.series;
              return obj;
            });
            storeInstances(instances);
            if (index === numberOfSeries - 1) {
              setSuccessFlag();
            }
          });
        }
      }
    },
    store: {
      dicom: () => {
        console.warn(' DICOMJson store dicom not implemented');
      }
    },
    getImageIdsForDisplaySet(displaySet) {
      const images = displaySet.images;
      const imageIds = [];
      if (!images) {
        return imageIds;
      }
      const {
        StudyInstanceUID,
        SeriesInstanceUID
      } = displaySet;
      const study = findStudies('StudyInstanceUID', StudyInstanceUID)[0];
      const series = study.series.find(s => s.SeriesInstanceUID === SeriesInstanceUID) || [];
      const instanceMap = new Map();
      series.instances.forEach(instance => {
        if (instance?.metadata?.SOPInstanceUID) {
          const {
            metadata,
            url
          } = instance;
          const existingInstances = instanceMap.get(metadata.SOPInstanceUID) || [];
          existingInstances.push({
            ...metadata,
            url
          });
          instanceMap.set(metadata.SOPInstanceUID, existingInstances);
        }
      });
      displaySet.images.forEach(instance => {
        const NumberOfFrames = instance.NumberOfFrames || 1;
        const instances = instanceMap.get(instance.SOPInstanceUID) || [instance];
        for (let i = 0; i < NumberOfFrames; i++) {
          const imageId = getImageId({
            instance: instances[Math.min(i, instances.length - 1)],
            frame: NumberOfFrames > 1 ? i : undefined,
            config: dicomJsonConfig
          });
          imageIds.push(imageId);
        }
      });
      return imageIds;
    },
    getImageIdsForInstance({
      instance,
      frame
    }) {
      const imageIds = getImageId({
        instance,
        frame
      });
      return imageIds;
    },
    getStudyInstanceUIDs: ({
      params,
      query
    }) => {
      const url = query.get('url');
      return _store.studyInstanceUIDMap.get(url);
    }
  };
  return src/* IWebApiDataSource */.pt.create(implementation);
}

;// CONCATENATED MODULE: ../../../extensions/default/src/DicomLocalDataSource/index.js



const DicomLocalDataSource_metadataProvider = src/* default.classes */.Ay.classes.MetadataProvider;
const {
  EVENTS
} = src/* DicomMetadataStore */.H8;
const END_MODALITIES = {
  SR: true,
  SEG: true,
  DOC: true
};
const compareValue = (v1, v2, def = 0) => {
  if (v1 === v2) {
    return def;
  }
  if (v1 < v2) {
    return -1;
  }
  return 1;
};

// Sorting SR modalities to be at the end of series list
const customSort = (seriesA, seriesB) => {
  const instanceA = seriesA.instances[0];
  const instanceB = seriesB.instances[0];
  const modalityA = instanceA.Modality;
  const modalityB = instanceB.Modality;
  const isEndA = END_MODALITIES[modalityA];
  const isEndB = END_MODALITIES[modalityB];
  if (isEndA && isEndB) {
    // Compare by series date
    return compareValue(instanceA.SeriesNumber, instanceB.SeriesNumber);
  }
  if (!isEndA && !isEndB) {
    return compareValue(instanceB.SeriesNumber, instanceA.SeriesNumber);
  }
  return isEndA ? -1 : 1;
};
function createDicomLocalApi(dicomLocalConfig) {
  const {
    name
  } = dicomLocalConfig;
  const implementation = {
    initialize: ({
      params,
      query
    }) => {},
    query: {
      studies: {
        mapParams: () => {},
        search: params => {
          const studyUIDs = src/* DicomMetadataStore */.H8.getStudyInstanceUIDs();
          return studyUIDs.map(StudyInstanceUID => {
            let numInstances = 0;
            const modalities = new Set();

            // Calculating the number of instances in the study and modalities
            // present in the study
            const study = src/* DicomMetadataStore */.H8.getStudy(StudyInstanceUID);
            study.series.forEach(aSeries => {
              numInstances += aSeries.instances.length;
              modalities.add(aSeries.instances[0].Modality);
            });

            // first instance in the first series
            const firstInstance = study?.series[0]?.instances[0];
            if (firstInstance) {
              return {
                accession: firstInstance.AccessionNumber,
                date: firstInstance.StudyDate,
                description: firstInstance.StudyDescription,
                mrn: firstInstance.PatientID,
                patientName: src/* utils */.Wp.formatPN(firstInstance.PatientName),
                studyInstanceUid: firstInstance.StudyInstanceUID,
                time: firstInstance.StudyTime,
                //
                instances: numInstances,
                modalities: Array.from(modalities).join('/'),
                NumInstances: numInstances
              };
            }
          });
        },
        processResults: () => {
          console.warn(' DICOMLocal QUERY processResults not implemented');
        }
      },
      series: {
        search: studyInstanceUID => {
          const study = src/* DicomMetadataStore */.H8.getStudy(studyInstanceUID);
          return study.series.map(aSeries => {
            const firstInstance = aSeries?.instances[0];
            return {
              studyInstanceUid: studyInstanceUID,
              seriesInstanceUid: firstInstance.SeriesInstanceUID,
              modality: firstInstance.Modality,
              seriesNumber: firstInstance.SeriesNumber,
              seriesDate: firstInstance.SeriesDate,
              numSeriesInstances: aSeries.instances.length,
              description: firstInstance.SeriesDescription
            };
          });
        }
      },
      instances: {
        search: () => {
          console.warn(' DICOMLocal QUERY instances SEARCH not implemented');
        }
      }
    },
    retrieve: {
      directURL: params => {
        const {
          instance,
          tag,
          defaultType
        } = params;
        const value = instance[tag];
        if (value instanceof Array && value[0] instanceof ArrayBuffer) {
          return URL.createObjectURL(new Blob([value[0]], {
            type: defaultType
          }));
        }
      },
      series: {
        metadata: async ({
          StudyInstanceUID,
          madeInClient = false
        } = {}) => {
          if (!StudyInstanceUID) {
            throw new Error('Unable to query for SeriesMetadata without StudyInstanceUID');
          }

          // Instances metadata already added via local upload
          const study = src/* DicomMetadataStore */.H8.getStudy(StudyInstanceUID, madeInClient);

          // Series metadata already added via local upload
          src/* DicomMetadataStore */.H8._broadcastEvent(EVENTS.SERIES_ADDED, {
            StudyInstanceUID,
            madeInClient
          });
          study.series.forEach(aSeries => {
            const {
              SeriesInstanceUID
            } = aSeries;
            const isMultiframe = aSeries.instances[0].NumberOfFrames > 1;
            aSeries.instances.forEach((instance, index) => {
              const {
                url: imageId,
                StudyInstanceUID,
                SeriesInstanceUID,
                SOPInstanceUID
              } = instance;
              instance.imageId = imageId;

              // Add imageId specific mapping to this data as the URL isn't necessarily WADO-URI.
              DicomLocalDataSource_metadataProvider.addImageIdToUIDs(imageId, {
                StudyInstanceUID,
                SeriesInstanceUID,
                SOPInstanceUID,
                frameIndex: isMultiframe ? index : 1
              });
            });
            src/* DicomMetadataStore */.H8._broadcastEvent(EVENTS.INSTANCES_ADDED, {
              StudyInstanceUID,
              SeriesInstanceUID,
              madeInClient
            });
          });
        }
      }
    },
    store: {
      dicom: naturalizedReport => {
        const reportBlob = dcmjs_es/* default.data */.Ay.data.datasetToBlob(naturalizedReport);

        //Create a URL for the binary.
        var objectUrl = URL.createObjectURL(reportBlob);
        window.location.assign(objectUrl);
      }
    },
    getImageIdsForDisplaySet(displaySet) {
      const images = displaySet.images;
      const imageIds = [];
      if (!images) {
        return imageIds;
      }
      displaySet.images.forEach(instance => {
        const NumberOfFrames = instance.NumberOfFrames;
        if (NumberOfFrames > 1) {
          // in multiframe we start at frame 1
          for (let i = 1; i <= NumberOfFrames; i++) {
            const imageId = this.getImageIdsForInstance({
              instance,
              frame: i
            });
            imageIds.push(imageId);
          }
        } else {
          const imageId = this.getImageIdsForInstance({
            instance
          });
          imageIds.push(imageId);
        }
      });
      return imageIds;
    },
    getImageIdsForInstance({
      instance,
      frame
    }) {
      if (instance.imageId) {
        return instance.imageId;
      }
      const {
        StudyInstanceUID,
        SeriesInstanceUID,
        SOPInstanceUID
      } = instance;
      const storedInstance = src/* DicomMetadataStore */.H8.getInstance(StudyInstanceUID, SeriesInstanceUID, SOPInstanceUID);
      let imageId = storedInstance.url;
      if (frame !== undefined) {
        imageId += `&frame=${frame}`;
      }
      return imageId;
    },
    deleteStudyMetadataPromise() {
      console.log('deleteStudyMetadataPromise not implemented');
    },
    getStudyInstanceUIDs: ({
      params,
      query
    }) => {
      const {
        StudyInstanceUIDs: paramsStudyInstanceUIDs
      } = params;
      const queryStudyInstanceUIDs = query.getAll('StudyInstanceUIDs');
      const StudyInstanceUIDs = queryStudyInstanceUIDs || paramsStudyInstanceUIDs;
      const StudyInstanceUIDsAsArray = StudyInstanceUIDs && Array.isArray(StudyInstanceUIDs) ? StudyInstanceUIDs : [StudyInstanceUIDs];

      // Put SRs at the end of series list to make sure images are loaded first
      let isStudyInCache = false;
      StudyInstanceUIDsAsArray.forEach(StudyInstanceUID => {
        const study = src/* DicomMetadataStore */.H8.getStudy(StudyInstanceUID);
        if (study) {
          study.series = study.series.sort(customSort);
          isStudyInCache = true;
        }
      });
      return isStudyInCache ? StudyInstanceUIDsAsArray : [];
    }
  };
  return src/* IWebApiDataSource */.pt.create(implementation);
}

;// CONCATENATED MODULE: ../../../extensions/default/src/DicomWebProxyDataSource/index.ts



/**
 * This datasource is initialized with a url that returns a JSON object with a
 * dicomWeb datasource configuration array present in a "servers" object.
 *
 * Only the first array item is parsed, if there are multiple items in the
 * dicomWeb configuration array
 *
 */
function createDicomWebProxyApi(dicomWebProxyConfig, servicesManager) {
  const {
    name
  } = dicomWebProxyConfig;
  let dicomWebDelegate = undefined;
  const implementation = {
    initialize: async ({
      params,
      query
    }) => {
      const url = query.get('url');
      if (!url) {
        throw new Error(`No url for '${name}'`);
      } else {
        const response = await fetch(url);
        const data = await response.json();
        if (!data.servers?.dicomWeb?.[0]) {
          throw new Error('Invalid configuration returned by url');
        }
        dicomWebDelegate = createDicomWebApi(data.servers.dicomWeb[0].configuration || data.servers.dicomWeb[0], servicesManager);
        dicomWebDelegate.initialize({
          params,
          query
        });
      }
    },
    query: {
      studies: {
        search: params => dicomWebDelegate.query.studies.search(params)
      },
      series: {
        search: (...args) => dicomWebDelegate.query.series.search(...args)
      },
      instances: {
        search: (studyInstanceUid, queryParameters) => dicomWebDelegate.query.instances.search(studyInstanceUid, queryParameters)
      }
    },
    retrieve: {
      directURL: (...args) => dicomWebDelegate.retrieve.directURL(...args),
      series: {
        metadata: async (...args) => dicomWebDelegate.retrieve.series.metadata(...args)
      }
    },
    store: {
      dicom: (...args) => dicomWebDelegate.store(...args)
    },
    deleteStudyMetadataPromise: (...args) => dicomWebDelegate.deleteStudyMetadataPromise(...args),
    getImageIdsForDisplaySet: (...args) => dicomWebDelegate.getImageIdsForDisplaySet(...args),
    getImageIdsForInstance: (...args) => dicomWebDelegate.getImageIdsForInstance(...args),
    getStudyInstanceUIDs({
      params,
      query
    }) {
      let studyInstanceUIDs = [];

      // there seem to be a couple of variations of the case for this parameter
      const queryStudyInstanceUIDs = query.get('studyInstanceUIDs') || query.get('studyInstanceUids');
      if (!queryStudyInstanceUIDs) {
        throw new Error(`No studyInstanceUids in request for '${name}'`);
      }
      studyInstanceUIDs = queryStudyInstanceUIDs.split(';');
      return studyInstanceUIDs;
    }
  };
  return src/* IWebApiDataSource */.pt.create(implementation);
}

// EXTERNAL MODULE: ../../../node_modules/lodash/lodash.js
var lodash = __webpack_require__(637);
;// CONCATENATED MODULE: ../../../extensions/default/src/MergeDataSource/index.ts


const mergeMap = {
  'query.studies.search': {
    mergeKey: 'studyInstanceUid',
    tagFunc: x => x
  },
  'query.series.search': {
    mergeKey: 'seriesInstanceUid',
    tagFunc: (series, sourceName) => {
      series.forEach(series => {
        series.RetrieveAETitle = sourceName;
        src/* DicomMetadataStore */.H8.updateSeriesMetadata(series);
      });
      return series;
    }
  }
};

/**
 * Calls all data sources asynchronously and merges the results.
 * @param {CallForAllDataSourcesAsyncOptions} options - The options for calling all data sources.
 * @param {string} options.path - The path to the function to be called on each data source.
 * @param {unknown[]} options.args - The arguments to be passed to the function.
 * @param {ExtensionManager} options.extensionManager - The extension manager.
 * @param {string[]} options.dataSourceNames - The names of the data sources to be called.
 * @param {string} options.defaultDataSourceName - The name of the default data source.
 * @returns {Promise<unknown[]>} - A promise that resolves to the merged data from all data sources.
 */
const callForAllDataSourcesAsync = async ({
  mergeMap,
  path,
  args,
  extensionManager,
  dataSourceNames,
  defaultDataSourceName
}) => {
  const {
    mergeKey,
    tagFunc
  } = mergeMap[path] || {
    tagFunc: x => x
  };

  /** Sort by default data source */
  const defs = Object.values(extensionManager.dataSourceDefs);
  const defaultDataSourceDef = defs.find(def => def.sourceName === defaultDataSourceName);
  const dataSourceDefs = defs.filter(def => def.sourceName !== defaultDataSourceName);
  if (defaultDataSourceDef) {
    dataSourceDefs.unshift(defaultDataSourceDef);
  }
  const promises = [];
  const sourceNames = [];
  for (const dataSourceDef of dataSourceDefs) {
    const {
      configuration,
      sourceName
    } = dataSourceDef;
    if (!!configuration && dataSourceNames.includes(sourceName)) {
      const [dataSource] = extensionManager.getDataSources(sourceName);
      const func = (0,lodash.get)(dataSource, path);
      const promise = func.apply(dataSource, args);
      promises.push(promise);
      sourceNames.push(sourceName);
    }
  }
  const data = await Promise.allSettled(promises);
  const mergedData = data.map((data, i) => tagFunc(data.value, sourceNames[i]));
  let results = [];
  if (mergeKey) {
    results = (0,lodash.uniqBy)(mergedData.flat(), obj => (0,lodash.get)(obj, mergeKey));
  } else {
    results = mergedData.flat();
  }
  return results;
};

/**
 * Calls all data sources that match the provided names and merges their data.
 * @param options - The options for calling all data sources.
 * @param options.path - The path to the function to be called on each data source.
 * @param options.args - The arguments to be passed to the function.
 * @param options.extensionManager - The extension manager instance.
 * @param options.dataSourceNames - The names of the data sources to be called.
 * @param options.defaultDataSourceName - The name of the default data source.
 * @returns The merged data from all the matching data sources.
 */
const callForAllDataSources = ({
  path,
  args,
  extensionManager,
  dataSourceNames,
  defaultDataSourceName
}) => {
  /** Sort by default data source */
  const defs = Object.values(extensionManager.dataSourceDefs);
  const defaultDataSourceDef = defs.find(def => def.sourceName === defaultDataSourceName);
  const dataSourceDefs = defs.filter(def => def.sourceName !== defaultDataSourceName);
  if (defaultDataSourceDef) {
    dataSourceDefs.unshift(defaultDataSourceDef);
  }
  const mergedData = [];
  for (const dataSourceDef of dataSourceDefs) {
    const {
      configuration,
      sourceName
    } = dataSourceDef;
    if (!!configuration && dataSourceNames.includes(sourceName)) {
      const [dataSource] = extensionManager.getDataSources(sourceName);
      const func = (0,lodash.get)(dataSource, path);
      const data = func.apply(dataSource, args);
      mergedData.push(data);
    }
  }
  return mergedData.flat();
};

/**
 * Calls the default data source function specified by the given path with the provided arguments.
 * @param {CallForDefaultDataSourceOptions} options - The options for calling the default data source.
 * @param {string} options.path - The path to the function within the default data source.
 * @param {unknown[]} options.args - The arguments to pass to the function.
 * @param {string} options.defaultDataSourceName - The name of the default data source.
 * @param {ExtensionManager} options.extensionManager - The extension manager instance.
 * @returns {unknown} - The result of calling the default data source function.
 */
const callForDefaultDataSource = ({
  path,
  args,
  defaultDataSourceName,
  extensionManager
}) => {
  const [dataSource] = extensionManager.getDataSources(defaultDataSourceName);
  const func = (0,lodash.get)(dataSource, path);
  return func.apply(dataSource, args);
};

/**
 * Calls the data source specified by the RetrieveAETitle of the given display set.
 * @typedef {Object} CallByRetrieveAETitleOptions
 * @property {string} path - The path of the method to call on the data source.
 * @property {any[]} args - The arguments to pass to the method.
 * @property {string} defaultDataSourceName - The name of the default data source.
 * @property {ExtensionManager} extensionManager - The extension manager.
 */
const callByRetrieveAETitle = ({
  path,
  args,
  defaultDataSourceName,
  extensionManager
}) => {
  const [displaySet] = args;
  const seriesMetadata = src/* DicomMetadataStore */.H8.getSeries(displaySet.StudyInstanceUID, displaySet.SeriesInstanceUID);
  const [dataSource] = extensionManager.getDataSources(seriesMetadata.RetrieveAETitle || defaultDataSourceName);
  return dataSource[path](...args);
};
function createMergeDataSourceApi(mergeConfig, servicesManager, extensionManager) {
  const {
    seriesMerge
  } = mergeConfig;
  const {
    dataSourceNames,
    defaultDataSourceName
  } = seriesMerge;
  const implementation = {
    initialize: (...args) => callForAllDataSources({
      path: 'initialize',
      args,
      extensionManager,
      dataSourceNames,
      defaultDataSourceName
    }),
    query: {
      studies: {
        search: (...args) => callForAllDataSourcesAsync({
          mergeMap,
          path: 'query.studies.search',
          args,
          extensionManager,
          dataSourceNames,
          defaultDataSourceName
        })
      },
      series: {
        search: (...args) => callForAllDataSourcesAsync({
          mergeMap,
          path: 'query.series.search',
          args,
          extensionManager,
          dataSourceNames,
          defaultDataSourceName
        })
      },
      instances: {
        search: (...args) => callForAllDataSourcesAsync({
          mergeMap,
          path: 'query.instances.search',
          args,
          extensionManager,
          dataSourceNames,
          defaultDataSourceName
        })
      }
    },
    retrieve: {
      bulkDataURI: (...args) => callForAllDataSourcesAsync({
        mergeMap,
        path: 'retrieve.bulkDataURI',
        args,
        extensionManager,
        dataSourceNames,
        defaultDataSourceName
      }),
      directURL: (...args) => callForDefaultDataSource({
        path: 'retrieve.directURL',
        args,
        defaultDataSourceName,
        extensionManager
      }),
      series: {
        metadata: (...args) => callForAllDataSourcesAsync({
          mergeMap,
          path: 'retrieve.series.metadata',
          args,
          extensionManager,
          dataSourceNames,
          defaultDataSourceName
        })
      }
    },
    store: {
      dicom: (...args) => callForDefaultDataSource({
        path: 'store.dicom',
        args,
        defaultDataSourceName,
        extensionManager
      })
    },
    deleteStudyMetadataPromise: (...args) => callForAllDataSources({
      path: 'deleteStudyMetadataPromise',
      args,
      extensionManager,
      dataSourceNames,
      defaultDataSourceName
    }),
    getImageIdsForDisplaySet: (...args) => callByRetrieveAETitle({
      path: 'getImageIdsForDisplaySet',
      args,
      defaultDataSourceName,
      extensionManager
    }),
    getImageIdsForInstance: (...args) => callByRetrieveAETitle({
      path: 'getImageIdsForDisplaySet',
      args,
      defaultDataSourceName,
      extensionManager
    }),
    getStudyInstanceUIDs: (...args) => callForAllDataSources({
      path: 'getStudyInstanceUIDs',
      args,
      extensionManager,
      dataSourceNames,
      defaultDataSourceName
    })
  };
  return src/* IWebApiDataSource */.pt.create(implementation);
}

;// CONCATENATED MODULE: ../../../extensions/default/src/getDataSourcesModule.js
// TODO: Pull in IWebClientApi from @ohif/core
// TODO: Use constructor to create an instance of IWebClientApi
// TODO: Use existing DICOMWeb configuration (previously, appConfig, to configure instance)







/**
 *
 */
function getDataSourcesModule() {
  return [{
    name: 'dicomweb',
    type: 'webApi',
    createDataSource: createDicomWebApi
  }, {
    name: 'dicomwebproxy',
    type: 'webApi',
    createDataSource: createDicomWebProxyApi
  }, {
    name: 'dicomjson',
    type: 'jsonApi',
    createDataSource: createDicomJSONApi
  }, {
    name: 'dicomlocal',
    type: 'localApi',
    createDataSource: createDicomLocalApi
  }, {
    name: 'merge',
    type: 'mergeApi',
    createDataSource: createMergeDataSourceApi
  }];
}
/* harmony default export */ const src_getDataSourcesModule = (getDataSourcesModule);
// EXTERNAL MODULE: ../../../node_modules/react/index.js
var react = __webpack_require__(86326);
// EXTERNAL MODULE: ../../../node_modules/prop-types/index.js
var prop_types = __webpack_require__(97598);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ../../ui/src/index.js + 690 modules
var ui_src = __webpack_require__(38223);
// EXTERNAL MODULE: ./state/index.js + 1 modules
var state = __webpack_require__(45981);
// EXTERNAL MODULE: ../node_modules/react-router-dom/dist/index.js
var dist = __webpack_require__(49348);
// EXTERNAL MODULE: ../../../node_modules/react-i18next/dist/es/index.js + 15 modules
var es = __webpack_require__(99993);
// EXTERNAL MODULE: ../node_modules/react-router/dist/index.js
var react_router_dist = __webpack_require__(67435);
// EXTERNAL MODULE: ../../ui-next/src/index.ts + 2483 modules
var ui_next_src = __webpack_require__(35570);
// EXTERNAL MODULE: ../../i18n/src/index.js + 150 modules
var i18n_src = __webpack_require__(16076);
;// CONCATENATED MODULE: ../../../extensions/default/src/Toolbar/Toolbar.tsx
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }


function Toolbar({
  servicesManager,
  buttonSection = 'primary'
}) {
  const {
    toolbarButtons,
    onInteraction
  } = (0,src/* useToolbar */.tR)({
    servicesManager,
    buttonSection
  });
  if (!toolbarButtons.length) {
    return null;
  }
  return /*#__PURE__*/react.createElement(react.Fragment, null, toolbarButtons.map(toolDef => {
    if (!toolDef) {
      return null;
    }
    const {
      id,
      Component,
      componentProps
    } = toolDef;
    const tool = /*#__PURE__*/react.createElement(Component, _extends({
      key: id,
      id: id,
      onInteraction: onInteraction,
      servicesManager: servicesManager
    }, componentProps));
    return /*#__PURE__*/react.createElement("div", {
      key: id
    }, tool);
  }));
}
;// CONCATENATED MODULE: ../../../extensions/default/src/hooks/usePatientInfo.tsx


const {
  formatPN,
  formatDate
} = src/* utils */.Wp;
function usePatientInfo(servicesManager) {
  const {
    displaySetService
  } = servicesManager.services;
  const [patientInfo, setPatientInfo] = (0,react.useState)({
    PatientName: '',
    PatientID: '',
    PatientSex: '',
    PatientDOB: ''
  });
  const [isMixedPatients, setIsMixedPatients] = (0,react.useState)(false);
  const displaySets = displaySetService.getActiveDisplaySets();
  const checkMixedPatients = PatientID => {
    const displaySets = displaySetService.getActiveDisplaySets();
    let isMixedPatients = false;
    displaySets.forEach(displaySet => {
      const instance = displaySet?.instances?.[0] || displaySet?.instance;
      if (!instance) {
        return;
      }
      if (instance.PatientID !== PatientID) {
        isMixedPatients = true;
      }
    });
    setIsMixedPatients(isMixedPatients);
  };
  const updatePatientInfo = () => {
    const displaySet = displaySets[0];
    const instance = displaySet?.instances?.[0] || displaySet?.instance;
    if (!instance) {
      return;
    }
    setPatientInfo({
      PatientID: instance.PatientID || null,
      PatientName: instance.PatientName ? formatPN(instance.PatientName.Alphabetic) : null,
      PatientSex: instance.PatientSex || null,
      PatientDOB: formatDate(instance.PatientBirthDate) || null
    });
    checkMixedPatients(instance.PatientID || null);
  };
  (0,react.useEffect)(() => {
    const subscription = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_ADDED, () => updatePatientInfo());
    return () => subscription.unsubscribe();
  }, []);
  (0,react.useEffect)(() => {
    updatePatientInfo();
  }, [displaySets]);
  return {
    patientInfo,
    isMixedPatients
  };
}
/* harmony default export */ const hooks_usePatientInfo = (usePatientInfo);
;// CONCATENATED MODULE: ../../../extensions/default/src/ViewerLayout/HeaderPatientInfo/HeaderPatientInfo.tsx



let PatientInfoVisibility = /*#__PURE__*/function (PatientInfoVisibility) {
  PatientInfoVisibility["VISIBLE"] = "visible";
  PatientInfoVisibility["VISIBLE_COLLAPSED"] = "visibleCollapsed";
  PatientInfoVisibility["DISABLED"] = "disabled";
  PatientInfoVisibility["VISIBLE_READONLY"] = "visibleReadOnly";
  return PatientInfoVisibility;
}({});
const formatWithEllipsis = (str, maxLength) => {
  if (str?.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  }
  return str;
};
function HeaderPatientInfo({
  servicesManager,
  appConfig
}) {
  const initialExpandedState = appConfig.showPatientInfo === PatientInfoVisibility.VISIBLE || appConfig.showPatientInfo === PatientInfoVisibility.VISIBLE_READONLY;
  const [expanded, setExpanded] = (0,react.useState)(initialExpandedState);
  const {
    patientInfo,
    isMixedPatients
  } = hooks_usePatientInfo(servicesManager);
  (0,react.useEffect)(() => {
    if (isMixedPatients && expanded) {
      setExpanded(false);
    }
  }, [isMixedPatients, expanded]);
  const handleOnClick = () => {
    if (!isMixedPatients && appConfig.showPatientInfo !== PatientInfoVisibility.VISIBLE_READONLY) {
      setExpanded(!expanded);
    }
  };
  const formattedPatientName = formatWithEllipsis(patientInfo.PatientName, 27);
  const formattedPatientID = formatWithEllipsis(patientInfo.PatientID, 15);
  return /*#__PURE__*/react.createElement("div", {
    className: "hover:bg-primary-dark flex cursor-pointer items-center justify-center gap-1 rounded-lg",
    onClick: handleOnClick
  }, isMixedPatients ? /*#__PURE__*/react.createElement(ui_next_src/* Icons */.FI.MultiplePatients, {
    className: "text-primary-active"
  }) : /*#__PURE__*/react.createElement(ui_next_src/* Icons */.FI.Patient, {
    className: "text-primary-active"
  }), /*#__PURE__*/react.createElement("div", {
    className: "flex flex-col justify-center"
  }, expanded ? /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
    className: "self-start text-[13px] font-bold text-white"
  }, formattedPatientName), /*#__PURE__*/react.createElement("div", {
    className: "text-aqua-pale flex gap-2 text-[11px]"
  }, /*#__PURE__*/react.createElement("div", null, formattedPatientID), /*#__PURE__*/react.createElement("div", null, patientInfo.PatientSex), /*#__PURE__*/react.createElement("div", null, patientInfo.PatientDOB))) : /*#__PURE__*/react.createElement("div", {
    className: "text-primary-active self-center text-[13px]"
  }, isMixedPatients ? 'Multiple Patients' : 'Patient')), /*#__PURE__*/react.createElement(ui_next_src/* Icons */.FI.ChevronPatient, {
    className: `text-primary-active ${expanded ? 'rotate-180' : ''}`
  }));
}
/* harmony default export */ const HeaderPatientInfo_HeaderPatientInfo = (HeaderPatientInfo);
;// CONCATENATED MODULE: ../../../extensions/default/src/ViewerLayout/HeaderPatientInfo/index.js

/* harmony default export */ const ViewerLayout_HeaderPatientInfo = (HeaderPatientInfo_HeaderPatientInfo);
;// CONCATENATED MODULE: ../../../extensions/default/src/ViewerLayout/ViewerHeader.tsx











const {
  availableLanguages,
  defaultLanguage,
  currentLanguage
} = i18n_src/* default */.A;
function ViewerHeader({
  hotkeysManager,
  extensionManager,
  servicesManager,
  appConfig
}) {
  const navigate = (0,dist/* useNavigate */.Zp)();
  const location = (0,react_router_dist/* useLocation */.zy)();
  const onClickReturnButton = () => {
    const {
      pathname
    } = location;
    const dataSourceIdx = pathname.indexOf('/', 1);
    const query = new URLSearchParams(window.location.search);
    const configUrl = query.get('configUrl');
    const dataSourceName = pathname.substring(dataSourceIdx + 1);
    const existingDataSource = extensionManager.getDataSources(dataSourceName);
    const searchQuery = new URLSearchParams();
    if (dataSourceIdx !== -1 && existingDataSource) {
      searchQuery.append('datasources', pathname.substring(dataSourceIdx + 1));
    }
    if (configUrl) {
      searchQuery.append('configUrl', configUrl);
    }
    navigate({
      pathname: '/',
      search: decodeURIComponent(searchQuery.toString())
    });
  };
  const {
    t
  } = (0,es/* useTranslation */.Bd)();
  const {
    show,
    hide
  } = (0,ui_src/* useModal */.hS)();
  const {
    hotkeyDefinitions,
    hotkeyDefaults
  } = hotkeysManager;
  const versionNumber = "3.10.0-beta.5";
  const commitHash = "32fe2623cfb5129a19ee07031dd50e79b530c7e0";
  const menuOptions = [{
    title: t('Header:About'),
    icon: 'info',
    onClick: () => show({
      content: ui_src/* AboutModal */.VT,
      title: t('AboutModal:About OHIF Viewer'),
      contentProps: {
        versionNumber,
        commitHash
      },
      containerDimensions: 'max-w-4xl max-h-4xl'
    })
  }, {
    title: t('Header:Preferences'),
    icon: 'settings',
    onClick: () => show({
      title: t('UserPreferencesModal:User preferences'),
      content: ui_src/* UserPreferences */.im,
      containerDimensions: 'w-[70%] max-w-[900px]',
      contentProps: {
        hotkeyDefaults: hotkeysManager.getValidHotkeyDefinitions(hotkeyDefaults),
        hotkeyDefinitions,
        currentLanguage: currentLanguage(),
        availableLanguages,
        defaultLanguage,
        onCancel: () => {
          src/* hotkeys */.ot.stopRecord();
          src/* hotkeys */.ot.unpause();
          hide();
        },
        onSubmit: ({
          hotkeyDefinitions,
          language
        }) => {
          if (language.value !== currentLanguage().value) {
            i18n_src/* default */.A.changeLanguage(language.value);
          }
          hotkeysManager.setHotkeys(hotkeyDefinitions);
          hide();
        },
        onReset: () => hotkeysManager.restoreDefaultBindings(),
        hotkeysModule: src/* hotkeys */.ot
      }
    })
  }];
  if (appConfig.oidc) {
    menuOptions.push({
      title: t('Header:Logout'),
      icon: 'power-off',
      onClick: async () => {
        navigate(`/logout?redirect_uri=${encodeURIComponent(window.location.href)}`);
      }
    });
  }
  return /*#__PURE__*/react.createElement(ui_next_src/* Header */.Y9, {
    menuOptions: menuOptions,
    isReturnEnabled: !!appConfig.showStudyList,
    onClickReturnButton: onClickReturnButton,
    WhiteLabeling: appConfig.whiteLabeling,
    Secondary: /*#__PURE__*/react.createElement(Toolbar, {
      servicesManager: servicesManager,
      buttonSection: "secondary"
    }),
    PatientInfo: appConfig.showPatientInfo !== PatientInfoVisibility.DISABLED && /*#__PURE__*/react.createElement(ViewerLayout_HeaderPatientInfo, {
      servicesManager: servicesManager,
      appConfig: appConfig
    })
  }, /*#__PURE__*/react.createElement("div", {
    className: "relative flex justify-center gap-[4px]"
  }, /*#__PURE__*/react.createElement(Toolbar, {
    servicesManager: servicesManager
  })));
}
/* harmony default export */ const ViewerLayout_ViewerHeader = (ViewerHeader);
;// CONCATENATED MODULE: ../../../extensions/default/src/Components/SidePanelWithServices.tsx
function SidePanelWithServices_extends() { return SidePanelWithServices_extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, SidePanelWithServices_extends.apply(null, arguments); }


const SidePanelWithServices = ({
  servicesManager,
  side,
  activeTabIndex: activeTabIndexProp,
  tabs: tabsProp,
  expandedWidth,
  ...props
}) => {
  const panelService = servicesManager?.services?.panelService;

  // Tracks whether this SidePanel has been opened at least once since this SidePanel was inserted into the DOM.
  // Thus going to the Study List page and back to the viewer resets this flag for a SidePanel.
  const [sidePanelOpen, setSidePanelOpen] = (0,react.useState)(activeTabIndexProp !== null);
  const [activeTabIndex, setActiveTabIndex] = (0,react.useState)(activeTabIndexProp);
  const [tabs, setTabs] = (0,react.useState)(tabsProp ?? panelService.getPanels(side));
  const handleActiveTabIndexChange = (0,react.useCallback)(({
    activeTabIndex
  }) => {
    setActiveTabIndex(activeTabIndex);
    setSidePanelOpen(activeTabIndex !== null);
  }, []);
  const handleOpen = (0,react.useCallback)(() => {
    setSidePanelOpen(true);
    // If panel is being opened but no tab is active, set first tab as active
    if (activeTabIndex === null && tabs.length > 0) {
      setActiveTabIndex(0);
    }
  }, [activeTabIndex, tabs]);
  const handleClose = (0,react.useCallback)(() => {
    setSidePanelOpen(false);
    setActiveTabIndex(null);
  }, []);

  /** update the active tab index from outside */
  (0,react.useEffect)(() => {
    setActiveTabIndex(activeTabIndexProp);
  }, [activeTabIndexProp]);
  (0,react.useEffect)(() => {
    const {
      unsubscribe
    } = panelService.subscribe(panelService.EVENTS.PANELS_CHANGED, panelChangedEvent => {
      if (panelChangedEvent.position !== side) {
        return;
      }
      setTabs(panelService.getPanels(side));
    });
    return () => {
      unsubscribe();
    };
  }, [panelService, side]);
  (0,react.useEffect)(() => {
    const activatePanelSubscription = panelService.subscribe(panelService.EVENTS.ACTIVATE_PANEL, activatePanelEvent => {
      if (sidePanelOpen || activatePanelEvent.forceActive) {
        const tabIndex = tabs.findIndex(tab => tab.id === activatePanelEvent.panelId);
        if (tabIndex !== -1) {
          setActiveTabIndex(tabIndex);
        }
      }
    });
    return () => {
      activatePanelSubscription.unsubscribe();
    };
  }, [tabs, sidePanelOpen, panelService]);
  return /*#__PURE__*/react.createElement(ui_next_src/* SidePanel */.d_, SidePanelWithServices_extends({}, props, {
    side: side,
    tabs: tabs,
    activeTabIndex: activeTabIndex,
    onOpen: handleOpen,
    onClose: handleClose,
    onActiveTabIndexChange: handleActiveTabIndexChange,
    expandedWidth: expandedWidth
  }));
};
/* harmony default export */ const Components_SidePanelWithServices = (SidePanelWithServices);
;// CONCATENATED MODULE: ../../../extensions/default/src/ViewerLayout/index.tsx








function ViewerLayout({
  // From Extension Module Params
  extensionManager,
  servicesManager,
  hotkeysManager,
  commandsManager,
  // From Modes
  viewports,
  ViewportGridComp,
  leftPanelClosed = false,
  rightPanelClosed = false
}) {
  const [appConfig] = (0,state/* useAppConfig */.r)();
  const {
    panelService,
    hangingProtocolService
  } = servicesManager.services;
  const [showLoadingIndicator, setShowLoadingIndicator] = (0,react.useState)(appConfig.showLoadingIndicator);
  const hasPanels = (0,react.useCallback)(side => !!panelService.getPanels(side).length, [panelService]);
  const [hasRightPanels, setHasRightPanels] = (0,react.useState)(hasPanels('right'));
  const [hasLeftPanels, setHasLeftPanels] = (0,react.useState)(hasPanels('left'));
  const [leftPanelClosedState, setLeftPanelClosed] = (0,react.useState)(leftPanelClosed);
  const [rightPanelClosedState, setRightPanelClosed] = (0,react.useState)(rightPanelClosed);

  /**
   * Set body classes (tailwindcss) that don't allow vertical
   * or horizontal overflow (no scrolling). Also guarantee window
   * is sized to our viewport.
   */
  (0,react.useEffect)(() => {
    document.body.classList.add('bg-black');
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('bg-black');
      document.body.classList.remove('overflow-hidden');
    };
  }, []);
  const getComponent = id => {
    const entry = extensionManager.getModuleEntry(id);
    if (!entry || !entry.component) {
      throw new Error(`${id} is not valid for an extension module or no component found from extension ${id}. Please verify your configuration or ensure that the extension is properly registered. It's also possible that your mode is utilizing a module from an extension that hasn't been included in its dependencies (add the extension to the "extensionDependencies" array in your mode's index.js file). Check the reference string to the extension in your Mode configuration`);
    }
    return {
      entry,
      content: entry.component
    };
  };
  (0,react.useEffect)(() => {
    const {
      unsubscribe
    } = hangingProtocolService.subscribe(src/* HangingProtocolService */.Qe.EVENTS.PROTOCOL_CHANGED,
    // Todo: right now to set the loading indicator to false, we need to wait for the
    // hangingProtocolService to finish applying the viewport matching to each viewport,
    // however, this might not be the only approach to set the loading indicator to false. we need to explore this further.
    () => {
      setShowLoadingIndicator(false);
    });
    return () => {
      unsubscribe();
    };
  }, [hangingProtocolService]);
  const getViewportComponentData = viewportComponent => {
    const {
      entry
    } = getComponent(viewportComponent.namespace);
    return {
      component: entry.component,
      displaySetsToDisplay: viewportComponent.displaySetsToDisplay
    };
  };
  (0,react.useEffect)(() => {
    const {
      unsubscribe
    } = panelService.subscribe(panelService.EVENTS.PANELS_CHANGED, ({
      options
    }) => {
      setHasLeftPanels(hasPanels('left'));
      setHasRightPanels(hasPanels('right'));
      if (options?.leftPanelClosed !== undefined) {
        setLeftPanelClosed(options.leftPanelClosed);
      }
      if (options?.rightPanelClosed !== undefined) {
        setRightPanelClosed(options.rightPanelClosed);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [panelService, hasPanels]);
  const viewportComponents = viewports.map(getViewportComponentData);
  return /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement(ViewerLayout_ViewerHeader, {
    hotkeysManager: hotkeysManager,
    extensionManager: extensionManager,
    servicesManager: servicesManager,
    appConfig: appConfig
  }), /*#__PURE__*/react.createElement("div", {
    className: "relative flex w-full flex-row flex-nowrap items-stretch overflow-hidden bg-black",
    style: {
      height: 'calc(100vh - 52px'
    }
  }, /*#__PURE__*/react.createElement(react.Fragment, null, showLoadingIndicator && /*#__PURE__*/react.createElement(ui_src/* LoadingIndicatorProgress */.Jx, {
    className: "h-full w-full bg-black"
  }), hasLeftPanels ? /*#__PURE__*/react.createElement(Components_SidePanelWithServices, {
    side: "left",
    activeTabIndex: leftPanelClosedState ? null : 0,
    servicesManager: servicesManager
  }) : null, /*#__PURE__*/react.createElement("div", {
    className: "flex h-full flex-1 flex-col"
  }, /*#__PURE__*/react.createElement("div", {
    className: "relative flex h-full flex-1 items-center justify-center overflow-hidden bg-black"
  }, /*#__PURE__*/react.createElement(ViewportGridComp, {
    servicesManager: servicesManager,
    viewportComponents: viewportComponents,
    commandsManager: commandsManager
  }))), hasRightPanels ? /*#__PURE__*/react.createElement(Components_SidePanelWithServices, {
    side: "right",
    activeTabIndex: rightPanelClosedState ? null : 0,
    servicesManager: servicesManager
  }) : null)), /*#__PURE__*/react.createElement(ui_next_src/* Onboarding */.M7, null), /*#__PURE__*/react.createElement(ui_src/* InvestigationalUseDialog */.j, {
    dialogConfiguration: appConfig?.investigationalUseDialog
  }));
}
ViewerLayout.propTypes = {
  // From extension module params
  extensionManager: prop_types_default().shape({
    getModuleEntry: (prop_types_default()).func.isRequired
  }).isRequired,
  commandsManager: prop_types_default().instanceOf(src/* CommandsManager */.Sp),
  servicesManager: (prop_types_default()).object.isRequired,
  // From modes
  leftPanels: (prop_types_default()).array,
  rightPanels: (prop_types_default()).array,
  leftPanelClosed: (prop_types_default()).bool.isRequired,
  rightPanelClosed: (prop_types_default()).bool.isRequired,
  /** Responsible for rendering our grid of viewports; provided by consuming application */
  children: prop_types_default().oneOfType([(prop_types_default()).node, (prop_types_default()).func]).isRequired,
  viewports: (prop_types_default()).array
};
/* harmony default export */ const src_ViewerLayout = (ViewerLayout);
;// CONCATENATED MODULE: ../../../extensions/default/src/getLayoutTemplateModule.js

/*
- Define layout for the viewer in mode configuration.
- Pass in the viewport types that can populate the viewer.
- Init layout based on the displaySets and the objects.
*/

/* harmony default export */ function getLayoutTemplateModule({
  servicesManager,
  extensionManager,
  commandsManager,
  hotkeysManager
}) {
  function ViewerLayoutWithServices(props) {
    return src_ViewerLayout({
      servicesManager,
      extensionManager,
      commandsManager,
      hotkeysManager,
      ...props
    });
  }
  return [
  // Layout Template Definition
  // TODO: this is weird naming
  {
    name: 'viewerLayout',
    id: 'viewerLayout',
    component: ViewerLayoutWithServices
  }];
}
;// CONCATENATED MODULE: ../../../extensions/default/src/Panels/StudyBrowser/PanelStudyBrowserHeader.tsx



function PanelStudyBrowserHeader({
  viewPresets,
  updateViewPresetValue,
  actionIcons,
  updateActionIconValue
}) {
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
    className: "bg-muted flex h-[40px] select-none rounded-t p-2"
  }, /*#__PURE__*/react.createElement("div", {
    className: 'flex h-[24px] w-full select-none justify-center self-center text-[14px]'
  }, /*#__PURE__*/react.createElement("div", {
    className: "flex w-full items-center gap-[10px]"
  }, /*#__PURE__*/react.createElement("div", {
    className: "flex items-center justify-center"
  }, /*#__PURE__*/react.createElement("div", {
    className: "text-primary-active flex items-center space-x-1"
  }, actionIcons.map((icon, index) => /*#__PURE__*/react.createElement(ui_next_src/* Icons */.FI[icon.iconName] || ui_next_src/* Icons */.FI.MissingIcon, {
    key: index,
    onClick: () => updateActionIconValue(icon),
    className: `cursor-pointer`
  })))), /*#__PURE__*/react.createElement("div", {
    className: "ml-auto flex h-full items-center justify-center"
  }, /*#__PURE__*/react.createElement(ui_next_src/* ToggleGroup */.OY, {
    type: "single",
    value: viewPresets.filter(preset => preset.selected)[0].id,
    onValueChange: value => {
      const selectedViewPreset = viewPresets.find(preset => preset.id === value);
      updateViewPresetValue(selectedViewPreset);
    }
  }, viewPresets.map((viewPreset, index) => /*#__PURE__*/react.createElement(ui_next_src/* ToggleGroupItem */.dz, {
    key: index,
    "aria-label": viewPreset.id,
    value: viewPreset.id,
    className: "text-actions-primary"
  }, /*#__PURE__*/react.createElement(ui_next_src/* Icons */.FI[viewPreset.iconName] || ui_next_src/* Icons */.FI.MissingIcon)))))))));
}

;// CONCATENATED MODULE: ../../../extensions/default/src/Panels/StudyBrowser/constants/actionIcons.ts
const defaultActionIcons = [{
  id: 'settings',
  iconName: 'Settings',
  value: false
}];

;// CONCATENATED MODULE: ../../../extensions/default/src/Panels/StudyBrowser/constants/viewPresets.ts
const defaultViewPresets = [{
  id: 'list',
  iconName: 'ListView',
  selected: false
}, {
  id: 'thumbnails',
  iconName: 'ThumbnailView',
  selected: true
}];

;// CONCATENATED MODULE: ../../../extensions/default/src/Panels/StudyBrowser/constants/index.ts



;// CONCATENATED MODULE: ../../../extensions/default/src/Panels/StudyBrowser/PanelStudyBrowser.tsx








const {
  sortStudyInstances,
  formatDate: PanelStudyBrowser_formatDate,
  createStudyBrowserTabs
} = src/* utils */.Wp;

/**
 *
 * @param {*} param0
 */
function PanelStudyBrowser({
  servicesManager,
  getImageSrc,
  getStudiesForPatientByMRN,
  requestDisplaySetCreationForStudy,
  dataSource,
  commandsManager
}) {
  const {
    hangingProtocolService,
    displaySetService,
    uiNotificationService,
    customizationService
  } = servicesManager.services;
  const navigate = (0,dist/* useNavigate */.Zp)();

  // Normally you nest the components so the tree isn't so deep, and the data
  // doesn't have to have such an intense shape. This works well enough for now.
  // Tabs --> Studies --> DisplaySets --> Thumbnails
  const {
    StudyInstanceUIDs
  } = (0,ui_src/* useImageViewer */.Bz)();
  const [{
    activeViewportId,
    viewports,
    isHangingProtocolLayout
  }, viewportGridService] = (0,ui_src/* useViewportGrid */.ih)();
  const [activeTabName, setActiveTabName] = (0,react.useState)('all');
  const [expandedStudyInstanceUIDs, setExpandedStudyInstanceUIDs] = (0,react.useState)([...StudyInstanceUIDs]);
  const [hasLoadedViewports, setHasLoadedViewports] = (0,react.useState)(false);
  const [studyDisplayList, setStudyDisplayList] = (0,react.useState)([]);
  const [displaySets, setDisplaySets] = (0,react.useState)([]);
  const [thumbnailImageSrcMap, setThumbnailImageSrcMap] = (0,react.useState)({});
  const [viewPresets, setViewPresets] = (0,react.useState)(customizationService.getCustomization('studyBrowser.viewPresets')?.value || defaultViewPresets);
  const [actionIcons, setActionIcons] = (0,react.useState)(defaultActionIcons);

  // multiple can be true or false
  const updateActionIconValue = actionIcon => {
    actionIcon.value = !actionIcon.value;
    const newActionIcons = [...actionIcons];
    setActionIcons(newActionIcons);
  };

  // only one is true at a time
  const updateViewPresetValue = viewPreset => {
    if (!viewPreset) {
      return;
    }
    const newViewPresets = viewPresets.map(preset => {
      preset.selected = preset.id === viewPreset.id;
      return preset;
    });
    setViewPresets(newViewPresets);
  };
  const onDoubleClickThumbnailHandler = displaySetInstanceUID => {
    let updatedViewports = [];
    const viewportId = activeViewportId;
    try {
      updatedViewports = hangingProtocolService.getViewportsRequireUpdate(viewportId, displaySetInstanceUID, isHangingProtocolLayout);
    } catch (error) {
      console.warn(error);
      uiNotificationService.show({
        title: 'Thumbnail Double Click',
        message: 'The selected display sets could not be added to the viewport.',
        type: 'error',
        duration: 3000
      });
    }
    viewportGridService.setDisplaySetsForViewports(updatedViewports);
  };

  // ~~ studyDisplayList
  (0,react.useEffect)(() => {
    // Fetch all studies for the patient in each primary study
    async function fetchStudiesForPatient(StudyInstanceUID) {
      // current study qido
      const qidoForStudyUID = await dataSource.query.studies.search({
        studyInstanceUid: StudyInstanceUID
      });
      if (!qidoForStudyUID?.length) {
        navigate('/notfoundstudy', '_self');
        throw new Error('Invalid study URL');
      }
      let qidoStudiesForPatient = qidoForStudyUID;

      // try to fetch the prior studies based on the patientID if the
      // server can respond.
      try {
        qidoStudiesForPatient = await getStudiesForPatientByMRN(qidoForStudyUID);
      } catch (error) {
        console.warn(error);
      }
      const mappedStudies = _mapDataSourceStudies(qidoStudiesForPatient);
      const actuallyMappedStudies = mappedStudies.map(qidoStudy => {
        return {
          studyInstanceUid: qidoStudy.StudyInstanceUID,
          date: PanelStudyBrowser_formatDate(qidoStudy.StudyDate),
          description: qidoStudy.StudyDescription,
          modalities: qidoStudy.ModalitiesInStudy,
          numInstances: qidoStudy.NumInstances
        };
      });
      setStudyDisplayList(prevArray => {
        const ret = [...prevArray];
        for (const study of actuallyMappedStudies) {
          if (!prevArray.find(it => it.studyInstanceUid === study.studyInstanceUid)) {
            ret.push(study);
          }
        }
        return ret;
      });
    }
    StudyInstanceUIDs.forEach(sid => fetchStudiesForPatient(sid));
  }, [StudyInstanceUIDs, dataSource, getStudiesForPatientByMRN, navigate]);

  // // ~~ Initial Thumbnails
  (0,react.useEffect)(() => {
    if (!hasLoadedViewports) {
      if (activeViewportId) {
        // Once there is an active viewport id, it means the layout is ready
        // so wait a bit of time to allow the viewports preferential loading
        // which improves user experience of responsiveness significantly on slower
        // systems.
        window.setTimeout(() => setHasLoadedViewports(true), 250);
      }
      return;
    }
    const currentDisplaySets = displaySetService.activeDisplaySets;
    currentDisplaySets.forEach(async dSet => {
      const newImageSrcEntry = {};
      const displaySet = displaySetService.getDisplaySetByUID(dSet.displaySetInstanceUID);
      const imageIds = dataSource.getImageIdsForDisplaySet(displaySet);
      const imageId = imageIds[Math.floor(imageIds.length / 2)];

      // TODO: Is it okay that imageIds are not returned here for SR displaySets?
      if (!imageId || displaySet?.unsupported) {
        return;
      }
      // When the image arrives, render it and store the result in the thumbnailImgSrcMap
      newImageSrcEntry[dSet.displaySetInstanceUID] = await getImageSrc(imageId);
      setThumbnailImageSrcMap(prevState => {
        return {
          ...prevState,
          ...newImageSrcEntry
        };
      });
    });
  }, [StudyInstanceUIDs, dataSource, displaySetService, getImageSrc, hasLoadedViewports, activeViewportId]);

  // ~~ displaySets
  (0,react.useEffect)(() => {
    // TODO: Are we sure `activeDisplaySets` will always be accurate?
    const currentDisplaySets = displaySetService.activeDisplaySets;
    const mappedDisplaySets = _mapDisplaySets(currentDisplaySets, thumbnailImageSrcMap);
    sortStudyInstances(mappedDisplaySets);
    setDisplaySets(mappedDisplaySets);
  }, [StudyInstanceUIDs, thumbnailImageSrcMap, displaySetService]);

  // ~~ subscriptions --> displaySets
  (0,react.useEffect)(() => {
    // DISPLAY_SETS_ADDED returns an array of DisplaySets that were added
    const SubscriptionDisplaySetsAdded = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_ADDED, data => {
      // for some reason this breaks thumbnail loading
      // if (!hasLoadedViewports) {
      //   return;
      // }
      const {
        displaySetsAdded
      } = data;
      displaySetsAdded.forEach(async dSet => {
        const newImageSrcEntry = {};
        const displaySet = displaySetService.getDisplaySetByUID(dSet.displaySetInstanceUID);
        if (displaySet?.unsupported) {
          return;
        }
        const imageIds = dataSource.getImageIdsForDisplaySet(displaySet);
        const imageId = imageIds[Math.floor(imageIds.length / 2)];

        // TODO: Is it okay that imageIds are not returned here for SR displaysets?
        if (!imageId) {
          return;
        }
        // When the image arrives, render it and store the result in the thumbnailImgSrcMap
        newImageSrcEntry[dSet.displaySetInstanceUID] = await getImageSrc(imageId, dSet.initialViewport);
        setThumbnailImageSrcMap(prevState => {
          return {
            ...prevState,
            ...newImageSrcEntry
          };
        });
      });
    });
    return () => {
      SubscriptionDisplaySetsAdded.unsubscribe();
    };
  }, [getImageSrc, dataSource, displaySetService]);
  (0,react.useEffect)(() => {
    // TODO: Will this always hold _all_ the displaySets we care about?
    // DISPLAY_SETS_CHANGED returns `DisplaySerService.activeDisplaySets`
    const SubscriptionDisplaySetsChanged = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SETS_CHANGED, changedDisplaySets => {
      const mappedDisplaySets = _mapDisplaySets(changedDisplaySets, thumbnailImageSrcMap);
      setDisplaySets(mappedDisplaySets);
    });
    const SubscriptionDisplaySetMetaDataInvalidated = displaySetService.subscribe(displaySetService.EVENTS.DISPLAY_SET_SERIES_METADATA_INVALIDATED, () => {
      const mappedDisplaySets = _mapDisplaySets(displaySetService.getActiveDisplaySets(), thumbnailImageSrcMap);
      setDisplaySets(mappedDisplaySets);
    });
    return () => {
      SubscriptionDisplaySetsChanged.unsubscribe();
      SubscriptionDisplaySetMetaDataInvalidated.unsubscribe();
    };
  }, [StudyInstanceUIDs, thumbnailImageSrcMap, displaySetService]);
  const tabs = createStudyBrowserTabs(StudyInstanceUIDs, studyDisplayList, displaySets);

  // TODO: Should not fire this on "close"
  function _handleStudyClick(StudyInstanceUID) {
    const shouldCollapseStudy = expandedStudyInstanceUIDs.includes(StudyInstanceUID);
    const updatedExpandedStudyInstanceUIDs = shouldCollapseStudy ?
    // eslint-disable-next-line prettier/prettier
    [...expandedStudyInstanceUIDs.filter(stdyUid => stdyUid !== StudyInstanceUID)] : [...expandedStudyInstanceUIDs, StudyInstanceUID];
    setExpandedStudyInstanceUIDs(updatedExpandedStudyInstanceUIDs);
    if (!shouldCollapseStudy) {
      const madeInClient = true;
      requestDisplaySetCreationForStudy(displaySetService, StudyInstanceUID, madeInClient);
    }
  }
  const activeDisplaySetInstanceUIDs = viewports.get(activeViewportId)?.displaySetInstanceUIDs;
  const onThumbnailContextMenu = (commandName, options) => {
    commandsManager.runCommand(commandName, options);
  };
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement(PanelStudyBrowserHeader, {
    viewPresets: viewPresets,
    updateViewPresetValue: updateViewPresetValue,
    actionIcons: actionIcons,
    updateActionIconValue: updateActionIconValue
  }), /*#__PURE__*/react.createElement(ui_next_src/* Separator */.wv, {
    orientation: "horizontal",
    className: "bg-black",
    thickness: "2px"
  })), /*#__PURE__*/react.createElement(ui_next_src/* StudyBrowser */.M4, {
    tabs: tabs,
    servicesManager: servicesManager,
    activeTabName: activeTabName,
    onDoubleClickThumbnail: onDoubleClickThumbnailHandler,
    activeDisplaySetInstanceUIDs: activeDisplaySetInstanceUIDs,
    expandedStudyInstanceUIDs: expandedStudyInstanceUIDs,
    onClickStudy: _handleStudyClick,
    onClickTab: clickedTabName => {
      setActiveTabName(clickedTabName);
    },
    showSettings: actionIcons.find(icon => icon.id === 'settings').value,
    viewPresets: viewPresets,
    onThumbnailContextMenu: onThumbnailContextMenu
  }));
}
/* harmony default export */ const StudyBrowser_PanelStudyBrowser = (PanelStudyBrowser);

/**
 * Maps from the DataSource's format to a naturalized object
 *
 * @param {*} studies
 */
function _mapDataSourceStudies(studies) {
  return studies.map(study => {
    // TODO: Why does the data source return in this format?
    return {
      AccessionNumber: study.accession,
      StudyDate: study.date,
      StudyDescription: study.description,
      NumInstances: study.instances,
      ModalitiesInStudy: study.modalities,
      PatientID: study.mrn,
      PatientName: study.patientName,
      StudyInstanceUID: study.studyInstanceUid,
      StudyTime: study.time
    };
  });
}
function _mapDisplaySets(displaySets, thumbnailImageSrcMap) {
  const thumbnailDisplaySets = [];
  const thumbnailNoImageDisplaySets = [];
  displaySets.filter(ds => !ds.excludeFromThumbnailBrowser).forEach(ds => {
    const imageSrc = thumbnailImageSrcMap[ds.displaySetInstanceUID];
    const componentType = _getComponentType(ds);
    const array = componentType === 'thumbnail' ? thumbnailDisplaySets : thumbnailNoImageDisplaySets;
    array.push({
      displaySetInstanceUID: ds.displaySetInstanceUID,
      description: ds.SeriesDescription || '',
      seriesNumber: ds.SeriesNumber,
      modality: ds.Modality,
      seriesDate: ds.SeriesDate,
      seriesTime: ds.SeriesTime,
      numInstances: ds.numImageFrames,
      countIcon: ds.countIcon,
      StudyInstanceUID: ds.StudyInstanceUID,
      messages: ds.messages,
      componentType,
      imageSrc,
      dragData: {
        type: 'displayset',
        displaySetInstanceUID: ds.displaySetInstanceUID
        // .. Any other data to pass
      },
      isHydratedForDerivedDisplaySet: ds.isHydrated
    });
  });
  return [...thumbnailDisplaySets, ...thumbnailNoImageDisplaySets];
}
const thumbnailNoImageModalities = ['SR', 'SEG', 'SM', 'RTSTRUCT', 'RTPLAN', 'RTDOSE'];
function _getComponentType(ds) {
  if (thumbnailNoImageModalities.includes(ds.Modality) || ds?.unsupported) {
    // TODO probably others.
    return 'thumbnailNoImage';
  }
  return 'thumbnail';
}
;// CONCATENATED MODULE: ../../../extensions/default/src/Panels/getImageSrcFromImageId.js
/**
 * @param {*} cornerstone
 * @param {*} imageId
 */
function getImageSrcFromImageId(cornerstone, imageId) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    cornerstone.utilities.loadImageToCanvas({
      canvas,
      imageId,
      thumbnail: true
    }).then(imageId => {
      resolve(canvas.toDataURL());
    }).catch(reject);
  });
}
/* harmony default export */ const Panels_getImageSrcFromImageId = (getImageSrcFromImageId);
;// CONCATENATED MODULE: ../../../extensions/default/src/Panels/getStudiesForPatientByMRN.js
async function getStudiesForPatientByMRN(dataSource, qidoForStudyUID) {
  if (qidoForStudyUID && qidoForStudyUID.length && qidoForStudyUID[0].mrn) {
    return dataSource.query.studies.search({
      patientId: qidoForStudyUID[0].mrn,
      disableWildcard: true
    });
  }
  console.log('No mrn found for', qidoForStudyUID);
  return qidoForStudyUID;
}
/* harmony default export */ const Panels_getStudiesForPatientByMRN = (getStudiesForPatientByMRN);
;// CONCATENATED MODULE: ../../../extensions/default/src/Panels/requestDisplaySetCreationForStudy.js
function requestDisplaySetCreationForStudy(dataSource, displaySetService, StudyInstanceUID, madeInClient) {
  // TODO: is this already short-circuited by the map of Retrieve promises?
  if (displaySetService.activeDisplaySets.some(displaySet => displaySet.StudyInstanceUID === StudyInstanceUID)) {
    return;
  }
  dataSource.retrieve.series.metadata({
    StudyInstanceUID,
    madeInClient
  });
}
/* harmony default export */ const Panels_requestDisplaySetCreationForStudy = (requestDisplaySetCreationForStudy);
;// CONCATENATED MODULE: ../../../extensions/default/src/Panels/WrappedPanelStudyBrowser.tsx


//





/**
 * Wraps the PanelStudyBrowser and provides features afforded by managers/services
 *
 * @param {object} params
 * @param {object} commandsManager
 * @param {object} extensionManager
 */
function WrappedPanelStudyBrowser({
  commandsManager,
  extensionManager,
  servicesManager
}) {
  // TODO: This should be made available a different way; route should have
  // already determined our datasource
  const dataSource = extensionManager.getDataSources()[0];
  const _getStudiesForPatientByMRN = Panels_getStudiesForPatientByMRN.bind(null, dataSource);
  const _getImageSrcFromImageId = (0,react.useCallback)(_createGetImageSrcFromImageIdFn(extensionManager), []);
  const _requestDisplaySetCreationForStudy = Panels_requestDisplaySetCreationForStudy.bind(null, dataSource);
  return /*#__PURE__*/react.createElement(StudyBrowser_PanelStudyBrowser, {
    servicesManager: servicesManager,
    dataSource: dataSource,
    getImageSrc: _getImageSrcFromImageId,
    getStudiesForPatientByMRN: _getStudiesForPatientByMRN,
    requestDisplaySetCreationForStudy: _requestDisplaySetCreationForStudy
  });
}

/**
 * Grabs cornerstone library reference using a dependent command from
 * the @ohif/extension-cornerstone extension. Then creates a helper function
 * that can take an imageId and return an image src.
 *
 * @param {func} getCommand - CommandManager's getCommand method
 * @returns {func} getImageSrcFromImageId - A utility function powered by
 * cornerstone
 */
function _createGetImageSrcFromImageIdFn(extensionManager) {
  const utilities = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.common');
  try {
    const {
      cornerstone
    } = utilities.exports.getCornerstoneLibraries();
    return Panels_getImageSrcFromImageId.bind(null, cornerstone);
  } catch (ex) {
    throw new Error('Required command not found');
  }
}
WrappedPanelStudyBrowser.propTypes = {
  commandsManager: (prop_types_default()).object.isRequired,
  extensionManager: (prop_types_default()).object.isRequired,
  servicesManager: (prop_types_default()).object.isRequired
};
/* harmony default export */ const Panels_WrappedPanelStudyBrowser = (WrappedPanelStudyBrowser);
;// CONCATENATED MODULE: ../../../extensions/default/src/utils/_shared/PROMPT_RESPONSES.ts
const PROMPT_RESPONSES_RESPONSE = {
  NO_NEVER: -1,
  CANCEL: 0,
  CREATE_REPORT: 1,
  ADD_SERIES: 2,
  SET_STUDY_AND_SERIES: 3,
  NO_NOT_FOR_SERIES: 4
};
/* harmony default export */ const PROMPT_RESPONSES = (PROMPT_RESPONSES_RESPONSE);
;// CONCATENATED MODULE: ../../../extensions/default/src/Panels/createReportDialogPrompt.tsx



function CreateReportDialogPrompt(uiDialogService, {
  extensionManager
}) {
  return new Promise(function (resolve, reject) {
    let dialogId = undefined;
    const _handleClose = () => {
      // Dismiss dialog
      uiDialogService.dismiss({
        id: dialogId
      });
      // Notify of cancel action
      resolve({
        action: PROMPT_RESPONSES.CANCEL,
        value: undefined,
        dataSourceName: undefined
      });
    };

    /**
     *
     * @param {string} param0.action - value of action performed
     * @param {string} param0.value - value from input field
     */
    const _handleFormSubmit = ({
      action,
      value
    }) => {
      uiDialogService.dismiss({
        id: dialogId
      });
      switch (action.id) {
        case 'save':
          resolve({
            action: PROMPT_RESPONSES.CREATE_REPORT,
            value: value.label,
            dataSourceName: value.dataSourceName
          });
          break;
        case 'cancel':
          resolve({
            action: PROMPT_RESPONSES.CANCEL,
            value: undefined,
            dataSourceName: undefined
          });
          break;
      }
    };
    const dataSourcesOpts = Object.keys(extensionManager.dataSourceMap).filter(ds => {
      const configuration = extensionManager.dataSourceDefs[ds]?.configuration;
      const supportsStow = configuration?.supportsStow ?? configuration?.wadoRoot;
      return supportsStow;
    }).map(ds => {
      return {
        value: ds,
        label: ds,
        placeHolder: ds
      };
    });
    dialogId = uiDialogService.create({
      centralize: true,
      isDraggable: false,
      content: ui_src/* Dialog */.lG,
      useLastPosition: false,
      showOverlay: true,
      contentProps: {
        title: 'Create Report',
        value: {
          label: '',
          dataSourceName: extensionManager.activeDataSource
        },
        noCloseButton: true,
        onClose: _handleClose,
        actions: [{
          id: 'cancel',
          text: 'Cancel',
          type: ui_src/* ButtonEnums.type */.Ny.NW.secondary
        }, {
          id: 'save',
          text: 'Save',
          type: ui_src/* ButtonEnums.type */.Ny.NW.primary
        }],
        // TODO: Should be on button press...
        onSubmit: _handleFormSubmit,
        body: ({
          value,
          setValue
        }) => {
          const onChangeHandler = event => {
            event.persist();
            setValue(value => ({
              ...value,
              label: event.target.value
            }));
          };
          const onKeyPressHandler = event => {
            if (event.key === 'Enter') {
              uiDialogService.dismiss({
                id: dialogId
              });
              resolve({
                action: PROMPT_RESPONSES.CREATE_REPORT,
                value: value.label
              });
            }
          };
          return /*#__PURE__*/react.createElement(react.Fragment, null, dataSourcesOpts.length > 1 && window.config?.allowMultiSelectExport && /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("label", {
            className: "text-[14px] leading-[1.2] text-white"
          }, "Data Source"), /*#__PURE__*/react.createElement(ui_src/* Select */.l6, {
            closeMenuOnSelect: true,
            className: "border-primary-main mt-2 bg-black",
            options: dataSourcesOpts,
            placeholder: dataSourcesOpts.find(option => option.value === value.dataSourceName).placeHolder,
            value: value.dataSourceName,
            onChange: evt => {
              setValue(v => ({
                ...v,
                dataSourceName: evt.value
              }));
            },
            isClearable: false
          })), /*#__PURE__*/react.createElement("div", {
            className: "mt-3"
          }, /*#__PURE__*/react.createElement(ui_src/* Input */.pd, {
            autoFocus: true,
            label: "Enter the report name",
            labelClassName: "text-white text-[14px] leading-[1.2]",
            className: "border-primary-main bg-black",
            type: "text",
            value: value.label,
            onChange: onChangeHandler,
            onKeyPress: onKeyPressHandler,
            required: true
          })));
        }
      }
    });
  });
}
;// CONCATENATED MODULE: ../../../extensions/default/src/Panels/index.js




// EXTERNAL MODULE: ../../../node_modules/i18next/dist/esm/i18next.js
var i18next = __webpack_require__(40680);
;// CONCATENATED MODULE: ../../../extensions/default/src/getPanelModule.tsx
function getPanelModule_extends() { return getPanelModule_extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, getPanelModule_extends.apply(null, arguments); }




// TODO:
// - No loading UI exists yet
// - cancel promises when component is destroyed
// - show errors in UI for thumbnails if promise fails

function getPanelModule({
  commandsManager,
  extensionManager,
  servicesManager
}) {
  return [{
    name: 'seriesList',
    iconName: 'tab-studies',
    iconLabel: 'Studies',
    label: i18next/* default */.A.t('SidePanel:Studies'),
    component: props => /*#__PURE__*/react.createElement(Panels_WrappedPanelStudyBrowser, getPanelModule_extends({}, props, {
      commandsManager: commandsManager,
      extensionManager: extensionManager,
      servicesManager: servicesManager
    }))
  }];
}
/* harmony default export */ const src_getPanelModule = (getPanelModule);
;// CONCATENATED MODULE: ../../../extensions/default/package.json
const package_namespaceObject = /*#__PURE__*/JSON.parse('{"UU":"@ohif/extension-default"}');
;// CONCATENATED MODULE: ../../../extensions/default/src/id.js

const id = package_namespaceObject.UU;

// EXTERNAL MODULE: ../../core/src/utils/sortInstancesByPosition.ts
var sortInstancesByPosition = __webpack_require__(44563);
// EXTERNAL MODULE: ../../core/src/utils/isDisplaySetReconstructable.js
var isDisplaySetReconstructable = __webpack_require__(67803);
;// CONCATENATED MODULE: ../../../extensions/default/src/utils/validations/checkMultiframe.ts



/**
 * Check various multi frame issues. It calls OHIF core functions
 * @param {*} multiFrameInstance
 * @param {*} warnings
 */
function checkMultiFrame(multiFrameInstance, messages) {
  if (!(0,isDisplaySetReconstructable/* hasPixelMeasurements */.Yt)(multiFrameInstance)) {
    messages.addMessage(src/* DisplaySetMessage */.Ob.CODES.MULTIFRAME_NO_PIXEL_MEASUREMENTS);
  }
  if (!(0,isDisplaySetReconstructable/* hasOrientation */.VX)(multiFrameInstance)) {
    messages.addMessage(src/* DisplaySetMessage */.Ob.CODES.MULTIFRAME_NO_ORIENTATION);
  }
  if (!(0,isDisplaySetReconstructable/* hasPosition */.sL)(multiFrameInstance)) {
    messages.addMessage(src/* DisplaySetMessage */.Ob.CODES.MULTIFRAME_NO_POSITION_INFORMATION);
  }
}
// EXTERNAL MODULE: ../../core/src/utils/toNumber.js
var toNumber = __webpack_require__(37827);
;// CONCATENATED MODULE: ../../../extensions/default/src/utils/validations/areAllImageDimensionsEqual.ts


/**
 * Check if the frames in a series has different dimensions
 * @param {*} instances
 * @returns
 */
function areAllImageDimensionsEqual(instances) {
  if (!instances?.length) {
    return false;
  }
  const firstImage = instances[0];
  const firstImageRows = (0,toNumber/* default */.A)(firstImage.Rows);
  const firstImageColumns = (0,toNumber/* default */.A)(firstImage.Columns);
  for (let i = 1; i < instances.length; i++) {
    const instance = instances[i];
    const {
      Rows,
      Columns
    } = instance;
    if (Rows !== firstImageRows || Columns !== firstImageColumns) {
      return false;
    }
  }
  return true;
}
;// CONCATENATED MODULE: ../../../extensions/default/src/utils/validations/areAllImageComponentsEqual.ts


/**
 * Check if all voxels in series images has same number of components (samplesPerPixel)
 * @param {*} instances
 * @returns
 */
function areAllImageComponentsEqual(instances) {
  if (!instances?.length) {
    return false;
  }
  const firstImage = instances[0];
  const firstImageSamplesPerPixel = (0,toNumber/* default */.A)(firstImage.SamplesPerPixel);
  for (let i = 1; i < instances.length; i++) {
    const instance = instances[i];
    const {
      SamplesPerPixel
    } = instance;
    if (SamplesPerPixel !== firstImageSamplesPerPixel) {
      return false;
    }
  }
  return true;
}
;// CONCATENATED MODULE: ../../../extensions/default/src/utils/validations/areAllImageOrientationsEqual.ts



/**
 * Check is the series has frames with different orientations
 * @param {*} instances
 * @returns
 */
function areAllImageOrientationsEqual(instances) {
  if (!instances?.length) {
    return false;
  }
  const firstImage = instances[0];
  const firstImageOrientationPatient = (0,toNumber/* default */.A)(firstImage.ImageOrientationPatient);
  for (let i = 1; i < instances.length; i++) {
    const instance = instances[i];
    const imageOrientationPatient = (0,toNumber/* default */.A)(instance.ImageOrientationPatient);
    if (!(0,isDisplaySetReconstructable/* _isSameOrientation */.sW)(imageOrientationPatient, firstImageOrientationPatient)) {
      return false;
    }
  }
  return true;
}
// EXTERNAL MODULE: ../../../node_modules/gl-matrix/esm/index.js + 1 modules
var esm = __webpack_require__(3823);
;// CONCATENATED MODULE: ../../../extensions/default/src/utils/calculateScanAxisNormal.ts


/**
 * Calculates the scanAxisNormal based on a image orientation vector extract from a frame
 * @param {*} imageOrientation
 * @returns
 */
function calculateScanAxisNormal(imageOrientation) {
  const rowCosineVec = esm/* vec3.fromValues */.eR.fromValues(imageOrientation[0], imageOrientation[1], imageOrientation[2]);
  const colCosineVec = esm/* vec3.fromValues */.eR.fromValues(imageOrientation[3], imageOrientation[4], imageOrientation[5]);
  return esm/* vec3.cross */.eR.cross(esm/* vec3.create */.eR.create(), rowCosineVec, colCosineVec);
}
;// CONCATENATED MODULE: ../../../extensions/default/src/utils/validations/areAllImagePositionsEqual.ts





/**
 * Checks if there is a position shift between consecutive frames
 * @param {*} previousPosition
 * @param {*} actualPosition
 * @param {*} scanAxisNormal
 * @param {*} averageSpacingBetweenFrames
 * @returns
 */
function _checkSeriesPositionShift(previousPosition, actualPosition, scanAxisNormal, averageSpacingBetweenFrames) {
  // predicted position should be the previous position added by the multiplication
  // of the scanAxisNormal and the average spacing between frames
  const predictedPosition = esm/* vec3.scaleAndAdd */.eR.scaleAndAdd(esm/* vec3.create */.eR.create(), previousPosition, scanAxisNormal, averageSpacingBetweenFrames);
  return esm/* vec3.distance */.eR.distance(actualPosition, predictedPosition) > averageSpacingBetweenFrames;
}

/**
 * Checks if a series has position shifts between consecutive frames
 * @param {*} instances
 * @returns
 */
function areAllImagePositionsEqual(instances) {
  if (!instances?.length) {
    return false;
  }
  const firstImageOrientationPatient = (0,toNumber/* default */.A)(instances[0].ImageOrientationPatient);
  if (!firstImageOrientationPatient) {
    return false;
  }
  const scanAxisNormal = calculateScanAxisNormal(firstImageOrientationPatient);
  const firstImagePositionPatient = (0,toNumber/* default */.A)(instances[0].ImagePositionPatient);
  const lastIpp = (0,toNumber/* default */.A)(instances[instances.length - 1].ImagePositionPatient);
  const averageSpacingBetweenFrames = (0,isDisplaySetReconstructable/* _getPerpendicularDistance */.jj)(firstImagePositionPatient, lastIpp) / (instances.length - 1);
  let previousImagePositionPatient = firstImagePositionPatient;
  for (let i = 1; i < instances.length; i++) {
    const instance = instances[i];
    const imagePositionPatient = (0,toNumber/* default */.A)(instance.ImagePositionPatient);
    if (_checkSeriesPositionShift(previousImagePositionPatient, imagePositionPatient, scanAxisNormal, averageSpacingBetweenFrames)) {
      return false;
    }
    previousImagePositionPatient = imagePositionPatient;
  }
  return true;
}
;// CONCATENATED MODULE: ../../../extensions/default/src/utils/validations/areAllImageSpacingEqual.ts



/**
 * Checks if series has spacing issues
 * @param {*} instances
 * @param {*} warnings
 */
function areAllImageSpacingEqual(instances, messages) {
  if (!instances?.length) {
    return;
  }
  const firstImagePositionPatient = (0,toNumber/* default */.A)(instances[0].ImagePositionPatient);
  if (!firstImagePositionPatient) {
    return;
  }
  const lastIpp = (0,toNumber/* default */.A)(instances[instances.length - 1].ImagePositionPatient);
  const averageSpacingBetweenFrames = (0,isDisplaySetReconstructable/* _getPerpendicularDistance */.jj)(firstImagePositionPatient, lastIpp) / (instances.length - 1);
  let previousImagePositionPatient = firstImagePositionPatient;
  const issuesFound = [];
  for (let i = 1; i < instances.length; i++) {
    const instance = instances[i];
    const imagePositionPatient = (0,toNumber/* default */.A)(instance.ImagePositionPatient);
    const spacingBetweenFrames = (0,isDisplaySetReconstructable/* _getPerpendicularDistance */.jj)(imagePositionPatient, previousImagePositionPatient);
    const spacingIssue = (0,isDisplaySetReconstructable/* _getSpacingIssue */.Op)(spacingBetweenFrames, averageSpacingBetweenFrames);
    if (spacingIssue) {
      const issue = spacingIssue.issue;

      // avoid multiple warning of the same thing
      if (!issuesFound.includes(issue)) {
        issuesFound.push(issue);
        if (issue === isDisplaySetReconstructable/* reconstructionIssues */.JG.MISSING_FRAMES) {
          messages.addMessage(src/* DisplaySetMessage */.Ob.CODES.MISSING_FRAMES);
        } else if (issue === isDisplaySetReconstructable/* reconstructionIssues */.JG.IRREGULAR_SPACING) {
          messages.addMessage(src/* DisplaySetMessage */.Ob.CODES.IRREGULAR_SPACING);
        }
      }
      // we just want to find issues not how many
      if (issuesFound.length > 1) {
        break;
      }
    }
    previousImagePositionPatient = imagePositionPatient;
  }
}
;// CONCATENATED MODULE: ../../../extensions/default/src/utils/validations/checkSingleFrames.ts







/**
 * Runs various checks in a single frame series
 * @param {*} instances
 * @param {*} warnings
 */
function checkSingleFrames(instances, messages) {
  if (instances.length > 2) {
    if (!areAllImageDimensionsEqual(instances)) {
      messages.addMessage(src/* DisplaySetMessage */.Ob.CODES.INCONSISTENT_DIMENSIONS);
    }
    if (!areAllImageComponentsEqual(instances)) {
      messages.addMessage(src/* DisplaySetMessage */.Ob.CODES.INCONSISTENT_COMPONENTS);
    }
    if (!areAllImageOrientationsEqual(instances)) {
      messages.addMessage(src/* DisplaySetMessage */.Ob.CODES.INCONSISTENT_ORIENTATIONS);
    }
    if (!areAllImagePositionsEqual(instances)) {
      messages.addMessage(src/* DisplaySetMessage */.Ob.CODES.INCONSISTENT_POSITION_INFORMATION);
    }
    areAllImageSpacingEqual(instances, messages);
  }
}
;// CONCATENATED MODULE: ../../../extensions/default/src/getDisplaySetMessages.ts





/**
 * Checks if a series is reconstructable to a 3D volume.
 *
 * @param {Object[]} instances An array of `OHIFInstanceMetadata` objects.
 */
function getDisplaySetMessages(instances, isReconstructable, isDynamicVolume) {
  const messages = new src/* DisplaySetMessageList */.WZ();
  if (isDynamicVolume) {
    return messages;
  }
  if (!instances.length) {
    messages.addMessage(src/* DisplaySetMessage */.Ob.CODES.NO_VALID_INSTANCES);
    return;
  }
  const firstInstance = instances[0];
  const {
    Modality,
    ImageType,
    NumberOfFrames
  } = firstInstance;
  // Due to current requirements, LOCALIZER series doesn't have any messages
  if (ImageType?.includes('LOCALIZER')) {
    return messages;
  }
  if (!isDisplaySetReconstructable/* constructableModalities */.Hf.includes(Modality)) {
    return messages;
  }
  const isMultiframe = NumberOfFrames > 1;
  // Can't reconstruct if all instances don't have the ImagePositionPatient.
  if (!isMultiframe && !instances.every(instance => instance.ImagePositionPatient)) {
    messages.addMessage(src/* DisplaySetMessage */.Ob.CODES.NO_POSITION_INFORMATION);
  }
  const sortedInstances = (0,sortInstancesByPosition/* default */.A)(instances);
  isMultiframe ? checkMultiFrame(sortedInstances[0], messages) : checkSingleFrames(sortedInstances, messages);
  if (!isReconstructable) {
    messages.addMessage(src/* DisplaySetMessage */.Ob.CODES.NOT_RECONSTRUCTABLE);
  }
  return messages;
}
// EXTERNAL MODULE: ../../core/src/classes/ImageSet.ts
var ImageSet = __webpack_require__(14169);
;// CONCATENATED MODULE: ../../../extensions/default/src/getDisplaySetsFromUnsupportedSeries.js


/**
 * Default handler for a instance list with an unsupported sopClassUID
 */
function getDisplaySetsFromUnsupportedSeries(instances) {
  const imageSet = new ImageSet/* default */.A(instances);
  const messages = new src/* DisplaySetMessageList */.WZ();
  messages.addMessage(src/* DisplaySetMessage */.Ob.CODES.UNSUPPORTED_DISPLAYSET);
  const instance = instances[0];
  imageSet.setAttributes({
    displaySetInstanceUID: imageSet.uid,
    // create a local alias for the imageSet UID
    SeriesDate: instance.SeriesDate,
    SeriesTime: instance.SeriesTime,
    SeriesInstanceUID: instance.SeriesInstanceUID,
    StudyInstanceUID: instance.StudyInstanceUID,
    SeriesNumber: instance.SeriesNumber || 0,
    FrameRate: instance.FrameTime,
    SOPClassUID: instance.SOPClassUID,
    SeriesDescription: instance.SeriesDescription || '',
    Modality: instance.Modality,
    numImageFrames: instances.length,
    unsupported: true,
    SOPClassHandlerId: 'unsupported',
    isReconstructable: false,
    messages
  });
  return [imageSet];
}
;// CONCATENATED MODULE: ../../../extensions/default/src/SOPClassHandlers/chartSOPClassHandler.ts


const SOPClassHandlerName = 'chart';
const CHART_MODALITY = 'CHT';

// Private SOPClassUid for chart data
const ChartDataSOPClassUid = '1.9.451.13215.7.3.2.7.6.1';
const sopClassUids = [ChartDataSOPClassUid];
const makeChartDataDisplaySet = (instance, sopClassUids) => {
  const {
    StudyInstanceUID,
    SeriesInstanceUID,
    SOPInstanceUID,
    SeriesDescription,
    SeriesNumber,
    SeriesDate,
    SOPClassUID
  } = instance;
  return {
    Modality: CHART_MODALITY,
    loading: false,
    isReconstructable: false,
    displaySetInstanceUID: src/* utils */.Wp.guid(),
    SeriesDescription,
    SeriesNumber,
    SeriesDate,
    SOPInstanceUID,
    SeriesInstanceUID,
    StudyInstanceUID,
    SOPClassHandlerId: `${id}.sopClassHandlerModule.${SOPClassHandlerName}`,
    SOPClassUID,
    isDerivedDisplaySet: true,
    isLoaded: true,
    sopClassUids,
    instance,
    instances: [instance],
    /**
     * Adds instances to the chart displaySet, rather than creating a new one
     * when user moves to a different workflow step and gets back to a step that
     * recreates the chart
     */
    addInstances: function (instances, _displaySetService) {
      this.instances.push(...instances);
      this.instance = this.instances[this.instances.length - 1];
      return this;
    }
  };
};
function getSopClassUids(instances) {
  const uniqueSopClassUidsInSeries = new Set();
  instances.forEach(instance => {
    uniqueSopClassUidsInSeries.add(instance.SOPClassUID);
  });
  const sopClassUids = Array.from(uniqueSopClassUidsInSeries);
  return sopClassUids;
}
function _getDisplaySetsFromSeries(instances) {
  // If the series has no instances, stop here
  if (!instances || !instances.length) {
    throw new Error('No instances were provided');
  }
  const sopClassUids = getSopClassUids(instances);
  const displaySets = instances.map(instance => {
    if (instance.Modality === CHART_MODALITY) {
      return makeChartDataDisplaySet(instance, sopClassUids);
    }
    throw new Error('Unsupported modality');
  });
  return displaySets;
}
const chartHandler = {
  name: SOPClassHandlerName,
  sopClassUids,
  getDisplaySetsFromSeries: instances => {
    return _getDisplaySetsFromSeries(instances);
  }
};

;// CONCATENATED MODULE: ../../../extensions/default/src/getSopClassHandlerModule.js





const {
  isImage,
  sopClassDictionary,
  isDisplaySetReconstructable: getSopClassHandlerModule_isDisplaySetReconstructable
} = src/* utils */.Wp;
const {
  ImageSet: getSopClassHandlerModule_ImageSet
} = src/* classes */.Ly;
const DEFAULT_VOLUME_LOADER_SCHEME = 'cornerstoneStreamingImageVolume';
const DYNAMIC_VOLUME_LOADER_SCHEME = 'cornerstoneStreamingDynamicImageVolume';
const sopClassHandlerName = 'stack';
let appContext = {};
const getDynamicVolumeInfo = instances => {
  const {
    extensionManager
  } = appContext;
  if (!extensionManager) {
    throw new Error('extensionManager is not available');
  }
  const imageIds = instances.map(({
    imageId
  }) => imageId);
  const volumeLoaderUtility = extensionManager.getModuleEntry('@ohif/extension-cornerstone.utilityModule.volumeLoader');
  const {
    getDynamicVolumeInfo: csGetDynamicVolumeInfo
  } = volumeLoaderUtility.exports;
  return csGetDynamicVolumeInfo(imageIds);
};
const isMultiFrame = instance => {
  return instance.NumberOfFrames > 1;
};
function getDisplaySetInfo(instances) {
  const dynamicVolumeInfo = getDynamicVolumeInfo(instances);
  const {
    isDynamicVolume,
    timePoints
  } = dynamicVolumeInfo;
  let displaySetInfo;
  const {
    appConfig
  } = appContext;
  if (isDynamicVolume) {
    const timePoint = timePoints[0];
    const instancesMap = new Map();

    // O(n) to convert it into a map and O(1) to find each instance
    instances.forEach(instance => instancesMap.set(instance.imageId, instance));
    const firstTimePointInstances = timePoint.map(imageId => instancesMap.get(imageId));
    displaySetInfo = getSopClassHandlerModule_isDisplaySetReconstructable(firstTimePointInstances, appConfig);
  } else {
    displaySetInfo = getSopClassHandlerModule_isDisplaySetReconstructable(instances, appConfig);
  }
  return {
    isDynamicVolume,
    ...displaySetInfo,
    dynamicVolumeInfo
  };
}
const makeDisplaySet = instances => {
  const instance = instances[0];
  const imageSet = new getSopClassHandlerModule_ImageSet(instances);
  const {
    isDynamicVolume,
    value: isReconstructable,
    averageSpacingBetweenFrames,
    dynamicVolumeInfo
  } = getDisplaySetInfo(instances);
  const volumeLoaderSchema = isDynamicVolume ? DYNAMIC_VOLUME_LOADER_SCHEME : DEFAULT_VOLUME_LOADER_SCHEME;

  // set appropriate attributes to image set...
  const messages = getDisplaySetMessages(instances, isReconstructable, isDynamicVolume);
  imageSet.setAttributes({
    volumeLoaderSchema,
    displaySetInstanceUID: imageSet.uid,
    // create a local alias for the imageSet UID
    SeriesDate: instance.SeriesDate,
    SeriesTime: instance.SeriesTime,
    SeriesInstanceUID: instance.SeriesInstanceUID,
    StudyInstanceUID: instance.StudyInstanceUID,
    SeriesNumber: instance.SeriesNumber || 0,
    FrameRate: instance.FrameTime,
    SOPClassUID: instance.SOPClassUID,
    SeriesDescription: instance.SeriesDescription || '',
    Modality: instance.Modality,
    isMultiFrame: isMultiFrame(instance),
    countIcon: isReconstructable ? 'icon-mpr' : undefined,
    numImageFrames: instances.length,
    SOPClassHandlerId: `${id}.sopClassHandlerModule.${sopClassHandlerName}`,
    isReconstructable,
    messages,
    averageSpacingBetweenFrames: averageSpacingBetweenFrames || null,
    isDynamicVolume,
    dynamicVolumeInfo
  });

  // Sort the images in this series if needed
  const shallSort = true; //!OHIF.utils.ObjectPath.get(Meteor, 'settings.public.ui.sortSeriesByIncomingOrder');
  if (shallSort) {
    imageSet.sortBy((a, b) => {
      // Sort by InstanceNumber (0020,0013)
      return (parseInt(a.InstanceNumber) || 0) - (parseInt(b.InstanceNumber) || 0);
    });
  }

  // Include the first image instance number (after sorted)
  /*imageSet.setAttribute(
    'instanceNumber',
    imageSet.getImage(0).InstanceNumber
  );*/

  /*const isReconstructable = isDisplaySetReconstructable(series, instances);
   imageSet.isReconstructable = isReconstructable.value;
   if (isReconstructable.missingFrames) {
    // TODO -> This is currently unused, but may be used for reconstructing
    // Volumes with gaps later on.
    imageSet.missingFrames = isReconstructable.missingFrames;
  }*/

  return imageSet;
};
const isSingleImageModality = modality => {
  return modality === 'CR' || modality === 'MG' || modality === 'DX';
};
function getSopClassHandlerModule_getSopClassUids(instances) {
  const uniqueSopClassUidsInSeries = new Set();
  instances.forEach(instance => {
    uniqueSopClassUidsInSeries.add(instance.SOPClassUID);
  });
  const sopClassUids = Array.from(uniqueSopClassUidsInSeries);
  return sopClassUids;
}

/**
 * Basic SOPClassHandler:
 * - For all Image types that are stackable, create
 *   a displaySet with a stack of images
 *
 * @param {SeriesMetadata} series The series metadata object from which the display sets will be created
 * @returns {Array} The list of display sets created for the given series object
 */
function getDisplaySetsFromSeries(instances) {
  // If the series has no instances, stop here
  if (!instances || !instances.length) {
    throw new Error('No instances were provided');
  }
  const displaySets = [];
  const sopClassUids = getSopClassHandlerModule_getSopClassUids(instances);

  // Search through the instances (InstanceMetadata object) of this series
  // Split Multi-frame instances and Single-image modalities
  // into their own specific display sets. Place the rest of each
  // series into another display set.
  const stackableInstances = [];
  instances.forEach(instance => {
    // All imaging modalities must have a valid value for sopClassUid (x00080016) or rows (x00280010)
    if (!isImage(instance.SOPClassUID) && !instance.Rows) {
      return;
    }
    let displaySet;
    if (isMultiFrame(instance)) {
      displaySet = makeDisplaySet([instance]);
      displaySet.setAttributes({
        sopClassUids,
        numImageFrames: instance.NumberOfFrames,
        instanceNumber: instance.InstanceNumber,
        acquisitionDatetime: instance.AcquisitionDateTime
      });
      displaySets.push(displaySet);
    } else if (isSingleImageModality(instance.Modality)) {
      displaySet = makeDisplaySet([instance]);
      displaySet.setAttributes({
        sopClassUids,
        instanceNumber: instance.InstanceNumber,
        acquisitionDatetime: instance.AcquisitionDateTime
      });
      displaySets.push(displaySet);
    } else {
      stackableInstances.push(instance);
    }
  });
  if (stackableInstances.length) {
    const displaySet = makeDisplaySet(stackableInstances);
    displaySet.setAttribute('studyInstanceUid', instances[0].StudyInstanceUID);
    displaySet.setAttributes({
      sopClassUids
    });
    displaySets.push(displaySet);
  }
  return displaySets;
}
const getSopClassHandlerModule_sopClassUids = [sopClassDictionary.ComputedRadiographyImageStorage, sopClassDictionary.DigitalXRayImageStorageForPresentation, sopClassDictionary.DigitalXRayImageStorageForProcessing, sopClassDictionary.DigitalMammographyXRayImageStorageForPresentation, sopClassDictionary.DigitalMammographyXRayImageStorageForProcessing, sopClassDictionary.DigitalIntraOralXRayImageStorageForPresentation, sopClassDictionary.DigitalIntraOralXRayImageStorageForProcessing, sopClassDictionary.CTImageStorage, sopClassDictionary.EnhancedCTImageStorage, sopClassDictionary.LegacyConvertedEnhancedCTImageStorage, sopClassDictionary.UltrasoundMultiframeImageStorage, sopClassDictionary.MRImageStorage, sopClassDictionary.EnhancedMRImageStorage, sopClassDictionary.EnhancedMRColorImageStorage, sopClassDictionary.LegacyConvertedEnhancedMRImageStorage, sopClassDictionary.UltrasoundImageStorage, sopClassDictionary.UltrasoundImageStorageRET, sopClassDictionary.SecondaryCaptureImageStorage, sopClassDictionary.MultiframeSingleBitSecondaryCaptureImageStorage, sopClassDictionary.MultiframeGrayscaleByteSecondaryCaptureImageStorage, sopClassDictionary.MultiframeGrayscaleWordSecondaryCaptureImageStorage, sopClassDictionary.MultiframeTrueColorSecondaryCaptureImageStorage, sopClassDictionary.XRayAngiographicImageStorage, sopClassDictionary.EnhancedXAImageStorage, sopClassDictionary.XRayRadiofluoroscopicImageStorage, sopClassDictionary.EnhancedXRFImageStorage, sopClassDictionary.XRay3DAngiographicImageStorage, sopClassDictionary.XRay3DCraniofacialImageStorage, sopClassDictionary.BreastTomosynthesisImageStorage, sopClassDictionary.BreastProjectionXRayImageStorageForPresentation, sopClassDictionary.BreastProjectionXRayImageStorageForProcessing, sopClassDictionary.IntravascularOpticalCoherenceTomographyImageStorageForPresentation, sopClassDictionary.IntravascularOpticalCoherenceTomographyImageStorageForProcessing, sopClassDictionary.NuclearMedicineImageStorage, sopClassDictionary.VLEndoscopicImageStorage, sopClassDictionary.VideoEndoscopicImageStorage, sopClassDictionary.VLMicroscopicImageStorage, sopClassDictionary.VideoMicroscopicImageStorage, sopClassDictionary.VLSlideCoordinatesMicroscopicImageStorage, sopClassDictionary.VLPhotographicImageStorage, sopClassDictionary.VideoPhotographicImageStorage, sopClassDictionary.OphthalmicPhotography8BitImageStorage, sopClassDictionary.OphthalmicPhotography16BitImageStorage, sopClassDictionary.OphthalmicTomographyImageStorage,
// Handled by another sop class module
// sopClassDictionary.VLWholeSlideMicroscopyImageStorage,
sopClassDictionary.PositronEmissionTomographyImageStorage, sopClassDictionary.EnhancedPETImageStorage, sopClassDictionary.LegacyConvertedEnhancedPETImageStorage, sopClassDictionary.RTImageStorage, sopClassDictionary.EnhancedUSVolumeStorage];
function getSopClassHandlerModule(appContextParam) {
  appContext = appContextParam;
  return [{
    name: sopClassHandlerName,
    sopClassUids: getSopClassHandlerModule_sopClassUids,
    getDisplaySetsFromSeries
  }, {
    name: 'not-supported-display-sets-handler',
    sopClassUids: [],
    getDisplaySetsFromSeries: getDisplaySetsFromUnsupportedSeries
  }, {
    name: chartHandler.name,
    sopClassUids: chartHandler.sopClassUids,
    getDisplaySetsFromSeries: chartHandler.getDisplaySetsFromSeries
  }];
}
/* harmony default export */ const src_getSopClassHandlerModule = (getSopClassHandlerModule);
;// CONCATENATED MODULE: ../../../extensions/default/src/Toolbar/ToolbarDivider.tsx

function ToolbarDivider() {
  return /*#__PURE__*/react.createElement("span", {
    className: "border-common-dark mx-2 h-8 w-4 self-center border-l"
  });
}
;// CONCATENATED MODULE: ../../../extensions/default/src/Toolbar/ToolbarLayoutSelector.tsx
function ToolbarLayoutSelector_extends() { return ToolbarLayoutSelector_extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, ToolbarLayoutSelector_extends.apply(null, arguments); }



const defaultCommonPresets = [{
  icon: 'layout-common-1x1',
  commandOptions: {
    numRows: 1,
    numCols: 1
  }
}, {
  icon: 'layout-common-1x2',
  commandOptions: {
    numRows: 1,
    numCols: 2
  }
}, {
  icon: 'layout-common-2x2',
  commandOptions: {
    numRows: 2,
    numCols: 2
  }
}, {
  icon: 'layout-common-2x3',
  commandOptions: {
    numRows: 2,
    numCols: 3
  }
}];
const _areSelectorsValid = (hp, displaySets, hangingProtocolService) => {
  if (!hp.displaySetSelectors || Object.values(hp.displaySetSelectors).length === 0) {
    return true;
  }
  return hangingProtocolService.areRequiredSelectorsValid(Object.values(hp.displaySetSelectors), displaySets[0]);
};
const generateAdvancedPresets = ({
  servicesManager
}) => {
  const {
    hangingProtocolService,
    viewportGridService,
    displaySetService
  } = servicesManager.services;
  const hangingProtocols = Array.from(hangingProtocolService.protocols.values());
  const viewportId = viewportGridService.getActiveViewportId();
  if (!viewportId) {
    return [];
  }
  const displaySetInsaneUIDs = viewportGridService.getDisplaySetsUIDsForViewport(viewportId);
  if (!displaySetInsaneUIDs) {
    return [];
  }
  const displaySets = displaySetInsaneUIDs.map(uid => displaySetService.getDisplaySetByUID(uid));
  return hangingProtocols.map(hp => {
    if (!hp.isPreset) {
      return null;
    }
    const areValid = _areSelectorsValid(hp, displaySets, hangingProtocolService);
    return {
      icon: hp.icon,
      title: hp.name,
      commandOptions: {
        protocolId: hp.id
      },
      disabled: !areValid
    };
  }).filter(preset => preset !== null);
};
function ToolbarLayoutSelectorWithServices({
  commandsManager,
  servicesManager,
  ...props
}) {
  const [isDisabled, setIsDisabled] = (0,react.useState)(false);
  const handleMouseEnter = () => {
    setIsDisabled(false);
  };
  const onSelection = (0,react.useCallback)(props => {
    commandsManager.run({
      commandName: 'setViewportGridLayout',
      commandOptions: {
        ...props
      }
    });
    setIsDisabled(true);
  }, []);
  const onSelectionPreset = (0,react.useCallback)(props => {
    commandsManager.run({
      commandName: 'setHangingProtocol',
      commandOptions: {
        ...props
      }
    });
    setIsDisabled(true);
  }, []);
  return /*#__PURE__*/react.createElement("div", {
    onMouseEnter: handleMouseEnter
  }, /*#__PURE__*/react.createElement(LayoutSelector, ToolbarLayoutSelector_extends({}, props, {
    onSelection: onSelection,
    onSelectionPreset: onSelectionPreset,
    servicesManager: servicesManager,
    tooltipDisabled: isDisabled
  })));
}
function LayoutSelector({
  rows = 3,
  columns = 4,
  onLayoutChange = () => {},
  className,
  onSelection,
  onSelectionPreset,
  servicesManager,
  tooltipDisabled,
  ...rest
}) {
  const [isOpen, setIsOpen] = (0,react.useState)(false);
  const dropdownRef = (0,react.useRef)(null);
  const {
    customizationService
  } = servicesManager.services;
  const commonPresets = customizationService.get('commonPresets') || defaultCommonPresets;
  const advancedPresets = customizationService.get('advancedPresets') || generateAdvancedPresets({
    servicesManager
  });
  const closeOnOutsideClick = event => {
    if (isOpen && dropdownRef.current) {
      setIsOpen(false);
    }
  };
  (0,react.useEffect)(() => {
    if (!isOpen) {
      return;
    }
    setTimeout(() => {
      window.addEventListener('click', closeOnOutsideClick);
    }, 0);
    return () => {
      window.removeEventListener('click', closeOnOutsideClick);
      dropdownRef.current = null;
    };
  }, [isOpen]);
  const onInteractionHandler = () => {
    setIsOpen(!isOpen);
  };
  const DropdownContent = isOpen ? ui_src/* LayoutSelector */.sG : null;
  return /*#__PURE__*/react.createElement(ui_src/* ToolbarButton */.IB, {
    id: "Layout",
    label: "Layout",
    icon: "tool-layout",
    onInteraction: onInteractionHandler,
    className: className,
    rounded: rest.rounded,
    disableToolTip: tooltipDisabled,
    dropdownContent: DropdownContent !== null && /*#__PURE__*/react.createElement("div", {
      className: "flex",
      ref: dropdownRef
    }, /*#__PURE__*/react.createElement("div", {
      className: "bg-secondary-dark flex flex-col gap-2.5 p-2"
    }, /*#__PURE__*/react.createElement("div", {
      className: "text-aqua-pale text-xs"
    }, "Common"), /*#__PURE__*/react.createElement("div", {
      className: "flex gap-4"
    }, commonPresets.map((preset, index) => /*#__PURE__*/react.createElement(ui_src/* LayoutPreset */.qu, {
      key: index,
      classNames: "hover:bg-primary-dark group p-1 cursor-pointer",
      icon: preset.icon,
      commandOptions: preset.commandOptions,
      onSelection: onSelection
    }))), /*#__PURE__*/react.createElement("div", {
      className: "h-[2px] bg-black"
    }), /*#__PURE__*/react.createElement("div", {
      className: "text-aqua-pale text-xs"
    }, "Advanced"), /*#__PURE__*/react.createElement("div", {
      className: "flex flex-col gap-2.5"
    }, advancedPresets.map((preset, index) => /*#__PURE__*/react.createElement(ui_src/* LayoutPreset */.qu, {
      key: index + commonPresets.length,
      classNames: "hover:bg-primary-dark group flex gap-2 p-1 cursor-pointer",
      icon: preset.icon,
      title: preset.title,
      disabled: preset.disabled,
      commandOptions: preset.commandOptions,
      onSelection: onSelectionPreset
    })))), /*#__PURE__*/react.createElement("div", {
      className: "bg-primary-dark flex flex-col gap-2.5 border-l-2 border-solid border-black  p-2"
    }, /*#__PURE__*/react.createElement("div", {
      className: "text-aqua-pale text-xs"
    }, "Custom"), /*#__PURE__*/react.createElement(DropdownContent, {
      rows: rows,
      columns: columns,
      onSelection: onSelection
    }), /*#__PURE__*/react.createElement("p", {
      className: "text-aqua-pale text-xs leading-tight"
    }, "Hover to select ", /*#__PURE__*/react.createElement("br", null), "rows and columns ", /*#__PURE__*/react.createElement("br", null), " Click to apply"))),
    isActive: isOpen,
    type: "toggle"
  });
}
LayoutSelector.propTypes = {
  rows: (prop_types_default()).number,
  columns: (prop_types_default()).number,
  onLayoutChange: (prop_types_default()).func,
  servicesManager: (prop_types_default()).object.isRequired
};
/* harmony default export */ const ToolbarLayoutSelector = (ToolbarLayoutSelectorWithServices);
;// CONCATENATED MODULE: ../../../extensions/default/src/Toolbar/ToolbarSplitButtonWithServices.tsx
function ToolbarSplitButtonWithServices_extends() { return ToolbarSplitButtonWithServices_extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, ToolbarSplitButtonWithServices_extends.apply(null, arguments); }



function ToolbarSplitButtonWithServices({
  groupId,
  primary,
  secondary,
  items,
  renderer,
  onInteraction,
  servicesManager
}) {
  const {
    toolbarService
  } = servicesManager?.services;

  /* Bubbles up individual item clicks */
  const getSplitButtonItems = (0,react.useCallback)(items => items.map((item, index) => ({
    ...item,
    index,
    onClick: () => {
      onInteraction({
        groupId,
        itemId: item.id,
        commands: item.commands
      });
    }
  })), [groupId, onInteraction]);
  const PrimaryButtonComponent = toolbarService?.getButtonComponentForUIType(primary.uiType) ?? ui_src/* ToolbarButton */.IB;
  const listItemRenderer = renderer;
  return /*#__PURE__*/react.createElement(ui_src/* SplitButton */.fk, {
    primary: primary,
    secondary: secondary,
    items: getSplitButtonItems(items),
    groupId: groupId,
    renderer: listItemRenderer,
    onInteraction: onInteraction,
    Component: props => /*#__PURE__*/react.createElement(PrimaryButtonComponent, ToolbarSplitButtonWithServices_extends({}, props, {
      servicesManager: servicesManager
    }))
  });
}
ToolbarSplitButtonWithServices.propTypes = {
  groupId: (prop_types_default()).string,
  primary: prop_types_default().shape({
    id: (prop_types_default()).string.isRequired,
    uiType: (prop_types_default()).string
  }),
  secondary: prop_types_default().shape({
    id: (prop_types_default()).string,
    icon: (prop_types_default()).string.isRequired,
    label: (prop_types_default()).string,
    tooltip: (prop_types_default()).string.isRequired,
    disabled: (prop_types_default()).bool,
    className: (prop_types_default()).string
  }),
  items: prop_types_default().arrayOf(prop_types_default().shape({
    id: (prop_types_default()).string.isRequired,
    icon: (prop_types_default()).string,
    label: (prop_types_default()).string,
    tooltip: (prop_types_default()).string,
    disabled: (prop_types_default()).bool,
    className: (prop_types_default()).string
  })),
  renderer: (prop_types_default()).func,
  onInteraction: (prop_types_default()).func.isRequired,
  servicesManager: prop_types_default().shape({
    services: prop_types_default().shape({
      toolbarService: (prop_types_default()).object
    })
  })
};
/* harmony default export */ const Toolbar_ToolbarSplitButtonWithServices = (ToolbarSplitButtonWithServices);
;// CONCATENATED MODULE: ../../../extensions/default/src/Toolbar/ToolbarButtonGroupWithServices.tsx


function ToolbarButtonGroupWithServices({
  groupId,
  items,
  onInteraction,
  size
}) {
  const getSplitButtonItems = (0,react.useCallback)(items => items.map((item, index) => /*#__PURE__*/react.createElement(ui_src/* ToolbarButton */.IB, {
    key: item.id,
    icon: item.icon,
    label: item.label,
    disabled: item.disabled,
    className: item.className,
    disabledText: item.disabledText,
    id: item.id,
    size: size,
    onClick: () => {
      onInteraction({
        groupId,
        itemId: item.id,
        commands: item.commands
      });
    }
    // Note: this is necessary since tooltip will add
    // default styles to the tooltip container which
    // we don't want for groups
    ,
    toolTipClassName: ""
  })), [onInteraction, groupId]);
  return /*#__PURE__*/react.createElement(ui_src/* ButtonGroup */.e2, null, getSplitButtonItems(items));
}
/* harmony default export */ const Toolbar_ToolbarButtonGroupWithServices = (ToolbarButtonGroupWithServices);
;// CONCATENATED MODULE: ../../../extensions/default/src/Components/ProgressDropdownWithService.tsx


const workflowStepsToDropdownOptions = (steps = []) => steps.map(step => ({
  label: step.name,
  value: step.id,
  info: step.info,
  activated: false,
  completed: false
}));
function ProgressDropdownWithService({
  servicesManager
}) {
  const {
    workflowStepsService
  } = servicesManager.services;
  const [activeStepId, setActiveStepId] = (0,react.useState)(workflowStepsService.activeWorkflowStep?.id);
  const [dropdownOptions, setDropdownOptions] = (0,react.useState)(workflowStepsToDropdownOptions(workflowStepsService.workflowSteps));
  const setCurrentAndPreviousOptionsAsCompleted = (0,react.useCallback)(currentOption => {
    if (currentOption.completed) {
      return;
    }
    setDropdownOptions(prevOptions => {
      const newOptionsState = [...prevOptions];
      const startIndex = newOptionsState.findIndex(option => option.value === currentOption.value);
      for (let i = startIndex; i >= 0; i--) {
        const option = newOptionsState[i];
        if (option.completed) {
          break;
        }
        newOptionsState[i] = {
          ...option,
          completed: true
        };
      }
      return newOptionsState;
    });
  }, []);
  const handleDropdownChange = (0,react.useCallback)(({
    selectedOption
  }) => {
    if (!selectedOption) {
      return;
    }

    // TODO: Steps should be marked as completed after user has
    // completed some action when required (not implemented)
    setCurrentAndPreviousOptionsAsCompleted(selectedOption);
    setActiveStepId(selectedOption.value);
  }, [setCurrentAndPreviousOptionsAsCompleted]);
  (0,react.useEffect)(() => {
    let timeoutId;
    if (activeStepId) {
      // We've used setTimeout to give it more time to update the UI since
      // create3DFilterableFromDataArray from Texture.js may take 600+ ms to run
      // when there is a new series to load in the next step but that resulted
      // in the followed React error when updating the content from left/right panels
      // and all component states were being lost:
      //   Error: Can't perform a React state update on an unmounted component
      workflowStepsService.setActiveWorkflowStep(activeStepId);
    }
    return () => clearTimeout(timeoutId);
  }, [activeStepId, workflowStepsService]);
  (0,react.useEffect)(() => {
    const {
      unsubscribe: unsubStepsChanged
    } = workflowStepsService.subscribe(workflowStepsService.EVENTS.STEPS_CHANGED, () => setDropdownOptions(workflowStepsToDropdownOptions(workflowStepsService.workflowSteps)));
    const {
      unsubscribe: unsubActiveStepChanged
    } = workflowStepsService.subscribe(workflowStepsService.EVENTS.ACTIVE_STEP_CHANGED, () => setActiveStepId(workflowStepsService.activeWorkflowStep.id));
    return () => {
      unsubStepsChanged();
      unsubActiveStepChanged();
    };
  }, [servicesManager, workflowStepsService]);
  return /*#__PURE__*/react.createElement(ui_src/* ProgressDropdown */.LW, {
    options: dropdownOptions,
    value: activeStepId,
    onChange: handleDropdownChange
  });
}
;// CONCATENATED MODULE: ../../../extensions/default/src/getToolbarModule.tsx






const getClassName = isToggled => {
  return {
    className: isToggled ? '!text-primary-active' : '!text-common-bright hover:!bg-primary-dark hover:text-primary-light'
  };
};
function getToolbarModule({
  commandsManager,
  servicesManager
}) {
  const {
    cineService
  } = servicesManager.services;
  return [{
    name: 'ohif.radioGroup',
    defaultComponent: ui_src/* ToolbarButton */.IB
  }, {
    name: 'ohif.divider',
    defaultComponent: ToolbarDivider
  }, {
    name: 'ohif.splitButton',
    defaultComponent: Toolbar_ToolbarSplitButtonWithServices
  }, {
    name: 'ohif.layoutSelector',
    defaultComponent: props => ToolbarLayoutSelector({
      ...props,
      commandsManager,
      servicesManager
    })
  }, {
    name: 'ohif.buttonGroup',
    defaultComponent: Toolbar_ToolbarButtonGroupWithServices
  }, {
    name: 'ohif.progressDropdown',
    defaultComponent: ProgressDropdownWithService
  }, {
    name: 'evaluate.group.promoteToPrimary',
    evaluate: ({
      viewportId,
      button,
      itemId
    }) => {
      const {
        items
      } = button.props;
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
    name: 'evaluate.cine',
    evaluate: () => {
      const isToggled = cineService.getState().isCineEnabled;
      return getClassName(isToggled);
    }
  }];
}
;// CONCATENATED MODULE: ../../../extensions/default/src/CustomizableContextMenu/ContextMenuItemsBuilder.ts
/**
 * Finds menu by menu id
 *
 * @returns Menu having the menuId
 */
function findMenuById(menus, menuId) {
  if (!menuId) {
    return;
  }
  return menus.find(menu => menu.id === menuId);
}

/**
 * Default finding menu method.  This method will go through
 * the list of menus until it finds the first one which
 * has no selector, OR has the selector, when applied to the
 * check props, return true.
 * The selectorProps are a set of provided properties which can be
 * passed into the selector function to determine when to display a menu.
 * For example, a selector function of:
 * `({displayset}) => displaySet?.SeriesDescription?.indexOf?.('Left')!==-1
 * would match series descriptions containing 'Left'.
 *
 * @param {Object[]} menus List of menus
 * @param {*} subProps
 * @returns
 */
function findMenuDefault(menus, subProps) {
  if (!menus) {
    return null;
  }
  return menus.find(menu => !menu.selector || menu.selector(subProps.selectorProps));
}

/**
 * Finds the menu to be used for different scenarios:
 * This will first look for a subMenu with the specified subMenuId
 * Next it will look for the first menu whose selector returns true.
 *
 * @param menus - List of menus
 * @param props - root props
 * @param menuIdFilter - menu id identifier (to be considered on selection)
 *      This is intended to support other types of filtering in the future.
 */
function findMenu(menus, props, menuIdFilter) {
  const {
    subMenu
  } = props;
  function* findMenuIterator() {
    yield findMenuById(menus, menuIdFilter || subMenu);
    yield findMenuDefault(menus, props);
  }
  const findIt = findMenuIterator();
  let current = findIt.next();
  let menu = current.value;
  while (!current.done) {
    menu = current.value;
    if (menu) {
      findIt.return();
    }
    current = findIt.next();
  }
  return menu;
}

/**
 * Returns the menu from a list of possible menus, based on the actual state of component props and tool data nearby.
 * This uses the findMenu command above to first find the appropriate
 * menu, and then it chooses the actual contents of that menu.
 * A menu item can be optional by implementing the 'selector',
 * which will be called with the selectorProps, and if it does not return true,
 * then the item is excluded.
 *
 * Other menus can be delegated to by setting the delegating value to
 * a string id for another menu.  That menu's content will replace the
 * current menu item (only if the item would be included).
 *
 * This allows single id menus to be chosen by id, but have varying contents
 * based on the delegated menus.
 *
 * Finally, for each item, the adaptItem call is made.  This allows
 * items to modify themselves before being displayed, such as
 * incorporating additional information from translation sources.
 * See the `test-mode` examples for details.
 *
 * @param selectorProps
 * @param {*} event event that originates the context menu
 * @param {*} menus List of menus
 * @param {*} menuIdFilter
 * @returns
 */
function getMenuItems(selectorProps, event, menus, menuIdFilter) {
  // Include both the check props and the ...check props as one is used
  // by the child menu and the other used by the selector function
  const subProps = {
    selectorProps,
    event
  };
  const menu = findMenu(menus, subProps, menuIdFilter);
  if (!menu) {
    return undefined;
  }
  if (!menu.items) {
    console.warn('Must define items in menu', menu);
    return [];
  }
  let menuItems = [];
  menu.items.forEach(item => {
    const {
      delegating,
      selector,
      subMenu
    } = item;
    if (!selector || selector(selectorProps)) {
      if (delegating) {
        menuItems = [...menuItems, ...getMenuItems(selectorProps, event, menus, subMenu)];
      } else {
        const toAdd = adaptItem(item, subProps);
        menuItems.push(toAdd);
      }
    }
  });
  return menuItems;
}

/**
 * Returns item adapted to be consumed by ContextMenu component
 * and then goes through the item to add action behaviour for clicking the item,
 * making it compatible with the default ContextMenu display.
 *
 * @param {Object} item
 * @param {Object} subProps
 * @returns a MenuItem that is compatible with the base ContextMenu
 *    This requires having a label and set of actions to be called.
 */
function adaptItem(item, subProps) {
  const newItem = {
    ...item,
    value: subProps.selectorProps?.value
  };
  if (item.actionType === 'ShowSubMenu' && !newItem.iconRight) {
    newItem.iconRight = 'chevron-menu';
  }
  if (!item.action) {
    newItem.action = (itemRef, componentProps) => {
      const {
        event = {}
      } = componentProps;
      const {
        detail = {}
      } = event;
      newItem.element = detail.element;
      componentProps.onClose();
      const action = componentProps[`on${itemRef.actionType || 'Default'}`];
      if (action) {
        action.call(componentProps, newItem, itemRef, subProps);
      } else {
        console.warn('No action defined for', itemRef);
      }
    };
  }
  return newItem;
}
// EXTERNAL MODULE: ../../ui/src/components/ContextMenu/ContextMenu.tsx
var ContextMenu = __webpack_require__(59852);
// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/tools/dist/esm/index.js + 82 modules
var dist_esm = __webpack_require__(55139);
;// CONCATENATED MODULE: ../../../extensions/default/src/CustomizableContextMenu/ContextMenuController.tsx
var _ContextMenuController;



/**
 * The context menu controller is a helper class that knows how
 * to manage context menus based on the UI Customization Service.
 * There are a few parts to this:
 *    1. Basic controls to manage displaying and hiding context menus
 *    2. Menu selection services, which use the UI customization service
 *       to choose which menu to display
 *    3. Menu item adapter services to convert menu items into displayable and actionable items.
 *
 * The format for a menu is defined in the exported type MenuItem
 */
class ContextMenuController {
  constructor(servicesManager, commandsManager) {
    this.commandsManager = void 0;
    this.services = void 0;
    this.menuItems = void 0;
    this.services = servicesManager.services;
    this.commandsManager = commandsManager;
  }
  closeContextMenu() {
    this.services.uiDialogService.dismiss({
      id: 'context-menu'
    });
  }

  /**
   * Figures out which context menu is appropriate to display and shows it.
   *
   * @param contextMenuProps - the context menu properties, see ./types.ts
   * @param viewportElement - the DOM element this context menu is related to
   * @param defaultPointsPosition - a default position to show the context menu
   */
  showContextMenu(contextMenuProps, viewportElement, defaultPointsPosition) {
    if (!this.services.uiDialogService) {
      console.warn('Unable to show dialog; no UI Dialog Service available.');
      return;
    }
    const {
      event,
      subMenu,
      menuId,
      menus,
      selectorProps
    } = contextMenuProps;
    const annotationManager = dist_esm.annotation.state.getAnnotationManager();
    const {
      locking
    } = dist_esm.annotation;
    const targetAnnotationId = selectorProps?.nearbyToolData?.annotationUID;
    const isLocked = locking.isAnnotationLocked(annotationManager.getAnnotation(targetAnnotationId));
    if (isLocked) {
      console.warn('Annotation is locked.');
      return;
    }
    const items = getMenuItems(selectorProps || contextMenuProps, event, menus, menuId);
    this.services.uiDialogService.dismiss({
      id: 'context-menu'
    });
    this.services.uiDialogService.create({
      id: 'context-menu',
      isDraggable: false,
      preservePosition: false,
      preventCutOf: true,
      defaultPosition: ContextMenuController._getDefaultPosition(defaultPointsPosition, event?.detail, viewportElement),
      event,
      content: ContextMenu/* default */.A,
      // This naming is part of the uiDialogService convention
      // Clicking outside simply closes the dialog box.
      onClickOutside: () => this.services.uiDialogService.dismiss({
        id: 'context-menu'
      }),
      contentProps: {
        items,
        selectorProps,
        menus,
        event,
        subMenu,
        eventData: event?.detail,
        onClose: () => {
          this.services.uiDialogService.dismiss({
            id: 'context-menu'
          });
        },
        /**
         * Displays a sub-menu, removing this menu
         * @param {*} item
         * @param {*} itemRef
         * @param {*} subProps
         */
        onShowSubMenu: (item, itemRef, subProps) => {
          if (!itemRef.subMenu) {
            console.warn('No submenu defined for', item, itemRef, subProps);
            return;
          }
          this.showContextMenu({
            ...contextMenuProps,
            menuId: itemRef.subMenu
          }, viewportElement, defaultPointsPosition);
        },
        // Default is to run the specified commands.
        onDefault: (item, itemRef, subProps) => {
          this.commandsManager.run(item, {
            ...selectorProps,
            ...itemRef,
            subProps
          });
        }
      }
    });
  }
}
_ContextMenuController = ContextMenuController;
ContextMenuController.getDefaultPosition = () => {
  return {
    x: 0,
    y: 0
  };
};
ContextMenuController._getEventDefaultPosition = eventDetail => ({
  x: eventDetail && eventDetail.currentPoints.client[0],
  y: eventDetail && eventDetail.currentPoints.client[1]
});
ContextMenuController._getElementDefaultPosition = element => {
  if (element) {
    const boundingClientRect = element.getBoundingClientRect();
    return {
      x: boundingClientRect.x,
      y: boundingClientRect.y
    };
  }
  return {
    x: undefined,
    y: undefined
  };
};
ContextMenuController._getCanvasPointsPosition = (points = [], element) => {
  const viewerPos = _ContextMenuController._getElementDefaultPosition(element);
  for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
    const point = {
      x: points[pointIndex][0] || points[pointIndex]['x'],
      y: points[pointIndex][1] || points[pointIndex]['y']
    };
    if (_ContextMenuController._isValidPosition(point) && _ContextMenuController._isValidPosition(viewerPos)) {
      return {
        x: point.x + viewerPos.x,
        y: point.y + viewerPos.y
      };
    }
  }
};
ContextMenuController._isValidPosition = source => {
  return source && typeof source.x === 'number' && typeof source.y === 'number';
};
/**
 * Returns the context menu default position. It look for the positions of: canvasPoints (got from selected), event that triggers it, current viewport element
 */
ContextMenuController._getDefaultPosition = (canvasPoints, eventDetail, viewerElement) => {
  function* getPositionIterator() {
    yield _ContextMenuController._getCanvasPointsPosition(canvasPoints, viewerElement);
    yield _ContextMenuController._getEventDefaultPosition(eventDetail);
    yield _ContextMenuController._getElementDefaultPosition(viewerElement);
    yield _ContextMenuController.getDefaultPosition();
  }
  const positionIterator = getPositionIterator();
  let current = positionIterator.next();
  let position = current.value;
  while (!current.done) {
    position = current.value;
    if (_ContextMenuController._isValidPosition(position)) {
      positionIterator.return();
    }
    current = positionIterator.next();
  }
  return position;
};
;// CONCATENATED MODULE: ../../../extensions/default/src/CustomizableContextMenu/defaultContextMenu.ts
const defaultContextMenu = {
  id: 'measurementsContextMenu',
  customizationType: 'ohif.contextMenu',
  menus: [
  // Get the items from the UI Customization for the menu name (and have a custom name)
  {
    id: 'forExistingMeasurement',
    selector: ({
      nearbyToolData
    }) => !!nearbyToolData,
    items: [{
      label: 'Delete measurement',
      commands: [{
        commandName: 'deleteMeasurement',
        // we only have support for cornerstoneTools context menu since
        // they are svg based
        context: 'CORNERSTONE'
      }]
    }, {
      label: 'Add Label',
      commands: [{
        commandName: 'setMeasurementLabel'
      }]
    }]
  }]
};
/* harmony default export */ const CustomizableContextMenu_defaultContextMenu = (defaultContextMenu);
;// CONCATENATED MODULE: ../../../extensions/default/src/CustomizableContextMenu/types.ts


;// CONCATENATED MODULE: ../../../extensions/default/src/CustomizableContextMenu/index.ts





// EXTERNAL MODULE: ../../../node_modules/moment/moment.js
var moment = __webpack_require__(14867);
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);
// EXTERNAL MODULE: ../../../node_modules/lodash.debounce/index.js
var lodash_debounce = __webpack_require__(62051);
var lodash_debounce_default = /*#__PURE__*/__webpack_require__.n(lodash_debounce);
// EXTERNAL MODULE: ../../../node_modules/react-window/dist/index.esm.js
var index_esm = __webpack_require__(28271);
// EXTERNAL MODULE: ../../../node_modules/classnames/index.js
var classnames = __webpack_require__(55530);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
;// CONCATENATED MODULE: ../../../extensions/default/src/DicomTagBrowser/DicomTagTable.tsx




const lineHeightPx = 20;
const lineHeightClassName = `leading-[${lineHeightPx}px]`;
const rowVerticalPaddingPx = 10;
const rowBottomBorderPx = 1;
const rowVerticalPaddingStyle = {
  padding: `${rowVerticalPaddingPx}px 0`
};
const rowStyle = {
  borderBottomWidth: `${rowBottomBorderPx}px`,
  ...rowVerticalPaddingStyle
};
function ColumnHeaders({
  tagRef,
  vrRef,
  keywordRef,
  valueRef
}) {
  return /*#__PURE__*/react.createElement("div", {
    className: classnames_default()('bg-secondary-dark ohif-scrollbar flex w-full flex-row overflow-y-scroll'),
    style: rowVerticalPaddingStyle
  }, /*#__PURE__*/react.createElement("div", {
    className: "w-4/24 px-3"
  }, /*#__PURE__*/react.createElement("label", {
    ref: tagRef,
    className: "flex flex-1 select-none flex-col pl-1 text-lg text-white"
  }, /*#__PURE__*/react.createElement("span", {
    className: "flex flex-row items-center focus:outline-none"
  }, "Tag"))), /*#__PURE__*/react.createElement("div", {
    className: "w-2/24 px-3"
  }, /*#__PURE__*/react.createElement("label", {
    ref: vrRef,
    className: "flex flex-1 select-none flex-col pl-1 text-lg text-white"
  }, /*#__PURE__*/react.createElement("span", {
    className: "flex flex-row items-center focus:outline-none"
  }, "VR"))), /*#__PURE__*/react.createElement("div", {
    className: "w-6/24 px-3"
  }, /*#__PURE__*/react.createElement("label", {
    ref: keywordRef,
    className: "flex flex-1 select-none flex-col pl-1 text-lg text-white"
  }, /*#__PURE__*/react.createElement("span", {
    className: "flex flex-row items-center focus:outline-none"
  }, "Keyword"))), /*#__PURE__*/react.createElement("div", {
    className: "w-5/24 grow px-3"
  }, /*#__PURE__*/react.createElement("label", {
    ref: valueRef,
    className: "flex flex-1 select-none flex-col pl-1 text-lg text-white"
  }, /*#__PURE__*/react.createElement("span", {
    className: "flex flex-row items-center focus:outline-none"
  }, "Value"))));
}
function DicomTagTable({
  rows
}) {
  const listRef = (0,react.useRef)();
  const canvasRef = (0,react.useRef)();
  const [tagHeaderElem, setTagHeaderElem] = (0,react.useState)(null);
  const [vrHeaderElem, setVrHeaderElem] = (0,react.useState)(null);
  const [keywordHeaderElem, setKeywordHeaderElem] = (0,react.useState)(null);
  const [valueHeaderElem, setValueHeaderElem] = (0,react.useState)(null);

  // Here the refs are inturn stored in state to trigger a render of the table.
  // This virtualized table does NOT render until the header is rendered because the header column widths are used to determine the row heights in the table.
  // Therefore whenever the refs change (in particular the first time the refs are set), we want to trigger a render of the table.
  const tagRef = elem => {
    if (elem) {
      setTagHeaderElem(elem);
    }
  };
  const vrRef = elem => {
    if (elem) {
      setVrHeaderElem(elem);
    }
  };
  const keywordRef = elem => {
    if (elem) {
      setKeywordHeaderElem(elem);
    }
  };
  const valueRef = elem => {
    if (elem) {
      setValueHeaderElem(elem);
    }
  };

  /**
   * When new rows are set, scroll to the top and reset the virtualization.
   */
  (0,react.useEffect)(() => {
    if (!listRef?.current) {
      return;
    }
    listRef.current.scrollTo(0);
    listRef.current.resetAfterIndex(0);
  }, [rows]);

  /**
   * When the browser window resizes, update the row virtualization (i.e. row heights)
   */
  (0,react.useEffect)(() => {
    const debouncedResize = lodash_debounce_default()(() => listRef.current.resetAfterIndex(0), 100);
    window.addEventListener('resize', debouncedResize);
    return () => {
      debouncedResize.cancel();
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);
  const Row = (0,react.useCallback)(({
    index,
    style
  }) => {
    const row = rows[index];
    return /*#__PURE__*/react.createElement("div", {
      style: {
        ...style,
        ...rowStyle
      },
      className: classnames_default()('hover:bg-secondary-main border-secondary-light flex w-full flex-row items-center break-all bg-black text-base transition duration-300', lineHeightClassName),
      key: `DICOMTagRow-${index}`
    }, /*#__PURE__*/react.createElement("div", {
      className: "w-4/24 px-3"
    }, row[0]), /*#__PURE__*/react.createElement("div", {
      className: "w-2/24 px-3"
    }, row[1]), /*#__PURE__*/react.createElement("div", {
      className: "w-6/24 px-3"
    }, row[2]), /*#__PURE__*/react.createElement("div", {
      className: "w-5/24 grow px-3"
    }, row[3]));
  }, [rows]);

  /**
   * Whenever any one of the column headers is set, then the header is rendered.
   * Here we chose the tag header.
   */
  const isHeaderRendered = (0,react.useCallback)(() => tagHeaderElem !== null, [tagHeaderElem]);

  /**
   * Get the item/row size. We use the header column widths to calculate the various row heights.
   * @param index the row index
   * @returns the row height
   */
  const getItemSize = (0,react.useCallback)(index => {
    const headerWidths = [tagHeaderElem.offsetWidth, vrHeaderElem.offsetWidth, keywordHeaderElem.offsetWidth, valueHeaderElem.offsetWidth];
    const context = canvasRef.current.getContext('2d');
    context.font = getComputedStyle(canvasRef.current).font;
    return rows[index].map((colText, index) => {
      const colOneLineWidth = context.measureText(colText).width;
      const numLines = Math.ceil(colOneLineWidth / headerWidths[index]);
      return numLines * lineHeightPx + 2 * rowVerticalPaddingPx + rowBottomBorderPx;
    }).reduce((maxHeight, colHeight) => Math.max(maxHeight, colHeight));
  }, [rows, keywordHeaderElem, tagHeaderElem, valueHeaderElem, vrHeaderElem]);
  return /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("canvas", {
    style: {
      visibility: 'hidden',
      position: 'absolute'
    },
    className: "text-base",
    ref: canvasRef
  }), /*#__PURE__*/react.createElement(ColumnHeaders, {
    tagRef: tagRef,
    vrRef: vrRef,
    keywordRef: keywordRef,
    valueRef: valueRef
  }), /*#__PURE__*/react.createElement("div", {
    className: "relative m-auto border-2 border-black bg-black",
    style: {
      height: '32rem'
    }
  }, isHeaderRendered() && /*#__PURE__*/react.createElement(index_esm/* VariableSizeList */._m, {
    ref: listRef,
    height: 500,
    itemCount: rows.length,
    itemSize: getItemSize,
    width: '100%',
    className: "ohif-scrollbar"
  }, Row)));
}
/* harmony default export */ const DicomTagBrowser_DicomTagTable = (DicomTagTable);
;// CONCATENATED MODULE: ../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.css
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ../../../extensions/default/src/DicomTagBrowser/DicomTagBrowser.tsx









const {
  ImageSet: DicomTagBrowser_ImageSet
} = src/* classes */.Ly;
const {
  DicomMetaDictionary: DicomTagBrowser_DicomMetaDictionary
} = dcmjs_es/* default.data */.Ay.data;
const {
  nameMap
} = DicomTagBrowser_DicomMetaDictionary;
const DicomTagBrowser = ({
  displaySets,
  displaySetInstanceUID
}) => {
  // The column indices that are to be excluded during a filter of the table.
  // At present the column indices are:
  // 0: DICOM tag
  // 1: VR
  // 2: Keyword
  // 3: Value
  const excludedColumnIndicesForFilter = new Set([1]);
  const [selectedDisplaySetInstanceUID, setSelectedDisplaySetInstanceUID] = (0,react.useState)(displaySetInstanceUID);
  const [instanceNumber, setInstanceNumber] = (0,react.useState)(1);
  const [filterValue, setFilterValue] = (0,react.useState)('');
  const onSelectChange = value => {
    setSelectedDisplaySetInstanceUID(value.value);
    setInstanceNumber(1);
  };
  const activeDisplaySet = displaySets.find(ds => ds.displaySetInstanceUID === selectedDisplaySetInstanceUID);
  const isImageStack = _isImageStack(activeDisplaySet);
  const showInstanceList = isImageStack && activeDisplaySet.images.length > 1;
  const displaySetList = (0,react.useMemo)(() => {
    displaySets.sort((a, b) => a.SeriesNumber - b.SeriesNumber);
    return displaySets.map(displaySet => {
      const {
        displaySetInstanceUID,
        SeriesDate,
        SeriesTime,
        SeriesNumber,
        SeriesDescription,
        Modality
      } = displaySet;

      /* Map to display representation */
      const dateStr = `${SeriesDate}:${SeriesTime}`.split('.')[0];
      const date = moment_default()(dateStr, 'YYYYMMDD:HHmmss');
      const displayDate = date.format('ddd, MMM Do YYYY');
      return {
        value: displaySetInstanceUID,
        label: `${SeriesNumber} (${Modality}):  ${SeriesDescription}`,
        description: displayDate
      };
    });
  }, [displaySets]);
  const rows = (0,react.useMemo)(() => {
    let metadata;
    if (isImageStack) {
      metadata = activeDisplaySet.images[instanceNumber - 1];
    } else {
      metadata = activeDisplaySet.instance || activeDisplaySet;
    }
    const tags = getSortedTags(metadata);
    return getFormattedRowsFromTags(tags, metadata);
  }, [instanceNumber, selectedDisplaySetInstanceUID]);
  const filteredRows = (0,react.useMemo)(() => {
    if (!filterValue) {
      return rows;
    }
    const filterValueLowerCase = filterValue.toLowerCase();
    return rows.filter(row => {
      return row.reduce((keepRow, col, colIndex) => {
        if (keepRow) {
          // We are already keeping the row, why do more work so return now.
          return keepRow;
        }
        if (excludedColumnIndicesForFilter.has(colIndex)) {
          return keepRow;
        }
        return keepRow || col.toLowerCase().includes(filterValueLowerCase);
      }, false);
    });
  }, [rows, filterValue]);
  const debouncedSetFilterValue = (0,react.useMemo)(() => {
    return lodash_debounce_default()(setFilterValue, 200);
  }, []);
  (0,react.useEffect)(() => {
    return () => {
      debouncedSetFilterValue?.cancel();
    };
  }, []);
  return /*#__PURE__*/react.createElement("div", {
    className: "dicom-tag-browser-content bg-muted"
  }, /*#__PURE__*/react.createElement("div", {
    className: "mb-6 flex flex-row items-start pl-1"
  }, /*#__PURE__*/react.createElement("div", {
    className: "flex w-full flex-row items-start gap-4"
  }, /*#__PURE__*/react.createElement("div", {
    className: "flex w-1/3 flex-col"
  }, /*#__PURE__*/react.createElement("span", {
    className: "text-muted-foreground flex h-6 items-center text-xs"
  }, "Series"), /*#__PURE__*/react.createElement(ui_next_src/* Select */.l6, {
    value: selectedDisplaySetInstanceUID,
    onValueChange: value => onSelectChange({
      value
    })
  }, /*#__PURE__*/react.createElement(ui_next_src/* SelectTrigger */.bq, null, displaySetList.find(ds => ds.value === selectedDisplaySetInstanceUID)?.label || 'Select Series'), /*#__PURE__*/react.createElement(ui_next_src/* SelectContent */.gC, null, displaySetList.map(item => {
    return /*#__PURE__*/react.createElement(ui_next_src/* SelectItem */.eb, {
      key: item.value,
      value: item.value
    }, item.label, /*#__PURE__*/react.createElement("span", {
      className: "text-muted-foreground ml-1 text-xs"
    }, item.description));
  })))), showInstanceList && /*#__PURE__*/react.createElement("div", {
    className: "mx-auto flex w-1/5 flex-col"
  }, /*#__PURE__*/react.createElement("span", {
    className: "text-muted-foreground flex h-6 items-center text-xs"
  }, "Instance Number (", instanceNumber, " of ", activeDisplaySet.images.length, ")"), /*#__PURE__*/react.createElement(ui_next_src/* Slider */.Ap, {
    value: [instanceNumber],
    onValueChange: ([value]) => {
      setInstanceNumber(value);
    },
    min: 1,
    max: activeDisplaySet.images.length,
    step: 1,
    className: "pt-4"
  })), /*#__PURE__*/react.createElement("div", {
    className: "ml-auto flex w-1/3 flex-col"
  }, /*#__PURE__*/react.createElement("span", {
    className: "text-muted-foreground flex h-6 items-center text-xs"
  }, "Search metadata"), /*#__PURE__*/react.createElement(ui_src/* InputFilterText */.Cv, {
    placeholder: "Search metadata...",
    onDebounceChange: setFilterValue
  })))), /*#__PURE__*/react.createElement(DicomTagBrowser_DicomTagTable, {
    rows: filteredRows
  }));
};
function getFormattedRowsFromTags(tags, metadata) {
  const rows = [];
  tags.forEach(tagInfo => {
    if (tagInfo.vr === 'SQ') {
      rows.push([`${tagInfo.tagIndent}${tagInfo.tag}`, tagInfo.vr, tagInfo.keyword, '']);
      const {
        values
      } = tagInfo;
      values.forEach((item, index) => {
        const formatedRowsFromTags = getFormattedRowsFromTags(item, metadata);
        rows.push([`${item[0].tagIndent}(FFFE,E000)`, '', `Item #${index}`, '']);
        rows.push(...formatedRowsFromTags);
      });
    } else {
      if (tagInfo.vr === 'xs') {
        try {
          const tag = dcmjs_es/* default.data */.Ay.data.Tag.fromPString(tagInfo.tag).toCleanString();
          const originalTagInfo = metadata[tag];
          tagInfo.vr = originalTagInfo.vr;
        } catch (error) {
          console.error(`Failed to parse value representation for tag '${tagInfo.keyword}'`);
        }
      }
      rows.push([`${tagInfo.tagIndent}${tagInfo.tag}`, tagInfo.vr, tagInfo.keyword, tagInfo.value]);
    }
  });
  return rows;
}
function getSortedTags(metadata) {
  const tagList = getRows(metadata);

  // Sort top level tags, sequence groups are sorted when created.
  _sortTagList(tagList);
  return tagList;
}
function getRows(metadata, depth = 0) {
  // Tag, Type, Value, Keyword

  const keywords = Object.keys(metadata);
  let tagIndent = '';
  for (let i = 0; i < depth; i++) {
    tagIndent += '>';
  }
  if (depth > 0) {
    tagIndent += ' '; // If indented, add a space after the indents.
  }
  const rows = [];
  for (let i = 0; i < keywords.length; i++) {
    let keyword = keywords[i];
    if (keyword === '_vrMap') {
      continue;
    }
    const tagInfo = nameMap[keyword];
    let value = metadata[keyword];
    if (tagInfo && tagInfo.vr === 'SQ') {
      const sequenceAsArray = toArray(value);

      // Push line defining the sequence

      const sequence = {
        tag: tagInfo.tag,
        tagIndent,
        vr: tagInfo.vr,
        keyword,
        values: []
      };
      rows.push(sequence);
      if (value === null) {
        // Type 2 Sequence
        continue;
      }
      sequenceAsArray.forEach(item => {
        const sequenceRows = getRows(item, depth + 1);
        if (sequenceRows.length) {
          // Sort the sequence group.
          _sortTagList(sequenceRows);
          sequence.values.push(sequenceRows);
        }
      });
      continue;
    }
    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] != 'object') {
        value = value.join('\\');
      }
    }
    if (typeof value === 'number') {
      value = value.toString();
    }
    if (typeof value !== 'string') {
      if (value === null) {
        value = ' ';
      } else {
        if (typeof value === 'object') {
          if (value.InlineBinary) {
            value = 'Inline Binary';
          } else if (value.BulkDataURI) {
            value = `Bulk Data URI`; //: ${value.BulkDataURI}`;
          } else if (value.Alphabetic) {
            value = value.Alphabetic;
          } else {
            console.warn(`Unrecognised Value: ${value} for ${keyword}:`);
            console.warn(value);
            value = ' ';
          }
        } else {
          console.warn(`Unrecognised Value: ${value} for ${keyword}:`);
          value = ' ';
        }
      }
    }

    // tag / vr/ keyword/ value

    // Remove retired tags
    keyword = keyword.replace('RETIRED_', '');
    if (tagInfo) {
      rows.push({
        tag: tagInfo.tag,
        tagIndent,
        vr: tagInfo.vr,
        keyword,
        value
      });
    } else {
      // skip properties without hex tag numbers
      const regex = /[0-9A-Fa-f]{6}/g;
      if (keyword.match(regex)) {
        const tag = `(${keyword.substring(0, 4)},${keyword.substring(4, 8)})`;
        rows.push({
          tag,
          tagIndent,
          vr: '',
          keyword: 'Private Tag',
          value
        });
      }
    }
  }
  return rows;
}
function _isImageStack(displaySet) {
  return displaySet instanceof DicomTagBrowser_ImageSet;
}
function toArray(objectOrArray) {
  return Array.isArray(objectOrArray) ? objectOrArray : [objectOrArray];
}
function _sortTagList(tagList) {
  tagList.sort((a, b) => {
    if (a.tag < b.tag) {
      return -1;
    }
    return 1;
  });
}
/* harmony default export */ const DicomTagBrowser_DicomTagBrowser = (DicomTagBrowser);
// EXTERNAL MODULE: ../node_modules/zustand/esm/index.mjs + 1 modules
var zustand_esm = __webpack_require__(95759);
// EXTERNAL MODULE: ../node_modules/zustand/esm/middleware.mjs
var middleware = __webpack_require__(39100);
;// CONCATENATED MODULE: ../../../extensions/default/src/stores/useViewportGridStore.ts



/**
 * Identifier for the viewport grid store type.
 */
const PRESENTATION_TYPE_ID = 'viewportGridId';

/**
 * Flag to enable or disable debug mode for the store.
 * Set to `true` to enable zustand devtools.
 */
const DEBUG_STORE = false;

/**
 * Represents the state of the viewport grid.
 */

/**
 * State shape for the Viewport Grid store.
 */

/**
 * Creates the Viewport Grid store.
 *
 * @param set - The zustand set function.
 * @returns The Viewport Grid store state and actions.
 */
const createViewportGridStore = set => ({
  type: PRESENTATION_TYPE_ID,
  viewportGridState: {},
  /**
   * Sets the viewport grid state for a given key.
   */
  setViewportGridState: (key, value) => set(state => ({
    viewportGridState: {
      ...state.viewportGridState,
      [key]: value
    }
  }), false, 'setViewportGridState'),
  /**
   * Clears the entire viewport grid state.
   */
  clearViewportGridState: () => set({
    viewportGridState: {}
  }, false, 'clearViewportGridState')
});

/**
 * Zustand store for managing viewport grid state.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const useViewportGridStore = (0,zustand_esm/* create */.vt)()(DEBUG_STORE ? (0,middleware/* devtools */.lt)(createViewportGridStore, {
  name: 'ViewportGridStore'
}) : createViewportGridStore);
;// CONCATENATED MODULE: ../../../extensions/default/src/stores/useDisplaySetSelectorStore.ts



/**
 * Identifier for the display set selector store type.
 */
const useDisplaySetSelectorStore_PRESENTATION_TYPE_ID = 'displaySetSelectorId';

/**
 * Flag to enable or disable debug mode for the store.
 * Set to `true` to enable zustand devtools.
 */
const useDisplaySetSelectorStore_DEBUG_STORE = false;

/**
 * State shape for the Display Set Selector store.
 */

/**
 * Creates the Display Set Selector store.
 *
 * @param set - The zustand set function.
 * @returns The display set selector store state and actions.
 */
const createDisplaySetSelectorStore = set => ({
  type: useDisplaySetSelectorStore_PRESENTATION_TYPE_ID,
  displaySetSelectorMap: {},
  /**
   * Sets the display set selector for a given key.
   */
  setDisplaySetSelector: (key, value) => set(state => ({
    displaySetSelectorMap: {
      ...state.displaySetSelectorMap,
      [key]: value
    }
  }), false, 'setDisplaySetSelector'),
  /**
   * Clears the entire display set selector map.
   */
  clearDisplaySetSelectorMap: () => set({
    displaySetSelectorMap: {}
  }, false, 'clearDisplaySetSelectorMap')
});

/**
 * Zustand store for managing display set selectors.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const useDisplaySetSelectorStore = (0,zustand_esm/* create */.vt)()(useDisplaySetSelectorStore_DEBUG_STORE ? (0,middleware/* devtools */.lt)(createDisplaySetSelectorStore, {
  name: 'DisplaySetSelectorStore'
}) : createDisplaySetSelectorStore);
;// CONCATENATED MODULE: ../../../extensions/default/src/stores/useHangingProtocolStageIndexStore.ts


const useHangingProtocolStageIndexStore_PRESENTATION_TYPE_ID = 'hangingProtocolStageIndexId';
const useHangingProtocolStageIndexStore_DEBUG_STORE = false;

/**
 * Represents the state and actions for managing hanging protocol stage indexes.
 */

/**
 * Creates the Hanging Protocol Stage Index store.
 *
 * @param set - The zustand set function.
 * @returns The hanging protocol stage index store state and actions.
 */
const createHangingProtocolStageIndexStore = set => ({
  hangingProtocolStageIndexMap: {},
  type: useHangingProtocolStageIndexStore_PRESENTATION_TYPE_ID,
  /**
   * Sets the hanging protocol stage index for a given key.
   */
  setHangingProtocolStageIndex: (key, value) => set(state => ({
    hangingProtocolStageIndexMap: {
      ...state.hangingProtocolStageIndexMap,
      [key]: value
    }
  }), false, 'setHangingProtocolStageIndex'),
  /**
   * Clears all hanging protocol stage indexes.
   */
  clearHangingProtocolStageIndexMap: () => set({
    hangingProtocolStageIndexMap: {}
  }, false, 'clearHangingProtocolStageIndexMap')
});

/**
 * Zustand store for managing hanging protocol stage indexes.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const useHangingProtocolStageIndexStore = (0,zustand_esm/* create */.vt)()(useHangingProtocolStageIndexStore_DEBUG_STORE ? (0,middleware/* devtools */.lt)(createHangingProtocolStageIndexStore, {
  name: 'HangingProtocolStageIndexStore'
}) : createHangingProtocolStageIndexStore);
;// CONCATENATED MODULE: ../../../extensions/default/src/utils/reuseCachedLayouts.ts



/**
 * Calculates a set of state information for hanging protocols and viewport grid
 * which defines the currently applied hanging protocol state.
 * @param state is the viewport grid state
 * @param syncService is the state sync service to use for getting existing state
 * @returns Set of states that can be applied to the state sync to remember
 *   the current view state.
 */
const reuseCachedLayout = (state, hangingProtocolService) => {
  const {
    activeViewportId
  } = state;
  const {
    protocol
  } = hangingProtocolService.getActiveProtocol();
  if (!protocol) {
    return;
  }
  const hpInfo = hangingProtocolService.getState();
  const {
    protocolId,
    stageIndex,
    activeStudyUID
  } = hpInfo;
  const {
    viewportGridState,
    setViewportGridState
  } = useViewportGridStore.getState();
  const {
    displaySetSelectorMap,
    setDisplaySetSelector
  } = useDisplaySetSelectorStore.getState();
  const {
    hangingProtocolStageIndexMap,
    setHangingProtocolStageIndex
  } = useHangingProtocolStageIndexStore.getState();
  const stage = protocol.stages[stageIndex];
  const storeId = `${activeStudyUID}:${protocolId}:${stageIndex}`;
  const cacheId = `${activeStudyUID}:${protocolId}`;
  const {
    rows,
    columns
  } = stage.viewportStructure.properties;
  const custom = stage.viewports.length !== state.viewports.size || state.layout.numRows !== rows || state.layout.numCols !== columns;
  hangingProtocolStageIndexMap[cacheId] = hpInfo;
  if (storeId && custom) {
    setViewportGridState(storeId, {
      ...state
    });
  }
  state.viewports.forEach((viewport, viewportId) => {
    const {
      displaySetOptions,
      displaySetInstanceUIDs
    } = viewport;
    if (!displaySetOptions) {
      return;
    }
    for (let i = 0; i < displaySetOptions.length; i++) {
      const displaySetUID = displaySetInstanceUIDs[i];
      if (!displaySetUID) {
        continue;
      }
      if (viewportId === activeViewportId && i === 0) {
        setDisplaySetSelector(`${activeStudyUID}:activeDisplaySet:0`, displaySetUID);
      }
      if (displaySetOptions[i]?.id) {
        setDisplaySetSelector(`${activeStudyUID}:${displaySetOptions[i].id}:${displaySetOptions[i].matchedDisplaySetsIndex || 0}`, displaySetUID);
      }
    }
  });
  setHangingProtocolStageIndex(cacheId, hpInfo);
  return {
    hangingProtocolStageIndexMap,
    viewportGridStore: viewportGridState,
    displaySetSelectorMap
  };
};
/* harmony default export */ const reuseCachedLayouts = (reuseCachedLayout);
;// CONCATENATED MODULE: ../../../extensions/default/src/stores/useViewportsByPositionStore.ts


const useViewportsByPositionStore_PRESENTATION_TYPE_ID = 'viewportsByPositionId';
const useViewportsByPositionStore_DEBUG_STORE = true;

/**
 * Represents the state and actions for managing viewports by position.
 */

/**
 * Creates the Viewports By Position store.
 *
 * @param set - The zustand set function.
 * @returns The Viewports By Position store state and actions.
 */
const createViewportsByPositionStore = set => ({
  type: useViewportsByPositionStore_PRESENTATION_TYPE_ID,
  viewportsByPosition: {},
  initialInDisplay: [],
  /**
   * Sets the viewport for a given key.
   */
  setViewportsByPosition: (key, value) => set(state => ({
    viewportsByPosition: {
      ...state.viewportsByPosition,
      [key]: value
    }
  }), false, 'setViewportsByPosition'),
  /**
   * Clears all viewports by position.
   */
  clearViewportsByPosition: () => set({
    viewportsByPosition: {}
  }, false, 'clearViewportsByPosition'),
  /**
   * Adds an initial display viewport.
   */
  addInitialInDisplay: value => set(state => ({
    initialInDisplay: [...state.initialInDisplay, value]
  }), false, 'addInitialInDisplay')
});

/**
 * Zustand store for managing viewports by position.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const useViewportsByPositionStore = (0,zustand_esm/* create */.vt)()(useViewportsByPositionStore_DEBUG_STORE ? (0,middleware/* devtools */.lt)(createViewportsByPositionStore, {
  name: 'ViewportsByPositionStore'
}) : createViewportsByPositionStore);
;// CONCATENATED MODULE: ../../../extensions/default/src/findViewportsByPosition.ts


/**
 * This find or create viewport is paired with the reduce results from
 * below, and the action of this viewport is to look for previously filled
 * viewports, and to reuse by position id.  If there is no filled viewport,
 * then one can be re-used from the display set if it isn't going to be displayed.
 * @param hangingProtocolService - bound parameter supplied before using this
 * @param viewportsByPosition - bound parameter supplied before using this
 * @param position - the position in the grid to retrieve
 * @param positionId - the current position on screen to retrieve
 * @param options - the set of options used, so that subsequent calls can
 *                  store state that is reset by the setLayout.
 *                  This class uses the options to store the already viewed
 *                  display sets, filling it initially with the pre-existing viewports.
 */
const findViewportsByPosition_findOrCreateViewport = (hangingProtocolService, isHangingProtocolLayout, viewportsByPosition, position, positionId, options) => {
  const byPositionViewport = viewportsByPosition?.[positionId];
  if (byPositionViewport) {
    return {
      ...byPositionViewport
    };
  }
  const {
    protocolId,
    stageIndex
  } = hangingProtocolService.getState();

  // Setup the initial in display correctly for initial view/select
  if (!options.inDisplay) {
    options.inDisplay = [...viewportsByPosition.initialInDisplay];
  }

  // See if there is a default viewport for new views
  const missing = hangingProtocolService.getMissingViewport(isHangingProtocolLayout ? protocolId : 'default', stageIndex, options);
  if (missing) {
    const displaySetInstanceUIDs = missing.displaySetsInfo.map(it => it.displaySetInstanceUID);
    options.inDisplay.push(...displaySetInstanceUIDs);
    return {
      displaySetInstanceUIDs,
      displaySetOptions: missing.displaySetsInfo.map(it => it.displaySetOptions),
      viewportOptions: {
        ...missing.viewportOptions
      }
    };
  }

  // and lastly if there is no default viewport, then we see if we can grab the
  // viewportsByPosition at the position index and use that
  // const candidate = Object.values(viewportsByPosition)[position];

  // // if it has something to display, then we can use it
  // return candidate?.displaySetInstanceUIDs ? candidate : {};
  return {};
};

/**
 * Records the information on what viewports are displayed in which position.
 * Also records what instances from the existing positions are going to be in
 * view initially.
 * @param state is the viewport grid state
 * @param syncService is the state sync service to use for getting existing state
 * @returns Set of states that can be applied to the state sync to remember
 *   the current view state.
 */
const findViewportsByPosition = (state, {
  numRows,
  numCols
}) => {
  const {
    viewports
  } = state;
  const {
    setViewportsByPosition,
    addInitialInDisplay
  } = useViewportsByPositionStore.getState();
  const initialInDisplay = [];
  const viewportsByPosition = {};
  viewports.forEach(viewport => {
    if (viewport.positionId) {
      const storedViewport = {
        ...viewport,
        viewportOptions: {
          ...viewport.viewportOptions
        }
      };
      viewportsByPosition[viewport.positionId] = storedViewport;
      setViewportsByPosition(viewport.positionId, storedViewport);
    }
  });
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const positionId = `${col}-${row}`;
      const viewport = viewportsByPosition[positionId];
      if (viewport?.displaySetInstanceUIDs) {
        initialInDisplay.push(...viewport.displaySetInstanceUIDs);
      }
    }
  }
  initialInDisplay.forEach(displaySetInstanceUID => addInitialInDisplay(displaySetInstanceUID));
};
/* harmony default export */ const src_findViewportsByPosition = (findViewportsByPosition);
// EXTERNAL MODULE: ./index.js + 41 modules
var index = __webpack_require__(16265);
;// CONCATENATED MODULE: ../../../extensions/default/src/stores/useToggleHangingProtocolStore.ts


const useToggleHangingProtocolStore_PRESENTATION_TYPE_ID = 'toggleHangingProtocolId';
const useToggleHangingProtocolStore_DEBUG_STORE = false;

/**
 * Represents the state and actions for managing toggle hanging protocols.
 */

/**
 * Creates the Toggle Hanging Protocol store.
 *
 * @param set - The zustand set function.
 * @returns The toggle hanging protocol store state and actions.
 */
const createToggleHangingProtocolStore = set => ({
  toggleHangingProtocol: {},
  type: useToggleHangingProtocolStore_PRESENTATION_TYPE_ID,
  /**
   * Sets the toggle hanging protocol for a given key.
   */
  setToggleHangingProtocol: (key, value) => set(state => ({
    toggleHangingProtocol: {
      ...state.toggleHangingProtocol,
      [key]: value
    }
  }), false, 'setToggleHangingProtocol'),
  /**
   * Clears all toggle hanging protocols.
   */
  clearToggleHangingProtocol: () => set({
    toggleHangingProtocol: {}
  }, false, 'clearToggleHangingProtocol')
});

/**
 * Zustand store for managing toggle hanging protocols.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const useToggleHangingProtocolStore = (0,zustand_esm/* create */.vt)()(useToggleHangingProtocolStore_DEBUG_STORE ? (0,middleware/* devtools */.lt)(createToggleHangingProtocolStore, {
  name: 'ToggleHangingProtocolStore'
}) : createToggleHangingProtocolStore);
// EXTERNAL MODULE: ../../../extensions/default/src/stores/useToggleOneUpViewportGridStore.ts
var useToggleOneUpViewportGridStore = __webpack_require__(73325);
;// CONCATENATED MODULE: ../../../extensions/default/src/commandsModule.ts











const commandsModule = ({
  servicesManager,
  commandsManager
}) => {
  const {
    customizationService,
    measurementService,
    hangingProtocolService,
    uiNotificationService,
    viewportGridService,
    displaySetService
  } = servicesManager.services;

  // Define a context menu controller for use with any context menus
  const contextMenuController = new ContextMenuController(servicesManager, commandsManager);
  const actions = {
    /**
     * Show the context menu.
     * @param options.menuId defines the menu name to lookup, from customizationService
     * @param options.defaultMenu contains the default menu set to use
     * @param options.element is the element to show the menu within
     * @param options.event is the event that caused the context menu
     * @param options.selectorProps is the set of selection properties to use
     */
    showContextMenu: options => {
      const {
        menuCustomizationId,
        element,
        event,
        selectorProps,
        defaultPointsPosition = []
      } = options;
      const optionsToUse = {
        ...options
      };
      if (menuCustomizationId) {
        Object.assign(optionsToUse, customizationService.get(menuCustomizationId, CustomizableContextMenu_defaultContextMenu));
      }

      // TODO - make the selectorProps richer by including the study metadata and display set.
      const {
        protocol,
        stage
      } = hangingProtocolService.getActiveProtocol();
      optionsToUse.selectorProps = {
        event,
        protocol,
        stage,
        ...selectorProps
      };
      contextMenuController.showContextMenu(optionsToUse, element, defaultPointsPosition);
    },
    /** Close a context menu currently displayed */
    closeContextMenu: () => {
      contextMenuController.closeContextMenu();
    },
    displayNotification: ({
      text,
      title,
      type
    }) => {
      uiNotificationService.show({
        title: title,
        message: text,
        type: type
      });
    },
    clearMeasurements: () => {
      measurementService.clear();
    },
    /**
     *  Sets the specified protocol
     *    1. Records any existing state using the viewport grid service
     *    2. Finds the destination state - this can be one of:
     *       a. The specified protocol stage
     *       b. An alternate (toggled or restored) protocol stage
     *       c. A restored custom layout
     *    3. Finds the parameters for the specified state
     *       a. Gets the displaySetSelectorMap
     *       b. Gets the map by position
     *       c. Gets any toggle mapping to map position to/from current view
     *    4. If restore, then sets layout
     *       a. Maps viewport position by currently displayed viewport map id
     *       b. Uses toggle information to map display set id
     *    5. Else applies the hanging protocol
     *       a. HP Service is provided displaySetSelectorMap
     *       b. HP Service will throw an exception if it isn't applicable
     * @param options - contains information on the HP to apply
     * @param options.activeStudyUID - the updated study to apply the HP to
     * @param options.protocolId - the protocol ID to change to
     * @param options.stageId - the stageId to apply
     * @param options.stageIndex - the index of the stage to go to.
     * @param options.reset - flag to indicate if the HP should be reset to its original and not restored to a previous state
     */
    setHangingProtocol: ({
      activeStudyUID = '',
      protocolId,
      stageId,
      stageIndex,
      reset = false
    }) => {
      try {
        // Stores in the state the display set selector id to displaySetUID mapping
        // Pass in viewportId for the active viewport.  This item will get set as
        // the activeViewportId
        const state = viewportGridService.getState();
        const hpInfo = hangingProtocolService.getState();
        reuseCachedLayouts(state, hangingProtocolService);
        const {
          hangingProtocolStageIndexMap
        } = useHangingProtocolStageIndexStore.getState();
        const {
          displaySetSelectorMap
        } = useDisplaySetSelectorStore.getState();
        if (!protocolId) {
          // Reuse the previous protocol id, and optionally stage
          protocolId = hpInfo.protocolId;
          if (stageId === undefined && stageIndex === undefined) {
            stageIndex = hpInfo.stageIndex;
          }
        } else if (stageIndex === undefined && stageId === undefined) {
          // Re-set the same stage as was previously used
          const hangingId = `${activeStudyUID || hpInfo.activeStudyUID}:${protocolId}`;
          stageIndex = hangingProtocolStageIndexMap[hangingId]?.stageIndex;
        }
        const useStageIdx = stageIndex ?? hangingProtocolService.getStageIndex(protocolId, {
          stageId,
          stageIndex
        });
        if (activeStudyUID) {
          hangingProtocolService.setActiveStudyUID(activeStudyUID);
        }
        const storedHanging = `${hangingProtocolService.getState().activeStudyUID}:${protocolId}:${useStageIdx || 0}`;
        const {
          viewportGridState
        } = useViewportGridStore.getState();
        const restoreProtocol = !reset && viewportGridState[storedHanging];
        if (protocolId === hpInfo.protocolId && useStageIdx === hpInfo.stageIndex && !activeStudyUID) {
          // Clear the HP setting to reset them
          hangingProtocolService.setProtocol(protocolId, {
            stageId,
            stageIndex: useStageIdx
          });
        } else {
          hangingProtocolService.setProtocol(protocolId, {
            displaySetSelectorMap,
            stageId,
            stageIndex: useStageIdx,
            restoreProtocol
          });
          if (restoreProtocol) {
            viewportGridService.set(viewportGridState[storedHanging]);
          }
        }
        // Do this after successfully applying the update
        const {
          setDisplaySetSelector
        } = useDisplaySetSelectorStore.getState();
        setDisplaySetSelector(`${activeStudyUID || hpInfo.activeStudyUID}:activeDisplaySet:0`, null);
        return true;
      } catch (e) {
        console.error(e);
        uiNotificationService.show({
          title: 'Apply Hanging Protocol',
          message: 'The hanging protocol could not be applied.',
          type: 'error',
          duration: 3000
        });
        return false;
      }
    },
    toggleHangingProtocol: ({
      protocolId,
      stageIndex
    }) => {
      const {
        protocol,
        stageIndex: desiredStageIndex,
        activeStudy
      } = hangingProtocolService.getActiveProtocol();
      const {
        toggleHangingProtocol,
        setToggleHangingProtocol
      } = useToggleHangingProtocolStore.getState();
      const storedHanging = `${activeStudy.StudyInstanceUID}:${protocolId}:${stageIndex | 0}`;
      if (protocol.id === protocolId && (stageIndex === undefined || stageIndex === desiredStageIndex)) {
        // Toggling off - restore to previous state
        const previousState = toggleHangingProtocol[storedHanging] || {
          protocolId: 'default'
        };
        return actions.setHangingProtocol(previousState);
      } else {
        setToggleHangingProtocol(storedHanging, {
          protocolId: protocol.id,
          stageIndex: desiredStageIndex
        });
        return actions.setHangingProtocol({
          protocolId,
          stageIndex,
          reset: true
        });
      }
    },
    deltaStage: ({
      direction
    }) => {
      const {
        protocolId,
        stageIndex: oldStageIndex
      } = hangingProtocolService.getState();
      const {
        protocol
      } = hangingProtocolService.getActiveProtocol();
      for (let stageIndex = oldStageIndex + direction; stageIndex >= 0 && stageIndex < protocol.stages.length; stageIndex += direction) {
        if (protocol.stages[stageIndex].status !== 'disabled') {
          return actions.setHangingProtocol({
            protocolId,
            stageIndex
          });
        }
      }
      uiNotificationService.show({
        title: 'Change Stage',
        message: 'The hanging protocol has no more applicable stages',
        type: 'info',
        duration: 3000
      });
    },
    /**
     * Changes the viewport grid layout in terms of the MxN layout.
     */
    setViewportGridLayout: ({
      numRows,
      numCols,
      isHangingProtocolLayout = false
    }) => {
      const {
        protocol
      } = hangingProtocolService.getActiveProtocol();
      const onLayoutChange = protocol.callbacks?.onLayoutChange;
      if (commandsManager.run(onLayoutChange, {
        numRows,
        numCols
      }) === false) {
        console.log('setViewportGridLayout running', onLayoutChange, numRows, numCols);
        // Don't apply the layout if the run command returns false
        return;
      }
      const completeLayout = () => {
        const state = viewportGridService.getState();
        src_findViewportsByPosition(state, {
          numRows,
          numCols
        });
        const {
          viewportsByPosition,
          initialInDisplay
        } = useViewportsByPositionStore.getState();
        const findOrCreateViewport = findViewportsByPosition_findOrCreateViewport.bind(null, hangingProtocolService, isHangingProtocolLayout, {
          ...viewportsByPosition,
          initialInDisplay
        });
        viewportGridService.setLayout({
          numRows,
          numCols,
          findOrCreateViewport,
          isHangingProtocolLayout
        });
      };
      // Need to finish any work in the callback
      window.setTimeout(completeLayout, 0);
    },
    toggleOneUp() {
      const viewportGridState = viewportGridService.getState();
      const {
        activeViewportId,
        viewports,
        layout,
        isHangingProtocolLayout
      } = viewportGridState;
      const {
        displaySetInstanceUIDs,
        displaySetOptions,
        viewportOptions
      } = viewports.get(activeViewportId);
      if (layout.numCols === 1 && layout.numRows === 1) {
        // The viewer is in one-up. Check if there is a state to restore/toggle back to.
        const {
          toggleOneUpViewportGridStore
        } = useToggleOneUpViewportGridStore/* useToggleOneUpViewportGridStore */.Y.getState();
        if (!toggleOneUpViewportGridStore) {
          return;
        }
        // There is a state to toggle back to. The viewport that was
        // originally toggled to one up was the former active viewport.
        const viewportIdToUpdate = toggleOneUpViewportGridStore.activeViewportId;

        // We are restoring the previous layout but taking into the account that
        // the current one up viewport might have a new displaySet dragged and dropped on it.
        // updatedViewportsViaHP below contains the viewports applicable to the HP that existed
        // prior to the toggle to one-up - including the updated viewports if a display
        // set swap were to have occurred.
        const updatedViewportsViaHP = displaySetInstanceUIDs.length > 1 ? [] : displaySetInstanceUIDs.map(displaySetInstanceUID => hangingProtocolService.getViewportsRequireUpdate(viewportIdToUpdate, displaySetInstanceUID, isHangingProtocolLayout)).flat();

        // findOrCreateViewport returns either one of the updatedViewportsViaHP
        // returned from the HP service OR if there is not one from the HP service then
        // simply returns what was in the previous state for a given position in the layout.
        const findOrCreateViewport = (position, positionId) => {
          // Find the viewport for the given position prior to the toggle to one-up.
          const preOneUpViewport = Array.from(toggleOneUpViewportGridStore.viewports.values()).find(viewport => viewport.positionId === positionId);

          // Use the viewport id from before the toggle to one-up to find any updates to the viewport.
          const viewport = updatedViewportsViaHP.find(viewport => viewport.viewportId === preOneUpViewport.viewportId);
          return viewport ?
          // Use the applicable viewport from the HP updated viewports
          {
            viewportOptions,
            displaySetOptions,
            ...viewport
          } :
          // Use the previous viewport for the given position
          preOneUpViewport;
        };
        const layoutOptions = viewportGridService.getLayoutOptionsFromState(toggleOneUpViewportGridStore);

        // Restore the previous layout including the active viewport.
        viewportGridService.setLayout({
          numRows: toggleOneUpViewportGridStore.layout.numRows,
          numCols: toggleOneUpViewportGridStore.layout.numCols,
          activeViewportId: viewportIdToUpdate,
          layoutOptions,
          findOrCreateViewport,
          isHangingProtocolLayout: true
        });

        // Reset crosshairs after restoring the layout
        setTimeout(() => {
          commandsManager.runCommand('resetCrosshairs');
        }, 0);
      } else {
        // We are not in one-up, so toggle to one up.

        // Store the current viewport grid state so we can toggle it back later.
        const {
          setToggleOneUpViewportGridStore
        } = useToggleOneUpViewportGridStore/* useToggleOneUpViewportGridStore */.Y.getState();
        setToggleOneUpViewportGridStore(viewportGridState);

        // one being toggled to one up.
        const findOrCreateViewport = () => {
          return {
            displaySetInstanceUIDs,
            displaySetOptions,
            viewportOptions
          };
        };

        // Set the layout to be 1x1/one-up.
        viewportGridService.setLayout({
          numRows: 1,
          numCols: 1,
          findOrCreateViewport,
          isHangingProtocolLayout: true
        });
      }
    },
    /**
     * Exposes the browser history navigation used by OHIF. This command can be used to either replace or
     * push a new entry into the browser history. For example, the following will replace the current
     * browser history entry with the specified relative URL which changes the study displayed to the
     * study with study instance UID 1.2.3. Note that as a result of using `options.replace = true`, the
     * page prior to invoking this command cannot be returned to via the browser back button.
     *
     * navigateHistory({
     *   to: 'viewer?StudyInstanceUIDs=1.2.3',
     *   options: { replace: true },
     * });
     *
     * @param historyArgs - arguments for the history function;
     *                      the `to` property is the URL;
     *                      the `options.replace` is a boolean indicating if the current browser history entry
     *                      should be replaced or a new entry pushed onto the history (stack); the default value
     *                      for `replace` is false
     */
    navigateHistory(historyArgs) {
      index/* history */.b.navigate(historyArgs.to, historyArgs.options);
    },
    openDICOMTagViewer({
      displaySetInstanceUID
    }) {
      const {
        activeViewportId,
        viewports
      } = viewportGridService.getState();
      const activeViewportSpecificData = viewports.get(activeViewportId);
      const {
        displaySetInstanceUIDs
      } = activeViewportSpecificData;
      const displaySets = displaySetService.activeDisplaySets;
      const {
        UIModalService
      } = servicesManager.services;
      const defaultDisplaySetInstanceUID = displaySetInstanceUID || displaySetInstanceUIDs[0];
      UIModalService.show({
        content: DicomTagBrowser_DicomTagBrowser,
        contentProps: {
          displaySets,
          displaySetInstanceUID: defaultDisplaySetInstanceUID,
          onClose: UIModalService.hide
        },
        containerDimensions: 'w-[70%] max-w-[900px]',
        title: 'DICOM Tag Browser'
      });
    },
    /**
     * Toggle viewport overlay (the information panel shown on the four corners
     * of the viewport)
     * @see ViewportOverlay and CustomizableViewportOverlay components
     */
    toggleOverlays: () => {
      const overlays = document.getElementsByClassName('viewport-overlay');
      for (let i = 0; i < overlays.length; i++) {
        overlays.item(i).classList.toggle('hidden');
      }
    },
    scrollActiveThumbnailIntoView: () => {
      const {
        activeViewportId,
        viewports
      } = viewportGridService.getState();
      const activeViewport = viewports.get(activeViewportId);
      const activeDisplaySetInstanceUID = activeViewport.displaySetInstanceUIDs[0];
      const thumbnailList = document.querySelector('#ohif-thumbnail-list');
      if (!thumbnailList) {
        return;
      }
      const thumbnailListBounds = thumbnailList.getBoundingClientRect();
      const thumbnail = document.querySelector(`#thumbnail-${activeDisplaySetInstanceUID}`);
      if (!thumbnail) {
        return;
      }
      const thumbnailBounds = thumbnail.getBoundingClientRect();

      // This only handles a vertical thumbnail list.
      if (thumbnailBounds.top >= thumbnailListBounds.top && thumbnailBounds.top <= thumbnailListBounds.bottom) {
        return;
      }
      thumbnail.scrollIntoView({
        behavior: 'smooth'
      });
    },
    updateViewportDisplaySet: ({
      direction,
      excludeNonImageModalities
    }) => {
      const nonImageModalities = ['SR', 'SEG', 'SM', 'RTSTRUCT', 'RTPLAN', 'RTDOSE'];
      const currentDisplaySets = [...displaySetService.activeDisplaySets];
      const {
        activeViewportId,
        viewports,
        isHangingProtocolLayout
      } = viewportGridService.getState();
      const {
        displaySetInstanceUIDs
      } = viewports.get(activeViewportId);
      const activeDisplaySetIndex = currentDisplaySets.findIndex(displaySet => displaySetInstanceUIDs.includes(displaySet.displaySetInstanceUID));
      let displaySetIndexToShow;
      for (displaySetIndexToShow = activeDisplaySetIndex + direction; displaySetIndexToShow > -1 && displaySetIndexToShow < currentDisplaySets.length; displaySetIndexToShow += direction) {
        if (!excludeNonImageModalities || !nonImageModalities.includes(currentDisplaySets[displaySetIndexToShow].Modality)) {
          break;
        }
      }
      if (displaySetIndexToShow < 0 || displaySetIndexToShow >= currentDisplaySets.length) {
        return;
      }
      const {
        displaySetInstanceUID
      } = currentDisplaySets[displaySetIndexToShow];
      let updatedViewports = [];
      try {
        updatedViewports = hangingProtocolService.getViewportsRequireUpdate(activeViewportId, displaySetInstanceUID, isHangingProtocolLayout);
      } catch (error) {
        console.warn(error);
        uiNotificationService.show({
          title: 'Navigate Viewport Display Set',
          message: 'The requested display sets could not be added to the viewport due to a mismatch in the Hanging Protocol rules.',
          type: 'info',
          duration: 3000
        });
      }
      viewportGridService.setDisplaySetsForViewports(updatedViewports);
      setTimeout(() => actions.scrollActiveThumbnailIntoView(), 0);
    }
  };
  const definitions = {
    showContextMenu: {
      commandFn: actions.showContextMenu
    },
    closeContextMenu: {
      commandFn: actions.closeContextMenu
    },
    clearMeasurements: {
      commandFn: actions.clearMeasurements
    },
    displayNotification: {
      commandFn: actions.displayNotification
    },
    setHangingProtocol: {
      commandFn: actions.setHangingProtocol
    },
    toggleHangingProtocol: {
      commandFn: actions.toggleHangingProtocol
    },
    navigateHistory: {
      commandFn: actions.navigateHistory
    },
    nextStage: {
      commandFn: actions.deltaStage,
      options: {
        direction: 1
      }
    },
    previousStage: {
      commandFn: actions.deltaStage,
      options: {
        direction: -1
      }
    },
    setViewportGridLayout: {
      commandFn: actions.setViewportGridLayout
    },
    toggleOneUp: {
      commandFn: actions.toggleOneUp
    },
    openDICOMTagViewer: {
      commandFn: actions.openDICOMTagViewer
    },
    updateViewportDisplaySet: {
      commandFn: actions.updateViewportDisplaySet
    }
  };
  return {
    actions,
    definitions,
    defaultContext: 'DEFAULT'
  };
};
/* harmony default export */ const src_commandsModule = (commandsModule);
;// CONCATENATED MODULE: ../../../extensions/default/src/hangingprotocols/hpMNGrid.ts
/**
 * Sync group configuration for hydrating segmentations across viewports
 * that share the same frame of reference
 * @type {Types.HangingProtocol.SyncGroup}
 */
const HYDRATE_SEG_SYNC_GROUP = {
  type: 'hydrateseg',
  id: 'sameFORId',
  source: true,
  target: true,
  options: {
    matchingRules: ['sameFOR']
  }
};

/**
 * This hanging protocol can be activated on the primary mode by directly
 * referencing it in a URL or by directly including it within a mode, e.g.:
 * `&hangingProtocolId=@ohif/mnGrid` added to the viewer URL
 * It is not included in the viewer mode by default.
 */
const hpMN = {
  id: '@ohif/mnGrid',
  description: 'Has various hanging protocol grid layouts',
  name: '2x2',
  protocolMatchingRules: [{
    id: 'OneOrMoreSeries',
    weight: 25,
    attribute: 'numberOfDisplaySetsWithImages',
    constraint: {
      greaterThan: 0
    }
  }],
  toolGroupIds: ['default'],
  displaySetSelectors: {
    defaultDisplaySetId: {
      seriesMatchingRules: [{
        attribute: 'numImageFrames',
        constraint: {
          greaterThan: {
            value: 0
          }
        },
        required: true
      },
      // This display set will select the specified items by preference
      // It has no affect if nothing is specified in the URL.
      {
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
      allowUnmatchedView: true,
      syncGroups: [HYDRATE_SEG_SYNC_GROUP]
    },
    displaySets: [{
      id: 'defaultDisplaySetId',
      matchedDisplaySetsIndex: -1
    }]
  },
  stages: [{
    id: '2x2',
    name: '2x2',
    stageActivation: {
      enabled: {
        minViewportsMatched: 4
      }
    },
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
        allowUnmatchedView: true,
        syncGroups: [{
          type: 'hydrateseg',
          id: 'sameFORId',
          source: true,
          target: true,
          options: {
            matchingRules: ['sameFOR']
          }
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        matchedDisplaySetsIndex: 1,
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true,
        syncGroups: [{
          type: 'hydrateseg',
          id: 'sameFORId',
          source: true,
          target: true
          // options: {
          //   matchingRules: ['sameFOR'],
          // },
        }]
      },
      displaySets: [{
        matchedDisplaySetsIndex: 2,
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true,
        syncGroups: [{
          type: 'hydrateseg',
          id: 'sameFORId',
          source: true,
          target: true
          // options: {
          //   matchingRules: ['sameFOR'],
          // },
        }]
      },
      displaySets: [{
        matchedDisplaySetsIndex: 3,
        id: 'defaultDisplaySetId'
      }]
    }]
  },
  // 3x1 stage
  {
    id: '3x1',
    // Obsolete settings:
    requiredViewports: 1,
    preferredViewports: 3,
    // New equivalent:
    stageActivation: {
      enabled: {
        minViewportsMatched: 3
      }
    },
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
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'defaultDisplaySetId',
        matchedDisplaySetsIndex: 1
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'defaultDisplaySetId',
        matchedDisplaySetsIndex: 2
      }]
    }]
  },
  // A 2x1 stage
  {
    id: '2x1',
    requiredViewports: 1,
    preferredViewports: 2,
    stageActivation: {
      enabled: {
        minViewportsMatched: 2
      }
    },
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
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        matchedDisplaySetsIndex: 1,
        id: 'defaultDisplaySetId'
      }]
    }]
  },
  // A 1x1 stage - should be automatically activated if there is only 1 viewable instance
  {
    id: '1x1',
    requiredViewports: 1,
    preferredViewports: 1,
    stageActivation: {
      enabled: {
        minViewportsMatched: 1
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 1
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }]
  }],
  numberOfPriorsReferenced: -1
};
/* harmony default export */ const hpMNGrid = (hpMN);
;// CONCATENATED MODULE: ../../../extensions/default/src/hangingprotocols/hpCompare.ts
const defaultDisplaySetSelector = {
  studyMatchingRules: [{
    // The priorInstance is a study counter that indicates what position this study is in
    // and the value comes from the options parameter.
    attribute: 'studyInstanceUIDsIndex',
    from: 'options',
    required: true,
    constraint: {
      equals: {
        value: 0
      }
    }
  }],
  seriesMatchingRules: [{
    attribute: 'numImageFrames',
    constraint: {
      greaterThan: {
        value: 0
      }
    }
  },
  // This display set will select the specified items by preference
  // It has no affect if nothing is specified in the URL.
  {
    attribute: 'isDisplaySetFromUrl',
    weight: 10,
    constraint: {
      equals: true
    }
  }]
};
const priorDisplaySetSelector = {
  studyMatchingRules: [{
    // The priorInstance is a study counter that indicates what position this study is in
    // and the value comes from the options parameter.
    attribute: 'studyInstanceUIDsIndex',
    from: 'options',
    required: true,
    constraint: {
      equals: {
        value: 1
      }
    }
  }],
  seriesMatchingRules: [{
    attribute: 'numImageFrames',
    constraint: {
      greaterThan: {
        value: 0
      }
    }
  },
  // This display set will select the specified items by preference
  // It has no affect if nothing is specified in the URL.
  {
    attribute: 'isDisplaySetFromUrl',
    weight: 10,
    constraint: {
      equals: true
    }
  }]
};
const currentDisplaySet = {
  id: 'defaultDisplaySetId'
};
const priorDisplaySet = {
  id: 'priorDisplaySetId'
};
const currentViewport0 = {
  viewportOptions: {
    toolGroupId: 'default',
    allowUnmatchedView: true
  },
  displaySets: [currentDisplaySet]
};
const currentViewport1 = {
  ...currentViewport0,
  displaySets: [{
    ...currentDisplaySet,
    matchedDisplaySetsIndex: 1
  }]
};
const priorViewport0 = {
  ...currentViewport0,
  displaySets: [priorDisplaySet]
};
const priorViewport1 = {
  ...priorViewport0,
  displaySets: [{
    ...priorDisplaySet,
    matchedDisplaySetsIndex: 1
  }]
};

/**
 * This hanging protocol can be activated on the primary mode by directly
 * referencing it in a URL or by directly including it within a mode, e.g.:
 * `&hangingProtocolId=@ohif/mnGrid` added to the viewer URL
 * It is not included in the viewer mode by default.
 */
const hpMNCompare = {
  id: '@ohif/hpCompare',
  description: 'Compare two studies in various layouts',
  name: 'Compare Two Studies',
  numberOfPriorsReferenced: 1,
  protocolMatchingRules: [{
    id: 'Two Studies',
    weight: 1000,
    // is there a second study or in another work the attribute
    // studyInstanceUIDsIndex that we get from prior should not be null
    attribute: 'StudyInstanceUID',
    from: 'prior',
    required: true,
    constraint: {
      notNull: true
    }
  }],
  toolGroupIds: ['default'],
  displaySetSelectors: {
    defaultDisplaySetId: defaultDisplaySetSelector,
    priorDisplaySetId: priorDisplaySetSelector
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
    name: '2x2',
    stageActivation: {
      enabled: {
        minViewportsMatched: 4
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 2
      }
    },
    viewports: [currentViewport0, priorViewport0, currentViewport1, priorViewport1]
  }, {
    name: '2x1',
    stageActivation: {
      enabled: {
        minViewportsMatched: 2
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 2
      }
    },
    viewports: [currentViewport0, priorViewport0]
  }]
};
/* harmony default export */ const hpCompare = (hpMNCompare);
;// CONCATENATED MODULE: ../../../extensions/default/src/hangingprotocols/mammoDisplaySetSelector.ts
const priorStudyMatchingRules = [{
  // The priorInstance is a study counter that indicates what position this study is in
  // and the value comes from the options parameter.
  attribute: 'studyInstanceUIDsIndex',
  from: 'options',
  required: true,
  constraint: {
    equals: {
      value: 1
    }
  }
}];
const currentStudyMatchingRules = [{
  // The priorInstance is a study counter that indicates what position this study is in
  // and the value comes from the options parameter.
  attribute: 'studyInstanceUIDsIndex',
  from: 'options',
  required: true,
  constraint: {
    equals: {
      value: 0
    }
  }
}];
const LCCSeriesMatchingRules = [{
  weight: 10,
  attribute: 'ViewCode',
  constraint: {
    contains: 'SCT:399162004'
  }
}, {
  weight: 5,
  attribute: 'PatientOrientation',
  constraint: {
    contains: 'L'
  }
}, {
  weight: 20,
  attribute: 'SeriesDescription',
  constraint: {
    contains: 'L CC'
  }
}];
const RCCSeriesMatchingRules = [{
  weight: 10,
  attribute: 'ViewCode',
  constraint: {
    contains: 'SCT:399162004'
  }
}, {
  weight: 5,
  attribute: 'PatientOrientation',
  constraint: {
    equals: ['P', 'L']
  }
}, {
  attribute: 'PatientOrientation',
  constraint: {
    doesNotEqual: ['A', 'R']
  },
  required: true
}, {
  weight: 20,
  attribute: 'SeriesDescription',
  constraint: {
    contains: 'CC'
  }
}];
const LMLOSeriesMatchingRules = [{
  weight: 10,
  attribute: 'ViewCode',
  constraint: {
    contains: 'SCT:399368009'
  }
}, {
  weight: 0,
  attribute: 'ViewCode',
  constraint: {
    doesNotEqual: 'SCT:399162004'
  },
  required: true
}, {
  weight: 5,
  attribute: 'PatientOrientation',
  constraint: {
    equals: ['A', 'R']
  }
}, {
  weight: 20,
  attribute: 'SeriesDescription',
  constraint: {
    contains: 'L MLO'
  }
}];
const RMLOSeriesMatchingRules = [{
  weight: 10,
  attribute: 'ViewCode',
  constraint: {
    contains: 'SCT:399368009'
  }
}, {
  attribute: 'ViewCode',
  constraint: {
    doesNotEqual: 'SCT:399162004'
  },
  required: true
}, {
  attribute: 'PatientOrientation',
  constraint: {
    doesNotContain: ['P', 'FL']
  },
  required: true
}, {
  weight: 5,
  attribute: 'PatientOrientation',
  constraint: {
    equals: ['P', 'L']
  }
}, {
  weight: 5,
  attribute: 'PatientOrientation',
  constraint: {
    equals: ['A', 'FR']
  }
}, {
  weight: 20,
  attribute: 'SeriesDescription',
  constraint: {
    contains: 'R MLO'
  }
}, {
  attribute: 'SeriesDescription',
  required: true,
  constraint: {
    doesNotContain: 'CC'
  }
}, {
  attribute: 'SeriesDescription',
  required: true,
  constraint: {
    doesNotEqual: 'L MLO'
  },
  required: true
}];
const RCC = {
  seriesMatchingRules: RCCSeriesMatchingRules,
  studyMatchingRules: currentStudyMatchingRules
};
const RCCPrior = {
  seriesMatchingRules: RCCSeriesMatchingRules,
  studyMatchingRules: priorStudyMatchingRules
};
const LCC = {
  seriesMatchingRules: LCCSeriesMatchingRules,
  studyMatchingRules: currentStudyMatchingRules
};
const LCCPrior = {
  seriesMatchingRules: LCCSeriesMatchingRules,
  studyMatchingRules: priorStudyMatchingRules
};
const RMLO = {
  seriesMatchingRules: RMLOSeriesMatchingRules,
  studyMatchingRules: currentStudyMatchingRules
};
const RMLOPrior = {
  seriesMatchingRules: RMLOSeriesMatchingRules,
  studyMatchingRules: priorStudyMatchingRules
};
const LMLO = {
  seriesMatchingRules: LMLOSeriesMatchingRules,
  studyMatchingRules: currentStudyMatchingRules
};
const LMLOPrior = {
  seriesMatchingRules: LMLOSeriesMatchingRules,
  studyMatchingRules: priorStudyMatchingRules
};

;// CONCATENATED MODULE: ../../../extensions/default/src/hangingprotocols/hpMammo.ts

const rightDisplayArea = {
  storeAsInitialCamera: true,
  imageArea: [0.8, 0.8],
  imageCanvasPoint: {
    imagePoint: [0, 0.5],
    canvasPoint: [0, 0.5]
  }
};
const leftDisplayArea = {
  storeAsInitialCamera: true,
  imageArea: [0.8, 0.8],
  imageCanvasPoint: {
    imagePoint: [1, 0.5],
    canvasPoint: [1, 0.5]
  }
};
const hpMammography = {
  id: '@ohif/hpMammo',
  hasUpdatedPriorsInformation: false,
  name: 'Mammography Breast Screening',
  protocolMatchingRules: [{
    id: 'Mammography',
    weight: 150,
    attribute: 'ModalitiesInStudy',
    constraint: {
      contains: 'MG'
    },
    required: true
  }, {
    id: 'numberOfImages',
    attribute: 'numberOfDisplaySetsWithImages',
    constraint: {
      greaterThan: 2
    },
    required: true
  }],
  toolGroupIds: ['default'],
  displaySetSelectors: {
    RCC: RCC,
    LCC: LCC,
    RMLO: RMLO,
    LMLO: LMLO,
    RCCPrior: RCCPrior,
    LCCPrior: LCCPrior,
    RMLOPrior: RMLOPrior,
    LMLOPrior: LMLOPrior
  },
  stages: [{
    name: 'CC/MLO',
    viewportStructure: {
      type: 'grid',
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 2
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: leftDisplayArea,
        // flipHorizontal: true,
        // rotation: 180,
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'RCC'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        // flipHorizontal: true,
        displayArea: rightDisplayArea,
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'LCC'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: leftDisplayArea,
        // rotation: 180,
        // flipHorizontal: true,
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'RMLO'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: rightDisplayArea,
        // flipHorizontal: true,
        allowUnmatchedView: true
      },
      displaySets: [{
        id: 'LMLO'
      }]
    }]
  },
  // Compare CC current/prior top/bottom
  {
    name: 'CC compare',
    viewportStructure: {
      type: 'grid',
      layoutType: 'grid',
      properties: {
        rows: 2,
        columns: 2
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: leftDisplayArea,
        flipHorizontal: true,
        rotation: 180
      },
      displaySets: [{
        id: 'RCC'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        flipHorizontal: true,
        displayArea: rightDisplayArea
      },
      displaySets: [{
        id: 'LCC'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: leftDisplayArea,
        flipHorizontal: true
      },
      displaySets: [{
        id: 'RCCPrior'
      }]
    }, {
      viewportOptions: {
        toolGroupId: 'default',
        displayArea: rightDisplayArea
      },
      displaySets: [{
        id: 'LCCPrior'
      }]
    }]
  }],
  // Indicates it is prior aware, but will work with no priors
  numberOfPriorsReferenced: 0
};
/* harmony default export */ const hpMammo = (hpMammography);
;// CONCATENATED MODULE: ../../../extensions/default/src/hangingprotocols/hpScale.ts
const displayAreaScale1 = {
  type: 'SCALE',
  scale: 1,
  storeAsInitialCamera: true
};
const displayAreaScale15 = {
  ...displayAreaScale1,
  scale: 15
};

/**
 * This hanging protocol can be activated on the primary mode by directly
 * referencing it in a URL or by directly including it within a mode, e.g.:
 * `&hangingProtocolId=@ohif/mnGrid` added to the viewer URL
 * It is not included in the viewer mode by default.
 */
const hpScale = {
  id: '@ohif/hpScale',
  description: 'Has various hanging protocol grid layouts',
  name: 'Scale Images',
  protocolMatchingRules: [{
    id: 'OneOrMoreSeries',
    weight: 25,
    attribute: 'numberOfDisplaySetsWithImages',
    constraint: {
      greaterThan: 0
    }
  }],
  toolGroupIds: ['default'],
  displaySetSelectors: {
    defaultDisplaySetId: {
      seriesMatchingRules: [{
        weight: 1,
        attribute: 'numImageFrames',
        constraint: {
          greaterThan: {
            value: 0
          }
        },
        required: true
      },
      // This display set will select the specified items by preference
      // It has no affect if nothing is specified in the URL.
      {
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
      displayArea: displayAreaScale1,
      allowUnmatchedView: true
    },
    displaySets: [{
      id: 'defaultDisplaySetId',
      matchedDisplaySetsIndex: -1
    }]
  },
  stages: [
  // A 1x1 stage - should be automatically activated if there is only 1 viewable instance
  {
    name: 'Scale 1:1',
    stageActivation: {
      enabled: {
        minViewportsMatched: 1
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 1
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true,
        displayArea: displayAreaScale1
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }]
  }, {
    name: 'Scale 1:15',
    stageActivation: {
      enabled: {
        minViewportsMatched: 1
      }
    },
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 1
      }
    },
    viewports: [{
      viewportOptions: {
        toolGroupId: 'default',
        allowUnmatchedView: true,
        displayArea: displayAreaScale15
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }]
  }],
  numberOfPriorsReferenced: -1
};
/* harmony default export */ const hangingprotocols_hpScale = (hpScale);
;// CONCATENATED MODULE: ../../../extensions/default/src/getHangingProtocolModule.js




const defaultProtocol = {
  id: 'default',
  locked: true,
  // Don't store this hanging protocol as it applies to the currently active
  // display set by default
  // cacheId: null,
  name: 'Default',
  createdDate: '2021-02-23T19:22:08.894Z',
  modifiedDate: '2023-04-01',
  availableTo: {},
  editableBy: {},
  protocolMatchingRules: [],
  toolGroupIds: ['default'],
  // -1 would be used to indicate active only, whereas other values are
  // the number of required priors referenced - so 0 means active with
  // 0 or more priors.
  numberOfPriorsReferenced: 0,
  // Default viewport is used to define the viewport when
  // additional viewports are added using the layout tool
  defaultViewport: {
    viewportOptions: {
      viewportType: 'stack',
      toolGroupId: 'default',
      allowUnmatchedView: true,
      syncGroups: [{
        type: 'hydrateseg',
        id: 'sameFORId',
        source: true,
        target: true,
        options: {
          matchingRules: ['sameFOR']
        }
      }]
    },
    displaySets: [{
      id: 'defaultDisplaySetId',
      matchedDisplaySetsIndex: -1
    }]
  },
  displaySetSelectors: {
    defaultDisplaySetId: {
      // Matches displaysets, NOT series
      seriesMatchingRules: [
      // Try to match series with images by default, to prevent weird display
      // on SEG/SR containing studies
      {
        weight: 10,
        attribute: 'numImageFrames',
        constraint: {
          greaterThan: {
            value: 0
          }
        }
      },
      // This display set will select the specified items by preference
      // It has no affect if nothing is specified in the URL.
      {
        attribute: 'isDisplaySetFromUrl',
        weight: 10,
        constraint: {
          equals: true
        }
      }]
    }
  },
  stages: [{
    name: 'default',
    viewportStructure: {
      layoutType: 'grid',
      properties: {
        rows: 1,
        columns: 1
      }
    },
    viewports: [{
      viewportOptions: {
        viewportType: 'stack',
        viewportId: 'default',
        toolGroupId: 'default',
        // This will specify the initial image options index if it matches in the URL
        // and will otherwise not specify anything.
        initialImageOptions: {
          custom: 'sopInstanceLocation'
        },
        // Other options for initialImageOptions, which can be included in the default
        // custom attribute, or can be provided directly.
        //   index: 180,
        //   preset: 'middle', // 'first', 'last', 'middle'
        // },
        syncGroups: [{
          type: 'hydrateseg',
          id: 'sameFORId',
          source: true,
          target: true
          // options: {
          //   matchingRules: ['sameFOR'],
          // },
        }]
      },
      displaySets: [{
        id: 'defaultDisplaySetId'
      }]
    }],
    createdDate: '2021-02-23T18:32:42.850Z'
  }]
};
function getHangingProtocolModule() {
  return [{
    name: defaultProtocol.id,
    protocol: defaultProtocol
  },
  // Create a MxN comparison hanging protocol available by default
  {
    name: hpCompare.id,
    protocol: hpCompare
  }, {
    name: hpMammo.id,
    protocol: hpMammo
  }, {
    name: hangingprotocols_hpScale.id,
    protocol: hangingprotocols_hpScale
  },
  // Create a MxN hanging protocol available by default
  {
    name: hpMNGrid.id,
    protocol: hpMNGrid
  }];
}
/* harmony default export */ const src_getHangingProtocolModule = (getHangingProtocolModule);
;// CONCATENATED MODULE: ../../../extensions/default/src/Panels/DataSourceSelector.tsx





function DataSourceSelector() {
  const [appConfig] = (0,state/* useAppConfig */.r)();
  const navigate = (0,dist/* useNavigate */.Zp)();

  // This is frowned upon, but the raw config is needed here to provide
  // the selector
  const dsConfigs = appConfig.dataSources;
  return /*#__PURE__*/react.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/react.createElement("div", {
    className: "flex h-screen w-screen items-center justify-center "
  }, /*#__PURE__*/react.createElement("div", {
    className: "bg-secondary-dark mx-auto space-y-2 rounded-lg py-8 px-8 drop-shadow-md"
  }, /*#__PURE__*/react.createElement("img", {
    className: "mx-auto block h-14",
    src: "./ohif-logo.svg",
    alt: "OHIF"
  }), /*#__PURE__*/react.createElement("div", {
    className: "space-y-2 pt-4 text-center"
  }, dsConfigs.filter(it => it.sourceName !== 'dicomjson' && it.sourceName !== 'dicomlocal').map(ds => /*#__PURE__*/react.createElement("div", {
    key: ds.sourceName
  }, /*#__PURE__*/react.createElement("h1", {
    className: "text-white"
  }, ds.configuration?.friendlyName || ds.friendlyName), /*#__PURE__*/react.createElement(ui_src/* Button */.$n, {
    type: ui_src/* ButtonEnums.type */.Ny.NW.primary,
    className: classnames_default()('ml-2'),
    onClick: () => {
      navigate({
        pathname: '/',
        search: `datasources=${ds.sourceName}`
      });
    }
  }, ds.sourceName), /*#__PURE__*/react.createElement("br", null)))))));
}
/* harmony default export */ const Panels_DataSourceSelector = (DataSourceSelector);
;// CONCATENATED MODULE: ../../../extensions/default/src/Components/ItemListComponent.tsx




function ItemListComponent({
  itemLabel,
  itemList,
  onItemClicked
}) {
  const {
    t
  } = (0,es/* useTranslation */.Bd)('DataSourceConfiguration');
  const [filterValue, setFilterValue] = (0,react.useState)('');
  (0,react.useEffect)(() => {
    setFilterValue('');
  }, [itemList]);
  return /*#__PURE__*/react.createElement("div", {
    className: "flex min-h-[1px] grow flex-col gap-4"
  }, /*#__PURE__*/react.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/react.createElement("div", {
    className: "text-primary-light text-[20px]"
  }, t(`Select ${itemLabel}`)), /*#__PURE__*/react.createElement(ui_src/* InputFilterText */.Cv, {
    className: "max-w-[40%] grow",
    value: filterValue,
    onDebounceChange: setFilterValue,
    placeholder: t(`Search ${itemLabel} list`)
  })), /*#__PURE__*/react.createElement("div", {
    className: "relative flex min-h-[1px] grow flex-col bg-black text-[14px]"
  }, itemList == null ? /*#__PURE__*/react.createElement(ui_src/* LoadingIndicatorProgress */.Jx, {
    className: 'h-full w-full'
  }) : itemList.length === 0 ? /*#__PURE__*/react.createElement("div", {
    className: "text-primary-light flex h-full flex-col items-center justify-center px-6 py-4"
  }, /*#__PURE__*/react.createElement(ui_src/* Icon */.In, {
    name: "magnifier",
    className: "mb-4"
  }), /*#__PURE__*/react.createElement("span", null, t(`No ${itemLabel} available`))) : /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("div", {
    className: "bg-secondary-dark px-3 py-1.5 text-white"
  }, t(itemLabel)), /*#__PURE__*/react.createElement("div", {
    className: "ohif-scrollbar overflow-auto"
  }, itemList.filter(item => !filterValue || item.name.toLowerCase().includes(filterValue.toLowerCase())).map(item => {
    const border = 'rounded border-transparent border-b-secondary-light border-[1px] hover:border-primary-light';
    return /*#__PURE__*/react.createElement("div", {
      className: classnames_default()('hover:text-primary-light hover:bg-primary-dark group mx-2 flex items-center justify-between px-6 py-2', border),
      key: item.id
    }, /*#__PURE__*/react.createElement("div", null, item.name), /*#__PURE__*/react.createElement(ui_src/* Button */.$n, {
      onClick: () => onItemClicked(item),
      className: "invisible group-hover:visible",
      endIcon: /*#__PURE__*/react.createElement(ui_src/* Icon */.In, {
        name: "arrow-left"
      })
    }, t('Select')));
  })))));
}
/* harmony default export */ const Components_ItemListComponent = (ItemListComponent);
;// CONCATENATED MODULE: ../../../extensions/default/src/Components/DataSourceConfigurationModalComponent.tsx





const NO_WRAP_ELLIPSIS_CLASS_NAMES = 'text-ellipsis whitespace-nowrap overflow-hidden';
function DataSourceConfigurationModalComponent({
  configurationAPI,
  configuredItems,
  onHide
}) {
  const {
    t
  } = (0,es/* useTranslation */.Bd)('DataSourceConfiguration');
  const [itemList, setItemList] = (0,react.useState)();
  const [selectedItems, setSelectedItems] = (0,react.useState)(configuredItems);
  const [errorMessage, setErrorMessage] = (0,react.useState)();
  const [itemLabels] = (0,react.useState)(configurationAPI.getItemLabels());

  // Determines whether to show the full/existing configuration for the data source.
  // A full or complete configuration is one where the data source (path) has the
  // maximum/required number of path items. Anything less is considered not complete and
  // the configuration starts from scratch (i.e. as if no items are configured at all).
  // TODO: consider configuration starting from a partial (i.e. non-empty) configuration
  const [showFullConfig, setShowFullConfig] = (0,react.useState)(itemLabels.length === configuredItems.length);

  /**
   * The index of the selected item that is considered current and for which
   * its sub-items should be displayed in the items list component. When the
   * full/existing configuration for a data source is to be shown, the current
   * selected item is the second to last in the `selectedItems` list.
   */
  const currentSelectedItemIndex = showFullConfig ? selectedItems.length - 2 : selectedItems.length - 1;
  (0,react.useEffect)(() => {
    let shouldUpdate = true;
    setErrorMessage(null);

    // Clear out the former/old list while we fetch the next sub item list.
    setItemList(null);
    if (selectedItems.length === 0) {
      configurationAPI.initialize().then(items => {
        if (shouldUpdate) {
          setItemList(items);
        }
      }).catch(error => setErrorMessage(error.message));
    } else if (!showFullConfig && selectedItems.length === itemLabels.length) {
      // The last item to configure the data source (path) has been selected.
      configurationAPI.setCurrentItem(selectedItems[selectedItems.length - 1]);
      // We can hide the modal dialog now.
      onHide();
    } else {
      configurationAPI.setCurrentItem(selectedItems[currentSelectedItemIndex]).then(items => {
        if (shouldUpdate) {
          setItemList(items);
        }
      }).catch(error => setErrorMessage(error.message));
    }
    return () => {
      shouldUpdate = false;
    };
  }, [selectedItems, configurationAPI, onHide, itemLabels, showFullConfig, currentSelectedItemIndex]);
  const getSelectedItemCursorClasses = itemIndex => itemIndex !== itemLabels.length - 1 && itemIndex < selectedItems.length ? 'cursor-pointer' : 'cursor-auto';
  const getSelectedItemBackgroundClasses = itemIndex => itemIndex < selectedItems.length ? classnames_default()('bg-black/[.4]', itemIndex !== itemLabels.length - 1 ? 'hover:bg-transparent active:bg-secondary-dark' : '') : 'bg-transparent';
  const getSelectedItemBorderClasses = itemIndex => itemIndex === currentSelectedItemIndex + 1 ? classnames_default()('border-2', 'border-solid', 'border-primary-light') : itemIndex < selectedItems.length ? 'border border-solid border-primary-active hover:border-primary-light active:border-white' : 'border border-dashed border-secondary-light';
  const getSelectedItemTextClasses = itemIndex => itemIndex <= selectedItems.length ? 'text-primary-light' : 'text-primary-active';
  const getErrorComponent = () => {
    return /*#__PURE__*/react.createElement("div", {
      className: "flex min-h-[1px] grow flex-col gap-4"
    }, /*#__PURE__*/react.createElement("div", {
      className: "text-primary-light text-[20px]"
    }, t(`Error fetching ${itemLabels[selectedItems.length]} list`)), /*#__PURE__*/react.createElement("div", {
      className: "grow bg-black p-4 text-[14px]"
    }, errorMessage));
  };
  const getSelectedItemsComponent = () => {
    return /*#__PURE__*/react.createElement("div", {
      className: "flex gap-4"
    }, itemLabels.map((itemLabel, itemLabelIndex) => {
      return /*#__PURE__*/react.createElement("div", {
        key: itemLabel,
        className: classnames_default()('flex min-w-[1px] shrink basis-[200px] flex-col gap-1 rounded-md p-3.5', getSelectedItemCursorClasses(itemLabelIndex), getSelectedItemBackgroundClasses(itemLabelIndex), getSelectedItemBorderClasses(itemLabelIndex), getSelectedItemTextClasses(itemLabelIndex)),
        onClick: showFullConfig && itemLabelIndex < currentSelectedItemIndex || itemLabelIndex <= currentSelectedItemIndex ? () => {
          setShowFullConfig(false);
          setSelectedItems(theList => theList.slice(0, itemLabelIndex));
        } : undefined
      }, /*#__PURE__*/react.createElement("div", {
        className: "text- flex items-center gap-2"
      }, itemLabelIndex < selectedItems.length ? /*#__PURE__*/react.createElement(ui_src/* Icon */.In, {
        name: "status-tracked"
      }) : /*#__PURE__*/react.createElement(ui_src/* Icon */.In, {
        name: "status-untracked"
      }), /*#__PURE__*/react.createElement("div", {
        className: classnames_default()(NO_WRAP_ELLIPSIS_CLASS_NAMES)
      }, t(itemLabel))), itemLabelIndex < selectedItems.length ? /*#__PURE__*/react.createElement("div", {
        className: classnames_default()('text-[14px] text-white', NO_WRAP_ELLIPSIS_CLASS_NAMES)
      }, selectedItems[itemLabelIndex].name) : /*#__PURE__*/react.createElement("br", null));
    }));
  };
  return /*#__PURE__*/react.createElement("div", {
    className: "flex h-[calc(100vh-300px)] select-none flex-col gap-4 pt-0.5"
  }, getSelectedItemsComponent(), /*#__PURE__*/react.createElement("div", {
    className: "h-0.5 w-full shrink-0 bg-black"
  }), errorMessage ? getErrorComponent() : /*#__PURE__*/react.createElement(Components_ItemListComponent, {
    itemLabel: itemLabels[currentSelectedItemIndex + 1],
    itemList: itemList,
    onItemClicked: item => {
      setShowFullConfig(false);
      setSelectedItems(theList => [...theList.slice(0, currentSelectedItemIndex + 1), item]);
    }
  }));
}
/* harmony default export */ const Components_DataSourceConfigurationModalComponent = (DataSourceConfigurationModalComponent);
;// CONCATENATED MODULE: ../../../extensions/default/src/Components/DataSourceConfigurationComponent.tsx




function DataSourceConfigurationComponent({
  servicesManager,
  extensionManager
}) {
  const {
    t
  } = (0,es/* useTranslation */.Bd)('DataSourceConfiguration');
  const {
    show,
    hide
  } = (0,ui_src/* useModal */.hS)();
  const {
    customizationService
  } = servicesManager.services;
  const [configurationAPI, setConfigurationAPI] = (0,react.useState)();
  const [configuredItems, setConfiguredItems] = (0,react.useState)();
  (0,react.useEffect)(() => {
    let shouldUpdate = true;
    const dataSourceChangedCallback = async () => {
      const activeDataSourceDef = extensionManager.getActiveDataSourceDefinition();
      if (!activeDataSourceDef.configuration.configurationAPI) {
        return;
      }
      const {
        factory: configurationAPIFactory
      } = customizationService.get(activeDataSourceDef.configuration.configurationAPI) ?? {};
      if (!configurationAPIFactory) {
        return;
      }
      const configAPI = configurationAPIFactory(activeDataSourceDef.sourceName);
      setConfigurationAPI(configAPI);

      // New configuration API means that the existing configured items must be cleared.
      setConfiguredItems(null);
      configAPI.getConfiguredItems().then(list => {
        if (shouldUpdate) {
          setConfiguredItems(list);
        }
      });
    };
    const sub = extensionManager.subscribe(extensionManager.EVENTS.ACTIVE_DATA_SOURCE_CHANGED, dataSourceChangedCallback);
    dataSourceChangedCallback();
    return () => {
      shouldUpdate = false;
      sub.unsubscribe();
    };
  }, []);
  const showConfigurationModal = (0,react.useCallback)(() => {
    show({
      content: Components_DataSourceConfigurationModalComponent,
      title: t('Configure Data Source'),
      contentProps: {
        configurationAPI,
        configuredItems,
        onHide: hide
      }
    });
  }, [configurationAPI, configuredItems]);
  (0,react.useEffect)(() => {
    if (!configurationAPI || !configuredItems) {
      return;
    }
    if (configuredItems.length !== configurationAPI.getItemLabels().length) {
      // Not the correct number of configured items, so show the modal to configure the data source.
      showConfigurationModal();
    }
  }, [configurationAPI, configuredItems, showConfigurationModal]);
  return configuredItems ? /*#__PURE__*/react.createElement("div", {
    className: "text-aqua-pale flex items-center overflow-hidden"
  }, /*#__PURE__*/react.createElement(ui_src/* Icon */.In, {
    name: "settings",
    className: "mr-2.5 h-3.5 w-3.5 shrink-0 cursor-pointer",
    onClick: showConfigurationModal
  }), configuredItems.map((item, itemIndex) => {
    return /*#__PURE__*/react.createElement("div", {
      key: itemIndex,
      className: "flex overflow-hidden"
    }, /*#__PURE__*/react.createElement("div", {
      key: itemIndex,
      className: "overflow-hidden text-ellipsis whitespace-nowrap"
    }, item.name), itemIndex !== configuredItems.length - 1 && /*#__PURE__*/react.createElement("div", {
      className: "px-2.5"
    }, "|"));
  })) : /*#__PURE__*/react.createElement(react.Fragment, null);
}
/* harmony default export */ const Components_DataSourceConfigurationComponent = (DataSourceConfigurationComponent);
;// CONCATENATED MODULE: ../../../extensions/default/src/DataSourceConfigurationAPI/GoogleCloudDataSourceConfigurationAPI.ts
/**
 * This file contains the implementations of BaseDataSourceConfigurationAPIItem
 * and BaseDataSourceConfigurationAPI for the Google cloud healthcare API. To
 * better understand this implementation and/or to implement custom implementations,
 * see the platform\core\src\types\DataSourceConfigurationAPI.ts and its JS doc
 * comments as a guide.
 */
/**
 * The various Google Cloud Healthcare path item types.
 */
var ItemType = /*#__PURE__*/function (ItemType) {
  ItemType[ItemType["projects"] = 0] = "projects";
  ItemType[ItemType["locations"] = 1] = "locations";
  ItemType[ItemType["datasets"] = 2] = "datasets";
  ItemType[ItemType["dicomStores"] = 3] = "dicomStores";
  return ItemType;
}(ItemType || {});
const initialUrl = 'https://cloudresourcemanager.googleapis.com/v1';
const baseHealthcareUrl = 'https://healthcare.googleapis.com/v1';
class GoogleCloudDataSourceConfigurationAPIItem {
  constructor() {
    this.id = void 0;
    this.name = void 0;
    this.url = void 0;
    this.itemType = void 0;
  }
}
class GoogleCloudDataSourceConfigurationAPI {
  constructor(dataSourceName, servicesManager, extensionManager) {
    this._extensionManager = void 0;
    this._fetchOptions = void 0;
    this._dataSourceName = void 0;
    this.getItemLabels = () => ['Project', 'Location', 'Data set', 'DICOM store'];
    this._dataSourceName = dataSourceName;
    this._extensionManager = extensionManager;
    const userAuthenticationService = servicesManager.services.userAuthenticationService;
    this._fetchOptions = {
      method: 'GET',
      headers: userAuthenticationService.getAuthorizationHeader()
    };
  }
  async initialize() {
    const url = `${initialUrl}/projects`;
    const projects = await GoogleCloudDataSourceConfigurationAPI._doFetch(url, ItemType.projects, this._fetchOptions);
    if (!projects?.length) {
      return [];
    }
    const projectItems = projects.map(project => {
      return {
        id: project.projectId,
        name: project.name,
        itemType: ItemType.projects,
        url: `${baseHealthcareUrl}/projects/${project.projectId}`
      };
    });
    return projectItems;
  }
  async setCurrentItem(anItem) {
    const googleCloudItem = anItem;
    if (googleCloudItem.itemType === ItemType.dicomStores) {
      // Last configurable item, so update the data source configuration.
      const url = `${googleCloudItem.url}/dicomWeb`;
      const dataSourceDefCopy = JSON.parse(JSON.stringify(this._extensionManager.getDataSourceDefinition(this._dataSourceName)));
      dataSourceDefCopy.configuration = {
        ...dataSourceDefCopy.configuration,
        wadoUriRoot: url,
        qidoRoot: url,
        wadoRoot: url
      };
      this._extensionManager.updateDataSourceConfiguration(dataSourceDefCopy.sourceName, dataSourceDefCopy.configuration);
      return [];
    }
    const subItemType = googleCloudItem.itemType + 1;
    const subItemField = `${ItemType[subItemType]}`;
    const url = `${googleCloudItem.url}/${subItemField}`;
    const fetchedSubItems = await GoogleCloudDataSourceConfigurationAPI._doFetch(url, subItemType, this._fetchOptions);
    if (!fetchedSubItems?.length) {
      return [];
    }
    const subItems = fetchedSubItems.map(subItem => {
      const nameSplit = subItem.name.split('/');
      return {
        id: subItem.name,
        name: nameSplit[nameSplit.length - 1],
        itemType: subItemType,
        url: `${baseHealthcareUrl}/${subItem.name}`
      };
    });
    return subItems;
  }
  async getConfiguredItems() {
    const dataSourceDefinition = this._extensionManager.getDataSourceDefinition(this._dataSourceName);
    const url = dataSourceDefinition.configuration.wadoUriRoot;
    const projectsIndex = url.indexOf('projects');
    // Split the configured URL into (essentially) pairs (i.e. item type followed by item)
    // Explicitly: ['projects','aProject','locations','aLocation','datasets','aDataSet','dicomStores','aDicomStore']
    // Note that a partial configuration will have a subset of the above.
    const urlSplit = url.substring(projectsIndex).split('/');
    const configuredItems = [];
    for (let itemType = 0;
    // the number of configured items is either the max (4) or the number extracted from the url split
    itemType < 4 && (itemType + 1) * 2 < urlSplit.length; itemType += 1) {
      if (itemType === ItemType.projects) {
        const projectId = urlSplit[1];
        const projectUrl = `${initialUrl}/projects/${projectId}`;
        const data = await GoogleCloudDataSourceConfigurationAPI._doFetch(projectUrl, ItemType.projects, this._fetchOptions);
        const project = data[0];
        configuredItems.push({
          id: project.projectId,
          name: project.name,
          itemType: itemType,
          url: `${baseHealthcareUrl}/projects/${project.projectId}`
        });
      } else {
        const relativePath = urlSplit.slice(0, itemType * 2 + 2).join('/');
        configuredItems.push({
          id: relativePath,
          name: urlSplit[itemType * 2 + 1],
          itemType: itemType,
          url: `${baseHealthcareUrl}/${relativePath}`
        });
      }
    }
    return configuredItems;
  }

  /**
   * Fetches an array of items the specified item type.
   * @param urlStr the fetch url
   * @param fetchItemType the type to fetch
   * @param fetchOptions the header options for the fetch (e.g. authorization header)
   * @param fetchSearchParams any search query params; currently only used for paging results
   * @returns an array of items of the specified type
   */
  static async _doFetch(urlStr, fetchItemType, fetchOptions = {}, fetchSearchParams = {}) {
    try {
      const url = new URL(urlStr);
      url.search = new URLSearchParams(fetchSearchParams).toString();
      const response = await fetch(url, fetchOptions);
      const data = await response.json();
      if (response.status >= 200 && response.status < 300 && data != null) {
        if (data.nextPageToken != null) {
          fetchSearchParams.pageToken = data.nextPageToken;
          const subPageData = await this._doFetch(urlStr, fetchItemType, fetchOptions, fetchSearchParams);
          data[ItemType[fetchItemType]] = data[ItemType[fetchItemType]].concat(subPageData);
        }
        if (data[ItemType[fetchItemType]]) {
          return data[ItemType[fetchItemType]];
        } else if (data.name) {
          return [data];
        } else {
          return [];
        }
      } else {
        const message = data?.error?.message || `Error returned from Google Cloud Healthcare: ${response.status} - ${response.statusText}`;
        throw new Error(message);
      }
    } catch (err) {
      const message = err?.message || 'Error occurred during fetch request.';
      throw new Error(message);
    }
  }
}

;// CONCATENATED MODULE: ../../../extensions/default/src/getCustomizationModule.tsx






const getCustomizationModule_formatDate = src/* utils */.Wp.formatDate;

/**
 *
 * Note: this is an example of how the customization module can be used
 * using the customization module. Below, we are adding a new custom route
 * to the application at the path /custom and rendering a custom component
 * Real world use cases of the having a custom route would be to add a
 * custom page for the user to view their profile, or to add a custom
 * page for login etc.
 */
function getCustomizationModule({
  servicesManager,
  extensionManager
}) {
  return [{
    name: 'helloPage',
    merge: 'Append',
    value: {
      id: 'customRoutes',
      routes: [{
        path: '/custom',
        children: () => /*#__PURE__*/react.createElement("h1", {
          style: {
            color: 'white'
          }
        }, "Hello Custom Route")
      }]
    }
  },
  // Example customization to list a set of datasources
  {
    name: 'datasources',
    merge: 'Append',
    value: {
      id: 'customRoutes',
      routes: [{
        path: '/datasources',
        children: Panels_DataSourceSelector
      }]
    }
  }, {
    name: 'default',
    value: [
    /**
     * Customization Component Type definition for overlay items.
     * Overlay items are texts (or other components) that will be displayed
     * on a Viewport Overlay, which contains the information panels on the
     * four corners of a viewport.
     *
     * @definition of a overlay item using this type
     * The value to be displayed is defined by
     *  - setting DICOM image instance's property to this field,
     *  - or defining contentF()
     *
     * {
     *   id: string - unique id for the overlay item
     *   customizationType: string - indicates customization type definition to this
     *   label: string - Label, to be displayed for the item
     *   title: string - Tooltip, for the item
     *   color: string - Color of the text
     *   condition: ({ instance }) => boolean - decides whether to display the overlay item or not
     *   attribute: string - property name of the DICOM image instance
     *   contentF: ({ instance, formatters }) => string | component,
     * }
     *
     * @example
     *  {
     *    id: 'PatientNameOverlay',
     *    customizationType: 'ohif.overlayItem',
     *    label: 'PN:',
     *    title: 'Patient Name',
     *    color: 'yellow',
     *    condition: ({ instance }) => instance && instance.PatientName && instance.PatientName.Alphabetic,
     *    attribute: 'PatientName',
     *    contentF: ({ instance, formatters: { formatPN } }) => `${formatPN(instance.PatientName.Alphabetic)} ${(instance.PatientSex ? '(' + instance.PatientSex + ')' : '')}`,
     *  },
     *
     * @see CustomizableViewportOverlay
     */
    {
      id: 'ohif.overlayItem',
      content: function (props) {
        if (this.condition && !this.condition(props)) {
          return null;
        }
        const {
          instance
        } = props;
        const value = instance && this.attribute ? instance[this.attribute] : this.contentF && typeof this.contentF === 'function' ? this.contentF(props) : null;
        if (!value) {
          return null;
        }
        return /*#__PURE__*/react.createElement("span", {
          className: "overlay-item flex flex-row",
          style: {
            color: this.color || undefined
          },
          title: this.title || ''
        }, this.label && /*#__PURE__*/react.createElement("span", {
          className: "mr-1 shrink-0"
        }, this.label), /*#__PURE__*/react.createElement("span", {
          className: "font-light"
        }, value));
      }
    }, {
      id: 'ohif.contextMenu',
      /** Applies the customizationType to all the menu items.
       * This function clones the object and child objects to prevent
       * changes to the original customization object.
       */
      transform: function (customizationService) {
        // Don't modify the children, as those are copied by reference
        const clonedObject = {
          ...this
        };
        clonedObject.menus = this.menus.map(menu => ({
          ...menu
        }));
        for (const menu of clonedObject.menus) {
          const {
            items: originalItems
          } = menu;
          menu.items = [];
          for (const item of originalItems) {
            menu.items.push(customizationService.transform(item));
          }
        }
        return clonedObject;
      }
    }, {
      // the generic GUI component to configure a data source using an instance of a BaseDataSourceConfigurationAPI
      id: 'ohif.dataSourceConfigurationComponent',
      component: Components_DataSourceConfigurationComponent.bind(null, {
        servicesManager,
        extensionManager
      })
    }, {
      // The factory for creating an instance of a BaseDataSourceConfigurationAPI for Google Cloud Healthcare
      id: 'ohif.dataSourceConfigurationAPI.google',
      factory: dataSourceName => new GoogleCloudDataSourceConfigurationAPI(dataSourceName, servicesManager, extensionManager)
    }, {
      id: 'progressDropdownWithServiceComponent',
      component: ProgressDropdownWithService
    }, {
      id: 'studyBrowser.sortFunctions',
      values: [{
        label: 'Series Number',
        sortFunction: (a, b) => {
          return a?.SeriesNumber - b?.SeriesNumber;
        }
      }, {
        label: 'Series Date',
        sortFunction: (a, b) => {
          const dateA = new Date(getCustomizationModule_formatDate(a?.SeriesDate));
          const dateB = new Date(getCustomizationModule_formatDate(b?.SeriesDate));
          return dateB.getTime() - dateA.getTime();
        }
      }]
    }, {
      id: 'studyBrowser.viewPresets',
      // change your default selected preset here
      value: [{
        id: 'list',
        iconName: 'ListView',
        selected: false
      }, {
        id: 'thumbnails',
        iconName: 'ThumbnailView',
        selected: true
      }]
    }]
  }];
}
;// CONCATENATED MODULE: ../../../extensions/default/src/Components/LineChartViewport/LineChartViewport.tsx


const LineChartViewport = ({
  displaySets
}) => {
  const displaySet = displaySets[0];
  const {
    axis: chartAxis,
    series: chartSeries
  } = displaySet.instance.chartData;
  return /*#__PURE__*/react.createElement(ui_src/* LineChart */.bl, {
    showLegend: true,
    legendWidth: 150,
    axis: {
      x: {
        label: chartAxis.x.label,
        indexRef: 0,
        type: 'x',
        range: {
          min: 0
        }
      },
      y: {
        label: chartAxis.y.label,
        indexRef: 1,
        type: 'y'
      }
    },
    series: chartSeries
  });
};

;// CONCATENATED MODULE: ../../../extensions/default/src/Components/LineChartViewport/index.ts

;// CONCATENATED MODULE: ../../../extensions/default/src/getViewportModule.tsx

const getViewportModule = ({
  servicesManager,
  commandsManager,
  extensionManager
}) => {
  return [{
    name: 'chartViewport',
    component: LineChartViewport
  }];
};

// EXTERNAL MODULE: ../../../node_modules/@cornerstonejs/calculate-suv/dist/calculate-suv.esm.js
var calculate_suv_esm = __webpack_require__(48405);
;// CONCATENATED MODULE: ../../../extensions/default/src/getPTImageIdInstanceMetadata.ts

const getPTImageIdInstanceMetadata_metadataProvider = src/* default.classes */.Ay.classes.MetadataProvider;
function getPTImageIdInstanceMetadata(imageId) {
  const dicomMetaData = getPTImageIdInstanceMetadata_metadataProvider.get('instance', imageId);
  if (!dicomMetaData) {
    throw new Error('dicom metadata are required');
  }
  if (dicomMetaData.SeriesDate === undefined || dicomMetaData.SeriesTime === undefined || dicomMetaData.CorrectedImage === undefined || dicomMetaData.Units === undefined || !dicomMetaData.RadiopharmaceuticalInformationSequence || dicomMetaData.RadiopharmaceuticalInformationSequence.RadionuclideHalfLife === undefined || dicomMetaData.RadiopharmaceuticalInformationSequence.RadionuclideTotalDose === undefined || dicomMetaData.DecayCorrection === undefined || dicomMetaData.AcquisitionDate === undefined || dicomMetaData.AcquisitionTime === undefined || dicomMetaData.RadiopharmaceuticalInformationSequence.RadiopharmaceuticalStartDateTime === undefined && dicomMetaData.RadiopharmaceuticalInformationSequence.RadiopharmaceuticalStartTime === undefined) {
    throw new Error('required metadata are missing');
  }
  if (dicomMetaData.PatientWeight === undefined) {
    console.warn('PatientWeight missing from PT instance metadata');
  }
  const instanceMetadata = {
    CorrectedImage: dicomMetaData.CorrectedImage,
    Units: dicomMetaData.Units,
    RadionuclideHalfLife: dicomMetaData.RadiopharmaceuticalInformationSequence.RadionuclideHalfLife,
    RadionuclideTotalDose: dicomMetaData.RadiopharmaceuticalInformationSequence.RadionuclideTotalDose,
    RadiopharmaceuticalStartDateTime: dicomMetaData.RadiopharmaceuticalInformationSequence.RadiopharmaceuticalStartDateTime,
    RadiopharmaceuticalStartTime: dicomMetaData.RadiopharmaceuticalInformationSequence.RadiopharmaceuticalStartTime,
    DecayCorrection: dicomMetaData.DecayCorrection,
    PatientWeight: dicomMetaData.PatientWeight,
    SeriesDate: dicomMetaData.SeriesDate,
    SeriesTime: dicomMetaData.SeriesTime,
    AcquisitionDate: dicomMetaData.AcquisitionDate,
    AcquisitionTime: dicomMetaData.AcquisitionTime
  };
  if (dicomMetaData['70531000'] || dicomMetaData['70531000'] !== undefined || dicomMetaData['70531009'] || dicomMetaData['70531009'] !== undefined) {
    const philipsPETPrivateGroup = {
      SUVScaleFactor: dicomMetaData['70531000'],
      ActivityConcentrationScaleFactor: dicomMetaData['70531009']
    };
    instanceMetadata.PhilipsPETPrivateGroup = philipsPETPrivateGroup;
  }
  if (dicomMetaData['0009100d'] && dicomMetaData['0009100d'] !== undefined) {
    instanceMetadata.GEPrivatePostInjectionDateTime = dicomMetaData['0009100d'];
  }
  if (dicomMetaData.FrameReferenceTime && dicomMetaData.FrameReferenceTime !== undefined) {
    instanceMetadata.FrameReferenceTime = dicomMetaData.FrameReferenceTime;
  }
  if (dicomMetaData.ActualFrameDuration && dicomMetaData.ActualFrameDuration !== undefined) {
    instanceMetadata.ActualFrameDuration = dicomMetaData.ActualFrameDuration;
  }
  if (dicomMetaData.PatientSex && dicomMetaData.PatientSex !== undefined) {
    instanceMetadata.PatientSex = dicomMetaData.PatientSex;
  }
  if (dicomMetaData.PatientSize && dicomMetaData.PatientSize !== undefined) {
    instanceMetadata.PatientSize = dicomMetaData.PatientSize;
  }
  return instanceMetadata;
}
function convertInterfaceTimeToString(time) {
  const hours = `${time.hours || '00'}`.padStart(2, '0');
  const minutes = `${time.minutes || '00'}`.padStart(2, '0');
  const seconds = `${time.seconds || '00'}`.padStart(2, '0');
  const fractionalSeconds = `${time.fractionalSeconds || '000000'}`.padEnd(6, '0');
  const timeString = `${hours}${minutes}${seconds}.${fractionalSeconds}`;
  return timeString;
}
function convertInterfaceDateToString(date) {
  const month = `${date.month}`.padStart(2, '0');
  const day = `${date.day}`.padStart(2, '0');
  const dateString = `${date.year}${month}${day}`;
  return dateString;
}

;// CONCATENATED MODULE: ../../../extensions/default/src/hangingprotocols/viewCode.ts
/* harmony default export */ const viewCode = (displaySet => {
  const ViewCodeSequence = displaySet?.images[0]?.ViewCodeSequence[0];
  if (!ViewCodeSequence) {
    return undefined;
  }
  const {
    CodingSchemeDesignator,
    CodeValue
  } = ViewCodeSequence;
  if (!CodingSchemeDesignator || !CodeValue) {
    return undefined;
  }
  return `${CodingSchemeDesignator}:${CodeValue}`;
});
;// CONCATENATED MODULE: ../../../extensions/default/src/hangingprotocols/laterality.ts
/* harmony default export */ const laterality = (displaySet => {
  const frameAnatomy = displaySet?.images?.[0]?.SharedFunctionalGroupsSequence?.[0]?.FrameAnatomySequence?.[0];
  if (!frameAnatomy) {
    return undefined;
  }
  const laterality = frameAnatomy?.FrameLaterality;
  return laterality;
});
;// CONCATENATED MODULE: ../../../extensions/default/src/hangingprotocols/registerHangingProtocolAttributes.ts


function registerHangingProtocolAttributes({
  servicesManager
}) {
  const {
    hangingProtocolService
  } = servicesManager.services;
  hangingProtocolService.addCustomAttribute('ViewCode', 'View Code Designator:Value', viewCode);
  hangingProtocolService.addCustomAttribute('Laterality', 'Laterality of object', laterality);
}
;// CONCATENATED MODULE: ../../../extensions/default/src/hangingprotocols/index.ts







;// CONCATENATED MODULE: ../../../extensions/default/src/init.ts




const init_metadataProvider = src/* classes */.Ly.MetadataProvider;

/**
 *
 * @param {Object} servicesManager
 * @param {Object} configuration
 */
function init({
  servicesManager,
  configuration = {},
  commandsManager
}) {
  const {
    toolbarService,
    cineService,
    viewportGridService
  } = servicesManager.services;
  toolbarService.registerEventForToolbarUpdate(cineService, [cineService.EVENTS.CINE_STATE_CHANGED]);
  // Add
  src/* DicomMetadataStore */.H8.subscribe(src/* DicomMetadataStore */.H8.EVENTS.INSTANCES_ADDED, handlePETImageMetadata);

  // If the metadata for PET has changed by the user (e.g. manually changing the PatientWeight)
  // we need to recalculate the SUV Scaling Factors
  src/* DicomMetadataStore */.H8.subscribe(src/* DicomMetadataStore */.H8.EVENTS.SERIES_UPDATED, handlePETImageMetadata);

  // Adds extra custom attributes for use by hanging protocols
  registerHangingProtocolAttributes({
    servicesManager
  });

  // Function to process and subscribe to events for a given set of commands and listeners
  const subscribeToEvents = listeners => {
    Object.entries(listeners).forEach(([event, commands]) => {
      const supportedEvents = [viewportGridService.EVENTS.ACTIVE_VIEWPORT_ID_CHANGED, viewportGridService.EVENTS.VIEWPORTS_READY];
      if (supportedEvents.includes(event)) {
        viewportGridService.subscribe(event, eventData => {
          const viewportId = eventData?.viewportId ?? viewportGridService.getActiveViewportId();
          commandsManager.run(commands, {
            viewportId
          });
        });
      }
    });
  };
  toolbarService.subscribe(toolbarService.EVENTS.TOOL_BAR_MODIFIED, state => {
    const {
      buttons
    } = state;
    for (const [id, button] of Object.entries(buttons)) {
      const {
        groupId,
        items,
        listeners
      } = button.props || {};

      // Handle group items' listeners
      if (groupId && items) {
        items.forEach(item => {
          if (item.listeners) {
            subscribeToEvents(item.listeners);
          }
        });
      }

      // Handle button listeners
      if (listeners) {
        subscribeToEvents(listeners);
      }
    }
  });
}
const handlePETImageMetadata = ({
  SeriesInstanceUID,
  StudyInstanceUID
}) => {
  const {
    instances
  } = src/* DicomMetadataStore */.H8.getSeries(StudyInstanceUID, SeriesInstanceUID);
  if (!instances?.length) {
    return;
  }
  const modality = instances[0].Modality;
  if (!modality || modality !== 'PT') {
    return;
  }
  const imageIds = instances.map(instance => instance.imageId);
  const instanceMetadataArray = [];
  // try except block to prevent errors when the metadata is not correct
  try {
    imageIds.forEach(imageId => {
      const instanceMetadata = getPTImageIdInstanceMetadata(imageId);
      if (instanceMetadata) {
        instanceMetadataArray.push(instanceMetadata);
      }
    });
    if (!instanceMetadataArray.length) {
      return;
    }
    const suvScalingFactors = (0,calculate_suv_esm/* calculateSUVScalingFactors */.C)(instanceMetadataArray);
    instanceMetadataArray.forEach((instanceMetadata, index) => {
      init_metadataProvider.addCustomMetadata(imageIds[index], 'scalingModule', suvScalingFactors[index]);
    });
  } catch (error) {
    console.log(error);
  }
};
;// CONCATENATED MODULE: ../../../extensions/default/src/DicomWebDataSource/utils/cleanDenaturalizedDataset.ts

function isPrimitive(v) {
  return !(typeof v == 'object' || Array.isArray(v));
}
const vrNumerics = new Set(['DS', 'FL', 'FD', 'IS', 'OD', 'OF', 'OL', 'OV', 'SL', 'SS', 'SV', 'UL', 'US', 'UV']);

/**
 * Specialized for DICOM JSON format dataset cleaning.
 * @param obj
 * @returns
 */
function cleanDenaturalizedDataset(obj, options) {
  if (Array.isArray(obj)) {
    const newAry = obj.map(o => isPrimitive(o) ? o : cleanDenaturalizedDataset(o, options));
    return newAry;
  }
  if (isPrimitive(obj)) {
    return obj;
  }
  Object.keys(obj).forEach(key => {
    if (obj[key].Value === null && obj[key].vr) {
      delete obj[key].Value;
    } else if (Array.isArray(obj[key].Value) && obj[key].vr) {
      if (obj[key].Value.length === 1 && obj[key].Value[0].BulkDataURI) {
        if (options?.dataSourceConfig) {
          // Not needed unless data source is directly used for loading data.
          fixBulkDataURI(obj[key].Value[0], options, options.dataSourceConfig);
        }
        obj[key].BulkDataURI = obj[key].Value[0].BulkDataURI;

        // prevent mixed-content blockage
        if (window.location.protocol === 'https:' && obj[key].BulkDataURI.startsWith('http:')) {
          obj[key].BulkDataURI = obj[key].BulkDataURI.replace('http:', 'https:');
        }
        delete obj[key].Value;
      } else if (vrNumerics.has(obj[key].vr)) {
        obj[key].Value = obj[key].Value.map(v => +v);
      } else {
        obj[key].Value = obj[key].Value.map(entry => cleanDenaturalizedDataset(entry, options));
      }
    }
  });
  return obj;
}

/**
 * This is required to make the denaturalized data transferrable when it has
 * added proxy values.
 */
function transferDenaturalizedDataset(dataset) {
  const noNull = cleanDenaturalizedDataset(dataset);
  return JSON.parse(JSON.stringify(noNull));
}
;// CONCATENATED MODULE: ../../../extensions/default/src/DicomWebDataSource/utils/fixMultiValueKeys.ts
/**
 * Fix multi-valued keys so that those which are strings split by
 * a backslash are returned as arrays.
 */
function fixMultiValueKeys(naturalData, keys = ['ImageType']) {
  for (const key of keys) {
    if (typeof naturalData[key] === 'string') {
      naturalData[key] = naturalData[key].split('\\');
    }
  }
  return naturalData;
}
;// CONCATENATED MODULE: ../../../extensions/default/src/DicomWebDataSource/utils/index.ts




;// CONCATENATED MODULE: ../../../extensions/default/src/Actions/createReportAsync.tsx



/**
 *
 * @param {*} servicesManager
 */
async function createReportAsync({
  servicesManager,
  getReport,
  reportType = 'measurement'
}) {
  const {
    displaySetService,
    uiNotificationService,
    uiDialogService
  } = servicesManager.services;
  const loadingDialogId = uiDialogService.create({
    showOverlay: true,
    isDraggable: false,
    centralize: true,
    content: Loading
  });
  try {
    const naturalizedReport = await getReport();
    if (!naturalizedReport) return;

    // The "Mode" route listens for DicomMetadataStore changes
    // When a new instance is added, it listens and
    // automatically calls makeDisplaySets
    src/* DicomMetadataStore */.H8.addInstances([naturalizedReport], true);
    const displaySet = displaySetService.getMostRecentDisplaySet();
    const displaySetInstanceUID = displaySet.displaySetInstanceUID;
    uiNotificationService.show({
      title: 'Create Report',
      message: `${reportType} saved successfully`,
      type: 'success'
    });
    return [displaySetInstanceUID];
  } catch (error) {
    uiNotificationService.show({
      title: 'Create Report',
      message: error.message || `Failed to store ${reportType}`,
      type: 'error'
    });
    throw new Error(`Failed to store ${reportType}. Error: ${error.message || 'Unknown error'}`);
  } finally {
    uiDialogService.dismiss({
      id: loadingDialogId
    });
  }
}
function Loading() {
  return /*#__PURE__*/react.createElement("div", {
    className: "text-primary-active"
  }, "Loading...");
}
/* harmony default export */ const Actions_createReportAsync = (createReportAsync);
;// CONCATENATED MODULE: ../../../extensions/default/src/stores/useUIStateStore.ts



/**
 * Identifier for the UI State store type.
 */
const useUIStateStore_PRESENTATION_TYPE_ID = 'uiStateId';

/**
 * Flag to enable or disable debug mode for the store.
 * Set to `true` to enable zustand devtools.
 */
const useUIStateStore_DEBUG_STORE = false;

/**
 * Represents the UI state.
 */

/**
 * State shape for the UI State store.
 */

/**
 * Creates the UI State store.
 *
 * @param set - The zustand set function.
 * @returns The UI State store state and actions.
 */
const createUIStateStore = set => ({
  type: useUIStateStore_PRESENTATION_TYPE_ID,
  uiState: {},
  /**
   * Sets the UI state for a given key.
   */
  setUIState: (key, value) => set(state => ({
    uiState: {
      ...state.uiState,
      [key]: value
    }
  }), false, 'setUIState'),
  /**
   * Clears all UI state.
   */
  clearUIState: () => set({
    uiState: {}
  }, false, 'clearUIState')
});

/**
 * Zustand store for managing UI state.
 * Applies devtools middleware when DEBUG_STORE is enabled.
 */
const useUIStateStore = (0,zustand_esm/* create */.vt)()(useUIStateStore_DEBUG_STORE ? (0,middleware/* devtools */.lt)(createUIStateStore, {
  name: 'UIStateStore'
}) : createUIStateStore);
;// CONCATENATED MODULE: ../../../extensions/default/src/utils/callInputDialog.tsx



/**
 *
 * @param {*} data
 * @param {*} data.text
 * @param {*} data.label
 * @param {*} event
 * @param {*} callback
 * @param {*} isArrowAnnotateInputDialog
 * @param {*} dialogConfig
 * @param {string?} dialogConfig.dialogTitle - title of the input dialog
 * @param {string?} dialogConfig.inputLabel - show label above the input
 */

function callInputDialog(uiDialogService, data, callback, isArrowAnnotateInputDialog = true, dialogConfig = {}) {
  const dialogId = 'dialog-enter-annotation';
  const label = data ? isArrowAnnotateInputDialog ? data.text : data.label : '';
  const {
    dialogTitle = 'Annotation',
    inputLabel = 'Enter your annotation',
    validateFunc = value => true
  } = dialogConfig;
  const onSubmitHandler = ({
    action,
    value
  }) => {
    switch (action.id) {
      case 'save':
        if (typeof validateFunc === 'function' && !validateFunc(value.label)) {
          return;
        }
        callback(value.label, action.id);
        break;
      case 'cancel':
        callback('', action.id);
        break;
    }
    uiDialogService.dismiss({
      id: dialogId
    });
  };
  if (uiDialogService) {
    uiDialogService.create({
      id: dialogId,
      centralize: true,
      isDraggable: false,
      showOverlay: true,
      content: ui_src/* Dialog */.lG,
      contentProps: {
        title: dialogTitle,
        value: {
          label
        },
        noCloseButton: true,
        onClose: () => uiDialogService.dismiss({
          id: dialogId
        }),
        actions: [{
          id: 'cancel',
          text: 'Cancel',
          type: ui_src/* ButtonEnums.type */.Ny.NW.secondary
        }, {
          id: 'save',
          text: 'Save',
          type: ui_src/* ButtonEnums.type */.Ny.NW.primary
        }],
        onSubmit: onSubmitHandler,
        body: ({
          value,
          setValue
        }) => {
          return /*#__PURE__*/react.createElement(ui_src/* Input */.pd, {
            autoFocus: true,
            className: "border-primary-main bg-black",
            type: "text",
            id: "annotation",
            label: inputLabel,
            labelClassName: "text-white text-[14px] leading-[1.2]",
            value: value.label,
            onChange: event => {
              event.persist();
              setValue(value => ({
                ...value,
                label: event.target.value
              }));
            },
            onKeyPress: event => {
              if (event.key === 'Enter') {
                onSubmitHandler({
                  value,
                  action: {
                    id: 'save'
                  }
                });
              }
            }
          });
        }
      }
    });
  }
}
function callLabelAutocompleteDialog(uiDialogService, callback, dialogConfig, labelConfig) {
  const exclusive = labelConfig ? labelConfig.exclusive : false;
  const dropDownItems = labelConfig ? labelConfig.items : [];
  const {
    validateFunc = value => true
  } = dialogConfig;
  const labellingDoneCallback = value => {
    if (typeof value === 'string') {
      if (typeof validateFunc === 'function' && !validateFunc(value)) {
        return;
      }
      callback(value, 'save');
    } else {
      callback('', 'cancel');
    }
    uiDialogService.dismiss({
      id: 'select-annotation'
    });
  };
  uiDialogService.create({
    id: 'select-annotation',
    centralize: true,
    isDraggable: false,
    showOverlay: true,
    content: ui_src/* LabellingFlow */.nd,
    contentProps: {
      labellingDoneCallback: labellingDoneCallback,
      measurementData: {
        label: ''
      },
      componentClassName: {},
      labelData: dropDownItems,
      exclusive: exclusive
    }
  });
}
function showLabelAnnotationPopup(measurement, uiDialogService, labelConfig) {
  const exclusive = labelConfig ? labelConfig.exclusive : false;
  const dropDownItems = labelConfig ? labelConfig.items : [];
  return new Promise((resolve, reject) => {
    const labellingDoneCallback = value => {
      uiDialogService.dismiss({
        id: 'select-annotation'
      });
      if (typeof value === 'string') {
        measurement.label = value;
      }
      resolve(measurement);
    };
    uiDialogService.create({
      id: 'select-annotation',
      isDraggable: false,
      showOverlay: true,
      content: ui_src/* LabellingFlow */.nd,
      defaultPosition: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      },
      contentProps: {
        labellingDoneCallback: labellingDoneCallback,
        measurementData: measurement,
        componentClassName: {},
        labelData: dropDownItems,
        exclusive: exclusive
      }
    });
  });
}
/* harmony default export */ const utils_callInputDialog = ((/* unused pure expression or super */ null && (callInputDialog)));
// EXTERNAL MODULE: ../../../node_modules/react-color/es/index.js + 219 modules
var react_color_es = __webpack_require__(69175);
;// CONCATENATED MODULE: ../../../extensions/default/src/utils/colorPickerDialog.css
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ../../../extensions/default/src/utils/colorPickerDialog.tsx




function colorPickerDialog(uiDialogService, rgbaColor, callback) {
  const dialogId = 'pick-color';
  const onSubmitHandler = ({
    action,
    value
  }) => {
    switch (action.id) {
      case 'save':
        callback(value.rgbaColor, action.id);
        break;
      case 'cancel':
        callback('', action.id);
        break;
    }
    uiDialogService.dismiss({
      id: dialogId
    });
  };
  if (uiDialogService) {
    uiDialogService.create({
      id: dialogId,
      centralize: true,
      isDraggable: false,
      showOverlay: true,
      content: ui_src/* Dialog */.lG,
      contentProps: {
        title: 'Segment Color',
        value: {
          rgbaColor
        },
        noCloseButton: true,
        onClose: () => uiDialogService.dismiss({
          id: dialogId
        }),
        actions: [{
          id: 'cancel',
          text: 'Cancel',
          type: 'primary'
        }, {
          id: 'save',
          text: 'Save',
          type: 'secondary'
        }],
        onSubmit: onSubmitHandler,
        body: ({
          value,
          setValue
        }) => {
          const handleChange = color => {
            setValue({
              rgbaColor: color.rgb
            });
          };
          return /*#__PURE__*/react.createElement(react_color_es/* ChromePicker */.xk, {
            color: value.rgbaColor,
            onChange: handleChange,
            presetColors: [],
            width: 300
          });
        }
      }
    });
  }
}
/* harmony default export */ const utils_colorPickerDialog = (colorPickerDialog);
;// CONCATENATED MODULE: ../../../extensions/default/src/utils/getNextSRSeriesNumber.js
const MIN_SR_SERIES_NUMBER = 4700;
function getNextSRSeriesNumber(displaySetService) {
  const activeDisplaySets = displaySetService.getActiveDisplaySets();
  const srDisplaySets = activeDisplaySets.filter(ds => ds.Modality === 'SR');
  const srSeriesNumbers = srDisplaySets.map(ds => ds.SeriesNumber);
  const maxSeriesNumber = Math.max(...srSeriesNumbers, MIN_SR_SERIES_NUMBER);
  return maxSeriesNumber + 1;
}
;// CONCATENATED MODULE: ../../../extensions/default/src/utils/promptSaveReport.js




async function promptSaveReport({
  servicesManager,
  commandsManager,
  extensionManager
}, ctx, evt) {
  const {
    uiDialogService,
    measurementService,
    displaySetService
  } = servicesManager.services;
  const viewportId = evt.viewportId === undefined ? evt.data.viewportId : evt.viewportId;
  const isBackupSave = evt.isBackupSave === undefined ? evt.data.isBackupSave : evt.isBackupSave;
  const StudyInstanceUID = evt?.data?.StudyInstanceUID;
  const SeriesInstanceUID = evt?.data?.SeriesInstanceUID;
  const {
    trackedStudy,
    trackedSeries
  } = ctx;
  let displaySetInstanceUIDs;
  try {
    const promptResult = await CreateReportDialogPrompt(uiDialogService, {
      extensionManager
    });
    if (promptResult.action === PROMPT_RESPONSES.CREATE_REPORT) {
      const dataSources = extensionManager.getDataSources();
      const dataSource = dataSources[0];
      const measurements = measurementService.getMeasurements();
      const trackedMeasurements = measurements.filter(m => trackedStudy === m.referenceStudyUID && trackedSeries.includes(m.referenceSeriesUID)).filter(m => m.referencedImageId != null);
      const SeriesDescription =
      // isUndefinedOrEmpty
      promptResult.value === undefined || promptResult.value === '' ? 'Research Derived Series' // default
      : promptResult.value; // provided value

      const SeriesNumber = getNextSRSeriesNumber(displaySetService);
      const getReport = async () => {
        return commandsManager.runCommand('storeMeasurements', {
          measurementData: trackedMeasurements,
          dataSource,
          additionalFindingTypes: ['ArrowAnnotate'],
          options: {
            SeriesDescription,
            SeriesNumber
          }
        }, 'CORNERSTONE_STRUCTURED_REPORT');
      };
      displaySetInstanceUIDs = await Actions_createReportAsync({
        servicesManager,
        getReport
      });
    } else if (promptResult.action === RESPONSE.CANCEL) {
      // Do nothing
    }
    return {
      userResponse: promptResult.action,
      createdDisplaySetInstanceUIDs: displaySetInstanceUIDs,
      StudyInstanceUID,
      SeriesInstanceUID,
      viewportId,
      isBackupSave
    };
  } catch (error) {
    return null;
  }
}
/* harmony default export */ const utils_promptSaveReport = (promptSaveReport);
;// CONCATENATED MODULE: ../../../extensions/default/src/utils/promptLabelAnnotation.js

function promptLabelAnnotation({
  servicesManager
}, ctx, evt) {
  const {
    measurementService,
    customizationService
  } = servicesManager.services;
  const {
    viewportId,
    StudyInstanceUID,
    SeriesInstanceUID,
    measurementId
  } = evt;
  return new Promise(async function (resolve) {
    const labelConfig = customizationService.get('measurementLabels');
    const measurement = measurementService.getMeasurement(measurementId);
    const value = await showLabelAnnotationPopup(measurement, servicesManager.services.uiDialogService, labelConfig);
    measurementService.update(measurementId, {
      ...value
    }, true);
    resolve({
      StudyInstanceUID,
      SeriesInstanceUID,
      viewportId
    });
  });
}
/* harmony default export */ const utils_promptLabelAnnotation = (promptLabelAnnotation);
;// CONCATENATED MODULE: ../../../extensions/default/src/utils/addIcon.ts



/** Adds the icon to both ui and ui-next */
function addIcon(name, icon) {
  (0,ui_src/* addIcon */.Xv)(name, icon);
  ui_next_src/* Icons */.FI.addIcon(name, icon);
}
;// CONCATENATED MODULE: ../../../extensions/default/src/utils/index.ts

;// CONCATENATED MODULE: ../../../extensions/default/src/index.ts
































const defaultExtension = {
  /**
   * Only required property. Should be a unique value across all extensions.
   */
  id: id,
  preRegistration: init,
  onModeExit() {
    useViewportGridStore.getState().clearViewportGridState();
    useUIStateStore.getState().clearUIState();
    useDisplaySetSelectorStore.getState().clearDisplaySetSelectorMap();
    useHangingProtocolStageIndexStore.getState().clearHangingProtocolStageIndexMap();
    useToggleHangingProtocolStore.getState().clearToggleHangingProtocol();
    useViewportsByPositionStore.getState().clearViewportsByPosition();
  },
  getDataSourcesModule: src_getDataSourcesModule,
  getViewportModule: getViewportModule,
  getLayoutTemplateModule: getLayoutTemplateModule,
  getPanelModule: src_getPanelModule,
  getHangingProtocolModule: src_getHangingProtocolModule,
  getSopClassHandlerModule: src_getSopClassHandlerModule,
  getToolbarModule: getToolbarModule,
  getCommandsModule: src_commandsModule,
  getUtilityModule({
    servicesManager
  }) {
    return [{
      name: 'common',
      exports: {
        getStudiesForPatientByMRN: Panels_getStudiesForPatientByMRN
      }
    }];
  },
  getCustomizationModule: getCustomizationModule
};
/* harmony default export */ const default_src = (defaultExtension);


/***/ }),

/***/ 73325:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ useToggleOneUpViewportGridStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95759);

const PRESENTATION_TYPE_ID = 'toggleOneUpViewportGridId';
// Stores the entire ViewportGridService getState when toggling to one up
// (e.g. via a double click) so that it can be restored when toggling back.
const useToggleOneUpViewportGridStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__/* .create */ .vt)(set => ({
  toggleOneUpViewportGridStore: null,
  type: PRESENTATION_TYPE_ID,
  setToggleOneUpViewportGridStore: state => set({
    toggleOneUpViewportGridStore: state
  }),
  clearToggleOneUpViewportGridStore: () => set({
    toggleOneUpViewportGridStore: null
  })
}));

/***/ })

}]);