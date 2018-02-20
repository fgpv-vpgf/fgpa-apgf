// FIXME: we cant use ES6 because of IE11. When we can get rid of this non browser, update the code (https://kangax.github.io/compat-table/es6/)
// set translations
const lang = localStorage.getItem('fgpa-lang');
const translations = {
    'en-CA': {
        fmeUser: 'Username: ',
        fmePass: 'Password: ',
        fmeUserPH: 'Enter Username...',
        fmePassPH: 'Enter Password...',
        fmeLogin: 'Login',
        fmeErrorConn: 'Connection error: bad user name and/or password',
        register: 'If you do not have a DDR account, contact support at ',
        upload: 'Upload',
        delete: 'Delete',
        publish: 'Publish',
        uploaded: 'Selected file: ',
        runupload: 'Start Upload',
        update: 'Update existing package',
        size: 'bytes',
        chooseFile: 'Choose a zip file',
        userEmail: 'User Email: ',
        deletelist: 'Select folders to delete ',
        publishlist: 'Select folder to publish ',
        publishenv: 'Select environnement to publish to',
        privatelist: 'Private',
        internallist: 'Internal',
        externallist: 'External',
        messType: 'Message Type: ',
        messSev: 'Message Severity: ',
        messTypeAll: 'All',
        messTypeAdmin: 'Administrator',
        messTypeUser: 'User',
        messSevAll: 'All',
        messSevInfo: 'Information',
        messSevWarn: 'Warning',
        messSevErr: 'Error',
        messSevSucc: 'Success',
        messSevFatal: 'Fatal',
        progress: 'Execution in progress...',
        wait: 'Wait for Execution Report',
        reportTitle: 'Execution Report',
        fgpId: 'FGP ID: ',
        jobId: 'Job Id: ',
        headTime: 'Timestamp',
        headSev: 'Severity',
        headMess: 'Messages'
    },

    'fr-CA': {
        fmeUser: 'Nom d\'usagé : ',
        fmePass: 'Mot de passe : ',
        fmeUserPH: 'Entrer un nom d\'usagé...',
        fmePassPH: 'Entrer un mot de passe...',
        fmeLogin: 'Identification',
        fmeErrorConn: 'Erreur de connexion : mauvais nom d\'utilisateur et/ou mot de passe',
        register: 'Si vous ne possédez pas de compte DDR, contactez le support technique à ',
        upload: 'Téléverser',
        delete: 'Supprimer',
        publish: 'Publier',
        uploaded: 'Fichier sélectionné : ',
        runupload: 'Débuter le Téléversement',
        update: 'Mettre à jour un paquet existant',
        size: 'octets',
        chooseFile: 'Sélectionnez un fichier zip',
        userEmail: 'Courriel utilisateur : ',
        deletelist: 'Sélectionnez les répertoires à supprimer ',
        publishlist: 'Sélectionnez le répertoire à publier ',
        publishenv: 'Sélectionnez l\'environnement dans lequel publier',
        privatelist: 'Privé',
        internallist: 'Interne',
        externallist: 'Externe',
        messType: 'Type du message : ',
        messSev: 'Sévéritée du message : ',
        messTypeAll: 'Tous',
        messTypeAdmin: 'Administrateur',
        messTypeUser: 'Utilisateur',
        messSevAll: 'Tous',
        messSevInfo: 'Information',
        messSevWarn: 'Attention',
        messSevErr: 'Erreur',
        messSevSucc: 'Succès',
        messSevFatal: 'Fatal',
        progress: 'Exécution en cours...',
        wait: 'Attendre le rapport d\'exécution',
        reportTitle: 'rapport d\'exécution',
        fgpId: 'PGF id :',
        jobId: 'Traitement Id :',
        headTime: 'Horodatage',
        headSev: 'Sévéritée',
        headMess: 'Messages'
    }
};

// bind function to set label (http://jsfiddle.net/RkTMD/)
function bindHTML(element, data, att) {
    if (typeof att === 'undefined') {
        att = 'innerText';
    }

    this.data = data;
    this.element = element;
    element[att] = data;
}

// set login interface
bindHTML(document.getElementById('avFMEUser'), translations[lang].fmeUser);
bindHTML(document.getElementById('avFMEPass'), translations[lang].fmePass);
bindHTML(document.getElementById('avTokenUser'), translations[lang].fmeUserPH, 'placeholder');
bindHTML(document.getElementById('avTokenPass'), translations[lang].fmePassPH, 'placeholder');
bindHTML(document.getElementById('avFMELogin'), translations[lang].fmeLogin, 'value');
bindHTML(document.getElementById('avRegister'), translations[lang].register);
bindHTML(document.getElementsByClassName('av-error-connect')[0], translations[lang].fmeErrorConn);

