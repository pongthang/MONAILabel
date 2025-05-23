"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[8094],{

/***/ 8094:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ColorSpace = { Unkown: 0, Grayscale: 1, AdobeRGB: 2, RGB: 3, CYMK: 4 };
var dctZigZag = new Int32Array([
    0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40,
    48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29,
    22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54,
    47, 55, 62, 63,
]);
var dctCos1 = 4017;
var dctSin1 = 799;
var dctCos3 = 3406;
var dctSin3 = 2276;
var dctCos6 = 1567;
var dctSin6 = 3784;
var dctSqrt2 = 5793;
var dctSqrt1d2 = 2896;
function buildHuffmanTable(codeLengths, values) {
    var k = 0, code = [], i, j, length = 16;
    while (length > 0 && !codeLengths[length - 1])
        length--;
    code.push({ children: [], index: 0 });
    var p = code[0], q;
    for (i = 0; i < length; i++) {
        for (j = 0; j < codeLengths[i]; j++) {
            p = code.pop();
            p.children[p.index] = values[k];
            while (p.index > 0) {
                p = code.pop();
            }
            p.index++;
            code.push(p);
            while (code.length <= i) {
                code.push((q = { children: [], index: 0 }));
                p.children[p.index] = q.children;
                p = q;
            }
            k++;
        }
        if (i + 1 < length) {
            code.push((q = { children: [], index: 0 }));
            p.children[p.index] = q.children;
            p = q;
        }
    }
    return code[0].children;
}
function getBlockBufferOffset(component, row, col) {
    return 64 * ((component.blocksPerLine + 1) * row + col);
}
function decodeScan(data, offset, frame, components, resetInterval, spectralStart, spectralEnd, successivePrev, successive) {
    var precision = frame.precision;
    var samplesPerLine = frame.samplesPerLine;
    var scanLines = frame.scanLines;
    var mcusPerLine = frame.mcusPerLine;
    var progressive = frame.progressive;
    var maxH = frame.maxH, maxV = frame.maxV;
    var startOffset = offset, bitsData = 0, bitsCount = 0;
    function readBit() {
        if (bitsCount > 0) {
            bitsCount--;
            return (bitsData >> bitsCount) & 1;
        }
        bitsData = data[offset++];
        if (bitsData == 0xff) {
            var nextByte = data[offset++];
            if (nextByte) {
                throw 'unexpected marker: ' + ((bitsData << 8) | nextByte).toString(16);
            }
        }
        bitsCount = 7;
        return bitsData >>> 7;
    }
    function decodeHuffman(tree) {
        var node = tree;
        var bit;
        while ((bit = readBit()) !== null) {
            node = node[bit];
            if (typeof node === 'number')
                return node;
            if (typeof node !== 'object')
                throw 'invalid huffman sequence';
        }
        return null;
    }
    function receive(length) {
        var n = 0;
        while (length > 0) {
            var bit = readBit();
            if (bit === null)
                return;
            n = (n << 1) | bit;
            length--;
        }
        return n;
    }
    function receiveAndExtend(length) {
        var n = receive(length);
        if (n >= 1 << (length - 1))
            return n;
        return n + (-1 << length) + 1;
    }
    function decodeBaseline(component, offset) {
        var t = decodeHuffman(component.huffmanTableDC);
        var diff = t === 0 ? 0 : receiveAndExtend(t);
        component.blockData[offset] = component.pred += diff;
        var k = 1;
        while (k < 64) {
            var rs = decodeHuffman(component.huffmanTableAC);
            var s = rs & 15, r = rs >> 4;
            if (s === 0) {
                if (r < 15)
                    break;
                k += 16;
                continue;
            }
            k += r;
            var z = dctZigZag[k];
            component.blockData[offset + z] = receiveAndExtend(s);
            k++;
        }
    }
    function decodeDCFirst(component, offset) {
        var t = decodeHuffman(component.huffmanTableDC);
        var diff = t === 0 ? 0 : receiveAndExtend(t) << successive;
        component.blockData[offset] = component.pred += diff;
    }
    function decodeDCSuccessive(component, offset) {
        component.blockData[offset] |= readBit() << successive;
    }
    var eobrun = 0;
    function decodeACFirst(component, offset) {
        if (eobrun > 0) {
            eobrun--;
            return;
        }
        var k = spectralStart, e = spectralEnd;
        while (k <= e) {
            var rs = decodeHuffman(component.huffmanTableAC);
            var s = rs & 15, r = rs >> 4;
            if (s === 0) {
                if (r < 15) {
                    eobrun = receive(r) + (1 << r) - 1;
                    break;
                }
                k += 16;
                continue;
            }
            k += r;
            var z = dctZigZag[k];
            component.blockData[offset + z] = receiveAndExtend(s) * (1 << successive);
            k++;
        }
    }
    var successiveACState = 0, successiveACNextValue;
    function decodeACSuccessive(component, offset) {
        var k = spectralStart, e = spectralEnd, r = 0;
        while (k <= e) {
            var z = dctZigZag[k];
            switch (successiveACState) {
                case 0:
                    var rs = decodeHuffman(component.huffmanTableAC);
                    var s = rs & 15;
                    r = rs >> 4;
                    if (s === 0) {
                        if (r < 15) {
                            eobrun = receive(r) + (1 << r);
                            successiveACState = 4;
                        }
                        else {
                            r = 16;
                            successiveACState = 1;
                        }
                    }
                    else {
                        if (s !== 1)
                            throw 'invalid ACn encoding';
                        successiveACNextValue = receiveAndExtend(s);
                        successiveACState = r ? 2 : 3;
                    }
                    continue;
                case 1:
                case 2:
                    if (component.blockData[offset + z]) {
                        component.blockData[offset + z] += readBit() << successive;
                    }
                    else {
                        r--;
                        if (r === 0)
                            successiveACState = successiveACState == 2 ? 3 : 0;
                    }
                    break;
                case 3:
                    if (component.blockData[offset + z]) {
                        component.blockData[offset + z] += readBit() << successive;
                    }
                    else {
                        component.blockData[offset + z] =
                            successiveACNextValue << successive;
                        successiveACState = 0;
                    }
                    break;
                case 4:
                    if (component.blockData[offset + z]) {
                        component.blockData[offset + z] += readBit() << successive;
                    }
                    break;
            }
            k++;
        }
        if (successiveACState === 4) {
            eobrun--;
            if (eobrun === 0)
                successiveACState = 0;
        }
    }
    function decodeMcu(component, decode, mcu, row, col) {
        var mcuRow = (mcu / mcusPerLine) | 0;
        var mcuCol = mcu % mcusPerLine;
        var blockRow = mcuRow * component.v + row;
        var blockCol = mcuCol * component.h + col;
        var offset = getBlockBufferOffset(component, blockRow, blockCol);
        decode(component, offset);
    }
    function decodeBlock(component, decode, mcu) {
        var blockRow = (mcu / component.blocksPerLine) | 0;
        var blockCol = mcu % component.blocksPerLine;
        var offset = getBlockBufferOffset(component, blockRow, blockCol);
        decode(component, offset);
    }
    var componentsLength = components.length;
    var component, i, j, k, n;
    var decodeFn;
    if (progressive) {
        if (spectralStart === 0)
            decodeFn = successivePrev === 0 ? decodeDCFirst : decodeDCSuccessive;
        else
            decodeFn = successivePrev === 0 ? decodeACFirst : decodeACSuccessive;
    }
    else {
        decodeFn = decodeBaseline;
    }
    var mcu = 0, marker;
    var mcuExpected;
    if (componentsLength == 1) {
        mcuExpected = components[0].blocksPerLine * components[0].blocksPerColumn;
    }
    else {
        mcuExpected = mcusPerLine * frame.mcusPerColumn;
    }
    if (!resetInterval) {
        resetInterval = mcuExpected;
    }
    var h, v;
    while (mcu < mcuExpected) {
        for (i = 0; i < componentsLength; i++) {
            components[i].pred = 0;
        }
        eobrun = 0;
        if (componentsLength == 1) {
            component = components[0];
            for (n = 0; n < resetInterval; n++) {
                decodeBlock(component, decodeFn, mcu);
                mcu++;
            }
        }
        else {
            for (n = 0; n < resetInterval; n++) {
                for (i = 0; i < componentsLength; i++) {
                    component = components[i];
                    h = component.h;
                    v = component.v;
                    for (j = 0; j < v; j++) {
                        for (k = 0; k < h; k++) {
                            decodeMcu(component, decodeFn, mcu, j, k);
                        }
                    }
                }
                mcu++;
            }
        }
        bitsCount = 0;
        marker = (data[offset] << 8) | data[offset + 1];
        if (marker <= 0xff00) {
            throw 'marker was not found';
        }
        if (marker >= 0xffd0 && marker <= 0xffd7) {
            offset += 2;
        }
        else {
            break;
        }
    }
    return offset - startOffset;
}
function quantizeAndInverse(component, blockBufferOffset, p) {
    var qt = component.quantizationTable;
    var v0, v1, v2, v3, v4, v5, v6, v7, t;
    var i;
    for (i = 0; i < 64; i++) {
        p[i] = component.blockData[blockBufferOffset + i] * qt[i];
    }
    for (i = 0; i < 8; ++i) {
        var row = 8 * i;
        if (p[1 + row] === 0 &&
            p[2 + row] === 0 &&
            p[3 + row] === 0 &&
            p[4 + row] === 0 &&
            p[5 + row] === 0 &&
            p[6 + row] === 0 &&
            p[7 + row] === 0) {
            t = (dctSqrt2 * p[0 + row] + 512) >> 10;
            p[0 + row] = t;
            p[1 + row] = t;
            p[2 + row] = t;
            p[3 + row] = t;
            p[4 + row] = t;
            p[5 + row] = t;
            p[6 + row] = t;
            p[7 + row] = t;
            continue;
        }
        v0 = (dctSqrt2 * p[0 + row] + 128) >> 8;
        v1 = (dctSqrt2 * p[4 + row] + 128) >> 8;
        v2 = p[2 + row];
        v3 = p[6 + row];
        v4 = (dctSqrt1d2 * (p[1 + row] - p[7 + row]) + 128) >> 8;
        v7 = (dctSqrt1d2 * (p[1 + row] + p[7 + row]) + 128) >> 8;
        v5 = p[3 + row] << 4;
        v6 = p[5 + row] << 4;
        t = (v0 - v1 + 1) >> 1;
        v0 = (v0 + v1 + 1) >> 1;
        v1 = t;
        t = (v2 * dctSin6 + v3 * dctCos6 + 128) >> 8;
        v2 = (v2 * dctCos6 - v3 * dctSin6 + 128) >> 8;
        v3 = t;
        t = (v4 - v6 + 1) >> 1;
        v4 = (v4 + v6 + 1) >> 1;
        v6 = t;
        t = (v7 + v5 + 1) >> 1;
        v5 = (v7 - v5 + 1) >> 1;
        v7 = t;
        t = (v0 - v3 + 1) >> 1;
        v0 = (v0 + v3 + 1) >> 1;
        v3 = t;
        t = (v1 - v2 + 1) >> 1;
        v1 = (v1 + v2 + 1) >> 1;
        v2 = t;
        t = (v4 * dctSin3 + v7 * dctCos3 + 2048) >> 12;
        v4 = (v4 * dctCos3 - v7 * dctSin3 + 2048) >> 12;
        v7 = t;
        t = (v5 * dctSin1 + v6 * dctCos1 + 2048) >> 12;
        v5 = (v5 * dctCos1 - v6 * dctSin1 + 2048) >> 12;
        v6 = t;
        p[0 + row] = v0 + v7;
        p[7 + row] = v0 - v7;
        p[1 + row] = v1 + v6;
        p[6 + row] = v1 - v6;
        p[2 + row] = v2 + v5;
        p[5 + row] = v2 - v5;
        p[3 + row] = v3 + v4;
        p[4 + row] = v3 - v4;
    }
    for (i = 0; i < 8; ++i) {
        var col = i;
        if (p[1 * 8 + col] === 0 &&
            p[2 * 8 + col] === 0 &&
            p[3 * 8 + col] === 0 &&
            p[4 * 8 + col] === 0 &&
            p[5 * 8 + col] === 0 &&
            p[6 * 8 + col] === 0 &&
            p[7 * 8 + col] === 0) {
            t = (dctSqrt2 * p[i + 0] + 8192) >> 14;
            p[0 * 8 + col] = t;
            p[1 * 8 + col] = t;
            p[2 * 8 + col] = t;
            p[3 * 8 + col] = t;
            p[4 * 8 + col] = t;
            p[5 * 8 + col] = t;
            p[6 * 8 + col] = t;
            p[7 * 8 + col] = t;
            continue;
        }
        v0 = (dctSqrt2 * p[0 * 8 + col] + 2048) >> 12;
        v1 = (dctSqrt2 * p[4 * 8 + col] + 2048) >> 12;
        v2 = p[2 * 8 + col];
        v3 = p[6 * 8 + col];
        v4 = (dctSqrt1d2 * (p[1 * 8 + col] - p[7 * 8 + col]) + 2048) >> 12;
        v7 = (dctSqrt1d2 * (p[1 * 8 + col] + p[7 * 8 + col]) + 2048) >> 12;
        v5 = p[3 * 8 + col];
        v6 = p[5 * 8 + col];
        t = (v0 - v1 + 1) >> 1;
        v0 = (v0 + v1 + 1) >> 1;
        v1 = t;
        t = (v2 * dctSin6 + v3 * dctCos6 + 2048) >> 12;
        v2 = (v2 * dctCos6 - v3 * dctSin6 + 2048) >> 12;
        v3 = t;
        t = (v4 - v6 + 1) >> 1;
        v4 = (v4 + v6 + 1) >> 1;
        v6 = t;
        t = (v7 + v5 + 1) >> 1;
        v5 = (v7 - v5 + 1) >> 1;
        v7 = t;
        t = (v0 - v3 + 1) >> 1;
        v0 = (v0 + v3 + 1) >> 1;
        v3 = t;
        t = (v1 - v2 + 1) >> 1;
        v1 = (v1 + v2 + 1) >> 1;
        v2 = t;
        t = (v4 * dctSin3 + v7 * dctCos3 + 2048) >> 12;
        v4 = (v4 * dctCos3 - v7 * dctSin3 + 2048) >> 12;
        v7 = t;
        t = (v5 * dctSin1 + v6 * dctCos1 + 2048) >> 12;
        v5 = (v5 * dctCos1 - v6 * dctSin1 + 2048) >> 12;
        v6 = t;
        p[0 * 8 + col] = v0 + v7;
        p[7 * 8 + col] = v0 - v7;
        p[1 * 8 + col] = v1 + v6;
        p[6 * 8 + col] = v1 - v6;
        p[2 * 8 + col] = v2 + v5;
        p[5 * 8 + col] = v2 - v5;
        p[3 * 8 + col] = v3 + v4;
        p[4 * 8 + col] = v3 - v4;
    }
    for (i = 0; i < 64; ++i) {
        var index = blockBufferOffset + i;
        var q = p[i];
        q =
            q <= -2056 / component.bitConversion
                ? 0
                : q >= 2024 / component.bitConversion
                    ? 255 / component.bitConversion
                    : (q + 2056 / component.bitConversion) >> 4;
        component.blockData[index] = q;
    }
}
function buildComponentData(frame, component) {
    var lines = [];
    var blocksPerLine = component.blocksPerLine;
    var blocksPerColumn = component.blocksPerColumn;
    var samplesPerLine = blocksPerLine << 3;
    var computationBuffer = new Int32Array(64);
    var i, j, ll = 0;
    for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
        for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
            var offset = getBlockBufferOffset(component, blockRow, blockCol);
            quantizeAndInverse(component, offset, computationBuffer);
        }
    }
    return component.blockData;
}
function clampToUint8(a) {
    return a <= 0 ? 0 : a >= 255 ? 255 : a | 0;
}
class JpegImage {
    constructor() { }
    load(path) {
        var handleData = function (data) {
            this.parse(data);
            if (this.onload)
                this.onload();
        }.bind(this);
        if (path.indexOf('data:') > -1) {
            var offset = path.indexOf('base64,') + 7;
            var data = atob(path.substring(offset));
            var arr = new Uint8Array(data.length);
            for (var i = data.length - 1; i >= 0; i--) {
                arr[i] = data.charCodeAt(i);
            }
            handleData(data);
        }
        else {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', path, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function () {
                var data = new Uint8Array(xhr.response);
                handleData(data);
            }.bind(this);
            xhr.send(null);
        }
    }
    parse(data) {
        function readUint16() {
            var value = (data[offset] << 8) | data[offset + 1];
            offset += 2;
            return value;
        }
        function readDataBlock() {
            var length = readUint16();
            var array = data.subarray(offset, offset + length - 2);
            offset += array.length;
            return array;
        }
        function prepareComponents(frame) {
            var mcusPerLine = Math.ceil(frame.samplesPerLine / 8 / frame.maxH);
            var mcusPerColumn = Math.ceil(frame.scanLines / 8 / frame.maxV);
            for (var i = 0; i < frame.components.length; i++) {
                component = frame.components[i];
                var blocksPerLine = Math.ceil((Math.ceil(frame.samplesPerLine / 8) * component.h) / frame.maxH);
                var blocksPerColumn = Math.ceil((Math.ceil(frame.scanLines / 8) * component.v) / frame.maxV);
                var blocksPerLineForMcu = mcusPerLine * component.h;
                var blocksPerColumnForMcu = mcusPerColumn * component.v;
                var blocksBufferSize = 64 * blocksPerColumnForMcu * (blocksPerLineForMcu + 1);
                component.blockData = new Int16Array(blocksBufferSize);
                component.blocksPerLine = blocksPerLine;
                component.blocksPerColumn = blocksPerColumn;
            }
            frame.mcusPerLine = mcusPerLine;
            frame.mcusPerColumn = mcusPerColumn;
        }
        var offset = 0, length = data.length;
        var jfif = null;
        var adobe = null;
        var pixels = null;
        var frame, resetInterval;
        var quantizationTables = [];
        var huffmanTablesAC = [], huffmanTablesDC = [];
        var fileMarker = readUint16();
        if (fileMarker != 0xffd8) {
            throw 'SOI not found';
        }
        fileMarker = readUint16();
        while (fileMarker != 0xffd9) {
            var i, j, l;
            switch (fileMarker) {
                case 0xffe0:
                case 0xffe1:
                case 0xffe2:
                case 0xffe3:
                case 0xffe4:
                case 0xffe5:
                case 0xffe6:
                case 0xffe7:
                case 0xffe8:
                case 0xffe9:
                case 0xffea:
                case 0xffeb:
                case 0xffec:
                case 0xffed:
                case 0xffee:
                case 0xffef:
                case 0xfffe:
                    var appData = readDataBlock();
                    if (fileMarker === 0xffe0) {
                        if (appData[0] === 0x4a &&
                            appData[1] === 0x46 &&
                            appData[2] === 0x49 &&
                            appData[3] === 0x46 &&
                            appData[4] === 0) {
                            jfif = {
                                version: { major: appData[5], minor: appData[6] },
                                densityUnits: appData[7],
                                xDensity: (appData[8] << 8) | appData[9],
                                yDensity: (appData[10] << 8) | appData[11],
                                thumbWidth: appData[12],
                                thumbHeight: appData[13],
                                thumbData: appData.subarray(14, 14 + 3 * appData[12] * appData[13]),
                            };
                        }
                    }
                    if (fileMarker === 0xffee) {
                        if (appData[0] === 0x41 &&
                            appData[1] === 0x64 &&
                            appData[2] === 0x6f &&
                            appData[3] === 0x62 &&
                            appData[4] === 0x65 &&
                            appData[5] === 0) {
                            adobe = {
                                version: appData[6],
                                flags0: (appData[7] << 8) | appData[8],
                                flags1: (appData[9] << 8) | appData[10],
                                transformCode: appData[11],
                            };
                        }
                    }
                    break;
                case 0xffdb:
                    var quantizationTablesLength = readUint16();
                    var quantizationTablesEnd = quantizationTablesLength + offset - 2;
                    while (offset < quantizationTablesEnd) {
                        var quantizationTableSpec = data[offset++];
                        var tableData = new Int32Array(64);
                        if (quantizationTableSpec >> 4 === 0) {
                            for (j = 0; j < 64; j++) {
                                var z = dctZigZag[j];
                                tableData[z] = data[offset++];
                            }
                        }
                        else if (quantizationTableSpec >> 4 === 1) {
                            for (j = 0; j < 64; j++) {
                                var zz = dctZigZag[j];
                                tableData[zz] = readUint16();
                            }
                        }
                        else
                            throw 'DQT: invalid table spec';
                        quantizationTables[quantizationTableSpec & 15] = tableData;
                    }
                    break;
                case 0xffc0:
                case 0xffc1:
                case 0xffc2:
                    if (frame) {
                        throw 'Only single frame JPEGs supported';
                    }
                    readUint16();
                    frame = {};
                    frame.extended = fileMarker === 0xffc1;
                    frame.progressive = fileMarker === 0xffc2;
                    frame.precision = data[offset++];
                    frame.scanLines = readUint16();
                    frame.samplesPerLine = readUint16();
                    frame.components = [];
                    frame.componentIds = {};
                    var componentsCount = data[offset++], componentId;
                    var maxH = 0, maxV = 0;
                    for (i = 0; i < componentsCount; i++) {
                        componentId = data[offset];
                        var h = data[offset + 1] >> 4;
                        var v = data[offset + 1] & 15;
                        if (maxH < h)
                            maxH = h;
                        if (maxV < v)
                            maxV = v;
                        var qId = data[offset + 2];
                        l = frame.components.push({
                            h: h,
                            v: v,
                            quantizationTable: quantizationTables[qId],
                            quantizationTableId: qId,
                            bitConversion: 255 / ((1 << frame.precision) - 1),
                        });
                        frame.componentIds[componentId] = l - 1;
                        offset += 3;
                    }
                    frame.maxH = maxH;
                    frame.maxV = maxV;
                    prepareComponents(frame);
                    break;
                case 0xffc4:
                    var huffmanLength = readUint16();
                    for (i = 2; i < huffmanLength;) {
                        var huffmanTableSpec = data[offset++];
                        var codeLengths = new Uint8Array(16);
                        var codeLengthSum = 0;
                        for (j = 0; j < 16; j++, offset++)
                            codeLengthSum += codeLengths[j] = data[offset];
                        var huffmanValues = new Uint8Array(codeLengthSum);
                        for (j = 0; j < codeLengthSum; j++, offset++)
                            huffmanValues[j] = data[offset];
                        i += 17 + codeLengthSum;
                        (huffmanTableSpec >> 4 === 0 ? huffmanTablesDC : huffmanTablesAC)[huffmanTableSpec & 15] = buildHuffmanTable(codeLengths, huffmanValues);
                    }
                    break;
                case 0xffdd:
                    readUint16();
                    resetInterval = readUint16();
                    break;
                case 0xffda:
                    var scanLength = readUint16();
                    var selectorsCount = data[offset++];
                    var components = [], component;
                    for (i = 0; i < selectorsCount; i++) {
                        var componentIndex = frame.componentIds[data[offset++]];
                        component = frame.components[componentIndex];
                        var tableSpec = data[offset++];
                        component.huffmanTableDC = huffmanTablesDC[tableSpec >> 4];
                        component.huffmanTableAC = huffmanTablesAC[tableSpec & 15];
                        components.push(component);
                    }
                    var spectralStart = data[offset++];
                    var spectralEnd = data[offset++];
                    var successiveApproximation = data[offset++];
                    var processed = decodeScan(data, offset, frame, components, resetInterval, spectralStart, spectralEnd, successiveApproximation >> 4, successiveApproximation & 15);
                    offset += processed;
                    break;
                case 0xffff:
                    if (data[offset] !== 0xff) {
                        offset--;
                    }
                    break;
                default:
                    if (data[offset - 3] == 0xff &&
                        data[offset - 2] >= 0xc0 &&
                        data[offset - 2] <= 0xfe) {
                        offset -= 3;
                        break;
                    }
                    throw 'unknown JPEG marker ' + fileMarker.toString(16);
            }
            fileMarker = readUint16();
        }
        this.width = frame.samplesPerLine;
        this.height = frame.scanLines;
        this.jfif = jfif;
        this.adobe = adobe;
        this.components = [];
        switch (frame.components.length) {
            case 1:
                this.colorspace = ColorSpace.Grayscale;
                break;
            case 3:
                if (this.adobe)
                    this.colorspace = ColorSpace.AdobeRGB;
                else
                    this.colorspace = ColorSpace.RGB;
                break;
            case 4:
                this.colorspace = ColorSpace.CYMK;
                break;
            default:
                this.colorspace = ColorSpace.Unknown;
        }
        for (var i = 0; i < frame.components.length; i++) {
            var component = frame.components[i];
            if (!component.quantizationTable &&
                component.quantizationTableId !== null)
                component.quantizationTable =
                    quantizationTables[component.quantizationTableId];
            this.components.push({
                output: buildComponentData(frame, component),
                scaleX: component.h / frame.maxH,
                scaleY: component.v / frame.maxV,
                blocksPerLine: component.blocksPerLine,
                blocksPerColumn: component.blocksPerColumn,
                bitConversion: component.bitConversion,
            });
        }
    }
    getData16(width, height) {
        if (this.components.length !== 1)
            throw 'Unsupported color mode';
        var scaleX = this.width / width, scaleY = this.height / height;
        var component, componentScaleX, componentScaleY;
        var x, y, i;
        var offset = 0;
        var numComponents = this.components.length;
        var dataLength = width * height * numComponents;
        var data = new Uint16Array(dataLength);
        var componentLine;
        var lineData = new Uint16Array((this.components[0].blocksPerLine << 3) *
            this.components[0].blocksPerColumn *
            8);
        for (i = 0; i < numComponents; i++) {
            component = this.components[i];
            var blocksPerLine = component.blocksPerLine;
            var blocksPerColumn = component.blocksPerColumn;
            var samplesPerLine = blocksPerLine << 3;
            var j, k, ll = 0;
            var lineOffset = 0;
            for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
                var scanLine = blockRow << 3;
                for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
                    var bufferOffset = getBlockBufferOffset(component, blockRow, blockCol);
                    var offset = 0, sample = blockCol << 3;
                    for (j = 0; j < 8; j++) {
                        var lineOffset = (scanLine + j) * samplesPerLine;
                        for (k = 0; k < 8; k++) {
                            lineData[lineOffset + sample + k] =
                                component.output[bufferOffset + offset++];
                        }
                    }
                }
            }
            componentScaleX = component.scaleX * scaleX;
            componentScaleY = component.scaleY * scaleY;
            offset = i;
            var cx, cy;
            var index;
            for (y = 0; y < height; y++) {
                for (x = 0; x < width; x++) {
                    cy = 0 | (y * componentScaleY);
                    cx = 0 | (x * componentScaleX);
                    index = cy * samplesPerLine + cx;
                    data[offset] = lineData[index];
                    offset += numComponents;
                }
            }
        }
        return data;
    }
    getData(width, height) {
        var scaleX = this.width / width, scaleY = this.height / height;
        var component, componentScaleX, componentScaleY;
        var x, y, i;
        var offset = 0;
        var Y, Cb, Cr, K, C, M, Ye, R, G, B;
        var colorTransform;
        var numComponents = this.components.length;
        var dataLength = width * height * numComponents;
        var data = new Uint8Array(dataLength);
        var componentLine;
        var lineData = new Uint8Array((this.components[0].blocksPerLine << 3) *
            this.components[0].blocksPerColumn *
            8);
        for (i = 0; i < numComponents; i++) {
            component = this.components[i];
            var blocksPerLine = component.blocksPerLine;
            var blocksPerColumn = component.blocksPerColumn;
            var samplesPerLine = blocksPerLine << 3;
            var j, k, ll = 0;
            var lineOffset = 0;
            for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
                var scanLine = blockRow << 3;
                for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
                    var bufferOffset = getBlockBufferOffset(component, blockRow, blockCol);
                    var offset = 0, sample = blockCol << 3;
                    for (j = 0; j < 8; j++) {
                        var lineOffset = (scanLine + j) * samplesPerLine;
                        for (k = 0; k < 8; k++) {
                            lineData[lineOffset + sample + k] =
                                component.output[bufferOffset + offset++] *
                                    component.bitConversion;
                        }
                    }
                }
            }
            componentScaleX = component.scaleX * scaleX;
            componentScaleY = component.scaleY * scaleY;
            offset = i;
            var cx, cy;
            var index;
            for (y = 0; y < height; y++) {
                for (x = 0; x < width; x++) {
                    cy = 0 | (y * componentScaleY);
                    cx = 0 | (x * componentScaleX);
                    index = cy * samplesPerLine + cx;
                    data[offset] = lineData[index];
                    offset += numComponents;
                }
            }
        }
        switch (numComponents) {
            case 1:
            case 2:
                break;
            case 3:
                colorTransform = true;
                if (this.adobe && this.adobe.transformCode)
                    colorTransform = true;
                else if (typeof this.colorTransform !== 'undefined')
                    colorTransform = !!this.colorTransform;
                if (colorTransform) {
                    for (i = 0; i < dataLength; i += numComponents) {
                        Y = data[i];
                        Cb = data[i + 1];
                        Cr = data[i + 2];
                        R = clampToUint8(Y - 179.456 + 1.402 * Cr);
                        G = clampToUint8(Y + 135.459 - 0.344 * Cb - 0.714 * Cr);
                        B = clampToUint8(Y - 226.816 + 1.772 * Cb);
                        data[i] = R;
                        data[i + 1] = G;
                        data[i + 2] = B;
                    }
                }
                break;
            case 4:
                if (!this.adobe)
                    throw 'Unsupported color mode (4 components)';
                colorTransform = false;
                if (this.adobe && this.adobe.transformCode)
                    colorTransform = true;
                else if (typeof this.colorTransform !== 'undefined')
                    colorTransform = !!this.colorTransform;
                if (colorTransform) {
                    for (i = 0; i < dataLength; i += numComponents) {
                        Y = data[i];
                        Cb = data[i + 1];
                        Cr = data[i + 2];
                        C = clampToUint8(434.456 - Y - 1.402 * Cr);
                        M = clampToUint8(119.541 - Y + 0.344 * Cb + 0.714 * Cr);
                        Y = clampToUint8(481.816 - Y - 1.772 * Cb);
                        data[i] = C;
                        data[i + 1] = M;
                        data[i + 2] = Y;
                    }
                }
                break;
            default:
                throw 'Unsupported color mode';
        }
        return data;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (JpegImage);


/***/ })

}]);