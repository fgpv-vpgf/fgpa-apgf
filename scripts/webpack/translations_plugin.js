const ConcatSource = require('webpack-sources').ConcatSource;
const csv = require('csvtojson');

class TranslationPlugin {

    constructor (csvPath) {
        this.translations = {};
        this.csvPath = csvPath;
        this.ignoreCol = [0]; //the columns are ignored, and first column is always ignored
        this.addIgnoreCol(this.csvPath);
    }

    apply (compiler) {
        compiler.hooks.compilation.tap('translation_plugin', compilation => {
            compilation.hooks.optimizeChunkAssets.tapAsync('translation_plugin', (chunks, callback) => {
                const sourceChunks = [];
                chunks.forEach(chunk => {
                    chunk.files.forEach(filename => {
                        if (/^av-main\.js$/.test(filename)) {
                            sourceChunks.push(filename);
                        }
                    });
                });

                this.init(sourceChunks, compilation, callback);
            });
        });
    }

    init (srcChunks, compilation, callback) {
        csv({
            noheader: true,
            ignoreColumns: this.ignoreCol
        })
            .fromFile(this.csvPath)
            .on('csv', (row, rowNum) => {
                if (rowNum === 0) {
                    row.shift();
                    row.forEach(l => this.translations[l] = {});
                } else {
                    this.flatten(row);
                }
            })

        const content = `var AUTOFILLED_TRANSLATIONS = ${JSON.stringify(this.translations)};`;
        srcChunks.forEach(c => {
            const content = `var AUTOFILLED_TRANSLATIONS = ${JSON.stringify(this.translations)};`;
            compilation.assets[c] = new ConcatSource(content, compilation.assets[c]);
        });

        callback();
    }

    flatten (row) {
        const key = row.shift();
        Object.keys(this.translations).map(l => this.translations[l]).forEach( (l, i) => {
            const value = row[i];
            let lastPlace = l;
            key.split('.').forEach( (k, i, a) => {
                if (i === a.length - 1) { // last key - setting the value
                    lastPlace[k] = value;
                } else {
                    lastPlace[k] = lastPlace[k] ? lastPlace[k] : {}; // set as empty if not defined
                    lastPlace = lastPlace[k]; // move placeholder forward
                }
            });
        });
    }

    /**
     * Find the columns with translation bits, then append them to this.addignoreCol
     * @private
     * @method addIgnoreCol
     * @param {String} The path to the csv file
     */
    addIgnoreCol(csvPath) {
        csv({
            noheader: true,
            maxRowLength: 1 // only read the first row
        })
            .fromFile(csvPath)
            .on('csv', (row, rowNum) => {
                if (rowNum === 0) { // the first row if it exists
                    for (let i = 3; i < row.length; i++) { // starting in the 3rd column
                        if (i % 2 === 1 && this.ignoreCol.indexOf(i) === -1) { // the column after a translation
                            this.ignoreCol.push(i);
                        }
                    }
                }
            });
    }
}

module.exports = TranslationPlugin;