// set functions interface
bindHTML(document.getElementById('avUpload'), translations[lang].upload, 'value');
bindHTML(document.getElementById('avDelete'), translations[lang].delete, 'value');
bindHTML(document.getElementById('avPublish'), translations[lang].publish, 'value');

// set upload interface
bindHTML(document.getElementById('avUploaded'), translations[lang].uploaded);
bindHTML(document.getElementById('avRunUpload'), translations[lang].runupload, 'value');
bindHTML(document.getElementById('avUpdateLabel'), translations[lang].update);

// set delete interface
bindHTML(document.getElementById('avDeletePrivate'), translations[lang].privatelist);
bindHTML(document.getElementById('avDeleteInternal'), translations[lang].internallist);
bindHTML(document.getElementById('avDeleteExternal'), translations[lang].externallist);
bindHTML(document.getElementById('avDeleteList'), translations[lang].deletelist);
bindHTML(document.getElementById('avRunDelete'), translations[lang].delete, 'value');

// set publish interface
bindHTML(document.getElementById('avPublishPrivate'), translations[lang].publishlist);
bindHTML(document.getElementById('avPublishEnv'), translations[lang].publishenv);
bindHTML(document.getElementById('avUpdatePublishLabel'), translations[lang].update);
bindHTML(document.getElementById('avRunPublish'), translations[lang].publish, 'value');

// set report interface (contains message and select dropdown)
bindHTML(document.getElementById('avMessTypeLbl'), translations[lang].messType);
bindHTML(document.getElementById('avMessSevLbl'), translations[lang].messSev);
bindHTML(document.getElementById('avProgress'), translations[lang].progress);
bindHTML(document.getElementById('avWait'), translations[lang].wait);

const optsType = [translations[lang].messTypeAll, translations[lang].messTypeAdmin, translations[lang].messTypeUser];
const messType = document.getElementById('avMessageType');
const optsSev = [translations[lang].messSevAll, translations[lang].messSevInfo, translations[lang].messSevWarn,
    translations[lang].messSevErr, translations[lang].messSevSucc, translations[lang].messSevFatal];
const messSev = document.getElementById('avMessageSev');

for (let optType in optsType) {
    let option = document.createElement('option');
    option.text = optType;
    messType.add(option);
}
for (let optSev in optsSev) {
    let option = document.createElement('option');
    option.text = optSev;
    messSev.add(option);
}

//--------------------------------------------------
// GLOBAL VARIABLES - TOP
//--------------------------------------------------
let server;
let json;
let repository;
let workspace;
let session;
let path;
let fileInput;
let files;
let outputStream;
let serverUrl;

// https://playground.fmeserver.com/javascript/server-uploads/upload-file-drag-drop/
$(document).ready(function() {

    // FME Server repository and url for the DDR Modules
    repository = 'AuthoringTool';
    workspace = 'AuthoringTool.fmw'
    serverUrl = 'http://xxx.xxx.xxx.xxx';
});

//--------------------------------------------------
//  SECTION 1 - Login
//--------------------------------------------------
function login() {
    // FIXME
    $('.av-function-section').show();
    $('.av-login-section').hide();

    getToken();
}

function getToken() {
    const username = $('#avTokenUser').val();
    const password = $('#avTokenPass').val();

    const url = serverUrl + '/fmetoken/generate.json?user=' + username + '&password=' + password;
    $.ajax({
        url: url,
        type: 'GET',
        success: function(json) {
            FMEServer.init({
                server : serverUrl,
                token : json.serviceResponse.token
            });
            // Ask FME Server for the current session id and set it
            FMEServer.getSession(repository, workspace, setVars);

            $('.av-login-section').hide();
        },
        error: function() {
            document.getElementsByClassName('av-error-connect')[0].classList.remove('hidden');
        }
    });
}

//--------------------------------------------------
//  SECTION 2 - Select function and receive info
//--------------------------------------------------
function selectUpload() {
    $('.av-function-section').hide();
    $('.av-upload-section').show();
}

function selectDelete() {
    getDeleteList();

    $('.av-function-section').hide();
    $('.av-delete-section').show();
}

function selectPublish() {
    getPublishList();

    $('.av-function-section').hide();
    $('.av-publish-section').show();
}

function getDeleteList() {
    // FIXME ajax call is here
    const list = {
        private: ['folderA', 'folderB', 'folderC'],
        internal: ['folderA1', 'folderB1', 'folderC1'],
        external: ['folderA2', 'folderB2', 'folderC3']
    }

    // create privatelist
    setInterface('av-deletelist-private', list.private, 'delprivate');

    // create internallist
    setInterface('av-deletelist-internal', list.internal, 'delinternal');

    // create externallist
    setInterface('av-deletelist-external', list.external, 'delexternal');
}

