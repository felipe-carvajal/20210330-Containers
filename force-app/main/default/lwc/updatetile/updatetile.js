import { LightningElement, track, wire, api } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import getAllUsers from '@salesforce/apex/FindUsers.getAllUsers';
const columns = [
    {label: 'Opportunity name', fieldName: 'opportunityName', type: 'text'},
    {label: 'Confidence', fieldName: 'confidence', type: 'percent', cellAttributes:
    { iconName: { fieldName: 'trendIcon' }, iconPosition: 'right' }},
    {label: 'Amount', fieldName: 'amount', type: 'currency', typeAttributes: { currencyCode: 'EUR', step: '0.001'}},
    {label: 'Contact Email', fieldName: 'contact', type: 'email'},
    {label: 'Contact Phone', fieldName: 'phone', type: 'phone'},
];
const data = [{
    id: 'a',
    opportunityName: 'Cloudhub',
    confidence: 0.2,
    amount: 25000,
    contact: 'jrogers@cloudhub.com',
    phone: '2352235235',
    trendIcon: 'utility:down'
},
{
    id: 'b',
    opportunityName: 'Quip',
    confidence: 0.78,
    amount: 740000,
    contact: 'quipy@quip.com',
    phone: '2352235235',
    trendIcon: 'utility:up'
}];
/*const columnsfel = [
    {label: 'Name', fieldName: 'Name', type: 'text'},
    {label: 'Title', fieldName: 'Title', type: 'text', cellAttributes:
    { iconName: { fieldName: 'trendIcon' }, iconPosition: 'right' }},
    /*{label: 'Amount', fieldName: 'amount', type: 'currency', typeAttributes: { currencyCode: 'EUR', step: '0.001'}},
    {label: 'Contact Email', fieldName: 'contact', type: 'email'},
    {label: 'Contact Phone', fieldName: 'phone', type: 'phone'},
];*/
import IDEN_FIELD from '@salesforce/schema/User.Id';
import NOMBRE_FIELD from '@salesforce/schema/User.Name';
import TITLE_FIELD from '@salesforce/schema/User.Title'; //MediumPhotoUrl
import PHOTO_FIELD from '@salesforce/schema/User.MediumPhotoUrl';

const actions = [
    { label: 'Show details', name: 'show_details' },
    { label: 'Delete', name: 'delete' }
];
const COLUMNSFEL = [
    { label:'Action', type: 'action', typeAttributes: { rowActions: actions, menuAlignment: 'left' } },
    { label: 'Employee Name',sortable:"true",  fieldName: NOMBRE_FIELD.fieldApiName, type: 'text' },
    { label: 'Title',sortable:"true", fieldName: TITLE_FIELD.fieldApiName, type: 'text' },
    { label: 'Checked', fieldName: PHOTO_FIELD.fieldApiName, type: 'text' },

];

    export default class ButtonIconStatefulBasic extends LightningElement {
    @track likeState = false;
    @track answerState = false;
    @track likeStateSize01 = false;
    @track likeStateSize02 = false;
    @track likeStateSize03 = false;
    @track likeStateSize04 = false;
    @track likeStateDisabled = false;
    @track answerStateDisabled = false;

    @track results=[];
    @track columns = COLUMNSFEL;
    @track sortBy='Title';
    @track sortDirection='asc';
    // Copied structure
columnsfel=COLUMNSFEL;
    @wire (getAllUsers) users;
    data = data;
    columns = columns;

// Ends Here ---------

    handleLikeButtonClick() {
        this.likeState = !this.likeState;
    }

    handleAnswerButtonClick() {
        this.answerState = !this.answerState;
    }

    handleLikeButtonSizeClick(event) {
        const buttonNumber = event.target.dataset.buttonNumber;

        this[`likeStateSize${buttonNumber}`] = !this[
            `likeStateSize${buttonNumber}`
        ];
    }

    handleLikeButtonDisabledClick() {
        this.likeStateDisabled = !this.likeStateDisabled;
    }

    handleAnswerButtonDisabledClick() {
        this.answerStateDisabled = !this.answerStateDisabled;
    }
    handleRowAction(event) {
        const action = event.detail.action;
        const row = event.detail.row;
        switch (action.name) {
            case 'show_details':
                alert('Showing Details: ' + JSON.stringify(row));
                break;
            case 'delete':
                const rows = this.data;
                const rowIndex = rows.indexOf(row);
                rows.splice(rowIndex, 1);
                this.data = rows;
                break;
        }
    }
    handleSelect() {
        const rows = ['a'];
        this.selectedRows = rows;

    }
    // The method onsort event handler
    updateColumnSorting(event) {
        var fieldName = event.detail.fieldName;
        var sortDirection = event.detail.sortDirection;
        // assign the latest attribute with the sorted column fieldName and sorted direction
        this.sortBy = fieldName;
        this.sortDirection = sortDirection;
        this.data = this.sortData(fieldName, sortDirection);
   }

}


