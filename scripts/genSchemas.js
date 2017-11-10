// schema to be splitted
let viewerSchema = require('../src/schemas/schemaForm1/schema.json');
const schemasDir = './src/schemas/schemaForm1/';
const csvDir = './scripts/'

// External libraries
const $RefParser = require('json-schema-ref-parser');
const $DotProp = require('dot-prop');
const $PapaParse = require('papaparse');

// nodejs library
const $FS = require('fs');
const $Promise = require('promise');


const lang = ['en-CA', 'fr-CA'];
let csvString = '';


/**
 *
 * @name schemaSplit
 * @requires dependencies
 * @description
 *
 * The `schemaSplit` service preprocesses the fgpv schema to make it digestible
 * by the fgpa authoring tool.
 * Provides six functions:
 *  - replaceCircularRef: manage circular references ($ref).
 *  - addLabels: add all labels.
 *  - addSchemaLabel: add schema attribute to main properties.
 *  - addCustomLabel: add custom attribute to properties.
 *  - addDefaultLabel: add default attribute to properties.
 *  - labelNestedtArrays: labelling nested arrays
 *  - addDescriptionLabel: save existing descriptions in a csv like blob
 *                          and replace them with labels.
 *  - addEnumLabel: save existing enum aray values in a csv like blob
 *                  and replace them with labels.
 *  - insideQuotesCSV: Deal with double quotes inside double quotes.
 *  - saveCSV: save csv like blob in a csv (comma-separated values) file
 *  - saveSchema: save schema in local file.
 *  - saveParseConfigSchema: save $ref resolved main properties of the schema
 *                            in separated JSON files.
 *  - loadCSVinJSON: load CSV file into JSON object.
 *  - resolveLabels: Replace labels by values corresponding to chosen language.
 */

// main

replaceCircularRef(viewerSchema);

addSchemaLabel(viewerSchema['properties']);

const labellingSchemaDef = new $Promise(
    (resolve, reject) => {
        if (addLabels(viewerSchema, 'definitions', 'def.')) {
            resolve(viewerSchema);
        } else {
            const reason = new Error('labelling def went wrong');
            reject(reason);
        }
    }
);

// call our promise
const LabelMyDef = () => {
    labellingSchemaDef
        .then(() => {
            const parser = new $RefParser();
            parser.dereference(viewerSchema)
                .then(vSchema => {
                    saveSchema(viewerSchema, `${schemasDir}schemaAuthorBefProp.json`);
                    // Promise
                    const labellingSchemaProp = new $Promise(
                        (resolve, reject) => {
                            if (addLabels(vSchema, 'properties')) {
                                resolve(vSchema);
                            } else {
                                const reason = new Error('labelling properties went wrong');
                                reject(reason);
                            }

                        }
                    );

                    // call our promise
                    const splitMe = () => {
                        labellingSchemaProp
                            .then(() => {
                                insideQuotesCSV();
                                saveCSV(csvString, `${csvDir}genSchemas.csv`);
                                saveSchema(vSchema, `${schemasDir}schemaAuthor.json`);
                                saveParseConfigSchema(vSchema, `${csvDir}genSchemas.csv`);
                                console.log('This is the END');
                            })
                            .catch(error => console.log(error.message));
                    };

                    splitMe();

                })
                .catch(err => {
                    console.error(err);
                });
        })
        .catch(error => console.log(error.message));
};

LabelMyDef();

// functions declarations

/**
 * Replace circular references ($ref) in schema with a new non-obstructive definition.
 * @function replaceCircularRef
 * @private
 * @param {Object} schema schema
 */