function getPublishList() {
    // FIXME ajax call is here
    const list = {
        private: ['folderA', 'folderB', 'folderC']
    }

    // create privatelist
    setInterface('av-publishlist-private', list.private, 'pubprivate');

    // create environement list
    setInterface('av-publishlist-env', [translations[lang].internallist, translations[lang].externallist], 'pubenv');
}

function setInterface(id, list, type) {
    // remove existing values
    $('.' + id).not('legend').children().not('legend').remove();

    // get fieldset then loop array to add elements
    const elem = document.getElementsByClassName(id)[0];
    const length = list.length;
    if (length > 0) {
        for (let i = 0; i < length; i++) {
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.value = list[i];
            input.id = type  + '-' + list[i];

            const label = document.createElement('label');
            label.setAttribute('for', input.id);
            label.innerHTML = list[i];

            elem.append(input);
            elem.append(label);
            elem.append(document.createElement('br'));
        }
    } else {
        elem.style.display = 'none';
    }
}

//--------------------------------------------------
//  SECTION 3 - Delete and publish
//--------------------------------------------------
function deleteList() {
    const deleteArr = [];
    $('.av-deletelist-private :checkbox').each(function() {
        if (this.checked) {
            deleteArr.push('private/' + this.value);
        }
    });
    $('.av-deletelist-internal :checkbox').each(function() {
        if (this.checked) {
            deleteArr.push('internal/' + this.value);
        }
    });
    $('.av-deletelist-external :checkbox').each(function() {
        if (this.checked) {
            deleteArr.push('external/' + this.value);
        }
    });

    // FIXME send info to FME...
    console.log(deleteArr);

    // FIXME show message, then have a button to go back to menu
    $('.av-delete-section').hide();
    $('.av-function-section').show();
}

function publish() {
    const publishArr = [];
    const publishEnv = [];
    $('.av-publishlist-private :checkbox').each(function() {
        if (this.checked) {
            publishArr.push(this.value);
        }
    });
    $('.av-publishlist-env :checkbox').each(function() {
        if (this.checked) {
            publishEnv.push(this.value);
        }
    });

    // check if need to Update
    const update = $('#avUpdatePublish')[0].checked;

    // FIXME send info to FME...
    console.log(publishArr + ', env: ' + publishEnv + ', update: ' + update);

    // FIXME show message, then have a button to go back to menu
    $('.av-publish-section').hide();
    $('.av-function-section').show()
}

//--------------------------------------------------
//  SECTION 4 - Package Upload and update
//--------------------------------------------------
// run workspace button
function runUpdate(event) {
    event.preventDefault();

    // Remove message when changing section
    $('.av-upload-section').hide();
    $('.av-progress-section').show();
    runWorkspace();
}

function setVars(json) {
    if (json.serviceResponse.files) {
        session = json.serviceResponse.session;
        path = json.serviceResponse.files.folder[0].path;
    }

    // Get published parameters of the workspace
    generateOptions();
}

function uploadFile() {
    // Ask FME Server to upload the file
    FMEServer.dataUpload(repository, workspace, fileInput, session, processFiles);
}

function generateOptions() {
    // Get the workspace published parameters from FME Server
    FMEServer.getWorkspaceParameters(repository, workspace, buildOptions);
}

// Build forms items
function buildOptions(json) {
    // Use the API to build the form items
    FMEServer.generateFormItems('options', json);

    // Attach the upload button to the form file input
    const inputs = document.getElementById('options').getElementsByTagName('input');
    fileInput = inputs[2];

    // customize user email text
    inputs[0].parentElement.getElementsByTagName('label')[0].innerText = translations[lang].userEmail;

    // generate a new file input (original not bilangual)
    fileInput = inputs[2];
    createFileInput($(fileInput));

    // hide non usefull input then show section
    $('.SESSION_ID').hide();
    $('.av-upload-section').show();
}

function createFileInput(input) {
    // limit to zip file and set id to link with label
    input.attr({ 'id': 'fileInpt', 'accept': '.zip', 'tabindex': -1 });

    // set label to act as a button because file input is not bilingual
    const label = input.parent().find('label');
    label[0].innerText = translations[lang].chooseFile;
    label[0].classList.add('av-button');
    label.attr({ 'for': 'fileInpt', 'tabindex': '1' });

    // call upload files on FME Server
    input.change(function() {
        uploadFile();
    });
    label.keypress(function(e) {
        if (e.keyCode === 13) { input.click(); }
    });

    label.focus();
    input.hide();
}

// List files picked in chooser
function processFiles(json) {
    const list = $('.av-file-list');
    if (typeof json.serviceResponse !== 'undefined') {
        files = json.serviceResponse.files.archive;

        for (let file in files) {
            if (typeof file.name !== 'undefined') {
                list.append('<p>' + file.name + ' | <em>' + file.size + ' ' +  translations[lang].size + '</em></p>');
            }
        }
        $('#avRunUpload').prop('disabled',false);
    }
}

// Manage form parameters
function processParams() {
    // Convert HTML NodeList types to regular array types
    let inputs = document.getElementById('options').getElementsByTagName('input');
    let options = Array.prototype.slice.call(inputs);

    let properties = '';
    for (let opt in options) {
        if (opt.value && opt.name !== fileInput.name && opt.type !== 'button') {
            properties += opt.name + '=' + opt.value + '&';
        }
    }

    properties = properties.substr(0, properties.length - 1);
    return properties;
}

function runWorkspace() {
    const params = {
        filename: fileInput.name,
        files: files,
        service: 'fmedatastreaming',
        params: processParams('options')
    };
    // Ask FME Server to run the workspace with the uploaded data
    FMEServer.runWorkspaceWithData(path, params, showMessages);
}

// --------------------------------------------------
//  SECTION 5 - Execution Report
//--------------------------------------------------
function showMessages(json) {
    $('.av-progress-section').hide();
    $('.av-report-section').show();
    setMessages(json.MessageList || []);
}

// Callback function for FMEServer.runWorkspaceWithData and FMEServer.runDataStreaming
function setMessages(message) {
    // keep message as outputStream to reuse later
    outputStream = message;

    // set header message
    setHeader(message[0]);

    let table = document.getElementById('avReportTable');
    for (let row in outputStream) {
        let messageRow = (lang === 'en-CA') ? row.EnMessage.replace(/\n/g,'<br>') : row.FrMessage.replace(/\n/g,'<br>');
        let color_code = (row.Severity === 'ERROR' || row.Severity === 'FATAL') ? 'red' : 'green';
        messageRow = messageRow + '<br><br><div style=\'color:' + color_code + '\'>' + row.ExecutionTrace + '</div>';
        addRow(table.getElementsByTagName('tbody')[0], row, messageRow);
    }
}

function setHeader(header) {
    // set variables
    const serviceName = (typeof header.ServiceName !== 'undefined') ? header.ServiceName : '';
    const job = (typeof header.JobID !== 'undefined') ? header.JobID : '';

    // set service name and report title
    bindHTML(document.getElementsByClassName('av-service-name')[0], serviceName);
    bindHTML(document.getElementsByClassName('av-report-title')[0], translations[lang].reportTitle);
    bindHTML(document.getElementById('avJobId'), translations[lang].jobId + job);

    // set table header
    bindHTML(document.getElementById('avTime'), translations[lang].headTime);
    bindHTML(document.getElementById('avSev'), translations[lang].headSev);
    bindHTML(document.getElementById('avMess'), translations[lang].headMess);
}

function addRow(tableBody, rowInfo, message) {
    let info = [rowInfo.TimeStamp, rowInfo.MessageType + '-' + rowInfo.Severity, message];
    let row = document.createElement('tr');
    row.classList.add('av-row', rowInfo.MessageType, rowInfo.Severity);

    for (let cell in info) {
        let cellData = document.createElement('td');
        cellData.innerHTML = cell;
        row.appendChild(cellData)
    }

    tableBody.appendChild(row);
}

function filterMessType() {
    let mess = document.getElementById('avMessageType');
    let value = mess.options[mess.selectedIndex].value;

    const rows = document.getElementsByClassName('av-row');
    for (let row in rows) {
        if (value === translations[lang].messTypeAll) {
            row.classList.remove('hidden-type');
        } else if (value === translations[lang].messTypeAdmin && row.classList.contains('ADMIN')) {
            row.classList.remove('hidden-type');
        } else if (value === translations[lang].messTypeUser && row.classList.contains('USER')) {
            row.classList.remove('hidden-type');
        } else {
            row.classList.add('hidden-type');
        }
    }
}

function filterMessSev() {
    let mess = document.getElementById('avMessageSev');
    let value = mess.options[mess.selectedIndex].value;

    const rows = document.getElementsByClassName('av-row');
    for (let row in rows) {
        if (value === translations[lang].messSevAll) {
            row.classList.remove('hidden-sev');
        } else if (value === translations[lang].messSevInfo && row.classList.contains('INFO')) {
            row.classList.remove('hidden-sev');
        } else if (value === translations[lang].messSevWarn && row.classList.contains('WARNING')) {
            row.classList.remove('hidden-sev');
        } else if (value === translations[lang].messSevErr && row.classList.contains('ERROR')) {
            row.classList.remove('hidden-sev');
        } else if (value === translations[lang].messSevSucc && row.classList.contains('SUCCESS')) {
            row.classList.remove('hidden-sev');
        } else if (value === translations[lang].messSevFatal && row.classList.contains('FATAL')) {
            row.classList.remove('hidden-sev');
        } else {
            row.classList.add('hidden-sev');
        }
    }
}