function replaceCircularRef(schema) {
    const target1 = `definitions.entryGroup.properties.children.items.oneOf`;
    const target2 = `definitions.visibilitySet.properties.exclusiveVisibility.items.oneOf`;
    let enumArray1 = $DotProp.get(schema, target1);
    let enumArray2 = $DotProp.get(schema, target2);
    const circularDef = enumArray1.shift();

    // Create new definition object to be used as a non circular reference
    $DotProp.set(schema, `definitions.circular`, {"type": "object", "properties": {"circRef": "entryGroup"}});

    // Replace circular reference with non-circular one
    enumArray1.unshift({ "$ref": "#/definitions/circular" });
    $DotProp.set(schema, target1, enumArray1);

    // Replace circular reference with non-circular one
    enumArray2.shift();
    enumArray2.unshift({ "$ref": "#/definitions/circular" });
    $DotProp.set(schema, target2, enumArray2);
}

/**
 * Add labels
 * @function addLabels
 * @private
 * @param {Object} schema schema
 * @param {String} start [optional] starting point in hierarchy
 * @param {String} customPrefix [optional] to be added to label
 * @return {Boolean} always return true
 */
function addLabels(schema, start = '', customPrefix = '') {
    addCustomLabel(schema[start], 'title', '', customPrefix);
    // addCustomLabel(schema[start], 'help', '', customPrefix);
    addDescriptionLabel(schema[start], '', customPrefix);
    addDefaultLabel(schema[start], '', customPrefix);
    addEnumLabel(schema[start], '', customPrefix);
    return true;
}

/**
 * Add to all first level properties an attribute named `schema` which contains a label based
 * on the name of the property.
 * @function addSchemaLabel
 * @private
 * @param {Object} schema schema
 */
function addSchemaLabel(schema) {
    const propNames = Object.getOwnPropertyNames(schema);
    propNames.forEach(prop => {
        $DotProp.set(schema, `${prop}.schema`, prop);
    });
}

/**
 * Add to all properties an attribute with custom name which contains a label based
 * on the name of the property and is place in the hierarchy.
 * @function addCustomLabel
 * @private
 * @param {Object} schema schema
 * @param {String} attName attribute custom name
 * @param {String} parent [optional] use as a prefix to generate labels
 * @param {String} customPrefix [optional] to be added to label
 */
function addCustomLabel(schema, attName, parent = '', customPrefix = '') {
    
        const propNames = Object.getOwnPropertyNames(schema);
        let prefix = `${customPrefix}${parent}`;
    
        propNames.forEach(prop => {
            const label = `${prefix}${prop}.${attName}`;
            $DotProp.set(schema, `${prop}.${attName}`, label);
            csvString = `${csvString},${label},"",0,"",0\n`;
            // go deeper ???
            if ($DotProp.has(schema, `${prop}.properties`)) {
                addCustomLabel($DotProp.get(schema, `${prop}.properties`), attName, `${prefix}${prop}.`);
            }
        });
    }

/**
 * Add to all properties an attribute named `default`, if it doesn't already exist,
 * which contains a label based on the name of the property and is place in the hierarchy.
 * Save existing default attribute value.
 * @function addDefaultLabel
 * @private
 * @param {Object} schema schema
 * @param {String} parent [optional] use as a prefix to generate labels
 * @param {String} customPrefix [optional] to be added to label
 */
function addDefaultLabel(schema, parent = '', customPrefix = '') {

    const propNames = Object.getOwnPropertyNames(schema);
    let prefix = `${customPrefix}${parent}`;

    propNames.forEach(prop => {
        const label = `${prefix}${prop}.default`;
        if ($DotProp.has(schema, `${prop}.default`)) {
            labelComplexDefault(schema[prop], label);
        } else {
            csvString = `${csvString},${label},"",0,"",0\n`;
            $DotProp.set(schema, `${prop}.default`, label);
        }
        // go deeper ???
        if ($DotProp.has(schema, `${prop}.properties`)) {
            addDefaultLabel($DotProp.get(schema, `${prop}.properties`), `${prefix}${prop}.`);
        }
    });
}

/**
 * Determine what kind of object we are dealing with
 * @function labelComplexDefault
 * @private
 * @param {Object} schema schema part
 * @param {String} label label
 */
function labelComplexDefault(schema, label = '') {
    let deflt = '';

    switch (whatsThat(schema['default'])) {
    case 'ARRAY': {
        // Finally,won't labelled array's elements
        // const labelArr = `${prefix}${prop}`;
        // labelNestedtArrays(schema[prop]['default'],labelArr);

        deflt = JSON.stringify(schema['default']).replace(/['"]+/g, '""');
        csvString = `${csvString},${label},"${deflt}",1,"",0\n`;
        $DotProp.set(schema, `default`, label);
        break;
    }
    case 'NULL': {
        deflt = $DotProp.get(schema, 'default');
        csvString = `${csvString},${label},${deflt},1,"",0\n`;
        $DotProp.set(schema, `default`, label);
        break;
    }
    case 'OBJECT': {
        // We keep it as an object in the csv file.
        // Keys of the object are references to existing properties
        const objPropNames = Object.getOwnPropertyNames(schema['default']);
        let newObj = {};
        objPropNames.forEach(objProp => {
            const labelItem = `${label}.${objProp}`;
            const defltItem = schema['default'][objProp];
            csvString = `${csvString},${labelItem},${defltItem},1,"",0\n`;
            $DotProp.set(schema, `default.${objProp}`, labelItem);
        });
        break;
    }
    default:
        deflt = $DotProp.get(schema, 'default');
        if (typeof deflt !== 'string') {
            csvString = `${csvString},${label},${deflt},1,"",0\n`;
            $DotProp.set(schema, `default`, label);
        } else if (!deflt.startsWith('def.')) {
            csvString = `${csvString},${label},${deflt},1,"",0\n`;
            $DotProp.set(schema, 'default', label);
        }
    }
}

/**
 * Determine what kind of object we are dealing with
 * @function whatsThat
 * @private
 * @param {Object} obj some kind of object
 * @return {String} return {'ARRAY'|'NULL'|'OBJECT'|'OTHERS'}
 */
function whatsThat(obj) {
    let typeObject = 'OTHERS'; // default value

    if (Array.isArray(obj)){ // ARRAY
        typeObject = 'ARRAY';
    } else if (obj === null){ // NULL
        typeObject = 'NULL';
    } else if (typeof obj === 'object'){ // OBJECT
        typeObject = 'OBJECT';
    }
    return typeObject;
}

/**
 * Labelling in nested arrays
 * @function labelNestedtArrays
 * @private
 * @param {Array} arr array
 * @param {String} label to compose label
 */
function labelNestedtArrays(arr, label) {

    const arrayLength = arr.length;
    for (let i = 0; i < arrayLength; i++) {
        if (Array.isArray(arr[i])) {
            labelNestedtArrays(arr[i], label);
        }else {
            arr[i] = `${label}.${arr[i]}`;
        }
    }
}

/**
 * Save existing `descriptions` property values in a csv like blob
 * and replace those values with labels.
 * @function addDescriptionLabel
 * @private
 * @param {Object} schema schema
 * @param {String} parent [optional] use as a prefix to generate labels
 * @param {String} customPrefix [optional] to be added to label
 */
function addDescriptionLabel(schema, parent = '', customPrefix = '') {
    const propNames = Object.getOwnPropertyNames(schema);
    let prefix = `${customPrefix}${parent}`;
    let description = '';

    propNames.forEach(prop => {
        if ($DotProp.has(schema, `${prop}.description`)) {
            const label = `${prefix}${prop}.description`;
            description = $DotProp.get(schema, `${prop}.description`);
            if (!description.startsWith('def.')) {
                csvString = `${csvString},${label},"${description}",1,"",0\n`;
                $DotProp.set(schema, `${prop}.description`, label);
            }
        }

        const propArr = Object.getOwnPropertyNames(schema[prop]);
        // go deeper ???
        if ($DotProp.has(schema, `${prop}.properties`)) {
            addDescriptionLabel($DotProp.get(schema, `${prop}.properties`), `${prefix}${prop}.`);
        } else if ($DotProp.has(schema, `${prop}.items.properties`)) {
            addDescriptionLabel($DotProp.get(schema, `${prop}.items.properties`), `${prefix}${prop}.items.`);
        } else if (propArr.length !== 0) {
            propArr.forEach(Att => {
                if ($DotProp.has(schema[prop], `${Att}.description`)) {
                    const label = `${prefix}${prop}.${Att}.description`;
                    description = $DotProp.get(schema[prop], `${Att}.description`);
                    if (!description.startsWith('def.')) {
                        csvString = `${csvString},${label},"${description}",1,"",0\n`;
                        $DotProp.set(schema, `${prop}.${Att}.description`, label);
                    }
                }
            });
        }
    });
}

/**
 * Save existing `enum` array values in a csv like blob
 * and replace those values with labels.
 * @function addEnumLabel
 * @private
 * @param {Object} schema schema
 * @param {String} parent [optional] use as a prefix to generate labels
 * @param {String} customPrefix [optional] to be added to label
 */
function addEnumLabel(schema, parent = '', customPrefix = '') {
    const propNames = Object.getOwnPropertyNames(schema);
    let prefix = `${customPrefix}${parent}`;

    propNames.forEach(prop => {
        if ($DotProp.has(schema, `${prop}.enum`)) {
            let enumArray = $DotProp.get(schema, `${prop}.enum`);
            let newEnum = [];
            enumArray.forEach(element => {
                const label = `${prefix}${prop}.enum.${element}`;
                if (!element.startsWith('def.')) {
                    csvString = `${csvString},${label},${element},1,"",0\n`;
                    newEnum.push(label);
                }else {
                    newEnum.push(element);
                }
            });
            $DotProp.set(schema, `${prop}.enum`, newEnum);
            // console.log($DotProp.get(schema, `${prop}.enum`));
        }

        let newEnumItems = [];
        if ($DotProp.has(schema, `${prop}.items.enum`)) {
            let enumArray = $DotProp.get(schema, `${prop}.items.enum`);
            enumArray.forEach(element => {
                const label = `${prefix}${prop}.items.enum.${element}`;
                if (!element.startsWith('def.')) {
                    csvString = `${csvString},${label},${element},1,"",0\n`;
                    newEnumItems.push(label);
                } else {
                    newEnumItems.push(element);
                }
            });
            $DotProp.set(schema, `${prop}.items.enum`, newEnumItems);
            // console.log($DotProp.get(schema, `${prop}.items.enum`));
        }

        // go deeper ???
        if ($DotProp.has(schema, `${prop}.properties`)) {
            addEnumLabel($DotProp.get(schema, `${prop}.properties`), `${prefix}${prop}.`);
        }

    });
}

/**
 * Deal with double quotes inside double quotes
 * FIXME: this function should be replaced by a more generalist one
 * @function insideQuotesCSV
 * @private
 */
function insideQuotesCSV() {
    const target = '"Fire", "Fatality"';
    const newDesc = '\\""Fire\\"", \\""Fatality\\""'
    csvString = csvString.split(target).join(newDesc);
}

/**
 * Save csv info in a local file
 * @function saveCSV
 * @private
 * @param {Object} csv contains commas-separeted blob
 * @param {String} filename filename
 */
function saveCSV(csv, filename) {
    $FS.writeFileSync(filename, csv);
}

/**
 * Save schema in local file
 * @function saveSchema
 * @private
 * @param {Object} schema schema
 * @param {String} filename filename
 */
function saveSchema(schema, filename) {
    const schemaString = JSON.stringify(schema, null, 2);
    $FS.writeFileSync(filename, schemaString);
}

/**
 * Save $ref resolved main properties of the schema
 * in separated JSON files. A JSON is created for each
 * designated languages.
 * @function saveParseConfigSchema
 * @private
 * @param {Object} schema schema
 * @param {String} csvFilename input csv file filename
 */
function saveParseConfigSchema(schema, csvFilename) {

    const csvJSON = loadCSVinJSON(csvFilename);
    const nbrLang = (csvJSON.data[0].length - 2)/2;

    //*********Save header
    const genNames = Object.getOwnPropertyNames(schema);
    let header = '';

    genNames.forEach(prop => {
        if (prop !== `properties` && prop !== `definitions`) {
            header = `${header}"${prop}": ${JSON.stringify($DotProp.get(schema, prop), null, 2)}\n`;
        }
    });

    for (let i = 0; i < nbrLang; i++) {
        const headerWr  = resolveLabels(header, csvJSON, i);
        $FS.writeFileSync(`${schemasDir}header.${lang[i]}.json`, headerWr);
    }

    //*********Save properties
    const propNames = Object.getOwnPropertyNames(schema.properties);

    propNames.forEach(prop => {

        const blob = JSON.stringify($DotProp.get(schema, `properties.${prop}`), null, 2);

        for (let i = 0; i < nbrLang; i++) {
            const blobWr = resolveLabels(blob, csvJSON, i);
            $FS.writeFileSync(`${schemasDir}${prop}.${lang[i]}.json`, blobWr);
        }
    });

    //*********Save circular definitions, references and dependencies
    let defRef = '';
    const definitions = ['entryGroup', 'visibilitySet', 'infoSection', 'entry', 'symbologyStack', 'legendGroupControls'];

    definitions.forEach(prop => {
        defRef = `${defRef}"${prop}": ${JSON.stringify($DotProp.get(schema, `definitions.${prop}`), null, 2)},\n`;
    });

    defRef = `${defRef}"circular": ${JSON.stringify($DotProp.get(schema, `definitions.circular`), null, 2)}\n`;

    for (let i = 0; i < nbrLang; i++) {
        const defRefWr = resolveLabels(defRef, csvJSON, i);
        $FS.writeFileSync(`${schemasDir}circular.${lang[i]}.json`, defRefWr);
    }
}

/**
 * Load CSV file into JSON object
 * @function loadCSVinJSON
 * @private
 * @param {String} filename input file filename
 * @return {Object} JSON object with csv content
 */
function loadCSVinJSON(filename) {

    // Read file as a string
    const csvString = $FS.readFileSync(filename, 'utf8');

    // config for papaParse
    const configPasrse = {
        delimiter: ","
    };

    // Parse string to JSON object
    const csvJSON = $PapaParse.parse(csvString, configPasrse);
    return csvJSON;
}

/**
 * Replace labels by values corresponding to chosen language.
 * @function resolveLabels
 * @private
 * @param {String} schemaString schema as a string
 * @param {String} csvJSON cvs content as a JSON
 * @param {String} langIdx language index
 * @return {String} schema as a string with values instead of labels
 */
function resolveLabels(schemaString, csvJSON, langIdx) {

    let newString = schemaString;
    const idx = 2 + 2 * langIdx;

    csvJSON.data.forEach(record => {
        if(record[1] !== undefined) {
            const label = record[1];
            const value = record[idx];

            // Special case. 
            // These labels need not to be substring of others labels
            // FIXME: find a more generalist method to deal with special cases
            if (label === 'def.wmsLayerNode.legendMimeType.enum.image/svg+xml') {
                newString = newString.split(label).join(value);
            } else if (label === 'def.filterNode.value.description') {
                newString = newString.split(label).join(value);
            } else if (value.charAt(0) ===  '[') {
                newString = newString.split(`"${label}"`).join(value);
            } else { // Other cases
                const regex = new RegExp('[^\.a-z\+]' + label + '[^\.a-z\+]', 'g');
        
                // put string between double quotes
                if (value === 'true' || value === 'false') {
                    newString = newString.replace(regex, value);
                } else {
                    newString = newString.replace(regex, '"' + value + '"');
                }
            }
        }
    });
    return newString;
}

/**
 * Update CSV file.
 * @function updateCSV
 * @private
 */
function updateCSV() {

}